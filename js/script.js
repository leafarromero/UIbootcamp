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

todoList.service('dateService', function(){

  //Devuelve true si la fecha es valida
  let checkDate = function(dateStr){

    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    let inputDate = new Date(dateStr);
    inputDate.setHours(0,0,0,0);

    return !isNaN(inputDate.valueOf()) && inputDate >= currentDate
  };

  let supportDate = function(){
    let input = document.createElement('input');
    input.setAttribute('type','date');

    let notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue); 

    return (input.value !== notADateValue);
  };

  return{
    checkDate: checkDate,
    supportDate: supportDate
  };
});

//El controlador mas externo solo mantiene la clase de CSS active actualizada
todoList.controller('mainCtrl', function($scope, $location){

	$scope.isActive= function(path){
		return path === $location.path()
	};

});







