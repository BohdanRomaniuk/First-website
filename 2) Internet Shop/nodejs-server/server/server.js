const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/asus_shop';

//File Uploading System
var multer = require('multer');
var image_filename;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../nginx/html/images/');
    },
    filename: function (req, file, cb) {
		image_filename = file.originalname;
        cb(null, image_filename);
    }
});
var upload = multer({
    storage: storage
});


//USER SESSION!!!!!!!
var sess;
//TOVARS PER PAGE
var per_page = 3;

//SELECT TOVARS
router.get('/server/index/:page_number&:order_type', (req, res, next) => {
	sess=req.session;
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

	
	var limit_from = req.params.page_number*per_page-per_page;
	
	var order_type = req.params.order_type;
	var ordering = "t.price ASC";
	switch(order_type)
	{
		case "price_asc":
			ordering = "t.price ASC";
			break;
		case "price_dsc":
			ordering = "t.price DESC";
			break;
		case "action_asc":
			ordering = "t.action ASC";
			break;
		case "action_dsc":
			ordering = "t.action DESC";
			break;
	}
	
	var query;
	if(sess.username)
	{
	  query = client.query('SELECT t.*, b.username, b.cancel FROM tovars AS t LEFT JOIN (SELECT DISTINCT tovar_id, username, cancel FROM buckets WHERE username =($1) AND cancel=false) AS b ON t.tovar_id=b.tovar_id ORDER BY ' + ordering + ' LIMIT ($2) OFFSET ($3);', [sess.username, per_page, limit_from]);
	}
	else
	{
	  query = client.query('SELECT t.* FROM tovars AS t ORDER BY ' + ordering + ' LIMIT ($1) OFFSET ($2);',[per_page, limit_from]);
	}
	query.on('row', (row) => {
	  row.cancel = (sess.username && row.username==sess.username && !row.cancel)?"unset":"none";
	  row.buy = (sess.username && row.cancel=="none")?"unset":"none";
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });

  });
});

//PAGES!!!
router.get('/server/pages', (req, res, next) => {
	sess=req.session;
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

	var query = client.query('SELECT CEIL(CAST (COUNT(*) AS FLOAT)/'+per_page+')  AS pages FROM tovars;');
	query.on('row', (row) => {
	  for(var i=1; i<=row.pages; ++i)
	  {
		results.push({number: i});
	  }
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });

  });
});

//DELETE TOVAR FROM BUCKET ON INDEX PAGE
router.delete('/server/index/:bucket_id&:page_number&:order_type', (req, res, next) => {
  sess=req.session;
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const data = {username: sess.username};
    client.query('UPDATE buckets SET cancel=true WHERE tovar_id=($1) AND username=($2) AND cancel=false;', [req.params.bucket_id, sess.username]);
    var per_page = 3;
	var limit_from = req.params.page_number*per_page-per_page;
	
	var order_type = req.params.order_type;
	var ordering = "t.price ASC";
	switch(order_type)
	{
		case "price_asc":
			ordering = "t.price ASC";
			break;
		case "price_dsc":
			ordering = "t.price DESC";
			break;
		case "action_asc":
			ordering = "t.action ASC";
			break;
		case "action_dsc":
			ordering = "t.action DESC";
			break;
	}
	
	var query;
	if(sess.username)
	{
	  query = client.query('SELECT t.*, b.username, b.cancel FROM tovars AS t LEFT JOIN (SELECT DISTINCT tovar_id, username, cancel FROM buckets WHERE username =($1) AND cancel=false) AS b ON t.tovar_id=b.tovar_id ORDER BY ' + ordering + ' LIMIT ($2) OFFSET ($3);', [sess.username, per_page, limit_from]);
	}
	else
	{
	  query = client.query('SELECT t.* FROM tovars AS t ORDER BY ' + ordering + ' LIMIT ($1) OFFSET ($2);',[per_page, limit_from]);
	}
	query.on('row', (row) => {
      row.cancel = (sess.username && row.username==sess.username && !row.cancel)?"unset":"none";
	  row.buy = (sess.username && row.cancel=="none")?"unset":"none";
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
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
		navelements.push({name: 'bucket', href: 'bucket.html', text: 'Корзина'});
		navelements.push({name: 'profile', href: 'profile.html', text: 'Профіль ['+sess.username+']'});
		if(sess.userrole=='admin')
		{
			navelements.push({name: 'admin', href: '/admin/', text: 'Керування сайтом'});
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

//SELECT BUCKET TOVARS
router.get('/server/bucket', (req, res, next) => {
	sess=req.session;
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const data = {username: sess.username};
	const query = client.query('SELECT b.bucket_id, t.* FROM tovars AS t, buckets AS b WHERE b.tovar_id=t.tovar_id AND b.username=($1) AND b.cancel=false ORDER BY t.tovar_id ASC;', [data.username]);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });

  });
});

//SELECT CANCEL TOVARS
router.get('/server/cancels', (req, res, next) => {
	sess=req.session;
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const data = {username: sess.username};
	const query = client.query('SELECT b.bucket_id, t.* FROM tovars AS t, buckets AS b WHERE b.tovar_id=t.tovar_id AND b.username=($1) AND b.cancel=true ORDER BY t.tovar_id ASC;', [data.username]);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });

  });
});

//ADD TOVAR TO BUCKET
router.post('/server/addBucket/:tovar_id&:page_number&:order_type', (req, res, next) => {
  sess=req.session;
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const data = {username: sess.username, id: req.params.tovar_id};
    client.query('INSERT INTO buckets(username, tovar_id) VALUES($1, $2)', [data.username, data.id]);
    var per_page = 3;
	var limit_from = req.params.page_number*per_page-per_page;
	
	var order_type = req.params.order_type;
	var ordering = "t.price ASC";
	switch(order_type)
	{
		case "price_asc":
			ordering = "t.price ASC";
			break;
		case "price_dsc":
			ordering = "t.price DESC";
			break;
		case "action_asc":
			ordering = "t.action ASC";
			break;
		case "action_dsc":
			ordering = "t.action DESC";
			break;
	}
	
	var query;
	if(sess.username)
	{
	  query = client.query('SELECT t.*, b.username, b.cancel FROM tovars AS t LEFT JOIN (SELECT DISTINCT tovar_id, username, cancel FROM buckets WHERE username =($1) AND cancel=false) AS b ON t.tovar_id=b.tovar_id ORDER BY ' + ordering + ' LIMIT ($2) OFFSET ($3);', [sess.username, per_page, limit_from]);
	}
	else
	{
	  query = client.query('SELECT t.* FROM tovars AS t ORDER BY ' + ordering + ' LIMIT ($1) OFFSET ($2);',[per_page, limit_from]);
	}
    query.on('row', (row) => {
	  row.cancel = (sess.username && row.username==sess.username && !row.cancel)?"unset":"none";
	  row.buy = (sess.username && row.cancel=="none")?"unset":"none";
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//DELETE TOVAR FROM BUCKET
router.delete('/server/deleteBucket/:bucket_id', (req, res, next) => {
  sess=req.session;
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const data = {username: sess.username};
    client.query('UPDATE buckets SET cancel=true WHERE bucket_id=($1);', [req.params.bucket_id]);
    var query = client.query('SELECT b.bucket_id, t.* FROM tovars AS t, buckets AS b WHERE b.tovar_id=t.tovar_id AND b.username=($1) AND b.cancel=false ORDER BY t.tovar_id ASC;', [data.username]);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//#
//#####-----------------[ADMIN PART]
//#
//SELECT TOVARS ADMIN PAGE
router.get('/server/admin/index', (req, res, next) => {
	sess=req.session;
	if(sess.userrole=='admin')
	{
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const query = client.query('SELECT * FROM tovars ORDER BY tovar_id ASC;');
    query.on('row', (row) => {
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
	  row.del_action = (row.action==0)?"none":"unset";
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });

  });
 }	
});

//ADD NEW TOVAR
router.post('/server/admin/add', upload.single('imagefile'), function (req, res, next) {
	sess=req.session;
	//var createdSuccesfully = false;
	const data = {tovar_name: req.body.tovar_name, image_link: '/images/'+image_filename, description: req.body.description, price: req.body.price};
	pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	var query;
	//console.log(req);
	if(sess.userrole=='admin')
	{
		query = client.query('INSERT INTO tovars(tovar_name, image, description, price) VALUES($1,$2,$3,$4);', [data.tovar_name, data.image_link, data.description, data.price]);
	}
	else
	{
		query = client.query('SELECT * FROM tovars;');
	}
    //createdSuccesfully = true;
    query.on('end', () => {
      done();
      //return res.json(createdSuccesfully);
	  return res.redirect('http://localhost:7070/admin/add.html');
    });
  });
});

//ADD ACTION TO TOVAR
router.post('/server/admin/addActionToTovar/:tovar_id&:action_amount', (req, res, next) => {
  sess=req.session;
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
	const data = { id: req.params.tovar_id, amount: req.params.action_amount};
    client.query('UPDATE tovars SET action=($1) WHERE tovar_id=($2)', [data.amount, data.id]);
    var query = client.query('SELECT * FROM tovars ORDER BY tovar_id ASC');
    query.on('row', (row) => {
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
	  row.del_action = (row.action==0)?"none":"unset";
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//DELETE ACTION FROM TOVAR
router.delete('/server/admin/deleteActionFromTovar/:tovar_id', (req, res, next) => {
  const results = [];
  const id = req.params.tovar_id;
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('UPDATE tovars SET action=0 WHERE tovar_id=($1)', [id]);
    var query = client.query('SELECT * FROM tovars ORDER BY tovar_id ASC');
    query.on('row', (row) => {
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
	  row.del_action = (row.action==0)?"none":"unset";
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//DELETE TOVAR
router.delete('/server/admin/index/:tovar_id', (req, res, next) => {
  const results = [];
  const id = req.params.tovar_id;
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('DELETE FROM tovars WHERE tovar_id=($1)', [id]);
    var query = client.query('SELECT * FROM tovars ORDER BY tovar_id ASC');
    query.on('row', (row) => {
	  row.action = (row.action==0)?"":"Акція!!! -" + row.action + "% !!!";
	  row.del_action = (row.action==0)?"none":"unset";
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
