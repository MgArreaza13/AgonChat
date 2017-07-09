// configuracion del firebase
var config = {
apiKey: "AIzaSyCUIkKVzCu9L0IwmYbMDTFZiPbu8yQtbPg",
authDomain: "chat-9edb4.firebaseapp.com",
databaseURL: "https://chat-9edb4.firebaseio.com",
projectId: "chat-9edb4",
storageBucket: "chat-9edb4.appspot.com",
messagingSenderId: "453852545975"
};
// inicializa firebase.
firebase.initializeApp(config);
        

// funcion que hace push a firebase 
function PushToFirebase(id,msg) {
  firebase.database().ref('chat').push({name:id,message:msg});
}

        

// obtengo los datos del firebase 
function GetToFirebase() {
  firebase.database().ref('chat')
    .on('value', function (snapshot) {
      snapshot.forEach(function (e) {
        var element = e.val();
        var id = element.name;
        var msg = element.message;
        // pinto los datos en el contenedor 
        $("#chat_div").chatbox("option", "boxManager").addMsg(id, msg);
        });
         
      });
}

// metodo mejorado para obtencion de datos 
var startListening = function() {
      firebase.database().ref('chat').on('child_added', function(snapshot) {
        var msg = snapshot.val();      
        msgUsername = msg.name;
        msgText = msg.message;
        $("#chat_div").chatbox("option", "boxManager").addMsg( msgUsername, msgText);
      });
    }



// sistema de autorizacion 

var seccionLogin = document.getElementById("social");
var authService = firebase.auth();
var VisibilidadChat = true;
var username = null;
// para login con twiter.
var loginTwiterButton = document.getElementById("LoginTwitter");
var providerTwiter = new firebase.auth.TwitterAuthProvider();

// para login con Facebook.
var loginFacebookButton = document.getElementById("LoginFacebook");
var providerFacebok = new firebase.auth.FacebookAuthProvider();

// para login con Google.
var loginGoogleButton = document.getElementById("LoginGoogle");
var providerGoogle = new firebase.auth.GoogleAuthProvider();
  




//login con twitter
loginTwiterButton.addEventListener("click", function () {
  authService.signInWithPopup(providerTwiter)
    .then(function (result) {
      seccionLogin.style.display = "none";
      console.log(result.user);
      username = result.user.displayName;
      VisibilidadChat = false;
      Chat(username, VisibilidadChat);       
      })
    .catch(function (result) {
      console.log('Detectado un error:', error);
      },
      {remember: "none"});
  });

    
// login con facebook

loginFacebookButton.addEventListener("click", function () {
  authService.signInWithPopup(providerFacebok)
    .then(function (result) {
      seccionLogin.style.display = "none";
      console.log(result.user);
      username = result.user.displayName;
      VisibilidadChat = false;
      Chat(username, VisibilidadChat);       
      })
    .catch(function (result) {
      console.log('Detectado un error:', error);
      },
      {remember: "none"});
});
   


// login con Google 


loginGoogleButton.addEventListener("click", function () {
  authService.signInWithPopup(providerGoogle)
    .then(function (result) {
      seccionLogin.style.display = "none";
      console.log(result.user);
      username = result.user.displayName;
      VisibilidadChat = false;
      Chat(username, VisibilidadChat);       
      })
    .catch(function (result) {
      console.log('Detectado un error:', error);
      },
      {remember: "none"});
});     
        






// creo la instancia del chat 

function Chat (username, VisibilidadChat) {
    startListening(); 
     $("#chat_div")
        .chatbox({
              id:username, 
              user:username,
              hidden: VisibilidadChat,
              title : "Agon Chat",
              messageSent : function(id, user, msg) {PushToFirebase(id,msg);}});
   } 
    
      
