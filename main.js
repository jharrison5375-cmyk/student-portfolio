// Mobile menu toggle
const menuBtn=document.getElementById('menuBtn'),menu=document.getElementById('menu');
menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);});
// Cursor and touch glow
const glow=document.getElementById('glow');
if(glow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  let x=0,y=0,ticking=false;
  const move=(cx,cy)=>{x=cx;y=cy;glow.classList.add('on');
    if(!ticking){ticking=true;requestAnimationFrame(()=>{glow.style.transform='translate('+x+'px,'+y+'px)';ticking=false;});}};
  window.addEventListener('pointermove',e=>move(e.clientX,e.clientY));
  window.addEventListener('touchmove',e=>move(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  document.addEventListener('mouseleave',()=>glow.classList.remove('on'));
}
