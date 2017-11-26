var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAllAccountNames =  (callback) =>
{
    var query = 'select * from account;';
    connection.query(query, function (err, result)
    {
        callback(err, result);
    });
};


exports.getAllAccountNames2 = () =>
{
    return new Promise((resolve, reject) =>
        {
            let myquery = 'select * from account;';
            connection.query(myquery, (err, result) =>
            {
                err ? reject(err) : resolve(result);
            });
        }
    );
}


function getAllAccountNames2()
{
    // undefined is not a promise
    return new Promise(function(resolve, reject)
        {
            console.log("got here")
            let myquery = 'select * from account;';
            connection.query(myquery, (err, result) =>
            {console.log(result)
                err ? reject(err) : resolve(result);

            });
        }
    );
}
/*
exports.getAllAccountNames2 = () =>
{
    // doesn't like resolve
    return new Promise(function(resolve, reject) =>
        {
            let myquery = 'select * from account;';
            connection.query(myquery, (err, result) =>
            {
                err ? reject(err) : result;
            });
        }
    );
}
*/

// not sure why this doesn't work

/*

function(req, res) {
  // if the data is grabbed suscessfully, then render the page
    company_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('company/companyViewAll', { 'result':result });
        }
    });
    // = getAccount
*/
// what is getAll = to?
// data query function(callback)
/* promise(data_query_function
  .then(

  render(address_to_page)
))?
*/

exports.getAccount1 = (account_id) =>
{
    // get data from data base
    console.log("got here")
    console.log(account_id)
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {

      let myquery = `select * from account where account_id = ${account_id};`;
      console.log(myquery)
      connection.query(myquery, (err, result) =>
      {
          err ? reject(err) : resolve(result);

      });
    });
      /*
    .catch(err =>

      {
          console.log(err);
          res.redirect('error');
      }
      )
      */

};

exports.getAccount = () =>
{
    // get data from data base
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {

      let myquery = `select * from account;`;
      connection.query(myquery, (err, result) =>
      {
          err ? reject(err) : resolve(result);

      });
    });
      /*
    .catch(err =>

      {
          console.log(err);
          res.redirect('error');
      }
      )
      */

};

exports.editAccount = (req/*req.query.account_id from caller*/) =>
{
  return new Promise((resolve, reject) =>
  {
    console.log("getting account")
    console.log(req)
    console.log("\n")
    let myquery = `select * from account where account_id = ${req};`;
    connection.query(myquery, (err, result) =>
    {
      err ? reject(err) : resolve(result);
    });
  }
)
}

exports.editOldAccount = ({email, first_name, last_name, account_id}) =>

{
  return new Promise((resolve, reject) =>
    {

      console.log("data to update")
      //console.log(req)
      console.log(email, first_name, last_name, account_id)
      let myquery = `update account set email='${email}', first_name='${first_name}', last_name='${last_name}' where account_id=${account_id};`;
      console.log(myquery)
      connection.query(myquery, (err) =>
      {
        err ? reject(err) : resolve();
      }
    );
    }
)
}
exports.deleteAccount = (account_id) =>
{
  console.log(account_id)
  return new Promise((resolve, reject) =>
    {
      // make query to remove the account from the database
      let myquery = `delete from account where account_id = ${account_id};`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }
    );
  }

)
}

function getAllAccountNamesPage(req, res)
{
    res.render('company/insertAccount');
}

exports.getAllAccountNamesPage = (req, res) =>
{
    res.render('company/insertAccount');
}


exports.addAccount = (req, res) =>
{
    insertAccount(req.query, 'account')
    .then(res.redirect('success'))
    .catch(err =>
    {
        console.log(err)
        res.redirect('error');
    });
}


//insertAccount(req.query, 'account')
//            .then(res.send('{sucess: true}'))
//            .catch(err => {
//                        res.send(`{error : ${error}}`);
//                    });

exports.insertAccount //= function(params, callback)
//{
    // FIRST INSERT THE ACCOUNT
    //var query = 'insert into account(email, first_name, last_name) values (?)';
    //var queryData = [params.email, params.first_name, params.last_name];
    //console.log(query);
    // running the query is wrong
    //connection.query(query, queryData, function(err, result)
    //{
      //  callback(err, result);
    //}
    //);
     = (data, item) => {
       console.log("item = ", item)
      return new Promise((resolve, reject) => {
        let myquery = `insert into ${item} set ?`;
        connection.query(myquery, data, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
}
//};


/*router.get('/hello/:id/:david', (req, res) => {
  let id = req.params.id;
  let david = req.params.david;

  //localhost:300/hello/dfj34oij34/34o5i6jefj;

})
*/
