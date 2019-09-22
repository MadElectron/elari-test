/**
 * Applies callbackInSight  function to node if its in sight,
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

  console.log(nodeTop, nodeBottom, top, bottom);
}

/**
 * Applies changeNodeBySight to all needed elements
 */
function changeNodes() {
  let videoWrapper = $('.video-wrapper');
  let video = videoWrapper.find('video')[0];
  let videoText = $('.video-text');

  changeNodeBySight(videoWrapper, function() {
    if (video.paused) {
      video.play();
    }
  }, function(){
    if (!video.paused) {
      video.pause();        
    }
  });

  changeNodeBySight(videoText, function() {
    videoText.removeClass('hidden').addClass('fadeIn');
  }, function(){
    videoText.removeClass('fadeIn').addClass('hidden');
  });

}

$(window).on('scroll', changeNodes);

$(document).ready(changeNodes);