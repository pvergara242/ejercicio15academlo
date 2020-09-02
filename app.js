// importamos file sistems
const fs = require('fs');
// importamos express
const express = require('express');
const path = require("path")


const app = express();
app.use("/public", express.static(path.join(__dirname, "/public")));

// ruta para el login 
app.get('/inicio', (request, response) => { 
    console.log(request);
    response.sendfile('./public/login.html');
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

// ruta para restablecer contraseña 
app.get('/restablecer-contrasena', (request, response) => { 
    console.log(request);
    response.sendfile('./public/forgot-password.html');
});





//Crear un servidor en el puerto que pasemos como primer argumento

app.listen(8000, () => { 
    console.log("Servidor iniciado en el puerto 8000");
});