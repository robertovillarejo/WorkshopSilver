'use strict';

describe('Controller Tests', function() {

    describe('Model Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockModel, MockPhoto, MockMold;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockModel = jasmine.createSpy('MockModel');
            MockPhoto = jasmine.createSpy('MockPhoto');
            MockMold = jasmine.createSpy('MockMold');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Model': MockModel,
                'Photo': MockPhoto,
                'Mold': MockMold
            };
            createController = function() {
                $injector.get('$controller')("ModelDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'workshopSilverApp:modelUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
