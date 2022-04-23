const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

module.exports.register = (req,res,next) => {
    let user = new User();
  let newPass = req.body.password
    
    user.name = req.body.name;
    user.email = req.body.email;
    
    var BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(newPass, BCRYPT_SALT_ROUNDS)
      .then(function(hashedPassword) {
          console.log(hashedPassword)
        user.password =hashedPassword;
        user.save((err,result)=>{
        if(!err){
            res.send({
                'success' : true,
                'message': 'sucessfully registered',
              });
        }else{
            res.send(err)
        }
        });
    });  
},

module.exports.login = (req,res,next)=>{
    let password = req.body.password
    
        console.log('password', password)
		User.findOne({  email: req.body.email  }, function (err, userInfo) {

			if (userInfo) {
                // console.log(userInfo.password,password)
				if (bcrypt.compareSync(password, userInfo.password)) {
                    
					const token = jwt.sign({ id: userInfo._id,name:userInfo.name,email:userInfo.email }, process.env.privateKey, { expiresIn: '5h' });
                    // console.log(token,'loginnnnnnnnnnn');
                    res.send({
                        status: 1, token: token, message: "Login successfull", user_details: {
                            name: userInfo.name, email: userInfo.email
                        }
                    });
				} else {
					res.status(400).send({ status: 0, message: "Email/User ID or password is wrong", data: [] });
				}


			} else {
				res.status(400).send({ status: 0, message: "Invalid email/User Id", data: [] });
			}

		});
}


module.exports.getData = async (req,res) => {
    let alldata = await User.find().count();
    res.send({
        status: 1, data : alldata
    });
}

