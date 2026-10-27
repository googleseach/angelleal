function initAuth() {
  document.querySelectorAll(".auth-tab").forEach(tab=>{
    tab.addEventListener("click", ()=>{
      document.querySelectorAll(".auth-tab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      const isLogin = tab.dataset.tab === "login";
      document.getElementById("login-form").classList.toggle("hidden", !isLogin);
      document.getElementById("register-form").classList.toggle("hidden", isLogin);
      document.getElementById("auth-msg").className = "auth-msg";
    });
  });

  document.getElementById("login-form").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    try{
      const data = await apiCall("login", {email, password});
      hideErrorBanner();
      onAuthed(data.sessionToken, email);
      if(data.progreso) restoreProgress(data.progreso);
    }catch(err){
      showAuthMsg(err.message || "No se pudo iniciar sesión.", "error");
    }
  });

  document.getElementById("register-form").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;
    const password2 = document.getElementById("reg-password2").value;
    if(password !== password2){
      showAuthMsg("Las contraseñas no coinciden.", "error");
      return;
    }
    try{
      const data = await apiCall("registrar", {name, email, password});
      hideErrorBanner();
      onAuthed(data.sessionToken, email);
    }catch(err){
      showAuthMsg(err.message || "No se pudo crear la cuenta.", "error");
    }
  });

  document.getElementById("logout-btn").addEventListener("click", ()=>{
    localStorage.removeItem("al_session");
    localStorage.removeItem("al_email");
    location.reload();
  });
}

function showAuthMsg(text, type){
  const el = document.getElementById("auth-msg");
  el.textContent = text;
  el.className = "auth-msg " + type;
}

function onAuthed(token, email){
  state.sessionToken = token;
  state.email = email;
  localStorage.setItem("al_session", token);
  localStorage.setItem("al_email", email);
  document.getElementById("auth-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("top-status").classList.remove("hidden");
  document.getElementById("user-email-label").textContent = email;
  renderRail();
  renderStep();
}

function restoreProgress(p){
  state = {...state, ...p, sessionToken: state.sessionToken, email: state.email};
  renderRail();
  renderStep();
}
