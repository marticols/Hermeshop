(function(){
  angular
        .module('adminApp')
        .directive('navadmin', navadmin);
  function navadmin (){
    return {
      restrict : 'EA',
      templateUrl : '/common/directives/navadmin/navadmin.template.html',
      controller: 'navadminCtrl as navvm'
    };
  }
})();
