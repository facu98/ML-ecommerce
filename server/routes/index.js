var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

var cache = {};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/search", (req, res) => {
  var { query, page, category } = req.query;
  console.log(req.query)

  !page && (page = 1);
  if (cache[query] && cache[query][page]) {
    console.log("entró al caché");
    return res.json(cache[query][page]);
  }
  var offset = (page - 1) * 30;

  if(query){
     fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=30&offset=${offset}`
    )
      .then((res) => res.json())
      .then((json) => {
        !cache[query] && (cache[query] = {});
        cache[query][page] = json;
        return res.json(json);
      });

 
  }

  if(category){
    fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${category}`)
    .then((res) => res.json())
    .then((cat) => {
      res.json(cat.results)
    })
  }

});

router.get('/categories', (req,res) => {
  fetch(
    `https://api.mercadolibre.com/sites/MLA/categories`
  )
  .then((cat) => cat.json())
  .then((cat) => {res.json(cat)})
})


router.get("/test", (req, res) => {
  res.json({ test: "OK" });
});

module.exports = router;
