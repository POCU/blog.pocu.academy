(function() {
    "use strict";

    const LANGUAGE_COOKIE_NAME = "POCU.blog.locale";
    const LOCALE_ENGLISH = "en";
    const LOCALE_KOREAN = "ko";

    ready(() => {
        let now = new Date();
        let expiryDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        let languageSelect = document.getElementById("language-select");
        let linkEnglish = document.getElementById("link-en");
        let linkKorean = document.getElementById("link-ko");

        linkEnglish.addEventListener("click", () => {
            onLanguageLinkClicked(LOCALE_ENGLISH, expiryDate);
        });

        linkKorean.addEventListener("click", () => {
            onLanguageLinkClicked(LOCALE_KOREAN, expiryDate);
        });

        let localeOrNull = getCookieValueOrNull(LANGUAGE_COOKIE_NAME);
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

    function onLanguageLinkClicked(locale, expiryDate) {
        document.cookie = `${LANGUAGE_COOKIE_NAME}=${locale}; SameSite=Lax; expires=${expiryDate.toGMTString()}; path=/;`;
        window.location.href = `/${locale}`;
    }

    function ready(func) {
        if (document.readyState !== 'loading') {
            func();
        } else {
            document.addEventListener('DOMContentLoaded', func);
        }
    }
})();