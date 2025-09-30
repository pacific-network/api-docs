// Manejo de Tabs
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab");
  
        // Activar solo el botón clickeado
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
  
        // Mostrar solo el contenido correspondiente
        tabContents.forEach(content => {
          if(content.id === `${target}-content`) {
            content.classList.add("active");
          } else {
            content.classList.remove("active");
          }
        });
      });
    });
  });
  