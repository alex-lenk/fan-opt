jQuery(function($){$.ajax({url:banner_ajax.url,data:{action:'get_banner'},success:function(data){console.log(data);if(!data.disabled){setTimeout(function(){$(data.html).hide().appendTo($('body')).ready(function(){document.body.click();}).show('slow');$('.xxx-banner__close').click(function(e){$(this).parent().hide('slow',function(){$(this).remove();});e.preventDefault();return;});},data.show*1000);if(data.hide>0){setTimeout(function(){$('.xxx-banner__close').click();},(parseInt(data.show)+parseInt(data.hide))*1000);}}},dataType:"JSON"});});
;'use strict';

// CONSTANTS
var LAZY_LOADING_IMAGE_CLASS = 'lazy-loading';
var LAZY_LOADING_IMAGE_ATTR = 'data-src';

// OPTIONS
var setLazyEvents = ['load', 'click'];
var lazyLoadingEvents = ['load', 'scroll', 'resize', 'click'];

// STORE
var images = [];

// FUNCTIONS
function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}

function registerListeners(events, func) {
    for (var i = 0; i < events.length; i++) {
        registerListener(events[i], func);
    }
}

function setLazy() {
    images = document.getElementsByClassName(LAZY_LOADING_IMAGE_CLASS);
}

function isInViewport(image) {
    var rect = image.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function loadImage(image) {
    if (image.getAttribute(LAZY_LOADING_IMAGE_ATTR)){
        image.src = image.getAttribute(LAZY_LOADING_IMAGE_ATTR);
        image.removeAttribute(LAZY_LOADING_IMAGE_ATTR);
    }
}

function viewportExec(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        if (isInViewport(arr[i])) {
            func(arr[i]);
        }
    }
}

function lazyLoading() {
    viewportExec(images, loadImage);
    images = Array.prototype.filter.call(images, function (el) {
        return el.getAttribute(LAZY_LOADING_IMAGE_ATTR);
    });
}

// INIT
registerListeners(setLazyEvents, setLazy);
registerListeners(lazyLoadingEvents, lazyLoading);