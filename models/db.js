var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var _server = new Server(settings.host,Connection.DEFAULT_PORT,{});

module.exports = new Db(settings.db,_server,{safe:true});



















