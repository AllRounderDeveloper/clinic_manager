// CONSTS
const Express = require('express');
const app = Express();
const port = 300;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const fs = require('fs');

// MAKING THE FILE SYSTEM
// Function of sving data of skin collection
function JSONski() {
    // Define the model
    const SkinModel = mongoose.model('skin', Schema);

    // Find all documents in the collection
    Promise.all([SkinModel.find({})])
        .then(([skinData]) => {
            // Combine the data
            const data = [...skinData];

            // Write the data to a JSON file
            fs.writeFile('./JSON/skin.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Data updated');
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

// function of saving data of stomach collection
function JSONsto() {
    // Define the model
    const StomachModel = mongoose.model('stomach', Schema);

    // Find all documents in the collection
    Promise.all([StomachModel.find({})])
        .then(([stomachData]) => {
            // Combine the data
            const data = [...stomachData];

            // Write the data to a JSON file
            fs.writeFile('./JSON/stomach.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Data updated');
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

// STATIC-FILE SYSTEM

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use('/src', Express.static('src'));
app.set('view engine', 'pug');

// MONGO FILLE SYSTEM
mongoose.connect('mongodb://localhost/clinic')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error(error)
    })
const Schema = new mongoose.Schema({
    Fname: String,
    Lname: String,
    Phone: String,
    Amount: String,
    Symptoms: String,
    date: String
});
// file serving

app.get('/', (req, res) => {
    res.status(200).render('index');
});


app.post('/', (req, res) => {
    const date = new Date();
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDay()
    if (req.body.Type == "Stomach") {
        const StomachModel = mongoose.model('stomach', Schema);
        const values = new StomachModel({
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            Phone: req.body.Phone,
            Amount: req.body.Amount + ' RS',
            Symptoms: req.body.Symptoms,
            date: `${day}/${month}/${year}`
        })
        values.save()
        JSONsto()
        res.redirect('/')
    } else if (req.body.Type == "Skin") {
        const SkinModel = mongoose.model('skin', Schema);
        const values = new SkinModel({
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            Phone: req.body.Phone,
            Amount: req.body.Amount + ' RS',
            Symptoms: req.body.Symptoms,
            date: `${day}/${month}/${year}`
        })
        values.save();
        JSONski()
        res.redirect('/')
    }
})

// hosting

app.listen(port, host, () => {
    console.log(`the website is running at https://${host}:${port}`)
})