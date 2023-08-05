score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keycode)
    if (e.keycode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 1000);
    }
    // 39 is keycode of leftarrow key
    if (e.keycode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keycode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    // changing the x value of man through animation
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    // changing the y value of man through animation
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    // changing the x value of tiger through animation
    // parseInt is basically converting into integer
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    // changing the y value of tiger through animation
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    // As difference b/w man and tiger is decreasing so here deciding distance i.e;when will man will be killed by tiger
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 70 && offsetY < 50) {
        // making game over visible
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        // playing gameover audio just for 1s
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            // after game over pausing the audio
            audio.pause();
        }, 800);
    }
    
    // if we will not use offset then score will be jus increasing
    // when man is crossing tiger then score is getting increased
    else if (offsetX < 150 && cross) {
        score += 100;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            //  
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            // animation duration
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}
