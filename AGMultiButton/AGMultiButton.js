var AGMultiButton = InputBaseComponent.extend({

	draw: function(myData) {
		var mySelf = this;
		var param = mySelf._getParameterValue();

		var myDiv = $("<div/>").attr({
		  "data-toggle": "buttons"
	  	}).addClass(mySelf.orientation);

		myDiv.on("click", "label", (function(_myDiv, _mySelf) {
		  	return function() {
				_mySelf.value = $(this).find("input").val();

				if (_mySelf.value != _mySelf._getParameterValue()) {
					Dashboards.processChange(_mySelf.name);
				}
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
			  type: "radio",
			  value: id,
			  autocomplete: "off",
			  name: "options"
			});

			myLabel.append(myInput);
			myDiv.append(myLabel);
		}

		myDiv.appendTo($("#" + mySelf.htmlObject).empty());

		if (!mySelf.value || mySelf.value != param) {
			mySelf.value = param;
			Dashboards.processChange(mySelf.name);
		}
	},

	getValue: function() {
		var mySelf = this;
		return mySelf.value;
	}

});
