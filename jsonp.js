var JSONP = {}
JSONP.get = function(url, callback){
    var scriptTag = document.createElement('script')
    var callbackName = '_' + new Date().getTime()
    window[callbackName] = function(){
        callback.apply(null, arguments)
        delete window[callbackName]
    }
    if (url.indexOf('?') != -1)
        url += '&callback=' + callbackName
    else
        url += '?callback=' + callbackName
    scriptTag.src = url
    document.head.appendChild(scriptTag)
}