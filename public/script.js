const button = document.getElementById('btn');
let count = 0;

button.addEventListener('click', () => {
  console.log(++count);
});
