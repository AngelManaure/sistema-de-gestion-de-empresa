import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv/config'
import { connection } from "../db/connection.js";

export async function revisarCookie(req, res, next){
    try {
        
        const cookieJWT = req.headers.cookie.split(" ; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);        
    
        let user = decodificada.user;
        let buscar = "SELECT * FROM usuarios WHERE usuario = '"+user+"' ";
    
        connection.query(buscar, function(error, results, res){
            if (error) {
                throw error
            }
            if (results[0].usuario == user) {
                return next()            
            }
            if (!results[0].user) {
                res.redirect('/')
            }         
        })

    } catch (error) {
        res.redirect('/')
    }

}

export async function publico(req, res, next){
    try {
        const cookieJWT = req.headers.cookie.split(" ; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        const user = decodificada.user;
        if (!user) {
            next()
        }
        if (user) {
            res.redirect('/home')
        }
    } catch (error) {
        next();
    }
}

