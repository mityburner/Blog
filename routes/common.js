
function checkLogin(req,res){
	if(!req.session.user){
		req.flash('error','未登录');
		return res.redirect('/login');
	}
}

function checkNotLogin(req,res){
	if(req.session.user){
		req.flash('success','已登录');
		return res.redirect('/');
	}
}



exports.checkLogin = checkLogin;
exports.checkNotLogin = checkNotLogin;