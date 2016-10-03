(function(){
  angular
        .module('adminApp')
        .controller('registerCtrl', registerCtrl);
  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl ($location, authentication){
    var vm = this;
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    vm.returnPage = $location.search().page || '/';
    vm.onSubmit = function (){
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password ){
        vm.formError = {"message" : "All fields required, please try again"};
        return false;
      } else {
        vm.formError = "";
        authentication
                .register(vm.credentials)
                .error(function(err){
                  vm.formError.message = err;
                })
                .then(function(){
                  $location.search('page', null);
                  $location.path(vm.returnPage);
                });
      }
    };
  }
})();
