var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');

/* 渲染主页 */
router.get('/', function(req, res) {
		Post.get(null, function(err, posts){
			if(err){
				posts = [];
			}
	    res.render('index', { title: 'Blog', posts: posts });
		});
});
// 插入博客内容
router.post('/', function(req, res){
	var currentUser = req.session.user;
	var post = new Post(currentUser.name, req.body.blog);
	post.save(function(err){
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		req.flash('success', '发表成功');
		res.redirect('/u/:' + currentUser.name);
	});
});

module.exports = router;
