require('dotenv').config();

const db = require('../database')

/**
 * @description base model for all model
 * @property {db} this can be used to access the database
 */

class Model {
  table = '';

  orderBy = 'updated_at';

  //make attribute hidden from response
  hidden = [];

  //get all data from a table in decending order by a field
  async getAll() {
    const rows = await db.query(`SELECT * from ${this.table} ORDER BY ${this.orderBy} DESC`);

    return rows.map(row => this.getAttributes(row));
  }

  async getTotalCount() {
    return await db.query(`SELECT COUNT(*) as count from ${this.table}`)
      .then(res => res[0].count);
  }

  async getById(id) {
    const row = await db.query(`SELECT * FROM ${this.table} WHERE id = ? `, [id])
      .then(res => res[0]);

    return this.getAttributes(row);
  }

  async getOne(fields) {
    let query = `SELECT * FROM ${this.table} WHERE 1=1`;

    const values = [];
    if (fields) {
      const columns = Object.keys(fields);

      columns.forEach(column => {
        query += ` AND ${column} LIKE ?`;
        values.push(fields[column]);
      });
    }

    const row = await db.query(query, values).then(res => res[0]);

    return this.getAttributes(row);
  }

  async getMany(fields) {
    let query = `SELECT * FROM ${this.table} WHERE 1=1`;

    const values = [];
    if (fields) {
      const columns = Object.keys(fields);

      columns.forEach(column => {
        query += ` AND ${column} LIKE ?`;
        values.push(fields[column]);
      });
    }

    return await db.query(query, values).map(row => this.getAttributes(row));
  }

  async getPaginatedList(page, perPage = 20) {
    const offset = (page - 1) * perPage;

    const rows = await db.query(
      `SELECT * FROM ${this.table} LIMIT ? OFFSET ?`,
      [perPage, offset]);

    return rows.map(row => this.getAttributes(row));
  }

  async create(obj) {
    return await db.query(`INSERT INTO ${this.table} SET ?`, obj);
  }

  async update(obj) {
    return await db.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [obj, obj.id]);
  }

  async delete(obj) {
    return await db.query(`DELETE FROM ${this.table} WHERE id = ?`, obj.id);
  }

  async deleteMany(obj) {
    return await db.query(`DELETE FROM ${this.table} WHERE id = ?`, obj.id);
  }

  getAttributes(row) {
    if (!row || !this.hidden.length) {
      return row;
    }

    this.hidden.forEach(hiddenProperty => {
      if (row[hiddenProperty]) {
        delete row[hiddenProperty];
      }
    })

    return row;
  }
}

module.exports = Model
