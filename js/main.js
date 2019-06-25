'use strict';

var TOTAL_OFFERS = 8;
var LOCATION_X_MIN = 130;
var LOCATION_X_MAX = 1070;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AVATAR_PATH = 'img/avatars/user0';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');
var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var randomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateOffer = function () {
  var offerArray = [];

  for (var i = 0; i < TOTAL_OFFERS; i++) {
    var offerObject = {
      author: {
        avatar: AVATAR_PATH + i + '.png',
      },
      offer: {
        type: TYPES[randomInteger(0, TYPES.length)]
      },
      location: {
        x: randomInteger(LOCATION_X_MIN, LOCATION_X_MAX),
        y: randomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX)
      },
    };

    offerArray.push(offerObject);
  }

  return offerArray;
};

var data = generateOffer();

var createPin = function (offerArray) {
  var pinElement = mapTemplate.cloneNode(true);

  pinElement.querySelector('img').src = offerArray.author.avatar;
  pinElement.querySelector('img').alt = offerArray.offer.type;
  pinElement.style.left = offerArray.location.x + 'px';
  pinElement.style.top = offerArray.location.y + 'px';

  return pinElement;
};

var renderPin = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }

  similarListElement.appendChild(fragment);
};

renderPin();
