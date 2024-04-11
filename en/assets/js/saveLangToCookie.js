(function () {
    "use strict";

    $(document).ready(function () {
        var now = new Date();
        var date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        var expires = "expires=" + date.toGMTString();

        const element = document.getElementById('toggleKo');

        element.addEventListener("click", () => {
            document.cookie = "POCU.blog.locale=ko; SameSite=Lax; Secure; " + expires + "; path=/";
            window.location.href = '/ko';
        });
    });
})();