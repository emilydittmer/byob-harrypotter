
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('students', table => {
      table.string('alias');
      table.string('animagus');
      table.renameColumn('boggtar', 'boggart');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('students', table => {
      table.renameColumn('boggart', 'boggtar');
      table.dropColumn('animagus');
      table.dropColumn('alias');
    }), 
  ])
};
