var AGMultiButton = InputBaseComponent.extend({

	draw: function(myData) {
		var mySelf = this;
		var param = mySelf._getParameterValue();

		var myDiv = $("<div/>").attr({
		  "data-toggle": "buttons"
	  	}).addClass(mySelf.orientation);

		myDiv.on("click", "label", (function(_myDiv, _mySelf) {
		  	return function() {
				if($(this).find("input").attr("type") === "radio") {
					if ($(this).hasClass("active")) return;

					Dashboards.fireChange(_mySelf.parameter, $(this).find("input").val());
				} else {
					var inputs = $(_myDiv).find("label").find("input");
					var params = "";
					for (var i=0; i<inputs.length; i++) {

						var active = $(inputs[i]).parent().hasClass("active");
						if ($(inputs[i]).parent().attr("id") === $(this).attr("id")) {
							active = !active;
						}

						if (active) {
							params += params !== "" ? "," : "";
							params += $(inputs[i]).val();
						}
					}

					if (params === "" && _mySelf.valueIfEmpty !== "") {
						params = _mySelf.valueIfEmpty;
					}

					Dashboards.fireChange(_mySelf.parameter, params);
				}

				Dashboards.processChange(_mySelf.name);
			}
		})(myDiv, mySelf));

		if (mySelf.size !== 'empty') {
		  	myDiv.addClass(mySelf.size);
		}

		for (var i=0; i<myData.length; i++) {

			var id = mySelf.valueAsId ? myData[i][1] : myData[i][0];
			var text = myData[i][1];

			var myLabel = $("<label/>").attr({
			        id: "btn_" + id,
			        class: "btn"
			    }).addClass(mySelf.style).text(text);

			var params = param != null ? param.split(",") : [];
			if (params.indexOf(id) > -1) {
			    $(myLabel).addClass("active");
			}

			var myInput = $("<input/>").attr({
			  id: "rad_" + id,
			  type: mySelf.buttonType,
			  value: id,
			  autocomplete: "off",
			  name: "options"
			});

			myLabel.append(myInput);
			myDiv.append(myLabel);
		}

		$("#" + this.htmlObject).empty();
		$("#" + this.htmlObject).append(myDiv);
	}

	getValue: function() {
		var mySelf = this;
		return mySelf._getParameterValue();
	}

});
