(function(){
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.mobile-menu');
  const body=document.body;
  function setMenu(open){if(!toggle||!menu)return;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.setAttribute('aria-hidden',String(!open));menu.classList.toggle('open',open);body.style.overflow=open?'hidden':'';}
  if(toggle){toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));}
  if(menu){menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));}
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false);});
  document.querySelectorAll('[data-year]').forEach(node=>node.textContent=String(new Date().getFullYear()));
  const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -40px'});
  document.querySelectorAll('.reveal').forEach(node=>revealObserver.observe(node));
  const filterButtons=[...document.querySelectorAll('[data-product-filter]')];
  const productCards=[...document.querySelectorAll('[data-product-card]')];
  filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.productFilter;filterButtons.forEach(item=>item.classList.toggle('active',item===button));productCards.forEach(card=>{const values=(card.dataset.categories||'').split(' ');card.classList.toggle('hidden',filter!=='all'&&!values.includes(filter));});}));
  document.querySelectorAll('[data-product-gallery]').forEach(gallery=>{
    const main=gallery.querySelector('[data-gallery-main]');
    const buttons=[...gallery.querySelectorAll('.product-gallery-thumb')];
    if(!main||!buttons.length)return;
    buttons.forEach(button=>button.addEventListener('click',()=>{
      buttons.forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
      const source=button.dataset.gallerySrc;
      const alt=button.dataset.galleryAlt||'Product media';
      if(button.dataset.galleryType==='youtube'){
        const videoUrl=(window.SREENIDHI_PRODUCT_VIDEOS||{})[button.dataset.galleryProduct]||'';
        const match=String(videoUrl).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
        const videoId=match?match[1]:String(videoUrl).trim();
        if(!/^[A-Za-z0-9_-]{11}$/.test(videoId))return;
        const watchLink=document.createElement('a');
        watchLink.className='youtube-watch-link';watchLink.href=videoUrl;watchLink.target='_blank';watchLink.rel='noopener';watchLink.textContent='Watch video on YouTube ↗';
        if(window.location.protocol==='file:'){
          const fallback=document.createElement('div');fallback.className='local-video-fallback';
          const note=document.createElement('p');note.textContent='Video playback is available after deployment. For this local preview, open the video directly on YouTube.';
          fallback.append(note,watchLink);main.replaceChildren(fallback);return;
        }
        const iframe=document.createElement('iframe');
        const origin=encodeURIComponent(window.location.origin);
        iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&autoplay=1&origin=${origin}`;
        iframe.title=alt;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;
        const shell=document.createElement('div');shell.className='youtube-player-shell';shell.append(iframe,watchLink);main.replaceChildren(shell);
      }else{
        const image=document.createElement('img');
        image.src=source;image.alt=alt;image.width=1200;image.height=900;main.replaceChildren(image);
      }
    }));
  });
  window.addEventListener('load',()=>{
    if(!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.utils.toArray('.media-reveal img').forEach(image=>window.gsap.fromTo(image,{scale:.94},{scale:1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:image,start:'top 85%'}}));
    const statement=document.querySelector('.scrub-text');
    if(statement){const words=statement.textContent.trim().split(/\s+/);statement.innerHTML=words.map(word=>`<span>${word}</span>`).join(' ');window.gsap.fromTo(statement.querySelectorAll('span'),{opacity:.14},{opacity:1,stagger:.05,ease:'none',scrollTrigger:{trigger:statement,start:'top 75%',end:'bottom 45%',scrub:true}});}
  });
})();
