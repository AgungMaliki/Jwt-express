const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req,res) => {

	res.json({
		message: 'welcome'
	});
});

// format = Bearer <access token>

function verifyToken(req, res, next){
	const bearerHeader = req.headers['authorization'];

	if(typeof bearerHeader !== 'undefined'){
		// split at the space
		const bearer = bearerHeader.split(' ');
		// get token from array
		const bearerToken = bearer[1];
		// set token
		req.token = bearerToken;

		next();
	} else {
		res.sendStatus(403);
	}
}


app.post('/api/post', verifyToken ,(req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err){
			res.sendStatus(403);
		} else {
			
	res.json({
		message: 'post created',
		authData
	});
		}
	});
});

app.post('/api/login', (req, res) => {
 
 const user = {
 	id: 1,
 	username: 'agung',
 	email: 'test@test.com'
 }

 jwt.sign({user}, 'secretkey', { expiresIn: '30s' } ,(err, token) => {
 	res.json({
 		token
 	});
 });
});

app.listen(5000, () => console.log('server started at 5000'));