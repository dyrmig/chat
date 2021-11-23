const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});

exports.handler = (event, context, callback) => {
    
     // create api ApiGatewayManagementApi to make a POST from lambda to engine by connectionid
    let apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({ 
        
        apiVersion: '2018-11-29',    
        endpoint: 'https://erk5lp2jwb.execute-api.eu-central-1.amazonaws.com/sandbox/@connections',
        region: 'eu-central-1'
      
    }); 
    

    let connectionId = " ";
    let connectionIdEngine  = " ";
 
    if (event.body){
         connectionId = event.requestContext.connectionId;
    } else {
        connectionId = " TEST - NO connectionId available";
    }
    
    //responses to client
    let response_success = {
            statusCode: 200,
            body: JSON.stringify({message: ' sent to engine and DB, by connection ' + connectionId })
        };
        console.log("XXXXXXRESPONSEjson", response_success)
    let   response_error = {
            statusCode: 400,
            body: JSON.stringify({message: ' did NOT sent to engine and DB, connection active, ' + connectionId } )
        };
    

     getConnections().then((data) => {
         console.log("XXXXXX getconnectons")
        //create ARRAY connections and full it with connections from getConnections(data) 
        let connections = [];
        data.Items.forEach((connection) => connections.push(connection));
        //console.log("getconnectonsdone");
        
        //random between zero and the number of engines active it that moment    
        let connectionIndex = Math.floor(Math.random()*Math.floor(connections.length));
        //console.log(connectionIndex);
        connectionIdEngine = connections[connectionIndex].connectionid;
        let stringData = JSON.stringify({"data":"data"})
        const params = {
                    ConnectionId: connectionIdEngine,
                    Data: stringData
                };
                console.log("XXXXXXPARAM", params)
        //ApiGatewayManagementApi makes a POST
        // post https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ApiGatewayManagementApi.html#postToConnection-property

        apiGatewayManagementApi.postToConnection(params, function(err, data) {
            console.log("XXXXXXXXDATA: ", data)
            if (err) 
               { console.log("XXXXXXXXEROR", err, err.stack);
               console.log("XXXXXXRESPONSEIF", response_error)
                callback(response_error);}
             else  
               { //console.log(data);
               console.log("XXXXXXRESPONSEELSE", response_success)
                callback(undefined, response_success);}
        });
        
    });  
    //console.log("POST out");
 
    //make a query https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-query-scan.html
    // get all connections from dynamodb with scan -not query- and -not filter-
    function getConnections(){
        console.log("XXXXXXXXXX: ");
        return ddb.scan({        
            TableName: '_masterTableUser',    
            
        }).promise();
    }

};