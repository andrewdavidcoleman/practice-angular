//this is referred to as a test suite
describe('User test', function() {
  // it block
  var userService;
  var $httpBackend;

  // Before each test load our userApp module
  beforeEach(angular.mock.module('userApp'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_userService_, $injector) {
    userService = _userService_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  // A simple test to verify the Users service exists
  it('should exist', function() {
    expect(userService).toBeDefined();
  });

  // sup world test to test the test
  describe('.supWorld', function() {

    it('should return a string of "sup, world"', function() {
      expect(userService.supWorld(2, 2)).toEqual(4);
    })
  })

  // test for userService.getUsers() method
  describe('.getUsers', function() {

    it('should exist', function() {
      expect(userService.getUsers).toBeDefined();
    });

    it('should make a GET request tot he API', function() {
      $httpBackend.expectGET('http://jsonplaceholder.typicode.com/users').respond('');
      userService.getUsers();
      $httpBackend.flush();
    })

  });

  // test for userService.createUser() method
  describe('.createUser', function() {

    it('should exist', function() {
      expect(userService.createUser).toBeDefined();
    });

    it('should make a POST request to the API', function() {
      $httpBackend.expectPOST('http://jsonplaceholder.typicode.com/users').respond('');
      userService.createUser();
      $httpBackend.flush();
    })
  });

  // test for userService.deleteUser() method
  describe('.deleteUser', function() {

    it('should exist', function() {
      expect(userService.deleteUser).toBeDefined();
    });

    it('should make a DELETE request to the API', function() {
      $httpBackend.expectDELETE('http://jsonplaceholder.typicode.com/users').respond('');
      userService.deleteUser();
      $httpBackend.flush();
    })
  });
});
