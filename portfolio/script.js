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

// ========== AI CHATBOT INTELLIGENCE ==========

// Knowledge base about Sharon
const sharonKnowledge = {
    // Basic Info
    name: "Sharon Seluleko Silondiwe Mthembu",
    location: "Cape Town, South Africa",
    education: "Occupational Certificate in Software Engineering (NQF Level 6) at WeThinkCode_, and National Senior Certificate from Fairvale Secondary School",

    // Skills
    technicalSkills: [
        "Python", "Java", "C#", "JavaScript", "HTML/CSS", "Spring Boot",
        ".NET SDK", "Docker", "Git/GitHub", "RESTful APIs", "Unit Testing",
        "Test Case Design", "Automation Principles", "Postman", "CI/CD", "AWS DevOps Tools"
    ],

    softSkills: [
        "Communication", "Analytical Thinking", "Problem Solving", "Adaptability",
        "Attention to Detail", "Collaboration", "Time Management", "Emotional Intelligence"
    ],

    // Projects
    projects: [
        {
            name: "Weather App",
            description: "Python CLI weather application using OpenWeatherMap API with city search and weather data display",
            tech: ["Python", "REST API"]
        },
        {
            name: "Calculator App",
            description: "Interactive CLI calculator with input validation and error handling",
            tech: ["Python"]
        },
        {
            name: "UNO Game",
            description: "Multi-player UNO card game with complete game logic and special cards",
            tech: ["Python", "Game Logic"]
        },
        {
            name: "Library API",
            description: "Spring Boot REST API with CRUD operations using Spring Data JPA",
            tech: ["Java", "Spring Boot", "REST API"]
        }
    ],

    // Certifications
    certifications: [
        "Microsoft Azure AI Essentials",
        "GenAI Course for Software Engineers",
        "Advanced Testing Practices Using AWS DevOps Tools",
        "Unit Testing in Python",
        "Agile Software Development: Extreme Programming"
    ],

    // Experience
    experience: "Front Desk Volunteer at WeThinkCode_ (2025-Present) - Assisting students, managing front desk operations, and promoting a safe environment",

    // Contact
    email: "mthembusharon059@gmail.com",
    github: "https://github.com/shaz1410",
    linkedin: "https://linkedin.com/in/sharon-mthembu-087051357",
    phone: "073 566 6702",

    // Languages
    languages: "English (C2 Proficient), IsiZulu (C2 Native), Afrikaans (A2 Elementary)",

    // Goals
    goals: "Seeking internship opportunities in software development and quality assurance to contribute to development practices and strengthen testing skills"
};

// Chatbot responses
function getBotResponse(userInput) {
    const input = userInput.toLowerCase();

    // Greetings
    if (input.match(/hello|hi|hey|greetings|sup|howdy/)) {
        return "👋 Hello! I'm Sharon's AI assistant. Ask me anything about her skills, projects, or experience!";
    }

    // Who is Sharon / About
    if (input.match(/who is|tell me about|about (you|sharon)|introduce|background/)) {
        return `🎓 ${sharonKnowledge.name} is a Software Engineering student at WeThinkCode_ (NQF Level 6) based in ${sharonKnowledge.location}. She specializes in backend development and quality assurance, with a passion for building reliable, scalable software systems.`;
    }

    // Skills
    if (input.match(/skills|technologies|tech stack|what can (she|you) do|expertise/)) {
        return `⚡ Sharon's technical arsenal includes: ${sharonKnowledge.technicalSkills.join(", ")}. She also excels in soft skills like ${sharonKnowledge.softSkills.slice(0, 5).join(", ")}, and more!`;
    }

    // Python specific
    if (input.match(/python/)) {
        return "🐍 Sharon is proficient in Python! She's built CLI applications, game logic for UNO, and uses it for automation and testing. Python is one of her primary languages!";
    }

    // Java specific
    if (input.match(/java|spring/)) {
        return "☕ Sharon works with Java and Spring Boot! Her Library API project showcases her REST API development skills with Spring Data JPA and H2 database.";
    }

    // Projects
    if (input.match(/projects|what (has|did) (she|you) build|portfolio|work/)) {
        let projectsList = sharonKnowledge.projects.map(p => `• ${p.name}: ${p.description}`).join("\n");
        return `🚀 Sharon has completed several awesome projects:\n${projectsList}\n\nCheck out her Projects page for GitHub links!`;
    }

    // Weather App
    if (input.match(/weather/)) {
        return "🌤️ The Weather App is a Python CLI application that uses the OpenWeatherMap API. It searches weather by city, displays temperature, humidity, wind speed, and handles errors gracefully!";
    }

    // Calculator
    if (input.match(/calculator/)) {
        return "🧮 The Calculator App is an interactive CLI calculator with full input validation, error handling for division by zero, and supports multiple calculations in one session!";
    }

    // UNO Game
    if (input.match(/uno|game|card/)) {
        return "🃏 Sharon's UNO Game is a Python CLI implementation with multi-player turn management, special action cards (Skip, Reverse, Draw Two, Wild), and win condition detection!";
    }

    // Library API
    if (input.match(/library|api|rest/)) {
        return "📚 The Library API is a Spring Boot REST API with full CRUD operations, Spring Data JPA, H2 database, and was tested using Postman for proper HTTP responses!";
    }

    // Education
    if (input.match(/education|study|school|university|learn/)) {
        return `🎓 ${sharonKnowledge.education}. She's currently pursuing her Software Engineering certification at WeThinkCode_ with a focus on backend systems and quality assurance.`;
    }

    // Certifications
    if (input.match(/certifications|certificate|credentials/)) {
        return `📜 Sharon holds these certifications:\n${sharonKnowledge.certifications.map(c => `• ${c}`).join("\n")}`;
    }

    // Experience
    if (input.match(/experience|work|volunteer|job/)) {
        return `💼 ${sharonKnowledge.experience}`;
    }

    // Contact
    if (input.match(/contact|email|phone|reach|connect|linkedin|github/)) {
        return `📡 You can reach Sharon at:\n• Email: ${sharonKnowledge.email}\n• GitHub: ${sharonKnowledge.github}\n• LinkedIn: ${sharonKnowledge.linkedin}\n• Phone: ${sharonKnowledge.phone}`;
    }

    // Languages
    if (input.match(/language|speak|afrikaans|zulu|english/)) {
        return `🗣️ ${sharonKnowledge.languages}`;
    }

    // Goals / Internship
    if (input.match(/goal|internship|job|career|future|looking for|opportunity/)) {
        return `🎯 ${sharonKnowledge.goals}`;
    }

    // QA / Testing
    if (input.match(/qa|testing|quality|assurance|test|validation/)) {
        return "🔍 Sharon specializes in Quality Assurance! She focuses on unit testing, test case design, automation principles, input validation, and systematic error handling to ensure software reliability.";
    }

    // Help
    if (input.match(/help|what can i ask|commands/)) {
        return "🤖 You can ask me about:\n• Sharon's skills & technologies\n• Her projects (Weather App, Calculator, UNO, Library API)\n• Education & certifications\n• Contact information\n• Experience & goals\n• Languages she speaks\nJust type your question!";
    }

    // Default response
    return "🤖 Hmm, I'm not sure about that! Try asking about her skills, projects, education, or contact info. Type 'help' to see what I can answer!";
}

// Chatbot UI functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Open/Close chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Get bot response with typing indicator
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <i class="fas fa-robot"></i>
                <div class="message-content">
                    <p>${text.replace(/\n/g, '<br>')}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        }

        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <i class="fas fa-robot"></i>
            <div class="message-content">
                <p><i class="fas fa-ellipsis-h"></i> Thinking...</p>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Event listeners
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.textContent;
            chatbotInput.value = question;
            sendMessage();
        });
    });
});