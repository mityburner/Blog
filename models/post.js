var mongodb = require('./db');

function Post(username, post, time){
	this.username = username;
	this.post = post;
	if(time){
		this.time = time;
	}else{
		this.time = new Date().toString();
	}
}

module.exports = Post;

Post.prototype.save = function save(callback){
	// 调整数据为可存入数据库的文档
	var post = {
		username: this.username,
		post: this.post,
		time: this.time
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		// 读取users集合
		db.collection('posts', function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 为name属性添加索引

			// 写入user文档
			collection.insert(post, {safe: true}, function(err, post){
				mongodb.close();
				callback(err,post);
			});
		});
	});
};

Post.get = function get (username, callback){ 
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts',function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 查找user属性为username的文档
			var query = {};
			if(username){
				query.username = username;
			}

			collection.find(query).sort({time: -1}).toArray(function(err,docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				if(docs){
					// 封装文档为Post对象
					var posts = [];
					docs.forEach(function(doc, index){
						var post = new Post(doc.username, doc.post, doc.time);
						posts.push(post);
					});
					callback(null, posts);
				}else{
					callback(err, null);
				}
			});
		});


	});
}














