Game based on Flappy bird.

1. The project takes into account the following functional requirements:
 
- The bird should not fly beyond the boundaries of the field. If the bird touches the ground, the game ends; if it touches the ceiling, the game continues.
- If the bird touches the pipe, the game ends.
- When you click on the game window, the bird flies up to a height equal to half the height of the free gap in the pipe.
- When the player is inactive, the bird falls with acceleration.
- The free space in the pipe occupies 25% of the pipe height.
- The height of the bird is 20% of the height of the free gap in the pipe.
- The width of the pipe is twice the width of the bird.
- The distance between the pipes is equal to the width of the three pipes.
- The bird moves at such a speed that new pipes appear every second.
- The current number of points is calculated. It increases when the bird overcomes the middle of the free gap in the pipe.
- The player's best score (maximum number of points scored) is saved in localStorage and is displayed under the current number of points if the game is not launched for the first time.
- The bird is animated (rotates when moving in the direction of flight).

2. Code requirements met:
- Use classic JavaScript without additional libraries.
- Give variables, classes, and functions meaningful names.
- Use indentation correctly.
- Use OOP with ES6 classes.
- Follow the principles of DRY (Don’t Repeat Yourself) and KISS (Keep It Short and Simple).
- Make scoring processing and game logic independent of the game display method used and the physics used in the game.
- Place the logic for calculating rendering on the canvas in a separate class so that you can, for example, replace rendering on the canvas with rendering in the DOM without changing the code of the game itself, simply by changing the class responsible for rendering.
- Place the bird falling logic in a separate class, so that if you need more complex and realistic logic for calculating bird mechanics, you can replace the class responsible for this logic and not rewrite the rest of the code (for example, if in the future we want to use some kind of physics engine ).
- Place the constants in a separate config file, break them into logical blocks.
- Competently divide the project into files, think over and implement their structure.

3. Additional requirements met:
- increasing the difficulty level when reaching a certain number of points (for example, when reaching a point threshold of 10, 100, 1000, 1000, and so on, increase the speed of the map) and an alternative control method, for example, support for a gamepad or both keyboard and mouse;
- the game is adapted to screen sizes, including those in the range from 360 px to 1024 px;
- added sounds using Audio API.

4. Various:
- Game theme audio: "Strobotone - Electro Game Theme 01" provided by https://freemusicarchive.org/
- Game visual arts provided by Nikolay Lavrenov (all rights reserved).


https://antropovag.github.io/flappy_fish/
