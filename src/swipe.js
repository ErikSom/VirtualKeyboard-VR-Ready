const map = {};

let initialized = false;
const minimumVectorLength = 2;
const minimumAngleDifference = Math.PI/4; // 30 degree
let language;
let charArray = [];
let activeBranches = [];
let currentBranch = []; // to do branch currentBranch
let wordsFound = [];
let refPosition = null;
let refAngle = null;
let lastBranchedChar = null;

export const load = lang=>{
	language = lang;
	initialized = false;
	return new Promise((resolve, reject)=>{
		if(map[language]) return resolve();
		map[language] = {};
		const worldListFolder = './wordlist/'
		fetch(`${worldListFolder}${lang}${'.txt'}`).then(response => response.text())
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
	const maxDepth = 8; // depth of 8 generates ~40mb of memory, and has a max word array lengt of 136. Depth of 7 has a max word array length of 603. 8 felt optimal.
	const words = data.toString().split("\n")
    for(let i = 0; i<words.length; i++) {
		const word = words[i].replace('\r', '');;
		let targetObject = null;
		let previousChar = null;
		const targetLength = Math.min(word.length, maxDepth);
		for(let j = 0; j<targetLength; j++){
			const char = word.charAt(j)
			if(char !== previousChar){
				if(targetObject === null){
					if(map[language][char] === undefined) map[language][char] = {}
					targetObject = map[language][char];
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

export const move = (key, x, y) => {
	if(initialized){
		if(key) processAngle(x, y);
		pushChar(key);
	}
}
export const end = key => {
	if(initialized){
		pushChar(key);
		const suggestions = getSuggestions();
		reset();
		return suggestions;
	}
	return [];
}
const pushChar = (key, x, y) => {
	if(key && charArray[charArray.length-1] !== key.char && key.char.length <= 2 ){
		charArray.push(key.char);
		resetAngleFinder();
		processChar(key.char);
	}
}
const processChar = char=>{
	if(activeBranches.length === 0){
		const path = map[language][char];
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
	return wordsFound
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

const processAngle = (x, y)=>{
	let activeChar = charArray[charArray.length-1];
	if(refPosition && lastBranchedChar !== activeChar){
		const dx = x-refPosition.x;
		const dy = y-refPosition.y;
		const l = Math.sqrt(dx*dx+dy*dy);
		if(l>=minimumVectorLength){
			let a = Math.atan2(dy, dx);
			if(refAngle){
				// angle difference
				const ad = getAngleDifference(a, refAngle);

				if(Math.abs(ad)>minimumAngleDifference){
					// reset branch
					activeBranches = [...currentBranch];
					currentBranch = [];
					lastBranchedChar = activeChar;
				}
			}
			refAngle = a;
			refPosition = {x, y};
		}
	}
	if(!refPosition) refPosition = {x, y};
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
	return suggestions;
}
const resetAngleFinder = ()=>{
	refPosition = null;
	refAngle = null;
	lastBranchedChar = null;
}
const reset = ()=>{
	charArray = [];
	activeBranches = [];
	currentBranch = [];
	wordsFound = [];
	resetAngleFinder();
}
