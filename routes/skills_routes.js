var express = require('express');
var router = express.Router();
var skills_dal = require('../model/skills_dal');

// View All resumes
router.get('/allSkills', (req, res) =>
    {
        console.log("here")
        skills_dal.getAllSkillsNames()
        .then(skill =>
          {
            res.render('skills/skillsViewAll', {skill});
          })
        .catch(err => res.send(err));
    });

router.get('/insertSkill', (req, res) =>
  {
      console.log("got to insert page")
      res.render('skills/insertSkills', {})
      /*skills_dal.getSkills()
      .then(skill =>
        {
          console.log(skill)
          res.render('/skills/insertSkills', {skill});
        })
      .catch(err => res.send(err));
      */
  });

router.get('/insertNewSkills', (req, res) =>
  {
    console.log("got here")
    console.log(req.query)
    // have to add to link tables
    skills_dal.insertSkill(req.query, 'skill')
    skills_dal.getSkills()
    .then(skill =>
      {
        res.render('skills/skillsViewAll', {skill});
      })
    .catch(err => res.send(err));
  });

router.get('/editSkill', (req, res) =>
{ //blehbleh/editSkill?skills_id=345
  console.log(req.query)
  skills_dal.editSkill(req.query.skill_id)
  .then(skill1 =>
    {
      console.log(skill1)
      console.log(skill1[0])
      console.log("/n")
      let skill = skill1[0]
      res.render('skills/editSkill', {skill})
    }
  )
  .catch(err => res.send(err));
});


  router.get('/editOldSkill', (req, res) =>
    {
      console.log("updating old skills")
      console.log(req.query)

      skills_dal.editOldSkills(req.query)
      skills_dal.getAllSkillsNames()
      .then(skill =>
        {
          res.render('skills/skillsViewAll', {skill});
        })
      .catch(err => res.send(err));
    });


  router.get('/deleteSkills', (req, res) =>
    {
      console.log(req.query)
      skills_dal.deleteSkills(req.query.skill_id)
      skills_dal.getAllSkillsNames()
      // delete helper tables
      .then(skill =>
        {
          res.render('skills/skillsViewAll', {skill});
        })
      .catch(err => res.send(err));
    });
router.get('/', (req, res) =>
  {
    console.log("skills id")
    console.log(req.query.skill_id)
    console.log('/n')
    skills_dal.getSkills1(req.query.skill_id)
    .then(skills1 =>
      {
        console.log(skills1[0])
        let skill = skills1[0]
        res.render('skills/skillsViewById', {skill});
      })
    .catch(err => res.send(err));
  });

  module.exports = router;
