
document.addEventListener("DOMContentLoaded", function() {
    const wordSearchForm = document.getElementById("wordSearchForm");
    const wordSearchGrid = document.getElementById("wordSearchGrid");

    wordSearchForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Test values for grid size and words
        const gridSize = 10; // Replace with your desired grid size
        const words = ["HELLO", "WORLD"]; // Replace with your desired words

        if (isNaN(gridSize) || gridSize <= 0) {
            alert("Please enter a valid grid size.");
            return;
        }

        if (words.length === 0) {
            alert("Please enter at least one word.");
            return;
        }

        const wordSearch = generateWordSearch(gridSize, words);
        renderWordSearch(wordSearch);
    });

    function renderWordSearch(wordSearch) {
        // Check if wordSearch is an array and has rows
        if (!Array.isArray(wordSearch) || wordSearch.length === 0) {
            console.error("Invalid wordSearch data.");
            return;
        }

        // Clear the previous word search
        wordSearchGrid.innerHTML = "";

        // Render the word search grid
        wordSearch.forEach(row => {
            // Check if row is an array
            if (!Array.isArray(row)) {
                console.error("Invalid row data.");
                return;
            }

            // Create a div for the column
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("word-column");

            row.forEach(letter => {
                const wordElement = document.createElement("div");
                wordElement.classList.add("word");
                wordElement.textContent = letter;
                columnDiv.appendChild(wordElement);
            });

            // Append the column div to the grid
            wordSearchGrid.appendChild(columnDiv);
        });
    }

    function generateWordSearch(gridSize, words) {
        // Create an empty grid of the specified size
        const grid = Array.from({
            length: gridSize
        }, () => Array(gridSize).fill(""));

        // Generate random letters for the entire grid
        const randomLetters = Array.from({
            length: gridSize
        }, () => getRandomLetter());

        // Function to randomly select a letter
        function getRandomLetter() {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet.charAt(randomIndex);
        }

        // Function to place a word horizontally
        function placeWordHorizontally(word) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * (gridSize - word.length + 1));
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
        }

        // Function to place a word vertically
        function placeWordVertically(word) {
            const row = Math.floor(Math.random() * (gridSize - word.length + 1));
            const col = Math.floor(Math.random() * gridSize);
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col] = word[i];
            }
        }

        // Function to place a word diagonally (top-left to bottom-right)
        function placeWordDiagonally(word) {
            const row = Math.floor(Math.random() * (gridSize - word.length + 1));
            const col = Math.floor(Math.random() * (gridSize - word.length + 1));
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col + i] = word[i];
            }
        }

        // Place words in the grid
        words.forEach(word => {
            const placementMethod = Math.floor(Math.random() * 3); // Randomly select placement method
            if (placementMethod === 0) {
                placeWordHorizontally(word);
            } else if (placementMethod === 1) {
                placeWordVertically(word);
            } else {
                placeWordDiagonally(word);
            }
        });

        // Fill empty cells with pre-generated random letters
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === "") {
                    grid[i][j] = randomLetters[i];
                }
            }
        }

        return grid;
    }
});