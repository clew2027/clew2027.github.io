let clusters = [];
let NUM_CLUSTERS;

function setup() {
  let c = createCanvas(600, 800);
  c.parent("canvas-container");

  background(20, 50, 100); // Set dark blue background
  stroke(180, 200, 220); // Initial blue-grey color for circles
  noFill();

  // number of clusters (13–15)
  NUM_CLUSTERS = int(random(13, 16));

  // random central base
  let cx = width / 2 + random(-40, 40);
  let cy = height / 2 + random(-100, 100);

  // generate clustered positions
  for (let i = 0; i < NUM_CLUSTERS; i++) {
    let x = cx + random(-120, 120);
    let y = cy + random(-250, 250);
    let rings = int(random(1, 10)); // each cluster: 1–10 circles

    clusters.push({
      x: x,
      y: y,
      rings: rings,
      baseRadius: random(5, 25),
      currentRings: rings, // Track current number of rings for smooth transitions
      baseRings: rings, // Ensure baseRings is initialized
      colorTransition: 0 // Track color transition state
    });
  }
}

function draw() {
  background(20, 50, 100); // Dark blue background
  noFill();

  // calculate which clusters are closest to mouse
  let sorted = [...clusters].sort((a, b) => {
    let da = dist(mouseX, mouseY, a.x, a.y);
    let db = dist(mouseX, mouseY, b.x, b.y);
    return da - db;
  });

  // top 4–5 clusters get emphasized
  let emphasized = sorted.slice(0, 5);

  // draw all clusters
  for (let cl of clusters) {
    if (dist(mouseX, mouseY, cl.x, cl.y) < 100) {
      cl.rings += 0.1; // Continuously increase rings on hover
      cl.colorTransition = (cl.colorTransition + 1) % 360; // Cycle color transition
    } else {
      cl.rings -= 0.1; // Decrease rings when not hovering
      cl.rings = max(cl.rings, cl.baseRings); // Stop at original size
    }

    drawCluster(cl, emphasized.includes(cl));
  }
}

function addRandomCircles() {
  for (let cl of clusters) {
    if (random() < 0.5) { // 50% chance to add a new circle to a cluster
      let newCircle = {
        x: cl.x + random(-30, 30), // Random offset within the cluster
        y: cl.y + random(-30, 30),
        radius: random(5, 15) // Random radius for the new circle
      };
      cl.additionalCircles = cl.additionalCircles || []; // Initialize if not present
      cl.additionalCircles.push(newCircle);
    }
  }
}

function drawCluster(c, isEmphasized) {
  let targetRings = isEmphasized ? c.rings + 5 : c.rings; // Target rings for emphasized clusters

  // Smoothly transition currentRings towards targetRings
  c.currentRings += (targetRings - c.currentRings) * 0.1;

  let totalRings = round(c.currentRings);

  for (let i = 0; i < totalRings; i++) {
    let r = c.baseRadius + i * 15; // Increased spacing between circles

    // Adjust color to be more grey and blue, less white
    let colorValue = abs(sin(radians(c.colorTransition)) * 100); // Reduced intensity
    stroke(150 + colorValue / 2, 180 + colorValue / 2, 200 + colorValue / 2); // More grey-blue tones

    circle(c.x, c.y, r);
  }

  // Draw additional random circles in the cluster
  if (c.additionalCircles) {
    for (let circle of c.additionalCircles) {
      ellipse(circle.x, circle.y, circle.radius * 2);
    }
  }
}

function mousePressed() {
  // Add a new cluster at the mouse position
  let newCluster = {
    x: mouseX,
    y: mouseY,
    rings: int(random(3, 9)), // Random number of circles between 5 and 8
    baseRadius: random(5, 25),
    currentRings: int(random(5, 9)),
    baseRings: int(random(5, 9)),
    colorTransition: 0
  };

  clusters.push(newCluster);
}
