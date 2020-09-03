const config = {
	resolution:1.0,
	aspect: 1/0.8,
	margin:5,
	fontSize:16,
	buttonHeight: 40,
	buttonRadius: 5,
	language:'en',
	languages:['en', 'fr', 'es', 'ru'],
	font:'sans-serif',
	align: 'center',
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
	holdPopupTime:300,
	bkspIntervalTime:50,
	shiftDoubleTapTimeout:300,

	// swipe settings
	swipe:true,
	swipeMinimumVectorLength:2,
	swipeMinimumAngleDifference:Math.PI/4, // 30 degree
	swipeMinimumDistance:20,
	swipeDrawingLifeTime:500,
	swipeIdleDrawInterval:50,
	swipeDrawingSize:6,
	swipeMaxWordDepth:8, // depth of 8 generates ~40mb of memory, and has a max word array lengt of 136. Depth of 7 has a max word array length of 603. 8 felt optimal.
	swipeLoadingFontSize:12,
	suggestionCrawlStep:100,

	layouts: {
		'en':[
			[{char:'q', extra:[{char:'1'}], alt:'1'},{char:'w', extra:[{char:'2'}], alt:'2'},{char:'e', extra:[{char:'è'},{char:'3'},{char:'é'},{char:'ê'},{char:'ę'},{char:'ë'},{char:'ē'},{char:'ė'}], alt:'3'},{char:'r', extra:[{char:'4'}], alt:'4'},{char:'t', extra:[{char:'5'}], alt:'5'},{char:'y', extra:[{char:'ý'},{char:'6'},{char:'ĳ'},{char:'ÿ'}], alt:'6'},{char:'u', extra:[{char:'û'},{char:'7'},{char:'ú'},{char:'ū'},{char:'ü'},{char:'ù'}], alt:'7'},{char:'i', extra:[{char:'î'},{char:'8'},{char:'í'},{char:'ï'},{char:'į'},{char:'ī'},{char:'ì'},{char:'ĳ'}], alt:'8'},{char:'o', extra:[{char:'ò'},{char:'ö'},{char:'ô'},{char:'9'},{char:'ó'},{char:'õ'},{char:'ō'},{char:'œ'},{char:'ø'}], alt:'9'},{char:'p', extra:[{char:'0'}], alt:'0'}],
			[{char:'a', extra:[{char:'à'},{char:'á'},{char:'â'},{char:'ä'},{char:'æ'},{char:'ã'},{char:'å'},{char:'ā'}, {char:'ª'}]},{char:'s', extra:[{char:'ß'}]},{char:'d'},{char:'f'},{char:'g'},{char:'h'},{char:'j', extra:[{char:'j́'}]},{char:'k'},{char:'l'}],
			[{char:'shift', w:1.5},{char:'z'},{char:'x'},{char:'c', extra:[{char:'ç'}]},{char:'v'},{char:'b'},{char:'n', extra:[{char:'ñ'},{char:'ń'}]},{char:'m'},{char:'bksp', w:1.5}],
			[{char:'?123', w:2},{char:','},{char:'lang'},{char:'space', w:3},{char:'.'},{char:'enter', w:2}],
		],
		'fr':[
			[{char:'a', extra:[{char:'à'},{char:'á'},{char:'1'},{char:'â'},{char:'ä'},{char:'æ'},{char:'ã'},{char:'å'},{char:'ā'}, {char:'ª'}], alt:'1'},{char:'z', extra:[{char:'2'}], alt:'2'},{char:'e', extra:[{char:'è'},{char:'3'},{char:'é'},{char:'ê'},{char:'ę'},{char:'ë'},{char:'ē'},{char:'ė'}], alt:'3'},{char:'r', extra:[{char:'4'}], alt:'4'},{char:'t', extra:[{char:'5'}], alt:'5'},{char:'y', extra:[{char:'ý'},{char:'6'},{char:'ĳ'},{char:'ÿ'}], alt:'6'},{char:'u', extra:[{char:'û'},{char:'7'},{char:'ú'},{char:'ū'},{char:'ü'},{char:'ù'}], alt:'7'},{char:'i', extra:[{char:'î'},{char:'8'},{char:'í'},{char:'ï'},{char:'į'},{char:'ī'},{char:'ì'},{char:'ĳ'}], alt:'8'},{char:'o', extra:[{char:'ò'},{char:'ö'},{char:'ô'},{char:'9'},{char:'ó'},{char:'õ'},{char:'ō'},{char:'œ'},{char:'ø'}], alt:'9'},{char:'p', extra:[{char:'0'}], alt:'0'}],
			[{char:'q',},{char:'s', extra:[{char:'ß'}]},{char:'d'},{char:'f'},{char:'g'},{char:'h'},{char:'j', extra:[{char:'j́'}]},{char:'k'},{char:'l'},{char:'m'}],
			[{char:'shift', w:1.5},{char:'w'},{char:'x'},{char:'c', extra:[{char:'ç'}]},{char:'v'},{char:'b'},{char:'n', extra:[{char:'ñ'},{char:'ń'}]},{char:"'", extra:[{char:'‚'},{char:'‘'},{char:'’'},{char:'‹'},{char:'›'}]},{char:'bksp', w:1.5}],
			[{char:'?123', w:2},{char:','},{char:'lang'},{char:'space', w:3},{char:'.'},{char:'enter', w:2}],
		],
		'es':[
			[{char:'q', extra:[{char:'1'}], alt:'1'},{char:'w', extra:[{char:'2'}], alt:'2'},{char:'e', extra:[{char:'è'},{char:'3'},{char:'é'},{char:'ê'},{char:'ę'},{char:'ë'},{char:'ē'},{char:'ė'}], alt:'3'},{char:'r', extra:[{char:'4'}], alt:'4'},{char:'t', extra:[{char:'5'}], alt:'5'},{char:'y', extra:[{char:'ý'},{char:'6'},{char:'ĳ'},{char:'ÿ'}], alt:'6'},{char:'u', extra:[{char:'û'},{char:'7'},{char:'ú'},{char:'ū'},{char:'ü'},{char:'ù'}], alt:'7'},{char:'i', extra:[{char:'î'},{char:'8'},{char:'í'},{char:'ï'},{char:'į'},{char:'ī'},{char:'ì'},{char:'ĳ'}], alt:'8'},{char:'o', extra:[{char:'ò'},{char:'ö'},{char:'ô'},{char:'9'},{char:'ó'},{char:'õ'},{char:'ō'},{char:'œ'},{char:'ø'}], alt:'9'},{char:'p', extra:[{char:'0'}], alt:'0'}],
			[{char:'a', extra:[{char:'à'},{char:'á'},{char:'â'},{char:'ä'},{char:'æ'},{char:'ã'},{char:'å'},{char:'ā'}, {char:'ª'}]},{char:'s', extra:[{char:'ß'}]},{char:'d'},{char:'f'},{char:'g'},{char:'h'},{char:'j', extra:[{char:'j́'}]},{char:'k'},{char:'l'}, {char:'ñ'}],
			[{char:'shift', w:1.5},{char:'z'},{char:'x'},{char:'c', extra:[{char:'ç'}]},{char:'v'},{char:'b'},{char:'n', extra:[{char:'ñ'},{char:'ń'}]},{char:'m'},{char:'bksp', w:1.5}],
			[{char:'?123', w:2},{char:','},{char:'lang'},{char:'space', w:3},{char:'.'},{char:'enter', w:2}],
		],
		'ru':[
			[{char:'й', extra:[{char:'1'}], alt:'1'},{char:'ц', extra:[{char:'2'}], alt:'2'},{char:'у', extra:[{char:'3'}, {char:'у́'}], alt:'3'},{char:'к', extra:[{char:'4'}], alt:'4'},{char:'е', extra:[{char:'е́'},{char:'5'},{char:'ё'}], alt:'5'},{char:'н', extra:[{char:'6'}], alt:'6'},{char:'г', extra:[{char:'7'}, {char:'ґ'}], alt:'7'},{char:'ш', extra:[{char:'8'}], alt:'8'},{char:'щ', extra:[{char:'9'}], alt:'9'},{char:'з', extra:[{char:'0'}], alt:'0'},{char:'х'}],
			[{char:'ф'},{char:'ы', extra:[{char:'ы́'}]},{char:'в'},{char:'а', extra:[{char:'а́'}]},{char:'п'},{char:'р'},{char:'о', extra:[{char:'о́'}]},{char:'л'},{char:'д'},{char:'ж'},{char:'э', extra:[{char:'є'},{char:'э́'}]}],
			[{char:'shift'},{char:'я', extra:[{char:'я́'}]},{char:'ч'},{char:'с'},{char:'м'},{char:'и', extra:[{char:'ї'},{char:'и́'},{char:'і'}]},{char:'т'},{char:'ь', extra:[{char:'ъ'}]},{char:'б'},{char:'ю', extra:[{char:'ю́'}]},{char:'bksp'}],
			[{char:'?123', w:2},{char:','},{char:'lang'},{char:'space', w:4},{char:'.'},{char:'enter', w:2}],
		],
		'num':[
			[{char:'1', extra:[{char:'¹'},{char:'½'},{char:'⅓'},{char:'¼'},{char:'⅕'},{char:'⅙'},{char:'⅐'},{char:'⅛'},{char:'⅑'},{char:'⅒'}]},{char:'2', extra:[{char:'⅖'},{char:'²'},{char:'⅔'}]},{char:'3', extra:[{char:'⅗'},{char:'³'},{char:'¾'},{char:'⅜'}]},{char:'4', extra:[{char:'⁴'},{char:'⅘'}]},{char:'5', extra:[{char:'⅝'},{char:'⁵'},{char:'⅚'}]},{char:'6', extra:[{char:'⁶'}]},{char:'7', extra:[{char:'⁷'},{char:'⅞'}]},{char:'8', extra:[{char:'⁸'}]},{char:'9', extra:[{char:'⁹'}]},{char:'0', extra:[{char:'∅'},{char:'ⁿ'},{char:'⁰'}]}],
			[{char:'@'},{char:'#',extra:[{char:'№'}]},{char:'$', extra:[{char:'₱'},{char:'€'},{char:'¢'},{char:'£'},{char:'¥'}]},{char:'_'},{char:'&'},{char:'-', extra:[{char:'—'},{char:'_'},{char:'–'},{char:'·'}]},{char:'+', extra:[{char:'±'}]},{char:'(',extra:[{char:'['},{char:'<'},{char:'{'}]},{char:')', extra:[{char:']'},{char:'>'},{char:'}'}]},{char:'/'}],
			[{char:'=\\<', w:1.5},{char:'*', extra:[{char:'★'},{char:'†'},{char:'‡'}]},{char:'"', extra:[{char:'„'},{char:'“'},{char:'”'},{char:'«'},{char:'»'}]},{char:"'", extra:[{char:'‚'},{char:'‘'},{char:'’'},{char:'‹'},{char:'›'}]},{char:':'},{char:';'},{char:'!', extra:[{char:'¡'}]},{char:'?', extra:[{char:'¿'}, {char:'‽'}]},{char:'bksp', w:1.5}],
			[{char:'abc', w:1.50},{char:','},{char:'1234'},{char:'space', w:4},{char:'.'},{char:'enter', w:1.5}],
		],
		'nump':[
			[{char:'+', extra:[{char:'-'}]},{char:'1', w:2},{char:'2', w:2},{char:'3', w:2},{char:'%'}],
			[{char:'*'},{char:'4', w:2},{char:'5', w:2},{char:'6', w:2},{char:'space'}],
			[{char:'/'},{char:'7', w:2},{char:'8', w:2},{char:'9', w:2},{char:'bksp'}],
			[{char:'abc'},{char:','},{char:'!?#'},{char:'0', w:2},{char:'='} ,{char:'.'},{char:'enter'}],
		],
		'sym':[
			[{char:'〜'},{char:'`'},{char:'|'},{char:'•', extra:[{char:'♣'},{char:'♠'},{char:'♪'},{char:'♥'},{char:'♦'}]},{char:'√'},{char:'π', extra:[{char:'Ω'},{char:'Π'},{char:'μ'}]},{char:'÷'},{char:'×'},{char:'¶', extra:['§']},{char:'Δ'}],
			[{char:'£'},{char:'€'},{char:'$', extra:[{char:'₱'},{char:'€'},{char:'¢'},{char:'£'},{char:'¥'}]},{char:'¢'},{char:'^', extra:[{char:'←'},{char:'↑'},{char:'↓'},{char:'→'}]},{char:'°', extra:[{char:'′'},{char:'″'}]},{char:'=', extra:[{char:'∞'},{char:'≠'},{char:'≈'}]},{char:'{', extra:[{char:'('}]},{char:'}', extra:[{char:')'}]},{char:'\\'}],
			[{char:'?123', w:1.5},{char:'%', extra:[{char:'‰'},{char:'℅'}]},{char:'©'},{char:'®'},{char:'™'},{char:'✓'},{char:'['},{char:']'},{char:'bksp', w:1.5}],
			[{char:'abc', w:1.50},{char:'<'},{char:'space', w:5},{char:'>'},{char:'enter', w:1.50}],
		],
	}
}


export default config;
