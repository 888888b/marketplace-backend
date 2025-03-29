import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import passport from "@/middlewares/passport";
import authRoutes from './routes/auth/routes';
import cookieParser = require("cookie-parser");
import fs from "node:fs";
import https from "node:https";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

// Carrega os certificados SSL
const options = {
  key: fs.readFileSync("C:/Windows/System32/localhost-key.pem"), // Chave privada
  cert: fs.readFileSync("C:/Windows/System32/localhost.pem"), // Certificado
};

app.get("/", ( req, res ) => {
  res.send("API do Marketplace funcionando! 🚀");
});

app.use('/auth', authRoutes );

const PORT = process.env.PORT || 5000;
// Inicializa o servidor HTTPS
https.createServer(options, app).listen( PORT, () => {
  console.log(`Servidor rodando em https://localhost:${PORT} 🚀`);
});