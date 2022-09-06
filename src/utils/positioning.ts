export const getPositionFromDistanceAndAngle = (
	distance: number,
	angle: number
): [number, number] => {
	return [distance * Math.cos(angle), distance * Math.sin(angle)];
};
