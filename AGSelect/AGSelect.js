var AGSelect = InputBaseComponent.extend({

	draw: function(myData) {
		var mySelf = this;

		if (mySelf.varChange && mySelf.varChange === "change") {
			mySelf.varChange = null;
			return;
		}

		var param = mySelf._getParameterValue();

		if (!mySelf.multiple) {
			if (myData.length > 0) {
				var found = false;

				for (var i=0; i<myData.length; i++) {
					var id = mySelf.valueAsId ? myData[i][1] : myData[i][0];

					if (id === param) {
						found = true;
						break;
					}
				}
				if (!found) {
					param = mySelf.valueAsId ? myData[0][1] : myData[0][0];
				}
			}
		}

		var mySelect = $("<select/>").attr({
        	class: "selectpicker show-menu-arrow",
        	"data-width": "fit",
        	id: "sel_" + this.htmlObject,
        	"data-size": "5",
    	});

    	if (mySelf.maxWidth) {
    		mySelect.attr("max-width", mySelf.maxWidth.toString() + "px");
    	}

		mySelect.on("change", (function(_mySelf) {
			return function() {
				if (_mySelf.listeners.valueOf(_mySelf.parameter) > -1) {
					_mySelf.varChange = "change";
				}

				_mySelf.value = $(this).val() !== null ? $(this).val().toString() : "";

				if (_mySelf.value === "" && _mySelf.valueIfEmpty !== "") {
					_mySelf.value = _mySelf.valueIfEmpty;
				}

				if (_mySelf.value != _mySelf._getParameterValue()) {
					Dashboards.processChange(_mySelf.name);
				}
			}
	    })(mySelf));

		if (mySelf.multiple) {
	        mySelect.attr("multiple", "");
	    }

	    if (mySelf.search) {
	        mySelect.attr("data-live-search","true");
	    }

		if (mySelf.title !== "") {
			mySelect.attr("title", mySelf.title);
		}

		for (var i=0; i < myData.length; i++) {

	        var id = mySelf.valueAsId ? myData[i][1] : myData[i][0];
	        var text = myData[i][1];

	        var myOption = $("<option/>").attr("value", id).text(text);

			var params = param !== null ? param.split(",") : [];
	        if (params.indexOf(id) > -1) {
	            myOption.attr("selected", "");
	        }

	        mySelect.append(myOption);
	    }

		mySelect.appendTo($("#" + mySelf.htmlObject).empty());

		mySelect.selectpicker('render');

		if (!mySelf.value || mySelf.value != param) {
			if (mySelf.valueIfEmpty && mySelf.valueIfEmpty !== "" && !mySelf.firstTime) {
				mySelf.firstTime = true;
				param = mySelf.valueIfEmpty;
				Dashboards.setParam(mySelf.parameter, param);
			}

			mySelf.value = param;
			Dashboards.processChange(mySelf.name);
		}
	},

	getValue: function() {
		var mySelf = this;
		return mySelf.value;
	}

});
