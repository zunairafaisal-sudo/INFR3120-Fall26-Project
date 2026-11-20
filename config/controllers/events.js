const Event = require('mongoose').model('Event');

exports.create = function(req, res, next) {

    const event = new Event(req.body);

    event.save((err) => {

        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }

    });

};
