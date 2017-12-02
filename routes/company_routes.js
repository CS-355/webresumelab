var express = require('express');
var router = express.Router();
var company_dal = require('../model/company_dal');
var address_dal = require('../model/address_dal');
//var account_dal = require('../model/account_dal');

// View All companys
// account_dal.getAccount = function
router.get('/all', function(req, res) {
  // if the data is grabbed suscessfully, then render the page
    company_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('company/companyViewAll', { 'result':result });
        }
    });

});



// View the company for the given id
router.get('/', function(req, res){
    if(req.query.company_id == null) {
        res.send('company_id is null');
    }
    else {
        company_dal.getById(req.query.company_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('company/companyViewById', {'result': result});
           }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('company/companyAdd', {'address': result});
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
    console.log(req.query)
    console.log(req.body)
    if(req.query.company_name == null) {
        res.send('Company Name must be provided.');
    }
    else if(req.query.address_id == null) {
        res.send('At least one address must be selected');
    }
    else {
      // company_dal.insert()
      //.then(result
          // result holds insertId

      //)
        //company_dal.insert(req.query, )
        // passing all the query parameters (req.query) to the insert function instead of each individually
        company_dal.insert(req.query, function(err,company_id) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //console.log("result", result)
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                //res.redirect(302, '/company/all');
                company_dal.edit(company_id, function(err, result)
              {
                res.render('company/companyUpdate', {company: result[0][0], address: result[1], was_successful: true});
              });
            }
        });
    }
});



router.get('/edit', function(req, res){
    if(req.query.company_id == null) {
        res.send('A company id is required');
    }
    else {
        company_dal.edit(req.query.company_id, function(err, result){
            res.render('company/companyUpdate', {company: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
   if(req.query.company_id == null) {
       res.send('A company id is required');
   }
   else {
       company_dal.getById(req.query.company_id, function(err, company){
           address_dal.getAll(function(err, address) {
               // first element because company_id is the first column
               res.render('company/companyUpdate', {company: company[0], address: address});
           });
       });
   }

});

router.get('/update', function(req, res) {
  console.log("update company")
  console.log(req.query)
    company_dal.update(req.query, function(err, result){

       res.redirect(302, '/company/all');
    });
});

// Delete a company for the given company_id
router.get('/delete', function(req, res){
    if(req.query.company_id == null) {
        res.send('company_id is null');
    }
    else {
         company_dal.delete(req.query.company_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/company/all');
             }
         });
    }
});




module.exports = router;
