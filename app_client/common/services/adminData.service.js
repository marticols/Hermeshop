(function(){
  angular
        .module('adminApp')
        .service('adminData', adminData);
  adminData.$inject = ['$http', 'authentication'];
  function adminData ($http, authentication){
    var listproducts = function () {
      return $http.get('/api/shop/');
    };
    var addProduct = function (data){
      return $http.post('/api/shop/', data, {
        headers : { Authorization: 'Bearer ' + authentication.getToken() }
      });
    };
    var updateProduct = function(productctg, producturl, data){
      return $http.put('/api/shop/' + productctg + '/' + producturl, data, {
        headers : { Authorization: 'Bearer ' + authentication.getToken() }
      });
    };
    var deleteProduct = function (productctg, producturl){
      return $http.delete('/api/shop/' + productctg + '/' + producturl, {
        headers : { Authorization: 'Bearer ' + authentication.getToken() }
      });
    };
    return {
      listproducts : listproducts,
      addProduct : addProduct,
      deleteProduct : deleteProduct,
      updateProduct : updateProduct
    };
  }
}) ();
