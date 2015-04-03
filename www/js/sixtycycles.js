(function() {

  var sc = {

    colorIdx: 0,

    filter: undefined,

    cellsActive: true,

    createCells : function (filter) {

      window.sr = null;
      var delay = 0;
      var activeProjects = [];

      if (!filter) {
        activeProjects = sc.projects;
      } else {
        for (var j = 0; j < sc.projects.length; j++) {
          if ( filter !== undefined && $.inArray(filter, sc.projects[j].icons) >= 0 ) {
            activeProjects.push(sc.projects[j]);
          }
        }
      }

      for (var i = 0; i < activeProjects.length; i++) {
        
        var bgidx = (i % sc.colors[sc.colorIdx].length);
        var fgidx = ((i + 2) % sc.colors[sc.colorIdx].length);

        var bgColor = sc.colors[sc.colorIdx][bgidx];
        var fgColor = sc.colors[sc.colorIdx][fgidx];

        var project = activeProjects[i];
        var prevProject = null;
        var nextProject = null;

        if (i > 0) {
          prevProject = activeProjects[i-1];
        }
        if (i < activeProjects.length) {
          nextProject = activeProjects[i+1];
        }

        sc.createCell(project, prevProject, nextProject, filter, fgColor, bgColor, delay);

        delay += 0.05;
      }

      window.sr = new scrollReveal();
    },

    hideContentAndShowCells: function() {
      if(!sc.cellsActive) {
        $("#project-container").fadeOut('slow', function() {
          $("#project-content").empty();
          $("#project-title").empty();
          $("#project-date").empty();
          $(".filter-container").fadeIn('slow');
          sc.createCells(sc.filter);
          sc.cellsActive = true;
        });
      }
    },

    hideCellsAndShowContent: function(params) {

      var cells = $(".cell");

      $(cells[0]).bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        
        $("#cell-container").empty();
        
        if (params.type === "filter") {
          sc.createCells(params.content);
        }

        if (params.type === "project") {
          var url = "./modals/" + params.content.id + ".html";
          $("#project-content").load(url, function(response,status,xhr) {
            $("#project-title").html(params.content.name);
            $("#project-date").html(params.content.date);
            if (params.content.showDescription) {
              $("#project-description").html(params.content.description);
            } else {
              $("#project-description").html('');
            }
            $("#project-url").html(
              "<a class='project-link' target='_blank' href='" + params.content.url + "'>" + params.content.url + "</a>"
            );
            $("#project-container").fadeIn('slow', function() {
              $("#project-footer").fadeIn('slow');
            });
            $(".filter-container").fadeOut('slow');
            sc.cellsActive = false;
          });
        }
      });

      $("html, body").animate({ scrollTop: 0 }, "slow");

      for (var i = cells.length-1; i >= 0; i--) {
        var factor = cells.length - i;
        $(cells[i]).css({
          "-webkit-transition": "all " + (0.5 + factor/20) + "s",
          "-moz-transition": "all " + (0.5 + factor/20) + "s",
          "-o-transition": "all " + (0.5 + factor/20) + "s",
          "visibility": "hidden",
          "opacity": 0
        });
      }

      return false;
      
    },

    createCell: function(project, prevProject, nextProject, filter, fgColor, bgColor, delay) {

      var name = project.name;
      var desc = project.description;
      var icons = project.icons;

      // The main cell
      var cell = $("<div>", {
        "class": "col-md-4 cell right",
        "data-sr": "wait " + delay + "s, enter left, hustle 20px,"
      });

      cell.css({
        "background-color": bgColor
      });

      cell.click(project, sc.loadProject);

      // Project name
      var cellName = $("<div>", {
        "class": "cell-name"
      });
      cellName.text(name);
      cellName.css({
        "color": fgColor,
        "transition": "all .5s",
        "-ms-transition": "all .5s",
        "-webkit-transition": "all .5s",
        "-moz-transition": "all .5s",
        "-o-transition": "all .5s"
      });

      // Icons
      var iconContainer = $('<div>', {
        "class": "cell-icons"
      });
      var iconPrefs = {
        domElement: iconContainer
      };

      icons.forEach(sc.appendIcon, iconPrefs);

      // Description
      var description = $("<div>", {
        "class": "cell-description"
      });

      var cellDescription = desc;

      if (cellDescription.length > 255) {
        cellDescription = cellDescription.slice(0, 200) + "...";
      }

      description.html(cellDescription);

      // Append stuff
      cell.append(cellName);
      cell.append(iconContainer);
      cell.append(description);
      $("#cell-container").append( cell );
    },

    appendIcon: function(item, index) {
      var cellIcon = $("<span>", {"class": "cell-icon fa " + item});
      this.domElement.append(cellIcon);
    },

    loadProject: function(event) {
      var params = {
        "type": "project",
        "content": event.data
      };
      sc.hideCellsAndShowContent(params);
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
      
      sc.filter = sc.extractFilter(this);

      var params = {
        "type": "filter",
        "content": sc.filter
      };
      sc.hideCellsAndShowContent(params);
    },

    extractFilter: function(domElement) {
      var children = $(domElement).children();
      if (children.length === 0) {
        return undefined;
      }

      return children[0].classList[1];
    },

    init: function(data) {
      sc.projects = data.projects;
      sc.colors = data.colors;
      sc.generaterAboutSection();

      $("#filter-button").click(sc.toggleFilterBar);
      $("#filter-bar a").click(sc.applyFilter);
      $("#main-header").click(sc.hideContentAndShowCells);

      // sc.colorIdx = Math.floor((Math.random() * 3));

      sc.createCells(sc.filter);
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


