OkCoupon 
---
Welcome to our Legacy!

  The codebase we received was an MVP for a coupon-oriented tinder application. Users would select their location and be matched with coupons from that area. The codebase included a PostgreSQL database, React frontend with React router, NodeJS server with Express, and bootstrap'd styling. 

Our first modification was a refactor of the database in order to allow multiple users on the site instead of one. Also, the database structure and server routes had to be changed, because the original methods involved making a request to the coupon api, storing the results in a database; however, instead of giving those results back to the user, the server then grabbed 20 coupons from the database, which weren't even the same coupons we searched for. 

Next we implemented filtering coupons by multiple or single categories. We added a location feature to each map which pulled up a Google Maps view of the location of the business that the coupon was for. This allows users to easily see how far away a location is without having to leave the site and search for the location. 

We implemented cookies for login sessions and a fake auth for user accounts that simply stored passwords in plaintext. 

Finally we updating some styling in the app before we deployed.
