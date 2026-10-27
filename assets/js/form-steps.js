function renderRail(){
  const rail = document.getElementById("rail");
  if(rail){
    rail.innerHTML = STEPS.map((label,i)=>{
      const cls = i===state.currentStep ? "active" : (i<state.currentStep ? "done" : "");
      return `<div class="rail-item ${cls}"><span class="rail-num">${i+1}</span><span class="rail-label">${esc(label)}</span></div>`;
    }).join("");
  }
  const mp = document.getElementById("mobile-progress");
  if(mp){
    mp.innerHTML = STEPS.map((_,i)=>{
      const cls = i===state.currentStep ? "active" : (i<state.currentStep ? "done" : "");
      return `<div class="dot ${cls}"></div>`;
    }).join("");
  }
}

function renderStep(){
  document.querySelectorAll(".step").forEach(s=> s.classList.toggle("hidden", Number(s.dataset.step) !== state.currentStep));
  const btnBack = document.getElementById("btn-back");
  const btnNext = document.getElementById("btn-next");
  if(btnBack) btnBack.style.visibility = state.currentStep===0 ? "hidden" : "visible";
  if(btnNext) btnNext.textContent = state.currentStep===4 ? "Enviar solicitud" : "Continuar";

  if(state.currentStep===0) renderCaseTypeStep();
  if(state.currentStep===1) renderPersonalStep();
  if(state.currentStep===2) renderCaseDetailsStep();
  if(state.currentStep===3) renderDocsStep();
  if(state.currentStep===4) renderReviewStep();

  renderRail();
  window.scrollTo({top:0, behavior:"smooth"});
}

function renderCaseTypeStep(){
  document.querySelectorAll("#case-type-cards .radio-card").forEach(card=>{
    card.classList.toggle("selected", card.dataset.value === state.caseType);
    card.onclick = ()=>{
      state.caseType = card.dataset.value;
      renderCaseTypeStep();
      scheduleSave();
    };
  });
}

const PERSONAL_FIELDS = ["nombres","apellidos","nacimiento","pais-nacimiento","telefono","anumber","direccion","estado-civil","fecha-entrada"];
function renderPersonalStep(){
  PERSONAL_FIELDS.forEach(f=>{
    const el = document.getElementById("p-"+f);
    if(!el) return;
    if(state.personal[f] !== undefined && state.personal[f] !== null && state.personal[f] !== ""){
      el.value = state.personal[f];
    }
    if(el.dataset.bound === "1") return;
    el.dataset.bound = "1";
    el.addEventListener("input", ()=>{
      state.personal[f] = el.value;
      scheduleSave();
    });
  });
}

function renderCaseDetailsStep(){
  const cfg = CASE_CONFIG[state.caseType] || CASE_CONFIG.residencia;
  const titleEl = document.getElementById("case-step-title");
  const subEl = document.getElementById("case-step-sub");
  if(titleEl) titleEl.textContent = cfg.title;
  if(subEl) subEl.textContent = cfg.sub;
  const wrap = document.getElementById("case-fields");
  if(!wrap) return;

  let html = "";
  if(state.caseType === "asilo"){
    html = `
      <div class="field"><label>País de origen <span class="req">*</span></label><input type="text" id="c-pais-origen"><div class="field-error">Ingrese su país de origen.</div></div>
      <div class="field"><label>Motivo de persecución <span class="req">*</span></label><textarea id="c-motivo" placeholder="Describa brevemente el motivo (religión, política, etc.) y los hechos relevantes."></textarea><div class="field-error">Describa el motivo de persecución.</div></div>
      <div class="field"><label>¿Ha sido detenido o arrestado en su país de origen por este motivo?</label><select id="c-detenido"><option value="">Seleccione…</option><option>Sí</option><option>No</option></select></div>
      <div class="field"><label>Familiares dependientes que viajan con usted</label><input type="text" id="c-dependientes" placeholder="Nombres y parentesco, si aplica"></div>`;
  } else if(state.caseType === "residencia"){
    html = `
      <div class="field"><label>Categoría <span class="req">*</span></label><select id="c-categoria"><option value="">Seleccione…</option><option>Familiar</option><option>Empleo</option><option>Otra</option></select><div class="field-error">Seleccione una categoría.</div></div>
      <div class="field"><label>Nombre del patrocinador</label><input type="text" id="c-patrocinador"></div>
      <div class="field"><label>Relación con el patrocinador</label><input type="text" id="c-relacion-patrocinador" placeholder="Ej. cónyuge, empleador, hijo/a"></div>
      <div class="field"><label>Estatus migratorio actual</label><input type="text" id="c-estatus-actual" placeholder="Ej. visa de turista, sin estatus, etc."></div>`;
  } else if(state.caseType === "ciudadania"){
    html = `
      <div class="field"><label>Fecha en que obtuvo la residencia permanente <span class="req">*</span></label><input type="date" id="c-fecha-residencia"><div class="field-error">Ingrese la fecha de obtención de residencia.</div></div>
      <div class="field"><label>¿Sus declaraciones de impuestos están al día?</label><select id="c-impuestos"><option value="">Seleccione…</option><option>Sí</option><option>No</option></select></div>
      <div class="field"><label>¿Tiene antecedentes penales, arrestos o citaciones?</label><select id="c-antecedentes"><option value="">Seleccione…</option><option>Sí</option><option>No</option></select></div>
      <div class="field"><label>Viajes fuera de EE.UU. (últimos 5 años)</label><div class="trips" id="trips-wrap"></div><button type="button" class="btn-add" id="add-trip">+ Agregar viaje</button></div>`;
  } else if(state.caseType === "perdon"){
    html = `
      <div class="field"><label>Motivo de inadmisibilidad <span class="req">*</span></label><textarea id="c-motivo-inadmisibilidad" placeholder="Ej. presencia ilegal, tergiversación, antecedente penal, etc."></textarea><div class="field-error">Describa el motivo de inadmisibilidad.</div></div>
      <div class="field"><label>Familiar ciudadano/residente calificante</label><input type="text" id="c-familiar-calificante" placeholder="Nombre completo"></div>
      <div class="field"><label>Relación con dicho familiar</label><input type="text" id="c-relacion-familiar" placeholder="Ej. cónyuge, padre/madre"></div>`;
  }
  wrap.innerHTML = html;

  wrap.querySelectorAll("input, select, textarea").forEach(el=>{
    const key = el.id.replace("c-","");
    if(state.caseDetails[key]) el.value = state.caseDetails[key];
    el.addEventListener("input", ()=>{ state.caseDetails[key]=el.value; scheduleSave(); });
  });

  if(state.caseType === "ciudadania"){
    renderTrips();
    const addTrip = document.getElementById("add-trip");
    if(addTrip){
      addTrip.onclick = ()=>{
        state.trips.push({salida:"",regreso:"",pais:""});
        renderTrips();
        scheduleSave();
      };
    }
  }
}

function renderTrips(){
  const wrap = document.getElementById("trips-wrap");
  if(!wrap) return;
  if(state.trips.length===0) state.trips.push({salida:"",regreso:"",pais:""});
  wrap.innerHTML = state.trips.map((t,i)=>`
    <div class="trip-row">
      <div><label>Salida</label><input type="date" data-i="${i}" data-f="salida" value="${esc(t.salida||'')}"></div>
      <div><label>Regreso</label><input type="date" data-i="${i}" data-f="regreso" value="${esc(t.regreso||'')}"></div>
      <div><label>País visitado</label><input type="text" data-i="${i}" data-f="pais" value="${esc(t.pais||'')}"></div>
      <div><button type="button" class="btn-ghost-sm" data-remove="${i}">Quitar</button></div>
    </div>`).join("");
  wrap.querySelectorAll("input").forEach(inp=>{
    inp.addEventListener("input", ()=>{
      state.trips[inp.dataset.i][inp.dataset.f] = inp.value;
      scheduleSave();
    });
  });
  wrap.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.trips.splice(Number(btn.dataset.remove),1);
      renderTrips();
      scheduleSave();
    });
  });
}

function renderDocsStep(){
  const cfg = CASE_CONFIG[state.caseType] || CASE_CONFIG.residencia;
  const wrap = document.getElementById("doc-groups");
  if(!wrap) return;
  wrap.innerHTML = cfg.docs.map(d=>`
    <div class="doc-group">
      <h3>${esc(d.label)}</h3>
      <p class="hint">${esc(d.hint)}</p>
      <div class="dropzone" data-key="${esc(d.key)}"><p><strong>Haga clic para subir</strong> o arrastre el archivo aquí — PDF, JPG o PNG</p></div>
      <input type="file" data-key="${esc(d.key)}" accept=".pdf,.jpg,.jpeg,.png" multiple style="display:none">
      <div class="file-list" data-list="${esc(d.key)}"></div>
    </div>`).join("");

  cfg.docs.forEach(d=>{
    const dz = wrap.querySelector(`.dropzone[data-key="${d.key}"]`);
    const input = wrap.querySelector(`input[data-key="${d.key}"]`);
    if(!dz || !input) return;
    dz.addEventListener("click", ()=> input.click());
    dz.addEventListener("dragover", e=>{e.preventDefault(); dz.classList.add("drag");});
    dz.addEventListener("dragleave", ()=> dz.classList.remove("drag"));
    dz.addEventListener("drop", e=>{
      e.preventDefault(); dz.classList.remove("drag");
      handleFiles(d.key, e.dataTransfer.files);
    });
    input.addEventListener("change", ()=> handleFiles(d.key, input.files));
    renderFileList(d.key);
  });
}

async function handleFiles(key, fileListObj){
  if(!state.files[key]) state.files[key] = [];
  for(const file of fileListObj){
    if(file.size > 10*1024*1024){
      alert(`"${file.name}" supera los 10 MB y no se agregó.`);
      continue;
    }
    const base64 = await fileToBase64(file);
    state.files[key].push({name:file.name, size:file.size, type:file.type, base64});
  }
  renderFileList(key);
  scheduleSave();
}

function renderFileList(key){
  const list = document.querySelector(`[data-list="${key}"]`);
  if(!list) return;
  const items = (state.files[key] || []).filter(f => !f.deleted);
  list.innerHTML = items.map((f,i)=>{
    const realIdx = state.files[key].indexOf(f);
    const tag = f.url ? `<span class="ftag">Subido ✓</span>` : `<span class="fsize">(${(f.size/1024).toFixed(0)} KB)</span>`;
    return `<div class="file-item"><span class="fname">📄 ${esc(f.name)} ${tag}</span><button type="button" data-key="${esc(key)}" data-i="${realIdx}">Quitar</button></div>`;
  }).join("");
  list.querySelectorAll("button[data-key]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const arr = state.files[btn.dataset.key];
      const idx = Number(btn.dataset.i);
      const item = arr[idx];
      if(item && item.url){ item.deleted = true; }
      else { arr.splice(idx, 1); }
      renderFileList(btn.dataset.key);
      scheduleSave();
    });
  });
}

function renderReviewStep(){
  const caseNames = {asilo:"Asilo", residencia:"Residencia", ciudadania:"Ciudadanía", perdon:"Perdón (Waiver)"};
  let filesCount = 0;
  Object.values(state.files).forEach(arr => { arr.forEach(f => { if(!f.deleted) filesCount++; }); });

  const personalRows = Object.entries(PERSONAL_FIELD_LABELS).map(([key, label])=>{
    const value = state.personal[key];
    if(value === undefined || value === null || value === "") return "";
    return `<div class="review-row"><span class="k">${esc(label)}</span><span class="v">${esc(value)}</span></div>`;
  }).join("");

  const caseRows = Object.entries(state.caseDetails).map(([k,v])=>{
    if(v === undefined || v === null || v === "") return "";
    const label = CASE_FIELD_LABELS[k] || k;
    return `<div class="review-row"><span class="k">${esc(label)}</span><span class="v">${esc(v)}</span></div>`;
  }).join("");

  const html = `
    <div class="review-block"><h3>Trámite</h3><div class="review-row"><span class="k">Tipo de caso</span><span class="v">${esc(caseNames[state.caseType]||"—")}</span></div></div>
    <div class="review-block"><h3>Datos personales</h3>${personalRows || "<p class='hint'>Sin datos.</p>"}</div>
    <div class="review-block"><h3>Detalles del caso</h3>${caseRows || "<p class='hint'>Sin datos adicionales.</p>"}</div>
    <div class="review-block"><h3>Documentos</h3><div class="review-row"><span class="k">Archivos adjuntos</span><span class="v">${esc(filesCount)}</span></div></div>
  `;
  const rc = document.getElementById("review-content");
  if(rc) rc.innerHTML = html;
}
