function initPerfil() {
  const email = localStorage.getItem("al_email");
  if (!email) {
    showPage("inicio");
    return;
  }

  // 1. Cargar datos del usuario
  document.getElementById("perfil-nombre").textContent = email.split('@')[0];
  const editNombre = document.getElementById("perfil-edit-nombre");
  const editEmail = document.getElementById("perfil-edit-email");
  if (editNombre) editNombre.value = email.split('@')[0];
  if (editEmail) editEmail.value = email;

  // 2. Cargar solicitudes
  const ultimoCaso = localStorage.getItem("al_ultimo_caso");
  let solicitudesHTML = "";
  
  if (ultimoCaso) {
    const caseNames = {asilo:"Asilo", residencia:"Residencia", ciudadania:"Ciudadanía", deportacion:"Deportación", perdon:"Perdón/FOIA", trabajo:"Visa de Trabajo", estatal:"Ley Estatal"};
    solicitudesHTML = `
      <div style="border: 1px solid var(--line-soft); border-radius: var(--radius); padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <strong style="color: var(--ink);">Solicitud de ${caseNames[ultimoCaso] || ultimoCaso}</strong>
          <span style="background: #EAF3EA; color: var(--green); padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">En revisión</span>
        </div>
        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Enviada recientemente.</p>
      </div>
    `;
  } else {
    solicitudesHTML = `
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">No tiene solicitudes registradas aún.</p>
    `;
  }
  
  // Agregamos el botón de nueva consulta al final de la lista
  solicitudesHTML += `
    <button class="btn btn-primary" onclick="showPage('consultas'); setTimeout(showFormulario, 100);">+ Agendar nueva consulta</button>
  `;
  document.getElementById("perfil-lista-solicitudes").innerHTML = solicitudesHTML;

  // 3. Cargar Pagos (Simulado)
  document.getElementById("perfil-lista-pagos").innerHTML = `
    <div style="border: 1px solid var(--line-soft); border-radius: var(--radius); padding: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <strong style="color: var(--ink);">Consulta Legal</strong>
        <span style="background: #FFF4E5; color: #B7791F; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">Pendiente de pago</span>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Monto: $250.00</p>
    </div>
  `;
}

function switchPerfilTab(tabName) {
  document.querySelectorAll(".perfil-tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".perfil-tab").forEach(el => el.classList.remove("active"));
  const targetContent = document.getElementById(`perfil-tab-${tabName}`);
  if (targetContent) targetContent.classList.remove("hidden");
  const targetTab = document.querySelector(`.perfil-tab[data-tab="${tabName}"]`);
  if (targetTab) targetTab.classList.add("active");
}

function guardarDatosPerfil(e) {
  e.preventDefault();
  alert("Sus datos han sido actualizados correctamente.");
}
