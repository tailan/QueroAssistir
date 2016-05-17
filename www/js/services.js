angular.module('starter.services', [])

.factory('IMDBService', function($http) {

  return {
    searchById: function(imdbID) {

      var url = 'http://www.omdbapi.com/?i=' + imdbID;

      console.log("searchById", url);
      return $http.get(url)
      .then(function(result) {
        console.log(result);

          //TODO: Validar {"Response":"False","Error":"Incorrect IMDb ID."}

          return result.data;
        });
    },

    searchByTitle: function(title, page) {

      var url = 'http://www.omdbapi.com/?s=' + title + '&page=' + page + '&type=movie';
      
      console.log("searchByTitle", url);

      return $http.get(url)
      .then(function(result) {

        console.log(result);

        return result.data;
      });
    }

  };
})

.factory('LocalStorageFilmes', function(){

  var filmes = angular.fromJson(localStorage.getItem("quero-assistir-itens")) || [];

  function filmeExistente(imdbID)
  {
    var match = false;
    filmes.forEach(function(filme) {
      if(filme.imdbID == imdbID)
        match = true;
    });
    return match;
  }
  return {
    buscarFilmes: function(){ 
      return filmes; 
    },
    
    adicionarFilme: function(filme){ 
      if(filmeExistente(filme.imdbID))
        return;

      filmes.push(filme);
      localStorage.setItem("quero-assistir-itens", angular.toJson(filmes));
    },

    removerFilme: function(index){
      filmes.splice(index,1);
      localStorage.setItem("quero-assistir-itens", angular.toJson(filmes));
      return filmes;
      
    },

    verificarFilmeExistente: function(imdbID){
      return filmeExistente(imdbID);
    },

    assistirFilme: function(index){
      filmes[index].assistido = true;
      localStorage.setItem("quero-assistir-itens", angular.toJson(filmes));
      return filmes;
    }

  };
});


