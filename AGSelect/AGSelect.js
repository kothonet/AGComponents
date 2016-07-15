var AGSelect = InputBaseComponent.extend({

	draw: function(myData) {
		var mySelf = this;
		var varChange = sessionStorage.getItem("AGComponents_AGSelect_" + mySelf.parameter);
		if (varChange !== null && varChange === "change") {
			sessionStorage.removeItem("AGComponents_AGSelect_" + mySelf.parameter);
			return;
		}

		var param = mySelf._getParameterValue();

		var mySelect = $("<select/>").attr({
        	class: "selectpicker show-tick show-menu-arrow",
        	"data-width": "fit",
        	id: "sel_" + this.htmlObject,
        	"data-size": "5",
    	});

		mySelect.on("change", (function(_mySelf) {
			return function() {
				var value = $(this).val() !== null ? $(this).val().toString() : "";

				if (value === "" && _mySelf.valueIfEmpty !== "") {
					value = _mySelf.valueIfEmpty;
				}

				if (_mySelf.listeners.valueOf(_mySelf.parameter) > -1) {
					sessionStorage.setItem("AGComponents_AGSelect_" + _mySelf.parameter, "change");
				}
		        Dashboards.fireChange(_mySelf.parameter, value);
				Dashboards.processChange(_mySelf.name);
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

		$("#" + this.htmlObject).empty();
		$("#" + this.htmlObject).append(mySelect);

		mySelect.selectpicker('render');
	}

	getValue: function() {
		var mySelf = this;
		return mySelf._getParameterValue();
	}

});
