var express = require('express');
var router = express.Router();
var address_dal = require('../model/address_dal');

// View All addresss
router.get('/allAddresses', (req, res) =>
    {
        console.log("here")
        address_dal.getAllAddressNames()
        .then(address =>
          {
            console.log(address)
            res.render('address/addressViewAll', {address});
          })
        .catch(err => res.send(err));
    });

router.get('/insertAddress', (req, res) =>
  {
      address_dal.getAddress()
      .then(address =>
        {
          console.log(address)
          res.render('address/insertAddress', {address});
        })
      .catch(err => res.send(err));
  });

router.get('/insertNewAddress', (req, res) =>
  {
    console.log("got here")
    console.log(req.query)
    address_dal.insertAddress(req.query, 'address')
    address_dal.getAddress()
    .then(address =>
      {
        res.render('address/addressViewAll', {address});
      })
    .catch(err => res.send(err));
  });

// viewAll -> edit form
router.get('/editAddress', (req, res) =>
  {
      address_dal.editAddress(req.query.address_id)
      .then(address1 =>
        {
          console.log(address1)
          console.log(address1[0])
          console.log("\n")
          let address = address1[0]
          res.render('address/editAddress', {address});
        })
      .catch(err => res.send(err));
  });

// edit form -> viewAll with changes
router.get('/editOldAddress', (req, res) =>
    {
      console.log("updating old address")
      console.log(req.query)
      address_dal.editOldAddress(req.query)
      address_dal.getAllAddressNames()
      .then(address =>
        {
          res.render('address/addressViewAll', {address});
        })
      .catch(err => res.send(err));
    });


  router.get('/deleteAddress', (req, res) =>
    {
      console.log(req.query)
      address_dal.deleteAddress(req.query.address_id)
      address_dal.getAllAddressNames()
      .then(address =>
        {
          res.render('address/addressViewAll', {address});
        })
      .catch(err => res.send(err));
    });
router.get('/', (req, res) =>
  {
    console.log("address id")
    console.log(req.query.address_id)
    console.log('/n')
    address_dal.getAddress1(req.query.address_id)
    .then(address1 =>
      {
        console.log(address1[0])
        let address = address1[0]
        res.render('address/addressViewById', {address});
      })
    .catch(err => res.send(err));
  });

  module.exports = router;
