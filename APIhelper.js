var request = require('request');
var key = require('./config.js').apiKey;

var couponHelper = function(city, callback) {
	
	var options = {
		url: `http://api.sqoot.com/v2/deals?api_key=${key}&location=${city}&order=expires_at&per_page=40`
	}

	request.get(options, function(err, res, body) {
		if (err) {
			console.log(err)
		}
		callback(JSON.parse(body));
	})

}

var categoryList = function(callback) {
  var options = {
    url: `http://api.sqoot.com/v2/categories?api_key=${key}`
  }

  request.get(options, function(err, res, body) {
    if (err) {
      console.log(err)
    }
    callback(JSON.parse(body))
  })
}

module.exports.couponHelper = couponHelper
module.exports.categoryList = categoryList