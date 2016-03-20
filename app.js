angular.module("aplic",['ui.router'])
.value('urlServidor',"http://localhost:9090/atleta")
.service('comServidor',function($http,urlServidor){
	return {
		"estrura":function(){
			return {
			    method: 'GET',
			    headers: {'Content-Type': 'application/json' },
			    url : urlServidor,
			    data : null
			};
		},
		"get":function(){
			var dados = this.estrura();
			dados.method = "GET";
			dados.url = urlServidor;
			return $http(dados).then(function successCallback(response) {	
		 		return response.data;
		    }, function errorCallback(response) {
		    	return response;	
		  	});
		},
		"post":function(obj){
			var dados = this.estrura();
			dados.method = "POST";
			dados.data = obj;
			return $http(dados).then(function successCallback(response) {	
		 		return response.data;
		    }, function errorCallback(response) {
		    	return response;	
		  	});
		},
		"put":function(obj){
			var dados = this.estrura();
			dados.method = "PUT";
			method.data = obj;
			return $http(dados).then(function successCallback(response) {	
		 		return response.data;
		    }, function errorCallback(response) {
		    	return response;	
		  	});
		},
		"apagar":function(id){
			var dados = this.estrura();
			dados.method = "DELETE";
			dados.url = dados.url+"/"+id;
			return $http(dados).then(function successCallback(response) {	
		 		return response.data;
		    }, function errorCallback(response) {
		    	return response;	
		  	});			
		}
	}
})
.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/home");
	$stateProvider
	.state('atletas',{
		url:"/atletas",
		templateUrl: "atletas.html",
		controller: "atleta"
	})
	.state('home',{
		url:"/home",
		templateUrl: "home.html",
		controller: "home"
	});
})
.controller("home",function($scope,comServidor){
	$scope.listar = function(){
		comServidor.get().then(function(data){
			$scope.atletas = data;
		});
	};	
})
.controller("atleta",function($scope,comServidor){
	
	$scope.atletas = [];
	$scope.selecionado = false;

	$scope.listar = function(){
		comServidor.get().then(function(data){
			$scope.atletas = data;
		});
	};

	$scope.salvarEditar = function(){

			comServidor.post($scope.atleta).then(function(){
				$scope.listar();	
			});	
			$scope.atleta = null;
			$scope.selecionado = false;

	};

	$scope.selecionar = function(obj){
		$scope.atleta = angular.copy(obj);
		$scope.selecionado = true;
	};

	$scope.apagar = function(obj){
		comServidor.apagar(obj.id).then(function(){
			$scope.listar();	
		});
	
	};
})
