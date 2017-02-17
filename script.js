
let todoList = angular.module('todoList', ["ngStorage", "ngRoute"]);

todoList.config( function($routeProvider, $locationProvider){
  $routeProvider
  .when("/", {
    template:"<todo-list></todo-list>"
  })
  .when("/add", {
    template: '<todo-add></todo-add>'
  })
  .when("/edit", {
    templateUrl: 'edit.html',
    controller: 'detailCtrl'
  })

  $locationProvider.html5Mode(true);

});

todoList.component('todoList',{
	templateUrl: "/list.html",
	controller: listCtrl
});

function listCtrl($scope, $localStorage) {

  let ctrl = this;
  let d = new Date();

  ctrl.$storage = $localStorage.$default({
  	records: [
  		{
	  		name: "todo default",
	  		description: "Programar la lista",
	  		status: "Doing",
	  		priority: 1,
	  		dueDate: d.getTime() + 10000,
	  		created: d.getTime() - 20000
  		},
  		{
	  		name: "kinda workin",
	  		description: "Dejar de ser tan boludo",
	  		status: "Todo",
	  		priority: 2,
	  		dueDate: d.getTime() + 30000,
	  		created: d.getTime() - 30000
  		},
  		{
	  		name: "cervezas",
	  		description: "Birras con los pibes",
	  		status: "Done",
	  		priority: 0,
	  		dueDate: d.getTime() + 20000,
	  		created: d.getTime() - 10000
  		}
  	]
  });


}


todoList.component('todoView',{
	templateUrl: "view.html",
	controller: viewCtrl,
	bindings: {
    item: '<',
    onDelete: '&',
    onUpdate: '&'
  }
});


function viewCtrl() {
  var ctrl = this;

  ctrl.delete = function() {
    ctrl.onDelete({item: ctrl.item});
  };

  ctrl.update = function(prop, value) {
    ctrl.onUpdate({item: ctrl.item, prop: prop, value: value});
  };
}

todoList.controller('mainCtrl',
  ['$scope', '$rootScope', '$location', '$localStorage', 
  function($scope, $rootScope, $location, $localStorage){

  $location.path("/");

}]);


