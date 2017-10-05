(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('PhotoDetailController', PhotoDetailController);

    PhotoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Photo', 'Model'];

    function PhotoDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Photo, Model) {
        var vm = this;

        vm.photo = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('workshopSilverApp:photoUpdate', function(event, result) {
            vm.photo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
