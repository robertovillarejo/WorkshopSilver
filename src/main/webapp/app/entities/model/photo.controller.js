(function () {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('ModelPhotosController', ModelPhotosController);

    ModelPhotosController.$inject = ['DataUtils', 'Model', 'entity', 'Photo', 'Lightbox', '$scope'];

    function ModelPhotosController(DataUtils, Model, entity, Photo, Lightbox, $scope) {

        var vm = this;

        vm.model = entity;
        vm.photos = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll(entity.id);

        function loadAll(id) {
            if (id) {
                Model.getPhotos({id: entity.id}, function (photos) {
                    vm.photos = photos;
                });
            }
        }
    }
})();
