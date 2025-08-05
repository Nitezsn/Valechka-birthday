const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const shootingStars = [];
const starCount = 150;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    twinkle: Math.random()
  });
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    length: Math.random() * 100 + 100,
    speed: Math.random() * 15 + 10,
    angle: Math.PI / 4,
    alpha: 1
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach((star) => {
    ctx.globalAlpha = Math.abs(Math.sin(star.twinkle += 0.05));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let s = shootingStars[i];
    ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(
      s.x - s.length * Math.cos(s.angle),
      s.y - s.length * Math.sin(s.angle)
    );
    ctx.stroke();

    s.x += s.speed;
    s.y += s.speed;

    s.alpha -= 0.02;

    if (s.alpha <= 0) shootingStars.splice(i, 1);
  }
}

function animate() {
  drawStars();
  drawShootingStars();
  requestAnimationFrame(animate);
}

setInterval(createShootingStar, 800);
animate();
