'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
    var scope;
    var rootScope;
    var ctrl;
    var busServiceMock;
    
    beforeEach(module('myApp.controllers'));

    describe('LightsController', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            busServiceMock = {
                sendBusData: function(ipAddress, io, command) {
                }
            };
            ctrl = $controller('LightsController', {$scope: scope, busService: busServiceMock});
        }));
        
        it('should initialize lightStatus with "UNKNOWN"', inject(function() {
            expect(scope.lightStatus).toBe("UNKNOWN");
        }));
        
        
        it('should send off to the bus when the light is currently switched on', inject(function() {
            //given
            scope.lightStatus = "ON";
            spyOn(busServiceMock, 'sendBusData');
            
            //when
            scope.toggle();
            
            //then
            expect(busServiceMock.sendBusData).toHaveBeenCalledWith(1,1);
        }));

        it('should send on to the bus when the light is currently switched off', inject(function() {
            //given
            scope.lightStatus = "OFF";
            spyOn(busServiceMock, 'sendBusData');
            
            //when
            scope.toggle();
            
            //then
            expect(busServiceMock.sendBusData).toHaveBeenCalledWith(1,2);
        }));

        it('should set lightStatus to OFF when receiving GET1=0', inject(function() {
            //given
            scope.lightStatus = "ON";
            
            //when
            rootScope.$broadcast('GET1','0');
            
            //then
            expect(scope.lightStatus).toBe("OFF");
        }));

        it('should set lightStatus to ON when receiving GET1=1', inject(function() {
            //given
            scope.lightStatus = "OFF";
            
            //when
            rootScope.$broadcast('GET1','1');
            
            //then
            expect(scope.lightStatus).toBe("ON");
        }));

    
    });
});
