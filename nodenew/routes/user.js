const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const upload = require('../uploadMiddleware');

const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup", upload.single('image'),
  [
    check("phoneNumber", "Please Enter a Valid phoneNumber")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }),
    check("address", "Please enter address")
      .not()
      .isEmpty(),
    check("dob", "Please enter dob")
      .not()
      .isEmpty(),
    // check("securityQuestion", "Please enter securityQuestion")
    // .not()
    // .isEmpty(),

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      phoneNumber,
      email,
      password,
      address,
      dob,
      securityQuestion,
      files,
      answer1,
      answer2,
      answer3,
      question1
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        phoneNumber,
        email,
        password,
        address,
        dob,
        securityQuestion,
        files,
        answer1,
        answer2,
        answer3,
        question1
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const data = user.save();
      await data

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString", {
        expiresIn: 10000
      },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.get(
  '/getUser/:email',
  async (req, res) => {
    const email = req.params.email
    let user = await User.findOne({
      email
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });
    res.status(200).json({
      user
    });
  }
)

router.put(
  // Update a Note with noteId
  '/updateUser/:id',
  async (req, res) => {
    //console.log(req)
    let user_details={};
    const id = req.params.id
    // Validate Request
    

    User.findOne({
      _id: id
    }).then(function (user) {
      user_details=user
    })
   

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
      
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : user_details.phoneNumber,
      dob: req.body.dob ? req.body.dob : user_details.dob,
      address: req.body.address ? req.body.address : user_details.address,
      files: req.body.files ? req.body.files : user_details.files
    }, { new: true })
      .then(id => {

        if (!id) {
          return res.status(404).send({
            message: "Note not found with id " + req.params.id
          });
        }
        res.send(id);
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Note not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Error updating note with id " + req.params.id
        });
      });
  }

)


router.put(
  "/reset-password/:id",

  async (req, res) => {
    const { currentPassword, newPassword, email } = req.body;
    const id = req.params.id
    try {
      User.findOne({
        _id: id
      }).then(function (user) {
        if (!user) {
          return throwFailed(res, 'No user found with that email address.')
        }
        else {
          bcrypt.compare(currentPassword, user.password, function (err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
            } else {
              const saltRounds = 10

              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  throw err
                } else {
                  bcrypt.hash(newPassword, salt, function (err, hash) {
                    if (err) {
                      throw err
                    } else {
                      // console.log(hash,'new password')

                      User.findByIdAndUpdate(req.params.id, {
                        password: hash,
                      }, { new: true })
                        .then(id => {

                          if (!id) {
                            return res.status(404).send({
                              message: "Note not found with id " + req.params.id
                            });
                          }
                          res.send(id);
                        }).catch(err => {
                          if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                              message: "Note not found with id " + req.params.id
                            });
                          }
                          return res.status(500).send({
                            message: "Error updating note with id " + req.params.id
                          });
                        });
                    }
                  })
                }
              })
            }
          })
        }
      })
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token, 'email': email, "id": user.id
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);



module.exports = router;