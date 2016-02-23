$('.in-the-news .press-link-container').hide();
$('.in-the-news .press-link-container').slice(0,6).show();

function handler() {
  $('.in-the-news .press-link-container').animate().show();
  $('body,html').animate({
    scrollTop: $('.in-the-news .links-container div:nth-child(7)').offset().top -5
  }, 500);
  $('#seeMore').remove();
}
$('.in-the-news .links-container').each(function() {
  var link = $('<a id="seeMore">SEE MORE NEWS</a>');
  $(this).append(link);
  link.click(handler);
});
