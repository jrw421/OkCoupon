var Sequelize = require('sequelize');
const sequelize = new Sequelize('d7o1pk4anijasv','jgxipyhybzpgkr', 'a269bfed0e705c8c596db36b90329f4f928ece8403df8834d317ee79b20251ce', {
  host: 'ec2-54-243-61-173.compute-1.amazonaws.com',
  dialect: 'postgres' || 'mysql',
 //  dialect:  'postgres',
 // protocol: 'postgres',
 // port:     match[4],
 // host:     match[3],
 // logging: false,
 dialectOptions: {
     ssl: true
 },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});




// var Sequelize = require('sequelize');
// const sequelize = new Sequelize('okc','root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
//  //  dialect:  'postgres',
//  // protocol: 'postgres',
//  // port:     match[4],
//  // host:     match[3],
//  // logging: false,
//  // dialectOptions: {
//  //     ssl: true
//  // },
//  //  pool: {
//  //  	max: 5,
//  //  	min: 0,
//  //  	idle: 10000
//  //  }
// });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// image url
// title
// price 
// discount
// merchant (name)
// fine print and description - saved and then provided on saved page…
// url


const Coupons = sequelize.define('coupons', {
	imgUrl: {
		type: Sequelize.STRING
	},
	title: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.STRING
	},
	discount: {
		type: Sequelize.STRING
	},
  merchant: {
    type: Sequelize.STRING
  },
  finePrint: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  saved:{
    type: Sequelize.STRING,
    defaultValue: 'null'
  },
  pureUrl:{
    type: Sequelize.STRING
  }
})


Coupons.sync({force: false})

// test data
// Coupons.findOrCreate({where:{imgUrl: 'test', title: 'testing', price: 69, discount: 69, merchant: 'test', finePrint: 'testingggg', description: 'tester', url: 't', saved: 'false'}}).spread((Coupons, created) => {
//         console.log(Coupons.get({
//           plain: true
//         }))
//       })

module.exports = {
  sequelize: sequelize,
  Coupons: Coupons,
}
