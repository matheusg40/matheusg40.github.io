const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Função para atualizar o tamanho do canvas quando a janela for redimensionada
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Adicione um ouvinte de evento para redimensionar o canvas quando a janela for redimensionada
window.addEventListener("resize", resizeCanvas);

// Chame a função resizeCanvas() inicialmente para garantir que o canvas tenha o tamanho correto ao carregar a página
resizeCanvas();

// Defina o tamanho do canvas
// canvas.width = 100;
// canvas.height = 100;

// Defina a posição inicial da nave espacial
let spaceshipX = canvas.width / 2;
let spaceshipY = canvas.height - 50;
const spaceshipWidth = 50;
const spaceshipHeight = 50;
const spaceshipSpeed = 10;

// Variáveis para controlar os asteroides
const asteroids = [];
const asteroidSpeed = 0.5;

let asteroidCreationCounter = 0;
const asteroidCreationInterval = 60; // Altere este valor para ajustar a frequência de criação

// Variáveis para controlar os tiros
const bullets = [];
let bulletSpeed = 5;

// Variáveis para controlar o score e balas
let score = 0;
let bulletsRemaining = 150; // Inicie com 30 balas

// Variável para controlar o estado do jogo
let gameOver = false;

// Função para criar um asteroide
function createAsteroid() {
    asteroidCreationCounter++;

    if (asteroidCreationCounter >= asteroidCreationInterval) {
        const asteroidX = Math.random() * canvas.width;
        const asteroidY = 0;
        const asteroidRadius = Math.random() + 10;
        asteroids.push({ x: asteroidX, y: asteroidY, r: asteroidRadius });
        asteroidCreationCounter = 0; // Reiniciar o contador
    }
}

// Função para criar um tiro
function createBullet() {
    if (bulletsRemaining > 0) {
        bullets.push({ x: spaceshipX + spaceshipWidth / 2, y: spaceshipY });
        bulletsRemaining--;
    }
}

// Função para atualizar a posição dos tiros
function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bulletSpeed;

        // Verificar colisão com asteroides
        for (let j = 0; j < asteroids.length; j++) {
            const dx = bullets[i].x - asteroids[j].x;
            const dy = bullets[i].y - asteroids[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < asteroids[j].r) {
                // Destruir o asteroide
                asteroids.splice(j, 1);
                // Remover o tiro
                bullets.splice(i, 1);
                // Aumentar o score e dar 2 balas
                score += 100;
                bulletsRemaining += 2;
                break; // Sair do loop interno
            }
        }

        // Remover tiros que saíram da tela
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

// Função para desenhar o score e balas restantes
function drawHUD() {
    ctx.fillStyle = "#000000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.fillText("Bullets: " + bulletsRemaining, 10, 60);
}

// Função para desenhar a nave espacial
function drawSpaceship() {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}

// Função para desenhar os asteroides
function drawAsteroids() {
    ctx.fillStyle = "#ff0000";
    for (let i = 0; i < asteroids.length; i++) {
        ctx.beginPath();
        ctx.arc(asteroids[i].x, asteroids[i].y, asteroids[i].r, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Função para desenhar os tiros
function drawBullets() {
    ctx.fillStyle = "#0000ff"; // Cor dos tiros definida para azul
    for (let i = 0; i < bullets.length; i++) {
        ctx.beginPath();
        ctx.arc(bullets[i].x, bullets[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Função para desenhar a tela de recomeço
function drawGameOverScreen() {
    ctx.fillStyle = "#000000";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 50);
    ctx.font = "24px Arial";
    ctx.fillText("Pressione R para Recomeçar", canvas.width / 2 - 140, canvas.height / 2 + 20);
}

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        // Atualize a posição da nave espacial
        if (rightPressed && spaceshipX < canvas.width - spaceshipWidth) {
            spaceshipX += spaceshipSpeed;
        }
        if (leftPressed && spaceshipX > 0) {
            spaceshipX -= spaceshipSpeed;
        }

        // Crie e atualize os asteroides
        createAsteroid();
        for (let i = 0; i < asteroids.length; i++) {
            asteroids[i].y += asteroidSpeed;
            if (asteroids[i].y > canvas.height) {
                asteroids.splice(i, 1);
            }
        }

        // Atualize e desenhe os tiros
        if (spacePressed) {
            createBullet();
        }
        updateBullets();

        // Verifique colisões
        for (let i = 0; i < asteroids.length; i++) {
            const dx = spaceshipX - asteroids[i].x;
            const dy = spaceshipY - asteroids[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < spaceshipWidth / 2 + asteroids[i].r) {
                // Game Over
                gameOver = true;
                break;
            }
        }

        // Desenhe a nave espacial, os asteroides, os tiros e o HUD
        drawSpaceship();
        drawAsteroids();
        drawBullets();
        drawHUD();
    } else {
        // O jogo terminou, exibe a tela de recomeço
        drawGameOverScreen();
    }

    requestAnimationFrame(gameLoop);
}

// Controle de teclado
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    } else if (event.key == " ") {
        spacePressed = true;
    } else if (event.key == "r" || event.key == "R") {
        // Recomeçar o jogo ao pressionar a tecla "R"
        if (gameOver) {
            restartGame();
        }
    }
}

function keyUpHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    } else if (event.key == " ") {
        spacePressed = false;
    }
}

// Função para reiniciar o jogo
function restartGame() {
    // Reinicie as variáveis de jogo
    gameOver = false;
    score = 0;
    bulletsRemaining = 30; // Reinicie com 30 balas
    bullets.length = 0;
    asteroids.length = 0;
    spaceshipX = canvas.width / 2;
    spaceshipY = canvas.height - 50;

    // Inicie o loop do jogo novamente
    gameLoop();
}

// Inicie o jogo
gameLoop();
