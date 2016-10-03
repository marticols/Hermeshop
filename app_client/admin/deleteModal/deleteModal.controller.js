(function(){
  angular
          .module('adminApp')
          .controller('deleteModalCtrl', deleteModalCtrl);
  deleteModalCtrl.$inject = ['$uibModalInstance', 'productData', 'adminData'];
  function deleteModalCtrl ($uibModalInstance, productData, adminData){
    var vm = this;
    vm.productData = productData;
    vm.modal = {
      cancel : function (){
        $uibModalInstance.dismiss('cancel');
      },
      close : function (result){
        $uibModalInstance.close(result);
      }
    };
    vm.onSubmit = function(){
      vm.deleteProduct = function (categoryurl, url){
        adminData.deleteProduct(categoryurl, url)
                .success(function(data){
                  vm.modal.close(data);
                })
                .error(function(e){
                  console.log(e);
                });
        return false;
      };
      vm.deleteProduct(vm.productData.categoryurl, vm.productData.url);
    };
  }
})();
