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
function Note(text, isFavorite){
	this.text= text;
	this.isFavorite=isFavorite;
	this.identifer= generateId();
}
$('#btnAdd').click(
	function(e){
		e.preventDefault();
		var note= new Note('',false);
		note.text= $('#note').val();
		var notes=getNotes();
		notes.push(note);
		setNotes(notes);
		updateContainerNotes();
	}
);
function addListenersDelete(){
  $('#containerNotes .delete').on("click", function(){
    var me = $(this);
    var identifer= me.parent().attr('id');
    deleteNote(identifer);
    console.log('event button');
  });
}
function addKeyListenerInput(){
  var id=null;
  $('#containerNotes .text').keyup(
    function(event){
      var me = $(this);
      if (id!=null){
        clearTimeout(id);
      }
      id = setTimeout(
        function(){
          var identifer= me.parent().attr('id');
          var note={identifer:identifer, text:me.val(), isFavorite:false};
          updateNote(note);
        }, 300
      );
    }
  );
}
function addCheckboxListener(){
  $('#containerNotes .isFavorite').change(
    function(){
      var isCheck;
      isCheck=this.checked;
    }
  );
}

function updateContainerNotes(){
	var container=$("#containerNotes");
	var notes= getNotes();
	container.html('');
	for (var i = 0 ; i < notes.length; i++) {
		var note=notes[i];
		noteDiv=$('<div>').attr('id',note.identifer);
		noteDiv.html(
			'<input type="text" class="text" value="'+note.text+'"> Favorite <input type="checkbox"> <button class="delete">Delete</button>');
		container.append(noteDiv);
	};
  addListenersDelete();
  addKeyListenerInput();
  addCheckboxListener();
}
function getNotes(){
	var notes=JSON.parse(localStorage.getItem("notes"));
	if(notes==null) return [];
	return notes;
}
function setNotes(notes){
	localStorage.removeItem("notes");
	localStorage.setItem("notes", JSON.stringify(notes));
}
function deleteNote(identifer){
  var notes = getNotes();
  for (var i=0;i<notes.length;i++){
    var note = notes[i];
    if(identifer== note.identifer){
      notes.splice(i,1);
    }
  }
  setNotes(notes);
  updateContainerNotes();
}
function updateNote(note){
  var notes = getNotes();
  for (var i=0;i<notes.length;i++){
    var noteIte = notes[i];
    if(noteIte.identifer== note.identifer){
      notes[i]=note;
      setNotes(notes);
      return true;
    }
  }
  return false ; 
}
$(document).ready(
  function(){
    updateContainerNotes();
  }
);