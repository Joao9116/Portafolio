document.addEventListener("DOMContentLoaded", () => {
  // 1. Año dinámico en el footer
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // 2. Aparición progresiva de tarjetas y secciones
  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible");
    }, index * 90);
  });

  // 3. Efecto de escritura en el subtítulo de index.html
  const subtitleEl = document.getElementById("typingSubtitle");
  if (subtitleEl) {
    const fullText = subtitleEl.dataset.text || subtitleEl.textContent;
    subtitleEl.textContent = "";
    let i = 0;
    const typeInterval = setInterval(() => {
      subtitleEl.textContent += fullText.charAt(i);
      i++;
      if (i >= fullText.length) {
        clearInterval(typeInterval);
      }
    }, 35);
  }

  // 4. Navegación con flechas del teclado (Izquierda / Derecha)
  const prevBtn = document.querySelector('.nav-buttons a[href*="pagina2"], .nav-buttons a[href*="index"]');
  const nextBtn = document.querySelector('.nav-arrow-container a, .nav-buttons a[href*="pagina3"], .nav-buttons a[href*="pagina2"]:last-child');

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.classList.contains("open")) return;

    if (e.key === "ArrowRight" && nextBtn) {
      navigateWithFade(nextBtn.href);
    } else if (e.key === "ArrowLeft" && prevBtn) {
      navigateWithFade(prevBtn.href);
    }
  });

  // 5. Transición suave al cambiar de página
  function navigateWithFade(url) {
    document.body.classList.add("page-leaving");
    setTimeout(() => {
      window.location.href = url;
    }, 200);
  }

  document.querySelectorAll("a[href$='.html']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");
      if (targetUrl && !targetUrl.startsWith("http")) {
        e.preventDefault();
        navigateWithFade(targetUrl);
      }
    });
  });

  // 6. Interacción de etiquetas con la galería en pagina3.html
  const tagPills = document.querySelectorAll(".tag-pill");
  tagPills.forEach((pill) => {
    const targetId = pill.dataset.target;
    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    pill.addEventListener("mouseenter", () => {
      targetCard.classList.add("highlight-photo");
    });
    pill.addEventListener("mouseleave", () => {
      targetCard.classList.remove("highlight-photo");
    });
    pill.addEventListener("click", () => {
      targetCard.click(); // Abre la foto en el lightbox al hacer clic en la etiqueta
    });
  });

  // 7. Visor Lightbox para ampliar cualquier foto al hacer clic
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".photo-zoomable").forEach((box) => {
      box.addEventListener("click", () => {
        const img = box.querySelector("img");
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) {
          lightboxCaption.textContent = box.dataset.caption || img.alt;
        }
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    };

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }
});
