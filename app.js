const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jwt-simple");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "MY_SECRET_KEY";
const port = process.env.PORT || 5000;
const items = require('./routes/api/items');

app.use(bodyParser.json());
app.use('/api/items', items);
//DB config
const db = require('./config/database').mongoURL;

//connect to database
mongoose
    .connect(db)
    .then(() => console.log('DB Connected ...'))
    .catch(err => console.log(err));

const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: SECRET
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   if (payload.sub === "username") done(null, true);
   else done(null, false);
});

passport.use(jwtAuth);

const requireJWTAuth = passport.authenticate("jwt",{session:false});
app.get("/", requireJWTAuth, (req, res) => {
   res.send("ยอดเงินคงเหลือ 50");
});

const loginMiddleWare = (req, res, next) => {
   if (req.body.username === "username" 
   && req.body.password === "password") next();
   else res.send("Wrong username and password");
};

app.post("/login", loginMiddleWare, (req, res) => {
   const payload = {
      sub: req.body.username,
      iat: new Date().getTime()
   };
   res.send(jwt.encode(payload, SECRET));
});

app.listen(port, () => console.log(`Server started on port ${port}`));