'use strict'

var collections = angular.module('chronos.collections', []);

/**
 * Multi-map of events with day->[event1, event2,...] map entries.
 */
collections.service('EventsMap', function ($log) {

    var dayEvents = [];

    /**
     * Add event
     * @param key day key where event should be stored
     * @param event element to be added
     */
    var addEntry = function (key, event) {
        var events = dayEvents[key];
        if (events == null) {
            events = [];
            dayEvents.push(key);
            dayEvents[key] = events;
        }
        events.push(event);
    };

    return {

        /**
         * Function creates day key for given date
         * @param date for which key should be created
         * @returns {Date} time window key
         */
        dayKey: function (date) {
            return date.clone().clearTime();
        },

        /**
         * Get all events in given day
         * @param day day key
         * @returns {*} array of events
         */
        events: function (day) {
            return this.contains(day) ? dayEvents[day] : [];
        },

        /**
         * Check whether given key is present in this collection
         * @param day day key
         * @returns {boolean} true is key exists, false otherwise
         */
        contains: function (day) {
            return dayEvents[day] != null;
        },

        /**
         * Get number of keys
         * @returns {Number} of days
         */
        size: function () {
            return dayEvents.length;
        },

        /**
         * Go through all day keys
         * @param callback
         * @param thisObject
         * @see Array#forEach
         */
        forEachDay: function (callback, thisObject) {
            dayEvents.forEach(callback, thisObject);
        },

        /**
         * Add events
         * @param events elements to be added
         */
        addAll: function (events) {
            for (var i = 0; i < events.length; i++) {
                this.add(events[i]);
            }
        },

        /**
         * Add event
         * @param event element to be added
         * @returns {*} day keys where given event has been stored
         */
        add: function (event) {
            var days = [];
            var currentDay = this.dayKey(event.start);
            var endKey = this.dayKey(event.end).add(1).days();
            do {
                addEntry(currentDay.clone(), event);
                days.push(currentDay.clone());
                currentDay = currentDay.add(1).days();
            } while (currentDay.isBefore(endKey));
            return days;
        }
    };

})
;

