var cv = document.getElementById('cv');
var c = cv.getContext('2d');
var w, h;
var pts = [];
function handleResize(){
w = cv.width = window.innerWidth;
h = cv.height = window.innerHeight;
c.fillStyle = '#050505';
c.fillRect(0, 0, w, h);
}
window.addEventListener('resize', handleResize);
handleResize();
class P{
constructor(){
this.x = Math.random() * w;
this.y = Math.random() * h;
this.vx = 0;
this.vy = 0;
this.life = 0;
this.maxLife = 100 + Math.random() * 150;
this.size = Math.random() * 1.5 + 0.5;
}
update(){
this.x += this.vx;
this.y += this.vy;
this.life++;
if(this.x < 0)
this.x = w;
if(this.x > w)
this.x = 0;
if(this.y < 0)
this.y = h;
if(this.y > h)
this.y = 0;
if(this.life > this.maxLife){
this.x = Math.random() * w;
this.y = Math.random() * h;
this.vx = 0;
this.vy = 0;
this.life = 0;
 }
}
draw(){
var alpha = Math.sin((this.life / this.maxLife) * Math.PI);
c.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
c.fillRect(this.x, this.y, this.size, this.size);
 }
}
for(var i = 0; i < 1500; i++){
pts.push(new P());
}

var t = 0;

function loop(){
c.fillStyle = 'rgba(5, 5, 5, 0.05)';
c.fillRect(0, 0, w, h);

for(var i = 0; i < pts.length; i++){
pts[i].update();
pts[i].draw();
}
t += 0.01;
requestAnimationFrame(loop);
}
loop();
