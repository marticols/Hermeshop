(function(){
  angular
        .module('adminApp')
        .controller('navadminCtrl', navadminCtrl);
  navadminCtrl.$inject = ['$location', 'authentication'];
  function navadminCtrl ($location, authentication) {
    var navvm = this;
    navvm.currentPath = $location.path();
    navvm.isLoggedIn = authentication.isLoggedIn();
    navvm.currentUser = authentication.currentUser();
    navvm.logout = function(){
      authentication.logout();
      $location.path('./');
    };
  }
})();
