(function() {
    'use strict';

    angular
        .module('workshopSilverApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('mold', {
            parent: 'entity',
            url: '/mold?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'workshopSilverApp.mold.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/mold/molds.html',
                    controller: 'MoldController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('mold');
                    $translatePartialLoader.addPart('sizeModel');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('mold-detail', {
            parent: 'mold',
            url: '/mold/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'workshopSilverApp.mold.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/mold/mold-detail.html',
                    controller: 'MoldDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('mold');
                    $translatePartialLoader.addPart('sizeModel');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Mold', function($stateParams, Mold) {
                    return Mold.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'mold',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('mold-detail.edit', {
            parent: 'mold-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/mold/mold-dialog.html',
                    controller: 'MoldDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Mold', function(Mold) {
                            return Mold.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('mold.new', {
            parent: 'mold',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/mold/mold-dialog.html',
                    controller: 'MoldDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                number: null,
                                size: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('mold', null, { reload: 'mold' });
                }, function() {
                    $state.go('mold');
                });
            }]
        })
        .state('mold.edit', {
            parent: 'mold',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/mold/mold-dialog.html',
                    controller: 'MoldDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Mold', function(Mold) {
                            return Mold.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('mold', null, { reload: 'mold' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('mold.delete', {
            parent: 'mold',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/mold/mold-delete-dialog.html',
                    controller: 'MoldDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Mold', function(Mold) {
                            return Mold.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('mold', null, { reload: 'mold' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
