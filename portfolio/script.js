// ========== ANIMATED UNIVERSE BACKGROUND ==========
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let stars = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticlesAndStars();
    }

    function initParticlesAndStars() {
        // Stars
        stars = [];
        for (let i = 0; i < 300; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.5,
                alpha: Math.random() * 0.6 + 0.2,
                twinkleSpeed: 0.003 + Math.random() * 0.008,
                phase: Math.random() * Math.PI * 2
            });
        }

        // Tech particles
        particles = [];
        const particleCount = 150;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: 2 + Math.random() * 4,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2,
                color: `hsl(${Math.random() * 60 + 180}, 80%, 65%)`,
            });
        }
    }

    function drawStars() {
        for (let star of stars) {
            const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * star.twinkleSpeed + star.phase);
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 240, 200, ${star.alpha * (0.4 + twinkle * 0.6)})`;
            ctx.fill();
        }
    }

    function drawParticles() {
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#0ff';
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -20) p.x = width + 20;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            if (p.y > height + 20) p.y = -20;
        }
        ctx.shadowBlur = 0;
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 200, 255, ${0.08 * (1 - dist / 100)})`;
                    ctx.stroke();
                }
            }
        }
    }

    function drawFloatingTechOrbs() {
        const time = Date.now() / 2500;
        for (let i = 0; i < 20; i++) {
            const angle = time * 0.2 + i * (Math.PI * 2 / 20);
            const radius = Math.min(width, height) * 0.4;
            const x = width / 2 + Math.cos(angle) * radius;
            const y = height / 2 + Math.sin(angle * 0.5) * radius * 0.5;

            ctx.beginPath();
            ctx.arc(x, y, 4 + Math.sin(time + i) * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 255, 0.25)`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
            ctx.stroke();
        }
    }

    function animateBackground() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#03050b');
        grad.addColorStop(1, '#0a1022');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        drawStars();
        drawParticles();
        drawConnections();
        drawFloatingTechOrbs();

        requestAnimationFrame(animateBackground);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    resizeCanvas();
    animateBackground();
}

console.log('✨ Tech Universe Activated — Welcome to Sharon\'s Portfolio ✨');

// Add this to your existing script.js

// Interactive cursor effect for space office
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.floating-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add typing effect to system log
const logEntries = document.querySelectorAll('.log-entry');
if (logEntries.length) {
    logEntries.forEach((entry, index) => {
        entry.style.opacity = '0';
        setTimeout(() => {
            entry.style.transition = 'opacity 0.5s ease';
            entry.style.opacity = '1';
        }, index * 500);
    });
}

// Add skill level animation on scroll
const techItems = document.querySelectorAll('.tech-item');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-level');
            if (skillBar) {
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

techItems.forEach(item => observer.observe(item));

console.log('🚀 Space Office Activated | Welcome Commander Sharon');