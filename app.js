(function(){
function init(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]:not(.btn)'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    ['start','uslugi','badania','kroplowki','wizyta','dojazd','firmy','pytania','kontakt'].forEach(function(id){var t=document.getElementById(id);if(t)io.observe(t)});
  }
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.children[0];return k?k.getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||20):300}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||tor.scrollWidth<=tor.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;tor.classList.remove('drag');if(moved){var w=step();tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'})}});
    tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-nav="'+tor.id+'"]');
    function upd(){if(nav)nav.style.visibility=tor.scrollWidth>tor.clientWidth+2?'visible':'hidden'}
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
    requestAnimationFrame(upd);addEventListener('resize',upd);
  });
  var f=document.getElementById('form'),msg=document.getElementById('msg');
  f.addEventListener('submit',function(e){e.preventDefault();var ok=true;[].forEach.call(f.querySelectorAll('[required]'),function(i){var v=i.type==='checkbox'?(i.checked?'1':''):i.value.trim();var bad=!v;i.setAttribute('aria-invalid',bad);if(bad&&ok){ok=false;i.focus()}});if(!ok)return;msg.hidden=false;f.reset();msg.scrollIntoView({block:'nearest',behavior:'smooth'})});
  var mapa=document.getElementById('mapa');
  var pm=document.getElementById('pokaz-mape');function laduj(){if(mapa.querySelector('iframe'))return;var i=document.createElement('iframe');i.src=mapa.dataset.src;i.title='Mapa: punkt pobrań Vital Mobile, Rynek 20, Nekla';i.loading='lazy';i.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(i);pm.hidden=true}pm.addEventListener('click',laduj);if('IntersectionObserver' in window){var mio=new IntersectionObserver(function(es){if(es[0].isIntersecting){laduj();mio.disconnect()}},{rootMargin:'300px 0px'});mio.observe(mapa)}
  var lz=[].slice.call(document.querySelectorAll('img[data-src]'));
  function wczytaj(i){if(!i.dataset.src)return;if(i.dataset.srcset)i.srcset=i.dataset.srcset;i.src=i.dataset.src;i.removeAttribute('data-src')}
  if('IntersectionObserver' in window){var lio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){wczytaj(e.target);lio.unobserve(e.target)}})},{rootMargin:'400px 200px'});lz.forEach(function(i){lio.observe(i)})}else lz.forEach(wczytaj);
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
