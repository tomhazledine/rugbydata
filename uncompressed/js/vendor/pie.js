/**
 * ------------------------------------------------------------------------------------------
 * DRAW PIE
 * Draws a bar chart using given options.
 *
 * options.barData = [array of integers] The data to be drawn).
 * options.wrapper = [d3.selection] Container element for the graph.
 * options.margin = [array of 4 integers] The px-value of margins (top, right, bottom, left).
 * ------------------------------------------------------------------------------------------
 */
var DrawPie = function drawPieChart(options){

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
     * Fallbacks
     */
    var
        pieData = [1,2,3],
        wrapper = d3.select('body'),
        margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        colours = [
            '#ffb832',
            '#c61c6f',
            '#268bd2',
            '#85992c'
        ],
        sort = true;

    /**
     * Set Options (if declared)
     */
    if ( options.margins !== undefined ) {
        var margin = options.margins;
    }
    if ( options.data !== undefined ) {
        var pieData = options.data;
    }
    if ( options.wrapper !== undefined ) {
        var wrapper = options.wrapper;
    }
    if ( options.colours !== undefined ) {
        var colours = options.colours;
    }
    if ( options.sort === false ) {
        var sort = false;
    }
	
	/**
     * Sizes
     */
    var wrapperWidth = parseInt(wrapper.style('width')),
        wrapperHeight = parseInt(wrapper.style('height')),
        height = wrapperHeight - margin.top - margin.bottom,
        width = wrapperWidth - margin.left - margin.right;
        radius = Math.min(height,width) / 2;

	var pie = d3.layout.pie()
		.value(function(d){
			return d.value;
		})

	var arc = d3.svg.arc()
		.outerRadius(radius)
		.innerRadius(radius * .5)

	var myPieChart = wrapper.append('svg')
		.attr('width',width)
		.attr('height',height)
		.append('g')
			.attr('transform','translate(' + (wrapperWidth / 2) + ', ' + (height - radius) + ')')
			.selectAll('path').data(pie(pieData))
			.enter().append('g')
				.classed('slice', true)

	var slices = d3.selectAll('g.slice')
		.append('path')
		.attr('fill',function(d,i){
			return colours(i);
		})
		.attr('d', arc)

	var text = d3.selectAll('g.slice')
		.append('text')
		.text(function(d,i){
			// console.log(d);
			return d.data.label;
		})
		.attr('text-anchor','middle')
		.attr('fill', 'white')
		.attr('transform',function(d){
			d.innerRadius = 0;
			d.outerRadius = radius;
			return 'translate(' + arc.centroid(d) + ')';
		})
}