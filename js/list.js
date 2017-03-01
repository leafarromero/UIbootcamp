//componente de lista
todoList.component('todoList',{
	templateUrl: "/list.html",
	controller: listCtrl
});

function listCtrl($localStorage) {

  let ctrl = this;
  let d = new Date();

  //La lista empieza con un todo default
  ctrl.$storage = $localStorage.$default({
  	records: [
  		{
	  		name: "Add your To-do's",
	  		description: "Go to add and start adding your own to-do's to the list! Once you add them, you can find them here.",
	  		progress: "Todo",
	  		priority: "2",
	  		dueDate: d.getTime() + 24 * 60 * 60 * 1000, //La fecha de mañana
  		},
  	]
  });

  //Metodos para borrar un elemento o todos de la lista
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