var selectors = $('.nationSelector');

selectors.on('change',function(){
	
	var isChecked = this.checked;
	var nation = $(this).attr('name');
	console.log('the ' + nation + ' checkbox status is ' + isChecked);



	// var checkboxes = searchFilterBox.find('.filterCheckbox');
	// 		var filters = [];
	// 		for (var i = 0; i < checkboxes.length; i++) {
	// 			var checkId = checkboxes[i].id;
	// 			var checkStatus = checkboxes[i].checked;
	// 			if (checkStatus) {
	// 				filters.push(checkId);
	// 			}
	// 		}

	// 		filterResultsByType(filters);

	// 		var sleepValue = sleepSelect.val();
});