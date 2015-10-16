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
  this.description="";
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
  $('#currentNote .delete').on("click", function(e){
    e.preventDefault();
    var me = $(this);
    var identifier= me.parent().attr('identifier');
    deleteNote(identifier);
    var formu= $('#currentNote').attr('identifier','');
    formu.find('.title').val('');
    formu.find('.description').val('');
    formu.find('.isFavorite').get(0).checked=false;
  });
}
function addKeyListenerInput(){
  var id=null;
  $('#currentNote .title').keyup(
    function(event){
      var me = $(this);
      if (id!=null){
        clearTimeout(id);
      }
      id = setTimeout(
        function(){
          var identifer= me.parent().attr('identifier');
          var isCheck=me.parent().find('.isFavorite').get(0).checked;
          var note={identifer:identifer, text:me.val(), isFavorite:isCheck};
          updateNote(note);
        }, 300
      );
    }
  );
}

function addKeyListenerDescription(){
  var id=null;
  $('#currentNote .description').keyup(
    function(event){
      var me = $(this);
      if (id!=null){
        clearTimeout(id);
      }
      id = setTimeout(
        function(){
          var identifer= me.parent().attr('identifier');
          var isCheck=me.parent().find('.isFavorite').get(0).checked;
          var title = me.parent().find('.title').val();
          var note={identifer:identifer, text:title, isFavorite:isCheck ,description:me.val()};
          updateNote(note);
        }, 300
      );
    }
  );
}
function addListenerTagNote(){
  $('#containerNotes .note-tag').click(function(){
    
    var me= $(this);
    var identifier=me.attr("id");
    var note=findNote(identifier);
    var formu= $('#currentNote').attr('identifier',identifier);
    formu.find('.title').val(note.text);
    formu.find('.description').val(note.description);
    formu.find('.isFavorite').get(0).checked=note.isFavorite;

  });
}
function addCheckboxListener(){
  $('#currentNote .isFavorite').change(
    function(){
      var isCheck;
      isCheck=this.checked;
      var me = $(this);
      var identifer= me.parent().attr('identifier');
      var description=me.parent().find('.description').val();
      var title=me.parent().find('.title').val();

      var note={identifer:identifer, text:title, isFavorite:isCheck ,description: description};
      updateNote(note);
    }
  );
}

function updateContainerNotes(){
	var container=$("#containerNotes");
	var notes= getNotes();
	container.html('');
	for (var i = 0 ; i < notes.length; i++) {
		var note=notes[i];
		noteDiv=$('<span>').attr('id',note.identifer).addClass('nav-group-item note-tag');
    noteDiv.html(note.text);
    container.append(noteDiv);
	};
  addListenerTagNote();
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
      updateContainerNotes();
      return true;
    }
  }
  return false ; 
}

function findNote( identifer){
  var notes = getNotes();
  for (var i=0;i<notes.length;i++){
    var noteIte = notes[i];
    if(noteIte.identifer== identifer){
      return noteIte;
    }
  }
  return null;
}
$(document).ready(
  function(){
    updateContainerNotes();
    addListenersDelete();
    addKeyListenerInput();
    addCheckboxListener();
    addKeyListenerDescription();
  }
);