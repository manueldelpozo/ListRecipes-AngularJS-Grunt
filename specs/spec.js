'use strict';

describe('Controller: public/StoreController', function() {

    var $scope, $http, $window, $controller;

    beforeEach(module('recipeStore'));

    beforeEach(inject(function(_$scope_, _$controller_){
        $scope = _$scope_;
        $controller = _$controller_;

        $controller('StoreController', {'$scope': $scope, '$http': $http, '$window': $window});
    }));

    it('is a test', function(){
       expect(myGlobal).toBe(10);
       // Reset the value to show that beforeEach is executed for each it function
       myGlobal = 20;
       expect(myGlobal).toBe(20);
    });

    it('should take data from json file.', function() {
        expect($http.get('recipes.json') == true);
    });
    it('should take value 0.', function() {
        expect($scope.width.toBe(0));
    });

    it('should set to window Width.', function() {
        expect($scope.width.toBe($window.innerWidth));
    });

});