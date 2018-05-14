(function () {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('ModelDetailController', ModelDetailController);

    ModelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Model', 'Photo', 'Mold', 'DataUtils'];

    function ModelDetailController($scope, $rootScope, $stateParams, previousState, entity, Model, Photo, Mold, DataUtils) {
        var vm = this;

        vm.model = entity;
        vm.previousState = previousState.name;
        vm.openFile = DataUtils.openFile;
        vm.currentPhoto;    //The current photo to show

        var index = 0;

        loadAll(entity.id);


        function setCurrentPhoto() {
            if (vm.photos.length) {
                vm.currentPhoto = vm.photos[0];
            }
        }

        function loadAll(id) {
            if (id) {
                Model.getPhotos({ id: entity.id }, function (photos) {
                    vm.photos = photos;
                    setCurrentPhoto();
                });
            }
        }

        var unsubscribe = $rootScope.$on('workshopSilverApp:modelUpdate', function (event, result) {
            vm.model = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.nextPhoto = function () {
            if (vm.photos) {
                if (index < vm.photos.length - 1) {
                    index++;
                } else {
                    index = 0;
                }
                vm.currentPhoto = vm.photos[index];
            }
        }

        vm.previousPhoto = function () {
            if (vm.photos) {
                if (index > 0) {
                    index--;
                } else {
                    index = vm.photos.length - 1;
                }
                vm.currentPhoto = vm.photos[index];
            }
        }

    }
})();
