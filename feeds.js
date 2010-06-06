function loadFeed(){
   var url = 'http://tobyho.com/user/airportyh/rss.xml'
   var numEntries = 10
   WordyClouds.loadFromFeed(url, numEntries)
}
window.onload = loadFeed