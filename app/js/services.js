'use strict';

var services = angular.module('angular-base.services', []);

//TODO move to config
services.constant('HTTP_CONFIG', {
    server: 'http://localhost:8080'
});

/**
 * Interceptor redirects HTTP requests to back-end if needed
 * @param HTTP_CONFIG communication settings
 */
services.factory('HttpInterceptor', function (HTTP_CONFIG) {

    /**
     * Check whether request should be redirected
     * @param type type of request method
     * @param url requested resource
     * @returns {boolean} true if redirection should be made, false otherwise
     */
    var shouldRedirect = function (type, url) {
        if (type == 'GET') {
            //check type of requested resource
            var blackList = ['.html', '.css', '.js'];
            for (var i = 0; i < blackList.length; i++) {
                if (url.indexOf(blackList[i]) == (url.length - blackList[i].length)) {
                    return false;
                }
            }
        }
        return true;
    };

    return {
        /**
         * Handle out-going request
         * @param config HTTP configuration
         * @returns {*} the same HTTP configuration
         */
        request: function (config) {
            if (shouldRedirect(config.method, config.url)) {
                //redirect to back-end
                config.url = HTTP_CONFIG.server + config.url;
            }
            return config;
        }
    };
});


