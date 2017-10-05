(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('ModelDetailController', ModelDetailController);

    ModelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Model', 'Photo', 'Mold'];

    function ModelDetailController($scope, $rootScope, $stateParams, previousState, entity, Model, Photo, Mold) {
        var vm = this;

        vm.model = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('workshopSilverApp:modelUpdate', function(event, result) {
            vm.model = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
