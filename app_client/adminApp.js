(function(){
  angular.module('adminApp', ['ngRoute', 'ui.bootstrap']);
  function config ($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/admin/admin.view.html',
        controller: 'adminCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
        .module('adminApp')
        .config(['$routeProvider', config]);
})();
