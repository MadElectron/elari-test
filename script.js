const videoWrapper = $('.video-wrapper');
const video = videoWrapper.find('video')[0];
const videoText = $('.video-text');

let videoRewind = true; // if video needs to be rewound
let videoPlaying = true; // if video can be played (is not permanently stopped)

/**
 * Applies callbackInSight function to node if it's in sight,
 * and callbackOffSight function if it's not
 */
function changeNodeBySight(node, callbackInSight, callbackOffSight) {
  let nodeTop = node.offset().top;
  let nodeBottom = nodeTop + node.height();

  let top = $(window).scrollTop();
  let bottom = top + $(window).height();  

  if (bottom > nodeTop && top < nodeBottom) {
    callbackInSight();
  } else {
    callbackOffSight();
  }
}

/**
 * Applies changeNodeBySight to all needed elements
 */
function changeNodes() {

  changeNodeBySight(videoWrapper, function() {
    playFromStart(video);
  }, function(){

    // Video reinitialises: it can be played and is rewound
    videoRewind = true;
    videoPlaying = true;
  });

  changeNodeBySight(videoText, function() {
    videoText.removeClass('hidden').addClass('fadeIn');
  }, function(){
    videoText.removeClass('fadeIn').addClass('hidden');
  });
}

/**
 * Plays video if it's paused
 */
function playOnCheck(video) {
  if (video.paused) {
    video.play();
  }
}

/**
 * Pauses video if it's playing
 */
function pauseOnCheck(video) {
  if (!video.paused) {
    video.pause();        
  }
}

/**
 * Rewinds video to start and plays it
 */
function playFromStart() {
  if (videoRewind) {
    video.currentTime = 0;
    video.play();
  }
  videoRewind = false;
}


/**
 * When video ends it becomes permanently stopped
 */
$(video).on('ended', function(){
  videoPlaying = false;
});

$(window).on('scroll', changeNodes);
$(document).ready(changeNodes);

$(window).on('mouseover', function(){

  // Video is played only when not permanently stopped
  if(videoPlaying) { 
    playOnCheck(video);
  }
});

$(window).on('mouseleave', function(){
  pauseOnCheck(video);
});

