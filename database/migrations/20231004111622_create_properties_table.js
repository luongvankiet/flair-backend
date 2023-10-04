/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('properties', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.string('status').nullable();
    table.string('type').nullable();
    table.string('property_type').nullable();
    table.string('approved').nullable();
    table.bigInteger('min_price').nullable();
    table.bigInteger('max_price').nullable();
    table.double('longitude').nullable();
    table.double('latitude').nullable();
    table.string('address').nullable();
    table.string('suburb').nullable();
    table.string('country').nullable();
    table.string('postcode').nullable();
    table.bigInteger('commission_amount').nullable();
    table.string('commission_type').nullable();
    table.integer('created_by')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.integer('property_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('properties')
      .onDelete('SET NULL');

    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('properties');
};
