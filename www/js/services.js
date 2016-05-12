angular.module('starter.services', [])

.factory('IMDBService', function($http) {
  

  return {
    searchById: function(imdbId) {
      
      var url = 'http://www.omdbapi.com/?i=' + imdbId;

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

          //TODO: Validar {"Response":"False","Error":"Movie not found!"}

          return result.data;
        });
    }
   
  };
});
