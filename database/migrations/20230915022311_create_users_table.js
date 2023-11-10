/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('mobile_no').nullable();
    table.string('phone_no').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').nullable();
    table.string('license').nullable();
    table.string('account_type').nullable();
    table.string('company').nullable();
    table.string('address_line_1').nullable();
    table.string('address_line_2').nullable();
    table.string('suburb').nullable();
    table.string('country').nullable();
    table.string('postcode').nullable();
    table.timestamp('verified_license_at').nullable();
    table.timestamp('verified_email_at').nullable();
    table.integer('group_id')
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
  return knex.schema.dropTable('users');
};
