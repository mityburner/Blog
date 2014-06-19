var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');

router.post('/', function(req, res) {
  // 检查用户名和密码是否为空
  if(!req.body.username || !req.body.password || !req.body.confirm-password){
  	req.flash('error', '用户名或者密码为空');
  	return res.redirect('/reg');
  }
  // 检查用户两次输入的密码是否一致
  if(req.body['password'] != req.body['confirm-password']){
  	req.flash('error','两次输入的密码不一致');
  	return res.redirect('/reg');
  }
  	// 用md5将将密码加密update()方法
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name: req.body.username,
		password: password
	});
	// 检查用户是否已经存在
	User.get(newUser.name, function(err,user){
		if(user){
			err = '用户已经存在';
		}
		if(err){
			req.flash('error', err);
			return res.redirect('/reg');
		}
		// 不存在则新增用户
		newUser.save(function (err) {
			if(err){
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '恭喜您，注册成功');
			setTimeout('',5000);
			res.redirect('/');
		});


	});


});

module.exports = router;
