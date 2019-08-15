
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('houses', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('mascot');
      table.string('head');
      table.string('ghost');
      table.string('founder');
      table.string('school');
      table.string('color');
      table.timestamps(true, true);
    }
  ), 
  knex.schema.createTable('students', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('role');
    table.integer('house_id').unsigned();
    table.foreign('house_id').references('houses.id')
    table.string('school');
    table.string('wand');
    table.string('boggtar');
    table.string('patronus');
    table.boolean('ministryOfMagic');
    table.boolean('orderOfThePhoenix');
    table.boolean('dumbledoresArmy');
    table.boolean('deathEater');
    table.string('bloodStatus');
    table.string('species');
    table.timestamps(true, true);
  })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('students'), 
    knex.schema.dropTable('houses')
  ])
};
