const endpoints = [
    { title: "Info Cuenta", method: "GET", path: "/api/account/info", category: "Cuenta", params: [] },
    { title: "Mis Servicios", method: "GET", path: "/api/account/services", category: "Cuenta", params: [] },
    { title: "Crear Campaña", method: "POST", path: "/api/campaign/create", category: "Campaña", params: [{ name: "name", type: "string" }] },
    { title: "Enviar Mensaje Individual", method: "POST", path: "/api/message/send", category: "Mensaje Individual", params: [{ name: "phone", type: "string" }] },
    { title: "Reporte Diario", method: "GET", path: "/api/report/daily", category: "Reporte", params: [{ name: "date", type: "string" }] },
  ];
  
  const container = document.getElementById("endpoints-container");
  
  // Función para renderizar endpoints de una categoría
  function renderCategory(cat) {
    container.innerHTML = ""; // limpiar
    const filtered = endpoints.filter(ep => ep.category === cat);
  
    filtered.forEach(ep => {
      const card = document.createElement("div");
      card.classList.add("endpoint-card");
  
      card.innerHTML = `
        <div class="endpoint-header collapse-header">
          <h3 class="endpoint-title">${ep.title}</h3>
          <span class="method-badge method-${ep.method.toLowerCase()}">${ep.method}</span>
        </div>
        <div class="collapse-content">
          <div class="code-block">URL: ${ep.path}</div>
          ${ep.params.length ? `<ul class="param-list">${ep.params.map(p => `<li><code>${p.name}</code> (${p.type})</li>`).join("")}</ul>` : ""}
        </div>
      `;
  
      container.appendChild(card);
    });
  
    // Añadir comportamiento collapse
    document.querySelectorAll(".collapse-header").forEach(header => {
      header.addEventListener("click", () => {
        header.nextElementSibling.classList.toggle("open");
        header.classList.toggle("expanded");
      });
    });
  }
  
  // Tabs funcionales
  document.querySelectorAll(".cat-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderCategory(tab.dataset.cat);
    });
  });
  
  // Render inicial
  renderCategory("Cuenta");
  