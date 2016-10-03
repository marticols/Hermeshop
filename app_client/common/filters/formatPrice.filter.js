(function(){
  angular
        .module('adminApp')
        .filter('formatPrice', formatPrice);
  function formatPrice (){
    return function (price) {
      return String(price).replace('.',',');
    };
  }
})();
