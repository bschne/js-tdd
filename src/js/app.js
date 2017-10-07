var AppViewModel = function(params) {
	var self = this;

	// Viewmodel properties
	self.currency 		= ko.observable(params.currency);
	self.ticketprice 	= ko.observable(params.ticketprice);
	self.feePaidBy 		= ko.observable(params.feePaidBy);

	// Calculated properties displayed in the form
	self.VAT = ko.computed(function() {
		if(self.currency() === 'CHF') return 0.08;
		return 0;
	});

	self.feePercentage = ko.computed(function() {
		if(self.ticketprice() == 0.00) return 0.0;
		if(self.ticketprice() <= 30.00) return 0.079;
		if(self.ticketprice() <= 60.00) return 0.069;
		if(self.ticketprice() <= 120.00) return 0.059;
		if(self.ticketprice() <= 500.00) return 0.049;

		return 0.039;
	});

	self.flatTicketingFee = ko.computed(function() {
		if (self.ticketprice() === 0) {
			if (self.currency() === 'CHF') { return 1.0; }
			if (self.currency() === 'EUR') { return 0.65; }
		}

		return 0;
	});

	self.fee = ko.computed(function() {
		var totalFee = 	self.ticketprice() * self.feePercentage() +
		       			self.flatTicketingFee();
		var vat = totalFee * self.VAT();

		return parseFloat(totalFee + vat); 
	});

	self.priceForBuyer = ko.computed(function() {
		if (self.feePaidBy() === 'organizer') {
			return self.ticketprice();
		}

		if (self.feePaidBy() === 'ticketbuyer') {
			return parseFloat(self.ticketprice()) + self.fee();
		}

		return self.ticketprice();
	});

	self.paidToOrganizer = ko.computed(function() {
		if (self.feePaidBy() === 'organizer') {
			return self.ticketprice() - self.fee();
		}

		if (self.feePaidBy() === 'ticketbuyer') {
			return self.ticketprice();
		}

		return self.ticketprice();
	});
}

// Export the viewmodel for testing it with node
if (typeof(module) === 'undefined') module = {};
module.exports = AppViewModel;