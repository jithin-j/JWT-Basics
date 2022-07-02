//Check username, password in post(login) request
//if exist create new JWT
//Send back to front-end

//setup auth so that only request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token", 401);
  }

  const token = authHeader.split(" ")[1];
  //console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError(
      "You are not authorized to access this route...",
      401
    );
  }
};

module.exports = {
  login,
  dashboard,
};
