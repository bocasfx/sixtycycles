var sc = {

  createCells : function () {
    var idx = 0;

    var colourIdx = 0;

    for (var i = 0; i < sc.projects.length; i++) {

      var bgidx = (idx % sc.colours[colourIdx].length);
      var fgidx = ((idx + 2) % sc.colours[colourIdx].length);

      bgcolor = sc.colours[colourIdx][bgidx];
      fgcolor = sc.colours[colourIdx][fgidx];


      var name = sc.projects[i].name;
      var desc = sc.projects[i].description;
      var icon = sc.projects[i].icon;

      var cellAnchor = $("<a>", {
        "href": "#",
        "data-toggle": "modal",
        "data-target": "#sc-modal"
      });
      cellAnchor.click({"id": sc.projects[i].id}, sc.populateModal);
      
      var innerCell = $("<div>", {"class": "inner-cell cell-link"});
      innerCell.css({
        "background-color": bgcolor,
        "color": fgcolor
      });
      innerCell.text(name);
      
      var backCell = $("<div>", {"class": "back-cell right"});
      var backCheck = $("<span>", {"class": "back-check fa " + icon});
      var backTitle = $("<span>");
      backTitle.text(name);
      var backDescription = $("<div>", {"class": "back-description"});
      backDescription.text(desc);
      backCell.append(backCheck);
      backCell.append(backTitle);
      backCell.append(backDescription);

      cellAnchor.append(innerCell);

      var cell = $("<div>", {"class": "col-md-3 cell right"});
      cell.append(cellAnchor);
      cell.append(backCell);

      $( "#cell-container" ).append( cell );

      idx += 1;
    }
  },

  populateModal: function(event) {
    $("#sc-modal").load("./modals/" + event.data.id + ".html");
  }
};

$( document ).ready(function() {
  $.getJSON("config.json", function(data) {
    sc.projects = data.projects;
    sc.colours = data.colours;
    sc.createCells();
  });
});



