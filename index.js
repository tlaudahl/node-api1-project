// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json());


server.post('/api/users', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(user => {
        if(newUser.name && newUser.bio) {
            res.status(201).json(user)
        } else {
            res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
        }
    })
    .catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database' }))
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved.' })
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if(user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ error: 'The user with the specified ID does not exist.'})
        }
        
    })
    .catch(err => {
        res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
})








const port = 8000;
server.listen(port, () => console.log('Listening on port 8000'))