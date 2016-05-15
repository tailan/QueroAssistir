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

  $scope.carregarImagem = function(filme)
  {
    if(filme.Poster === "N/A")
      return "img/img-nao-disp.jpg";
    else
      return filme.Poster;
  };

  $scope.adicionar = function(filme){
    //Cria uma propriedade para controlar se o filme ja foi visto ou não
    filme.assistido = false;    
    LocalStorageFilmes.adicionarFilme(filme);
    ionicToast.show('Filme adicionado...', 'bottom', false, 2500);
  };

  $scope.jaAdicionado = function(filme){
    return LocalStorageFilmes.verificarFilmeExistente(filme.imdbID);
  };
})

.controller('FilmesCtrl', function($scope , LocalStorageFilmes, ionicToast) {

  $scope.filmes = LocalStorageFilmes.buscarFilmes();

  $scope.remover = function(index)
  {
    $scope.filmes = LocalStorageFilmes.removerFilme(index);
    ionicToast.show('Filme removido...', 'bottom', false, 2500);
  }


})


.controller('FilmesDetalheCtrl', function($scope, $stateParams,$ionicLoading, IMDBService) {

  $scope.showLoader = function() {
    $ionicLoading.show({template: 'carregando...'});
  };

  $scope.hideLoader = function() {
    $ionicLoading.hide();
  };    

  $scope.filme = {};
  
  $scope.showLoader();
  IMDBService.searchById($stateParams.imdbID).then(function(result) {
    $scope.filme = result;
    $scope.hideLoader();
  });});
