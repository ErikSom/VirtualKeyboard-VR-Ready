import config from './config'
import state from "./state";
import * as helper from './helper';
import stringSimilarity from 'string-similarity';
import draw from './drawing';

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
let crawlProgress = 0;
let crawlTimeout = null;
let currentXHR = null;


export const load = ()=>{
	initialized = false;
	if(map[state.selectedLanguage] !== undefined){
		return loadingFinished();
	}
	state.swipeLoadingProgress = 0;
	const worldListFolder = './wordlist/'

	if(currentXHR) currentXHR.abort();
	currentXHR = new XMLHttpRequest();
	currentXHR.open('GET', `${worldListFolder}${state.selectedLanguage}${'.txt'}`, true);
	currentXHR.responseType = 'text';
	currentXHR.onload = function () {
		if (currentXHR.readyState === currentXHR.DONE) {
			if (currentXHR.status === 200) {
				map[state.selectedLanguage] = {};
				mapText(currentXHR.responseText);
				loadingFinished();
			}
		}
	};
	currentXHR.onprogress = function (event) {
		state.swipeLoadingProgress = event.loaded/event.total;
		draw();
	};
	reset();
	currentXHR.send(null);
}
const loadingFinished = ()=>{
	state.swipeLoadingProgress = 1.0;
	initialized = true;
	draw();
}

const mapText = data =>{
	buildSpecialCharacterMap();

	const words = data.toString().split("\n")
    for(let i = 0; i<words.length; i++) {
		const word = words[i].replace('\r', '');
		if(word.length === 1) continue;
		let targetObject = null;
		let previousChar = null;
		const targetLength = Math.min(word.length, config.swipeMaxWordDepth);
		for(let j = 0; j<targetLength; j++){
			const char = getCorrectChar(word.charAt(j));
			if(char !== previousChar){
				if(targetObject === null){
					if(map[state.selectedLanguage][char] === undefined) map[state.selectedLanguage][char] = {}
					targetObject = map[state.selectedLanguage][char];
				}else{
					if(targetObject[char] === undefined) targetObject[char] = {}
					targetObject = targetObject[char];
				}
			}
			if(j === 0){
				if(targetObject.allWords === undefined) targetObject.allWords = [];
				targetObject.allWords.push(word);
			}
			if(j === targetLength-1){
				if(targetObject.words === undefined) targetObject.words = [];
				targetObject.words.push(word);
			}
			previousChar = char;
		}
	}
}
const buildSpecialCharacterMap = ()=>{
	map[state.selectedLanguage].specialCharacterMap = {};
	const { specialCharacterMap } = map[state.selectedLanguage];
	state.layout.forEach(row=>{
		row.forEach(key=>{
			if(key.char.length <= 2 && key.extra){
				key.extra.forEach(extraKey => {
					specialCharacterMap[extraKey.char] = key.char;
				})
			}
		});
	})
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

	if(state.swipeActive){
		getSwipeSuggestions();
		state.uninterruptedString = '';
	}
	else getSuggestions(state.uninterruptedString);
	reset();
}
const getCorrectChar = char =>{
	let correctChar = map[state.selectedLanguage].specialCharacterMap[char];
	if(correctChar !== undefined){
		 return correctChar;
	}
	return char;
}
const pushChar = () => {
	const key = state.activeElement;

	if(!key) return;

	const char = getCorrectChar(key.char);
	if(charArray[charArray.length-1] === char || char.length > 2) return;

	charArray.push(char);
	resetAngleFinder();
	processChar(char);
}
const processChar = char=>{
	if(activeBranches.length === 0){
		const path = map[state.selectedLanguage][char];
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
const getSwipeSuggestions = ()=>{
	const lastChar = charArray[charArray.length-1];
	// filter for words that match the last letter pressed
	let suggestions = wordsFound.filter(word=>{
		const lastCharInWord = getCorrectChar(word.charAt(word.length-1));
		return lastCharInWord === lastChar;
	});
	// sort by unique characters
	suggestions.sort(function(a, b){
		return helper.uniqueCharacters(b).length - helper.uniqueCharacters(a).length;
	});
	// deduplicate
	suggestions = suggestions.filter((v, i, a) => a.indexOf(v) === i);
	setSuggestions(suggestions);
}

const getSuggestions = (str, started = false, previousBatch = []) => {
	if(!started) resetCrawl();
	if(str === ''){
		state.suggestions = [];
		return;
	}
	const firstChar = getCorrectChar(str.charAt(0));

	const firstCharList = map[state.selectedLanguage][firstChar];

	if(!firstCharList || !firstCharList.allWords){
		state.suggestions = [];
		return;
	}

	const wordList = firstCharList.allWords;

	const slicedWordList = wordList.slice(crawlProgress, crawlProgress+config.suggestionCrawlStep);
	let batch;
	if(wordList){
		batch = stringSimilarity.findBestMatch(str, slicedWordList).ratings;
		batch.sort((a, b) => b.rating-a.rating);
		batch = batch.slice(0, 4).filter(s=>s.target!==str); // we take 1 extra because it could include str
		// mix in the previous batch
		batch = batch.concat(previousBatch);
		batch.sort((a, b) => b.rating-a.rating);
		batch = batch.slice(0, 3);
	}
	crawlProgress += config.suggestionCrawlStep;
	if(crawlProgress<wordList.length){
		// prevent blocking the javascript thread
		crawlTimeout = setTimeout(()=>{getSuggestions(str, true, batch)}, 0);
	}else{
		setSuggestions(batch.map(s=>s.target));
		draw();
	}
}

const setSuggestions = suggestions =>{
	state.suggestions = suggestions.map(suggestion=>({char:suggestion, suggestion:true}));
}
export const resetSuggestions = ()=>{
	state.suggestions = [];
	state.uninterruptedString = '';
}
const resetAngleFinder = ()=>{
	refPosition = null;
	refAngle = null;
	lastBranchedChar = null;
}
const resetCrawl = ()=>{
	crawlProgress = 0;
	clearTimeout(crawlTimeout);
	crawlTimeout = null;
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
}
