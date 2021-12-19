require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
// var request = require('request');
var axios = require("axios");
// var _ = require('lodash');
const cors = require("cors");
const helmet = require("helmet");


app.use(cors());
app.use(helmet());

// ROUTES
app.get("/", async function (req, res, next) {
 await axios
    .get("https://api.tel-aviv.gov.il/gis/Layer?layerCode=548")
    .then((result) => {

      var pazGroup = [];
      var sonolGroup = [];
      var dorGroup = [];
      var delekGroup = [];
      var otherGroup = [];
      for (var i = 0; i < result.data.features.length; i++) {
        if (result.data.features[i].attributes.shem_esek.match("פז")) {
          pazGroup.push(result.data.features[i]);
        } else if (
          result.data.features[i].attributes.shem_esek.match("סונול") ||
          result.data.features[i].attributes.shem_esek.match("לונוס")
        ) {
          sonolGroup.push(result.data.features[i]);
        } else if (result.data.features[i].attributes.shem_esek.match("דור")) {
          dorGroup.push(result.data.features[i]);
        } else if (result.data.features[i].attributes.shem_esek.match("דלק")) {
          delekGroup.push(result.data.features[i]);
        } else {
          otherGroup.push(result.data.features[i]);
        }

        if (i === result.data.features.length - 1) {
          var mainGRoup = {
            paz: pazGroup,
            sonol: sonolGroup,
            dor: dorGroup,
            delek: delekGroup,
            others: otherGroup,
          };
          res.send(mainGRoup);
        }
      }
    });;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
