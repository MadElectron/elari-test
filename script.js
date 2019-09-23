const videoWrapper = $('.video-wrapper');
const video = videoWrapper.find('video')[0];
const videoText = $('.video-text');

let videoRewind = true; // if video needs to be rewound


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
    videoRewind = true;
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



$(window).on('scroll', changeNodes);
$(document).ready(changeNodes);

$(window).on('mouseover', function(){
  playOnCheck(video);
});
$(window).on('mouseleave', function(){
  pauseOnCheck(video);
});

