(function() {

  var sc = {

    colorIdx: 0,

    createCells : function () {
      // var colorIdx = Math.floor((Math.random() * 3));

      for (var i = 0; i < sc.projects.length; i++) {
        sc.createCell(i);
      }
    },

    createCell: function(i) {

      var bgidx = (i % sc.colors[sc.colorIdx].length);
      var fgidx = ((i + 2) % sc.colors[sc.colorIdx].length);

      bgcolor = sc.colors[sc.colorIdx][bgidx];
      fgcolor = sc.colors[sc.colorIdx][fgidx];

      var name = sc.projects[i].name;
      var desc = sc.projects[i].description;
      var icons = sc.projects[i].icons;

      var cellAnchor = $("<a>", {
        "href": "#",
        "data-toggle": "modal",
        "data-target": "#sc-modal"
      });

      var projectInfo = {
        "id": sc.projects[i].id,
        "name": sc.projects[i].name,
        "date": sc.projects[i].date
      };

      cellAnchor.click(projectInfo, sc.populateModal);
      cellAnchor.css({
        "outline": 0,
        "text-decoration": "none"
      });
      
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
    },

    appendIcon: function(item, index) {
      var cellIcon = $("<span>", {"class": "cell-icon fa " + item});
      this.backCell.append(cellIcon);
    },

    populateModal: function(event) {
      $("#sc-modal .modal-body").empty();
      $("#sc-modal .modal-title").text(event.data.name);
      $("#sc-modal .modal-date").text(event.data.date);
      $("#sc-modal .modal-body").load("./modals/" + event.data.id + ".html");
    },

    generaterAboutSection: function() {
      $("#aboot").click(function() {
        $("#aboot-modal").load("./modals/about.html");
      });
    },

    unmentionableBrowserDetected: function() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");

      if (msie > 0) {
        return true;
      }
      return false;
    },

    toggleFilterBar: function() {
      $("#filter-bar").toggleClass('filter-bar-hidden');
    },

    applyFilter: function() {
      $("#filter-bar a").removeClass('active');
      $(this).addClass('active');

      $("#filter-bar").toggleClass('filter-bar-hidden');
      sc.hideCells();
    },

    hideCells: function(cell) {

      var cells = $(".cell");

      $(cells[cells.length-1]).bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        $("#cell-container").empty();
        sc.createCells();
      });

      for (var i = 0; i < cells.length; i++) {
        $(cells[i]).css({
          "-webkit-transition": "all " + (0.5 + i/20) + "s",
          "-moz-transition": "all " + (0.5 + i/20) + "s",
          "-o-transition": "all " + (0.5 + i/20) + "s",
          "visibility": "hidden",
          "opacity": 0,
          "height": 0
        });
      }
      
    },

    init: function(data) {
      sc.projects = data.projects;
      sc.colors = data.colors;
      sc.generaterAboutSection();

      $("#filter-button").click(sc.toggleFilterBar);
      $("#filter-bar a").click(sc.applyFilter);

      sc.createCells();
    }
  };

  $( document ).ready(function() {
    if (sc.unmentionableBrowserDetected()) {
      window.alert("We're sorry. Sixtycycles does not support the use of subpar browsers.");
      return;
    }
    $.getJSON("config.json", function(data) {
      sc.init(data);
    });
  });
})();


