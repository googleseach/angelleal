/* ============================================================
   LÓGICA DEL PERFIL DE USUARIO
   ============================================================ */

function initPerfil() {
  const email = localStorage.getItem("al_email");
  if (!email) return;

  // Mostrar nombre y datos
  document.getElementById("perfil-nombre").textContent = email.split('@')[0];
  
  const editNombre = document.getElementById("perfil-edit-nombre");
  const editEmail = document.getElementById("perfil-edit-email");
  if (editNombre) editNombre.value = email.split('@')[0];
  if (editEmail) editEmail.value = email;

  // Simular carga de solicitudes (en producción, esto vendría del backend)
  const solicitudesHTML = `
    <div style="border: 1px solid var(--line-soft); border-radius: var(--radius); padding: 16px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <strong style="color: var(--ink);">Solicitud de Asilo</strong>
        <span style="background: #EAF3EA; color: var(--green); padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">En revisión</span>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Enviada el: ${new Date().toLocaleDateString()}</p>
      <button class="btn btn-secondary" style="margin-top: 10px; padding: 6px 12px; font-size: 0.8rem;">Ver detalles</button>
    </div>
  `;
  document.getElementById("perfil-lista-solicitudes").innerHTML = solicitudesHTML;
}

function switchPerfilTab(tabName) {
  // Ocultar todos los contenidos
  document.querySelectorAll(".perfil-tab-content").forEach(el => el.classList.add("hidden"));
  // Quitar active de todos los tabs
  document.querySelectorAll(".perfil-tab").forEach(el => el.classList.remove("active"));
  
  // Mostrar el seleccionado
  const targetContent = document.getElementById(`perfil-tab-${tabName}`);
  if (targetContent) targetContent.classList.remove("hidden");
  
  // Poner active en el tab clickeado
  const targetTab = document.querySelector(`.perfil-tab[data-tab="${tabName}"]`);
  if (targetTab) targetTab.classList.add("active");
}

function guardarDatosPerfil(e) {
  e.preventDefault();
  alert("Sus datos han sido actualizados correctamente.");
}

function cerrarSesionPerfil() {
  localStorage.removeItem("al_session");
  localStorage.removeItem("al_email");
  window.location.href = "index.html";
}

// Ejecutar cuando la página cargue
document.addEventListener("layoutLoaded", () => {
  if (document.getElementById("page-perfil")) {
    initPerfil();
  }
});
