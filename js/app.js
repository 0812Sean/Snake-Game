// Get the button element
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const endButton = document.querySelector('.end');

// Get the map, food and score element
const map = document.querySelector('.map');
const food = document.querySelector('.food');
const scoreDisplay = document.querySelector('.score');

let snake;
let direction;
let foodPosition;
let score;
let gameInterval;
let isPaused = false;
let speed = 200;

// Set the initial food position.
function setFoodPosition() {
    foodPosition = {
        x: Math.floor(Math.random() * (map.clientWidth / 20)) * 20,
        y: Math.floor(Math.random() * (map.clientHeight / 20)) * 20
    };
    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}
// Rendeing of snake and food.
function render() {
    // Clear everying on the map
    map.innerHTML = '';

    // creating the snake head
    const head = snake[0];
    const headEl = document.createElement('div');
    headEl.style.left = `${head.x}px`;
    headEl.style.top = `${head.y}px`;
    headEl.classList.add('head');
    headEl.innerHTML = '😤'
    map.appendChild(headEl)

    // creating the snake body
    for (let i=1; i < snake.length; i++) {
        const part = snake[i];
        const bodyEl = document.createElement('div');
        bodyEl.style.left = `${part.x}px`;
        bodyEl.style.top = `${part.y}px`;
        bodyEl.classList.add('body');
        map.appendChild(bodyEl);
    }
    // Set up and add food
    // setFoodPosition();
    map.appendChild(food);
}

// Update the snake's position
function update() {
    if (isPaused) return;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    // Check if hit the wall.
    if (head.x < 0 || head.x >= map.clientWidth || head.y < 0 || head.y >= map.clientHeight) {
        endGame();
        return;
    }

    // Check is hit itself
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
        speed = Math.max(50,speed - 20);
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop,speed);
    }
    }else {
        // Remove the last part of the snake
        snake.pop();
    }
    render()
}

// Keyboard input.
function checkKey(e) {
    e = e || window.event;
    const keyCode = e.keycode || e.which;
    switch (keyCode) {
        case 32:
        pauseGame();
        break;
        case 38:
            if (direction.y === 0) direction = { x: 0, y: -20 }; 
            break;
        case 40:
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case 37:
            if (direction.x === 0) direction = { x: -20, y: 0 };
            break;
        case 39:
            if (direction.x === 0) direction = { x: 20, y: 0 };
            break;
        default:
            break;   
    }
}
// main game loop
function gameLoop() {
    update()
}
// Initialize the game
function init(){
    // The initial length of the snake is 3
    snake = [
        { x: 40, y: 0 },
        { x: 20, y:0},
        { x: 0, y:0}
    ];
    direction = { x: 20, y: 0 };
    foodPosition = {
        x: Math.floor(Math.random() * (map.clientWidth / 20)) * 20,
        y: Math.floor(Math.random() * (map.clientHeight / 20)) * 20
    };
    score = 0;
    isPaused = false;
    speed = 200;
    setFoodPosition();
    updateScore();
    render();
    if (gameInterval) clearInterval(gameInterval)
    gameInterval = setInterval(gameLoop, speed);
}

// Paused game
function pauseGame() {
    isPaused = !isPaused;
    if (isPaused) {
        pauseButton.textContent = 'resume';
    }else{
        pauseButton.textContent = 'pause';
    }
}

// End game
function endGame(){
    clearInterval(gameInterval);
    scoreDisplay.textContent = `Game Over! Your score is ${score}`;
}

// Prevents the default behavior of the spacebar on a button.
function preventSpaceKeyDefault(event) {
    if (event.key === ' ') {
        event.preventDefault();
    }
}

[startButton, pauseButton, endButton].forEach(button => {
    button.addEventListener('focus', () => {
        button.addEventListener('keydown', preventSpaceKeyDefault);
    });

    button.addEventListener('blur', () => {
        button.removeEventListener('keydown', preventSpaceKeyDefault);
    });
});

// Event listeners 
startButton.addEventListener('click', init);
pauseButton.addEventListener('click', pauseGame);
endButton.addEventListener('click', endGame);
document.addEventListener('keydown',checkKey);

// Initialize the game
init();