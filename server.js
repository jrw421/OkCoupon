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
  let u = req.body.user_name;

  console.log('logging in: ', u, p);
  db.deleteSaved(u, (err, data) => {
    if (data.length) {
      res.send(data);
    } else {
      res.status(404).end()
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


  app.set('port', process.env.PORT || 3000)

  const server = app.listen(app.get('port'))
  // console.log(server)
  // const host = server.address().address;
  // const port = server.address().port;
  // console.log('Example app listening at http://%s:%s', host, port);
