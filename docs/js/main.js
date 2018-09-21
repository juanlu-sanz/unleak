var app = function () {
    'use strict';

    //Variables

    //Main object and return
    var handler = {};

    //#region functions
    handler.init = function (selector) {
        unleak.init();
        classEvents();
    };

    function classEvents() {

    }


    //#endregion

    return handler;
}();

app.init();