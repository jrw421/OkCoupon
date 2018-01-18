var request = require('request');
var key = require('./config.js').apiKey;

var couponHelper = function(city, categories, callback) {
  ///////////////////////////////////////////////////////////// AARON
	if (categories.length) {
    var filter = '&category_slugs='
    categories.forEach((category) => {
      filter += category + ','
    })
  } else {
    var filter = ''
  }

  filter = filter.slice(0,-1)
  ///////////////////////////////////////////////////////////// 
	var options = {
		url: `http://api.sqoot.com/v2/deals?api_key=${key}&location=${city}&order=expires_at&per_page=40${filter}`
	}

  // console.log('doing ,', options.url)
	request.get(options, function(err, res, body) {
		if (err) {
			console.log(err)
		}
		console.log('response body: ', JSON.parse(body));
		callback(JSON.parse(body));
	})

}
///////////////////////////////////////////////////////////// AARON
var categoryList = function(callback) {
  var options = {
    url: `http://api.sqoot.com/v2/categories?api_key=${key}`
  }

  request.get(options, function(err, res, body) {
    if (err) {
      console.log(err)
      callback([])
    }
    // console.log('json: ', JSON.parse(body).categories);
    callback(JSON.parse(body).categories)
  })
}
/////////////////////////////////////////////////////////////
module.exports.couponHelper = couponHelper
module.exports.categoryList = categoryList