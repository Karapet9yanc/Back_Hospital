const Problems = require('../../db/models/task/schemaProblems');

module.exports.createNewProblems = ("/newProblems", (req, res) => {
  if (
    req.body.hasOwnProperty("name") &&
    req.body.hasOwnProperty("doctor") &&
    req.body.hasOwnProperty("date") &&
    req.body.hasOwnProperty("problem")
  ) {
    const problems = new Problems(req.body);
    problems.save().then((result) => {
      res.send({ data: result });
    });
  } else {
    res.status(500).send("Error. Check the spending");
  }
});

module.exports.getAllProblems = ("/allProblems", (req, res) => {
  Problems.find().then((result) => {
    res.send({ data: result });
  });
});