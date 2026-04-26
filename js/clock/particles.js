class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap particles around edges
        if (this.size < 0 || this.size > canvas.width) this.speedX *= -1;
        if (this.size < 0 || this.size > canvas.height) this.speedY *= -1;
    }

    draw(context) {
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    this.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    this.context.lineWidth = 1;
                    this.context.beginPath();
                    this.context.moveTo(this.particles[i].x, this.particles[i].y);
                    this.context.lineTo(this.particles[j].x, this.particles[j].y);
                    this.context.stroke();
                }
            }
        }
    }

    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.context);
        });
        this.drawConnections();
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Usage example: const particleSystem = new ParticleSystem('canvasId');