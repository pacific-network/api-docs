document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------
    // ELEMENTOS DEL NAV Y DE TABS
    // -------------------------------
    const navLinks = document.querySelectorAll(".nav-link");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const body = document.body;

    // -------------------------------
    // TOGGLE TEMA DARK/LIGHT
    // -------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    themeToggleBtn?.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      body.classList.toggle("light-theme");
      sunIcon.classList.toggle("hidden");
      moonIcon.classList.toggle("hidden");
    });

    // -------------------------------
    // FUNCION PARA ACTIVAR TAB
    // -------------------------------
    const activateTab = (tabId) => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
      const content = document.getElementById(`${tabId}-content`);

      if (btn) btn.classList.add("active");
      if (content) content.classList.add("active");
    };

    // -------------------------------
    // HAMBURGUESA (MÓVILES)
    // -------------------------------
    const hamburger = document.getElementById("hamburger");
    const navLinksContainer = document.querySelector(".nav-links");

    hamburger?.addEventListener("click", () => {
      navLinksContainer.classList.toggle("show");
      hamburger.classList.toggle("active");
    });

    // -------------------------------
    // NAV LINK CLICK
    // -------------------------------
    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1); // quita #

        // Activar tab correspondiente
        activateTab(targetId);

        // Scroll suave hacia la sección de tabs
        const targetEl = document.getElementById(`${targetId}-content`);
        if (targetEl) {
          window.scrollTo({
            top: targetEl.offsetTop - 80, // Ajustar según header
            behavior: "smooth"
          });
        }

        // Resaltar link activo
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Cerrar menú en móviles si estaba abierto
        if (navLinksContainer.classList.contains("show")) {
          navLinksContainer.classList.remove("show");
          hamburger.classList.remove("active");
        }
      });
    });

    // -------------------------------
    // RESALTAR LINK ACTIVO AL SCROLL
    // -------------------------------
    const sections = document.querySelectorAll(".tab-content");
    const setActiveLinkOnScroll = () => {
      const scrollPos = window.scrollY + 90;
      sections.forEach(sec => {
        const secTop = sec.offsetTop;
        const secBottom = secTop + sec.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${sec.id.replace("-content","")}"]`);
        if (link) {
          if (scrollPos >= secTop && scrollPos < secBottom) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      });
    };

    window.addEventListener("scroll", setActiveLinkOnScroll);
    setActiveLinkOnScroll();
});
