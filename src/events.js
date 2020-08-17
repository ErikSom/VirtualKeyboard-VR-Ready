import EventDispatcher from './utils/EventDispatcher'
import {languages} from './layouts';

export const dispatcher = new EventDispatcher();

export const addEventListener = (type, listener) => {
	console.log("Add event listener")
	dispatcher.addEventListener(type, listener);
}
export const removeEventListener = (type, listener) => {
	dispatcher.removeEventListener(type, listener);
}
export const dispatchEvent = (key, shiftDown) =>{
	let char = null;
	if(key.length <= 2 && !languages.includes(key.toLowerCase())) char = shiftDown ? key.toUpperCase() : key;

	if(key === 'space') char = ' ';
	dispatcher.dispatchEvent({type:KEYDOWN, key, char});
}

export const KEYDOWN = 'keyDown';
