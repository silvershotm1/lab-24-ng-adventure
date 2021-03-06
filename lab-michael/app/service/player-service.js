'use strict';

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.factory('playerService', ['$q', '$log', 'mapService', playerService]);

function playerService($q, $log, mapService) {
  $log.debug('player service');

  let service = {};

  let turn = 0;
  let player = service.player = {
    name: 'Hans Steinbeck',
    location: 'Entrance',
    hp: 20
  };

  let history = service.history = [
    {
      turn,
      desc: 'Willkommen zum Oktoberfest',
      location: 'Entrance'
    }
  ];

  service.movePlayer = function(direction) {
    return new $q((resolve, reject) => {
      turn++;

      let current = player.location;
      let newLocation = mapService.mapData[current][direction];

      if (!newLocation) {
        history.unshift({
          turn,
          desc: 'Achtung! Verboden! Try Again',
          location: player.location,
          hp: player.hp
        });
        return reject('Die Polizei hier!');
      };

      history.unshift({
        turn,
        location: newLocation,
        desc: mapService.mapData[newLocation].desc,
        hp: player.hp
      });

      player.location = newLocation;
      return resolve(player.location);
    });
  };

  return service;
};
