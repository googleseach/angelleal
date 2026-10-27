const CASE_CONFIG = {
  asilo: {
    title: "Detalles de su solicitud de asilo",
    sub: "Esta información nos ayuda a evaluar el fundamento de su caso.",
    docs: [
      {key:"pasaporte", label:"Pasaporte o identificación", hint:"Todas las páginas con información."},
      {key:"entrada", label:"Comprobante de entrada a EE.UU.", hint:"I-94, sello de entrada, boleto, etc."},
      {key:"evidencia", label:"Evidencia de persecución", hint:"Denuncias, fotos, cartas, noticias, etc."}
    ]
  },
  residencia: {
    title: "Detalles de su solicitud de residencia",
    sub: "Cuéntenos sobre la categoría bajo la cual aplicará.",
    docs: [
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"peticion", label:"Petición del patrocinador", hint:"I-130, oferta de empleo, etc. si la tiene."},
      {key:"civil", label:"Documentos civiles", hint:"Acta de nacimiento, matrimonio, etc."}
    ]
  },
  ciudadania: {
    title: "Detalles de su solicitud de ciudadanía",
    sub: "Información sobre su tiempo como residente permanente.",
    docs: [
      {key:"greencard", label:"Green Card (ambos lados)", hint:""},
      {key:"pasaporte", label:"Pasaporte(s)", hint:"Actual y anteriores si los tiene."},
      {key:"impuestos", label:"Declaraciones de impuestos", hint:"Últimos 5 años, o transcripciones del IRS."}
    ]
  },
  perdon: {
    title: "Detalles de su solicitud de perdón (waiver)",
    sub: "Cuéntenos sobre el motivo de inadmisibilidad y su familiar calificante.",
    docs: [
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"notificacion", label:"Notificación de inadmisibilidad", hint:"Carta de USCIS o del consulado, si la tiene."},
      {key:"relacion", label:"Prueba de relación familiar", hint:"Acta de matrimonio o nacimiento con el familiar."}
    ]
  }
};

const CASE_REQUIRED_FIELDS = {
  asilo:      ["c-pais-origen","c-motivo"],
  residencia: ["c-categoria"],
  ciudadania: ["c-fecha-residencia"],
  perdon:     ["c-motivo-inadmisibilidad"]
};

const CASE_FIELD_LABELS = {
  "pais-origen": "País de origen",
  "motivo": "Motivo de persecución",
  "detenido": "¿Detenido o arrestado en su país?",
  "dependientes": "Familiares dependientes",
  "categoria": "Categoría",
  "patrocinador": "Nombre del patrocinador",
  "relacion-patrocinador": "Relación con el patrocinador",
  "estatus-actual": "Estatus migratorio actual",
  "fecha-residencia": "Fecha de residencia permanente",
  "impuestos": "¿Impuestos al día?",
  "antecedentes": "¿Antecedentes penales?",
  "motivo-inadmisibilidad": "Motivo de inadmisibilidad",
  "familiar-calificante": "Familiar calificante",
  "relacion-familiar": "Relación con el familiar"
};

const PERSONAL_FIELD_LABELS = {
  "nombres": "Nombre(s)",
  "apellidos": "Apellido(s)",
  "nacimiento": "Fecha de nacimiento",
  "pais-nacimiento": "País de nacimiento",
  "telefono": "Teléfono",
  "anumber": "A-Number",
  "direccion": "Dirección",
  "estado-civil": "Estado civil",
  "fecha-entrada": "Fecha de entrada a EE.UU."
};

const STEPS = ["Tipo de trámite","Datos personales","Detalles del caso","Documentos","Revisión y envío"];
