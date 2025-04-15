// tools
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import passport from "@/middlewares/passport";
import cookieParser = require("cookie-parser");
import fs from "node:fs";
import https from "node:https";

// rotas
import authRoutes from './routes/auth/routes';
import userRoutes from './routes/user/routes';
import storeRoutes from './routes/store/routes';
import productRoutes from './routes/product/routes';
import searchRoutes from './routes/search/routes';

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

// rota de entrada
app.get("/", ( req, res ) => {
  res.send("API do Marketplace funcionando! 🚀");
});

// rotas de authenticação
app.use('/auth', authRoutes );

// rotas de usuario
app.use('/users', userRoutes );

// rotas de lojas
app.use('/stores', storeRoutes );

// rotas de produto
app.use('/products', productRoutes );

// rotas de pesquisa 
app.use('/search', searchRoutes );

const PORT = process.env.PORT || 5000;
// Inicializa o servidor HTTPS
https.createServer(options, app).listen( PORT, () => {
  console.log(`Servidor rodando em https://localhost:${PORT} 🚀`);
});