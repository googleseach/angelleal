const API_URL = "https://script.google.com/macros/s/AKfycbywNCWY6SDCz9voluIwuMC5y2BCeGWX0ZGsg9BxKo-u8bV_2wNBT_o_vV3oh1aKyXH8lA/exec";

async function apiCall(action, payload) {
  const body = JSON.stringify({action, ...payload});
  let res;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type":"text/plain;charset=utf-8"},
      body
    });
  } catch (netErr) {
    throw new Error("No se pudo conectar con el servidor. Revise su conexión a internet.");
  }
  if(!res.ok) throw new Error("Error de red (" + res.status + "). Intente de nuevo.");
  let data;
  try { data = await res.json(); }
  catch(e){ throw new Error("El servidor devolvió una respuesta inválida."); }
  if(data.error) throw new Error(data.error);
  return data;
}

function fileToBase64(file){
  return new Promise((resolve,reject)=>{
    const r = new FileReader();
    r.onload = ()=> resolve(r.result.split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

(function checkApiUrl(){
  if(typeof API_URL !== "string" || !API_URL.endsWith("/exec")){
    console.warn("[Config] API_URL debe terminar en /exec. Valor actual:", API_URL);
    showErrorBanner("⚠️ El formulario aún no está conectado al backend. Configure la constante API_URL.");
  }
})();

function showErrorBanner(msg){
  const el = document.getElementById("error-banner");
  if(!el) return;
  el.innerHTML = msg;
  el.classList.add("show");
}
function hideErrorBanner(){
  const el = document.getElementById("error-banner");
  if(el) el.classList.remove("show");
}
