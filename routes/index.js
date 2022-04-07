var express = require('express');
var router = express.Router();
//const db = require('../db.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("Entrando");
    //const conn = await db.connect();
  //const clientes = conn.collection("clientes");
  //const docs = await clientes.find().toArray();
  //console.log(docs);
  res.render('index', {inserido: false });
});

router.get('/add', function(req, res, next) {
  res.render('compromissos');
});

module.exports = router;
