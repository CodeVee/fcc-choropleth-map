const projectName = 'choropleth';

const body = d3.select('body');
const svg = d3.select('svg');
const tooltip = body
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const path = d3.geoPath();