// svg piechart generator



// This function makes the donut chart
function donutChartMaker (auditsDone, auditsReceived) {
  let auditsRatioCalc = auditsDone / auditsReceived
  const auditsRatio = auditsRatioCalc.toFixed(1)

  var data = [
    {
      str_lab: 'Audits Done XP',
      num: auditsDone
    },
    {
      str_lab: 'Audits Received XP',
      num: auditsReceived
    }
  ]

  var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2
  var divNode = d3.select('body').node()
  var outerRadius = radius - 10,
    innerRadius = radius - 80
    // var color = d3.scale
  var color = d3
    .scaleOrdinal()
    .range(['#FF7043', '#1FDA9A', '#28ABE3', '#DF514C', '#DAE9F7'])

    // var arc = d3.svg
  var arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80)

  // var pie = d3.layout
  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.num
    })

  d3.select('#chart') // This is the div where the chart will be placed
    .append('div')
    .attr('id', 'mainPie')
    .attr('class', 'pieBox')

  var svg = d3 // This is the svg element
    .select('#mainPie')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  var defs = svg.append('defs') // This is the shadow filter
  var filter = defs
    .append('filter')
    .attr('id', 'drop-shadow')
    .attr('height', '130%')

  filter
    .append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 3)
    .attr('result', 'blur')

  filter
    .append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 3)
    .attr('dy', 3)
    .attr('result', 'offsetBlur')

  var feMerge = filter.append('feMerge') // This is the shadow filter cont.

  feMerge.append('feMergeNode').attr('in', 'offsetBlur') // Here we define the shadow filter
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

  var g = svg // This is the pie chart
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')

  g.append('path')// Here we define the pie chart itself
    .attr('d', arc)
    .style('fill', function (d) {
      return color(d.data.num)
    })
    .on('mouseover', function (d) {
      d3.select(this)
        .attr('stroke', '#fff')
        .attr('stroke-width', '2px')
        .style('filter', 'url(#drop-shadow)')

      var mousePos = d3.mouse(divNode)
      d3.select('#mainTooltip')
        .style('left', mousePos[0] - 40 + 'px')
        .style('top', mousePos[1] - 70 + 'px')
        .select('#value')
        .attr('text-anchor', 'middle')
        .html(d.data.str_lab + '<br />' + d.data.num)

      d3.select('#mainTooltip').classed('hidden', false)
    })
    .on('mouseout', function (d) {
      d3.select(this).attr('stroke', 'none').style('filter', 'none')

      d3.select('#mainTooltip').classed('hidden', true)
    })

  var centerSvg = svg.append('circle').attr('fill', '#42A5F5').attr('r', '62')

  svg // This is the text in the middle of the pie chart
    .append('text')
    .style('fill', '#F2F2F2')
    .style('font-size', '64px')
    .style('font-weight', 'bold')
    .attr('transform', 'translate(0,' + 20 + ')')
    .attr('text-anchor', 'middle')
    .html(auditsRatio)
}

// This function makes the bar chart
function barChartMaker (fetchedData) {
  // fetchedData is a Map with the following structure:
  // {
  //   "exerciseName": {
  //     attempts: [],
  //     successfulAttempts: [],
  //     failedAttempts: []
  //   }
  // }
  //

  // Create the chart data
  const chartData = []
  const chartLabels = []

  // Loop through the fetched data and add the data to the chartData array
  fetchedData.forEach((exerciseData, exerciseName) => {
    chartData.push(exerciseData.attempts.length)
    chartLabels.push(exerciseName)
  })

  // Create the chart with svg
  const svg = d3.select('#barChart')
  const svgWidth = 9000 //+svg.attr('width');
  const svgHeight = 400 //+svg.attr('height');

  const margin = { top: 20, right: 20, bottom: 30, left: 40 }
  const width = svgWidth - margin.left - margin.right
  const height = svgHeight - margin.top - margin.bottom

  const x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1)
  const y = d3.scaleLinear().rangeRound([height, 0])

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`) // Add the margins

  x.domain(chartLabels)
  y.domain([0, d3.max(chartData)])
  //console.log('chartData', chartData);

  g.append('g') // Add the x axis
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))

  g.append('g') // Add the y axis
    .call(d3.axisLeft(y).ticks(10))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '-3em')
    .attr('text-anchor', 'end')
    .text('Attempts')

  const tooltip = d3
    .select('body')
    .append('div') // Add the tooltip
    .attr('class', 'tooltip')
    .style('opacity', 0)

  g.selectAll('.bar') // Add the bars
    .data(chartData)
    .enter()
    .append('rect') // Add a rect for each data point
    .attr('class', 'bar')
    .attr('x', (d, i) => x(chartLabels[i])) // Set the x position of the bar to the index of the data value
    .attr('y', d => y(d)) // Set the y position of the bar to the data value itself
    .attr('width', x.bandwidth()) // Set the width of the bar to the bandwidth
    .attr('height', d => height - y(d))
    .attr('fill', 'coral')
    .on('mouseover', function (d, i) {
      // Add the mouseover event handler to the bars to show the tooltip on hover
      const tooltipText = `Attempts: ${d}`
      d3.select(this).attr('opacity', 0.7) // Change the style of the bar when hovered
      showTooltip(tooltipText, d3.event.pageX, d3.event.pageY)
    })
    .on('mouseout', function () {
      // Add the mouseout event handler to the bars to hide the tooltip
      d3.select(this).attr('opacity', 1) // Reset the style of the bar when not hovered
      hideTooltip()
    })

  // Functions to show/hide the tooltip
  function showTooltip (text, x, y) {
    tooltip
      .html(text)
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .style('opacity', 1)
  }

  function hideTooltip () {
    tooltip.style('opacity', 0)
  }
}
