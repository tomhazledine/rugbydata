function activateLines(options){
    settings = [];

    /**
     * PARSE OPTIONS
     */

    for (i = 0; i < options.length; i++) {
        settings[i] = {
            active: _checkFalse(options[i][0]),
            hover: _checkFalse(options[i][1]),
            target: options[i][2]
        }
    }

    console.log(settings);



    /**
     * HELPERS
     */
    function _checkFalse(target) {
        if (target) {
            return true;
        } else {
            return false;
        }
    }
}

activateLines([
    [1,1,'england'],
    [0,0,'italy']
]);