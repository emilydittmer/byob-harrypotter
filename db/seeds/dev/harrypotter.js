const housesData = require('../../../datasets/houses');
const studentsData = require('../../../datasets/students');

exports.seed = function(knex) {
  return knex('students').del()
    .then(() => knex('houses').del())
    .then(async () => {
      await knex.raw('TRUNCATE TABLE houses RESTART IDENTITY CASCADE');
      await knex.raw('TRUNCATE TABLE students RESTART IDENTITY CASCADE');
    })
    .then(() => {
      return knex('houses').insert(housesData);
    })
    .then(() => {
      let studentPromises = [];
      studentsData.forEach((student) => {
        studentPromises.push(createStudent(knex, student));
      });
      return Promise.all(studentPromises);
    })
};

const createStudent = (knex, student) => {
  console.log(student.house_id);
  return knex('houses').where('id', student.house_id).first()
  .then((houseRecord) => {
    console.log(houseRecord);
    return knex('students').insert({
      ...student,
      house_id: houseRecord.id
    });
  });
};
