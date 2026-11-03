function initAuth() {
  // Lógica de las pestañas de Login/Registro
  const authTabs = document.querySelectorAll(".auth-tab");
  if(authTabs.length > 0) {
    authTabs.forEach(tab=>{
      tab.addEventListener("click", ()=>{
        document.querySelectorAll(".auth-tab").forEach(t=>t.classList.remove("active"));
        tab.classList.add("active");
        const isLogin = tab.dataset.tab === "login";
        document.getElementById("login-form").classList.toggle("hidden", !isLogin);
        document.getElementById("register-form").classList.toggle("hidden", isLogin);
        document.getElementById("auth-msg").className = "auth-msg";
      });
    });
  }

  // Lógica del Formulario de Login
  const loginForm = document.getElementById("login-form");
  if(loginForm) {
    loginForm.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;

      // Acceso Demo
      if (email === "admin@angelleal.com" && password === "admin123") {
        onAuthed("demo-token-12345", email);
        return;
      }

      try{
        const data = await apiCall("login", {email, password});
        onAuthed(data.sessionToken, email);
        if(data.progreso) restoreProgress(data.progreso);
      }catch(err){
        showAuthMsg(err.message || "No se pudo iniciar sesión.", "error");
      }
    });
  }
}

function showAuthMsg(text, type){
  const el = document.getElementById("auth-msg");
  if(!el) return;
  el.textContent = text;
  el.className = "auth-msg " + type;
}

function onAuthed(token, email){
  // 1. Guardar en la memoria del navegador
  localStorage.setItem("al_session", token);
  localStorage.setItem("al_email", email);
  
  // 2. Actualizar el estado del formulario
  if(window.state) {
    window.state.sessionToken = token;
    window.state.email = email;
    window.state.currentStep = 0; // Reiniciar formulario
  }
  
  // 3. Ocultar Login, Mostrar Formulario
  const authScreen = document.getElementById("auth-screen");
  if(authScreen) authScreen.classList.add("hidden");
  
  const app = document.getElementById("app");
  if(app) app.classList.remove("hidden");
  
  const topStatus = document.getElementById("top-status");
  if(topStatus) topStatus.classList.remove("hidden");
  
  const userEmailLabel = document.getElementById("user-email-label");
  if(userEmailLabel) userEmailLabel.textContent = email === "admin@angelleal.com" ? "MODO DEMO" : email;
  
  // 4. Renderizar el formulario
  if(typeof renderRail === 'function') renderRail();
  if(typeof renderStep === 'function') renderStep();
}

function restoreProgress(p){
  if(!window.state) return;
  window.state = {...window.state, ...p};
  if(typeof renderRail === 'function') renderRail();
  if(typeof renderStep === 'function') renderStep();
}

function cerrarSesionGlobal() {
  localStorage.removeItem("al_session");
  localStorage.removeItem("al_email");
  window.location.href = "index.html"; // Recargar la página para limpiar todo
}
window.cerrarSesionGlobal = cerrarSesionGlobal;
