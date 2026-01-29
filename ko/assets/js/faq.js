(function () {
    "use strict";

    $(document).ready(function () {
        var fragment = window.location.hash;

        if (!!fragment) {
            var collapsed = $(fragment + '-collapse');

            if (!!collapsed && collapsed.length > 0) {
                setTimeout(function() {
                    collapsed.collapse('show');
                }, 200);
            }
        }
    });
})();