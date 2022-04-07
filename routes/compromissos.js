const { response } = require('express');
var express = require('express');
var router = express.Router();
const db = require('../db.js');
ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', async function (req, res, next) {
  console.log("Entrando rota compromissos");
  const conn = await db.connect();
  const compromissos = conn.collection("compromisso");
  const docs = await compromissos.find().toArray();
  //console.log(docs);
  res.render('list', { docs: docs, inserido: false });
});

router.post('/', async function (req, res, next) {
  const conn = await db.connect();
  const compromissos = conn.collection("compromisso");

  const descricao = req.body.descricao;
  const data = req.body.data;
  
  console.log(req.body);


  if (req.body.hiddenid) {
    const filter = { _id: new ObjectID(req.body.hiddenid) }
    const x = await compromissos.updateOne(
      filter,
      { $set: { descricao: descricao, data: data } }
    );
  } else {
    await compromissos.insertOne({
      descricao: descricao,
      data: data,
    });
  }
  res.redirect('/compromissos');
});

router.get('/add', async function (req, res, next) {
  res.render('compromissos', { lbl: "Adicionar", obj: { descricao: "", data: ""} });
});


router.post('/delete', async function (req, res, next) {
  const conn = await db.connect();
  const compromissos = conn.collection("compromisso");
  const _id = req.body.hiddenid;
  const filter = { _id: new ObjectID(_id) }

  const x = await compromissos.deleteOne(filter);
  console.log(x);
  const docs = await compromissos.find().toArray();
  //res.render('list', { docs: docs, inserido: false }); 
  res.redirect('/compromissos');
  //res.send('clicou em delete '  + req.body.hiddenid );
});

router.post('/update', async function (req, res, next) {
  const conn = await db.connect();
  const compromissos = conn.collection("compromisso");
  const _id = req.body.hiddenid;
  const filter = { _id: new ObjectID(_id) }

  const ob = await compromissos.findOne(filter);
  console.log(ob);
  res.render('compromissos', { obj: ob, lbl: "Atualizar" });
});


module.exports = router;
