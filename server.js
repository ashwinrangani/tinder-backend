import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://ashwin_rangani:ashran639@cluster0.pjelvwd.mongodb.net/?retryWrites=true&w=majority'
// Middlewares

app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
  
  useUnifiedTopology: true
})


// API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("HELLO WORLD!!!");
  });

  app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


app.get('/tinder/cards', (req, res) => {
    Cards.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});



// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));