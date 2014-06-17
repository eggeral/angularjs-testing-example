var LightsPage = function() {
    this.button = element.all(by.css('[ng-view] button')).first();
    this.status = element.all(by.css('[ng-view] h1')).first();
    this.header = element.all(by.css('[ng-view] p')).first();

    this.open = function() {
        browser.get('index.html#/lights');
    };

    this.waitForLightStatus = function(test) {
        var value;
        var ptor = protractor.getInstance();
        ptor.wait(function() {
            var status = element.all(by.css('[ng-view] h1')).first();
            status.getText().then(function(text) {
                value = text;
            });
            return test(value);
        }, 2000, "Waiting for lightStatus.");
        return value;
    };

};
module.exports = new LightsPage();

