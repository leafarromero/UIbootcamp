//componente de la vista
todoList.component('todoView',{
  templateUrl: "view.html",
  controller: viewCtrl,
  bindings: {
    item: '<',
    onDelete: '&',
  }
});

//El controlador maneja updates de valores y si hay un elemento a borrar lo pasa al controlador de lista
function viewCtrl($scope, dateService) {
  let ctrl = this;
  let collapse = true;
  $scope.date = new Date();

  ctrl.delete = function() {
    ctrl.onDelete({item: ctrl.item});
  };

  ctrl.update = function(evt, prop, value) {
    evt.stopPropagation();
    ctrl.item[prop] = value;
  };

  ctrl.edit = function(){
    //Se chequea cada campo si tiene un valor para editar, sino se lo deja igual

    ctrl.item.name = ctrl.newName ? ctrl.newName : ctrl.item.name;
    ctrl.item.priority = ctrl.newPriority ? ctrl.newPriority : ctrl.item.priority;
    ctrl.item.progress = ctrl.newProgress ? ctrl.newProgress : ctrl.item.progress;
    ctrl.item.description = ctrl.newDescription ? ctrl.newDescription : ctrl.item.description;

    //Chequea que la fecha pasada sea valida antes de cambiarla
    if(dateService.checkDate(ctrl.newDate)){
      ctrl.item.dueDate = ctrl.newDate ? new Date(ctrl.newDate).setHours(0,0,0,0) : ctrl.item.dueDate;
    }
    
    $scope.editMode = false;
  };

  //el item guarda la prioridad como un numero, con esta funcion se la expresa con el string correspondiente
  ctrl.priorityString = function(priority){
    let res;
    switch(priority){
      case "0":
        res = "Very High";
        break;
      case "1":
        res = "High";
        break;
      case "2":
        res = "Moderate";
        break;
      case "3":
        res = "Low";
        break;
      case "4":
        res = "Very Low";     
    }
    return res
  };

  ctrl.supportDate = function(){
    return dateService.supportDate()
  };

  ctrl.validDate = function(){
    return dateService.checkDate(ctrl.newDate)
  }

}
