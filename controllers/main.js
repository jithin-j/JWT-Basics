//Check username, password in post(login) request
//if exist create new JWT
//Send back to front-end

//setup auth so that only request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //Just for Demo, normally provided by the db
  const id = new Date().getDate();

  //Try to keep the payload small for better user experience
  //Just for demo, but in real projects use JWT_Secret as long unguessable string values
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User created", token });
  console.log(username, password);
  //res.send("Fake Login/Signup/Register route");
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
