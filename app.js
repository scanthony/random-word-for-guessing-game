// Encoding: UTF-8

(function(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('/service-worker.js')
     .then(function() { 
        console.log('Service Worker Registered'); 
      });
  }    
})()

var cacheName = '畅玩猜词';
var filesToCache = [
'/index.html',
'/style.css',
'/app.js',
'/jquery-1.11.3.min.js',
'/jquery.mobile-1.4.5.min.js',
'/jquery.mobile-1.4.5.min.css'
/* ...and other assets (jQuery, Materialize, fonts, etc) */
];

self.addEventListener('install', function(e) {
console.log('[ServiceWorker] Install');
e.waitUntil(
  caches.open(cacheName).then(function(cache) {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  })
);
});

word_list = ["短语1",
          "短语2",
          "短语3",
          "短语4",
          "短语5",
		  "短语6",
          "短语7",
          "短语8",
          "短语9",
          "短语0",]

ind = -1

if (ind < 0) {
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }

  shuffleArray(word_list)
}

len = word_list.length

$(document).ready(function(){

  $( window ).on( "swipeleft", function() {
      handle()
      console.log(ind)
  } )
  
   function handle() {
      if (ind + 1 <= len -1) {
          ind = ind + 1
          $('#disp').text(word_list[ind])
      } else {
        ind = len;
        $('#disp').text("猜词结束！")
      }
   }

   $( window ).on( "swiperight", function() {
      handleBack()
      console.log(ind)
  } )
  
   function handleBack() {
      if (ind - 1 >= 0) {
          ind = ind - 1
          $('#disp').text(word_list[ind])
      }
   }
});

window.onbeforeunload = function(e){
  e = e || window.event;

  if (e) {
      // 兼容IE8和Firefox 4之前的版本
      e.returnValue = "猜词进行中，确认离开吗？";
  }

  return "猜词进行中，确认离开吗？";
}

