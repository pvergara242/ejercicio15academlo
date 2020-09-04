// importamos file sistems
const fs = require('fs');
// importamos express
const express = require('express');
// importamos path
const path = require("path")
// requerimos bodyparser
const bodyParser = require('body-parser');

const app = express();
// usamos bodyparser
app.use(bodyParser.urlencoded());

// usamos la ruta 
app.use("/public", express.static(path.join(__dirname, "/public")));

// ruta para el login 
app.get('/inicio', (request, response) => { 
    console.log(request);
    response.sendfile('./public/login.html');
});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    fs.readFile('db.json',(error,data)=>{
        let users = JSON.parse(data.toString());
        let userObj = users.find(user=>{
            return user.email = email;
        });
        if(userObj.password === password  ){
            console.log('la contraseña es correcta')
        }else if(userObj.password  !=password){
            console.log('no coincide');
            res.sendfile('./public/login.html');
        }
        console.log(users)
    })
    res.sendfile(__dirname + "/public/index.html");
});

// error 404
app.get('/', (request, response) => { 
    console.log(request);
    response.sendfile('./public/404.html');
});

// ruta para nosotros
app.get('/nosotros', (request, response) => { 
    fs.readFile('contador.txt',(error,data)=>{
        if(error){
            console.log(error);
        }
        
        let visitas = data.toString().split(':')[1];
        visitas++ 
        console.log(visitas)
       
        fs.writeFile('contador.txt',`visitas:${visitas}`, (error,data)=>{
            console.log(error);
        });
        response.send(`<h1>visitas:${visitas}</h1>`);
    })
    
});

// ruta para registro
app.get('/registro', (request, response) => { 
    console.log(request);
    response.sendfile('./public/register.html');
});

app.post('/register', (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    fs.readFile('db.json',(req,res)=>{
        let users = JSON.parse(data.toString());
        users.push(req.body);
        
        fs.writeFile('db.json',JSON.stringify(users),(error)=>{
            if(error){
                console.log(error);
            }
        });
    })
});

    
// ruta para restablecer contraseña 
app.get('/restablecer-contrasena', (request, response) => { 
    console.log(request);
    response.sendfile('./public/forgot-password.html');
});


//Crear un servidor en el puerto que pasemos como primer argumento
app.listen(8000, () => { 
    console.log("Servidor iniciado en el puerto 8000");
});