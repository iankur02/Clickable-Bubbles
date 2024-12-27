
const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];
const bubbleRadius = 20; // Fixed size for all bubbles

class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = bubbleRadius;
        this.color = color;
        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }

    isClicked(mx, my) {
        const distance = Math.sqrt((mx - this.x) ** 2 + (my - this.y) ** 2);
        return distance < this.radius;
    }

    changeDirection() {
        this.dx = Math.random() * 10 - 5; // Increased speed on tap
        this.dy = Math.random() * 10 - 5; // Increased speed on tap
    }
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(${r}, ${g}, ${b})';
}

function createBubble() {
    const x = Math.random() * (canvas.width - bubbleRadius * 2) + bubbleRadius;
    const y = Math.random() * (canvas.height - bubbleRadius * 2) + bubbleRadius;
    const color = generateRandomColor();
    bubbles.push(new Bubble(x, y, color));
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    bubbles.forEach((bubble) => {
        if (bubble.isClicked(clickX, clickY)) {
            bubble.changeDirection();
        }
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", handleClick);

for (let i = 0; i < 30; i++) {
    createBubble();
}

animate();