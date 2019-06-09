const game = () => {
    let pScore = 0;
    let cScore = 0;

    const playBtn = document.querySelector(".intro button");
    const restartBtn = document.querySelector(".restart button");

    const introScreen = document.querySelector(".intro");
    const gameScreen = document.querySelector(".game");
    const restartScreen = document.querySelector(".restart");

    const message = document.querySelector(".message h1");
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");

    // Start game on click
    playBtn.addEventListener("click", () => {
        startGame();
        playGame();
    });

    // Restart game on click
    restartBtn.addEventListener("click", () => {
        restartGame();
    });

    // Start game function
    const startGame = () => {
        introScreen.classList.add("fadeOut");
        gameScreen.classList.add("fadeIn");
    };

    // Game function
    const playGame = () => {
        const hands = document.querySelectorAll(".hands img");
        const computerOptions = ["sasso", "carta", "forbici"];

        options.forEach(option => {
            option.addEventListener("click", function() {
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoise = computerOptions[computerNumber];

                // Disable click
                options.forEach(option => {
                    option.style.pointerEvents = "none";
                });

                // Reset Images
                playerHand.src = `./assets/sasso.png`;
                computerHand.src = `./assets/sasso.png`;

                // Animate hands
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";

                // Reset hands animation
                hands.forEach(hand => {
                    hand.addEventListener("animationend", function() {
                        this.style.animation = "";
                    });
                });

                setTimeout(() => {
                    // Update Images
                    playerHand.src = `./assets/${this.id}.png`;
                    computerHand.src = `./assets/${computerChoise}.png`;

                    // Compare hands
                    compareHands(this.id, computerChoise);

                    checkWinner();

                    // Enable click
                    options.forEach(option => {
                        option.style.pointerEvents = "all";
                    });
                }, 2000);
            });
        });
    };

    const compareHands = (playerChoise, computerChoise) => {
        // Check pareggio
        if (playerChoise === computerChoise) {
            message.textContent = "Pareggio";
            return;
        }

        // Check sasso
        if (playerChoise === "sasso") {
            if (computerChoise === "forbici") {
                message.textContent = "Hai vinto";
                pScore++;
                updateScore();
                return;
            } else {
                message.textContent = "Hai perso";
                cScore++;
                updateScore();
                return;
            }
        }

        // Check carta
        if (playerChoise === "carta") {
            if (computerChoise === "forbici") {
                message.textContent = "Hai perso";
                cScore++;
                updateScore();
                return;
            } else {
                message.textContent = "Hai vinto";
                pScore++;
                updateScore();
                return;
            }
        }

        // Check fforbici
        if (playerChoise === "forbici") {
            if (computerChoise === "sasso") {
                message.textContent = "Hai perso";
                cScore++;
                updateScore();
                return;
            } else {
                message.textContent = "Hai vinto";
                pScore++;
                updateScore();
                return;
            }
        }
    };

    const checkWinner = () => {
        if (cScore === 3 || pScore === 3) {
            options.forEach(option => {
                option.setAttribute("disabled", true);
            });

            setTimeout(() => {
                const winnerMessage = document.querySelector(".restart h1");
                gameScreen.classList.remove("fadeIn");
                gameScreen.classList.add("fadeOut");
                restartScreen.classList.add("fadeIn");

                if (pScore > cScore) {
                    winnerMessage.textContent = "Hai vinto la partita";
                } else {
                    winnerMessage.textContent = "Hai perso la partita";
                }
            }, 2000);
        }
    };

    // Update Score
    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    const restartGame = () => {
        cScore = 0;
        pScore = 0;

        options.forEach(option => {
            option.removeAttribute("disabled");
        });

        // Reset Images
        playerHand.src = `./assets/sasso.png`;
        computerHand.src = `./assets/sasso.png`;

        message.textContent = "Fai la prima mossa";

        updateScore();

        restartScreen.classList.remove("fadeIn");
        restartScreen.classList.add("fadeOut");

        gameScreen.classList.remove("fadeOut");
        gameScreen.classList.add("fadeIn");
    };
};

game();
