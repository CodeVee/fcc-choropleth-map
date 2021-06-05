const projectName = 'choropleth';

const body = d3.select('body');
const svg = d3.select('svg');
const tooltip = body
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const path = d3.geoPath();

const x = d3.scaleLinear().domain([2.6, 75.1]).rangeRound([600, 860]);

const color = d3
  .scaleThreshold()
  .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
  .range(d3.schemeGreens[9]);

const g = svg
  .append('g')
  .attr('class', 'key')
  .attr('id', 'legend')
  .attr('transform', 'translate(0,40)');

g.selectAll('rect')
  .data(
    color.range().map(d => {
      d = color.invertExtent(d);
      if (d[0] === null) d[0] = x.domain()[0];
      
      if (d[1] === null) d[1] = x.domain()[1];
      
      return d;
    })
  )
  .enter()
  .append('rect')
  .attr('height', 8)
  .attr('x', d =>  x(d[0]))
  .attr('width', d => x(d[1]) - x(d[0]))
  .attr('fill', d => color(d[0]));

g.append('text')
  .attr('class', 'caption')
  .attr('x', x.range()[0])
  .attr('y', -6)
  .attr('fill', '#000')
  .attr('text-anchor', 'start')
  .attr('font-weight', 'bold');

g.call(
  d3
    .axisBottom(x)
    .tickSize(13)
    .tickFormat(x => Math.round(x) + '%')
    .tickValues(color.domain())
)
.select('.domain')
.remove();