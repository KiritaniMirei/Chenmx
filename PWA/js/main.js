const template = `<video autoplay muted loop>
<source src="./video/game.mp4">
</source>
</video>
<img src="./imgs/back.jpeg">`;

document.getElementById('content').innerHTML = template;

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}
