let item = ["🍕" , "🍕" , "🍔" , "🍔" , "🍗" , "🍗" , "🍖" , "🍖" , "🍙" , "🍙" , "🍧" , "🍧" , "🍫" , "🍫" , "🍻" , "🍻"]
let game = document.querySelector('.gameboard');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function gaming() {
    game.innerHTML = '';
    matchedCount = 0; 
    let suffl_item = shuffle([...item]);

    for (let i = 0; i < suffl_item.length; i++) {
        let box = document.createElement('div');
        box.className = 'items';
        box.dataset.value = suffl_item[i];

        let emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.innerHTML = suffl_item[i];
        emoji.style.display = 'none';
        box.appendChild(emoji);

        box.addEventListener('click', () => flipCard(box, emoji));

        game.appendChild(box);
    }
}

function flipCard(box, emoji) {
    if (lockBoard || box === firstCard) return;

    emoji.style.display = 'inline'; 
    box.classList.add('rotate');

    if (!firstCard) {
        firstCard = box; 
    } else {
        secondCard = box; 
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
        matchedCount++; 
        checkWinCondition();
    } else {
        setTimeout(() => {
            unflipCards();
        }, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', () => flipCard(firstCard));
    secondCard.removeEventListener('click', () => flipCard(secondCard));
    resetBoard();
}

function unflipCards() {
    firstCard.querySelector('.emoji').style.display = 'none';
    secondCard.querySelector('.emoji').style.display = 'none';
    firstCard.classList.remove('rotate');
    secondCard.classList.remove('rotate');  
    resetBoard();
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkWinCondition() {
    if (matchedCount === item.length / 2) {
        setTimeout(() => {
            alert("YOU WIN THE GAME , HERE IS YOUR PRIZE 🥇");
        }, 500);
    }
}

document.querySelector('.reset').onclick = function () {
    gaming();
};

gaming();
