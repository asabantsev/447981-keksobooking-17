'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var nearbyOffers = {
  objectAtr: {
    author: {
      avatar: 'img/avatars/user0',
    },
    offer: {
      type: ['palace', 'flat', 'house', 'bungalo'],
    },
    location: {
      x: {
        min: 150,
        max: 1000
      },
      y: {
        min: 300,
        max: 630
      }
    }
  },
};

var randomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateObject = function () {
  var objectAtr = [];

  for (var i = 1; i < 9; i++) {
    objectAtr[i] = {
      author: {
        avatar: nearbyOffers.objectAtr.author.avatar + i + '.png',
      },
      offer: {
        type: nearbyOffers.objectAtr.offer.type[randomInteger(0, nearbyOffers.objectAtr.offer.type.length - 1)]
      },
      location: {
        x: randomInteger(nearbyOffers.objectAtr.location.x.min, nearbyOffers.objectAtr.location.x.max),
        y: randomInteger(nearbyOffers.objectAtr.location.y.min, nearbyOffers.objectAtr.location.y.max)
      },
    };
  }

  return objectAtr;
};

var data = generateObject();

var createPin = function (objectAtr) {
  var pinElement = mapTemplate.cloneNode(true);

  pinElement.querySelector('img').src = objectAtr.author.avatar;
  pinElement.style.left = objectAtr.location.x + 'px';
  pinElement.style.top = objectAtr.location.y + 'px';
  pinElement.querySelector('img').alt = objectAtr.offer.type;

  return pinElement;
};

var renderPin = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 1; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }
  similarListElement.appendChild(fragment);
};

renderPin();
