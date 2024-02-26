const express = require('express');
const router = express.Router();
const axios = require('axios');
const Package = require('../models/PackageModel');

router.get('/', (req, res) => {
  axios.get('https://api.example.com/data')
    .then(response => {
      const data = response.data;
      const package = new Package({
        user: data.userId,
        package: data.package
        // set other fields as needed
      });
      package.save((error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error saving document');
        } else {
          console.log('Document saved!');
          Package.findById(package._id)
            .populate('user')
            .exec((error, package) => {
              if (error) {
                console.error(error);
                res.status(500).send('Error fetching data from database');
              } else {
                console.log('User fetched!');
                res.status(200).send(package);
              }
            });
        }
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data from API');
    });
});

module.exports = router;