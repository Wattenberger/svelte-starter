import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

type WritableStorageOptions = {
	localStorage?: boolean;
	cookie?: boolean;
	urlParam?: boolean;
};
export type GetMyClassT<C extends Writable<any>> = C extends Writable<infer T> ? T : unknown;
export const writableStorage: <T>(
	key: string,
	initialValue: T,
	options?: WritableStorageOptions
) => Writable<T> = (key, initialValue, options = {}) => {
	const { localStorage = false, cookie = false, urlParam = false } = options;
	const localStorageInitialValue = localStorage ? getFromLocalStorage(key) : undefined;
	const urlParamInitialValue = urlParam ? getFromUrlParam(key) : undefined;
	const cookieInitialValue = cookie ? getFromCookie(key) : undefined;
	const cascadedInitialValue =
		localStorageInitialValue ?? urlParamInitialValue ?? cookieInitialValue ?? initialValue;
	const value = writable(cascadedInitialValue);
	value.subscribe((v) => {
		if (localStorage) setInLocalStorage(key, v);
		if (urlParam) setInUrlParam(key, v);
		if (cookie) setInCookie(key, v);
	});
	return value;
};
export const writableStorageFromCallback = <T>(initialValue: T, callback: () => Promise<T>) => {
	const updateValue = async () => {
		try {
			if (!browser) return;
			const response = await callback();
			value.set(response ?? initialValue);
		} catch (e) {
			value.set(initialValue);
		}
	};
	const value = writable(initialValue);
	updateValue();
	value.updateWithCallback = updateValue;
	return value;
};

const getFromLocalStorage = (key: string) => {
	if (typeof localStorage === 'undefined') return;
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (e) {
		return undefined;
	}
};
const setInLocalStorage = (key: string, value: any) => {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(key, JSON.stringify(value));
};
const getFromUrlParam = (key: string) => {
	if (typeof window === 'undefined') return;
	const urlParams = new URLSearchParams(window.location.search);
	const value = urlParams.get(key);
	if (!value) return value;
	try {
		return JSON.parse(value);
	} catch (e) {
		return undefined;
	}
};
const setInUrlParam = (key: string, value: any) => {
	if (typeof window === 'undefined') return;
	const url = new URL(window.location.href);
	url.searchParams.set(key, JSON.stringify(value));
	window.history.replaceState({}, '', url.toString());
};
const getFromCookie = (key: string) => {
	if (typeof document === 'undefined') return;
	const value = document.cookie.split(';').find((row) => row.trim().startsWith(`${key}=`));
	if (!value) return value;
	try {
		return JSON.parse(value.split('=')[1]);
	} catch (e) {
		return undefined;
	}
};
const setInCookie = (key: string, value: any, expires = 365) => {
	if (typeof document === 'undefined') return;
	const date = new Date();
	date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
	document.cookie = `${key}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
};

type HistoryValue<T> = Writable<T> & {
	isPaused: boolean;
	onGoToHistoryIndex: (index: number) => void;
	onMoveInHistory: (diff: number) => void;
};
export const writableWithHistory = <T>(initialValue: T): HistoryValue<T> => {
	const value = writable(initialValue) as HistoryValue<T>;
	let history = [initialValue];
	let historyIndex = 0;
	value.isPaused = false;
	value.subscribe((v) => {
		if (value.isPaused) return;
		history = [v, ...history];
		historyIndex = 0;
	});
	value.onGoToHistoryIndex = (index: number) => {
		if (value.isPaused) return;
		value.isPaused = true;
		historyIndex = index;
		value.set(history[index]);
		value.isPaused = false;
	};
	value.onMoveInHistory = (diff: number) => {
		if (historyIndex + diff < 0) return;
		if (historyIndex + diff >= history.length) return;
		value.onGoToHistoryIndex(historyIndex + diff);
	};
	return value;
};
