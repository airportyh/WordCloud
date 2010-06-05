var CommonWords = {}
CommonWords.english = "a about after again against all an another any and are as at\
 be being been before but by\
 can could\
 did do don't down\
 each\
 few from for\
 get got great\
 had has have he her here his him himself hers how\
 i if i'm in into is it it's\
 just\
 like\
 made me more most my\
 no not\
 of off on once one only or other our out over own\
 said she should so some such\
 than that the their them then there these they this those through to too\
 under until up\
 very\
 was wasn't we were we're what when where which while who why will with would wouldn't\
 you your".split(' ')

var ColorPalates = {}
ColorPalates.autumn = 
[
    [255, 136, 64],
    [149, 141, 79],
    [115, 123, 85],
    [89, 85, 64],
    [81, 62, 56]
]

/* ============== Util Functions ========================== */

function getText(elm, excludeTags){
	if (elm.nodeType == 3) return elm.nodeValue
	if (excludeTags && elm.tagName && 
	    excludeTags.indexOf(elm.tagName.toLowerCase()) != -1) return ''
	var ret = ''
	for (var i = 0; i < elm.childNodes.length; i++){
		ret += getText(elm.childNodes[i], excludeTags)
	}
	return ret
}

function keys(obj){
    var ret = []
    for (var key in obj) ret.push(key)
    return ret
}

function tokenize(text, commonWords){
    return text
        .replace(/[^\'a-zA-Z]/g, ' ')
        .split(' ')
        .filter(function(p){return p != ''})
        .map(function(word){
            return word.toLowerCase()
        })
        .filter(function(word){
        	return commonWords.indexOf(word) == -1
        })
}

function wordSummary(text, commonWords){
    var words = tokenize(text, commonWords)
    var freq = {}
    words.forEach(function(word){ 
        freq[word] = (freq[word] || 0) + 1
    })
    return freq
}

function calculateSizeScale(freq){
    var max = 0
    keys(freq).forEach(function(word){
        if (freq[word] > max)
            max = freq[word]
    })
    return 150 / max
}


/* ========== Layouts ============================ */

var Layouts = {}

Layouts.random = function RandomLayout(freq, canvas, colors){
    var context = canvas.getContext('2d')
    var sizeScale = calculateSizeScale(freq)
    keys(freq).forEach(function(word){
        var x = Math.random() * canvas.width
        var y = Math.random() * canvas.height
        var c = Math.floor(Math.random() * colors.length)
        console.log('color index: ' + c)
        var c = colors[c]
        context.fillStyle = 'rgba(' + c[0] + ', ' + c[1] + ', ' + c[2] + ', 0.6)'
        context.font = (freq[word] * sizeScale) + 'px Arial'
        context.fillText(word, x, y)
    })
}

Layouts.packed = function PackedLayout(freq, canvas, colors){
    var context = canvas.getContext('2d')
    var sizeScale = calculateSizeScale(freq)
    keys(freq).forEach(function(word){
        var fontSize = boxHeight = freq[word] * sizeScale
        context.font = fontSize + 'px Arial'
        var boxWidth = context.measureText(word)
        
    })
}

/* =========== Main ============================== */

function main(){
    var layout = Layouts.random
    var text = getText(document.body, ['script'])
    var commonWords = CommonWords.english
    var freq = wordSummary(text, commonWords)
    var palate = ColorPalates.autumn
    var canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.innerHTML = ''
    document.body.appendChild(canvas)
    document.body.style.padding = '0'
    document.body.style.margin = '0'
    document.body.style.overflow = 'hidden'
    layout(freq, canvas, palate)
}

