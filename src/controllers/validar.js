import  { connection }  from "../db/connection.js";
import { app } from "../index.js";
import bcryptjs from 'bcryptjs';
import  jsonwebtoken  from "jsonwebtoken";
import dotenv from 'dotenv/config'
import cookieParser from "cookie-parser";



export async function validar(req, res){
    let user = req.body.user;
    let password = req.body.password;
    
     //Guardamos las instrucciones MYSQL en variables
    let buscar = "SELECT * FROM usuarios WHERE usuario = '"+user+"' ";

        //Revisamos si el usuario ingresado coincide con el de la base de datos
    connection.query(buscar, function(error, results){
        if (error) {
            throw error
        } 
          //Si el resultado es positivo, encriptamos la contraseña ingresada y la comparamos con la existente
          // en la base de datos
            if (results.length>0) {
                bcryptjs.compare(password, results[0].password, function(err, result){
                    //Si la comparacion es correcta, le asignamos un token y redireccionamos
                    //a la ruta destino
                    if (result===true) {

                        const token = jsonwebtoken.sign(
                            {user:user},process.env.JWT_SECRET,
                            {expiresIn:process.env.JWT_EXPIRATION});

                        const cookieOption = {
                            expires: new Date(Date.now() +  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 ),
                            Path: "/"
                        }
                        res.cookie("jwt", token, cookieOption);
                        res.redirect('/home')

                    }else{
                        //Caso contrario, enviamos lo siguiente
                        res.redirect('/error');
                    }
                })
             
            }
            //Volvemos a enviar lo siguiente, para más seguridad
            else{
                res.redirect('/error');
            }              
    })
}