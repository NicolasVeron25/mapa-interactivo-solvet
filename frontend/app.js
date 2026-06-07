// 1. Inicializar el mapa
// Le decimos a Leaflet que use "CRS.Simple" porque es una imagen plana, no un globo terráqueo.
const mapa = L.map('mapa-solvet', {
    crs: L.CRS.Simple,
    minZoom: -1, // Permite alejar la cámara
    maxZoom: 0   // Permite acercar la cámara
});

// 2. Definir los límites del mapa según tus píxeles
const limites = [[0, 0], [1536, 2816]];

// 3. Montar tu imagen en el mapa
L.imageOverlay('mapa.png', limites).addTo(mapa);

// 4. Centrar la cámara
mapa.fitBounds(limites);

// =========================================================
// 5. CONEXIÓN AL BACKEND (LA BASE DE DATOS EN SUPABASE)
// =========================================================

// Función asíncrona para pedirle el Lore a tu servidor backend
async function cargarAsentamientos() {
  try {
    // 1. Tocamos la puerta de tu servidor local
    const respuesta = await fetch('http://localhost:3000/api/asentamientos');
    const asentamientos = await respuesta.json();

    // 2. Por cada asentamiento que nos devuelva, creamos un pin
    asentamientos.forEach(lugar => {
      // Leaflet usa el formato [Y, X] para las coordenadas.
      // Fíjate que usamos .addTo(mapa) respetando el nombre de tu variable
      const marcador = L.marker([lugar.coordenada_y, lugar.coordenada_x]).addTo(mapa);

      // 3. Le armamos la ventana emergente con el nombre y descripción
      marcador.bindPopup(`
        <div style="text-align: center;">
          <h3 style="margin-bottom: 5px; color: #b8860b;">${lugar.nombre}</h3>
          <p style="margin-top: 0; font-size: 14px;">${lugar.descripcion}</p>
        </div>
      `);
    });
    
    console.log("¡Asentamientos cargados en el mapa exitosamente!");
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
  }
}

// 6. ¡Ejecutamos la magia!
cargarAsentamientos();