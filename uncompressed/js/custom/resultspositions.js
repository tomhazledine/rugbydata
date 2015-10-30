/**
 * -----------------------------------------
 * DRAW Line
 * Draw a scatter graph using given options.
 *
 * options [object]:
 * 
 * dataSrc [path string]
 * wrapper [d3 selection]
 * margin [top,right,bottom,left]
 * xColumn [string]
 * yColumn [string]
 * -----------------------------------------
 */

var DrawLine = function drawLine(options){

    /**
     * ---------------------------------
     * OPTIONS
     * 
     * Use fallback values if options
     * are not set in the function call,
     * otherwise use defined options.
     * ---------------------------------
     */
    
    /**
     * FALLBACKS
     */
    var settings = {
        dataSrc      : '/week_temp.csv',
        wrapper      : d3.select('body'),
        margin       : { top: 20, right: 20, bottom: 20, left: 20 },
        xColumn      : ['xColumn'],
        yColumn      : ['yColumn'],
        hasTimeX     : false,
        hasTimeY     : false
    };

    /**
     * SET OPTIONS (if declared)
     */
    if (options !== undefined) {
        if ( options.dataSrc      !== undefined ) { settings.dataSrc      = options.dataSrc;      }
        if ( options.wrapper      !== undefined ) { settings.wrapper      = options.wrapper;      }
        if ( options.margin       !== undefined ) { settings.margin       = options.margin;       }
        if ( options.xColumn      !== undefined ) { settings.xColumn      = options.xColumn;      }
        if ( options.yColumn      !== undefined ) { settings.yColumn      = options.yColumn;      }
        if ( options.hasTimeX     === true      ) { settings.hasTimeX     = true;                 }
        if ( options.hasTimeY     === true      ) { settings.hasTimeY     = true;                 }
    }

    /**
     * --------------------
     * PARSE THE DATA
     *
     * Make sure columns
     * used return integers
     * and not strings.
     * --------------------
     */
    function _type(data){
        for (i = 0; i < settings.xColumn.length; i++) {
            if (settings.hasTimeX) {
                data[settings.xColumn[i]] = (new Date(data[settings.xColumn[i]]).getTime()) / 1000;
            } else {
                data[settings.xColumn[i]] = +data[settings.xColumn[i]];
            }
        }
        for (i = 0; i < settings.yColumn.length; i++) {
            data[settings.yColumn[i]] = +data[settings.yColumn[i]];
        }
        return data;
    }

    /**
     * ----------------------------
     * SIZES
     *
     * Find the w/h for the chart's
     * wrapper, and calculate the
     * inner w/h using the margins.
     * ----------------------------
     */
    var wrapperWidth = parseInt(settings.wrapper.style('width')),
        wrapperHeight = parseInt(settings.wrapper.style('height')),
        height = wrapperHeight - settings.margin.top - settings.margin.bottom,
        width = wrapperWidth - settings.margin.left - settings.margin.right;

    /**
     * ------------------------
     * SCALES
     *
     * Set the x & y scales.
     * ------------------------
     */
    var xScale = d3.scale.linear().range([0, width]),
        yScale = d3.scale.linear().range([height, 0]);

    /**
     * --------------------
     * DRAW SVG
     *
     * Build the containing
     * SVG for our chart.
     * Build and position
     * the inner group.
     * --------------------
     */
    var scatterSvg = settings.wrapper.append('svg')
        .attr('width',wrapperWidth)
        .attr('height',wrapperHeight)
        .classed('chartSvg',true);

    var svgInner = scatterSvg.append('g')
        .attr('transform','translate(' + settings.margin.left + ', ' + settings.margin.top + ')')
        .attr('width',width)
        .attr('height',height)
        .classed('chartWrapper',true);

    /**
     * Background
     */
    var bgWrap = svgInner.append('g')
        .classed('background',true);
    
    var barNumber = 6;
    var barHeight = height / barNumber;
    
    for (i = 0; i < barNumber; i++) {
        bgWrap.append('rect')
            .attr('width',width)
            .attr('height',barHeight)
            .attr('fill','black')
            .attr('opacity',function(){
                if ((i - 1) % 2){
                    return .05;
                } else {
                    return 0;
                }
            })
            .attr('transform','translate(0,' + (barHeight * i) + ')');
    }

    var paths = [];
    var pathsWrapper = svgInner.append('g')
        .classed('pathsWrapper',true);

    for (i = 0; i < settings.yColumn.length; i++) {
        paths[i] = pathsWrapper.append('path');
    }
    // console.log(paths);
    // return;

    // var path = svgInner.append('path');
    // var path2 = svgInner.append('path');

    /**
     * ---------------
     * AXES
     *
     * Draw the x axis
     * & y axis.
     * ---------------
     */
    var axesGroup = scatterSvg.append('g')
        .attr('transform', 'translate(' + settings.margin.left + ',' + settings.margin.top + ')')
        .classed('axesWrapper',true);
    var xAxisG = axesGroup.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .classed('axis xAxis',true);
    var yAxisG = axesGroup.append('g')
        .classed('axis yAxis',true);
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickFormat(function(d){return d3.time.format('%Y')(new Date((d * 1000)));})
        // .tickValues([2000,2002,2004,2006,2006,2010,2012,2014])
        // .ticks(d3.time.year, 1)
        ;
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickValues([1,2,3,4,5,6])
        .tickFormat(d3.format())
        ;

    /**
     * Axes Labels
     */

    var xLabelOffset = 35;
    var xLabelText = 'Year';
    var yLabelOffset = -30;
    var yLabelText = 'Finishing Position';

    // var xAxisLabel = xAxisG.append('text')
    //     .classed('axisLabel',true)
    //     .attr('transform','translate(' + (width / 2) + ',' + xLabelOffset + ')')    
    //     .text(xLabelText);

    var yAxisLabel = yAxisG.append('text')
        .classed('axisLabel',true)
        .attr('transform','translate(' + yLabelOffset + ',' + (height / 2) + ') rotate(-90)')
        .text(yLabelText);

    /**
     * -------------------------
     * PUT IT ALL TOGETHER
     *
     * Using all our vars and
     * settings, build the chart
     * from the given dataset.
     * -------------------------
     */
    function _renderChart(data){

        // console.log(data);
        // return;
        
        /**
         * -----------------
         * DATA MIN MAX
         * 
         * Get the min & max
         * values for x & y
         * columns.
         * -----------------
         */
        
        // Get the Maximum values
        var xColumnMaximums = [];
        var yColumnMaximums = [];
        for (i = 0; i < settings.xColumn.length; i++) {
            xColumnMaximums.push(d3.max(data, function (d){ return d[settings.xColumn[i]]; }));
        }
        for (i = 0; i < settings.yColumn.length; i++) {
            yColumnMaximums.push(d3.max(data, function (d){ return d[settings.yColumn[i]]; }));
        }
        var xMax = Math.max.apply(null,xColumnMaximums),
            yMax = Math.max.apply(null,yColumnMaximums);
        // console.log('xMax = ' + xMax);
        // console.log('yMax = ' + yMax);

        // Get the Minimum values
        var xColumnMinimums = [];
        var yColumnMinimums = [];
        for (i = 0; i < settings.xColumn.length; i++) {
            xColumnMinimums.push(d3.min(data, function (d){ return d[settings.xColumn[i]]; }));
        }
        for (i = 0; i < settings.yColumn.length; i++) {
            yColumnMinimums.push(d3.min(data, function (d){ return d[settings.yColumn[i]]; }));
        }
        var xMin = Math.min.apply(null,xColumnMinimums),
            yMin = Math.min.apply(null,yColumnMinimums);
        // console.log('xMin = ' + xMin);
        // console.log('yMin = ' + yMin);

        /**
         * -------
         * DOMAINS
         * -------
         */
        var xScaleExtent = d3.extent(data, function (d){ return d[settings.xColumn]; });
        var yScaleExtent = d3.extent(data, function (d){ return d[settings.yColumn2]; });
        
        xScale.domain([xMin,xMax]);
        yScale.domain([7,1]);

        /**
         * AXES
         */
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    
        /**
         * SETUP LINE
         */
        
        var lines = [];

        for (i = 0; i < settings.yColumn.length; i++) {
            lines[i] = d3.svg.line()
                .x(function(d){ return xScale(d[settings.xColumn[0]]); })
                .y(function(d){ return yScale(d[settings.yColumn[i]]); })
                .interpolate('monotone');

            paths[i]
                .attr('d',lines[i](data))
                .attr('fill','none')
                .classed('chartline line' + settings.yColumn[i], true)
                .attr('stroke-width','1px');
        }


    }

    /**
     * ----------------------
     * INITIALISE THE CHART
     *
     * Get the data, parse it
     * using _type, then draw
     * the chart using
     * _renderChart.
     * ----------------------
     */
    d3.csv(settings.dataSrc, _type, _renderChart);
    


}

var testScatter = DrawLine({
    dataSrc  : '/data/resultspositions.csv',
    wrapper  : d3.select('#resultsLine'),
    margin   : { top: 20, right: 20, bottom: 50, left: 50 },
    xColumn  : ['year'],
    yColumn  : ['england','scotland','ireland','wales','france','italy'],
    hasTimeX : true
});
