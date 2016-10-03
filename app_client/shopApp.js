// DATA
function shopData ($http) {
  var listProducts = function(){
    return $http.get('/api/shop');
  };
  var listCtg = function(){
    return $http.get('/api/shop/listctg/');
  };
  return {
    listProducts : listProducts,
    listCtg : listCtg
  };
}
// FILTERS
function formatPrice (){
  return function (price) {
    String(price).replace('.',',');
  };
}
function formatCategory (){
  return function (category){

    function normalize(texto) {
    texto = texto.replace(/[áàäâ]/g, "a");
    texto = texto.replace(/[éèëê]/g, "e");
    texto = texto.replace(/[íìïî]/g, "i");
    texto = texto.replace(/[óòôö]/g, "o");
    texto = texto.replace(/[úùüü]/g, "u");
    texto = texto.replace(/[ñ]/g, "n");
    return texto;
    }
    return normalize(category.replace(/ /g, '_'));
  };
}
//DIRECTIVES
function imgbanner (){
  return {
    scope : {
      banner : '=banner'
    },
    templateUrl : '/common/directives/imgbanner/imgbanner.template.html'
  };
}
// CONTROLLERS
var listProducts = function($scope, shopData){
  shopData.listProducts()
          .success(function(data){
            $scope.data = {products : data, price : data[0].price };
          })
          .error(function(err){
            console.log(err);
          });
};
var listCategories = function($scope, shopData){
    shopData.listCtg()
           .success(function(data){
             $scope.data = {categories: data};
           })
           .error(function(err){
             console.log(err);
           });
};

angular
      .module('shopApp', [])
      .controller('listProducts', listProducts)
      .controller('listCategories', listCategories)
      .service('shopData', shopData)
      .filter('formatPrice', formatPrice)
      .filter('formatCategory', formatCategory)
      .directive('imgbanner', imgbanner);
