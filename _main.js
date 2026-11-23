// _main.js - Flying Birds Animation

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('birds-canvas');
    if (!canvas) return;

    // Initialize Canvas Context
    const ctx = canvas.getContext('2d');
    let width, height;
    let birds = [];

    // Resize Canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Bird SVG Paths (Simple bird shapes)
    const birdPaths = [
        {
            x: 20, y: 50, w: 40, h: 18, points: 'M0,0 Q30,-15 L60,0 Q30,15 
0,10'
        },
        {
            x: 25, y: 70, w: 35, h: 16, points: 'M0,0 Q25,-10 L55,5 Q20,15 
0,5'
        }
    ];

    // Create Bird Instance
    function createBird(x, y) {
        const bird = {
            x: x || Math.random() * width,
            y: y || Math.random() * height - 50,
            speedX: (Math.random() - 0.5) * 2 + 0.5,
            speedY: -0.2 + Math.random() * 0.3,
            path: birdPaths[Math.floor(Math.random() * birdPaths.length)],
            points: [],
            scale: 1 + Math.random() * 0.8,
            opacity: 0.7 + Math.random() * 0.3
        };

        // Generate path points using bezier curve
        for (let i = 0; i < bird.path.length; i += 5) {
            const p1 = birdPoints[bird.path.slice(0, i).length];
            bird.points.push({ x: p1.x, y: p1.y });
        }

        return bird;
    }

    // Initialize Birds
    function initializeBirds() {
        birds = [];
        for (let i = 0; i < 8; i++) {
            const bird = createBird();
            bird.x = Math.random() * width;
            bird.y = -Math.random() * height - 100; // Start above screen
            birds.push(bird);
        }
    }

    // Render Frame
    function renderFrame(time) {
        ctx.clearRect(0, 0, width, height);

        birds.forEach(bird => {
            bird.x += bird.speedX * 4;
            bird.y += bird.speedY * 2;
            bird.opacity -= 0.015; // Fade slowly

            if (bird.opacity <= 0) return;

            ctx.fillStyle = `rgba(189, 167, 55, ${bird.opacity})`; // Gold 
color
            ctx.beginPath();
            
            // Draw bird using path points
            for (let i = 0; i < bird.points.length; i++) {
                const point = bird.points[i];
                const scaledPoint = {
                    x: point.x * bird.scale,
                    y: point.y * bird.scale
                };
                
                if (i === 0) ctx.moveTo(scaledPoint.x, scaledPoint.y);
                else ctx.lineTo(scaledPoint.x, scaledPoint.y);
            }

            ctx.closePath();
            ctx.fill();

            // Check if bird went off-screen
            if (bird.y > height + 150 || bird.opacity <= 0) {
                const newBird = createBird(Math.random() * width, 
-Math.random() * height - 100);
                birds.push(newBird);
            }
        });

        // Add slight motion blur with gradient
        ctx.globalAlpha = 0.1;
        ctx.fillRect(0, 0, width, height);

        requestAnimationFrame(renderFrame);
    }

    initializeBirds();
    renderFrame(performance.now());
});
