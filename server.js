const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Harry Potter';

app.get('/', (request, response) => {
  response.send('Oh hey Harry Potter Nerds');
});

app.get('/api/v1/houses', (request, response) => {
  database('houses').select()
  .then((houses) => {
    response.status(200).json(houses);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});