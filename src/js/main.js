(function () {
  var sections = document.querySelectorAll('.section');
  var section1 = document.querySelector('.section--1');
  var section2 = document.querySelector('.section--2');
  var section3 = document.querySelector('.section--3');
  var section4 = document.querySelector('.section--4');
  var section5 = document.querySelector('.section--5');

  var logo = document.querySelector('.logo');

  var link = document.querySelector('.layout__link'); 
  var mail = document.querySelector('.i-mail');

  var contacts = document.querySelector('.layout__contacts');

  var popupOpen1 = document.querySelector('.popup-open-1');
  var popupOpen2 = document.querySelector('.popup-open-2');
  var popupOpen3 = document.querySelector('.popup-open-3');
  var popupImg1 = document.querySelector('.popup__img-1');
  var popupImg2 = document.querySelector('.popup__img-2');
  var popupImg3 = document.querySelector('.popup__img-3');
  var popupImg4 = document.querySelector('.popup__img-4');
  var popupImg5 = document.querySelector('.popup__img-5');
  var popupImg6 = document.querySelector('.popup__img-6');
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');

  var layoutBtn = document.querySelector('.layout__btn');
  var body = document.querySelector('body');
  var main = document.querySelector('.main');
  var onepage = document.querySelector('.onepage-pagination');
  var data = onepage.querySelector('a[href="#5"]');
  var datas = onepage.querySelectorAll('a');

  var langLink = document.querySelector('.layout__lang-link-item');
  var disabled_onepage_scroll = document.body;

  popupOpen1.addEventListener('click', function () {
    popupImg1.classList.add('popup__img--active');
    popup.classList.add('popup--active');
    disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
  });

  popupOpen2.addEventListener('click', function () {
    popupImg2.classList.add('popup__img--active');
    popup.classList.add('popup--active');
    disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
  });

  popupOpen3.addEventListener('click', function () {
    popupImg3.classList.add('popup__img--active');
    popup.classList.add('popup--active');
    disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
  });

  popupClose.addEventListener('click', function () {
    popupImg1.classList.remove('popup__img--active');
    popupImg2.classList.remove('popup__img--active');
    popupImg3.classList.remove('popup__img--active');
    popupImg4.classList.remove('popup__img--active');
    popupImg5.classList.remove('popup__img--active');
    popupImg6.classList.remove('popup__img--active');
    popup.classList.remove('popup--active');
    disabled_onepage_scroll.classList.remove('disabled-onepage-scroll1');
  });

  var feedbackOpen1 = document.querySelector('.feedback-open-1');
  var feedbackOpen2 = document.querySelector('.feedback-open-2');
  var feedbackOpen3 = document.querySelector('.feedback-open-3');

  feedbackOpen1.addEventListener('click', function () {
    popupImg4.classList.toggle('popup__img--active');
    popup.classList.add('popup--active');
    disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
  });

  feedbackOpen2.addEventListener('click', function () {
    popupImg5.classList.toggle('popup__img--active');
    popup.classList.add('popup--active');
    disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
  });

  feedbackOpen3.addEventListener('click', function () {
    popupImg6.classList.toggle('popup__img--active');
    popup.classList.add('popup--active');
    disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
  });

  var sectionLink1 = document.querySelector('.section__text-link-1');
  var sectionLink2 = document.querySelector('.section__text-link-2');
  var sectionLink3 = document.querySelector('.section__text-link-3');
  var sectionLeft = document.querySelector('.section__left');
  var toggleTabs = document.querySelector('.toggles__tabs');

  var sectionImg1 = document.querySelector('.section__img-1');
  var sectionImg2 = document.querySelector('.section__img-2');
  var sectionImg3 = document.querySelector('.section__img-3');

  toggleTabs.addEventListener('click', function (evt) {
    sectionLeft.classList.remove('section__left--hover');

    if(evt.target.control.defaultValue == "area-1") {
      sectionImg2.classList.remove('visible');
      sectionImg3.classList.remove('visible');
      sectionImg1.classList.add('visible');
    }

    if(evt.target.control.defaultValue == "area-2") {
      sectionImg1.classList.remove('visible');
      sectionImg3.classList.remove('visible');
      sectionImg2.classList.add('visible');
    }

    if(evt.target.control.defaultValue == "area-3") {
      sectionImg2.classList.remove('visible');
      sectionImg1.classList.remove('visible');
      sectionImg3.classList.add('visible');
    }
  });

  sectionLink1.addEventListener('click', function () {
    sectionLeft.classList.toggle('section__left--hover');
  });

  sectionLink2.addEventListener('click', function () {
    sectionLeft.classList.toggle('section__left--hover');
  });

  sectionLink3.addEventListener('click', function () {
    sectionLeft.classList.toggle('section__left--hover');
  });

  $(".section__left").hover(
    function () {

    },
    function () {
      sectionLeft.classList.remove('section__left--hover');
    }
  );

  var form = document.querySelector('.form');
  var formBtn = document.querySelector('.form__btn');
  var formInputs = form.querySelectorAll('input');
  var inputPhone = form.querySelector('.form__input-phone');
  var spanPhone = inputPhone.querySelector('span');
  var inputEmail = form.querySelector('.form__input-email');
  var spanEmail = inputEmail.querySelector('span');
  var rePhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  var reEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  formBtn.setAttribute('disabled', true);

  var elems = form.elements;

  elems.town.onblur = function () {
    if(!elems.town.value) {
      elems.town.classList.add('error');
    }
  };

  elems.company.onblur = function () {
    if(!elems.company.value) {
      elems.company.classList.add('error');
    }
  };

  elems.name.onblur = function () {
    if(!elems.name.value) {
      elems.name.classList.add('error');
    }
  };

  elems.email.onblur = function () {
    // elems.email.classList.remove('error');
    if(!elems.email.value) {
      elems.email.classList.add('error');
    }else{
      elems.phone.classList.remove('error');
    }
  };

  elems.phone.onblur = function () {
    if(!elems.phone.value) {
      elems.phone.classList.add('error');
    }else{
      elems.email.classList.remove('error');
    }
  };

  setInterval(function () {
    if(!(elems.problem.value == 'default') && elems.town.value && elems.company.value && elems.name.value && ((elems.phone.value && rePhone.test(elems.phone.value)))||elems.email.value) {
      formBtn.removeAttribute('disabled');
    } else {
      formBtn.setAttribute('disabled', true);
    }

    var select = document.querySelector('#select');

    elems.problem.blur = function () {
      console.log(1);
      if(elems.problem.value == 'default') {
        var selectText = document.querySelector('.jq-selectbox__select-text')
        selectText.style.color = 'red';
      } else {
        selectText.style.color = '#00dc89';
      }
    };

    elems.phone.onchange = function () {
      if(!rePhone.test(elems.phone.value)) {
        elems.phone.classList.add('error');
        spanPhone.classList.remove('hidden');
      } else {
        spanPhone.classList.add('hidden');
      }
    };

    elems.phone.onfocus = function () {
      spanPhone.classList.add('hidden');
    };

    elems.email.onchange = function () {
      if(!reEmail.test(elems.email.value)) {
        spanEmail.classList.remove('hidden');
      } else {
        spanEmail.classList.add('hidden');
      }
    };

    elems.email.onfocus = function () {
      spanEmail.classList.add('hidden');

    };
  },300);

    var schemeToggle = document.querySelector('.scheme__toggle');
    var scheme = document.querySelector('.scheme');
    var schemeToggleText = scheme.querySelector('.scheme__toggle-text-wrap');
    var schemeToggleOpen = scheme.querySelector('.scheme__toggle-open');
    var schemeToggleWrap = scheme.querySelector('.scheme__toggle-wrap');
    var img = scheme.querySelector('.scheme__img');
    var schemeTitle = document.querySelector('.section__title--scheme');
    var layoutContact = document.querySelector('.layout__contacts');
    var layoutAbout = document.querySelector('.layout__about');
    var layoutLang = document.querySelector('.layout__lang');
    var schemePin = scheme.querySelectorAll('.scheme__pin');

    schemeToggle.addEventListener('click', function () {
      scheme.classList.toggle('scheme--open');
      schemeToggleText.classList.toggle('scheme__toggle-text-wrap--hidden');
      schemeToggle.classList.toggle('scheme__toggle--open');
      schemeToggleOpen.classList.toggle('scheme__toggle-close');
      schemeToggleWrap.classList.toggle('scheme__toggle-wrap--position');
      img.classList.toggle('visible');
      schemeTitle.classList.toggle('visible');
      layoutContact.classList.toggle('hidden');
      layoutAbout.classList.toggle('hidden');
      layoutLang.classList.toggle('hidden');
      langLink.classList.toggle('hidden');

      schemePin.forEach(function(item) {
          console.log(1111);
        item.classList.toggle('scheme__pin--blink');
      });

    });

    var success = document.querySelector('.success');

    formBtn.addEventListener('click', function () {
      success.classList.add('visible');
      layoutLang.classList.add('hidden');
      disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');

        setTimeout(function () {
          var data = onepage.querySelector('a[href="#1"]');
          success.classList.remove('visible');
          if(body.className == 'viewing-page-5') {
            body.classList.remove('viewing-page-5');
          }

          if(body.className == 'viewing-page-2') {
            body.classList.remove('viewing-page-2');
          }

          if(body.className == 'viewing-page-3') {
            body.classList.remove('viewing-page-3');
          }

          if(body.className == 'viewing-page-4') {
            body.classList.remove('viewing-page-4');
          }

          sections.forEach(function (i) {
            if(i.classList[3] == 'active') {
              i.classList.remove('active');
            }
          });

          body.classList.add('viewing-page-1');
          main.style.transform = 'translate3d(0px, 0%, 0px)';
          section1.classList.add('active');
 
          datas.forEach(function (i) {
            if(i.className == 'active') {
              i.classList.toggle('active');
            }
          });

          data.classList.toggle('active');

          disabled_onepage_scroll.classList.remove('disabled-onepage-scroll1');
          layoutLang.classList.remove('hidden');
          layoutBtn.classList.remove('hidden');
          contacts.classList.remove('hidden');
          onepage.classList.remove('onepage-pagination--white');
          layoutLang.classList.remove('layout__lang--white');
        }, 5000);
    });

    var aboutLink = document.querySelector('.about-link');
    var about = document.querySelector('.about');
    var aboutClose = document.querySelector('.about__close');

    aboutLink.addEventListener('click', function () {
      about.classList.add('visible');
      contacts.classList.add('hidden');
      layoutLang.classList.add('hidden');
      langLink.classList.toggle('hidden');
      aboutLink.classList.add('hidden');
      logo.classList.add('logo--black');
      disabled_onepage_scroll.classList.add('disabled-onepage-scroll1');
    });

    aboutClose.addEventListener('click', function () {
      about.classList.remove('visible');
      contacts.classList.remove('hidden');
      aboutLink.classList.remove('hidden');
      layoutLang.classList.remove('hidden');
      langLink.classList.remove('hidden');
      disabled_onepage_scroll.classList.remove('disabled-onepage-scroll1');

      if(about.classList.contains('visible') || section3.classList.contains('active') || section4.classList.contains('active')) {
        logo.classList.add('logo--black');
      } else {
        logo.classList.remove('logo--black');
      }
    });

    layoutBtn.addEventListener('click', function () {
      about.classList.remove('visible');
    });
})();
