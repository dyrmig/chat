const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
	
	var params = {
		TableName : '_masterTableUser',
	};
	
	ddb.scan(params, function(err, data){
		console.log("esto es la data: " + JSON.stringify(data))
		console.log("esto es el error: " + err)
		if(err){
		    callback(err, null);
		}else{
		    callback(null, {statusCode: 200, body: JSON.stringify(data.Items)});
		}
	});
};