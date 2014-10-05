var sc = {

	projects : [
		{
			"name" : "Savvy Green",
			"class" : "savvy-green"
		},
		{
			"name" : "Vital Response",
			"class" : "vital-response"
		},
		{
			"name" : "Brains",
			"class" : "brains"
		},
		{
			"name" : "Agfa Deploy",
			"class" : "agfa-deploy"
		},
		{
			"name" : "Bloom",
			"class" : "bloom"
		},
		{
			"name" : "Pink Chipotle",
			"class" : "pink-chipotle"
		},
		{
			"name" : "The Sofa Kings",
			"class" : "the-sofa-kings"
		},
		{
			"name" : "Q",
			"class" : "q"
		}
	],
	

	colours : [
		"#D100A3",
		"#F809C3",
		"#E800B5",
		"#9C037A",
		"#700D5A",
		"#D9008D",
		"#F909A5",
		"#EC0099",
		"#A5036D",
		"#760E52",
		"#C700BE",
		"#F709EC",
		"#E200D8",
		"#8E0388",
		"#660C62"
	],

	mouseEnter : function () {
		// $(this).addClass( $(this).attr('sc-class') );
		$(this).addClass( 'mousein' );
		$(this).removeClass( 'mouseout' );

	},

	mouseLeave : function () {
		// $(this).removeClass( $(this).attr('sc-class') );
		
		// $(this).css({
		// "background-color": $(this).attr('sc-color'),
		// });
		// $(this).addClass( 'reset' );
		$(this).addClass( 'mouseout' );
		$(this).removeClass( 'mousein' );
	},

	createCells : function () {
		console.log("Creating cells.");
		var idx = 0;

		for (var i = 0; i < sc.projects.length; i++) {

			var bgidx = (idx % sc.colours.length);
			var fgidx = ((idx + 2) % sc.colours.length);

			bgcolor = sc.colours[bgidx];
			fgcolor = sc.colours[fgidx];

			// console.log("Creating project: " + sc.projects[i]);
			var cell = $( "<div class='col-md-3 cell right'><div class='inner-cell'>Title</div></div>" );
			$( "#cell-container" ).append( cell );

			var innerCell = $(cell.get(0)).children();

			innerCell.text(sc.projects[i].name);
			// innerCell.css("background-color", bgcolor);
			// innerCell.css("color", fgcolor);
			innerCell.attr('sc-color', bgcolor);
			innerCell.attr('sc-class', sc.projects[i].class);
			innerCell.hover( sc.mouseEnter, sc.mouseLeave );
			idx += 1;
		}
	}
};

$( document ).ready(function() {
	sc.createCells();
});



