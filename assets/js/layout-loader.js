document.addEventListener("DOMContentLoaded", async () => {
  const loadHTML = async (selector, file) => {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Error al cargar ${file}`);
      const html = await res.text();
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  };

  // Esperamos a que TODOS los fragmentos se carguen en orden
  await Promise.all([
    loadHTML("#app-header", "views/header.html"),
    loadHTML("#app-inicio", "views/inicio.html"),
    loadHTML("#app-practica", "views/practica.html"),
    loadHTML("#app-consultas", "views/consultas.html"),
    loadHTML("#app-contacto", "views/contacto.html"),
    loadHTML("#app-footer", "views/footer.html")
  ]);

  // Disparamos el evento para inicializar la lógica
  document.dispatchEvent(new Event("layoutLoaded"));
});
