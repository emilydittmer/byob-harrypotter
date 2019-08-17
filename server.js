const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Harry Potter';

app.get('/', (request, response) => {
  response.send('Oh hey Harry Potter nerds');
});

app.get('/api/v1/houses', (request, response) => {
  database('houses')
    .select()
    .then(houses => response.status(200).json(houses))
    .catch(error => response.status(500).json({error}))
});

app.get('/api/v1/students', (request, response) => {
  database('students')
    .select()
    .then(students => response.status(200).json(students))
    .catch(error => response.status(500).json({error}))
});

app.get('/api/v1/houses/:id', (request, response) => {
  database('houses').where('id', request.params.id).select()
  .then((house) => {
    response.status(200).json(house);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/students/:id', (request, response) => {
  database('students').where('id', request.params.id).select()
  .then((student) => {
    response.status(200).json(student);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/houses', (request, response) => {
  const newHouse = request.body;

  for(let requiredParameter of ['name', 'mascot', 'head', 'ghost', 'founder', 'school', 'color' ]) {
    if(!newHouse[requiredParameter]) {
      return response.status(422)
      .json({Error: `House was not added. You are missing ${requiredParameter} property.`})
    }
  }

  database('houses').insert(newHouse, 'id')
    .then(house => {
      response.status(201).json({ id: house[0] })
    })
    .catch(error => {
      response.status(500).json({error})
    })

});

app.post('/api/v1/students', (request, response) => {
  const newStudent = request.body;

  for(let requiredParameter of ['name', 'house_id', 'school', 'ministryOfMagic', 'orderOfThePhoenix', 'dumbledoresArmy', 'deathEater', 'bloodStatus', 'species' ]) {
    if(!newStudent[requiredParameter]) {
      return response.status(422)
      .json({Error: `Student was not added. You are missing ${requiredParameter} property.`})
    }
  }

  database('students').insert(newStudent, 'id')
    .then(student => {
      response.status(201).json({ id: student[0] })
    })
    .catch(error => {
      response.status(500).json({error})
    })

});

app.delete('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;

  database('students').where({ id }).del()
    .then(result => {
      if(result) {
        response.status(204).send();
      } else {
        response.status(404).json({Error: `No student found with the id of ${id}`})
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});