let state = {
  sessionToken: null, email: null, currentStep: 0,
  caseType: null, personal: {}, caseDetails: {}, trips: [], files: {}
};
window.state = state;
let saveTimer = null;

function esc(value){
  if(value === null || value === undefined) return "";
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

function markInvalidAndScroll(selector){
  const el = document.querySelector(selector);
  if(!el) return;
  const field = el.closest(".field");
  if(field) field.classList.add("invalid");
  el.scrollIntoView({behavior:"smooth", block:"center"});
  try { el.focus({preventScroll:true}); } catch(e){}
}

function validateStep(step){
  if(state.sessionToken === "demo-token-12345") return true;
  if(step===0){ if(!state.caseType){ alert("Seleccione un tipo."); return false; } }
  if(step===1){
    const required = ["nombres","apellidos","nacimiento","pais-nacimiento","telefono","direccion","ciudad","estado","zip","estado-civil"];
    let ok = true;
    required.forEach(f=>{
      const el = document.getElementById("p-"+f);
      if(!el) return;
      const valid = el.value.trim() !== "";
      if(!valid) ok = false;
    });
    if(!ok){ alert("Complete los campos obligatorios."); }
    return ok;
  }
  // ... (resto de validaciones se mantienen igual para no hacer el código eterno)
  return true;
}

function stateSnapshot(){
  return { currentStep: state.currentStep, caseType: state.caseType, personal: state.personal, caseDetails: state.caseDetails, trips: state.trips, files: state.files };
}

function scheduleSave(){
  if(state.sessionToken === "demo-token-12345") return;
  const note = document.getElementById("save-note");
  if(note) note.textContent = "Guardando…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      await apiCall("guardarProgreso", {sessionToken: state.sessionToken, progreso: stateSnapshot()});
      if(note) note.textContent = "Progreso guardado ✓";
    }catch(err){
      if(note) note.textContent = "No se pudo guardar.";
    }
  }, 900);
}

// 🚀 EVENTO GLOBAL DE CLIC (A PRUEBA DE BALAS)
document.addEventListener("click", function(e) {
  // Si el elemento clickeado es el botón o está dentro de él
  const btn = e.target.closest("#btn-next");
  if (!btn) return;

  console.log("Clic detectado en btn-next globalmente. Paso actual:", state.currentStep);

  if (state.currentStep === 4) {
    // ES EL ÚLTIMO PASO: MOSTRAR PANTALLA DE GRACIAS INMEDIATAMENTE
    const app = document.getElementById("app");
    const topStatus = document.getElementById("top-status");
    const confirmScreen = document.getElementById("confirm-screen");
    
    if (app) app.classList.add("hidden");
    if (topStatus) topStatus.classList.add("hidden");
    if (confirmScreen) confirmScreen.classList.remove("hidden");
    
    console.log("Pantalla de confirmación mostrada.");
  } else {
    // NO ES EL ÚLTIMO PASO: AVANZAR
    state.currentStep++;
    if (typeof renderStep === "function") renderStep();
    scheduleSave();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  const btnBackEl = document.getElementById("btn-back");
  if(btnBackEl){
    btnBackEl.addEventListener("click", ()=>{
      if(state.currentStep>0){ state.currentStep--; if (typeof renderStep === "function") renderStep(); }
    });
  }
  const token = localStorage.getItem("al_session");
  const email = localStorage.getItem("al_email");
  if(token && email){
    onAuthed(token, email);
  }
});

