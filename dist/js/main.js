!function(){var e=document.querySelectorAll(".section"),s=document.querySelector(".section--1"),t=(document.querySelector(".section--2"),document.querySelector(".section--3")),o=document.querySelector(".section--4"),c=(document.querySelector(".section--5"),document.querySelector(".logo")),l=(document.querySelector(".layout__link"),document.querySelector(".i-mail"),document.querySelector(".layout__contacts")),i=document.querySelector(".popup-open-1"),a=document.querySelector(".popup-open-2"),n=document.querySelector(".popup-open-3"),r=document.querySelector(".popup__img-1"),d=document.querySelector(".popup__img-2"),u=document.querySelector(".popup__img-3"),m=document.querySelector(".popup__img-4"),p=document.querySelector(".popup__img-5"),v=document.querySelector(".popup__img-6"),L=document.querySelector(".popup"),g=document.querySelector(".popup__close"),_=document.querySelector(".layout__btn"),y=document.querySelector("body"),h=document.querySelector(".main"),q=document.querySelector(".onepage-pagination"),S=(q.querySelector('a[href="#5"]'),q.querySelectorAll("a")),f=document.querySelector(".layout__lang-link-item"),b=document.body;i.addEventListener("click",function(){r.classList.add("popup__img--active"),L.classList.add("popup--active"),b.classList.add("disabled-onepage-scroll1")}),a.addEventListener("click",function(){d.classList.add("popup__img--active"),L.classList.add("popup--active"),b.classList.add("disabled-onepage-scroll1")}),n.addEventListener("click",function(){u.classList.add("popup__img--active"),L.classList.add("popup--active"),b.classList.add("disabled-onepage-scroll1")}),g.addEventListener("click",function(){r.classList.remove("popup__img--active"),d.classList.remove("popup__img--active"),u.classList.remove("popup__img--active"),m.classList.remove("popup__img--active"),p.classList.remove("popup__img--active"),v.classList.remove("popup__img--active"),L.classList.remove("popup--active"),b.classList.remove("disabled-onepage-scroll1")});var k=document.querySelector(".feedback-open-1"),w=document.querySelector(".feedback-open-2"),E=document.querySelector(".feedback-open-3");k.addEventListener("click",function(){m.classList.toggle("popup__img--active"),L.classList.add("popup--active"),b.classList.add("disabled-onepage-scroll1")}),w.addEventListener("click",function(){p.classList.toggle("popup__img--active"),L.classList.add("popup--active"),b.classList.add("disabled-onepage-scroll1")}),E.addEventListener("click",function(){v.classList.toggle("popup__img--active"),L.classList.add("popup--active"),b.classList.add("disabled-onepage-scroll1")});var x=document.querySelector(".section__text-link-1"),A=document.querySelector(".section__text-link-2"),N=document.querySelector(".section__text-link-3"),V=document.querySelector(".section__left"),z=document.querySelector(".toggles__tabs"),j=document.querySelector(".section__img-1"),I=document.querySelector(".section__img-2"),T=document.querySelector(".section__img-3");z.addEventListener("click",function(e){V.classList.remove("section__left--hover"),"area-1"==e.target.control.defaultValue&&(I.classList.remove("visible"),T.classList.remove("visible"),j.classList.add("visible")),"area-2"==e.target.control.defaultValue&&(j.classList.remove("visible"),T.classList.remove("visible"),I.classList.add("visible")),"area-3"==e.target.control.defaultValue&&(I.classList.remove("visible"),j.classList.remove("visible"),T.classList.add("visible"))}),x.addEventListener("click",function(){V.classList.toggle("section__left--hover")}),A.addEventListener("click",function(){V.classList.toggle("section__left--hover")}),N.addEventListener("click",function(){V.classList.toggle("section__left--hover")}),$(".section__left").hover(function(){},function(){V.classList.remove("section__left--hover")});var B=document.querySelector(".form"),C=document.querySelector(".form__btn"),D=(B.querySelectorAll("input"),B.querySelector(".form__input-phone")),F=D.querySelector("span"),G=B.querySelector(".form__input-email"),H=G.querySelector("span"),J=/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,K=/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;C.setAttribute("disabled",!0);var M=B.elements;M.town.onblur=function(){M.town.value||M.town.classList.add("error")},M.company.onblur=function(){M.company.value||M.company.classList.add("error")},M.name.onblur=function(){M.name.value||M.name.classList.add("error")},M.email.onblur=function(){M.email.value?(M.phone.classList.remove("error"),F.classList.add("hidden")):M.phone.value||M.email.classList.add("error")},M.phone.onblur=function(){M.phone.value?(M.email.classList.remove("error"),H.classList.add("hidden")):M.email.value||M.phone.classList.add("error")},setInterval(function(){"default"!=M.problem.value&&M.town.value&&M.company.value&&M.name.value&&M.phone.value&&J.test(M.phone.value)||M.email.value?C.removeAttribute("disabled"):C.setAttribute("disabled",!0);document.querySelector("#select");M.problem.blur=function(){if(console.log(1),"default"==M.problem.value){var e=document.querySelector(".jq-selectbox__select-text");e.style.color="red"}else e.style.color="#00dc89"},M.phone.onchange=function(){J.test(M.phone.value)?(F.classList.add("hidden"),M.email.classList.remove("error"),H.classList.add("hidden")):(M.phone.classList.add("error"),F.classList.remove("hidden"))},M.phone.onfocus=function(){F.classList.add("hidden"),M.phone.value&&(M.email.classList.remove("error"),H.classList.add("hidden"))},M.email.onchange=function(){K.test(M.email.value)?(H.classList.add("hidden"),M.phone.classList.remove("error"),F.classList.add("hidden")):H.classList.remove("hidden")},M.email.onfocus=function(){H.classList.add("hidden"),M.email.value&&(M.phone.classList.remove("error"),F.classList.add("hidden"))}},300);var O=document.querySelector(".scheme__toggle"),P=document.querySelector(".scheme"),Q=P.querySelector(".scheme__toggle-text-wrap"),R=P.querySelector(".scheme__toggle-open"),U=P.querySelector(".scheme__toggle-wrap"),W=P.querySelector(".scheme__img"),X=document.querySelector(".section__title--scheme"),Y=document.querySelector(".layout__contacts"),Z=document.querySelector(".layout__about"),ee=document.querySelector(".layout__lang"),se=P.querySelectorAll(".scheme__pin");O.addEventListener("click",function(){P.classList.toggle("scheme--open"),Q.classList.toggle("scheme__toggle-text-wrap--hidden"),O.classList.toggle("scheme__toggle--open"),R.classList.toggle("scheme__toggle-close"),U.classList.toggle("scheme__toggle-wrap--position"),W.classList.toggle("visible"),X.classList.toggle("visible"),Y.classList.toggle("hidden"),Z.classList.toggle("hidden"),ee.classList.toggle("hidden"),f.classList.toggle("hidden"),se.forEach(function(e){console.log(1111),e.classList.toggle("scheme__pin--blink")})});var te=document.querySelector(".success");C.addEventListener("click",function(){te.classList.add("visible"),ee.classList.add("hidden"),q.classList.add("hidden"),b.classList.add("disabled-onepage-scroll1"),setTimeout(function(){var t=q.querySelector('a[href="#1"]');te.classList.remove("visible"),"viewing-page-5"==y.className&&y.classList.remove("viewing-page-5"),"viewing-page-2"==y.className&&y.classList.remove("viewing-page-2"),"viewing-page-3"==y.className&&y.classList.remove("viewing-page-3"),"viewing-page-4"==y.className&&y.classList.remove("viewing-page-4"),e.forEach(function(e){"active"==e.classList[3]&&e.classList.remove("active")}),y.classList.add("viewing-page-1"),h.style.transform="translate3d(0px, 0%, 0px)",s.classList.add("active"),S.forEach(function(e){"active"==e.className&&e.classList.toggle("active")}),t.classList.toggle("active"),b.classList.remove("disabled-onepage-scroll1"),ee.classList.remove("hidden"),_.classList.remove("hidden"),l.classList.remove("hidden"),q.classList.remove("hidden"),q.classList.remove("onepage-pagination--white"),ee.classList.remove("layout__lang--white")},5e3)});var oe=document.querySelector(".about-link"),ce=document.querySelector(".about"),le=document.querySelector(".about__close");oe.addEventListener("click",function(){ce.classList.add("visible"),l.classList.add("hidden"),ee.classList.add("hidden"),f.classList.toggle("hidden"),oe.classList.add("hidden"),c.classList.add("logo--black"),b.classList.add("disabled-onepage-scroll1")}),le.addEventListener("click",function(){ce.classList.remove("visible"),l.classList.remove("hidden"),oe.classList.remove("hidden"),ee.classList.remove("hidden"),f.classList.remove("hidden"),b.classList.remove("disabled-onepage-scroll1"),ce.classList.contains("visible")||t.classList.contains("active")||o.classList.contains("active")?c.classList.add("logo--black"):c.classList.remove("logo--black")}),_.addEventListener("click",function(){ce.classList.remove("visible")})}();