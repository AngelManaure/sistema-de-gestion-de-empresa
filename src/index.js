import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { validar } from "./controllers/validar.js";
import { registrar } from "./controllers/registrar.js";
import { publico, revisarCookie } from "./middlewares/authorization.js";
import ejs from "ejs";

//servidor
export const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//configuracions
app.set("port", process.env.PORT || 4000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//rutas

//Login
app.get("/", publico, function (req, res) {
  res.sendFile(__dirname + "/views/pages/index.html");
});
app.post("/validar", function (req, res) {
  validar(req, res);
});

//Register
app.get("/register", publico, function (req, res) {
  res.sendFile(__dirname + "/views/pages/register.html");
});
app.post("/registrar", function (req, res) {
  registrar(req, res);
});

//Login-Register-Error
app.get("/error", function(req,res){
  res.sendFile(__dirname + '/views/pages/error.html')
})

//Usuario
app.get("/home", revisarCookie, function (req, res) {
  res.render("usuario");
});

//Clientes
app.get("/clientes", revisarCookie, function (req, res) {
  res.render("clientes");
});

//Proveedores
app.get("/proveedores", revisarCookie, function (req, res) {
  res.render("proveedores");
});

//Inventario
app.get("/inventario", revisarCookie, function (req, res) {
  res.render("inventario");
});

//Soporte
app.get("/about", revisarCookie, function (req, res) {
  res.render("about");
});

//About
app.get("/soporte", revisarCookie, function (req, res) {
  res.render("soporte");
});

//servidor en linea
app.listen(app.get("port"));
console.log("Servidor eschando en el puerto " + app.get("port"));
