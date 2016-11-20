/* ===========================================================
 * onepagescroll.js v1.2.2
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 *
 *
 * License: GPL v3
 *
 * ========================================================== */
var title = document.title,
    // description = document.getElementsByName('description')[0].getAttribute('content'),
    description = document.getElementsByName('description')[0],
    // 
  data_site = [
    {url : "", title : "Биотехнология очистки теплового оборудования «Бонака»", description : "Глубокая и экологичная очистка оборудования бактериями от накипи и шлама. Эффективность 98%. Для котлов, теплообменников, отопительных систем, выпаривателей и подогревателей."},
    {url : "heat_generation", title : "Теплогенерация | Бонака",   description : "Восстановление паспортных значений теплового оборудования. Биораствор «Бонака» очистит котёл и теплообменник от накипи и шлама на 98%. За несколько дней приведём оборудование в состояние согласно паспорту."},
    // {url : "areas", title : "Области применения | Бонака", description : "Восстановление паспортных значений теплового оборудования. Биораствор «Бонака» очистит котёл и теплообменник от накипи и шлама на 98%. За несколько дней приведём оборудование в состояние согласно паспорту."},
    {url : "process", title : "Процесс | Бонака", description : "Процесс полной очистки оборудования от накипи и шлама. Анализируем загрязнённый фрагмент оборудования, подбираем раствор, подключаем систему, очищаем оборудования до первоначального состояния и гордимся результатом."},
    {url : "comparing", title : "Сравнение | Бонака", description : "Сравнение очистки биораствором «Бонака» с другими методами. Биотехнология «Бонака» удаляет отложения на 98%, безвредна для материалов, экологична, не требует специальной утилизации, образует защитную плёнку."},
    {url : "feedback", title : "Отзывы | Бонака", description : "Любая критика неуместна, когда до меня председатель мучал жильцов несколько лет, собирал на капремонт какие-то сумасшедшие суммы, а тут за 3 дня температура пришла в норму. Эффективность проведённой работы соответствует установленным договором требованиям. Степень очистки составила 99%. Теплосъем оборудования увеличен на 25%"},
    {url : "request", title : "Запрос на очистку | Бонака", description : "Котёл, теплообменник, система отопления — оформить запрос на очистку оборудования от накипи и шлама с помощью бактериального биораствора «Бонака»."},
  ],
  data_site2 = [
    {url : "heat_generation", title : "Теплогенерация | Бонака",   description : "Восстановление паспортных значений теплового оборудования. Биораствор «Бонака» очистит котёл и теплообменник от накипи и шлама на 98%. За несколько дней приведём оборудование в состояние согласно паспорту."},
    {url : "heat_consuming",  title : "Теплопотребление | Бонака", description : "Тепло во всём доме на всех этажах. Облегчаем работу управляющих компаний и ТСЖ. Отопительное оборудование будет работать как новое. Температура на выходе повышается на 4-7 градусов. Очистка оборудования снижает себестоимость продукции."},
    {url : "industry",        title : "Промышленность | Бонака",   description : "После очистки биораствором «Бонака» снижаются затраты на эксплуатацию оборудования. Повышается эффективность производства. Увеличивается срок службы оборудования."},
  ];
function onePageScroll(element, options) {

  var defaults = {
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        updateURL: false,
        keyboard: true,
        beforeMove: null,
        afterMove: null,
        loop: false,
        responsiveFallback: false
      },
      _root = this,
      settings = Object.extend({}, defaults, options),
      el = document.querySelector(element),
      sections = document.querySelectorAll(settings.sectionContainer),
      total = sections.length,
      status = "off",
      topPos = 0,
      lastAnimation = 0,
      quietPeriod = 500,
      paginationList = "",
      body = document.querySelector("body");

  this.init = function() {
    /*-------------------------------------------*/
    /*  Prepare Everything                       */
    /*-------------------------------------------*/

    _addClass(el, "onepage-wrapper")
    el.style.position = "relative";

    for( var i = 0; i < sections.length; i++){
      _addClass(sections[i], "ops-section")
      sections[i].dataset.index = i + 1;
      topPos = topPos + 100;

      if(settings.pagination == true) {
        paginationList += "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>";
        // new
        // paginationList += "<li><a data-index='"+ (i + 1) +"' href='/"+ data_site[(i + 1)].url +"/'></a></li>";
      }
    }

    _swipeEvents(el);
    document.addEventListener("swipeDown",  function(event){
      if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
      moveUp(el);
    });
    document.addEventListener("swipeUp", function(event){
      if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
      moveDown(el);
    });

    // Create Pagination and Display Them

    if(settings.pagination == true) {
      var pagination = document.createElement("ul");
      pagination.setAttribute("class", "onepage-pagination");

      body.appendChild(pagination)
      pagination.innerHTML = paginationList;
      var posTop = (document.querySelector(".onepage-pagination").offsetHeight / 2) * -1;
      document.querySelector(".onepage-pagination").style.marginTop = posTop;
    }

    if(window.location.hash != "" && window.location.hash != "#1" && window.location.hash != "#11" && window.location.hash != "#12") {
      var init_index =  window.location.hash.replace("#", ""),
          next = document.querySelector(settings.sectionContainer + "[data-index='" + (init_index) + "']"),
          next_index = next.dataset.index;

      _addClass( document.querySelector(settings.sectionContainer + "[data-index='" + init_index + "']") ,"active")
      _addClass(body, "viewing-page-"+ init_index)
      if(settings.pagination == true) _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + init_index + "']"), "active");

      if(next) {
        _addClass(next, "active");
      // console.log("#1_next - ",init_index,' + ',href);
        if(settings.pagination == true){
          _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + init_index + "']"), "active");
          // console.log("#3_paginator - ",init_index,' + ',href);
        }

        body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
        _addClass(body, "viewing-page-" + next_index)
        if (history.replaceState && settings.updateURL == true) {
          var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
          // console.log("#2_replase_state - ",init_index,' + ',href);
          history.pushState( {}, document.title, href );
        }
      }
      var pos = ((init_index - 1) * 100) * -1;
    // console.log("#2_transform - ",init_index,' + ',href);
      _transformPage(el, settings, pos, init_index);

    }else{
      _addClass(document.querySelector(settings.sectionContainer + "[data-index='1']"), "active");
      _addClass(body, "viewing-page-1");
      if(settings.pagination == true) {
        _addClass(document.querySelector(".onepage-pagination li a[data-index='1']"), "active");
      // console.log("#2_swipe_up - ",init_index,' + ',href);
      }
    }

    _paginationHandler = function() {
        var page_index = this.dataset.index;

      moveTo(el, page_index);
    // console.log("#1_pagination_index - ", page_index);
    }


    if(settings.pagination == true)  {
      var pagination_links = document.querySelectorAll(".onepage-pagination li a");

      for( var i = 0; i < pagination_links.length; i++){
        pagination_links[i].addEventListener('click', _paginationHandler);
      }
    }

    _mouseWheelHandler = function(event) {
      event.preventDefault();
      var delta = event.wheelDelta || -event.detail;
      if (!_hasClass(body, "disabled-onepage-scroll")){
        _init_scroll(event, delta);
      // console.log("#1_mouseWheelHandler - ",index_page);
      }
    }

    document.addEventListener('mousewheel', _mouseWheelHandler);
    document.addEventListener('DOMMouseScroll', _mouseWheelHandler);


    if(settings.responsiveFallback != false) {
      window.onresize = function(){
        _responsive();
      }

      _responsive();
    }

    _keydownHandler = function(e) {
      var tag = e.target.tagName.toLowerCase();

      if (!_hasClass(body, "disabled-onepage-scroll")) {
        switch(e.which) {
          case 38:
            if (tag != 'input' && tag != 'textarea') {
              if (!document.body.classList.contains('disabled-onepage-scroll1')) {
                moveUp(el);
              }
            // console.log("#2 - ",el);
            };
            break;
          case 40:
            if (tag != 'input' && tag != 'textarea') {
              if (!document.body.classList.contains('disabled-onepage-scroll1')) {
                moveDown(el);
              }
            // console.log("#3 - ",el);
            };
            break;
          default: return;
        }
      }
      return false;
    }

    if(settings.keyboard == true) {
      document.onkeydown = _keydownHandler;
    }
    return false;
  }
 
  /*-------------------------------------------------------*/
  /*  Private Functions                                    */
  /*-------------------------------------------------------*/
  /*------------------------------------------------*/
  /*  Credit: Eike Send for the awesome swipe event */
  /*------------------------------------------------*/
  _swipeEvents = function(el){
    var startX,
      startY;

    document.addEventListener("touchstart", touchstart);

    function touchstart(event) {
      var touches = event.touches;
      if (touches && touches.length) {
        startX = touches[0].pageX;
        startY = touches[0].pageY;
        document.addEventListener("touchmove", touchmove);
      }
    }

    function touchmove(event) {
      var touches = event.touches;
      if (touches && touches.length) {
        event.preventDefault();
        var deltaX = startX - touches[0].pageX;
        var deltaY = startY - touches[0].pageY;

        if (deltaX >= 50) {
          var event = new Event('swipeLeft');
          document.dispatchEvent(event);
        }
        if (deltaX <= -50) {
          var event = new Event('swipeRight');
          document.dispatchEvent(event);
        }
        if (deltaY >= 50) {
          var event = new Event('swipeUp');
          document.dispatchEvent(event);
        }
        if (deltaY <= -50) {
          var event = new Event('swipeDown');
          document.dispatchEvent(event);
        }

        if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
          document.removeEventListener('touchmove', touchmove);
        }
      }
    }

  };
  /*-----------------------------------------------------------*/
  /*  Utility to add/remove class easily with javascript       */
  /*-----------------------------------------------------------*/

  _trim = function(str) {
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  _hasClass = function(ele,cls) {
    if (ele.className) {
      return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    } else {
      return ele.className = cls;
    }
  }

  _addClass = function(ele,cls) {
    if (!_hasClass(ele,cls)) ele.className += " "+cls;
    ele.className = _trim(ele.className)
  }

  _removeClass = function(ele,cls) {
    if (_hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
    ele.className = _trim(ele.className)
  }

  /*-----------------------------------------------------------*/
  /*  Transtionend Normalizer by Modernizr                     */
  /*-----------------------------------------------------------*/

  _whichTransitionEvent = function(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
  }

  /*-----------------------------------------------------------*/
  /*  Function to perform scroll to top animation              */
  /*-----------------------------------------------------------*/

  _scrollTo = function(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop == to) return;
        _scrollTo(element, to, duration - 10);
    }, 10);
  }



  /*---------------------------------*/
  /*  Function to transform the page */
  /*---------------------------------*/

  _transformPage = function(el2, settings, pos, index, next_el) {
    if (typeof settings.beforeMove == 'function') settings.beforeMove(index, next_el);

    var transformCSS = "-webkit-transform: translate3d(0, " + pos + "%, 0); -webkit-transition: -webkit-transform " + settings.animationTime + "ms " + settings.easing + "; -moz-transform: translate3d(0, " + pos + "%, 0); -moz-transition: -moz-transform " + settings.animationTime + "ms " + settings.easing + "; -ms-transform: translate3d(0, " + pos + "%, 0); -ms-transition: -ms-transform " + settings.animationTime + "ms " + settings.easing + "; transform: translate3d(0, " + pos + "%, 0); transition: transform " + settings.animationTime + "ms " + settings.easing + ";";
    // var transformCSS = "-webkit-transform: translateY("+ pos +"%); -webkit-transition: -webkit-transform " + settings.animationTime + "ms " + settings.easing + "; -moz-transform: translateY(" + pos + "%); -moz-transition: -moz-transform " + settings.animationTime + "ms " + settings.easing + "; -ms-transform: translateY(" + pos + "%); -ms-transition: -ms-transform " + settings.animationTime + "ms " + settings.easing + "; transform: translateY(" + pos + "%); transition: transform " + settings.animationTime + "ms " + settings.easing + ";";

    el2.style.cssText = transformCSS;

    var transitionEnd = _whichTransitionEvent();
     el2.addEventListener(transitionEnd, endAnimation, false);

    function endAnimation() {
      if (typeof settings.afterMove == 'function') settings.afterMove(index, next_el);
      el2.removeEventListener(transitionEnd, endAnimation)
    }
  }

  /*-------------------------------------------*/
  /*  Responsive Fallback trigger              */
  /*-------------------------------------------*/

  _responsive = function() {

    if (document.body.clientWidth < settings.responsiveFallback) {

      _addClass(body, "disabled-onepage-scroll");
      document.removeEventListener('mousewheel', _mouseWheelHandler);
      document.removeEventListener('DOMMouseScroll', _mouseWheelHandler);
      _swipeEvents(el);
      document.removeEventListener("swipeDown");
      document.removeEventListener("swipeUp");

    } else {

      if (_hasClass(body, "disabled-onepage-scroll")) {
        _removeClass(body, "disabled-onepage-scroll");
        _scrollTo(document.documentElement, 0, 2000);
      }



      _swipeEvents(el);
      document.addEventListener("swipeDown",  function(event){
        if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
        moveUp(el);
      });
      document.addEventListener("swipeUp", function(event){
        if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
        moveDown(el);
      });

      document.addEventListener('mousewheel', _mouseWheelHandler);
      document.addEventListener('DOMMouseScroll', _mouseWheelHandler);

    }
  }

  /*-------------------------------------------*/
  /*  Initialize scroll detection              */
  /*-------------------------------------------*/

  _init_scroll = function(event, delta) {
    var deltaOfInterest = delta,
      timeNow = new Date().getTime();

    // Cancel scroll if currently animating or within quiet period
    if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
      event.preventDefault();
      return;
    }

    if (deltaOfInterest < 0) {
      // moveDown(el)
      // new
      if (!document.body.classList.contains('disabled-onepage-scroll1')) {
        moveDown(el);
      }
    } else {
      // moveUp(el)
      // new
      if (!document.body.classList.contains('disabled-onepage-scroll1')) {
        moveUp(el);
      }
    }

    lastAnimation = timeNow;
  }


  /*-------------------------------------------------------*/
  /*  Public Functions                                     */
  /*-------------------------------------------------------*/

  /*---------------------------------*/
  /*  Function to move down section  */
  /*---------------------------------*/

   this.moveDown = function(el3) {

    if (typeof el3 == "string") el3 = document.querySelector(el3);

    var index = document.querySelector(settings.sectionContainer +".active").dataset.index,
        current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']"),
        next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index) + 1) + "']");


    if(!next) {
      if (settings.loop == true) {
        pos = 0;
        next = document.querySelector(settings.sectionContainer + "[data-index='1']");
      } else {
        return
      }

    }else {
      pos = (index * 100) * -1;
    }
    var next_index = next.dataset.index;
    _removeClass(current, "active");
    _addClass(next, "active");

    if(settings.pagination == true) {
      _removeClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + index + "']"), "active");
      _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + next_index + "']"), "active");
    }

    body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
    _addClass(body, "viewing-page-"+ next_index);

    if (history.replaceState && settings.updateURL == true) {
      // var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (parseInt(index) + 1);
      // history.pushState( {}, document.title, href );
      doHistory(next_index);
    }
    _transformPage(el3, settings, pos, next_index, next);
    // console.log("#1 - ", next_index);
  }

  /*---------------------------------*/
  /*  Function to move up section    */
  /*---------------------------------*/

  this.moveUp = function(el4) {

    if (typeof el4 == "string") el4 = document.querySelector(el4);

    var index = document.querySelector(settings.sectionContainer +".active").dataset.index,
        current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']"),
        next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index) - 1) + "']");

    if(!next) {
      if (settings.loop == true) {
        pos = ((total - 1) * 100) * -1;
        next = document.querySelector(settings.sectionContainer + "[data-index='" + total + "']");
      } else {
        return
      }
    }else {
      pos = ((next.dataset.index - 1) * 100) * -1;
    }
    var next_index = next.dataset.index;
    _removeClass(current, "active")
    _addClass(next, "active")

    if(settings.pagination == true) {
      _removeClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + index + "']"), "active");
      _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + next_index + "']"), "active");
    }
    body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
    _addClass(body, "viewing-page-"+ next_index);

    if (history.replaceState && settings.updateURL == true) {
      // var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (parseInt(index) - 1);
      // history.pushState( {}, document.title, href );
      doHistory(next_index);
    }
    _transformPage(el4, settings, pos, next_index, next);
    // console.log("#2 - ", next_index);
  }

  /*-------------------------------------------*/
  /*  Function to move to specified section    */
  /*-------------------------------------------*/

    this.moveTo = function(el5, page_index) {

      if (typeof el5 == "string") el5 = document.querySelector(el5);

    var current = document.querySelector(settings.sectionContainer + ".active"),
        next = document.querySelector(settings.sectionContainer + "[data-index='" + (page_index) + "']");
    console.log
    if(next) {
        var next_index = next.dataset.index;
      _removeClass(current, "active");
      _addClass(next, "active");
      _removeClass(document.querySelector(".onepage-pagination li a" + ".active"), "active");
      _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + (page_index) + "']"), "active");

      body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
      _addClass(body, "viewing-page-"+ next_index);

      pos = ((page_index - 1) * 100) * -1;

      // if (history.replaceState && settings.updateURL == true) {
      //  // var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (parseInt(page_index) - 1);
      //  // new
      //  doHistory(next_index);
      //  // old
      //  // history.pushState( {}, document.title, href );
      // }
      _transformPage(el5, settings, pos, page_index, next);
      doHistory(next_index);
      // console.log("#3 - ", next_index);
    }
  }

    this.init();
}
// 
// 
// --- URL NEW
var doHistory = function(page_index, option){
  location.hash = "";
  // 
  // doHistoryLogic(page_index);
  // 
  // var a = Math.ceil(Math.log10(Math.abs(page_index) + 0.5));
  // if(a > 1){
  //   switch(page_index){
  //     case 11:
  //       window.history.pushState("#"+page_index, data_site2[2].title, "/"+data_site2[2].url+"/");
  //       break;
  //     case 12:
  //       window.history.pushState("#"+page_index, data_site2[3].title, "/"+data_site2[3].url+"/");
  //       break;
  //   }
  // }else{
  if(!option){
    window.history.pushState("#"+page_index, data_site[page_index].title, "/"+data_site[page_index].url+"/");
  }else{
    window.history.pushState("#"+page_index+String(option), data_site2[option].title, "/"+data_site2[option].url+"/");
  }
  // };
  // 
  // console.log(location);
  // console.log(title);
  // console.log(description.content);
  // 
  doHistoryLogic(page_index, option);
};

var doHistoryLogic = function(page_index, option){
  // console.log(data_site[1].url);

  // if(window.history.state == "#"+page_index){
 //      document.title = data_site[page_index].title;
 //      description.content = data_site[page_index].description;
 //      console.log(page_index);
  // }
  switch(window.history.state){
    // case data_site[1].url:
    case "#1":
      // switch(option){
        // case 1:
        // case 2: 
          // break;
        // default:
      // console.log("option");
      document.title = data_site[1].title;
      description.content = data_site[1].description;
      document.getElementById("area-1").click();
      document.querySelector('.section__img-3').classList.remove('visible');
      document.querySelector('.section__img-2').classList.remove('visible');
      document.querySelector('.section__img-1').classList.add('visible');
      document.querySelector('.section__left').classList.remove('section__left--hover');
          // break;
      // };
      // if(option == 1){
      // }else if(option == 2){
      // }else{
      // }
      break;
    case "#11":
      // console.log(option);
      document.title = data_site2[1].title;
      description.content = data_site2[1].description;
      document.getElementById("area-2").click();
      document.querySelector('.section__img-3').classList.remove('visible');
      document.querySelector('.section__img-1').classList.remove('visible');
      document.querySelector('.section__img-2').classList.add('visible');
      break;
    case "#12":
        // console.log(option);
        document.title = data_site2[2].title;
        description.content = data_site2[2].description;
        document.getElementById("area-3").click();
        document.querySelector('.section__img-1').classList.remove('visible');
        document.querySelector('.section__img-2').classList.remove('visible');
        document.querySelector('.section__img-3').classList.add('visible');
        break;
    case "#2":
      document.title = data_site[2].title;
      description.content = data_site[2].description;
      // console.log(page_index);
      break;  
    case "#3":
      document.title = data_site[3].title;
      description.content = data_site[3].description;
      // console.log(page_index);
      break; 
    case "#4":
      document.title = data_site[4].title;
      description.content = data_site[4].description;
      // console.log(page_index);
      break;  
    case "#5":
      document.title = data_site[5].title;
      description.content = data_site[5].description;
      // console.log(page_index);
      break; 
    // case "areas":
    //   document.title = data_site[1].title;
    //   description.content = data_site[1].description;
    //   console.log("1");
    //   break;
    // case "process":
    //   document.title = data_site[2].title;
    //   description.content = data_site[2].description;
    //   console.log("2");
    //   break;  
    // case "comparing":
    //   document.title = data_site[3].title;
    //   description.content = data_site[3].description;
    //   console.log("3");
    //   break; 
    // case "feedback":
    //   document.title = data_site[4].title;
    //   description.content = data_site[4].description;
    //   console.log("4");
    //   break;  
    // case "request":
    //   document.title = data_site[5].title;
    //   description.content = data_site[5].description;
    //   console.log("5");
    //   break; 
  };
}

// if ("onhashchange" in window) {
//     if(loc_id){
//      if(loc_ref.length > 1){
//        window.history.pushState(loc_id, document.title, loc_ref);
//      }else{
//        doHistory(loc_id.split("#")[1]);
//      }
//     }
// };
// document.addEventListener("DOMContentLoaded", function(event) { 
//  console.log(loc_id+"www");
//  if(loc_id){
//  doHistory(loc_id.split("#")[1]);
//  }
// });
$(document).ready(function(){
  var loc_id = window.location.hash,
      loc_ref = window.location.pathname,
      index = loc_id.split("#")[1];
  // ----------------------------load
  if(loc_id){
    var num = Math.ceil(Math.log10(Math.abs(index) + 0.5));
    if(num > 1){
      var option = index%10;
      doHistory(1, option);
    }else{
      doHistory(index);
    }
  };
  // ----------------------------hashchange
  $(window).bind('hashchange', function() {
    var loc_id = window.location.hash,
        loc_ref = window.location.pathname,
        index = loc_id.split("#")[1];
    if(loc_id){
      if(loc_ref.length > 1){
        window.history.pushState(loc_id, document.title, loc_ref);
      }else{
        var num = Math.ceil(Math.log10(Math.abs(index) + 0.5));
        if(num > 1){
          var option = index%10;
          doHistory(1, option);
        }else{
          doHistory(index);
        }
      }
    };
  });
  // ----------------------------radio
  var radio = document.getElementsByName('area');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].type == "radio" && radio[i].checked) {
    }
  };
  $("input[name=area]:radio").bind("change click", function () {
    // console.log(this.id);
    var id = this.id.split("-")[1];
    if(id == 1){
      console.log(id);
      window.history.pushState("#"+1, data_site[1].title, "/"+data_site[1].url+"/");
      document.title = data_site[1].title;
      description.content = data_site[1].description;
      document.getElementById("area-1").click();
      document.querySelector('.section__img-3').classList.remove('visible');
      document.querySelector('.section__img-2').classList.remove('visible');
      document.querySelector('.section__img-1').classList.add('visible');
    }else if(id == 2){
      console.log(id);
      window.history.pushState("#"+11, data_site2[1].title, "/"+data_site2[1].url+"/");
      document.title = data_site2[1].title;
      description.content = data_site2[1].description;
      document.getElementById("area-2").click();
      document.querySelector('.section__img-3').classList.remove('visible');
      document.querySelector('.section__img-1').classList.remove('visible');
      document.querySelector('.section__img-2').classList.add('visible');
    }else{
      console.log(id);
      window.history.pushState("#"+12, data_site2[2].title, "/"+data_site2[2].url+"/");
      document.title = data_site2[2].title;
      description.content = data_site2[2].description;
      document.getElementById("area-3").click();
      document.querySelector('.section__img-2').classList.remove('visible');
      document.querySelector('.section__img-1').classList.remove('visible');
      document.querySelector('.section__img-3').classList.add('visible');
    }
  });
});

/*------------------------------------------------*/
 /*  Ulitilities Method                            */
 /*------------------------------------------------*/

 /*-----------------------------------------------------------*/
 /*  Function by John Resig to replicate extend functionality */
 /*-----------------------------------------------------------*/

 Object.extend = function(orig){
   if ( orig == null )
     return orig;

   for ( var i = 1; i < arguments.length; i++ ) {
     var obj = arguments[i];
     if ( obj != null ) {
       for ( var prop in obj ) {
         var getter = obj.__lookupGetter__( prop ),
             setter = obj.__lookupSetter__( prop );

         if ( getter || setter ) {
           if ( getter )
             orig.__defineGetter__( prop, getter );
           if ( setter )
             orig.__defineSetter__( prop, setter );
         } else {
           orig[ prop ] = obj[ prop ];
         }
       }
     }
   }

   return orig;
 };


 /*
  * jQuery Image Reveal - A Simple Before/After Image Viewer
  *
  * Version: Master
  * Homepage: http://github.com/lemoncreative/jquery-image-reveal
  * Licence: MIT
  * Copyright: (c) 2013 Lemon Creative;
  */

 (function ($) {
   $.fn.extend({ imageReveal: function (options) {
     var $el = {};

     // Merge passed in options with defaults
     options = $.extend({}, {
         barWidth: 20
       , touchBarWidth: 60
       , startPosition: 0.5
       , paddingLeft: 0
       , paddingRight: 0
       , showCaption: false
       , linkCaption: false
       , captionChange: 0.5
       , width: 500
       , height: 500
       , ids: []
     }, options);

     options.ids = [];

     // Ensure startPosition is valid.
     if(options.startPosition > 1) options.startPosition = 1;
     else if(options.startPosition < 0) options.startPosition = 0;

     // Ensure captionChange is valid
     if(options.captionChange > 1) options.captionChange = 1;
     else if(options.captionChange < 0) options.captionChange = 0;

     // Update - Moves the overlay and drag bar to the new location and displays the correct caption.
     function update(width, id) {

       // The width cannot be set lower than 0 or higher than options.width
       if(width < 0) width = 0;
       if(width > options.width) width = options.width;

       // The width must not go outside any specified padding
       if(width < options.paddingLeft) width = options.paddingLeft;
       if(width > (options.width - options.paddingRight)) width = options.width - options.paddingRight;

       // Apply new width
       $el[id].overlay.width(width);

       // The drag bar 'left' position should be set to (width - barWidth/2) so we always drag from the center.
       var dragBarPosition = width - (options.barWidth / 2);
       if(dragBarPosition < 0) dragBarPosition = 0;
       if(dragBarPosition > options.width - options.barWidth) dragBarPosition = options.width - options.barWidth;
       $el[id].drag.css({ left: dragBarPosition });

       // The caption should be set when the given threshold is met
       if(options.showCaption) {
         var beforeCaption = $el[id].before.attr('title'),
             afterCaption = $el[id].after.attr('title');

         if (width > options.width * options.captionChange) {
           if(beforeCaption && beforeCaption !== '') {
             $el[id].caption.text(beforeCaption).fadeIn(options.captionFade || 1000).data('link', $el[id].before.data('link'));
           }
           else $el[id].caption.fadeOut(options.captionFade || 1000);
         }
         else {
           if(afterCaption && afterCaption !== '') {
             $el[id].caption.text(afterCaption).fadeIn(options.captionFade || 1000).data('link', $el[id].after.data('link'));
           }
           else $el[id].caption.fadeOut(options.captionFade || 1000);
         }
       }

     }

     // handleEvent - Calls 'update' if the event is valid
     function handleEvent(e) {
       var id = $(this).data('imageRevealID');

       if(!$el[id].dragging && e.type !== 'click') return false;
       var position;

       // If it was a touch event
       if(e.originalEvent && e.originalEvent.changedTouches) {

         // Increase the bar width
         if(!options.touchDevice) {
           options.touchDevice = true;
           options.originalBarWidth = options.barWidth;
           options.barWidth = parseInt(options.touchBarWidth, 10);

           $.each(options.ids, function(index, value) {
             var dragBarPosition = $el[value].drag.position().left - ((options.touchBarWidth / 2) - (options.originalBarWidth / 2));
             $el[value].drag.width(options.touchBarWidth).css({ left: dragBarPosition });
           });
         }
         // Get position from touch event
         position = e.originalEvent.changedTouches[0].pageX;
       }
       // Otherwise get position from mouse event
       else {
         position = e.pageX;
       }


       // Call update with new width
       update(position - $el[id].overlay.offset().left, id);
       return false;
     }

     return this.each(function (i) {
       $el[i] = {};
       options.ids.push(i);

       // Container
       $el[i].container = $(this).addClass('imageReveal').data('imageRevealID', i);

       // Before Image
       $el[i].before = $el[i].container.children('img').first()
         .width(options.width)
         .height(options.height)
         .hide();

       // After Image
       $el[i].after  = $el[i].before.next()
         .width(options.width)
         .height(options.height)
         .hide();

       // Set up container
       $el[i].container
         .width(options.width)
         .height(options.height)
         .css({ overflow: 'hidden', position: 'relative' })
         .append('<div class="imageReveal-overlay"></div>')
         .append('<div class="imageReveal-background"></div>')
         .append('<div class="imageReveal-drag"></div>')
         .append('<div class="imageReveal-caption">' + $el[i].before.attr('title') + '</div>');

       // Background
       $el[i].bg = $el[i].container.children('.imageReveal-background')
         .width(options.width)
         .height(options.height)
         .css({
             'background-image': 'url(' + $el[i].after.attr('src') + ')'
           , 'background-size': options.width + 'px ' + options.height + 'px'
         });

       // Caption
       $el[i].caption = $el[i].container.children('.imageReveal-caption');

       if(options.showCaption && $el[i].before.attr('title') && $el[i].before.attr('title') !== '') {
         $el[i].caption.show();
       } else $el[i].caption.hide();

       if(options.linkCaption) {
         $el[i].caption
           .css('cursor', 'pointer')
           .data('link', $el[i].before.data('link'))
           .on('click', function() {
             if($el[i].caption.data('link')) window.location = $el[i].caption.data('link');
             return false;
           });
       }

       // Overlay
       $el[i].overlay = $el[i].container.children('.imageReveal-overlay')
         .width(options.width)
         .height(options.height)
         .css({
             'background-image': 'url(' + $el[i].before.attr('src') + ')'
           , 'background-size': options.width + 'px ' + options.height + 'px'
         })
         .animate({ width: options.width - (options.width * options.startPosition) });

       // Drag Bar
       $el[i].drag = $el[i].container.children('.imageReveal-drag')
         .width(options.barWidth)
         .height(options.height)
         .animate({ right: (options.width * options.startPosition) - (options.barWidth / 2) })
         .on('mousedown touchstart', function() {
           $el[i].dragging = true;
           $el[i].drag.addClass('dragging');
           return false;
         })
         .on('mouseup touchend touchcancel', function() {
           $el[i].dragging = false;
           $el[i].drag.removeClass('dragging');
           return false;
         });

       // Catch mouseup on document for when the user
       // releases the mouse button outside the container.
       $(document).on('mouseup touchend touchcancel', function() {
         if(!$el[i].dragging) return;
         $el[i].dragging = false;
         $el[i].drag.removeClass('dragging');
       });

       // When the bar is dragged outside the container, immediately
       // move it to the min or max position. This avoids the bar
       // getting stuck when the mouse is moved too fast
       $el[i].container.on('mouseout', function(e) {
         if(!$el[i].dragging) return;
         update(e.pageX - $el[i].overlay.offset().left, i);
       });

     }).on('mousemove click touchmove', handleEvent);
   }});
 })(jQuery);


 /*
 == malihu jquery custom scrollbar plugin ==
 Version: 3.1.5
 Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller
 Author: malihu
 Author URI: http://manos.malihu.gr
 License: MIT License (MIT)
 */

 /*
 Copyright Manos Malihutsakis (email: manos@malihu.gr)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

 /*
 The code below is fairly long, fully commented and should be normally used in development.
 For production, use either the minified jquery.mCustomScrollbar.min.js script or
 the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin
 and dependencies (minified).
 */

 (function(factory){
  if(typeof define==="function" && define.amd){
    define(["jquery"],factory);
  }else if(typeof module!=="undefined" && module.exports){
    module.exports=factory;
  }else{
    factory(jQuery,window,document);
  }
 }(function($){
 (function(init){
  var _rjs=typeof define==="function" && define.amd, /* RequireJS */
    _njs=typeof module !== "undefined" && module.exports, /* NodeJS */
    _dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
    _url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
  if(!_rjs){
    if(_njs){
      require("jquery-mousewheel")($);
    }else{
      /* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS
      (works when mCustomScrollbar fn is called on window load) */
      $.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
    }
  }
  init();
 }(function(){

  /*
  ----------------------------------------
  PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S)
  ----------------------------------------
  */

  var pluginNS="mCustomScrollbar",
    pluginPfx="mCS",
    defaultSelector=".mCustomScrollbar",





  /*
  ----------------------------------------
  DEFAULT OPTIONS
  ----------------------------------------
  */

    defaults={
      /*
      set element/content width/height programmatically
      values: boolean, pixels, percentage
        option            default
        -------------------------------------
        setWidth          false
        setHeight         false
      */
      /*
      set the initial css top property of content
      values: string (e.g. "-100px", "10%" etc.)
      */
      setTop:0,
      /*
      set the initial css left property of content
      values: string (e.g. "-100px", "10%" etc.)
      */
      setLeft:0,
      /*
      scrollbar axis (vertical and/or horizontal scrollbars)
      values (string): "y", "x", "yx"
      */
      axis:"y",
      /*
      position of scrollbar relative to content
      values (string): "inside", "outside" ("outside" requires elements with position:relative)
      */
      scrollbarPosition:"inside",
      /*
      scrolling inertia
      values: integer (milliseconds)
      */
      scrollInertia:950,
      /*
      auto-adjust scrollbar dragger length
      values: boolean
      */
      autoDraggerLength:true,
      /*
      auto-hide scrollbar when idle
      values: boolean
        option            default
        -------------------------------------
        autoHideScrollbar     false
      */
      /*
      auto-expands scrollbar on mouse-over and dragging
      values: boolean
        option            default
        -------------------------------------
        autoExpandScrollbar     false
      */
      /*
      always show scrollbar, even when there's nothing to scroll
      values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
      */
      alwaysShowScrollbar:0,
      /*
      scrolling always snaps to a multiple of this number in pixels
      values: integer, array ([y,x])
        option            default
        -------------------------------------
        snapAmount          null
      */
      /*
      when snapping, snap with this number in pixels as an offset
      values: integer
      */
      snapOffset:0,
      /*
      mouse-wheel scrolling
      */
      mouseWheel:{
        /*
        enable mouse-wheel scrolling
        values: boolean
        */
        enable:true,
        /*
        scrolling amount in pixels
        values: "auto", integer
        */
        scrollAmount:"auto",
        /*
        mouse-wheel scrolling axis
        the default scrolling direction when both vertical and horizontal scrollbars are present
        values (string): "y", "x"
        */
        axis:"y",
        /*
        prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached
        values: boolean
          option            default
          -------------------------------------
          preventDefault        null
        */
        /*
        the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.
        values: "auto", integer
        "auto" uses the default OS/browser value
        */
        deltaFactor:"auto",
        /*
        normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration)
        values: boolean
          option            default
          -------------------------------------
          normalizeDelta        null
        */
        /*
        invert mouse-wheel scrolling direction
        values: boolean
          option            default
          -------------------------------------
          invert            null
        */
        /*
        the tags that disable mouse-wheel when cursor is over them
        */
        disableOver:["select","option","keygen","datalist","textarea"]
      },
      /*
      scrollbar buttons
      */
      scrollButtons:{
        /*
        enable scrollbar buttons
        values: boolean
          option            default
          -------------------------------------
          enable            null
        */
        /*
        scrollbar buttons scrolling type
        values (string): "stepless", "stepped"
        */
        scrollType:"stepless",
        /*
        scrolling amount in pixels
        values: "auto", integer
        */
        scrollAmount:"auto"
        /*
        tabindex of the scrollbar buttons
        values: false, integer
          option            default
          -------------------------------------
          tabindex          null
        */
      },
      /*
      keyboard scrolling
      */
      keyboard:{
        /*
        enable scrolling via keyboard
        values: boolean
        */
        enable:true,
        /*
        keyboard scrolling type
        values (string): "stepless", "stepped"
        */
        scrollType:"stepless",
        /*
        scrolling amount in pixels
        values: "auto", integer
        */
        scrollAmount:"auto"
      },
      /*
      enable content touch-swipe scrolling
      values: boolean, integer, string (number)
      integer values define the axis-specific minimum amount required for scrolling momentum
      */
      contentTouchScroll:25,
      /*
      enable/disable document (default) touch-swipe scrolling
      */
      documentTouchScroll:true,
      /*
      advanced option parameters
      */
      advanced:{
        /*
        auto-expand content horizontally (for "x" or "yx" axis)
        values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
          option            default
          -------------------------------------
          autoExpandHorizontalScroll  null
        */
        /*
        auto-scroll to elements with focus
        */
        autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
        /*
        auto-update scrollbars on content, element or viewport resize
        should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc.
        values: boolean
        */
        updateOnContentResize:true,
        /*
        auto-update scrollbars each time each image inside the element is fully loaded
        values: "auto", boolean
        */
        updateOnImageLoad:"auto",
        /*
        auto-update scrollbars based on the amount and size changes of specific selectors
        useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size
        values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed)
        a value of true (boolean) will auto-update scrollbars each time any element is changed
          option            default
          -------------------------------------
          updateOnSelectorChange    null
        */
        /*
        extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
          option            default
          -------------------------------------
          extraDraggableSelectors   null
        */
        /*
        extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
          option            default
          -------------------------------------
          releaseDraggableSelectors null
        */
        /*
        auto-update timeout
        values: integer (milliseconds)
        */
        autoUpdateTimeout:60
      },
      /*
      scrollbar theme
      values: string (see CSS/plugin URI for a list of ready-to-use themes)
      */
      theme:"light",
      /*
      user defined callback functions
      */
      callbacks:{
        /*
        Available callbacks:
          callback          default
          -------------------------------------
          onCreate          null
          onInit            null
          onScrollStart       null
          onScroll          null
          onTotalScroll       null
          onTotalScrollBack     null
          whileScrolling        null
          onOverflowY         null
          onOverflowX         null
          onOverflowYNone       null
          onOverflowXNone       null
          onImageLoad         null
          onSelectorChange      null
          onBeforeUpdate        null
          onUpdate          null
        */
        onTotalScrollOffset:0,
        onTotalScrollBackOffset:0,
        alwaysTriggerOffsets:true
      }
      /*
      add scrollbar(s) on all elements matching the current selector, now and in the future
      values: boolean, string
      string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
      liveSelector values: string (selector)
        option            default
        -------------------------------------
        live            false
        liveSelector        null
      */
    },





  /*
  ----------------------------------------
  VARS, CONSTANTS
  ----------------------------------------
  */

    totalInstances=0, /* plugin instances amount */
    liveTimers={}, /* live option timers */
    oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
    touchActive=false,touchable, /* global touch vars (for touch and pointer events) */
    /* general plugin classes */
    classes=[
      "mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
      "mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
      "mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
    ],





  /*
  ----------------------------------------
  METHODS
  ----------------------------------------
  */

    methods={

      /*
      plugin initialization method
      creates the scrollbar(s), plugin data object and options
      ----------------------------------------
      */

      init:function(options){

        var options=$.extend(true,{},defaults,options),
          selector=_selector.call(this); /* validate selector */

        /*
        if live option is enabled, monitor for elements matching the current selector and
        apply scrollbar(s) when found (now and in the future)
        */
        if(options.live){
          var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
            $liveSelector=$(liveSelector); /* live selector(s) as jquery object */
          if(options.live==="off"){
            /*
            disable live if requested
            usage: $(selector).mCustomScrollbar({live:"off"});
            */
            removeLiveTimers(liveSelector);
            return;
          }
          liveTimers[liveSelector]=setTimeout(function(){
            /* call mCustomScrollbar fn on live selector(s) every half-second */
            $liveSelector.mCustomScrollbar(options);
            if(options.live==="once" && $liveSelector.length){
              /* disable live after first invocation */
              removeLiveTimers(liveSelector);
            }
          },500);
        }else{
          removeLiveTimers(liveSelector);
        }

        /* options backward compatibility (for versions < 3.0.0) and normalization */
        options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
        options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
        options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
        options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
        if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
          options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
        }
        options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
        options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
        options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType);

        _theme(options); /* theme-specific options */

        /* plugin constructor */
        return $(selector).each(function(){

          var $this=$(this);

          if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */

            /* store options and create objects in jquery data */
            $this.data(pluginPfx,{
              idx:++totalInstances, /* instance index */
              opt:options, /* options */
              scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
              overflowed:null, /* overflowed axis */
              contentReset:{y:null,x:null}, /* object to check when content resets */
              bindEvents:false, /* object to check if events are bound */
              tweenRunning:false, /* object to check if tween is running */
              sequential:{}, /* sequential scrolling object */
              langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
              cbOffsets:null, /* object to check whether callback offsets always trigger */
              /*
              object to check how scrolling events where last triggered
              "internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method)
              usage: object.data("mCS").trigger
              */
              trigger:null,
              /*
              object to check for changes in elements in order to call the update method automatically
              */
              poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}
            });

            var d=$this.data(pluginPfx),o=d.opt,
              /* HTML data attributes */
              htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");

            if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
            if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
            if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
              o.theme=htmlDataTheme;
              _theme(o); /* theme-specific options */
            }

            _pluginMarkup.call(this); /* add plugin markup */

            if(d && o.callbacks.onCreate && typeof o.callbacks.onCreate==="function"){o.callbacks.onCreate.call(this);} /* callbacks: onCreate */

            $("#mCSB_"+d.idx+"_container img:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */

            methods.update.call(null,$this); /* call the update method */

          }

        });

      },
      /* ---------------------------------------- */



      /*
      plugin update method
      updates content and scrollbar(s) values, events and status
      ----------------------------------------
      usage: $(selector).mCustomScrollbar("update");
      */

      update:function(el,cb){

        var selector=el || _selector.call(this); /* validate selector */

        return $(selector).each(function(){

          var $this=$(this);

          if($this.data(pluginPfx)){ /* check if plugin has initialized */

            var d=$this.data(pluginPfx),o=d.opt,
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];

            if(!mCSB_container.length){return;}

            if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */

            if(cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate==="function"){o.callbacks.onBeforeUpdate.call(this);} /* callbacks: onBeforeUpdate */

            /* if element was disabled or destroyed, remove class(es) */
            if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
            if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}

            /* css flexbox fix, detect/set max-height */
            mCustomScrollBox.css("max-height","none");
            if(mCustomScrollBox.height()!==$this.height()){mCustomScrollBox.css("max-height",$this.height());}

            _expandContentHorizontally.call(this); /* expand content horizontally */

            if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
              mCSB_container.css("width",_contentWidth(mCSB_container));
            }

            d.overflowed=_overflowed.call(this); /* determine if scrolling is required */

            _scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

            /* auto-adjust scrollbar dragger length analogous to content */
            if(o.autoDraggerLength){_setDraggerLength.call(this);}

            _scrollRatio.call(this); /* calculate and store scrollbar to content ratio */

            _bindEvents.call(this); /* bind scrollbar events */

            /* reset scrolling position and/or events */
            var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
            if(o.axis!=="x"){ /* y/yx axis */
              if(!d.overflowed[0]){ /* y scrolling is not required */
                _resetContentPosition.call(this); /* reset content position */
                if(o.axis==="y"){
                  _unbindEvents.call(this);
                }else if(o.axis==="yx" && d.overflowed[1]){
                  _scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                }
              }else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
                _resetContentPosition.call(this); /* reset content position */
              }else{ /* y scrolling is required */
                _scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                d.contentReset.y=null;
              }
            }
            if(o.axis!=="y"){ /* x/yx axis */
              if(!d.overflowed[1]){ /* x scrolling is not required */
                _resetContentPosition.call(this); /* reset content position */
                if(o.axis==="x"){
                  _unbindEvents.call(this);
                }else if(o.axis==="yx" && d.overflowed[0]){
                  _scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                }
              }else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
                _resetContentPosition.call(this); /* reset content position */
              }else{ /* x scrolling is required */
                _scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                d.contentReset.x=null;
              }
            }

            /* callbacks: onImageLoad, onSelectorChange, onUpdate */
            if(cb && d){
              if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
                o.callbacks.onImageLoad.call(this);
              }else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
                o.callbacks.onSelectorChange.call(this);
              }else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
                o.callbacks.onUpdate.call(this);
              }
            }

            _autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */

          }

        });

      },
      /* ---------------------------------------- */



      /*
      plugin scrollTo method
      triggers a scrolling event to a specific value
      ----------------------------------------
      usage: $(selector).mCustomScrollbar("scrollTo",value,options);
      */

      scrollTo:function(val,options){

        /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
        if(typeof val=="undefined" || val==null){return;}

        var selector=_selector.call(this); /* validate selector */

        return $(selector).each(function(){

          var $this=$(this);

          if($this.data(pluginPfx)){ /* check if plugin has initialized */

            var d=$this.data(pluginPfx),o=d.opt,
              /* method default options */
              methodDefaults={
                trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
                scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
                scrollEasing:"mcsEaseInOut", /* animation easing */
                moveDragger:false, /* move dragger instead of content */
                timeout:60, /* scroll-to delay */
                callbacks:true, /* enable/disable callbacks */
                onStart:true,
                onUpdate:true,
                onComplete:true
              },
              methodOptions=$.extend(true,{},methodDefaults,options),
              to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;

            /* translate yx values to actual scroll-to positions */
            to[0]=_to.call(this,to[0],"y");
            to[1]=_to.call(this,to[1],"x");

            /*
            check if scroll-to value moves the dragger instead of content.
            Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.)
            */
            if(methodOptions.moveDragger){
              to[0]*=d.scrollRatio.y;
              to[1]*=d.scrollRatio.x;
            }

            methodOptions.dur=_isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden

            setTimeout(function(){
              /* do the scrolling */
              if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
                methodOptions.dir="y";
                methodOptions.overwrite="all";
                _scrollTo($this,to[0].toString(),methodOptions);
              }
              if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
                methodOptions.dir="x";
                methodOptions.overwrite="none";
                _scrollTo($this,to[1].toString(),methodOptions);
              }
            },methodOptions.timeout);

          }

        });

      },
      /* ---------------------------------------- */



      /*
      plugin stop method
      stops scrolling animation
      ----------------------------------------
      usage: $(selector).mCustomScrollbar("stop");
      */
      stop:function(){

        var selector=_selector.call(this); /* validate selector */

        return $(selector).each(function(){

          var $this=$(this);

          if($this.data(pluginPfx)){ /* check if plugin has initialized */

            _stop($this);

          }

        });

      },
      /* ---------------------------------------- */



      /*
      plugin disable method
      temporarily disables the scrollbar(s)
      ----------------------------------------
      usage: $(selector).mCustomScrollbar("disable",reset);
      reset (boolean): resets content position to 0
      */
      disable:function(r){

        var selector=_selector.call(this); /* validate selector */

        return $(selector).each(function(){

          var $this=$(this);

          if($this.data(pluginPfx)){ /* check if plugin has initialized */

            var d=$this.data(pluginPfx);

            _autoUpdate.call(this,"remove"); /* remove automatic updating */

            _unbindEvents.call(this); /* unbind events */

            if(r){_resetContentPosition.call(this);} /* reset content position */

            _scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */

            $this.addClass(classes[3]); /* add disable class */

          }

        });

      },
      /* ---------------------------------------- */



      /*
      plugin destroy method
      completely removes the scrollbar(s) and returns the element to its original state
      ----------------------------------------
      usage: $(selector).mCustomScrollbar("destroy");
      */
      destroy:function(){

        var selector=_selector.call(this); /* validate selector */

        return $(selector).each(function(){

          var $this=$(this);

          if($this.data(pluginPfx)){ /* check if plugin has initialized */

            var d=$this.data(pluginPfx),o=d.opt,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              scrollbar=$(".mCSB_"+d.idx+"_scrollbar");

            if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */

            _autoUpdate.call(this,"remove"); /* remove automatic updating */

            _unbindEvents.call(this); /* unbind events */

            _resetContentPosition.call(this); /* reset content position */

            $this.removeData(pluginPfx); /* remove plugin data object */

            _delete(this,"mcs"); /* delete callbacks object */

            /* remove plugin markup */
            scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
            mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
            mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
            /* remove plugin classes from the element and add destroy class */
            $this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);

          }

        });

      }
      /* ---------------------------------------- */

    },





  /*
  ----------------------------------------
  FUNCTIONS
  ----------------------------------------
  */

    /* validates selector (if selector is invalid or undefined uses the default one) */
    _selector=function(){
      return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
    },
    /* -------------------- */


    /* changes options according to theme */
    _theme=function(obj){
      var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
        nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
        disabledScrollButtonsThemes=["minimal","minimal-dark"],
        enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
        scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
      obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
      obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
      obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
      obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
      obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
    },
    /* -------------------- */


    /* live option timers removal */
    removeLiveTimers=function(selector){
      if(liveTimers[selector]){
        clearTimeout(liveTimers[selector]);
        _delete(liveTimers,selector);
      }
    },
    /* -------------------- */


    /* normalizes axis option to valid values: "y", "x", "yx" */
    _findAxis=function(val){
      return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
    },
    /* -------------------- */


    /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
    _findScrollButtonsType=function(val){
      return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
    },
    /* -------------------- */


    /* generates plugin markup */
    _pluginMarkup=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
        scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
        wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
        scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
        contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
        autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
        scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
      if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
      if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
      o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
      $this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir='"+d.langDir+"' /></div>");
      var mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container");
      if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
        mCSB_container.css("width",_contentWidth(mCSB_container));
      }
      if(o.scrollbarPosition==="outside"){
        if($this.css("position")==="static"){ /* requires elements with non-static position */
          $this.css("position","relative");
        }
        $this.css("overflow","visible");
        mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
      }else{
        mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
        mCSB_container.wrap(contentWrapper);
      }
      _scrollButtons.call(this); /* add scrollbar buttons */
      /* minimum dragger length */
      var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
      mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
      mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
    },
    /* -------------------- */


    /* calculates content width */
    _contentWidth=function(el){
      var val=[el[0].scrollWidth,Math.max.apply(Math,el.children().map(function(){return $(this).outerWidth(true);}).get())],w=el.parent().width();
      return val[0]>w ? val[0] : val[1]>w ? val[1] : "100%";
    },
    /* -------------------- */


    /* expands content horizontally */
    _expandContentHorizontally=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        mCSB_container=$("#mCSB_"+d.idx+"_container");
      if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
        /* calculate scrollWidth */
        mCSB_container.css({"width":"auto","min-width":0,"overflow-x":"scroll"});
        var w=Math.ceil(mCSB_container[0].scrollWidth);
        if(o.advanced.autoExpandHorizontalScroll===3 || (o.advanced.autoExpandHorizontalScroll!==2 && w>mCSB_container.parent().width())){
          mCSB_container.css({"width":w,"min-width":"100%","overflow-x":"inherit"});
        }else{
          /*
          wrap content with an infinite width div and set its position to absolute and width to auto.
          Setting width to auto before calculating the actual width is important!
          We must let the browser set the width as browser zoom values are impossible to calculate.
          */
          mCSB_container.css({"overflow-x":"inherit","position":"absolute"})
            .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
            .css({ /* set actual width, original position and un-wrap */
              /*
              get the exact width (with decimals) and then round-up.
              Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
              */
              "width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
              "min-width":"100%",
              "position":"relative"
            }).unwrap();
        }
      }
    },
    /* -------------------- */


    /* adds scrollbar buttons */
    _scrollButtons=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
        tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
        btnHTML=[
          "<a href='#' class='"+classes[13]+"' "+tabindex+" />",
          "<a href='#' class='"+classes[14]+"' "+tabindex+" />",
          "<a href='#' class='"+classes[15]+"' "+tabindex+" />",
          "<a href='#' class='"+classes[16]+"' "+tabindex+" />"
        ],
        btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
      if(o.scrollButtons.enable){
        mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
      }
    },
    /* -------------------- */


    /* auto-adjusts scrollbar dragger length */
    _setDraggerLength=function(){
      var $this=$(this),d=$this.data(pluginPfx),
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
        ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
        l=[
          parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
          parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
        ],
        h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
      mCSB_dragger[0].css({
        "height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
      }).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
      mCSB_dragger[1].css({
        "width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
      });
    },
    /* -------------------- */


    /* calculates scrollbar to content ratio */
    _scrollRatio=function(){
      var $this=$(this),d=$this.data(pluginPfx),
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
        scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
        ratio=[
          scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
          scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
        ];
      d.scrollRatio={y:ratio[0],x:ratio[1]};
    },
    /* -------------------- */


    /* toggles scrolling classes */
    _onDragClasses=function(el,action,xpnd){
      var expandClass=xpnd ? classes[0]+"_expanded" : "",
        scrollbar=el.closest(".mCSB_scrollTools");
      if(action==="active"){
        el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]);
        el[0]._draggable=el[0]._draggable ? 0 : 1;
      }else{
        if(!el[0]._draggable){
          if(action==="hide"){
            el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
          }else{
            el.addClass(classes[0]); scrollbar.addClass(classes[1]);
          }
        }
      }
    },
    /* -------------------- */


    /* checks if content overflows its container to determine if scrolling is required */
    _overflowed=function(){
      var $this=$(this),d=$this.data(pluginPfx),
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
        contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false),
        h=mCSB_container[0].scrollHeight,w=mCSB_container[0].scrollWidth;
      if(h>contentHeight){contentHeight=h;}
      if(w>contentWidth){contentWidth=w;}
      return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
    },
    /* -------------------- */


    /* resets content position to 0 */
    _resetContentPosition=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
      _stop($this); /* stop any current scrolling before resetting */
      if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
        mCSB_dragger[0].add(mCSB_container).css("top",0);
        _scrollTo($this,"_resetY");
      }
      if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
        var cx=dx=0;
        if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
          cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
          dx=Math.abs(cx/d.scrollRatio.x);
        }
        mCSB_container.css("left",cx);
        mCSB_dragger[1].css("left",dx);
        _scrollTo($this,"_resetX");
      }
    },
    /* -------------------- */


    /* binds scrollbar events */
    _bindEvents=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
      if(!d.bindEvents){ /* check if events are already bound */
        _draggable.call(this);
        if(o.contentTouchScroll){_contentDraggable.call(this);}
        _selectable.call(this);
        if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
          function _mwt(){
            mousewheelTimeout=setTimeout(function(){
              if(!$.event.special.mousewheel){
                _mwt();
              }else{
                clearTimeout(mousewheelTimeout);
                _mousewheel.call($this[0]);
              }
            },100);
          }
          var mousewheelTimeout;
          _mwt();
        }
        _draggerRail.call(this);
        _wrapperScroll.call(this);
        if(o.advanced.autoScrollOnFocus){_focus.call(this);}
        if(o.scrollButtons.enable){_buttons.call(this);}
        if(o.keyboard.enable){_keyboard.call(this);}
        d.bindEvents=true;
      }
    },
    /* -------------------- */


    /* unbinds scrollbar events */
    _unbindEvents=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        namespace=pluginPfx+"_"+d.idx,
        sb=".mCSB_"+d.idx+"_scrollbar",
        sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
        mCSB_container=$("#mCSB_"+d.idx+"_container");
      if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
      if(o.advanced.extraDraggableSelectors){sel.add($(o.advanced.extraDraggableSelectors));}
      if(d.bindEvents){ /* check if events are bound */
        /* unbind namespaced events from document/selectors */
        $(document).add($(!_canAccessIFrame() || top.document)).unbind("."+namespace);
        sel.each(function(){
          $(this).unbind("."+namespace);
        });
        /* clear and delete timeouts/objects */
        clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
        clearTimeout(d.sequential.step); _delete(d.sequential,"step");
        clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
        d.bindEvents=false;
      }
    },
    /* -------------------- */


    /* toggles scrollbar visibility */
    _scrollbarVisibility=function(disabled){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
        content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
        scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
        mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
      if(o.axis!=="x"){
        if(d.overflowed[0] && !disabled){
          scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
          content.removeClass(classes[8]+" "+classes[10]);
        }else{
          if(o.alwaysShowScrollbar){
            if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].css("display","none");}
            content.removeClass(classes[10]);
          }else{
            scrollbar[0].css("display","none");
            content.addClass(classes[10]);
          }
          content.addClass(classes[8]);
        }
      }
      if(o.axis!=="y"){
        if(d.overflowed[1] && !disabled){
          scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
          content.removeClass(classes[9]+" "+classes[11]);
        }else{
          if(o.alwaysShowScrollbar){
            if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].css("display","none");}
            content.removeClass(classes[11]);
          }else{
            scrollbar[1].css("display","none");
            content.addClass(classes[11]);
          }
          content.addClass(classes[9]);
        }
      }
      if(!d.overflowed[0] && !d.overflowed[1]){
        $this.addClass(classes[5]);
      }else{
        $this.removeClass(classes[5]);
      }
    },
    /* -------------------- */


    /* returns input coordinates of pointer, touch and mouse events (relative to document) */
    _coordinates=function(e){
      var t=e.type,o=e.target.ownerDocument!==document && frameElement!==null ? [$(frameElement).offset().top,$(frameElement).offset().left] : null,
        io=_canAccessIFrame() && e.target.ownerDocument!==top.document && frameElement!==null ? [$(e.view.frameElement).offset().top,$(e.view.frameElement).offset().left] : [0,0];
      switch(t){
        case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
          return o ? [e.originalEvent.pageY-o[0]+io[0],e.originalEvent.pageX-o[1]+io[1],false] : [e.originalEvent.pageY,e.originalEvent.pageX,false];
          break;
        case "touchstart": case "touchmove": case "touchend":
          var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
            touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
          return e.target.ownerDocument!==document ? [touch.screenY,touch.screenX,touches>1] : [touch.pageY,touch.pageX,touches>1];
          break;
        default:
          return o ? [e.pageY-o[0]+io[0],e.pageX-o[1]+io[1],false] : [e.pageY,e.pageX,false];
      }
    },
    /* -------------------- */


    /*
    SCROLLBAR DRAG EVENTS
    scrolls content via scrollbar dragging
    */
    _draggable=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        namespace=pluginPfx+"_"+d.idx,
        draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
        draggable,dragY,dragX,
        rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
        eds=o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
      mCSB_dragger.bind("contextmenu."+namespace,function(e){
        e.preventDefault(); //prevent right click
      }).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
        touchActive=true;
        if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
        _iframe.call(mCSB_container,false); /* enable scrollbar dragging over iframes by disabling their events */
        _stop($this);
        draggable=$(this);
        var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
          h=draggable.height()+offset.top,w=draggable.width()+offset.left;
        if(y<h && y>0 && x<w && x>0){
          dragY=y;
          dragX=x;
        }
        _onDragClasses(draggable,"active",o.autoExpandScrollbar);
      }).bind("touchmove."+namespace,function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
        var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
        _drag(dragY,dragX,y,x);
      });
      $(document).add(eds).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
        if(draggable){
          var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
          if(dragY===y && dragX===x){return;} /* has it really moved? */
          _drag(dragY,dragX,y,x);
        }
      }).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
        if(draggable){
          _onDragClasses(draggable,"active",o.autoExpandScrollbar);
          draggable=null;
        }
        touchActive=false;
        if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
        _iframe.call(mCSB_container,true); /* enable iframes events */
      });
      function _drag(dragY,dragX,y,x){
        mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
        if(draggable.attr("id")===draggerId[1]){
          var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
        }else{
          var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
        }
        _scrollTo($this,to.toString(),{dir:dir,drag:true});
      }
    },
    /* -------------------- */


    /*
    TOUCH SWIPE EVENTS
    scrolls content via touch swipe
    Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices
    */
    _contentDraggable=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        namespace=pluginPfx+"_"+d.idx,
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
        draggable,dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
        durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[],touchDrag,docDrag,
        iframe=mCSB_container.find("iframe"),
        events=[
          "touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace, //start
          "touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace, //move
          "touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace //end
        ],
        touchAction=document.body.style.touchAction!==undefined && document.body.style.touchAction!=="";
      mCSB_container.bind(events[0],function(e){
        _onTouchstart(e);
      }).bind(events[1],function(e){
        _onTouchmove(e);
      });
      mCustomScrollBox.bind(events[0],function(e){
        _onTouchstart2(e);
      }).bind(events[2],function(e){
        _onTouchend(e);
      });
      if(iframe.length){
        iframe.each(function(){
          $(this).bind("load",function(){
            /* bind events on accessible iframes */
            if(_canAccessIFrame(this)){
              $(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
                _onTouchstart(e);
                _onTouchstart2(e);
              }).bind(events[1],function(e){
                _onTouchmove(e);
              }).bind(events[2],function(e){
                _onTouchend(e);
              });
            }
          });
        });
      }
      function _onTouchstart(e){
        if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
        touchable=1; touchDrag=0; docDrag=0; draggable=1;
        $this.removeClass("mCS_touch_action");
        var offset=mCSB_container.offset();
        dragY=_coordinates(e)[0]-offset.top;
        dragX=_coordinates(e)[1]-offset.left;
        touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
      }
      function _onTouchmove(e){
        if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
        if(!o.documentTouchScroll){e.preventDefault();}
        e.stopImmediatePropagation();
        if(docDrag && !touchDrag){return;}
        if(draggable){
          runningTime=_getTime();
          var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
            easing="mcsLinearOut";
          touchMoveY.push(y);
          touchMoveX.push(x);
          touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
          if(d.overflowed[0]){
            var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
              prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
          }
          if(d.overflowed[1]){
            var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
              preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
          }
          if(prevent || preventX){ /* prevent native document scrolling */
            if(!touchAction){e.preventDefault();}
            touchDrag=1;
          }else{
            docDrag=1;
            $this.addClass("mCS_touch_action");
          }
          if(touchAction){e.preventDefault();}
          amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
          mCSB_container[0].idleTimer=250;
          if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
          if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
        }
      }
      function _onTouchstart2(e){
        if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
        touchable=1;
        e.stopImmediatePropagation();
        _stop($this);
        startTime=_getTime();
        var offset=mCustomScrollBox.offset();
        touchStartY=_coordinates(e)[0]-offset.top;
        touchStartX=_coordinates(e)[1]-offset.left;
        touchMoveY=[]; touchMoveX=[];
      }
      function _onTouchend(e){
        if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
        draggable=0;
        e.stopImmediatePropagation();
        touchDrag=0; docDrag=0;
        endTime=_getTime();
        var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
        if((endTime-runningTime)>30){return;}
        speed=1000/(endTime-startTime);
        var easing="mcsEaseOut",slow=speed<2.5,
          diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
        distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
        var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
        speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
        var a=[
          Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
          Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
        ];
        amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
        durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
        var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
        amount[0]=absDistance[0]>md ? amount[0] : 0;
        amount[1]=absDistance[1]>md ? amount[1] : 0;
        if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
        if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
      }
      function _m(ds,s){
        var r=[s*1.5,s*2,s/1.5,s/2];
        if(ds>90){
          return s>4 ? r[0] : r[3];
        }else if(ds>60){
          return s>3 ? r[3] : r[2];
        }else if(ds>30){
          return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
        }else{
          return s>8 ? s : r[3];
        }
      }
      function _drag(amount,dur,easing,dir,overwrite,drag){
        if(!amount){return;}
        _scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
      }
    },
    /* -------------------- */


    /*
    SELECT TEXT EVENTS
    scrolls content when text is selected
    */
    _selectable=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
        namespace=pluginPfx+"_"+d.idx,
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        wrapper=mCSB_container.parent(),
        action;
      mCSB_container.bind("mousedown."+namespace,function(e){
        if(touchable){return;}
        if(!action){action=1; touchActive=true;}
      }).add(document).bind("mousemove."+namespace,function(e){
        if(!touchable && action && _sel()){
          var offset=mCSB_container.offset(),
            y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
          if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
            if(seq.step){_seq("off",null,"stepped");}
          }else{
            if(o.axis!=="x" && d.overflowed[0]){
              if(y<0){
                _seq("on",38);
              }else if(y>wrapper.height()){
                _seq("on",40);
              }
            }
            if(o.axis!=="y" && d.overflowed[1]){
              if(x<0){
                _seq("on",37);
              }else if(x>wrapper.width()){
                _seq("on",39);
              }
            }
          }
        }
      }).bind("mouseup."+namespace+" dragend."+namespace,function(e){
        if(touchable){return;}
        if(action){action=0; _seq("off",null);}
        touchActive=false;
      });
      function _sel(){
        return  window.getSelection ? window.getSelection().toString() :
            document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
      }
      function _seq(a,c,s){
        seq.type=s && action ? "stepped" : "stepless";
        seq.scrollAmount=10;
        _sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
      }
    },
    /* -------------------- */


    /*
    MOUSE WHEEL EVENT
    scrolls content via mouse-wheel
    via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
    */
    _mousewheel=function(){
      if(!$(this).data(pluginPfx)){return;} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        namespace=pluginPfx+"_"+d.idx,
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
        iframe=$("#mCSB_"+d.idx+"_container").find("iframe");
      if(iframe.length){
        iframe.each(function(){
          $(this).bind("load",function(){
            /* bind events on accessible iframes */
            if(_canAccessIFrame(this)){
              $(this.contentDocument || this.contentWindow.document).bind("mousewheel."+namespace,function(e,delta){
                _onMousewheel(e,delta);
              });
            }
          });
        });
      }
      mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
        _onMousewheel(e,delta);
      });
      function _onMousewheel(e,delta){
        _stop($this);
        if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
        var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100,
          dur=o.scrollInertia;
        if(o.axis==="x" || o.mouseWheel.axis==="x"){
          var dir="x",
            px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
            amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
            contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
            draggerPos=mCSB_dragger[1][0].offsetLeft,
            limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
            dlt=o.mouseWheel.axis==="y" ? (e.deltaY || delta) : e.deltaX;
        }else{
          var dir="y",
            px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
            amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
            contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
            draggerPos=mCSB_dragger[0][0].offsetTop,
            limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
            dlt=e.deltaY || delta;
        }
        if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
        if(o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice){dlt=-dlt;}
        if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
        if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
          e.stopImmediatePropagation();
          e.preventDefault();
        }
        if(e.deltaFactor<5 && !o.mouseWheel.normalizeDelta){
          //very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
          amount=e.deltaFactor; dur=17;
        }
        _scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir,dur:dur});
      }
    },
    /* -------------------- */


    /* checks if iframe can be accessed */
    _canAccessIFrameCache=new Object(),
    _canAccessIFrame=function(iframe){
        var result=false,cacheKey=false,html=null;
        if(iframe===undefined){
        cacheKey="#empty";
        }else if($(iframe).attr("id")!==undefined){
        cacheKey=$(iframe).attr("id");
        }
      if(cacheKey!==false && _canAccessIFrameCache[cacheKey]!==undefined){
        return _canAccessIFrameCache[cacheKey];
      }
      if(!iframe){
        try{
          var doc=top.document;
          html=doc.body.innerHTML;
        }catch(err){/* do nothing */}
        result=(html!==null);
      }else{
        try{
          var doc=iframe.contentDocument || iframe.contentWindow.document;
          html=doc.body.innerHTML;
        }catch(err){/* do nothing */}
        result=(html!==null);
      }
      if(cacheKey!==false){_canAccessIFrameCache[cacheKey]=result;}
      return result;
    },
    /* -------------------- */


    /* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
    _iframe=function(evt){
      var el=this.find("iframe");
      if(!el.length){return;} /* check if content contains iframes */
      var val=!evt ? "none" : "auto";
      el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
    },
    /* -------------------- */


    /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
    _disableMousewheel=function(el,target){
      var tag=target.nodeName.toLowerCase(),
        tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
        /* elements that require focus */
        focusTags=["select","textarea"];
      return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
    },
    /* -------------------- */


    /*
    DRAGGER RAIL CLICK EVENT
    scrolls content via dragger rail
    */
    _draggerRail=function(){
      var $this=$(this),d=$this.data(pluginPfx),
        namespace=pluginPfx+"_"+d.idx,
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        wrapper=mCSB_container.parent(),
        mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]),
        clickable;
      mCSB_draggerContainer.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
        touchActive=true;
        if(!$(e.target).hasClass("mCSB_dragger")){clickable=1;}
      }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
        touchActive=false;
      }).bind("click."+namespace,function(e){
        if(!clickable){return;}
        clickable=0;
        if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
          _stop($this);
          var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
          if(el.parent(".mCSB_scrollTools_horizontal").length>0){
            if(!d.overflowed[1]){return;}
            var dir="x",
              clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
              to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
          }else{
            if(!d.overflowed[0]){return;}
            var dir="y",
              clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
              to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
          }
          _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
        }
      });
    },
    /* -------------------- */


    /*
    FOCUS EVENT
    scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
    */
    _focus=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        namespace=pluginPfx+"_"+d.idx,
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        wrapper=mCSB_container.parent();
      mCSB_container.bind("focusin."+namespace,function(e){
        var el=$(document.activeElement),
          nested=mCSB_container.find(".mCustomScrollBox").length,
          dur=0;
        if(!el.is(o.advanced.autoScrollOnFocus)){return;}
        _stop($this);
        clearTimeout($this[0]._focusTimeout);
        $this[0]._focusTimer=nested ? (dur+17)*nested : 0;
        $this[0]._focusTimeout=setTimeout(function(){
          var to=[_childPos(el)[0],_childPos(el)[1]],
            contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
            isVisible=[
              (contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
              (contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
            ],
            overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
          if(o.axis!=="x" && !isVisible[0]){
            _scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
          }
          if(o.axis!=="y" && !isVisible[1]){
            _scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
          }
        },$this[0]._focusTimer);
      });
    },
    /* -------------------- */


    /* sets content wrapper scrollTop/scrollLeft always to 0 */
    _wrapperScroll=function(){
      var $this=$(this),d=$this.data(pluginPfx),
        namespace=pluginPfx+"_"+d.idx,
        wrapper=$("#mCSB_"+d.idx+"_container").parent();
      wrapper.bind("scroll."+namespace,function(e){
        if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
          $(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
        }
      });
    },
    /* -------------------- */


    /*
    BUTTONS EVENTS
    scrolls content via up, down, left and right buttons
    */
    _buttons=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
        namespace=pluginPfx+"_"+d.idx,
        sel=".mCSB_"+d.idx+"_scrollbar",
        btn=$(sel+">a");
      btn.bind("contextmenu."+namespace,function(e){
        e.preventDefault(); //prevent right click
      }).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
        e.preventDefault();
        if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
        var btnClass=$(this).attr("class");
        seq.type=o.scrollButtons.scrollType;
        switch(e.type){
          case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
            if(seq.type==="stepped"){return;}
            touchActive=true;
            d.tweenRunning=false;
            _seq("on",btnClass);
            break;
          case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
          case "mouseout": case "pointerout": case "MSPointerOut":
            if(seq.type==="stepped"){return;}
            touchActive=false;
            if(seq.dir){_seq("off",btnClass);}
            break;
          case "click":
            if(seq.type!=="stepped" || d.tweenRunning){return;}
            _seq("on",btnClass);
            break;
        }
        function _seq(a,c){
          seq.scrollAmount=o.scrollButtons.scrollAmount;
          _sequentialScroll($this,a,c);
        }
      });
    },
    /* -------------------- */


    /*
    KEYBOARD EVENTS
    scrolls content via keyboard
    Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
    */
    _keyboard=function(){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
        namespace=pluginPfx+"_"+d.idx,
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        wrapper=mCSB_container.parent(),
        editables="input,textarea,select,datalist,keygen,[contenteditable='true']",
        iframe=mCSB_container.find("iframe"),
        events=["blur."+namespace+" keydown."+namespace+" keyup."+namespace];
      if(iframe.length){
        iframe.each(function(){
          $(this).bind("load",function(){
            /* bind events on accessible iframes */
            if(_canAccessIFrame(this)){
              $(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
                _onKeyboard(e);
              });
            }
          });
        });
      }
      mCustomScrollBox.attr("tabindex","0").bind(events[0],function(e){
        _onKeyboard(e);
      });
      function _onKeyboard(e){
        switch(e.type){
          case "blur":
            if(d.tweenRunning && seq.dir){_seq("off",null);}
            break;
          case "keydown": case "keyup":
            var code=e.keyCode ? e.keyCode : e.which,action="on";
            if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
              /* up (38), down (40), left (37), right (39) arrows */
              if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
              if(e.type==="keyup"){action="off";}
              if(!$(document.activeElement).is(editables)){
                e.preventDefault();
                e.stopImmediatePropagation();
                _seq(action,code);
              }
            }else if(code===33 || code===34){
              /* PgUp (33), PgDn (34) */
              if(d.overflowed[0] || d.overflowed[1]){
                e.preventDefault();
                e.stopImmediatePropagation();
              }
              if(e.type==="keyup"){
                _stop($this);
                var keyboardDir=code===34 ? -1 : 1;
                if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                  var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
                }else{
                  var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
                }
                _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
              }
            }else if(code===35 || code===36){
              /* End (35), Home (36) */
              if(!$(document.activeElement).is(editables)){
                if(d.overflowed[0] || d.overflowed[1]){
                  e.preventDefault();
                  e.stopImmediatePropagation();
                }
                if(e.type==="keyup"){
                  if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                    var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
                  }else{
                    var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
                  }
                  _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                }
              }
            }
            break;
        }
        function _seq(a,c){
          seq.type=o.keyboard.scrollType;
          seq.scrollAmount=o.keyboard.scrollAmount;
          if(seq.type==="stepped" && d.tweenRunning){return;}
          _sequentialScroll($this,a,c);
        }
      }
    },
    /* -------------------- */


    /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
    _sequentialScroll=function(el,action,trigger,e,s){
      var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        once=seq.type==="stepped" ? true : false,
        steplessSpeed=o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
        steppedSpeed=o.scrollInertia < 1 ? 17 : o.scrollInertia;
      switch(action){
        case "on":
          seq.dir=[
            (trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
            (trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
          ];
          _stop(el);
          if(_isNumeric(trigger) && seq.type==="stepped"){return;}
          _on(once);
          break;
        case "off":
          _off();
          if(once || (d.tweenRunning && seq.dir)){
            _on(true);
          }
          break;
      }

      /* starts sequence */
      function _on(once){
        if(o.snapAmount){seq.scrollAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0]==="x" ? o.snapAmount[1] : o.snapAmount[0];} /* scrolling snapping */
        var c=seq.type!=="stepped", /* continuous scrolling */
          t=s ? s : !once ? 1000/60 : c ? steplessSpeed/1.5 : steppedSpeed, /* timer */
          m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
          contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
          ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
          amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
          px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
          to=seq.scrollAmount!=="auto" ? px : amount,
          easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
          onComplete=!once ? false : true;
        if(once && t<17){
          to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
        }
        _scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
        if(once){
          seq.dir=false;
          return;
        }
        clearTimeout(seq.step);
        seq.step=setTimeout(function(){
          _on();
        },t);
      }
      /* stops sequence */
      function _off(){
        clearTimeout(seq.step);
        _delete(seq,"step");
        _stop(el);
      }
    },
    /* -------------------- */


    /* returns a yx array from value */
    _arr=function(val){
      var o=$(this).data(pluginPfx).opt,vals=[];
      if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
      /* check if value is object or array, its length and create an array with yx values */
      if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
        vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
        vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
      }else{ /* array value (e.g. [100,100]) */
        vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
      }
      /* check if array values are anonymous functions */
      if(typeof vals[0]==="function"){vals[0]=vals[0]();}
      if(typeof vals[1]==="function"){vals[1]=vals[1]();}
      return vals;
    },
    /* -------------------- */


    /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
    _to=function(val,dir){
      if(val==null || typeof val=="undefined"){return;}
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        wrapper=mCSB_container.parent(),
        t=typeof val;
      if(!dir){dir=o.axis==="x" ? "x" : "y";}
      var contentLength=dir==="x" ? mCSB_container.outerWidth(false)-wrapper.width() : mCSB_container.outerHeight(false)-wrapper.height(),
        contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
        cssProp=dir==="x" ? "left" : "top";
      switch(t){
        case "function": /* this currently is not used. Consider removing it */
          return val();
          break;
        case "object": /* js/jquery object */
          var obj=val.jquery ? val : $(val);
          if(!obj.length){return;}
          return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
          break;
        case "string": case "number":
          if(_isNumeric(val)){ /* numeric value */
            return Math.abs(val);
          }else if(val.indexOf("%")!==-1){ /* percentage value */
            return Math.abs(contentLength*parseInt(val)/100);
          }else if(val.indexOf("-=")!==-1){ /* decrease value */
            return Math.abs(contentPos-parseInt(val.split("-=")[1]));
          }else if(val.indexOf("+=")!==-1){ /* inrease value */
            var p=(contentPos+parseInt(val.split("+=")[1]));
            return p>=0 ? 0 : Math.abs(p);
          }else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
            return Math.abs(val.split("px")[0]);
          }else{
            if(val==="top" || val==="left"){ /* special strings */
              return 0;
            }else if(val==="bottom"){
              return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
            }else if(val==="right"){
              return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
            }else if(val==="first" || val==="last"){
              var obj=mCSB_container.find(":"+val);
              return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
            }else{
              if($(val).length){ /* jquery selector */
                return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
              }else{ /* other values (e.g. "100em") */
                mCSB_container.css(cssProp,val);
                methods.update.call(null,$this[0]);
                return;
              }
            }
          }
          break;
      }
    },
    /* -------------------- */


    /* calls the update method automatically */
    _autoUpdate=function(rem){
      var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
        mCSB_container=$("#mCSB_"+d.idx+"_container");
      if(rem){
        /*
        removes autoUpdate timer
        usage: _autoUpdate.call(this,"remove");
        */
        clearTimeout(mCSB_container[0].autoUpdate);
        _delete(mCSB_container[0],"autoUpdate");
        return;
      }
      upd();
      function upd(){
        clearTimeout(mCSB_container[0].autoUpdate);
        if($this.parents("html").length===0){
          /* check element in dom tree */
          $this=null;
          return;
        }
        mCSB_container[0].autoUpdate=setTimeout(function(){
          /* update on specific selector(s) length and size change */
          if(o.advanced.updateOnSelectorChange){
            d.poll.change.n=sizesSum();
            if(d.poll.change.n!==d.poll.change.o){
              d.poll.change.o=d.poll.change.n;
              doUpd(3);
              return;
            }
          }
          /* update on main element and scrollbar size changes */
          if(o.advanced.updateOnContentResize){
            d.poll.size.n=$this[0].scrollHeight+$this[0].scrollWidth+mCSB_container[0].offsetHeight+$this[0].offsetHeight+$this[0].offsetWidth;
            if(d.poll.size.n!==d.poll.size.o){
              d.poll.size.o=d.poll.size.n;
              doUpd(1);
              return;
            }
          }
          /* update on image load */
          if(o.advanced.updateOnImageLoad){
            if(!(o.advanced.updateOnImageLoad==="auto" && o.axis==="y")){ //by default, it doesn't run on vertical content
              d.poll.img.n=mCSB_container.find("img").length;
              if(d.poll.img.n!==d.poll.img.o){
                d.poll.img.o=d.poll.img.n;
                mCSB_container.find("img").each(function(){
                  imgLoader(this);
                });
                return;
              }
            }
          }
          if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
        },o.advanced.autoUpdateTimeout);
      }
      /* a tiny image loader */
      function imgLoader(el){
        if($(el).hasClass(classes[2])){doUpd(); return;}
        var img=new Image();
        function createDelegate(contextObject,delegateMethod){
          return function(){return delegateMethod.apply(contextObject,arguments);}
        }
        function imgOnLoad(){
          this.onload=null;
          $(el).addClass(classes[2]);
          doUpd(2);
        }
        img.onload=createDelegate(img,imgOnLoad);
        img.src=el.src;
      }
      /* returns the total height and width sum of all elements matching the selector */
      function sizesSum(){
        if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
        var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
        if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=this.offsetHeight+this.offsetWidth;});}
        return total;
      }
      /* calls the update method */
      function doUpd(cb){
        clearTimeout(mCSB_container[0].autoUpdate);
        methods.update.call(null,$this[0],cb);
      }
    },
    /* -------------------- */


    /* snaps scrolling to a multiple of a pixels number */
    _snapAmount=function(to,amount,offset){
      return (Math.round(to/amount)*amount-offset);
    },
    /* -------------------- */


    /* stops content and scrollbar animations */
    _stop=function(el){
      var d=el.data(pluginPfx),
        sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
      sel.each(function(){
        _stopTween.call(this);
      });
    },
    /* -------------------- */


    /*
    ANIMATES CONTENT
    This is where the actual scrolling happens
    */
    _scrollTo=function(el,to,options){
      var d=el.data(pluginPfx),o=d.opt,
        defaults={
          trigger:"internal",
          dir:"y",
          scrollEasing:"mcsEaseOut",
          drag:false,
          dur:o.scrollInertia,
          overwrite:"all",
          callbacks:true,
          onStart:true,
          onUpdate:true,
          onComplete:true
        },
        options=$.extend(defaults,options),
        dur=[options.dur,(options.drag ? 0 : options.dur)],
        mCustomScrollBox=$("#mCSB_"+d.idx),
        mCSB_container=$("#mCSB_"+d.idx+"_container"),
        wrapper=mCSB_container.parent(),
        totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
        totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
      d.trigger=options.trigger;
      if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
        $(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
        wrapper.scrollTop(0).scrollLeft(0);
      }
      if(to==="_resetY" && !d.contentReset.y){
        /* callbacks: onOverflowYNone */
        if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
        d.contentReset.y=1;
      }
      if(to==="_resetX" && !d.contentReset.x){
        /* callbacks: onOverflowXNone */
        if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
        d.contentReset.x=1;
      }
      if(to==="_resetY" || to==="_resetX"){return;}
      if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
        /* callbacks: onOverflowY */
        if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
        d.contentReset.x=null;
      }
      if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
        /* callbacks: onOverflowX */
        if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
        d.contentReset.x=null;
      }
      if(o.snapAmount){ /* scrolling snapping */
        var snapAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : options.dir==="x" ? o.snapAmount[1] : o.snapAmount[0];
        to=_snapAmount(to,snapAmount,o.snapOffset);
      }
      switch(options.dir){
        case "x":
          var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
            property="left",
            contentPos=mCSB_container[0].offsetLeft,
            limit=[
              mCustomScrollBox.width()-mCSB_container.outerWidth(false),
              mCSB_dragger.parent().width()-mCSB_dragger.width()
            ],
            scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
            tso=totalScrollOffsets[1],
            tsbo=totalScrollBackOffsets[1],
            totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
            totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
          break;
        case "y":
          var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
            property="top",
            contentPos=mCSB_container[0].offsetTop,
            limit=[
              mCustomScrollBox.height()-mCSB_container.outerHeight(false),
              mCSB_dragger.parent().height()-mCSB_dragger.height()
            ],
            scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
            tso=totalScrollOffsets[0],
            tsbo=totalScrollBackOffsets[0],
            totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
            totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
          break;
      }
      if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
        scrollTo=[0,0];
      }else if(scrollTo[1]>=limit[1]){
        scrollTo=[limit[0],limit[1]];
      }else{
        scrollTo[0]=-scrollTo[0];
      }
      if(!el[0].mcs){
        _mcs();  /* init mcs object (once) to make it available before callbacks */
        if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
      }
      clearTimeout(mCSB_container[0].onCompleteTimeout);
      _tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
      if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
      _tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
        onStart:function(){
          if(options.callbacks && options.onStart && !d.tweenRunning){
            /* callbacks: onScrollStart */
            if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
            d.tweenRunning=true;
            _onDragClasses(mCSB_dragger);
            d.cbOffsets=_cbOffsets();
          }
        },onUpdate:function(){
          if(options.callbacks && options.onUpdate){
            /* callbacks: whileScrolling */
            if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
          }
        },onComplete:function(){
          if(options.callbacks && options.onComplete){
            if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
            var t=mCSB_container[0].idleTimer || 0;
            mCSB_container[0].onCompleteTimeout=setTimeout(function(){
              /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
              if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
              if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
              if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
              d.tweenRunning=false;
              mCSB_container[0].idleTimer=0;
              _onDragClasses(mCSB_dragger,"hide");
            },t);
          }
        }
      });
      /* checks if callback function exists */
      function _cb(cb){
        return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
      }
      /* checks whether callback offsets always trigger */
      function _cbOffsets(){
        return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
      }
      /*
      populates object with useful values for the user
      values:
        content: this.mcs.content
        content top position: this.mcs.top
        content left position: this.mcs.left
        dragger top position: this.mcs.draggerTop
        dragger left position: this.mcs.draggerLeft
        scrolling y percentage: this.mcs.topPct
        scrolling x percentage: this.mcs.leftPct
        scrolling direction: this.mcs.direction
      */
      function _mcs(){
        var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
          dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
          cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
          pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
        el[0].mcs={
          content:mCSB_container, /* original content wrapper as jquery object */
          top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
          topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
          direction:options.dir
        };
        /*
        this refers to the original element containing the scrollbar(s)
        usage: this.mcs.top, this.mcs.leftPct etc.
        */
      }
    },
    /* -------------------- */


    /*
    CUSTOM JAVASCRIPT ANIMATION TWEEN
    Lighter and faster than jquery animate() and css transitions
    Animates top/left properties and includes easings
    */
    _tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
      if(!el._mTween){el._mTween={top:{},left:{}};}
      var callbacks=callbacks || {},
        onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
        startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
      if(prop==="left"){from=el.offsetLeft;}
      var diff=to-from;
      tobj.stop=0;
      if(overwrite!=="none"){_cancelTween();}
      _startTween();
      function _step(){
        if(tobj.stop){return;}
        if(!progress){onStart.call();}
        progress=_getTime()-startTime;
        _tween();
        if(progress>=tobj.time){
          tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
          if(tobj.time<progress+1){tobj.time=progress+1;}
        }
        if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
      }
      function _tween(){
        if(duration>0){
          tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
          elStyle[prop]=Math.round(tobj.currVal)+"px";
        }else{
          elStyle[prop]=to+"px";
        }
        onUpdate.call();
      }
      function _startTween(){
        _delay=1000/60;
        tobj.time=progress+_delay;
        _request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
        tobj.id=_request(_step);
      }
      function _cancelTween(){
        if(tobj.id==null){return;}
        if(!window.requestAnimationFrame){clearTimeout(tobj.id);
        }else{window.cancelAnimationFrame(tobj.id);}
        tobj.id=null;
      }
      function _ease(t,b,c,d,type){
        switch(type){
          case "linear": case "mcsLinear":
            return c*t/d + b;
            break;
          case "mcsLinearOut":
            t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
            break;
          case "easeInOutSmooth":
            t/=d/2;
            if(t<1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
            break;
          case "easeInOutStrong":
            t/=d/2;
            if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
            t--;
            return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
            break;
          case "easeInOut": case "mcsEaseInOut":
            t/=d/2;
            if(t<1) return c/2*t*t*t + b;
            t-=2;
            return c/2*(t*t*t + 2) + b;
            break;
          case "easeOutSmooth":
            t/=d; t--;
            return -c * (t*t*t*t - 1) + b;
            break;
          case "easeOutStrong":
            return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
            break;
          case "easeOut": case "mcsEaseOut": default:
            var ts=(t/=d)*t,tc=ts*t;
            return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
        }
      }
    },
    /* -------------------- */


    /* returns current time */
    _getTime=function(){
      if(window.performance && window.performance.now){
        return window.performance.now();
      }else{
        if(window.performance && window.performance.webkitNow){
          return window.performance.webkitNow();
        }else{
          if(Date.now){return Date.now();}else{return new Date().getTime();}
        }
      }
    },
    /* -------------------- */


    /* stops a tween */
    _stopTween=function(){
      var el=this;
      if(!el._mTween){el._mTween={top:{},left:{}};}
      var props=["top","left"];
      for(var i=0; i<props.length; i++){
        var prop=props[i];
        if(el._mTween[prop].id){
          if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
          }else{window.cancelAnimationFrame(el._mTween[prop].id);}
          el._mTween[prop].id=null;
          el._mTween[prop].stop=1;
        }
      }
    },
    /* -------------------- */


    /* deletes a property (avoiding the exception thrown by IE) */
    _delete=function(c,m){
      try{delete c[m];}catch(e){c[m]=null;}
    },
    /* -------------------- */


    /* detects left mouse button */
    _mouseBtnLeft=function(e){
      return !(e.which && e.which!==1);
    },
    /* -------------------- */


    /* detects if pointer type event is touch */
    _pointerTouch=function(e){
      var t=e.originalEvent.pointerType;
      return !(t && t!=="touch" && t!==2);
    },
    /* -------------------- */


    /* checks if value is numeric */
    _isNumeric=function(val){
      return !isNaN(parseFloat(val)) && isFinite(val);
    },
    /* -------------------- */


    /* returns element position according to content */
    _childPos=function(el){
      var p=el.parents(".mCSB_container");
      return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
    },
    /* -------------------- */


    /* checks if browser tab is hidden/inactive via Page Visibility API */
    _isTabHidden=function(){
      var prop=_getHiddenProp();
      if(!prop) return false;
      return document[prop];
      function _getHiddenProp(){
        var pfx=["webkit","moz","ms","o"];
        if("hidden" in document) return "hidden"; //natively supported
        for(var i=0; i<pfx.length; i++){ //prefixed
            if((pfx[i]+"Hidden") in document)
                return pfx[i]+"Hidden";
        }
        return null; //not supported
      }
    };
    /* -------------------- */





  /*
  ----------------------------------------
  PLUGIN SETUP
  ----------------------------------------
  */

  /* plugin constructor functions */
  $.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
    if(methods[method]){
      return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
    }else if(typeof method==="object" || !method){
      return methods.init.apply(this,arguments);
    }else{
      $.error("Method "+method+" does not exist");
    }
  };
  $[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
    if(methods[method]){
      return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
    }else if(typeof method==="object" || !method){
      return methods.init.apply(this,arguments);
    }else{
      $.error("Method "+method+" does not exist");
    }
  };

  /*
  allow setting plugin default options.
  usage: $.mCustomScrollbar.defaults.scrollInertia=500;
  to apply any changed default options on default selectors (below), use inside document ready fn
  e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
  */
  $[pluginNS].defaults=defaults;

  /*
  add window object (window.mCustomScrollbar)
  usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
  */
  window[pluginNS]=true;

  $(window).bind("load",function(){

    $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */

    /* extend jQuery expressions */
    $.extend($.expr[":"],{
      /* checks if element is within scrollable viewport */
      mcsInView:$.expr[":"].mcsInView || function(el){
        var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
        if(!content.length){return;}
        wrapper=content.parent();
        cPos=[content[0].offsetTop,content[0].offsetLeft];
        return  cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) &&
            cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
      },
      /* checks if element or part of element is in view of scrollable viewport */
      mcsInSight:$.expr[":"].mcsInSight || function(el,i,m){
        var $el=$(el),elD,content=$el.parents(".mCSB_container"),wrapperView,pos,wrapperViewPct,
          pctVals=m[3]==="exact" ? [[1,0],[1,0]] : [[0.9,0.1],[0.6,0.4]];
        if(!content.length){return;}
        elD=[$el.outerHeight(false),$el.outerWidth(false)];
        pos=[content[0].offsetTop+_childPos($el)[0],content[0].offsetLeft+_childPos($el)[1]];
        wrapperView=[content.parent()[0].offsetHeight,content.parent()[0].offsetWidth];
        wrapperViewPct=[elD[0]<wrapperView[0] ? pctVals[0] : pctVals[1],elD[1]<wrapperView[1] ? pctVals[0] : pctVals[1]];
        return  pos[0]-(wrapperView[0]*wrapperViewPct[0][0])<0 && pos[0]+elD[0]-(wrapperView[0]*wrapperViewPct[0][1])>=0 &&
            pos[1]-(wrapperView[1]*wrapperViewPct[1][0])<0 && pos[1]+elD[1]-(wrapperView[1]*wrapperViewPct[1][1])>=0;
      },
      /* checks if element is overflowed having visible scrollbar(s) */
      mcsOverflow:$.expr[":"].mcsOverflow || function(el){
        var d=$(el).data(pluginPfx);
        if(!d){return;}
        return d.overflowed[0] || d.overflowed[1];
      }
    });

  });

 }))}));


 /*
  * jQuery Form Styler v1.7.6
  * https://github.com/Dimox/jQueryFormStyler
  *
  * Copyright 2012-2016 Dimox (http://dimox.name/)
  * Released under the MIT license.
  *
  * Date: 2016.06.05
  *
  */

 ;(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
 }(function($) {

  'use strict';

  var pluginName = 'styler',
      defaults = {
        idSuffix: '-styler',
        filePlaceholder: 'Файл не выбран',
        fileBrowse: 'Обзор...',
        fileNumber: 'Выбрано файлов: %s',
        selectPlaceholder: 'Выберите...',
        selectSearch: false,
        selectSearchLimit: 10,
        selectSearchNotFound: 'Совпадений не найдено',
        selectSearchPlaceholder: 'Поиск...',
        selectVisibleOptions: 0,
        singleSelectzIndex: '100',
        selectSmartPositioning: true,
        onSelectOpened: function() {},
        onSelectClosed: function() {},
        onFormStyled: function() {}
      };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype = {

    // инициализация
    init: function() {

      var el = $(this.element);
      var opt = this.options;

      var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
      var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

      function Attributes() {
        if (el.attr('id') !== undefined && el.attr('id') !== '') {
          this.id = el.attr('id') + opt.idSuffix;
        }
        this.title = el.attr('title');
        this.classes = el.attr('class');
        this.data = el.data();
      }

      // checkbox
      if (el.is(':checkbox')) {

        var checkboxOutput = function() {

          var att = new Attributes();
          var checkbox = $('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>')
            .attr({
              id: att.id,
              title: att.title
            })
            .addClass(att.classes)
            .data(att.data)
          ;

          // прячем оригинальный чекбокс
          el.css({
            position: 'absolute',
            zIndex: '-1',
            opacity: 0,
            margin: 0,
            padding: 0
          }).after(checkbox).prependTo(checkbox);

          checkbox.attr('unselectable', 'on').css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            '-o-user-select': 'none',
            'user-select': 'none',
            display: 'inline-block',
            position: 'relative',
            overflow: 'hidden'
          });

          if (el.is(':checked')) checkbox.addClass('checked');
          if (el.is(':disabled')) checkbox.addClass('disabled');

          // клик на псевдочекбокс
          checkbox.click(function(e) {
            e.preventDefault();
            if (!checkbox.is('.disabled')) {
              if (el.is(':checked')) {
                el.prop('checked', false);
                checkbox.removeClass('checked');
              } else {
                el.prop('checked', true);
                checkbox.addClass('checked');
              }
              el.focus().change();
            }
          });
          // клик на label
          el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
            if (!$(e.target).is('a') && !$(e.target).closest(checkbox).length) {
              checkbox.triggerHandler('click');
              e.preventDefault();
            }
          });
          // переключение по Space или Enter
          el.on('change.styler', function() {
            if (el.is(':checked')) checkbox.addClass('checked');
            else checkbox.removeClass('checked');
          })
          // чтобы переключался чекбокс, который находится в теге label
          .on('keydown.styler', function(e) {
            if (e.which == 32) checkbox.click();
          })
          .on('focus.styler', function() {
            if (!checkbox.is('.disabled')) checkbox.addClass('focused');
          })
          .on('blur.styler', function() {
            checkbox.removeClass('focused');
          });

        }; // end checkboxOutput()

        checkboxOutput();

        // обновление при динамическом изменении
        el.on('refresh', function() {
          el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
          el.off('.styler').parent().before(el).remove();
          checkboxOutput();
        });

      // end checkbox

      // radio
      } else if (el.is(':radio')) {

        var radioOutput = function() {

          var att = new Attributes();
          var radio = $('<div class="jq-radio"><div class="jq-radio__div"></div></div>')
            .attr({
              id: att.id,
              title: att.title
            })
            .addClass(att.classes)
            .data(att.data)
          ;

          // прячем оригинальную радиокнопку
          el.css({
            position: 'absolute',
            zIndex: '-1',
            opacity: 0,
            margin: 0,
            padding: 0
          }).after(radio).prependTo(radio);

          radio.attr('unselectable', 'on').css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            '-o-user-select': 'none',
            'user-select': 'none',
            display: 'inline-block',
            position: 'relative'
          });

          if (el.is(':checked')) radio.addClass('checked');
          if (el.is(':disabled')) radio.addClass('disabled');

          // определяем общего родителя у радиокнопок с одинаковым name
          // http://stackoverflow.com/a/27733847
          $.fn.commonParents = function (){
            var cachedThis = this;
            return cachedThis.first().parents().filter(function () {
              return $(this).find(cachedThis).length === cachedThis.length;
            });
          };
          $.fn.commonParent = function (){
            return $(this).commonParents().first();
          };

          // клик на псевдорадиокнопке
          radio.click(function(e) {
            e.preventDefault();
            if (!radio.is('.disabled')) {
              var inputName = $('input[name="' + el.attr('name') + '"]');
              inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass('checked');
              el.prop('checked', true).parent().addClass('checked');
              el.focus().change();
            }
          });
          // клик на label
          el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
            if (!$(e.target).is('a') && !$(e.target).closest(radio).length) {
              radio.triggerHandler('click');
              e.preventDefault();
            }
          });
          // переключение стрелками
          el.on('change.styler', function() {
            el.parent().addClass('checked');
          })
          .on('focus.styler', function() {
            if (!radio.is('.disabled')) radio.addClass('focused');
          })
          .on('blur.styler', function() {
            radio.removeClass('focused');
          });

        }; // end radioOutput()

        radioOutput();

        // обновление при динамическом изменении
        el.on('refresh', function() {
          el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
          el.off('.styler').parent().before(el).remove();
          radioOutput();
        });

      // end radio

      // file
      } else if (el.is(':file')) {

        // прячем оригинальное поле
        el.css({
          position: 'absolute',
          top: 0,
          right: 0,
          margin: 0,
          padding: 0,
          opacity: 0,
          fontSize: '100px'
        });

        var fileOutput = function() {

          var att = new Attributes();
          var placeholder = el.data('placeholder');
          if (placeholder === undefined) placeholder = opt.filePlaceholder;
          var browse = el.data('browse');
          if (browse === undefined || browse === '') browse = opt.fileBrowse;

          var file =
            $('<div class="jq-file">' +
                '<div class="jq-file__name">' + placeholder + '</div>' +
                '<div class="jq-file__browse">' + browse + '</div>' +
              '</div>')
            .css({
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden'
            })
            .attr({
              id: att.id,
              title: att.title
            })
            .addClass(att.classes)
            .data(att.data)
          ;

          el.after(file).appendTo(file);
          if (el.is(':disabled')) file.addClass('disabled');

          el.on('change.styler', function() {
            var value = el.val();
            var name = $('div.jq-file__name', file);
            if (el.is('[multiple]')) {
              value = '';
              var files = el[0].files.length;
              if (files > 0) {
                var number = el.data('number');
                if (number === undefined) number = opt.fileNumber;
                number = number.replace('%s', files);
                value = number;
              }
            }
            name.text(value.replace(/.+[\\\/]/, ''));
            if (value === '') {
              name.text(placeholder);
              file.removeClass('changed');
            } else {
              file.addClass('changed');
            }
          })
          .on('focus.styler', function() {
            file.addClass('focused');
          })
          .on('blur.styler', function() {
            file.removeClass('focused');
          })
          .on('click.styler', function() {
            file.removeClass('focused');
          });

        }; // end fileOutput()

        fileOutput();

        // обновление при динамическом изменении
        el.on('refresh', function() {
          el.off('.styler').parent().before(el).remove();
          fileOutput();
        });

      // end file

      } else if (el.is('input[type="number"]')) {

        var numberOutput = function() {

          var att = new Attributes();
          var number =
            $('<div class="jq-number">' +
                '<div class="jq-number__spin minus"></div>' +
                '<div class="jq-number__spin plus"></div>' +
              '</div>')
            .attr({
              id: att.id,
              title: att.title
            })
            .addClass(att.classes)
            .data(att.data)
          ;

          el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');
          if (el.is(':disabled')) number.addClass('disabled');

          var min,
              max,
              step,
              timeout = null,
              interval = null;
          if (el.attr('min') !== undefined) min = el.attr('min');
          if (el.attr('max') !== undefined) max = el.attr('max');
          if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
            step = Number(el.attr('step'));
          else
            step = Number(1);

          var changeValue = function(spin) {
            var value = el.val(),
                newValue;

            if (!$.isNumeric(value)) {
              value = 0;
              el.val('0');
            }

            if (spin.is('.minus')) {
              newValue = Number(value) - step;
            } else if (spin.is('.plus')) {
              newValue = Number(value) + step;
            }

            // определяем количество десятичных знаков после запятой в step
            var decimals = (step.toString().split('.')[1] || []).length;
            if (decimals > 0) {
              var multiplier = '1';
              while (multiplier.length <= decimals) multiplier = multiplier + '0';
              // избегаем появления лишних знаков после запятой
              newValue = Math.round(newValue * multiplier) / multiplier;
            }

            if ($.isNumeric(min) && $.isNumeric(max)) {
              if (newValue >= min && newValue <= max) el.val(newValue);
            } else if ($.isNumeric(min) && !$.isNumeric(max)) {
              if (newValue >= min) el.val(newValue);
            } else if (!$.isNumeric(min) && $.isNumeric(max)) {
              if (newValue <= max) el.val(newValue);
            } else {
              el.val(newValue);
            }
          };

          if (!number.is('.disabled')) {
            number.on('mousedown', 'div.jq-number__spin', function() {
              var spin = $(this);
              changeValue(spin);
              timeout = setTimeout(function(){
                interval = setInterval(function(){ changeValue(spin); }, 40);
              }, 350);
            }).on('mouseup mouseout', 'div.jq-number__spin', function() {
              clearTimeout(timeout);
              clearInterval(interval);
            }).on('mouseup', 'div.jq-number__spin', function() {
              el.change();
            });
            el.on('focus.styler', function() {
              number.addClass('focused');
            })
            .on('blur.styler', function() {
              number.removeClass('focused');
            });
          }

        }; // end numberOutput()

        numberOutput();

        // обновление при динамическом изменении
        el.on('refresh', function() {
          el.off('.styler').closest('.jq-number').before(el).remove();
          numberOutput();
        });

      // end number

      // select
      } else if (el.is('select')) {

        var selectboxOutput = function() {

          // запрещаем прокрутку страницы при прокрутке селекта
          function preventScrolling(selector) {
            selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
              var scrollTo = null;
              if (e.type == 'mousewheel') { scrollTo = (e.originalEvent.wheelDelta * -1); }
              else if (e.type == 'DOMMouseScroll') { scrollTo = 40 * e.originalEvent.detail; }
              if (scrollTo) {
                e.stopPropagation();
                e.preventDefault();
                $(this).scrollTop(scrollTo + $(this).scrollTop());
              }
            });
          }

          var option = $('option', el);
          var list = '';
          // формируем список селекта
          function makeList() {
            for (var i = 0; i < option.length; i++) {
              var op = option.eq(i);
              var li = '',
                  liClass = '',
                  liClasses = '',
                  id = '',
                  title = '',
                  dataList = '',
                  optionClass = '',
                  optgroupClass = '',
                  dataJqfsClass = '';
              var disabled = 'disabled';
              var selDis = 'selected sel disabled';
              if (op.prop('selected')) liClass = 'selected sel';
              if (op.is(':disabled')) liClass = disabled;
              if (op.is(':selected:disabled')) liClass = selDis;
              if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
              if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
              if (op.attr('class') !== undefined) {
                optionClass = ' ' + op.attr('class');
                dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
              }

              var data = op.data();
              for (var k in data) {
                if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
              }

              if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
              li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';

              // если есть optgroup
              if (op.parent().is('optgroup')) {
                if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
                li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
                if (op.is(':first-child')) {
                  li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
                }
              }

              list += li;
            }
          } // end makeList()

          // одиночный селект
          function doSelect() {

            var att = new Attributes();
            var searchHTML = '';
            var selectPlaceholder = el.data('placeholder');
            var selectSearch = el.data('search');
            var selectSearchLimit = el.data('search-limit');
            var selectSearchNotFound = el.data('search-not-found');
            var selectSearchPlaceholder = el.data('search-placeholder');
            var singleSelectzIndex = el.data('z-index');
            var selectSmartPositioning = el.data('smart-positioning');

            if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
            if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
            if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
            if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
            if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
            if (singleSelectzIndex === undefined || singleSelectzIndex === '') singleSelectzIndex = opt.singleSelectzIndex;
            if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

            var selectbox =
              $('<div class="jq-selectbox jqselect">' +
                  '<div class="jq-selectbox__select" style="position: relative">' +
                    '<div class="jq-selectbox__select-text"></div>' +
                    '<div class="jq-selectbox__trigger">' +
                      '<div class="jq-selectbox__trigger-arrow"></div></div>' +
                  '</div>' +
                '</div>')
              .css({
                display: 'inline-block',
                position: 'relative',
                zIndex: singleSelectzIndex
              })
              .attr({
                id: att.id,
                title: att.title
              })
              .addClass(att.classes)
              .data(att.data)
            ;

            el.css({margin: 0, padding: 0}).after(selectbox).prependTo(selectbox);

            var divSelect = $('div.jq-selectbox__select', selectbox);
            var divText = $('div.jq-selectbox__select-text', selectbox);
            var optionSelected = option.filter(':selected');

            makeList();

            if (selectSearch) searchHTML =
              '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
              '<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
            var dropdown =
              $('<div class="jq-selectbox__dropdown" style="position: absolute">' +
                  searchHTML +
                  '<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + list + '</ul>' +
                '</div>');
            selectbox.append(dropdown);
            var ul = $('ul', dropdown);
            var li = $('li', dropdown);
            var search = $('input', dropdown);
            var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
            if (li.length < selectSearchLimit) search.parent().hide();

            // показываем опцию по умолчанию
            // если у 1-й опции нет текста и она выбрана по умолчанию, то показываем плейсхолдер
            if (option.first().text() === '' && option.first().is(':selected')) {
              divText.text(selectPlaceholder).addClass('placeholder');
            } else {
              divText.text(optionSelected.text());
            }

            // определяем самый широкий пункт селекта
            var liWidthInner = 0,
                liWidth = 0;
            li.css({'display': 'inline-block'});
            li.each(function() {
              var l = $(this);
              if (l.innerWidth() > liWidthInner) {
                liWidthInner = l.innerWidth();
                liWidth = l.width();
              }
            });
            li.css({'display': ''});

            // подстраиваем ширину свернутого селекта в зависимости
            // от ширины плейсхолдера или самого широкого пункта
            if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
              divText.width(divText.width());
            } else {
              var selClone = selectbox.clone().appendTo('body').width('auto');
              var selCloneWidth = selClone.outerWidth();
              selClone.remove();
              if (selCloneWidth == selectbox.outerWidth()) {
                divText.width(liWidth);
              }
            }

            // подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
            if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

            // прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
            // если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
            if (option.first().text() === '' && el.data('placeholder') !== '') {
              li.first().hide();
            }

            // прячем оригинальный селект
            el.css({
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0
            });

            var selectHeight = selectbox.outerHeight(true);
            var searchHeight = search.parent().outerHeight(true);
            var isMaxHeight = ul.css('max-height');
            var liSelected = li.filter('.selected');
            if (liSelected.length < 1) li.first().addClass('selected sel');
            if (li.data('li-height') === undefined) li.data('li-height', li.outerHeight());
            var position = dropdown.css('top');
            if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
            if (dropdown.css('top') == 'auto') {
              dropdown.css({top: selectHeight});
              position = selectHeight;
            }
            dropdown.hide();

            // если выбран не дефолтный пункт
            if (liSelected.length) {
              // добавляем класс, показывающий изменение селекта
              if (option.first().text() != optionSelected.text()) {
                selectbox.addClass('changed');
              }
              // передаем селекту класс выбранного пункта
              selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
              selectbox.addClass(liSelected.data('jqfs-class'));
            }

            // если селект неактивный
            if (el.is(':disabled')) {
              selectbox.addClass('disabled');
              return false;
            }

            // при клике на псевдоселекте
            divSelect.click(function() {

              // колбек при закрытии селекта
              if ($('div.jq-selectbox').filter('.opened').length) {
                opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
              }

              el.focus();

              // если iOS, то не показываем выпадающий список,
              // т.к. отображается нативный и неизвестно, как его спрятать
              if (iOS) return;

              // умное позиционирование
              var win = $(window);
              var liHeight = li.data('li-height');
              var topOffset = selectbox.offset().top;
              var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
              var visible = el.data('visible-options');
              if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
              var minHeight = liHeight * 5;
              var newHeight = liHeight * visible;
              if (visible > 0 && visible < 6) minHeight = newHeight;
              if (visible === 0) newHeight = 'auto';

              var dropDown = function() {
                dropdown.height('auto').css({bottom: 'auto', top: position});
                var maxHeightBottom = function() {
                  ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
                };
                maxHeightBottom();
                ul.css('max-height', newHeight);
                if (isMaxHeight != 'none') {
                  ul.css('max-height', isMaxHeight);
                }
                if (bottomOffset < (dropdown.outerHeight() + 20)) {
                  maxHeightBottom();
                }
              };

              var dropUp = function() {
                dropdown.height('auto').css({top: 'auto', bottom: position});
                var maxHeightTop = function() {
                  ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
                };
                maxHeightTop();
                ul.css('max-height', newHeight);
                if (isMaxHeight != 'none') {
                  ul.css('max-height', isMaxHeight);
                }
                if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
                  maxHeightTop();
                }
              };

              if (selectSmartPositioning === true || selectSmartPositioning === 1) {
                // раскрытие вниз
                if (bottomOffset > (minHeight + searchHeight + 20)) {
                  dropDown();
                  selectbox.removeClass('dropup').addClass('dropdown');
                // раскрытие вверх
                } else {
                  dropUp();
                  selectbox.removeClass('dropdown').addClass('dropup');
                }
              } else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
                // раскрытие вниз
                if (bottomOffset > (minHeight + searchHeight + 20)) {
                  dropDown();
                  selectbox.removeClass('dropup').addClass('dropdown');
                }
              }

              // если выпадающий список выходит за правый край окна браузера,
              // то меняем позиционирование с левого на правое
              if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
                dropdown.css({left: 'auto', right: 0});
              }
              // конец умного позиционирования

              $('div.jqselect').css({zIndex: (singleSelectzIndex - 1)}).removeClass('opened');
              selectbox.css({zIndex: singleSelectzIndex});
              if (dropdown.is(':hidden')) {
                $('div.jq-selectbox__dropdown:visible').hide();
                dropdown.show();
                selectbox.addClass('opened focused');
                // колбек при открытии селекта
                opt.onSelectOpened.call(selectbox);
              } else {
                dropdown.hide();
                selectbox.removeClass('opened dropup dropdown');
                // колбек при закрытии селекта
                if ($('div.jq-selectbox').filter('.opened').length) {
                  opt.onSelectClosed.call(selectbox);
                }
              }

              // поисковое поле
              if (search.length) {
                search.val('').keyup();
                notFound.hide();
                search.keyup(function() {
                  var query = $(this).val();
                  li.each(function() {
                    if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
                      $(this).hide();
                    } else {
                      $(this).show();
                    }
                  });
                  // прячем 1-ю пустую опцию
                  if (option.first().text() === '' && el.data('placeholder') !== '') {
                    li.first().hide();
                  }
                  if (li.filter(':visible').length < 1) {
                    notFound.show();
                  } else {
                    notFound.hide();
                  }
                });
              }

              // прокручиваем до выбранного пункта при открытии списка
              if (li.filter('.selected').length) {
                if (el.val() === '') {
                  ul.scrollTop(0);
                } else {
                  // если нечетное количество видимых пунктов,
                  // то высоту пункта делим пополам для последующего расчета
                  if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
                  ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
                }
              }

              preventScrolling(ul);

            }); // end divSelect.click()

            // при наведении курсора на пункт списка
            li.hover(function() {
              $(this).siblings().removeClass('selected');
            });
            var selectedText = li.filter('.selected').text();

            // при клике на пункт списка
            li.filter(':not(.disabled):not(.optgroup)').click(function() {
              el.focus();
              var t = $(this);
              var liText = t.text();
              if (!t.is('.selected')) {
                var index = t.index();
                index -= t.prevAll('.optgroup').length;
                t.addClass('selected sel').siblings().removeClass('selected sel');
                option.prop('selected', false).eq(index).prop('selected', true);
                selectedText = liText;
                divText.text(liText);

                // передаем селекту класс выбранного пункта
                if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
                selectbox.data('jqfs-class', t.data('jqfs-class'));
                selectbox.addClass(t.data('jqfs-class'));

                el.change();
              }
              dropdown.hide();
              selectbox.removeClass('opened dropup dropdown');
              // колбек при закрытии селекта
              opt.onSelectClosed.call(selectbox);

            });
            dropdown.mouseout(function() {
              $('li.sel', dropdown).addClass('selected');
            });

            // изменение селекта
            el.on('change.styler', function() {
              divText.text(option.filter(':selected').text()).removeClass('placeholder');
              li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
              // добавляем класс, показывающий изменение селекта
              if (option.first().text() != li.filter('.selected').text()) {
                selectbox.addClass('changed');
              } else {
                selectbox.removeClass('changed');
              }
            })
            .on('focus.styler', function() {
              selectbox.addClass('focused');
              $('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
            })
            .on('blur.styler', function() {
              selectbox.removeClass('focused');
            })
            // изменение селекта с клавиатуры
            .on('keydown.styler keyup.styler', function(e) {
              var liHeight = li.data('li-height');
              if (el.val() === '') {
                divText.text(selectPlaceholder).addClass('placeholder');
              } else {
                divText.text(option.filter(':selected').text());
              }
              li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
              // вверх, влево, Page Up, Home
              if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
                if (el.val() === '') {
                  ul.scrollTop(0);
                } else {
                  ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
                }
              }
              // вниз, вправо, Page Down, End
              if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
                ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
              }
              // закрываем выпадающий список при нажатии Enter
              if (e.which == 13) {
                e.preventDefault();
                dropdown.hide();
                selectbox.removeClass('opened dropup dropdown');
                // колбек при закрытии селекта
                opt.onSelectClosed.call(selectbox);
              }
            }).on('keydown.styler', function(e) {
              // открываем выпадающий список при нажатии Space
              if (e.which == 32) {
                e.preventDefault();
                divSelect.click();
              }
            });

            // прячем выпадающий список при клике за пределами селекта
            if (!onDocumentClick.registered) {
              $(document).on('click', onDocumentClick);
              onDocumentClick.registered = true;
            }

          } // end doSelect()

          // мультиселект
          function doMultipleSelect() {

            var att = new Attributes();
            var selectbox =
              $('<div class="jq-select-multiple jqselect"></div>')
              .css({
                display: 'inline-block',
                position: 'relative'
              })
              .attr({
                id: att.id,
                title: att.title
              })
              .addClass(att.classes)
              .data(att.data)
            ;

            el.css({margin: 0, padding: 0}).after(selectbox);

            makeList();
            selectbox.append('<ul>' + list + '</ul>');
            var ul = $('ul', selectbox).css({
              'position': 'relative',
              'overflow-x': 'hidden',
              '-webkit-overflow-scrolling': 'touch'
            });
            var li = $('li', selectbox).attr('unselectable', 'on');
            var size = el.attr('size');
            var ulHeight = ul.outerHeight();
            var liHeight = li.outerHeight();
            if (size !== undefined && size > 0) {
              ul.css({'height': liHeight * size});
            } else {
              ul.css({'height': liHeight * 4});
            }
            if (ulHeight > selectbox.height()) {
              ul.css('overflowY', 'scroll');
              preventScrolling(ul);
              // прокручиваем до выбранного пункта
              if (li.filter('.selected').length) {
                ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
              }
            }

            // прячем оригинальный селект
            el.prependTo(selectbox).css({
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0
            });

            // если селект неактивный
            if (el.is(':disabled')) {
              selectbox.addClass('disabled');
              option.each(function() {
                if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
              });

            // если селект активный
            } else {

              // при клике на пункт списка
              li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
                el.focus();
                var clkd = $(this);
                if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
                if(!e.shiftKey) clkd.addClass('first');
                if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

                // выделение пунктов при зажатом Ctrl
                if(e.ctrlKey || e.metaKey) {
                  if (clkd.is('.selected')) clkd.removeClass('selected first');
                    else clkd.addClass('selected first');
                  clkd.siblings().removeClass('first');
                }

                // выделение пунктов при зажатом Shift
                if(e.shiftKey) {
                  var prev = false,
                      next = false;
                  clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
                  clkd.prevAll().each(function() {
                    if ($(this).is('.first')) prev = true;
                  });
                  clkd.nextAll().each(function() {
                    if ($(this).is('.first')) next = true;
                  });
                  if (prev) {
                    clkd.prevAll().each(function() {
                      if ($(this).is('.selected')) return false;
                        else $(this).not('.disabled, .optgroup').addClass('selected');
                    });
                  }
                  if (next) {
                    clkd.nextAll().each(function() {
                      if ($(this).is('.selected')) return false;
                        else $(this).not('.disabled, .optgroup').addClass('selected');
                    });
                  }
                  if (li.filter('.selected').length == 1) clkd.addClass('first');
                }

                // отмечаем выбранные мышью
                option.prop('selected', false);
                li.filter('.selected').each(function() {
                  var t = $(this);
                  var index = t.index();
                  if (t.is('.option')) index -= t.prevAll('.optgroup').length;
                  option.eq(index).prop('selected', true);
                });
                el.change();

              });

              // отмечаем выбранные с клавиатуры
              option.each(function(i) {
                $(this).data('optionIndex', i);
              });
              el.on('change.styler', function() {
                li.removeClass('selected');
                var arrIndexes = [];
                option.filter(':selected').each(function() {
                  arrIndexes.push($(this).data('optionIndex'));
                });
                li.not('.optgroup').filter(function(i) {
                  return $.inArray(i, arrIndexes) > -1;
                }).addClass('selected');
              })
              .on('focus.styler', function() {
                selectbox.addClass('focused');
              })
              .on('blur.styler', function() {
                selectbox.removeClass('focused');
              });

              // прокручиваем с клавиатуры
              if (ulHeight > selectbox.height()) {
                el.on('keydown.styler', function(e) {
                  // вверх, влево, PageUp
                  if (e.which == 38 || e.which == 37 || e.which == 33) {
                    ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
                  }
                  // вниз, вправо, PageDown
                  if (e.which == 40 || e.which == 39 || e.which == 34) {
                    ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
                  }
                });
              }

            }
          } // end doMultipleSelect()

          if (el.is('[multiple]')) {

            // если Android или iOS, то мультиселект не стилизуем
            // причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
            // причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
            if (Android || iOS) return;

            doMultipleSelect();
          } else {
            doSelect();
          }

        }; // end selectboxOutput()

        selectboxOutput();

        // обновление при динамическом изменении
        el.on('refresh', function() {
          el.off('.styler').parent().before(el).remove();
          selectboxOutput();
        });

      // end select

      // reset
      } else if (el.is(':reset')) {
        el.on('click', function() {
          setTimeout(function() {
            el.closest('form').find('input, select').trigger('refresh');
          }, 1);
        });
      } // end reset

    }, // init: function()

    // деструктор
    destroy: function() {

      var el = $(this.element);

      if (el.is(':checkbox') || el.is(':radio')) {
        el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
        el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
      } else if (el.is('input[type="number"]')) {
        el.removeData('_' + pluginName).off('.styler refresh').closest('.jq-number').before(el).remove();
      } else if (el.is(':file') || el.is('select')) {
        el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
      }

    } // destroy: function()

  }; // Plugin.prototype

  $.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      this.each(function() {
        if (!$.data(this, '_' + pluginName)) {
          $.data(this, '_' + pluginName, new Plugin(this, options));
        }
      }) 
      // колбек после выполнения плагина
      .promise()
      .done(function() {
        var opt = $(this[0]).data('_' + pluginName);
        if (opt) opt.options.onFormStyled.call();
      });
      return this;
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var returns;
      this.each(function() {
        var instance = $.data(this, '_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

  // прячем выпадающий список при клике за пределами селекта
  function onDocumentClick(e) {
    // e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
    // (при изменении селекта с клавиатуры срабатывает событие onclick)
    if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
      if ($('div.jq-selectbox.opened').length) {
        var selectbox = $('div.jq-selectbox.opened'),
            search = $('div.jq-selectbox__search input', selectbox),
            dropdown = $('div.jq-selectbox__dropdown', selectbox),
            opt = selectbox.find('select').data('_' + pluginName).options;

        // колбек при закрытии селекта
        opt.onSelectClosed.call(selectbox);

        if (search.length) search.val('').keyup();
        dropdown.hide().find('li.sel').addClass('selected');
        selectbox.removeClass('focused opened dropup dropdown');
      }
    }
  }
  onDocumentClick.registered = false;

 }));
