(function () {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('ModelPhotosController', ModelPhotosController);

    ModelPhotosController.$inject = ['DataUtils', 'Model', 'entity'];

    function ModelPhotosController(DataUtils, Photo) {

        var vm = this;

        vm.photos = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll(vm.id);

        function loadAll(id) {
            if (id) {
                Model.getPhotos(function (photos) {
                    vm.photos = photos;
                });
            }
        }
    }
})();
