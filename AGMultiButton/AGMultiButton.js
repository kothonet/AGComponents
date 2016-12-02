var AGMultiButton = InputBaseComponent.extend({

	draw: function(myData) {
		var mySelf = this;
		var param = mySelf._getParameterValue();

		var myDiv = $("<div/>").attr({
		  	role: "group"
	  	}).addClass(mySelf.orientation);

		myDiv.on("click", "button", (function(_myDiv, _mySelf) {
		  	return function() {
				_mySelf.value = $(this).val();

				if (_mySelf.value != _mySelf._getParameterValue()) {
					Dashboards.processChange(_mySelf.name);
					$(this).addClass("active").siblings().removeClass("active");
				}
			}
		})(myDiv, mySelf));

		if (mySelf.size !== 'empty') {
		  	myDiv.addClass(mySelf.size);
		}

		for (var i=0; i<myData.length; i++) {

			var id = mySelf.valueAsId ? myData[i][1] : myData[i][0];
			var text = myData[i][1];

			var myButton = $("<button/>").attr({
			        id: "btn_" + id,
					type: "button"
			    }).addClass("btn").addClass(mySelf.style).text(text);

			var params = param != null ? param.split(",") : [];
			if (params.indexOf(id) > -1) {
			    myButton.addClass("active");
			}

			myDiv.append(myButton);
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
