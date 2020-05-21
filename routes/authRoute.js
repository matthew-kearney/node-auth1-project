const bcryptjs = require("bcryptjs");

 const router = require("express").Router();

 const Users = require("./route-model");
 const { isValid } = require("../auth/protected-middleware");


 //POST /api/auth/register
 router.post("/register", (req, res) => {
   const credentials = req.body;

   if (isValid(credentials)) {
     const rounds = process.env.BCRYPT_ROUNDS || 16;

     
     const hash = bcryptjs.hashSync(credentials.password, rounds);
     credentials.password = hash;

     
     Users.add(credentials)
       .then(user => {
         req.session.loggedIn === true;
         res.status(201).json({ data: user });
       })
       .catch(error => {
         res.status(500).json({ message: error.message });
       });
   } else {
     res.status(400).json({
       message: "please provide username and password and the password shoud be alphanumeric",
     });
   }
 });


 
 router.post("/login", (req, res) => {
   const { username, password } = req.body;

   if (isValid(req.body)) {
     Users.findBy({ username: username })
       .then(([user]) => {
         
         if (user && bcryptjs.compareSync(password, user.password)) {
           
           req.session.loggedIn = true;
           req.session.user = user;

           res.status(200).json({ message: "Welcome to our API" });
         } else {
           res.status(401).json({ message: "Invalid credentials" });
         }
       })
       .catch(error => {
         res.status(500).json({ message: error.message });
       });
   } else {
     res.status(400).json({
       message: "please provide username and password and the password shoud be alphanumeric",
     });
   }
 });


 

 module.exports = router;