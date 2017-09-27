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
    container_result = document.querySelector('.js-container-result'),
    elements = [];

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


// Search
search_btn.addEventListener('click', () => {
    modal.classList.add('visible');
    modal.style.height = document.body.offsetHeight + 'px'; // можно удалить
});

close_modal_btn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.remove('visible');
});

input_search.addEventListener('keypress', () => {
    var value = input_search.value;
    if (value != null) {
        console.log('отправляю запрос')
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'include/search.php', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status != 200) {

            } else {
                notFound();
                // success(data);
            }
        };
    }
});

function success(data) {
    data.forEach(el => {
        elements.push(el);
    });
    return showResultNumber(elements) + showListElement(elements);
}

function showResultNumber(data) {
    return `<h2>Результаты (<span>${data.length}</span> шт):</h2>
            <div class="modal__result js-container-result"></div>`;
}

function showListElement(data) {
    data.forEach(item => {
        container_result += renderElement(item);
    });
}

function renderElement(el) {
    return `<a href="">${el.name}</a>`;
}

function notFound() {
    return `<h2>К сожалению, ничего не найдено</h2>
            <p>Но Вы можете связаться с нами по телефону <a class="modal__phone" href="tel:+74993916031">+7 (499)
                    391-60-31</a> или по почте <a class="modal__email" href="mailto:info@pjparts.ru">info@pjparts.ru</a>
                и мы что-нибудь придумаем!</p>`;
}

form.addEventListener('submit', () => {
    intro_form.classList.add('hide');
    submit_form.classList.add('visible');
});


submit_input.addEventListener('click', (e) => {
    e.preventDefault();
    intro_form.classList.add('hide');
    submit_form.classList.add('visible');
});
