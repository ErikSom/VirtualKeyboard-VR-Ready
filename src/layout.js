import * as helper from './helper.js';
import config from './config'
import element from './dom'
import state from './state'
import draw from './drawing';

export const init = ()=>{
	config.languages.forEach(langName=>{
		const langKey = config.layouts[langName][3][2];
		langKey.extra = [];
		config.languages.forEach(language=>{
			langKey.extra.push({char:language.toUpperCase()})
		});
})
}
export const selectLanguage = lang =>{
	if(config.layouts[lang]){
		state.selectedLanguage = lang;
		setLayout(lang)
	}
}

export const setLayout = name =>{
	state.layout = config.layouts[name];
	state.currentLayout = name;

	state.widthUnits = helper.calculateWidthUnits()
	const totalMargin = (state.widthUnits+1)*state.margin;
	state.buttonSize = (element.width - totalMargin) / state.widthUnits;
	draw();
}

export const setScreenSizeInPixels = (width, height, devicePixelRatio) => {
	config.resolution = devicePixelRatio;
	state.buttonHeight = config.buttonHeight*config.resolution;
	state.margin = config.margin*config.resolution;

	const minimHeight = helper.getMinimumHeight();
	if(height<minimHeight){
		console.warn("[VRKeyboard] The height is to small for the keyboard to render, height is adjusted to fit");
	}

	height = Math.max(height, minimHeight);

	element.width = width*config.resolution;
	element.height = height*config.resolution;

	element.style.width = `${width}px`;
	element.style.height = `${height}px`;

	if(state.currentLayout) setLayout(state.currentLayout);
}

export const setScreenSizeFromAspectRatio = () =>{
	element.width = config.resolution*512;
	element.height = element.width/config.aspect;
	state.margin = config.margin*config.resolution;
	state.buttonHeight = config.buttonHeight*config.resolution;
	if(state.currentLayout) setLayout(state.currentLayout);
}
