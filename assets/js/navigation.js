function showPage(pageId){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById("page-" + pageId);
  if(target) target.classList.add("active");
  document.querySelectorAll(".main-nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === pageId);
  });
  document.getElementById("main-nav").classList.remove("open");
  if(pageId === "consultas"){
    showInfo();
  }
  window.scrollTo({top: 0, behavior: "smooth"});
}

function showFormulario(){
  document.getElementById("consultas-info").classList.add("hidden");
  document.getElementById("consultas-formulario").classList.remove("hidden");
  const crumb = document.getElementById("consultas-crumb");
  if(crumb) crumb.textContent = "Consultas › Solicitar consulta";
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
