var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAllSkillsNames = () =>
{
    return new Promise((resolve, reject) =>
        {
            let myquery = `select * from skill;`;
            // claims my query returns undifined
            connection.query(myquery, (err, result) =>
                {
                    console.log(result)
                    err ? reject(err) : resolve(result);
                }
            );
        }
    );
}


exports.getSkills1 = (skill_id) =>
{
    console.log("got here")
    console.log(skill_id)
    return new Promise((resolve, reject) =>
        {
            let myquery = `select * from skill where skill_id = ${skill_id};`;
            console.log(myquery)
            connection.query(myquery, (err, result) =>
                {
                    err ? reject(err) : resolve(result);
                }
            );
        }
    );
}

exports.getSkills = () =>
{
    return new Promise((resolve, reject) =>
        {
            let myquery = `select * from skill;`;
            connection.query(myquery, (err, result) =>
                {
                    err ? reject(err) : resolve(result);
                }
            );
        }
    );
}

exports.editSkill = (req) =>
{
  return new Promise((resolve, reject) =>
  {
    console.log("getting skill")
    console.log(req)
    console.log("/n")
    let myquery = `select * from skill where skill_id = ${req};`;
    connection.query(myquery, (err, result) =>
      {
        err ? reject(err) : resolve(result);
      });
  })
}
exports.editOldSkills = ({skill_name, skill_id, description}) =>
{
    return new Promise((resolve, reject) =>
        {
            console.log("data to update")
            console.log(skill_name, skill_id)
            let myquery = `update skill set skill_name = '${skill_name}', description = '${description}' where skill_id = ${skill_id};`;
            console.log(myquery)
            connection.query(myquery, (err) =>
                {
                    err ? reject(err) : resolve();
                }
            );
        }
    );
}

exports.deleteSkills = (skill_id) =>
{
    console.log("skill id")
    console.log(skill_id)
    // delete entries in helper tables
    // delete from account_skill and resume_skill
    return new Promise((resolve, reject) =>
        {
            let myquery = `call deleteAllSkillData(${skill_id});`;
            connection.query(myquery, (err) =>
                {
                    err ? reject(err) : resolve();
                }

            );
        }
    );
}

exports.addSkills = (req, res) =>
{
    insertSkills(req.query, 'skills')
        .then(res.redirect('sucess'))
        .catch(err =>
            {
                console.log(err)
                res.redirect('error');
            }
        );
}

//insertSkills(skill)
exports.insertSkill = (data, item) =>
{
    console.log("item = ", item)
    return new Promise((resolve, reject) =>
        {
            let myquery = `insert into ${item} set ?`;
            connection.query(myquery, data, (err, result) =>
                {
                    err ? reject(err) : resolve(result);
                }
            );
        }
    );
}
