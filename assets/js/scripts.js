(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// import test from './test.json'
var email_input = document.querySelector('.js-email'),
    submit_input = document.querySelector('.js-submit'),
    phone_input = document.querySelector('.js-phone'),
    search_btn = document.querySelector('.js-btn-search'),
    close_modal_btn = document.querySelector('.js-btn-close'),
    modal = document.querySelector('.js-modal'),
    form = document.querySelector('.js-form'),
    intro_form = document.querySelector('.js-intro-form'),
    submit_form = document.querySelector('.js-submit-form'),
    input_search = document.querySelector('.js-input-search'),
    container = document.querySelector('.modal__content-result'),
    elements = [];

// Yandex map
ymaps.ready(init);
var myMap, myPlacemark;

function init() {
  myMap = new ymaps.Map("map", {
    center: [55.785118, 37.659326],
    zoom: 17
  });

  myPlacemark = new ymaps.Placemark([55.785118, 37.659326], {
    hintContent: 'Верхняя Красносельская улица, 2/1'
  });

  myMap.geoObjects.add(myPlacemark);
  // Cancel zoom on desktop
  myMap.behaviors.disable('scrollZoom');
  // Cancel zoom on mobile
  myMap.behaviors.disable('drag');
}

//Form validation
email_input.addEventListener('keyup', function () {
  var regex = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
  if (regex.test(email_input.value)) {
    email_input.classList.add('valid');
    submit_input.removeAttribute('disabled');
  } else {
    if (email_input.value != '') {
      email_input.classList.add('invalid');
    } else {
      email_input.classList.remove('invalid');
    }
  }
});

phone_input.addEventListener('keydown', function (event) {
  if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 65 && event.ctrlKey === true || event.keyCode >= 35 && event.keyCode <= 39) {
    return;
  } else {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
});

phone_input.addEventListener('keyup', function () {
  var regex = /^((\+7|7|8)+([0-9]){10})$/gm;
  if (regex.test(phone_input.value)) {
    phone_input.classList.add('valid');
    submit_input.removeAttribute('disabled');
  } else {
    phone_input.classList.remove('valid');
  }
});

// Search
search_btn.addEventListener('click', function () {
  modal.classList.add('visible');
  modal.style.height = document.body.offsetHeight + 'px'; // можно удалить
});

close_modal_btn.addEventListener('click', function (e) {
  e.preventDefault();
  modal.classList.remove('visible');
});

input_search.addEventListener('keyup', function () {
  var value = input_search.value;
  var options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({ text: value })
  };

  if (value !== '') {
    fetch('include/search.php', options).then(function (data) {
      return data.json();
    }).then(function (data) {
      var length = data.length;
      if (length > 3) {
        success(data);
      }
      if (length === 0) {
        notFound();
      }
    }).catch(function (error) {
      console.log(error);
    });
  } else {
    clearResult();
  }
});

function success(data) {
  return showResultNumber(data) + showListElement(data);
}

function showResultNumber(data) {
  container.innerHTML = '<h2>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B (<span>' + data.length + '</span> \u0448\u0442):</h2>\n            <div class="modal__result js-container-result"></div>';
}

function showListElement(data) {
  var container_result = document.querySelector('.js-container-result');
  data.forEach(function (item) {
    container_result.innerHTML += renderElement(item);
  });
}

function renderElement(el) {
  return '<a href="search.php?q=' + el.name + '" target="_blank">' + el.name + '</a>';
}

function notFound() {
  container.innerHTML = '<h2>\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</h2>\n            <p>\u041D\u043E \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 <a class="modal__phone" href="tel:+74993916031">+7 (499)\n                    391-60-31</a> \u0438\u043B\u0438 \u043F\u043E \u043F\u043E\u0447\u0442\u0435 <a class="modal__email" href="mailto:info@pjparts.ru">info@pjparts.ru</a>\n                \u0438 \u043C\u044B \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u043F\u0440\u0438\u0434\u0443\u043C\u0430\u0435\u043C!</p>';
}

function clearResult() {

  container.innerHTML = ' ';
}

// form.addEventListener('submit', () => {
//     intro_form.classList.add('hide');
//     submit_form.classList.add('visible');
// });


// submit_input.addEventListener('click', (e) => {
//     e.preventDefault();
//     intro_form.classList.add('hide');
//     submit_form.classList.add('visible');
// });


form.addEventListener('submit', function (e) {
  e.preventDefault();
  var formData = new FormData(form);
  var options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    body: formData
  };
  fetch('/', options).then(function (response) {
    intro_form.classList.add('hide');
    submit_form.classList.add('visible');
  }).catch(function (error) {
    return console.log(error);
  });
});

},{}]},{},[1]);
