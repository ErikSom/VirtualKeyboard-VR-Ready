!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).VRKeyboard={})}(this,(function(t){"use strict";const e={resolution:1,aspect:1.25,margin:5,fontSize:16,buttonHeight:40,buttonRadius:5,language:"en",languages:["en","fr","es","ru"],font:"sans-serif",align:"center",colors:{idle:"#3f4a52",hover:"#2d343a",down:"#5cb0a7",text:"#ffffff"},keyShadow:{shadowColor:"rgba(0, 0, 0, .3)",shadowBlur:1,shadowOffsetX:1,shadowOffsetY:1},popupShadow:{shadowColor:"rgba(0, 0, 0, .3)",shadowBlur:4,shadowOffsetX:0,shadowOffsetY:2},holdPopupTime:300,bkspIntervalTime:50,shiftDoubleTapTimeout:300,swipe:!0,swipeMinimumVectorLength:2,swipeMinimumAngleDifference:Math.PI/4,swipeMinimumDistance:20,swipeDrawingLifeTime:500,swipeIdleDrawInterval:50,swipeDrawingSize:6,swipeMaxWordDepth:8,swipeLoadingFontSize:12,suggestionCrawlStep:100,layouts:{en:[[{char:"q",extra:[{char:"1"}],alt:"1"},{char:"w",extra:[{char:"2"}],alt:"2"},{char:"e",extra:[{char:"è"},{char:"3"},{char:"é"},{char:"ê"},{char:"ę"},{char:"ë"},{char:"ē"},{char:"ė"}],alt:"3"},{char:"r",extra:[{char:"4"}],alt:"4"},{char:"t",extra:[{char:"5"}],alt:"5"},{char:"y",extra:[{char:"ý"},{char:"6"},{char:"ĳ"},{char:"ÿ"}],alt:"6"},{char:"u",extra:[{char:"û"},{char:"7"},{char:"ú"},{char:"ū"},{char:"ü"},{char:"ù"}],alt:"7"},{char:"i",extra:[{char:"î"},{char:"8"},{char:"í"},{char:"ï"},{char:"į"},{char:"ī"},{char:"ì"},{char:"ĳ"}],alt:"8"},{char:"o",extra:[{char:"ò"},{char:"ö"},{char:"ô"},{char:"9"},{char:"ó"},{char:"õ"},{char:"ō"},{char:"œ"},{char:"ø"}],alt:"9"},{char:"p",extra:[{char:"0"}],alt:"0"}],[{char:"a",extra:[{char:"à"},{char:"á"},{char:"â"},{char:"ä"},{char:"æ"},{char:"ã"},{char:"å"},{char:"ā"},{char:"ª"}]},{char:"s",extra:[{char:"ß"}]},{char:"d"},{char:"f"},{char:"g"},{char:"h"},{char:"j",extra:[{char:"j́"}]},{char:"k"},{char:"l"}],[{char:"shift",w:1.5},{char:"z"},{char:"x"},{char:"c",extra:[{char:"ç"}]},{char:"v"},{char:"b"},{char:"n",extra:[{char:"ñ"},{char:"ń"}]},{char:"m"},{char:"bksp",w:1.5}],[{char:"?123",w:2},{char:","},{char:"lang"},{char:"space",w:3},{char:"."},{char:"enter",w:2}]],fr:[[{char:"a",extra:[{char:"à"},{char:"á"},{char:"1"},{char:"â"},{char:"ä"},{char:"æ"},{char:"ã"},{char:"å"},{char:"ā"},{char:"ª"}],alt:"1"},{char:"z",extra:[{char:"2"}],alt:"2"},{char:"e",extra:[{char:"è"},{char:"3"},{char:"é"},{char:"ê"},{char:"ę"},{char:"ë"},{char:"ē"},{char:"ė"}],alt:"3"},{char:"r",extra:[{char:"4"}],alt:"4"},{char:"t",extra:[{char:"5"}],alt:"5"},{char:"y",extra:[{char:"ý"},{char:"6"},{char:"ĳ"},{char:"ÿ"}],alt:"6"},{char:"u",extra:[{char:"û"},{char:"7"},{char:"ú"},{char:"ū"},{char:"ü"},{char:"ù"}],alt:"7"},{char:"i",extra:[{char:"î"},{char:"8"},{char:"í"},{char:"ï"},{char:"į"},{char:"ī"},{char:"ì"},{char:"ĳ"}],alt:"8"},{char:"o",extra:[{char:"ò"},{char:"ö"},{char:"ô"},{char:"9"},{char:"ó"},{char:"õ"},{char:"ō"},{char:"œ"},{char:"ø"}],alt:"9"},{char:"p",extra:[{char:"0"}],alt:"0"}],[{char:"q"},{char:"s",extra:[{char:"ß"}]},{char:"d"},{char:"f"},{char:"g"},{char:"h"},{char:"j",extra:[{char:"j́"}]},{char:"k"},{char:"l"},{char:"m"}],[{char:"shift",w:1.5},{char:"w"},{char:"x"},{char:"c",extra:[{char:"ç"}]},{char:"v"},{char:"b"},{char:"n",extra:[{char:"ñ"},{char:"ń"}]},{char:"'",extra:[{char:"‚"},{char:"‘"},{char:"’"},{char:"‹"},{char:"›"}]},{char:"bksp",w:1.5}],[{char:"?123",w:2},{char:","},{char:"lang"},{char:"space",w:3},{char:"."},{char:"enter",w:2}]],es:[[{char:"q",extra:[{char:"1"}],alt:"1"},{char:"w",extra:[{char:"2"}],alt:"2"},{char:"e",extra:[{char:"è"},{char:"3"},{char:"é"},{char:"ê"},{char:"ę"},{char:"ë"},{char:"ē"},{char:"ė"}],alt:"3"},{char:"r",extra:[{char:"4"}],alt:"4"},{char:"t",extra:[{char:"5"}],alt:"5"},{char:"y",extra:[{char:"ý"},{char:"6"},{char:"ĳ"},{char:"ÿ"}],alt:"6"},{char:"u",extra:[{char:"û"},{char:"7"},{char:"ú"},{char:"ū"},{char:"ü"},{char:"ù"}],alt:"7"},{char:"i",extra:[{char:"î"},{char:"8"},{char:"í"},{char:"ï"},{char:"į"},{char:"ī"},{char:"ì"},{char:"ĳ"}],alt:"8"},{char:"o",extra:[{char:"ò"},{char:"ö"},{char:"ô"},{char:"9"},{char:"ó"},{char:"õ"},{char:"ō"},{char:"œ"},{char:"ø"}],alt:"9"},{char:"p",extra:[{char:"0"}],alt:"0"}],[{char:"a",extra:[{char:"à"},{char:"á"},{char:"â"},{char:"ä"},{char:"æ"},{char:"ã"},{char:"å"},{char:"ā"},{char:"ª"}]},{char:"s",extra:[{char:"ß"}]},{char:"d"},{char:"f"},{char:"g"},{char:"h"},{char:"j",extra:[{char:"j́"}]},{char:"k"},{char:"l"},{char:"ñ"}],[{char:"shift",w:1.5},{char:"z"},{char:"x"},{char:"c",extra:[{char:"ç"}]},{char:"v"},{char:"b"},{char:"n",extra:[{char:"ñ"},{char:"ń"}]},{char:"m"},{char:"bksp",w:1.5}],[{char:"?123",w:2},{char:","},{char:"lang"},{char:"space",w:3},{char:"."},{char:"enter",w:2}]],ru:[[{char:"й",extra:[{char:"1"}],alt:"1"},{char:"ц",extra:[{char:"2"}],alt:"2"},{char:"у",extra:[{char:"3"},{char:"у́"}],alt:"3"},{char:"к",extra:[{char:"4"}],alt:"4"},{char:"е",extra:[{char:"е́"},{char:"5"},{char:"ё"}],alt:"5"},{char:"н",extra:[{char:"6"}],alt:"6"},{char:"г",extra:[{char:"7"},{char:"ґ"}],alt:"7"},{char:"ш",extra:[{char:"8"}],alt:"8"},{char:"щ",extra:[{char:"9"}],alt:"9"},{char:"з",extra:[{char:"0"}],alt:"0"},{char:"х"}],[{char:"ф"},{char:"ы",extra:[{char:"ы́"}]},{char:"в"},{char:"а",extra:[{char:"а́"}]},{char:"п"},{char:"р"},{char:"о",extra:[{char:"о́"}]},{char:"л"},{char:"д"},{char:"ж"},{char:"э",extra:[{char:"є"},{char:"э́"}]}],[{char:"shift"},{char:"я",extra:[{char:"я́"}]},{char:"ч"},{char:"с"},{char:"м"},{char:"и",extra:[{char:"ї"},{char:"и́"},{char:"і"}]},{char:"т"},{char:"ь",extra:[{char:"ъ"}]},{char:"б"},{char:"ю",extra:[{char:"ю́"}]},{char:"bksp"}],[{char:"?123",w:2},{char:","},{char:"lang"},{char:"space",w:4},{char:"."},{char:"enter",w:2}]],num:[[{char:"1",extra:[{char:"¹"},{char:"½"},{char:"⅓"},{char:"¼"},{char:"⅕"},{char:"⅙"},{char:"⅐"},{char:"⅛"},{char:"⅑"},{char:"⅒"}]},{char:"2",extra:[{char:"⅖"},{char:"²"},{char:"⅔"}]},{char:"3",extra:[{char:"⅗"},{char:"³"},{char:"¾"},{char:"⅜"}]},{char:"4",extra:[{char:"⁴"},{char:"⅘"}]},{char:"5",extra:[{char:"⅝"},{char:"⁵"},{char:"⅚"}]},{char:"6",extra:[{char:"⁶"}]},{char:"7",extra:[{char:"⁷"},{char:"⅞"}]},{char:"8",extra:[{char:"⁸"}]},{char:"9",extra:[{char:"⁹"}]},{char:"0",extra:[{char:"∅"},{char:"ⁿ"},{char:"⁰"}]}],[{char:"@"},{char:"#",extra:[{char:"№"}]},{char:"$",extra:[{char:"₱"},{char:"€"},{char:"¢"},{char:"£"},{char:"¥"}]},{char:"_"},{char:"&"},{char:"-",extra:[{char:"—"},{char:"_"},{char:"–"},{char:"·"}]},{char:"+",extra:[{char:"±"}]},{char:"(",extra:[{char:"["},{char:"<"},{char:"{"}]},{char:")",extra:[{char:"]"},{char:">"},{char:"}"}]},{char:"/"}],[{char:"=\\<",w:1.5},{char:"*",extra:[{char:"★"},{char:"†"},{char:"‡"}]},{char:'"',extra:[{char:"„"},{char:"“"},{char:"”"},{char:"«"},{char:"»"}]},{char:"'",extra:[{char:"‚"},{char:"‘"},{char:"’"},{char:"‹"},{char:"›"}]},{char:":"},{char:";"},{char:"!",extra:[{char:"¡"}]},{char:"?",extra:[{char:"¿"},{char:"‽"}]},{char:"bksp",w:1.5}],[{char:"abc",w:1.5},{char:","},{char:"1234"},{char:"space",w:4},{char:"."},{char:"enter",w:1.5}]],nump:[[{char:"+",extra:[{char:"-"}]},{char:"1",w:2},{char:"2",w:2},{char:"3",w:2},{char:"%"}],[{char:"*"},{char:"4",w:2},{char:"5",w:2},{char:"6",w:2},{char:"space"}],[{char:"/"},{char:"7",w:2},{char:"8",w:2},{char:"9",w:2},{char:"bksp"}],[{char:"abc"},{char:","},{char:"!?#"},{char:"0",w:2},{char:"="},{char:"."},{char:"enter"}]],sym:[[{char:"〜"},{char:"`"},{char:"|"},{char:"•",extra:[{char:"♣"},{char:"♠"},{char:"♪"},{char:"♥"},{char:"♦"}]},{char:"√"},{char:"π",extra:[{char:"Ω"},{char:"Π"},{char:"μ"}]},{char:"÷"},{char:"×"},{char:"¶",extra:["§"]},{char:"Δ"}],[{char:"£"},{char:"€"},{char:"$",extra:[{char:"₱"},{char:"€"},{char:"¢"},{char:"£"},{char:"¥"}]},{char:"¢"},{char:"^",extra:[{char:"←"},{char:"↑"},{char:"↓"},{char:"→"}]},{char:"°",extra:[{char:"′"},{char:"″"}]},{char:"=",extra:[{char:"∞"},{char:"≠"},{char:"≈"}]},{char:"{",extra:[{char:"("}]},{char:"}",extra:[{char:")"}]},{char:"\\"}],[{char:"?123",w:1.5},{char:"%",extra:[{char:"‰"},{char:"℅"}]},{char:"©"},{char:"®"},{char:"™"},{char:"✓"},{char:"["},{char:"]"},{char:"bksp",w:1.5}],[{char:"abc",w:1.5},{char:"<"},{char:"space",w:5},{char:">"},{char:"enter",w:1.5}]]}},a=document.createElement("canvas"),r=a.getContext("2d"),c={bksp:"5MTEuMyA2ODMuNSI+PHBhdGggZD0iTTgzNS40IDBIMjY1LjhjLTI2LjIgMC00Ni43IDEzLjMtNjAuNCAzMy40TDAgMzQxLjhsMjA1LjQgMzA4YzEzLjcgMjAuMSAzNC4yIDMzLjggNjAuNCAzMy44aDU2OS42YzQxLjggMCA3NS45LTM0LjIgNzUuOS03NS45Vjc1LjljMC00MS43LTM0LjEtNzUuOS03NS45LTc1Ljl6bTAgNjA3LjZIMjY4LjVMOTEuMSAzNDEuOCAyNjguMSA3Nmg1NjcuM3Y1MzEuNnptLTQ0MC4xLTc2bDEzNi4zLTEzNi4zIDEzNi4zIDEzNi4zIDUzLjUtNTMuNS0xMzYuMi0xMzYuMyAxMzYuMy0xMzYuM0w2NjggMTUyIDUzMS42IDI4OC4yIDM5NS4zIDE1MS45bC01My41IDUzLjUgMTM2LjMgMTM2LjMtMTM2LjMgMTM2LjQgNTMuNSA1My41eiIvPjwvc3ZnPg==",shift:"5MTEuMyA2ODcuNSI+PHBhdGggZD0iTTQ1NS42IDY4Ny41Yy0zMy43IDAtNjUuNC0uMi04OS40LS41LTQ1LjItLjYtNDguMi0xLjQtNTIuOC0yLjgtMTcuMy00LjktMzIuMS0xNy45LTM5LjYtMzQuN2wtNS44LTEyLjgtLjMtMTMwLjctLjItOTFoLTM4LjRjLTQxLjYgMC02MC42IDAtNzIuNC0xLjEtMTQtMS4zLTI5LjYtNS4xLTM5LjQtMjQuMS01LjktMTEuMy05LjUtMjkuNCA3LTUxLjJsLjEtLjJjNi4xLTggMTEzLjEtMTI3LjcgMTQ1LjctMTY0LjIgMzYuNS00MC44IDcwLjYtNzguOSA5Ni4yLTEwNy40QzQxMiAxNS45IDQxMi42IDE1LjQgNDE1LjggMTNsLjUtLjRjNS44LTQuMyAxMy4zLTcuOCAxOC05LjVsLjUtLjJjMTYuOS01LjcgMzcuMi0zLjYgNTMuMSA1LjRsLjEuMWM5LjIgNS4zIDExLjEgNi4zIDE1Ny4xIDE2OS44IDU1LjIgNjEuNyA4OS42IDEwMC41IDExMS44IDEyNS44IDM1LjQgNDAuNCAzNi42IDQyLjkgMzkgNDkuMyA4LjggMjIuOC0uNSA0Ni0yMi44IDU2LjRsLS45LjRjLTExLjUgNC45LTE3LjQgNC45LTg5LjMgNC45SDY0NGwtLjIgOTEtLjQgMTMwLjctNS43IDEyLjdjLTcuNCAxNi44LTIyLjMgMjkuOC0zOS43IDM0LjgtNS4yIDEuNS0xMiAzLjMtMTQyLjQgMy4zek01NzcuOCA2MjNzMCAuMSAwIDB6bS0yNDQuMy0yLjFjMzcuOSAxLjYgMjA2LjYgMS42IDI0NC41IDBsLjMtMTE1IC4zLTE1Ni4yaDEzMWMtMjcuNC0zMS4zLTcxLTgwLjEtMTEzLjUtMTI3LjdDNTE2LjMgMTMyLjggNDY4LjggNzkuOSA0NTUgNjYuMiA0MjcuNiA5NiAyNjUuNSAyNzcuNCAyMDEuNCAzNDkuN2gxMzEuM0wzMzMgNTA2bC41IDExNC45eiIvPjwvc3ZnPg==",shift_perm:"5MTEuMyA4MzMuNCI+PHBhdGggZD0iTTQ1NS41IDY4Ny44Yy0zMy43IDAtNjUuNC0uMi04OS40LS41LTQ1LjItLjYtNDguMi0xLjQtNTIuOC0yLjgtMTcuMy00LjktMzIuMS0xNy45LTM5LjYtMzQuN0wyNjggNjM3bC0uNC0xMzAuNy0uMi05MUgyMjljLTQxLjYgMC02MC42IDAtNzIuNC0xLjEtMTQtMS4zLTI5LjYtNS4xLTM5LjQtMjQuMS01LjktMTEuMy05LjUtMjkuNCA3LTUxLjJsLjEtLjJjNi4xLTggMTEzLjEtMTI3LjcgMTQ1LjctMTY0LjIgMzYuNS00MC44IDcwLjYtNzguOSA5Ni4yLTEwNy40IDQ1LjctNTAuOSA0Ni40LTUxLjQgNDkuNS01My44bC41LS40YzUuOC00LjMgMTMuMy03LjggMTgtOS41bC41LS4yYzE2LjktNS43IDM3LjItMy42IDUzLjEgNS40bC4xLjFDNDk3LjEgMTQgNDk5IDE1IDY0NSAxNzguNWM1NS4yIDYxLjcgODkuNiAxMDAuNSAxMTEuOCAxMjUuOCAzNS40IDQwLjQgMzYuNiA0Mi45IDM5IDQ5LjMgOC44IDIyLjgtLjUgNDYtMjIuOCA1Ni40bC0uOS40Yy0xMS41IDQuOS0xNy40IDQuOS04OS4zIDQuOUg2NDRsLS4yIDkxLS41IDEzMC43LTUuNyAxMi43Yy03LjQgMTYuOC0yMi4zIDI5LjgtMzkuNyAzNC44LTUuMiAxLjUtMTIgMy4zLTE0Mi40IDMuM3ptMTIyLjItNjQuNXMwIC4xIDAgMHoiLz48cGF0aCBkPSJNMzAzLjggNzk3LjRoMzA0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNzIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9zdmc+",shift_down:"5MTEuMyA2ODcuNSI+PHBhdGggZD0iTTQ1NS42IDY4Ny41Yy0zMy43IDAtNjUuNC0uMi04OS40LS41LTQ1LjItLjYtNDguMi0xLjQtNTIuOC0yLjgtMTcuMy00LjktMzIuMS0xNy45LTM5LjYtMzQuN2wtNS44LTEyLjgtLjMtMTMwLjctLjItOTFoLTM4LjRjLTQxLjYgMC02MC42IDAtNzIuNC0xLjEtMTQtMS4zLTI5LjYtNS4xLTM5LjQtMjQuMS01LjktMTEuMy05LjUtMjkuNCA3LTUxLjJsLjEtLjJjNi4xLTggMTEzLjEtMTI3LjcgMTQ1LjctMTY0LjIgMzYuNS00MC44IDcwLjYtNzguOSA5Ni4yLTEwNy40QzQxMiAxNS45IDQxMi42IDE1LjQgNDE1LjggMTNsLjUtLjRjNS44LTQuMyAxMy4zLTcuOCAxOC05LjVsLjUtLjJjMTYuOS01LjcgMzcuMi0zLjYgNTMuMSA1LjRsLjEuMWM5LjIgNS4zIDExLjEgNi4zIDE1Ny4xIDE2OS44IDU1LjIgNjEuNyA4OS42IDEwMC41IDExMS44IDEyNS44IDM1LjQgNDAuNCAzNi42IDQyLjkgMzkgNDkuMyA4LjggMjIuOC0uNSA0Ni0yMi44IDU2LjRsLS45LjRjLTExLjUgNC45LTE3LjQgNC45LTg5LjMgNC45SDY0NGwtLjIgOTEtLjQgMTMwLjctNS43IDEyLjdjLTcuNCAxNi44LTIyLjMgMjkuOC0zOS43IDM0LjgtNS4yIDEuNS0xMiAzLjMtMTQyLjQgMy4zek01NzcuOCA2MjNzMCAuMSAwIDB6Ii8+PC9zdmc+",enter:"xMDAwIDY4Ny41Ij48cGF0aCBkPSJNODgxLjIgMHYzMzIuNUgzNDUuOVY5NS43TC0uMyAzOTEuN2wzNDYuMiAyOTUuOFY0NTAuN2g1OTQuNWMzMi43IDAgNTkuMi0yNi41IDU5LjItNTkuMlYwSDg4MS4yeiIvPjwvc3ZnPg==",lang:"5MTEuMyA2ODMuNSI+PHBhdGggZD0iTTQ1Ni4yLjhjLTE4OC4yIDAtMzQwLjYgMTUyLjgtMzQwLjYgMzQxczE1Mi40IDM0MSAzNDAuNiAzNDFjMTg4LjYgMCAzNDEuMy0xNTIuOCAzNDEuMy0zNDFTNjQ0LjguOCA0NTYuMi44em0yMzYuMyAyMDQuNkg1OTEuOWMtMTAuOS00Mi43LTI2LjYtODMuNi00Ny0xMjEuNCA2Mi43IDIxLjQgMTE0LjkgNjUuMSAxNDcuNiAxMjEuNHpNNDU2LjYgNzAuM2MyOC4zIDQwLjkgNTAuNSA4Ni4zIDY1LjEgMTM1SDM5MS40YzE0LjctNDguNyAzNi44LTk0LjEgNjUuMi0xMzV6bS0yNjQgMzM5LjZjLTUuNS0yMS44LTguOS00NC43LTguOS02OC4yczMuNC00Ni40IDguOS02OC4yaDExNS4zYy0yLjcgMjIuNS00LjggNDUtNC44IDY4LjJzMiA0NS43IDQuOCA2OC4ySDE5Mi42em0yOCA2OC4yaDEwMC42YzEwLjkgNDIuNiAyNi42IDgzLjUgNDcuMSAxMjEuNC02Mi44LTIxLjQtMTE1LTY0LjgtMTQ3LjctMTIxLjR6bTEwMC42LTI3Mi43SDIyMC42YzMyLjctNTYuNiA4NC45LTk5LjkgMTQ3LjYtMTIxLjQtMjAuNCAzNy44LTM2LjEgNzguNy00NyAxMjEuNHptMTM1LjQgNDA3LjhjLTI4LjMtNDAuOS01MC41LTg2LjMtNjUuMS0xMzVoMTMwLjNjLTE0LjggNDguNy0zNi45IDk0LjEtNjUuMiAxMzV6bTc5LjctMjAzLjNIMzc2LjhjLTMuMS0yMi41LTUuNS00NS01LjUtNjguMnMyLjQtNDYgNS41LTY4LjJoMTU5LjZjMy4xIDIyLjIgNS41IDQ1IDUuNSA2OC4ycy0yLjUgNDUuNy01LjYgNjguMnptOC42IDE4OS42YzIwLjUtMzcuOCAzNi4xLTc4LjggNDcuMS0xMjEuNGgxMDAuNmMtMzIuOCA1Ni4zLTg1IDEwMC0xNDcuNyAxMjEuNHptNjAuMy0xODkuNmMyLjctMjIuNSA0LjgtNDUgNC44LTY4LjJzLTItNDUuNy00LjgtNjguMmgxMTUuM2M1LjUgMjEuOCA4LjkgNDQuNyA4LjkgNjguMnMtMy40IDQ2LjQtOC45IDY4LjJINjA1LjJ6Ii8+PC9zdmc+",cached:{}},n=()=>{const t=Object.keys(c).filter(t=>!1===["cached"].includes(t)),e=[];return t.forEach(t=>{e.push((t=>new Promise(e=>{if(c.cached[t])return e(c.cached[t]);const a=new Image;a.src="".concat("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA").concat(c[t]),a.onload=()=>{c.cached[t]=a,e(a)}}))(t))}),Promise.all(e)},h=(t,n,h,i,o,s)=>{const u=c.cached[s];if(!u)return;const l=u.width/u.height;r.clearRect(0,0,a.width,a.height),a.width=e.fontSize*e.resolution*1.5,a.height=a.width/l;const g=(i-a.width)/2,M=(o-a.height)/2;r.drawImage(u,0,0,a.width,a.height),r.fillStyle=t.fillStyle;const L=r.globalCompositeOperation;r.globalCompositeOperation="source-in",r.fillRect(0,0,a.width,a.height),r.globalCompositeOperation=L,t.drawImage(a,n+g,h+M,a.width,a.height)},i={canvas:document.createElement("canvas"),activeElement:null,activePopupElement:null,activeSuggestionElement:null,mouseDown:!1,previousMouseState:!1,mousePos:{x:0,y:0},textureDirty:!0,selectedLanguage:null,layout:null,currentLayout:null,margin:null,buttonSize:null,buttonHeight:null,shiftDown:!1,shiftDownTime:null,perfmaShift:!1,keyPopup:!1,widthUnits:null,holdTimeout:null,bkspInterval:null,swipeActive:!1,swipePoints:[],swipeDrawInterval:null,swipePlacedWord:!1,swipeLoadingProgress:0,suggestions:[],uninterruptedString:"",stateChange:!1},o=document.createElement("canvas"),s=()=>"center"===e.align?o.height/2-i.layout.length*i.buttonHeight*.5:2*i.buttonHeight+4*i.margin,u=()=>{let t=0;for(let e=0;e<i.layout.length;e++){const a=i.layout[e];let r=0;for(let t=0;t<a.length;t++){const e=a[t];r+=e.w?e.w:1}r>t&&(t=r)}return t},l=()=>{let t=u();const e=(i.widthUnits-t)/2;return e*i.buttonSize+e*i.margin},g=t=>{const e=i.layout[t];let a=0;for(let t=0;t<e.length;t++){const r=e[t];a+=r.w?r.w:1}const r=(i.widthUnits-a)/2;return r*i.buttonSize+r*i.margin},M=(t,e)=>{let a=5;e.length>a&&(a=Math.ceil(e.length/2));const r=new Array(Math.ceil(e.length/a)).fill().map(t=>e.splice(0,a)),c=r[0].length*i.buttonSize,n=r.length*i.buttonHeight,h=Math.floor(r[0].length/2)*i.buttonSize;let s=t.x-h;for(r[0].length>1&&r[0].length%2==0&&(s+=i.buttonSize);s<0;)s+=i.buttonSize;for(;s+r[0].length*i.buttonSize>o.width;)s-=i.buttonSize;return{keyArr:r,popupWidth:c,popupHeight:n,startX:s,startY:t.y-i.buttonHeight-3*i.margin}},L=()=>{const t=i.suggestions.slice(0,3),e=3*i.buttonSize;return{suggestions:t,suggestionSize:e,totalWidth:t.length*(e+i.margin)-i.margin}},j=(t,e)=>{const a=t.x-e.x,r=t.y-e.y;return Math.sqrt(a*a+r*r)},w=(t,e)=>{const a=t.x-e.x,r=t.y-e.y;return Math.atan2(r,a)},p=t=>{let e="";for(let a=0;a<t.length;a++)-1===e.indexOf(t.charAt(a))&&(e+=t[a]);return e};function d(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function N(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function y(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?N(Object(a),!0).forEach((function(e){d(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var S={compareTwoStrings:x,findBestMatch:function(t,e){if(!function(t,e){return"string"==typeof t&&(!!Array.isArray(e)&&(!!e.length&&!e.find(t=>"string"!=typeof t)))}(t,e))throw new Error("Bad arguments: First argument should be a string, second should be an array of strings");const a=[];let r=0;for(let c=0;c<e.length;c++){const n=e[c],h=x(t,n);a.push({target:n,rating:h}),h>a[r].rating&&(r=c)}const c=a[r];return{ratings:a,bestMatch:c,bestMatchIndex:r}}};function x(t,e){if(t=t.replace(/\s+/g,""),e=e.replace(/\s+/g,""),!t.length&&!e.length)return 1;if(!t.length||!e.length)return 0;if(t===e)return 1;if(1===t.length&&1===e.length)return 0;if(t.length<2||e.length<2)return 0;let a=new Map;for(let e=0;e<t.length-1;e++){const r=t.substring(e,e+2),c=a.has(r)?a.get(r)+1:1;a.set(r,c)}let r=0;for(let t=0;t<e.length-1;t++){const c=e.substring(t,t+2),n=a.has(c)?a.get(c):0;n>0&&(a.set(c,n-1),r++)}return 2*r/(t.length+e.length-2)}const f=o.getContext("2d"),D=(t,e,a,r,c)=>{a<2*c&&(c=a/2),r<2*c&&(c=r/2),f.beginPath(),f.moveTo(t+c,e),f.arcTo(t+a,e,t+a,e+r,c),f.arcTo(t+a,e+r,t,e+r,c),f.arcTo(t,e+r,t,e,c),f.arcTo(t,e,t+a,e,c),f.closePath(),f.fill()},m=(t,a,r,c,n,h)=>{if(h||(h=e.fontSize*e.resolution),f.font="".concat(h,"px ").concat(e.font),f.textBaseline="middle",!n)return;if(n.length>2){let t=f.measureText(n);for(;h>4&&t.width>r-2*i.margin;)h--,f.font="".concat(h,"px ").concat(e.font),t=f.measureText(n)}const o=(r-f.measureText(n).width)/2,s=c/2;f.fillText(n,t+o,a+s)},T=(t,a,r,c,n,h,i)=>{const o=w({x:c,y:n},{x:t,y:a})+Math.PI/2;f.fillStyle=e.colors.down;const s=new Path2D;return s.arc(t,a,r,o,o+Math.PI),s.arc(c,n,h,o+Math.PI,o),s.closePath(),f.beginPath(),f.fill(s),f.closePath(),f},I=()=>{f.clearRect(0,0,o.width,o.height),(()=>{const t=s();f.shadowBlur=e.keyShadow.shadowBlur,f.shadowOffsetX=e.keyShadow.shadowOffsetX,f.shadowOffsetY=e.keyShadow.shadowOffsetY;let a=t;for(let t=0;t<i.layout.length;t++){const r=i.layout[t];let c=i.margin+l()+g(t);for(let t=0;t<r.length;t++){const n=r[t];let o=n.w?n.w:1;f.fillStyle=e.colors.hover,n.down?f.fillStyle=e.colors.down:n.hover?f.fillStyle=e.colors.hover:f.fillStyle=e.colors.idle;let s=i.buttonSize*o;if(s+=(o-1)*i.margin,f.shadowColor=e.keyShadow.shadowColor,D(c,a,s,i.buttonHeight,e.buttonRadius*e.resolution),f.shadowColor="transparent",f.fillStyle=e.colors.text,n.pos={x:c,y:a},["shift","bksp","enter","lang"].includes(n.char)){let t=n.char;"shift"===n.char&&i.shiftDown&&(t="shift_down"),"shift"===n.char&&i.permaShift&&(t="shift_perm"),h(f,c,a,s,i.buttonHeight,t)}else{let t=i.shiftDown&&1===n.char.length?n.char.toUpperCase():n.char;if("space"===t&&(t="␣"),m(c,a,s,i.buttonHeight,t),n.alt){const t=.6*e.fontSize*e.resolution;m(c+s/2-t/2,a-i.buttonHeight/2+t,s,i.buttonHeight,n.alt,t)}}c+=s+i.margin}a+=i.buttonHeight+i.margin}})(),e.swipe&&((()=>{if(i.suggestions.length>0){const t=s()-i.buttonHeight-3*i.margin,{suggestions:a,suggestionSize:r,totalWidth:c}=L();let n=o.width/2-c/2;a.forEach(a=>{a.down?f.fillStyle=e.colors.down:a.hover?f.fillStyle=e.colors.hover:f.fillStyle=e.colors.idle,D(n,t,r,i.buttonHeight,e.buttonRadius*e.resolution),f.fillStyle=e.colors.text,m(n,t,r,i.buttonHeight,a.char),n+=r+i.margin})}})(),(()=>{if(i.swipeLoadingProgress<1){const t=120*e.resolution,a=1.5*e.swipeLoadingFontSize*e.resolution,r=o.width/2-t/2,c=s()-a-i.margin;f.fillStyle=e.colors.idle,D(r,c,t,a,e.buttonRadius*e.resolution),f.fillStyle=e.colors.text;const n=e.swipeLoadingFontSize*e.resolution;m(r,c,t,e.fontSize*e.resolution,"loading swipe ".concat(Math.floor(100*i.swipeLoadingProgress),"%"),n)}})()),(()=>{if(f.shadowBlur=e.popupShadow.shadowBlur,f.shadowOffsetX=e.popupShadow.shadowOffsetX,f.shadowOffsetY=e.popupShadow.shadowOffsetY,i.activeElement&&i.activeElement.extra&&i.activeElement.down&&!i.swipeActive){const{pos:t}=i.activeElement,{startX:a,startY:r,keyArr:c,popupWidth:n,popupHeight:h}=M(t,i.keyPopup?[...i.activeElement.extra]:[i.activeElement]);f.fillStyle=e.colors.idle,f.shadowColor=e.popupShadow.shadowColor,D(a,r-i.buttonHeight*(c.length-1),n,h,e.buttonRadius*e.resolution),D(t.x,t.y-i.buttonHeight,i.buttonSize,2*i.buttonHeight,e.buttonRadius*e.resolution),f.shadowColor="transparent";let o=r;for(let t=0;t<c.length;t++){const r=c[t];let n=a;for(let t=0;t<r.length;t++){const a=r[t];a.down?f.fillStyle=e.colors.down:a.hover?f.fillStyle=e.colors.hover:f.fillStyle=e.colors.idle,D(n,o,i.buttonSize,i.buttonHeight,e.buttonRadius*e.resolution),f.fillStyle=e.colors.text;const c=i.shiftDown&&a.char.length<=2?a.char.toUpperCase():a.char;m(n,o,i.buttonSize,i.buttonHeight,c),i.keyPopup||m(n,o+i.buttonHeight/2,i.buttonSize,i.buttonHeight/2,"..."),n+=i.buttonSize}o-=i.buttonHeight}}})(),e.swipe&&(()=>{if(i.swipePoints.length>1){i.swipeDrawInterval||(i.swipeDrawInterval=setInterval(I,e.swipeIdleDrawInterval));for(let t=1;t<i.swipePoints.length;t++){const a=i.swipePoints[t-1],r=(Date.now()-a.t)/e.swipeDrawingLifeTime,c=e.swipeDrawingSize*(1-r),n=i.swipePoints[t],h=(Date.now()-n.t)/e.swipeDrawingLifeTime,o=e.swipeDrawingSize*(1-h);r>=1?(i.swipePoints.splice(t-1,1),t--):T(a.x,a.y,c,n.x,n.y,o)}}else i.swipeDrawInterval&&(clearInterval(i.swipeDrawInterval),i.swipeDrawInterval=null)})(),i.stateChange=!1,i.textureDirty=!0},E={};let z=!1,v=[],b=[],A=[],C=[],O=null,P=null,Y=null,k=null,Q=0,U=null,H=null;const W=()=>{i.swipeLoadingProgress=1,z=!0,I()},R=t=>{B();const a=t.toString().split("\n");for(let t=0;t<a.length;t++){const r=a[t].replace("\r","");if(1===r.length)continue;let c=null,n=null;const h=Math.min(r.length,e.swipeMaxWordDepth);for(let t=0;t<h;t++){const e=J(r.charAt(t));e!==n&&(null===c?(void 0===E[i.selectedLanguage][e]&&(E[i.selectedLanguage][e]={}),c=E[i.selectedLanguage][e]):(void 0===c[e]&&(c[e]={}),c=c[e])),0===t&&(void 0===c.allWords&&(c.allWords=[]),c.allWords.push(r)),t===h-1&&(void 0===c.words&&(c.words=[]),c.words.push(r)),n=e}}},B=()=>{E[i.selectedLanguage].specialCharacterMap={};const{specialCharacterMap:t}=E[i.selectedLanguage];i.layout.forEach(e=>{e.forEach(e=>{e.char.length<=2&&e.extra&&e.extra.forEach(a=>{t[a.char]=e.char})})})},_=()=>{z&&(F(),i.swipeActive?(K(),i.uninterruptedString=""):$(i.uninterruptedString),nt())},J=t=>{let e=E[i.selectedLanguage].specialCharacterMap[t];return void 0!==e?e:t},F=()=>{const t=i.activeElement;if(!t)return;const e=J(t.char);v[v.length-1]===e||e.length>2||(v.push(e),at(),X(e))},X=t=>{if(0===b.length){const e=E[i.selectedLanguage][t];Z(e)}else A=[],b.forEach(e=>{if(e){const a=e[t];Z(a)}})},Z=t=>{if(!t)return;Object.keys(t).filter(t=>"words"!==t).length>0&&(b.push(t),A.push(t)),V(t)},V=t=>{const{words:e}=t;e&&(C=C.concat(e))},G=()=>{if(!P)return void(P=y({},i.mousePos));let t=v[v.length-1];if(k===t)return;if(j(i.mousePos,P)>=e.swipeMinimumVectorLength){let a=w(i.mousePos,P);if(Y){const r=q(a,Y);Math.abs(r)>e.swipeMinimumAngleDifference&&(b=[...A],A=[],k=t)}Y=a,P=y({},i.mousePos)}},q=(t,e)=>Math.atan2(Math.sin(t-e),Math.cos(t-e)),K=()=>{const t=v[v.length-1];let e=C.filter(e=>J(e.charAt(e.length-1))===t);e.sort((function(t,e){return p(e).length-p(t).length})),e=e.filter((t,e,a)=>a.indexOf(t)===e),tt(e)},$=(t,a=!1,r=[])=>{if(a||rt(),""===t)return void(i.suggestions=[]);const c=J(t.charAt(0)),n=E[i.selectedLanguage][c];if(!n||!n.allWords)return void(i.suggestions=[]);const h=n.allWords,o=h.slice(Q,Q+e.suggestionCrawlStep);let s;h&&(s=S.findBestMatch(t,o).ratings,s.sort((t,e)=>e.rating-t.rating),s=s.slice(0,4).filter(e=>e.target!==t),s=s.concat(r),s.sort((t,e)=>e.rating-t.rating),s=s.slice(0,3)),Q+=e.suggestionCrawlStep,Q<h.length?U=setTimeout(()=>{$(t,!0,s)},0):(tt(s.map(t=>t.target)),I())},tt=t=>{i.suggestions=t.map(t=>({char:t,suggestion:!0}))},et=()=>{i.suggestions=[],i.uninterruptedString=""},at=()=>{P=null,Y=null,k=null},rt=()=>{Q=0,clearTimeout(U),U=null},ct=()=>{if(!i.swipeActive)return;const t=i.swipePoints[i.swipePoints.length-1];if(t){if(j(t,i.mousePos)<e.swipeMinimumVectorLength)return}i.swipePoints.push(y(y({},i.mousePos),{},{t:Date.now()}))},nt=()=>{v=[],b=[],A=[],C=[],O=null,at()},ht=t=>{e.layouts[t]&&(i.selectedLanguage=t,it(t),e.swipe&&(()=>{if(z=!1,void 0!==E[i.selectedLanguage])return W();i.swipeLoadingProgress=0;H&&H.abort(),H=new XMLHttpRequest,H.open("GET","".concat("./wordlist/").concat(i.selectedLanguage,".txt"),!0),H.responseType="text",H.onload=function(){H.readyState===H.DONE&&200===H.status&&(E[i.selectedLanguage]={},R(H.responseText),W())},H.onprogress=function(t){i.swipeLoadingProgress=t.loaded/t.total,I()},nt(),H.send(null)})())},it=t=>{i.layout=e.layouts[t],i.currentLayout=t,i.widthUnits=u();const a=(i.widthUnits+1)*i.margin;i.buttonSize=(o.width-a)/i.widthUnits,i.uninterruptedString="",i.stateChange=!1,I()},ot=()=>{o.width=512*e.resolution,o.height=o.width/e.aspect,i.margin=e.margin*e.resolution,i.buttonHeight=e.buttonHeight*e.resolution,i.currentLayout&&it(i.currentLayout)};function st(){}Object.assign(st.prototype,{addEventListener:function(t,e){void 0===this._listeners&&(this._listeners={});var a=this._listeners;void 0===a[t]&&(a[t]=[]),-1===a[t].indexOf(e)&&a[t].push(e)},removeEventListener:function(t,e){if(void 0!==this._listeners){var a=this._listeners[t];if(void 0!==a){var r=a.indexOf(e);-1!==r&&a.splice(r,1)}}},dispatchEvent:function(t){if(void 0!==this._listeners){var e=this._listeners[t.type];if(void 0!==e){t.target=this;for(var a=e.slice(0),r=0,c=a.length;r<c;r++)a[r].call(this,t)}}}});const ut=new st,lt=(t,a)=>{let r=null,c=t.char;t.char.length<=2&&!e.languages.includes(t.char.toLowerCase())&&(r=a?t.char.toUpperCase():t.char);let n=!1;t.suggestion&&(r=t.char+" ",c="suggestion",i.swipePlacedWord&&i.uninterruptedString.length&&(i.uninterruptedString+=" "),i.uninterruptedString.length&&(n=!0)),i.swipePlacedWord&&"bksp"==t.char&&(n=!0);var h=i.uninterruptedString.length;if(n){i.uninterruptedString="";for(let t=0;t<h;t++)lt({char:"bksp"})}"space"===t.char&&(r=" "),ut.dispatchEvent({type:gt,key:c,char:r})},gt="keyDown";var Mt=Object.freeze({__proto__:null,dispatcher:ut,addEventListener:(t,e)=>{ut.addEventListener(t,e)},removeEventListener:(t,e)=>{ut.removeEventListener(t,e)},dispatchEvent:lt,KEYDOWN:gt});const Lt=()=>{if(!i.activeElement||!i.activeElement.extra)return;if(!i.mouseDown)return yt(i.activePopupElement),!0;const{x:t,y:e}=i.mousePos,{pos:a}=i.activeElement,{startX:r,startY:c,keyArr:n,popupWidth:h,popupHeight:o}=M(a,[...i.activeElement.extra]);let s=null,u=Number.POSITIVE_INFINITY,l=c+i.buttonHeight/2;for(let a=0;a<n.length;a++){const c=n[a];let h=r+i.buttonSize/2;for(let a=0;a<c.length;a++){const r=c[a],n=j({x:t,y:e},{x:h,y:l});n<u&&(s=r,u=n),h+=i.buttonSize}l-=i.buttonHeight}return i.activePopupElement&&i.activePopupElement===s&&i.activePopupElement.down===i.mouseDown||(pt(),i.activePopupElement=s,i.activePopupElement.hover=!0,i.activePopupElement.down=!0,i.stateChange=!0),t>r&&t<r+h&&e>c-i.buttonHeight*(n.length-1)&&e<c-i.buttonHeight*(n.length-1)+o||t>a.x&&t<a.x+i.buttonSize&&e>a.y-i.buttonHeight&&e<a.y+i.buttonHeight},jt=()=>{i.activeElement&&(i.activeElement.hover=!1,i.activeElement.down=!1,i.activeElement=null)},wt=()=>{i.activeSuggestionElement&&(i.activeSuggestionElement.hover=!1,i.activeSuggestionElement.down=!1,i.activeSuggestionElement=null)},pt=()=>{i.activePopupElement&&(i.activePopupElement.hover=!1,i.activePopupElement.down=!1,i.activePopupElement=null)},dt=()=>{i.holdTimeout&&clearTimeout(i.holdTimeout),i.bkspInterval&&clearInterval(i.bkspInterval),i.keyPopup=!1},Nt=()=>{dt(),i.holdTimeout=setTimeout(()=>{i.swipeActive||(i.keyPopup=!0,pt(),Lt(),I(),i.activeElement&&"bksp"===i.activeElement.char&&(i.bkspInterval=setInterval(()=>{if(i.activeElement&&(lt(i.activeElement),e.swipe)){const t=i.uninterruptedString;i.uninterruptedString=i.uninterruptedString.substr(0,i.uninterruptedString.length-1),t!==i.uninterruptedString&&(_(),I())}},e.bkspIntervalTime)))},e.holdPopupTime)},yt=t=>{if(pt(),wt(),jt(),dt(),!i.swipeActive){switch(lt(t,i.shiftDown),t.suggestion&&et(),t.char){case"abc":it(i.selectedLanguage);break;case"!?#":case"?123":it("num");break;case"=\\<":it("sym");break;case"1234":it("nump");break;case"shift":!i.permaShift&&Date.now()-i.shiftDownTime<e.shiftDoubleTapTimeout?(i.shiftDown=!0,i.permaShift=!0,i.shiftDownTime=0):(i.shiftDown=!i.shiftDown,i.permaShift=!1,i.shiftDownTime=Date.now()),i.stateChange=!0;break;case"lang":for(let t=0;t<e.languages.length;t++)if(e.languages[t]===i.selectedLanguage){let a=t+1;e.languages[a]||(a=0),ht(e.languages[a]);break}break;default:e.languages.includes(t.char.toLowerCase())?ht(t.char.toLowerCase()):(i.shiftDown&&!i.permaShift&&(i.shiftDown=!1),e.swipe&&(["space","enter"].includes(t.char)&&et(),"bksp"===t.char?i.uninterruptedString=i.uninterruptedString.substr(0,i.uninterruptedString.length-1):i.swipePlacedWord&&(i.uninterruptedString=""),i.currentLayout===i.selectedLanguage&&t.char.length<=2&&(i.uninterruptedString+=t.char)),i.stateChange=!0)}return i.swipePlacedWord=!1,t}},St=ht,xt=it,ft=(t,a,r)=>{e.resolution=r,i.buttonHeight=e.buttonHeight*e.resolution,i.margin=e.margin*e.resolution;const c=(i.layout.length*i.buttonHeight+(i.layout.length+1)*i.margin+(2*i.buttonHeight+3*i.margin))/e.resolution;a=Math.max(a,c),o.width=t*e.resolution,o.height=a*e.resolution,o.style.width="".concat(t,"px"),o.style.height="".concat(a,"px"),i.currentLayout&&it(i.currentLayout)},Dt=ot,mt=(t,e,a)=>{if(i.mouseDown=t,void 0!==e?Tt(e,a):Tt(i.mousePos.x,i.mousePos.y),!i.mouseDown&&i.swipeActive){if(i.suggestions.length>0){const t=i.suggestions.shift();lt(t,i.shiftDown),i.uninterruptedString=t.char,i.swipePlacedWord=!0}i.swipeActive=!1}},Tt=(t,a)=>{let r;i.mousePos.x=t,i.mousePos.y=a,i.keyPopup&&(r=Lt()),!r&&e.swipe&&(r=(()=>{const{x:t,y:e}=i.mousePos,a=s()-i.buttonHeight-3*i.margin,{suggestions:r,suggestionSize:c,totalWidth:n}=L();let h=o.width/2-n/2;for(let n=0;n<r.length;n++){const o=r[n];if(t>h&&t<h+c&&e>a&&e<a+i.buttonHeight){if(!i.activeSuggestionElement||i.activeSuggestionElement!==o||i.activeSuggestionElement.down!==i.mouseDown){if(i.activeSuggestionElement===o&&i.activeSuggestionElement.down&&!i.mouseDown)return yt(i.activeSuggestionElement);wt(),i.activeSuggestionElement=o,i.activeSuggestionElement.hover=!0,i.activeSuggestionElement.down=i.mouseDown,i.stateChange=!0}return i.activeSuggestionElement}h+=c+i.margin}})()),r||(r=(()=>{const{x:t,y:e}=i.mousePos,a=s(),r=Math.floor((e-a)/(i.buttonHeight+i.margin)),c=i.layout[r];if(!c)return;let n=i.margin+l()+g(r);for(let e=0;e<c.length;e++){const a=c[e];let r=a.w?a.w:1,h=i.buttonSize*r;h+=(r-1)*i.margin;let o=t>n;if(n+=h+i.margin,o&&t<n-i.margin){if(!i.activeElement||i.activeElement!==a||i.activeElement.down!==i.mouseDown){if(i.activeElement===a&&i.activeElement.down&&!i.mouseDown)return yt(i.activeElement);jt(),i.activeElement=a,i.activeElement.hover=!0,i.activeElement.down=i.mouseDown,i.activeElement.down?Nt():dt(),i.stateChange=!0}return i.activeElement}}})()),e.swipe&&i.mouseDown&&!i.keyPopup&&(()=>{if(!z)return;O||(O=y({},i.mousePos));j(i.mousePos,O)>e.swipeMinimumDistance*e.resolution&&(i.swipeActive=!0),ct(),i.activeElement&&G(),F()})(),r||!i.activeElement&&!i.activeSuggestionElement||(jt(),wt(),i.stateChange=!0),e.swipe&&!i.mouseDown&&i.previousMouseState&&(i.keyPopup||_(),i.stateChange=!0),i.previousMouseState=i.mouseDown,i.stateChange&&I()},It=et;t.addListeners=()=>{const t=(t,a)=>{const r=o.getBoundingClientRect();return t-=r.x,a-=r.y,[t*e.resolution,a*e.resolution]};document.addEventListener("mousemove",e=>{Tt(...t(e.clientX,e.clientY))}),o.addEventListener("mousedown",e=>{mt(!0,...t(e.clientX,e.clientY)),e.preventDefault()}),document.addEventListener("mouseup",t=>{mt(!1)}),document.addEventListener("touchmove",e=>{const a=e.touches[0];Tt(...t(a.clientX,a.clientY)),e.preventDefault()},{passive:!1}),o.addEventListener("touchstart",e=>{const a=e.touches[0];mt(!0,...t(a.clientX,a.clientY)),e.preventDefault()},{passive:!1}),document.addEventListener("touchend",t=>{mt(!1)},{passive:!1})},t.events=Mt,t.getActiveElement=()=>i.activeElement,t.getCanvas=()=>o,t.getTextureDirty=()=>i.textureDirty,t.init=t=>{Object.assign(e,t),e.languages.forEach(t=>{const a=e.layouts[t][3][2];a.extra=[],e.languages.forEach(t=>{a.extra.push({char:t.toUpperCase()})})}),ot(),ht(e.language),n().then(()=>{I()})},t.resetSuggestionInput=It,t.selectLanguage=St,t.setLayout=xt,t.setMouseDown=mt,t.setMousePos=Tt,t.setMousePosFromUV=(t,e)=>{Tt(o.width*t,o.height*e)},t.setScreenSizeFromAspectRatio=Dt,t.setScreenSizeInPixels=ft,t.setTextureDirty=t=>{i.textureDirty=t},Object.defineProperty(t,"__esModule",{value:!0})}));
