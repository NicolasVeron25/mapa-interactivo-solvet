// 1. Inicializar el mapa
// Le decimos a Leaflet que use "CRS.Simple" porque es una imagen plana, no un globo terráqueo.
const mapa = L.map('mapa-solvet', {
    crs: L.CRS.Simple,
    minZoom: -1, // Permite alejar la cámara
    maxZoom: 2   // Permite acercar la cámara
});

// 2. Definir los límites del mapa según tus píxeles
// El formato es [[Y inicial, X inicial], [Alto, Ancho]]
const limites = [[0, 0], [1536, 2816]];

// 3. Montar tu imagen en el mapa
// Le pasamos el nombre de tu archivo y los límites que definimos arriba
L.imageOverlay('mapa.png', limites).addTo(mapa);

// 4. Centrar la cámara
// Le decimos al mapa que acomode la vista para que se vea toda la imagen de entrada
mapa.fitBounds(limites);

// 5. ¡Tu primer pin de prueba!
// Lo ponemos justo en el centro matemático de tu imagen: [Alto/2, Ancho/2]
L.marker([768, 1408]).addTo(mapa)
    .bindPopup("<b>¡Bienvenido a Solvet!</b><br>Este es el centro exacto de tu mundo.")
    .openPopup();