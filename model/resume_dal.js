var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);

// make a stored procedure
// get account for each resume id
// stored procdeure should have resumes = [] and accounts = []
// make sure accounts is ordered in assending order of resumes
// stored_prodedure_result[0] = resumes
// stored_prodedure_result[1] = accounts
exports.getAllResumeNames = () =>
{
    return new Promise((resolve, reject) =>
      {
        let myquery = 'select r.resume_id, r.resume_name, a.first_name, a.last_name from resume as r left join account as a on a.account_id = r.account_id order by r.resume_id asc;';
        connection.query(myquery, (err, result) =>
          {
            //console.log(result)
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

exports.getDataForAddNewResumeForm = (account_id) =>
{
  // get all users in database
  console.log(account_id)
  return new Promise((resolve, reject) =>
    {
      let myquery = `call getDataForResume(${account_id});`;
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    }
)
  // account_id
  // resume
  // school
  //only have the schools the user attends-->

   // have each company the user has worked for stored in account_company table-->
   // have each skill the user has in account skills table-->


}

exports.insertNewResumeData = ({account_id, resume_name, school_id, company_id, skill_id}) =>
{
  //insertResume()
  // insert account_id, resume_name into resume table
  let query = {account_id, resume_name}
  console.log(query)
  exports.insertResume(query, 'resume')
  .then(result =>
    {
      console.log(result)
      console.log(result.insertId)
      console.log("insert query sucessfull")
      let resume_id = result.insertId
      let data_shared = 'this is data shared'
      let was_hired = true
      let resume_company_obj = {resume_id, company_id, data_shared, was_hired}
      exports.insertResume(resume_company_obj, 'resume_company')
      .then(result =>
        {
          let resume_school_obj = {resume_id, school_id}
          exports.insertResume(resume_school_obj, 'resume_school')
          .then(result =>
            {

              let resume_skill_obj = {resume_id, skill_id}
              exports.insertResume(resume_skill_obj, 'resume_skill')
            }

          )
        }
      )
    }
  )
  // insert data into resume_company(nulls for empty fields)
  // insert data into resume_school
  // insert data into resume_skill
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
  console.log("item =", item)
  return new Promise((resolve, reject) =>
    {
      let myquery = `insert into ${item} set ?`;
      connection.query(myquery, data, (err, result) =>
        {
          console.log(myquery)
          err ? reject(err) : resolve(result);
        }
    );
    }
);
}
