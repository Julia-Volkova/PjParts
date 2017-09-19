// import test from './test.json'

// Yandex map
ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map ("map", {
        center: [55.785118, 37.659326],
        zoom: 17
    });

    myPlacemark = new ymaps.Placemark([55.785118, 37.659326],
        {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        });

    myMap.geoObjects.add(myPlacemark);
}


