var express = require('express');
var router = express.Router();

let messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  },
  {
    id: 3,
    text: "General Kenobi!",
    user: "Stacy",
    added: new Date()
  }
];

function setIds() {
  let id = 1
  for (let message of messages) {
    message.id = id
    id++
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MessageBoard', messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('form')
})

router.post('/new', function(req, res, next) {
  const newMessage = {
    id: messages.length + 1,
    text: req.body.message,
    user: req.body.name,
    added: new Date()
  }

  if(!newMessage.text.trim() || !newMessage.user.trim()) {
    return res.status(400).json({message: 'Please fill out the form!'})
  }

  messages.push(newMessage)
  res.status(201).redirect('/')
})

router.delete('/:id', function(req, res, next) {
  const id = parseInt(req.params.id)

  const message = messages.find(message => message.id === id)

  if (!message) {
    return res.status(404).json({message: 'no post with that id!'})
  }

  messages = messages.filter(message => message.id !== id)
  setIds()
  res.status(201).json({message: 'post deleted'})
  console.log(messages)
})

module.exports = router;
