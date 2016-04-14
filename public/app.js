angular.module('app', ['ngRoute', 'firebase'])
  .run(function() {
    console.log('works');
  })
  .config(function($routeProvider, $locationProvider) {
    
    $routeProvider
      .when("/", {
        controller: "MainController as main",
        templateUrl: "templates/index.html"
      })
      .when("/games/:id", {
        templateUrl: "templates/game.html",
        controller: "GameController as game"
      })
      .when("/action", {
        templateUrl: "templates/action.html",
        controller: "ActionController as action"
      })
      .otherwise({redirectTo:'/'});
  })
  .controller("MainController", MainController)
  .controller("GameController", GameController)
  .controller("ActionController", ActionController);
  
function MainController($http) {
  var main = this;
  $http.get('games.json')
    .then(function(res) {
      main.games = res.data;
      console.log(res.data);
    })
}

function GameController($http, $routeParams) {
  var game = this;
  var id = $routeParams.id;
  game.id = id;
  $http.get('games.json')
    .then(function(res) {
      var games = angular.fromJson(res);
      console.log(games.data);
      game.single = games.data.filter(function(single) {
        return single.id == $routeParams.id;
      })[0];
    })
}

function ActionController() {
  var action = this;
}