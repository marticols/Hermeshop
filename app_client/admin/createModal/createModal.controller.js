(function(){
  angular
          .module('adminApp')
          .controller('createModalCtrl', createModalCtrl);
  createModalCtrl.$inject = ['$uibModalInstance', 'adminData'];
  function createModalCtrl ($uibModalInstance, adminData){
    var vm = this;
    vm.modal = {
      cancel : function (){
        $uibModalInstance.dismiss('cancel');
      },
      close : function (result){
        $uibModalInstance.close(result);
      }
    };
    vm.onSubmit = function(){
      vm.formError = "";
      if(!vm.formData.title || !vm.formData.category || !vm.formData.price || !vm.formData.img || !vm.formData.description ){
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddProduct = function(formData){
          adminData.addProduct({
            title : formData.title,
            banner : formData.banner,
            category : formData.category,
            description : formData.description,
            price : formData.price,
            img : formData.img
          })
            .success(function(data){
              vm.modal.close(data);
            })
            .error(function(data){
              vm.formError = "Your product has not been saved, try agian";
            });
          return false;
        };
        vm.doAddProduct(vm.formData);
      }
    };
  }
})();
