const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthController {
  async auth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!user) return res.status(400).send('Usuário não encontrado');

    if (!(await bcrypt.compare(password, user.password))) return res.status(400).send('Autenticação inválida');

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 100000,
    });

    return res.send({ user, token });
  }
}

module.exports = new AuthController();
