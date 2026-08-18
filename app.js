var cv = document.getElementById('cv');
var c = cv.getContext('2d');
var w, h;
function handleResize(){
w = cv.width = window.innerWidth;
h = cv.height = window.innerHeight;
c.fillStyle = '#050505';
c.fillRect(0, 0, w, h);
}
window.addEventListener('resize', handleResize);
handleResize();
var t = 0;
function loop(){
c.fillStyle = 'rgba(5, 5, 5, 0.1)';
c.fillRect(0, 0, w, h);
t += 0.01;
requestAnimationFrame(loop);
}
loop();