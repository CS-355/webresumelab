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
      // get school_id
      address_dal.getAllSchoolIds(req.query.address_id)
      .then(school_ids =>
        {
          console.log(school_ids, '\n')
          // go through all school_ids
          if(school_ids.constructor === Array)
          {
            for (var i = 0; i < school_ids.length; i++)
            {
                console.log(i, school_ids[i].school_id)
                address_dal.deleteSchoolHelperTables(req.query.address_id, school_ids[i].school_id)
              // deleteSchoolHelperTables
                // delete from account_school
                // delete from resume_school
              }
          }
          else
          {
              address_dal.deleteSchoolHelperTables(req.query.addres_id, school_ids.school_id)
            // deleteSchoolHelperTables
              // delete from account_school
              // delete from resume_school
          }
          console.log("first part done")
          // delete from company_address
          address_dal.deleteFromComanyAddress(req.query.address_id)
          . then(result =>
            {
              // delete from address
              address_dal.deleteFromAddress(req.query.address_id)
              console.log("all deleting done")
              address_dal.getAllAddressNames()
              .then(address =>
                {
                  res.render('address/addressViewAll', {address});
                })
              .catch(err => res.send(err));

            }

          )
          /*let school_id = result.school_id
          address_dal.deleteAddress(req.query.address_id, school_id)
          console.log("address and stuff has been deleted")

          address_dal.getAllAddressNames()
          .then(address =>
            {
              res.render('address/addressViewAll', {address});
            })
          .catch(err => res.send(err));
          */
        }
      )
        // run 1 delete prodecudre with school_id and address_id


      // delete account_school with school_id
      // delete resume_school with school_id
      // delete school with address_id
      // delete company_address with address_id
      // delete address with address_id
      /*address_dal.deleteAddress(req.query.address_id)
      address_dal.getAllAddressNames()
      .then(address =>
        {
          res.render('address/addressViewAll', {address});
        })
      .catch(err => res.send(err));*/
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
