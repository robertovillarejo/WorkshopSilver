(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('ModelDialogController', ModelDialogController);

    ModelDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Model', 'Photo', 'Mold'];

    function ModelDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Model, Photo, Mold) {
        var vm = this;

        vm.model = entity;
        vm.clear = clear;
        vm.save = save;
        vm.photos = Photo.query();
        vm.molds = Mold.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.model.id !== null) {
                Model.update(vm.model, onSaveSuccess, onSaveError);
            } else {
                Model.save(vm.model, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('workshopSilverApp:modelUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
