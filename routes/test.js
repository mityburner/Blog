var express = require('express');
var router = express.Router();
var util = require('util');


router.helpers(
	inspect: function (obj) {
		return util.inspect(obj,true);
	}
);

router.dynamicHelpers({
	headers: function(req,res){
		return req.headers;
	}
});

router.get('/', function(req, res) {
	var num = [1,2,3,4,5,6,7,8];
	var head = '<p>測試html的顯示</p>';
  res.render('test', { title: 'test', bool: 'Yes', js: num, head: head });
});

module.exports = router;
