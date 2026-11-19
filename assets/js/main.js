/* Serranía — La mejor ropa para empresas */

// ⚙️ CONFIGURACIÓN: cambia estos datos antes de publicar.
const CONFIG = {
  // Número de WhatsApp en formato internacional, sin "+" ni espacios. Ej: 573001234567
  whatsapp: "573160537301",
  // Correo comercial
  email: "gerenciacomercial@serrania.co",
  emailSubject: "Quiero hablar con un asesor de Serranía",
  // Dirección del catálogo de prendas
  catalogo: "catalogo/",
};

(function () {
  // Enlaces de WhatsApp con mensaje prellenado
  const waReady = /^\d{10,15}$/.test(CONFIG.whatsapp);
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    if (!waReady) return; // sin número configurado, el botón lleva a la sección de contacto
    const text = encodeURIComponent(el.dataset.whatsapp || "");
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${text}`;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Enlace de correo
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(CONFIG.emailSubject)}`;
  });

  // Año del pie de página
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Pestañas de soluciones (accesibles con teclado)
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
    const id = tab.getAttribute("aria-controls");
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });

  // Botones "Conoce también": cambian de solución y vuelven a las pestañas
  const tabsBar = document.querySelector('.tabs');
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = document.getElementById('tab-' + btn.dataset.goto);
      if (!tab) return;
      select(tab, false);
      tabsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      tab.focus({ preventScroll: true });
    });
  });

  // Abrir una solución directamente desde la URL: /#boutique, /#eventos, /#regalos
  const fromHash = tabs.find((t) => `#${t.getAttribute("aria-controls")}` === location.hash);
  if (fromHash) {
    select(fromHash, false);
    document.getElementById("soluciones").scrollIntoView();
  }
})();


/* ==========================================================================
   BOTONES DE CATÁLOGO
   Cualquier enlace con data-catalogo apunta a CONFIG.catalogo.
   Así la dirección se cambia en un solo sitio.
   ========================================================================== */
(function () {
  // Abierto desde el disco (doble clic), un enlace a una carpeta muestra la
  // lista de archivos en vez de la página. Online no pasa, pero así se puede
  // revisar el sitio en el computador antes de subirlo.
  var destino = CONFIG.catalogo;
  if (location.protocol === "file:" && /\/$/.test(destino)) destino += "index.html";

  document.querySelectorAll("[data-catalogo]").forEach(function (el) {
    el.href = destino;
  });
})();


/* ==========================================================================
   MARCAS QUE HAN CONFIADO EN SERRANÍA
   Rejilla compacta. Para agregar una marca: una línea más abajo con el
   nombre y el archivo del logo, que va en assets/img/marcas/.
   ========================================================================== */
const MARCAS = [
  ["Porsche", "porsche.png"], ["Toyota", "toyota.png"], ["Kia", "kia.png"],
  ["Honda", "honda.png"], ["Mazda", "mazda.webp"], ["Volkswagen", "volkswagen.png"],
  ["Chevrolet", "chevrolet.png"], ["Seat", "seat.png"], ["Cupra", "cupra.png"],
  ["Autogermana", "autogermana.webp"], ["Google", "google.png"], ["Samsung", "samsung.png"],
  ["Sony", "sony.png"], ["Xiaomi", "xiaomi.webp"], ["Honor", "honor.webp"],
  ["Avianca", "avianca.webp"], ["Primax", "primax.png"], ["Mastercard", "mastercard.png"],
  ["BBVA", "bbva.png"], ["Sura", "sura.png"], ["Mapfre", "mapfre.webp"],
  ["Equidad", "equidad.webp"], ["Banco Falabella", "banco-falabella.png"],
  ["Banco AV Villas", "banco-av-villas.png"], ["Skandia", "skandia.png"],
  ["Addi", "addi.png"], ["Bold", "bold.webp"],
  ["Universidad de los Andes", "universidad-de-los-andes.png"], ["Cemex", "cemex.png"],
  ["Corona", "corona.png"], ["Pavco Wavin", "pavco-wavin.png"], ["Amarilo", "amarilo.png"],
  ["Cusezar", "cusezar.png"], ["Globant", "globant.png"], ["Colcafé", "colcafe.png"],
  ["Heineken", "heineken.png"], ["Grupo Nutresa", "grupo-nutresa.png"],
  ["Postobón", "postobon.png"], ["Purina", "purina.png"], ["Henkel", "henkel.png"],
  ["Quala", "quala.png"], ["Rappi", "rappi.png"], ["Amor Perfecto", "amor-perfecto.png"],
  ["Alianza Team", "alianza-team.png"], ["Bayer", "bayer.webp"], ["Enel", "enel.png"],
  ["Canal RCN", "canal-rcn.png"], ["Abbott", "abbott.png"], ["Fenalco", "fenalco.png"],
  ["Open English", "open-english.webp"],
];

(function () {
  const caja = document.getElementById("marcas-rejilla");
  if (!caja) return;

  const enCelular = window.matchMedia("(max-width: 760px)");

  function celda(m) {
    const nombre = m[0].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    return '<div class="marca-celda">' +
             '<img src="assets/img/marcas/' + m[1] + '" alt="' + nombre + '" decoding="async" ' +
             'onerror="this.parentNode.textContent=this.alt">' +
           '</div>';
  }

  // Cada pista lleva su mitad de logos dos veces seguidas: así, al correrla
  // justo la mitad, el final empalma con el principio y el bucle no salta.
  function pista(lista, inversa) {
    const piezas = lista.map(celda).join("");
    return '<div class="cinta' + (inversa ? ' cinta-inversa' : '') + '"' +
             (inversa ? ' aria-hidden="true"' : '') + '>' +
             '<div class="cinta-pista">' + piezas + piezas + '</div>' +
           '</div>';
  }

  function pintar() {
    if (enCelular.matches) {
      // Celular: dos cintas en movimiento, ocupan mucho menos pantalla
      const mitad = Math.ceil(MARCAS.length / 2);
      caja.classList.add("marcas-cinta");
      caja.innerHTML = pista(MARCAS.slice(0, mitad), false) +
                       pista(MARCAS.slice(mitad), true);
    } else {
      // Computador: rejilla quieta, con cada marca una sola vez
      caja.classList.remove("marcas-cinta");
      caja.innerHTML = MARCAS.map(celda).join("");
    }
  }

  pintar();
  if (enCelular.addEventListener) enCelular.addEventListener("change", pintar);
  else enCelular.addListener(pintar);   // navegadores viejos
})();


/* ==========================================================================
   MENÚ DE CELULAR
   ========================================================================== */
(function () {
  const boton = document.getElementById("btn-menu");
  const menu  = document.getElementById("menu-movil");
  if (!boton || !menu) return;

  function abrir(si) {
    menu.hidden = !si;
    boton.setAttribute("aria-expanded", si ? "true" : "false");
    boton.setAttribute("aria-label", si ? "Cerrar menú" : "Abrir menú");
  }

  boton.addEventListener("click", function () {
    abrir(menu.hidden);
  });

  // Al tocar un enlace se cierra, para que se vea la sección a la que lleva
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { abrir(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) { abrir(false); boton.focus(); }
  });

  // Si la pantalla crece, la navegación vuelve a la cabecera
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860 && !menu.hidden) abrir(false);
  });
})();


/* ==========================================================================
   VIDEO DE PROYECTOS
   Arranca sin sonido cuando entra en pantalla y se detiene al salir.
   El sonido solo si el visitante lo pide.
   ========================================================================== */
(function () {
  const video = document.getElementById("video-proyectos");
  const mando = document.getElementById("video-mando");
  if (!video || !mando) return;

  video.muted = true;

  mando.innerHTML =
    '<button type="button" data-video="pausa" aria-label="Pausar el video">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3.4" height="14" rx="1"/><rect x="13.6" y="5" width="3.4" height="14" rx="1"/></svg>' +
    '</button>' +
    '<button type="button" data-video="sonido" aria-label="Activar el sonido">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>' +
    '</button>';

  const bPausa  = mando.querySelector('[data-video="pausa"]');
  const bSonido = mando.querySelector('[data-video="sonido"]');
  let pausadoAMano = false;

  bPausa.addEventListener("click", function () {
    if (video.paused) { pausadoAMano = false; video.play(); }
    else { pausadoAMano = true; video.pause(); }
    bPausa.setAttribute("aria-label", video.paused ? "Reproducir el video" : "Pausar el video");
    bPausa.classList.toggle("activo", video.paused);
  });

  bSonido.addEventListener("click", function () {
    video.muted = !video.muted;
    bSonido.setAttribute("aria-label", video.muted ? "Activar el sonido" : "Silenciar el video");
    bSonido.classList.toggle("activo", !video.muted);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting && !pausadoAMano) { video.play().catch(function () {}); }
        else if (!e.isIntersecting) { video.pause(); }
      });
    }, { threshold: 0.35 }).observe(video);
  }
})();


/* ==========================================================================
   DÓNDE ESTOY
   Marca en el menú la sección que el visitante tiene en pantalla. En una
   página de una sola tirada es lo que evita perder el hilo.
   ========================================================================== */
(function () {
  if (!("IntersectionObserver" in window)) return;

  const enlaces = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"], .menu-movil a[href^="#"]')
  );
  if (!enlaces.length) return;

  // Una sección puede tener su enlace en la barra y en el menú de celular
  const mapa = new Map();
  enlaces.forEach(function (a) {
    const destino = document.querySelector(a.getAttribute("href"));
    if (!destino) return;
    if (!mapa.has(destino)) mapa.set(destino, []);
    mapa.get(destino).push(a);
  });
  if (!mapa.size) return;

  // La franja del centro de la pantalla decide cuál sección manda
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      (mapa.get(e.target) || []).forEach(function (a) {
        a.classList.toggle("activo", e.isIntersecting);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  mapa.forEach(function (_, seccion) { observador.observe(seccion); });
})();


/* ==========================================================================
   CONTADOR DE LAS CIFRAS
   Las cifras de la banda suben desde cero cuando entran en pantalla.
   Mismo comportamiento que el catálogo, para que el sitio se sienta uno solo.
   ========================================================================== */
(function () {
  const cifras = Array.prototype.slice.call(document.querySelectorAll(".cifra strong"));
  if (!cifras.length || !("IntersectionObserver" in window)) return;

  // Si el visitante pidió menos movimiento, se muestran directo
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cifras.forEach(function (el) {
    const texto = el.textContent.trim();
    // Se queda solo con los dígitos: "+200 mil" -> 200, "365 días" -> 365
    const numero = parseFloat(texto.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", "."));
    if (!numero || numero < 2) return;   // los valores muy chicos no se animan

    el.dataset.final = texto;   // el texto completo, con su "+", su "mil" o su "%"
    el.dataset.valor = numero;
    el.textContent = texto.replace(/[\d.,]+/, "0");
  });

  function contar(el) {
    const meta = +el.dataset.valor;
    const modelo = el.dataset.final;
    const inicio = performance.now();
    const duracion = 1400;

    function paso(ahora) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      // Arranca rápido y frena al final: se siente más natural que subir parejo
      const suave = 1 - Math.pow(1 - t, 3);
      const actual = Math.round(meta * suave);
      el.textContent = modelo.replace(/[\d.,]+/, actual.toLocaleString("es-CO"));
      if (t < 1) requestAnimationFrame(paso);
      else el.textContent = modelo;   // al final, el texto exacto
    }
    requestAnimationFrame(paso);
  }

  const vigia = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting || e.target.dataset.contado) return;
      e.target.dataset.contado = "1";
      contar(e.target);
      vigia.unobserve(e.target);
    });
  }, { threshold: 0.4 });

  cifras.forEach(function (el) { if (el.dataset.final) vigia.observe(el); });
})();
