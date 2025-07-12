// Graph data for Malawi's 28 districts: initial (x, y) positions and connections

const data = {
 nodes: [
  { "id": "Blantyre", "x": 0.9134213014976535, "y": 0.2540740323898225 },
  { "id": "Chikwawa", "x": 0.14374226893980302, "y": 0.3910154112946962 },
  { "id": "Chiradzulu", "x": 0.9351749046225152, "y": 0.5027042682331085 },
  { "id": "Chitipa", "x": 0.5033532302137712, "y": 0.6371050642113303 },
  { "id": "Dedza", "x": 0.32675593364689126, "y": 0.32741458873737384 },
  { "id": "Dowa", "x": 0.44893854232683894, "y": 0.3534310438093927 },
  { "id": "Karonga", "x": 0.7719114930591756, "y": 0.7164846847486838 },
  { "id": "Kasungu", "x": 0.9486271739760203, "y": 0.03717616769235954 },
  { "id": "Lilongwe", "x": 0.03185092819745572, "y": 0.07907784991666855 },
  { "id": "Machinga", "x": 0.4976553188158377, "y": 0.15957191749775634 },
  { "id": "Mangochi", "x": 0.2417748469656349, "y": 0.22132470346325728 },
  { "id": "Mchinji", "x": 0.8029651384628501, "y": 0.4170419722297135 },
  { "id": "Mulanje", "x": 0.6998851394303303, "y": 0.7300336822154281 },
  { "id": "Mwanza", "x": 0.3093976112949879, "y": 0.9141857772478698 },
  { "id": "Mzimba", "x": 0.16190201617155997, "y": 0.8356366262711726 },
  { "id": "Neno", "x": 0.9869012833729535, "y": 0.3511167097222222 },
  { "id": "Nkhata Bay", "x": 0.0882233026546202, "y": 0.18674223158715342 },
  { "id": "Nkhotakota", "x": 0.17467106409589772, "y": 0.0010883823237957113 },
  { "id": "Nsanje", "x": 0.8093914854184416, "y": 0.5079865816371467 },
  { "id": "Ntcheu", "x": 0.8588177668360885, "y": 0.4167540312634731 },
  { "id": "Ntchisi", "x": 0.3969781197576786, "y": 0.9982702660465445 },
  { "id": "Phalombe", "x": 0.934352810085411, "y": 0.7328019939159007 },
  { "id": "Rumphi", "x": 0.2438492080065875, "y": 0.0387865957339274 },
  { "id": "Salima", "x": 0.837201462046805, "y": 0.9965726289086905 },
  { "id": "Thyolo", "x": 0.6272655175304893, "y": 0.7688215502317457 },
  { "id": "Zomba", "x": 0.7252659639019722, "y": 0.810888016094619 },
  { "id": "Balaka", "x": 0.15932838570160823, "y": 0.5698123530031478 },
  { "id": "Likoma", "x": 0.3488343806746971, "y": 0.6253864059894712 }
],
  edges: [
    ["Blantyre", "Chikwawa"], ["Blantyre", "Chiradzulu"], ["Blantyre", "Thyolo"],
    ["Chikwawa", "Nsanje"], ["Chikwawa", "Mwanza"], ["Chiradzulu", "Zomba"],
    ["Chiradzulu", "Phalombe"], ["Chitipa", "Karonga"], ["Dedza", "Lilongwe"],
    ["Dedza", "Ntcheu"], ["Dowa", "Lilongwe"], ["Dowa", "Ntchisi"],
    ["Karonga", "Rumphi"], ["Kasungu", "Lilongwe"], ["Kasungu", "Mzimba"],
    ["Lilongwe", "Mchinji"], ["Lilongwe", "Salima"], ["Machinga", "Zomba"],
    ["Machinga", "Balaka"], ["Mangochi", "Balaka"], ["Mangochi", "Salima"],
    ["Mulanje", "Phalombe"], ["Mulanje", "Thyolo"], ["Mwanza", "Neno"],
    ["Mzimba", "Nkhata Bay"], ["Mzimba", "Rumphi"], ["Nkhata Bay", "Nkhotakota"],
    ["Nkhotakota", "Salima"], ["Nsanje", "Chikwawa"], ["Ntcheu", "Balaka"],
    ["Ntchisi", "Nkhotakota"], ["Phalombe", "Mulanje"], ["Salima", "Nkhotakota"],
    ["Zomba", "Machinga"], ["Likoma", "Nkhata Bay"]

  ]
};

// these constants define the size of the SVG canvas and the force directed layout parameters
const WIDTH = 800; 
const HEIGHT = 600;
const ITERATIONS = 300;
const REPULSION = 1000;
const ATTRACTION = 0.1;

// This code initializes the positions of the nodes based on their initial (x, y) coordinates
// and sets up a force directed layout algorithm to optimize their positions based on the edges defined in
let positions = {};
data.nodes.forEach(n => {
  positions[n.id] = { x: n.x * WIDTH, y: n.y * HEIGHT };
});

// This function optimizes the layout of the graph using a force directed algorithm.
// It applies repulsion between nodes and attraction along edges, iterating a fixed number of times
function optimizeLayout(positions, edges) {
  for (let iter = 0; iter < ITERATIONS; iter++) {
    const forces = {};
    Object.keys(positions).forEach(id => forces[id] = { x: 0, y: 0 });

    // This section applies repulsion forces between nodes
    // It calculates the distance between each pair of nodes and applies a force inversely proportional to
    const nodes = Object.keys(positions);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = positions[n1].x - positions[n2].x;
        const dy = positions[n1].y - positions[n2].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = REPULSION / (dist * dist);
        forces[n1].x += (dx / dist) * force;
        forces[n1].y += (dy / dist) * force;
        forces[n2].x -= (dx / dist) * force;
        forces[n2].y -= (dy / dist) * force;
      }
    }

    // This section applies attraction forces along the edges
    // It calculates the distance between connected nodes and applies a force proportional to that distance
    edges.forEach(([n1, n2]) => {
      const dx = positions[n1].x - positions[n2].x;
      const dy = positions[n1].y - positions[n2].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = dist * ATTRACTION;
      forces[n1].x -= (dx / dist) * force;
      forces[n1].y -= (dy / dist) * force;
      forces[n2].x += (dx / dist) * force;
      forces[n2].y += (dy / dist) * force;
    });

    Object.keys(positions).forEach(id => {
      positions[id].x += forces[id].x * 0.1;
      positions[id].y += forces[id].y * 0.1;
    });
  }

  // This section normalizes the positions to fit within the SVG canvas dimensions
  // It scales the positions to a range between 0 and 1 based on the min and max values
  const xs = Object.values(positions).map(p => p.x);
  const ys = Object.values(positions).map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  Object.keys(positions).forEach(id => {
    positions[id].x = (positions[id].x - minX) / (maxX - minX);
    positions[id].y = (positions[id].y - minY) / (maxY - minY);
  });

  return positions;
}

const optimized = optimizeLayout(positions, data.edges);

console.log("Optimized Positions:", optimized);



// Setup the SVG canvas and zoom behavior using D3.js
const svg = d3.select("#graph")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

const g = svg.append("g");

const zoom = d3.zoom()
  .scaleExtent([0.5, 5])
  .on("zoom", (event) => {
    g.attr("transform", event.transform);
  });
svg.call(zoom);

// Define the padding and scaling functions for the SVG canvas
const PADDING = 40;
const scaleX = d3.scaleLinear().domain([0, 1]).range([PADDING, WIDTH - PADDING]);
const scaleY = d3.scaleLinear().domain([0, 1]).range([PADDING, HEIGHT - PADDING]);

// This section draws the edges and nodes of the graph using D3.js

g.selectAll(".link")
  .data(data.edges)
  .enter()
  .append("line")
  .attr("class", "link")
  .attr("x1", d => scaleX(optimized[d[0]].x))
  .attr("y1", d => scaleY(optimized[d[0]].y))
  .attr("x2", d => scaleX(optimized[d[1]].x))
  .attr("y2", d => scaleY(optimized[d[1]].y));

// This section draws the nodes of the graph
// It creates circles for each node and adds mouseover and mouseout events to change their color
g.selectAll(".node")
  .data(data.nodes)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("cx", d => scaleX(optimized[d.id].x))
  .attr("cy", d => scaleY(optimized[d.id].y))
  .attr("r", 8)
  .style("fill", "steelblue")
  .on("mouseover", function () {
    d3.select(this).style("fill", "orange");
  })
  .on("mouseout", function () {
    d3.select(this).style("fill", "steelblue");
  });

// This section adds labels to the nodes
// It creates text elements for each node and positions them based on the optimized coordinates
g.selectAll(".label")
  .data(data.nodes)
  .enter()
  .append("text")
  .attr("x", d => scaleX(optimized[d.id].x) + 10)
  .attr("y", d => scaleY(optimized[d.id].y) + 5)
  .text(d => d.id)
  .attr("font-size", "10px")
  .attr("fill", "#000")
  
