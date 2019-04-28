
// Using jQuery, read our data and call visualize(...) only once the page is ready:
function callLAS() {
  d3.csv("LAS.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);
    // Call our visualize function:
    visualize(data);
  })
}
function callENG() {
  d3.csv("ENG.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);
    // Call our visualize function:
    visualize(data);
  })
}
function callBUS() {
  d3.csv("business.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);
    // Call our visualize function:
    visualize(data);
  })
}
function callACES() {
  d3.csv("ACES.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);
    // Call our visualize function:
    visualize(data);
  })
}

var visualize = function(data) {
  // Boilerplate:
  var margin = { top: 50, right: 50, bottom: 50, left: 150 },
    width = 960 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom;

  var r = d3.select("#chart").html("");

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


  // Visualization Code:
  // Scale:
  var gradeScale = d3.scaleLinear()
   .domain([1980, 2018])
   .range([0, width])
  var nameScale = d3.scalePoint()
     .domain(data.map(function(d){return d["Major"]}))
     .range([0,height])
  var scoreScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d){return d["Total"]})])
      .range([5,6.5])
  var colors = d3.scaleQuantize()
    .domain([0,1])
    .range(["#e8046a","#dd089d","#d507dd","#a307dd","#7907dd","#5c07dd","#3524a5"]);
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Male: </strong><span style='color:red'>" + d["Male"] +
     "<br>" + "<strong style='color:white'>Female: </strong>" +
      d["Female"] + "<br>" + "<strong style='color:white'>Year: </strong><span style='color:red'>" +
       d["Fall"] + "</span>";
  })

  svg.call(tip);

  Axis:
  var xAxis = d3.axisTop().scale( gradeScale )
  var yAxis = d3.axisLeft().scale( nameScale )

  svg.append("g")
     .call( xAxis )
  svg.append("g")
    .call( yAxis )
  // Visual Encoding:
  svg.selectAll("body")
     .data(data)
     .enter()
     .append("circle")
     .attr("class", "cc")
     .attr("r", function (d, i) {
       if(d["Total"]==0){return 0}else{
       return scoreScale(d["Total"])
     }})
     .attr("cx", function (d, i) {
       return gradeScale( d["Fall"] )
     })
     .attr("cy", function (d, i) {
       return nameScale( d["Major"])
    })
    .attr("fill-opacity","0.5")
     .attr("stroke", "white")
     .attr("fill", function (d,i){
       return colors( d["Male"]/d["Total"])
     })
     .on('mouseover', tip.show)
     .on('mouseout', tip.hide)

}
