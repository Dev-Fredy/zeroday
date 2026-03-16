const db = require("./../config/db");

const bcyrpt = require("bcrypt");

class User {
  async readAll() {
    const query = `select * from user`;

    const [results] = await db.execute(query);

    return results;
  }

  async deleteUser(id) {
    const query = `delete from user where id = ?`;

    let [result] = await db.execute(query, [id]);

    return result;
  }

  async searchUser(data) {
    const query = `select * from user where user.email like ? order by user.first_name desc;`;

    const [results] = await db.execute(query, [`${data}%`]);

    return results;
  }

  async readUser(email) {
    const query = `select * from user where email = ?`;

    const [results] = await db.execute(query, [email]);

    return results;
  }

  async create(data) {
    const { first_name, last_name, email, password, phone } = data;

    const newPassword = await bcyrpt.hash(password, 10);

    const query = `insert into user (first_name, last_name, email, password, phone) values (?,?,?,?,?)`;
    const [results] = await db.execute(query, [
      first_name,
      last_name,
      email,
      newPassword,
      phone,
    ]);

    return results;
  }
}

module.exports = User;
