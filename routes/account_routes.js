var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');

// View All accounts
router.get('/allAccounts', (req, res) => {
  account_dal.getAllAccountNames2()
  .then(account => {
      res.render('account/accountViewAll', {account});
    })
    .catch(err => {res.send(err);});
  });
  /*
    account_dal.getAllAccountNames(function (err, result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('company/accountViewAll', { 'result' : result});
        }
    });
    */
//});

/*
// Return the add a new account form
router.get('/addAccount', function (req, res)
{
    account_dal.getAllAccountNames(function (err, result)
    {
        if (err)
        {
            res.sent(err);
        }
        else
        {
            res.render('company/accountAdd', {'account' : result});
        }
    });
});
*/
/*
router.get('/allAccounts', (req, res) => {
  account_dal.getAllAccountNames2()
  .then(account => {
      res.render('company/accountViewAll', {account});
    })
    .catch(err => {res.send(err);});
  });

*/
// Return the add a new account form
router.get('/insertAccount', (req, res) =>
  {
    account_dal.getAccount()
    .then(account =>
      {
        console.log(account)
        res.render('account/insertAccount', {account});
      })
    .catch(err => res.send(err));

  }
);
// change to post?
router.get('/insertNewAccount', (req, res) =>
  {
    console.log("got here")
    console.log(req.query)
    account_dal.insertAccount(req.query, 'account')
    account_dal.getAccount()
    .then(account =>
      {
        //res.redirect(302, 'insertAccount');
        res.render('account/accountViewAll', {account});
      })
    .catch(err => res.send(err));
    /*.then(setTimeout(() => {res.redirect(302, 'company/insertAccount')}, 200))
    .then(        console.log("here"))
    .catch(err => console.log(err));
    */
  }
)
/*company_dal.edit(req.query.company_id, function(err, result){
    res.render('company/companyUpdate', {company: result[0][0], address: result[1]});
});
*/
router.get('/editAccount', (req, res) =>
  {
    //console.log("edit account")
    //console.log(req.query)
    account_dal.editAccount(req.query.account_id)
    .then(account1 =>
      {
          console.log(account1)
          //console.log(account1[0].account_id)
          //console.log("\n")
          console.log(account1[0])
          console.log("\n")
        let account = account1[0]
        res.render('account/editAccount', {account});
      })
    .catch(err => res.send(err));
  });
router.get('/editOldAccount', (req, res) =>
  {
    console.log("updating old account")
    console.log(req.query)
    account_dal.editOldAccount(req.query)

    account_dal.getAllAccountNames2()
    .then(account =>
      {
        res.render('account/accountViewAll', {account});
      })
      .catch(err => res.send(err));
    });
    /*
    account_dal.getAllAccountNames2()
    .then(
      result => res.render('company/accountViewAll', {account})

    )
    .catch(err => res.send(err));
  }*/


// deletes the account
// url that the button goes to
router.get('/deleteAccount', (req, res) =>
  {
    console.log(req.query)
    account_dal.deleteAccount(req.query.account_id)
    //console.log("got here")
    account_dal.getAllAccountNames2()
    .then(account =>
      {
        res.render('account/accountViewAll', {account});
      })
    .catch(err => res.send(err));
  });

// view the account for the given id

router.get('/', (req, res) =>
  {
  console.log("account id")
  console.log(req.query.account_id)
  console.log('\n')
  // can't tell the difference between same function but different parameters
  account_dal.getAccount1(req.query.account_id)
  .then(account1 =>
    {
      console.log(account1[0])
      let account = account1[0]
      res.render('account/accountViewById', {account});
    })
  .catch(err => res.send(err));
});

/*
router.route('/insertAccount')
// load up page with the data from database
// insert user data into database
    .get(account_dal.getAccount)

    .post(account_dal.addAccount);
  */

  // View the account for the given id
  /*
  router.get('/insertAccount', function (req, res)
  {
      // simple validation
      if(req.query.email == null)
      {
          res.send('Account Email must be provided.');
      }
      else// if(req.query.account_id == null)
          //res.send('At least one account must ')
      {
          account_dal.insertAccount(req.query, 'account')
              .then(res.send('{sucess: true}'))
              .catch(err => {
                          res.send(`{error : ${error}}`);
                      });/*function (err, result)
          {
              if (err)
              {
                  console.log(err)
                  res.send(err);
              }
              else// debugger never checks this
              {
                  res.redirect(302, '/company/allAccounts');
              }
          })*/
      //}
  //})
  //*/

  //router.route('/insertAccount')
  //    .post(account_dal.test);

module.exports = router;
