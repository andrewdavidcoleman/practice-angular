angular
  .module('userApp')
    .controller('userController', userController);

    function userController(_userService_, $scope) {
      var vmUsers = this;
      var userService = _userService_;

      vmUsers.users = [];
      vmUsers.newUser = {};
      vmUsers.getUsers = getUsers;
      vmUsers.createUser = createUser;
      vmUsers.deleteUser = deleteUser;

      function init() {
        vmUsers.getUsers();
      }

      init();

      function getUsers() {
        return userService.getUsers().then(function(res) {
          vmUsers.users = res.data;
          console.log(vmUsers.users);
        })
      }

      function createUser(newUser) {
        return userService.createUser(newUser).then(function(res) {
          console.log(res.data);
          vmUsers.users.push(res.data);
          console.log(vmUsers.users);
          vmUsers.newUser = {};
        });
      }

      function deleteUser(user){
        return userService.deleteUser(user.id).then(function(res) {
          _.pull(vmUsers.users, user);
        }, function(response) {
          _.pull(vmUsers.users, user);
        })
      }

      $scope.bodyStyle = {
        'text-align': 'center'
      }

      $scope.headerStyle = {
        'color': 'black',
        'margin': '10px',
        'font-family': 'Inconsolata'
      }

      $scope.cardStyle = {
        'color': 'black',
        'padding': '10px',
        'margin': '10px',
        'border': '5px solid green',
        'display': 'inline-block',
        'border-radius': '8px',
        'text-align': 'center',
        'width': '200px',
        'font-family': ''
      }

      $scope.imgStyle = {
        'border': '5px solid black',
        'margin': '5px',
        'border-radius': '100%'
      }




    };
