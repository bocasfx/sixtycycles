var sc = {

  createCells : function () {
    var idx = 0;

    for (var i = 0; i < sc.projects.length; i++) {

      var bgidx = (idx % sc.colors.length);
      var fgidx = ((idx + 2) % sc.colors.length);

      bgcolor = sc.colors[bgidx];
      fgcolor = sc.colors[fgidx];


      var name = sc.projects[i].name;
      var desc = sc.projects[i].description;
      var icons = sc.projects[i].icons;


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
      
      var backTitle = $("<div>");
      backTitle.text(name);
      var backDescription = $("<div>", {"class": "back-description"});
      backDescription.text(desc);
      backCell.append(backTitle);

      var iconPrefs = {
        backCell: backCell
      };

      icons.forEach(sc.appendIcon, iconPrefs);
      backCell.append(backDescription);

      cellAnchor.append(innerCell);

      var cell = $("<div>", {"class": "col-md-4 cell right"});
      cell.append(cellAnchor);
      cell.append(backCell);

      $( "#cell-container" ).append( cell );

      idx += 1;
    }
  },

  appendIcon: function(item, index) {
    var cellIcon = $("<span>", {"class": "cell-icon fa " + item});
    this.backCell.append(cellIcon);
  },

  populateModal: function(event) {
    $("#sc-modal").empty();
    $("#sc-modal").load("./modals/" + event.data.id + ".html");
  }
};

$( document ).ready(function() {
  $.getJSON("config.json", function(data) {
    sc.projects = data.projects;
    sc.colors = data.colors;
    sc.createCells();
  });
});



