import state from './state';
import element from './dom'
import config from './config'

export const calculateStartY = () => {
	if (config.align === 'center') return (element.height / 2) - (state.layout.length * state.buttonHeight * 0.5);
	else return state.buttonHeight * 2 + state.margin * 4;
}

export const calculateWidthUnits = () => {
	let maxUnits = 0;
	for (let i = 0; i < state.layout.length; i++) {
		const row = state.layout[i];
		let width = 0;
		for (let j = 0; j < row.length; j++) {
			const key = row[j];
			width += key.w ? key.w : 1;
		}
		if (width > maxUnits) maxUnits = width;
	}
	return maxUnits;
}

export const calculateKeyboardOffset = () => {
	let maxUnits = calculateWidthUnits();
	const oneSideDiff = (state.widthUnits - maxUnits) / 2;
	return oneSideDiff * state.buttonSize + (oneSideDiff) * state.margin;
}

export const calculateRowOffset = i => {
	const row = state.layout[i];
	let width = 0;
	for (let j = 0; j < row.length; j++) {
		const key = row[j];
		width += key.w ? key.w : 1;
	}
	const oneSideDiff = (state.widthUnits - width) / 2;
	return oneSideDiff * state.buttonSize + (oneSideDiff) * state.margin;
}

export const getMinimumHeight = () => {
	const buttonsHeight = (state.layout.length * state.buttonHeight);
	const marginHeight = (state.layout.length + 1) * state.margin;
	const popupHeight = state.buttonHeight * 2 + state.margin * 3;
	return (buttonsHeight + marginHeight + popupHeight) / config.resolution;
}

export const getPopupKeyInfo = (pos, keys) => {
	let splitKeysAt = 5;
	if (keys.length > splitKeysAt) splitKeysAt = Math.ceil(keys.length / 2);
	const keyArr = new Array(Math.ceil(keys.length / splitKeysAt)).fill().map(_ => keys.splice(0, splitKeysAt))

	const popupWidth = keyArr[0].length * state.buttonSize
	const popupHeight = keyArr.length * state.buttonHeight

	const halfRowSize = Math.floor(keyArr[0].length / 2) * state.buttonSize;

	let startX = pos.x - halfRowSize;
	if (keyArr[0].length > 1 && keyArr[0].length % 2 === 0) startX += state.buttonSize;

	while (startX < 0) startX += state.buttonSize;
	while (startX + keyArr[0].length * state.buttonSize > element.width) startX -= state.buttonSize;

	const startY = pos.y - state.buttonHeight - state.margin * 3;
	return {
		keyArr,
		popupWidth,
		popupHeight,
		startX,
		startY
	};
}
export const getDistance = (a, b) => {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}
export const getAngle = (a, b) => {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.atan2(dy, dx);
}
export const uniqueCharacters = str => {
	let unique = "";
	for (let x = 0; x < str.length; x++) {
		if (unique.indexOf(str.charAt(x)) === -1) {
			unique += str[x];
		}
	}
	return unique;

}
