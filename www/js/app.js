// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic-toast'])

.run(function($ionicPlatform, $rootScope) {
//Cria um objeto no scopo principal para conhecer a plataforma do app
$rootScope.platform = {
  ios: ionic.Platform.isIOS(),
  android: ionic.Platform.isAndroid()
}

$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  cordova.plugins.Keyboard.disableScroll(true);

}
if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.pesquisar', {
    url: '/pesquisar',
    views: {
      'tab-pesquisar': {
        templateUrl: 'templates/tab-pesquisar.html',
        controller: 'PesquisarCtrl'
      }
    }
  })
  .state('tab.pesquisar-detalhe', {
    url: '/pesquisar/:imdbID',
    views: {
      'tab-pesquisar': {
        templateUrl: 'templates/filme-detalhe.html',
        controller: 'FilmesDetalheCtrl'
      }
    }
  })
  .state('tab.filmes', {
    url: '/filmes',
    views: {
      'tab-filmes': {
        templateUrl: 'templates/tab-filmes.html',
        controller: 'FilmesCtrl'
      }
    }
  })
  .state('tab.filmes-detalhe', {
    url: '/filmes/:imdbID',
    views: {
      'tab-filmes': {
        templateUrl: 'templates/filme-detalhe.html',
        controller: 'FilmesDetalheCtrl'
      }
    }
  });

  //set initial view
  $urlRouterProvider.otherwise('/tab/pesquisar');

})

//Diretiva para quando der erro (404) no ng-src, carregar uma imagem default.
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
;
