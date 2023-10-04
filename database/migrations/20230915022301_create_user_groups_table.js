/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_groups', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('contact').nullable();
    table.string('area').notNullable();
    table.string('license').notNullable();
    table.string('type').notNullable();
    table.integer('parent_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('user_groups')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_groups');
};
