var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM address;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
exports.getAllAddressNames = () =>
{
    return new Promise((resolve, reject) =>
      {
        let myquery = 'select * from address;';
        connection.query(myquery, (err, result) =>
          {
            console.log(result)
            err ? reject(err) : resolve(result);
          });
      }

    );
}

exports.getAddress1 = (address_id) =>
{
  console.log("got here")
  console.log(address_id)

  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from address where address_id = ${address_id};`;
      console.log(myquery)
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    })};

exports.getAddress = () =>
{
  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from address;`;
      connection.query(myquery, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    });
  };

exports.editAddress = (req) =>
{
  return new Promise((resolve, reject) =>
  {
    console.log("getting address")
    console.log(req)
    console.log("\n")
    let myquery = `select * from address where address_id = ${req};`;
    connection.query(myquery, (err, result) =>
    {
      err ? reject(err) : resolve(result);
    });
  })
}

// double check the object deconstruction
exports.editOldAddress = ({street, zip_code, address_id}) =>
{
  return new Promise((resolve, reject) =>
    {
      console.log("data to update")
      console.log(street, zip_code, address_id)
      let myquery = `update address set street = '${street}', zip_code = ${zip_code} where address_id = ${address_id};`;
      console.log(myquery)
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }
    );
    }
)
}

exports.getAllSchoolIds = (address_id) =>
{
  return new Promise((resolve, reject) =>
  {
    let myquery = `select school_id from school where address_id = ${address_id};`;
    connection.query(myquery, (err, school_ids) =>
    {
      err ? reject(err) : resolve(school_ids);
    }
  )
  }
)
}
exports.deleteSchoolHelperTables = (address_id, school_id) =>
{
  //console.log(address_id, school_id)


  return new Promise((resolve, reject) =>
    {
      let myquery = `call deleteAddress(${address_id}, ${school_id});`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }

    );
    }
)
}

exports.deleteFromComanyAddress = (address_id) =>
{
  console.log(address_id)


  return new Promise((resolve, reject) =>
    {
      let myquery = `delete from company_address where address_id = ${address_id};`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }

    );
    }
)
}

exports.deleteFromAddress = (address_id) =>
{
  console.log(address_id)


  return new Promise((resolve, reject) =>
    {
      let myquery = `delete from address where address_id = ${address_id};`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }

    );
    }
)
}

exports.addAddress = (req, res) =>
{
  insertAddress(req.query, 'address')
  .then(res.redirect('sucess'))
  .catch(err =>
    {
      console.log(err)
      res.redirect('error');
    }
  );
}

exports.insertAddress = (data, item) =>
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
