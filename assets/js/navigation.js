function showPage(pageId){
  // 1. Verificación de seguridad para el Perfil
  if (pageId === "perfil") {
    const token = localStorage.getItem("al_session");
    if (!token) {
      alert("Debe iniciar sesión para ver su perfil.");
      pageId = "consultas"; // Lo mandamos a consultas para que se loguee
    }
  }

  // 2. Ocultar todas las páginas y mostrar la seleccionada
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById("page-" + pageId);
  if(target) target.classList.add("active");
  
  // 3. Actualizar el menú
  document.querySelectorAll(".main-nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === pageId);
  });
  const nav = document.getElementById("main-nav");
  if(nav) nav.classList.remove("open");

  // 4. Acciones específicas por página
  if(pageId === "consultas"){
    if(typeof showInfo === 'function') showInfo();
  }
  if(pageId === "perfil"){
    if(typeof initPerfil === 'function') initPerfil();
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}

function showFormulario(){
  // Mostrar la sección del formulario
  document.getElementById("consultas-info").classList.add("hidden");
  document.getElementById("consultas-formulario").classList.remove("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas › Solicitar consulta";

  // Verificar si ya hay sesión activa
  const token = localStorage.getItem("al_session");
  const email = localStorage.getItem("al_email");
  
  if (token && email) {
    // SI HAY SESIÓN: Ocultar login y mostrar la app directamente
    const authScreen = document.getElementById("auth-screen");
    const app = document.getElementById("app");
    if(authScreen) authScreen.classList.add("hidden");
    if(app) app.classList.remove("hidden");
    
    // Configurar el estado visual
    const topStatus = document.getElementById("top-status");
    if(topStatus) topStatus.classList.remove("hidden");
    const userEmailLabel = document.getElementById("user-email-label");
    if(userEmailLabel) userEmailLabel.textContent = email === "admin@angelleal.com" ? "MODO DEMO" : email;
    
    // Conectar con la lógica del formulario
    if(window.state) {
      window.state.sessionToken = token;
      window.state.email = email;
      window.state.currentStep = 0; // Reiniciar al paso 1
    }
    if(typeof renderRail === 'function') renderRail();
    if(typeof renderStep === 'function') renderStep();
  } else {
    // SI NO HAY SESIÓN: Mostrar login
    const authScreen = document.getElementById("auth-screen");
    const app = document.getElementById("app");
    if(authScreen) authScreen.classList.remove("hidden");
    if(app) app.classList.add("hidden");
  }
  window.scrollTo({top: 0, behavior: "smooth"});
}

function hideFormulario(){
  document.getElementById("consultas-info").classList.remove("hidden");
  document.getElementById("consultas-formulario").classList.add("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas";
  window.scrollTo({top: 0, behavior: "smooth"});
}

function showInfo(){
  document.getElementById("consultas-info").classList.remove("hidden");
  document.getElementById("consultas-formulario").classList.add("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas";
}
