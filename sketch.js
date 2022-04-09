const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const createGrid = () => {
    const points = [];
    const count = 30;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: Math.abs(0.01 + random.gaussian() * 0.01),
          position: [u, v],
          color: random.pick(palette),
        });
      }
    }
    return points;
  };
  random.setSeed("12");
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;
  return ({ context, width, height }) => {
    context.fillStyle = "pink";
    context.fill();
    points.forEach(({ radius, position: [u, v], color }) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = "black";
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
