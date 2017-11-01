angular.module('userApp').config(function ( $stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/users');

  $stateProvider
  .state('users', {
    url: '/users',
    templateUrl: '/users.html',
    controller: 'userController as vmUsers'
  })

  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '/index.html',
    controller: 'userController as vmUsers'
  })

});
