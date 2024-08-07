(function () {
    "use strict";

    const LOCALE_COOKIE_NAME = "POCU.blog.locale";
    const LOCALE_ENGLISH = "en";

    $(document).ready(function () {
        let localeOrNull = getCookieValueOrNull(LOCALE_COOKIE_NAME);

        if (localeOrNull != null) {
            let locale = localeOrNull;

            if (locale === LOCALE_ENGLISH) {
                return;
            }
        }

        let now = new Date();
        let expiryDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        document.cookie = `${LOCALE_COOKIE_NAME}=${LOCALE_ENGLISH}; SameSite=Lax; Secure; expires=${expiryDate.toGMTString()}; path=/;`;
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
})();