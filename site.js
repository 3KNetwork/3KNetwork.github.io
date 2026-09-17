(() => {
  'use strict';

  const translations = {
    tr: {
      contact: 'İletişim',
      eyebrow: 'Mobil oyun · Kenan Kaan Kurt',
      tagline: 'Şehirde kendi hikâyeni yaz.',
      intro: 'Görevleri tamamla, karakterini geliştir ve çetenle yeraltı dünyasında yüksel. Underground Mafia, Kenan Kaan Kurt tarafından geliştirilen bir mobil oyundur.',
      supportTitle: 'Oyuncu desteği',
      supportText: 'Soruların ve oyunla ilgili geri bildirimlerin için bize ulaş.',
      languageLabel: 'Dil',
      description: 'Kenan Kaan Kurt tarafından geliştirilen Underground Mafia mobil oyununun resmi geliştirici ve destek sayfası.',
    },
    en: {
      contact: 'Contact',
      eyebrow: 'Mobile game · Kenan Kaan Kurt',
      tagline: 'Write your own story in the city.',
      intro: 'Complete missions, develop your character, and rise through the underworld with your gang. Underground Mafia is a mobile game developed by Kenan Kaan Kurt.',
      supportTitle: 'Player support',
      supportText: 'Contact us with your questions and feedback about the game.',
      languageLabel: 'Language',
      description: 'The official developer and support page for Underground Mafia, a mobile game developed by Kenan Kaan Kurt.',
    },
    ar: {
      contact: 'تواصل معنا',
      eyebrow: 'لعبة للهواتف المحمولة · Kenan Kaan Kurt',
      tagline: 'اكتب قصتك في المدينة.',
      intro: 'أنجز المهام، وطوّر شخصيتك، وارتقِ مع عصابتك في عالم الجريمة. Underground Mafia هي لعبة للهواتف المحمولة طوّرها Kenan Kaan Kurt.',
      supportTitle: 'دعم اللاعبين',
      supportText: 'تواصل معنا لطرح أسئلتك ومشاركة ملاحظاتك حول اللعبة.',
      languageLabel: 'اللغة',
      description: 'الصفحة الرسمية للمطوّر ودعم اللاعبين للعبة Underground Mafia للهواتف المحمولة، من تطوير Kenan Kaan Kurt.',
    },
    de: {
      contact: 'Kontakt',
      eyebrow: 'Mobile-Spiel · Kenan Kaan Kurt',
      tagline: 'Schreibe deine eigene Geschichte in der Stadt.',
      intro: 'Erfülle Missionen, entwickle deinen Charakter weiter und steige mit deiner Gang in der Unterwelt auf. Underground Mafia ist ein von Kenan Kaan Kurt entwickeltes Mobile-Spiel.',
      supportTitle: 'Spieler-Support',
      supportText: 'Kontaktiere uns bei Fragen und Feedback zum Spiel.',
      languageLabel: 'Sprache',
      description: 'Die offizielle Entwickler- und Supportseite für Underground Mafia, ein von Kenan Kaan Kurt entwickeltes Mobile-Spiel.',
    },
    es: {
      contact: 'Contacto',
      eyebrow: 'Juego para móviles · Kenan Kaan Kurt',
      tagline: 'Escribe tu propia historia en la ciudad.',
      intro: 'Completa misiones, desarrolla tu personaje y asciende en el mundo del crimen junto a tu banda. Underground Mafia es un juego para móviles desarrollado por Kenan Kaan Kurt.',
      supportTitle: 'Asistencia al jugador',
      supportText: 'Contáctanos si tienes preguntas o comentarios sobre el juego.',
      languageLabel: 'Idioma',
      description: 'La página oficial del desarrollador y de asistencia de Underground Mafia, un juego para móviles desarrollado por Kenan Kaan Kurt.',
    },
    ru: {
      contact: 'Контакты',
      eyebrow: 'Мобильная игра · Kenan Kaan Kurt',
      tagline: 'Напиши свою историю в этом городе.',
      intro: 'Выполняй задания, развивай персонажа и прокладывай путь наверх в преступном мире вместе со своей бандой. Underground Mafia — мобильная игра, разработанная Kenan Kaan Kurt.',
      supportTitle: 'Поддержка игроков',
      supportText: 'Свяжись с нами, если у тебя есть вопросы или отзывы об игре.',
      languageLabel: 'Язык',
      description: 'Официальная страница разработчика и поддержки мобильной игры Underground Mafia, разработанной Kenan Kaan Kurt.',
    },
  };

  const storageKey = 'underground-mafia-website-language';
  const selector = document.querySelector('#language');
  const isSupported = (locale) => Object.prototype.hasOwnProperty.call(translations, locale);

  function initialLanguage() {
    const requested = new URL(window.location.href).searchParams.get('lang');
    if (isSupported(requested)) return requested;
    try {
      const saved = localStorage.getItem(storageKey);
      if (isSupported(saved)) return saved;
    } catch { /* Language selection also works when browser storage is disabled. */ }
    for (const locale of navigator.languages || [navigator.language]) {
      const language = (locale || '').toLowerCase().split('-')[0];
      if (isSupported(language)) return language;
    }
    return 'en';
  }

  function setLanguage(locale, remember = false) {
    if (!isSupported(locale)) return;
    const copy = translations[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      let text = copy[element.dataset.i18n];
      if (locale === 'ar') {
        text = text.replace(/Underground Mafia|Kenan Kaan Kurt/g, (name) => '\u2068' + name + '\u2069');
      }
      element.textContent = text;
    });
    document.querySelector('meta[name="description"]').content = copy.description;
    selector.value = locale;
    if (remember) {
      try { localStorage.setItem(storageKey, locale); } catch { /* Optional preference only. */ }
      const url = new URL(window.location.href);
      url.searchParams.set('lang', locale);
      history.replaceState(null, '', url);
    }
  }

  setLanguage(initialLanguage());
  document.querySelector('.language-picker').hidden = false;
  selector.addEventListener('change', () => setLanguage(selector.value, true));
})();
