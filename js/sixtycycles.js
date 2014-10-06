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
		},
		{
			"name" : "eSpire",
			"class" : "espire"
		},
		{
			"name" : "GeeBee",
			"class" : "geebee"
		},
		{
			"name" : "The Sofa Kings",
			"class" : "the-sofa-kings-1"
		},
		{
			"name" : "Your Time Boutique",
			"class" : "your-time-boutique"
		},
		{
			"name" : "MIDIWorm",
			"class" : "midiworm"
		},
		{
			"name" : "Tape",
			"class" : "tape"
		},
		{
			"name" : "Bubbles",
			"class" : "bubbles"
		},
		{
			"name" : "Marvin",
			"class" : "marvin"
		},
		{
			"name" : "The Vinyl Revival",
			"class" : "the-vinyl-revival"
		},
		{
			"name" : "Spanish Solutions",
			"class" : "spanish-solutions"
		},
		{
			"name" : "Smarter Resources",
			"class" : "smarter-resources"
		},
		{
			"name" : "Druidas",
			"class" : "druidas"
		},
		{
			"name" : "Rhino Works",
			"class" : "rhino-works"
		},
		{
			"name" : "Give & Get Network",
			"class" : "give-n-get-network"
		},
		{
			"name" : "The Rambler",
			"class" : "the-rambler"
		},
		{
			"name" : "Non-Violence Festival",
			"class" : "non-violence-festival"
		},
		{
			"name" : "The Tree Within",
			"class" : "the-tree-within"
		}
	],
	

	colours : [
		[
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
		[
			"#FA2716",
			"#E4746B",
			"#E54D42",
			"#FA1200",
			"#EF1100",
			"#1C7788",
			"#168094",
			"#197C8E",
			"#1F7281",
			"#216D7B",
			"#F1F3ED",
			"#A4B782",
			"#C5D2AE",
			"#D2D5CD",
			"#B7BAB3",
			"#68B475",
			"#77C284",
			"#6FBB7D",
			"#5FAC6D",
			"#53A161"
		]
	],


	createCells : function () {
		console.log("Creating cells.");
		var idx = 0;

		var colourIdx = 0;

		for (var i = 0; i < sc.projects.length; i++) {

			var bgidx = (idx % sc.colours[colourIdx].length);
			var fgidx = ((idx + 2) % sc.colours[colourIdx].length);

			bgcolor = sc.colours[colourIdx][bgidx];
			fgcolor = sc.colours[colourIdx][fgidx];

			// console.log("Creating project: " + sc.projects[i]);
			var cell = $( "<div class='col-md-3 cell right'><a href='#' data-toggle=modal data-target=#myModal><div class='inner-cell cell-link'>Title</div></a></div>" );
			var bgUrl = 'img/' + sc.projects[i].class + '.jpg';
			cell.css('background', 'url(' + bgUrl +')');
			cell.css('background-position', 'center');
			// cell.css('border', '10px solid #FFF'); Uncomment to add border

			$( "#cell-container" ).append( cell );

			var innerCell = $(cell.get(0)).children(0).children();

			innerCell.text(sc.projects[i].name);
			innerCell.css("background-color", bgcolor);
			innerCell.css("color", fgcolor);
			innerCell.css('text-decoration', 'none');
			idx += 1;
		}
	}
};

$( document ).ready(function() {
	sc.createCells();
});



