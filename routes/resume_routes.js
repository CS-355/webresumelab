var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var account_dal = require('../model/account_dal');

// View All resumes
router.get('/allResumes', (req, res) =>
    {
        console.log("here")
        resume_dal.getAllResumeNames()
        .then(resume =>
          {
            console.log(resume)
            res.render('resume/resumeViewAll', {resume});
          })
        .catch(err => res.send(err));
    });

router.get('/add/selectuser', (req, res) =>
  {
    console.log("got here")
      account_dal.getAllAccountNames2()
      .then(account =>
        {
          res.render('resume/addToResume', {account});

        })
      .catch(err => res.send(err));
  });

router.get('/add/addNewResume', (req, res) =>
  {
    //console.log(re)
    resume_dal.getDataForAddNewResumeForm(req.query.account_id)
    .then(calls =>
      {
        let a = calls[0]
        let b = calls[1]
        let c = calls[2]

        let d = req.query
        console.log(a, b, c, d)
        res.render('resume/createNewResume', {a, b, c, d});
      })
    .catch(err => res.send(err));
    //console.log(resume)

  }
)

router.post('/add/saveNewResume', (req, res) =>
{
  console.log("got here")
  console.log(req.body)
  console.log("\n")
  let {account_id, resume_name, school_id, company_ids, skill_id} = req.body
  resume_dal.insertNewResumeData(account_id, resume_name, school_id, company_ids, skill_id)

  //res.send('success')
  resume_dal.getAllResumeNames()
  .then(resume =>
    {
      //console.log(resume)
      res.render('resume/resumeViewAll', {resume});
    }
  );

}
)

router.get('/insertNewResume', (req, res) =>
  {
    console.log("got here")
    console.log(req.query)
    resume_dal.insertResume(req.query, 'resume')
    resume_dal.getResume()
    .then(resume =>
      {
        res.render('resume/resumeViewAll', {resume});
      })
    .catch(err => res.send(err));
  });

router.get('/editResume', (req, res) =>
  {
    console.log("edit resume")
    console.log(req.query)
    // get the account_id first
    resume_dal.getAccountId(req.query.resume_id)
    .then(result =>
      {
      console.log("result", result)
      resume_dal.getDataForAddNewResumeForm(result.account_id)
    }
    )
    /*resume_dal.getDataForAddNewResumeForm(req.query.resume_id)
    .then(calls =>
      {
        let a = calls[0]
        let b = calls[1]
        let c = calls[2]

        let d = req.query
        console.log(a, b, c, d)
        res.render('resume/editResume', {a, b, c, d});
      })
    .catch(err => res.send(err));*/
  });

  router.get('/editOldResume', (req, res) =>
    {
      console.log("updating old resume")
      concole.log(req.query)
      resume_dal.editOldResume(req.query)
      resume_dal.getAllResumeNames()
      .then(resume =>
        {
          res.render('resume/resumeViewAll', {resume});
        })
      .catch(err => res.send(err));
    });


  router.get('/deleteResume', (req, res) =>
    {
      console.log(req.query)
      resume_dal.deleteResume(req.query.resume_id)
      resume_dal.getAllResumeNames()
      .then(resume =>
        {
          res.render('resume/resumeViewAll', {resume});
        })
      .catch(err => res.send(err));
    });
router.get('/', (req, res) =>
  {
    console.log("resume id")
    console.log(req.query.resume_id)
    console.log('/n')
    resume_dal.getResume1(req.query.resume_id)
    .then(resume1 =>
      {
        console.log(resume1[0])
        let resume = resume1[0]
        res.render('resume/resumeViewById', {resume});
      })
    .catch(err => res.send(err));
  });

  module.exports = router;
