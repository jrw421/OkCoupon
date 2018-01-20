var db = require('../db/index2.js');
var helper = require('../APIhelper.js');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
	
let addUser = function(){
	return new Promise((resolve, reject) => {
		db.addUser('Testy McTestFace', 'password', (err, results) => {
			if ( err ) {
				reject(er);
			} else {
				resolve('ok');
			}
		});
	});
}

let authenticateUser = function(){
	return new Promise((resolve, reject) => {
		db.authenticateUser('Testy McTestFace', 'password', (err, results) => {
			if ( err ) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}

let getCoupon = function(){
	return new Promise((resolve, reject) => {
		helper.couponHelper(11102, [], (coupons) => {
			if(coupons) {
				resolve(coupons.deals[0]);
			} else {
				reject(coupons);
			}
		});
	});
}

let saveCoupon = function(coupon){
	authenticateUser().then((response) => {
		let id = response[0].id;
		return new Promise((resolve, reject) => {
			db.addSaved(id, coupon, (err, result) => {
				if ( err ) {
					reject(err);
				} else {
					resolve(result);
				}
			})
		});
	});
}

describe('User Functions', function(){

	describe('signup', function(){
		it('should not throw an error when inserting a new user into the database', function(){
			addUser().then((result) => {
				expect(result).to.equal('ok');
			});
		});
	});

	describe('login', function(){
		it('should return the id of the user inserted', function(){
			authenticateUser().then((result) => {
				result[0].should.have.property('id');
				result[0].id.should.be.a('number');
			});
		});
	});
});

describe('Coupon Functions', function(){
	describe('get coupon', function(){
		it('should grab a coupon from the sqoot API', function(){
			getCoupon().then((result) => {
				expect(result).to.be.a('object');
			}).catch(err => {
				console.log('get coupon error: ', err);
			});
		});
	});

	describe('save coupon', function(){
		it('should save a coupon to the database', function(){
			authenticateUser().then((user) => {
				let id = user[0].id;
				getCoupon().then((result) => {
					let coupon = {
						image_url: result.deal.image_url || 'http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif',
			      url: result.deal.url,
			      title: result.deal.title,
			      merchant_name: result.deal.merchant.name,
			      price: result.deal.price,
			      discount_percentage: result.deal.discount_percentage,
			      id: result.deal.id,
			      lat: result.deal.merchant.latitude,
			      lon: result.deal.merchant.longitude,
			      position: 0,
			      top: 5,
			      left: 0,
			      opacity: 1,
			      mapDisplay: false,
			      saveCount: undefined,
					}
					db.addSaved(id, coupon, (err, result) => {
						expect(err).to.be(null);
					})
				}).catch(err => {
					console.log('get coupon error: ', err);
				});
			});
		});

		it('should delete a coupon from the database', function(){
			authenticateUser().then((user) => {
				let id = user[0].id;
				getCoupon().then((result) => {
					let coupon = {
						image_url: result.deal.image_url || 'http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif',
			      url: result.deal.url,
			      title: result.deal.title,
			      merchant_name: result.deal.merchant.name,
			      price: result.deal.price,
			      discount_percentage: result.deal.discount_percentage,
			      id: result.deal.id,
			      lat: result.deal.merchant.latitude,
			      lon: result.deal.merchant.longitude,
			      position: 0,
			      top: 5,
			      left: 0,
			      opacity: 1,
			      mapDisplay: false,
			      saveCount: undefined,
					}
					db.addSaved(id, coupon, (err, result) => {
						db.deleteSaved(id, coupon.url, (err, result) => {
							expect(err).to.be(null);
						})
					})
				}).catch(err => {
					console.log('get coupon error: ', err);
				});
			});
		});
	});
});

describe('review functions', function(){
	describe('add reviews', function(){
		it('should add a review to a coupon', function(){
			authenticateUser().then((user) => {
				let id = user[0].id;
				getCoupon().then((result) => {
					let coupon = {
						image_url: result.deal.image_url || 'http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif',
			      url: result.deal.url,
			      title: result.deal.title,
			      merchant_name: result.deal.merchant.name,
			      price: result.deal.price,
			      discount_percentage: result.deal.discount_percentage,
			      id: result.deal.id,
			      lat: result.deal.merchant.latitude,
			      lon: result.deal.merchant.longitude,
			      position: 0,
			      top: 5,
			      left: 0,
			      opacity: 1,
			      mapDisplay: false,
			      saveCount: undefined,
					}
					db.addSaved(id, coupon, (err, result) => {
						db.addReview(id, coupon.url, 'Testy McTestFace approves of this coupon!', (err, result) => {
							expect(err).to.be(null);
						});
					});
				}).catch(err => {
					console.log('get coupon error: ', err);
				});
			});
		});
	});
});
