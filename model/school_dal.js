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

exports.getAllAddresses = () =>
{
  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from address;`;
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        }
    )
    }
)
}

exports.insertNewSchoolData = ({school_name, address_id}) =>
{
  // put in the school
  // make sure the address_id is in the school table so it can reference the selected addresses
  // bulk insert loop

  let query = {school_name, address_id}
  console.log(query)
  // insert into the school table
  exports.insertSchool(query, 'school')
  .then(result =>
    {
      console.log(result.insertId)

    }
  );




  // for address ids
  // put in the
  //let school_id =
  // insert into
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
  // should get the school and all address and the chosen address

  exports.getAddressId(req)
  .then(result =>
    {
      let school_id = req
      let address_id = result[0][0].address_id

      //exports.getAllSchoolData(req, result[0][0].address_id)

    }

  )



}
exports.getAllSchoolData = (school_id, address_id) =>
{
  return new Promise((resolve, reject) =>
  {
    console.log("getting school")
    console.log("school_id, address_id")
    console.log(school_id, address_id)
    console.log("\n")

    let myquery = `call getAllSchoolData(${school_id}, ${address_id});`;
    connection.query(myquery, (err, result) =>
    {
      console.log(myquery)
      err ? reject(err) : resolve(result);
    });
  })
}
exports.getAddressId = (school_id) =>
{
  return new Promise((resolve, reject) =>
      {
          //console.log("got here")
          let myquery = `call getAddressId(${school_id});`;
          connection.query(myquery, (err, result) =>
          {
              err ? reject(err) : resolve(result);

          });
      }
  );
}


// double check the object deconstruction
exports.editOldSchool = ({school_name, school_id, address_id}) =>
{
  return new Promise((resolve, reject) =>
    {
      // take school_id and use it to delete entry from account_school and resume_school
      // update school table
      console.log("data to update")
      console.log(school_name, school_id)
      let myquery = `update school set school_name = '${school_name}' , address_id = ${address_id} where school_id = ${school_id};`;
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
