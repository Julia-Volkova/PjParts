// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

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

input_search.addEventListener('keyup', () => {
  const value = input_search.value;
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({text: value})
  };

  if (value !== '') {
    fetch('include/search_post.php', options)
      .then(data => data.json())
      .then(data => {
        const length = data.length
        if (length > 3) {
          success(data)
        }
        if (length === 0) {
          notFound()
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  else {
    clearResult();
  }
});

function success(data) {
  return showResultNumber(data) + showListElement(data);
}

function showResultNumber(data) {
  container.innerHTML = `<h2>Результаты (<span>${data.length}</span> шт):</h2>
            <div class="modal__result js-container-result"></div>`;
}

function showListElement(data) {
  const container_result = document.querySelector('.js-container-result');
  data.forEach(item => {
    container_result.innerHTML += renderElement(item);
  });
}

function renderElement(el) {
  return `<a href="search.php?q=${el.name}" target="_blank">${el.name}</a>`;
}

function notFound() {
  container.innerHTML = `<h2>К сожалению, ничего не найдено</h2>
            <p>Но Вы можете связаться с нами по телефону <a class="modal__phone" href="tel:+74993916031">+7 (499)
                    391-60-31</a> или по почте <a class="modal__email" href="mailto:info@pjparts.ru">info@pjparts.ru</a>
                и мы что-нибудь придумаем!</p>`;
}

function clearResult() {
  container.innerHTML = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var formData = new FormData(form);

  var options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      name: formData.get('name'),
      tel: formData.get('tel'),
      email: formData.get('email')
    })
  };
  fetch('/send_post.php', options).then((response) => {
    intro_form.classList.add('hide');
    submit_form.classList.add('visible');
  }).catch(error => console.log(error));
});

