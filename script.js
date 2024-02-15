const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const wrongLettersContEl = document.querySelector('.wrong-letters-container');
const playAgainBtn = document.querySelector('#play-buutton');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

const firstScoop = document.querySelector('.first-scoop');
const secondScoop = document.querySelector('.second-scoop');
const thirdScoop = document.querySelector('.third-scoop');
const fourthScoop = document.querySelector('.fourth-scoop');
const fifthScoop = document.querySelector('.fifth-scoop');

const iceCreamParts = [firstScoop,secondScoop,thirdScoop,fourthScoop,fifthScoop];

const words = ['application','programming','interface','wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
      finalMessage.innerText = 'Congratulations! You’ve won an ice cream! 🍦👍🥳😃';
      popup.style.display = 'flex';
      window.addEventListener('keydown', e => {
        if(e.keyCode === 13 || e.keyCode === 32){
            playAgain();
        }
      });
    }
  }



// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong letters</p>' : ''}
      ${wrongLetters.map(letter => ` <span>${letter}</span>`)}
    `;
  
    // Display parts
    iceCreamParts.forEach((part, index) => {
      const errors = wrongLetters.length;
  
      if (index < errors) {
          part.style.display = 'none';
    } else {
          part.style.display = 'block';
      }
    });
  
    // Check if lost
    if (wrongLetters.length === iceCreamParts.length) {
      finalMessage.innerText = 'You lost! 😕 No ICE CREAM for you ⛔🍦';
      popup.style.display = 'flex';

      window.addEventListener('keydown', e => {
        if(e.keyCode === 13 || e.keyCode === 32){
            playAgain();
        }
      });
    }
  }

  // Show notification
function showNotification() {
    notification.classList.add('show');
  
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }

  // reset round
  function playAgain(){
 //  Empty arrays
 correctLetters.splice(0);
 wrongLetters.splice(0);


 selectedWord = words[Math.floor(Math.random() * words.length)];

 displayWord();

 updateWrongLettersEl();
 wrongLettersEl.innerHTML = `<p>Wrong letters</p><span> </span>`;
 wrongLettersContEl.style.visibility = 'visible';

 popup.style.display = 'none';
  }

  // Keydown letter press
window.addEventListener('keydown', e => {
    const isBlock = popup.style.display === 'block';
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
  
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
  
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
  
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }

    if(e.keyCode === 13 && isBlock){
        playAgain();
    }
  });
  

  // Restart game and play again
  playAgainBtn.addEventListener('click', () => {
    playAgain();
  });




displayWord();
