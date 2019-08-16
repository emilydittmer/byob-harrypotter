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
})

app.get('/api/v1/students', (request, response) => {
  database('students')
    .select()
    .then(students => response.status(200).json(students))
    .catch(error => response.status(500).json({error}))
})

app.get('/api/v1/houses/:id', (request, response) => {
  database('houses').where('id', request.params.id).select()
  .then((house) => {
    response.status(200).json(house);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
})

app.get('/api/v1/students/:id', (request, response) => {
  database('students').where('id', request.params.id).select()
  .then((student) => {
    response.status(200).json(student);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
})

app.post('/api/v1/houses', (request, response) => {
  const house = request.body;

  for(let requiredParam of ['name', 'mascot', 'head', 'ghost', 'founder', 'school', 'color' ]) {
    if(!house[requiredParam]) {
      return response
      .status(422)
      .send({Error: `Expected format: { name: <string>, mascot: <string> }. You are missing ${requiredParam} property.`})
    }
  }

  database('house').insert(house, 'id')
    .then(house => {
      response.status(201).json({ id: house[0] })
    })
    .catch(error => {
      response.status(500).json({error})
    })

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});