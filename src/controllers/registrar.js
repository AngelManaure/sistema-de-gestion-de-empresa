import  { connection }  from "../db/connection.js";
import { app } from "../index.js";
import bcryptjs from 'bcryptjs';

export async function registrar(req, res){
    
    //Guardamos los datos del usuario a registrar en variables
    let name = req.body.name;
    let user = req.body.user;
    let email = req.body.email;
    let password = req.body.password;
    
     //Guardamos las instrucciones MYSQL en variables
     let buscar = "SELECT * FROM usuarios WHERE usuario = '"+user+"' AND email='"+email+"'";
    

     //revisamos si los datos ya existen
     connection.query(buscar,async function(error, row){

        if (error) {
            throw error
        }
        if (row.length>0) {
            return false
        }
        //Si NO existen retornamos true, encriptamos la contraseña, los añadimos a la base de datos
        //y redireccionamos a login
        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(password, salt);
        
        let registrar = "INSERT INTO usuarios (nombre, usuario, email, password) VALUES ('"+name+"', '"+user+"', '"+email+"', '"+hashPassword+"')"

        connection.query(registrar,async function(error, result){

            if (error) {
                throw error
            }if (result) {
                res.redirect('/')
            }
        })
       })

}

