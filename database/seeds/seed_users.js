const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const password = await bcrypt.hash("password", 10);
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: 'Eleazar',
      last_name: 'Harvey',
      email: 'admin@example.com',
      phone_no: '0987654321',
      password: password,
      role: 'admin',
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      phone_no: '0987654321',
      password: password,
      group_id: 1,
    },
  ]);
};
