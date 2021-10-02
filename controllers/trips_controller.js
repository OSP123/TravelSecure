const db = require("../models");

exports.index = (req, res) => {
  db.Trip.findAll({
    where: {
      UserId: req.user.id,
    },
  })
    .then((dbTrip) => {
      res.render("trips/trips", {
        layout: "main-trips",
        trip: dbTrip,
      });
    })
    .catch((err) => {
      console.log("No Trips yet");
      res.render("trips/trips", {
        layout: "main-trips",
        trip: [],
      });
    });
};

exports.createTrip = (req, res) => {
  // Add id from User onto req.body
  req.body.UserId = req.user.id;

  db.Trip.create(req.body).then((dbPost) => res.json(dbPost));
};
