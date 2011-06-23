$('document').ready(function() {

  var $has = {
    touch: "ontouchend" in document,
    orientation: "onorientationchange" in window,
    geolocation: typeof navigator.geolocation != "undefined",
    transitions: "WebKitTransitionEvent" in window,
    canvas: !!document.createElement("canvas").getContext,
    audio: !!document.createElement("audio").canPlayType,
    localStorage: "localStorage" in window,
    webDB: "opendatabase" in window
  };
  
  if($has.localStorage) {
    var db = window.openDatabase(
      "celeb-notes",
      "1.0",
      "Celeb Notes",
      4 * 1024 * 1024
    );
    
    // Create the table
    db.transaction(function(t) {
      var sql = "CREATE TABLE IF NOT EXISTS notes ";
      sql += "(id INTEGER PRIMARY KEY ASC, celeb, note)";
    
      t.executeSql(sql, function(){
        selectNotes();
      }, function(){
        selectNotes();
      });
    }); 
    
    $("#addNote").click(function(){
      var celeb = prompt("Celeb's name"),
          note = prompt("Note contents");
      if(celeb && note) {
        insertNote(celeb, note);
      }
    });
    
    function selectNotes() {
      db.transaction(function(t){
        t.executeSql('SELECT * FROM notes', [], function (t, data) {
          // Display the data
          for (var i = 0; i < data.rows.length; i++) {
            var item = data.rows.item(i);
            $("<li></li>")
              .append("<span>" + item.celeb + "</span>")
              .append("<span>" + item.note + "</span>")
              .appendTo("#notes-list")
          }
        });
      });
    }
    
    function insertNote(celeb, note) {
      db.transaction(function(t) {
        var sql = "INSERT INTO notes (celeb, note) VALUES (?, ?)";
        t.executeSql(sql, [celeb, note], function(){
          alert('Saved!');
        }); 
      });
    }     
  }
});

