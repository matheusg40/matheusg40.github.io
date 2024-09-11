const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let spaceshipX, spaceshipY;
const spaceshipWidth = 50;
const spaceshipHeight = 50;
const spaceshipSpeed = 10;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let gameOver = false;

const asteroids = [];
const bullets = [];
let score = 0;
let bulletsRemaining = 150;

const asteroidSpeed = 0.5;
let asteroidCreationCounter = 0;
const asteroidCreationInterval = 60;
let gameStarted = false;

// Load images
const spaceshipImage = new Image();
spaceshipImage.src = 'img/spaceship.png';

const asteroidImage = new Image();
asteroidImage.src = 'img/asteroid.png';

// Initialize canvas
function resizeCanvas() {
    canvas.width = 800;
    canvas.height = 600;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create asteroids
function createAsteroid() {
    asteroidCreationCounter++;
    if (asteroidCreationCounter >= asteroidCreationInterval) {
        const asteroidX = Math.random() * canvas.width;
        const asteroidY = 0;
        const asteroidRadius = Math.random() * 20 + 10;
        asteroids.push({ x: asteroidX, y: asteroidY, r: asteroidRadius });
        asteroidCreationCounter = 0;
    }
}

// Create bullets
function createBullet() {
    if (bulletsRemaining > 0) {
        bullets.push({ x: spaceshipX + spaceshipWidth / 2, y: spaceshipY });
        bulletsRemaining--;
    }
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 5;

        for (let j = asteroids.length - 1; j >= 0; j--) {
            const dx = bullets[i].x - asteroids[j].x;
            const dy = bullets[i].y - asteroids[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < asteroids[j].r) {
                asteroids.splice(j, 1);
                bullets.splice(i, 1);
                score += 100;
                bulletsRemaining += 20;
                break;
            }
        }

        if (bullets[i] && bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

function drawHUD() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.fillText("Bullets: " + bulletsRemaining, 10, 60);
}

function drawSpaceship() {
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}

// Draw asteroids
function drawAsteroids() {
    for (const asteroid of asteroids) {
        ctx.drawImage(asteroidImage, asteroid.x - asteroid.r, asteroid.y - asteroid.r, asteroid.r * 2, asteroid.r * 2);
    }
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = "#0000ff";
    for (const bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Draw game over screen
function drawGameOverScreen() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 50);
    ctx.font = "24px Arial";
    ctx.fillText("Pressione R para Recomeçar", canvas.width / 2 - 140, canvas.height / 2 + 20);
}

// Game loop
function gameLoop() {
    if (!gameStarted) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        if (rightPressed && spaceshipX < canvas.width - spaceshipWidth) {
            spaceshipX += spaceshipSpeed;
        }
        if (leftPressed && spaceshipX > 0) {
            spaceshipX -= spaceshipSpeed;
        }

        createAsteroid();
        for (let i = asteroids.length - 1; i >= 0; i--) {
            asteroids[i].y += asteroidSpeed;
            if (asteroids[i].y > canvas.height) {
                asteroids.splice(i, 1);
            }
        }

        if (spacePressed) {
            createBullet();
        }
        updateBullets();

        for (const asteroid of asteroids) {
            const dx = spaceshipX - asteroid.x;
            const dy = spaceshipY - asteroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < spaceshipWidth / 2 + asteroid.r) {
                gameOver = true;
                break;
            }
        }

        drawSpaceship();
        drawAsteroids();
        drawBullets();
        drawHUD();
    } else {
        drawGameOverScreen();
    }

    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    spaceshipX = canvas.width / 2 - spaceshipWidth / 2;
    spaceshipY = canvas.height - spaceshipHeight - 10;
    gameOver = false;
    score = 0;
    bulletsRemaining = 150;
    bullets.length = 0;
    asteroids.length = 0;
    gameStarted = true;
    gameLoop();
}

// Event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    } else if (event.key === " ") {
        spacePressed = true;
    } else if (event.key === "r" || event.key === "R") {
        if (gameOver) {
            startGame();
        }
    }
}

function keyUpHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    } else if (event.key === " ") {
        spacePressed = false;
    }
}

function drawStartScreen() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "36px Arial";
    ctx.fillText("Pressione Enter para Iniciar", canvas.width / 2 - 200, canvas.height / 2);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !gameStarted) {
        startGame();
    }
});

// Draw start screen initially
drawStartScreen();