angular.module('starter.controllers', [])

.controller('PesquisarCtrl', function($scope) {


})

.controller('FilmesCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('FilmesDetalheCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  
});
