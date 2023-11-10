/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_groups').del()
  await knex('user_groups').insert([
    {
      name: 'Group 1',
      email: 'group1@example.com',
      contact: '0987654321',
      area: 'Paramatta',
      license: 'license1',
      type: 'agent'
    },
    {
      name: 'Group 1 - 1',
      email: 'group1@example.com',
      contact: '0987654321',
      area: 'Paramatta',
      license: 'license1',
      type: 'agent',
    },
    {
      name: 'Group 2',
      email: 'group2@example.com',
      contact: '0987654321',
      area: 'Central',
      license: 'license2',
      type: 'builder'
    },
  ]);
};
