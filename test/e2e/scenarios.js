'use strict';

describe('Simple Home Automation', function() {

    browser.get('index.html');

    it('should automatically redirect to /lights when location hash/fragment is empty', 
        function() {
        expect(browser.getLocationAbsUrl()).toMatch("/lights");
    });


    describe('lights', function() {
        var lightsPage = require('./lightsPage.js');

        beforeEach(function() {
            lightsPage.open();            
        });


        it('should render lights when user navigates to /lights', function() {
            expect(lightsPage.header.getText()).toBe('The light is:');
            expect(lightsPage.button.getText()).toBe('toggle');
            expect(lightsPage.status.isPresent()).toBe(true);
        });

        it('should turn the light on or off when the toggle button is pressed', function() {

            var value = lightsPage.waitForLightStatus(function(v) {
                return v === 'ON' || v === 'OFF';
            });
            
            var expected1;
            var expected2;

            if (value === 'ON') {
                expected1 = 'OFF';
                expected2 = 'ON';
            }
            else {
                expected1 = 'ON';
                expected2 = 'OFF';
            }

            lightsPage.button.click();
            lightsPage.waitForLightStatus(function(v) {
                return v === expected1;
            });

            expect(lightsPage.status.getText()).toBe(expected1);

            lightsPage.button.click();
            lightsPage.waitForLightStatus(function(v) {
                return v === expected2;
            });

            expect(lightsPage.status.getText()).toBe(expected2);
        });

    });

});
