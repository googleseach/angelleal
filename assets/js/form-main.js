let state = {
  sessionToken: null, email: null, currentStep: 0,
  caseType: null, personal: {}, caseDetails: {}, trips: [], files: {}
};
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
  // En modo demo, podemos permitir avanzar sin llenar los campos obligatorios
  if(state.sessionToken === "demo-token-12345") return true;

  if(step===0){
    if(!state.caseType){ alert("Seleccione un tipo de trámite para continuar."); return false; }
  }
  if(step===1){
    const required = ["nombres","apellidos","nacimiento","pais-nacimiento","telefono","direccion","ciudad","estado","zip","estado-civil"];
    let ok = true, firstBad = null;
    required.forEach(f=>{
      const el = document.getElementById("p-"+f);
      if(!el) return;
      const valid = el.value.trim() !== "";
      const field = el.closest(".field");
      if(field) field.classList.toggle("invalid", !valid);
      if(!valid){ ok = false; if(!firstBad) firstBad = "#p-"+f; }
    });
    if(!ok){ alert("Complete los campos obligatorios marcados con *."); if(firstBad) markInvalidAndScroll(firstBad); }
    return ok;
  }
  if(step===2){
    const ids = CASE_REQUIRED_FIELDS[state.caseType] || [];
    let ok = true, firstBad = null;
    ids.forEach(id=>{
      const el = document.getElementById(id);
      if(!el) return;
      const valid = (el.value || "").trim() !== "";
      const field = el.closest(".field");
      if(field) field.classList.toggle("invalid", !valid);
      if(!valid){ ok = false; if(!firstBad) firstBad = "#"+id; }
    });
    if(!ok){ alert("Complete los campos obligatorios marcados con *."); if(firstBad) markInvalidAndScroll(firstBad); }
    return ok;
  }
  if(step===4){
    const cb = document.getElementById("confirm-truth");
    if(cb && !cb.checked){
      alert("Debe confirmar que la información es verdadera antes de enviar.");
      return false;
    }
  }
  return true;
}

function stateSnapshot(){
  return {
    currentStep: state.currentStep,
    caseType: state.caseType,
    personal: state.personal,
    caseDetails: state.caseDetails,
    trips: state.trips,
    files: state.files
  };
}

function scheduleSave(){
  // Si es modo demo, no guardamos nada
  if(state.sessionToken === "demo-token-12345") return;

  const note = document.getElementById("save-note");
  if(note) note.textContent = "Guardando…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      await apiCall("guardarProgreso", {sessionToken: state.sessionToken, progreso: stateSnapshot()});
      if(note) note.textContent = "Progreso guardado ✓";
    }catch(err){
      if(note) note.textContent = "No se pudo guardar (revise su conexión).";
    }
  }, 900);
}

async function submitApplication(){
  // Si es modo demo, simulamos el envío exitoso
  if(state.sessionToken === "demo-token-12345") {
    document.getElementById("app").classList.add("hidden");
    document.getElementById("top-status").classList.add("hidden");
    document.getElementById("confirm-screen").classList.remove("hidden");
    return;
  }

  const btn = document.getElementById("btn-next");
  if(btn){ btn.disabled = true; btn.textContent = "Enviando…"; }
  try{
    await apiCall("enviarSolicitud", {sessionToken: state.sessionToken, progreso: stateSnapshot()});
    hideErrorBanner();
    document.getElementById("app").classList.add("hidden");
    document.getElementById("top-status").classList.add("hidden");
    document.getElementById("confirm-screen").classList.remove("hidden");
  }catch(err){
    alert("No se pudo enviar la solicitud: " + (err.message||"intente de nuevo."));
    if(btn){ btn.disabled = false; btn.textContent = "Enviar solicitud"; }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  
  const btnNextEl = document.getElementById("btn-next");
  if(btnNextEl){
    btnNextEl.addEventListener("click", async ()=>{
      if(!validateStep(state.currentStep)) return;
      if(state.currentStep < 4){
        state.currentStep++;
        renderStep();
        scheduleSave();
      } else {
        await submitApplication();
      }
    });
  }

  const btnBackEl = document.getElementById("btn-back");
  if(btnBackEl){
    btnBackEl.addEventListener("click", ()=>{
      if(state.currentStep>0){
        state.currentStep--;
        renderStep();
      }
    });
  }

  const token = localStorage.getItem("al_session");
  const email = localStorage.getItem("al_email");
  if(token && email){
    onAuthed(token, email);
    if(token !== "demo-token-12345") {
      apiCall("obtenerProgreso", {sessionToken: token}).then(data=>{
        if(data.progreso) restoreProgress(data.progreso);
      }).catch(()=>{});
    }
  }
});
