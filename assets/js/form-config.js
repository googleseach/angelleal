const CASE_CONFIG = {
  asilo: {
    title: "Detalles de su solicitud de asilo",
    sub: "Esta información nos ayuda a evaluar el fundamento de su caso.",
    docs: [
      {key:"pasaporte", label:"Pasaporte o identificación", hint:"Todas las páginas con información."},
      {key:"entrada", label:"Comprobante de entrada a EE.UU.", hint:"I-94, sello de entrada, boleto, etc."},
      {key:"evidencia", label:"Evidencia de persecución", hint:"Denuncias, fotos, cartas, noticias, etc."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  },
  residencia: {
    title: "Detalles de su solicitud de residencia",
    sub: "Cuéntenos sobre la categoría bajo la cual aplicará.",
    docs: [
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"peticion", label:"Petición del patrocinador", hint:"I-130, oferta de empleo, etc. si la tiene."},
      {key:"civil", label:"Documentos civiles", hint:"Acta de nacimiento, matrimonio, etc."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  },
  ciudadania: {
    title: "Detalles de su solicitud de ciudadanía",
    sub: "Información sobre su tiempo como residente permanente.",
    docs: [
      {key:"greencard", label:"Green Card (ambos lados)", hint:""},
      {key:"pasaporte", label:"Pasaporte(s)", hint:"Actual y anteriores si los tiene."},
      {key:"impuestos", label:"Declaraciones de impuestos", hint:"Últimos 5 años, o transcripciones del IRS."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  },
  perdon: {
    title: "Detalles de su solicitud de perdón (waiver)",
    sub: "Cuéntenos sobre el motivo de inadmisibilidad y su familiar calificante.",
    docs: [
      {key:"identificacion", label:"Identificación / pasaporte", hint:""},
      {key:"notificacion", label:"Notificación de inadmisibilidad", hint:"Carta de USCIS o del consulado, si la tiene."},
      {key:"relacion", label:"Prueba de relación familiar", hint:"Acta de matrimonio o nacimiento con el familiar."},
      {key:"criminal", label:"Antecedentes penales", hint:"Si tiene algún récord, súbalo aquí."}
    ]
  }
};

const CASE_REQUIRED_FIELDS = {
  asilo:      ["c-pais-origen","c-motivo","c-fecha-limite","c-miedo-regreso"],
  residencia: ["c-categoria","c-peticionario","c-entrada-ilegal"],
  ciudadania: ["c-fecha-residencia","c-viajes-6meses"],
  perdon:     ["c-motivo-inadmisibilidad","c-familiar-calificante","c-dificultad-extrema"]
};

const CASE_FIELD_LABELS = {
  "pais-origen": "País de origen",
  "motivo": "Motivo de persecución",
  "fecha-limite": "Fecha límite para asilo",
  "miedo-regreso": "¿Tiene miedo de regresar?",
  "detenido": "¿Detenido o arrestado en su país?",
  "dependientes": "Familiares dependientes",
  "categoria": "Categoría",
  "peticionario": "¿Quién es su peticionario?",
  "entrada-ilegal": "¿Entrada ilegal previa?",
  "relacion-patrocinador": "Relación con el patrocinador",
  "estatus-actual": "Estatus migratorio actual",
  "fecha-residencia": "Fecha de residencia permanente",
  "viajes-6meses": "¿Viajes fuera de EE.UU. > 6 meses?",
  "impuestos": "¿Impuestos al día?",
  "antecedentes": "¿Antecedentes penales?",
  "motivo-inadmisibilidad": "Motivo de inadmisibilidad",
  "familiar-calificante": "Familiar calificante",
  "dificultad-extrema": "¿Dificultad extrema si es deportado?",
  "relacion-familiar": "Relación con el familiar"
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
