function generateId(){
	var counter=localStorage.getItem("counter");
	if(counter==null) {
		localStorage.setItem("counter","0");
		return 0;
	}
	counter=parseInt(counter);
	localStorage.setItem("counter",++counter);
	return counter;
}
function Nota(text, isFavorite){
	this.text= text;
	this.isFavorite=isFavorite;
	this.identifer= generateId();
}
$('#btnAdd').click(
	function(e){
		e.preventDefault();
		var nota= new Nota('',false);
		nota.text= $('#nota').val();
		var notas=getNotas();
		notas.push(nota);
		setNotas(notas);
		updateContainerNotas();
	}
);
function addListenersDelete(){
  $('#containerNotas .delete').on("click", function(){
    var me = $(this);
    var identifer= me.parent().attr('id');
    deleteNota(identifer);
    console.log('event button');
  });
}
function addKeyListenerInput(){
  var id=null;
  $('#containerNotas .text').keyup(
    function(event){
      var me = $(this);
      if (id!=null){
        clearTimeout(id);
      }
      id = setTimeout(
        function(){
          var identifer= me.parent().attr('id');
          var nota={identifer:identifer, text:me.val(), isFavorite:false};
          updateNota(nota);
        }, 300
      );
    }
  );
}
function addCheckboxListener(){
  $('#containerNotas .isFavorite').change(
    function(){
      var isCheck;
      isCheck=this.checked;
    }
  );
}

function updateContainerNotas(){
	var container=$("#containerNotas");
	var notas= getNotas();
	container.html('');
	for (var i = 0 ; i < notas.length; i++) {
		var nota=notas[i];
		notaDiv=$('<div>').attr('id',nota.identifer);
		notaDiv.html(
			'<input type="text" class="text" value="'+nota.text+'"> Favorito <input type="checkbox"> <button class="delete">Borrar</button>');
		container.append(notaDiv);
	};
  addListenersDelete();
  addKeyListenerInput();
  addCheckboxListener();
}
function getNotas(){
	var notas=JSON.parse(localStorage.getItem("notas"));
	if(notas==null) return [];
	return notas;
}
function setNotas(notas){
	localStorage.removeItem("notas");
	localStorage.setItem("notas", JSON.stringify(notas));
}
function deleteNota(identifer){
  var notas = getNotas();
  for (var i=0;i<notas.length;i++){
    var nota = notas[i];
    if(identifer== nota.identifer){
      notas.splice(i,1);
    }
  }
  setNotas(notas);
  updateContainerNotas();
}
function updateNota(nota){
  var notas = getNotas();
  for (var i=0;i<notas.length;i++){
    var notaIte = notas[i];
    if(notaIte.identifer== nota.identifer){
      notas[i]=nota;
      setNotas(notas);
      return true;
    }
  }
  return false ; 
}
$(document).ready(
  function(){
    updateContainerNotas();
  }
);