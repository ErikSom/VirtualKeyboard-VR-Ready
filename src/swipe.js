import config from './config'
import state from "./state";
import * as helper from './helper';

const map = {};

let initialized = false;
let charArray = [];
let activeBranches = [];
let currentBranch = []; // to do branch currentBranch
let wordsFound = [];
let startPosition = null;
let refPosition = null;
let refAngle = null;
let lastBranchedChar = null;

export const load = ()=>{
	initialized = false;
	return new Promise((resolve, reject)=>{
		if(map[config.language]) return resolve();
		map[config.language] = {};
		const worldListFolder = './wordlist/'
		fetch(`${worldListFolder}${config.language}${'.txt'}`).then(response => response.text())
		.then(data => {
			mapText(data);
			initialized = true;
			resolve();
		})
		.catch(err =>{
			reject(err);
		})
	});
}

const mapText = data =>{
	const words = data.toString().split("\n")
    for(let i = 0; i<words.length; i++) {
		const word = words[i].replace('\r', '');;
		let targetObject = null;
		let previousChar = null;
		const targetLength = Math.min(word.length, config.swipeMaxWordDepth);
		for(let j = 0; j<targetLength; j++){
			const char = word.charAt(j)
			if(char !== previousChar){
				if(targetObject === null){
					if(map[config.language][char] === undefined) map[config.language][char] = {}
					targetObject = map[config.language][char];
				}else{
					if(targetObject[char] === undefined) targetObject[char] = {}
					targetObject = targetObject[char];
				}
			}
			previousChar = char;
			if(j === targetLength-1){
				if(targetObject.words === undefined) targetObject.words = [];
				targetObject.words.push(word);
			}
		}
	}
}

export const move = () => {
	if(!initialized) return;

	if(!startPosition) startPosition = {...state.mousePos};

	const startPosDifference = helper.getDistance(state.mousePos, startPosition);

	if(startPosDifference>config.swipeMinimumDistance*config.resolution){
		state.swipeActive = true;
	}
	pushSwipePoint();

	if(state.activeElement) processAngle();
	pushChar();
}
export const end = () => {
	if(!initialized) return;

	pushChar();
	if(state.swipeActive) getSuggestions();
	reset();
}
const pushChar = () => {
	const key = state.activeElement

	if(!key || charArray[charArray.length-1] === key.char || key.char.length > 2) return;

	charArray.push(key.char);
	resetAngleFinder();
	processChar(key.char);
}
const processChar = char=>{
	if(activeBranches.length === 0){
		const path = map[config.language][char];
		processPath(path);
	}else{
		currentBranch = [];
		activeBranches.forEach(branch =>{
			if(branch){ // just to be sure
				const path = branch[char];
				processPath(path);
			}
		})
	}
}
const processPath = path =>{
	if(!path) return;
	const keys = Object.keys(path).filter(key => key !== 'words');
	if(keys.length>0){
		activeBranches.push(path);
		currentBranch.push(path);
	}
	addWords(path);
}
const addWords = path =>{
	const { words } = path;
	if(words) wordsFound = wordsFound.concat(words);
}

const processAngle = ()=>{
	if(!refPosition){
		refPosition = {...state.mousePos};
		return;
	}

	let activeChar = charArray[charArray.length-1];
	if(lastBranchedChar === activeChar) return;

	const l = helper.getDistance(state.mousePos, refPosition);

	if(l>=config.swipeMinimumVectorLength){
		let a = helper.getAngle(state.mousePos, refPosition);
		if(refAngle){
			// angle difference
			const ad = getAngleDifference(a, refAngle);

			if(Math.abs(ad)>config.swipeMinimumAngleDifference){

				// reset branch
				activeBranches = [...currentBranch];
				currentBranch = [];
				lastBranchedChar = activeChar;
			}
		}
		refAngle = a;
		refPosition = {...state.mousePos};
	}
}
const getAngleDifference = (a,b)=>{
	return Math.atan2(Math.sin(a-b), Math.cos(a-b));
}
const getSuggestions = ()=>{
	const lastChar = charArray[charArray.length-1];
	const suggestions = wordsFound.filter(word=>{
		const lastCharInWord = word.charAt(word.length-1);
		return lastCharInWord === lastChar;
	});
	suggestions.sort(function(a, b){
		return b.length - a.length;
	});
	state.suggestions = suggestions;
}
const resetAngleFinder = ()=>{
	refPosition = null;
	refAngle = null;
	lastBranchedChar = null;
}
const pushSwipePoint = ()=>{
	if(!state.swipeActive) return;

	const lastSwipePoint = state.swipePoints[state.swipePoints.length-1];

	if(lastSwipePoint){
		const nextPointDiff = helper.getDistance(lastSwipePoint, state.mousePos);
		if(nextPointDiff < config.swipeMinimumVectorLength) return;
	}

	state.swipePoints.push({...state.mousePos, t:Date.now()});
}
const reset = ()=>{
	charArray = [];
	activeBranches = [];
	currentBranch = [];
	wordsFound = [];
	startPosition = null;
	resetAngleFinder();
	state.swipeActive = false;
}
