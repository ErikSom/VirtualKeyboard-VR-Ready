import EventDispatcher from './utils/EventDispatcher'
import config from './config'
import state from './state';

export const dispatcher = new EventDispatcher();

export const addEventListener = (type, listener) => {
	dispatcher.addEventListener(type, listener);
}
export const removeEventListener = (type, listener) => {
	dispatcher.removeEventListener(type, listener);
}
export const dispatchEvent = (key, shiftDown) =>{
	let char = null;
	let keyName = key.char;
	if((key.char.length <= 2) && !config.languages.includes(key.char.toLowerCase())) char = shiftDown ? key.char.toUpperCase() : key.char;

	let removeChars = false;

	if(key.suggestion){
		char = key.char+' ';
		keyName = 'suggestion';
		if(state.swipePlacedWord && state.uninterruptedString.length) state.uninterruptedString+=' ';
		if(state.uninterruptedString.length) removeChars = true;
	}
	if(state.swipePlacedWord && key.char == 'bksp') removeChars = true;

	var length = state.uninterruptedString.length;
	if(removeChars){
		state.uninterruptedString = '';
		for(let i = 0; i<length; i++) dispatchEvent({char:'bksp'});
	}

	if(key.char === 'space') char = ' ';
	dispatcher.dispatchEvent({type:KEYDOWN, key:keyName, char});
}

export const KEYDOWN = 'keyDown';
