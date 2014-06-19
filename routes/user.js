var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');


// 展示博客内容
router.get('/:user', function(req, res){
	var username = req.params.user.slice(1);
	User.get(username, function(err, user){	
		if(!user){
			req.flash('error', '用户不存在');
			return res.redirect('/');
		}
		Post.get(user.name, function(err, posts){
			if(err){
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('user', {
				title: user.name,
				posts: posts
			});
		});

	});
	
});





module.exports = router;
