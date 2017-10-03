var AppViewModel = function(params) {
	var self = this;

	// Viewmodel properties
	self.currency 		= ko.observable(params.currency);
	self.ticketprice 	= ko.observable(params.ticketprice);
	self.feePaidBy 		= ko.observable(params.feePaidBy);

	// Calculated properties displayed in the form
	self.priceForBuyer = ko.computed(function() {
		return 0;
	});

	self.paidToOrganizer = ko.computed(function() {
		return 0;
	});

	self.fee = ko.computed(function() {
		return 0;
	});
}

// Export the viewmodel for testing it with node
module.exports = AppViewModel;