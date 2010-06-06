var canvas, context

function toAscii(imgData){
    var arr = imgData.data
    var height = imgData.height
    var width = imgData.width
    var ret = ''
    for (var y = 0; y < height; y++){
        for (var x = 0; x < width; x++){
            var i = (x + width * y) * 4
            var a = arr[i + 3]
            if (a > 180)
                ret += '0'
            else if (a > 90)
                ret += 'O'
            else if (a > 10)
                ret += '.'
            else
                ret += ' '
        }
        ret += '\n'
    }
    return ret
}

function go(){
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    context = canvas.getContext('2d')
    var fontName = 'Georgia'
    var fontHeight = 20
    var text = 'qftijQFTIJ'
    context.font = fontHeight + 'px ' + fontName
    canvas.width = context.measureText(text).width
    canvas.height = fontHeight
    context.font = fontHeight + 'px ' + fontName
    context.fillText(text, 0, fontHeight)
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height)
    console.log(toAscii(imgData))
}

window.onload = go