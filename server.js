const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const db = require('./db/index.js')
const apiHelp = require('./APIhelper.js');
const bodyParser = require('body-parser');
const compiler = webpack(webpackConfig);
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');

passport.use(Auth0Strategy);
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
app.post('/user', (req, res) => {
  console.log('what is the req in server ', req.body.user_name)

  db.Coupons.findAll({where: {user_name: req.body.user_name, password: req.body.password}})
    .then(() => {
      // res.redirect('/')
      Coupons.findAll({
        include: [{
          model: Users
        }]
      })
      .then((data) => {
        res.send("SUCCESSSSS")
      })
    })
    // .catch(() => {
    //   res.redirect('/newUser')
    // })
})
//where id is username id
// db.Coupons.findAll({where: {user_name: req.body.user_name}}) //FIX THIS
// .then((data) => {
//   res.status(200).send(data)
// })  //, saved: 'true'


app.post('/newUser', (req, res) => {
  console.log('req for POST ', req.body)
  db.Users.create({
    user_name: req.body.user_name,
    password: req.body.password
  })
  .then((data) => {
    res.status(200).send(data)
  })
  .catch(() => {
    res.send('oops')
  })
})

app.post('/helper', (req, res) => {

  apiHelp.couponHelper(req.body.postal, (data) => {
    for(var i = 0; i < data.deals.length; i++) {
      var eachDeal = data.deals[i]
      db.Coupons.findOrCreate({where: {
          imgUrl: eachDeal.deal.image_url,
          title: eachDeal.deal.title,
          price: JSON.stringify(eachDeal.deal.price),
          discount: JSON.stringify(eachDeal.deal.discount_percentage),
          merchant: eachDeal.deal.merchant.name,
          url: eachDeal.deal.url,
          pureUrl: eachDeal.deal.untracked_url
        }
      })
        .spread((Teams, created) => {
          console.log(Teams.get({
            plain: true
          }))
      })
    }
    res.status(200).send('done!')
  })
})

app.get('/arrayCoupons', (req, res) => {
  db.Coupons.findAll({where: {saved: 'null'}, limit: 40}).then((data) => {
    res.body = data
    res.status(200).send(data)
  })
})

app.get('/savedCoupons', (req, res) => {
  db.Coupons.findAll({where: {saved: 'true'}}).then((data) =>{
    res.status(200).send(data)
  })
})

app.post('/yes', (req, res) => {
  db.Coupons.update({saved: 'true'}, {where: {id: req.body.id}}).then((data) => { //don't update, save
    res.status(201).send('updated to true')
  })
})

app.post('/no', (req, res) => {
  db.Coupons.update({saved: 'false'}, {where: {id: req.body.id}}).then((data) => {
    res.status(201).send('updated to false')
  })
})


  app.set('port', process.env.PORT || 3000)

  const server = app.listen(app.get('port'))
  // console.log(server)
  // const host = server.address().address;
  // const port = server.address().port;
  // console.log('Example app listening at http://%s:%s', host, port);
