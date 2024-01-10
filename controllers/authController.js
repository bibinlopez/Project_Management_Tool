const CustomError = require('../errors/customError');
const User = require('../models/userSchema');

const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ role, ...req.body });

  const token = user.createJWT();

  return res.status(201).json({ success: true, msg: 'Created...', token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError('Empty input fields', 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('No account found, Please register', 401);
  }
  if (user.password !== password) {
    throw new CustomError('Invalid password', 401);
  }

  const token = user.createJWT();
  return res.status(200).json({ success: true, token });
};

module.exports = { register, login };
