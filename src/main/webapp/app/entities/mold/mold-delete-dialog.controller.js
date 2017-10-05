(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .controller('MoldDeleteController',MoldDeleteController);

    MoldDeleteController.$inject = ['$uibModalInstance', 'entity', 'Mold'];

    function MoldDeleteController($uibModalInstance, entity, Mold) {
        var vm = this;

        vm.mold = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Mold.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
