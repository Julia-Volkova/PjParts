!function r(e,n,t){function o(i,u){if(!n[i]){if(!e[i]){var f="function"==typeof require&&require;if(!u&&f)return f(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n?n:r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(r,e,n){"use strict";function t(){o=new ymaps.Map("map",{center:[55.785118,37.659326],zoom:17}),a=new ymaps.Placemark([55.785118,37.659326],{hintContent:"Москва!",balloonContent:"Столица России"}),o.geoObjects.add(a)}ymaps.ready(t);var o,a},{}]},{},[1]);