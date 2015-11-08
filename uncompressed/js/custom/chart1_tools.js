function activateLines(options,wrapper){
    settings = [];

    for (i = 0; i < options.length; i++) {

        /**
         * PARSE OPTIONS
         */
        settings[i] = {
            active: _checkFalse(options[i][0]),
            hover: _checkFalse(options[i][1]),
            target: options[i][2]
        }

        /**
         * FIND ELEMENTS
         */
        var entryClass = '.entry' + settings[i].target;
        var entry = d3.select(entryClass);
        // var entries = $('.entry');

        /**
         * APPLY STATES
         */
        if (settings[i].hover) {
            entry.classed('hover',true);
        } else {
            entry.classed('hover',false);
        }

        if (settings[i].active) {
            entry.classed('active',true);
        } else {
            entry.classed('active',false);
        }

        console.log(entry);

    }


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

var button = $('.triggerchart1');

button.on('click',function(){
    activateLines(
        [
            [1,1,'england'],
            [1,0,'italy']
        ],
        d3.select('#chart1')
    );
});