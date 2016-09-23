(function() {
	'use strict';
	angular.module('cartApp')
		.factory('ItemFactory', function($http){
			var Items = {
				elements:[],
				get: function(){
					return $http.get("dataModel.json")

				}
			}

			return Items;
				
			
		})


})()