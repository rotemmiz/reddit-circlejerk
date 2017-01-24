describe('Example', function () {

  beforeEach(function (done) {
    simulator.reloadReactNativeApp(done);
  });

  it('should have Game in Header', function () {
    expect(element(by.id('container'))).toBeVisible();
  });
});
