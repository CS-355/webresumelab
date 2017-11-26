var express = require('express');
var router = express.Router();
var school_dal = require('../model/school_dal');

// View All schools
router.get('/allSchools', (req, res) => {
  school_dal.getAllSchoolNames()
  .then(school => {
      res.render('school/schoolViewAll', {school});
    })
    .catch(err => {res.send(err);});
  });
  /*
    school_dal.getAllSchoolNames(function (err, result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('company/schoolViewAll', { 'result' : result});
        }
    });
    */
//});

/*
// Return the add a new school form
router.get('/addSchool', function (req, res)
{
    school_dal.getAllSchoolNames(function (err, result)
    {
        if (err)
        {
            res.sent(err);
        }
        else
        {
            res.render('company/schoolAdd', {'school' : result});
        }
    });
});
*/
/*
router.get('/allSchools', (req, res) => {
  school_dal.getAllSchoolNames2()
  .then(school => {
      res.render('company/schoolViewAll', {school});
    })
    .catch(err => {res.send(err);});
  });

*/
// Return the add a new school form
router.get('/insertSchool', (req, res) =>
  {
    school_dal.getSchool()
    .then(school =>
      {
        console.log(school)
        res.render('school/insertSchool', {school});
      })
    .catch(err => res.send(err));

  }
);
// change to post?
router.get('/insertNewSchool', (req, res) =>
  {
    console.log("got here")
    console.log(req.query)
    school_dal.insertSchool(req.query, 'school')
    school_dal.getSchool()
    .then(school =>
      {
        //res.redirect(302, 'insertSchool');
        res.render('school/schoolViewAll', {school});
      })
    .catch(err => res.send(err));
    /*.then(setTimeout(() => {res.redirect(302, 'company/insertSchool')}, 200))
    .then(        console.log("here"))
    .catch(err => console.log(err));
    */
  }
)
/*company_dal.edit(req.query.company_id, function(err, result){
    res.render('company/companyUpdate', {company: result[0][0], address: result[1]});
});
*/
router.get('/editSchool', (req, res) =>
  {
    console.log("edit school")
    console.log(req.query)
    school_dal.editSchool(req.query.school_id)
    .then(school1 =>
      {
          console.log("add to schole")
          console.log(school1)
          //console.log(school1[0].school_id)
          //console.log("\n")
          console.log(school1[0])
          console.log("\n")
        let school = school1[0]
        res.render('school/editSchool', {school});
      })
    .catch(err => res.send(err));
  });
router.get('/editOldSchool', (req, res) =>
  {
    console.log("updating old school")
    console.log(req.query)
    school_dal.editOldSchool(req.query)

    school_dal.getAllSchoolNames()
    .then(school =>
      {
        res.render('school/schoolViewAll', {school});
      })
      .catch(err => res.send(err));
    });
    /*
    school_dal.getAllSchoolNames2()
    .then(
      result => res.render('company/schoolViewAll', {school})

    )
    .catch(err => res.send(err));
  }*/


// deletes the school
// url that the button goes to
router.get('/deleteSchool', (req, res) =>
  {
    console.log(req.query)
    school_dal.deleteSchool(req.query.school_id)
    //console.log("got here")
    school_dal.getAllSchoolNames()
    .then(school =>
      {
        res.render('school/schoolViewAll', {school});
      })
    .catch(err => res.send(err));
  });

// view the school for the given id

router.get('/', (req, res) =>
  {
  console.log("school id")
  console.log(req.query.school_id)
  console.log('\n')
  // can't tell the difference between same function but different parameters
  school_dal.getSchool1(req.query.school_id)
  .then(school1 =>
    {
      console.log(school1[0])
      let school = school1[0]
      res.render('school/schoolViewById', {school});
    })
  .catch(err => res.send(err));
});

/*
router.route('/insertSchool')
// load up page with the data from database
// insert user data into database
    .get(school_dal.getSchool)

    .post(school_dal.addSchool);
  */

  // View the school for the given id
  /*
  router.get('/insertSchool', function (req, res)
  {
      // simple validation
      if(req.query.email == null)
      {
          res.send('School Email must be provided.');
      }
      else// if(req.query.school_id == null)
          //res.send('At least one school must ')
      {
          school_dal.insertSchool(req.query, 'school')
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
                  res.redirect(302, '/company/allSchools');
              }
          })*/
      //}
  //})
  //*/

  //router.route('/insertSchool')
  //    .post(school_dal.test);

module.exports = router;
