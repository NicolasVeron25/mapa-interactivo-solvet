const express = require('express');
const cors = require('cors');
// 1. Importamos a nuestro "traductor" Prisma
const { PrismaClient } = require('@prisma/client'); 

const app = express();
// 2. Encendemos el motor de Prisma
const prisma = new PrismaClient(); 

app.use(cors());
app.use(express.json());

// 3. Modificamos la ruta para que sea "async" (asíncrona) porque buscar en internet toma milisegundos
app.get('/api/asentamientos', async (req, res) => {
  try {
    // 4. Le decimos a Prisma que traiga TODOS los asentamientos
    const asentamientos = await prisma.asentamientos.findMany();

    // 5. Arreglamos el problema del "BigInt" (convertimos el 1n a 1 normal)
    const datosListosParaElMapa = asentamientos.map(lugar => ({
      ...lugar,
      id: Number(lugar.id) 
    }));

    // 6. Le enviamos la información real a tu página web
    res.json(datosListosParaElMapa);
    
  } catch (error) {
    console.error("Error al buscar en Supabase:", error);
    res.status(500).json({ error: "Error al conectar con el Lore" });
  }
});

const PUERTO = 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor del Proyecto Solvet escuchando en el puerto ${PUERTO}`);
});