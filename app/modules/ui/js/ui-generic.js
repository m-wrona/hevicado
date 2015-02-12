'use strict';

angular.module('ui.generic', []);

/**
 * Back to top option
 */
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn(500);
        } else {
            $('.back-to-top').fadeOut(500);
        }
    });

    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });
});

/**
 * Filter normalizes string to lower case
 */
angular.module('ui.generic').
    filter('toLowerCase', function () {
        return function (text) {
            return text !== null ? text.toLowerCase() : '';
        };
    });

