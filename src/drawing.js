import element from './dom'
import {drawSVG} from './svgs'
import * as helper from './helper.js';
import config from './config'
import state from './state';


const ctx = element.getContext('2d');

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
const drawCircleLine = (sx, sy, sr, ex, ey, er, a) =>{
	const angle = helper.getAngle({x:ex, y:ey}, {x:sx,y:sy})+ Math.PI/2;
	ctx.fillStyle = config.colors.down;
	const path = new Path2D();
	path.arc(sx, sy, sr, angle, angle + Math.PI);
	path.arc(ex, ey, er, angle + Math.PI, angle);
	path.closePath();
	ctx.beginPath();
	ctx.fill(path);
	ctx.closePath();
	return ctx;
}
const drawSwipe = ()=>{
	if(state.swipePoints.length>1){

		if(!state.swipeDrawInterval) state.swipeDrawInterval = setInterval(draw, 100);
		for(let i = 1; i<state.swipePoints.length; i++){
			const sp = state.swipePoints[i-1];
			const spProgress = (Date.now()-sp.t) / config.swipeDrawingLifeTime;
			const sr = config.swipeDrawingSize * (1-spProgress);
			const ep = state.swipePoints[i];
			const epProgress = (Date.now()-ep.t) / config.swipeDrawingLifeTime;
			const er = config.swipeDrawingSize * (1-epProgress);
			if(spProgress>=1){
				state.swipePoints.splice(i-1, 1);
				i--;
				continue;
			}
			drawCircleLine(sp.x, sp.y, sr, ep.x, ep.y, er);
		}
	}else if(state.swipeDrawInterval){
		clearInterval(state.swipeDrawInterval);
		state.swipeDrawInterval = null;
	}
}

const draw = ()=>{

	const startY = helper.calculateStartY();

	ctx.clearRect(0, 0, element.width, element.height);

	ctx.shadowBlur = config.keyShadow.shadowBlur;
	ctx.shadowOffsetX = config.keyShadow.shadowOffsetX;
	ctx.shadowOffsetY = config.keyShadow.shadowOffsetY;

	let y = startY;

	// draw keys
	for(let i = 0; i<state.layout.length; i++){
		const row = state.layout[i];
		let x = state.margin + helper.calculateKeyboardOffset()+helper.calculateRowOffset(i);
		for(let j = 0; j<row.length; j++){
			const key = row[j];
			let buttonWidth = key.w ? key.w : 1.0;
			ctx.fillStyle = config.colors.hover;
			if(key.down) ctx.fillStyle = config.colors.down;
			else if(key.hover) ctx.fillStyle = config.colors.hover;
			else ctx.fillStyle = config.colors.idle;

			let widthSize = state.buttonSize*buttonWidth;
			widthSize += (buttonWidth-1)*state.margin;

			ctx.shadowColor = config.keyShadow.shadowColor;
			drawRoundedRectangle(x, y, widthSize, state.buttonHeight, config.buttonRadius*config.resolution);
			ctx.shadowColor = 'transparent';

			ctx.fillStyle = config.colors.text;
			key.pos = {x,y};
			if(['shift', 'bksp', 'enter', 'lang'].includes(key.char)){
				let char = key.char;
				if(key.char === 'shift' && state.shiftDown) char = 'shift_down';
				if(key.char === 'shift' && state.permaShift) char = 'shift_perm';
				drawSVG(ctx, x, y, widthSize, state.buttonHeight, char);
			}else{
				let char = state.shiftDown && key.char.length === 1 ? key.char.toUpperCase() : key.char;
				if(char === 'space') char = '␣';
				drawText(x, y, widthSize, state.buttonHeight, char);

				if(key.alt){
					const fontSize = config.fontSize*0.6*config.resolution;
					drawText(x+widthSize/2-fontSize/2, y-state.buttonHeight/2 + fontSize, widthSize, state.buttonHeight, key.alt, fontSize);
				}

			}
			x += widthSize +state.margin;
		}
		y += state.buttonHeight+state.margin
	}

	ctx.shadowBlur = config.popupShadow.shadowBlur;
	ctx.shadowOffsetX = config.popupShadow.shadowOffsetX;
	ctx.shadowOffsetY = config.popupShadow.shadowOffsetY;

	// draw overlay
	if(state.activeElement && state.activeElement.extra && state.activeElement.down ){
		const {pos} = state.activeElement;

		const {startX, startY, keyArr, popupWidth, popupHeight} = helper.getPopupKeyInfo(pos, state.keyPopup ? [...state.activeElement.extra] : [state.activeElement]);

		ctx.fillStyle = config.colors.idle;

		ctx.shadowColor = config.popupShadow.shadowColor;
		drawRoundedRectangle(startX, startY-state.buttonHeight*(keyArr.length-1), popupWidth, popupHeight, config.buttonRadius*config.resolution);
		drawRoundedRectangle(pos.x, pos.y-state.buttonHeight, state.buttonSize, state.buttonHeight*2, config.buttonRadius*config.resolution);
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
				drawRoundedRectangle(x, y, state.buttonSize, state.buttonHeight, config.buttonRadius*config.resolution);
				ctx.fillStyle = config.colors.text;
				const char = state.shiftDown  && key.char.length <= 2 ? key.char.toUpperCase() : key.char;
				drawText(x, y, state.buttonSize, state.buttonHeight, char);

				if(!state.keyPopup){
					drawText(x, y+state.buttonHeight/2, state.buttonSize, state.buttonHeight/2, '...');
				}

				x+= state.buttonSize;
			}
			y -= state.buttonHeight;
		}
	}

	if(config.swipe) drawSwipe();

	state.textureDirty = true;
}
export default draw;
