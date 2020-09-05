import * as helper from './helper';
import * as events from './events'
import * as layout from './layout'
import * as swipe from './swipe';
import element from './dom'
import state from './state';
import config from './config'
import draw from './drawing';

export const checkKeyboardCollision = ()=>{
	const {x, y} = state.mousePos;
	const startY = helper.calculateStartY();
	const rowIndex = Math.floor((y-startY)/(state.buttonHeight+state.margin));
	const row = state.layout[rowIndex];
	if(!row) return;
	let searchX = state.margin + helper.calculateKeyboardOffset()+helper.calculateRowOffset(rowIndex);
	for(let i = 0; i<row.length; i++){
		const key = row[i];
		let buttonWidth = key.w ? key.w : 1.0;

		let widthSize = state.buttonSize*buttonWidth;
		widthSize += (buttonWidth-1)*state.margin;

		let aboveStartX = x>searchX;
		searchX += widthSize +state.margin;

		if(aboveStartX && x<searchX-state.margin){
			if(!state.activeElement || state.activeElement !== key || (state.activeElement.down !== state.mouseDown)){
				if(state.activeElement === key && state.activeElement.down && !state.mouseDown) return keyPress(state.activeElement);
				clearActiveElement();
				state.activeElement = key;
				state.activeElement.hover = true
				state.activeElement.down = state.mouseDown;
				if(state.activeElement.down) setHoldTimeout();
				else clearHoldTimeout();
				state.stateChange = true;
			}
			// we found a key, return
			return state.activeElement;
		};
	}
}
export const checkSuggestionCollision = ()=>{
	const {x, y} = state.mousePos;
	const startY = helper.calculateStartY() - state.buttonHeight - state.margin*3;
	const {suggestions, suggestionSize, totalWidth} = helper.getSuggestionInfo();

	let tx = element.width/2 - totalWidth/2;

	for(let i = 0; i<suggestions.length; i++){
		const suggestion = suggestions[i];
		if(x>tx && x<tx+suggestionSize && y>startY && y<startY+state.buttonHeight){

			if(!state.activeSuggestionElement || state.activeSuggestionElement !== suggestion || (state.activeSuggestionElement.down !== state.mouseDown)){
				if(state.activeSuggestionElement === suggestion && state.activeSuggestionElement.down && !state.mouseDown) return keyPress(state.activeSuggestionElement);
				clearActiveSuggestionElement();
				state.activeSuggestionElement = suggestion;
				state.activeSuggestionElement.hover = true;
				state.activeSuggestionElement.down = state.mouseDown;
				state.stateChange = true;
			}
			return state.activeSuggestionElement;
		}
		tx += suggestionSize+state.margin;
	}

}

export const checkPopupKeyCollision = ()=>{
	if(!state.activeElement || !state.activeElement.extra) return;

	if(!state.mouseDown){
		// key down event
		keyPress(state.activePopupElement);
		return true;
	}

	const {x, y} = state.mousePos;
	const {pos} = state.activeElement;

	const {startX, startY, keyArr, popupWidth, popupHeight} = helper.getPopupKeyInfo(pos, [...state.activeElement.extra]);

	let closestKey = null;
	let closestLength = Number.POSITIVE_INFINITY;

	let ty = startY+state.buttonHeight/2;
	for(let i = 0; i<keyArr.length; i++){
		const row = keyArr[i];
		let tx = startX+state.buttonSize/2;
		for(let j = 0; j<row.length; j++){
			const key = row[j];

			const length = helper.getDistance({x, y}, {x:tx, y:ty});

			if(length<closestLength){
				 closestKey = key;
				 closestLength = length;
			}

			tx+= state.buttonSize;
		}
		ty -= state.buttonHeight;
	}

	if(!state.activePopupElement || state.activePopupElement !== closestKey || (state.activePopupElement.down !== state.mouseDown)){
		clearActivePopupElement();
		state.activePopupElement = closestKey;
		state.activePopupElement.hover = true;
		state.activePopupElement.down = true;
		state.stateChange = true;
	}

	// inside big rectangle
	if((x > startX && x<startX+popupWidth) &&
	(y> startY-state.buttonHeight*(keyArr.length-1) && y< startY-state.buttonHeight*(keyArr.length-1)+popupHeight)){
	   return true;
	}
	// inside small rectangle
	if((x > pos.x && x<pos.x+state.buttonSize) &&
		(y > pos.y-state.buttonHeight && y<pos.y+state.buttonHeight)){
			return true;
		}
	return false;
}
export const clearActiveElement = ()=>{
	if(state.activeElement){
		state.activeElement.hover = false;
		state.activeElement.down = false;
		state.activeElement = null;
	}
}

export const clearActiveSuggestionElement = ()=>{
	if(state.activeSuggestionElement){
		state.activeSuggestionElement.hover = false;
		state.activeSuggestionElement.down = false;
		state.activeSuggestionElement = null;
	}
}

const clearActivePopupElement = ()=>{
	if(state.activePopupElement){
		state.activePopupElement.hover = false;
		state.activePopupElement.down = false;
		state.activePopupElement = null;
	}
}

const clearHoldTimeout = ()=>{
	if(state.holdTimeout) clearTimeout(state.holdTimeout);
	if(state.bkspInterval) clearInterval(state.bkspInterval);

	state.keyPopup = false;
}

const setHoldTimeout = ()=>{
	clearHoldTimeout();
	state.holdTimeout = setTimeout(()=>{
		if(state.swipeActive) return;
		state.keyPopup = true;
		clearActivePopupElement();
		checkPopupKeyCollision();
		draw();
		if(state.activeElement && state.activeElement.char === 'bksp'){
			state.bkspInterval = setInterval(()=>{
				if(state.activeElement){
					events.dispatchEvent(state.activeElement);
					if(config.swipe){
						const previousUninterruptedString = state.uninterruptedString;
						state.uninterruptedString = state.uninterruptedString.substr(0, state.uninterruptedString.length-1);
						if(previousUninterruptedString !== state.uninterruptedString){
							swipe.end();
							draw();
						}
					}
				}
			}, config.bkspIntervalTime);
		}
	}, config.holdPopupTime);
}

export const keyPress = key =>{
	clearActivePopupElement();
	clearActiveSuggestionElement();
	clearActiveElement();
	clearHoldTimeout();

	if(state.swipeActive) return;

	events.dispatchEvent(key, state.shiftDown);

	if(key.suggestion){
		swipe.resetSuggestions();
	}

	switch(key.char){
		case 'abc':
			layout.setLayout(state.selectedLanguage);
		break;
		case '!?#':
		case '?123':
			layout.setLayout('num');
		break;
		case '=\\<':
			layout.setLayout('sym');
		break;
		case '1234':
			layout.setLayout('nump');
		break;
		case 'shift':
			if(!state.permaShift && Date.now()-state.shiftDownTime<config.shiftDoubleTapTimeout){
				state.shiftDown = true;
				state.permaShift = true;
				state.shiftDownTime = 0;
			}else{
				state.shiftDown = !state.shiftDown;
				state.permaShift = false;
				state.shiftDownTime = Date.now();
			}
			state.stateChange = true;

		break;
		case 'lang':
			for(let i = 0; i<config.languages.length; i++){
				if(config.languages[i] === state.selectedLanguage){
					let nextLanguage = i+1;
					if(!config.languages[nextLanguage]) nextLanguage = 0;
					layout.selectLanguage(config.languages[nextLanguage]);
					break;
				}
			}
		break;
		default:
			if(config.languages.includes(key.char.toLowerCase())){
				// we have a language
				layout.selectLanguage(key.char.toLowerCase());
			}else{
				if(state.shiftDown && !state.permaShift) state.shiftDown = false;
				if(config.swipe){
					if(['space', 'enter'].includes(key.char)) swipe.resetSuggestions();
					if(key.char === 'bksp'){
						 state.uninterruptedString = state.uninterruptedString.substr(0, state.uninterruptedString.length-1);
					} else if(state.swipePlacedWord){
						state.uninterruptedString = '';
					}
					if(state.currentLayout === state.selectedLanguage && key.char.length <= 2) state.uninterruptedString += key.char;
				}

				state.stateChange = true;
			}
		break;
	}

	state.swipePlacedWord = false;

	return key;
}
