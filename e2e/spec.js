// describing what app we are testing
describe('userApp', function() {
  var nameInput = element(by.model('newUser.name'));
  var emailInput = element(by.model('newUser.email'));
  var submitButton = element(by.id('submitButton'));
  var nameBinding = element(by.binding('user.name'));
  var emailBinding = element(by.binding('user.email'));
  var history = element.all(by.repeater('user in vmUsers.users'));

  beforeEach(function() {
    browser.get('http://localhost:3001/#!/users');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Angular..LIKE A BOSS.');
  });

  it('should create a new user', function() {
    nameInput.sendKeys('Benedict Cumberbatch');
    emailInput.sendKeys('benedeezy@email.com');
    submitButton.click();

    expect(history.count()).toEqual(11);
  });

  it('should enter the correct name and email for the new user', function() {
    nameInput.sendKeys('Benedict Cumberbatch');
    emailInput.sendKeys('benedeezy@email.com');
    submitButton.click();

    expect(history.last().getText()).toContain('Benedict Cumberbatch');
  })


})
