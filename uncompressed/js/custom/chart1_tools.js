function activateLines(options){
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

var button1 = $('.triggerchart1.one');
var button2 = $('.triggerchart1.two');
var button3 = $('.triggerchart1.three');
var button4 = $('.triggerchart1.four');

button1.on('click',function(){
    activateLines( [
            [1,0,'england']
    ]);
});

button2.on('click',function(){
    activateLines( [
            [0,1,'england'],
            [1,0,'italy']
    ]);
});

button3.on('click',function(){
    activateLines( [
            [0,1,'england'],
            [0,1,'italy'],
            [1,0,'wales']
    ]);
});

button4.on('click',function(){
    activateLines( [
            [0,1,'england'],
            [0,1,'italy'],
            [0,1,'wales'],
            [0,1,'scotland'],
            [0,1,'ireland'],
            [0,1,'france'],
    ]);
});