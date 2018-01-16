var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'okc'
});

module.exports.authenticateUser = function(user, password, callback) {
  connection.query(`SELECT user_name, password FROM users WHERE (user_name, password) = ('${user}', '${password}')`), function(err, results) {
    // if (results.length > 0) {
    //
    // }
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  }
}

module.exports.addUser = function(user, password, callback) {
  connection.query(`SELECT user_name FROM users WHERE (user_name) = ('${user}')`), function(err, results) {
    if (results.length === 0) {
      connection.query(`INSERT INTO users (user_name, password) VALUES ('${user}', '${password}')`), function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      }
    } else {
    callback(null, [])
  }
};

module.exports.addSaved = function(user, coupon, callback) {
  connection.query(`SELECT (id) from Users WHERE (user_name) = ('${user}')`), function(err, results) {
    connection.query(`INSERT INTO coupons (user_id, latitude, longitude, imgUrl, title, price, discount, merchant, url, pureUrl) VALUES
    ('${results[0].id}', '${coupon.latitude}', '${coupon.longitude}', '${coupon.imgUrl}', '${coupon.title}', '${coupon.price}', '${coupon.discount}', '${coupon.merchant}', '${coupon.url}', '${coupon.pureUrl}') `, function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  }
};

module.exports.getSaved = function(user, callback) {
  connection.query(`SELECT (id) from Users WHERE (username) = ('${user}')`), function(err, results) {
    connection.query(`SELECT * from coupons WHERE (user_id) = ('${results[0].id}')`), function(err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  }
};
