function showPage(pageId){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById("page-" + pageId);
  if(target) target.classList.add("active");
  
  document.querySelectorAll(".main-nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === pageId);
  });
  
  const nav = document.getElementById("main-nav");
  if(nav) nav.classList.remove("open");

  if(pageId === "perfil"){
    if(typeof initPerfil === 'function') initPerfil();
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}

function showFormulario(){
  document.getElementById("consultas-info").classList.add("hidden");
  document.getElementById("consultas-formulario").classList.remove("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas › Solicitar consulta";
}

function hideFormulario(){
  document.getElementById("consultas-info").classList.remove("hidden");
  document.getElementById("consultas-formulario").classList.add("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas";
}

function showInfo(){
  document.getElementById("consultas-info").classList.remove("hidden");
  document.getElementById("consultas-formulario").classList.add("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas";
}
