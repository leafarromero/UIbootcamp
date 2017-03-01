//componente del add
todoList.component('todoAdd',{
	templateUrl:"add.html",
	controller: addCtrl
});

//El controlador se encarga de agregar nuevos elementos a la lista y mantener la fecha actual para validar las fechas ingresadas
function addCtrl($scope, $localStorage, $location, dateService){

	let ctrl = this;

	ctrl.$storage = $localStorage;

	ctrl.addItem = function(){	
		
		let inputDate = new Date(ctrl.dueDate);
		inputDate.setHours(0,0,0,0);		

		//Agrega solo si la fecha es valida
		if(dateService.checkDate(ctrl.dueDate)){

			let newItem = {
				name: ctrl.name,
				description:ctrl.description,
				priority: ctrl.priority,
				dueDate: new Date(ctrl.dueDate).setHours(0,0,0,0),
				progress: "Todo"
			};

			ctrl.$storage.records.push(newItem);
			$location.path("/");
		}
	};


	ctrl.validDate = function(){
		return dateService.checkDate(ctrl.dueDate);
	};

	ctrl.supportDate = function(){
		return dateService.supportDate()
	}

}