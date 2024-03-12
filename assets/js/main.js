class Game {

    constructor() {
        this.squares = Array.from(document.querySelectorAll(".square"));

        this.topSquares = Array.from(document.querySelectorAll(".top"))
        this.bottomSquares = Array.from(document.querySelectorAll(".bottom"))
        this.leftSquares = Array.from(document.querySelectorAll(".left"))
        this.rightSquares = Array.from(document.querySelectorAll(".right"))

        this.emptySquares = [];
        this.snake = {
            squares: [],
            lastSquare: null,
            firstSquare: null,
            firstSquareIndex: () => this.squares.indexOf(this.snake.firstSquare),
            lastSquareIndex: () => this.squares.indexOf(this.snake.lastSquare),
        };

        this.updateEmptySquares();
        this.createSnake();
        this.arrowPressListener();
    }

    pressedArrowHandler = {
        ArrowUp: (e) => {
            if(this.topSquares.includes(this.squares[this.snake.firstSquareIndex()])) return;

            this.snake.squares.unshift(this.squares[this.snake.firstSquareIndex() - 10]);
            this.updateSnake();
        },
        ArrowDown: (e) => {
            this.snake.squares.unshift(this.squares[this.snake.firstSquareIndex() + 10]);
            this.updateSnake();
        },
        
        ArrowLeft: (e) => {
            this.snake.squares.unshift(this.squares[this.snake.firstSquareIndex() - 1]);
            this.updateSnake();
        },
        
        ArrowRight: (e) => {
            this.snake.squares.unshift(this.squares[this.snake.firstSquareIndex() + 1]);
            this.updateSnake();
        },
    }

    arrowPressListener() {
        document.addEventListener("keydown", (e) => {


            if(Object.keys(this.pressedArrowHandler).includes(e.key)) {
                this.pressedArrowHandler[e.key]()
            }
        })
    }

    updateEmptySquares() {
        for(let i = 0;i < this.squares.length; i++) {
            const square = this.squares[i];
            if(square.innerHTML == "") {
                this.emptySquares.push(square);
            }
        }
        console.log(this.snake)
    }

    createSnake() {
        const square = this.chooseRandomSquare();
        square.classList.add("cobra");
        this.snake.squares.push(square)
        this.snake.firstSquare = square;
        this.snake.lastSquare = square;
    }

    chooseRandomSquare() {
        // Sorteia um quadrado aleatório
        return this.emptySquares[Math.floor(Math.random() * this.emptySquares.length)];
    }

    updateSnake() {
        this.snake.lastSquare.classList.remove("cobra");
        this.snake.squares.pop();

        this.snake.firstSquare = this.snake.squares[0];
        this.snake.lastSquare = this.snake.squares[this.snake.squares.length - 1];
        
        this.snake.firstSquare.classList.add("cobra");
    }

}

new Game();