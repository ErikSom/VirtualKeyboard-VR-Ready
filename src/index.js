import {layouts, languages} from './layouts'
import {loadSVGs, drawSVG} from './svgs'
import config from './config'
import * as events from './events'
export {events};

export const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const mousePos = {x:0, y:0};
const shiftDoubleTapTimeout = 300;

let activePopupElement = null;
let bounds = null;
let selectedLanguage = null;
let widthUnits = null;
let layout = null;
let currentLayout = null;
let margin = null;
let buttonSize = null;
let buttonHeight = null;
let mouseDown = false;
let holdTimeout = null;
let keyPopup = false;
let shiftDown = false;
let shiftDownTime = 0;
let permaShift = false;
let bkspInterval = null;

/* EXPORT FUNCTIONS */
export let activeElement;

export const selectLanguage = lang =>{
	if(layouts[lang]){
		selectedLanguage = lang;
		setLayout(lang)
	}
}

export const setLayout = name =>{
	layout = layouts[name];
	currentLayout = name;

	widthUnits = calculateWidthUnits()
	const totalMargin = (widthUnits+1)*margin;
	buttonSize = (canvas.width - totalMargin) / widthUnits;
	draw();
}

export const setMouseDown = (bool, x, y)=>{
	mouseDown = bool;
	if(x !== undefined) setMousePos(x, y);
	else setMousePos(mousePos.x, mousePos.y);
}

export const setMousePosFromUV = (x, y)=>{
	setMousePos(canvas.width*x, canvas.height*y);
}

export const setMousePos = (x, y)=>{
	mousePos.x = x;
	mousePos.y = y;

	let foundKey;
	if(keyPopup) foundKey = checkPopupKeyCollision();
	if(!foundKey) foundKey = checkKeyboardCollision();

	if(!foundKey && activeElement){
		clearActiveElement();
		draw();
	}
}

export const setScreenSizeInPixels = (width, height, devicePixelRatio) => {
	config.resolution = devicePixelRatio;
	buttonHeight = config.buttonHeight*config.resolution;
	margin = config.margin*config.resolution;

	const minimHeight = getMinimumHeight();
	if(height<minimHeight){
		console.warn("[VRKeyboard] The height is to small for the keyboard to render, height is adjusted to fit");
	}

	height = Math.max(height, minimHeight);

	canvas.width = width*config.resolution;
	canvas.height = height*config.resolution;

	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	if(currentLayout) setLayout(currentLayout);
}

export const setScreenSizeFromAspectRatio = () =>{
	canvas.width = config.resolution*512;
	canvas.height = canvas.width/config.aspect;
	margin = config.margin*config.resolution;
	buttonHeight = config.buttonHeight*config.resolution;
	if(currentLayout) setLayout(currentLayout);
}

export const addListeners = ()=>{
	const getCanvasPosition = (x, y) =>{
		bounds = canvas.getBoundingClientRect();
		x -= bounds.x;
		y -= bounds.y;
		return [x*config.resolution, y*config.resolution];
	}
	document.addEventListener('mousemove', event=>{
		setMousePos(...getCanvasPosition(event.clientX, event.clientY));
	});
	canvas.addEventListener('mousedown', event=>{
		setMouseDown(true, ...getCanvasPosition(event.clientX, event.clientY));
		event.preventDefault();
	})
	document.addEventListener('mouseup', event=>{
		setMouseDown(false);
	})
	document.addEventListener('touchmove', event=>{
		const touch = event.touches[0];
		setMousePos(...getCanvasPosition(touch.clientX, touch.clientY));
		event.preventDefault();
	},{ passive: false});
	canvas.addEventListener('touchstart', event=>{
		const touch = event.touches[0];
		setMouseDown(true, ...getCanvasPosition(touch.clientX, touch.clientY))
		event.preventDefault();
	},{ passive: false})
	document.addEventListener('touchend', event=>{
		setMouseDown(false)
	},{ passive: false})
}


export const init = _config =>{
	loadSVGs().then(()=>{
		draw();
	})
	Object.assign(config, _config);
	selectedLanguage = config.language;

	setScreenSizeFromAspectRatio();

	selectLanguage('en');

}
export let textureDirty = true;
export const setTextureDirty = bool =>{
	textureDirty = bool;
}


/* DRAWING FUNCTIONS */

const drawRoundedRectangle = (x, y, w, h, r) => {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	ctx.beginPath();
	ctx.moveTo(x+r, y);
	ctx.arcTo(x+w, y, x+w, y+h, r);
	ctx.arcTo(x+w, y+h, x, y+h, r);
	ctx.arcTo(x, y+h, x, y, r);
	ctx.arcTo(x, y, x+w, y, r);
	ctx.closePath();
	ctx.fill();
}

const drawText = (x,y,w,h, text, fontSize)=>{
	if(!fontSize) fontSize = config.fontSize * config.resolution;
	ctx.font = `${fontSize}px ${config.font}`;
	ctx.textBaseline = 'middle';
	if(!text) return;
		const textSize = ctx.measureText(text);
		const textX = (w-textSize.width)/2;
		const textY = h/2;
		ctx.fillText( text, x+textX, y+textY );
}

const draw = ()=>{
	const startY = calculateStartY();

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.shadowBlur = config.keyShadow.shadowBlur;
	ctx.shadowOffsetX = config.keyShadow.shadowOffsetX;
	ctx.shadowOffsetY = config.keyShadow.shadowOffsetY;

	let y = startY;

	// draw keys
	for(let i = 0; i<layout.length; i++){
		const row = layout[i];
		let x = margin + calculateKeyboardOffset()+calculateRowOffset(i);
		for(let j = 0; j<row.length; j++){
			const key = row[j];
			let buttonWidth = key.w ? key.w : 1.0;
			ctx.fillStyle = config.colors.hover;
			if(key.down) ctx.fillStyle = config.colors.down;
			else if(key.hover) ctx.fillStyle = config.colors.hover;
			else ctx.fillStyle = config.colors.idle;

			let widthSize = buttonSize*buttonWidth;
			widthSize += (buttonWidth-1)*margin;

			ctx.shadowColor = config.keyShadow.shadowColor;
			drawRoundedRectangle(x, y, widthSize, buttonHeight, config.buttonRadius*config.resolution);
			ctx.shadowColor = 'transparent';

			ctx.fillStyle = config.colors.text;
			key.pos = {x,y};
			if(['shift', 'bksp', 'enter', 'lang'].includes(key.char)){
				let char = key.char;
				if(key.char === 'shift' && shiftDown) char = 'shift_down';
				if(key.char === 'shift' && permaShift) char = 'shift_perm';
				drawSVG(ctx, x, y, widthSize, buttonHeight, char);
			}else{
				let char = shiftDown && key.char.length === 1 ? key.char.toUpperCase() : key.char;
				if(char === 'space') char = '␣';
				drawText(x, y, widthSize, buttonHeight, char);

				if(key.alt){
					const fontSize = config.fontSize*0.6*config.resolution;
					drawText(x+widthSize/2-fontSize/2, y-buttonHeight/2 + fontSize, widthSize, buttonHeight, key.alt, fontSize);
				}

			}
			x += widthSize +margin;
		}
		y += buttonHeight+margin
	}

	ctx.shadowBlur = config.popupShadow.shadowBlur;
	ctx.shadowOffsetX = config.popupShadow.shadowOffsetX;
	ctx.shadowOffsetY = config.popupShadow.shadowOffsetY;

	// draw overlay
	if(activeElement && activeElement.extra && activeElement.down ){
		const {pos} = activeElement;

		const {startX, startY, keyArr, popupWidth, popupHeight} = getPopupKeyInfo(pos, keyPopup ? [...activeElement.extra] : [activeElement]);

		ctx.fillStyle = config.colors.idle;

		ctx.shadowColor = config.popupShadow.shadowColor;
		drawRoundedRectangle(startX, startY-buttonHeight*(keyArr.length-1), popupWidth, popupHeight, config.buttonRadius*config.resolution);
		drawRoundedRectangle(pos.x, pos.y-buttonHeight, buttonSize, buttonHeight*2, config.buttonRadius*config.resolution);
		ctx.shadowColor = 'transparent';

		let y = startY;
		for(let i = 0; i<keyArr.length; i++){
			const row = keyArr[i];
			let x = startX;

			for(let j = 0; j<row.length; j++){
				const key = row[j];
				if(key.down) ctx.fillStyle = config.colors.down;
				else if(key.hover) ctx.fillStyle = config.colors.hover;
				else ctx.fillStyle = config.colors.idle;
				drawRoundedRectangle(x, y, buttonSize, buttonHeight, config.buttonRadius*config.resolution);
				ctx.fillStyle = config.colors.text;
				const char = shiftDown  && key.char.length <= 2 ? key.char.toUpperCase() : key.char;
				drawText(x, y, buttonSize, buttonHeight, char);

				if(!keyPopup){
					drawText(x, y+buttonHeight/2, buttonSize, buttonHeight/2, '...');
				}

				x+= buttonSize;
			}
			y -= buttonHeight;
		}
	}
	textureDirty = true;
}

/* COLLISION DETECTION */

const checkKeyboardCollision = ()=>{
	const {x, y} = mousePos;
	const startY = calculateStartY();
	const rowIndex = Math.floor((y-startY)/(buttonHeight+margin));
	const row = layout[rowIndex];
	if(!row) return;
	let searchX = margin + calculateKeyboardOffset()+calculateRowOffset(rowIndex);
	for(let i = 0; i<row.length; i++){
		const key = row[i];
		let buttonWidth = key.w ? key.w : 1.0;

		let widthSize = buttonSize*buttonWidth;
		widthSize += (buttonWidth-1)*margin;

		let aboveStartX = x>searchX;
		searchX += widthSize +margin;

		if(aboveStartX && x<searchX-margin){
			if(!activeElement || activeElement !== key || (activeElement.down !== mouseDown)){
				if(activeElement === key && activeElement.down && !mouseDown) return keyPress(activeElement);
				clearActiveElement();
				activeElement = key;
				activeElement.hover = true
				activeElement.down = mouseDown;
				if(activeElement.down) setHoldTimeout();
				else clearHoldTimeout();
				draw();
			}
			// we found a key, return
			return activeElement;
		};
	}
}

const checkPopupKeyCollision = ()=>{
	if(!activeElement || !activeElement.extra) return;

	if(!mouseDown){
		// key down event
		keyPress(activePopupElement);
		return true;
	}

	const {x, y} = mousePos;
	const {pos} = activeElement;

	const {startX, startY, keyArr, popupWidth, popupHeight} = getPopupKeyInfo(pos, [...activeElement.extra]);

	let closestKey = null;
	let closestLength = Number.POSITIVE_INFINITY;

	let ty = startY+buttonHeight/2;
	for(let i = 0; i<keyArr.length; i++){
		const row = keyArr[i];
		let tx = startX+buttonSize/2;
		for(let j = 0; j<row.length; j++){
			const key = row[j];
			const dx = x-tx;
			const dy = y-ty;
			const length = Math.sqrt(dx*dx+dy*dy);
			if(length<closestLength){
				 closestKey = key;
				 closestLength = length;
			}

			tx+= buttonSize;
		}
		ty -= buttonHeight;
	}

	if(!activePopupElement || activePopupElement !== closestKey || (activePopupElement.down !== mouseDown)){
		clearActivePopupElement();
		activePopupElement = closestKey;
		activePopupElement.hover = true;
		activePopupElement.down = true;
		draw();
	}

	// inside big rectangle
	if((x > startX && x<startX+popupWidth) &&
	(y> startY-buttonHeight*(keyArr.length-1) && y< startY-buttonHeight*(keyArr.length-1)+popupHeight)){
	   return true;
	}
	// inside small rectangle
	if((x > pos.x && x<pos.x+buttonSize) &&
		(y > pos.y-buttonHeight && y<pos.y+buttonHeight)){
			return true;
		}
	return false;
}

/* KEY PRESS HANDLER */

const keyPress = key =>{
	clearActivePopupElement();
	clearActiveElement();
	clearHoldTimeout();
	let drawn = true;

	events.dispatchEvent(key.char, shiftDown);

	switch(key.char){
		case 'abc':
			setLayout(selectedLanguage);
		break;
		case '!?#':
		case '?123':
			setLayout('num');
		break;
		case '=\\<':
			setLayout('sym');
		break;
		case '1234':
			setLayout('nump');
		break;
		case 'shift':
			if(!permaShift && Date.now()-shiftDownTime<shiftDoubleTapTimeout){
				shiftDown = true;
				permaShift = true;
				shiftDownTime = 0;
			}else{
				shiftDown = !shiftDown;
				permaShift = false;
				shiftDownTime = Date.now();
			}
			drawn = false;
		break;
		case 'lang':
			for(let i = 0; i<languages.length; i++){
				if(languages[i] === selectedLanguage){
					let nextLanguage = i+1;
					if(!languages[nextLanguage]) nextLanguage = 0;
					selectLanguage(languages[nextLanguage]);
					break;
				}
			}
		break;
		default:
			if(languages.includes(key.char.toLowerCase())){
				// we have a language
				selectLanguage(key.char.toLowerCase());
			}else{
				if(shiftDown && !permaShift) shiftDown = false;
				drawn = false;
			}
		break;
	}

	if(!drawn) draw();
	return key;
}

const clearActiveElement = ()=>{
	if(activeElement){
		activeElement.hover = false;
		activeElement.down = false;
		activeElement = null;
	}
}

const clearActivePopupElement = ()=>{
	if(activePopupElement){
		activePopupElement.hover = false;
		activePopupElement.down = false;
		activePopupElement = null;
	}
}

const clearHoldTimeout = ()=>{
	if(holdTimeout) clearTimeout(holdTimeout);
	if(bkspInterval) clearInterval(bkspInterval);

	keyPopup = false;
}

const setHoldTimeout = ()=>{
	clearHoldTimeout();
	holdTimeout = setTimeout(()=>{
		keyPopup = true;
		clearActivePopupElement();
		checkPopupKeyCollision();
		if(activeElement && activeElement.char === 'bksp'){
			bkspInterval = setInterval(()=>{
				if(activeElement) events.dispatchEvent(activeElement.char)
			}, config.bkspIntervalTime);
		}
	}, config.holdPopupTime);
}

/* HELPER FUNCTIONS */

const calculateStartY = ()=>{
	if(config.align === 'center')	return (canvas.height/2) - (layout.length*buttonHeight*0.5);
	else return buttonHeight*2+margin*4;
}

const calculateWidthUnits = ()=>{
	let maxUnits = 0;
	for(let i = 0; i<layout.length; i++){
		const row = layout[i];
		let width = 0;
		for(let j = 0; j<row.length; j++){
			const key = row[j];
			width += key.w ? key.w : 1;
		}
		if(width>maxUnits) maxUnits = width;
	}
	return maxUnits;
}

const calculateKeyboardOffset = ()=>{
	let maxUnits = calculateWidthUnits();
	const oneSideDiff = (widthUnits-maxUnits)/2;
	return oneSideDiff * buttonSize + (oneSideDiff)*margin;
}

const calculateRowOffset = i=>{
	const row = layout[i];
	let width = 0;
	for(let j = 0; j<row.length; j++){
		const key = row[j];
		width += key.w ? key.w : 1;
	}
	const oneSideDiff = (widthUnits-width)/2;
	return oneSideDiff * buttonSize + (oneSideDiff)*margin;
}

const getMinimumHeight = ()=>{
	const buttonsHeight = (layout.length*buttonHeight);
	const marginHeight = (layout.length+1)*margin;
	const popupHeight = buttonHeight*2 + margin*3;
	return (buttonsHeight+marginHeight+popupHeight)/config.resolution;
}

const getPopupKeyInfo = (pos, keys) =>{
	let splitKeysAt = 5;
	if(keys.length>splitKeysAt) splitKeysAt = Math.ceil(keys.length/2);
	const keyArr = new Array(Math.ceil(keys.length / splitKeysAt)).fill().map(_ => keys.splice(0, splitKeysAt))

	const popupWidth = keyArr[0].length*buttonSize
	const popupHeight = keyArr.length*buttonHeight

	const halfRowSize = Math.floor(keyArr[0].length/2)*buttonSize;

	let startX = pos.x-halfRowSize;
	if(keyArr[0].length>1 && keyArr[0].length%2 === 0) startX += buttonSize;

	while(startX<0) startX+= buttonSize;
	while(startX+keyArr[0].length*buttonSize > canvas.width) startX -= buttonSize;

	const startY = pos.y-buttonHeight-margin*3;
	return {keyArr, popupWidth, popupHeight, startX, startY};
}
