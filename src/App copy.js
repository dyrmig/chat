import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <form>
     <label>
       Name:
       <input type="text" id="name" />
     </label>
     <label>
       Age:
       <input type="text" id="age" />
     </label>
     <label>
       Id:
       <input type="text" id="id" />
     </label>
     <input type="button" id="enviar" value="Submit" onClick={WebSocketTest} />
   </form>
       <br />
       <br />
      <div id="userslist">
      </div>

    </div>
  );
}

function listarUsuarios(){
  if ("WebSocket" in window) {
     // Let us open a web socket
     var ws = new WebSocket("wss://erk5lp2jwb.execute-api.eu-central-1.amazonaws.com/sandbox");
  
     ws.onopen = function() {
        

        // Web Socket is connected, send data using send()
        ws.send(`{"action":"users"}`);
     };
  
     ws.onmessage = function (event) { 
        var received_msg = event.data;

        var listaUsuarios = JSON.parse(received_msg);
        document.getElementById("userslist").innerHTML = ''
        for (let index = 0; index < listaUsuarios.length; index++) {
           document.getElementById("userslist").innerHTML += `<div>${Object.values(listaUsuarios[index])[4]}</div>`
        }
        //console.log(listaUsuarios[0][usuername])
        console.log(Object.values(listaUsuarios[0])[4])
     };
  
     ws.onclose = function() { 
        
        // websocket is closed.
        alert("Connection is closed..."); 
     };

  } else {
    
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }

}

function WebSocketTest() {
  
  if ("WebSocket" in window) {

     
     // Let us open a web socket
     var ws = new WebSocket("wss://erk5lp2jwb.execute-api.eu-central-1.amazonaws.com/sandbox");
  
     ws.onopen = function() {
        

        // Web Socket is connected, send data using send()
        ws.send(`{"action":"user", "userid": "${document.getElementById("id").value}", "username": "${document.getElementById("name").value}", "userage": "${document.getElementById("age").value}"}`);
        alert("Message is sent...");
     };
  
     ws.onmessage = function (event) { 
        var received_msg = event.data;
        alert("Message is received..." + received_msg);
     };
  
     ws.onclose = function() { 
        
        // websocket is closed.
        //alert("Connection is closed...");
     };
     listarUsuarios()
  } else {
    
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
     
  }
}

listarUsuarios()

export default App;
