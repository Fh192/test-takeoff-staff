const db = require('../db');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const { rows, rowCount } = await db.query(
      `SELECT (login) FROM users WHERE password = '${password}' AND email = '${email}'`
    );

    const response = {
      login: rowCount === 1 ? rows[0].login : null,
      error: rowCount === 1 ? null : 'Incorrect email or password',
    };

    res.send(response);
  }
}

module.exports = new AuthController();
