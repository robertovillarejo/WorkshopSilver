(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('PhotoController', PhotoController);

    PhotoController.$inject = ['DataUtils', 'Photo'];

    function PhotoController(DataUtils, Photo) {

        var vm = this;

        vm.photos = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Photo.query(function(result) {
                vm.photos = result;
                vm.searchQuery = null;
            });
        }
    }
})();
