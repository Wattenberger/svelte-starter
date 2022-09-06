# Svelte Starter kit

This is a bare-bones starter template that uses...

- Svelte + Sveltekit
- Typescript
- Tailwind for styles

It has a few built-in utilities, like...

- sets of colors in `/src/utils/colors.ts`
- a `writableStorage` utility in `/src/utils/storage.ts` that can be backed by LocalStorage or URL params
- some basic UI components in `/src/components/_ui/`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
