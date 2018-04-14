/*
 * index.js
 * Copyright (C) 2018 transpalette <transpalette@translaptop>
 *
 * Distributed under terms of the MIT license.
 */
  
window.onload = function() {
    var photos = [
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
	    'https://placehold.it/850x850',
    ];

   $('#start').click(function(e) {
     $('#header').slideUp("slow", function() {
	 $('#placeholder').fadeOut('fast');
	 $('.gaze').slideDown("slow");
	setTimeout(slideShow, 3000);
     });
   });

  var previousClock = null;
  var i = 0;
  var read = false;
  var coords = new Array(photos.length);
  var interval = 50; //ms

    function setListener() {
	webgazer.setRegression('ridge') /* currently must set regression and tracker */
	  .setTracker('clmtrackr')
	  .setGazeListener(function(data, clock) {
	    if (read && (previousClock == null || (clock - previousClock) >= interval)) {
	      if (typeof coords[i] == 'undefined') {
	      	coords[i] = [];
	      	console.log(coords);
	      }

	      coords[i].push(data);
	    }
	  })
	  .begin()
	  .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    }


    function slideShow() {
	$('.gaze').attr('src', photos[i]).fadeIn('slow')
	read = true;
	window.setInterval(changeImage, 10000);
    }

  function sendData() {
    console.log(coords[i]);
  }

  function submit() {
    console.log(coords);
  }

    function changeImage() {
	if (i >= photos.length) {
	  submit();
	  return;
	}

	read = false;
	sendData();
	$('.gaze').fadeOut('slow');
	$('.gaze').attr('src', photos[i++]).fadeIn('slow')
	read = true;
    }
  
    setTimeout(setListener, 300);
};
