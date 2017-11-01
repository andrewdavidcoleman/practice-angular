(function() {
  'use strict';

  // calling the userApp module, using the .factory method on it which creates a
  // new factory constructor
  angular.module('userApp').factory('userService', userService);
  function userService($http) {
    return {
      getUsers: getUsers,
      createUser: createUser,
      deleteUser: deleteUser,
      supWorld: supWorld
    }

    // $http is an Angular library that helps you user .get .post .delete, etc.
    function getUsers() {
      return $http.get('http://jsonplaceholder.typicode.com/users')
    }

    function createUser(newUser) {
      return $http.post('http://jsonplaceholder.typicode.com/users', newUser)
    }

    function deleteUser(user) {
      return $http.delete('http://jsonplaceholder.typicode.com/users', user)
    }

    function supWorld(a, b) {
      return a + b;
    }

  };




})();
