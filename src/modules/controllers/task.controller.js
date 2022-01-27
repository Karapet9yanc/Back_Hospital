const User = require('../../db/models/task/index');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_ACCESS_SECRET

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.regUsers = ("/createUser", (req, res) => {
  if (req.body.hasOwnProperty("login") && req.body.hasOwnProperty("password")) {

    const hashPassword = bcrypt.hashSync(req.body.password, 6);
    const user = new User({ login: req.body.login, password: hashPassword });
    User.findOne({ login: req.body.login }).then((result) => {
      if (result) {
        res.status(404).send("err");
      } else {
        user.save().then((result) => {
          const token = generateAccessToken(result._id);
          res.send({ data: result, token });
        });
      }
    });
  } else {
    res.status(404).send("Error not log or pas");
  }
});

module.exports.logIn = ("/logIn", (req, res) => {
  if (req.body.hasOwnProperty("login") && req.body.hasOwnProperty("password")) {
    User.findOne({ login: req.body.login }).then((result) => {
      if (result) {
        const checkPassword = bcrypt.compareSync(
          req.body.password,
          result.password
        )
        if (!checkPassword) {
          res.status(404).send("error password");
        } else {
          const token = generateAccessToken(result._id);
          res.send(token);
        }
      } else {
        res.status(404).send("error login");
      }
    });
  } else {
    res.status(404).send("Error");
  }
});

// module.exports.createNewProblems = ("/newProblems", (req, res) => {
//     if (
//       req.body.hasOwnProperty("name") &&
//       req.body.hasOwnProperty("doctor") &&
//       req.body.hasOwnProperty("date") &&
//       req.body.hasOwnProperty("problem")
//     ) {
//       const problems = new Problems(req.body);
//       problems.save().then((result) => {
//         res.send({ data: result });
//       });
//     } else {
//       res.status(500).send("Error. Check the spending");
//     }
//   });

// module.exports.getAllProblems = ("/allProblems", (req, res) => {
//   Problems.find().then((result) => {
//     res.send({ data: result });
//   });
// });

// module.exports.createNewPurchase = (req, res, next) => {
//   if (
//     req.body.hasOwnProperty("shop") &&
//     req.body.hasOwnProperty("date") &&
//     req.body.hasOwnProperty("price")
//   ) {
//     const purchases = new Purchase(req.body);
//     purchases.save().then((result) => {
//       res.send({ data: result });
//     });
//   } else {
//     res.status(500).send("Error. Check the spending");
//   }
// };

// module.exports.changePurchaseInfo = (req, res) => {
//   if (
//     (req.body.hasOwnProperty("shop") && req.body.hasOwnProperty("date")) ||
//     req.body.hasOwnProperty("price")
//   ) {
//     Purchase.updateOne({ _id: req.body._id }, req.body).then((result) => {
//       Purchase.find().then((result) => {
//         res.send({ data: result });
//       });
//     });
//   } else {
//     res.status(500).send("Error");
//   }
// };

// module.exports.deletePurchase = (req, res) => {
//   if (req.query._id) {
//     Purchase.deleteOne({ _id: req.query._id }).then((result) => {
//       Purchase.find().then((result) => {
//         res.send({ data: result });
//       });
//     });
//   } else {
//     res.status(500).send("Error");
//   }
// };
