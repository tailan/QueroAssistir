angular.module('starter.controllers', [])

.controller('PesquisarCtrl', function($scope, $ionicLoading, IMDBService, LocalStorageFilmes, ionicToast) {
	
  $scope.form = {titulo: '', mensagem: 'Nenhum filme encontrado.'};	
	$scope.filmes = [];
	$scope.page = 1;
	$scope.totalResults = 0;

  $scope.showLoader = function() {
    $ionicLoading.show({template: 'carregando...'});
  };

  $scope.hideLoader = function() {
    $ionicLoading.hide();
  };    

  $scope.pesquisarFilmes = function() {

    $scope.showLoader();

    IMDBService.searchByTitle($scope.form.titulo, $scope.page).then(function(result) {

      $scope.hideLoader();
      if(result.Response === "True"){
        $scope.filmes = result.Search;
        $scope.totalResults = result.totalResults;
      }
      else
      {        
        ionicToast.show('Nenhum filme encontrato.', 'bottom', false, 2500);
        $scope.totalResults = 0;
      }

    }); 
  };

  $scope.adicionar = function(filme){
    LocalStorageFilmes.adicionarFilme(filme);
  };

  $scope.jaAdicionado = function(filme){
    debugger;
    return LocalStorageFilmes.verificarFilmeExistente(filme.imdbID);
  };
})

.controller('FilmesCtrl', function($scope) {

})
.controller('FilmesDetalheCtrl', function($scope, $stateParams, IMDBService) {

  $scope.filme = {};

  var filmeId = Number($stateParams.filmeId);

  IMDBService.searchById(filmeId).then(function(result) {
    $scope.filme = result;
  });});
