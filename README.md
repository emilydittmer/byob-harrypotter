# Build Your Own Backend -- Harry Potter

# Summary


## ENDPOINTS

- Main endpoint: https://byob-harrypotter.herokuapp.com/api/v1/houses

## API Calls

### GET

You can get data on all houses at the Hogwarts School of Witchcraft and Wizardy and ten students from each of the four houses.

### GET /api/v1/houses

#### Sample Response

```
[{
id: 1,
name: "Gryffindor",
mascot: "lion",
head: "Minerva McGonagall",
ghost: "Nearly Headless Nick",
founder: "Goderic Gryffindor",
school: "Hogwarts School of Witchcraft and Wizardry",
color: "red",
created_at: "2019-08-16T16:41:45.954Z",
updated_at: "2019-08-16T16:41:45.954Z"
},
{
id: 2,
name: "Ravenclaw",
mascot: "eagle",
head: "Fillius Flitwick",
ghost: "The Grey Lady",
founder: "Rowena Ravenclaw",
school: "Hogwarts School of Witchcraft and Wizardry",
color: "blue",
created_at: "2019-08-16T16:41:45.954Z",
updated_at: "2019-08-16T16:41:45.954Z"
}]
```

### GET /api/v1/students

#### Sample Response

```
[{
id: 11,
name: "Tom Riddle",
role: null,
house_id: 3,
school: "Hogwarts School of Witchcraft and Wizardry",
wand: "Yew, 13 1/2", phoenix feather core",
boggart: "his own corpse",
patronus: null,
ministryOfMagic: false,
orderOfThePhoenix: false,
dumbledoresArmy: false,
deathEater: true,
bloodStatus: "half-blood",
species: "human",
created_at: "2019-08-16T16:41:46.074Z",
updated_at: "2019-08-16T16:41:46.074Z",
alias: "Lord Voldemort",
animagus: null
},
{
id: 12,
name: "Horace Slughorn",
role: "Professor, Potions",
house_id: 3,
school: "Hogwarts School of Witchcraft and Wizardry",
wand: "Cedar, 10 1/4", dragon heartstring",
boggart: null,
patronus: null,
ministryOfMagic: false,
orderOfThePhoenix: false,
dumbledoresArmy: false,
deathEater: false,
bloodStatus: "unknown",
species: "human",
created_at: "2019-08-16T16:41:46.076Z",
updated_at: "2019-08-16T16:41:46.076Z",
alias: null,
animagus: null
}]
```

### GET /api/v1/houses/:id

#### Sample Response /api/v1/houses/2

```
{
id: 2,
name: "Ravenclaw",
mascot: "eagle",
head: "Fillius Flitwick",
ghost: "The Grey Lady",
founder: "Rowena Ravenclaw",
school: "Hogwarts School of Witchcraft and Wizardry",
color: "blue",
created_at: "2019-08-16T16:41:45.954Z",
updated_at: "2019-08-16T16:41:45.954Z"
}
```

### GET /api/v1/student/:id

#### Sample Response /api/v1/students/11

```
{
id: 11,
name: "Tom Riddle",
role: null,
house_id: 3,
school: "Hogwarts School of Witchcraft and Wizardry",
wand: "Yew, 13 1/2", phoenix feather core",
boggart: "his own corpse",
patronus: null,
ministryOfMagic: false,
orderOfThePhoenix: false,
dumbledoresArmy: false,
deathEater: true,
bloodStatus: "half-blood",
species: "human",
created_at: "2019-08-16T16:41:46.074Z",
updated_at: "2019-08-16T16:41:46.074Z",
alias: "Lord Voldemort",
animagus: null
}
```


### POST /api/v1/houses
- This endpoint will allow a user to add a new house to the dataset.
- Should return a message if the house was posted successfully

**Required properties: name, mascot, head, ghost, founder, school, and color

### POST /api/v1/students
- This endpoint will allow a user to create add an additional student to the database
- Should return a message if the book was posted successfully

**Required properties: name, house_id, school, ministryOfMagic, orderOfThePhoenix, dumbledoresArmy, deathEater, bloodStatus, and species


### DELETE /api/v1/students/:id
- This endpoint expects an parameter to be passed in the url (id), which represents the id of a single student to be deleted
