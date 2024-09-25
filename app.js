const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');

// Definir o tamanho do canvas
const canvasSize = 400;
const unitSize = 20;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [
    { x: unitSize * 4, y: unitSize * 4 },
    { x: unitSize * 3, y: unitSize * 4 },
    { x: unitSize * 2, y: unitSize * 4 }
];

let direction = { x: unitSize, y: 0 }; // Movimento inicial: direita
let food = generateFood();
let score = 0;
let gameActive = true;

// Gerar comida em local aleatório
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / unitSize)) * unitSize,
        y: Math.floor(Math.random() * (canvasSize / unitSize)) * unitSize
    };
}

// Desenhar o jogo
function drawGame() {
    if (!gameActive) return;

    // Limpar o canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Desenhar a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, unitSize, unitSize);

    // Desenhar a cobra
    snake.forEach(part => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
    });

    moveSnake();
    checkCollision();
}

// Mover a cobra
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Adicionar a nova cabeça
    snake.unshift(head);

    // Verificar se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 1;
        scoreDisplay.textContent = `Pontuação: ${score}`;
        food = generateFood();
    } else {
        // Remover a cauda se não tiver comida
        snake.pop();
    }
}

// Verificar colisões
function checkCollision() {
    const head = snake[0];

    // Colisão com as bordas
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver();
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Função de game over
function gameOver() {
    gameActive = false;
    alert('Game Over! Sua pontuação: ' + score);
}

// Controlar a direção com o teclado
window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -unitSize };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: unitSize };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -unitSize, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: unitSize, y: 0 };
    }
});

// Reiniciar o jogo
function restartGame() {
    snake = [
        { x: unitSize * 4, y: unitSize * 4 },
        { x: unitSize * 3, y: unitSize * 4 },
        { x: unitSize * 2, y: unitSize * 4 }
    ];
    direction = { x: unitSize, y: 0 };
    food = generateFood();
    score = 0;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    gameActive = true;
    drawGame();
}

restartBtn.addEventListener('click', restartGame);

// Executar o jogo
setInterval(drawGame, 100);
