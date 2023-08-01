// const dropdownNameButton = document.querySelector('.dropdownNameButton');
// const dropdownName = document.querySelector('.dropdownName');
// const dropdownXpButton = document.querySelector('.dropdownXpButton');
// const dropdownXp = document.querySelector('.dropdownXp');
// const dropdownAuditButton = document.querySelector('.dropdownAuditButton');
// const dropdownAudit = document.querySelector('.dropdownAudit');



// dropdownName.classList.add('hidden');
// dropdownXp.classList.add('hidden');
// dropdownAudit.classList.add('hidden');

// dropdownNameButton.addEventListener('click', function() {
//   dropdownName.classList.toggle('hidden');
// });

// dropdownXpButton.addEventListener('click', function() {
//   dropdownXp.classList.toggle('hidden');
// });

// dropdownAuditButton.addEventListener('click', function() {
//   dropdownAudit.classList.toggle('hidden');
// });



// var sequence = (funcs, scope) => {
//   if (funcs.length == 0) return
//   let f = funcs.shift()
//   f.call(scope, () => {
//     sequence(funcs, scope)
//     setTimeout(() => {
//       console.log('Waiting 300 ms...')
//     }
//     , 300)

//   })
// }

// sequence([
//   this.fetchName(token, GRAPHQL_ENDPOINT),
//   this.fetchXP(token, GRAPHQL_ENDPOINT),
//   this.fetchAuditGiven(token, GRAPHQL_ENDPOINT),
//   this.fetchAuditReceived(token, GRAPHQL_ENDPOINT)
// ], this)


/* .dropdownNameContainer,
.dropdownXpContainer,
.dropdownAuditContainer {
  width: 100%;
  position: relative;
  height: 50px;
} */

/* .dropdownNameButton,
.dropdownXpButton,
.dropdownAuditButton {
  background-color: #55555542;
  color: rgb(0, 0, 0);
  text-shadow: 0px 0px 0, 5px rgb(0, 0, 0), 0px 0px 0, 5px rgb(0, 0, 0),
    0px 0px 0, 5px rgb(0, 0, 0), 0px 0px 0, 5px rgb(0, 0, 0);
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
} */

/* .dropdownName,
.dropdownXp,
.dropdownAudit {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f1f1f1;
  min-width: 100%;
  overflow: auto;
  z-index: 1;
}

.hidden {
  display: none;
} */



/*
canvas interactive piechart

function pieChartMaker () {
    if (isNaN(auditsDone) || isNaN(auditsReceived) || auditsReceived === 0) {
      console.log('Error: invalid audit data')
      return
    }




    const done = auditsDone;
    const received = auditsReceived;
    const color1 = 'aquamarine';
    const color2 = 'coral';


    // Create the data array for the chart
    const data = {
      datasets: [{
        data: [done, received],
        backgroundColor: [color1, color2]
      }],
      labels: ['Done', 'Received']
    };

    // Create the chart
    const ctx = document.getElementById('pieChart').getContext('2d');
    const options = {
      legend: {
        position: 'right',
        labels: {
          generateLabels: function(chart) {
            const data = chart.data;
            const total = data.datasets[0].data.reduce(function(value, current) {
              return value + current;
            }, 0);
            const percent = Math.round((auditsDone / total) * 100);
            const label1 = `Done: ${auditsDone} (${percent}%)`;
            const label2 = `Received: ${auditsReceived}`;
            return [{
              text: label1,
              fillStyle: data.datasets[0].backgroundColor[0],
              hidden: isNaN(auditsDone) || isNaN(auditsReceived) || auditsReceived === 0,
              index: 0
            }, {
              text: label2,
              fillStyle: data.datasets[0].backgroundColor[1],
              hidden: isNaN(auditsDone) || isNaN(auditsReceived) || auditsReceived === 0,
              index: 1
            }];
          }
        }
      }
    };
    const chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });

    // Add the ratio text
    const ratioText = `Audit Ratio: ${auditsRatio}`;
    ratioElement.textContent = ratioText;
  }

  .statisticsContainer {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px; /* or any other value you want */
//}

// #chartWrapper {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// }

// #pieChart {
//   width: 50%;
//   max-width: 300px;
//   margin-top: 20px !important;
// }

// #auditRatio {
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 20px;
// }

/* <div class="statisticsContainer">
<h3>Audits</h3>
<div id="chartWrapper">
  <canvas id="pieChart"></canvas>
  <span id="auditRatio"></span>
</div>

</div> */


// v3 d3.js version
// function donutChartMaker () {
//   let auditsRatioCalc = auditsDone / auditsReceived
//   const auditsRatio = auditsRatioCalc.toFixed(1)

//   var data = [
//     {
//       str_lab: 'Audits Done',
//       num: auditsDone
//     },
//     {
//       str_lab: 'Audits Received',
//       num: auditsReceived
//     }
//   ]
//   var width = 300,
//     height = 300,
//     radius = Math.min(width, height) / 2
//   var divNode = d3.select('body').node()
//   var outerRadius = radius - 10,
//     innerRadius = radius - 80
//   var color = d3.scale
//     .ordinal()
//     .range([
//       '#FF7043',
//       '#1FDA9A',
//       '#28ABE3',
//       '#DF514C',
//       '#DAE9F7'
//     ])

//   var arc = d3.svg
//     .arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius - 80)

//   var pie = d3.layout
//     .pie()
//     .sort(null)
//     .value(function (d) {
//       return d.num
//     })

//   d3.select('#chart')
//     .append('div')
//     .attr('id', 'mainPie')
//     .attr('class', 'pieBox')

//   var svg = d3
//     .select('#mainPie')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .append('g')
//     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

//   var defs = svg.append('defs')
//   var filter = defs
//     .append('filter')
//     .attr('id', 'drop-shadow')
//     .attr('height', '130%')

//   filter
//     .append('feGaussianBlur')
//     .attr('in', 'SourceAlpha')
//     .attr('stdDeviation', 3)
//     .attr('result', 'blur')

//   filter
//     .append('feOffset')
//     .attr('in', 'blur')
//     .attr('dx', 3)
//     .attr('dy', 3)
//     .attr('result', 'offsetBlur')
//   var feMerge = filter.append('feMerge')

//   feMerge.append('feMergeNode').attr('in', 'offsetBlur')
//   feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

//   var g = svg
//     .selectAll('.arc')
//     .data(pie(data))
//     .enter()
//     .append('g')
//     .attr('class', 'arc')

//   g.append('path')
//     .attr('d', arc)
//     .style('fill', function (d) {
//       return color(d.data.num)
//     })
//     .on('mousemove', function (d) {
//       d3.select(this)
//         .attr('stroke', '#fff')
//         .attr('stroke-width', '2px')
//         .style('filter', 'url(#drop-shadow)')
//       d3.select(this)
//         .transition()
//         .duration(500)
//         .ease('elastic')
//         .attr('transform', function (d) {
//           var dist = 1
//           d.midAngle = (d.endAngle - d.startAngle) / 2 + d.startAngle
//           var x = Math.sin(d.midAngle) * dist
//           var y = Math.cos(d.midAngle) * dist
//           return 'translate(' + x + ',' + y + ')'
//         })
//       var mousePos = d3.mouse(divNode)
//       d3.select('#mainTooltip')
//         .style('left', mousePos[0] - 40 + 'px')
//         .style('top', mousePos[1] - 70 + 'px')
//         .select('#value')
//         .attr('text-anchor', 'middle')
//         .html(d.data.str_lab + '<br />' + d.data.num)

//       d3.select('#mainTooltip').classed('hidden', false)
//     })
//     .on('mouseout', function (d) {
//       d3.select(this).attr('stroke', 'none').style('filter', 'none')
//       d3.select(this)
//         .transition()
//         .duration(500)
//         .ease('bounce')
//         .attr('transform', 'translate(0,0)')

//       d3.select('#mainTooltip').classed('hidden', true)
//     })
//   var centerSvg = svg.append('circle').attr('fill', '#42A5F5').attr('r', '62')

//   svg
//     .append('text')
//     .style('fill', '#F2F2F2')
//     .style('font-size', '64px')
//     .style('font-weight', 'bold')
//     .attr('transform', 'translate(0,' + 20 + ')')
//     .attr('text-anchor', 'middle')
//     .html(auditsRatio)
// }
