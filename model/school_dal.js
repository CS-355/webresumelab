var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM school;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
exports.getAllSchoolNames = () =>
{
    return new Promise((resolve, reject) =>
      {
        let myquery = 'select * from school;';
        connection.query(myquery, (err, result) =>
          {
            console.log(result)
            err ? reject(err) : resolve(result);
          });
      }

    );
}

exports.getSchool1 = (school_id) =>
{
  console.log("got here")
  console.log(school_id)
  console.log("fails after here")

  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from school where school_id = ${school_id};`;
      console.log(myquery)
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    })};

exports.getSchool = () =>
{
  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from school;`;
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    });
  };
////////
exports.editSchool = (req) =>
{
  return new Promise((resolve, reject) =>
  {
    console.log("getting school")
    console.log(req)
    console.log("\n")
    let myquery = `select * from school where school_id = ${req};`;
    connection.query(myquery, (err, result) =>
    {
      err ? reject(err) : resolve(result);
    });
  }
)
}


// double check the object deconstruction
exports.editOldSchool = ({school_name, school_id}) =>
{
  return new Promise((resolve, reject) =>
    {
      console.log("data to update")
      console.log(school_name, school_id)
      let myquery = `update school set school_name = '${school_name}' where school_id = ${school_id};`;
      console.log(myquery)
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }
    );
    }
)
}

exports.deleteSchool = (school_id) =>
{
  console.log(school_id)
  return new Promise((resolve, reject) =>
    {
      let myquery = `delete from school where school_id = ${school_id};`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }

    );
    }
)
}

exports.addSchool = (req, res) =>
{
  insertSchool(req.query, 'school')
  .then(res.redirect('sucess'))
  .catch(err =>
    {
      console.log(err)
      res.redirect('error');
    }
  );
}

exports.insertSchool = (data, item) =>
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
