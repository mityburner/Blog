var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');


router.post('/', function(req, res) {
  //res.render('login', { title: '用户登录' });
  //判断用户名或者密码是否为空
if(!(req.body.username) || !(req.body.password)){
	req.flash('error','请输入用户名和密码');
	return res.redirect('/login');
}

// 为密码进行加密
var md5 = crypto.createHash('md5');
var password = md5.update(req.body.password).digest('base64');

User.get(req.body.username, function(err,user){
	if(!user){
		req.flash('error', '用户名不存在');
		return res.redirect('/login');
	}
	if(user.password != password){
		req.flash('error', '密码不正确');
		return res.redirect('/login');
	}

	req.session.user = user;
	req.flash('success','登录成功');
	res.redirect('/');
});

});

module.exports = router;
