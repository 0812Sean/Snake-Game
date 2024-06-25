// Get the button element
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const endButton = document.querySelector('.end');

// Get the map and food element
const map = document.querySelector('.map');
const food = document.querySelector('.food');

let snake;
let foodPosition;
let score;
let isPaused;

// Set the initial food position.
function setFoodPosition() {
    food.style.left = `${foodPosition.x}px`;
    food.style.left = `${foodPosition.y}px`;
}

// Rendeing of snake and food.
function render() {
    // Clear everying on the map
    map.innerHTML = '';

    // creating the snake head
    const head = document.createElement('div');
    head.style.left = `${}`
    
}