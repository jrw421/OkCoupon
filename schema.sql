DROP DATABASE IF EXISTS okc;
CREATE DATABASE okc;

USE okc;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  user_name varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE coupons (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  latitude varchar(50) NOT NULL,
  longitude varchar(50) NOT NULL,
  imgUrl varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  price varchar(50) NOT NULL,
  discount varchar(50) NOT NULL,
  merchant varchar(255) NOT NULL,
  url varchar(50) NOT NULL,
  pureUrl varchar(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id),
  UNIQUE KEY `imgUrl_UNIQUE` (`imgUrl`)
);

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  coupon_URL varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id),
  FOREIGN KEY (coupon_URL)
    REFERENCES coupons(imgUrl)
);

-- If first time loading database remember to comment out the drop database the first time.
