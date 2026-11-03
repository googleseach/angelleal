function initAuth() {
  // Si ya hay una sesión activa, no mostramos la pantalla de login
  const existingToken = localStorage.getItem("al_session");
  const existingEmail = localStorage.getItem("al_email");
  
  if (existingToken && existingEmail) {
    // Simulamos que ya está autenticado para que el formulario cargue directo
    if (window.state) {
      window.state.sessionToken = existingToken;
      window.state.email = existingEmail;
    }
    const authScreen = document.getElementById("auth-screen");
    if(authScreen) authScreen.classList.add("hidden");
    const app = document.getElementById("app");
    if(app) app.classList.remove("hidden");
    const topStatus = document.getElementById("top-status");
    if(topStatus) topStatus.classList.remove("hidden");
    const userEmailLabel = document.getElementById("user-email-label");
    if(userEmailLabel) userEmailLabel.textContent = existingEmail === "admin@angelleal.com" ? "MODO DEMO" : existingEmail;
  }

  const loginForm = document.getElementById("login-form");
  if(loginForm) {
    loginForm.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;

      if (email === "admin@angelleal.com" && password === "admin123") {
        onAuthed("demo-token-12345", email);
        return;
      }

      try{
        const data = await apiCall("login", {email, password});
        onAuthed(data.sessionToken, email);
        if(data.progreso) restoreProgress(data.progreso);
      }catch(err){
        alert("Error al iniciar sesión: " + err.message);
      }
    });
  }
}

function onAuthed(token, email){
  localStorage.setItem("al_session", token);
  localStorage.setItem("al_email", email);
  
  if(window.state) {
    window.state.sessionToken = token;
    window.state.email = email;
  }
  
  const authScreen = document.getElementById("auth-screen");
  if(authScreen) authScreen.classList.add("hidden");
  
  const app = document.getElementById("app");
  if(app) app.classList.remove("hidden");
  
  const topStatus = document.getElementById("top-status");
  if(topStatus) topStatus.classList.remove("hidden");
  
  const userEmailLabel = document.getElementById("user-email-label");
  if(userEmailLabel) userEmailLabel.textContent = email === "admin@angelleal.com" ? "MODO DEMO" : email;
  
  if(typeof renderRail === 'function') renderRail();
  if(typeof renderStep === 'function') renderStep();
}

function cerrarSesionGlobal() {
  localStorage.removeItem("al_session");
  localStorage.removeItem("al_email");
  window.location.reload();
}
window.cerrarSesionGlobal = cerrarSesionGlobal;
