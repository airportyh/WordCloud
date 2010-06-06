var canvas, context

function go(){
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    context = canvas.getContext('2d')
    var fontName = 'Georgia'
    var fontHeight = 20
    var text = 'I am side ways!'
    canvas.width = 300
    canvas.height = 500
    context.font = fontHeight + 'px ' + fontName
    var textWidth = context.measureText(text).width
    context.save()
    context.translate(fontHeight, textWidth)
    context.rotate(-Math.PI / 2)
    context.fillText(text, 0, 0)
    context.restore()
    context.fillText('I am straight!', fontHeight, fontHeight)
}

window.onload = go