(function() {
    "use strict";

    const LOCALE_COOKIE_NAME = "POCU.blog.locale";
    const LOCALE_ENGLISH = "en";
    const LOCALE_KOREAN = "ko";

    ready(() => {
        let languageSelect = document.getElementById("language-select");

        let localeOrNull = getCookieValueOrNull(LOCALE_COOKIE_NAME);
        if (localeOrNull !== null) {
            let locale = localeOrNull;

            switch (locale) {
                case LOCALE_ENGLISH:
                case LOCALE_KOREAN:
                    window.location.href = `/${locale}`;

                    return;
                default:
                    break;
            }
        }

        languageSelect.style.display = "block";
    });

    function getCookieValueOrNull(name) {
        let nameToken = `${name}=`;
        let decodedCookie = decodeURIComponent(document.cookie);

        let tokens = decodedCookie.split(';');
        for (let i = 0; i < tokens.length; ++i) {
            let cookie = tokens[i].trim();

            if (cookie.indexOf(nameToken) === 0) {
                return cookie.substring(nameToken.length);
            }
        }

        return null;
    }

    function ready(func) {
        if (document.readyState !== 'loading') {
            func();
        } else {
            document.addEventListener('DOMContentLoaded', func);
        }
    }
})();