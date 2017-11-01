describe('Users Controller', function()   {

    var controller,
        scope,
        rootScope,
        vmUsers,
        userService,
        httpBackend,
        q,
        timeout;

    // mocking the module
    beforeEach(angular.mock.module('userApp'));

    // scope is a data model object, one per controller
    // root scope is across the entire app/module, touches multiple controllers
    beforeEach(inject(function($injector) {
      // grabbing user service
      userService = $injector.get('userService');
      // Angular promise library
      q = $injector.get('$q');
      // Angular function that allows you to creaste an instance of a controller
      // a library that allows you to create instances of controllers, works like a constructor
      // says to take the controller and give me a mew instance of it
      // 2 properties that every controller(userController in this case) has, the 'blueprint' that you want to copy it from, and the scope(the data that you are giving it in this particular instance)
      controller = $injector.get('$controller');
      // setting our scope to an empty object
      scope = {};
      // Angulars library for waiting
      timeout = $injector.get('$timeout');

      // test data
      var users = [{name: "Benjamin", email: "beniscool@gmail.com"}];
      // test data for single user
      var user = {name: "Larry", email: "sample email"};

      // spyOn creates a listener to watch functions, mocks those functions, returns whatever data we tell it to
      // spying on the getUser service, specifically the getUsers function of that service
      // .and, mock this function, but don't call it, instead return the value that I specifically
      // q.resolve, .resolve method from Angulars promise library, means promise has been resolved. It has been resolved with an object with a property 'data', with a value of 'users'
      spyOn(userService, 'getUsers').and.returnValue(q.resolve({data: users}));
      spyOn(userService, 'createUser').and.returnValue(q.resolve({data: user}));
      // creates a new instance of the controller 'userCtrl', with a scope of 'scope', which we have defined as an empty object
      vmUsers = controller('userController', {$scope: scope});

    }));

    describe('getUsers', function() {

      it('it should get all users', function() {
        // calls getUsers() on vmUsers, which we have defined above as an instance of userCtrl, with an empty object as it's scope
        vmUsers.getUsers();
        // forces your promise to resolve
        timeout.flush();
        // expect the first index of the array that vmUsers.users returns to equal the object provided
        expect(vmUsers.users[0]).toEqual({name: "Benjamin", email: "beniscool@gmail.com"});
        // my spy listener recognizes that userService.getUsers has been called
        expect(userService.getUsers).toHaveBeenCalled();
      });
    });

    describe('createUser', function() {



      it('should create a new user', function() {
        var notHere = _.find(vmUsers.users, {name: 'Larry'});
        expect(notHere).toBeFalsy();
        vmUsers.createUser();
        timeout.flush();
        var answer = _.find(vmUsers.users, {name: 'Larry'})
        expect(answer).toBeTruthy();
        expect(userService.getUsers).toHaveBeenCalled();
      });

    });

});
