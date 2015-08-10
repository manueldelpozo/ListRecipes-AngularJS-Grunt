(function() {
  'use strict';
  
  var app = angular.module('recipeStore', []);

  app.controller('StoreController', function( $scope, $http, $window ) {
    $http.get('recipes.json')
         .then( function(res) {
            $scope.recipes = res.data;                
          });
    //Responsive
    $scope.width = 0;
    $scope.updateWidth = function() {
        $scope.width = $window.innerWidth;
    }
    $scope.changeImage = function() {
      
        if ($scope.width < 768) {
            return $scope.urlimage = "recipe.thumb";
        } 
    }    
    $scope.changeImage();
    $window.onresize = function () {
        $scope.updateWidth();
        $scope.changeImage();
        $scope.$apply();
    }
  });

  //app.controller('FormatTimeController', function(){
    //this.time = this.time.replace( /^\D+/g, '');
  //});

  app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

  app.controller('FavController', function($scope){
    $scope.isDisable = false;
    $scope.flag = 0;
    $scope.disableClick = function(n) {
        if (n && n !== $scope.flag) {
            $scope.flag = n;
            $scope.fav = $scope.fav + 1;
            $scope.favStyle = {'background-color':'yellow'}
            $scope.isDisable = true;
            console.log($scope);
        }
        return false;
    }
  });


  app.controller('VotingController', function( $scope ) {
    $scope.isVoted = false;
    $scope.voting = function( vote ) {
      if (!$scope.isVoted) {
        //remake average
        $scope.rating = Math.round( ( ( $scope.ratings * $scope.rating + vote) / ($scope.ratings+1) )* 100) / 100;
        $scope.ratings++;
        $scope.isVoted = true;
      } else {
        alert("Please only one vote per recipe");
        return false;
      }
    };
   
  });
 
  
})();
