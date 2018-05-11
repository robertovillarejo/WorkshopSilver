(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('MoldDetailController', MoldDetailController);

    MoldDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Mold', 'Model'];

    function MoldDetailController($scope, $rootScope, $stateParams, previousState, entity, Mold, Model) {
        var vm = this;

        vm.mold = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('workshopSilverApp:moldUpdate', function(event, result) {
            vm.mold = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
