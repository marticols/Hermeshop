(function(){
  angular
          .module('adminApp')
          .controller('updateModalCtrl', updateModalCtrl);
  updateModalCtrl.$inject = ['$uibModalInstance', 'adminData', 'productData'];
  function updateModalCtrl ($uibModalInstance, adminData, productData){
    vm = this;
    vm.productData = productData.product;
    vm.productData.img = String(productData.product.img).replace(',',', ');
    vm.modal = {
      cancel : function (){
        $uibModalInstance.dismiss('cancel');
      },
      close : function (result){
        $uibModalInstance.close(result);
        console.log(result);
      }
    };
    vm.onSubmit = function(){
      vm.formError = "";
      if(!vm.formData.title || !vm.formData.banner || !vm.formData.category || !vm.formData.price || !vm.formData.img || !vm.formData.description ){
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doUpdateProduct = function(formData){
          adminData.updateProduct(vm.productData.categoryurl, vm.productData.url, {
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
        vm.doUpdateProduct(vm.formData);
      }
    };
  }
})();
