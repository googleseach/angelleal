const CASE_CONFIG = {
  asilo: {
    title: "Detalles de Asilo o Alivio Humanitario",
    sub: "Cuéntenos por qué teme regresar a su país.",
    docs: [
      {key:"pasaporte", label:"Pasaporte o identificación", hint:"Todas las páginas con información."},
      {key:"entrada", label:"Comprobante de entrada a EE.UU.", hint:"I-94, sello de entrada, boleto, etc."},
      {key:"evidencia", label:"Evidencia de persecución", hint:"Denuncias, fotos, cartas, noticias, etc."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  },
  residencia: {
    title: "Detalles de Residencia o Visa Familiar",
    sub: "Cuéntenos sobre la relación con su peticionario.",
    docs: [
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"peticion", label:"Petición del patrocinador", hint:"I-130, I-129F, oferta de empleo, etc."},
      {key:"civil", label:"Documentos civiles", hint:"Acta de nacimiento, matrimonio, etc."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  },
  ciudadania: {
    title: "Detalles de Ciudadanía",
    sub: "Información sobre su tiempo como residente permanente.",
    docs: [
      {key:"greencard", label:"Green Card (ambos lados)", hint:""},
      {key:"pasaporte", label:"Pasaporte(s)", hint:"Actual y anteriores si los tiene."},
      {key:"impuestos", label:"Declaraciones de impuestos", hint:"Últimos 5 años, o transcripciones del IRS."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  },
  deportacion: {
    title: "Detalles de Defensa contra Deportación",
    sub: "Información sobre su caso en la Corte de Inmigración.",
    docs: [
      {key:"notificacion", label:"Notificación de la Corte (NTA)", hint:"Carta de USCIS o de la Corte de Inmigración."},
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"evidencia", label:"Evidencia de apoyo", hint:"Pruebas de residencia, familia, etc."}
    ]
  },
  perdon: {
    title: "Detalles de Perdón (Waiver) o FOIA",
    sub: "Cuéntenos sobre el motivo de inadmisibilidad o su solicitud de récord.",
    docs: [
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"notificacion", label:"Notificación de inadmisibilidad", hint:"Carta de USCIS o del consulado, si la tiene."},
      {key:"relacion", label:"Prueba de relación familiar", hint:"Acta de matrimonio o nacimiento con el familiar."}
    ]
  },
  trabajo: {
    title: "Detalles de Visa de Trabajo o Negocios",
    sub: "Información sobre su empleador o negocio.",
    docs: [
      {key:"pasaporte", label:"Pasaporte", hint:""},
      {key:"oferta", label:"Oferta de empleo o carta de la empresa", hint:"Si aplica."},
      {key:"cv", label:"Currículum Vitae (CV)", hint:"Para visas de trabajo."}
    ]
  },
  estatal: {
    title: "Detalles de Ley Estatal en Florida",
    sub: "Información sobre su caso de divorcio, bienes raíces, corporación, etc.",
    docs: [
      {key:"identificacion", label:"Identificación", hint:""},
      {key:"contratos", label:"Contratos o documentos relevantes", hint:"Escrituras, acuerdos, etc."}
    ]
  }
};

const CASE_REQUIRED_FIELDS = {
  asilo:      ["c-pais-origen","c-motivo","c-fecha-limite","c-miedo-regreso"],
  residencia: ["c-categoria","c-peticionario","c-entrada-ilegal"],
  ciudadania: ["c-fecha-residencia","c-viajes-6meses"],
  deportacion:["c-fecha-corte","c-tiene-abogado"],
  perdon:     ["c-motivo-inadmisibilidad","c-familiar-calificante","c-dificultad-extrema"],
  trabajo:    ["c-empleador","c-tipo-visa"],
  estatal:    ["c-tipo-caso-estatal"]
};

const CASE_FIELD_LABELS = {
  "pais-origen": "País de origen",
  "motivo": "Motivo de persecución",
  "fecha-limite": "Fecha límite para asilo",
  "miedo-regreso": "¿Tiene miedo de regresar?",
  "detenido": "¿Detenido o arrestado?",
  "dependientes": "Familiares dependientes",
  "categoria": "Categoría",
  "peticionario": "¿Quién es su peticionario?",
  "entrada-ilegal": "¿Entrada ilegal previa?",
  "relacion-patrocinador": "Relación con el patrocinador",
  "estatus-actual": "Estatus migratorio actual",
  "fecha-residencia": "Fecha de residencia permanente",
  "viajes-6meses": "¿Viajes > 6 meses?",
  "impuestos": "¿Impuestos al día?",
  "antecedentes": "¿Antecedentes penales?",
  "fecha-corte": "Fecha de la Corte",
  "tiene-abogado": "¿Tiene abogado actualmente?",
  "motivo-inadmisibilidad": "Motivo de inadmisibilidad",
  "familiar-calificante": "Familiar calificante",
  "dificultad-extrema": "¿Dificultad extrema?",
  "relacion-familiar": "Relación con el familiar",
  "empleador": "Nombre del empleador",
  "tipo-visa": "Tipo de visa solicitada",
  "tipo-caso-estatal": "Tipo de caso estatal"
};

const PERSONAL_FIELD_LABELS = {
  "nombres": "Nombre(s)",
  "apellidos": "Apellido(s)",
  "alias": "Alias / Otros nombres",
  "nacimiento": "Fecha de nacimiento",
  "pais-nacimiento": "País de nacimiento",
  "telefono": "Teléfono",
  "email-secundario": "Correo secundario",
  "anumber": "A-Number",
  "direccion": "Dirección",
  "ciudad": "Ciudad",
  "estado": "Estado",
  "zip": "Código Postal",
  "estado-civil": "Estado civil",
  "fecha-entrada": "Fecha de entrada a EE.UU."
};

const STEPS = ["Tipo de trámite","Datos personales","Detalles del caso","Documentos","Revisión y envío"];
