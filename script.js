
let todoList = angular.module('todoList', ["ngStorage", "ngRoute"]);

todoList.config( function($routeProvider, $locationProvider){
  $routeProvider
  .when("/", {
    template:"<todo-list></todo-list>"
  })
  .when("/addTodo", {
    template: '<todo-add></todo-add>'
  });

});

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


todoList.component('todoList',{
	templateUrl: "/list.html",
	controller: listCtrl
});

function listCtrl($localStorage) {

  let ctrl = this;
  let d = new Date();

  ctrl.$storage = $localStorage.$default({
  	records: [
  		{
	  		name: "todo default",
	  		description: "Programar la lista",
	  		progress: "Doing",
	  		priority: 1,
	  		dueDate: d.getTime() + 10000,
	  		created: d.getTime() - 20000
  		},
  		{
	  		name: "kinda workin",
	  		description: "Dejar de ser tan boludo",
	  		progress: "Todo",
	  		priority: 2,
	  		dueDate: d.getTime() + 30000,
	  		created: d.getTime() - 30000
  		},
  		{
	  		name: "cervezas",
	  		description: "Birras con los pibes",
	  		progress: "Done",
	  		priority: 0,
	  		dueDate: d.getTime() + 20000,
	  		created: d.getTime() - 10000
  		}
  	]
  });

  ctrl.updateItem = function(item, prop, value){
    item[prop] = value;
  };

  ctrl.deleteItem = function(item){
    let idx = ctrl.$storage.records.indexOf(item);
    if (idx >= 0) {
      ctrl.$storage.records.splice(idx, 1);
    }
  };

  ctrl.clearList = function(){
  	ctrl.$storage.records = [];
  }

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
  let ctrl = this;

  ctrl.delete = function() {
    ctrl.onDelete({item: ctrl.item});
  };

  ctrl.update = function(prop, value) {
    ctrl.onUpdate({item: ctrl.item, prop: prop, value: value});
  };
}

todoList.component('todoAdd',{
	templateUrl:"add.html",
	controller: addCtrl
});


function addCtrl($scope, $localStorage, $location){

	let ctrl = this;

	ctrl.$storage = $localStorage;

	ctrl.addItem = function(){
		
		let d = new Date();
		let newItem = {
			name: $scope.name,
			description:$scope.description,
			priority: $scope.priority,
			dueDate: $scope.dueDate,
			progress: "Todo",
			created: d.getTime()
		};

		ctrl.$storage.records.push(newItem);
		$location.path("/");
	};

}
