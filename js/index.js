var firebaseConfig = {
    apiKey: "AIzaSyBpxz9ho_2Cg3MYqj_DjHKfGDvHCDYf-tw",
    authDomain: "slambook-babf5.firebaseapp.com",
    databaseURL: "https://slambook-babf5.firebaseio.com",
    projectId: "slambook-babf5",
    storageBucket: "slambook-babf5.appspot.com",
    messagingSenderId: "30776682088",
    appId: "1:30776682088:web:4e5af3b826ab2a07037ddd",
    measurementId: "G-6DBJPEW91Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
    
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != ""  &&  password != "")
      {
          var result = firebase.auth().signInWithEmailAndPassword(email, password);

          result.catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);

              window.alert("Message : " + errorMessage);
          });
      }
      else
      {
          window.alert('form is incomplete');
      }
  });

  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmPassword").val();

      if(email != ""  &&  password != "" && cPassword != "")
      {
          if(password == cPassword)
          {
          var result = firebase.auth().createUserWithEmailAndPassword(email, password);

          result.catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);

                console.log("Message : " + errorMessage);
          });
            }
            else{
                console.alert("Password don't match");
            }
        }
      else
      {
          window.alert('form is incomplete');
      }
  });


  $("#btn-resetPassword").click(function()
  {
      var auth =firebase.auth();
      var email =$("#email").val();
      if(email != "" )
      {
          auth.sendPasswordResetEmail(email).then(function()
          {
              window.alert("A reset link was sent to you, Please check and verify.");
          })
          .catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;

              window.alert(errorCode);
              window.alert(errorMessage);
          });
      }
      else
      {
          window.alert("Please enter your mail first");
      }
  });

  $("#btn-logout").click(function()
  {
      firebase.auth().signOut();
  });


  $("#btn-update").click(function()
  {
    //   $("#main-image").removeClass("is-invalid");

      var phone = $("#phone").val();
      var address = $("#address").val();
      var fName = $("#firstName").val();
      var sName = $("#secondName").val();
      var regdno = $("#regdno").val();
      var branch = $("#branch").val();
      var gender = $("#gender").val();
      var mail = $("#mail").val();
      var dob = $("#dob").val();
    

      var rootRef = firebase.database().ref().child("Users");
      var userID = firebase.auth().currentUser.uid;
      var usersRef = rootRef.child(userID);

      if(fName!="" && sName!="" && branch!="" && phone!="" && gender!="" && address!="" && regdno!="" && mail!="" && dob!="" )
      {
          var userData =
          {
                "dob": dob,
                "phone": phone,
                "address": address,
                "firstName": fName,
                "secondName": sName,
                "branch": branch,
                "mail": mail,
                "gender": gender,
                "regdno": regdno
          };

          usersRef.set(userData, function(error)
          {
              if(error)
              {
                  var errorCode = error.code;
                  var errorMessage = error.message;

                  console.log(errorCode);
                  console.log(errorMessage);

                  window.alert("Message :" + errorMessage);
              }
              else
              {
                  window.location.href= "menu.html";
              }
          })
      }
      else
      {
          window.alert("Form must be filled");
      }
  });

  function switchView(view)
  {
      $.get({
          url:view,
          cache:false,
      })
      .then(function(data)
      {
          $("#container").html(data);
      });
  }