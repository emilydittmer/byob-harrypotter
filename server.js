const environment = process.env.NODE_ENV || 'development'; //stating which environment to use or defaulting to development
const configuration = require('./knexfile')[environment]; //requiring the knexfile environment
const database = require('knex')(configuration); //importing in database using knex configuration
const express = require('express'); //importing express
const app = express(); //stating that app uses express

app.use(express.json()); //stating that the app will run on JSON

app.set('port', process.env.PORT || 3000); // stating that the port will default to 3000 or whatever port is open

app.locals.title = 'Harry Potter'; //setting the title to the app

app.get('/', (request, response) => {
  response.send('Oh hey Harry Potter nerds');
});

//At the path '/', send to the browser 'Oh hey Harry Potter nerds'

app.get('/api/v1/houses', (request, response) => {
  database('houses')
    .select()
    .then(houses => response.status(200).json(houses))
    .catch(error => response.status(500).json({error}))
});

// At the path '/api/v1/houses', go to database houses and select that data, if it is successful(200), return the houses in JSON, if it is not, return the error(500) 

app.get('/api/v1/students', (request, response) => {
  database('students')
    .select()
    .then(students => response.status(200).json(students))
    .catch(error => response.status(500).json({error}))
});

// At the path '/api/v1/students', go to database students and select that data, if it is successful(200), return the students in JSON, if it is not, return the error(500) 


app.get('/api/v1/houses/:id', (request, response) => {
  database('houses').where('id', request.params.id).select()
  .then((house) => {
    response.status(200).json(house);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

// At the path '/api/v1/houses/:id', go to database houses and find the object that matches the id in the URL and select that item. If it is successful(200), return the specfic house in JSON, if it is not, return the error(500) 


app.get('/api/v1/students/:id', (request, response) => {
  database('students').where('id', request.params.id).select()
  .then((student) => {
    response.status(200).json(student);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

// At the path '/api/v1/students/:id', go to database houses and find the object that matches the id in the URL and select that item. If it is successful(200), return the specfic student in JSON, if it is not, return the error(500) 


app.post('/api/v1/houses', (request, response) => {
  const newHouse = request.body;
  //newHouse is what information is being passed in through the request body
  // for the newHouse, it has required parameters of all of the information listed below
  for(let requiredParameter of ['name', 'mascot', 'head', 'ghost', 'founder', 'school', 'color' ]) {
    if(!newHouse[requiredParameter]) {
      return response.status(422)
      .json({Error: `House was not added. You are missing ${requiredParameter} property.`})
    }
  }
  //if any of that information is missing from newHouse, return the response code 422 that states that it is missing a propery can could not be added
  //if it has all the parameters listed above, select the database houses and insert the newHouse with an id
  database('houses').insert(newHouse, 'id')
    .then(house => {
      response.status(201).json({ id: house[0] })
    })
    .catch(error => {
      response.status(500).json({error})
    })
});
//if the house is added to the dataset succesfully, return the status 201 with the id of newHouse
//if it was not added successfully(500), return the error message received


app.post('/api/v1/students', (request, response) => {
  const newStudent = request.body;
  //newStudent is what information is being passed in through the request body
  // for the newStudent, it has required parameters of all of the information listed below

  for(let requiredParameter of ['name', 'house_id', 'school', 'ministryOfMagic', 'orderOfThePhoenix', 'dumbledoresArmy', 'deathEater', 'bloodStatus', 'species' ]) {
    if(!newStudent[requiredParameter]) {
      return response.status(422)
      .json({Error: `Student was not added. You are missing ${requiredParameter} property.`})
    }
  }
  //if any of that information is missing from newStudent, return the response code 422 that states that it is missing a propery can could not be added
  //if it has all the parameters listed above, select the database students and insert the newStudent with an id

  database('students').insert(newStudent, 'id')
    .then(student => {
      response.status(201).json({ id: student[0] })
    })
    .catch(error => {
      response.status(500).json({error})
    })
});
//if the student is added to the dataset succesfully, return the status 201 with the id of newStudent
//if it was not added successfully(500), return the error message received

app.delete('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;
  //id is the parameter passed through the request
  //for the id, go into the database students and where the id meets the id within the database, delete that object
  //after deleting the object, return the result, if the id was found and deleted successfully, return the 204 response\
  //if the id was not found, return 404 response and error message
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
//if it could not be deleted for a reason other than it could not find the id, return 500 error and the message

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

//when the server is running on a port, send the above message