const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@127.0.0.1:5432/load_balancer';
//USER SESSION!!!!!!!
var sess;


//CALCULATIONS
router.post('/server/calculate', (req, res, next) => {
  sess = req.session;
  var calculation_result="невизначено";
  const input = {size: req.body.system_size, matrix: req.body.matrix, vector: req.body.vector};
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	calculation_result = "якісь обчислення які виконуються на сервері";
    const query = client.query('INSERT INTO tasks(username, task_system_size, task_input_matrix,task_input_vector,task_result,task_date) VALUES($1,$2,$3,$4,$5,$6);', [sess.username, input.size, input.matrix, input.vector, calculation_result, '2017-11-14']);
    
    query.on('end', () => {
      done();
      return res.json(calculation_result);
    });
  });
});

//GET HISTORY OF CALCULATIONS
router.get('/server/old_calculations', (req, res, next) => {
	sess=req.session;
	var results = [];
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('SELECT* FROM tasks WHERE username=$1', [sess.username]);
    query.on('row', (row) => {
		results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//REGISTER NEW USER
router.post('/server/register', (req, res, next) => {
	var results = false;
	const data = {username: req.body.username, userpassword: req.body.userpassword, userrole: 'simple'};
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('INSERT INTO users(username, userpassword, userrole) values($1, $2, $3)', [data.username, data.userpassword, data.userrole]);
    const query = client.query('SELECT * FROM users WHERE username=($1) LIMIT 1', [data.username]);
    query.on('row', (row) => {
      results = true;
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//USER LOGIN FORM
router.post('/server/login', (req, res, next) => {
  var isLoggined = false;
  const data = {username: req.body.username, userpassword: req.body.userpassword};
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('SELECT * FROM users WHERE username=($1) AND userpassword=($2) LIMIT 1', [data.username, data.userpassword]);
    query.on('row', (row) => {
		//START SESSION
		sess=req.session;
		sess.username=req.body.username;
		sess.userrole=row.userrole;
		//START SESSION
		isLoggined = true;
    });
    query.on('end', () => {
      done();
      return res.json(isLoggined);
    });
  });
});

//USER LOGOUT FORM
router.get('/server/logout', (req, res, next) => {
	req.session.destroy(function(err){
	if(err){
		console.log(err);
	}
	else
	{
		return res.json(true);
	}
  });
});

//NAVIGATION MENU
router.get('/server/navigation', (req, res, next) => {
	sess=req.session;
	const navelements = [];
navelements.push({name: 'main', href: '/', text: 'Головна'});
	if(sess.username)
	{
		navelements.push({name: 'profile', href: 'profile.html', text: 'Профіль ['+sess.username+']'});
		if(sess.userrole=='admin')
		{
			navelements.push({name: 'admin', href: '/admin/', text: 'Панель керування'});
		}
		navelements.push({name: 'logout', href: '/logout.html', text: 'Вийти'});
	}
	else
	{
		navelements.push({name: 'login', href: 'login.html', text: 'Вхід'});
		navelements.push({name: 'register', href: 'register.html', text: 'Реєстрація'});
	}
	return res.json(navelements);
});

module.exports = router;