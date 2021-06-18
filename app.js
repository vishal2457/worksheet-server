var log4js = require("log4js");
var express = require("express");
var path = require("path");
var helmet = require("helmet");
var db = require("./models");
var cors = require("cors");
var compression = require("compression");
var app = express();
const httpServer = require("http").createServer(app);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");




/**
 * * Database connection
 */
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database Authenticated");
  })
  .catch((err) => {
    logger.error("Database authentication error", err);
    console.log(err, "this is error");
  });

/**
 * * Running this script will sync models to db
 * ! .sync({force: true}), WILL SYNC EXISTING MODELS CHANGES BUT WILL DELETE ALL DATA
 */
  // db.sequelize
  //   .sync()
  //   .then(() => {
  //     console.log("Database Synced with models");
  //   })
  //   .catch((err) => {
  //     logger.error("Database sync error", err);
  //     console.log(err, "this is error");
  //   });



app.use(cors())
.use(helmet())
.use(compression())
// .use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }))
.use(express.json({limit: '50mb'}))
.use(express.urlencoded({limit: '50mb', extended: true}))
.use(
  helmet.frameguard({
    action: "deny",
  })
);




//app.use(limiter);
app.all("/*", function (req, res, next) {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.end();
    return false;
  }
  next();
});







app.use(function (request, response, next) {
  next();
});

//require all application routes
require('./routes')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("error");
});

// let routes = []
// app._router.stack.forEach(function(middleware){
//     if(middleware.route){ // routes registered directly on the app
//         routes.push(middleware.route);
//     } else if(middleware.name === 'router'){ // router middleware
//         middleware.handle.stack.forEach(function(handler){
//             route = handler.route;
//             route && routes.push(route);
//         });
//     }
// });

// console.log(routes, "THIS ARE ROUTES");

// error handler
app.use(function (err, req, res, next) {
  // console.log(err, "this is error");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  logger.error("Something went wrong:", err);
  // res.status(err.status || 500);
  res.render("error");
});
//
// const options = {
//   key: fs.readFileSync('http://orientcounsellingtool.cipla.com/opt/privateKey.key'),
//   cert: fs.readFileSync('http://orientcounsellingtool.cipla.com/opt/CRT')
// };


let port = 5000
httpServer.listen(port, () => console.log(`Magic happens at port ${port}`) );

//module.exports = app;
