var express = require('express'),
    _       = require('lodash'),
   // config  = require('./config'),
    jwt     = require('jsonwebtoken');
    var sql = require( "seriate" );
    var mysql      = require('mysql');
var Q = require('q');
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var request = require("request");
var app = module.exports = express.Router();
var Rx = require('@reactivex/rxjs');
var base64 = require('file-base64');


/* AUXILIARES */
var secretKey = "LKjdc356#$#$&/82##q<<";

function createToken(user) {
  console.log('createToken', user);
  return jwt.sign(_.omit(user, 'pass'), secretKey, { expiresIn: 60*60*5 });
}
function createTokenMovil() {
  console.log('createTokenMovil');
  var tok = Math.floor(1000 + Math.random() * 9000);
  return tok;
}
function sendTokenMovil(telefono, token) {
  var msg = encodeURIComponent('Tu código de verificacion es: ' + token);
  console.log('sendTokenMovil: ', msg);
  request.get("https://xxxxxxx.com:1000/cgi-bin/sendsms?username=user&password=password&from=8888888&to=" + telefono + "&text=" + msg + "", 
    function(error, response, body) {
        console.log(body);
        return body;
    })
}


function rememberToken(telefono, token) {
  console.log('rememberToken');
  request.get("http://xxxxxxx:00000/envios/cccc/remembertoken?telefono=" + telefono + "&token=" + token + "", {
  'auth': {
    'user': 'user',
    'pass': 'pass',
    'sendImmediately': false
  }
  }, function(error, response, body) {
        console.log(body);
        return body;
    })
}

function recordarToken(telefono, token) {
  var msg = encodeURIComponent('Tu código de verificacion es: ' + token);
  console.log('recordarToken: ', msg);
  request.get("https://xxxxxxx.com:0000/cgi-bin/sendsms?username=user&password=password&from=8888&to=" + telefono + "&text=" + msg + "", 
    function(error, response, body) {
        console.log(body);
        return body;
    })
}
  
function getUserDB(username) {
  var deferred = Q.defer();
  sql.execute( { procedure: "getUser",
                 params: {
                          username: {
                          type: sql.NVARCHAR,
                          val: username
                          } 
                      }
            } )
    .then ( function( _user ) {

        user = _user[0][0][0]
        deferred.resolve(user);
    });

    return deferred.promise; 

}
  
function newUserDB(user) {
  var deferred = Q.defer();
  sql.execute( { procedure: "createUser",
                 params: {
                          user: {
                          type: sql.NVARCHAR,
                          val: user.user,
                          },
                          pass: {
                          type: sql.NVARCHAR,
                          val: user.pass,
                          },
                          nombre: {
                          type: sql.NVARCHAR,
                          val: user.nombre,
                          },
                          apellido: {
                          type: sql.NVARCHAR,
                          val: user.apellido,
                          },
                          entidad: {
                          type: sql.NVARCHAR,
                          val: user.entidad,
                          },
                          email: {
                          type: sql.NVARCHAR,
                          val: user.email,
                          },
                          telefono: {
                          type: sql.NVARCHAR,
                          val: user.telefono,
                          },
                          token: {
                          type: sql.NVARCHAR,
                          val: user.token,
                          } 
                      }
            } )
    .then ( function( _user ) {

        user = _user[0][0][0]
        deferred.resolve(user);

    });
    return deferred.promise; 

}

function editUserDB(user) {
  var deferred = Q.defer();
  sql.execute( { procedure: "editUser",
                 params: {
                          user: {
                          type: sql.NVARCHAR,
                          val: user.user,
                          },
                          pass: {
                          type: sql.NVARCHAR,
                          val: user.pass,
                          },
                          nombre: {
                          type: sql.NVARCHAR,
                          val: user.nombre,
                          },
                          apellido: {
                          type: sql.NVARCHAR,
                          val: user.apellido,
                          },
                          entidad: {
                          type: sql.NVARCHAR,
                          val: user.entidad,
                          },
                          email: {
                          type: sql.NVARCHAR,
                          val: user.email,
                          },
                          telefono: {
                          type: sql.NVARCHAR,
                          val: user.telefono,
                          },
                          token: {
                          type: sql.NVARCHAR,
                          val: user.token,
                          } 
                      }
            } )
    .then ( function( _user ) {
        //console.log(_user[0][0][0]);
        user = _user[0][0][0]
        deferred.resolve(user);
        
    });

    return deferred.promise; 

}


var jwtCheck = ejwt({
  secret: secretKey
});
/* AUXILIARES */

/* PUBLIC ROUTES */

app.get('/api/counter', function (req, res) {
    console.log('GetCounter')
    var counter = [];
    var deferred = Q.defer();
//    res.contentType('application/json');
    sql.execute( {
                query: "select count(*) as contador from Usuarios where activo = 1",
                    params: {/*
                        idportfolio: {
                            type: sql.NVARCHAR,
                            val: opcion,
                        }*/
                    }
    } ).then ( function( _counter ) {
        console.log(_counter)
        counter = _counter
        deferred.resolve(counter);
        res.send(counter);
    });
//    var json = JSON.stringify(chats);
    return deferred.promise; 
    
});

/* PUBLIC ROUTES */

/* PROTECTED ROUTES */

app.use('/api/protected', jwtCheck);


app.get('/api/protected/contacts', function (req, res) {
    console.log('GetContacts', req.query)
    var contacts = [];
    var deferred = Q.defer();
//    res.contentType('application/json');
    sql.execute( {
                    procedure: "getContacts",//query: "select top 10 telefono, alias, saludo from suscripciones where telefono not in ('83729252','50688257223') order by registerdate desc",
                    params: {
                        ss: {
                            type: sql.NVARCHAR,
                            val: req.query.ss,
                        },
                        qb: {
                            type: sql.NVARCHAR,
                            val: req.query.qb,
                        },
                        a: {
                            type: sql.NVARCHAR,
                            val: req.query.a,
                        },
                        p: {
                            type: sql.NVARCHAR,
                            val: req.query.p,
                        },
                        c: {
                            type: sql.NVARCHAR,
                            val: req.query.c,
                        }
                    }
    } ).then ( function( _contacts ) {
        console.log(_contacts[0][0])
        contacts = _contacts[0][0];
        deferred.resolve(contacts);
        res.send(contacts);
    });
//    var json = JSON.stringify(chats);
    return deferred.promise; 
    
});

app.post('/api/protected/user/edit', function(req, res) {
  console.log('req.body ', req.body);
  var deferred = Q.defer();

  if (!req.body.telefono ) {
    return res.status(400).send({
      success: false,
      msj: "Faltan Parametros"
      }
        );
    }

  getUserDB(req.body.telefono)
  .then( function( user ) {
    console.log('getUserDB ', user );
    //console.log(user.pass);
    if (user) {
      var tokenMovil = createTokenMovil();
      var newUser = {
        user: req.body.user,
        pass: req.body.pass,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        entidad: req.body.entidad,
        email: req.body.email,
        telefono: req.body.telefono
      };
      //var activacion = sendTokenMovil(newUser.telefono, newUser.token);
      editUserDB(newUser)
        .then( function( result ) {
          console.log('editUserDB ', result);
          var userRegistered = result;
          
          var respuesta = {
                  success: true,
                  log: userRegistered
                };
          deferred.resolve(respuesta);
          return res.status(201).send(respuesta);
          
        });

      }else{
        return res.status(401).send({
        success: false,
        msj: "The username not exist"
      });
      }

    });
   return deferred.promise; 
});

app.post('/api/protected/user/create', function(req, res) {
  console.log('req.body ', req.body);
  var deferred = Q.defer();

  if (!req.body.telefono ) {
    return res.status(400).send({
      success: false,
      msj: "Faltan Parametros"
      }
        );
    }

  getUserDB(req.body.telefono)
  .then( function( user ) {
    console.log('getUserDB ', user );
    //console.log(user.pass);
    if (!user) {
      var tokenMovil = '2020';
      var newUser = {
        user: req.body.user,
        pass: req.body.pass,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        entidad: req.body.entidad,
        email: req.body.email,
        telefono: req.body.telefono,
        token: tokenMovil
      };
      //var activacion = sendTokenMovil(newUser.telefono, newUser.token);
      newUserDB(newUser)
        .then( function( result ) {
          console.log('newUserDB ', result);
          var userRegistered = result;
          
          var respuesta = {
                  success: true,
                  log: userRegistered//,
                  //activacion: activacion
                };
          deferred.resolve(respuesta);
          return res.status(201).send(respuesta);
          
        });

      }else{
        return res.status(400).send({
        success: false,
        msj: "The username already exist"
      });
      }

    });
   return deferred.promise; 
});



app.post('/api/protected/user/disable', function (req, res) {
    console.log('desafiliar', req.query)
    var contacts = [];
    var deferred = Q.defer();
    if (!req.body.telefono) {
    return res.status(400).send({
      success: false,
      msj: "You must send the username"
    }
      );
  }
//    res.contentType('application/json');
    sql.execute( {
                    procedure: "desafiliar",
                    //query: "select top 10 telefono, alias, saludo from suscripciones where telefono not in ('83729252','50688257223') order by registerdate desc",
                    params: {
                        username: {
                            type: sql.NVARCHAR,
                            val: req.body.telefono,
                        }
                    }
    } ).then ( function( _contacts ) {
      console.log('/api/protected/desafiliar')
        console.log(_contacts)
        contacts = _contacts[0][0];
        deferred.resolve(contacts);
        res.status(201).send({
      success: true,
      data: contacts
    });
    });
//    var json = JSON.stringify(chats);
    return deferred.promise; 
    
});

app.post('/api/protected/user/hasrole', function (req, res) {
    console.log('hasrole', req.query)
    //var contacts = [];
    var deferred = Q.defer();
    if (!req.body.username) {
    return res.status(400).send({
      success: false,
      msj: "You must send the username"
    }
      );
  }
//    res.contentType('application/json');
    sql.execute( {
                    procedure: "CNLC_hasRole",
                    //query: "select top 10 telefono, alias, saludo from suscripciones where telefono not in ('83729252','50688257223') order by registerdate desc",
                    params: {
                        username: {
                            type: sql.NVARCHAR,
                            val: req.body.username,
                        }
                    }
    } ).then ( function( result ) {
      console.log('/api/protected/user/hasrole')
        console.log(result)
        var _result = result[0][0];
        deferred.resolve(_result);
        res.status(201).send({
              success: true,
              role: _result
            });
    });
//    var json = JSON.stringify(chats);
    return deferred.promise; 
    
});



app.post('/api/protected/user/isadmin', function (req, res) {
    console.log('isadmin', req.query)
    //var contacts = [];
    var deferred = Q.defer();
    if (!req.body.telefono) {
    return res.status(400).send({
      success: false,
      msj: "You must send the username"
    }
      );
  }
//    res.contentType('application/json');
    sql.execute( {
                    procedure: "isAdmin",
                    //query: "select top 10 telefono, alias, saludo from suscripciones where telefono not in ('83729252','50688257223') order by registerdate desc",
                    params: {
                        username: {
                            type: sql.NVARCHAR,
                            val: req.body.telefono,
                        }
                    }
    } ).then ( function( result ) {
      console.log('/api/protected/user/isadmin')
        console.log(result)
        var _result = result[0][0];
        deferred.resolve(_result);
        res.status(201).send({
              success: true,
              isadmin: _result
            });
    });
//    var json = JSON.stringify(chats);
    return deferred.promise; 
    
});

app.get('/api/protected/bitacora', function (req, res) {
    console.log('/api/protected/bitacora')
    if (!req.query.username ||
        !req.query.inicio ||
        !req.query.final ) {
    return res.status(400).send({
      success: false,
      msj: "Faltan Parametros"
    }
      );
  }
    var response = {}
    var mensajes = [];
    var deferred = Q.defer();
//    res.contentType('application/json');
    sql.execute( {
                procedure: "CNLC_getBitacora",
                    params: {
                        user: {
                            type: sql.NVARCHAR,
                            val: req.query.username
                        },
                        fechaInicio: {
                            type: sql.NVARCHAR,
                            val: req.query.inicio
                        },
                        fechaFinal: {
                            type: sql.NVARCHAR,
                            val: req.query.final
                        }/*,
                        limit: {
                            type: sql.INT,
                            val: req.query.limit
                        }*/
                    }
    } ).then ( function( _mensajes ) {
        console.log(_mensajes)
        mensajes = _mensajes[0][0]
        response = {
          mensajes: mensajes,
          total: mensajes.length
          };
        deferred.resolve(response);
        res.send(response);
    });
//    var json = JSON.stringify(chats);
    return deferred.promise; 
    
});
/* PROTECTED ROUTES */

/* AUTHENTICATION   ROUTES*/

app.post('/user/login', function(req, res) {
  var deferred = Q.defer();
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      success: false,
      msj: "You must send the username and the password"
    }
      );
  }

  getUserDB(req.body.username)
  .then( function( user ) {
    console.log(user.user);
    console.log(user.pass);
    if (!user) {
      return res.status(401).send({
      success: false,
      msj: "The username is not existing"
    });
    }

    if (user.pass !== req.body.password) {
      return res.status(401).send({
      success: false,
      msj: "The username or password don't match"
    });
    }

    var token = createToken(user);
    deferred.resolve(token);
    res.status(201).send({
      success: true,
      auth_token: token,
      user: user
    });

  });
  return deferred.promise; 

});

app.post('/user/signup', function(req, res) {
  console.log('req.body ', req.body);
  var deferred = Q.defer();

  if (!req.body.telefono || 
      //!req.body.situacionSentimental || 
      //!req.body.queBuscas || 
      //!req.body.altura || 
      //!req.body.complexion || 
      //!req.body.peso || 
      //!req.body.alias || 
      !req.body.user) {
    return res.status(400).send({
      success: false,
      msj: "Faltan Parametros"
      }
        );
    }

  getUserDB(req.body.telefono)
  .then( function( user ) {
    console.log('getUserDB ', user );
    //console.log(user.pass);
    if (!user) {
      var tokenMovil = createTokenMovil();
      var newUser = {
        user: req.body.user,
        pass: req.body.pass,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        entidad: req.body.entidad,
        email: req.body.email,
        telefono: req.body.telefono,
        token: tokenMovil
      };
      var activacion = sendTokenMovil(newUser.telefono, newUser.token);
      newUserDB(newUser)
        .then( function( result ) {
          console.log('newUserDB ', result);
          var userRegistered = result;
          
          var respuesta = {
                  success: true,
                  log: userRegistered,
                  activacion: activacion
                };
          deferred.resolve(respuesta);
          return res.status(201).send(respuesta);
          
        });

      }else{
        return res.status(401).send({
        success: false,
        msj: "The username already exist"
      });
      }

    });
   return deferred.promise; 
});

app.post('/user/remembertoken', function(req, res) {
  console.log('remembertoken');
  console.log('req.body ', req.body);
  var deferred = Q.defer();

  if (!req.body.telefono) {
    return res.status(400).send({
      success: false,
      msj: "Faltan Parametros"
      }
        );
    }

  getUserDB(req.body.telefono)
  .then( function( user ) {
    console.log('getUserDB ', user );
    //console.log(user.pass);
    if (!user) {

          return res.status(401).send({
            success: false,
            msj: "The username does not exist"
          });

      }else{
          console.log('user: ', user)
          //var activacion = rememberToken(user.telefono, user.pass);
          var activacion = recordarToken(user.telefono, user.pass);
          var respuesta = {
                  success: true,
                  log: 'Token Enviado',
                  activacion: activacion
                };
          deferred.resolve(respuesta);
          return res.status(201).send(respuesta);

      }

    });
   return deferred.promise; 
});


/* AUTHENTICATION   ROUTES*/
