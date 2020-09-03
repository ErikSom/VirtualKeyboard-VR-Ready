(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.VRKeyboard = {}));
}(this, (function (exports) { 'use strict';

	const config = {
	  resolution: 1.0,
	  aspect: 1 / 0.8,
	  margin: 5,
	  fontSize: 16,
	  buttonHeight: 40,
	  buttonRadius: 5,
	  language: 'en',
	  languages: ['en', 'fr', 'es', 'ru'],
	  font: 'sans-serif',
	  align: 'center',
	  colors: {
	    idle: "#3f4a52",
	    hover: "#2d343a",
	    down: "#5cb0a7",
	    text: "#ffffff"
	  },
	  keyShadow: {
	    shadowColor: "rgba(0, 0, 0, .3)",
	    shadowBlur: 1,
	    shadowOffsetX: 1,
	    shadowOffsetY: 1
	  },
	  popupShadow: {
	    shadowColor: "rgba(0, 0, 0, .3)",
	    shadowBlur: 4,
	    shadowOffsetX: 0,
	    shadowOffsetY: 2
	  },
	  holdPopupTime: 300,
	  bkspIntervalTime: 50,
	  shiftDoubleTapTimeout: 300,
	  // swipe settings
	  swipe: true,
	  swipeMinimumVectorLength: 2,
	  swipeMinimumAngleDifference: Math.PI / 4,
	  // 30 degree
	  swipeMinimumDistance: 20,
	  swipeDrawingLifeTime: 500,
	  swipeIdleDrawInterval: 50,
	  swipeDrawingSize: 6,
	  swipeMaxWordDepth: 8,
	  // depth of 8 generates ~40mb of memory, and has a max word array lengt of 136. Depth of 7 has a max word array length of 603. 8 felt optimal.
	  swipeLoadingFontSize: 12,
	  suggestionCrawlStep: 100,
	  layouts: {
	    'en': [[{
	      char: 'q',
	      extra: [{
	        char: '1'
	      }],
	      alt: '1'
	    }, {
	      char: 'w',
	      extra: [{
	        char: '2'
	      }],
	      alt: '2'
	    }, {
	      char: 'e',
	      extra: [{
	        char: 'è'
	      }, {
	        char: '3'
	      }, {
	        char: 'é'
	      }, {
	        char: 'ê'
	      }, {
	        char: 'ę'
	      }, {
	        char: 'ë'
	      }, {
	        char: 'ē'
	      }, {
	        char: 'ė'
	      }],
	      alt: '3'
	    }, {
	      char: 'r',
	      extra: [{
	        char: '4'
	      }],
	      alt: '4'
	    }, {
	      char: 't',
	      extra: [{
	        char: '5'
	      }],
	      alt: '5'
	    }, {
	      char: 'y',
	      extra: [{
	        char: 'ý'
	      }, {
	        char: '6'
	      }, {
	        char: 'ĳ'
	      }, {
	        char: 'ÿ'
	      }],
	      alt: '6'
	    }, {
	      char: 'u',
	      extra: [{
	        char: 'û'
	      }, {
	        char: '7'
	      }, {
	        char: 'ú'
	      }, {
	        char: 'ū'
	      }, {
	        char: 'ü'
	      }, {
	        char: 'ù'
	      }],
	      alt: '7'
	    }, {
	      char: 'i',
	      extra: [{
	        char: 'î'
	      }, {
	        char: '8'
	      }, {
	        char: 'í'
	      }, {
	        char: 'ï'
	      }, {
	        char: 'į'
	      }, {
	        char: 'ī'
	      }, {
	        char: 'ì'
	      }, {
	        char: 'ĳ'
	      }],
	      alt: '8'
	    }, {
	      char: 'o',
	      extra: [{
	        char: 'ò'
	      }, {
	        char: 'ö'
	      }, {
	        char: 'ô'
	      }, {
	        char: '9'
	      }, {
	        char: 'ó'
	      }, {
	        char: 'õ'
	      }, {
	        char: 'ō'
	      }, {
	        char: 'œ'
	      }, {
	        char: 'ø'
	      }],
	      alt: '9'
	    }, {
	      char: 'p',
	      extra: [{
	        char: '0'
	      }],
	      alt: '0'
	    }], [{
	      char: 'a',
	      extra: [{
	        char: 'à'
	      }, {
	        char: 'á'
	      }, {
	        char: 'â'
	      }, {
	        char: 'ä'
	      }, {
	        char: 'æ'
	      }, {
	        char: 'ã'
	      }, {
	        char: 'å'
	      }, {
	        char: 'ā'
	      }, {
	        char: 'ª'
	      }]
	    }, {
	      char: 's',
	      extra: [{
	        char: 'ß'
	      }]
	    }, {
	      char: 'd'
	    }, {
	      char: 'f'
	    }, {
	      char: 'g'
	    }, {
	      char: 'h'
	    }, {
	      char: 'j',
	      extra: [{
	        char: 'j́'
	      }]
	    }, {
	      char: 'k'
	    }, {
	      char: 'l'
	    }], [{
	      char: 'shift',
	      w: 1.5
	    }, {
	      char: 'z'
	    }, {
	      char: 'x'
	    }, {
	      char: 'c',
	      extra: [{
	        char: 'ç'
	      }]
	    }, {
	      char: 'v'
	    }, {
	      char: 'b'
	    }, {
	      char: 'n',
	      extra: [{
	        char: 'ñ'
	      }, {
	        char: 'ń'
	      }]
	    }, {
	      char: 'm'
	    }, {
	      char: 'bksp',
	      w: 1.5
	    }], [{
	      char: '?123',
	      w: 2
	    }, {
	      char: ','
	    }, {
	      char: 'lang'
	    }, {
	      char: 'space',
	      w: 3
	    }, {
	      char: '.'
	    }, {
	      char: 'enter',
	      w: 2
	    }]],
	    'fr': [[{
	      char: 'a',
	      extra: [{
	        char: 'à'
	      }, {
	        char: 'á'
	      }, {
	        char: '1'
	      }, {
	        char: 'â'
	      }, {
	        char: 'ä'
	      }, {
	        char: 'æ'
	      }, {
	        char: 'ã'
	      }, {
	        char: 'å'
	      }, {
	        char: 'ā'
	      }, {
	        char: 'ª'
	      }],
	      alt: '1'
	    }, {
	      char: 'z',
	      extra: [{
	        char: '2'
	      }],
	      alt: '2'
	    }, {
	      char: 'e',
	      extra: [{
	        char: 'è'
	      }, {
	        char: '3'
	      }, {
	        char: 'é'
	      }, {
	        char: 'ê'
	      }, {
	        char: 'ę'
	      }, {
	        char: 'ë'
	      }, {
	        char: 'ē'
	      }, {
	        char: 'ė'
	      }],
	      alt: '3'
	    }, {
	      char: 'r',
	      extra: [{
	        char: '4'
	      }],
	      alt: '4'
	    }, {
	      char: 't',
	      extra: [{
	        char: '5'
	      }],
	      alt: '5'
	    }, {
	      char: 'y',
	      extra: [{
	        char: 'ý'
	      }, {
	        char: '6'
	      }, {
	        char: 'ĳ'
	      }, {
	        char: 'ÿ'
	      }],
	      alt: '6'
	    }, {
	      char: 'u',
	      extra: [{
	        char: 'û'
	      }, {
	        char: '7'
	      }, {
	        char: 'ú'
	      }, {
	        char: 'ū'
	      }, {
	        char: 'ü'
	      }, {
	        char: 'ù'
	      }],
	      alt: '7'
	    }, {
	      char: 'i',
	      extra: [{
	        char: 'î'
	      }, {
	        char: '8'
	      }, {
	        char: 'í'
	      }, {
	        char: 'ï'
	      }, {
	        char: 'į'
	      }, {
	        char: 'ī'
	      }, {
	        char: 'ì'
	      }, {
	        char: 'ĳ'
	      }],
	      alt: '8'
	    }, {
	      char: 'o',
	      extra: [{
	        char: 'ò'
	      }, {
	        char: 'ö'
	      }, {
	        char: 'ô'
	      }, {
	        char: '9'
	      }, {
	        char: 'ó'
	      }, {
	        char: 'õ'
	      }, {
	        char: 'ō'
	      }, {
	        char: 'œ'
	      }, {
	        char: 'ø'
	      }],
	      alt: '9'
	    }, {
	      char: 'p',
	      extra: [{
	        char: '0'
	      }],
	      alt: '0'
	    }], [{
	      char: 'q'
	    }, {
	      char: 's',
	      extra: [{
	        char: 'ß'
	      }]
	    }, {
	      char: 'd'
	    }, {
	      char: 'f'
	    }, {
	      char: 'g'
	    }, {
	      char: 'h'
	    }, {
	      char: 'j',
	      extra: [{
	        char: 'j́'
	      }]
	    }, {
	      char: 'k'
	    }, {
	      char: 'l'
	    }, {
	      char: 'm'
	    }], [{
	      char: 'shift',
	      w: 1.5
	    }, {
	      char: 'w'
	    }, {
	      char: 'x'
	    }, {
	      char: 'c',
	      extra: [{
	        char: 'ç'
	      }]
	    }, {
	      char: 'v'
	    }, {
	      char: 'b'
	    }, {
	      char: 'n',
	      extra: [{
	        char: 'ñ'
	      }, {
	        char: 'ń'
	      }]
	    }, {
	      char: "'",
	      extra: [{
	        char: '‚'
	      }, {
	        char: '‘'
	      }, {
	        char: '’'
	      }, {
	        char: '‹'
	      }, {
	        char: '›'
	      }]
	    }, {
	      char: 'bksp',
	      w: 1.5
	    }], [{
	      char: '?123',
	      w: 2
	    }, {
	      char: ','
	    }, {
	      char: 'lang'
	    }, {
	      char: 'space',
	      w: 3
	    }, {
	      char: '.'
	    }, {
	      char: 'enter',
	      w: 2
	    }]],
	    'es': [[{
	      char: 'q',
	      extra: [{
	        char: '1'
	      }],
	      alt: '1'
	    }, {
	      char: 'w',
	      extra: [{
	        char: '2'
	      }],
	      alt: '2'
	    }, {
	      char: 'e',
	      extra: [{
	        char: 'è'
	      }, {
	        char: '3'
	      }, {
	        char: 'é'
	      }, {
	        char: 'ê'
	      }, {
	        char: 'ę'
	      }, {
	        char: 'ë'
	      }, {
	        char: 'ē'
	      }, {
	        char: 'ė'
	      }],
	      alt: '3'
	    }, {
	      char: 'r',
	      extra: [{
	        char: '4'
	      }],
	      alt: '4'
	    }, {
	      char: 't',
	      extra: [{
	        char: '5'
	      }],
	      alt: '5'
	    }, {
	      char: 'y',
	      extra: [{
	        char: 'ý'
	      }, {
	        char: '6'
	      }, {
	        char: 'ĳ'
	      }, {
	        char: 'ÿ'
	      }],
	      alt: '6'
	    }, {
	      char: 'u',
	      extra: [{
	        char: 'û'
	      }, {
	        char: '7'
	      }, {
	        char: 'ú'
	      }, {
	        char: 'ū'
	      }, {
	        char: 'ü'
	      }, {
	        char: 'ù'
	      }],
	      alt: '7'
	    }, {
	      char: 'i',
	      extra: [{
	        char: 'î'
	      }, {
	        char: '8'
	      }, {
	        char: 'í'
	      }, {
	        char: 'ï'
	      }, {
	        char: 'į'
	      }, {
	        char: 'ī'
	      }, {
	        char: 'ì'
	      }, {
	        char: 'ĳ'
	      }],
	      alt: '8'
	    }, {
	      char: 'o',
	      extra: [{
	        char: 'ò'
	      }, {
	        char: 'ö'
	      }, {
	        char: 'ô'
	      }, {
	        char: '9'
	      }, {
	        char: 'ó'
	      }, {
	        char: 'õ'
	      }, {
	        char: 'ō'
	      }, {
	        char: 'œ'
	      }, {
	        char: 'ø'
	      }],
	      alt: '9'
	    }, {
	      char: 'p',
	      extra: [{
	        char: '0'
	      }],
	      alt: '0'
	    }], [{
	      char: 'a',
	      extra: [{
	        char: 'à'
	      }, {
	        char: 'á'
	      }, {
	        char: 'â'
	      }, {
	        char: 'ä'
	      }, {
	        char: 'æ'
	      }, {
	        char: 'ã'
	      }, {
	        char: 'å'
	      }, {
	        char: 'ā'
	      }, {
	        char: 'ª'
	      }]
	    }, {
	      char: 's',
	      extra: [{
	        char: 'ß'
	      }]
	    }, {
	      char: 'd'
	    }, {
	      char: 'f'
	    }, {
	      char: 'g'
	    }, {
	      char: 'h'
	    }, {
	      char: 'j',
	      extra: [{
	        char: 'j́'
	      }]
	    }, {
	      char: 'k'
	    }, {
	      char: 'l'
	    }, {
	      char: 'ñ'
	    }], [{
	      char: 'shift',
	      w: 1.5
	    }, {
	      char: 'z'
	    }, {
	      char: 'x'
	    }, {
	      char: 'c',
	      extra: [{
	        char: 'ç'
	      }]
	    }, {
	      char: 'v'
	    }, {
	      char: 'b'
	    }, {
	      char: 'n',
	      extra: [{
	        char: 'ñ'
	      }, {
	        char: 'ń'
	      }]
	    }, {
	      char: 'm'
	    }, {
	      char: 'bksp',
	      w: 1.5
	    }], [{
	      char: '?123',
	      w: 2
	    }, {
	      char: ','
	    }, {
	      char: 'lang'
	    }, {
	      char: 'space',
	      w: 3
	    }, {
	      char: '.'
	    }, {
	      char: 'enter',
	      w: 2
	    }]],
	    'ru': [[{
	      char: 'й',
	      extra: [{
	        char: '1'
	      }],
	      alt: '1'
	    }, {
	      char: 'ц',
	      extra: [{
	        char: '2'
	      }],
	      alt: '2'
	    }, {
	      char: 'у',
	      extra: [{
	        char: '3'
	      }, {
	        char: 'у́'
	      }],
	      alt: '3'
	    }, {
	      char: 'к',
	      extra: [{
	        char: '4'
	      }],
	      alt: '4'
	    }, {
	      char: 'е',
	      extra: [{
	        char: 'е́'
	      }, {
	        char: '5'
	      }, {
	        char: 'ё'
	      }],
	      alt: '5'
	    }, {
	      char: 'н',
	      extra: [{
	        char: '6'
	      }],
	      alt: '6'
	    }, {
	      char: 'г',
	      extra: [{
	        char: '7'
	      }, {
	        char: 'ґ'
	      }],
	      alt: '7'
	    }, {
	      char: 'ш',
	      extra: [{
	        char: '8'
	      }],
	      alt: '8'
	    }, {
	      char: 'щ',
	      extra: [{
	        char: '9'
	      }],
	      alt: '9'
	    }, {
	      char: 'з',
	      extra: [{
	        char: '0'
	      }],
	      alt: '0'
	    }, {
	      char: 'х'
	    }], [{
	      char: 'ф'
	    }, {
	      char: 'ы',
	      extra: [{
	        char: 'ы́'
	      }]
	    }, {
	      char: 'в'
	    }, {
	      char: 'а',
	      extra: [{
	        char: 'а́'
	      }]
	    }, {
	      char: 'п'
	    }, {
	      char: 'р'
	    }, {
	      char: 'о',
	      extra: [{
	        char: 'о́'
	      }]
	    }, {
	      char: 'л'
	    }, {
	      char: 'д'
	    }, {
	      char: 'ж'
	    }, {
	      char: 'э',
	      extra: [{
	        char: 'є'
	      }, {
	        char: 'э́'
	      }]
	    }], [{
	      char: 'shift'
	    }, {
	      char: 'я',
	      extra: [{
	        char: 'я́'
	      }]
	    }, {
	      char: 'ч'
	    }, {
	      char: 'с'
	    }, {
	      char: 'м'
	    }, {
	      char: 'и',
	      extra: [{
	        char: 'ї'
	      }, {
	        char: 'и́'
	      }, {
	        char: 'і'
	      }]
	    }, {
	      char: 'т'
	    }, {
	      char: 'ь',
	      extra: [{
	        char: 'ъ'
	      }]
	    }, {
	      char: 'б'
	    }, {
	      char: 'ю',
	      extra: [{
	        char: 'ю́'
	      }]
	    }, {
	      char: 'bksp'
	    }], [{
	      char: '?123',
	      w: 2
	    }, {
	      char: ','
	    }, {
	      char: 'lang'
	    }, {
	      char: 'space',
	      w: 4
	    }, {
	      char: '.'
	    }, {
	      char: 'enter',
	      w: 2
	    }]],
	    'num': [[{
	      char: '1',
	      extra: [{
	        char: '¹'
	      }, {
	        char: '½'
	      }, {
	        char: '⅓'
	      }, {
	        char: '¼'
	      }, {
	        char: '⅕'
	      }, {
	        char: '⅙'
	      }, {
	        char: '⅐'
	      }, {
	        char: '⅛'
	      }, {
	        char: '⅑'
	      }, {
	        char: '⅒'
	      }]
	    }, {
	      char: '2',
	      extra: [{
	        char: '⅖'
	      }, {
	        char: '²'
	      }, {
	        char: '⅔'
	      }]
	    }, {
	      char: '3',
	      extra: [{
	        char: '⅗'
	      }, {
	        char: '³'
	      }, {
	        char: '¾'
	      }, {
	        char: '⅜'
	      }]
	    }, {
	      char: '4',
	      extra: [{
	        char: '⁴'
	      }, {
	        char: '⅘'
	      }]
	    }, {
	      char: '5',
	      extra: [{
	        char: '⅝'
	      }, {
	        char: '⁵'
	      }, {
	        char: '⅚'
	      }]
	    }, {
	      char: '6',
	      extra: [{
	        char: '⁶'
	      }]
	    }, {
	      char: '7',
	      extra: [{
	        char: '⁷'
	      }, {
	        char: '⅞'
	      }]
	    }, {
	      char: '8',
	      extra: [{
	        char: '⁸'
	      }]
	    }, {
	      char: '9',
	      extra: [{
	        char: '⁹'
	      }]
	    }, {
	      char: '0',
	      extra: [{
	        char: '∅'
	      }, {
	        char: 'ⁿ'
	      }, {
	        char: '⁰'
	      }]
	    }], [{
	      char: '@'
	    }, {
	      char: '#',
	      extra: [{
	        char: '№'
	      }]
	    }, {
	      char: '$',
	      extra: [{
	        char: '₱'
	      }, {
	        char: '€'
	      }, {
	        char: '¢'
	      }, {
	        char: '£'
	      }, {
	        char: '¥'
	      }]
	    }, {
	      char: '_'
	    }, {
	      char: '&'
	    }, {
	      char: '-',
	      extra: [{
	        char: '—'
	      }, {
	        char: '_'
	      }, {
	        char: '–'
	      }, {
	        char: '·'
	      }]
	    }, {
	      char: '+',
	      extra: [{
	        char: '±'
	      }]
	    }, {
	      char: '(',
	      extra: [{
	        char: '['
	      }, {
	        char: '<'
	      }, {
	        char: '{'
	      }]
	    }, {
	      char: ')',
	      extra: [{
	        char: ']'
	      }, {
	        char: '>'
	      }, {
	        char: '}'
	      }]
	    }, {
	      char: '/'
	    }], [{
	      char: '=\\<',
	      w: 1.5
	    }, {
	      char: '*',
	      extra: [{
	        char: '★'
	      }, {
	        char: '†'
	      }, {
	        char: '‡'
	      }]
	    }, {
	      char: '"',
	      extra: [{
	        char: '„'
	      }, {
	        char: '“'
	      }, {
	        char: '”'
	      }, {
	        char: '«'
	      }, {
	        char: '»'
	      }]
	    }, {
	      char: "'",
	      extra: [{
	        char: '‚'
	      }, {
	        char: '‘'
	      }, {
	        char: '’'
	      }, {
	        char: '‹'
	      }, {
	        char: '›'
	      }]
	    }, {
	      char: ':'
	    }, {
	      char: ';'
	    }, {
	      char: '!',
	      extra: [{
	        char: '¡'
	      }]
	    }, {
	      char: '?',
	      extra: [{
	        char: '¿'
	      }, {
	        char: '‽'
	      }]
	    }, {
	      char: 'bksp',
	      w: 1.5
	    }], [{
	      char: 'abc',
	      w: 1.50
	    }, {
	      char: ','
	    }, {
	      char: '1234'
	    }, {
	      char: 'space',
	      w: 4
	    }, {
	      char: '.'
	    }, {
	      char: 'enter',
	      w: 1.5
	    }]],
	    'nump': [[{
	      char: '+',
	      extra: [{
	        char: '-'
	      }]
	    }, {
	      char: '1',
	      w: 2
	    }, {
	      char: '2',
	      w: 2
	    }, {
	      char: '3',
	      w: 2
	    }, {
	      char: '%'
	    }], [{
	      char: '*'
	    }, {
	      char: '4',
	      w: 2
	    }, {
	      char: '5',
	      w: 2
	    }, {
	      char: '6',
	      w: 2
	    }, {
	      char: 'space'
	    }], [{
	      char: '/'
	    }, {
	      char: '7',
	      w: 2
	    }, {
	      char: '8',
	      w: 2
	    }, {
	      char: '9',
	      w: 2
	    }, {
	      char: 'bksp'
	    }], [{
	      char: 'abc'
	    }, {
	      char: ','
	    }, {
	      char: '!?#'
	    }, {
	      char: '0',
	      w: 2
	    }, {
	      char: '='
	    }, {
	      char: '.'
	    }, {
	      char: 'enter'
	    }]],
	    'sym': [[{
	      char: '〜'
	    }, {
	      char: '`'
	    }, {
	      char: '|'
	    }, {
	      char: '•',
	      extra: [{
	        char: '♣'
	      }, {
	        char: '♠'
	      }, {
	        char: '♪'
	      }, {
	        char: '♥'
	      }, {
	        char: '♦'
	      }]
	    }, {
	      char: '√'
	    }, {
	      char: 'π',
	      extra: [{
	        char: 'Ω'
	      }, {
	        char: 'Π'
	      }, {
	        char: 'μ'
	      }]
	    }, {
	      char: '÷'
	    }, {
	      char: '×'
	    }, {
	      char: '¶',
	      extra: ['§']
	    }, {
	      char: 'Δ'
	    }], [{
	      char: '£'
	    }, {
	      char: '€'
	    }, {
	      char: '$',
	      extra: [{
	        char: '₱'
	      }, {
	        char: '€'
	      }, {
	        char: '¢'
	      }, {
	        char: '£'
	      }, {
	        char: '¥'
	      }]
	    }, {
	      char: '¢'
	    }, {
	      char: '^',
	      extra: [{
	        char: '←'
	      }, {
	        char: '↑'
	      }, {
	        char: '↓'
	      }, {
	        char: '→'
	      }]
	    }, {
	      char: '°',
	      extra: [{
	        char: '′'
	      }, {
	        char: '″'
	      }]
	    }, {
	      char: '=',
	      extra: [{
	        char: '∞'
	      }, {
	        char: '≠'
	      }, {
	        char: '≈'
	      }]
	    }, {
	      char: '{',
	      extra: [{
	        char: '('
	      }]
	    }, {
	      char: '}',
	      extra: [{
	        char: ')'
	      }]
	    }, {
	      char: '\\'
	    }], [{
	      char: '?123',
	      w: 1.5
	    }, {
	      char: '%',
	      extra: [{
	        char: '‰'
	      }, {
	        char: '℅'
	      }]
	    }, {
	      char: '©'
	    }, {
	      char: '®'
	    }, {
	      char: '™'
	    }, {
	      char: '✓'
	    }, {
	      char: '['
	    }, {
	      char: ']'
	    }, {
	      char: 'bksp',
	      w: 1.5
	    }], [{
	      char: 'abc',
	      w: 1.50
	    }, {
	      char: '<'
	    }, {
	      char: 'space',
	      w: 5
	    }, {
	      char: '>'
	    }, {
	      char: 'enter',
	      w: 1.50
	    }]]
	  }
	};

	const svgCanvas = document.createElement('canvas');
	const svgCtx = svgCanvas.getContext('2d');
	const svgs = {
	  bksp: '5MTEuMyA2ODMuNSI+PHBhdGggZD0iTTgzNS40IDBIMjY1LjhjLTI2LjIgMC00Ni43IDEzLjMtNjAuNCAzMy40TDAgMzQxLjhsMjA1LjQgMzA4YzEzLjcgMjAuMSAzNC4yIDMzLjggNjAuNCAzMy44aDU2OS42YzQxLjggMCA3NS45LTM0LjIgNzUuOS03NS45Vjc1LjljMC00MS43LTM0LjEtNzUuOS03NS45LTc1Ljl6bTAgNjA3LjZIMjY4LjVMOTEuMSAzNDEuOCAyNjguMSA3Nmg1NjcuM3Y1MzEuNnptLTQ0MC4xLTc2bDEzNi4zLTEzNi4zIDEzNi4zIDEzNi4zIDUzLjUtNTMuNS0xMzYuMi0xMzYuMyAxMzYuMy0xMzYuM0w2NjggMTUyIDUzMS42IDI4OC4yIDM5NS4zIDE1MS45bC01My41IDUzLjUgMTM2LjMgMTM2LjMtMTM2LjMgMTM2LjQgNTMuNSA1My41eiIvPjwvc3ZnPg==',
	  shift: '5MTEuMyA2ODcuNSI+PHBhdGggZD0iTTQ1NS42IDY4Ny41Yy0zMy43IDAtNjUuNC0uMi04OS40LS41LTQ1LjItLjYtNDguMi0xLjQtNTIuOC0yLjgtMTcuMy00LjktMzIuMS0xNy45LTM5LjYtMzQuN2wtNS44LTEyLjgtLjMtMTMwLjctLjItOTFoLTM4LjRjLTQxLjYgMC02MC42IDAtNzIuNC0xLjEtMTQtMS4zLTI5LjYtNS4xLTM5LjQtMjQuMS01LjktMTEuMy05LjUtMjkuNCA3LTUxLjJsLjEtLjJjNi4xLTggMTEzLjEtMTI3LjcgMTQ1LjctMTY0LjIgMzYuNS00MC44IDcwLjYtNzguOSA5Ni4yLTEwNy40QzQxMiAxNS45IDQxMi42IDE1LjQgNDE1LjggMTNsLjUtLjRjNS44LTQuMyAxMy4zLTcuOCAxOC05LjVsLjUtLjJjMTYuOS01LjcgMzcuMi0zLjYgNTMuMSA1LjRsLjEuMWM5LjIgNS4zIDExLjEgNi4zIDE1Ny4xIDE2OS44IDU1LjIgNjEuNyA4OS42IDEwMC41IDExMS44IDEyNS44IDM1LjQgNDAuNCAzNi42IDQyLjkgMzkgNDkuMyA4LjggMjIuOC0uNSA0Ni0yMi44IDU2LjRsLS45LjRjLTExLjUgNC45LTE3LjQgNC45LTg5LjMgNC45SDY0NGwtLjIgOTEtLjQgMTMwLjctNS43IDEyLjdjLTcuNCAxNi44LTIyLjMgMjkuOC0zOS43IDM0LjgtNS4yIDEuNS0xMiAzLjMtMTQyLjQgMy4zek01NzcuOCA2MjNzMCAuMSAwIDB6bS0yNDQuMy0yLjFjMzcuOSAxLjYgMjA2LjYgMS42IDI0NC41IDBsLjMtMTE1IC4zLTE1Ni4yaDEzMWMtMjcuNC0zMS4zLTcxLTgwLjEtMTEzLjUtMTI3LjdDNTE2LjMgMTMyLjggNDY4LjggNzkuOSA0NTUgNjYuMiA0MjcuNiA5NiAyNjUuNSAyNzcuNCAyMDEuNCAzNDkuN2gxMzEuM0wzMzMgNTA2bC41IDExNC45eiIvPjwvc3ZnPg==',
	  shift_perm: '5MTEuMyA4MzMuNCI+PHBhdGggZD0iTTQ1NS41IDY4Ny44Yy0zMy43IDAtNjUuNC0uMi04OS40LS41LTQ1LjItLjYtNDguMi0xLjQtNTIuOC0yLjgtMTcuMy00LjktMzIuMS0xNy45LTM5LjYtMzQuN0wyNjggNjM3bC0uNC0xMzAuNy0uMi05MUgyMjljLTQxLjYgMC02MC42IDAtNzIuNC0xLjEtMTQtMS4zLTI5LjYtNS4xLTM5LjQtMjQuMS01LjktMTEuMy05LjUtMjkuNCA3LTUxLjJsLjEtLjJjNi4xLTggMTEzLjEtMTI3LjcgMTQ1LjctMTY0LjIgMzYuNS00MC44IDcwLjYtNzguOSA5Ni4yLTEwNy40IDQ1LjctNTAuOSA0Ni40LTUxLjQgNDkuNS01My44bC41LS40YzUuOC00LjMgMTMuMy03LjggMTgtOS41bC41LS4yYzE2LjktNS43IDM3LjItMy42IDUzLjEgNS40bC4xLjFDNDk3LjEgMTQgNDk5IDE1IDY0NSAxNzguNWM1NS4yIDYxLjcgODkuNiAxMDAuNSAxMTEuOCAxMjUuOCAzNS40IDQwLjQgMzYuNiA0Mi45IDM5IDQ5LjMgOC44IDIyLjgtLjUgNDYtMjIuOCA1Ni40bC0uOS40Yy0xMS41IDQuOS0xNy40IDQuOS04OS4zIDQuOUg2NDRsLS4yIDkxLS41IDEzMC43LTUuNyAxMi43Yy03LjQgMTYuOC0yMi4zIDI5LjgtMzkuNyAzNC44LTUuMiAxLjUtMTIgMy4zLTE0Mi40IDMuM3ptMTIyLjItNjQuNXMwIC4xIDAgMHoiLz48cGF0aCBkPSJNMzAzLjggNzk3LjRoMzA0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNzIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9zdmc+',
	  shift_down: '5MTEuMyA2ODcuNSI+PHBhdGggZD0iTTQ1NS42IDY4Ny41Yy0zMy43IDAtNjUuNC0uMi04OS40LS41LTQ1LjItLjYtNDguMi0xLjQtNTIuOC0yLjgtMTcuMy00LjktMzIuMS0xNy45LTM5LjYtMzQuN2wtNS44LTEyLjgtLjMtMTMwLjctLjItOTFoLTM4LjRjLTQxLjYgMC02MC42IDAtNzIuNC0xLjEtMTQtMS4zLTI5LjYtNS4xLTM5LjQtMjQuMS01LjktMTEuMy05LjUtMjkuNCA3LTUxLjJsLjEtLjJjNi4xLTggMTEzLjEtMTI3LjcgMTQ1LjctMTY0LjIgMzYuNS00MC44IDcwLjYtNzguOSA5Ni4yLTEwNy40QzQxMiAxNS45IDQxMi42IDE1LjQgNDE1LjggMTNsLjUtLjRjNS44LTQuMyAxMy4zLTcuOCAxOC05LjVsLjUtLjJjMTYuOS01LjcgMzcuMi0zLjYgNTMuMSA1LjRsLjEuMWM5LjIgNS4zIDExLjEgNi4zIDE1Ny4xIDE2OS44IDU1LjIgNjEuNyA4OS42IDEwMC41IDExMS44IDEyNS44IDM1LjQgNDAuNCAzNi42IDQyLjkgMzkgNDkuMyA4LjggMjIuOC0uNSA0Ni0yMi44IDU2LjRsLS45LjRjLTExLjUgNC45LTE3LjQgNC45LTg5LjMgNC45SDY0NGwtLjIgOTEtLjQgMTMwLjctNS43IDEyLjdjLTcuNCAxNi44LTIyLjMgMjkuOC0zOS43IDM0LjgtNS4yIDEuNS0xMiAzLjMtMTQyLjQgMy4zek01NzcuOCA2MjNzMCAuMSAwIDB6Ii8+PC9zdmc+',
	  enter: 'xMDAwIDY4Ny41Ij48cGF0aCBkPSJNODgxLjIgMHYzMzIuNUgzNDUuOVY5NS43TC0uMyAzOTEuN2wzNDYuMiAyOTUuOFY0NTAuN2g1OTQuNWMzMi43IDAgNTkuMi0yNi41IDU5LjItNTkuMlYwSDg4MS4yeiIvPjwvc3ZnPg==',
	  lang: '5MTEuMyA2ODMuNSI+PHBhdGggZD0iTTQ1Ni4yLjhjLTE4OC4yIDAtMzQwLjYgMTUyLjgtMzQwLjYgMzQxczE1Mi40IDM0MSAzNDAuNiAzNDFjMTg4LjYgMCAzNDEuMy0xNTIuOCAzNDEuMy0zNDFTNjQ0LjguOCA0NTYuMi44em0yMzYuMyAyMDQuNkg1OTEuOWMtMTAuOS00Mi43LTI2LjYtODMuNi00Ny0xMjEuNCA2Mi43IDIxLjQgMTE0LjkgNjUuMSAxNDcuNiAxMjEuNHpNNDU2LjYgNzAuM2MyOC4zIDQwLjkgNTAuNSA4Ni4zIDY1LjEgMTM1SDM5MS40YzE0LjctNDguNyAzNi44LTk0LjEgNjUuMi0xMzV6bS0yNjQgMzM5LjZjLTUuNS0yMS44LTguOS00NC43LTguOS02OC4yczMuNC00Ni40IDguOS02OC4yaDExNS4zYy0yLjcgMjIuNS00LjggNDUtNC44IDY4LjJzMiA0NS43IDQuOCA2OC4ySDE5Mi42em0yOCA2OC4yaDEwMC42YzEwLjkgNDIuNiAyNi42IDgzLjUgNDcuMSAxMjEuNC02Mi44LTIxLjQtMTE1LTY0LjgtMTQ3LjctMTIxLjR6bTEwMC42LTI3Mi43SDIyMC42YzMyLjctNTYuNiA4NC45LTk5LjkgMTQ3LjYtMTIxLjQtMjAuNCAzNy44LTM2LjEgNzguNy00NyAxMjEuNHptMTM1LjQgNDA3LjhjLTI4LjMtNDAuOS01MC41LTg2LjMtNjUuMS0xMzVoMTMwLjNjLTE0LjggNDguNy0zNi45IDk0LjEtNjUuMiAxMzV6bTc5LjctMjAzLjNIMzc2LjhjLTMuMS0yMi41LTUuNS00NS01LjUtNjguMnMyLjQtNDYgNS41LTY4LjJoMTU5LjZjMy4xIDIyLjIgNS41IDQ1IDUuNSA2OC4ycy0yLjUgNDUuNy01LjYgNjguMnptOC42IDE4OS42YzIwLjUtMzcuOCAzNi4xLTc4LjggNDcuMS0xMjEuNGgxMDAuNmMtMzIuOCA1Ni4zLTg1IDEwMC0xNDcuNyAxMjEuNHptNjAuMy0xODkuNmMyLjctMjIuNSA0LjgtNDUgNC44LTY4LjJzLTItNDUuNy00LjgtNjguMmgxMTUuM2M1LjUgMjEuOCA4LjkgNDQuNyA4LjkgNjguMnMtMy40IDQ2LjQtOC45IDY4LjJINjA1LjJ6Ii8+PC9zdmc+',
	  cached: {}
	};

	const generateImage = svg => {
	  return new Promise(resolve => {
	    if (svgs.cached[svg]) return resolve(svgs.cached[svg]);
	    const img = new Image();
	    const dataURIStructure = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA';
	    img.src = "".concat(dataURIStructure).concat(svgs[svg]);

	    img.onload = () => {
	      svgs.cached[svg] = img;
	      resolve(img);
	    };
	  });
	};

	const loadSVGs = () => {
	  const svgsToLoad = Object.keys(svgs).filter(svg => ['cached'].includes(svg) === false);
	  const promises = [];
	  svgsToLoad.forEach(svg => {
	    promises.push(generateImage(svg));
	  });
	  return Promise.all(promises);
	};
	const drawSVG = (ctx, x, y, w, h, svg) => {
	  const img = svgs.cached[svg];
	  if (!img) return;
	  const aspect = img.width / img.height;
	  svgCtx.clearRect(0, 0, svgCanvas.width, svgCanvas.height);
	  svgCanvas.width = config.fontSize * config.resolution * 1.5;
	  svgCanvas.height = svgCanvas.width / aspect;
	  const svgX = (w - svgCanvas.width) / 2;
	  const svgY = (h - svgCanvas.height) / 2;
	  svgCtx.drawImage(img, 0, 0, svgCanvas.width, svgCanvas.height);
	  svgCtx.fillStyle = ctx.fillStyle;
	  const oldComp = svgCtx.globalCompositeOperation;
	  svgCtx.globalCompositeOperation = "source-in";
	  svgCtx.fillRect(0, 0, svgCanvas.width, svgCanvas.height);
	  svgCtx.globalCompositeOperation = oldComp;
	  ctx.drawImage(svgCanvas, x + svgX, y + svgY, svgCanvas.width, svgCanvas.height);
	};

	const state = {
	  canvas: document.createElement('canvas'),
	  activeElement: null,
	  activePopupElement: null,
	  activeSuggestionElement: null,
	  mouseDown: false,
	  previousMouseState: false,
	  mousePos: {
	    x: 0,
	    y: 0
	  },
	  textureDirty: true,
	  selectedLanguage: null,
	  layout: null,
	  currentLayout: null,
	  margin: null,
	  buttonSize: null,
	  buttonHeight: null,
	  shiftDown: false,
	  shiftDownTime: null,
	  perfmaShift: false,
	  keyPopup: false,
	  widthUnits: null,
	  holdTimeout: null,
	  bkspInterval: null,
	  swipeActive: false,
	  swipePoints: [],
	  swipeDrawInterval: null,
	  swipePlacedWord: false,
	  swipeLoadingProgress: 0,
	  suggestions: [],
	  uninterruptedString: '',
	  stateChange: false
	};

	const element = document.createElement('canvas');

	const calculateStartY = () => {
	  if (config.align === 'center') return element.height / 2 - state.layout.length * state.buttonHeight * 0.5;else return state.buttonHeight * 2 + state.margin * 4;
	};
	const calculateWidthUnits = () => {
	  let maxUnits = 0;

	  for (let i = 0; i < state.layout.length; i++) {
	    const row = state.layout[i];
	    let width = 0;

	    for (let j = 0; j < row.length; j++) {
	      const key = row[j];
	      width += key.w ? key.w : 1;
	    }

	    if (width > maxUnits) maxUnits = width;
	  }

	  return maxUnits;
	};
	const calculateKeyboardOffset = () => {
	  let maxUnits = calculateWidthUnits();
	  const oneSideDiff = (state.widthUnits - maxUnits) / 2;
	  return oneSideDiff * state.buttonSize + oneSideDiff * state.margin;
	};
	const calculateRowOffset = i => {
	  const row = state.layout[i];
	  let width = 0;

	  for (let j = 0; j < row.length; j++) {
	    const key = row[j];
	    width += key.w ? key.w : 1;
	  }

	  const oneSideDiff = (state.widthUnits - width) / 2;
	  return oneSideDiff * state.buttonSize + oneSideDiff * state.margin;
	};
	const getMinimumHeight = () => {
	  const buttonsHeight = state.layout.length * state.buttonHeight;
	  const marginHeight = (state.layout.length + 1) * state.margin;
	  const popupHeight = state.buttonHeight * 2 + state.margin * 3;
	  return (buttonsHeight + marginHeight + popupHeight) / config.resolution;
	};
	const getPopupKeyInfo = (pos, keys) => {
	  let splitKeysAt = 5;
	  if (keys.length > splitKeysAt) splitKeysAt = Math.ceil(keys.length / 2);
	  const keyArr = new Array(Math.ceil(keys.length / splitKeysAt)).fill().map(_ => keys.splice(0, splitKeysAt));
	  const popupWidth = keyArr[0].length * state.buttonSize;
	  const popupHeight = keyArr.length * state.buttonHeight;
	  const halfRowSize = Math.floor(keyArr[0].length / 2) * state.buttonSize;
	  let startX = pos.x - halfRowSize;
	  if (keyArr[0].length > 1 && keyArr[0].length % 2 === 0) startX += state.buttonSize;

	  while (startX < 0) startX += state.buttonSize;

	  while (startX + keyArr[0].length * state.buttonSize > element.width) startX -= state.buttonSize;

	  const startY = pos.y - state.buttonHeight - state.margin * 3;
	  return {
	    keyArr,
	    popupWidth,
	    popupHeight,
	    startX,
	    startY
	  };
	};
	const getSuggestionInfo = () => {
	  const suggestions = state.suggestions.slice(0, 3);
	  const suggestionSize = state.buttonSize * 3;
	  const totalWidth = suggestions.length * (suggestionSize + state.margin) - state.margin;
	  return {
	    suggestions,
	    suggestionSize,
	    totalWidth
	  };
	};
	const getDistance = (a, b) => {
	  const dx = a.x - b.x;
	  const dy = a.y - b.y;
	  return Math.sqrt(dx * dx + dy * dy);
	};
	const getAngle = (a, b) => {
	  const dx = a.x - b.x;
	  const dy = a.y - b.y;
	  return Math.atan2(dy, dx);
	};
	const uniqueCharacters = str => {
	  let unique = "";

	  for (let x = 0; x < str.length; x++) {
	    if (unique.indexOf(str.charAt(x)) === -1) {
	      unique += str[x];
	    }
	  }

	  return unique;
	};

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	var src = {
		compareTwoStrings,
		findBestMatch
	};

	function compareTwoStrings(first, second) {
		first = first.replace(/\s+/g, '');
		second = second.replace(/\s+/g, '');

		if (!first.length && !second.length) return 1;                   // if both are empty strings
		if (!first.length || !second.length) return 0;                   // if only one is empty string
		if (first === second) return 1;       							 // identical
		if (first.length === 1 && second.length === 1) return 0;         // both are 1-letter strings
		if (first.length < 2 || second.length < 2) return 0;			 // if either is a 1-letter string

		let firstBigrams = new Map();
		for (let i = 0; i < first.length - 1; i++) {
			const bigram = first.substring(i, i + 2);
			const count = firstBigrams.has(bigram)
				? firstBigrams.get(bigram) + 1
				: 1;

			firstBigrams.set(bigram, count);
		}
		let intersectionSize = 0;
		for (let i = 0; i < second.length - 1; i++) {
			const bigram = second.substring(i, i + 2);
			const count = firstBigrams.has(bigram)
				? firstBigrams.get(bigram)
				: 0;

			if (count > 0) {
				firstBigrams.set(bigram, count - 1);
				intersectionSize++;
			}
		}

		return (2.0 * intersectionSize) / (first.length + second.length - 2);
	}

	function findBestMatch(mainString, targetStrings) {
		if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
		
		const ratings = [];
		let bestMatchIndex = 0;

		for (let i = 0; i < targetStrings.length; i++) {
			const currentTargetString = targetStrings[i];
			const currentRating = compareTwoStrings(mainString, currentTargetString);
			ratings.push({target: currentTargetString, rating: currentRating});
			if (currentRating > ratings[bestMatchIndex].rating) {
				bestMatchIndex = i;
			}
		}
		
		
		const bestMatch = ratings[bestMatchIndex];
		
		return { ratings, bestMatch, bestMatchIndex };
	}

	function areArgsValid(mainString, targetStrings) {
		if (typeof mainString !== 'string') return false;
		if (!Array.isArray(targetStrings)) return false;
		if (!targetStrings.length) return false;
		if (targetStrings.find(s => typeof s !== 'string')) return false;
		return true;
	}

	const ctx = element.getContext('2d');

	const drawRoundedRectangle = (x, y, w, h, r) => {
	  if (w < 2 * r) r = w / 2;
	  if (h < 2 * r) r = h / 2;
	  ctx.beginPath();
	  ctx.moveTo(x + r, y);
	  ctx.arcTo(x + w, y, x + w, y + h, r);
	  ctx.arcTo(x + w, y + h, x, y + h, r);
	  ctx.arcTo(x, y + h, x, y, r);
	  ctx.arcTo(x, y, x + w, y, r);
	  ctx.closePath();
	  ctx.fill();
	};

	const drawText = (x, y, w, h, text, fontSize) => {
	  if (!fontSize) fontSize = config.fontSize * config.resolution;
	  ctx.font = "".concat(fontSize, "px ").concat(config.font);
	  ctx.textBaseline = 'middle';
	  if (!text) return;

	  if (text.length > 2) {
	    let metrics = ctx.measureText(text);

	    while (fontSize > 4 && metrics.width > w - state.margin * 2) {
	      fontSize--;
	      ctx.font = "".concat(fontSize, "px ").concat(config.font);
	      metrics = ctx.measureText(text);
	    }
	  }

	  const textSize = ctx.measureText(text);
	  const textX = (w - textSize.width) / 2;
	  const textY = h / 2;
	  ctx.fillText(text, x + textX, y + textY);
	};

	const drawCircleLine = (sx, sy, sr, ex, ey, er, a) => {
	  const angle = getAngle({
	    x: ex,
	    y: ey
	  }, {
	    x: sx,
	    y: sy
	  }) + Math.PI / 2;
	  ctx.fillStyle = config.colors.down;
	  const path = new Path2D();
	  path.arc(sx, sy, sr, angle, angle + Math.PI);
	  path.arc(ex, ey, er, angle + Math.PI, angle);
	  path.closePath();
	  ctx.beginPath();
	  ctx.fill(path);
	  ctx.closePath();
	  return ctx;
	};

	const drawSwipe = () => {
	  if (state.swipePoints.length > 1) {
	    if (!state.swipeDrawInterval) state.swipeDrawInterval = setInterval(draw, config.swipeIdleDrawInterval);

	    for (let i = 1; i < state.swipePoints.length; i++) {
	      const sp = state.swipePoints[i - 1];
	      const spProgress = (Date.now() - sp.t) / config.swipeDrawingLifeTime;
	      const sr = config.swipeDrawingSize * (1 - spProgress);
	      const ep = state.swipePoints[i];
	      const epProgress = (Date.now() - ep.t) / config.swipeDrawingLifeTime;
	      const er = config.swipeDrawingSize * (1 - epProgress);

	      if (spProgress >= 1) {
	        state.swipePoints.splice(i - 1, 1);
	        i--;
	        continue;
	      }

	      drawCircleLine(sp.x, sp.y, sr, ep.x, ep.y, er);
	    }
	  } else if (state.swipeDrawInterval) {
	    clearInterval(state.swipeDrawInterval);
	    state.swipeDrawInterval = null;
	  }
	};

	const drawKeys = () => {
	  const startY = calculateStartY();
	  ctx.shadowBlur = config.keyShadow.shadowBlur;
	  ctx.shadowOffsetX = config.keyShadow.shadowOffsetX;
	  ctx.shadowOffsetY = config.keyShadow.shadowOffsetY;
	  let y = startY; // draw keys

	  for (let i = 0; i < state.layout.length; i++) {
	    const row = state.layout[i];
	    let x = state.margin + calculateKeyboardOffset() + calculateRowOffset(i);

	    for (let j = 0; j < row.length; j++) {
	      const key = row[j];
	      let buttonWidth = key.w ? key.w : 1.0;
	      ctx.fillStyle = config.colors.hover;
	      if (key.down) ctx.fillStyle = config.colors.down;else if (key.hover) ctx.fillStyle = config.colors.hover;else ctx.fillStyle = config.colors.idle;
	      let widthSize = state.buttonSize * buttonWidth;
	      widthSize += (buttonWidth - 1) * state.margin;
	      ctx.shadowColor = config.keyShadow.shadowColor;
	      drawRoundedRectangle(x, y, widthSize, state.buttonHeight, config.buttonRadius * config.resolution);
	      ctx.shadowColor = 'transparent';
	      ctx.fillStyle = config.colors.text;
	      key.pos = {
	        x,
	        y
	      };

	      if (['shift', 'bksp', 'enter', 'lang'].includes(key.char)) {
	        let char = key.char;
	        if (key.char === 'shift' && state.shiftDown) char = 'shift_down';
	        if (key.char === 'shift' && state.permaShift) char = 'shift_perm';
	        drawSVG(ctx, x, y, widthSize, state.buttonHeight, char);
	      } else {
	        let char = state.shiftDown && key.char.length === 1 ? key.char.toUpperCase() : key.char;
	        if (char === 'space') char = '␣';
	        drawText(x, y, widthSize, state.buttonHeight, char);

	        if (key.alt) {
	          const fontSize = config.fontSize * 0.6 * config.resolution;
	          drawText(x + widthSize / 2 - fontSize / 2, y - state.buttonHeight / 2 + fontSize, widthSize, state.buttonHeight, key.alt, fontSize);
	        }
	      }

	      x += widthSize + state.margin;
	    }

	    y += state.buttonHeight + state.margin;
	  }
	};

	const drawSuggestions = () => {
	  if (state.suggestions.length > 0) {
	    const startY = calculateStartY() - state.buttonHeight - state.margin * 3;
	    const {
	      suggestions,
	      suggestionSize,
	      totalWidth
	    } = getSuggestionInfo();
	    const startX = element.width / 2 - totalWidth / 2;
	    let x = startX;
	    suggestions.forEach(suggestion => {
	      if (suggestion.down) ctx.fillStyle = config.colors.down;else if (suggestion.hover) ctx.fillStyle = config.colors.hover;else ctx.fillStyle = config.colors.idle;
	      drawRoundedRectangle(x, startY, suggestionSize, state.buttonHeight, config.buttonRadius * config.resolution);
	      ctx.fillStyle = config.colors.text;
	      drawText(x, startY, suggestionSize, state.buttonHeight, suggestion.char);
	      x += suggestionSize + state.margin;
	    });
	  }
	};

	const drawSwipeLoader = () => {
	  if (state.swipeLoadingProgress < 1) {
	    const swipeLoaderWidth = 120 * config.resolution;
	    const swipeLoaderHeight = config.swipeLoadingFontSize * 1.5 * config.resolution;
	    const startX = element.width / 2 - swipeLoaderWidth / 2;
	    const startY = calculateStartY() - swipeLoaderHeight - state.margin;
	    ctx.fillStyle = config.colors.idle;
	    drawRoundedRectangle(startX, startY, swipeLoaderWidth, swipeLoaderHeight, config.buttonRadius * config.resolution);
	    ctx.fillStyle = config.colors.text;
	    const fontSize = config.swipeLoadingFontSize * config.resolution;
	    drawText(startX, startY, swipeLoaderWidth, config.fontSize * config.resolution, "loading swipe ".concat(Math.floor(state.swipeLoadingProgress * 100), "%"), fontSize);
	  }
	};

	const drawPopup = () => {
	  ctx.shadowBlur = config.popupShadow.shadowBlur;
	  ctx.shadowOffsetX = config.popupShadow.shadowOffsetX;
	  ctx.shadowOffsetY = config.popupShadow.shadowOffsetY; // draw overlay

	  if (state.activeElement && state.activeElement.extra && state.activeElement.down && !state.swipeActive) {
	    const {
	      pos
	    } = state.activeElement;
	    const {
	      startX,
	      startY,
	      keyArr,
	      popupWidth,
	      popupHeight
	    } = getPopupKeyInfo(pos, state.keyPopup ? [...state.activeElement.extra] : [state.activeElement]);
	    ctx.fillStyle = config.colors.idle;
	    ctx.shadowColor = config.popupShadow.shadowColor;
	    drawRoundedRectangle(startX, startY - state.buttonHeight * (keyArr.length - 1), popupWidth, popupHeight, config.buttonRadius * config.resolution);
	    drawRoundedRectangle(pos.x, pos.y - state.buttonHeight, state.buttonSize, state.buttonHeight * 2, config.buttonRadius * config.resolution);
	    ctx.shadowColor = 'transparent';
	    let y = startY;

	    for (let i = 0; i < keyArr.length; i++) {
	      const row = keyArr[i];
	      let x = startX;

	      for (let j = 0; j < row.length; j++) {
	        const key = row[j];
	        if (key.down) ctx.fillStyle = config.colors.down;else if (key.hover) ctx.fillStyle = config.colors.hover;else ctx.fillStyle = config.colors.idle;
	        drawRoundedRectangle(x, y, state.buttonSize, state.buttonHeight, config.buttonRadius * config.resolution);
	        ctx.fillStyle = config.colors.text;
	        const char = state.shiftDown && key.char.length <= 2 ? key.char.toUpperCase() : key.char;
	        drawText(x, y, state.buttonSize, state.buttonHeight, char);

	        if (!state.keyPopup) {
	          drawText(x, y + state.buttonHeight / 2, state.buttonSize, state.buttonHeight / 2, '...');
	        }

	        x += state.buttonSize;
	      }

	      y -= state.buttonHeight;
	    }
	  }
	};

	const draw = () => {
	  ctx.clearRect(0, 0, element.width, element.height);
	  drawKeys();

	  if (config.swipe) {
	    drawSuggestions();
	    drawSwipeLoader();
	  }

	  drawPopup();
	  if (config.swipe) drawSwipe();
	  state.stateChange = false;
	  state.textureDirty = true;
	};

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
	const load = () => {
	  initialized = false;

	  if (map[state.selectedLanguage] !== undefined) {
	    return loadingFinished();
	  }

	  state.swipeLoadingProgress = 0;
	  const worldListFolder = './wordlist/';
	  if (currentXHR) currentXHR.abort();
	  currentXHR = new XMLHttpRequest();
	  currentXHR.open('GET', "".concat(worldListFolder).concat(state.selectedLanguage, '.txt'), true);
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
	    state.swipeLoadingProgress = event.loaded / event.total;
	    draw();
	  };

	  reset();
	  currentXHR.send(null);
	};

	const loadingFinished = () => {
	  state.swipeLoadingProgress = 1.0;
	  initialized = true;
	  draw();
	};

	const mapText = data => {
	  buildSpecialCharacterMap();
	  const words = data.toString().split("\n");

	  for (let i = 0; i < words.length; i++) {
	    const word = words[i].replace('\r', '');
	    if (word.length === 1) continue;
	    let targetObject = null;
	    let previousChar = null;
	    const targetLength = Math.min(word.length, config.swipeMaxWordDepth);

	    for (let j = 0; j < targetLength; j++) {
	      const char = getCorrectChar(word.charAt(j));

	      if (char !== previousChar) {
	        if (targetObject === null) {
	          if (map[state.selectedLanguage][char] === undefined) map[state.selectedLanguage][char] = {};
	          targetObject = map[state.selectedLanguage][char];
	        } else {
	          if (targetObject[char] === undefined) targetObject[char] = {};
	          targetObject = targetObject[char];
	        }
	      }

	      if (j === 0) {
	        if (targetObject.allWords === undefined) targetObject.allWords = [];
	        targetObject.allWords.push(word);
	      }

	      if (j === targetLength - 1) {
	        if (targetObject.words === undefined) targetObject.words = [];
	        targetObject.words.push(word);
	      }

	      previousChar = char;
	    }
	  }
	};

	const buildSpecialCharacterMap = () => {
	  map[state.selectedLanguage].specialCharacterMap = {};
	  const {
	    specialCharacterMap
	  } = map[state.selectedLanguage];
	  state.layout.forEach(row => {
	    row.forEach(key => {
	      if (key.char.length <= 2 && key.extra) {
	        key.extra.forEach(extraKey => {
	          specialCharacterMap[extraKey.char] = key.char;
	        });
	      }
	    });
	  });
	};

	const move = () => {
	  if (!initialized) return;
	  if (!startPosition) startPosition = _objectSpread2({}, state.mousePos);
	  const startPosDifference = getDistance(state.mousePos, startPosition);

	  if (startPosDifference > config.swipeMinimumDistance * config.resolution) {
	    state.swipeActive = true;
	  }

	  pushSwipePoint();
	  if (state.activeElement) processAngle();
	  pushChar();
	};
	const end = () => {
	  if (!initialized) return;
	  pushChar();

	  if (state.swipeActive) {
	    getSwipeSuggestions();
	    state.uninterruptedString = '';
	  } else getSuggestions(state.uninterruptedString);

	  reset();
	};

	const getCorrectChar = char => {
	  let correctChar = map[state.selectedLanguage].specialCharacterMap[char];

	  if (correctChar !== undefined) {
	    return correctChar;
	  }

	  return char;
	};

	const pushChar = () => {
	  const key = state.activeElement;
	  if (!key) return;
	  const char = getCorrectChar(key.char);
	  if (charArray[charArray.length - 1] === char || char.length > 2) return;
	  charArray.push(char);
	  resetAngleFinder();
	  processChar(char);
	};

	const processChar = char => {
	  if (activeBranches.length === 0) {
	    const path = map[state.selectedLanguage][char];
	    processPath(path);
	  } else {
	    currentBranch = [];
	    activeBranches.forEach(branch => {
	      if (branch) {
	        // just to be sure
	        const path = branch[char];
	        processPath(path);
	      }
	    });
	  }
	};

	const processPath = path => {
	  if (!path) return;
	  const keys = Object.keys(path).filter(key => key !== 'words');

	  if (keys.length > 0) {
	    activeBranches.push(path);
	    currentBranch.push(path);
	  }

	  addWords(path);
	};

	const addWords = path => {
	  const {
	    words
	  } = path;
	  if (words) wordsFound = wordsFound.concat(words);
	};

	const processAngle = () => {
	  if (!refPosition) {
	    refPosition = _objectSpread2({}, state.mousePos);
	    return;
	  }

	  let activeChar = charArray[charArray.length - 1];
	  if (lastBranchedChar === activeChar) return;
	  const l = getDistance(state.mousePos, refPosition);

	  if (l >= config.swipeMinimumVectorLength) {
	    let a = getAngle(state.mousePos, refPosition);

	    if (refAngle) {
	      // angle difference
	      const ad = getAngleDifference(a, refAngle);

	      if (Math.abs(ad) > config.swipeMinimumAngleDifference) {
	        // reset branch
	        activeBranches = [...currentBranch];
	        currentBranch = [];
	        lastBranchedChar = activeChar;
	      }
	    }

	    refAngle = a;
	    refPosition = _objectSpread2({}, state.mousePos);
	  }
	};

	const getAngleDifference = (a, b) => {
	  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
	};

	const getSwipeSuggestions = () => {
	  const lastChar = charArray[charArray.length - 1]; // filter for words that match the last letter pressed

	  let suggestions = wordsFound.filter(word => {
	    const lastCharInWord = getCorrectChar(word.charAt(word.length - 1));
	    return lastCharInWord === lastChar;
	  }); // sort by unique characters

	  suggestions.sort(function (a, b) {
	    return uniqueCharacters(b).length - uniqueCharacters(a).length;
	  }); // deduplicate

	  suggestions = suggestions.filter((v, i, a) => a.indexOf(v) === i);
	  setSuggestions(suggestions);
	};

	const getSuggestions = (str, started = false, previousBatch = []) => {
	  if (!started) resetCrawl();

	  if (str === '') {
	    state.suggestions = [];
	    return;
	  }

	  const firstChar = getCorrectChar(str.charAt(0));
	  const firstCharList = map[state.selectedLanguage][firstChar];

	  if (!firstCharList || !firstCharList.allWords) {
	    state.suggestions = [];
	    return;
	  }

	  const wordList = firstCharList.allWords;
	  const slicedWordList = wordList.slice(crawlProgress, crawlProgress + config.suggestionCrawlStep);
	  let batch;

	  if (wordList) {
	    batch = src.findBestMatch(str, slicedWordList).ratings;
	    batch.sort((a, b) => b.rating - a.rating);
	    batch = batch.slice(0, 4).filter(s => s.target !== str); // we take 1 extra because it could include str
	    // mix in the previous batch

	    batch = batch.concat(previousBatch);
	    batch.sort((a, b) => b.rating - a.rating);
	    batch = batch.slice(0, 3);
	  }

	  crawlProgress += config.suggestionCrawlStep;

	  if (crawlProgress < wordList.length) {
	    // prevent blocking the javascript thread
	    crawlTimeout = setTimeout(() => {
	      getSuggestions(str, true, batch);
	    }, 0);
	  } else {
	    setSuggestions(batch.map(s => s.target));
	    draw();
	  }
	};

	const setSuggestions = suggestions => {
	  state.suggestions = suggestions.map(suggestion => ({
	    char: suggestion,
	    suggestion: true
	  }));
	};

	const resetSuggestions = () => {
	  state.suggestions = [];
	  state.uninterruptedString = '';
	};

	const resetAngleFinder = () => {
	  refPosition = null;
	  refAngle = null;
	  lastBranchedChar = null;
	};

	const resetCrawl = () => {
	  crawlProgress = 0;
	  clearTimeout(crawlTimeout);
	  crawlTimeout = null;
	};

	const pushSwipePoint = () => {
	  if (!state.swipeActive) return;
	  const lastSwipePoint = state.swipePoints[state.swipePoints.length - 1];

	  if (lastSwipePoint) {
	    const nextPointDiff = getDistance(lastSwipePoint, state.mousePos);
	    if (nextPointDiff < config.swipeMinimumVectorLength) return;
	  }

	  state.swipePoints.push(_objectSpread2(_objectSpread2({}, state.mousePos), {}, {
	    t: Date.now()
	  }));
	};

	const reset = () => {
	  charArray = [];
	  activeBranches = [];
	  currentBranch = [];
	  wordsFound = [];
	  startPosition = null;
	  resetAngleFinder();
	};

	const init = () => {
	  config.languages.forEach(langName => {
	    const langKey = config.layouts[langName][3][2];
	    langKey.extra = [];
	    config.languages.forEach(language => {
	      langKey.extra.push({
	        char: language.toUpperCase()
	      });
	    });
	  });
	};
	const selectLanguage = lang => {
	  if (config.layouts[lang]) {
	    state.selectedLanguage = lang;
	    setLayout(lang);
	    if (config.swipe) load();
	  }
	};
	const setLayout = name => {
	  state.layout = config.layouts[name];
	  state.currentLayout = name;
	  state.widthUnits = calculateWidthUnits();
	  const totalMargin = (state.widthUnits + 1) * state.margin;
	  state.buttonSize = (element.width - totalMargin) / state.widthUnits;
	  state.uninterruptedString = '';
	  state.stateChange = false;
	  draw();
	};
	const setScreenSizeInPixels = (width, height, devicePixelRatio) => {
	  config.resolution = devicePixelRatio;
	  state.buttonHeight = config.buttonHeight * config.resolution;
	  state.margin = config.margin * config.resolution;
	  const minimHeight = getMinimumHeight();

	  if (height < minimHeight) {
	    console.warn("[VRKeyboard] The height is to small for the keyboard to render, height is adjusted to fit");
	  }

	  height = Math.max(height, minimHeight);
	  element.width = width * config.resolution;
	  element.height = height * config.resolution;
	  element.style.width = "".concat(width, "px");
	  element.style.height = "".concat(height, "px");
	  if (state.currentLayout) setLayout(state.currentLayout);
	};
	const setScreenSizeFromAspectRatio = () => {
	  element.width = config.resolution * 512;
	  element.height = element.width / config.aspect;
	  state.margin = config.margin * config.resolution;
	  state.buttonHeight = config.buttonHeight * config.resolution;
	  if (state.currentLayout) setLayout(state.currentLayout);
	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	function EventDispatcher() {}

	Object.assign(EventDispatcher.prototype, {
	  addEventListener: function (type, listener) {
	    if (this._listeners === undefined) this._listeners = {};
	    var listeners = this._listeners;

	    if (listeners[type] === undefined) {
	      listeners[type] = [];
	    }

	    if (listeners[type].indexOf(listener) === -1) {
	      listeners[type].push(listener);
	    }
	  },
	  removeEventListener: function (type, listener) {
	    if (this._listeners === undefined) return;
	    var listeners = this._listeners;
	    var listenerArray = listeners[type];

	    if (listenerArray !== undefined) {
	      var index = listenerArray.indexOf(listener);

	      if (index !== -1) {
	        listenerArray.splice(index, 1);
	      }
	    }
	  },
	  dispatchEvent: function (event) {
	    if (this._listeners === undefined) return;
	    var listeners = this._listeners;
	    var listenerArray = listeners[event.type];

	    if (listenerArray !== undefined) {
	      event.target = this;
	      var array = listenerArray.slice(0);

	      for (var i = 0, l = array.length; i < l; i++) {
	        array[i].call(this, event);
	      }
	    }
	  }
	});

	const dispatcher = new EventDispatcher();
	const addEventListener = (type, listener) => {
	  dispatcher.addEventListener(type, listener);
	};
	const removeEventListener = (type, listener) => {
	  dispatcher.removeEventListener(type, listener);
	};
	const dispatchEvent = (key, shiftDown) => {
	  let char = null;
	  let keyName = key.char;
	  if (key.char.length <= 2 && !config.languages.includes(key.char.toLowerCase())) char = shiftDown ? key.char.toUpperCase() : key.char;
	  let removeChars = false;

	  if (key.suggestion) {
	    char = key.char + ' ';
	    keyName = 'suggestion';
	    if (state.swipePlacedWord && state.uninterruptedString.length) state.uninterruptedString += ' ';
	    if (state.uninterruptedString.length) removeChars = true;
	  }

	  if (state.swipePlacedWord && key.char == 'bksp') removeChars = true;
	  var length = state.uninterruptedString.length;

	  if (removeChars) {
	    state.uninterruptedString = '';

	    for (let i = 0; i < length; i++) dispatchEvent({
	      char: 'bksp'
	    });
	  }

	  if (key.char === 'space') char = ' ';
	  dispatcher.dispatchEvent({
	    type: KEYDOWN,
	    key: keyName,
	    char
	  });
	};
	const KEYDOWN = 'keyDown';

	var events = /*#__PURE__*/Object.freeze({
		__proto__: null,
		dispatcher: dispatcher,
		addEventListener: addEventListener,
		removeEventListener: removeEventListener,
		dispatchEvent: dispatchEvent,
		KEYDOWN: KEYDOWN
	});

	const checkKeyboardCollision = () => {
	  const {
	    x,
	    y
	  } = state.mousePos;
	  const startY = calculateStartY();
	  const rowIndex = Math.floor((y - startY) / (state.buttonHeight + state.margin));
	  const row = state.layout[rowIndex];
	  if (!row) return;
	  let searchX = state.margin + calculateKeyboardOffset() + calculateRowOffset(rowIndex);

	  for (let i = 0; i < row.length; i++) {
	    const key = row[i];
	    let buttonWidth = key.w ? key.w : 1.0;
	    let widthSize = state.buttonSize * buttonWidth;
	    widthSize += (buttonWidth - 1) * state.margin;
	    let aboveStartX = x > searchX;
	    searchX += widthSize + state.margin;

	    if (aboveStartX && x < searchX - state.margin) {
	      if (!state.activeElement || state.activeElement !== key || state.activeElement.down !== state.mouseDown) {
	        if (state.activeElement === key && state.activeElement.down && !state.mouseDown) return keyPress(state.activeElement);
	        clearActiveElement();
	        state.activeElement = key;
	        state.activeElement.hover = true;
	        state.activeElement.down = state.mouseDown;
	        if (state.activeElement.down) setHoldTimeout();else clearHoldTimeout();
	        state.stateChange = true;
	      } // we found a key, return


	      return state.activeElement;
	    }
	  }
	};
	const checkSuggestionCollision = () => {
	  const {
	    x,
	    y
	  } = state.mousePos;
	  const startY = calculateStartY() - state.buttonHeight - state.margin * 3;
	  const {
	    suggestions,
	    suggestionSize,
	    totalWidth
	  } = getSuggestionInfo();
	  let tx = element.width / 2 - totalWidth / 2;

	  for (let i = 0; i < suggestions.length; i++) {
	    const suggestion = suggestions[i];

	    if (x > tx && x < tx + suggestionSize && y > startY && y < startY + state.buttonHeight) {
	      if (!state.activeSuggestionElement || state.activeSuggestionElement !== suggestion || state.activeSuggestionElement.down !== state.mouseDown) {
	        if (state.activeSuggestionElement === suggestion && state.activeSuggestionElement.down && !state.mouseDown) return keyPress(state.activeSuggestionElement);
	        clearActiveSuggestionElement();
	        state.activeSuggestionElement = suggestion;
	        state.activeSuggestionElement.hover = true;
	        state.activeSuggestionElement.down = state.mouseDown;
	        state.stateChange = true;
	      }

	      return state.activeSuggestionElement;
	    }

	    tx += suggestionSize + state.margin;
	  }
	};
	const checkPopupKeyCollision = () => {
	  if (!state.activeElement || !state.activeElement.extra) return;

	  if (!state.mouseDown) {
	    // key down event
	    keyPress(state.activePopupElement);
	    return true;
	  }

	  const {
	    x,
	    y
	  } = state.mousePos;
	  const {
	    pos
	  } = state.activeElement;
	  const {
	    startX,
	    startY,
	    keyArr,
	    popupWidth,
	    popupHeight
	  } = getPopupKeyInfo(pos, [...state.activeElement.extra]);
	  let closestKey = null;
	  let closestLength = Number.POSITIVE_INFINITY;
	  let ty = startY + state.buttonHeight / 2;

	  for (let i = 0; i < keyArr.length; i++) {
	    const row = keyArr[i];
	    let tx = startX + state.buttonSize / 2;

	    for (let j = 0; j < row.length; j++) {
	      const key = row[j];
	      const length = getDistance({
	        x,
	        y
	      }, {
	        x: tx,
	        y: ty
	      });

	      if (length < closestLength) {
	        closestKey = key;
	        closestLength = length;
	      }

	      tx += state.buttonSize;
	    }

	    ty -= state.buttonHeight;
	  }

	  if (!state.activePopupElement || state.activePopupElement !== closestKey || state.activePopupElement.down !== state.mouseDown) {
	    clearActivePopupElement();
	    state.activePopupElement = closestKey;
	    state.activePopupElement.hover = true;
	    state.activePopupElement.down = true;
	    state.stateChange = true;
	  } // inside big rectangle


	  if (x > startX && x < startX + popupWidth && y > startY - state.buttonHeight * (keyArr.length - 1) && y < startY - state.buttonHeight * (keyArr.length - 1) + popupHeight) {
	    return true;
	  } // inside small rectangle


	  if (x > pos.x && x < pos.x + state.buttonSize && y > pos.y - state.buttonHeight && y < pos.y + state.buttonHeight) {
	    return true;
	  }

	  return false;
	};
	const clearActiveElement = () => {
	  if (state.activeElement) {
	    state.activeElement.hover = false;
	    state.activeElement.down = false;
	    state.activeElement = null;
	  }
	};
	const clearActiveSuggestionElement = () => {
	  if (state.activeSuggestionElement) {
	    state.activeSuggestionElement.hover = false;
	    state.activeSuggestionElement.down = false;
	    state.activeSuggestionElement = null;
	  }
	};

	const clearActivePopupElement = () => {
	  if (state.activePopupElement) {
	    state.activePopupElement.hover = false;
	    state.activePopupElement.down = false;
	    state.activePopupElement = null;
	  }
	};

	const clearHoldTimeout = () => {
	  if (state.holdTimeout) clearTimeout(state.holdTimeout);
	  if (state.bkspInterval) clearInterval(state.bkspInterval);
	  state.keyPopup = false;
	};

	const setHoldTimeout = () => {
	  clearHoldTimeout();
	  state.holdTimeout = setTimeout(() => {
	    if (state.swipeActive) return;
	    state.keyPopup = true;
	    clearActivePopupElement();
	    checkPopupKeyCollision();
	    draw();

	    if (state.activeElement && state.activeElement.char === 'bksp') {
	      state.bkspInterval = setInterval(() => {
	        if (state.activeElement) {
	          dispatchEvent(state.activeElement);

	          if (config.swipe) {
	            const previousUninterruptedString = state.uninterruptedString;
	            state.uninterruptedString = state.uninterruptedString.substr(0, state.uninterruptedString.length - 1);

	            if (previousUninterruptedString !== state.uninterruptedString) {
	              end();
	              draw();
	            }
	          }
	        }
	      }, config.bkspIntervalTime);
	    }
	  }, config.holdPopupTime);
	};

	const keyPress = key => {
	  clearActivePopupElement();
	  clearActiveSuggestionElement();
	  clearActiveElement();
	  clearHoldTimeout();
	  if (state.swipeActive) return;
	  dispatchEvent(key, state.shiftDown);

	  if (key.suggestion) {
	    resetSuggestions();
	  }

	  switch (key.char) {
	    case 'abc':
	      setLayout(state.selectedLanguage);
	      break;

	    case '!?#':
	    case '?123':
	      setLayout('num');
	      break;

	    case '=\\<':
	      setLayout('sym');
	      break;

	    case '1234':
	      setLayout('nump');
	      break;

	    case 'shift':
	      if (!state.permaShift && Date.now() - state.shiftDownTime < config.shiftDoubleTapTimeout) {
	        state.shiftDown = true;
	        state.permaShift = true;
	        state.shiftDownTime = 0;
	      } else {
	        state.shiftDown = !state.shiftDown;
	        state.permaShift = false;
	        state.shiftDownTime = Date.now();
	      }

	      state.stateChange = true;
	      break;

	    case 'lang':
	      for (let i = 0; i < config.languages.length; i++) {
	        if (config.languages[i] === state.selectedLanguage) {
	          let nextLanguage = i + 1;
	          if (!config.languages[nextLanguage]) nextLanguage = 0;
	          selectLanguage(config.languages[nextLanguage]);
	          break;
	        }
	      }

	      break;

	    default:
	      if (config.languages.includes(key.char.toLowerCase())) {
	        // we have a language
	        selectLanguage(key.char.toLowerCase());
	      } else {
	        if (state.shiftDown && !state.permaShift) state.shiftDown = false;

	        if (config.swipe) {
	          if (['space', 'enter'].includes(key.char)) resetSuggestions();

	          if (key.char === 'bksp') {
	            state.uninterruptedString = state.uninterruptedString.substr(0, state.uninterruptedString.length - 1);
	          } else if (state.swipePlacedWord) {
	            state.uninterruptedString = '';
	          }

	          if (state.currentLayout === state.selectedLanguage && key.char.length <= 2) state.uninterruptedString += key.char;
	        }

	        state.stateChange = true;
	      }

	      break;
	  }

	  state.swipePlacedWord = false;
	  return key;
	};

	const getCanvas = () => element;
	const getActiveElement = () => state.activeElement;
	const selectLanguage$1 = selectLanguage;
	const setLayout$1 = setLayout;
	const setScreenSizeInPixels$1 = setScreenSizeInPixels;
	const setScreenSizeFromAspectRatio$1 = setScreenSizeFromAspectRatio;
	const setMouseDown = (bool, x, y) => {
	  state.mouseDown = bool;
	  if (x !== undefined) setMousePos(x, y);else setMousePos(state.mousePos.x, state.mousePos.y);

	  if (!state.mouseDown && state.swipeActive) {
	    if (state.suggestions.length > 0) {
	      const suggestionKey = state.suggestions.shift();
	      dispatchEvent(suggestionKey, state.shiftDown);
	      state.uninterruptedString = suggestionKey.char;
	      state.swipePlacedWord = true;
	    }

	    state.swipeActive = false;
	  }
	};
	const setMousePosFromUV = (x, y) => {
	  setMousePos(element.width * x, element.height * y);
	};
	const setMousePos = (x, y) => {
	  state.mousePos.x = x;
	  state.mousePos.y = y;
	  let foundKey;
	  if (state.keyPopup) foundKey = checkPopupKeyCollision();
	  if (!foundKey && config.swipe) foundKey = checkSuggestionCollision();
	  if (!foundKey) foundKey = checkKeyboardCollision();
	  if (config.swipe && state.mouseDown && !state.keyPopup) move();

	  if (!foundKey && (state.activeElement || state.activeSuggestionElement)) {
	    clearActiveElement();
	    clearActiveSuggestionElement();
	    state.stateChange = true;
	  }

	  if (config.swipe && !state.mouseDown && state.previousMouseState) {
	    // a bit dirty but we need the keypress info, and we dont want to draw 2 times.
	    if (!state.keyPopup) end();
	    state.stateChange = true;
	  }

	  state.previousMouseState = state.mouseDown;
	  if (state.stateChange) draw();
	};
	const addListeners = () => {
	  const getCanvasPosition = (x, y) => {
	    const bounds = element.getBoundingClientRect();
	    x -= bounds.x;
	    y -= bounds.y;
	    return [x * config.resolution, y * config.resolution];
	  };

	  document.addEventListener('mousemove', event => {
	    setMousePos(...getCanvasPosition(event.clientX, event.clientY));
	  });
	  element.addEventListener('mousedown', event => {
	    setMouseDown(true, ...getCanvasPosition(event.clientX, event.clientY));
	    event.preventDefault();
	  });
	  document.addEventListener('mouseup', event => {
	    setMouseDown(false);
	  });
	  document.addEventListener('touchmove', event => {
	    const touch = event.touches[0];
	    setMousePos(...getCanvasPosition(touch.clientX, touch.clientY));
	    event.preventDefault();
	  }, {
	    passive: false
	  });
	  element.addEventListener('touchstart', event => {
	    const touch = event.touches[0];
	    setMouseDown(true, ...getCanvasPosition(touch.clientX, touch.clientY));
	    event.preventDefault();
	  }, {
	    passive: false
	  });
	  document.addEventListener('touchend', event => {
	    setMouseDown(false);
	  }, {
	    passive: false
	  });
	};
	const setTextureDirty = bool => {
	  state.textureDirty = bool;
	};
	const getTextureDirty = () => state.textureDirty;
	const resetSuggestionInput = resetSuggestions;
	const init$1 = _config => {
	  Object.assign(config, _config);
	  init();
	  setScreenSizeFromAspectRatio();
	  selectLanguage(config.language);
	  loadSVGs().then(() => {
	    draw();
	  });
	};

	exports.addListeners = addListeners;
	exports.events = events;
	exports.getActiveElement = getActiveElement;
	exports.getCanvas = getCanvas;
	exports.getTextureDirty = getTextureDirty;
	exports.init = init$1;
	exports.resetSuggestionInput = resetSuggestionInput;
	exports.selectLanguage = selectLanguage$1;
	exports.setLayout = setLayout$1;
	exports.setMouseDown = setMouseDown;
	exports.setMousePos = setMousePos;
	exports.setMousePosFromUV = setMousePosFromUV;
	exports.setScreenSizeFromAspectRatio = setScreenSizeFromAspectRatio$1;
	exports.setScreenSizeInPixels = setScreenSizeInPixels$1;
	exports.setTextureDirty = setTextureDirty;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
