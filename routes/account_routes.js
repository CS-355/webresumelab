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
    // this should be a procedure call
    account_dal.getTablesForNewAccount()
    .then(calls =>
      {
        let school = calls[0]
        let skill = calls[1]
        let company = calls[2]
        //console.log(calls)
        res.render('account/insertAccount', {school, skill, company});
      })
    .catch(err => res.send(err));

  }
);
// change to post?
router.get('/insertNewAccount', (req, res) =>
  {
    console.log("got here")
    console.log(req.query)
    //account_dal.insertAccount(req.query, 'account')
    let school_id1 = req.query.school_id
    let email = req.query.email
    let first_name = req.query.first_name
    let last_name = req.query.last_name
    let skill_id1 = req.query.skill_id
    let company_id1 = req.query.company_id
    var x = {email, first_name, last_name, school_id1, skill_id1, company_id1}

    account_dal.insertNewAccountData(x)
    console.log("insert successful")
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
    // show the current data the user chose but allow them
    // get all data for the account_id
    account_dal.editAccount(req.query.account_id)
    .then(account1 =>
      {
        let account = account1[0][0]
        console.log("account data")
        console.log(account.account_id)
        let school = account1[1]
        let company = account1[2]
        let skill = account1[3]

        console.log("edit account")
          console.log(account1)
          //console.log(account1[0].account_id)
          //console.log("\n")
          //console.log(account1[0])
          console.log("\n")
        //let account = account1[0]
        res.render('account/editAccount', {account, school, company, skill});
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
    account_dal.deleteAllTracesOfAccount(req.query.account_id)

    console.log("got here")
    account_dal.getAllAccountNames2()
    .then(account =>
      {
        console.log("render")
        console.log(account)
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
      console.log("account1 data", account1, account1[0].account_id)
      // all 3 lists of ids
      //var skills = []
      // each result should have a list of numbers
      // get skill_id

      account_dal.getSkill_id(account1[0].account_id)
      .then(skill_ids =>
        {
          console.log("skill_ids", skill_ids)
          account_dal.getAllSkills(skill_ids)
          .then(skill =>
            {
              console.log("skill", skill)
              let skills = skill
              account_dal.getAllSchools(account1[0].account_id)
              .then(result =>
                {
                  console.log("school", result)
                  let schools = result
                  //schools = result
                  account_dal.getCompanyIds(account1[0].account_id)
                  .then(result =>
                    {
                      account_dal.getAllCompanies(result)
                      .then(result =>
                        {
                          console.log("companies", result)
                          let companies = result
                          let account = account1
                          console.log("all", account)
                          console.log("\n")
                          console.log(schools)
                          console.log("\n")
                          console.log(skills)
                          console.log("\ncompanies")
                          console.log(companies)
                          res.render('account/accountViewById', {account, schools, skills ,companies});

                        }
                      )

                      //companies = result
                    }
                  );

                }
              );

              //skills.push(skill)
            })
          //console.log("skills", skills)

            //console.log("got here")

        });

      //console.log(account1)
      /*var schools = []
      account_dal.getAllSchools(account1[0].account_id)
      .then(result =>
        {
          console.log("school", result)
          schools = result
        }
      );
      //console.log(account1)
      var companies = []
      account_dal.getAllCompanies(account1[0].account_id)
      .then(result =>
        {
          console.log("companies", result)
          companies = result
        }
      );*/
      /*console.log("done")
      let account = account1[0]
      console.log("result set")
      console.log(account, /*skills, schools, companies)

      /*setTimeout(
        () => {
          res.render('account/accountViewById', {account, schools, /*skills ,companies});
        }, 10);
*/
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
