(function(){
var d=document;
d.getElementById('rok').textContent=new Date().getFullYear();
// menu mobilne
var ham=d.querySelector('.ham'),panel=d.getElementById('panel');
function zamknij(){panel.classList.remove('otw');ham.setAttribute('aria-expanded','false');ham.setAttribute('aria-label','Otwórz menu');d.body.style.overflow=''}
ham.addEventListener('click',function(){var o=panel.classList.toggle('otw');ham.setAttribute('aria-expanded',o);ham.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');d.body.style.overflow=o?'hidden':''});
panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij)});
// aktywna pozycja menu
var linki=[].slice.call(d.querySelectorAll('nav.menu a'));
var sekcje=linki.map(function(a){var h=a.getAttribute('href');return h.length>1?d.querySelector(h):d.querySelector('.hero')});
function akt(){var y=scrollY+innerHeight*.35,i=0;sekcje.forEach(function(s,k){if(s&&s.getBoundingClientRect().top+scrollY<=y)i=k});linki.forEach(function(a,k){a.classList.toggle('akt',k===i);if(k===i)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
addEventListener('scroll',akt,{passive:true});
// pasek mobilny po przewinięciu za hero
var mob=d.getElementById('mob'),cta=d.querySelector('.hero .cta');
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var r=e[0];mob.classList.toggle('widac',!r.isIntersecting&&r.boundingClientRect.top<0)}).observe(cta)}
// strzałki torów
d.querySelectorAll('.przewin').forEach(function(p){var t=d.getElementById(p.dataset.tor),b=p.querySelectorAll('button');
 function krok(){var c=t.firstElementChild;return c?c.getBoundingClientRect().width+14:300}
 b[0].addEventListener('click',function(){t.scrollBy({left:-krok(),behavior:'smooth'})});
 b[1].addEventListener('click',function(){t.scrollBy({left:krok(),behavior:'smooth'})});
 // przeciąganie myszą
 var x0=0,s0=0,ciag=false,ruch=false;
 t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=false;x0=e.clientX;s0=t.scrollLeft;t.style.scrollSnapType='none'});
 addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;if(Math.abs(dx)>5)ruch=true;t.scrollLeft=s0-dx});
 addEventListener('pointerup',function(){if(!ciag)return;ciag=false;t.style.scrollSnapType='';});
 t.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false}},true);
 t.addEventListener('dragstart',function(e){e.preventDefault()});
});
// lightbox
var fig=[].slice.call(d.querySelectorAll('[data-lb]')),lb=d.getElementById('lb'),li=lb.querySelector('img'),lic=lb.querySelector('.lic'),n=0;
function pokaz(i){n=(i+fig.length)%fig.length;li.src=fig[n].dataset.lb;li.alt=fig[n].dataset.opis||'';lic.textContent=(fig[n].dataset.opis||'')+'  '+(n+1)+' / '+fig.length}
fig.forEach(function(f,i){f.setAttribute('tabindex','0');f.setAttribute('role','button');f.addEventListener('click',function(){pokaz(i);lb.classList.add('otw');lb.querySelector('.x').focus()});f.addEventListener('keydown',function(e){if(e.key==='Enter'){f.click()}})});
function zam(){lb.classList.remove('otw');li.removeAttribute('src')}
lb.querySelector('.x').addEventListener('click',zam);
lb.querySelector('.l').addEventListener('click',function(){pokaz(n-1)});
lb.querySelector('.p').addEventListener('click',function(){pokaz(n+1)});
lb.addEventListener('click',function(e){if(e.target===lb)zam()});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('otw'))return;if(e.key==='Escape')zam();if(e.key==='ArrowLeft')pokaz(n-1);if(e.key==='ArrowRight')pokaz(n+1)});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)pokaz(dx<0?n+1:n-1)});
// mapa przy przewinięciu
var m=d.getElementById('mapa');
function laduj(){if(m.dataset.ok)return;m.dataset.ok=1;var f=d.createElement('iframe');f.src=m.dataset.src.replace(/&amp;/g,'&');f.title='Mapa: Rynek 20, Nekla';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){laduj();io.disconnect()}},{rootMargin:'300px'});io.observe(m)}else laduj();
// cookies
var ck=d.getElementById('ck');ck.addEventListener('click',function(){d.getElementById('cookies').hidden=true;try{localStorage.setItem('vm_ck','1')}catch(e){}});
// formularz pokazowy
d.getElementById('form').addEventListener('submit',function(e){e.preventDefault();d.getElementById('info-form').textContent='To podgląd strony, formularz niczego nie wysyła. Na gotowej stronie zgłoszenie trafi na biuro@vitalmobile.pl.'});
})();
