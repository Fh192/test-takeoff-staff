const db = require('../db');

class ContactsController {
  async getContacts(req, res) {
    const { q = '' } = req.query;

    const conditions = [
      `phone_number LIKE('%${q.trim()}%')`,
      `LOWER(name) LIKE(LOWER('%${q}%'))`,
    ];

    const condition = q ? `WHERE ${conditions.join(' OR ')}` : '';

    const { rows: contacts } = await db.query(
      `SELECT * FROM contacts ${condition}`
    );

    res.send(contacts);
  }

  async addContact(req, res) {
    const { contact } = req.body;
    const { phone_number, name } = contact;

    await db.query(
      `INSERT INTO contacts (phone_number, name) 
       VALUES ('${phone_number}', '${name}')`
    );

    const { rows: contacts } = await db.query(`SELECT * FROM contacts`);

    res.send(contacts);
  }

  async updateContact(req, res) {
    const { id } = req.params;
    const { contact } = req.body;
    const { phone_number, name } = contact;

    await db.query(
      `UPDATE contacts SET phone_number = '${phone_number}', name = '${name}'
       WHERE id = ${id}`
    );

    const { rows: contacts } = await db.query(`SELECT * FROM contacts`);

    res.send(contacts);
  }

  async deleteContact(req, res) {
    const { id } = req.params;

    await db.query(`DELETE FROM contacts WHERE id = ${id}`);

    const { rows: contacts } = await db.query(`SELECT * FROM contacts`);

    res.send(contacts);
  }
}

module.exports = new ContactsController();
