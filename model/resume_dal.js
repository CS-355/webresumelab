var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);
exports.getAllResumeNames = () =>
{
    return new Promise((resolve, reject) =>
      {
        let myquery = 'select * from resume;';
        connection.query(myquery, (err, result) =>
          {
            console.log(result)
            err ? reject(err) : resolve(result);
          });
      }

    );
}

exports.getResume1 = (resume_id) =>
{
  console.log("got here")
  console.log(resume_id)

  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from resume where resume_id = ${resume_id};`;
      console.log(myquery)
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    })};

exports.getResume = () =>
{
  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from resume;`;
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    });
  };

exports.editResume = (req) =>
{
  return new Promise((resolve, reject) =>
  {
    console.log("getting resume")
    console.log(req)
    console.log("/n")
    let myquery = `select * from resume where resume_id = ${req};`;
    connection.query(myquery, (err, result) =>
      {
        err ? reject(err) : resolve(result);
      });
  }
)
}

// double check the object deconstruction
exports.editOldResume = ({resume_name, resume_id}) =>
{
  return new Promise((resolve, reject) =>
    {
      console.log("data to update")
      console.log(resume_name, resume_id)
      let myquery = `update resume set resume_name = '${resume_name}' where resume_id = ${resume_id};`;
      console.log(myquery)
      connecton.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }
    );
    }
)
}

exports.deleteResume = (resume_id) =>
{
  console.log(resume_id)
  return new Promise((resolve, reject) =>
    {
      let myquery = `delete from resume where resume_id = ${resume_id};`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }

    );
    }
)
}

exports.addResume = (req, res) =>
{
  insertResume(req.query, 'resume')
  .then(res.redirect('sucess'))
  .catch(err =>
    {
      console.log(err)
      res.redirect('error');
    }
  );
}

exports.insertResume = (data, item) =>
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
