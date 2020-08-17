export const languages = ['en', 'fr', 'es', 'ru'];

export const layouts = {
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
languages.forEach(langName=>{
	const langKey = layouts[langName][3][2];
	langKey.extra = [];
	languages.forEach(language=>{
		langKey.extra.push({char:language.toUpperCase()})
	});
})
