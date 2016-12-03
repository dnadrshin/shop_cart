(function() {
	'use strict';
	angular.module('cartApp')
		.factory('ItemFactory', function($http){
			var Items = {
				elements:[],
				get: function(){
					return $http.get("dataModel.json");
				},
				dataArr:[
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
			]
			};

			return Items;
				
			
		});


})();