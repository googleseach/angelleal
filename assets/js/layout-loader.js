document.addEventListener("DOMContentLoaded", async () => {
  const loadHTML = async (selector, file) => {
    try {
      // Agregamos un timestamp para evitar la caché del navegador
      const res = await fetch(file + "?v=" + new Date().getTime());
      if (!res.ok) throw new Error(`Error al cargar ${file}`);
      const html = await res.text();
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  };

  await Promise.all([
    loadHTML("#app-header", "views/header.html"),
    loadHTML("#app-inicio", "views/inicio.html"),
    loadHTML("#app-practica", "views/practica.html"),
    loadHTML("#app-consultas", "views/consultas.html"),
    loadHTML("#app-contacto", "views/contacto.html"),
    loadHTML("#app-footer", "views/footer.html"),`n    loadHTML("#app-perfil", "views/perfil.html")
  ]);

  document.dispatchEvent(new Event("layoutLoaded"));
});

