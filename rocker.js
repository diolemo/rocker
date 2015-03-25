$(function() {
	
	var rockers = $(".rocker");
	rockers.each(function() {

		var rocker = $(this);

		rocker.selected = null;
		rocker.inputs = rocker.find("input");
		rocker.options = $();

		var options_container = $.create("span");
		options_container.addClass("options");
		rocker.append(options_container);

		rocker.inputs.each(function() {

			var input = $(this);
			var option = $.create("a");
			option.input = input;
			option.attr("class", input.attr("class"));
			option.text(input.data("label"));
			option.addClass("option");
			if (input.is(":checked")) 
				rocker.selected = option;
			options_container.append(option);
			rocker.options = rocker.options.add(option);

			option.on("click", (function(option) {

				return function() {
					rocker.options.removeClass("selected");
					rocker.inputs.prop("checked", false);
					option.input.prop("checked", true);
					option.addClass("selected");
				};

			})(option));
			
		});

		if (!rocker.selected) {
			rocker.selected = rocker.options.filter(".default");
			if (!rocker.selected) rocker.selected = rocker.options.eq(0);
		}

		rocker.selected.trigger("click");

	});

});