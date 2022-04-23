const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  token = token.split(' ')[1];
  
  // console.log(token,'1111' , process.env.privateKey)
  if (!token) return res.status(400).send({status:0,message:"Access denied. No token provided."});

  try {
    const decoded = jwt.verify(token, process.env.privateKey);
    console.log(decoded,'decodeeeeee');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({status:0,message:"Access denied. Invalid Token."});
  }
};