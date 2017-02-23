//Declaración del modulo
let todoList = angular.module('todoList', ["ngStorage", "ngRoute"]);

//El routing usa los componentes como template, cada componente tiene su templateUrl
todoList.config( function($routeProvider, $locationProvider){
  $routeProvider
  .when("/", {
    template:"<todo-list></todo-list>"
  })
  .when("/addTodo", {
    template: '<todo-add></todo-add>'
  });
});

//Directiva para pedir confirmacion antes de borrar la lista
todoList.directive('confirm', [function () {
  return {
    priority: 100,
    restrict: 'A',
    link: {
      pre: function (scope, element, attrs) {
        let msg = attrs.confirm || "Are you sure?";

        element.bind('click', function (event) {
            if (!confirm(msg)) {
              event.stopImmediatePropagation();
              event.preventDefault;
            }
        });
      }
    }
  };
}]);

//El controlador mas externo solo mantiene la clase de CSS active actualizada
todoList.controller('mainCtrl', function($scope, $location){

	$scope.isActive= function(path){
		return path === $location.path()
	};

});







