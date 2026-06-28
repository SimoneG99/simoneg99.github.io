// translations.js – PDFlow Multilingual (finale)

const translations = {
  it: {
    // ... tutte le chiavi esistenti ...
    // Nuove chiavi SEO
    metaHomeTitle: "PDFlow – Tool PDF moderni e veloci",
    metaHomeDesc: "PDFlow è il tuo hub di strumenti PDF gratuiti: converti PDF in PNG, SVG, unisci, dividi e comprimi PDF. Moderno, veloce, senza registrazione.",
    metaPngTitle: "PDF to PNG – Converti PDF in Immagine | PDFlow",
    metaPngDesc: "Converti le tue pagine PDF in PNG di alta qualità direttamente nel browser, gratis e senza upload.",
    // ... altre chiavi per ogni tool ...
    langSwitchLabel: "Cambia lingua",
    welcomeTitle: "Benvenuto su PDFlow!",
    welcomeText: "Scegli la tua lingua preferita per iniziare.",
    closeBtn: "Chiudi"
  },
  en: {
    // ... tutte le chiavi esistenti ...
    metaHomeTitle: "PDFlow – Modern PDF Tools",
    metaHomeDesc: "PDFlow is your free online PDF tools hub: convert PDF to PNG, SVG, merge, split, compress. Fast, modern, no registration.",
    // ...
  },
  // ... altre lingue ...
};

// Funzione helper per ottenere una traduzione
function t(key, lang = null) {
  if (!lang) lang = localStorage.getItem('pdflow_lang') || getBrowserLang() || 'it';
  const dict = translations[lang] || translations.it;
  return dict[key] || translations.it[key] || key;
}

// Aggiorna i meta tag dinamicamente
function updateMetaTags(lang) {
  const pageType = document.documentElement.getAttribute('data-page') || 'home';
  const titleKey = 'meta' + pageType.charAt(0).toUpperCase() + pageType.slice(1) + 'Title';
  const descKey = 'meta' + pageType.charAt(0).toUpperCase() + pageType.slice(1) + 'Desc';
  
  document.title = t(titleKey, lang);
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t(descKey, lang));
  
  // Aggiorna hreflang
  document.querySelectorAll('link[hreflang]').forEach(link => {
    link.setAttribute('href', window.location.pathname + '?lang=' + link.getAttribute('hreflang'));
  });
}

// Modifica applyLanguage per chiamare anche updateMetaTags
function applyLanguage(lang = null) {
  if (!lang) lang = localStorage.getItem('pdflow_lang') || getBrowserLang() || 'it';
  localStorage.setItem('pdflow_lang', lang);
  
  const t = translations[lang] || translations.it;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerHTML = t[key];
  });
  
  updateLangSwitcher(lang);
  document.documentElement.lang = lang;
  updateMetaTags(lang);
  
  return lang;
}

// ... resto delle funzioni esistenti ...
