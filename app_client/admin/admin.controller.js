(function(){
  angular
        .module('adminApp')
        .controller('adminCtrl', adminCtrl);
  adminCtrl.$inject = ['adminData', '$uibModal', 'authentication'];
  function adminCtrl (adminData, $uibModal, authentication) {
    var vm = this;
    adminData.listproducts()
      .success(function (data){
        vm.data = { products : data };
      })
      .error( function (e){
        console.log(e);
      });
    vm.isLoggedIn = authentication.isLoggedIn();
    // CREATE PRODUCT
    vm.popupCreate = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'createModal/createModal.view.html',
        controller: 'createModalCtrl as vm'
      });
      modalInstance.result.then(function (data){
        vm.data.products.push(data);
      });
    };
    // UPDATE PRODUCT
    vm.popupUpdate = function(product){
      var modalInstance = $uibModal.open({
        templateUrl: 'updateModal/updateModal.view.html',
        controller: 'updateModalCtrl as vm',
        resolve : {
          productData : function(){
            return {
              product : product
            };
          }
        }
      });
      modalInstance.result.then(function (data){
        product.title = data.title ;
        product.category = data.category ;
        product.url = data.url ;
        product.categoryurl = data.categoryurl ;
        product.price = data.price ;
        product.description = data.description ;
        product.img = data.img;
        product.banner = data.banner;
      });
    };
    // DELETE PRODUCT
    vm.popupDelete = function(url, categoryurl, title, product){
      var modalInstance = $uibModal.open({
        templateUrl: 'deleteModal/deleteModal.view.html',
        controller: 'deleteModalCtrl as vm',
        resolve : {
          productData : function(){
            return {
              url : url,
              categoryurl : categoryurl,
              title : title
            };
          }
        }
      });
      modalInstance.result.then(function (data){
        product.title = false;
      });
    };
  }
}) ();
