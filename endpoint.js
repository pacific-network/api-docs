const endpoints = [
  {
    "title": "Mis Servicios",
    "method": "GET",
    "path": "{{BASE_URL}}/v2/business/my-services",
    "category": "Cuenta",
    "descripcion": "Obtiene los servicios que el cliente tiene disponible.",
    "responseExample": [
      {
        "id": 1,
        "empresa_id": 1,
        "service_id": 1,
        "service_name": "Número corto",
        "service_description": "Número corto para envío masivo de SMS",
        "assigned_numbers": ["+1111"],
        "price": 0
      }
    ]
  },
  {
    "title": "Info Cuenta",
    "method": "GET",
    "path": "{{BASE_URL}}/v2/business/account-info",
    "category": "Cuenta",
    "descripcion": "Entrega la información general de la cuenta.",
    "responseExample": {
      "apiKey": "13186bdee70b080cbd15364a4bccf4e05b794ad049e94ac62c34c1b4aa6e7f05",
      "empresa": {
        "id": 1,
        "rut": "00.000.000-0",
        "razon_social": "TEST Empresa Mock S.A.",
        "nombre_fantasia": "Mockingbird Test Co.",
        "data": {
          "contact": {
            "email": "qa+mock@testing.local",
            "phone": "+56 9 0000 0000"
          },
          "domicilio": "Calle Falsa 123, Lab 0, Entorno de Pruebas, Santiago",
          "seed_info": "generated_for_unit_tests_2025",
          "test_data": true,
          "environment": "test",
          "objeto_social": "Pruebas, QA y datos de integración - ENTORNO DE TEST",
          "grupo_empresarial": [
            {
              "rut": "00.111.222-3",
              "nombre": "TEST Holding Mock SpA"
            }
          ]
        },
        "cuota_mensual": "0",
        "cuota_usada": "0",
        "logo_url": "https://placehold.co/200x200?text=TEST+LOGO"
      }
    }
  },
  {
    "title": "Crear Campaña",
    "method": "POST",
    "path": "{{BASE_URL}}/v2/campaigns",
    "category": "Campaña",
    "descripcion": "Crea una nueva campaña de envío de SMS.",
    "params": [
      { "name": "name", "type": "string" },
      { "name": "empresa_service_id", "type": "number" },
      { "name": "descripcion", "type": "string" , "optional": true },
      { "name": "messages", "type": "array" }
    ],
    "requestExample": {
        "campaign": {
          "id": 3,
          "name": "Campana de Prueba ",
          "cod_campaign": "CAM-SKP2F1S",
          "empresaService": {
            "id": 4,
            "service": {
              "id": 4,
              "code": "ani809",
              "description": "Número con ANI 809",
              "price": "0.00",
              "priority": 0
            },
            "assigned_numbers": {
              "price": 0,
              "numbers": [
                "+5680911111"
              ]
            }
          },
          "empresa": {
            "id": 1
          },
          "fechaCreacion": "2025-09-24T11:57:36.454Z",
          "data": {
            "cantidad_mensajes": 1,
            "cantidad_mensajes_enviados": 0,
            "cantidad_mensajes_fallidos": 1,
            "cantidad_mensajes_recibidos": 0
          },
          "estado": "creada",
          "descripcion": null,
          "origen": "api",
          "scheduledAt": null
        },
        "total_sms_cargados": 1,
        "numeros_validos": 0,
        "numeros_invalidos": 1,
        "results": [
          {
            "number": "5698840465",
            "status": "Error",
            "error": "Número no válido"
          }
        ]
    }
  },
  {
    "title": "Enviar Mensaje Individual",
    "method": "POST",
    "path": "{{BASE_URL}}/v2/messages/send",
    "category": "Mensaje Individual",
    "descripcion": "Permite enviar un único mensaje SMS a un destinatario.",
    "params": [
      { "name": "empresa_service_id", "type": "number" },
      { "name": "number", "type": "number" },
      { "name": "sms_content", "type": "string" }
    ],
    "requestExample": {
      "empresa_service_id": 4,
      "number": "56988404652",
      "sms_content": "Mensaje de prueba desde la API - ENVÍO INDIVIDUAL"
    },
    "responseExample":{
      "id_sms": "sms-55e7bec679",
      "number": "56988440465",
      "status": "Enviado"
    }
  },
  {
    "title": "Reporte Diario",
    "method": "GET",
    "path": "/api/report/daily",
    "category": "Reporte",
    "descripcion": "Entrega el reporte consolidado de mensajes enviados en una fecha específica.",
    "params": [
      { "name": "date", "type": "string" }
    ]
  }
];

function syntaxHighlight(json) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  return json.replace(/(&|<|>)/g, '&$1')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      });
}

const container = document.getElementById("endpoints-container");

// Render por categoría
function renderCategory(cat) {
  container.innerHTML = "";
  const filtered = endpoints.filter(ep => ep.category === cat);

  filtered.forEach(ep => {
    const card = document.createElement("div");
    card.classList.add("endpoint-card");

    // HTML para parámetros y ejemplos
    let paramsHtml = "";
    let responseHtml = "";

    if (ep.params && ep.params.length) {
      paramsHtml = `
        <h4>Parámetros:</h4>
        <ul class="param-list">
          ${ep.params.map((p) => `<li><code>${p.name}</code> (${p.type})</li>`).join("")}
        </ul>
      `;
    }

    if (ep.requestExample) {
      paramsHtml += `
        <h4>Ejemplo Request:</h4>
        <pre class="response-block">${JSON.stringify(ep.requestExample, null, 2)}</pre>
      `;
    }

    if (ep.responseExample) {
      responseHtml = `
        <h4>Ejemplo Response:</h4>
        <pre class="response-block">${JSON.stringify(ep.responseExample, null, 2)}</pre>
      `;
    }

    // Construcción del card
    card.innerHTML = `
      <div class="endpoint-header collapse-header">
        <h3 class="endpoint-title">${ep.title}</h3>
        <span class="method-badge method-${ep.method.toLowerCase()}">${ep.method}</span>
      </div>
      <div class="collapse-content">
        <div class="code-block"><strong>URL:</strong> ${ep.path}</div>
        ${ep.descripcion ? `<p class="endpoint-desc">${ep.descripcion}</p>` : ""}
        ${paramsHtml}
        ${responseHtml}
      </div>
    `;

    container.appendChild(card);
  });

  // Collapse toggle
  document.querySelectorAll(".collapse-header").forEach(header => {
    header.addEventListener("click", () => {
      header.nextElementSibling.classList.toggle("open");
      header.classList.toggle("expanded");
    });
  });
}

// Tabs
document.querySelectorAll(".cat-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderCategory(tab.dataset.cat);
  });
});

// Render inicial
renderCategory("Cuenta");
