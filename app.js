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

var palettes =[
{
h: 320, s: 80, l: 60
},
{
h: 190, s: 90, l: 50 
},
{
h: 40, s: 90, l: 60
},
{
h: 280, s: 70, l: 55 
},
{
h: 120, s: 60, l: 45 
}
];

class P{
constructor(){
this.x = Math.random() * w;
this.y = Math.random() * h;
this.vx = 0;
this.vy = 0;
this.life = 0;
this.maxLife = 100 + Math.random() * 150;
this.size = Math.random() * 1.5 + 0.5;
this.palIdx = Math.floor(Math.random() * palettes.length);
}
update(time, zoom, maxSpd){
var nx = this.x * zoom;
var ny = this.y * zoom;
var n1 = Math.sin(nx + time);
var n2 = Math.cos(ny - time);
var n3 = Math.sin((nx + ny) * 0.5 + time * 0.5);
var angle = (n1 * n2 + n3) * Math.PI * 4;
this.vx += Math.cos(angle) * 0.15;
this.vy += Math.sin(angle) * 0.15;
var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

if(speed > maxSpd){
this.vx = (this.vx / speed) * maxSpd;
this.vy = (this.vy / speed) * maxSpd;
}

this.vx *= 0.98;
this.vy *= 0.98;
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
this.palIdx = Math.floor(Math.random() * palettes.length);
 }
}

draw(){
var lifeRatio = this.life / this.maxLife;
var alpha = Math.sin(lifeRatio * Math.PI);
var p = palettes[this.palIdx];
var hueShift = lifeRatio * 40;
var h = (p.h + hueShift) % 360;
var s = p.s;
var l = p.l;
c.fillStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + alpha + ')';
c.fillRect(this.x, this.y, this.size, this.size);
 }
}

for(var i = 0; i < 1500; i++){
pts.push(new P());
}

var t = 0;
var baseZ = 0.005;
var baseSpd = 4;
var uiSpd = document.getElementById('spd');
var uiZm = document.getElementById('zm');
var uiPal = document.getElementById('pal');

uiPal.addEventListener('change', function(){
var idx = parseInt(this.value);
for(var i = 0; i < pts.length; i++){
pts[i].palIdx = idx;
}
});

function loop(){
c.fillStyle = 'rgba(5, 5, 5, 0.05)';
c.fillRect(0, 0, w, h);

var currentSpd = parseFloat(uiSpd.value);
var currentZm = parseFloat(uiZm.value) * 0.001;
for(var i = 0; i < pts.length; i++){
pts[i].update(t, currentZm, currentSpd);
pts[i].draw();
}

t += 0.005;
requestAnimationFrame(loop);
}

loop();
