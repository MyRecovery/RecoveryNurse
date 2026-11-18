var app=document.getElementById('app'),S={};
try{S=JSON.parse(localStorage.getItem('rn1')||'{}')}catch(e){S={}}
function save(){try{localStorage.setItem('rn1',JSON.stringify(S))}catch(e){}}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function g(k,d){return S[k]===undefined?d:S[k]}
var HSVG='<svg viewBox="0 0 320 190" role="img" aria-label="Illustration: en vej med bro og kompas, mennesker hånd i hånd og spirende planter"><circle cx="268" cy="34" r="20" fill="#ffc93c"/><path d="M268 4v6M268 58v6M238 34h6M292 34h6M247 13l4 4M285 51l4 4M289 13l-4 4M251 51l-4 4" stroke="#ffc93c" stroke-width="3" stroke-linecap="round"/><path d="M0 160Q70 120 150 146T320 128V190H0Z" fill="#9ad9bf"/><path d="M60 190C100 160 130 168 160 138S230 96 262 66" fill="none" stroke="#ffd1d6" stroke-width="16" stroke-linecap="round"/><path d="M60 190C100 160 130 168 160 138S230 96 262 66" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 8"/><path d="M126 122q24-28 48 0" fill="none" stroke="#1d2b53" stroke-width="4" stroke-linecap="round"/><path d="M126 122h48" stroke="#1d2b53" stroke-width="3"/><circle cx="62" cy="42" r="17" fill="#fff" stroke="#ff6b6b" stroke-width="4"/><g class="needle"><path d="M62 29l5 13h-10z" fill="#d93a50"/><path d="M62 55l-5-13h10z" fill="#1d2b53"/></g><g fill="#2bb3a3"><circle cx="22" cy="140" r="6"/><rect x="15" y="147" width="14" height="24" rx="7"/></g><g fill="#8a5cd0"><circle cx="44" cy="140" r="6"/><rect x="37" y="147" width="14" height="24" rx="7"/></g><g fill="#ff6b6b"><circle cx="66" cy="140" r="6"/><rect x="59" y="147" width="14" height="24" rx="7"/></g><g fill="#ffc93c"><circle cx="88" cy="140" r="6"/><rect x="81" y="147" width="14" height="24" rx="7"/></g><path d="M27 156h12M49 156h12M71 156h12" stroke="#1d2b53" stroke-width="3" stroke-linecap="round"/><path d="M232 152v-16M258 148v-24M288 144v-34" stroke="#2f8f5f" stroke-width="3"/><ellipse cx="226" cy="136" rx="7" ry="3.5" transform="rotate(-30 226 136)" fill="#4caf7a"/><ellipse cx="264" cy="124" rx="7" ry="3.5" transform="rotate(30 264 124)" fill="#4caf7a"/><circle cx="288" cy="106" r="8" fill="#ff6b6b"/><circle cx="288" cy="106" r="3" fill="#ffc93c"/></svg>';
var BG=[['Første skridt','👣',function(){return total()>=1}],['Stigma-opmærksom','🔍',function(){return pts('detektor')>=8}],['Selvrefleksion','🪞',function(){return pts('spejl')>=8}],['Anerkendende samtale','💬',function(){return pts('sim')>=9}],['Værdi-orienteret','🧭',function(){return pts('kompas')>=8}],['Teamrefleksion','🎭',function(){return pts('pandora')>=4}]];
function badges(){return BG.map(function(b){var on=b[2]();return'<span class="bdg'+(on?' on':'')+'" title="'+b[0]+'"><i aria-hidden="true">'+starIcon(b[0])+'</i>'+b[0]+(on?'':' (låst)')+'</span>'}).join('')}
function confetti(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;var cs=['#ffc93c','#ff6b6b','#2bb3a3','#8a5cd0','#4da3ff'];for(var i=0;i<36;i++){var s=document.createElement('span');s.className='cf';s.style.cssText='left:'+(10+Math.random()*80)+'vw;background:'+cs[i%5]+';animation-delay:'+(Math.random()*.4)+'s';document.body.appendChild(s);setTimeout(s.remove.bind(s),2800)}}
var DECO={pandora:['🎭','#ffb3c1'],barometer:['🌡️','#ffd86b'],detektor:['🔍','#8fe0d2'],spejl:['🪞','#c9b3f5'],kort:['🃏','#ffb68a'],autopilot:['🤖','#9fd3ff'],sim:['💬','#b8e986'],kompas:['🧭','#ffcf8a'],gps:['📍','#f6a6e0']};
var LV=[[0,'Nysgerrig'],[6,'Opmærksom'],[16,'Reflekterende'],[32,'Anerkendende'],[55,'Relationskompetent'],[85,'Recovery-orienteret']];
function long10(x){return String(x||'').trim().length>=10}
function pts(k){try{var a;
 if(k==='pandora'){a=S.pq||[];var n=0;a.forEach(function(q){n+=q.a.length});return Math.max(0,a.length-2)*2+n}
 if(k==='barometer'){var c=(S.bar||[]).filter(Boolean).length;return c+(c>=8?4:0)}
 if(k==='detektor')return (S.cs||0)*2+((S.ci||0)>=CASES.length?3:0);
 if(k==='spejl'){a=S.mir||{};return Object.keys(a).filter(function(i){return long10(a[i])}).length*2}
 if(k==='kort')return Math.min((S.kk||[]).length,4)*2;
 if(k==='autopilot'){a=S.ap||{c:[],n:''};return Math.min(a.c.length+(a.s||[]).length,4)+(long10(a.n)?4:0)}
 if(k==='sim')return S.sp||0;
 if(k==='kompas')return (S.kpd?8:0)+(S.kp&&S.kp.v?2:0);
 if(k==='gps'){var m=Object.keys(S.gps||{}).length;return m+(m>=5?3:0)}
}catch(e){}return 0}
function total(){return TOOLS.reduce(function(s,t){return s+pts(t[0])},0)}
function level(t){var i=0;LV.forEach(function(l,j){if(t>=l[0])i=j});var n=LV[i+1];return{i:i,name:LV[i][1],pct:n?Math.round((t-LV[i][0])/(n[0]-LV[i][0])*100):100,next:n?(n[0]-t)+' point til næste niveau: '+n[1]:'Du har nået det højeste niveau – tak for din refleksion!'}}
function stage(p){return p>=8?'🌻':p>=4?'🌿':p>=1?'🌱':'🌰'}
var tt;function toast(m){var e=document.getElementById('toast');e.textContent=m;e.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){e.classList.remove('show')},2200)}
function set(k,v){var b=total();S[k]=v;save();var a=total();if(a>b){level(a).i>level(b).i?(toast('🎉 Nyt niveau: '+level(a).name),confetti()):toast('⭐ +'+(a-b)+' point')}}

var TOOLS=[
['pandora','Pandoras æske','Stil et åbent refleksionsspørgsmål til det tværfaglige team.'],
['barometer','Stigma-barometer','Kortlæg stigmatiserende holdninger hos dig selv og i teamet.'],
['detektor','Stigmadetektoren','Identificér stigmatiserende sprog, handlinger og antagelser i cases.'],
['spejl','Stigmaspejlet','Reflektér over egne holdninger og forforståelser før mødet med patienten.'],
['kort','Billedekort','Støt patienten i at udtrykke følelser, relation og behov – sammen med patienten.'],
['autopilot','Min faglige autopilot','Reflektér over rutinepræget praksis og automatiske reaktioner.'],
['sim','Den svære samtale','Træn anerkendende kommunikation ved mistillid, afvisning af behandling, tilbagefald og konflikt.'],
['kompas','Livets kompasnål','Patientens vigtigste værdi som udgangspunkt for samtalen og journalføringen.'],
['gps','Relations-GPS','Vurdér den terapeutiske relation og planlæg næste kontakt.']
];

function home(){
 var t=total(),L=level(t);var h='<div class="hero"><div class="ht"><span class="kick">RecoveryNurse+</span><h1>Det hele</h1><em>menneske</em><p>Øvelser i anerkendelse, refleksion og relation – for dig og dit team. Styrk din recovery-orienterede og personcentrerede praksis.</p><button class="btn ghost" id="howb">Sådan bruger du appen</button></div>'+HSVG+'</div><div class="panel garden"><h3 style="margin:0 0 8px">Din faglige udvikling</h3><div class="row" style="justify-content:space-between"><b>'+L.name+'</b><span>⭐ '+t+' point</span></div><div class="road" role="img" aria-label="Niveau '+(L.i+1)+' af '+LV.length+'">'+LV.map(function(l,j){return'<span class="stp'+(j<=L.i?' on':'')+(j===L.i?' cur':'')+'"><i></i></span>'}).join('')+'</div><p class="small mut" style="margin:0">'+L.next+'</p><div class="gwrap"><div class="bedrow">'+beds()+'</div>'+AVATAR+'</div><p class="small mut" style="margin:8px 0 0">Hver plante er et redskab og vokser, når du bruger det: frø → spire → plante → blomst. Tryk på en plante eller et skilt for at åbne redskabet.<br><b>Point måler brug – ikke kompetence.</b> De viser, hvor meget du har øvet dig med redskaberne, og er ikke en vurdering af din faglighed.</p><div class="badges">'+badges()+'</div></div><div class="tiles">';
 TOOLS.forEach(function(x){h+='<button class="tile" style="--c:'+DECO[x[0]][1]+'" data-k="'+x[0]+'"><i class="st" aria-hidden="true">'+stage(pts(x[0]))+'</i><i class="em" aria-hidden="true">'+ill(x[0])+'</i><b>'+x[1]+'</b><span>'+x[2]+'</span>'+(x[0]==='kort'||x[0]==='kompas'?'<em class="tg">Sammen med patienten</em>':'')+'</button>'});
 h+='</div><div class="gdpr"><b>GDPR og tavshedspligt:</b> Prototypen gemmer kun data på din egen enhed og indeholder ingen patientoplysninger. Skriv aldrig navne, cpr-nr., fødselsdatoer eller andre personhenførbare oplysninger om patienter eller kolleger. Kollegatal i stigma-barometeret er eksempeldata.<br><button class="btn ghost" id="wipe" style="margin-top:8px">Slet alle mine data på denne enhed</button></div>';
 app.innerHTML=h;
 app.querySelectorAll('.tile').forEach(function(b){b.onclick=function(){open(b.dataset.k)}});app.querySelectorAll('.plt').forEach(function(b){b.onclick=function(){open(b.dataset.k)};b.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(b.dataset.k)}}});
}
function open(k){
 var t=TOOLS.filter(function(x){return x[0]===k})[0];
 app.innerHTML='<button class="back" id="bk">‹ Alle redskaber</button><div class="thead" style="--c:'+DECO[k][1]+'"><span class="big" aria-hidden="true">'+ill(k)+'</span><div><h2>'+t[1]+'</h2><p>'+t[2]+'</p></div></div>'+info(k)+'<div id="v"></div>';
 document.getElementById('bk').onclick=home;
 V[k](document.getElementById('v'));
 var sb=document.createElement('div');sb.className='panel savebar';sb.innerHTML='<p class="row" style="margin:0"><button class="btn" id="gem">💾 Gem mine svar</button><button class="btn ghost" id="gemtil">Gem og gå tilbage</button></p><p class="small mut" id="gemt" style="margin:8px 0 0">Dine svar gemmes automatisk på din enhed, mens du skriver. Knappen bekræfter, at alt er gemt.</p>';
 app.appendChild(sb);
 function gem(){var ae=document.activeElement;if(ae&&ae.blur)ae.blur();var d=new Date(),hh=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);document.getElementById('gemt').innerHTML='✅ <b>Gemt kl. '+hh+'</b> – du kan trygt gå tilbage.';toast('✅ Dine svar er gemt')}
 document.getElementById('gem').onclick=gem;document.getElementById('gemtil').onclick=function(){gem();setTimeout(home,500)};
 window.scrollTo(0,0);
}
var V={};
function flyLetter(pr,txt){
 var tgt=document.querySelector('.thead .big')||document.querySelector('.thead');if(!tgt||!pr)return;
 var tr=tgt.getBoundingClientRect(),sy=window.pageYOffset;
 var tx=tr.left+tr.width/2,ty=tr.top+sy+tr.height*.45;
 var W=pr.width,H=pr.height,cx=pr.left+W/2,cy=pr.top+H/2,D=2600;
 window.scrollTo({top:0,behavior:'smooth'});
 var im=new Image();
 im.onload=function(){go(im)};im.onerror=function(){go(null)};im.src=ASSETDIR+'brev.png';
 function go(img){
  var c=document.createElement('div');c.className='letter';
  c.style.cssText='left:'+pr.left+'px;top:'+pr.top+'px;width:'+W+'px;height:'+H+'px';
  c.innerHTML='<div class="lp">'+esc(txt)+'</div>';
  var m=document.createElement('div');m.className='mail';
  m.style.cssText='left:'+(cx-48)+'px;top:'+(cy-34)+'px';
  if(img){img.alt='';m.appendChild(img)}else m.innerHTML='<svg viewBox="0 0 64 46"><rect x="2" y="2" width="60" height="42" rx="5" fill="#fff" stroke="#1d2b53" stroke-width="2.5"/><path d="M4 6l28 22L60 6" fill="none" stroke="#d93a50" stroke-width="3" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);document.body.appendChild(m);
  if(!c.animate){c.remove();m.remove();return}
  var k=Math.min(.25,90/W),dx=tx-cx,dy=ty-cy;
  c.animate([{transform:'scale(1)',opacity:1},{transform:'scale(1)',opacity:1,offset:.08},{transform:'scale('+k+',.15) rotate(-4deg)',opacity:.9,offset:.34},{transform:'scale(.05)',opacity:0,offset:.42},{opacity:0}],{duration:D,easing:'ease-in-out',fill:'forwards'}).onfinish=function(){c.remove()};
  m.animate([
   {transform:'translate(0,0) scale(.2) rotate(-6deg)',opacity:0},
   {transform:'translate(0,0) scale(.2) rotate(-6deg)',opacity:0,offset:.28},
   {transform:'translate(0,0) scale(1) rotate(-6deg)',opacity:1,offset:.42},
   {transform:'translate('+dx*.35+'px,'+(dy*.5-50)+'px) scale(1.05) rotate(8deg)',opacity:1,offset:.6},
   {transform:'translate('+dx*.75+'px,'+(dy*.85-20)+'px) scale(.85) rotate(-6deg)',opacity:1,offset:.82},
   {transform:'translate('+dx+'px,'+dy+'px) scale(.25) rotate(0)',opacity:0}
  ],{duration:D,easing:'ease-in-out',fill:'forwards'}).onfinish=function(){m.remove()};
 }
}
/* 1 Pandoras æske */
V.pandora=function(r){var drop=false;
 var qs=g('pq',[{t:'Hvad gør vi, når en patient igen møder op påvirket – og hvad siger det om vores forventninger?',a:[],u:1},{t:'Hvilket ord i vores journaler ville vi ikke selv kunne lide at læse om os selv?',a:[],u:1}]);
 function draw(){
  var h='<div class="panel"><label for="nq">Dit refleksionsspørgsmål til gruppen</label><textarea id="nq" placeholder="Fx: Hvornår mister jeg troen på en patients forløb – og hvad sker der så i min måde at være på?"></textarea><p class="small mut">Formulér åbent og uden at pege på personer eller patienter.</p><button class="btn" id="post">Læg i æsken</button></div>';
    var ENV='<svg viewBox="0 0 64 46"><rect x="2" y="2" width="60" height="42" rx="5" fill="#fff" stroke="#1d2b53" stroke-width="2.5"/><path d="M4 6l28 22L60 6" fill="none" stroke="#d93a50" stroke-width="3" stroke-linejoin="round"/></svg>';
  function envImg(){return '<img src="'+ASSETDIR+'brev.png" alt="" onerror="this.outerHTML=\''+ENV.replace(/"/g,'&quot;')+'\'">'}
  qs.forEach(function(q,i){
   if(q.u){h+='<button class="panel unread" data-open="'+i+'" aria-label="Åbn ulæst refleksion"><span class="env">'+envImg()+'<i class="dot"></i></span><span><b>Ny refleksion fra teamet</b><br><span class="small mut">Tryk for at åbne brevet</span></span></button>';return}
   h+='<div class="panel readq"><span class="env read" title="Læst">'+envImg()+'</span><div class="qbody"><h3>'+esc(q.t)+'</h3>';
   q.a.forEach(function(a){h+='<div class="q small">'+esc(a)+'</div>'});
   h+='<div class="row q"><input type="text" id="a'+i+'" placeholder="Din refleksion" aria-label="Din refleksion"><button class="btn ghost" data-i="'+i+'">Svar</button></div></div></div>';
  });
  r.innerHTML=h;
  drop=false;r.querySelector('#post').onclick=function(){var v=r.querySelector('#nq').value.trim();if(v){var pr=r.querySelector('.panel').getBoundingClientRect();qs.unshift({t:v,a:[]});set('pq',qs);drop=true;draw();flyLetter(pr,v)}};
   r.querySelectorAll('[data-open]').forEach(function(b){b.onclick=function(){var i=+b.dataset.open;qs[i].u=0;set('pq',qs);draw();var n=r.querySelectorAll('.readq')[qs.slice(0,i+1).filter(function(x){return !x.u}).length-1];if(n)n.classList.add('pop')}});
  r.querySelectorAll('[data-i]').forEach(function(b){b.onclick=function(){var i=b.dataset.i,v=r.querySelector('#a'+i).value.trim();if(v){qs[i].a.push(v);set('pq',qs);draw()}}});
 }
 draw();
 r.insertAdjacentHTML('beforeend','<p class="note">Spørgsmål og svar ligger i denne version kun på din enhed. Til fælles brug i teamet skal appen kobles til en delt, driftsgodkendt database.</p>');
};

/* 2 Barometer */
var BAR=['Patienter med dobbeltdiagnose er sværere at samarbejde med end andre.','Hvis en patient bruger rusmidler igen, har vedkommende ikke rigtig lyst til at blive rask.','Jeg tror på, at alle patienter kan komme sig – også dem, der har mange tilbagefald.','Jeg tager patientens smerteudsagn lige så alvorligt som hos andre patienter.','Jeg bliver mere kontrollerende, når jeg ved, at der har været misbrug.','Jeg ved, hvad patienten selv mener er vigtigst i sit liv.','Når en patient afviser behandling, er det mest et tegn på manglende indsigt.','Jeg taler om patienten på samme måde, når han/hun er til stede, som når han/hun ikke er.'];
var REV=[0,0,1,1,0,1,0,1];
V.barometer=function(r){
 var a=g('bar',[]);
 var h='<div class="panel" id="dept"></div><p>Vurdér hvert udsagn ærligt: 1 = helt uenig, 5 = helt enig. Der er ingen rigtige svar – formålet er at blive opmærksom på egne holdninger og mønstre.</p>';
 BAR.forEach(function(t,i){h+='<div class="panel"><p><b>'+t+'</b></p><div class="scale" data-i="'+i+'">'+[1,2,3,4,5].map(function(n){return'<button data-n="'+n+'"'+(a[i]===n?' class="sel"':'')+'>'+n+' '+['🙅','🤨','🤔','🙂','💯'][n-1]+'</button>'}).join('')+'</div></div>'});
 h+='<div class="panel" id="res"></div>';
 r.innerHTML=h;
 function dept(){var own=0,ok=a.filter(Boolean).length>=8;if(ok){a.forEach(function(v,i){own+=REV[i]?6-v:v});own/=8}var cs=[2.1,2.8,3.2,2.5,3.6];if(ok)cs.push(own);var cm=cs.reduce(function(x,y){return x+y},0)/cs.length,p=g('pat',0),ps=p?6-p:0,tt=ps?(cm+ps)/2:cm,c=tt<2.4?0:tt<3.2?1:2,F=['😀','😐','😠'],CL=['#3fae6a','#ffc93c','#e0475a'],M=['Grøn: afdelingen viser et åbent og anerkendende klima.','Gul: der er områder med risiko for stigma. Tag dem op i teamet.','Rød: tydelige tegn på stigma. Prioritér fælles refleksion.'];
 function mb(l,x){return'<div class="mini"><span>'+l+'</span><div class="bar"><div style="width:'+Math.round((x-1)/4*100)+'%"></div></div></div>'}
 var h='<h3>Afdelingens stigmafarve</h3><div class="gw">'+gauge(tt)+'</div><p class="verdict" style="border-left:6px solid '+CL[c]+'"><b>'+M[c]+'</b></p>'+mb('Kolleger ('+cs.length+')',cm)+(ps?mb('Patienter',ps):'')+'<p class="small mut">Samlet af kollegernes svar og patientens vurdering. Kollegatal er eksempeldata i prototypen.</p><label>Patientens vurdering: „Jeg bliver mødt som et helt menneske“ (1 = slet ikke, 5 = helt)</label><div class="scale">'+[1,2,3,4,5].map(function(n){return'<button data-p="'+n+'"'+(p===n?' class="sel"':'')+'>'+n+'</button>'}).join('')+'</div>';
 var d=r.querySelector('#dept');d.innerHTML=h;d.querySelectorAll('[data-p]').forEach(function(b){b.onclick=function(){set('pat',+b.dataset.p);dept()}})}
 function res(){dept();
  var done=a.filter(Boolean).length,o='';
  if(done<BAR.length){r.querySelector('#res').innerHTML='<p class="mut">Besvar alle udsagn ('+done+'/'+BAR.length+') for at se dit barometer.</p>';return}
  var tot=0,hot=[];
  BAR.forEach(function(t,i){var s=REV[i]?6-a[i]:a[i];tot+=s;if(s>=4)hot.push(t)});
  var avg=tot/BAR.length,pct=Math.round((avg-1)/4*100);
  var zi=avg<2.3?0:avg<3.2?1:2,ZC=['#3fae6a','#ffc93c','#e0475a'],ZT=['Du ligger til venstre: dine svar peger overvejende på en åben, anerkendende og recovery-orienteret holdning. Vær fortsat nysgerrig på, hvor implicitte antagelser alligevel kan påvirke din praksis.','Du ligger i midten: dine svar viser både anerkendende holdninger og områder, hvor stigmatiserende antagelser kan påvirke din praksis. Se nærmere på de udsagn, der slog højest ud.','Du ligger til højre: flere af dine svar peger på, at stigmatiserende holdninger kan påvirke mødet med patienten. Det er ikke en dom over dig, men et godt udgangspunkt for refleksion og dialog i teamet.'];
  o='<h3>Dit barometer</h3><div class="bar" role="img" aria-label="'+pct+' procent" style="position:relative;overflow:visible"><div style="width:'+pct+'%"></div><span style="position:absolute;left:'+pct+'%;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:#fff;border:4px solid '+ZC[zi]+';box-shadow:0 1px 4px rgba(0,0,0,.3)"></span></div><div class="small" style="display:flex;justify-content:space-between;margin:6px 0 8px"><span>◀ Venstre: anerkendende og recovery-orienteret</span><span>Højre: stigmatiserende holdninger ▶</span></div><p class="verdict" style="border-left:6px solid '+ZC[zi]+'"><b>Konklusion ('+pct+'% mod højre):</b> '+ZT[zi]+'</p><p class="small mut">Jo længere mod højre, jo flere udsagn, hvor stigmatiserende holdninger kan påvirke mødet med patienten. Resultatet er et udgangspunkt for refleksion – ikke en test eller en vurdering af din faglighed.</p>';
  o+=hot.length?'<p><b>Disse udsagn pegede mest mod stigmatiserende holdninger:</b></p><ul>'+hot.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul><p>Tag dem med i Stigmaspejlet eller stil dem som spørgsmål i Pandoras æske.</p>':'<p>Ingen udsagn slår kraftigt ud. Overvej alligevel: hvor ville andre i teamet svare anderledes end dig?</p>';
  r.querySelector('#res').innerHTML=o;
 }
 r.querySelectorAll('.scale').forEach(function(sc){sc.querySelectorAll('button').forEach(function(b){b.onclick=function(){a[sc.dataset.i]=+b.dataset.n;set('bar',a);sc.querySelectorAll('button').forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');res()}})});
 res();
};

/* 3 Detektor */
var CASES=[
{ty:'Formulering i journal',t:'„Patienten er manipulerende og non-compliant.“',o:['„Patienten har ikke taget medicin i tre dage og siger, at bivirkningerne er for generende.“','„Patienten er svær at samarbejde med.“','„Patienten er ikke motiveret for behandling.“'],c:0,e:'Det første er observerbart og viser patientens egen forklaring. De andre erstatter fakta med karakteristik, som lukker for nysgerrighed.'},
{ty:'Handling',t:'En patient beder om smertestillende. Sygeplejersken tænker „han er jo afhængig“ og lader ham vente længere end andre.',o:['Vurdere smerter systematisk som hos alle andre, og drøfte bekymringer åbent med lægen.','Give det, han beder om, for at undgå konflikt.','Vente og se, om han opgiver.'],c:0,e:'Antagelsen om, at patienten overdriver, kan give undervurderet smerte. Ens procedure og åben dialog beskytter både patient og relation.'},
{ty:'Implicit stigmatisering',t:'„Han er en af vores faste gæster.“',o:['Det er en sød og neutral bemærkning.','Det sætter patienten i en rolle som tilbagevendende problem og kan sænke forventningerne til ham.','Det er kun et problem, hvis patienten hører det.'],c:1,e:'Ord som „fast gæst“ og „drejedørspatient“ gør forløbet til patientens fejl. Det påvirker, hvor meget håb og tid han mødes med.'},
{ty:'Handling',t:'Før samtalen gennemgår sygeplejersken først al historik om misbrug og voldelige episoder – og møder patienten med den i baghovedet.',o:['Starte med et åbent spørgsmål om, hvad der er vigtigt for patienten lige nu.','Springe al historik over.','Begynde med at konfrontere patienten med tidligere episoder.'],c:0,e:'Historik er vigtig for sikkerhed, men må ikke være første linse. Start med mennesket, og lad historikken supplere.'}];
V.detektor=function(r){
 var i=g('ci',0),sc=g('cs',0);
 function draw(){
  if(i>=CASES.length){r.innerHTML='<div class="panel"><h3>Du har været igennem alle cases</h3><p>Du fandt '+sc+' af '+CASES.length+' ved første forsøg. Det vigtigste er samtalen bagefter: hvilke ligner jeres hverdag?</p><button class="btn" id="rs">Start forfra</button></div>';r.querySelector('#rs').onclick=function(){i=0;sc=0;set('ci',0);set('cs',0);draw()};return}
  var c=CASES[i];
  r.innerHTML='<div class="panel"><span class="tag">'+c.ty+' · case '+(i+1)+' af '+CASES.length+'</span><p><b>'+c.t+'</b></p><p class="small"><b>Spørgsmål:</b> '+c.q+'</p><div id="os">'+c.o.map(function(o,j){return'<button class="opt" data-j="'+j+'">'+o+'</button>'}).join('')+'</div><div id="fb"></div></div>';
  r.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){
   var j=+b.dataset.j,ok=j===c.c;if(ok)sc++;
   r.querySelectorAll('.opt').forEach(function(x){x.disabled=true});
   r.querySelector('#fb').innerHTML='<div class="fb '+(ok?'ok':'bad')+'"><b>'+(ok?'🔍 Godt set! +2 point.':'🤔 Ikke helt.')+'</b> '+(ok?'':'Det bedste svar var: <i>'+c.o[c.c]+'</i>. ')+c.e+'</div><p><button class="btn" id="nx">'+(i+1<CASES.length?'Næste case':'Se resultat')+'</button></p>';
   r.querySelector('#nx').onclick=function(){i++;set('ci',i);set('cs',sc);draw()};
  }});
 }
 draw();
};

/* 4 Spejl */
var MIR=['Hvilken patientgruppe eller diagnose gør mig mest utålmodig eller mismodig? Hvor kommer det fra?','Hvad forventer jeg på forhånd af en patient med dobbeltdiagnose? Hvad ville der ske, hvis det var forkert?','Hvilke ord bruger jeg om patienter, når de ikke er til stede?','Hvornår ændrer jeg stemme, tempo eller kropssprog i mødet med denne patient?','Hvad ville patienten sige, at jeg ser hos ham eller hende – og hvad ser jeg ikke?','Hvad vil jeg gøre anderledes i morgen i ét konkret møde?'];
V.spejl_old=function(r){
 var a=g('mir',{});
 var h='<p>Tag et konkret møde eller en konkret patient i tankerne (uden at nævne navn). Skriv kort – dine svar bliver på din enhed.</p>';
 MIR.forEach(function(q,i){h+='<div class="panel"><label for="m'+i+'">'+q+'</label><textarea id="m'+i+'">'+esc(a[i]||'')+'</textarea></div>'});
 r.innerHTML=h;
 MIR.forEach(function(q,i){r.querySelector('#m'+i).oninput=function(e){a[i]=e.target.value;set('mir',a)}});
};

/* 5 Billedekort */
var KORT={'Følelser':[['😔','Trist'],['😠','Vred'],['😰','Bange'],['😶','Tom'],['😌','Rolig'],['😊','Glad']],'Os imellem':[['🧱','En mur'],['🤝','Vi samarbejder'],['👀','Jeg bliver overvåget'],['🌉','En bro er ved at blive bygget'],['🚪','Jeg vil væk'],['🫶','Jeg bliver set']],'Behov':[['⏳','Tid'],['🔇','Ro'],['💬','At blive hørt'],['🧭','Medbestemmelse'],['👪','Min familie'],['🌱','Håb']]};
V.kort_old=function(r){
 var sel=g('kk',[]);
 var h='<p>Sig det uden at sige det: Lad patienten pege på det eller de kort, der passer bedst lige nu. Spørg derefter nysgerrigt: <i>„Fortæl mig om det kort.“</i></p>';
 Object.keys(KORT).forEach(function(c){h+='<h3>'+c+'</h3><div class="cards">'+KORT[c].map(function(k){var id=c+'|'+k[1];return'<button class="card'+(sel.indexOf(id)>-1?' sel':'')+'" data-id="'+id+'" aria-pressed="'+(sel.indexOf(id)>-1)+'"><i>'+k[0]+'</i>'+k[1]+'</button>'}).join('')+'</div>'});
 h+='<div class="panel" style="margin-top:16px" id="sm"></div>';
 r.innerHTML=h;
 function sm(){r.querySelector('#sm').innerHTML=sel.length?'<h3>Valgt i dag</h3><p>'+sel.map(function(s){return esc(s.split('|')[1])}).join(', ')+'</p><p class="small mut">Spørg: „Hvad er det ved det kort?“ · „Hvornår havde du sidst det sådan?“ · „Hvad ville hjælpe, at jeg gør?“</p>':'<p class="mut">Ingen kort valgt endnu.</p>'}
 r.querySelectorAll('.card').forEach(function(b){b.onclick=function(){var id=b.dataset.id,x=sel.indexOf(id);if(x>-1)sel.splice(x,1);else sel.push(id);b.classList.toggle('sel');b.setAttribute('aria-pressed',x<0);set('kk',sel);sm()}});
 sm();
};

/* 6 Autopilot */
var AUTO=['Jeg tjekker patientens rusmiddelhistorik, før jeg hilser.','Jeg stiller lukkede spørgsmål, fordi det går hurtigere.','Jeg siger „vi aftalte jo…“, når patienten afviger.','Jeg tolker en afvisning som manglende motivation.','Jeg skriver journal, mens patienten taler.','Jeg løber mere, når en patient er svær at nå.','Jeg undgår at spørge ind til tilbagefald.','Jeg overtager beslutninger for at holde dagens plan.'];
V.autopilot_old=function(r){
 var a=g('ap',{c:[],n:''});
 var h='<p>Sæt kryds ved det, der ligner dig i en travl vagt. Autopilot er ikke en fejl – den sparer energi. Men den bør være noget, du vælger til.</p><div class="panel">';
 AUTO.forEach(function(t,i){h+='<label style="font-weight:400"><input type="checkbox" data-i="'+i+'"'+(a.c.indexOf(i)>-1?' checked':'')+'> '+t+'</label>'});
 h+='</div><div class="panel"><label for="an">Den rutine, jeg vil sætte på pause i denne uge – og hvad jeg gør i stedet</label><textarea id="an">'+esc(a.n)+'</textarea></div>';
 r.innerHTML=h;
 r.querySelectorAll('[type=checkbox]').forEach(function(b){b.onchange=function(){var i=+b.dataset.i,x=a.c.indexOf(i);if(b.checked&&x<0)a.c.push(i);if(!b.checked&&x>-1)a.c.splice(x,1);set('ap',a)}});
 r.querySelector('#an').oninput=function(e){a.n=e.target.value;set('ap',a)};
};

/* 7 Simulator */
var SIM=[
{t:'Mistillid',p:'Jeg stoler ikke på jer. Alt, jeg siger, ender i min journal.',o:[['„Det er reglerne.“','Afslutter samtalen og gør patienten mindre til deltager.',0,'Så er der ikke noget at tale om.'],['„Det kan du roligt stole på, vi har tavshedspligt.“','Tavshedspligt er rigtigt, men beroligelsen overser, at patienten har ret i, at der noteres. Det kan øge mistilliden.',1,'Ja, men I skriver det jo ned alligevel.'],['„Det er rigtigt, vi skriver i journalen. Skal vi se på, hvad jeg skriver, så du kan sige til, hvis noget er forkert?“','Anerkender og tilbyder medbestemmelse. Det opbygger tillid gennem åbenhed.',2,'Tak. Det er første gang, nogen har spurgt.']],f:'Tak. Det er første gang, nogen har spurgt.'},
{t:'Afvisning af behandling',p:'Jeg tager ikke den medicin mere. Det gør mig til en zombie.',o:[['„Uden den bliver du indlagt igen.“','Truer og antager det værste. Det kan skabe modstand.',0,'Så skal I bare tvinge mig, ikke?'],['„Så er det dit valg, men vi skriver, at du afviser.“','Respekterer valget, men uden nysgerrighed efter årsagen og uden at tilbyde alternativer.',1,'Fint. Så er det ikke mit problem længere.'],['„Fortæl mig, hvad der er sværest ved at være på den. Hvad vil du gerne have mere af i dit liv?“','Åbner for patientens oplevelse og værdier og for en samtale med lægen om bivirkninger, uden at give op på behandlingen.',2,'Jeg kan ikke mærke noget. Jeg vil bare være mig selv igen.']],f:''},
{t:'Tilbagefald',p:'Jeg har taget stoffer igen i weekenden. Nu er det hele ødelagt, ikke?',o:[['„Vi må justere din plan med flere kontroller.“','Ensidig kontrol uden at forstå, hvad der skete, kan forstærke følelsen af mistro.',1,'Så nu er jeg bare under mistanke igen.'],['„Nej, det er ikke ødelagt. Tak, fordi du siger det. Hvad skete der op til weekenden?“','Anerkender ærligheden og normaliserer tilbagefald som en del af recovery uden at bagatellisere. Sikkerhed og plan kan drøftes bagefter.',2,'Jeg troede, I ville blive vrede.'],['„Det er ærgerligt, du var jo så godt på vej.“','Kan forstærke skam og tanken om at have fejlet.',0,'Ja … så er det nok lige meget alligevel.']],f:''},
{t:'Konflikt',p:'Du lyver! Du sagde, jeg måtte komme hjem i dag!',o:[['„Det har jeg aldrig sagt.“','Fastholder sin version og optrapper.',0,'Nu lyver du igen! Jeg vil tale med lægen!'],['„Jeg kan høre, du er rigtig vred, og at du forstod noget andet. Lad os finde ud af, hvad der blev sagt.“','Anerkender følelsen og søger fælles forståelse i stedet for at forsvare sig.',2,'Okay … Jeg blev bare så skuffet.'],['„Nu skal du falde ned, ellers kan vi ikke tale.“','Kræver ro uden at anerkende følelsen bag.',0,'Sig ikke, jeg skal falde ned!']],f:''},
{t:'Urinprøve',p:'Skal jeg igen aflevere en urinprøve? Stoler I slet ikke på mig?',o:[['„Det gælder alle efter udgang og er ikke et udtryk for mistillid til dig. Jeg fortæller dig resultatet, og vi taler om det sammen.“','Forklarer begrundelsen, normaliserer proceduren og inddrager patienten. Det styrker samarbejdet.',2,'Okay. Det er lidt mindre ubehageligt, når I siger det sådan.'],['„Det er bare en rutine.“','Forklarer ikke hvorfor og kan opleves afvisende.',1,'Det plejer folk at sige, når de ikke vil svare.'],['„Hvis du ikke har noget at skjule, er det jo ikke noget problem.“','Mistænkeliggør og lægger skylden hos patienten.',0,'Så I tror, jeg har noget at skjule.']],f:''},
{t:'Uro om natten',p:'Jeg kan ikke sove. Jeg skal have en ekstra sovepille, ellers går jeg helt i panik.',o:[['„Der er jeg nødt til at sige nej. Du har fået din dosis.“','Fastholder ordinationen, men uden at undersøge bekymringen bag. Kan føles som afvisning.',1,'Så må jeg bare ligge her og gå i stykker.'],['„Du ved godt, at du ikke må få flere piller. Så er det bare sådan.“','Tillægger patienten en hensigt og afslutter dialogen.',0,'Så kan I jo bare lade mig være.'],['„Det lyder rigtig hårdt. Hvad sker der, når du ligger og ikke kan sove? Jeg tjekker ordinationen og kontakter lægen, hvis det er nødvendigt – og imens kan vi se på, hvad der ellers kan hjælpe.“','Anerkender oplevelsen, undersøger bekymringen og handler inden for ordinationen. Inddrager læge og alternativer.',2,'Det er mest tankerne. Det hjælper, at du bliver og snakker lidt.']],f:''}];
V.sim=function(r){
 function menu(){
  r.innerHTML='<p>Vælg en situation. Du får et udsagn fra patienten og tre mulige svar. Træn flere gange – og læs feedbacken, også ved de svar, du ikke ville vælge.</p><div class="simlist">'+SIM.map(function(s,i){return'<button class="simbtn" data-i="'+i+'"><b>'+s.t+'</b></button>'}).join('')+'</div>';
  r.querySelectorAll('.simbtn').forEach(function(b){b.onclick=function(){run(SIM[b.dataset.i])}});
 }
 function run(s){
  r.innerHTML='<div class="panel"><span class="tag">'+s.t+'</span><p><b>Patienten:</b> „'+s.p.replace(/^["„]|["“]$/g,'')+'“</p><p class="mut small">Hvordan svarer du?</p><div>'+s.o.map(function(o,j){return'<button class="opt" data-j="'+j+'">'+o[0]+'</button>'}).join('')+'</div><div id="fb"></div></div>';
  r.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){
   var o=s.o[b.dataset.j];set('sp',g('sp',0)+(o[2]===2?3:1));r.querySelectorAll('.opt').forEach(function(x){x.disabled=true});b.classList.add('sel');
   r.querySelector('#fb').innerHTML='<div class="fb '+(o[2]===2?'ok':o[2]===1?'neu':'bad')+'">'+(o[2]===2?'🌟 +3 point · ':'🌱 +1 point · ')+o[1]+'</div>'+'<p class="mut small" style="margin-top:10px">Patienten reagerer: „'+(o[3]||s.f)+'“</p>'+'<p class="row"><button class="btn" id="ag">Prøv igen</button><button class="btn ghost" id="mn">Andre situationer</button></p>';
   r.querySelector('#ag').onclick=function(){run(s)};r.querySelector('#mn').onclick=menu;
  }});
 }
 menu();
};

/* 8 Kompasnål */
var VAL=['Familie','Frihed','Tryghed','Arbejde','Natur','Børn','Tro','Venner','Kreativitet','Respekt','Sundhed','Ærlighed'];
V.kompas_old=function(r){
 var a=g('kp',{v:'',w:'',o:'',c:false});
 var h='<p>Den fysiske kompasnål er en lille genstand, patienten vælger til sin vigtigste værdi. Den kan ligge på bordet i samtalen: <i>„Hvad gør det til den vigtigste for dig?“</i></p><div class="panel"><label>Værdi</label><div class="chips" id="vc">'+VAL.map(function(v){return'<button class="chip'+(a.v===v?' sel':'')+'">'+v+'</button>'}).join('')+'</div>';
 h+='<label for="cv">Eller patientens egen værdi</label><input type="text" id="cv" value="'+(VAL.indexOf(a.v)<0?esc(a.v):'')+'"><label for="cw">Patientens egne ord om, hvorfor</label><textarea id="cw">'+esc(a.w)+'</textarea><label for="co">Genstand (fx sten, nøgle, fjer)</label><input type="text" id="co" value="'+esc(a.o)+'"></div>';
 h+='<div class="panel"><h3>Journalføring</h3><p class="small">Ja – som patientens egne ord og værdi, ikke som sygeplejerskens vurdering. Det kan gøre forløbet personligt og give kolleger en fælles retning. Det forudsætter patientens samtykke, og at I følger lokal journalpraksis.</p><label style="font-weight:400"><input type="checkbox" id="cc"'+(a.c?' checked':'')+'> Patienten har givet samtykke til, at det noteres</label><p><button class="btn" id="mk">Lav journaltekst</button></p><textarea id="jt" readonly aria-label="Journaltekst" style="display:none"></textarea><p class="small mut" id="cm"></p></div>';
 r.innerHTML=h;
 function pick(v){a.v=v;set('kp',a);r.querySelectorAll('.chip').forEach(function(c){c.classList.toggle('sel',c.textContent===v)})}
 r.querySelectorAll('.chip').forEach(function(c){c.onclick=function(){r.querySelector('#cv').value='';pick(c.textContent)}});
 r.querySelector('#cv').oninput=function(e){pick(e.target.value);r.querySelectorAll('.chip').forEach(function(c){c.classList.remove('sel')})};
 r.querySelector('#cw').oninput=function(e){a.w=e.target.value;set('kp',a)};
 r.querySelector('#co').oninput=function(e){a.o=e.target.value;set('kp',a)};
 r.querySelector('#cc').onchange=function(e){a.c=e.target.checked;set('kp',a)};
 r.querySelector('#mk').onclick=function(){
  var t=r.querySelector('#jt'),m=r.querySelector('#cm');
  if(!a.c){m.textContent='Sæt kryds ved samtykke først.';return}
  if(!a.v){m.textContent='Vælg eller skriv en værdi.';return}
  t.value='Patientens livskompas (i patientens egne ord): Vigtigste værdi: '+a.v+'.'+(a.w?' Patienten siger: „'+a.w+'“.':'')+(a.o?' Symbolsk genstand: '+a.o+'.':'')+' Noteret med patientens samtykke. Bruges som udgangspunkt for samtaler om mål og behandling.';
  t.style.display='block';t.select();set('kpd',true);m.textContent='Markér og kopiér teksten ind i journalen. Direkte overførsel kræver kobling til jeres journalsystem.';
 };
};

/* 9 GPS */
var GPS=[['Tid','Har patienten oplevet, at jeg har tid til at lytte uden at skulle videre?','Afsæt fx 10 minutter uden afbrydelser, og sig tydeligt, hvor lang tid I har.'],['Tydelighed','Ved patienten, hvad der skal ske, hvorfor, og hvad der skrives?','Forklar næste skridt, og spørg: „Hvad er uklart for dig?“'],['Anerkendelse','Har patienten fået at vide, hvad der virker, og er vedkommende blevet mødt i sin oplevelse?','Spejl en konkret styrke eller anstrengelse, du har set.'],['Medbestemmelse','Har patienten haft reel indflydelse på noget i dag?','Tilbyd et valg, fx tid, sted eller rækkefølge.'],['Tillid','Har patienten oplevet, at jeg holder det, jeg lover – også de små ting?','Gør én lille ting nøjagtigt, som aftalt, og sig det højt.']];
V.gps_old=function(r){
 var a=g('gps',{});
 var h='<p>Vurdér ud fra din fornemmelse af relationen til patienten lige nu. Relations-GPS’en viser, hvor du kan justere din indsats.</p>';
 GPS.forEach(function(q,i){h+='<div class="panel"><h3>'+q[0]+'</h3><p>'+q[1]+'</p><div class="scale" data-i="'+i+'">'+[['Ja',3],['Delvist',2],['Nej',1]].map(function(o){return'<button data-n="'+o[1]+'"'+(a[i]===o[1]?' class="sel"':'')+'>'+o[0]+'</button>'}).join('')+'</div></div>'});
 h+='<div class="panel" id="rt"></div>';
 r.innerHTML=h;
 function rt(){
  var low=GPS.filter(function(q,i){return a[i]&&a[i]<3});
  var n=Object.keys(a).length,o='';
  if(n<GPS.length)o='<p class="mut">Besvar alle fem pejlemærker ('+n+'/'+GPS.length+').</p>';
  else if(!low.length)o='<h3>Stabil relation</h3><p>Relationen ser ud til at have et stabilt fundament. Hold fast i det, der virker, og spørg patienten, hvad der skal fortsætte.</p>';
  else o='<h3>Forslag til næste kontakt</h3>'+low.map(function(q){var i=GPS.indexOf(q);return'<p><b>'+q[0]+(a[i]===1?' (mangler)':' (delvist)')+':</b> '+q[2]+'</p>'}).join('');
  r.querySelector('#rt').innerHTML=o;
 }
 r.querySelectorAll('.scale').forEach(function(sc){sc.querySelectorAll('button').forEach(function(b){b.onclick=function(){a[sc.dataset.i]=+b.dataset.n;set('gps',a);sc.querySelectorAll('button').forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');rt()}})});
 rt();
};
var BOXSVG='<svg viewBox="0 0 260 190" role="img" aria-label="Pandoras æske med lys, hvor brevene lægges i"><defs><radialGradient id="gl"><stop offset="0" stop-color="#fff3b0"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient></defs><g class="glow"><ellipse cx="130" cy="86" rx="120" ry="76" fill="url(#gl)"/><path d="M92 104L48 8h164l-44 96z" fill="#fff3b0" opacity=".45"/></g><ellipse cx="130" cy="104" rx="58" ry="11" fill="#ffe27a"/><g id="lt"><rect x="112" y="40" width="36" height="26" rx="3" fill="#fff" stroke="#1d2b53" stroke-width="2"/><path d="M112 42l18 14 18-14" fill="none" stroke="#d93a50" stroke-width="2"/></g><rect x="70" y="104" width="120" height="68" rx="9" fill="#d93a50"/><rect x="62" y="98" width="136" height="14" rx="6" fill="#ff6b6b"/><path d="M100 148h60" stroke="#ffc93c" stroke-width="4" stroke-linecap="round"/><circle cx="130" cy="132" r="7" fill="#ffc93c"/></svg>';
function fc(c,m,b){return'<circle cx="24" cy="24" r="19" fill="'+c+'"/><circle cx="17.5" cy="21" r="2.2" fill="#1d2b53"/><circle cx="30.5" cy="21" r="2.2" fill="#1d2b53"/><g stroke="#1d2b53" stroke-width="2.5" fill="none" stroke-linecap="round">'+m+b+'</g>'}
var IC={'Trist':fc('#9fd3ff','<path d="M17 34q7-7 14 0"/>','<path d="M13 15l7 3M35 15l-7 3"/>'),'Vred':fc('#ff8a8a','<path d="M17 34q7-5 14 0"/>','<path d="M13 14l8 5M35 14l-8 5"/>'),'Bange':fc('#c9b3f5','<ellipse cx="24" cy="34" rx="3" ry="4"/>','<path d="M13 16q4-4 8 0M27 16q4-4 8 0"/>'),'Tom':fc('#cfd8dc','<path d="M18 33h12"/>',''),'Rolig':fc('#8fe0d2','<path d="M18 31q6 4 12 0"/>',''),'Glad':fc('#ffd86b','<path d="M15 29q9 10 18 0"/>',''),
'En mur':'<g fill="#ff9d76" stroke="#1d2b53" stroke-width="2"><rect x="5" y="8" width="18" height="10"/><rect x="25" y="8" width="18" height="10"/><rect x="5" y="20" width="9" height="10"/><rect x="16" y="20" width="18" height="10"/><rect x="36" y="20" width="7" height="10"/><rect x="5" y="32" width="18" height="10"/><rect x="25" y="32" width="18" height="10"/></g>',
'Vi samarbejder':'<circle cx="14" cy="14" r="6" fill="#2bb3a3"/><rect x="8" y="21" width="12" height="20" rx="6" fill="#2bb3a3"/><circle cx="34" cy="14" r="6" fill="#ff6b6b"/><rect x="28" y="21" width="12" height="20" rx="6" fill="#ff6b6b"/><path d="M19 29h10" stroke="#1d2b53" stroke-width="3" stroke-linecap="round"/>',
'Jeg bliver overvåget':'<path d="M3 24q21-20 42 0q-21 20-42 0z" fill="#fff" stroke="#1d2b53" stroke-width="2.5"/><circle cx="24" cy="24" r="8" fill="#8a5cd0"/><circle cx="24" cy="24" r="3.5" fill="#1d2b53"/>',
'En bro er ved at blive bygget':'<path d="M3 34q21-30 42 0" stroke="#1d2b53" stroke-width="3.5" fill="none"/><path d="M12 24v14M24 17v21M36 24v14" stroke="#ff9d76" stroke-width="3"/><path d="M2 40h44" stroke="#4da3ff" stroke-width="4"/>',
'Jeg vil væk':'<rect x="8" y="6" width="20" height="36" rx="2" fill="#ffd86b" stroke="#1d2b53" stroke-width="2.5"/><circle cx="23" cy="25" r="1.8" fill="#1d2b53"/><path d="M30 24h13M38 18l6 6-6 6" stroke="#d93a50" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
'Jeg bliver set':'<path d="M24 41C8 29 5 20 10 13c4-5 11-3 14 2 3-5 10-7 14-2 5 7 2 16-14 28z" fill="#ff6b6b" stroke="#1d2b53" stroke-width="2.5"/>',
'Tid':'<circle cx="24" cy="24" r="18" fill="#fff" stroke="#1d2b53" stroke-width="3"/><path d="M24 12v12l8 5" stroke="#d93a50" stroke-width="3" fill="none" stroke-linecap="round"/>',
'Ro':'<path d="M32 8a16 16 0 1 0 8 24 14 14 0 0 1-8-24z" fill="#ffd86b" stroke="#1d2b53" stroke-width="2.5"/><path d="M10 12l1.5 3.5L15 17l-3.5 1.5L10 22l-1.5-3.5L5 17l3.5-1.5z" fill="#8a5cd0"/>',
'At blive hørt':'<rect x="4" y="6" width="26" height="18" rx="8" fill="#9fd3ff" stroke="#1d2b53" stroke-width="2.5"/><rect x="18" y="22" width="26" height="18" rx="8" fill="#ffb3c1" stroke="#1d2b53" stroke-width="2.5"/>',
'Medbestemmelse':'<path d="M24 6v38" stroke="#1d2b53" stroke-width="3"/><path d="M24 10h14l4 4-4 4H24z" fill="#2bb3a3" stroke="#1d2b53" stroke-width="2"/><path d="M24 22H10l-4 4 4 4h14z" fill="#ffc93c" stroke="#1d2b53" stroke-width="2"/>',
'Min familie':'<circle cx="14" cy="14" r="5" fill="#2bb3a3"/><rect x="8" y="20" width="12" height="20" rx="6" fill="#2bb3a3"/><circle cx="34" cy="14" r="5" fill="#8a5cd0"/><rect x="28" y="20" width="12" height="20" rx="6" fill="#8a5cd0"/><circle cx="24" cy="26" r="4" fill="#ffc93c"/><rect x="19" y="31" width="10" height="13" rx="5" fill="#ffc93c"/>',
'Håb':'<path d="M24 42V24" stroke="#2f8f5f" stroke-width="3.5"/><path d="M24 26C14 26 10 18 11 11c8 0 13 5 13 15z" fill="#4caf7a" stroke="#1d2b53" stroke-width="2"/><path d="M24 22c0-7 5-12 13-12 1 7-3 12-13 12z" fill="#8fe0a0" stroke="#1d2b53" stroke-width="2"/><path d="M12 42h24" stroke="#b98660" stroke-width="4" stroke-linecap="round"/>'};
V.kort=function(r){V.kort_old(r);r.querySelectorAll('.card').forEach(function(b){var l=b.dataset.id.split('|')[1];b.querySelector('i').innerHTML='<svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true">'+(IC[l]||'')+'</svg>'})};
 tryImg('spejl-ramme',function(){var m=r.querySelector('.mirror');if(!m||m.querySelector('.mimg'))return;m.classList.add('png');m.insertAdjacentHTML('afterbegin','<img class="mimg" src="assets/spejl-ramme.png" alt="">')});
 
 V.spejl=function(r){var a=g('mir',{}),i=0;
 function draw(){r.innerHTML='<div class="mirror" aria-live="polite"><span class="mq">'+MIR[i]+'</span><small>Spørgsmål '+(i+1)+' af '+MIR.length+'</small></div><div class="panel"><label for="ma">Dit svar – kun for dig</label><textarea id="ma">'+esc(a[i]||'')+'</textarea><p class="row"><button class="btn ghost" id="pv"'+(i?'':' disabled')+'>Forrige</button><button class="btn" id="nx">'+(i<MIR.length-1?'Næste spørgsmål':'Færdig')+'</button></p></div>';
  ;(function(){var m=r.querySelector('.mirror');if(m&&!m.querySelector('.dekor'))m.insertAdjacentHTML('beforeend','<img class="dekor dk1" src="assets/dekor-sommerfugle.png" alt="" onerror="this.remove()"><img class="dekor dk2" src="assets/dekor-blomster.png" alt="" onerror="this.remove()">')})();
  tryImg('spejl-ramme',function(im){var m=r.querySelector('.mirror');if(!m||m.querySelector('.mimg'))return;m.classList.add('png');im.className='mimg';im.alt='';m.insertBefore(im,m.firstChild)});
  r.querySelector('#ma').oninput=function(e){a[i]=e.target.value;set('mir',a)};
 r.querySelector('#pv').onclick=function(){i--;draw()};
 r.querySelector('#nx').onclick=function(){if(i<MIR.length-1){i++;draw()}else toast('🪞 Tak for din ærlighed')}}
 draw()};
var ALT=['Tag en indånding og stil ét åbent spørgsmål','Sig højt, hvad jeg ser, og spørg om jeg har ret','Giv to minutter til kun at lytte','Spørg patienten, hvad der er vigtigst lige nu'];
V.autopilot=function(r){var a=g('ap',{c:[],n:''});a.p=a.p||{};a.s=a.s||[];var i=0,m=0;
 function draw(){var tk=a.c.length,sk=a.s.length,pc=Math.round((AUTO.length-tk-sk)/AUTO.length*100),h='<div class="panel cockpit"><span class="lamp '+(tk+sk>=AUTO.length?'off':'on')+'"></span><div><b>Autopilot (rutinepræget praksis): '+pc+'% tændt</b><div class="bar"><div style="width:'+pc+'%"></div></div><small class="mut">Hver rutine, du tager styringen over, sænker autopiloten – og det gør hver rutine, der ikke ligner dig. „Ikke mig“ er en god nyhed.</small></div></div>';
 if(i>=AUTO.length)h+='<div class="panel flight"><h3>Landing</h3><p>Du har taget styringen på '+tk+' af '+AUTO.length+' rutiner'+(sk?', og '+sk+' ligner ikke dig – det er en god og personcentreret tilgang':'')+'.</p>'+Object.keys(a.p).map(function(k){return'<p class="small">• '+esc(AUTO[k])+' → <b>'+esc(a.p[k])+'</b></p>'}).join('')+'<button class="btn" id="rs">Flyv igen</button></div>';
 else if(!m)h+='<div class="panel flight"><span class="tag">Rutine '+(i+1)+' af '+AUTO.length+'</span><p class="q">'+AUTO[i]+'</p><div class="row"><button class="btn" id="me">Det er mig</button><button class="btn ghost" id="sk">Ikke mig</button></div></div>';
 else h+='<div class="panel flight"><p><b>'+AUTO[i]+'</b></p><p class="mut small">Tag bevidst styringen: hvad gør du i stedet?</p>'+ALT.map(function(t,j){return'<button class="opt" data-j="'+j+'">'+t+'</button>'}).join('')+'</div>';
 r.innerHTML=h;var q=function(s){return r.querySelector(s)};
 if(q('#rs'))q('#rs').onclick=function(){i=0;m=0;draw()};
 if(q('#sk'))q('#sk').onclick=function(){if(a.s.indexOf(i)<0&&a.c.indexOf(i)<0){a.s.push(i);set('ap',a)}i++;draw()};
 if(q('#me'))q('#me').onclick=function(){m=1;draw()};
 r.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(a.c.indexOf(i)<0)a.c.push(i);a.p[i]=ALT[b.dataset.j];a.n=ALT[b.dataset.j];set('ap',a);m=0;i++;draw()}})}
 draw()};
function compass(L){var n=L.length,s='<svg viewBox="0 0 300 300" role="img" aria-label="Kompas"><circle cx="150" cy="150" r="142" fill="#ff6b6b"/><circle cx="150" cy="150" r="132" style="fill:var(--surf)"/><circle cx="150" cy="150" r="84" fill="none" style="stroke:var(--line)" stroke-width="2" stroke-dasharray="3 6"/>';L.forEach(function(v,i){var t=i*360/n*Math.PI/180;s+='<text x="'+(150+108*Math.sin(t)).toFixed(1)+'" y="'+(154-108*Math.cos(t)).toFixed(1)+'" text-anchor="middle">'+v+'</text>'});return s+'<g id="nd"><path d="M150 52l11 98h-22z" fill="#d93a50"/><path d="M150 248l-11-98h22z" fill="#1d2b53"/></g><circle cx="150" cy="150" r="9" fill="#ffc93c" stroke="#1d2b53" stroke-width="3"/></svg>'}
V.kompas=function(r){V.kompas_old(r);var w=document.createElement('div');w.className='panel bigc';w.innerHTML=compass(VAL)+'<h3 id="cl"></h3>';r.insertBefore(w,r.firstChild);
 function aim(v){var i=VAL.indexOf(v);if(i>-1)w.querySelector('#nd').style.transform='rotate('+i*30+'deg)';w.querySelectorAll('text').forEach(function(t,j){t.classList.toggle('hot',j===i)});w.querySelector('#cl').textContent=v?'Din kurs: '+v:'Vælg din vigtigste værdi'}
 r.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){aim(c.textContent)})});
 r.querySelector('#cv').addEventListener('input',function(e){aim(e.target.value)});
 aim(g('kp',{}).v||'')};
V.gps=function(r){V.gps_old(r);var w=document.createElement('div'),N=GPS.map(function(q){return q[0]});w.className='panel bigc';w.innerHTML=compass(N)+'<h3 id="cl"></h3>';r.insertBefore(w,r.firstChild);
 function aim(){var a=g('gps',{}),h=w.querySelector('#cl'),ix=-1,m=3;w.querySelectorAll('text').forEach(function(t){t.classList.remove('hot')});
 if(Object.keys(a).length<5){h.textContent='Besvar pejlemærkerne – nålen finder næste kurs';return}
 for(var i=0;i<5;i++)if(a[i]<m){m=a[i];ix=i}
 if(ix<0){h.textContent='På kurs – hold fast i det, der virker';return}
 w.querySelector('#nd').style.transform='rotate('+ix*72+'deg)';w.querySelectorAll('text')[ix].classList.add('hot');h.textContent='Næste kurs: '+N[ix]}
 r.querySelectorAll('.scale button').forEach(function(b){b.addEventListener('click',aim)});aim()};
function gauge(tt){var C=['#e5202a','#ee5223','#f59220','#ffcc0a','#a8c93a','#62bb46','#4f9a47'],st=180/7,s='<svg viewBox="0 0 400 232" role="img" aria-label="Måler for stigmaklima">',P=function(r,a){var t=(180+a)*Math.PI/180;return(200+r*Math.cos(t)).toFixed(1)+' '+(200+r*Math.sin(t)).toFixed(1)};
 C.forEach(function(c,i){var a0=i*st+1.5,a1=(i+1)*st-1.5;s+='<path d="M'+P(190,a0)+'A190 190 0 0 1 '+P(190,a1)+'L'+P(110,a1)+'A110 110 0 0 0 '+P(110,a0)+'Z" fill="'+c+'"/>'});
 var f=Math.max(0,Math.min(1,(5-tt)/4));
 return s+'<g class="gn" style="transform:rotate('+(f*180-90).toFixed(1)+'deg)"><path d="M193 200L200 62l7 138z" fill="#1d1d1d"/><circle cx="200" cy="200" r="16" fill="#1d1d1d"/><circle cx="200" cy="200" r="6" fill="#fff"/></g><text x="6" y="224">Tydeligt stigma</text><text x="394" y="224" text-anchor="end">Anerkendende klima</text></svg>'}
var MP=[[70,70],[150,38],[250,38],[335,80],[335,165]];
function rt(i){var p=MP[i];return'M200 250V165C200 125 '+p[0]+' '+(p[1]+55)+' '+p[0]+' '+p[1]}
function gmap(N,ix,st){var s='<svg viewBox="0 0 400 260" role="img" aria-label="Kort med bil på vej mod næste kurs"><rect width="400" height="260" fill="#e8e2d2"/><path d="M0 200Q60 175 95 235L80 260H0Z" fill="#cfe3b8"/><path d="M-10 118Q130 150 410 105" fill="none" stroke="#b9d8f3" stroke-width="20"/><path d="M0 22H400M0 100L400 70" stroke="#f6dd7a" stroke-width="3" fill="none"/>';
 MP.forEach(function(p,i){s+='<path d="'+rt(i)+'" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>'});
 if(ix>=0)s+='<path d="'+rt(ix)+'" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path d="'+rt(ix)+'" fill="none" stroke="#2f6fe4" stroke-width="8" stroke-linecap="round"/>';
 MP.forEach(function(p,i){var h=i===ix;s+='<g transform="translate('+p[0]+' '+p[1]+') scale('+(h?1.35:1)+')"><path d="M0 0L-9-17A11 11 0 1 1 9-17Z" fill="'+(h?'#d93a50':'#2f6fe4')+'"/><circle cx="0" cy="-24" r="4" fill="#fff"/></g><text x="'+p[0]+'" y="'+(p[1]+15)+'" text-anchor="middle">'+N[i]+'</text>'});
 var d=st===0?'':st===1?rt(ix):'M200 250V172',du=matchMedia('(prefers-reduced-motion:reduce)').matches?'0.01s':'3s';
 s+='<g'+(st===0?' transform="translate(200 246) rotate(-90)"':'')+'>'+(d?'<animateMotion dur="'+du+'" fill="freeze" rotate="auto" path="'+d+'"/>':'')+'<ellipse cx="0" cy="2" rx="15" ry="9" fill="#000" opacity=".15"/><rect x="-13" y="-7" width="26" height="14" rx="4" fill="#2f6fe4"/><rect x="-4" y="-5" width="10" height="10" rx="2" fill="#fff" opacity=".85"/><rect x="7" y="-5" width="4" height="10" fill="#9fd3ff"/></g></svg>';return s}
V.gps=function(r){V.gps_old(r);var w=document.createElement('div'),N=GPS.map(function(q){return q[0]});w.className='panel bigc gmap';r.insertBefore(w,r.firstChild);
 function aim(){var a=g('gps',{}),ix=-1,m=3,st=0,t='Besvar pejlemærkerne – bilen kører mod næste kurs';
 if(Object.keys(a).length>=5){for(var i=0;i<5;i++)if(a[i]<m){m=a[i];ix=i}st=ix<0?2:1;t=ix<0?'På kurs – hold fast i det, der virker':'Næste kurs: '+N[ix]}
 w.innerHTML='<h3>'+t+'</h3>'+gmap(N,ix,st)}
 r.querySelectorAll('.scale button').forEach(function(b){b.addEventListener('click',aim)});aim()};
var SH={pandora:'Pandora',barometer:'Barometer',detektor:'Detektor',spejl:'Spejl',kort:'Kort',autopilot:'Autopilot',sim:'Samtale',kompas:'Kompas',gps:'GPS'},SN=['frø','spire','plante','blomst'];
var SG={pandora:['Pandoras','æske'],barometer:['Stigma-','barometer'],detektor:['Stigma-','detektoren'],spejl:['Stigma-','spejlet'],kort:['Billede-','kort'],autopilot:['Min faglige','autopilot'],sim:['Den svære','samtale'],kompas:['Livets','kompasnål'],gps:['Relations-','GPS']};
function stg(p){return p>=8?3:p>=4?2:p>=1?1:0}
function ring(n,rx,ry,d,f,sk,rot){var s='';for(var i=0;i<n;i++)s+='<ellipse cx="0" cy="'+(-d)+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'" stroke="'+sk+'" stroke-width="1" transform="rotate('+(i*360/n+rot)+')"/>';return s}
var FL={pandora:function(){return'<circle r="15" fill="#d93a50"/><circle r="11" fill="#ef6f84"/><circle r="7" fill="#d93a50"/><path d="M-4 0a4 4 0 1 1 6 3" fill="none" stroke="#a82a38" stroke-width="2" stroke-linecap="round"/>'},
barometer:function(){return ring(14,3.4,8,13,'#ffc93c','#e0a800',0)+'<circle r="9" fill="#6b4226"/><circle r="5.5" fill="#8a5a2b"/>'},
detektor:function(){return ring(5,7,8.5,9,'#8fb8ee','#5b8fd6',0)+'<circle r="4" fill="#fff6b0"/>'},
spejl:function(){return'<ellipse cx="-8" cy="-6" rx="8" ry="9" fill="#9b6fd8"/><ellipse cx="8" cy="-6" rx="8" ry="9" fill="#9b6fd8"/><ellipse cx="-11" cy="4" rx="7" ry="8" fill="#b79cec"/><ellipse cx="11" cy="4" rx="7" ry="8" fill="#b79cec"/><ellipse cx="0" cy="9" rx="9" ry="8" fill="#d9c8f5"/><path d="M-3 0L0-4L3 0L5 5L0 7L-5 5Z" fill="#3b1f5e"/><circle cy="2" r="2.2" fill="#ffd54a"/>'},
kort:function(){return ring(8,5,8,10,'#ff9d4d','#e07a22',0)+'<circle r="5" fill="#ffe08a"/>'},
autopilot:function(){return ring(10,2.8,9,12,'#4da3ff','#2f7fd6',0)+'<circle r="5" fill="#1d2b53"/>'},
sim:function(){return ring(12,3,8,11,'#fff','#c5d0d8',0)+'<circle r="6" fill="#ffc93c"/>'},
kompas:function(){return ring(12,4.5,9,11,'#f59220','#d9741a',0)+ring(12,3.5,7,7,'#ffcc0a','#e0a800',15)+'<circle r="3" fill="#d93a50"/>'},
gps:function(){return ring(8,6.5,9,10,'#e052b0','#b82e88',0)+'<circle r="4.5" fill="#ffc93c"/>'}};
var BC={pandora:'#EA5E86',barometer:'#FFD055',detektor:'#9FC9F5',spejl:'#9B6FD8',kort:'#FF9F5A',autopilot:'#4da3ff',sim:'#FCC4C0',kompas:'#FF9F5A',gps:'#037F71'};
function stm(x,h,k,fl,sc,rot,bud){var o='<g transform="translate('+x+' 0) rotate('+(rot||0)+')"><path d="M0 -2V'+(-h)+'" stroke="#2f8f5f" stroke-width="2.6" stroke-linecap="round"/>';
 var a=-h*.4,b=-h*.68;o+='<path d="M0 '+a+'C-12 '+(a-1)+' -17 '+(a-10)+' -17 '+(a-14)+'C-6 '+(a-13)+' -1 '+(a-6)+' 0 '+a+'Z" fill="#4caf7a"/><path d="M0 '+b+'C10 '+(b-1)+' 16 '+(b-9)+' 16 '+(b-13)+'C6 '+(b-12)+' 1 '+(b-5)+' 0 '+b+'Z" fill="#2bb3a3"/>';
 if(fl)o+='<g transform="translate(0 '+(-h-3)+') scale('+sc+')">'+BOT[fl]()+'</g>';
 else if(bud)o+='<ellipse cx="0" cy="'+(-h-3)+'" rx="3.6" ry="5" fill="'+BC[k]+'"/><path d="M-3 '+(-h-1)+'q3 -4 6 0" fill="#4caf7a"/>';
 return o+'</g>'}
function plantSvg(st,k){var s='<ellipse cx="0" cy="0" rx="37" ry="9" fill="#a8754f"/><ellipse cx="0" cy="-1.5" rx="33" ry="7" fill="#b98660"/>',i=TOOLS.map(function(t){return t[0]}).indexOf(k),o1=TOOLS[(i+3)%9][0],o2=TOOLS[(i+6)%9][0];
 if(st===0)return s+'<ellipse cx="-8" cy="-3" rx="4.5" ry="3" fill="#6b4226"/><ellipse cx="9" cy="-4" rx="4" ry="2.8" fill="#6b4226"/>';
 if(st===1)return s+stm(-9,14,k)+stm(8,18,k)+stm(22,10,k);
 if(st===2)return s+stm(-22,22,k,0,0,-6,1)+stm(-8,30,k,0,0,2,1)+stm(8,34,k,0,0,-2,1)+stm(22,24,k,0,0,6,1);
 return s+stm(-27,26,o2,o2,.45,-8)+stm(27,24,o1,o1,.45,8)+stm(-15,34,k,k,.62,-5)+stm(16,36,o1,o1,.55,5)+stm(0,44,k,k,.82,0)+stm(-5,28,o2,o2,.5,-3)+stm(9,26,k,k,.5,3)}
function beds(){return TOOLS.map(function(x,i){var k=x[0],st=stg(pts(k)),c=DECO[k][1],T='<text text-anchor="middle" x="50" y="##" style="fill:#2b2a6b;font:600 11px Caveat,cursive">';return'<svg class="plt" viewBox="0 0 100 132" data-k="'+k+'" tabindex="0" role="button" aria-label="'+x[1]+': '+SN[st]+'"><rect width="100" height="132" rx="14" style="fill:var(--bg)"/><g transform="translate(50 87) scale(1.25)"><g class="wt"><g class="gr" style="animation-delay:'+(i*.15)+'s">'+plantSvg(st,k)+'</g></g></g><rect x="46" y="86" width="8" height="16" rx="2" fill="'+c+'" stroke="rgba(29,43,83,.3)"/><rect x="6" y="98" width="88" height="30" rx="4" fill="'+c+'" stroke="rgba(29,43,83,.3)"/>'+T.replace('##',110)+SG[k][0]+'</text>'+T.replace('##',122)+SG[k][1]+'</text></svg>'}).join('')}
function lawn(){var t=total(),L=level(t),s='<svg viewBox="0 0 400 345" role="img" aria-label="Din faglige have med '+TOOLS.length+' planter"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0fa"/><stop offset="1" stop-color="#eaf5ff"/></linearGradient><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd9a8"/><stop offset="1" stop-color="#5fbf7f"/></linearGradient><clipPath id="lc"><rect width="400" height="345" rx="18"/></clipPath></defs><g clip-path="url(#lc)"><rect width="400" height="345" fill="url(#sk)"/>';
 s+='<g stroke="#ffc93c" stroke-width="4" stroke-linecap="round">';for(var r=0;r<10;r++){var q=r*Math.PI/5;s+='<path d="M'+(340+34*Math.cos(q)).toFixed(0)+' '+(48+34*Math.sin(q)).toFixed(0)+'L'+(340+44*Math.cos(q)).toFixed(0)+' '+(48+44*Math.sin(q)).toFixed(0)+'"/>'}s+='</g><circle cx="340" cy="48" r="26" fill="#ffc93c"/>';
 s+='<g fill="#fff" opacity=".92"><ellipse cx="80" cy="46" rx="30" ry="11"/><ellipse cx="102" cy="38" rx="20" ry="11"/><ellipse cx="215" cy="72" rx="24" ry="8"/><ellipse cx="232" cy="66" rx="15" ry="8"/></g>';
 s+='<path d="M0 112Q90 82 190 108T400 96V345H0Z" fill="#9ad9bf"/><path d="M0 128Q120 108 220 126T400 118V345H0Z" fill="url(#gr)"/>';
 [[30,152],[150,162],[255,150],[372,170],[40,218],[140,232],[262,218],[355,232],[28,268],[150,272],[262,266],[378,272]].forEach(function(p){s+='<path d="M'+p[0]+' '+p[1]+'l-3-8M'+p[0]+' '+p[1]+'l0-10M'+p[0]+' '+p[1]+'l3-8" stroke="#3f9d62" stroke-width="2" stroke-linecap="round" fill="none"/>'});
 if(L.i>=1)s+='<path d="M190 62q6-8 12 0q6-8 12 0" stroke="#1d2b53" fill="none" stroke-width="2" stroke-linecap="round"/>';
 TOOLS.forEach(function(x,i){var k=x[0],c=i%3,rw=Math.floor(i/3),px=[46,172,298][c],py=[146,212,278][rw],sc=[.8,.9,1][rw],st=stg(pts(k));
  s+='<g class="plt" data-k="'+k+'" tabindex="0" role="button" aria-label="'+x[1]+': '+SN[st]+'" transform="translate('+px+' '+py+') scale('+sc+')"><rect x="-36" y="-80" width="130" height="112" fill="transparent"/>'+plantSvg(st,k)+'<g transform="rotate('+(i%2?3:-3)+' 63 6)"><rect x="59" y="-12" width="9" height="30" rx="2" fill="'+DECO[k][1]+'" stroke="rgba(29,43,83,.3)" stroke-width="1.2"/><rect x="30" y="-40" width="66" height="31" rx="3" fill="'+DECO[k][1]+'" stroke="rgba(29,43,83,.3)" stroke-width="1.2"/><text class="sn" x="63" y="-26" text-anchor="middle" style="fill:#2b2a6b;font:600 12.5px Caveat,cursive">'+SG[k][0]+'</text><text class="sn" x="63" y="-13" text-anchor="middle" style="fill:#2b2a6b;font:600 12.5px Caveat,cursive">'+SG[k][1]+'</text></g></g>'});
 if(L.i>=2)s+='<g transform="translate(268 112)"><ellipse cx="-6" cy="-3" rx="7" ry="5" fill="#ffb3c1"/><ellipse cx="6" cy="-3" rx="7" ry="5" fill="#c9b3f5"/><rect x="-1.5" y="-5" width="3" height="11" rx="1.5" fill="#1d2b53"/></g>';
 for(var j=0;j<6;j++){var sx=40+j*64,sy=328,on=j<=L.i;s+='<ellipse cx="'+sx+'" cy="'+sy+'" rx="'+(j===L.i?24:20)+'" ry="8" fill="'+(on?'#ffe08a':'#d3ddd8')+'" stroke="'+(j===L.i?'#d93a50':'#b7c4be')+'" stroke-width="'+(j===L.i?3:1.5)+'"/><text class="sn" x="'+sx+'" y="'+(sy+3.5)+'" text-anchor="middle">'+(j+1)+'</text>';
  if(j===L.i)s+='<circle cx="'+sx+'" cy="'+(sy-30)+'" r="7" fill="#8a5cd0"/><rect x="'+(sx-7)+'" y="'+(sy-22)+'" width="14" height="17" rx="7" fill="#8a5cd0"/>'}
 return s+'</g></svg><p class="small mut" style="margin:8px 0 0">Du står på sten '+(L.i+1)+' af 6: <b>'+L.name+'</b>. Hver plante er et redskab: frø → spire → plante → blomst. Jo mere du øver, jo mere vokser det. Tryk på en plante eller et skilt for at åbne redskabet.<br><b>Point måler brug – ikke kompetence.</b> De viser, hvor meget du har øvet dig med redskaberne, og er ikke en vurdering af din faglighed.</p>'}
var INFO={pandora:['En fælles postkasse, hvor du kan stille et åbent refleksionsspørgsmål til det tværfaglige team.','At understøtte kollegial refleksion og dialog om holdninger og praksis i teamet – uden at pege fingre.','Skriv spørgsmålet, læg det i æsken og besvar kollegers spørgsmål. Skriv aldrig om enkelte patienter eller kolleger.'],
barometer:['Et redskab til at kortlægge stigmaklimaet i afdelingen.','At gøre stigmatiserende holdninger synlige og tale om dem i teamet – ikke at bedømme den enkelte.','Tag stilling til otte udsagn (1 = helt uenig, 5 = helt enig). Øverst ser du afdelingens samlede farve, baseret på kollegernes svar og patientens vurdering. Dit eget barometer vises nederst med en konklusion.'],
detektor:['Et læringsspil med korte, opdigtede cases fra psykiatrien. Hver case viser en situation, en journalformulering eller en handling.','At øve evnen til at genkende stigmatiserende sprog, implicitte antagelser og uhensigtsmæssige handlinger – og at formulere mere anerkendende alternativer.','1) Læs casen. 2) Læs spørgsmålet. 3) Vælg det svar, du vurderer er mest anerkendende og recovery-orienteret. 4) Få en faglig begrundelse og point. Casene er opdigtede og indeholder ingen patientoplysninger.'],
spejl:['Et refleksionsredskab, der stiller ét spørgsmål ad gangen om dig selv og din praksis.','At udvikle selvindsigt i egne holdninger, forforståelser og handlinger, som påvirker den terapeutiske relation.','Tænk på et konkret møde uden at nævne navne, og skriv kort. Dine svar er kun for dig.'],
kort:['Illustrerede kort med følelser, relation og behov.','At give patienten et sprog, når ord er svære, så I sammen kan tale om patientens oplevelse og behov.','Læg kortene frem sammen med patienten. Lad patienten pege, og spørg åbent og nysgerrigt: „Fortæl mig om det kort.“'],
autopilot:['Et refleksionsspil om typiske rutiner og automatiske reaktioner i en travl vagt.','At blive opmærksom på rutinepræget praksis og vælge bevidst i stedet for at handle på automatik.','Læs hver rutine, svar „Det er mig“ eller „Ikke mig“, og vælg et alternativ. Både „Ikke mig“ og bevidste valg sænker autopiloten.'],
sim:['Et træningsredskab til svære samtaler: mistillid, afvisning af behandling, tilbagefald og konflikt.','At styrke din evne til at forblive anerkendende, respektfuld og recovery-orienteret under pres.','Vælg en situation, læs patientens udsagn og vælg dit svar. Få faglig feedback og prøv igen med et andet svar.'],
kompas:['Patientens vigtigste værdi som et kompas og en fysisk genstand (fx en sten), der kan ligge på bordet som udgangspunkt for samtalen.','At sætte patientens egne værdier i centrum for planlægning af pleje og behandling.','Spørg, hvad der er vigtigst i patientens liv, og lad patienten vælge værdi og genstand. Noter kun med samtykke og kun patientens egne ord.'],
gps:['Et redskab med fem pejlemærker for den terapeutiske relation: tid, tydelighed, anerkendelse, medbestemmelse og tillid.','At hjælpe dig med at vurdere relationen til patienten og planlægge, hvad der skal til for at skabe eller genopbygge tillid.','Vurdér hvert pejlemærke ud fra din fornemmelse uden at nævne navne. Du får et konkret handleforslag til de pejlemærker, der har mest brug for opmærksomhed.']};
var KOMP={pandora:'Tværprofessionelt samarbejde · kollegial refleksion og kvalitetsudvikling',barometer:'Etisk bevidsthed jf. Sygeplejeetiske retningslinjer · kvalitetsudvikling i afdelingen',detektor:'Faglig kommunikation og dokumentation · etisk bevidsthed i hverdagens praksis',spejl:'Refleksion over egen praksis · professionel udvikling og selvindsigt',kort:'Kommunikation og relation · patientinddragelse',autopilot:'Klinisk beslutningstagning · refleksion i handling og kvalitetsudvikling',sim:'Kommunikation og relationsarbejde · håndtering af konflikt og afvisning med respekt',kompas:'Personcentreret sygepleje · inddragelse, samtykke og dokumentation',gps:'Relationel kompetence · tillid, kontinuitet og samarbejde med patienten'};
var FB={pandora:'Kollegial refleksion · psykologisk tryghed i teamet',barometer:'Stigma · selvstigma · stigmatiserende holdninger hos sundhedsprofessionelle',detektor:'Stigmatiserende sprogbrug · diskrimination · anerkendende kommunikation',spejl:'Refleksion over egen praksis · forforståelse · professionel selvindsigt',kort:'Personcentreret pleje · fælles beslutningstagning · brugerinddragelse',autopilot:'Rutinepræget praksis · refleksion i handling · bevidst klinisk beslutningstagning',sim:'Anerkendende kommunikation · motiverende samtale · ambivalens · tilbagefald som del af recovery',kompas:'Recovery · værdibaseret pleje · empowerment · samtykke og journalføring',gps:'Terapeutisk relation · tillid · medbestemmelse · kontinuitet'};
var TOG={kort:'Billedekortene bruges i samtalen med patienten – ikke til at udfylde alene. Lad patienten pege, og spørg nysgerrigt. Gem ikke patientens svar i appen.',kompas:'Kompasnålen udføres sammen med patienten, som selv vælger værdi og genstand. Noter kun patientens egne ord og kun med samtykke – aldrig navne eller cpr-nr.'};
function info(k){var d=INFO[k];return'<div class="panel info"><p><b>Hvad er det?</b> '+d[0]+'</p><p><b>Formål:</b> '+d[1]+'</p><p><b>Sådan gør du:</b> '+d[2]+'</p><p class="small mut" style="margin:0"><b>Faglige begreber:</b> '+(FB[k]||'')+'</p><p class="small mut" style="margin:6px 0 0"><b>Sygeplejefaglige kompetencer:</b> '+(KOMP[k]||'')+'</p></div>'+(TOG[k]?'<div class="together"><b>Udføres sammen med patienten</b><br>'+TOG[k]+'</div>':'')+'<div class="gdpr">🔒 <b>GDPR:</b> Skriv aldrig navn, cpr-nr., fødselsdato, adresse eller andet, der kan identificere en patient eller kollega. Brug fx „patienten“. Alt gemmes kun på din enhed.</div>'}
var TD={pandora:'Kollegial refleksion – stil et åbent spørgsmål til teamet.',barometer:'Kortlæg stigmaklimaet og gør stigmatiserende holdninger synlige.',detektor:'Cases til at identificere stigmatiserende sprog og handlinger.',spejl:'Refleksion over egne holdninger og forforståelser.',kort:'Støtter patienten i at udtrykke følelser og behov.',autopilot:'Reflektér over rutinepræget praksis og vælg bevidst.',sim:'Træn anerkendende kommunikation i svære samtaler.',kompas:'Patientens værdier som udgangspunkt for samtale og journal.',gps:'Vurdér den terapeutiske relation og styrk tilliden.'};
TOOLS.forEach(function(t){t[2]=TD[t[0]]||t[2]});
CASES=[
{ty:'Journalnotat',t:'Aftenvagt i døgnafsnittet. En kollega har skrevet: „Pt. manipulerende, afviser al pleje og er ikke motiveret for behandling.“ Nu skal du skrive næste notat om samme patient.',q:'Hvilket notat er mest fagligt og anerkendende?',o:['„Pt. er fortsat uvillig og uden indsigt. Fastholder afvisning af pleje.“','„Pt. har afvist morgenmedicin og samtale i dag. Giver udtryk for, at han er træt af bivirkninger og ikke føler sig hørt. Aftalt at tage emnet op på stuegang.“','„Pt. er rolig i dag. Ingen bemærkninger.“'],c:1,e:'Det bedste notat beskriver, hvad der er observeret, og hvad patienten selv siger, og slutter med en plan. „Uvillig“ og „uden indsigt“ er vurderinger, der lukker for dialog. Det sidste notat er neutralt, men dokumenterer ikke noget om afvisningen.'},
{ty:'Overlevering',t:'Ved vagtskifte siger nattevagten: „Stue 4 er indlagt igen efter tre uger. Han er en af drejedørspatienterne – jeg tror ikke, der sker noget nyt denne gang.“',q:'Hvad er mest hensigtsmæssigt at svare som dagvagt?',o:['„Okay, så venter vi bare og ser, hvad der sker.“','„Jeg læser journalen, så ved jeg nok.“','„Hvad er anderledes denne gang – og hvad har han selv sagt, han har brug for?“'],c:2,e:'Ordet „drejedørspatient“ gør indlæggelserne til patientens fejl og sænker forventningerne. Et nysgerrigt spørgsmål flytter fokus til, hvad der kan gøres anderledes, og til patientens egen stemme.'},
{ty:'Smertelindring',t:'Efter en operation på et somatisk afsnit beder en patient med kendt opioidmisbrug om mere smertestillende. Sygeplejersken tænker: „Det er nok bare for at få stoffer“ og lader ham vente længere end andre.',q:'Hvad er mest hensigtsmæssigt?',o:['Give det ordinerede uden at vurdere smerterne, så der ikke bliver konflikt.','Lade ham vente og se, om han giver op.','Vurdere smerterne systematisk på samme måde som hos andre patienter, handle inden for ordinationen og tale åbent med lægen om sin bekymring.'],c:2,e:'Antagelsen om, at patienten overdriver, kan give for lidt smertelindring. Systematisk vurdering som hos alle andre og åben dialog med lægen beskytter både patient og relation. At give medicin uden vurdering er heller ikke god praksis, selvom det undgår konflikten.'},
{ty:'Første møde',t:'Ved indlæggelse har du læst al historik om misbrug og vold, før du går ind til patienten for første gang.',q:'Hvordan bør mødet starte?',o:['Med at tage tidligere episoder op, så patienten ved, at du kender historikken.','Med et åbent spørgsmål: „Hvad er vigtigst for dig lige nu?“ – og lade historikken supplere undervejs.','Ved slet ikke at læse historik for at være neutral.'],c:1,e:'Historik er vigtig for sikkerhed og kontinuitet, men må ikke være den første linse. At undlade at læse den er heller ikke fagligt forsvarligt. Start med mennesket, og lad historikken supplere.'},
{ty:'Afvisning af behandling',t:'Patienten siger: „Jeg vil ikke have medicinen.“ Sygeplejersken svarer: „Så er du ikke motiveret for at blive rask.“',q:'Hvad er problemet med svaret?',o:['Det er en ærlig tilbagemelding, som patienten har brug for at høre.','Det gør afvisningen til manglende vilje i stedet for at spørge, hvorfor.','Svaret er for kort til at skabe tillid.'],c:1,e:'En afvisning har ofte en grund, fx bivirkninger eller frygt. Et mere anerkendende svar kunne være: „Hvad er det, der er svært ved medicinen?“ Det bevarer samarbejdet og giver grundlag for at tale med lægen.'},
{ty:'Tilbagefald',t:'I en samtale fortæller patienten, at han har brugt rusmidler i weekenden under udgang.',q:'Hvilket svar er mest anerkendende?',o:['„Så må vi stramme udgangene.“','„Det er ærgerligt. Du var jo så godt på vej.“','„Tak, fordi du fortæller det. Hvad skete der op til, og hvad havde du brug for?“'],c:2,e:'Tilbagefald er en del af mange forløb. Ærlighed fortjener anerkendelse. Konsekvenser og sikkerhed skal stadig drøftes, men efter at relationen er bevaret.'},
{ty:'Samtale med pårørende',t:'En mor spørger: „Hvorfor vil han ikke tage imod hjælp? Han er jo bare doven.“ Sygeplejersken svarer: „Ja, det er typisk for dem med den slags problemer.“',q:'Hvad er problemet med svaret?',o:['Svaret er for kort til at være en god samtale.','Der er intet problem. Svaret er ærligt og realistisk.','Det bekræfter en stereotyp og lukker for dialog i stedet for at anerkende familiens bekymring.'],c:2,e:'Svaret generaliserer og bekræfter en stereotyp. Man kan anerkende familiens bekymring og forklare generelt, hvorfor det kan være svært at modtage hjælp – og huske samtykke og tavshedspligt, før man taler om patienten.'},
{ty:'Urinprøve efter udgang',t:'Sygeplejersken siger til patienten: „Vi skal bare lige være sikre på, at du ikke har løjet for os.“',q:'Hvordan kan det formuleres mere recovery-orienteret?',o:['„Det er reglerne – ellers får du ikke udgang igen.“','„Prøven er et fast led i planen efter udgang og gælder for alle. Jeg fortæller dig resultatet, og vi taler om det sammen.“','„Hvis du bare siger ærligt, om du har brugt noget, kan vi springe prøven over.“'],c:1,e:'Prøven bør forklares som en ensartet procedure, ikke som mistænkeliggørelse, og patienten inddrages i resultatet. At springe prøven over kan fravige afdelingens retningslinjer. Følg altid lokal praksis.'}];

function pet(n,len,w,f,v,rot,sk){var s='',i;for(i=0;i<n;i++)s+='<g transform="rotate('+(i*360/n+(rot||0))+')"><path d="M0 0C'+(-w)+' '+(-len*.35)+' '+(-w*.8)+' '+(-len*.9)+' 0 '+(-len)+'C'+(w*.8)+' '+(-len*.9)+' '+w+' '+(-len*.35)+' 0 0Z" fill="'+f+'" fill-opacity=".92" stroke="'+(sk||v)+'" stroke-width=".8"/><path d="M0 -2V'+(-len*.8)+'" stroke="'+v+'" stroke-width=".7" stroke-linecap="round" opacity=".7"/></g>';return s}
function dots(n,r,c,rr){var s='',i;for(i=0;i<n;i++){var a=i*6.283/n;s+='<circle cx="'+(r*Math.sin(a)).toFixed(1)+'" cy="'+(-r*Math.cos(a)).toFixed(1)+'" r="'+rr+'" fill="'+c+'"/>'}return s}
var BOT={
pandora:function(){return pet(5,17,9,'#EA5E86','#b8365f',0)+pet(5,11,6,'#F58FAE','#b8365f',36)+'<circle r="3.2" fill="#FFD094"/>'+dots(6,5.5,'#b8365f',.8)},
barometer:function(){return pet(10,17,4,'#FFD055','#d99a00',0)+pet(10,11,3,'#FFE58A','#d99a00',18)+'<circle r="5.5" fill="#8a5a2b"/>'+dots(8,3,'#5a3a1a',.7)},
detektor:function(){return pet(6,16,6,'#9FC9F5','#4b7fc0',0)+pet(6,10,4,'#DDEBFB','#4b7fc0',30)+'<circle r="3.4" fill="#FFD094"/>'},
spejl:function(){return pet(4,17,8,'#9B6FD8','#5e3a9c',45)+pet(4,12,6,'#C5A8EE','#5e3a9c',0)+'<circle r="2.8" fill="#FFD055"/>'},
kort:function(){return pet(8,17,5,'#FF9F5A','#c8661f',0)+pet(8,11,3.5,'#FFD094','#c8661f',22)+'<circle r="3.6" fill="#EA5E86"/>'},
autopilot:function(){return pet(5,17,8,'#4da3ff','#2a6fc0',18)+pet(5,10,5,'#B9DBFF','#2a6fc0',54)+'<circle r="3" fill="#FFD055"/>'+dots(5,5,'#2a6fc0',.7)},
sim:function(){return pet(7,17,6,'#FCC4C0','#c9706b',0)+pet(7,11,4,'#fff','#c9706b',26)+'<circle r="3.4" fill="#FFD055"/>'},
kompas:function(){return pet(8,17,4.5,'#FF9F5A','#c8661f',0)+pet(8,17,4.5,'#FFD055','#d99a00',22.5)+'<circle r="3.4" fill="#EA5E86"/>'},
gps:function(){return pet(5,17,9,'#037F71','#02544b',0)+pet(5,11,6,'#6FC7B8','#02544b',36)+'<circle r="3.2" fill="#DDF2B8"/>'+dots(6,5.5,'#02544b',.8)}};
var WQ=[],_set=set;
set=function(k,v){var bf={},b=total(),lv=level(b).i;TOOLS.forEach(function(t){bf[t[0]]=pts(t[0])});_set(k,v);var a=total();
 if(a>b){if(level(a).i>lv)WQ.push('*');else TOOLS.forEach(function(t){if(pts(t[0])>bf[t[0]])WQ.push(t[0])})}};
function waterLoop(){var w=document.querySelector('.gwrap');if(!w)return;var av=w.querySelector('.avatar'),bs=[].slice.call(w.querySelectorAll('.bedrow .plt'));if(!av||!bs.length)return;
 function go(b,ms,cb){var wr=w.getBoundingClientRect(),br=b.getBoundingClientRect();av.classList.add('walk');av.style.left=(br.left-wr.left-12)+'px';av.style.top=(br.bottom-wr.top-46)+'px';
  setTimeout(function(){av.classList.remove('walk');av.classList.add('pour');b.classList.add('wet');setTimeout(function(){av.classList.remove('pour');b.classList.remove('wet');cb()},ms)},1400)}
 var q=WQ.splice(0),list=[];if(q.indexOf('*')>-1)list=bs;else q.forEach(function(k){var b=w.querySelector('.plt[data-k="'+k+'"]');if(b&&list.indexOf(b)<0)list.push(b)});
 var i=0;(function nx(){if(!document.body.contains(w))return;if(i>=list.length){return}go(list[i++],1800,nx)})()}
var AVATAR='<div class="avatar" aria-hidden="true"><svg viewBox="0 0 70 70"><g class="av"><rect x="15" y="50" width="6" height="16" rx="3" fill="#1d2b53"/><rect x="25" y="50" width="6" height="16" rx="3" fill="#1d2b53"/><rect x="13" y="24" width="20" height="28" rx="10" fill="#8a5cd0"/><circle cx="23" cy="14" r="9" fill="#f4c7a1"/><path d="M14 13a9 9 0 0 1 18 0z" fill="#1d2b53"/><path d="M29 32L42 36" stroke="#8a5cd0" stroke-width="6" stroke-linecap="round"/><g class="can"><rect x="40" y="31" width="15" height="13" rx="3" fill="#ffc93c" stroke="#1d2b53" stroke-width="1.5"/><path d="M55 35L65 28" stroke="#1d2b53" stroke-width="3" stroke-linecap="round"/><path d="M44 31q4-9 8 0" fill="none" stroke="#1d2b53" stroke-width="1.5"/><circle class="dr" cx="66" cy="31" r="2" fill="#4da3ff"/><circle class="dr" cx="68" cy="33" r="2" fill="#4da3ff" style="animation-delay:.25s"/><circle class="dr" cx="64" cy="33" r="1.6" fill="#4da3ff" style="animation-delay:.5s"/></g></g></svg></div>';

function board(){var t=total(),L=level(t),n=[['Kollega A',22],['Kollega B',14],['Kollega C',9]].concat([['Dig',t]]).sort(function(x,y){return y[1]-x[1]});
 return'<section class="board"><h3>Teamets niveauer</h3><p class="bn">Eksempeldata, anonymt og kun på din enhed. Ingen patientdata.</p>'+n.map(function(r,i){var l=level(r[1]);return'<div class="br'+(r[0]==='Dig'?' me':'')+'"><b>'+(i+1)+'</b><span>'+r[0]+'</span><i style="width:'+Math.max(8,Math.min(100,r[1]*3))+'%"></i><em>'+l.name+'</em></div>'}).join('')+'</section>'}
function addBoard(){var w=document.querySelector('.gwrap');if(w&&!document.querySelector('.board'))(w.parentNode.querySelector('.badges')||w).insertAdjacentHTML('afterend',board())}
var _h=home;home=function(){_h();waterLoop()};
function gate(){if(g('gd',0))return;var d=document.createElement('div');d.className='gate';d.innerHTML='<div class="gbox" role="dialog" aria-label="GDPR"><h3>Før du starter: GDPR og anonymisering</h3><ul><li>Skriv aldrig navne, cpr-nr., fødselsdatoer, adresser eller andet, der kan genkende en patient eller kollega.</li><li>Brug „patienten“ og opdigtede eksempler.</li><li>Alt, du skriver, gemmes kun på din egen enhed – ikke på en server.</li><li>Du kan altid slette dine data nederst på forsiden.</li></ul><button class="btn" id="gok">Jeg har forstået</button></div>';document.body.appendChild(d);d.querySelector('#gok').onclick=function(){set('gd',1);d.remove()}}
document.addEventListener('click',function(e){var w=e.target.closest&&e.target.closest('#wipe');if(w&&confirm('Slet alle dine svar og point på denne enhed?')){try{localStorage.removeItem('rn1')}catch(x){}S={};home()}});
var HP='M0 40C-60-2-64-50-30-62C-10-70 0-54 0-44C0-54 10-70 30-62C64-50 60-2 0 40Z';
function ht(x,y,s,f){return'<path transform="translate('+x+' '+y+') scale('+s+')" d="'+HP+'" fill="'+f+'"/>'}
function ps(cx,cy,n,len,w,f,rot){var o='',i;for(i=0;i<n;i++)o+='<ellipse cx="'+cx+'" cy="'+(cy-len)+'" rx="'+w+'" ry="'+len+'" fill="'+f+'" transform="rotate('+(i*360/n+(rot||0))+' '+cx+' '+cy+')"/>';return o}
function env(x,y,r,h){return'<g transform="rotate('+r+' '+x+' '+y+')"><rect x="'+(x-10)+'" y="'+(y-7)+'" width="20" height="14" rx="1.5" fill="#FFF3E2" stroke="#d9cdb8" stroke-width=".8"/><path d="M'+(x-10)+' '+(y-7)+'L'+x+' '+(y+1)+'L'+(x+10)+' '+(y-7)+'" fill="none" stroke="#d9cdb8" stroke-width=".8"/>'+ht(x,y+2,.06,h||'#D63A4E')+'</g>'}
var ILL={
pandora:['#F28B91','<ellipse cx="60" cy="90" rx="34" ry="4" fill="#C8606A" opacity=".5"/><path d="M26 52L34 28Q60 20 86 28L94 52Z" fill="#D63A4E" stroke="#8c1626" stroke-width="1.5" transform="rotate(-6 60 52)"/><rect x="28" y="50" width="64" height="38" rx="4" fill="#B3202F" stroke="#8c1626" stroke-width="1.5"/><path d="M28 62H92M28 74H92" stroke="#8c1626" stroke-width="1.2"/><rect x="52" y="56" width="16" height="14" rx="2" fill="#FFD055" stroke="#B88A00" stroke-width="1.5"/><circle cx="60" cy="63" r="2.2" fill="#8c1626"/>'+env(30,28,-18)+env(92,22,14)+env(62,10,4,"#EA5E86")+'<g fill="#FFD055"><path d="M14 56l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/><path d="M106 52l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z"/></g>'],
barometer:['#A9D3F5','<circle cx="100" cy="18" r="11" fill="#FFD055"/><ellipse cx="26" cy="20" rx="15" ry="6" fill="#fff"/><ellipse cx="38" cy="16" rx="10" ry="6" fill="#fff"/><path d="M0 66Q30 50 64 62T120 56V96H0Z" fill="#B8D96A"/><path d="M30 62A30 30 0 0 1 38.8 40.8" stroke="#7BC96F" stroke-width="9" fill="none"/><path d="M38.8 40.8A30 30 0 0 1 60 32" stroke="#FFD055" stroke-width="9" fill="none"/><path d="M60 32A30 30 0 0 1 81.2 40.8" stroke="#FF9F5A" stroke-width="9" fill="none"/><path d="M81.2 40.8A30 30 0 0 1 90 62" stroke="#EA5E86" stroke-width="9" fill="none"/><path d="M60 62L46 42" stroke="#23262e" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="62" r="4.5" fill="#23262e"/><path d="M0 80Q36 64 74 78T120 72V96H0Z" fill="#6E9A2E"/><path d="M0 90Q40 80 80 90T120 86V96H0Z" fill="#4F7F1F"/>'],
detektor:['#E8C9F5','<g fill="#fff" opacity=".9"><rect x="6" y="10" width="30" height="16" rx="8"/><rect x="84" y="62" width="30" height="16" rx="8"/></g><g stroke="#c7a0d8" stroke-width="2" stroke-linecap="round"><path d="M13 18H28M88 70H106"/></g><circle cx="52" cy="46" r="28" fill="#fff" fill-opacity=".55" stroke="#33413b" stroke-width="5"/><path d="M26 38Q52 28 78 38" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><rect x="34" y="34" width="36" height="20" rx="10" fill="#FFF3E2" stroke="#33413b" stroke-width="2"/><path d="M42 46l4-5M52 46l4-5" stroke="#33413b" stroke-width="2"/><circle cx="60" cy="43" r="4" fill="#EA5E86"/><path d="M60 41v3" stroke="#fff" stroke-width="1.8"/><path d="M74 66L98 90" stroke="#6b4a2e" stroke-width="8" stroke-linecap="round"/><path d="M72 64L78 70" stroke="#33413b" stroke-width="8" stroke-linecap="round"/><path d="M96 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#FFD055"/>'],
spejl:['#D6DB82','<path d="M120 52L88 52L88 76L120 80Z" fill="#7FC4B8"/><path d="M92 62L74 60" stroke="#7FC4B8" stroke-width="12" stroke-linecap="round"/><ellipse cx="46" cy="38" rx="25" ry="31" fill="#EAF4F6" stroke="#2f2f2f" stroke-width="5"/><path d="M46 69V94" stroke="#2f2f2f" stroke-width="6" stroke-linecap="round"/><path d="M46 50V62" stroke="#4f8f4f" stroke-width="2.5"/>'+ps(46,38,6,8,4.5,'#F5B5C8',0)+'<circle cx="46" cy="38" r="6.5" fill="#FFE08A"/><circle cx="44" cy="37" r=".9" fill="#4a3a30"/><circle cx="48" cy="37" r=".9" fill="#4a3a30"/><path d="M44 40q2 2 4 0" fill="none" stroke="#4a3a30" stroke-width=".9" stroke-linecap="round"/><path d="M30 26Q36 12 50 10" stroke="#fff" stroke-width="2.5" fill="none" opacity=".7" stroke-linecap="round"/><ellipse cx="72" cy="60" rx="7" ry="5" fill="#F2C4A0"/><g fill="#fff"><circle cx="16" cy="18" r="3"/><circle cx="106" cy="22" r="2.2"/></g>'],
kort:['#FFD055','<g fill="#D6DB82"><path d="M16 74l4 6 7-1-4 6 4 6-7-1-4 6-1-7-7-3 6-4Z"/><path d="M98 14l3 5 6-1-4 5 4 5-6-1-3 5-1-6-6-2 5-3Z"/></g><g transform="rotate(-20 60 90)"><rect x="40" y="16" width="36" height="56" rx="5" fill="#F6A9BE" stroke="#fff" stroke-width="2"/><circle cx="58" cy="40" r="8" fill="#FFD055"/><path d="M58 26v-4M58 54v4M44 40h-4M72 40h4" stroke="#FFD055" stroke-width="2.5" stroke-linecap="round"/></g><g transform="rotate(18 60 90)"><rect x="44" y="16" width="36" height="56" rx="5" fill="#9FD3C8" stroke="#fff" stroke-width="2"/><path d="M52 48L62 36L72 48V60H52Z" fill="#FFF3E2"/><rect x="58" y="50" width="8" height="10" fill="#EA5E86"/></g><g><rect x="42" y="12" width="36" height="58" rx="5" fill="#FFF3E2" stroke="#d9a89a" stroke-width="2"/>'+ht(60,38,.2,'#D63A4E')+'<path d="M48 22l3 4 3-4" fill="none" stroke="#D63A4E" stroke-width="1.5"/></g>'],
autopilot:['#E4E88F','<path d="M10 80Q30 50 56 70T104 40" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="3 6" stroke-linecap="round"/><path d="M24 44Q24 30 62 30Q100 30 106 44Q100 56 62 56Q24 56 24 44Z" fill="#E8452C" stroke="#8c2a1a" stroke-width="1.5"/><path d="M24 44L10 30L26 36Z" fill="#C93820"/><path d="M52 48L34 72L56 64Z" fill="#C93820"/><path d="M70 36Q82 28 92 38L90 46H70Z" fill="#CDEBF5" stroke="#8c2a1a" stroke-width="1.2"/><circle cx="80" cy="40" r="6" fill="#F2C4A0"/><path d="M73 36Q80 29 87 36Z" fill="#33413b"/><path d="M77 41h3M82 41h3" stroke="#4a3a30" stroke-width="1" stroke-linecap="round"/><circle cx="46" cy="44" r="3" fill="#CDEBF5"/><circle cx="56" cy="44" r="3" fill="#CDEBF5"/><text x="92" y="28" style="font:700 9px Caveat,cursive;fill:#8c2a1a">z z z</text><circle cx="100" cy="76" r="14" fill="#fff" stroke="#33413b" stroke-width="2.5"/><path d="M100 64v4M100 84v4M88 76h4M108 76h4" stroke="#33413b" stroke-width="1.5"/><path d="M100 76L108 70" stroke="#E8452C" stroke-width="2.5" stroke-linecap="round"/><circle cx="100" cy="76" r="2" fill="#33413b"/>'],
sim:['#F3EFD6','<ellipse cx="60" cy="90" rx="46" ry="4" fill="#d9d2a8" opacity=".6"/><circle cx="32" cy="64" r="20" fill="#F4B3C8" stroke="#d98aa6" stroke-width="2"/><circle cx="88" cy="64" r="20" fill="#9FD3C8" stroke="#6fb0a3" stroke-width="2"/><g fill="#4a3a30"><circle cx="26" cy="62" r="2"/><circle cx="38" cy="62" r="2"/><circle cx="82" cy="62" r="2"/><circle cx="94" cy="62" r="2"/></g><path d="M26 72q6 4 12 0M82 72q6 -3 12 0" fill="none" stroke="#4a3a30" stroke-width="1.8" stroke-linecap="round"/><path d="M14 40Q14 22 34 22Q54 22 54 36Q54 48 40 48L34 54L32 48Q14 48 14 40Z" fill="#fff" stroke="#d98aa6" stroke-width="1.5"/><text x="34" y="42" text-anchor="middle" style="font:700 20px Caveat,cursive;fill:#EA5E86">?</text><path d="M68 14Q68 4 86 4Q104 4 104 16Q104 26 92 28L88 34L86 28Q68 28 68 14Z" fill="#fff" stroke="#6fb0a3" stroke-width="1.5"/>'+ht(86,16,.11,'#EA5E86')],
kompas:['#B7E4D1','<g transform="translate(60 52) scale(.62)"><path d="'+HP+'" fill="#F7A9B8" stroke="#D9657F" stroke-width="3"/></g><circle cx="60" cy="52" r="23" fill="#fff" stroke="#EA5E86" stroke-width="3"/><g stroke="#c9a0a8" stroke-width="1.2"><path d="M60 31v4M60 69v4M39 52h4M77 52h4"/></g><g transform="rotate(38 60 52)"><path d="M60 34L65 52H55Z" fill="#D93A50"/><path d="M60 70L55 52H65Z" fill="#33413b"/></g><circle cx="60" cy="52" r="2.8" fill="#FFD055" stroke="#33413b" stroke-width=".8"/><circle cx="60" cy="9" r="5" fill="none" stroke="#B88A00" stroke-width="2.5"/><path d="M60 14v6" stroke="#B88A00" stroke-width="2.5"/><path d="M12 80Q60 96 108 80V96H12Z" fill="#8FCFB5"/><g fill="#FFD055"><path d="M104 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>'],
gps:['#DDF2B8','<path d="M12 18L40 12L70 18L106 10V78L72 86L42 80L12 88Z" fill="#F7DFC2" stroke="#d3b88f" stroke-width="1.5"/><path d="M40 12V80M70 18V86" stroke="#e2c8a3" stroke-width="1"/><path d="M22 74C26 50 40 74 50 52S66 66 72 44S90 52 96 26" fill="none" stroke="#4A3C9E" stroke-width="2.4" stroke-dasharray="4 4" stroke-linecap="round"/><circle cx="22" cy="75" r="3" fill="#4A3C9E"/><path d="M92 22l8 8M100 22l-8 8" stroke="#4A3C9E" stroke-width="2.6" stroke-linecap="round"/><path d="M62 30C62 20 78 20 78 30C78 38 70 44 70 48C70 44 62 38 62 30Z" fill="#EA5E86" stroke="#B93A62" stroke-width="1.2"/><circle cx="70" cy="30" r="3.2" fill="#fff"/><rect x="8" y="66" width="34" height="14" rx="5" fill="#4A6FD6" stroke="#2f4a9e" stroke-width="1.2"/><path d="M14 66l4-9h14l4 9Z" fill="#4A6FD6"/><path d="M19 66l3-6h4v6ZM28 66v-6h3l3 6Z" fill="#DCE8FF"/><circle cx="17" cy="81" r="4.5" fill="#2b2f45"/><circle cx="35" cy="81" r="4.5" fill="#2b2f45"/>']};
function ill(k){var d=ILL[k];return'<svg viewBox="0 0 120 96" role="img" aria-hidden="true"><rect width="120" height="96" fill="'+d[0]+'"/><g filter="url(#wc2)">'+d[1]+'</g><rect width="120" height="96" filter="url(#grn)" opacity=".22"/></svg>'}
var PAL={pandora:'#FCC4CD',barometer:'#FFD094',detektor:'#DDF2B8',spejl:'#F5D0FA',kort:'#FFD055',autopilot:'#D3D87F',sim:'#FF9AA2',kompas:'#F58FAE',gps:'#A8DDD3'};
for(var kk in PAL)DECO[kk][1]=PAL[kk];
FL.pandora=function(){return'<g transform="translate(0 8)"><path d="M-11 0C-14-16-8-26 0-26C8-26 14-16 11 0C6 6-6 6-11 0Z" fill="#D63A4E" stroke="#9E2236" stroke-width="1.2"/><path d="M-4-2C-6-14-2-22 0-26C2-22 6-14 4-2Z" fill="#EA5E86" opacity=".85"/></g>'};
FL.barometer=function(){return ring(16,3,9,13,'#FFC93C','#E0A800',0)+ring(12,2.4,6,8,'#FFE08A','#E0B040',8)+'<circle r="7" fill="#6b4226"/><circle r="3.5" fill="#8a5a2b"/>'};
FL.detektor=function(){return ring(5,7,8.5,9,'#7FB2EE','#4C86CF',0)+'<circle r="5" fill="#BFD9FA"/><circle r="2" fill="#FFF6B0"/>'};
FL.spejl=function(){return ring(10,3.4,10,13,'#C27BD8','#8E4FA8',0)+'<circle r="6.5" fill="#D9822B"/><circle r="3" fill="#8a4a12"/>'};
FL.kort=function(){var s='',i,y=[-22,-17,-12,-7,-2,3],x=[-1,3,-3,3,-3,2],r=[2.6,3.2,3.6,3.8,3.6,3];for(i=0;i<6;i++)s+='<circle cx="'+x[i]+'" cy="'+y[i]+'" r="'+r[i]+'" fill="#9B7FD6" stroke="#6A52B3" stroke-width=".8"/>';return'<g transform="translate(0 9)">'+s+'</g>'};
FL.autopilot=function(){return ring(6,5.2,9,10,'#FFD055','#E0A800',0)+'<circle r="6" fill="#FFB300" stroke="#E08A00" stroke-width="1.2"/><circle r="3" fill="#FFD66B"/>'};
FL.sim=function(){return'<g transform="translate(0 4)"><path d="M-12 8Q-2-24 14-14" fill="none" stroke="#5B9A4A" stroke-width="2.2"/><circle cx="-8" cy="-2" r="4.4" fill="#fff" stroke="#98B88E"/><circle cx="-2" cy="-9" r="4.4" fill="#fff" stroke="#98B88E"/><circle cx="5" cy="-12" r="4.4" fill="#fff" stroke="#98B88E"/><circle cx="12" cy="-9" r="4" fill="#fff" stroke="#98B88E"/></g>'};
FL.kompas=function(){return ring(16,2.5,9,12,'#FFB07A','#E0824A',0)+ring(12,2,6,7,'#FFD094','#E0A060',10)+'<circle r="4" fill="#8a4a12"/>'};
FL.gps=function(){return'<circle r="15" fill="#F58FAE" stroke="#B93A62" stroke-width="1"/>'+ring(7,6.5,6.5,8,'#EA5E86','#B93A62',0)+'<circle r="5.5" fill="#F9B8CC"/><path d="M-2 0a2.5 2.5 0 1 1 3 1.5" fill="none" stroke="#B93A62" stroke-width="1.2"/>'};
document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="grn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .1  0 0 0 1.4 -.55"/></filter><filter id="wc2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter><filter id="wc" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter></svg>');
function starPts(cx,cy,R,r,n,rot){var p=[],i,a,q;for(i=0;i<n*2;i++){a=rot+i*Math.PI/n;q=i%2?r:R;p.push((cx+q*Math.sin(a)).toFixed(1)+' '+(cy-q*Math.cos(a)).toFixed(1))}return'M'+p.join('L')+'Z'}
var AVS=[[5,19,9,'#EA5E86'],[4,21,7,'#FF9F5A'],[6,19,10,'#037F71'],[8,19,12,'#9B6FD8']];
function avBody(i,cx,cy,k){var a=AVS[i];return'<path d="'+starPts(cx,cy,a[1]*k,a[2]*k,a[0],0)+'" fill="'+a[3]+'" stroke="#fff" stroke-width="'+1.5*k+'" stroke-linejoin="round"/><circle cx="'+(cx-4*k)+'" cy="'+(cy-k)+'" r="'+1.7*k+'" fill="#23262e"/><circle cx="'+(cx+4*k)+'" cy="'+(cy-k)+'" r="'+1.7*k+'" fill="#23262e"/><path d="M'+(cx-4*k)+' '+(cy+4*k)+'q'+4*k+' '+4*k+' '+8*k+' 0" fill="none" stroke="#23262e" stroke-width="'+1.4*k+'" stroke-linecap="round"/>'}
function avDiv(){var i=g('av',0),c=AVS[i][3];return'<div class="avatar" aria-hidden="true"><svg viewBox="0 0 76 70"><g class="av"><path d="M18 46L13 64M28 46L34 64M40 30L46 34" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/>'+avBody(i,22,28,1)+'<g class="can"><rect x="46" y="30" width="15" height="13" rx="3" fill="#FFD055" stroke="#23262e" stroke-width="1.5"/><path d="M61 34L71 27" stroke="#23262e" stroke-width="3" stroke-linecap="round"/><path d="M50 30q4-9 8 0" fill="none" stroke="#23262e" stroke-width="1.5"/><circle class="dr" cx="72" cy="30" r="2" fill="#4da3ff"/><circle class="dr" cx="74" cy="32" r="2" fill="#4da3ff" style="animation-delay:.25s"/><circle class="dr" cx="70" cy="32" r="1.6" fill="#4da3ff" style="animation-delay:.5s"/></g></g></svg></div>'}
function avPick(){var s='<span><b>Din avatar:</b></span>',i;for(i=0;i<4;i++)s+='<button class="avb'+(g('av',0)===i?' sel':'')+'" data-i="'+i+'" aria-label="Avatar '+(i+1)+'"><svg viewBox="0 0 44 44">'+avBody(i,22,22,1)+'</svg></button>';return s}
function starIcon(n){var c=['#EA5E86','#FFD055','#037F71','#9B6FD8','#FF9F5A','#F58FAE'][n.length%6];return'<svg viewBox="0 0 24 24" width="22" height="22"><path d="'+starPts(12,12,10,5,5,0)+'" fill="'+c+'"/></svg>'}
function dnc(i,cx,cy,d){var c=AVS[i][3];return'<g class="dnc" style="animation-delay:'+d+'s"><path d="M'+(cx-6)+' '+(cy+16)+'l-5 24M'+(cx+6)+' '+(cy+16)+'l7 20M'+(cx-15)+' '+(cy-2)+'L'+(cx-30)+' '+(cy-22)+'M'+(cx+15)+' '+(cy-2)+'L'+(cx+30)+' '+(cy-26)+'" stroke="'+c+'" stroke-width="5" stroke-linecap="round" fill="none"/>'+avBody(i,cx,cy,1.15)+'</g>'}
HSVG='<svg viewBox="0 0 320 190" role="img" aria-label="Dansende stjerne-avatarer, en sommerfugl og glimt"><path d="M0 172Q80 150 160 166T320 160V190H0Z" fill="#DDF2B8"/>'+dnc(0,50,104,0)+dnc(1,120,108,.3)+dnc(2,190,104,.6)+dnc(3,260,108,.9)+'<g transform="translate(272 30) rotate(12)"><ellipse cx="-11" cy="-4" rx="12" ry="8" fill="#EA5E86" transform="rotate(-20 -11 -4)"/><ellipse cx="11" cy="-4" rx="12" ry="8" fill="#FF9F5A" transform="rotate(20 11 -4)"/><ellipse cx="-8" cy="8" rx="8" ry="5" fill="#F58FAE"/><ellipse cx="8" cy="8" rx="8" ry="5" fill="#FFD094"/><rect x="-1.5" y="-8" width="3" height="20" rx="1.5" fill="#23262e"/></g><path d="'+starPts(30,30,9,3.5,4,0)+'" fill="#FFD055"/><path d="'+starPts(150,24,7,3,4,0)+'" fill="#EA5E86"/><path d="'+starPts(215,52,6,2.6,4,0)+'" fill="#9B6FD8"/><path d="'+starPts(88,48,5,2.2,4,0)+'" fill="#037F71"/></svg>';
function howto(force){if(!force&&g('ob',0))return;var i=0,d=document.createElement('div'),N=4,m9=TOOLS.map(function(t){return'<div>'+ill(t[0])+t[1]+'</div>'}).join('');d.className='gate';document.body.appendChild(d);
 var P=[function(){return'<h3>Velkommen til RecoveryNurse+</h3><p>RecoveryNurse+ støtter dig som sygeplejerske i at give patienter med samtidig psykisk lidelse og misbrug (dobbeltdiagnose) et <b>meningsfuldt, recovery-orienteret behandlingsforløb</b>.</p><p>Appen hjælper dig med at <b>reflektere over egne holdninger og stigmatiserende antagelser</b>, få et <b>helhedsorienteret billede af patienten</b> og øve <b>recovery-orienteret og personcentreret pleje</b>.</p>'},
function(){return'<h3>Sådan bruger du appen</h3><p>1. Vælg et redskab på forsiden. Hvert redskab forklarer selv, hvad det er, hvorfor og hvordan.</p><div class="mini9">'+m9+'</div><p class="small">Redskaberne til dig selv og teamet: Pandoras æske, barometer, detektor, spejl og autopilot. <b>Billedekort og Livets kompasnål udføres sammen med patienten.</b> Den svære samtale og Relations-GPS træner og støtter relationen.</p>'},
function(){return'<h3>Spil og din faglige have</h3><p>2. Hver gang du bruger et redskab, får du point, og din blomst vokser: frø, spire, plante, blomst.</p><p>3. Du stiger i niveau fra Nysgerrig til Recovery-orienteret.</p><p class="small">Point viser, hvor meget du har brugt et redskab. De måler ikke din faglige kompetence.</p>'},
function(){return'<h3>GDPR og anonymisering</h3><ul><li>Skriv aldrig navne, cpr-nr., fødselsdatoer, adresser eller andet, der kan genkende en patient eller kollega.</li><li>Brug „patienten“ og opdigtede eksempler.</li><li>Alt, du skriver, gemmes kun på din egen enhed – ikke på en server.</li><li>Du kan altid slette dine data nederst på forsiden.</li></ul>'}];
 function draw(){var dots='';for(var j=0;j<N;j++)dots+='<i'+(j===i?' class="on"':'')+'></i>';d.innerHTML='<div class="gbox" role="dialog" aria-label="Sådan bruger du appen"><div class="dots">'+dots+'</div>'+P[i]()+'<p class="row" style="margin-top:14px">'+(i?'<button class="btn ghost" id="hb">Tilbage</button>':'')+'<button class="btn" id="hn">'+(i<N-1?'Næste':'Jeg har forstået – start')+'</button></p></div>';
  if(i)d.querySelector('#hb').onclick=function(){i--;draw()};
  d.querySelector('#hn').onclick=function(){if(i<N-1){i++;draw()}else{set('ob',1);set('gd',1);d.remove()}}}
 draw()}
document.addEventListener('click',function(e){var t=e.target,b=t.closest&&t.closest('.avb'),h=t.closest&&t.closest('#howb');
 if(b){var n=+b.dataset.i;set('av',n);document.querySelectorAll('.avb').forEach(function(x){x.classList.toggle('sel',+x.dataset.i===n)});if(document.querySelector('.gwrap'))home()}
 if(h)howto(true)});
var _h3=home;home=function(){AVATAR=avDiv();_h3()};

var BPOS={spejl:[-4,18],kompas:[96,10],detektor:[-2,156],barometer:[40,285],gps:[280,16],sim:[288,140],kort:[266,280],pandora:[300,410],autopilot:[190,418]};
var PATHD='M150 495C175 440 235 430 215 340S200 240 245 190S270 150 262 128',LASTF=null;
function meadow(){var n=6+Math.round(avF()*30),cs=['#EA5E86','#FFD055','#FF9F5A','#9B6FD8','#FCC4C0','#fff'],o='',i,x,y,q=7;for(i=0;i<n;i++){x=(i*97+23)%380+10;y=(i*131+200)%340+170;var c=cs[i%6];o+='<g transform="translate('+x+' '+y+')"><path d="M0 0V9" stroke="#3f9d62" stroke-width="1.4"/>'+[0,72,144,216,288].map(function(r){return'<ellipse cx="0" cy="-3.2" rx="1.9" ry="3.2" fill="'+c+'" transform="rotate('+r+')"/>'}).join('')+'<circle r="1.6" fill="#FFD055"/></g>'}return o}
function rnd(i){var x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function sheep(x,y,f){return'<g transform="translate('+x+' '+y+') scale('+(f||1)+')"><ellipse cx="0" cy="0" rx="9" ry="6" fill="#fff"/><circle cx="-5" cy="-3" r="4.5" fill="#fff"/><circle cx="4" cy="-2" r="4.5" fill="#fff"/><ellipse cx="11" cy="-1" rx="3.6" ry="3" fill="#2b2b33"/><path d="M-4 5v5M4 5v5" stroke="#2b2b33" stroke-width="1.6" stroke-linecap="round"/></g>'}
function cyp(x,y,h){return'<path d="M'+x+' '+y+'q-'+h*.22+' -'+h*.5+' 0 -'+h+'q'+h*.22+' '+h*.5+' 0 '+h+'Z" fill="#2C7A4B"/><path d="M'+x+' '+y+'q-'+h*.08+' -'+h*.5+' 0 -'+h*.9+'" stroke="#3E9A5E" stroke-width="1.2" fill="none"/>'}
function house(x,y,w,c,r){return'<g transform="translate('+x+' '+y+')"><rect x="0" y="0" width="'+w+'" height="'+w*.6+'" fill="'+c+'"/><path d="M-2 0L'+w/2+' -'+w*.35+'L'+(w+2)+' 0Z" fill="'+r+'"/><rect x="'+w*.4+'" y="'+w*.2+'" width="'+w*.18+'" height="'+w*.4+'" fill="#7a4a35"/><rect x="'+w*.12+'" y="'+w*.15+'" width="'+w*.14+'" height="'+w*.14+'" fill="#fff"/><rect x="'+w*.72+'" y="'+w*.15+'" width="'+w*.14+'" height="'+w*.14+'" fill="#fff"/></g>'}
function tulip(x,y,k,c){return'<g transform="translate('+x+' '+y+') scale('+k+')"><path d="M0 0C-4 -14 4 -28 0 -42" stroke="#2f8f5f" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M0 -14C-14 -12 -22 -2 -16 6C-10 -2 -4 -6 0 -10Z" fill="#3FA06A"/><path d="M-8 -50C-10 -62 -2 -66 0 -58C2 -66 10 -62 8 -50C6 -40 -6 -40 -8 -50Z" fill="'+c+'"/><path d="M0 -58C-2 -50 0 -44 0 -42" stroke="#fff" stroke-width="1" opacity=".5" fill="none"/></g>'}
function dog(x,y,k){return'<g transform="translate('+x+' '+y+') scale('+k+')"><path d="M-14 -3Q-24 -5 -26 -14" stroke="#F0A93A" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M9 3L19 9M5 4L12 12M-9 3L-19 8M-5 4L-14 12" stroke="#F0A93A" stroke-width="3.6" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="14" ry="6.5" fill="#F5B840"/><circle cx="14" cy="-5" r="5.6" fill="#F5B840"/><ellipse cx="20" cy="-3" rx="4.2" ry="3" fill="#F5B840"/><circle cx="23.5" cy="-4" r="1.3" fill="#3a2a1a"/><circle cx="15" cy="-6.5" r="1" fill="#3a2a1a"/><ellipse cx="11" cy="-8" rx="2.6" ry="5" fill="#D8962A" transform="rotate(35 11 -8)"/><path d="M9 -1l6 0l-3 6Z" fill="#8a4b2f"/></g>'}
function paint(){var o='',i;
 o+='<path d="M0 142Q100 128 200 140T400 130V560H0Z" fill="#86C97E"/><path d="M0 190Q120 172 250 186T400 176V560H0Z" fill="#9AD286"/><path d="M0 268Q140 250 280 264T400 254V560H0Z" fill="#AADB8E"/><path d="M0 358Q130 342 270 354T400 344V560H0Z" fill="#BCE49C"/><path d="M0 448Q140 434 300 446T400 438V560H0Z" fill="#A5D88A"/><path d="M0 515Q160 500 400 512V560H0Z" fill="#8DCB7A"/>';
 for(i=0;i<170;i++){var x=rnd(i)*420-10,y=140+rnd(i+300)*415,l=7+rnd(i+900)*9,dk=rnd(i+5)>.5;o+='<path d="M'+x.toFixed(0)+' '+y.toFixed(0)+'l'+(rnd(i+2)*4-2).toFixed(1)+' -'+l.toFixed(0)+'" stroke="'+(dk?'#4C9A55':'#D6EFAE')+'" stroke-width="1.5" stroke-linecap="round" opacity=".35"/>'}
 o+='<g><path d="M178 238v-16" stroke="#3f6b3f" stroke-width="3"/><ellipse cx="178" cy="214" rx="11" ry="13" fill="#3F7A4A"/></g><g><path d="M168 318v-14" stroke="#3f6b3f" stroke-width="3"/><ellipse cx="168" cy="297" rx="9" ry="11" fill="#4A8A52"/></g>';
 for(i=0;i<30;i++){o+='<circle cx="'+(rnd(i+1200)*400).toFixed(0)+'" cy="'+(160+rnd(i+1300)*390).toFixed(0)+'" r="'+(1+rnd(i)*1.2).toFixed(1)+'" fill="#fff" opacity=".8"/>'}
 [[118,552,.9,'#F28DB0'],[134,556,1.1,'#F8B7CF'],[152,550,.85,'#EA5E86'],[170,556,1,'#F8B7CF']].forEach(function(t){o+=tulip(t[0],t[1],t[2],t[3])});
 return o}
function sceneBg(){var r='',i;for(i=0;i<14;i++){var q=i*Math.PI/7;r+='<path d="M'+(320+36*Math.cos(q)).toFixed(0)+' '+(58+36*Math.sin(q)).toFixed(0)+'L'+(320+(i%2?48:58)*Math.cos(q)).toFixed(0)+' '+(58+(i%2?48:58)*Math.sin(q)).toFixed(0)+'" stroke="'+(i%2?'#FFD055':'#FF9F5A')+'" stroke-width="5" stroke-linecap="round"/>'}
 var gr='';[[40,300],[200,470],[360,300],[60,520],[270,330],[350,420],[180,150],[90,250],[380,200],[20,430]].forEach(function(p){gr+='<path d="M'+p[0]+' '+p[1]+'l-4-10M'+p[0]+' '+p[1]+'l0-13M'+p[0]+' '+p[1]+'l4-10" stroke="#037F71" stroke-width="2" stroke-linecap="round" fill="none" opacity=".55"/>'});
 return'<svg class="scn" viewBox="0 0 400 560" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="skg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBE6FA"/><stop offset=".3" stop-color="#E9F6FF"/></linearGradient></defs><rect width="400" height="560" fill="url(#skg)"/><g transform="translate(246 52)"><circle r="33" fill="#FFF3B0" opacity=".5" class="glow"/><g class="rays"><path d="M0 -27 V-41" transform="rotate(0)" stroke="#FF9F5A" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-36" transform="rotate(30)" stroke="#FFC93C" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-41" transform="rotate(60)" stroke="#FF9F5A" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-36" transform="rotate(90)" stroke="#FFC93C" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-41" transform="rotate(120)" stroke="#FF9F5A" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-36" transform="rotate(150)" stroke="#FFC93C" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-41" transform="rotate(180)" stroke="#FF9F5A" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-36" transform="rotate(210)" stroke="#FFC93C" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-41" transform="rotate(240)" stroke="#FF9F5A" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-36" transform="rotate(270)" stroke="#FFC93C" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-41" transform="rotate(300)" stroke="#FF9F5A" stroke-width="4.2" stroke-linecap="round"/><path d="M0 -27 V-36" transform="rotate(330)" stroke="#FFC93C" stroke-width="4.2" stroke-linecap="round"/></g><circle r="22" fill="#FFD84D"/><circle r="17" fill="#FFE575" opacity=".75"/><circle cx="-7.5" cy="-3" r="2.2" fill="#23262e"/><circle cx="7.5" cy="-3" r="2.2" fill="#23262e"/><path d="M-8 4q8 8 16 0" fill="none" stroke="#23262e" stroke-width="2.2" stroke-linecap="round"/><circle cx="-13" cy="3" r="3.2" fill="#FF9F5A" opacity=".55"/><circle cx="13" cy="3" r="3.2" fill="#FF9F5A" opacity=".55"/></g><g fill="#fff"><ellipse cx="60" cy="40" rx="34" ry="12"/><ellipse cx="86" cy="30" rx="22" ry="12"/><ellipse cx="190" cy="72" rx="26" ry="9"/></g>'+paint()+''+gr+meadow()+'<path d="'+PATHD+'" fill="none" stroke="#D9CFA0" stroke-width="36" stroke-linecap="round"/><path id="wpath" d="'+PATHD+'" fill="none" stroke="#EFE6BE" stroke-width="30" stroke-linecap="round"/><path d="'+PATHD+'" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="3 12" stroke-linecap="round" opacity=".9"/>'+house(254,106,24,'#F4E2B8','#8a3f2a')+'<g transform="translate(300 96) rotate(-10)"><ellipse cx="-9" cy="-3" rx="10" ry="7" fill="#EA5E86"/><ellipse cx="9" cy="-3" rx="10" ry="7" fill="#FF9F5A"/><rect x="-1.3" y="-8" width="2.6" height="16" rx="1.3" fill="#23262e"/></g></svg>'}
function snailSvg(){return'<svg class="snl" viewBox="0 0 110 120" role="img" aria-label="Snegl: small steps every day"><ellipse cx="56" cy="24" rx="50" ry="21" fill="#fff" stroke="#23262e" stroke-width="1.5"/><path d="M26 40l-6 12 18-8Z" fill="#fff" stroke="#23262e" stroke-width="1.5" stroke-linejoin="round"/><path d="M27 41l8 3" stroke="#fff" stroke-width="3"/><text x="56" y="21" text-anchor="middle" style="font:600 12px Caveat,cursive;fill:#EA5E86">small steps</text><text x="56" y="35" text-anchor="middle" style="font:600 12px Caveat,cursive;fill:#EA5E86">every day</text><path d="M4 112Q6 96 30 96H92Q104 96 98 108Q96 112 90 112Z" fill="#8DBB4A"/><path d="M80 98Q76 74 84 64" fill="none" stroke="#8DBB4A" stroke-width="7" stroke-linecap="round"/><circle cx="85" cy="62" r="5" fill="#8DBB4A"/><circle cx="86" cy="61" r="1.6" fill="#23262e"/><path d="M92 99Q96 86 100 80" fill="none" stroke="#8DBB4A" stroke-width="6" stroke-linecap="round"/><circle cx="101" cy="78" r="4.5" fill="#8DBB4A"/><circle cx="102" cy="77" r="1.5" fill="#23262e"/><circle cx="40" cy="80" r="29" fill="#FF6B4A"/><circle cx="40" cy="80" r="23" fill="#FFD094"/><path d="M40 80m0 0c0-3 4-4 6-2s0 8-6 8-12-5-12-12 6-15 15-15 18 8 18 18" fill="none" stroke="#EA5E86" stroke-width="4.5" stroke-linecap="round"/><path d="M34 54c8-4 20 0 24 10M62 84c-3 10-13 16-24 14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></svg>'}
function pathPt(f){var p=document.getElementById('wpath');if(!p)return{x:150,y:540};var L=p.getTotalLength(),q=p.getPointAtLength(L*(.03+.9*f));return q}
function avF(){return Math.min(1,total()/LV[LV.length-1][0])}
function placeAv(av,f){var q=pathPt(f);av.style.left=(q.x/4)+'%';av.style.top=(q.y/5.6)+'%'}
function skyDeco(){function st(x,y,r,c){return'<path d="'+starPts(x,y,r,r*.42,4,0)+'" fill="'+c+'"/>'}function bf(x,y,rot,a,b){return'<g transform="translate('+x+' '+y+') rotate('+rot+')"><ellipse cx="-9" cy="-3" rx="10" ry="7" fill="'+a+'" transform="rotate(-20 -9 -3)"/><ellipse cx="9" cy="-3" rx="10" ry="7" fill="'+b+'" transform="rotate(20 9 -3)"/><ellipse cx="-6" cy="6" rx="6" ry="4" fill="'+b+'" opacity=".8"/><ellipse cx="6" cy="6" rx="6" ry="4" fill="'+a+'" opacity=".8"/><rect x="-1.2" y="-8" width="2.4" height="16" rx="1.2" fill="#23262e"/><path d="M0 -8q-3 -6 -6 -7M0 -8q3 -6 6 -7" stroke="#23262e" fill="none" stroke-width="1"/></g>'}
 return'<svg class="skd" viewBox="0 0 400 190" preserveAspectRatio="none" aria-hidden="true"><g fill="#fff"><ellipse cx="70" cy="165" rx="40" ry="11"/><ellipse cx="96" cy="155" rx="24" ry="11"/><ellipse cx="340" cy="150" rx="34" ry="10"/></g>'+st(28,30,10,'#FFD055')+st(372,26,9,'#EA5E86')+st(200,14,7,'#9B6FD8')+st(52,100,6,'#EA5E86')+st(352,96,7,'#FFD055')+st(300,20,6,'#037F71')+st(120,22,5,'#FF9F5A')+st(382,150,6,'#9B6FD8')+bf(36,70,-14,'#EA5E86','#FF9F5A')+bf(362,56,14,'#9B6FD8','#FCC4C0')+bf(318,160,-8,'#FFD055','#EA5E86')+'</svg>'}
function scene(){var w=document.querySelector('.gwrap');if(!w||w.dataset.sc)return;w.dataset.sc=1;
 var hero=document.querySelector('.hero'),hb=document.getElementById('howb'),sk=document.createElement('div'),gw=document.createElement('div');sk.className='skyhead';sk.innerHTML=skyDeco()+'<h1>RecoveryNurse+</h1><p>Øvelser i anerkendelse, refleksion og relation – for dig og dit team. Styrk din recovery-orienterede og personcentrerede praksis.</p>';if(hb)sk.appendChild(hb);if(hero)hero.remove();
 gw.className='gardenwrap';w.parentNode.insertBefore(gw,w);gw.appendChild(sk);gw.appendChild(w);var h3=gw.parentNode.querySelector(':scope > h3');if(h3)h3.style.display='none';
 w.insertAdjacentHTML('afterbegin',sceneBg());
 [].forEach.call(w.querySelectorAll('.bedrow .plt'),function(b){var p=BPOS[b.dataset.k];b.style.left=(p[0]/4)+'%';b.style.top=(p[1]/5.6)+'%';b.style.zIndex=2+Math.round(p[1]/10)});
;
 var pn=gw.parentNode,ref=pn.querySelector('.avpick'),rows=[pn.querySelector(':scope > .row'),pn.querySelector('.road'),pn.querySelector(':scope > p.small')];
 rows.forEach(function(e){if(e&&ref)pn.insertBefore(e,ref)});
 var av=w.querySelector('.avatar'),f=avF();if(av){av.style.opacity=0;placeAv(av,0)}
 var pm=document.createElement('div');pm.className='pmark';pm.setAttribute('aria-label','Din fremgang på stien');pm.innerHTML='<svg viewBox="0 0 24 24"><path d="'+starPts(12,12,11,5,5,0)+'" fill="#FFD055" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';w.appendChild(pm);placeAv(pm,LASTF===null?f:LASTF);if(LASTF!==null&&LASTF!==f)setTimeout(function(){if(document.body.contains(pm))placeAv(pm,f)},500);LASTF=f}
function waterLoop(){scene();var w=document.querySelector('.gwrap');if(!w)return;var av=w.querySelector('.avatar');if(!av)return;
 var q=WQ.splice(0),bs=[].slice.call(w.querySelectorAll('.bedrow .plt')),list=[];
 if(q.indexOf('*')>-1)list=bs;else q.forEach(function(k){var b=w.querySelector('.plt[data-k="'+k+'"]');if(b&&list.indexOf(b)<0)list.push(b)});
 if(!list.length){av.style.opacity=0;return}
 av.style.transition='none';placeAv(av,0);void av.offsetWidth;av.style.transition='';av.style.opacity=1;
 var i=0;function back(){if(!document.body.contains(w))return;av.classList.add('walk');placeAv(av,0);setTimeout(function(){av.style.opacity=0;av.classList.remove('walk')},1500)}
 (function nx(){if(!document.body.contains(w))return;if(i>=list.length){setTimeout(back,300);return}var b=list[i++],wr=w.getBoundingClientRect(),br=b.getBoundingClientRect();
  av.classList.add('walk');av.style.left=(br.left-wr.left-4)+'px';av.style.top=(br.top-wr.top+br.height*.62)+'px';
  setTimeout(function(){av.classList.remove('walk');av.classList.add('pour');b.classList.add('wet');setTimeout(function(){av.classList.remove('pour');b.classList.remove('wet');nx()},1800)},1400)})()}

/* ===== Startside v3: efter brugerens mockup ===== */
var BP={spejl:[128,190,'R'],kort:[376,170,'L'],kompas:[285,346,'L'],barometer:[44,238,'R'],detektor:[298,212,'R'],autopilot:[184,246,'R'],gps:[376,292,'L'],sim:[40,362,'R'],pandora:[366,398,'L']};
PATHD='M138 508C142 440 118 400 136 340C150 300 180 292 192 276S234 240 242 196S252 170 258 152';
function beds(){return TOOLS.map(function(x,i){var k=x[0],st=stg(pts(k)),P=BP[k],R=P[2]==='R',ox=R?42:88,sx=R?96:34,bx=R?72:10;
 var sign='<g><rect x="'+(sx-3)+'" y="48" width="6" height="56" rx="2" fill="#B07A45"/><g transform="rotate('+(R?-5:5)+' '+sx+' 60)"><rect x="'+(sx-33)+'" y="36" width="66" height="32" rx="3" fill="#E6BC82" stroke="#A67840" stroke-width="1.6"/><path d="M'+(sx-26)+' 41H'+(sx+26)+'" stroke="#fff" stroke-opacity=".25" stroke-width="2"/><text text-anchor="middle" x="'+sx+'" y="'+(SG[k][1]?'50':'56')+'" style="fill:#4a3220;font:700 11.5px Nunito,sans-serif">'+SG[k][0]+'</text>'+(SG[k][1]?'<text text-anchor="middle" x="'+sx+'" y="63" style="fill:#4a3220;font:700 11.5px Nunito,sans-serif">'+SG[k][1]+'</text>':'')+'</g></g>';
 return'<svg class="plt" viewBox="0 0 130 112" data-k="'+k+'" data-ox="'+ox+'" tabindex="0" role="button" aria-label="'+x[1]+': '+SN[st]+'"><g transform="translate('+ox+' 94) scale(1.05)"><g class="wt"><g class="gr" style="animation-delay:'+(i*.15)+'s">'+plantSvg(st,k)+'</g></g></g>'+sign+'</svg>'}).join('')}
var _ps=plantSvg;function bedPieces(k){return Math.min(6,Math.ceil(pts(k)/2))}
plantSvg=function(st,k){
 var jord='<ellipse cx="0" cy="0" rx="37" ry="9" fill="#905A3A"/><ellipse cx="0" cy="-1.5" rx="33" ry="7" fill="#9D6743"/>';
 if(st===0)return jord;
 var p=bedPieces(k),img='<image href="assets/bed-'+k+'.png" x="-50" y="-82" width="100" height="100" preserveAspectRatio="xMidYMax meet"'+(p<6?' mask="url(#bm-'+k+')"':'')+'/>';
 if(p>=6)return jord+img;
 var f=.3+.7*(p-1)/5,t=1-f,t2=Math.min(1,t+.1);
 return '<defs><linearGradient id="bg-'+k+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="'+t.toFixed(3)+'" stop-color="#000"/><stop offset="'+t2.toFixed(3)+'" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient><mask id="bm-'+k+'" maskUnits="userSpaceOnUse" x="-50" y="-94" width="100" height="100"><rect x="-50" y="-94" width="100" height="100" fill="url(#bg-'+k+')"/></mask></defs>'+jord+img;
};
function orchid(x,y,k,a,b){var o='<g transform="translate('+x+' '+y+') scale('+k+')">',i;for(i=0;i<5;i++)o+='<ellipse cx="0" cy="-11" rx="6" ry="11" fill="'+a+'" transform="rotate('+(i*72)+')"/>';for(i=0;i<9;i++)o+='<circle cx="'+(rnd(i+x)*14-7).toFixed(1)+'" cy="'+(rnd(i+y)*18-9).toFixed(1)+'" r="1" fill="#8a2a5a"/>';return o+'<ellipse cx="0" cy="1" rx="5" ry="6" fill="'+b+'"/><circle cx="0" cy="-1" r="2" fill="#8a2a5a"/></g>'}
function trio(x,y){var o='<g transform="translate('+x+' '+y+')">';[['#F7C4C4',-14],['#EDEB8A',0],['#9ED8C0',14]].forEach(function(c,i){o+='<g transform="translate('+c[1]+' '+(i===1?-4:0)+')"><rect x="-7" y="6" width="14" height="30" rx="7" fill="'+c[0]+'"/><circle cx="0" cy="0" r="8" fill="'+c[0]+'"/><circle cx="-2.6" cy="-1" r=".9" fill="#7a6a5a"/><circle cx="2.6" cy="-1" r=".9" fill="#7a6a5a"/><path d="M-2.5 2.5q2.5 2 5 0" fill="none" stroke="#7a6a5a" stroke-width=".8" stroke-linecap="round"/></g>'});return o+'</g>'}
function sceneBg(){var o='',i,sc='';
 for(i=0;i<22;i++){var a=i*Math.PI*2/22;sc+='<circle cx="'+(322+66*Math.cos(a)).toFixed(1)+'" cy="'+(80+66*Math.sin(a)).toFixed(1)+'" r="9" fill="#F9CF45"/>'}
 o+='<rect width="400" height="500" fill="#E1F0FF"/><g class="sunw"><g class="rays" style="transform-origin:322px 80px">'+sc+'</g><circle cx="322" cy="80" r="60" fill="url(#sung)"/><circle cx="322" cy="80" r="48" fill="#FFE98A" opacity=".5" class="glow2"/></g>';
 o+='<defs><radialGradient id="sung" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#FFF0A0"/><stop offset="1" stop-color="#F8CC44"/></radialGradient></defs>';
 o+='<rect y="149" width="400" height="351" fill="#8DD14E"/>';
 for(i=0;i<140;i++){var x=rnd(i+40)*400,y=150+rnd(i+80)*350;o+='<path d="M'+x.toFixed(0)+' '+y.toFixed(0)+'l'+(rnd(i)*3-1.5).toFixed(1)+' -'+(5+rnd(i+9)*6).toFixed(0)+'" stroke="'+(rnd(i+3)>.5?'#6FB63B':'#A8E26B')+'" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>'}
 o+=meadow();
 o+=orchid(22,62,1.1,'#F4A6C2','#F7D056')+orchid(10,100,1,'#F4A6C2','#F7D056')+orchid(48,96,1.05,'#F6B2C8','#F7D056')+orchid(36,28,.7,'#F4A6C2','#F7D056');
 o+='<path d="M30 150C26 110 36 60 40 18" stroke="#6f8f3a" stroke-width="2.5" fill="none"/><path d="M18 152C0 120 -4 90 6 70M40 152C58 120 70 100 66 78" stroke="#8fa84a" stroke-width="6" stroke-linecap="round" fill="none" opacity=".8"/>';
 o+='<path d="M0 440Q80 410 170 450L230 500H0Z" fill="#B5683B"/>';
 o+='<path d="M136 342C110 326 78 322 44 318" fill="none" stroke="#B5683B" stroke-width="34" stroke-linecap="round"/><path d="'+PATHD+'" fill="none" stroke="#B5683B" stroke-width="74" stroke-linecap="round"/><path id="wpath" d="'+PATHD+'" fill="none" stroke="#C47A4A" stroke-width="52" stroke-linecap="round" opacity=".55"/>';
 for(i=0;i<60;i++){o+='<circle cx="'+(rnd(i+500)*150+60).toFixed(0)+'" cy="'+(300+rnd(i+600)*200).toFixed(0)+'" r="'+(1+rnd(i)*1.5).toFixed(1)+'" fill="#9a5630" opacity=".5"/>'}
 o+=trio(172,150)+trio(247,312);
 o+='<g transform="translate(236 34) rotate(8) scale(1.35)"><ellipse cx="-11" cy="-4" rx="12" ry="9" fill="#F0506E" transform="rotate(-22 -11 -4)"/><ellipse cx="11" cy="-4" rx="12" ry="9" fill="#FFA23A" transform="rotate(22 11 -4)"/><ellipse cx="-8" cy="8" rx="8" ry="6" fill="#F58FAE"/><ellipse cx="8" cy="8" rx="8" ry="6" fill="#FFD094"/><path d="M-16 -8l8 4M16 -8l-8 4" stroke="#fff" stroke-width="1" opacity=".7"/><rect x="-1.3" y="-9" width="2.6" height="20" rx="1.3" fill="#23262e"/></g>';
 return'<svg class="scn" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">'+o+'</svg>'}
function placeAv(av,f){var q=pathPt(f);av.style.left=(q.x/4)+'%';av.style.top=(q.y/5)+'%'}
function scene(){var w=document.querySelector('.gwrap');if(!w||w.dataset.sc)return;w.dataset.sc=1;
 var hero=document.querySelector('.hero'),hb=document.getElementById('howb');if(hero)hero.remove();
 w.insertAdjacentHTML('afterbegin',sceneBg());
 w.insertAdjacentHTML('beforeend','<div class="ttl"><h1>RECOVERYNURSE+</h1><p>Øvelser i anerkendelse, refleksion og relation – for dig og dit team. Styrk din recovery-orienterede og personcentrerede praksis.</p></div><div class="snailw">'+snailSvg()+'</div>');
 [].forEach.call(w.querySelectorAll('.bedrow .plt'),function(b){var P=BP[b.dataset.k],ox=+b.dataset.ox;b.style.left=((P[0]-ox)/4)+'%';b.style.top=((P[1]-94)/5)+'%';b.style.zIndex=2+Math.round(P[1]/10)});
 var pn=w.parentNode,ref=pn.querySelector('.avpick'),rows=[pn.querySelector(':scope > .row'),pn.querySelector('.road'),pn.querySelector(':scope > p.small')];
 rows.forEach(function(e){if(e&&ref)pn.insertBefore(e,ref)});var h3=pn.querySelector(':scope > h3');if(h3)h3.style.display='none';
 if(hb){hb.style.display='block';hb.style.margin='4px auto 8px';w.insertAdjacentElement('afterend',hb)}
 var av=w.querySelector('.avatar'),f=avF();if(av){av.style.opacity=0;placeAv(av,0)}
 var pm=document.createElement('div');pm.className='pmark';pm.setAttribute('aria-label','Din fremgang på stien');pm.innerHTML='<svg viewBox="0 0 24 24"><path d="'+starPts(12,12,11,5,5,0)+'" fill="#FFD055" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';w.appendChild(pm);placeAv(pm,LASTF===null?f:LASTF);if(LASTF!==null&&LASTF!==f)setTimeout(function(){if(document.body.contains(pm))placeAv(pm,f)},500);LASTF=f}

/* ===== Startside v4: ryddeligt og stringent ===== */
BP={spejl:[48,214,'R'],detektor:[48,290,'R'],barometer:[48,366,'R'],sim:[48,442,'R'],kort:[352,202,'L'],gps:[352,274,'L'],kompas:[352,346,'L'],autopilot:[352,418,'L'],pandora:[352,490,'L']};
PATHD='M200 512C200 462 176 446 180 404S228 346 222 304S178 252 188 214S206 172 206 150';
function pathPt(f){var p=document.getElementById('wpath');if(!p)return{x:200,y:400};var L=p.getTotalLength();return p.getPointAtLength(L*(.38+.58*f))}
function trio2(x,y){var o='<g transform="translate('+x+' '+y+')">',C=[['#A9B8F0',-19],['#F7B6C8',0],['#9ED8C0',19]];
 o+='<ellipse cx="0" cy="2" rx="36" ry="5" fill="#000" opacity=".12"/>';
 C.forEach(function(c,i){var h=i===1?-4:0;o+='<g transform="translate('+c[1]+' '+h+')"><rect x="-8" y="-30" width="16" height="32" rx="8" fill="'+c[0]+'" stroke="#fff" stroke-width="1.5"/><circle cx="0" cy="-38" r="9" fill="'+c[0]+'" stroke="#fff" stroke-width="1.5"/><circle cx="-3" cy="-39" r="1.1" fill="#4a4a5a"/><circle cx="3" cy="-39" r="1.1" fill="#4a4a5a"/><path d="M-3 -35q3 3 6 0" fill="none" stroke="#4a4a5a" stroke-width="1" stroke-linecap="round"/></g>'});
 o+='<path d="M-19 -24Q0 -16 19 -24" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M-19 -24Q0 -16 19 -24" fill="none" stroke="#F7B6C8" stroke-width="3" stroke-linecap="round" opacity=".8"/>'+ht(0,-20,.075,'#EA5E86');
 o+='<rect x="-34" y="7" width="68" height="22" rx="11" fill="#fff" stroke="#EA5E86" stroke-width="1.2"/><text x="0" y="16.5" text-anchor="middle" style="font:800 7.6px Nunito,sans-serif;fill:#B93A62">Sammen med</text><text x="0" y="25" text-anchor="middle" style="font:800 7.6px Nunito,sans-serif;fill:#B93A62">patienten</text></g>';return o}
function sceneBg(){var o='',i,sc='';
 for(i=0;i<22;i++){var a=i*Math.PI*2/22;sc+='<circle cx="'+(322+66*Math.cos(a)).toFixed(1)+'" cy="'+(80+66*Math.sin(a)).toFixed(1)+'" r="9" fill="#F9CF45"/>'}
 o+='<defs><radialGradient id="sung" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#FFF0A0"/><stop offset="1" stop-color="#F8CC44"/></radialGradient></defs><rect width="400" height="500" fill="#E1F0FF"/>';
 o+='<g fill="#fff" opacity=".9"><ellipse cx="60" cy="128" rx="34" ry="9"/><ellipse cx="82" cy="120" rx="20" ry="9"/></g>';
 o+='<g class="sunw"><g class="rays" style="transform-origin:322px 80px">'+sc+'</g><circle cx="322" cy="80" r="60" fill="url(#sung)"/><circle cx="322" cy="80" r="48" fill="#FFE98A" opacity=".5" class="glow2"/></g>';
 o+='<rect y="150" width="400" height="350" fill="#8DD14E"/><rect y="150" width="400" height="6" fill="#7BC244"/>';
 o+='<path d="'+PATHD+'" fill="none" stroke="#B5773F" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/><path d="'+PATHD+'" fill="none" stroke="#D9A56B" stroke-width="40" stroke-linecap="round"/><path id="wpath" d="'+PATHD+'" fill="none" stroke="#EBC893" stroke-width="2.5" stroke-dasharray="2 9" stroke-linecap="round"/>';
 o+=trio2(192,222)+trio2(222,360);
 o+='<g transform="translate(236 40) rotate(8) scale(1.3)"><ellipse cx="-11" cy="-4" rx="12" ry="9" fill="#F0506E" transform="rotate(-22 -11 -4)"/><ellipse cx="11" cy="-4" rx="12" ry="9" fill="#FFA23A" transform="rotate(22 11 -4)"/><ellipse cx="-8" cy="8" rx="8" ry="6" fill="#F58FAE"/><ellipse cx="8" cy="8" rx="8" ry="6" fill="#FFD094"/><rect x="-1.3" y="-9" width="2.6" height="20" rx="1.3" fill="#23262e"/></g>';
 return'<svg class="scn" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">'+o+'</svg>'}

/* ===== Startside v5: følger brugerens mockup ===== */
/* --- INDSTILLINGER (kan rettes af dig) ---
   Billedfiler lægges i mappen assets/ ved siden af filen. Se LAES-MIG.txt. */
var ASSETDIR='assets/', BEDW=100;
var SLOT={sol:[181,-10,249,252],sommerfugl:[198,8,52,48],orkideer:[0,0,82,158]};
var BP={spejl:[130,176],detektor:[315,209],barometer:[46,256],autopilot:[182,242],kort:[374,164],gps:[369,313],sim:[26,379],kompas:[272,341],pandora:[359,410]};
var SP={spejl:[98,144,5],detektor:[354,185,2],barometer:[83,225,-1],autopilot:[218,213,7],kort:[332,132,1],gps:[323,279,-2],sim:[60,353,-2],kompas:[234,313,3],pandora:[306,384,-8]};
var PATH_OUTLINE="M313.8 151.3C310.8 150.9 308.5 149.1 296.4 150.8C284.3 152.5 255.9 157.9 241.0 161.5C226.1 165.1 214.9 169.3 207.2 172.3C199.4 175.3 197.9 176.9 194.4 179.5C190.8 182.0 187.0 185.5 185.6 187.7C184.3 189.8 184.9 190.5 186.1 192.3C187.3 194.1 191.3 196.5 192.8 198.5C194.4 200.4 194.9 202.0 195.4 204.1C195.8 206.1 195.8 208.5 195.4 210.8C194.9 213.1 192.9 215.9 192.8 217.9C192.7 220.0 192.2 220.9 194.9 223.1C197.5 225.2 200.9 227.9 208.7 230.8C216.5 233.7 234.8 237.9 241.5 240.5C248.3 243.2 247.5 244.7 249.2 246.7C250.9 248.6 251.4 250.3 251.8 252.3C252.2 254.3 252.2 256.5 251.8 258.5C251.4 260.4 250.3 262.5 249.2 264.1C248.1 265.7 249.2 266.1 245.1 268.2C241.0 270.2 230.8 275.0 224.6 276.4C218.5 277.8 231.3 273.3 208.2 276.4C185.1 279.5 110.3 290.5 86.2 294.9C62.0 299.2 69.4 299.9 63.1 302.6C56.7 305.2 51.1 308.8 48.2 310.8C45.3 312.7 46.2 312.8 45.6 314.3C45.1 315.9 44.2 317.8 45.1 320.0C46.1 322.2 48.6 325.6 51.3 327.7C53.9 329.7 56.7 331.5 61.0 332.3C65.4 333.1 73.8 331.9 77.4 332.3C81.1 332.7 81.4 333.7 83.1 334.9C84.7 336.0 86.1 337.3 87.2 339.0C88.3 340.6 89.3 342.6 89.7 344.6C90.2 346.6 90.9 347.6 89.7 350.8C88.6 353.9 82.1 360.2 83.1 363.6C84.0 366.9 92.6 368.8 95.4 370.8C98.2 372.7 98.8 373.7 100.0 375.4C101.2 377.1 102.1 379.0 102.6 381.0C103.0 383.1 103.0 385.6 102.6 387.7C102.1 389.7 101.1 391.7 100.0 393.3C98.9 394.9 98.1 396.1 95.9 397.4C93.7 398.7 93.8 399.5 86.7 401.0C79.6 402.5 63.2 405.5 53.3 406.7C43.5 407.8 39.1 407.2 27.7 408.2C16.2 409.2 -8.2 395.4 -15.4 412.8C-22.6 430.2 -54.6 496.1 -15.4 512.8C23.8 529.5 180.3 517.2 220.0 512.8C259.6 508.4 218.5 493.2 222.6 486.1C226.6 479.0 238.2 475.2 244.1 470.2C250.0 465.3 254.1 460.9 257.9 456.4C261.8 451.9 264.5 448.2 267.2 443.1C269.8 437.9 272.7 431.5 273.8 425.6C274.9 419.7 274.8 413.1 273.8 407.7C272.9 402.3 270.6 397.4 268.2 393.3C265.8 389.2 262.0 385.5 259.5 383.1C256.9 380.6 264.1 384.1 252.8 378.4C241.5 372.8 202.9 355.2 191.8 349.2C180.7 343.2 187.3 345.2 186.1 342.6C185.0 339.9 184.9 335.8 185.1 333.3C185.4 330.8 186.6 329.3 187.7 327.7C188.8 326.1 189.1 324.9 191.8 323.6C194.4 322.2 200.9 320.7 203.6 319.5C206.2 318.3 206.2 320.3 207.7 316.4C209.1 312.5 211.1 300.1 212.3 295.9C213.5 291.7 213.1 293.1 214.9 291.3C216.7 289.5 218.3 286.2 223.1 285.1C227.9 284.0 238.4 284.1 243.6 284.6C248.8 285.1 250.8 287.4 254.3 288.2C257.9 289.0 262.4 288.8 264.6 289.2C266.8 289.6 265.7 288.5 267.7 290.8C269.6 293.0 274.3 300.2 276.4 302.6C278.5 304.9 275.2 304.9 280.0 304.6C284.8 304.3 298.3 302.3 305.1 301.0C312.0 299.7 318.3 298.0 321.0 296.9C323.7 295.8 322.0 296.1 321.5 294.3C321.0 292.6 318.5 288.6 317.9 286.1C317.3 283.7 317.5 281.5 317.9 279.5C318.4 277.4 319.4 275.5 320.5 273.8C321.6 272.2 322.8 270.8 324.6 269.7C326.4 268.6 328.0 267.6 331.3 267.2C334.5 266.7 340.5 268.0 344.1 267.2C347.7 266.3 351.1 263.3 352.8 262.0C354.5 260.8 354.3 261.0 354.3 259.5C354.4 257.9 354.1 254.7 353.3 252.8C352.6 250.9 351.9 250.0 349.7 248.2C347.6 246.4 345.3 244.3 340.5 242.0C335.7 239.7 332.7 238.0 321.0 234.3C309.3 230.7 282.6 224.2 270.2 220.0C257.9 215.8 252.5 212.6 247.2 209.2C241.9 205.9 240.1 203.1 238.5 200.0C236.8 196.9 237.3 193.0 237.4 190.8C237.5 188.5 236.3 189.4 239.0 186.7C241.6 183.9 248.6 177.6 253.3 174.4C258.0 171.1 257.3 170.5 267.2 167.2C277.0 163.8 304.4 156.7 312.3 154.4C320.2 152.0 314.1 153.3 314.3 152.8C314.6 152.3 316.8 151.6 313.8 151.3Z";
var PATH_OUTLINE="M293.9 155.4C292.8 154.4 286.7 154.4 280.1 155.1C273.5 155.9 263.1 157.6 254.2 159.8C245.3 162.0 234.8 164.6 226.7 168.3C218.6 172.0 210.3 176.5 205.6 181.9C200.9 187.3 198.2 194.3 198.4 200.8C198.6 207.2 202.5 214.4 206.8 220.4C211.2 226.4 219.5 231.5 224.3 236.9C229.1 242.2 235.1 247.5 235.8 252.5C236.5 257.5 233.6 262.9 228.6 266.8C223.7 270.6 214.5 273.3 205.9 275.7C197.4 278.0 187.1 279.2 177.3 280.8C167.6 282.4 157.5 283.7 147.5 285.3C137.6 286.8 127.5 288.3 117.8 290.2C108.1 292.1 97.8 294.0 89.5 296.9C81.2 299.8 72.4 303.4 68.0 307.6C63.6 311.8 62.0 317.0 62.9 322.0C63.7 326.9 69.5 331.9 73.3 337.5C77.1 343.1 82.6 349.3 85.5 355.7C88.3 362.0 91.0 369.7 90.4 375.9C89.9 382.1 87.4 388.5 82.3 392.9C77.3 397.4 68.7 400.4 60.3 402.7C52.0 405.0 41.4 405.2 32.3 406.8C23.2 408.4 13.4 408.8 5.7 412.1C-2.1 415.4 -9.2 420.2 -14.4 426.7C-19.6 433.1 -23.6 442.3 -25.7 450.8C-27.8 459.3 -28.7 469.4 -27.2 477.6C-25.6 485.8 -21.8 494.0 -16.3 500.0C-10.8 505.9 -2.4 510.2 6.0 513.3C14.4 516.5 24.6 517.7 34.3 518.9C44.0 520.1 54.2 520.2 64.3 520.5C74.3 520.8 84.4 520.6 94.5 520.4C104.5 520.2 114.6 519.9 124.7 519.4C134.7 519.0 144.9 518.5 154.8 517.8C164.8 517.1 175.1 516.5 184.3 515.1C193.5 513.7 202.8 512.4 209.8 509.4C216.8 506.4 221.6 502.3 226.3 497.3C230.9 492.3 233.5 485.9 237.9 479.4C242.2 472.8 247.8 465.7 252.2 458.1C256.6 450.5 262.1 442.1 264.2 433.8C266.3 425.4 267.0 416.1 265.0 408.1C263.0 400.1 258.0 392.3 252.3 385.7C246.5 379.1 237.7 374.0 230.4 368.6C223.2 363.1 214.1 358.6 208.8 353.0C203.6 347.5 199.5 341.5 198.9 335.3C198.2 329.0 201.2 321.7 205.0 315.6C208.8 309.5 215.0 302.7 221.6 298.7C228.1 294.7 236.2 292.5 244.2 291.8C252.2 291.1 261.2 293.8 269.5 294.5C277.7 295.3 286.3 297.2 293.7 296.1C301.1 295.0 307.9 291.8 313.9 288.0C319.8 284.1 325.5 278.2 329.4 273.1C333.3 268.0 337.5 262.4 337.3 257.3C337.2 252.3 333.9 247.1 328.7 242.8C323.4 238.4 314.0 234.8 305.8 231.0C297.5 227.3 287.0 224.4 279.1 220.3C271.1 216.3 262.5 211.7 258.2 206.5C253.9 201.2 251.8 194.5 253.3 188.8C254.8 183.2 261.3 177.1 266.9 172.5C272.5 168.0 282.1 164.2 286.6 161.4C291.1 158.5 294.9 156.5 293.9 155.4Z";
plantSvg=(function(prev){return function(st,k){return prev(st,k).replace('#6e4a2e','#905A3A').replace('#80573a','#9D6743')}})(plantSvg);
function pathPt(f){var p=document.getElementById('wpath');if(!p)return{x:150,y:450};var L=p.getTotalLength();return p.getPointAtLength(L*(.06+.9*f))}
function placeAv(av,f){var q=pathPt(f);av.style.left=(q.x/4)+'%';av.style.top=(q.y/4.95)+'%'}
function bedBox(k){var P=BP[k],S=SP[k],x0=Math.min(P[0]-52,S[0]-32),x1=Math.max(P[0]+52,S[0]+32),y0=Math.min(P[1]-80,S[1]-22),y1=Math.max(P[1]+14,S[1]+54);return[x0,y0,x1-x0,y1-y0]}
function beds(){return TOOLS.map(function(x,i){var k=x[0],st=stg(pts(k)),P=BP[k],S=SP[k],b=bedBox(k);
 var sign='<g class="skilt" transform="translate('+S[0]+' '+S[1]+') rotate('+S[2]+')"><rect x="-3" y="12" width="6" height="42" rx="2" fill="#B5834A"/><g class="bord"><rect x="-25" y="-16" width="50" height="31" rx="3" fill="#E8BE86" stroke="#B88A52" stroke-width="1.4"/><path d="M-21 -11H21M-21 8H21" stroke="#fff" stroke-opacity=".28" stroke-width="1.2"/></g><text text-anchor="middle" y="-2" style="fill:#4a3220;font:600 11.5px Caveat,cursive">'+SG[k][0]+'</text><text text-anchor="middle" y="10" style="fill:#4a3220;font:600 11.5px Caveat,cursive">'+SG[k][1]+'</text></g>';
 return'<svg class="plt" viewBox="'+b.map(function(v){return v.toFixed(1)}).join(' ')+'" data-k="'+k+'" data-st="'+Math.max(1,st)+'" data-box="'+b.join(',')+'" tabindex="0" role="button" aria-label="'+x[1]+': '+SN[st]+'"><g transform="translate('+P[0]+' '+P[1]+') scale(1.05)"><g class="wt"><g class="gr" style="animation-delay:'+(i*.15)+'s">'+plantSvg(st,k)+'</g></g></g>'+sign+'</svg>'}).join('')}
function trio3(x,y){var o='<g transform="translate('+x+' '+y+') scale(1.5)">',C=[['#A9B8F0',-19],['#F7B6C8',0],['#9ED8C0',19]];
 o+='<ellipse cx="0" cy="1" rx="34" ry="4" fill="#000" opacity=".1"/>';
 C.forEach(function(c,i){var h=i===1?-3:0;o+='<g transform="translate('+c[1]+' '+h+')"><rect x="-8" y="-30" width="16" height="31" rx="8" fill="'+c[0]+'" stroke="#fff" stroke-width="1.4"/><circle cx="0" cy="-38" r="9" fill="'+c[0]+'" stroke="#fff" stroke-width="1.4"/><circle cx="-3" cy="-39" r="1.1" fill="#4a4a5a"/><circle cx="3" cy="-39" r="1.1" fill="#4a4a5a"/><path d="M-3 -35q3 3 6 0" fill="none" stroke="#4a4a5a" stroke-width="1" stroke-linecap="round"/></g>'});
 o+='<path d="M-19 -24Q0 -16 19 -24" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/><path d="M-19 -24Q0 -16 19 -24" fill="none" stroke="#F7B6C8" stroke-width="3" stroke-linecap="round" opacity=".85"/>'+ht(0,-19,.07,'#EA5E86')+'</g>';return o}
function sceneBg(){var o='',i,sc='';
 for(i=0;i<24;i++){var a=i*Math.PI*2/24;sc+='<circle cx="'+(323+76*Math.cos(a)).toFixed(1)+'" cy="'+(86+76*Math.sin(a)).toFixed(1)+'" r="9" fill="#FFCB80"/>'}
 o+='<defs><radialGradient id="sung" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FFE882"/><stop offset="1" stop-color="#FFD58A"/></radialGradient></defs>';
 o+='<g id="a-bg"><rect width="400" height="495" fill="#E5F2FF"/><g id="a-sol" class="sunw"><g class="rays" style="transform-origin:323px 86px">'+sc+'</g><circle cx="323" cy="86" r="73" fill="url(#sung)"/><circle cx="323" cy="86" r="56" fill="#FFE98A" opacity=".45" class="glow2"/></g>';
 o+='<rect y="149" width="400" height="346" fill="#B5DC5F"/><rect y="149" width="400" height="346" filter="url(#grn)" opacity=".1"/>';
 o+='<path d="'+PATH_OUTLINE+'" fill="#CE9362"/><path d="'+PATH_OUTLINE+'" fill="#CE9362" filter="url(#grn)" opacity=".18"/>';
 o+='<g id="a-orkideer">'+orchid(20,66,1.1,'#F4A6C2','#F7D056')+orchid(10,104,1,'#F4A6C2','#F7D056')+orchid(46,100,1.05,'#F6B2C8','#F7D056')+orchid(36,32,.7,'#F4A6C2','#F7D056')+'<path d="M30 152C26 112 36 62 40 18" stroke="#6f8f3a" stroke-width="2.5" fill="none"/><path d="M18 154C0 122 -4 92 6 72M40 154C58 122 70 102 66 80" stroke="#8fa84a" stroke-width="6" stroke-linecap="round" fill="none" opacity=".8"/></g>';
 o+='</g><path id="wpath" d="'+PATHD+'" fill="none" stroke="none"/>';
 o+='<g id="a-fig1">'+trio3(177,168)+'</g><g id="a-fig2">'+trio3(248,342)+'</g>';
 o+='<g id="a-sommerfugl"><g transform="translate(224 32) rotate(8) scale(1.3)"><ellipse cx="-11" cy="-4" rx="12" ry="9" fill="#F0506E" transform="rotate(-22 -11 -4)"/><ellipse cx="11" cy="-4" rx="12" ry="9" fill="#FFA23A" transform="rotate(22 11 -4)"/><ellipse cx="-8" cy="8" rx="8" ry="6" fill="#F58FAE"/><ellipse cx="8" cy="8" rx="8" ry="6" fill="#FFD094"/><rect x="-1.3" y="-9" width="2.6" height="20" rx="1.3" fill="#23262e"/></g></g>';
 o+='<text x="70" y="60.5" textLength="150" lengthAdjust="spacingAndGlyphs" style="font:800 16px Montserrat,\'Trebuchet MS\',sans-serif" fill="#F91741">RECOVERYNURSE+</text><g style="font:italic 700 7.1px Nunito,sans-serif" fill="#F91741"><text x="75" y="73">Øvelser i anerkendelse, refleksion og</text><text x="75" y="82.5">relation – for dig og dit team. Styrk</text><text x="75" y="92">din recovery-orienterede praksis.</text></g>';
 return'<svg class="scn" viewBox="0 0 400 495" preserveAspectRatio="none" aria-hidden="true">'+o+'</svg>'}
function tryImg(name,ok){var i=new Image();i.onload=function(){ok(i)};i.src=ASSETDIR+name+'.png'}
function putImg(g,name,r){if(g)g.innerHTML='<image href="'+ASSETDIR+name+'.png" x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" preserveAspectRatio="xMidYMid meet"/>'}
function loadAssets(w){var $=function(id){return w.querySelector('#'+id)};
 tryImg('bakgrund',function(i){putImg($('a-bg'),'bakgrund',[0,0,400,495])});
 tryImg('sol',function(i){putImg($('a-sol'),'sol',SLOT.sol)});
 tryImg('sommerfugl',function(i){putImg($('a-sommerfugl'),'sommerfugl',SLOT.sommerfugl)});
tryImg('orkidesommerfugl',function(i){putImg($('a-orkideer'),'orkidesommerfugl',[-23,-34,123,225])});
 tryImg('mennesker',function(i){var h=82*i.height/i.width;putImg($('a-fig1'),'mennesker',[273,172-h,98,h]);putImg($('a-fig2'),'mennesker',[177,350-h,98,h])});

 [].forEach.call(w.querySelectorAll('.plt'),function(b){var k=b.dataset.k,P=BP[k],S=SP[k];
  tryImg('skilt-'+k,function(i){var s=({kort:.78})[k]||1,br=b.querySelector('.bord');if(br)br.innerHTML='<image href="'+ASSETDIR+'skilt-'+k+'.png" x="'+(-30*s)+'" y="'+(-20*s)+'" width="'+(60*s)+'" height="'+(60*s*i.height/i.width)+'"/>'})})}
function scene(){var w=document.querySelector('.gwrap');if(!w||w.dataset.sc)return;w.dataset.sc=1;
 var hero=document.querySelector('.hero'),hb=document.getElementById('howb');if(hero)hero.remove();
 w.insertAdjacentHTML('afterbegin',sceneBg());
;
 [].forEach.call(w.querySelectorAll('.bedrow .plt'),function(b){var v=b.dataset.box.split(',').map(Number);b.style.left=(v[0]/4)+'%';b.style.top=(v[1]/4.95)+'%';b.style.width=(v[2]/4)+'%';b.style.height=(v[3]/4.95)+'%';b.style.zIndex=2+Math.round(v[1]/10)});
 var pn=w.parentNode,ref=pn.querySelector('.avpick'),rows=[pn.querySelector(':scope > .row'),pn.querySelector('.road'),pn.querySelector(':scope > p.small')];
 rows.forEach(function(e){if(e&&ref)pn.insertBefore(e,ref)});var h3=pn.querySelector(':scope > h3');if(h3)h3.style.display='none';
 if(hb){hb.style.display='block';hb.style.margin='4px auto 8px';w.insertAdjacentElement('afterend',hb)}
 var av=w.querySelector('.avatar'),f=avF();if(av){av.style.opacity=0;placeAv(av,0)}
 var pm=document.createElement('div');pm.className='pmark';pm.setAttribute('aria-label','Din fremgang på stien');pm.innerHTML='<svg viewBox="0 0 24 24"><path d="'+starPts(12,12,11,5,5,0)+'" fill="#FFD055" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';w.appendChild(pm);placeAv(pm,LASTF===null?f:LASTF);if(LASTF!==null&&LASTF!==f)setTimeout(function(){if(document.body.contains(pm))placeAv(pm,f)},500);LASTF=f;
 loadAssets(w)}

var GLOSS='<details class="panel gloss"><summary><b>Begreber i appen</b></summary><dl class="small" style="margin:10px 0 0"><dt><b>Recovery</b></dt><dd>En personlig proces, hvor patienten genvinder håb, identitet, mening og kontrol over eget liv – også selvom symptomer eller misbrug stadig er til stede.</dd><dt><b>Personcentreret pleje</b></dt><dd>Pleje, der tager udgangspunkt i patientens egne værdier, behov og ønsker, og hvor patienten er aktiv deltager i beslutninger.</dd><dt><b>Stigma</b></dt><dd>Negative stereotyper om en gruppe, der kan føre til diskrimination. Kan være offentligt, strukturelt eller selvstigma, hvor patienten selv tager stigmaet til sig.</dd><dt><b>Stigmatiserende holdninger</b></dt><dd>Antagelser om patienter, fx at de er „umotiverede“ eller „manipulerende“, som kan påvirke plejen.</dd><dt><b>Anerkendelse</b></dt><dd>At møde patientens oplevelse med interesse og respekt uden at vurdere eller bortforklare den.</dd><dt><b>Empowerment</b></dt><dd>At styrke patientens indflydelse, handlekraft og kontrol over eget forløb.</dd><dt><b>Terapeutisk relation</b></dt><dd>Den professionelle relation, der bærer behandlingen. Bygger på tillid, tid, tydelighed og medbestemmelse.</dd><dt><b>Ambivalens</b></dt><dd>Modstridende følelser i forhold til forandring, fx ønsket om og frygten for at ændre sit forbrug af rusmidler.</dd><dt><b>Dobbeltdiagnose</b></dt><dd>Samtidig psykisk lidelse og misbrug (også kaldet komorbiditet).</dd><dt><b>Refleksion i og over praksis</b></dt><dd>At stoppe op og undersøge egne handlinger og antagelser – undervejs og bagefter.</dd><dt><b>Fælles beslutningstagning</b></dt><dd>Patient og fagperson træffer beslutninger sammen ud fra viden og patientens værdier.</dd></dl><p class="small mut" style="margin-top:12px">Beskrivelserne af sygeplejefaglige kompetencer i redskaberne er vejledende. Tjek dem mod jeres studieordning og kompetencemål, før I bruger dem i opgaven.</p></details>';
var _hg=home;home=function(){_hg();var q=document.querySelector('.gdpr');if(q&&!document.querySelector('.gloss'))q.insertAdjacentHTML('beforebegin',GLOSS)};
function avDiv(){return''}function waterLoop(){scene()}WQ=[]; 
/* Haven først, derefter den lyserøde niveau-bjælke */
var _hl=home;home=function(){_hl();
 var g=document.querySelector('.garden');
 if(!g||g.querySelector('.lvlbox'))return;
 var ps=g.querySelectorAll(':scope > p.small'),
     row=g.querySelector(':scope > .row'),
     road=g.querySelector(':scope > .road'),
     bdg=g.querySelector(':scope > .badges'),
     howb=document.getElementById('howb'),
     box=document.createElement('div');
 box.className='lvlbox';
 box.appendChild(row);box.appendChild(road);box.appendChild(ps[0]);box.appendChild(bdg);
 g.insertBefore(box,howb);
};
/* Egne PNG-billeder som introduktionsbillede til redskaberne */
var PNG={
  pandora:'pandora',
  barometer:'stigmabarometer',
  detektor:'stigmadetektoren',
  spejl:'stigmaspejlet',
  kort:'billedkort',
  autopilot:'fagligautopilot',
  sim:'densværesamtale',
  kompas:'livetskompas',
  gps:'relationsgps'
};
ill=function(k){
  return '<img src="'+encodeURI('assets/redskab-'+PNG[k]+'.png')+'" alt="" style="width:100%;height:auto;display:block">';
};
var _ho=home;
home=function(){
  _ho();
  var c=document.querySelector('.tiles');if(!c)return;
  ['spejl','kort','autopilot','pandora','sim','kompas','gps','detektor','barometer'].forEach(function(k){
    var b=c.querySelector('[data-k="'+k+'"]');
    if(b){
      var t=TOOLS.filter(function(x){return x[0]===k})[0];
      b.setAttribute('aria-label',t[1]);
      c.appendChild(b);
    }
  });
};
var _hb=home;
home=function(){
 _hb();
 var old=document.querySelector('.gloss');if(old)old.remove();
 var q=document.querySelector('.gdpr');if(!q||document.querySelector('.infobar'))return;
 var dl=(GLOSS.match(/<dl[\s\S]*<\/dl>/)||[''])[0];
 var how='<h3>Sådan bruger du appen</h3><ol><li>Vælg et redskab på forsiden. Hvert redskab forklarer selv, hvad det er, hvorfor og hvordan.</li><li>Hver gang du bruger et redskab, får du point, og din blomst vokser: frø, spire, plante, blomst.</li><li>Du stiger i niveau fra Nysgerrig til Recovery-orienteret.</li></ol><p class="small"><b>Point måler brug – ikke kompetence.</b> Billedkort og Livets kompasnål udføres sammen med patienten.</p><p class="small">Skriv aldrig navne, cpr-nr. eller andet, der kan genkende en patient eller kollega. Alt gemmes kun på din egen enhed.</p>';
 var C={gl:'<h3>Begreber i appen</h3>'+dl+THEORY,how:how+DISCL};
 q.insertAdjacentHTML(q.classList.contains('lvlbox')?'afterend':'beforebegin','<div class="infobar"><div class="pills"><button class="pillbtn" data-p="gl" aria-expanded="false">Begreber i appen</button><button class="pillbtn" data-p="how" aria-expanded="false">Sådan bruger du appen</button></div><div class="pillbody" hidden></div></div>');
 var bar=document.querySelector('.infobar'),body=bar.querySelector('.pillbody'),bs=bar.querySelectorAll('.pillbtn');
 bs.forEach(function(b){b.onclick=function(){
  var wasOn=b.classList.contains('on');
  bs.forEach(function(x){x.classList.remove('on');x.setAttribute('aria-expanded','false')});
  if(wasOn){body.hidden=true;return}
  b.classList.add('on');b.setAttribute('aria-expanded','true');
  body.innerHTML=C[b.dataset.p];body.hidden=false;
 }});
};
var _ho2=home;
home=function(){
 _ho2();
 var g=document.querySelector('.gdpr');
 if(g&&!g.parentNode.classList.contains('gdprwrap')){
  var w=document.createElement('div');w.className='gdprwrap';
  g.parentNode.insertBefore(w,g);w.appendChild(g);
  w.insertAdjacentHTML('beforeend','<img class="orkide" src="assets/orkide.png" alt="">');
 }
};
/* Bede: kun jord før man har point */
var _ps0=plantSvg;
plantSvg=function(st,k){
 if(st===0)return '<ellipse cx="0" cy="0" rx="37" ry="9" fill="#905A3A"/><ellipse cx="0" cy="-1.5" rx="33" ry="7" fill="#9D6743"/>';
 return _ps0(st,k);
};
var _bd0=beds;
beds=function(){
 return _bd0().replace(/data-k="(\w+)" data-st="1"/g,function(m,k){return 'data-k="'+k+'" data-st="'+stg(pts(k))+'"'});
};
var CROP={
 spejl:[.43,.42,.57,.58,'#DADC8D'],
 kort:[.45,0,.55,.52,'#FFDD85'],
 autopilot:[.20,.50,.80,.50,'#EBEDA0'],
 pandora:[.34,.37,.62,.63,'#FF8C97'],
 sim:[.20,.02,.65,.56,'#FBF9E4'],
 kompas:[.48,.62,.52,.38,'#A5C3AA'],
 gps:[0,0,1,.62,'#D3E8AB'],
 detektor:[.38,.25,.62,.75,'#F5D2FB'],
 barometer:[.15,0,.85,.50,'#FFEFC4']
};
function fixHead(k){
 var th=document.querySelector('.thead'),big=th&&th.querySelector('.big'),C=CROP[k];
 if(!big||!C)return;
 th.style.setProperty('--cc',C[4]);
 if(!th.parentNode.classList.contains('rbox')){
  var inf=document.querySelector('.panel.info'),box=document.createElement('div');
  box.className='rbox';box.style.background=C[4];
  th.parentNode.insertBefore(box,th);box.appendChild(th);if(inf)box.appendChild(inf);
 }
  tryImg('titel-'+k,function(i){
  var h=th.querySelector('h2');
  if(h)h.innerHTML='<img class="titel" src="'+ASSETDIR+'titel-'+k+'.png" alt="'+h.textContent.replace(/"/g,'')+'">';
  var tg=document.querySelector('.together');if(tg)tg.style.display='none';
 });
 var f='redskab-'+PNG[k],done=false;
 big.innerHTML='';
 tryImg('illu-'+k,function(i){
  done=true;
  big.innerHTML='<img class="illu" src="'+ASSETDIR+'illu-'+k+'.png" alt="">';
 });
 tryImg(f,function(i){
  if(done)return;
  var el=document.createElement('div');el.className='crop';
  var bx=C[2]<1?C[0]/(1-C[2])*100:0,by=C[3]<1?C[1]/(1-C[3])*100:0;
  el.style.cssText='background:'+C[4]+' url("'+encodeURI(ASSETDIR+f+'.png')+'") '+bx+'% '+by+'% / '+(100/C[2])+'% auto no-repeat;aspect-ratio:'+(C[2]*i.width)+'/'+(C[3]*i.height);
  big.innerHTML='';big.appendChild(el);
 });
}
var _op=open;
open=function(k){_op(k);fixHead(k)};
/* Teoretisk forankring (uden navne) */
var TH={
 spejl:'Mødet med patienten som unikt menneske kræver, at du kender dine egne forforståelser – også dem om „dobbeltdiagnosepatienten“.',
 detektor:'Etiketter som diagnose og „patient“ kan skjule mennesket. Redskabet træner blikket for stigmatiserende sprog og handlinger, så mennesket bag diagnosen bliver synligt.',
 kort:'Støtter menneske-til-menneske-relationen ved at give patienten et sprog, når ord er svære, og vejen mod gensidig forståelse og kontakt.',
 gps:'Støtter udviklingen af en gensidig relation med forståelse og kontakt. Pejlemærkerne er en hjælp til refleksion og ikke et måleredskab.',
 autopilot:'Selvindsigt hos sygeplejersken: at opdage, hvornår rutiner kommer før nysgerrighed på patientens egen historie.',
 sim:'Samarbejdet mellem patient og sygeplejerske og et rum, hvor lidelsen kan tales om og patienten bekræftes – også når samtalen er svær.',
 kompas:'Patientens egne værdier, historie og sprog er udgangspunktet, og der skabes rum til at tale om lidelse og om det, der giver mening.',
 barometer:'Holdninger i teamet kan gøre patienten til en kategori i stedet for et menneske. Barometeret gør holdningerne synlige som afsæt for refleksion.',
 pandora:'Åbenhed og fælles refleksion i teamet styrker selvindsigten og samarbejdet om patienten.'
};
var _inf=info;
info=function(k){
 var h=_inf(k);
 if(!TH[k])return h;
 return h.replace('</p></div>','</p><p class="small mut" style="margin:6px 0 0"><b>Teoretisk forankring:</b> '+TH[k]+'</p></div>');
};
var THEORY='<h3 style="margin-top:18px">Teori bag appen</h3><p class="small" style="margin:0">Redskaberne bygger på sygeplejefaglig teori om <b>menneske-til-menneske-relationen</b>, <b>recovery-orienteret og personcentreret pleje</b>, <b>selvindsigt og samarbejde</b> mellem patient og sygeplejerske og om at <b>skabe rum til at tale om lidelse</b>. Under hvert redskab kan du se, hvordan det understøtter dette. Teorigrundlaget er beskrevet i projektets rapport.</p>';
var DISCL='<p class="small"><b>Appen erstatter ikke relationen</b> mellem sygeplejerske og patient. Den er et refleksionsredskab, der understøtter sygeplejersken i mødet. Den er ikke et valideret måleredskab og vurderer ikke patienter eller kolleger.</p>';
var _hs=home;
home=function(){_hs();addSnail();var ib=document.querySelector('.infobar'),lb=document.querySelector('.lvlbox');if(ib&&lb&&lb.nextElementSibling!==ib)lb.insertAdjacentElement('afterend',ib)};
function addSnail(){
 var b=document.querySelector('.lvlbox');if(!b||b.querySelector('.snailwalk'))return;
 var w=document.createElement('div');w.className='snailwalk';w.setAttribute('aria-hidden','true');
 w.innerHTML='<span class="sbub">Small steps<br>everyday</span><img src="'+ASSETDIR+'snegl.png" alt="">';
 b.appendChild(w);
}
var HEART=false;tryImg('gps-hjerte',function(){HEART=true});
var HP=['M566 210 L566 226 C540 230 515 233 495 233 C460 233 430 240 400 244 C365 250 335 270 305 286',
'M566 210 L566 240 L556 300 C520 314 480 328 440 345 C385 365 335 392 283 418',
'M566 210 L566 245 L556 320 L548 368 C528 400 505 440 485 480 C465 520 448 560 433 596',
'M566 210 L566 245 L556 320 L548 368 C562 410 578 460 585 520 C590 570 594 625 602 680',
'M566 210 L568 245 C588 275 606 310 622 350 C640 395 665 430 690 460 C705 482 714 498 720 512'];
var _gm=gmap;
gmap=function(N,ix,st){
 if(!HEART)return _gm(N,ix,st);
 var d=ix>=0?HP[ix]:st===2?'M566 210 L566 245 L556 320':'',du=matchMedia('(prefers-reduced-motion:reduce)').matches?'0.01s':'3s',
 o='<div class="hjerte"><img src="assets/gps-hjerte.png" alt="Hjerte med veje mod Tid, Tydelighed, Anerkendelse, Medbestemmelse og Tillid"><svg viewBox="0 0 880 800" aria-hidden="true"><path d="M558 160H569V214H558Z" fill="#DB8E7E"/><path d="M569 160H577V214H569Z" fill="#fff"/>';
 if(ix>=0)o+='<path d="'+HP[ix]+'" pathLength="1000" fill="none" stroke="#5E767A" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".95" stroke-dasharray="1000" stroke-dashoffset="1000"><animate attributeName="stroke-dashoffset" from="1000" to="0" dur="'+du+'" fill="freeze"/></path>';
 if(ix>=0){var e=HP[ix].split(' ').slice(-2);o+='<circle cx="'+e[0]+'" cy="'+e[1]+'" r="0" fill="none" stroke="#E0213F" stroke-width="4"><animate attributeName="r" values="8;22;8" dur="1.6s" begin="'+du+'" repeatCount="indefinite"/></circle>'}
 o+='<g'+(d?'':' transform="translate(566 210)"')+'>'+(d?'<animateMotion dur="'+du+'" fill="freeze" path="'+d+'"/>':'')+'<ellipse cx="0" cy="1" rx="8" ry="2.5" fill="#000" opacity=".15"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur=".4s" repeatCount="'+(d?'8':'0')+'"/><rect x="-4.2" y="-15" width="3" height="15" fill="#34324f"/><rect x="1.2" y="-15" width="3" height="15" fill="#34324f"/><rect x="-10" y="-13" width="6" height="8" rx="1" fill="#8a5a40"/><rect x="-6.5" y="-36" width="13" height="23" rx="4" fill="#2f3070"/><circle cx="0" cy="-42" r="5" fill="#f5eeee"/><path d="M-5-43Q0-50 5-43Z" fill="#5a3a4a"/></g></g></svg></div>';
 return o};
var SUNOK=false;tryImg('kompas-sol',function(){SUNOK=true});
var SA=[358,34,62,81,99,132,172,207,241,270,297,325];
var _vk=V.kompas;
V.kompas=function(r){
 if(!SUNOK)return _vk(r);
 V.kompas_old(r);
 var w=document.createElement('div'),cur=0;w.className='panel bigc';
 w.innerHTML='<div class="sol"><img src="assets/kompas-sol.png" alt="Solen med dine værdier"><svg viewBox="0 0 912 782" aria-hidden="true"><g class="nld" style="transform-origin:445px 415px"><path d="M445 240L463 415L445 440L427 415Z" fill="#FA6AB2" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></g><circle cx="445" cy="415" r="11" fill="#fff" stroke="#FA6AB2" stroke-width="5"/></svg></div><h3 id="cl"></h3>';
 r.insertBefore(w,r.firstChild);
 function aim(v){var i=VAL.indexOf(v);
  if(i>-1){var d=((SA[i]-cur+540)%360)-180;cur+=d;w.querySelector('.nld').style.transform='rotate('+cur+'deg)'}
  w.querySelector('#cl').textContent=v?'Din kurs: '+v:'Vælg din vigtigste værdi'}
 r.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){aim(c.textContent)})});
 r.querySelector('#cv').addEventListener('input',function(e){aim(e.target.value)});
 aim(g('kp',{}).v||'')};
home();howto();
