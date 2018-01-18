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

// app.use(webpackDevMiddleware(compiler, {
//   hot: true,
//   filename: 'bundle.js',
//   publicPath: '/',
//   stats: {
//     colors: true,
//   },
//   historyApiFallback: true,
// }));

//FOR PASSPORT
// var strategy = new Auth0Strategy({
//    domain:       'localhost',
//    clientID:     'your-client-id',
//    clientSecret: 'your-client-secret',
//    callbackURL:  '/callback'
//   },
//   function(accessToken, refreshToken, extraParams, profile, done) {
//     return done(null, profile);
//   }
// };

//if user_name is found - get all saved coupons
// app.post('/user', (req, res) => {
//   console.log('what is the req in server ', req.body.user_name)

//   db.Coupons.findAll({where: {user_name: req.body.user_name, password: req.body.password}})
//     .then(() => {
//       // res.redirect('/')
//       Coupons.findAll({
//         include: [{
//           model: Users
//         }]
//       })
//       .then((data) => {
//         res.send("SUCCESSSSS")
//       })
//     })
//     // .catch(() => {
//     //   res.redirect('/newUser')
//     // })
// })
//where id is username id
// db.Coupons.findAll({where: {user_name: req.body.user_name}}) //FIX THIS
// .then((data) => {
//   res.status(200).send(data)
// })  //, saved: 'true'


// app.post('/newUser', (req, res) => {
//   console.log('req for POST ', req.body)
//   db.Users.create({
//     user_name: req.body.user_name,
//     password: req.body.password
//   })
//   .then((data) => {
//     res.status(200).send(data)
//   })
//   .catch(() => {
//     res.send('oops')
//   })
// })

//////////////////////////////// ETHAN
app.post('/signUp', (req, res) => {
  let u = req.body.user_name;
  let p = req.body.password;
  // console.log('u and p ', u, ' ', p)
  // save a new username/password combo to users table
  db.addUser(u, p, () => {
    // redirect to login page
    res.status(201).end(); // still need to create /login page in react router.
  });
});

app.post('/login', (req, res) => {
  let u = req.body.user_name;
  let p = req.body.password;
  // console.log('logging in: ', u, p);
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

app.get('userData', (req, res) => {
  let u = req.body.username;
  // get all user's saved coupons:
  db.getSaved(u, () => {
    res.status(302).redirect('/saved');
  });
});

//////////////////////////////////////

app.post('/helper', (req, res) => {
  apiHelp.couponHelper(req.body.postal, req.body.filter, (data) => {
    var newData = []
    data.deals.forEach((eachDeal) => {
      var newDeal = {
            latitude: eachDeal.deal.merchant.latitude.toString(),
            longitude: eachDeal.deal.merchant.longitude.toString(),
            imgUrl: eachDeal.deal.image_url,
            title: eachDeal.deal.title,
            price: JSON.stringify(eachDeal.deal.price),
            discount: JSON.stringify(eachDeal.deal.discount_percentage),
            merchant: eachDeal.deal.merchant.name,
            url: eachDeal.deal.url,
            pureUrl: eachDeal.deal.untracked_url
          }
        newData.push(newDeal)
    })
    res.status(200).send(newData)
  });
});

// app.post('/helper', (req, res) => {

//   apiHelp.couponHelper(req.body.postal, req.body.filter, (data) => {
//     for(var i = 0; i < data.deals.length; i++) {
//       // console.log('data.deald[i]: ', data.deals[i]);
//       var eachDeal = data.deals[i]
//       db.Coupons.findOrCreate({where: {
//           latitude: eachDeal.deal.merchant.latitude.toString(),
//           longitude: eachDeal.deal.merchant.longitude.toString(),
//           imgUrl: eachDeal.deal.image_url,
//           title: eachDeal.deal.title,
//           price: JSON.stringify(eachDeal.deal.price),
//           discount: JSON.stringify(eachDeal.deal.discount_percentage),
//           merchant: eachDeal.deal.merchant.name,
//           url: eachDeal.deal.url,
//           pureUrl: eachDeal.deal.untracked_url
//         }
//       })
//         .spread((Teams, created) => {
//           console.log(Teams.get({
//             plain: true
//           }))
//       })
//     }
//     res.status(200).send('done!')
//   });
// });

// app.get('/arrayCoupons', (req, res) => {
//   db.Coupons.findAll({where: {saved: 'null'}, limit: 40}).then((data) => {
//     res.body = data
//     res.status(200).send(data)
//   })
// })
//
app.get('/savedCoupons', (req, res) => {
  console.log('id: ', req.query.userID);
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

// for(var i = 0; i < data.deals.length; i++) {
//   // console.log('data.deald[i]: ', data.deals[i]);
//   var eachDeal = data.deals[i]
//   db.Coupons.findOrCreate({where: {
//       latitude: eachDeal.deal.merchant.latitude.toString(),
//       longitude: eachDeal.deal.merchant.longitude.toString(),
//       imgUrl: eachDeal.deal.image_url,
//       title: eachDeal.deal.title,
//       price: JSON.stringify(eachDeal.deal.price),
//       discount: JSON.stringify(eachDeal.deal.discount_percentage),
//       merchant: eachDeal.deal.merchant.name,
//       url: eachDeal.deal.url,
//       pureUrl: eachDeal.deal.untracked_url
//     }
//   })
//     .spread((Teams, created) => {
//       console.log(Teams.get({
//         plain: true
//       }))
//   })
// }

////////////////////////////////////////////////////////////////////////// ETHAN
// instead of storing all items and then updating items on 'yes', only save items on yes
// and remove the 'no' route altogether.
app.post('/yes', (req, res) => {
  let u = req.body.userID;
  let c = req.body.data;
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
