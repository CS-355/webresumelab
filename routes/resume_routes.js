var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');

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

router.get('/insertResume', (req, res) =>
  {
      //console.log(resume)
      res.render('resume/insertResume');
  });

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
    resume_dal.editResume(req.query.resume_id)
    .then(resume1 =>
      {
        console.log(resume1)

        console.log(resume1[0])
        console.log("/n")
        let resume = resume1[0]
        res.render('resume/editResume', {resume});
      })
    .catch(err => res.send(err));
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
