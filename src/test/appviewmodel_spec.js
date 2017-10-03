// Import the necessary helpers from chai
import chai from 'chai';
import { expect } from 'chai'

// Import our code to test it
global.ko = require('../lib/knockout-3.4.2.js');
var VM = require('../js/app.js');

// Basic tests for the AppViewModel
describe('AppViewModel', () => {
	
	it('gets instantiated correctly with valid properties', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 10.00,
			feePaidBy: 'organizer'
		});

		// Verify that we can access the properties and that they return the values we set before
		expect(vm.currency()).to.equal('CHF');
		expect(vm.ticketprice()).to.equal(10.00);
		expect(vm.feePaidBy()).to.equal('organizer');
	});

	it('allows us to update its properties', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 10.00,
			feePaidBy: 'organizer'
		});

		// Change its properties using the functions Knockout provides
		vm.currency('DUBLOONS');
		vm.ticketprice(42.00);
		vm.feePaidBy('not me');

		// Verify that the properties were changed as intended
		expect(vm.currency()).to.equal('DUBLOONS');
		expect(vm.ticketprice()).to.equal(42.00);
		expect(vm.feePaidBy()).to.equal('not me');
	});

});

// TODO: Specify VAT

// TODO: Ticketing Fees