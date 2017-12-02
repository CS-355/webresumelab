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

exports.getTablesForNewAccount = () =>
{
  // schools
  // skills
  // companies
  return new Promise((resolve, reject) =>
    {
      let myquery = `call getTablesForAccount();`;
      connection.query(myquery, (err, result) =>
      {
        //console.log(myquery, result)
        err ? reject(err) : resolve(result);
      }
    );
    }
);
}
// account_id, resume_name, resume_id, company_id, skill_id, school_id
exports.insertNewAccountData = ({email, first_name, last_name, school_id1, skill_id1, company_id1}) =>
{
  // insert into account
  let query = {email, first_name, last_name}
  console.log(query)
  exports.insertAccount(query, 'account')
  .then(result =>
    {
      console.log(result)
      console.log(result.insertId)
      let account_id = result.insertId
      if (school_id1.constructor === Array)
      {
        for(var i = 0; i < school_id1.length; i++)
        {
          console.log("got here")
          let school_id = school_id1[i]
          let start_date = '2017-01-01 12:01'
          let end_date = '2017-01-01 12:03'
          let gpa = 3.5
          let account_school_ojb = {account_id, school_id, start_date, end_date, gpa}
          console.log("right before insert")
          console.log(account_school_ojb)
          exports.insertAccount(account_school_ojb, 'account_school')

          //account_school_ojb_array.push(account_school_ojb)
          //exports.insertAccount(account_school_ojb, 'account_school')
        }
      }
      else
      {
        if (school_id1 != null)
        {
          let school_id = school_id1
          let start_date = '2017-01-01 11:01'
          let end_date = '2017-01-01 11:03'
          let gpa = 3.7
          let account_school_ojb = {account_id, school_id, start_date, end_date, gpa}
          console.log("right before insert")
          console.log(account_school_ojb)
          exports.insertAccount(account_school_ojb, 'account_school')

          //account_school_ojb_array.push(account_school_ojb)

        }
      }

      if (company_id1.constructor === Array)
      {
        for(var i = 0; i < company_id1.length; i++)
        {
          console.log("got here")
          let company_id = company_id1[i]

          let account_company_ojb = {account_id, company_id}
          console.log("right before insert")
          console.log(account_company_ojb)
          exports.insertAccount(account_company_ojb, 'account_company')

          //account_school_ojb_array.push(account_school_ojb)
          //exports.insertAccount(account_school_ojb, 'account_school')
        }
      }
      else
      {

        let company_id = company_id1
        let account_company_ojb = {account_id, company_id}
        console.log("right before insert")
        console.log(account_company_ojb)
        exports.insertAccount(account_company_ojb, 'account_company')

        //account_school_ojb_array.push(account_school_ojb)


      }

      if (skill_id1.constructor === Array)
      {
        for(var i = 0; i < skill_id1.length; i++)
        {
          console.log("got here")
          let skill_id = skill_id1[i]
          let account_skill_ojb = {account_id, skill_id}
          console.log("right before insert")
          console.log(account_skill_ojb)
          exports.insertAccount(account_skill_ojb, 'account_skill')

          //account_school_ojb_array.push(account_school_ojb)
          //exports.insertAccount(account_school_ojb, 'account_school')
        }
      }
      else
      {
        let skill_id = skill_id1[i]
        let account_skill_ojb = {account_id, skill_id}
        console.log("right before insert")
        console.log(account_skill_ojb)
        exports.insertAccount(account_skill_ojb, 'account_skill')

        //account_school_ojb_array.push(account_school_ojb)


      }

      //console.log(account_school_ojb_array)

      //console.log(school_id.constructor === Array)
    }
  )
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

exports.getResumeId = (account_id) =>
{
  return new Promise((resolve, reject) =>
      {
          //console.log("got here")
          let myquery = `call getResumeId(${account_id});`;
          connection.query(myquery, (err, result) =>
          {
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
    //console.log("got here")
    //console.log(account_id)
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {

      let myquery = `select * from account where account_id = ${account_id};`;
      //console.log(myquery)
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

exports.getAllSRCData = (account_id) =>
{
    // get data from data base
    //console.log("got here")
    //console.log(account_id)
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {

      let myquery = `call getAllSkillResumeCompanyIds(${account_id});`;
      //console.log(myquery)
      connection.query(myquery, (err, result) =>
      {
          err ? reject(err) : resolve(result);

      });
    });


};
exports.getSkill_id = (account_id) =>
{
  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from account_skill where account_id = ${account_id};`;
      connection.query(myquery, (err, skill_ids) =>
        {
          err ? reject(err) : resolve(skill_ids);
        }
    );
    }
);
}

exports.getSkill = (skill_id) =>
{
  return new Promise((resolve, reject) =>
    {
      let myquery = `select * from skill where skill_id = ${skill_id};`;
      connection.query(myquery, (err, skill) =>
        {
          console.log(myquery)
          err ? reject(err) : resolve(skill);
        }
    );
    }
);
}
/*

*/

exports.getAllSkills = (skill_ids) =>
{
    // get data from data base
    console.log("got here")
    console.log("skill_ids", skill_ids)
    console.log("\n")
    var results = []
    if(skill_ids.constructor === Array)
    {

      for(var i = 0; i < skill_ids.length; i++)
      {
        //console.log(skill_ids[i])
        results.push(exports.getSkill(skill_ids[i].skill_id))
      }
      //console.log(results)
    }
    else
    {
      results.push(exports.getSkill(skill_ids.skill_id))
    }

    return Promise.all(results);
    //return results

     // only promise a database query

    /*return new Promise( (resolve, reject) =>
    {
      // get a subset of skill entries
      /*var part_query = ""
      if(skill_id.constructor === Array)
      {
        for (var i = 0; i < skill_id.length; i++)
        {
          part_query = part_query + skill_id[i].toString()
        }
        part_query = "(" + part_query + ")"
        let myquery = `select * from skill where skill_id is in` + part_query + `;`;
      }
      else {
        let myquery = `select * from skill where skill_id = ${skill_id};`;
      }
      let myquery = `select * from account_skill where account_id = ${account_id};`;
      //console.log(myquery)
      connection.query(myquery, (err, result) =>
      {

          err ? reject(err) : resolve(result);

      });
    });*/


};

exports.getAllSchools = (account_id) =>
{
    // get data from data base
    //console.log("got here")
    //console.log(account_id)
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {

      // get a subset of skill entries
      /*var part_query = ""
      if(resume_id.constructor === Array)
      {
        for (var i = 0; i < resume_id.length; i++)
        {
          part_query = part_query + resume_id[i].toString()
        }
        part_query = "(" + part_query + ")"
        let myquery = `select * from resume where resume_id is in` + part_query + `;`;
      }
      else {
        let myquery = `select * from resume where resume_id = ${resume_id};`;
      }   */   //console.log(myquery)
      let myquery = `select * from account_school where account_id = ${account_id};`;
      connection.query(myquery, (err, result) =>
      {
          err ? reject(err) : resolve(result);

      });
    });


};

exports.getCompanyIds = (account_id) =>
{
    // get data from data base
    //console.log("got here")
    //console.log(account_id)
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {

      // get a subset of skill entries
           //console.log(myquery)
      let myquery = `select company_id from account_company where account_id = ${account_id};`;
      connection.query(myquery, (err, result) =>
      {
          err ? reject(err) : resolve(result);

      });
    });


};

exports.getCompany = (company_id) =>
{
    // get data from data base
    //console.log("got here")
    //console.log(account_id)
     // only promise a database query
    return new Promise( (resolve, reject) =>
    {


      let myquery = `select * from company where company_id = ${company_id};`;
      connection.query(myquery, (err, result) =>
      {
          err ? reject(err) : resolve(result);

      });
    });


};


exports.getAllCompanies = (company_ids) =>
{
    // get data from data base
    console.log("got here")
    console.log("company_ids", company_ids)
    console.log("\n")
    var results = []
    if(company_ids.constructor === Array)
    {

      for(var i = 0; i < company_ids.length; i++)
      {
        //console.log(skill_ids[i])
        results.push(exports.getCompany(company_ids[i].company_id))
      }
      //console.log(results)
    }
    else
    {
      results.push(exports.getCompany(skill_ids.skill_id))
    }

    return Promise.all(results);
}


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
    // get all data from skill, company, and resume tables for selected account
    let myquery = `call getDataForAccount(${req});`;/*`select * from account where account_id = ${req};`*/;
    connection.query(myquery, (err, result) =>
    {
      err ? reject(err) : resolve(result);
    });
  }
)
}

exports.editOldAccount = ({email, first_name, last_name, account_id, skill_id, company_id, school_id}) =>

{
  // delete data in helper tables with account_id

  exports.deleteHelperTablesForAccount(account_id)


  // update  account and helper tables with account_id
  let skill_id1 = skill_id
  let school_id1 = school_id
  let company_id1 = company_id
  let object = {email, first_name, last_name, account_id, skill_id1, company_id1, school_id1}
  console.log("insert new data into tables")
  exports.updateNewAccountData(object)
  /*return new Promise((resolve, reject) =>
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
)*/
}

exports.deleteHelperTablesForAccount = (account_id) =>
{
  console.log("about to change")
  console.log(account_id)
  return new Promise((resolve, reject) =>
    {
      // make query to remove the account from the database
      var myquery = `call deleteHelperAccountTables(${account_id});`;
      connection.query(myquery, (err) =>
        {
          console.log(myquery)
          err ? reject(err) : resolve();
        }


    );

  }

)
}

exports.updateNewAccountData = ({email, first_name, last_name, account_id,  school_id1, skill_id1, company_id1}) =>
{
  // insert into account
  let query = {email, first_name, last_name, account_id}
  console.log(query)
  exports.updateAccount(query)
  .then(result =>
    {
      console.log(result, school_id1 != undefined)
      //console.log(result.insertId)
      //let account_id = result.insertId

        if (school_id1.constructor === Array)
        {
          for(var i = 0; i < school_id1.length; i++)
          {
            console.log("got here")
            let school_id = school_id1[i]
            let start_date = '2017-01-01 12:01'
            let end_date = '2017-01-01 12:03'
            let gpa = 3.5
            if(school_id != undefined)
            {
            let account_school_ojb = {account_id, school_id, start_date, end_date, gpa}
            console.log("right before insert")
            console.log(account_school_ojb)
            exports.insertAccount(account_school_ojb, 'account_school')
            }
            //account_school_ojb_array.push(account_school_ojb)
            //exports.insertAccount(account_school_ojb, 'account_school')
          }
        }
        else
        {

            let school_id = school_id1
            let start_date = '2017-01-01 11:01'
            let end_date = '2017-01-01 11:03'
            let gpa = 3.7
            if(school_id != undefined)
            {
            let account_school_ojb = {account_id, school_id, start_date, end_date, gpa}
            console.log("right before insert")
            console.log(account_school_ojb)
            exports.insertAccount(account_school_ojb, 'account_school')
            }
            //account_school_ojb_array.push(account_school_ojb)


        }


      if (company_id1.constructor === Array)
      {
        for(var i = 0; i < company_id1.length; i++)
        {
          console.log("got here")
          let company_id = company_id1[i]

          let account_company_ojb = {account_id, company_id}
          console.log("right before insert")
          console.log(account_company_ojb)
          if(company_id != undefined)
          {
          exports.insertAccount(account_company_ojb, 'account_company')
          }
          //account_school_ojb_array.push(account_school_ojb)
          //exports.insertAccount(account_school_ojb, 'account_school')
        }
      }
      else
      {

        let company_id = company_id1
        let account_company_ojb = {account_id, company_id}
        console.log("right before insert")
        console.log(account_company_ojb)
        if(company_id != undefined)
        {
        exports.insertAccount(account_company_ojb, 'account_company')
        }
        //account_school_ojb_array.push(account_school_ojb)


      }

      if (skill_id1.constructor === Array)
      {
        for(var i = 0; i < skill_id1.length; i++)
        {
          console.log("got here")
          let skill_id = skill_id1[i]
          let account_skill_ojb = {account_id, skill_id}
          console.log("right before insert")
          console.log(account_skill_ojb)
          if(skill_id != undefined)
          {
          exports.insertAccount(account_skill_ojb, 'account_skill')
          }
          //account_school_ojb_array.push(account_school_ojb)
          //exports.insertAccount(account_school_ojb, 'account_school')
        }
      }
      else
      {
        let skill_id = skill_id1[i]
        let account_skill_ojb = {account_id, skill_id}
        console.log("right before insert")
        console.log(account_skill_ojb)
        if(skill_id != undefined)
        {
        exports.insertAccount(account_skill_ojb, 'account_skill')
        }
        //account_school_ojb_array.push(account_school_ojb)


      }

      //console.log(account_school_ojb_array)

      //console.log(school_id.constructor === Array)
    }
  )
}

exports.updateAccount //= function(params, callback)
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
     = ({email, first_name, last_name, account_id}) => {
       //console.log("item = ", item)
      return new Promise((resolve, reject) => {
        let myquery = `update account set email = '${email}', first_name = '${first_name}', last_name = '${last_name}' where account.account_id = ${account_id}`;
        connection.query(myquery, (err) => {

          //console.log(myquery, "\n", data)
          err ? reject(err) : resolve();
        });
      });
}

exports.deleteAllTracesOfAccount = (account_id) =>
{
    console.log("got here")
  console.log(account_id)
  // delete account id in tables
  // deleteHelperAccountTables
  exports.deleteHelperTablesForAccount(account_id)

  console.log("deleted helper tables")
  exports.getResumeId(account_id)
  .then(result =>
    {
      console.log("recursive delete")
      console.log(result)
      if(result[0].length == 0)
      {
        console.log("got herefff")
        exports.deleteAccount1(account_id)
      }
      else
      {
        for(var i = 0; i < result[0].length; i++)
        {
          let resume_id = result[0][i].resume_id
          console.log("resume id")
          console.log(resume_id)

          //result.resume_id
          // delete account id in account
          exports.deleteAccount(account_id, resume_id)
        }
      }

    }

  )
}

exports.deleteAccount = (account_id, resume_id) =>
{

  console.log(account_id, resume_id)
  return new Promise((resolve, reject) =>
    {
      // make query to remove the account from the database
      var myquery = `call deleteAccount(${account_id}, ${resume_id});`;
      connection.query(myquery, (err) =>
        {
          err ? reject(err) : resolve();
        }


    );

  }

)
}

exports.deleteAccount1 = (account_id) =>
{

  console.log(account_id)
  return new Promise((resolve, reject) =>
    {
      // make query to remove the account from the database
      var myquery = `call deleteAccount1(${account_id});`;
      connection.query(myquery, (err) =>
        {
          console.log(myquery)
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

          console.log(myquery, "\n", data)
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
