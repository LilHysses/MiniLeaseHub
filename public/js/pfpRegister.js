// Añade un "listener" para el evento de cambio en el campo de entrada de archivo
document.getElementById('fileInput').addEventListener('change', function(event) {
    // Obtiene el primer archivo seleccionado por el usuario
    const file = event.target.files[0];
    if (file) {
        // Crea un nuevo objeto FileReader para leer el archivo
        const reader = new FileReader();
        // Define la función a ejecutar cuando la lectura del archivo esté completa
        reader.onload = function(e) {
            // Actualiza el src de la imagen con el resultado de la lectura del archivo
            document.getElementById('pfpImage').src = e.target.result;
        };
        // Lee el archivo como una URL de datos
        reader.readAsDataURL(file);
    }
});