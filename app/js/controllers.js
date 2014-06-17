'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
        .controller('LightsController', ['$scope', 'busService', function($scope, busService) {
                $scope.lightStatus = "UNKNOWN";

                $scope.$on('GET1', function(event, value) {
                    switch (value) {
                        case '0':
                            $scope.lightStatus = "OFF";
                            break;
                        case '1':
                            $scope.lightStatus = "ON";
                            break;
                        default:
                            $scope.lightStatus = "OFF";
                    }
                });

                $scope.toggle = function() {
                    switch ($scope.lightStatus) {
                        case 'ON':
                            busService.sendBusData(1, 1);
                            break;
                        case 'OFF':
                            busService.sendBusData(1, 2);
                            break;
                        default:
                            busService.sendBusData(1, 1);
                    }
                };

            }])
        .controller('CamsController', ['$scope', function($scope) {

            }]);
