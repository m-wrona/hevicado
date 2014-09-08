'use strict';

var mockUsers = angular.module('mock-users', []);

mockUsers.run(function ($httpBackend, Session, $log) {

    var currentUser = {
        token: 'token-123',
        id: 1,
        userRole: 'admin',
        firstName: 'Michal',
        lastName: 'Wronski'
    };

    //auto-login
    Session.create(currentUser);

    $httpBackend.whenPOST(/users\/login/).respond(200, currentUser);

});