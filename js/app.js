// Get the button element
const playButton = document.querySelector('.play');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const endButton = document.querySelector('.end');
const backButton = document.querySelector('.back');
const showInstructionsButton = document.querySelector('.show-instructions');
const instructions = document.getElementById('instructions');

// Get the screens
const initialScreen = document.getElementById('initial-screen');
const gameScreen = document.getElementById('game-screen');

// Get the map, food and score element
const map = document.querySelector('.map');
const food = document.querySelector('.food');
const scoreDisplay = document.querySelector('.score');

let snake;
let nextDirection;
let foodPosition;
let score;
let gameInterval;
let isPaused = false;
let speed = 200;
let gameEnded = false;
let lastDirectionChangeTime = 0;

// Set the initial food position, and make sure food is not in the snake's part.
function setFoodPosition() {
    let validPosition = false;
    while (!validPosition) {
        foodPosition = {
            x: Math.floor(Math.random() * (map.clientWidth / 20)) * 20,
            y: Math.floor(Math.random() * (map.clientHeight / 20)) * 20
        };
        validPosition = !snake.some(part => part.x === foodPosition.x && part.y === foodPosition.y);
    }
    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Rendering of snake and food.
function render() {
    // Clear everything on the map
    map.innerHTML = '';

    // creating the snake head
    const head = snake[0];
    const headEl = document.createElement('div');
    headEl.style.left = `${head.x}px`;
    headEl.style.top = `${head.y}px`;
    headEl.classList.add('head');
    map.appendChild(headEl);

    // creating the snake body
    for (let i = 1; i < snake.length; i++) {
        const part = snake[i];
        const bodyEl = document.createElement('div');
        bodyEl.style.left = `${part.x}px`;
        bodyEl.style.top = `${part.y}px`;
        bodyEl.classList.add('body');
        map.appendChild(bodyEl);
    }
    // Set up and add food
    map.appendChild(food);
}

// Update the snake's position
function update() {
    if (isPaused) return;

    const direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    // Check if hit the wall.
    if (head.x < 0 || head.x >= map.clientWidth || head.y < 0 || head.y >= map.clientHeight) {
        endGame();
        return;
    }

    // Check if hit itself
    for (const part of snake) {
        if (head.x === part.x && head.y === part.y) {
            endGame();
            return;
        }
    }

    // Adding new snake head
    snake.unshift(head);

    // Check for food
    if (head.x === foodPosition.x && head.y === foodPosition.y) {
        score += 5;
        setFoodPosition();
        updateScore();

        // Check if the score is a multiple of 50
        if (score % 50 === 0) {
            speed = Math.max(50, speed - 20);
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, speed);
        }
    } else {
        // Remove the last part of the snake
        snake.pop();
    }
    render();
}

// Keyboard input.
function checkKey(e) {
    const now = Date.now();
    if (now - lastDirectionChangeTime < 100) return;
    e = e || window.event;
    const keyCode = e.keyCode || e.which;
    switch (keyCode) {
        case 32:
            if (gameEnded) {
                init();
                gameEnded = false;
            } else {
                pauseGame();
            }
            break;
        case 38:
            if (nextDirection.y === 0) {
                nextDirection = { x: 0, y: -20 };
                lastDirectionChangeTime = now;
            }
            break;
        case 40:
            if (nextDirection.y === 0) {
                nextDirection = { x: 0, y: 20 };
                lastDirectionChangeTime = now;
            }
            break;
        case 37:
            if (nextDirection.x === 0) {
                nextDirection = { x: -20, y: 0 };
                lastDirectionChangeTime = now;
            }
            break;
        case 39:
            if (nextDirection.x === 0) {
                nextDirection = { x: 20, y: 0 };
                lastDirectionChangeTime = now;
            }
            break;
        default:
            break;
    }
}

// main game loop
function gameLoop() {
    update();
}

// Initialize the game
function init() {
    // The initial length of the snake is 3
    snake = [
        { x: 40, y: 0 },
        { x: 20, y: 0 },
        { x: 0, y: 0 }
    ];
    nextDirection = { x: 20, y: 0 };
    foodPosition = {
        x: Math.floor(Math.random() * (map.clientWidth / 20)) * 20,
        y: Math.floor(Math.random() * (map.clientHeight / 20)) * 20
    };
    score = 0;
    isPaused = false;
    speed = 200;
    lastDirectionChangeTime = 0;
    setFoodPosition();
    updateScore();
    render();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
    // Reset the pause button text.
    pauseButton.textContent = 'Pause';
}

// start game
function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
}

// Paused game
function pauseGame() {
    isPaused = !isPaused;
    if (isPaused) {
        pauseButton.textContent = 'Resume';
    } else {
        pauseButton.textContent = 'Pause';
    }
}

// End game
function endGame() {
    clearInterval(gameInterval);
    scoreDisplay.textContent = `Game Over! Your score is ${score}`;
    gameEnded = true;
}

// Display or hide instructions.
function toggleInstructions() {
    if (instructions.style.display === 'block') {
        instructions.style.display = 'none';
    } else {
        instructions.style.display = 'block';
    }
}

// Prevents the default behavior of the spacebar on a button.
function preventSpaceKeyDefault(event) {
    if (event.key === ' ') {
        event.preventDefault();
    }
}

[startButton, pauseButton, endButton, backButton, showInstructionsButton].forEach(button => {
    button.addEventListener('focus', () => {
        button.addEventListener('keydown', preventSpaceKeyDefault);
    });

    button.addEventListener('blur', () => {
        button.removeEventListener('keydown', preventSpaceKeyDefault);
    });
});

// Event listeners 
playButton.addEventListener('click', () => {
    initialScreen.classList.add('hidden');
    gameScreen.style.display = 'block';
    setTimeout(() => {
        gameScreen.classList.add('visible');
    }, 20);
});
startButton.addEventListener('click', () => {
    init();
    startGame();
});
pauseButton.addEventListener('click', pauseGame);
endButton.addEventListener('click', endGame);
backButton.addEventListener('click', () => {
    initialScreen.classList.remove('hidden');
    initialScreen.classList.add('visible');
    gameScreen.classList.remove('visible');
    gameScreen.style.display = 'none';
});
document.addEventListener('keydown', checkKey);
showInstructionsButton.addEventListener('click', toggleInstructions);
document.addEventListener('click', (e) => {
    if (e.target !== showInstructionsButton && instructions.style.display === 'block') {
        instructions.style.display = 'none';
    }
});
