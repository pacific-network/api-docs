// --- Modal ---
const modal = document.getElementById("servicesModal");
const openBtn = document.querySelector(".btn-primary");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = modal.querySelector("h2");

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
  generateRows(currentPage);  // Genera las filas del primer servicio
  showPage();                 // Renderiza la tabla
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

const services = [
    {
      serviceId: 1,
      name: "Numero Corto",
      prices: [
        { minVolume: 0, maxVolume: 399999, unitPrice: 15 },
        { minVolume: 400000, maxVolume: 499999, unitPrice: 13 },
        { minVolume: 500000, maxVolume: 599999, unitPrice: 11 },
        { minVolume: 600000, maxVolume: 699999, unitPrice: 10 },
        { minVolume: 700000, maxVolume: 799999, unitPrice: 9 },
        { minVolume: 800000, maxVolume: 899999, unitPrice: 8 },
        { minVolume: 900000, maxVolume: 999999, unitPrice: 7 },
        { minVolume: 1000000, maxVolume: 999999999, unitPrice: 5 },
      ]
    },
    {
      serviceId: 2,
      name: "Numero Largo",
      prices: [
        { minVolume: 0, maxVolume: 399999, unitPrice: 0 },
        { minVolume: 400000, maxVolume: 499999, unitPrice: 0 },
        { minVolume: 500000, maxVolume: 599999, unitPrice: 0 },
        { minVolume: 600000, maxVolume: 699999, unitPrice: 0 },
        { minVolume: 700000, maxVolume: 799999, unitPrice: 0 },
        { minVolume: 800000, maxVolume: 899999, unitPrice: 0 },
        { minVolume: 900000, maxVolume: 999999, unitPrice: 0 },
        { minVolume: 1000000, maxVolume: 999999999, unitPrice: 0 },
      ]
    },
    {
      serviceId: 3,
      name: "Numero 600",
      prices: [
        { minVolume: 0, maxVolume: 399999, unitPrice: 0 },
        { minVolume: 400000, maxVolume: 499999, unitPrice: 0 },
        { minVolume: 500000, maxVolume: 599999, unitPrice: 0 },
        { minVolume: 600000, maxVolume: 699999, unitPrice: 0 },
        { minVolume: 700000, maxVolume: 799999, unitPrice: 0 },
        { minVolume: 800000, maxVolume: 899999, unitPrice: 0 },
        { minVolume: 900000, maxVolume: 999999, unitPrice: 0 },
        { minVolume: 1000000, maxVolume: 999999999, unitPrice: 0 },
      ]
    },
    {
      serviceId: 4,
      name: "Numero 809",
      prices: [
        { minVolume: 0, maxVolume: 399999, unitPrice: 0 },
        { minVolume: 400000, maxVolume: 499999, unitPrice: 0 },
        { minVolume: 500000, maxVolume: 599999, unitPrice: 0 },
        { minVolume: 600000, maxVolume: 699999, unitPrice: 0 },
        { minVolume: 700000, maxVolume: 799999, unitPrice: 0 },
        { minVolume: 800000, maxVolume: 899999, unitPrice: 0 },
        { minVolume: 900000, maxVolume: 999999, unitPrice: 0 },
        { minVolume: 1000000, maxVolume: 999999999, unitPrice: 0 },
      ]
    },
    {
      serviceId: 5,
      name: "Mensaje con Respuesta",
      prices: [
        { minVolume: 0, maxVolume: 399999, unitPrice: 0 },
        { minVolume: 400000, maxVolume: 499999, unitPrice: 0 },
        { minVolume: 500000, maxVolume: 599999, unitPrice: 0 },
        { minVolume: 600000, maxVolume: 699999, unitPrice: 0 },
        { minVolume: 700000, maxVolume: 799999, unitPrice: 0 },
        { minVolume: 800000, maxVolume: 899999, unitPrice: 0 },
        { minVolume: 900000, maxVolume: 999999, unitPrice: 0 },
        { minVolume: 1000000, maxVolume: 999999999, unitPrice: 0 },
      ]
    },
    {
      serviceId: 6,
      name: "OTP (One-Time Password) ",
      prices: [
        { minVolume: 0, maxVolume: 399999, unitPrice: 0 },
        { minVolume: 400000, maxVolume: 499999, unitPrice: 0 },
        { minVolume: 500000, maxVolume: 599999, unitPrice: 0 },
        { minVolume: 600000, maxVolume: 699999, unitPrice: 0 },
        { minVolume: 700000, maxVolume: 799999, unitPrice: 0 },
        { minVolume: 800000, maxVolume: 899999, unitPrice: 0 },
        { minVolume: 900000, maxVolume: 999999, unitPrice: 0 },
        { minVolume: 1000000, maxVolume: 999999999, unitPrice: 0 },
      ]
    }
  ];



// --- Tabla y paginación ---
const tableBody = document.getElementById("servicesTable").getElementsByTagName("tbody")[0];
let currentPage = 0; // índice del servicio actual
let filteredRows = [];

function generateRows(serviceIndex) {
  const service = services[serviceIndex];
  filteredRows = service.prices.map(price => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${service.serviceId}</td>
      <td>${service.name}</td>
      <td>${price.minVolume.toLocaleString()} - ${price.maxVolume.toLocaleString()}</td>
      <td>$${price.unitPrice}</td>
    `;
    return tr;
  });
  modalTitle.textContent = `📊 Servicio: ${service.name}`;
}

function showPage() {
  tableBody.innerHTML = "";
  filteredRows.forEach(row => tableBody.appendChild(row));

  document.getElementById("pageInfo").textContent = `Servicio ${currentPage + 1} de ${services.length}`;
  document.getElementById("prevPage").disabled = (currentPage === 0);
  document.getElementById("nextPage").disabled = (currentPage === services.length - 1);
}

// Botones de paginación
document.getElementById("prevPage").addEventListener("click", () => {
  if(currentPage > 0) {
    currentPage--;
    generateRows(currentPage);
    showPage();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if(currentPage < services.length - 1) {
    currentPage++;
    generateRows(currentPage);
    showPage();
  }
});

// Filtro por servicio
document.getElementById("serviceSelector").addEventListener("change", (e) => {
  const selected = e.target.value;
  if(selected === "all") {
    currentPage = 0;
  } else {
    currentPage = services.findIndex(s => s.serviceId == selected);
  }
  generateRows(currentPage);
  showPage();
});

// Inicialización (opcional si quieres que también cargue al abrir la página)
generateRows(currentPage);
showPage();
