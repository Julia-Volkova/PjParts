// import test from './test.json'
var email_input = document.querySelector('.js-email'),
    submit_input = document.querySelector('.js-submit'),
    phone_input = document.querySelector('.js-phone'),
    search_btn = document.querySelector('.js-btn-search'),
    search_input = document.querySelector('.js-input-search');

// Yandex map
ymaps.ready(init);
var myMap,
    myPlacemark;

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.785118, 37.659326],
        zoom: 17
    });

    myPlacemark = new ymaps.Placemark([55.785118, 37.659326],
        {
            hintContent: 'Верхняя Красносельская улица, 2/1'
        });

    myMap.geoObjects.add(myPlacemark);
    // Cancel zoom on desktop
    myMap.behaviors.disable('scrollZoom');
    // Cancel zoom on mobile
    myMap.behaviors.disable('drag');
}

//Form validation
email_input.addEventListener('keyup', () => {
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

phone_input.addEventListener('keydown', (event) => {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    }
    else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
});

phone_input.addEventListener('keyup', () => {
    var regex = /^((\+7|7|8)+([0-9]){10})$/gm;
    if (regex.test(phone_input.value)) {
        phone_input.classList.add('valid');
        submit_input.removeAttribute('disabled');
    } else {
        phone_input.classList.remove('valid');
    }
});

search_btn.addEventListener('click', () => {
   search_input.classList.toggle('visible');
});

