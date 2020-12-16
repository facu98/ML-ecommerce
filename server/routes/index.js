var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

var cache = {}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', (req,res) => {
  var {query,page} = req.query
  !page && (page = 1)
  if(cache[query] && cache[query][page]){
    console.log('entró al caché')
    return res.json(cache[query][page])
  }
  var offset = (page - 1) * 30
  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=30&offset=${offset}`)
  .then((res) => res.json())
  .then((json) => {
    console.log(json.paging)
    !cache[query] && (cache[query] = {})
    cache[query][page] = json.results
    res.json(json.results)})
})

module.exports = router;

