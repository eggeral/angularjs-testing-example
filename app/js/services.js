'use strict';

/* Services */

angular.module('myApp.services', []).
        value('version', '0.1').
        service('busService', function($http, $rootScope, $interval,$log) {
            var ipAddress = '192.168.1.250';

            $interval(function() {
                var io = 1; //just poll io 1 to make things simpler
                var dataString = "GET" + io;
                $http({method: "POST", url: "http://" + ipAddress + "/io.xml", data: dataString, timeout: 1500}).success(function(data, status, headers, config)
                {
                    var value = getValueFrom(data);
                    $rootScope.$broadcast('GET' + io, value);
                    //value 0 is off
                    //value 1 is on
                }).error(function(data, status, headers, config)
                {
                    $log.warn("Error polling " + ipAddress + " " + status + " " + data);
                });
            }, 1000);

            return {
                sendBusData: function(io, command) {
                    //command values:
                    // 1 = TURN OFF
                    // 2 = TURN ON
                    var dataString = "SET" + io + "=" + command;

                    $http({method: "POST", url: "http://" + ipAddress + "/io.xml", data: dataString, timeout: 1500}).success(function(data, status, headers, config)
                    {
                        //Any idea what to do here beside beeing lucky!?
                    }).error(function(data, status, headers, config)
                    {
                        $log.warn("Error sending data to " + ipAddress + " " + status + " " + data)
                    });

                }
            };
        });


function getValueFrom(dataString) {
    var cleanedDataString = dataString.replace("<response>", "");
    cleanedDataString = cleanedDataString.replace('<?xml version="1.0" encoding="Windows-1252"?>', "");
    cleanedDataString = cleanedDataString.replace("<HTTPResult>", "");
    cleanedDataString = cleanedDataString.replace("</response>", "");
    cleanedDataString = cleanedDataString.replace("</HTTPResult>", "");
    cleanedDataString = cleanedDataString.replace(/\r\n/g, "");
    cleanedDataString = cleanedDataString.replace(/ /g, "");
    cleanedDataString = cleanedDataString.replace(/FROM.*V=/, "");
    cleanedDataString = cleanedDataString.replace(/,.*/, "");
    return cleanedDataString;
}