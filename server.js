const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const db = require('./db/index2.js')
const apiHelp = require('./APIhelper.js');
const bodyParser = require('body-parser');
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

//////////////////////////////// ETHAN
app.post('/signUp', (req, res) => {
  let u = req.body.user_name;
  let p = req.body.password;
  // save a new username/password combo to users table
  db.addUser(u, p, () => {
    // redirect to login page
    res.status(201).end();
  });
});

app.post('/login', (req, res) => {
  let u = req.body.user_name;
  let p = req.body.password;
  db.authenticateUser(u, p, (err, data) => {
    // console.log('data ', data[0].id) //cookie
    if (data.length) {
      res.send(data);
    } else {
      res.status(404).end()
    }
  });
});

app.post('/delete', (req, res) => {
  let i = req.body.params.userID;
  let c = req.body.params.couponURL;

  console.log('deleting: ', i, c);
  db.deleteSaved(i, c, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('in server ')
      res.status(200).send(data)
    }
  });
})

app.get('/userData', (req, res) => {
  let u = req.body.username;
  // get all user's saved coupons:
  db.getSaved(u, () => {
    res.status(302).redirect('/saved');
  });
});


/////////////Reviews//////////////////

app.post('/reviews', (req, res) => {
  let i = req.body.params.userID;
  let c = req.body.params.couponURL;
  let d = req.body.params.description;

  console.log('here is your review data ', i, c, d)

  db.addReview(i, c, d, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('data ', data)
      res.status(200).send(data)
    }
  });
})

app.get('/reviews', (req, res) => {
  let c = req.query.couponURL;
  console.log('whats body ', req.query.couponURL)
  // get all user's saved coupons:
  db.getReviews(c, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('data ', data)
      res.status(200).send(data);
    }
  });
});

app.post('/deleteReview', (req, res) => {
  let i = req.body.params.userID;
  let c = req.body.params.couponURL;

  console.log('deleting: ', i, c);
  db.deleteReview(i, c, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('in server ')
      res.status(200).send(data)
    }
  });
})

app.get('/userInfo', (req, res) => {
  let i = req.query.userID;
  console.log('what is i ', i)
  // get all user's saved coupons:
  db.getUserInfo(i, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('data ', data)
      res.status(200).send(data);
    }
  });
});

//////////////////////////////////////

app.post('/helper', (req, res) => {
  let savedCoupons = {};
  db.getSaved(req.body.userID, (err, data) => {
    if ( err ) {
      console.error(err);
    } else {
      if ( data.length ) {
        data.forEach(deal => {
          savedCoupons[deal.imgUrl] = true
        });
      }
    }
  });

  apiHelp.couponHelper(req.body.postal, req.body.filter, (data) => {
    var newData = [];
    data.deals.forEach((eachDeal) => {
      // check if coupon is already in user's saved coupons:
      if ( savedCoupons[eachDeal.deal.image_url] === undefined ) {
        console.log('newDeal url: ', eachDeal.deal.url);
        var newDeal = {
              latitude: eachDeal.deal.merchant.latitude.toString(),
              longitude: eachDeal.deal.merchant.longitude.toString(),
              imgUrl: eachDeal.deal.image_url,
              title: eachDeal.deal.title,
              price: JSON.stringify(eachDeal.deal.price),
              discount: JSON.stringify(eachDeal.deal.discount_percentage),
              merchant: eachDeal.deal.merchant.name,
              url: eachDeal.deal.url,
              pureUrl: eachDeal.deal.untracked_url,
              id: eachDeal.deal.id
            }
        newData.push(newDeal)
      } else {
        console.log('you already saved this deal. skipping to the next one.');
      }
    });
    res.status(200).send(newData)
  });
});

app.get('/savedCoupons', (req, res) => {
  db.getSaved(req.query.userID, (err, data) => {
    res.status(200).send(data)
  });
});

app.get('/saveCount', (req, res) => {
  console.log('image_url to look up: ', req.query.image_url);
  db.getSaveCount(req.query.image_url, (err, data) => {
    if ( err ) {
      console.error('db.getSaveCount error: ', err);
      res.end();
    } else {
      res.send(data);
    }
  });
});

////////////////////////////////////////////////////////////////////////// ETHAN
// instead of storing all items and then updating items on 'yes', only save items on yes
// and remove the 'no' route altogether.
app.post('/yes', (req, res) => {
  let u = req.body.userID;
  let c = req.body.data;
  console.log('coupon data: ', c);
  db.addSaved(u, c, () => {
    res.status(201).send('saved coupon to db.');
  });

});

//////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////// AARON
app.get('/categories', (req, res) => {
  apiHelp.categoryList((categories) => {
    res.status(200).send(categories)
  });
});
/////////////////////////////////////////////////////////////


  app.set('port', process.env.PORT || 3306)

  const server = app.listen(app.get('port'))
  // console.log(server)
  // const host = server.address().address;
  // const port = server.address().port;
  // console.log('Example app listening at http://%s:%s', host, port);
