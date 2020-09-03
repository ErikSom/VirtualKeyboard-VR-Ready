import {loadSVGs} from './svgs'
import * as layout from './layout'
import * as events from './events'
import * as swipe from './swipe';
import * as collision from './collision'
import config from './config'
import element from './dom'
import draw from './drawing';
import state from './state';

export {events};

export const getCanvas = ()=>element;

export const getActiveElement = ()=>state.activeElement;

export const selectLanguage = layout.selectLanguage;

export const setLayout = layout.setLayout;

export const setScreenSizeInPixels = layout.setScreenSizeInPixels;

export const setScreenSizeFromAspectRatio = layout.setScreenSizeFromAspectRatio;

export const setMouseDown = (bool, x, y)=>{
	state.mouseDown = bool;

	if(x !== undefined) setMousePos(x, y);
	else setMousePos(state.mousePos.x, state.mousePos.y);

	if(!state.mouseDown && state.swipeActive){
		if(state.suggestions.length>0){
			const suggestionKey = state.suggestions.shift();
			events.dispatchEvent(suggestionKey, state.shiftDown);
			state.uninterruptedString = suggestionKey.char;
			state.swipePlacedWord = true;
		}
		state.swipeActive = false;
	}
}

export const setMousePosFromUV = (x, y)=>{
	setMousePos(element.width*x, element.height*y);
}

export const setMousePos = (x, y)=>{
	state.mousePos.x = x;
	state.mousePos.y = y;

	let foundKey;
	if(state.keyPopup) foundKey = collision.checkPopupKeyCollision();
	if(!foundKey && config.swipe) foundKey = collision.checkSuggestionCollision();
	if(!foundKey) foundKey = collision.checkKeyboardCollision();

	if(config.swipe && state.mouseDown && !state.keyPopup) swipe.move();

	if(!foundKey && (state.activeElement || state.activeSuggestionElement)){
		collision.clearActiveElement();
		collision.clearActiveSuggestionElement();
		state.stateChange = true;
	}
	if(config.swipe && !state.mouseDown && state.previousMouseState){
		// a bit dirty but we need the keypress info, and we dont want to draw 2 times.
		if(!state.keyPopup) swipe.end();
		state.stateChange = true;
	}

	state.previousMouseState = state.mouseDown;
	if(state.stateChange) draw();
}

export const addListeners = ()=>{
	const getCanvasPosition = (x, y) =>{
		const bounds = element.getBoundingClientRect();
		x -= bounds.x;
		y -= bounds.y;
		return [x*config.resolution, y*config.resolution];
	}
	document.addEventListener('mousemove', event=>{
		setMousePos(...getCanvasPosition(event.clientX, event.clientY));
	});
	element.addEventListener('mousedown', event=>{
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
	element.addEventListener('touchstart', event=>{
		const touch = event.touches[0];
		setMouseDown(true, ...getCanvasPosition(touch.clientX, touch.clientY))
		event.preventDefault();
	},{ passive: false})
	document.addEventListener('touchend', event=>{
		setMouseDown(false)
	},{ passive: false})
}

export const setTextureDirty = bool => {state.textureDirty = bool};

export const getTextureDirty = ()=>state.textureDirty;

export const resetSuggestionInput = swipe.resetSuggestions;

export const init = _config =>{

	Object.assign(config, _config);
	layout.init();
	layout.setScreenSizeFromAspectRatio();
	layout.selectLanguage(config.language);

	loadSVGs().then(()=>{
		draw();
	})


}
