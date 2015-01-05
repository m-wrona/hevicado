'use strict';

describe('commons.users.directives-spec:', function () {

    var $rootScope, $scope, $compile;
    var mockSession, mockAuthEvents;

    //prepare module for testing
    beforeEach(angular.mock.module('commons.users.directives'));

    beforeEach(angular.mock.module(function ($provide) {
        //mock dependencies
        mockSession = jasmine.createSpyObj('Session', ['getProfile']);
        mockSession.getProfile.andReturn(
            {
                theme: 'blue'
            }
        );
        $provide.value('Session', mockSession);
        mockAuthEvents = {
            SESSION_REFRESH: 'mock-session-refresh',
            USER_LOGGED_IN: 'mock-logged-in',
            USER_LOGGED_OUT: 'mock-logged-out'
        };
        $provide.value('AUTH_EVENTS', mockAuthEvents);
    }));

    beforeEach(inject(function ($injector, _$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile = _$compile_;
    }));

    describe('userTheme-spec:', function () {

        it('should set theme color', function () {
            //given current scope is active
            expect($scope).toBeDefined();
            //when displaying element with user theme
            var element = angular.element(
                '<button user-theme>' +
                'Text' +
                '</button>'
            );
            var compiled = $compile(element)($scope);
            //then element has proper style set
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope blue">Text</button>');
        });

        it('should change theme when user logs in', function () {
            //given current scope is active
            expect($scope).toBeDefined();
            //and element with user theme
            var element = angular.element(
                '<button user-theme>' +
                'Text' +
                '</button>'
            );
            var compiled = $compile(element)($scope);
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope blue">Text</button>');
            //when user logs in
            mockSession.getProfile.andReturn(
                {
                    theme: 'orange'
                }
            );
            $rootScope.$broadcast(mockAuthEvents.USER_LOGGED_IN);
            //then theme is changed
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope orange">Text</button>');
        });

        it('should change theme when user logs out', function () {
            //given current scope is active
            expect($scope).toBeDefined();
            //and element with user theme
            var element = angular.element(
                '<button user-theme>' +
                'Text' +
                '</button>'
            );
            var compiled = $compile(element)($scope);
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope blue">Text</button>');
            //when user logs out
            mockSession.getProfile.andReturn(
                {
                    theme: 'orange'
                }
            );
            $rootScope.$broadcast(mockAuthEvents.USER_LOGGED_OUT);
            //then theme is changed
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope orange">Text</button>');
        });

        it('should change theme when user\'s session is refreshed', function () {
            //given current scope is active
            expect($scope).toBeDefined();
            //and element with user theme
            var element = angular.element(
                '<button user-theme>' +
                'Text' +
                '</button>'
            );
            var compiled = $compile(element)($scope);
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope blue">Text</button>');
            //when session has changed
            mockSession.getProfile.andReturn(
                {
                    theme: 'orange'
                }
            );
            $rootScope.$broadcast(mockAuthEvents.SESSION_REFRESH);
            //then theme is changed
            expect(compiled[0].outerHTML).toBe('<button user-theme="" class="ng-scope orange">Text</button>');
        });

    });

});