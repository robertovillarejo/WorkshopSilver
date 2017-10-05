(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('MoldDialogController', MoldDialogController);

    MoldDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Mold', 'Model'];

    function MoldDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Mold, Model) {
        var vm = this;

        vm.mold = entity;
        vm.clear = clear;
        vm.save = save;
        vm.models = Model.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.mold.id !== null) {
                Mold.update(vm.mold, onSaveSuccess, onSaveError);
            } else {
                Mold.save(vm.mold, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('workshopSilverApp:moldUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
