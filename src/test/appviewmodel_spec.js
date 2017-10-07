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

describe('VAT', () => {

	it('is 8% for currency CHF', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 10.00,
			feePaidBy: 'organizer'
		});

		expect(vm.VAT()).to.equal(0.08);
	});

	it('is 0 for currency EUR', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'EUR',
			ticketprice: 10.00,
			feePaidBy: 'organizer'
		});

		expect(vm.VAT()).to.equal(0);
	});

});

describe('Ticketing fee percentage', () => {

	it('is 0% for free tickets', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 0.00,
			feePaidBy: 'organizer'
		});

		expect(vm.feePercentage()).to.equal(0);
	});	

	it('is 7.9% for tickets below 30.-', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 10.00,
			feePaidBy: 'organizer'
		});

		expect(vm.feePercentage()).to.equal(0.079);
	});

	it('is 6.9% for tickets between 30.- and 60.-', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 50.00,
			feePaidBy: 'organizer'
		});

		expect(vm.feePercentage()).to.equal(0.069);
	});

	it('is 5.9% for tickets between 60.- and 120.-', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 70.00,
			feePaidBy: 'organizer'
		});

		expect(vm.feePercentage()).to.equal(0.059);
	});

	it('is 4.9% for tickets between 120.- and 500.-', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 300.00,
			feePaidBy: 'organizer'
		});

		expect(vm.feePercentage()).to.equal(0.049);
	});

	it('is 3.9% for tickets over 500.-', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 700.00,
			feePaidBy: 'organizer'
		});

		expect(vm.feePercentage()).to.equal(0.039);
	});

});

describe('Flat ticketing fee', () => {
	
	it('Is zero for tickets that are not free', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 10.00,
			feePaidBy: 'organizer'
		});

		expect(vm.flatTicketingFee()).to.equal(0);
	});

	it('Is 1.00 for free tickets when using currency CHF', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 0.00,
			feePaidBy: 'organizer'
		});

		expect(vm.flatTicketingFee()).to.equal(1.0);
	});

	it('Is 0.65 for free tickets when using currency EUR', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'EUR',
			ticketprice: 0.00,
			feePaidBy: 'organizer'
		});

		expect(vm.flatTicketingFee()).to.equal(0.65);
	});

});

describe('Total ticketing fee', () => {

	it('Contains all fees and VAT for free tickets', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 0.00,
			feePaidBy: 'organizer'
		});

		var fee = 1;
		var vat = fee * 0.08;

		expect(vm.fee()).to.equal(fee + vat);
	});

	it('Contains all fees and VAT for non-free tickets', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 100.00,
			feePaidBy: 'organizer'
		});

		var fee = 100.0 * 0.059;
		var vat = fee * 0.08;

		expect(vm.fee()).to.equal(fee + vat);
	});

});

describe('Ticket price for the ticket buyer', () => {

	it('Contains the fees if the buyer pays the fees', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 50.00,
			feePaidBy: 'ticketbuyer'
		});

		expect(vm.priceForBuyer()).to.equal(vm.ticketprice() + vm.fee());
	});

	it('Equals the entered ticket price if the organizer pays the fees', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 50.00,
			feePaidBy: 'organizer'
		});

		expect(vm.priceForBuyer()).to.equal(vm.ticketprice());
	});

});

describe('Ticket price paid to the organizer', () => {

	it('Equals the entered ticket price if the buyer pays the fees', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 50.00,
			feePaidBy: 'ticketbuyer'
		});

		expect(vm.paidToOrganizer()).to.equal(vm.ticketprice());
	});

	it('Has the fee deducted if the organizer pays the fees', () => {
		// Instantiate a new AppViewModel
		var vm = new VM({
			currency: 'CHF',
			ticketprice: 50.00,
			feePaidBy: 'organizer'
		});

		expect(vm.paidToOrganizer()).to.equal(vm.ticketprice() - vm.fee());
	});

});