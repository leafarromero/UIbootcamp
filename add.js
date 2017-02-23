//componente del add
todoList.component('todoAdd',{
	templateUrl:"add.html",
	controller: addCtrl
});

//El controlador se encarga de agregar nuevos elementos a la lista y mantener la fecha actual para validar las fechas ingresadas
function addCtrl($scope, $localStorage, $location){

	let ctrl = this;

	ctrl.$storage = $localStorage;
	$scope.date = new Date();

	ctrl.addItem = function(){
		
		let newItem = {
			name: $scope.name,
			description:$scope.description,
			priority: $scope.priority,
			dueDate: $scope.dueDate,
			progress: "Todo",
			created: $scope.date.getTime()
		};

		ctrl.$storage.records.push(newItem);
		$location.path("/");
	};
}