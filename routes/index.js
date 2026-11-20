const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event');

/* Home page */
/*router.get('/', function(req, res) {
    res.render('index', { title: 'Campus Connect' });
}); */

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Event'
    });
});

/*Home page with two upcoming events*/
router.get('/', async function(req,res) {
    try {
        /*Waits to find events to list, limit of two events*/
        const events = await Event.find().limit(2);
        res.render('index', {
            title: 'Campus Connect',
            upcomingEvents: events
        })
    } catch(err) {
        /*Displays empty list if error occurs*/
        console.log(err)
        res.render('index', {
            title: 'Campus Connect',
            upcomingEvents: []
        })
    }
})

/* Events Dashboard */
router.get('/events', function(req, res) {

    Event.find()
        .then(function(events) {

            res.render('events', {
                title: 'Events Dashboard',
                events: events
            });

        })
        .catch(function(err) {

            console.log(err);
            res.send('Error loading events');

        });

});

/* Post Event Creation */
router.post('/create', async function(req,res) {
    /*Create new document when using form fields in req.body*/
    try {
        const newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            time: req.body.time,
            date: req.body.date,
            location: req.body.location,
        });
        /*Wait for Mongoose to save event in Document*/
        await newEvent.save();
        /*Redirect to events dashboard after save*/
        res.redirect('/events')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error creating event')
    }
    });

module.exports = router;