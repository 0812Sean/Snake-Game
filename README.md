# Snake-Game

A simple snake game implemented using HTML, CSS, and JavaScript. The game can be played in the browser, and it includes features such as starting, pausing, and resuming the game, as well as displaying instructions.

![Screenshot](assets/Screenshot%20.png)



## Features

- Start, pause, and end the game
- Display instructions
- Dynamic background color change
- Score tracking
- Increase speed as the score increases

## How To Play

1. Click the "Play" button to enter the game interface.
2. Click the "Start" button to star the game.
3. Use the arrow keys to control the direction of the snake.
4. Press the space bar to pause and resume the game.
5. Click the "End" button to end the game.
6. When the game ends, you can press the space bar to restar the game.

## Game Controls
- **Arrow Keys:** Move the snake in the desired direction.
- **Space Bar:** Pause and resume the game.
- **Start Button:** Start a new game.
- **Pause Button:** Pause the current game.
- **End Button:** End the current game.
- **Back Button:** Return to the initial screen.

## To play this game, click [here](https://0812sean.github.io/Snake-Game/).

## Different browsers have different default styles, to ensure the style is consistent across all browsers, I used this code in my CSS.
```
* {
    margin: 0;
    padding: 0;
}
```

## Move The Snake:
Because the first element of the snake array is always the snake head, the snake's movement effect can be achieved by using ```snake.unshift(head)``` to add a new snake head position at the beginning of the array and using ```snake.pop()``` to remove the last element at the end of the array (when no food is eaten).

## Make the snake move on its own：
Making the snake move by itself is an important step in the snake game. I used a timer (setInterval) and the "update" function to achieve this operation, and let the increase in score increase the speed of the snake.
```
let speed = 200
        if (score % 50 === 0) {
            speed = Math.max(50, speed - 20);
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, speed);
        }
```

## Future Improvements
- Adding levels of difficulty.
- Make a score leaderboard.
- Enhancing the game with sound effects and additional animations.