(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('PhotoDialogController', PhotoDialogController);

    PhotoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Photo'];

    function PhotoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Photo) {
        var vm = this;

        vm.photo = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.photo.id !== null) {
                Photo.update(vm.photo, onSaveSuccess, onSaveError);
            } else {
                Photo.save(vm.photo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('workshopSilverApp:photoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setPhoto = function ($file, photo) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        photo.photo = base64Data;
                        photo.photoContentType = $file.type;
                    });
                });
            }
        };

    }
})();
