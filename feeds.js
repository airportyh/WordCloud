function loadFeed(){
   var url = 'http://tobyho.com'
   var numEntries = 10
   WordyClouds.loadFromFeed(url, numEntries)
}
window.onload = loadFeed