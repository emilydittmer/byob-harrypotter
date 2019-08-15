const houses = require('../../../datasets/houses');
const students = require('../../../datasets/students');

const createHouse = (knex, house) => {
  return knex('house').insert({
    name: house.name,
    mascot: house.mascot,
    head: house.head,
    ghost: house.ghost,
    founder: house.founder,
    school: house.school,
    color: house.color
  }, 'id')
    .then(houseId => {
      let studentPromises = [];

      
    })
}

exports.seed = function(knex) {
  return knex('students').del()
    .then(() => knex('houses').del())
    .then(() => {
      return Promise.all([
        knex('houses').insert({

        })
      ])
    })
};
