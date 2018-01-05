const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const db = require('./db/index.js')
const apiHelp = require('./APIhelper.js');
const bodyParser = require('body-parser');
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

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
  db.Coupons.findAll({where: {saved: 'null'}, limit: 40}).then((data) =>{
    res.body = data
    res.status(200).send(data)
  })
})

app.get('/savedCoupons', (req, res) => {
  db.Coupons.findAll({where: {saved: 'true'}, limit: 20}).then((data) =>{
    res.status(200).send(data)
  })
})

app.post('/yes', (req, res) => {
  db.Coupons.update({saved: 'true'}, {where: {id: req.body.id}}).then((data) => {
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
  console.log(server)
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
