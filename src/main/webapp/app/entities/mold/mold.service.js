(function() {
    'use strict';
    angular
        .module('workshopSilverApp')
        .factory('Mold', Mold);

    Mold.$inject = ['$resource'];

    function Mold ($resource) {
        var resourceUrl =  'api/molds/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
