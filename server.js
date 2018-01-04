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

app.get('/helper', (req, res) => {
  apiHelp.couponHelper(10005, (data) => {
    for(var i = 0; i < data.deals.length; i++) {
      var eachDeal = data.deals[i]
      console.log('eachDeal', eachDeal.deal.discount_percentage)
      db.Coupons.findOrCreate({where: {
          imgUrl: eachDeal.deal.image_url, 
          title: eachDeal.deal.title, 
          price: eachDeal.deal.price,
          discount: JSON.stringify(eachDeal.deal.discount_percentage), 
          merchant: eachDeal.deal.merchant.name, 
          url: eachDeal.deal.url,
          saved: 'null' 
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
  db.Coupons.findAll({where: {saved: 'null'}, limit: 10}).then((data) =>{
    res.body = data
    res.status(200).send(data)
  })
})

app.get('/savedCoupons', (req, res) => {
  db.Coupons.findAll({where: {saved: 'true'}, limit: 20}).then((data) =>{
    res.status(200).send(data)
  })
})

// db.Coupons.findOrCreate({where:{imgUrl: 'oBaby', title: 'you', price: 69, discount: 69, merchant: 'you got what I neeed', url: 'oh you say hes just a friend', saved: 'true'}}).spread((Coupons, created) => {
//         console.log(Coupons.get({
//           plain: true
//         }))
//       })








  app.set('port', process.env.PORT || 3000)

  const server = app.listen(app.get('port'))
  console.log(server)
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
