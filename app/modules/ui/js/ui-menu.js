'use strict';

var directives = angular.module('ui.menu', []);


/**
 * Directive animates showing sub-options when mouse is over an element.
 */
directives.directive('animateOptions', function () {
    return {
        restrict: 'A',
        link: function ($scope, elm, attrs) {
            elm.mouseenter(function () {
                elm.stop(true, true).animate({
                    left: '0px',
                    opacity: '1',
                    top: '0px'
                }, 500);
            });
            elm.mouseleave(function () {
                elm.stop(true, true).animate({
                    left: '0px',
                    opacity: '0',
                    top: '0px'
                }, 500);
            });
        }
    }
});