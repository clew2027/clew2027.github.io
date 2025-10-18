// script.js

// Select the elements
const drinkSection = document.getElementById('drink-section');
const drinkImage = document.getElementById('drink-image');

// Define the drinks list
const drinks = [
  { name: 'a caffè latte', img: 'images/latte.png', color: '#FFEE8C' },
  { name: 'a matcha', img: 'images/matcha.png', color: '#b7d05b' },
  { name: 'an espresso', img: 'images/americano.png', color: '#BA9D8A' },
  { name: 'milk tea', img: 'images/milktea.png', color: '#f2e0c9' },
  { name: 'oolong tea', img: 'images/tea.png', color: '#b1d5f0' }
];

let currentIndex = 0;

const lamp = document.querySelector('.lamp');
const body = document.body;
const lets = document.querySelector('.lets-get')
const second = document.querySelector('.emoji-row')


lamp.addEventListener('mouseenter', () => {
  body.style.background = '#0F0E47';
  lets.style.color = 'white';
  second.style.color = 'white';

});
lamp.addEventListener('mouseleave', () => {
  body.style.background = '';
  lets.style.color = '';
  second.style.color = '';
});


// Handle click on drink section
drinkSection.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % drinks.length;
  const currentDrink = drinks[currentIndex];

  // Update text and background color
  drinkSection.textContent = currentDrink.name;
  drinkSection.style.background = currentDrink.color;

  // Fade out image, change, fade in
  drinkImage.style.opacity = 0;
  setTimeout(() => {
    drinkImage.src = currentDrink.img;
    drinkImage.style.opacity = 1;
  }, 200);
});
