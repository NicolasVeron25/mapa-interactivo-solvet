// 1. Inicializar el mapa
const mapa = L.map('mapa-solvet', {

    crs: L.CRS.Simple, // Le decimos a Leaflet que use "CRS.Simple" porque es una imagen plana, no un globo terráqueo.
    minZoom: -2, // Permite alejar la camara
    maxZoom: 2,   // Permite acercar la camara
    zoomControl: false, // Desactivar el control de zoom por defecto
    attributionControl: false, // Saca el Leaflet
    zoomSnap: 0.1,        // Permite niveles de zoom decimales (ej: 0.1, 0.2) en vez de saltos enteros (1, 2).
    zoomDelta: 0.1,       // Cuánto se acerca/aleja al usar los botones de + y -.
    wheelPxPerZoomLevel: 200 // Sensibilidad de la rueda del ratón. (Más alto = zoom más suave/lento).

});

// 2. Definir los limites del mapa
const limites = [[0, 0], [1536, 2816]];

// 3. Montar la imagen en el mapa
L.imageOverlay('mapa.png', limites).addTo(mapa);

// 4. Centrar la camara
mapa.fitBounds(limites);

// 5. Conexion al Backend en Supabase

// 5.1 Funcion asincrona para pedirle el Lore al Servidor backend
async function cargarAsentamientos() {
  try {
    // 1. Tocamos la puerta de tu servidor local
    // Tocamos la puerta de tu nuevo servidor en la nube
const respuesta = await fetch('https://mapa-interactivo-solvet-backend.onrender.com/api/asentamientos');
    const asentamientos = await respuesta.json();

    // 2. Por cada asentamiento que nos devuelva, creamos un pin
    asentamientos.forEach(lugar => {
      // Leaflet usa el formato [Y, X] para las coordenadas.
      // Fíjate que usamos .addTo(mapa) respetando el nombre de tu variable

      const marcador = L.marker(
    [lugar.coordenada_y, lugar.coordenada_x],
    {
        icon: L.divIcon({
            className: 'nombre-ciudad',
            html: `<span>${lugar.nombre}</span>`,
            iconSize: [120, 20]
        })
    }
).addTo(mapa);

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