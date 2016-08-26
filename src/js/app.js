
var app = angular.module("cartApp", []);

(function () {
    'use strict';

    var app= angular.module('cartApp');
    app.controller('MainController', ['$scope',  '$http',  function ($scope,  $http ){
		
    	$scope.Settings = {

    	}

    	$scope.Products = {
    		items: [],
			loadItems: function(){
				$http.get("data/dataModel.json")
					.then(function (response) {
						$scope.Products.items = response.data;
						console.log($scope.Products.items);
						//add Products to Cart.items 
						$scope.Products.sendToCart();
					})
	    	},
	    	sendToCart: function(){
				$scope.Products.items.forEach(function(product){
					$scope.Cart.items.forEach(function(item){
						if(product.productNumber==item.productNumber){
							item.product = product;
						}
					})
				})
	    	}
	    }

		$scope.Cart = {
			itemsTest:[
		
			],
			items:[
				{productNumber: 411,
				 amount:2},
				{productNumber: 132,
				 amount:4},
				{productNumber: 567,
				 amount:2},
				{productNumber: 578,
				 amount:1},
				{productNumber: 243,
				 amount:8},
			],


			View:{
				open: true
			},
			Events: {
				changeInput: function(item){
					$scope.Cart.Validation.itemNumberInput(item);					
				}
			},
			Validation: {
				itemNumberInput: function(item){
					if(item.amount<0)item.amount = 0;
					if(!Number.isInteger(item.amount))item.amount = 0;
					if(item.amount=="")item.amount = "";
				}
			},
			removeItem: function(item){
				$scope.Cart.items.forEach(function(el, i){
					if(el.productNumber==item.productNumber)
						$scope.Cart.items.splice(i,1);
				})
			},
			total: function(){
				var result = 0;
				$scope.Cart.items.forEach(function(el, i){
					if(typeof el.product!='undefined'){						
						if(el.product.productAvailable) result = result + el.amount*el.product.price;
					}				
				})

				return result.toLocaleString('en-US', {minimumFractionDigits: 2});
			},
			totalItems: function(){
				var result = 0;
				$scope.Cart.items.forEach(function(el, i){
					var addAmount;
					Number.isInteger(parseInt(el.amount))?addAmount=parseInt(el.amount):addAmount=0;
					result = result + addAmount;
				})
				return result;
			},
			totalUnavaliable: function(){	
				var result=0;
				$scope.Cart.items.forEach(function(el, i){
					if(typeof el.product!='undefined'){
						if(!el.product.productAvailable) result++;
					}
				})
				return result;
			},
			unavaliableItems: function(){
				var result = [];
				$scope.Cart.items.forEach(function(el, i){
					if(typeof el.product!='undefined'){
						if(!el.product.productAvailable) result.push(el);
					}
						
				})
				return result;
			},
			savedMoney: function(item){
				var result="";
				if(typeof item!='undefined'){
					if(typeof item.product!='undefined'){
						if(item.product.oldPrice) result=$scope.Cart.convertMoney((item.product.oldPrice-item.product.price)*item.amount);
					}
				}
				return result
			},
			convertMoney: function(price){
				if(typeof price!='undefined'){
					return price.toLocaleString('en-US', {minimumFractionDigits: 2});
				}
			}
		}	
		$scope.Products.loadItems();
		var test = function(el){
			console.log(el)
		}
		var body = document.getElementsByTagName("body")[0];
		body.addEventListener("click", test, true );

    }]);

	app.directive('cartitems', function() {
	  return {
	  	templateUrl: 'directives/cartitems.html'
	  };
	});
	app.directive('unavailableitems', function() {
	  return {
	  	templateUrl: 'directives/unavailableitems.html'
	  };
	});
	app.directive('cartinfo', function() {
	  return {
	  	templateUrl: 'directives/cartinfo.html'
	  };
	});

}());

