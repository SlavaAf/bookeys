jQuery(document).ready(function($) {
	// $(window).load(function() {
	  var loc_id = window.location.hash,
	      loc_ref = window.location.pathname;
	  if(loc_ref.length > 1){
	  	$('#preloader').hide();
	  }else{
		setTimeout(function() {
			$('#preloader').fadeOut('slow', function() {});
		// }, 3000);
		}, 10);
	  }
	// });
});
// 123
onePageScroll(".main", {
 sectionContainer: "section",
 easing: "ease",
 animationTime: 700,
 pagination: true,
 updateURL: true,
 beforeMove: function(index) {
   var sections = document.querySelectorAll('.section');
   var section1 = document.querySelector('.section--1');
   var section2 = document.querySelector('.section--2');
   var section3 = document.querySelector('.section--3');
   var section4 = document.querySelector('.section--4');
   var section5 = document.querySelector('.section--5');
   var contacts = document.querySelector('.layout__contacts');
   var logo = document.querySelector('.logo');
   var link = document.querySelector('.layout__link');
   var mail = document.querySelector('.i-mail');
   var onepage = document.querySelector('.onepage-pagination');
   var layoutBtn = document.querySelector('.layout__btn');
   var layoutLang = document.querySelector('.layout__lang');
   var scheme = document.querySelector('.scheme');
   var langLink = document.querySelector('.layout__lang-link-item');
   var layoutAbout = document.querySelector('.layout__about');

   if(section3.classList.contains('active') || section4.classList.contains('active')) {
     layoutBtn.classList.remove('hidden');
     contacts.classList.remove('hidden');
     onepage.classList.remove('onepage-pagination--white');
     layoutLang.classList.remove('layout__lang--white');
     logo.classList.add('logo--black');
     mail.classList.add('i-mail--green');
     link.classList.add('layout__link--green');
     langLink.classList.remove('hidden');
     layoutAbout.classList.remove('hidden');
   } else {
     logo.classList.remove('logo--black');
     mail.classList.remove('i-mail--green');
     link.classList.remove('layout__link--green');
     langLink.classList.remove('hidden');
   }

   if(section5.classList.contains('active')) {
     layoutBtn.classList.add('hidden');
     contacts.classList.add('hidden');
     onepage.classList.add('onepage-pagination--white');
     layoutLang.classList.add('layout__lang--white');
     langLink.classList.add('hidden');

   }

   if(section2.classList.contains('active')) {
     if(scheme.classList.contains('scheme--open')) {
       layoutBtn.classList.add('visible');
       contacts.classList.add('hidden');
       layoutLang.classList.add('layout__lang--white');
       onepage.classList.remove('onepage-pagination--white');
       langLink.classList.add('hidden');
       layoutAbout.classList.add('hidden');
     } else {
       layoutBtn.classList.remove('hidden');
       contacts.classList.remove('hidden');
       onepage.classList.remove('onepage-pagination--white');
       layoutLang.classList.remove('layout__lang--white');
       langLink.classList.remove('hidden');
       layoutAbout.classList.remove('hidden');
     }


   }

   if(section1.classList.contains('active')) {
     layoutBtn.classList.remove('hidden');
     contacts.classList.remove('hidden');
     onepage.classList.remove('onepage-pagination--white');
     layoutLang.classList.remove('layout__lang--white');
     langLink.classList.remove('hidden');
     layoutAbout.classList.remove('hidden');
   }
 },
 afterMove: function(index) {

 },
 loop: false,
 keyboard: true,
 responsiveFallback: false
});
// 234
$(window).load(function() {
  $('#demo1').imageReveal({
      barWidth: 1,
      touchBarWidth: 40,
      paddingLeft: 0,
      paddingRight: 0,
      startPosition: 0.5,
      showCaption: true,
      captionChange: 0.5,
      width: 360,
      height: 360
  });
  $('#demo2').imageReveal({
      barWidth: 1,
      touchBarWidth: 40,
      paddingLeft: 0,
      paddingRight: 0,
      startPosition: 0.5,
      showCaption: true,
      captionChange: 0.5,
      width: 360,
      height: 360
  });
  $('#demo3').imageReveal({
      barWidth: 1,
      touchBarWidth: 40,
      paddingLeft: 0,
      paddingRight: 0,
      startPosition: 0.5,
      showCaption: true,
      captionChange: 0.5,
      width: 378,
      height: 378
  });
});

$(function() {
  $('form').submit(function(e) {
    var $form = $(this);
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize()
    }).done(function() {
      console.log('success');
    }).fail(function() {
      console.log('fail');
    });
    //отмена действия по умолчанию для кнопки submit
    e.preventDefault();
  });
});

(function($){
  $(window).on("load",function(){
    $(".textarea").mCustomScrollbar({
      scrollInertia: 0
    });
  });

  $(window).on("load",function(){
    $(".popup").mCustomScrollbar({
      scrollInertia: 0
    });
  });

})(jQuery);

(function($) {
  $(function() {

    $('select').styler({
      onSelectClosed: function () {
        var selectText = document.querySelector('.jq-selectbox__select-text');
        var text = document.querySelector('.jq-selectbox__select-text');

        console.log(selectText.textContent == 'Вид оборудования');
        if(selectText.textContent == 'Вид оборудования') {
          text.style.color = '#dc0000';
        } else {
          text.style.color = '#00dc89';
        }
      }
    });

  });
})(jQuery);