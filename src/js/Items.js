(function() {
	'use strict';
	angular.module('cartApp')
		.factory('ItemFactory', function(){
			var Items = {
				elements:[],
				get: function(){
					return $http.get("data/dataModel.json")

				}
			}

			return Items;
				
			
		})


})()