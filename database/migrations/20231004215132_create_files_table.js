/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('files', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('url').nullable();
    table.string('type').notNullable();
    table.integer('property_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('properties')
      .onDelete('CASCADE');
    table.integer('created_by')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('files');
};
