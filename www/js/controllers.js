angular.module('starter.controllers', [])

.controller('PesquisarCtrl', function($scope, IMDBService) {
	$scope.form = {titulo: '', mensagem: 'Nenhum filme encontrado.'};
	
	$scope.filmes = [];
	$scope.page = 1;
	$scope.totalResults = 0;


    $scope.pesquisarFilmes = function() {
        console.log("titulo:",$scope.form.titulo);

        IMDBService.searchByTitle($scope.form.titulo, $scope.page).then(function(result) {
          debugger;
          	if(result.Response === "True"){
          		$scope.filmes = result.Search;
          		$scope.totalResults = result.totalResults;
        	}
        	else
        	{
        		//$scope.form.mensagem = "Nenhum filme encontrado."
        		$scope.filmes = [];
          		$scope.totalResults = 0;
        	}

        });

    };

   

})

.controller('FilmesCtrl', function($scope) {

})

.controller('FilmesDetalheCtrl', function($scope, $stateParams, IMDBService) {

 	$scope.filme = {};

    var filmeId = Number($stateParams.filmeId);

    IMDBService.searchById(filmeId).then(function(result) {
      $scope.filme = result;
    });

   

});
