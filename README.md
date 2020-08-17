

[![npm version](https://badge.fury.io/js/virtualkeyboard-vr-ready.svg)](https://badge.fury.io/js/virtualkeyboard-vr-ready) Follow me on Twitter:[![Eriks Twitter][1.1]][1]

[1.1]: https://i.imgur.com/tXSoThF.png

[1]: https://www.twitter.com/ErikSombroek

# VirtualKeyboard-VR-Ready

A virtual keyboard heavily inspired by Google's Gboard. Build with WebXR/VR in mind.

## Examples:

-  ### [Standalone](https://eriksom.github.io/VirtualKeyboard-VR-Ready/simple)

-  ### [ThreeJS - Mouse](https://eriksom.github.io/VirtualKeyboard-VR-Ready/threejs)

-  ### [ThreeJS - VR](https://eriksom.github.io/VirtualKeyboard-VR-Ready/threejs-vr)

## NPM Install

    npm install virtualkeyboard-vr-ready

## Usage
    import * as VRKeyboard from 'virtualkeyboard-vr-ready'
	// optionally you could grab the vrkeyboard.umd.js (build folder) and attach it to your HTML and access the VRKeyboard with window.VRKeyboard.

## Documentation

### Methods

#### init(config);

Example configuration (all fields are optional):

    var config = {
		resolution:1.0,
		aspect: 1/0.8,
		margin:5,
		fontSize:16,
		buttonHeight: 40,
		buttonRadius: 5,
		language:'en', // the default language
		font:'sans-serif',
		align: 'center', // center or bottom
		colors:{
			idle:"#3f4a52",
			hover:"#2d343a",
			down:"#5cb0a7",
			text:"#ffffff",
		},
		keyShadow:{
			shadowColor:"rgba(0, 0, 0, .3)",
			shadowBlur:1,
			shadowOffsetX:1,
			shadowOffsetY:1,
		},
		popupShadow:{
			shadowColor:"rgba(0, 0, 0, .3)",
			shadowBlur:4,
			shadowOffsetX:0,
			shadowOffsetY:2,
		},
		holdPopupTime:300, // the time it takes for the hold popup to show
		bkspIntervalTime:50, // the interval between backspaces when the backspace is pressed
    }

#### selectLanguage(language)

language:string

selects the keyboard language, available options: 'en', 'ru'

#### setLayout(name)

name:string

selects the keyboard layout, available options: 'num', 'nump', 'sym'


#### setMouseDown(down, [x], [y])

down: boolean

[optional] x: number

[optional] y: number

Sets the mouse down state, and optionally also sets the position


#### setMousePosFromUV(x, y)

x: number between 0 - 1

y: number between 0 - 1

Sets the mouse position based on a UV


#### setScreenSizeInPixels(width, height, devicePixelRatio)

width: number

height: number

devicePixelRatio: number

Sets the width and height of the render canvas + the resolution based on the devicePixelRatio

* if the provided height is smaller then the minimum height required the minimum height will be set


#### setScreenSizeFromAspectRatio()

Sets the size from the aspect property provided in the init() function. The setScreenSizeFromAspectRatio() is automatically called on init.


#### setTextureDirty(dirty)

dirty: boolean
Sets the textureDirty property on the VRKeyboard.

#### addListeners()

Adds mouse / touch listeners to the canvas. Only works if the canvas is displayed in the dom. (will not work for ThreeJS)


### Properties

#### textureDirty

textureDirty will be set to true when the image has changed. You need to set textureDirty to false yourself when you update your texture.
