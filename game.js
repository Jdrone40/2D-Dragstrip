const K=3;const cv=document.getElementById('c'),g=cv.getContext('2d'),W=480,H=210,S=3.5;let LEN=402;
const $=id=>document.getElementById(id);
const SLOTS=[{k:'engine',n:'Engine',i:'engine'},{k:'turbo',n:'Turbo',i:'turbo'},{k:'trans',n:'Transmission',i:'gear'},{k:'tires',n:'Tires',i:'wheels'},{k:'exhaust',n:'Exhaust',i:'pipe'},{k:'weight',n:'Weight cut',i:'weight'},{k:'bars',n:'Wheelie bars',i:'bars'},{k:'nitro',n:'Nitrous',i:'nitro'}];
const CAT={
 engine:[
  {n:'Stock 1.6L 4-Cylinder',d:'Reliable and slow.',c:0,pw:0,pk:.88},
  {n:'Street-Tuned 4-Cylinder',d:'Cams, intake and a remap.',c:300,pw:1.7,pk:.88},
  {n:'Twin-Cam V6',d:'High-revving and smooth.',c:700,pw:3.6,pk:.93},
  {n:'Big-Block V8',d:'Loads of low-end torque.',c:1300,pw:5.4,pk:.8},
  {n:'Race Stroker V8',d:'Built for the strip.',c:2200,pw:7.2,pk:.88},
  {n:'Alcohol Hemi',d:'Top-tier drag power.',c:3600,pw:9.4,pk:.9}],
 turbo:[
  {n:'No Forced Induction',d:'Naturally aspirated.',c:0,b:0,lag:1},
  {n:'Small Street Turbo',d:'Cheap boost that spools quickly.',c:450,b:.07,lag:1},
  {n:'Twin-Scroll Turbo',d:'Quick spool and a good punch.',c:900,b:.14,lag:.8},
  {n:'Big-Frame Race Turbo',d:'Huge power, but you wait for it.',c:1600,b:.21,lag:1.5},
  {n:'Roots Supercharger',d:'Instant boost from idle.',c:2000,b:.18,lag:.12},
  {n:'Twin-Turbo Kit',d:'The most boost money can buy.',c:2800,b:.27,lag:1.1}],
 trans:[
  {n:'Stock 5-Speed',d:'A normal manual gearbox.',c:0,tops:[22,40,60,82,112],gm:[1.2,1.05,.95,.85,.78]},
  {n:'Short-Ratio 5-Speed',d:'Quicker off the line, runs out of top speed.',c:400,tops:[20,36,54,74,100],gm:[1.28,1.12,1,.9,.82]},
  {n:'Close-Ratio 6-Speed',d:'Six tight gears keep the engine in its sweet spot.',c:900,tops:[20,34,48,64,86,112],gm:[1.26,1.14,1.04,.95,.87,.8]},
  {n:'Powerglide 2-Speed Auto',d:'A drag classic. It shifts for you.',c:1300,tops:[55,112],gm:[1.15,.9],auto:1},
  {n:'Sequential Dog Box',d:'Four brutal gears. Perfect shifts hit harder.',c:2400,tops:[30,54,84,112],gm:[1.3,1.1,.95,.85],sb:2},
  {n:'7-Speed Paddle-Shift DCT',d:'Every shift is a quick shift. No timing needed.',c:3200,tops:[18,29,41,55,71,90,112],gm:[1.32,1.2,1.1,1.02,.95,.88,.82],quick:1}],
 tires:[
  {n:'Street Tires',d:'Hard rubber. Spins easily.',c:0,gr:0,sz:0},
  {n:'Sport Radials',d:'A decent upgrade for the street.',c:250,gr:3.3,sz:2},
  {n:'Drag Radials',d:'Sticky and street legal.',c:600,gr:6.6,sz:4},
  {n:'Soft Slicks',d:'Big, soft rear slicks.',c:1200,gr:9.9,sz:6},
  {n:'Pro Drag Slicks',d:'Maximum grip. Monster rear tires.',c:2400,gr:12.5,sz:7}],
 exhaust:[
  {n:'Stock Exhaust',d:'Quiet and restrictive.',c:0,pw:0},
  {n:'Cat-Back Exhaust',d:'Freer flow and a better sound.',c:200,pw:.5},
  {n:'Headers and Race Cats',d:'Loud and quick.',c:500,pw:1.1},
  {n:'Full Race Exhaust',d:'Straight pipes all the way.',c:900,pw:1.8}],
 weight:[
  {n:'Stock Interior',d:'Full weight.',c:0,pw:0},
  {n:'Light Seats and Mats',d:'Strip the comfort.',c:220,pw:.7},
  {n:'Carbon Panels',d:'Carbon hood, doors and trunk.',c:600,pw:1.5},
  {n:'Full Strip Kit',d:'Nothing left but the shell.',c:1200,pw:2.4}],
 bars:[
  {n:'No Wheelie Bars',d:'The nose can fly.',c:0,lim:0},
  {n:'Basic Wheelie Bars',d:'Keeps the nose from flipping.',c:200,lim:.45},
  {n:'Adjustable Bars',d:'Lower limit, more control.',c:450,lim:.28},
  {n:'Pro Alloy Bars',d:'Hold the nose almost flat.',c:900,lim:.16}],
 nitro:[
  {n:'No Nitrous',d:'Nothing on the bottle.',c:0,shots:0,pm:1},
  {n:'Single 50-Shot Kit',d:'One blast of nitrous.',c:350,shots:1,pm:1},
  {n:'Dual Bottle Kit',d:'Two blasts, a bit stronger.',c:800,shots:2,pm:1.04},
  {n:'Triple-Stage System',d:'Three blasts, the strongest.',c:1500,shots:3,pm:1.08}]};
SLOTS.push({k:'intake',n:'Air intake',i:'pipe'},{k:'fuel',n:'Fuel system',i:'nitro'},{k:'ecu',n:'ECU tune',i:'engine'},{k:'clutch',n:'Clutch',i:'gear'},{k:'susp',n:'Suspension',i:'wheels'},{k:'diff',n:'Rear end',i:'gear'});
CAT.intake=[{n:'Stock Airbox',d:'Restrictive paper filter.',c:0,pw:0},{n:'Cold-Air Intake',d:'Pulls in cooler, denser air.',c:150,pw:.4},{n:'Big Throttle Body and Filter',d:'More air in, more power out.',c:400,pw:.9},{n:'Ram-Air Hood Intake',d:'Forces air in at speed.',c:800,pw:1.4},{n:'Individual Throttle Bodies',d:'A throttle for every cylinder.',c:1500,pw:2.2}];
CAT.fuel=[{n:'Stock Fuel System',d:'Built for the commute.',c:0,pw:0},{n:'High-Flow Injectors',d:'Bigger injectors feed more fuel.',c:250,pw:.6},{n:'Race Pump and Fuel Rail',d:'Never runs dry at full throttle.',c:550,pw:1.2},{n:'E85 Fuel System',d:'Cool-burning ethanol fuel.',c:1000,pw:2},{n:'Methanol Injection',d:'Pure racing fuel.',c:1800,pw:2.8}];
CAT.ecu=[{n:'Stock ECU',d:'Factory fuel and spark maps.',c:0,pw:0},{n:'Chip Tune',d:'A quick remap.',c:200,pw:.6},{n:'Piggyback Tuner',d:'Adjustable boost and timing.',c:500,pw:1.3},{n:'Standalone ECU',d:'Full control of the engine.',c:1000,pw:2.1},{n:'Pro Dyno Tune',d:'Every last horsepower, tuned on a dyno.',c:2000,pw:3}];
CAT.clutch=[{n:'Stock Clutch',d:'Slips when launched hard.',c:0,gr:0},{n:'Sport Clutch',d:'Firmer engagement.',c:200,gr:.8},{n:'Twin-Disc Clutch',d:'Holds more power, bites harder.',c:600,gr:1.6},{n:'Centrifugal Lock-Up Clutch',d:'Locks up smoothly at launch.',c:1300,gr:2.6},{n:'Pro Multi-Stage Clutch',d:'Tuned for perfect launches.',c:2400,gr:3.6}];
CAT.susp=[{n:'Stock Suspension',d:'Soft and floaty.',c:0,gr:0},{n:'Lowering Springs',d:'Lower and flatter.',c:250,gr:.7},{n:'Adjustable Coilovers',d:'Tunable ride height.',c:600,gr:1.5},{n:'Drag Shocks and Ladder Bars',d:'Plants the rear tires.',c:1200,gr:2.5},{n:'Pro 4-Link Rear Suspension',d:'The ultimate drag setup.',c:2300,gr:3.5}];
CAT.diff=[{n:'Open Differential',d:'One tire spins, the other idles.',c:0,gr:0,pw:0},{n:'Limited-Slip Differential',d:'Both tires drive.',c:300,gr:.7,pw:.3},{n:'Locking Spool',d:'Both tires always push.',c:800,gr:1.4,pw:.6},{n:'9-Inch Race Rear End',d:'Built to survive big power.',c:1500,gr:2.2,pw:.9},{n:'Pro Quick-Change Rear',d:'Tuned gears, huge strength.',c:2600,gr:3,pw:1.3}];
CAT.engine.push({n:'Billet Top Fuel Hemi',d:'Nitromethane monster.',c:6000,pw:12,pk:.9});
CAT.tires.push({n:'Top Fuel Slicks',d:'Giant soft slicks that wrinkle on launch.',c:4500,gr:15.5,sz:8});
CAT.exhaust.push({n:'Zoomie Headers',d:'Pipes straight up to the sky.',c:1500,pw:2.6});
CAT.weight.push({n:'Fiberglass Body Kit',d:'Barely a car left.',c:2000,pw:3.4});
CAT.bars.push({n:'Carbon Wheelie Bars',d:'Hold the nose almost level.',c:1500,lim:.1});
CAT.nitro.push({n:'Progressive Nitrous Controller',d:'Four shots, the strongest yet.',c:2600,shots:4,pm:1.12});
let save={sty:{body:null,acc:null,rim:0,tint:1,wing:0,decal:0,glow:0},cash:500,wins:0,tier:0,car:0,own:[1,0,0,0,0,0,0,0,0,0],paint:0,set:{auto:0,vol:.7,vib:1,lefty:0,big:0},tn:{bar:.5,nos:.5,tb:.5,fd:.5,lr:.5},binds:{gas:'Space',shift:'ShiftLeft',nitro:'KeyN',pause:'KeyP'},streak:0,opt:{mode:0,dist:1,diff:1,wager:0},best:{},su:{st:.5,rh:.5,dm:.5},inv:Object.fromEntries(SLOTS.map(s=>[s.k,CAT[s.k].map((_,i)=>i?0:1)])),eq:Object.fromEntries(SLOTS.map(s=>[s.k,0]))};
const EQ=k=>CAT[k][save.eq[k]];const L=()=>({engine:save.eq.engine,turbo:save.eq.turbo,wheels:save.eq.tires,bars:save.eq.bars,nitro:EQ('nitro').shots,weight:save.eq.weight});
const TR=()=>EQ('trans'),maxGear=()=>TR().tops.length-1;const SU=save.su,TN=save.tn;
const DISTS=[{n:'1/8 mile',m:201,f:.64,pay:.7},{n:'1/4 mile',m:402,f:1,pay:1},{n:'1/2 mile',m:805,f:1.58,pay:1.5}];
const DIFFS=[{n:'Easy',f:1.12,pay:.7},{n:'Normal',f:1,pay:1},{n:'Hard',f:.92,pay:1.4}];
const WAGERS=[0,100,300];
const barLim=()=>EQ('bars').lim?EQ('bars').lim*(.6+.8*TN.bar):(MODELS[save.car].jet?.45:1.6);
const power=()=>10+EQ('engine').pw+EQ('weight').pw+EQ('exhaust').pw+EQ('intake').pw+EQ('fuel').pw+EQ('ecu').pw+EQ('diff').pw+MODELS[save.car].pw;
const grip=()=>8+EQ('tires').gr+EQ('clutch').gr+EQ('susp').gr+EQ('diff').gr+MODELS[save.car].gr;
const row=(a,b)=>'<div class="stat"><span>'+a+'</span><span>'+b+'</span></div>';
const sg=n=>(n>0?'+':'')+n;
function el(t,c,h){const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
let gtab=0,prevRot=0;
const TABS=['Parts','Body and paint','Style','Tuning'];
const SWATCH=['#d62839','#ff7a1a','#f2c230','#2f9e5b','#3df2c8','#2d6cdf','#7a3df2','#ff3d8b','#e9edf2','#8b909c','#2a2b36','#6b3a1e'];
const RIMS=[['Chrome','#dfe3ec'],['Gold','#ffd34a'],['Black','#1a1a22'],['Red','#e03b3b'],['Blue','#3a8dff'],['Neon','#3df2c8']];
const TINTS=['#6a86a8','#1b2a3d','#06070a'],GLOWS=[null,'#3df2c8','#ff3d8b','#4aa8ff','#ffd34a','#b06bff'];
let SPR_STY=null;
const HEX=/^#[0-9a-f]{6}$/i;
function shade(h,f){const n=parseInt(h.slice(1),16);return '#'+[16,8,0].map(b=>Math.max(0,Math.min(255,Math.round(((n>>b)&255)*f))).toString(16).padStart(2,'0')).join('')}
function curPaint(){const b=PAINTS[save.paint],y=save.sty;if(y.body)return [y.body,shade(y.body,.45),y.acc||b[2]];return [b[0],b[1],y.acc||b[2]]}
const ICONS={
 engine:['..#..#..','.######.','#.####.#','#.####.#','.######.','..#..#..','...##...','........'],
 turbo:['..####..','.#....#.','#..##..#','#.#..#.#','#.#..#.#','#..##..#','.#....##','..####.#'],
 wheels:['..####..','.#....#.','#.#..#.#','#..##..#','#..##..#','#.#..#.#','.#....#.','..####..'],
 bars:['#......#','#......#','########','#......#','#......#','#......#','##....##','##....##'],
 nitro:['...##...','...##...','..####..','.######.','.##..##.','.######.','.######.','..####..'],
 gear:['...##...','.#.##.#.','..####..','###..###','###..###','..####..','.#.##.#.','...##...'],
 pipe:['........','#####...','######..','#######.','#######.','######..','#####...','........'],
 weight:['...##...','...##...','...##...','.######.','..####..','...##...','........','.######.']};
function icon(k,col,px){let r='';(ICONS[k]||ICONS.engine).forEach((row,y)=>{for(let x=0;x<row.length;x++)if(row[x]==='#')r+='<rect x="'+x+'" y="'+y+'" width="1.06" height="1.06" rx=".3"/>'});return '<svg viewBox="0 0 8 8" width="'+px+'" height="'+px+'" fill="'+col+'" shape-rendering="geometricPrecision" aria-hidden="true">'+r+'</svg>'}
const thumbs={};
function thumb(mi,pp){const pi=pp,k=mi+'-'+pp.join('');if(thumbs[k]!==undefined)return thumbs[k];let u='';
 try{sprite(pi,mi,8,false,0,0,0,0);const M=MODELS[mi],t=document.createElement('canvas');t.width=130;t.height=44;const x=t.getContext('2d');x.imageSmoothingEnabled=true;x.drawImage(off,K*(OX-(M.cx||28)),K*(OY-(M.cy||36)),130*K,44*K,0,0,130,44);u=t.toDataURL()||''}catch(e){u=''}
 thumbs[k]=u;return u}
const MERCY=.06,MAXLOSS=8;
const easePct=()=>Math.round((1-1/(1+MERCY*Math.min(MAXLOSS,save.streak)))*100);
function renderGarage(){
 saveGame();
 const sy=$('gmain').scrollTop;
 $('cash').textContent='$'+save.cash.toLocaleString('en-US');$('tier').textContent=save.tier+1;$('wins').textContent=save.wins;$('gcash').textContent=save.cash.toLocaleString('en-US');
 const tabs=$('tabs');tabs.innerHTML='';
 TABS.forEach((n,i)=>{const b=el('button','tab'+(i===gtab?' sel':''),n);b.onclick=()=>{gtab=i;renderGarage()};tabs.appendChild(b)});
 const body=$('tabbody');body.innerHTML='';
 if(gtab===0){
  const tipc=el('div','card tcard');tipc.appendChild(el('p','note','Parts are sold at the Parts store. Buy a part to install it, and swap between parts you own for free.'));
  const go=el('button','buy','Open parts store');go.onclick=()=>openStore();tipc.appendChild(go);body.appendChild(tipc);
  const grid=el('div','cards');
  SLOTS.forEach(s=>{const it=EQ(s.k),stock=save.eq[s.k]===0,c=el('div','part'+(stock?'':' max'));
   c.appendChild(el('div','ptop','<span class="ico">'+icon(s.i,stock?'#555a66':'#ffd34a',40)+'</span><span class="pname"><b>'+s.n+'</b><em>'+(stock?'STOCK':'UPGRADED')+'</em></span>'));
   c.appendChild(el('div','pdesc',it.n));c.appendChild(el('div','',chipHtml(partChips(s.k,it))));
   const b=el('button','buy','Change');b.onclick=()=>openStore(s.k);c.appendChild(b);grid.appendChild(c)});
  body.appendChild(grid);
 }else if(gtab===1){
  const grid=el('div','cards');
  MODELS.forEach((M,i)=>{
   if(M.secret&&!save.own[i])return;
   const own=save.own[i],cur=save.car===i,c=el('div','car'+(cur?' cur':'')+(own?'':' locked')),im=el('img','thumb');
   im.src=thumb(i,curPaint());im.alt=M.n;c.appendChild(im);
   c.appendChild(el('div','cn',M.n+(own?'':'  (locked)')));
   c.appendChild(el('div','cd',M.d));
   c.appendChild(el('div','chips',(M.pw?'<i class="'+(M.pw>0?'up':'dn')+'">'+sg(M.pw)+' PWR</i>':'')+(M.gr?'<i class="'+(M.gr>0?'up':'dn')+'">'+sg(M.gr)+' GRP</i>':'')+(M.jet?'<i class="up">JET TURBINE</i>':'')+(M.pw||M.gr?'':'<i>BALANCED</i>')));
   const b=el('button','buy',cur?'IN USE':own?'USE THIS CAR':'BUY  $'+M.c);b.disabled=cur||(!own&&save.cash<M.c);
   b.onclick=()=>{if(!own){save.cash-=M.c;save.own[i]=1}save.car=i;renderGarage()};c.appendChild(b);grid.appendChild(c)});
  body.appendChild(grid);body.appendChild(el('div','lbl','Paint'));const pr=el('div','paints');
  PAINTS.forEach((P,i)=>{const b=el('button','sw'+(save.paint===i?' sel':''));b.style.background=P[0];b.setAttribute('aria-label','Paint '+(i+1));b.onclick=()=>{save.paint=i;save.sty.body=null;renderGarage()};pr.appendChild(b)});
  body.appendChild(pr);
 }else if(gtab===2){
  const grp=t=>{const c=el('div','card tcard');c.appendChild(el('div','lbl',t));body.appendChild(c);return c};
  const opts=(t,names,key)=>{const c=grp(t),r=el('div','opts');names.forEach((n,i)=>{const b=el('button','opt'+(save.sty[key]===i?' sel':''),n);b.onclick=()=>{save.sty[key]=i;renderGarage()};r.appendChild(b)});c.appendChild(r)};
  const colors=(t,key,list,allowNone,none)=>{const c=grp(t),r=el('div','paints');
   if(allowNone){const b=el('button','sw nonesw'+(save.sty[key]==null?' sel':''),'Auto');b.onclick=()=>{save.sty[key]=null;renderGarage()};r.appendChild(b)}
   list.forEach(h=>{const b=el('button','sw'+(save.sty[key]===h?' sel':''));b.style.background=h;b.setAttribute('aria-label','Color '+h);b.onclick=()=>{save.sty[key]=h;renderGarage()};r.appendChild(b)});
   const inp=document.createElement('input');inp.type='color';inp.className='cpick';inp.value=HEX.test(save.sty[key]||'')?save.sty[key]:'#ff7a1a';inp.setAttribute('aria-label',t+' custom color');
   inp.onchange=()=>{if(HEX.test(inp.value)){save.sty[key]=inp.value;renderGarage()}};r.appendChild(inp);c.appendChild(r);
   if(allowNone)c.appendChild(el('p','note',none))};
  colors('Body color (custom)','body',SWATCH,true,'Auto uses the paint from the Body and paint tab.');
  colors('Stripe and trim color','acc',SWATCH,true,'Auto uses the stripe color of your paint.');
  {const c=grp('Rim color'),r=el('div','opts');RIMS.forEach((a,i)=>{const b=el('button','opt'+(save.sty.rim===i?' sel':''),a[0]);b.onclick=()=>{save.sty.rim=i;renderGarage()};r.appendChild(b)});c.appendChild(r)}
  opts('Window tint',['Light','Medium','Limo'],'tint');
  opts('Rear wing',['Stock','None','Small spoiler','Big wing'],'wing');
  opts('Decal',['None','Racing stripes','Flames','Checkered'],'decal');
  opts('Underglow',['Off','Teal','Pink','Blue','Gold','Purple'],'glow');
  const rb=el('button','alt','Reset style');rb.onclick=()=>{Object.assign(save.sty,{body:null,acc:null,rim:0,tint:1,wing:0,decal:0,glow:0});renderGarage()};body.appendChild(rb);
 }else{
  const tip=()=>[
   SU.st<.4?'Soft springs: deep squat, more grip, easier wheelies.':SU.st>.65?'Stiff springs: steady nose, less grip gain.':'',
   SU.rh<.35?'Low ride: faster top end.':SU.rh>.65?'High ride: more rear weight transfer.':'',
   SU.dm<.35?'Low damping: bounces after launch.':SU.dm>.65?'High damping: settles fast.':'',
   !L().bars?'':TN.bar<.35?'Low bars: small wheelies, safest.':TN.bar>.65?'High bars: big wheelies and rear grip, riskier.':'',
   !L().turbo?'':TN.tb<.35?'Low boost: quick spool, less power.':TN.tb>.65?'High boost: big power, slow spool.':'',
   !L().nitro?'':TN.nos<.35?'Long, gentle nitrous burn.':TN.nos>.65?'Short, brutal nitrous hit.':'',
   TN.fd<.35?'Short gearing: harder launch, lower top speed.':TN.fd>.65?'Tall gearing: softer launch, higher top speed.':'',
   TN.lr<.35?'Low launch RPM: soft, safe launch.':TN.lr>.65?'High launch RPM: hard launch, may over-rev.':''
  ].filter(Boolean).join(' ')||'Balanced setup.';
  const sum=el('div','card tcard');sum.appendChild(el('div','lbl','Your setup'));const note=el('p','note',tip());sum.appendChild(note);body.appendChild(sum);
  let cur=null;const group=t=>{cur=el('div','card tcard');cur.appendChild(el('div','lbl',t));body.appendChild(cur)};
  const sl=(O,k,name,lo,hi,need)=>{const dis=need===false,l=el('label','sl'+(dis?' off':'')),hd=el('div','slh'),val=el('b','',dis?'LOCKED':Math.round(O[k]*100)+'%'),r=document.createElement('input');
   hd.appendChild(el('span','',name));hd.appendChild(val);l.appendChild(hd);
   r.type='range';r.min=0;r.max=100;r.value=Math.round(O[k]*100);r.disabled=dis;r.oninput=()=>{O[k]=r.value/100;val.textContent=Math.round(r.value)+'%';note.textContent=tip();saveGame()};l.appendChild(r);
   l.appendChild(el('div','ends','<span>'+lo+'</span><span>'+(dis?'buy the part first':'')+'</span><span>'+hi+'</span>'));cur.appendChild(l)};
  group('Chassis');sl(SU,'st','Spring stiffness','Soft','Stiff');sl(SU,'rh','Ride height','Low','High');sl(SU,'dm','Damping','Bouncy','Settled');sl(TN,'bar','Wheelie bar height','Low','High',!!L().bars);
  group('Engine');sl(TN,'tb','Turbo boost pressure','Low','High',!!L().turbo);sl(TN,'nos','Nitrous shot','Long, gentle','Short, strong',!!L().nitro);sl(TN,'lr','Launch RPM','Low','High');
  group('Drivetrain');sl(TN,'fd','Final drive','Short gears','Tall gears');
  const rb=el('button','alt','Reset all tuning');rb.onclick=()=>{SU.st=SU.rh=SU.dm=.5;Object.keys(TN).forEach(k=>{TN[k]=.5});saveGame();renderGarage()};body.appendChild(rb);
 }
 $('cname').textContent=MODELS[save.car].n;
 $('grate').textContent=Math.round(power()*5+grip()*4+L().bars*3+L().nitro*4+L().turbo*3+(MODELS[save.car].jet||0)*3);
 const S4=[['Power',(power()+(MODELS[save.car].jet||0)*.6)/24],['Grip',grip()/22],['Nose control',[.15,.5,.75,.95][L().bars]],['Nitrous',L().nitro/3]];
 $('gstats').innerHTML=S4.map(a=>'<div class="sb"><span>'+a[0]+'</span><div><i style="width:'+Math.round(Math.min(1,a[1])*100)+'%"></i></div></div>').join('')+'<div class="warn">'+((power()*1.2>14||MODELS[save.car].jet)&&!L().bars&&!MODELS[save.car].vmax?'High power with no wheelie bars can flip the car.':'')+'</div>';
 $('gmercy').textContent=save.streak?'Loss streak '+save.streak+': the rival runs about '+easePct()+'% slower. A win resets it.':'';
 $('gmain').scrollTop=sy;
}
function partChips(sl,it){const c=[];
 if(sl==='engine')c.push(sg(it.pw)+' PWR',it.pk<.85?'TORQUEY':it.pk>.91?'HIGH-REV':'BALANCED');
 else if(sl==='turbo'){c.push(it.b?'+'+Math.round(it.b*100)+'% BOOST':'NO BOOST');if(it.b)c.push(it.lag<.3?'NO LAG':it.lag<.9?'QUICK SPOOL':it.lag>1.2?'BIG LAG':'NORMAL SPOOL')}
 else if(sl==='trans'){c.push(it.tops.length+'-SPEED');if(it.auto)c.push('AUTO');if(it.quick)c.push('QUICK-SHIFT');if(it.sb)c.push('STRONG SHIFTS');if(it.gm[0]>=1.28)c.push('HARD LAUNCH');if(it.tops[it.tops.length-1]<110)c.push('LOW TOP SPEED')}
 else if(sl==='tires')c.push(it.gr?'+'+it.gr+' GRIP':'LOW GRIP');
 else if(sl==='bars')c.push(it.lim?'LIMIT '+Math.round(it.lim*57.3)+' DEG':'NO LIMIT');
 else if(sl==='nitro')c.push(it.shots?it.shots+(it.shots>1?' SHOTS':' SHOT'):'NO SHOTS',it.shots?'x'+it.pm+' POWER':'');
 else{if(it.pw)c.push(sg(it.pw)+' PWR');if(it.gr)c.push('+'+it.gr+' GRIP');if(!it.pw&&!it.gr)c.push('STOCK')}
 return c.filter(Boolean)}
const chipHtml=a=>'<div class="chips">'+a.map(t=>'<i>'+t+'</i>').join('')+'</div>';
function ownedPart(sl,i){return !!save.inv[sl][i]}
function equipPart(sl,i){if(!CAT[sl]||!CAT[sl][i]||!save.inv[sl][i])return false;save.eq[sl]=i;saveGame();return true}
function buyPart(sl,i){const it=CAT[sl]&&CAT[sl][i];if(!it||save.inv[sl][i]||save.cash<it.c)return false;save.cash-=it.c;save.inv[sl][i]=1;save.eq[sl]=i;saveGame();return true}
function setBuild(o){const map={engine:'engine',turbo:'turbo',wheels:'tires',tires:'tires',bars:'bars',nitro:'nitro',weight:'weight',trans:'trans',exhaust:'exhaust',intake:'intake',fuel:'fuel',ecu:'ecu',clutch:'clutch',susp:'susp',diff:'diff'};
 SLOTS.forEach(s=>{save.eq[s.k]=0});for(const k in o){const sl=map[k];if(!sl)continue;const n=Math.max(0,Math.min(CAT[sl].length-1,o[k]|0));for(let j=0;j<=n;j++)save.inv[sl][j]=1;save.eq[sl]=n}}
let storeSlot='engine';
function renderStore(msg){
 const money=save.cash.toLocaleString('en-US');$('scash').textContent=money;$('cash').textContent='$'+money;
 if(msg!==undefined)$('smsg').textContent=msg;
 const tabs=$('stabs');tabs.innerHTML='';
 SLOTS.forEach(s=>{const b=el('button','tab'+(storeSlot===s.k?' sel':''),s.n);b.onclick=()=>{storeSlot=s.k;renderStore('')};tabs.appendChild(b)});
 const box=$('sbody');box.innerHTML='';const grid=el('div','cards'),sl=SLOTS.find(s=>s.k===storeSlot);
 CAT[storeSlot].forEach((it,i)=>{
  const owned=ownedPart(storeSlot,i),eq=save.eq[storeSlot]===i,can=save.cash>=it.c,c=el('div','part'+(eq?' max':owned?'':can?' can':''));
  c.appendChild(el('div','ptop','<span class="ico">'+icon(sl.i,eq?'#ffd34a':'#ff9a1f',40)+'</span><span class="pname"><b>'+it.n+'</b><em>'+sl.n.toUpperCase()+'</em></span>'));
  c.appendChild(el('div','pdesc',it.d));c.appendChild(el('div','',chipHtml(partChips(storeSlot,it))));
  const b=el('button','buy',eq?'INSTALLED':owned?'INSTALL':it.c?(can?'BUY AND INSTALL  $'+it.c.toLocaleString('en-US'):'NEED $'+it.c.toLocaleString('en-US')):'INSTALL');
  b.disabled=eq||(!owned&&!can);
  b.onclick=()=>{if(owned){if(equipPart(storeSlot,i))renderStore('Installed: '+it.n+'.')}else if(buyPart(storeSlot,i))renderStore('Bought and installed: '+it.n+'.')};
  c.appendChild(b);grid.appendChild(c)});
 box.appendChild(grid);
}
function openStore(slot){if(slot&&CAT[slot])storeSlot=slot;$('garage').classList.remove('on');$('store').classList.add('on');renderStore('Buy a part to install it. Owned parts can be swapped back for free.')}
function closeStore(){$('store').classList.remove('on');$('garage').classList.add('on');renderGarage()}
function drawPrev(){
 const c=$('prev');if(!c||!c.getContext)return;const x=c.getContext('2d');x.setTransform(K,0,0,K,0,0);x.imageSmoothingEnabled=true;
 x.fillStyle='#63bfff';x.fillRect(0,0,170,58);x.fillStyle='#92d8ff';x.fillRect(0,40,170,18);x.fillStyle='#3c9a2a';x.fillRect(0,58,170,4);x.fillStyle='#44464d';x.fillRect(0,62,170,18);x.fillStyle='#d8d8d8';x.fillRect(0,65,170,1);
 prevRot+=.04;SPR_STY=save.sty;sprite(curPaint(),save.car,(7+EQ('tires').sz),L().bars>0||!!MODELS[save.car].jet,barLim(),0,prevRot,Math.round(3-SU.rh*6),MODELS[save.car].jet?1:0);SPR_STY=null;
 x.fillStyle='rgba(0,0,0,.35)';x.fillRect(30,72,110,2);x.drawImage(off,0,0,200*K,72*K,-45,12,200,72);
}
function renderSetup(){
 saveGame();
 const o=save.opt,box=$('opts');box.innerHTML='';if(WAGERS[o.wager]>save.cash)o.wager=0;
 const grp=(title,key,labels,dis)=>{const g_=el('div','grp'),r=el('div','opts');g_.appendChild(el('div','lbl',title));
  labels.forEach((n,i)=>{const b=el('button','opt'+(o[key]===i?' sel':''),n);b.disabled=!!(dis&&dis(i));b.onclick=()=>{o[key]=i;if(key==='mode'&&i===1)o.wager=0;renderSetup()};r.appendChild(b)});
  g_.appendChild(r);box.appendChild(g_)};
 grp('Mode','mode',['Race a rival','Time trial']);
 grp('Distance','dist',DISTS.map(d=>d.n));
 if(o.mode===0){grp('Rival difficulty','diff',DIFFS.map(d=>d.n));grp('Wager','wager',WAGERS.map(w=>w?'$'+w:'None'),i=>WAGERS[i]>save.cash)}
 const pm=DIFFS[o.diff].pay*DISTS[o.dist].pay,eas=save.streak&&o.mode===0?' Rival is running about '+easePct()+'% slower after your '+save.streak+' loss'+(save.streak>1?'es':'')+'.':'',bt=save.best[DISTS[o.dist].m];
 const prize=o.mode?Math.round(60*DISTS[o.dist].pay):Math.round((250+save.tier*60)*pm)+WAGERS[o.wager];
 $('sumline').textContent=(o.mode?'Practice run, no rival. Pays $'+prize+'.':'Win about $'+prize+(WAGERS[o.wager]?' (your $'+WAGERS[o.wager]+' wager is at risk).':'.'))+eas+(bt?' Best '+bt.toFixed(2)+' s.':'');
}

// ---- race state
let st='garage',R=null,parts=[],keys={};
const fcurve=(r,pk)=>.5+.5*Math.max(0,1-Math.pow((r-(pk||.88))/.5,2));
function mk(){return{sp:0,z:0,zv:0,rev:.25,lr:0,pos:0,v:0,g:0,rpm:.25,pitch:0,w:0,rot:0,boost:0,pen:0,nos:0,nosLeft:L().nitro,spin:false,go:false,crash:false,fin:null,acc:0}}
function newRace(){
 const o=save.opt;if(WAGERS[o.wager]>save.cash)o.wager=0;
 LEN=DISTS[o.dist].m;const tt=o.mode===1;
 const T=Math.max(5.6,12.4-save.tier*.6)*DISTS[o.dist].f*DIFFS[o.diff].f*(tt?1:1+MERCY*Math.min(MAXLOSS,save.streak))+(Math.random()-.5)*.5;
 R={t:-2.4,me:mk(),T,tt,wager:tt?0:WAGERS[o.wager],rt:.15+Math.random()*.15,opp:{pos:0,v:0,rot:0,fin:null,pitch:0,amp:.14+Math.random()*.3+(Math.random()<.2?.2:0),ph:Math.random()*6},of:0,done:false,fl:false,endT:0,rx:null,ph:0};
 R.of=tt?Infinity:R.rt+R.T;R.om=(()=>{const a=MODELS.map((x,i)=>x.secret?-1:i).filter(i=>i>=0);return a[Math.floor(Math.random()*a.length)]})();R.oc=PAINTS[1+Math.floor(Math.random()*(PAINTS.length-1))];parts=[];st='race';paused=false;audioInit();
 ['garage','setup','result'].forEach(i=>$(i).classList.remove('on'));
}
function treeState(){const t=R.t;return t<-1.8?0:t<-1.2?1:t<-.6?2:t<0?3:4} // 4=green
function gas(){return keys.gas}
function doShift(auto){
 if(st!=='race'||!R||R.done)return;const m=R.me;if(!m.go||m.g>=maxGear()||m.crash)return;
 const r=m.rpm,T=TR();if(T.auto&&!auto)return;m.g++;
 if(T.quick){m.boost=1.3;buzz(15);if(!auto){R.msg='QUICK SHIFT';R.msgT=.6}return}
 if(auto)return;
 if(r>=.8&&r<=.98){m.boost=T.sb||1.3;buzz(15);R.msg='PERFECT SHIFT';R.msgT=.8}
 else if(r>.98){m.pen=.4;R.msg='LATE SHIFT';R.msgT=.8}
 else if(r<.6){R.msg='EARLY';R.msgT=.6}
}
function oppStep(dt){if(R.tt)return;const o=R.opp,ot=R.t-R.rt;
 if(ot>R.T){if(o.fin==null)o.fin=R.of;o.v*=Math.pow(.3,dt);o.pos+=o.v*dt}
 else if(ot>0){const p=ot/R.T,np=LEN*Math.pow(p,1.75);o.v=(np-o.pos)/dt;o.pos=np}
 o.rot+=o.v*dt*.5;
 {const ot2=R.t-R.rt;let tg=0;if(ot2>0&&ot2<R.T){const lau=Math.min(1,ot2/.3)*Math.max(0,1-ot2/(1.5+o.amp*2));const pop=Math.max(0,Math.sin((ot2-1.1)*2.2+o.ph))*Math.max(0,1-Math.abs(ot2-2.2)/1.1)*.3;tg=Math.min(.75,o.amp*lau+o.amp*pop)*(MODELS[R.om].jet?1.4:1)}
  o.pitch+=(tg-o.pitch)*Math.min(1,dt*7);if(o.pitch<0)o.pitch=0}}
function step(dt){
 const m=R.me,o=R.opp;R.t+=dt;if(R.msgT>0)R.msgT-=dt;
 if(R.done){oppStep(dt);if(R.stopT==null)R.stopT=R.t;R.endT+=dt;m.v*=Math.pow(.2,dt);m.pos+=m.v*dt;if(R.endT>1.6&&!R.shown)showResult();return}
 if(R.t<0){rev(R.me,dt);R.me.rpm=R.me.rev;return}
 // opponent
 oppStep(dt);
 if(!m.go){rev(m,dt);m.rpm=m.rev;if(gas()&&R.t>=.1&&!m.crash){m.go=true;buzz(25);m.rx=R.t;m.lr=m.rev;if(m.rev>.92){m.pen=.4;R.msg='OVER-REV'}else if(m.rev>=.7){m.boost=1.5;R.msg='PERFECT LAUNCH'}else if(m.rev>=.45)R.msg='GOOD LAUNCH';else{m.pen=.5;R.msg='SLOW LAUNCH'}R.msgT=1}}
 // player
 if(m.go&&!m.crash){
  const T=TR(),top=T.tops[m.g]*(.88+.24*TN.fd);m.sp+=((gas()?1:0)-m.sp)*Math.min(1,dt/((.4+TN.tb*1.2)*EQ('turbo').lag));m.lr=Math.max(0,m.lr-dt*.9);let r=Math.max(.25+.75*Math.min(1.15,m.v/top),m.lr);m.rpm=r;if((save.set.auto||T.auto)&&m.g<maxGear()&&r>.94)doShift(true);
  let a=0;
  if(gas()){
   let p=power()*T.gm[m.g]*fcurve(r,EQ('engine').pk)*(1+(.5-TN.fd)*.18);
   {const tb=EQ('turbo');if(tb.b)p*=1+tb.b*(.5+TN.tb)*m.sp*Math.min(1,Math.max(0,(r-.4)/.4))}
   if(m.nos>0){p*=(1.2+.45*TN.nos)*(EQ('nitro').pm||1);m.nos-=dt}
   if(m.boost>0){p*=1.08;m.boost-=dt}
   if(m.pen>0){p*=.85;m.pen-=dt}
   if(m.v>40)p*=1+(.5-SU.rh)*.06;if(r>=1.02)p*=.15;
   const gr=grip()*(1+Math.max(0,m.z)*.22*(.7+SU.rh*.6)-SU.st*.03)*(1+Math.min(m.pitch,.4)*.15);m.spin=p>gr*1.02&&m.v<45;a=m.spin?gr*.94+(p-gr)*.3:Math.min(p,gr);{const J=MODELS[save.car].jet;if(J)a+=J*(1-Math.min(.7,m.v/220))-m.v*m.v*.00016;const RK=MODELS[save.car].rocket;if(RK)a+=RK}
  }else{a=-3;m.spin=false}
  m.acc=a;{const k=30+SU.st*120,c=2*Math.sqrt(k)*(.12+SU.dm*.85),tg=Math.min(1.2,Math.max(-.3,a/18*(1.5-SU.st)));m.zv+=(k*(tg-m.z)-c*m.zv)*dt;m.z+=m.zv*dt}
  // wheelie
  const drive=gas()?Math.max(0,a-11)*.6*(1+(.5-SU.st)*.5):0;
  m.w+=(drive-m.pitch*4-m.w*(1.6+SU.st*1.2))*dt;m.pitch+=m.w*dt;
  if(m.pitch<0){m.pitch=0;m.w=Math.max(0,m.w)}
  const lim=barLim();
  if(m.pitch>lim&&(L().bars||MODELS[save.car].jet)){m.pitch=lim;m.w=0;a*=.97}
  if(m.pitch>.25)a*=1-Math.min(.4,(m.pitch-.25)*.5);
  if(m.pitch>1){m.crash=true;buzz(120);R.res='crash';R.done=true;R.msg='FLIPPED! Buy wheelie bars or lift off';R.msgT=3}
  m.v=Math.max(0,m.v+a*dt);{const VM=MODELS[save.car].vmax;if(VM)m.v=Math.min(VM,m.v)}m.pos+=m.v*dt;m.rot+=m.v*dt*.5;
  if(m.spin&&Math.random()<.9)parts.push({x:m.pos,y:0,vx:-2-Math.random()*3,vy:-1-Math.random()*3,l:.9})
  if(m.pos>=LEN&&m.fin==null){m.fin=R.t;m.endV=m.v;R.res=R.tt?'finish':(m.fin<R.of?'win':'lose');R.done=true}
 }
 if(R.t>=R.of&&m.fin==null&&!R.done&&(!m.go||R.t>R.of+6)){R.res='lose';R.done=true}
 if(R.tt&&!m.go&&R.t>15&&!R.done){R.res='abort';R.done=true}
 }
function nitro(){if(R&&st==='race'&&R.me.go&&!R.done&&R.me.nosLeft>0&&R.me.nos<=0){R.me.nosLeft--;R.me.nos=2.6-1.6*TN.nos}}
function showResult(){
 R.shown=true;st='result';const m=R.me,o=save.opt,pm=DIFFS[o.diff].pay*DISTS[o.dist].pay,w=R.wager;let title,sub,pay=0;const prevStreak=save.streak;
 if(R.res==='win'){title='You win!';pay=Math.round((250+save.tier*60)*pm)+w;save.wins++;save.tier++;save.streak=0;sub=prevStreak?'Rival is back to full speed.':'Next rival runs quicker.';if(m.fin<R.of-.8)pay+=75}
 else if(R.res==='lose'){title='Beaten';pay=Math.round(60*pm)-w;save.streak=Math.min(MAXLOSS,save.streak+1);sub=(w?'You lost your wager. ':'')+'The next rival will run about '+easePct()+'% slower.'}
 else if(R.res==='crash'){title='Crashed';pay=30-w;save.streak=Math.min(MAXLOSS,save.streak+1);sub='The nose flipped over. Wheelie bars stop that. The next rival will run about '+easePct()+'% slower.'}
 else if(R.res==='finish'){title='Run complete';pay=Math.round(60*DISTS[o.dist].pay);sub='Time trial, no rival.'}
 else{title='Run ended';sub='You never launched.'}
 save.cash=Math.max(0,save.cash+pay);
 const et=m.fin!=null?m.fin-m.rx:null;let rec='';
 if(et!=null){const k=DISTS[o.dist].m,b=save.best[k];if(!b||et<b){save.best[k]=et;rec=b?'  NEW RECORD':''}}
 $('rt').textContent=title;$('rs').textContent=sub;
 $('rd').innerHTML=row('Distance',DISTS[o.dist].n)+row('Your time',et!=null?et.toFixed(2)+' s'+rec:'none')+(R.tt?'':row('Rival time',R.T.toFixed(2)+' s'))+row('Trap speed',m.endV?Math.round(m.endV*2.237)+' mph':'none')+row('Reaction',m.rx!=null?m.rx.toFixed(3)+' s':'none')+row('Cash',(pay>=0?'+$':'-$')+Math.abs(pay));
 saveGame();$('result').classList.add('on');
}

// ---- drawing (smooth vector style, daytime highway)
g.imageSmoothingEnabled=true;
const off=document.createElement('canvas');off.width=200*K;off.height=72*K;const o2=off.getContext('2d');
const OX=95,OY=60,MONO='"Courier New",monospace';
function pc(c,cx,cy,r,col){c.fillStyle=col;c.beginPath();c.arc(cx,cy,r+.5,0,7);c.fill()}
function ln(c,x0,y0,x1,y1,col,t){c.save();c.strokeStyle=col;c.lineWidth=t;c.lineCap='round';c.beginPath();c.moveTo(x0+t/2,y0+t/2);c.lineTo(x1+t/2,y1+t/2);c.stroke();c.restore()}
function wheelPx(c,cx,cy,r,rot,slick){
 pc(c,cx,cy,r,'#09090d');pc(c,cx,cy,r-1,slick?'#1d1d27':'#16161e');
 const q=Math.max(2,Math.round(r*(slick?.5:.7)));
 pc(c,cx,cy,q,SPR_STY?RIMS[SPR_STY.rim][1]:'#dfe3ec');pc(c,cx,cy,Math.max(1,q-2),'#343946');
 for(let i=0;i<5;i++){const a=rot+i*1.2566;ln(c,cx,cy,cx+Math.cos(a)*q,cy+Math.sin(a)*q,'#eef0f6',1)}
 pc(c,cx,cy,1,'#8b909c');
}
const PAINTS=[['#2a2b36','#0e0e15','#ff9a1f'],['#d62839','#7a1520','#ffffff'],['#2d6cdf','#17397a','#ffd34a'],['#e9edf2','#9aa3b2','#e03b3b'],['#f2c230','#9a7510','#111111'],['#2f9e5b','#165030','#ffffff']];
const MODELS=[
{n:'JDM Sedan',d:'Balanced four-door. The starter car.',c:0,pw:0,gr:0,wb:62,fr:7,nx:85,tx:-20,ty:-16,hy:-14,bl:-20,ry:-30,mx:46,lip:0,seams:[-4,14,46],hd:[8,22],
 body:[[-19,-6.5],[-20.5,-9],[-20.5,-14],[-19,-17.5],[-14,-18.5],[-6,-19],[2,-24],[10,-28.5],[20,-29.5],[32,-29.5],[40,-28.5],[52,-19.5],[56,-19],[70,-17.5],[78,-16.5],[83,-14.5],[85,-11],[85,-8],[83,-6.5]],
 win:[[[-3,-19.8],[4,-24.2],[10,-27.6],[13,-27.6],[13,-19.8]],[[15.5,-19.8],[15.5,-27.6],[32,-27.6],[39.5,-27],[47.5,-20.2],[47.5,-19.8]]]},
{n:'Muscle Coupe',d:'Long hood, big torque.',c:600,pw:1.5,gr:0,wb:64,fr:7,nx:89,tx:-21,ty:-18,hy:-16,bl:-21,ry:-28,mx:44,lip:1,scoop:1,seams:[18,46],hd:[25],
 body:[[-20,-6.5],[-22,-10],[-22,-16],[-20.5,-19.5],[-12,-20.5],[-4,-21.5],[4,-25],[14,-27.5],[24,-28],[34,-27.5],[44,-22.5],[52,-19.8],[60,-19.5],[74,-18.5],[84,-17],[88,-14],[89,-10],[88,-7],[85,-6.5]],
 win:[[[-1,-21.5],[5,-24.5],[13,-26.6],[17,-26.6],[17,-21.1],[-1,-21.1]],[[19.5,-26.7],[33,-26.7],[41.5,-22.4],[43.5,-21.1],[19.5,-21.1]]]},
{n:'Sports Coupe',d:'Low, sleek and sticky. Great grip.',c:900,pw:.8,gr:1.2,wb:62,fr:6,nx:89,tx:-20,ty:-15,hy:-13,bl:-21,ry:-27,mx:40,lip:2,vent:[-6,-15,10,5],seams:[13.5,41],hd:[19],split:1,
 body:[[-18,-6.5],[-20,-8.5],[-21,-12],[-20,-15.5],[-17,-17.5],[-12,-18.5],[-5,-19.5],[2,-21.5],[8,-24.5],[14,-26.5],[20,-27.3],[27,-27.3],[33,-25.8],[39,-22.8],[45,-20],[50,-18.5],[58,-17.2],[70,-15.5],[80,-14],[86,-12.2],[89,-9.5],[89,-7.5],[86,-6.5]],
 win:[[[3,-21.4],[9,-24.2],[12.5,-25.4],[12.5,-21.4]],[[14.5,-21.4],[14.5,-26],[27,-26.2],[33,-24.8],[39,-21.8],[40,-21.4]]]},
{n:'Tuner Hatch',d:'Light hatchback, quick off the line.',c:450,pw:.5,gr:.7,wb:56,fr:6,nx:75,tx:-17,ty:-19,hy:-14,bl:-20,ry:-29,mx:33,lip:3,seams:[9,36],hd:[14],
 body:[[-16,-6.5],[-17.5,-10],[-17.5,-19],[-16,-24],[-12,-27.5],[0,-29],[14,-29],[24,-28.5],[34,-23],[40,-20],[50,-19],[64,-17.5],[72,-15.5],[75,-12],[75,-8],[72,-6.5]],
 win:[[[-11,-20.2],[-11,-26.5],[-2,-27.8],[8,-27.8],[8,-20.2]],[[10.5,-20.2],[10.5,-27.8],[22,-27.5],[31,-22.9],[34.5,-20.4],[34.5,-20.2]]]},
{n:'Family Wagon',d:'Long roof, sleeper speed. Stable launcher.',c:500,pw:.3,gr:.5,wb:66,fr:7,nx:87,tx:-23,ty:-20,hy:-14,bl:-20,ry:-30,mx:48,lip:4,seams:[3,18.5,49],hd:[9,24],
 body:[[-22,-6.5],[-23.5,-10],[-23.5,-22],[-22,-27.5],[-18,-29.5],[-10,-30],[20,-30],[34,-29.5],[42,-28.5],[54,-19.5],[58,-19],[72,-17.5],[80,-16.5],[85,-14.5],[87,-11],[87,-8],[85,-6.5]],
 win:[[[-19,-20.2],[-19,-27.8],[-12,-28.3],[2,-28.3],[2,-20.2]],[[4.5,-20.2],[4.5,-28.3],[17,-28.3],[17,-20.2]],[[19.5,-20.2],[19.5,-28.3],[34,-28.3],[40,-27.7],[49,-20.6],[49,-20.2]]]},
{n:'Pickup Truck',d:'Torque monster. Heavy and tall.',c:700,pw:1.2,gr:.3,wb:70,fr:8,rb:1,nx:88,tx:-23,ty:-19,hy:-19,bl:-24.5,ry:-33.5,mx:44,lip:0,seams:[22,46],hd:[26],
 body:[[-22,-6.5],[-23,-12],[-23,-22.5],[9,-22.5],[9,-31],[12,-33.5],[30,-33.5],[37,-32],[47,-24.5],[51,-24],[70,-23],[80,-22],[86,-20],[88,-15],[88,-8],[86,-6.5]],
 win:[[[11.5,-24.8],[11.5,-31.8],[14,-32.5],[29,-32.5],[36,-31],[44,-25.2],[44,-24.8]]]},
{n:'Hot Rod',d:'Big engine, open wheels. Twitchy.',c:1200,pw:2.2,gr:-.4,wb:58,fr:6,rb:3,nx:53,tx:-14,ty:-17,hy:-15,bl:-21,ry:-29,mx:15,lip:0,pipes:1,seams:[8],hd:[10],
 body:[[-14,-6.5],[-15.5,-11],[-15.5,-21],[-12,-25.5],[-9,-29],[13,-29],[17,-27],[20,-21.5],[24,-20.5],[42,-20],[48,-19.5],[52,-17.5],[53,-12],[52,-8],[50,-6.5]],
 win:[[[-9,-21],[-10,-24.5],[-8,-27.5],[13,-27.5],[15,-27],[16,-21]]]},
{n:'Supercar',d:'Wedge-shaped monster. The best there is.',c:2200,pw:2.5,gr:2,wb:64,fr:6,rb:1,nx:94,tx:-22,ty:-14,hy:-11.5,bl:-21,ry:-25.5,mx:41,lip:5,vent:[1,-17,11,7],louv:[-14,-17,5],seams:[13,40],hd:[28],split:1,
 body:[[-20,-6],[-22,-8],[-23,-11.5],[-22,-14.5],[-18,-16.5],[-10,-18],[-2,-19.5],[6,-22],[14,-24.5],[20,-25.5],[28,-25.5],[34,-24.5],[40,-22.2],[48,-18.8],[58,-16],[70,-13.8],[82,-12],[91,-10.2],[94,-8.2],[93,-6.5],[88,-6]],
 win:[[[16,-21.2],[20,-24.6],[27.5,-24.7],[33,-23.8],[39,-21.6],[40,-21.2]]]},
{n:'Jet Golf Cart',d:'A golf cart with a jet turbine bolted on. Absurdly fast.',c:2500,pw:5.5,gr:1,jet:12,cart:1,wb:46,fr:5,rb:-1,nx:56,tx:-15,ty:-14,hy:-17,bl:-17,ry:-37,mx:36,cx:52,cy:40,lip:0,seams:[],hd:[],
 body:[[-14,-7],[-15,-9],[-15,-15],[-11,-17.5],[-3,-18],[8,-18],[9,-15],[12,-11],[30,-11],[34,-11],[36,-17],[46,-21],[52,-20],[55,-16],[56,-10],[54,-7]],win:[]}
,
{n:'C6 Drag Vette',d:'Secret. A Corvette C6 drag car with a rocket-hot engine. 1000 mph.',c:0,secret:1,pw:3,gr:3,jet:1,rocket:300,vmax:447,wb:66,fr:6,rb:2,nx:94,tx:-22,ty:-14,hy:-12,bl:-20.5,ry:-26,mx:43,lip:2,scoop:1,vent:[49,-15,7,5],seams:[26,52],hd:[31],split:1,
 body:[[-22,-6.5],[-23.5,-10],[-23.5,-15],[-20,-17.5],[-10,-18.5],[-2,-19.5],[8,-24],[16,-26.8],[26,-27.5],[34,-26.5],[44,-21.5],[50,-19.5],[62,-18.8],[78,-16.5],[88,-14],[93,-11],[94,-8],[91,-6.5]],
 win:[[[10,-20.6],[17,-26],[25,-26.4],[25,-20.6]],[[27,-20.6],[27,-26.4],[34,-25.7],[43,-21.4],[43,-20.6]]]},
{n:'Fighter Jet',d:'Secret. A jet fighter on landing gear. Tops out at 20,000 mph.',c:0,secret:1,plane:1,pw:5,gr:5,jet:1,rocket:150000,vmax:8941,wb:62,fr:5,rb:0,nx:96,tx:-30,ty:-14,hy:-12,bl:-20,ry:-24,mx:40,cx:34,cy:48,lip:0,seams:[],hd:[],
 body:[[-30,-9],[-30,-20],[-12,-22],[20,-24],[50,-23],[75,-17],[96,-11],[94,-8],[60,-6]],win:[]},
{n:'Pony Coupe',d:'Classic fastback with a long hood and short deck.',c:800,pw:1,gr:.4,wb:66,fr:7,nx:91,tx:-21,ty:-15,hy:-13.5,bl:-21.4,ry:-27.5,mx:46,lip:3,vent:[50,-14,6,5],seams:[24,52],hd:[9,28],split:1,
 body:[[-20,-6.5],[-21.5,-10],[-21.5,-17],[-18,-19.5],[-8,-20.5],[0,-22],[10,-26],[20,-28.5],[30,-28.5],[38,-26],[46,-21.5],[52,-20],[66,-19.2],[80,-17],[88,-14.5],[91,-11],[91,-8],[88,-6.5]],
 win:[[[3,-22],[12,-26],[23,-27.7],[23,-21.4],[3,-21.4]],[[25.5,-21.4],[25.5,-27.7],[30,-27.7],[37,-25.5],[43,-21.8],[43,-21.4]]]},
{n:'Crew Cab Pickup',d:'Four-door full-size truck with a bed. Tough and tall.',c:900,pw:1,gr:.5,wb:76,fr:8,rb:1,nx:96,tx:-27,ty:-21,hy:-22,bl:-26,ry:-34.5,mx:56,lip:0,seams:[20,38,58],hd:[24,41],
 body:[[-26,-7],[-27,-11],[-27,-24.5],[18,-24.5],[20,-33],[24,-35.5],[48,-35.5],[54,-33],[60,-26],[64,-25],[80,-24.5],[90,-23],[95,-20],[96,-14],[96,-8],[93,-6.5]],
 win:[[[22,-26.4],[22,-34],[26,-34.8],[36,-34.8],[36,-26.4]],[[38.5,-26.4],[38.5,-34.8],[48,-34.8],[53,-33],[57.5,-27],[57.5,-26.4]]]},
{n:'Full-Size SUV',d:'Big, boxy family hauler. Heavy but stable.',c:650,pw:.6,gr:.6,wb:70,fr:7,rb:1,nx:93,tx:-25,ty:-22,hy:-17,bl:-27,ry:-34.8,mx:50,lip:4,seams:[-6.5,17,50],hd:[-12,5,28],
 body:[[-24,-7],[-25,-11],[-25,-27],[-22,-33],[-16,-35.5],[44,-35.5],[52,-33],[58,-26],[62,-24.5],[80,-23.5],[89,-21],[93,-17],[93,-8],[90,-6.5]],
 win:[[[-19,-27.4],[-19,-34],[-9,-34.6],[-9,-27.4]],[[-4,-27.4],[-4,-34.6],[15,-34.6],[15,-27.4]],[[19.5,-27.4],[19.5,-34.6],[44,-34.6],[50,-32.5],[55.5,-27.4]]]},
{n:'Modern Muscle',d:'Wide, square-shouldered two-door with a big engine.',c:1400,pw:2,gr:.3,wb:66,fr:7,nx:92,tx:-22,ty:-17,hy:-15,bl:-24.5,ry:-29,mx:43,lip:2,scoop:1,vent:[48,-16,6,5],seams:[24,50],hd:[9,29],split:1,
 body:[[-22,-6.5],[-23,-10],[-23,-20],[-20,-22],[-6,-23],[4,-24],[10,-28.5],[22,-29.5],[34,-29],[42,-25],[50,-22],[56,-21.5],[72,-21],[86,-19.5],[91,-16],[92,-10],[91,-8],[88,-6.5]],
 win:[[[10,-24.9],[14,-28],[22,-28.8],[22,-24.9]],[[24.5,-24.9],[24.5,-28.8],[34,-28.4],[40,-25.5],[41,-24.9]]]},
{n:'Import Tuner Coupe',d:'Low fastback with a rear wing. Loves boost.',c:1100,pw:1,gr:1.2,wb:62,fr:6,nx:89,tx:-20,ty:-16,hy:-13,bl:-21,ry:-28,mx:42,lip:2,vent:[48,-14,6,4],seams:[22,46],hd:[10,26],split:1,
 body:[[-19,-6.5],[-20.5,-10],[-20.5,-17],[-17,-19],[-8,-20],[0,-22.5],[10,-27],[20,-28.5],[30,-27.5],[38,-24.5],[46,-20.5],[58,-18.5],[70,-17],[82,-14.5],[88,-11.5],[89,-8],[86,-6.5]],
 win:[[[3,-21.6],[12,-26],[21,-27.6],[21,-21.4],[3,-21.4]],[[23.5,-21.4],[23.5,-27.6],[30,-27],[37,-24.4],[43,-21.4]]]},
{n:'AWD Super Coupe',d:'Boxy, brutal and all-wheel-drive grippy.',c:1900,pw:2,gr:2.4,wb:64,fr:7,nx:91,tx:-21,ty:-17,hy:-14,bl:-22,ry:-28.5,mx:43,lip:2,intake:1,vent:[50,-15,6,5],seams:[24,48],hd:[10,28],split:1,
 body:[[-20,-6.5],[-21.5,-10],[-21.5,-19],[-18,-21],[-8,-22],[2,-23],[10,-27.5],[22,-28.8],[32,-28.3],[40,-25],[46,-21.5],[56,-20],[72,-18.5],[84,-16],[90,-12.5],[91,-8],[88,-6.5]],
 win:[[[4,-22.5],[12,-27],[22,-28.2],[22,-22.5]],[[25,-22.5],[25,-28.2],[32,-27.7],[39,-24.6],[43,-22.5]]]},
{n:'Roadster',d:'Open-top two-seater. Light and nimble.',c:700,pw:.2,gr:1,wb:58,fr:6,nx:83,tx:-18,ty:-15,hy:-12.5,bl:-21.2,ry:-26,mx:35,lip:0,rider:1,seams:[16],hd:[6],
 body:[[-17,-6.5],[-18.5,-10],[-18.5,-17],[-14,-19.5],[-4,-20.5],[6,-21],[16,-21.2],[24,-21.2],[32,-26],[35,-26],[38,-21.5],[54,-19.5],[68,-17.5],[78,-15],[82,-11.5],[83,-8],[80,-6.5]],
 win:[[[32.4,-25.4],[35,-25.4],[38.4,-21.7],[33.4,-21.7]]]}
];
function path(c,pts){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath()}
function poly(c,pts,col){c.fillStyle=col;path(c,pts);c.fill()}
function drawCart(M,F,col,dk,acc,jet,nos){
 const fl=jet>=2?(nos?[46,32,18]:[30,20,10]):jet===1?[6,4,2]:null;
 if(fl){const cl=['#ff7a1a','#ffd34a','#d6f0ff'],hs=[6,4,2],ys=[-27,-26,-25];for(let i=0;i<3;i++){const w=Math.max(1,Math.round(fl[i]*(.8+Math.random()*.4)));F(-48-w,ys[i],w,hs[i],cl[i])}}
 F(-34,-20,2,3,'#555a66');F(-22,-20,2,4,'#555a66');
 F(-42,-29,28,10,'#9aa3b2');F(-42,-29,28,2,'#d4dae6');F(-42,-21,28,2,'#6a7284');F(-34,-27,4,6,acc);F(-24,-27,1,6,'#6a7284');
 poly(o2,[[-42,-29],[-48,-27],[-48,-21],[-42,-19]],'#4a4f5c');F(-47,-26,1,4,jet?'#ff7a1a':'#222');
 poly(o2,[[-14,-29],[-10,-27],[-10,-21],[-14,-19]],'#3a3f4c');F(-11,-26,1,4,'#0a0a0e');F(-14,-29,1,10,'#dfe3ec');
 poly(o2,M.body,col);
 o2.save();path(o2,M.body);o2.clip();
 F(-25,-11,120,5,dk);F(-25,-12,120,1,acc);F(-25,-18,120,1,'rgba(255,255,255,.3)');F(-25,-16,12,1,'rgba(0,0,0,.2)');
 o2.restore();
 F(54,-12,3,3,'#dfe3ec');F(51,-17,3,3,'#fff3b0');F(-15,-14,2,3,'#ff2a2a');
 F(-6,-21,16,3,'#d9c79c');F(-7,-29,3,11,'#d9c79c');
 F(0,-27,6,7,acc);pc(o2,3,-31,3,'#e6b48a');F(0,-34,7,2,'#f1efe8');
 ln(o2,36,-19,31,-27,'#333',1);F(29,-28,4,1,'#222');
 poly(o2,[[36,-36],[40,-36],[41,-20],[37,-20]],'rgba(150,200,240,.45)');
 F(-8,-36,2,18,'#4a4f5c');F(41,-36,2,16,'#4a4f5c');
 F(-9,-39,54,3,'#f4f2e8');F(-9,-37,54,1,'#c9c6b8');F(-9,-39,54,1,'#ffffff');
}
function drawPlane(M,F,col,dk,acc,jet){
 if(jet>=1){const fl=jet>=2?[90,60,34]:[10,6,3],cl=['#ff7a1a','#ffd34a','#d6f0ff'];for(let q=0;q<3;q++){const w=fl[q]*(.8+Math.random()*.4);F(-34-w,-20+q*1.6,w,9-q*2.6,cl[q])}}
 poly(o2,[[-22,-19],[-36,-44],[-22,-44],[-6,-22]],dk);F(-30,-42,10,2,acc);
 poly(o2,[[-26,-15],[-38,-20],[-34,-12]],dk);
 poly(o2,M.body,col);
 o2.save();path(o2,M.body);o2.clip();F(-35,-12,140,6,dk);F(-35,-18,140,1,'rgba(255,255,255,.35)');F(-35,-14,140,1,acc);F(28,-21,10,6,'#0a0a0e');F(30,-20,6,1,'#2a2a34');o2.restore();
 F(-36,-21,7,11,'#4a4f5c');F(-36,-21,7,2,'#9aa3b2');F(-36,-12,7,2,'#2a2a34');
 poly(o2,[[44,-23],[52,-29.5],[63,-28],[72,-20]],'#1b2a3d');poly(o2,[[47,-24],[53,-28],[57,-28],[52,-24]],'rgba(150,200,240,.55)');
 poly(o2,[[18,-14],[-12,-7],[38,-7]],dk);F(16,-13,12,1,acc);
 F(M.nx-4,-12,3,2,'#fff3b0');F(M.tx+30,-11,6,1,'#c3c8d2');
 ln(o2,0,-12,0,-5,'#9aa3b2',2);ln(o2,M.wb,-12,M.wb,-5,'#9aa3b2',2);
}
function sprite(pt,mi,rr,bars,lim,nos,rot,dy,jet){
 const Y=SPR_STY,LIP=Y&&Y.wing?[0,-1,3,5][Y.wing]:MODELS[mi].lip,TNT=TINTS[Y?Y.tint:1],M=MODELS[mi],col=pt[0],dk=pt[1],acc=pt[2],d=dy||0,F=(x,y,w,h,c)=>{o2.fillStyle=c;o2.fillRect(x,y,w,h)};
 rr+=(M.rb||0);
 o2.setTransform(1,0,0,1,0,0);o2.clearRect(0,0,200*K,72*K);o2.setTransform(K,0,0,K,0,0);o2.imageSmoothingEnabled=true;o2.save();o2.translate(OX,OY);
 if(bars){const c=Math.round(40*Math.tan(lim))+2;ln(o2,-14,-10,-40,-c,'#d8dae0',2);pc(o2,-40,-c,2,'#111')}
 if(nos&&!M.cart&&!M.plane){const cl=['#ff7a1a','#ffd34a','#8fd0ff'];for(let i=0;i<3;i++){const w=12+Math.floor(Math.random()*(20-i*4));F(-22-w,-9+i*2,w,2,cl[i])}}
 o2.save();o2.translate(0,d);
 if(Y&&Y.glow){o2.save();o2.globalAlpha=.5;o2.fillStyle=GLOWS[Y.glow];o2.beginPath();o2.ellipse(M.wb/2+6,-2,M.wb/2+26,5,0,0,7);o2.fill();o2.globalAlpha=.35;o2.beginPath();o2.ellipse(M.wb/2+6,-2,M.wb/2+34,7,0,0,7);o2.fill();o2.restore()}
 if(M.cart)drawCart(M,F,col,dk,acc,jet||0,nos);
 else if(M.plane)drawPlane(M,F,col,dk,acc,jet||0);
 else{
  if(LIP==1)F(-24,-22,9,2,dk);if(LIP==2){F(-23,-28,15,2,dk);F(-19,-26,2,8,dk)}if(LIP==3)F(-17,-29,10,2,dk);if(LIP==4)F(-16,-32,50,1,'#b9bec8');
  if(LIP==5){F(-27,-30,18,2,dk);F(-27,-31,18,1,'rgba(255,255,255,.35)');F(-27,-33,1,5,dk);F(-22,-28,2,13,dk);F(-15,-28,2,10,dk)}
  if(M.scoop){poly(o2,[[62,-19.3],[64,-21.8],[70,-21.8],[72,-18.9]],col);F(65,-21,4,1,'#0a0a0e')}
  if(M.rocket&&jet>=1){const fl=jet>=2?[60,40,22]:[8,5,2],cl=['#ff7a1a','#ffd34a','#d6f0ff'];for(let q=0;q<3;q++){const w=fl[q]*(.8+Math.random()*.4);F(-24-w,-14+q,w,4-q*1.1,cl[q])}}
  poly(o2,M.body,col);
  o2.save();path(o2,M.body);o2.clip();
  F(-25,-13,120,7,dk);F(-25,-14,120,1,'rgba(0,0,0,.25)');
  F(-25,M.ry,120,2,'rgba(255,255,255,.28)');F(-25,M.bl,120,1,'rgba(255,255,255,.38)');F(-25,M.bl+1,120,1,'rgba(255,255,255,.14)');F(-25,M.bl+5,120,1,'rgba(255,255,255,.12)');
  F(-25,-11,120,1,acc);
  if(Y&&Y.decal==1){F(-25,M.ry-.5,120,1.6,acc);F(-25,M.ry+2,120,.8,acc)}
  if(Y&&Y.decal==2)for(let q=0;q<7;q++){const x=50+q*6;poly(o2,[[x,-10],[x+5,-10],[x+3,-17-(q%2)*3]],'#ff7a1a');poly(o2,[[x+1.5,-10],[x+4,-10],[x+3,-14]],'#ffd34a')}
  if(Y&&Y.decal==3)for(let q=0;q<6;q++)for(let r=0;r<3;r++)F(-24+q*2.5,-19+r*2.5,2.5,2.5,(q+r)%2?'#111':'#fff');
  M.win.forEach(w=>{poly(o2,w,TNT);o2.save();path(o2,w);o2.clip();const mx=Math.min.apply(null,w.map(p=>p[0]));
   F(-25,M.bl-2,120,2,'rgba(90,130,190,.28)');poly(o2,[[mx+3,-32],[mx+7,-32],[mx+1,-18],[mx-3,-18]],'rgba(130,180,240,.5)');o2.restore()});
  M.seams.forEach(x=>F(x,M.bl,1,-7-M.bl,'rgba(0,0,0,.4)'));
  M.hd.forEach(x=>F(x,M.bl+3,4,1,'#d9dde6'));
  if(M.vent){const v=M.vent;F(v[0],v[1],v[2],v[3],'#0a0a0e');for(let y=v[1]+1;y<v[1]+v[3]-1;y+=2)F(v[0]+1,y,v[2]-2,1,dk)}
  if(M.louv)for(let i=0;i<M.louv[2];i++)F(M.louv[0]+i*3,M.louv[1],2,2,'#0a0a0e');
  F(M.nx-9,M.hy,8,3,'#fff3b0');F(M.nx-9,M.hy,8,1,'#cfd6e4');F(M.nx-8,M.hy+4,7,2,'#0a0a0e');F(M.nx-11,-10,11,2,'#0a0a0e');
  F(M.tx,M.ty,3,3,'#ff2a2a');F(M.tx,M.ty,3,1,'#ff8a8a');F(-25,-7,120,1,'#0a0a0e');
  pc(o2,0,-rr-d,rr+4,dk);pc(o2,M.wb,-M.fr-d,M.fr+4,dk);
  pc(o2,0,-rr-d,rr+3,'#05050a');pc(o2,M.wb,-M.fr-d,M.fr+3,'#05050a');
  o2.restore();
  if(M.split)F(M.nx-10,-6,14,1,'#111');
  if(M.pipes)F(8,-9,34,2,'#c3c8d2');if(M.rider){pc(o2,17,-25.5,3,'#e6b48a');F(12,-23,9,2,dk);F(13,-28.8,8,1.6,'#222')}F(M.mx,M.bl-1,3,2,col);F(M.mx,M.bl+1,3,1,dk);F(M.tx-2,-8,4,2,'#c3c8d2');
 }
 o2.restore();
 wheelPx(o2,0,-rr,rr,rot,true);wheelPx(o2,M.wb,-M.fr,M.fr,rot,false);o2.restore();
 o2.setTransform(K,0,0,K,0,0);
}
function drawCar(x,gy,pitch,pt,mi,rr,bars,lim,nos,rot,dy,jet){
 sprite(pt,mi,rr,bars,lim,nos,rot,dy,jet);
 g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-18,gy,110,2);
 g.save();g.translate(x,gy);g.rotate(-pitch);g.drawImage(off,-OX,-OY,200,72);g.restore();
}
let ac,osc,gn,flt;
function audioInit(){if(ac){if(ac.state==='suspended')ac.resume();return}try{ac=new(window.AudioContext||window.webkitAudioContext)();osc=ac.createOscillator();osc.type='sawtooth';flt=ac.createBiquadFilter();flt.type='lowpass';gn=ac.createGain();gn.gain.value=0;osc.connect(flt);flt.connect(gn);gn.connect(ac.destination);osc.start()}catch(e){ac=null}}
function audioUpdate(){if(!ac)return;const live=st==='race'&&R&&!R.done,r=R?(R.me.rpm??.25):.25,t=ac.currentTime;osc.frequency.setTargetAtTime(35+r*150,t,.03);flt.frequency.setTargetAtTime(400+r*900,t,.05);gn.gain.setTargetAtTime(live&&!paused?(gas()||R.me.go?.07:.025)*save.set.vol/.7:0,t,.05)}
function rev(m,dt){m.sp+=((gas()?1:0)-m.sp)*Math.min(1,dt/((.4+TN.tb*1.2)*EQ('turbo').lag));if(gas()){const cap=.65+.4*TN.lr;if(m.rev<cap)m.rev=Math.min(cap,m.rev+1.1*dt);else m.rev=cap-.05+Math.random()*.06;if(m.rev>.6&&Math.random()<.35)parts.push({x:0,y:0,vx:-1-Math.random()*2,vy:-.6-Math.random(),l:.7})}else m.rev=Math.max(.25,m.rev-1.5*dt)}
function box(x,y,w,h){g.fillStyle='rgba(10,11,14,.88)';g.fillRect(x,y,w,h);g.fillStyle='#6b717d';g.fillRect(x,y,w,1);g.fillRect(x,y+h-1,w,1);g.fillRect(x,y,1,h);g.fillRect(x+w-1,y,1,h)}
function tx(s,x,y,col,f,al){g.font=f||('bold 10px '+MONO);g.textAlign=al||'left';g.fillStyle='#000';g.fillText(s,x+1,y+1);g.fillStyle=col||'#fff';g.fillText(s,x,y)}
function drawTree(){
 const s=R?treeState():0,x0=W/2-34;box(x0,4,68,18);
 const cols=['#ffb21a','#ffb21a','#ffb21a','#2ee26b'];
 for(let i=0;i<4;i++){const on=(i<3&&s>i&&s<4)||(s===4&&i===3);pc(g,x0+9+i*17,13,5,on?cols[i]:'#2a2a3a')}
 if(R&&R.fl)pc(g,x0+60,13,5,'#ff3030');
}
function dial(cx,cy,r,t,lab,txt,zone){
 pc(g,cx,cy,r+2,'#4a4f59');pc(g,cx,cy,r+1,'#b4b9c4');pc(g,cx,cy,r,'#0d0e12');
 const A0=2.356,SW=4.712,pt=(k,d)=>[cx+Math.cos(A0+SW*k)*d,cy+Math.sin(A0+SW*k)*d];
 if(zone)for(let k=zone[0];k<=zone[2];k+=.008){const col=k>=zone[1]?'#ff3030':'#3df2c8';for(let d=r-4;d<=r-3;d++){const[p,q]=pt(k,d);g.fillStyle=col;g.fillRect(Math.round(p),Math.round(q),1,1)}}
 for(let i=0;i<=10;i++){const a=pt(i/10,r-2),b=pt(i/10,r-(i%5?5:7));ln(g,a[0],a[1],b[0],b[1],'#e6e8ee',1)}
 const n=pt(Math.min(1,Math.max(0,t)),r-4);ln(g,cx,cy,n[0],n[1],'#ff3a2a',1);pc(g,cx,cy,2,'#d0d3da');
 tx(lab,cx,cy-7,'#9aa0ac','bold 7px '+MONO,'center');tx(txt,cx,cy+13,'#fff','bold 9px '+MONO,'center');
}
function draw(){
 g.setTransform(K,0,0,K,0,0);g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';
 const m=R?R.me:{pos:0,pitch:0,rot:0,v:0},o=R?R.opp:{pos:0,rot:0};
 const cam=Math.max(0,m.pos*S-7),cc=Math.round(cam),sx=d=>Math.round(d*S-cam+55);
 ['#4fb4ff','#63bfff','#7accff','#92d8ff'].forEach((c,i)=>{g.fillStyle=c;g.fillRect(0,i*21,W,21)});
 for(let k=-1;k<5;k++){const x=Math.round(k*170-cc*.05+((k*53)%40)),y=10+((k*29)%30);g.fillStyle='#fff';[[x+6,y+5,6],[x+14,y+3,7],[x+22,y+5,6],[x+14,y+6,10]].forEach(a=>{g.beginPath();g.arc(a[0],a[1],a[2],0,7);g.fill()});g.fillStyle='#dcefff';g.fillRect(x+4,y+9,20,1.5)}
 g.fillStyle='#1a74d8';g.fillRect(0,84,W,16);g.fillStyle='#3a90ea';for(let y=88;y<100;y+=4)g.fillRect(0,y,W,1);g.fillStyle='#cfeaff';g.fillRect(0,84,W,1);
 g.fillStyle='#3c9a2a';g.fillRect(0,100,W,12);g.fillStyle='#55bd3d';for(let i=0;i<W/9+2;i++){const j=Math.floor(cc*.9/9)+i;g.fillRect(j*9-Math.round(cc*.9)+((j*7)%5),101+((j*3)%9),2,1)}
 g.fillStyle='#cfd3d8';g.fillRect(0,112,W,2);g.fillStyle='#9ba1a9';g.fillRect(0,114,W,8);g.fillStyle='#5d636b';g.fillRect(0,121,W,1);
 g.fillStyle='#7d838c';for(let i=0;i<W/32+2;i++){const j=Math.floor(cc/32)+i;g.fillRect(j*32-cc,114,1,7)}
 // poles and wires
 const PS=210;g.fillStyle='#1a1a22';
 for(let x=0;x<W;x++){const u=(((x+cc)%PS)+PS)%PS/PS,sg=Math.round(Math.sin(u*Math.PI)*7);g.fillRect(x,15+sg,1,1);g.fillRect(x,25+sg,1,1)}
 for(let k=Math.floor(cc/PS)-1;k<=Math.ceil((cc+W)/PS)+1;k++){const x=k*PS-cc;g.fillStyle='#6b4a2f';g.fillRect(x-1,8,3,104);g.fillRect(x-11,13,23,2);g.fillRect(x-8,23,17,2);g.fillStyle='#d8d8d8';[-10,-5,5,10].forEach(d=>g.fillRect(x+d,12,1,1))}
 // road
 g.fillStyle='#3d3f45';g.fillRect(0,122,W,44);g.fillStyle='#44464d';g.fillRect(0,166,W,32);g.fillStyle='#2a2c32';g.fillRect(0,198,W,12);
 g.fillStyle='#d8d8d8';g.fillRect(0,124,W,1);g.fillRect(0,196,W,1);
 for(let i=0;i<W/24+2;i++){const j=Math.floor(cc/24)+i;g.fillRect(j*24-cc,165,12,1)}
 g.fillStyle='#34363c';for(let i=0;i<W/10+2;i++){const j=Math.floor(cc/10)+i;g.fillRect(j*10-cc+((j*7)%9),128+((j*13)%66),1,1)}
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(sx(0)-26,170,34,24);
 g.fillStyle='#c3c8d2';g.fillRect(0,200,W,3);g.fillStyle='#6c7280';g.fillRect(0,203,W,1);g.fillStyle='#555b66';
 for(let i=0;i<W/20+2;i++){const j=Math.floor(cc/20)+i;g.fillRect(j*20-cc,204,3,6)}
 g.fillStyle='#fff';g.fillRect(sx(0),124,2,72);
 const ms=LEN<300?50:100;for(let d=ms;d<LEN;d+=ms){g.fillStyle='rgba(255,255,255,.4)';g.fillRect(sx(d),124,1,72);tx(d+'m',sx(d)+3,136,'#fff','8px '+MONO)}
 const fx=sx(LEN);for(let r=0;r<18;r++)for(let c=0;c<2;c++){g.fillStyle=(r+c)%2?'#000':'#fff';g.fillRect(fx+c*4,124+r*4,4,4)}
 if(!(R&&R.tt))drawCar(sx(o.pos),152,o.pitch||0,R?R.oc:PAINTS[3],R?R.om:0,8,!!(o.pitch>.05),.5,0,o.rot,0,R&&MODELS[R.om].jet&&o.v>5?2:0);
 SPR_STY=save.sty;drawCar(sx(m.pos),190+(R&&!m.go&&m.rev>.45&&Math.random()<.5?1:0),m.pitch,curPaint(),save.car,(7+EQ('tires').sz),L().bars>0||!!MODELS[save.car].jet,barLim(),R&&R.me.nos>0?1:0,m.rot,Math.round(3-SU.rh*6+Math.max(-.3,m.z||0)*3),MODELS[save.car].jet?(R&&m.go&&gas()&&!R.done?2:(R&&m.rev>.45?1:0)):0);SPR_STY=null;
 parts.forEach(p=>{p.x+=p.vx*dt_;p.y+=p.vy*dt_;p.l-=dt_;const s=2+Math.floor((1-Math.max(0,p.l))*5);g.fillStyle=p.l>.5?'rgba(240,240,244,.8)':'rgba(154,154,168,.6)';g.beginPath();g.arc(sx(p.x)-16-s,188+p.y*8,s*.7,0,7);g.fill()});
 parts=parts.filter(p=>p.l>0);
 drawTree();
 box(4,4,86,34);const et=R&&m.go?Math.max(0,(m.fin??R.stopT??R.t)-m.rx).toFixed(2):'0.00';
 tx('TIME '+et,9,16);tx('GEAR '+(R?m.g+1:1)+' NOS '+(R?m.nosLeft:L().nitro),9,28);
 if(R){const bx=W/2-60;g.fillStyle='#0b0c10';g.fillRect(bx,26,120,7);if(!R.tt){g.fillStyle='#3a8dff';g.fillRect(bx+1,27,118*Math.min(1,o.pos/LEN),2)}g.fillStyle='#ff9a1f';g.fillRect(bx+1,30,118*Math.min(1,m.pos/LEN),2)}
 const rp=R?(m.rpm??.25):.2,mph=Math.round(m.v*2.237);
 dial(W/2-33,186,29,rp/1.1,'RPM x1000',R?Math.round(rp*8000)+'':'0',[.8/1.1,.98/1.1,1]);
 dial(W/2+33,186,29,mph/(mph>1100?22000:mph>245?1100:240),'MPH',mph+'',null);
 if(R&&R.msgT>0)tx(R.msg,W/2,62,'#ffd36e','bold 14px '+MONO,'center');
 if(R&&R.t<0&&!R.fl)tx('HOLD GAS TO REV, KEEP IT HELD ON GREEN',W/2,50,'#fff','bold 10px '+MONO,'center');
 if(R&&R.fl)tx('FALSE START',W/2,58,'#ff4b4b','bold 14px '+MONO,'center');
 if(R&&m.pitch>.5&&!m.crash&&!L().bars&&!MODELS[save.car].jet)tx('NOSE TOO HIGH! LIFT OFF GAS',W/2,78,'#ff4b4b','bold 10px '+MONO,'center');
 if(paused&&st==='race'){g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,0,W,H);tx('PAUSED',W/2,95,'#fff','bold 20px '+MONO,'center');tx('Tap the screen or press '+keyName(save.binds.pause)+' to resume',W/2,115,'#9aa0ac','bold 9px '+MONO,'center')}
 g.textAlign='left';
}
let dt_=.016,last=0;
// ---- save, settings and input
const KEY='pixelDragRacer.v1';
function saveGame(){try{if(typeof localStorage!=='undefined')localStorage.setItem(KEY,JSON.stringify(save))}catch(e){}}
function loadSave(){
 try{if(typeof localStorage==='undefined')return;const d=JSON.parse(localStorage.getItem(KEY)||'null');if(!d||typeof d!=='object')return;
  const num=(v,a,b,def)=>Number.isFinite(v)?Math.min(b,Math.max(a,v)):def;
  save.cash=num(d.cash,0,1e9,save.cash);save.wins=num(d.wins,0,1e6,0);save.tier=num(d.tier,0,1000,0);if(d.sty&&typeof d.sty==='object'){const y=save.sty;y.body=HEX.test(d.sty.body||'')?d.sty.body:null;y.acc=HEX.test(d.sty.acc||'')?d.sty.acc:null;y.rim=Math.floor(num(d.sty.rim,0,RIMS.length-1,0));y.tint=Math.floor(num(d.sty.tint,0,2,1));y.wing=Math.floor(num(d.sty.wing,0,3,0));y.decal=Math.floor(num(d.sty.decal,0,3,0));y.glow=Math.floor(num(d.sty.glow,0,GLOWS.length-1,0))}save.streak=Math.floor(num(d.streak,0,MAXLOSS,0));
  MODELS.forEach((m,i)=>{save.own[i]=i===0||(Array.isArray(d.own)&&d.own[i])?1:0});
  save.car=Number.isInteger(d.car)&&save.own[d.car]?d.car:0;save.paint=Math.floor(num(d.paint,0,PAINTS.length-1,0));
  SLOTS.forEach(sl=>{const n=CAT[sl.k].length;save.inv[sl.k]=CAT[sl.k].map((_,i)=>i===0||(d.inv&&Array.isArray(d.inv[sl.k])&&d.inv[sl.k][i])?1:0);const e=d.eq&&Number.isInteger(d.eq[sl.k])?d.eq[sl.k]:0;save.eq[sl.k]=(e>=0&&e<n&&save.inv[sl.k][e])?e:0});
  if(d.lv&&!d.eq){const map={engine:'engine',turbo:'turbo',wheels:'tires',bars:'bars',nitro:'nitro',weight:'weight'};for(const k in map){const sl=map[k],lv=Math.max(0,Math.min(CAT[sl].length-1,Math.floor(Number.isFinite(d.lv[k])?d.lv[k]:0)));for(let i=0;i<=lv;i++)save.inv[sl][i]=1;save.eq[sl]=lv}}
  if(d.su)['st','rh','dm'].forEach(k=>{SU[k]=num(d.su[k],0,1,.5)});
  if(d.tn)Object.keys(TN).forEach(k=>{TN[k]=num(d.tn[k],0,1,.5)});
  if(d.opt){save.opt.mode=d.opt.mode===1?1:0;save.opt.dist=Math.floor(num(d.opt.dist,0,DISTS.length-1,1));save.opt.diff=Math.floor(num(d.opt.diff,0,DIFFS.length-1,1));save.opt.wager=Math.floor(num(d.opt.wager,0,WAGERS.length-1,0))}
  if(d.best&&typeof d.best==='object')for(const k in d.best)if(Number.isFinite(d.best[k])&&d.best[k]>0)save.best[k]=d.best[k];
  if(d.set){save.set.auto=d.set.auto?1:0;save.set.vol=num(d.set.vol,0,1,.7);save.set.vib=d.set.vib===0?0:1;save.set.lefty=d.set.lefty?1:0;save.set.big=d.set.big?1:0}
  if(d.binds)ACTS.forEach(a=>{if(typeof d.binds[a]==='string'&&d.binds[a].length<24)save.binds[a]=d.binds[a]});
 }catch(e){}
}
function resetSave(){
 save.cash=500;save.wins=0;save.tier=0;save.streak=0;Object.assign(save.sty,{body:null,acc:null,rim:0,tint:1,wing:0,decal:0,glow:0});save.car=0;save.paint=0;MODELS.forEach((m,i)=>{save.own[i]=i?0:1});
 SLOTS.forEach(sl=>{save.inv[sl.k]=CAT[sl.k].map((_,i)=>i?0:1);save.eq[sl.k]=0});SU.st=SU.rh=SU.dm=.5;Object.keys(TN).forEach(k=>{TN[k]=.5});Object.assign(save.opt,{mode:0,dist:1,diff:1,wager:0});for(const k in save.best)delete save.best[k];saveGame();
}
const ACTS=['gas','shift','nitro','pause'];
const ALT={gas:['ArrowUp','KeyW'],shift:['ArrowRight','ShiftRight','KeyD'],nitro:['ArrowDown','KeyS'],pause:['Escape']};
const LABEL={gas:'Gas and rev',shift:'Shift gear',nitro:'Nitrous',pause:'Pause'};
function actOf(c){for(const a of ACTS)if(save.binds[a]===c)return a;for(const a of ACTS)if(ALT[a].includes(c))return a;return null}
function keyName(c){return c.replace(/^Key|^Digit/,'').replace('Arrow','').replace('ShiftLeft','L-Shift').replace('ShiftRight','R-Shift').replace('Escape','Esc')}
function syncGas(){keys.gas=!!(keys.k||keys.t||keys.p)}
function buzz(ms){try{if(save.set.vib&&typeof navigator!=='undefined'&&navigator.vibrate)navigator.vibrate(ms)}catch(e){}}
let paused=false,capturing=null,settingsOpen=false,resetArm=false;
function setPaused(v){paused=v;$('pausebtn').textContent=v?'Resume':'Pause'}
function togglePause(){if(st==='race'&&R&&!R.done)setPaused(!paused)}
function updateLabels(){const k=a=>' <span class="k">('+keyName(save.binds[a])+')</span>';$('gas').innerHTML='HOLD GAS'+k('gas');$('shift').innerHTML='SHIFT'+k('shift');$('nos').innerHTML='NITRO'+k('nitro')}
function applyLayout(){
 if(typeof innerWidth==='undefined')return;
 const app=$('app'),land=innerWidth>innerHeight&&innerHeight<560;
 app.classList.toggle('land',land);app.classList.toggle('lefty',!!save.set.lefty);app.classList.toggle('bigbtn',!!save.set.big);
 const port=innerHeight>innerWidth&&!land;app.classList.toggle('port',port);
 const v=$('view');if(port){const w=$('stage').getBoundingClientRect().width;if(!w)return;v.style.height=Math.round(210*(w/480))+12+'px'}else v.style.height='';
 const r=v.getBoundingClientRect();if(!r.width||!r.height)return;
 let sc=Math.min(r.width/480,r.height/210);if(sc>=2)sc=Math.floor(sc*2)/2;sc=Math.max(.4,sc);
 cv.style.width=Math.floor(480*sc/2)*2+'px';cv.style.height=Math.floor(210*sc/2)*2+'px';
}
function toggleFullscreen(){try{const d=document,e=d.documentElement;if(d.fullscreenElement||d.webkitFullscreenElement)(d.exitFullscreen||d.webkitExitFullscreen).call(d);else(e.requestFullscreen||e.webkitRequestFullscreen).call(e)}catch(x){}}
function renderSettings(){
 const seg=(id,items,get,set)=>{const b=$(id);b.innerHTML='';items.forEach(a=>{const x=el('button','opt'+(get()===a[1]?' sel':''),a[0]);x.onclick=()=>{set(a[1]);saveGame();renderSettings()};b.appendChild(x)})};
 seg('o_trans',[['Manual',0],['Auto-shift',1]],()=>save.set.auto,v=>{save.set.auto=v});
 seg('o_vib',[['On',1],['Off',0]],()=>save.set.vib,v=>{save.set.vib=v});
 seg('o_hand',[['Right-handed',0],['Left-handed',1]],()=>save.set.lefty,v=>{save.set.lefty=v;applyLayout()});
 seg('o_size',[['Normal buttons',0],['Large buttons',1]],()=>save.set.big,v=>{save.set.big=v;applyLayout()});
 const vol=$('o_vol');vol.value=Math.round(save.set.vol*100);vol.oninput=()=>{save.set.vol=vol.value/100;saveGame()};
 const ks=$('o_keys');ks.innerHTML='';
 ACTS.forEach(a=>{const r=el('div','row krow'),b=el('button','buy',capturing===a?'Press a key':keyName(save.binds[a]));
  r.appendChild(el('div','info','<b>'+LABEL[a]+'</b><span>Also: '+ALT[a].map(keyName).join(', ')+'</span>'));
  b.onclick=()=>{capturing=a;renderSettings()};r.appendChild(b);ks.appendChild(r)});
 $('resetsave').textContent=resetArm?'Tap again to erase everything':'Reset save';
}
const CODES={devtool3:()=>{const i=MODELS.findIndex(m=>m.plane);save.own[i]=1;save.car=i;return 'Fighter Jet unlocked and selected! Top speed 20,000 mph.'},devtool2:()=>{const i=MODELS.findIndex(m=>m.rocket);save.own[i]=1;save.car=i;return 'Rocket Car unlocked and selected! Top speed 1000 mph.'},moneyforlife:()=>{save.cash=Math.min(1e9,save.cash+1000000);return '$1,000,000 added to your cash!'}};
function redeem(raw){const f=CODES[String(raw||'').trim().toLowerCase()];if(!f)return null;const m=f();saveGame();return m}
function applyCode(){const i=$('codein'),m=redeem(i.value);$('codemsg').textContent=m||'That code is not valid.';if(m){i.value='';renderGarage()}}
function openSettings(){$('codemsg').textContent='';settingsOpen=true;if(st==='race'&&R&&!R.done)setPaused(true);renderSettings();$('settings').classList.add('on')}
function closeSettings(){settingsOpen=false;capturing=null;$('settings').classList.remove('on');saveGame()}
const pad={s:0,n:0,p:0};
function pollPad(){
 try{const gl=(typeof navigator!=='undefined'&&navigator.getGamepads)?navigator.getGamepads():[];let gp=null;
  for(let i=0;i<gl.length;i++)if(gl[i]){gp=gl[i];break}
  if(!gp){if(keys.p){keys.p=false;syncGas()}return}
  const b=i=>!!(gp.buttons[i]&&gp.buttons[i].pressed);
  keys.p=b(7)||b(0);syncGas();
  const s=b(2)||b(5)||b(1),n=b(3)||b(4),p=b(9);
  if(s&&!pad.s)doShift();if(n&&!pad.n)nitro();if(p&&!pad.p)togglePause();pad.s=s;pad.n=n;pad.p=p;
 }catch(e){}
}
function loop(ts){dt_=Math.min(.033,(ts-last)/1000||.016);last=ts;pollPad();
 if(st==='race'&&R&&!paused)step(dt_);draw();audioUpdate();if(st==='garage')drawPrev();requestAnimationFrame(loop)}
addEventListener('keydown',e=>{
 if(capturing){e.preventDefault();if(e.code!=='Escape'){const a=capturing;for(const o of ACTS)if(o!==a&&save.binds[o]===e.code)save.binds[o]=save.binds[a];save.binds[a]=e.code}capturing=null;saveGame();updateLabels();renderSettings();return}
 if(settingsOpen)return;
 audioInit();const a=actOf(e.code);if(!a)return;
 if(a==='gas'){keys.k=true;syncGas();e.preventDefault();if(e.target&&e.target.tagName==='BUTTON')e.target.blur()}
 else if(a==='shift'){if(!e.repeat)doShift();e.preventDefault()}
 else if(a==='nitro'){if(!e.repeat)nitro();e.preventDefault()}
 else if(a==='pause'){if(!e.repeat)togglePause()}});
addEventListener('keyup',e=>{if(actOf(e.code)==='gas'){keys.k=false;syncGas();e.preventDefault()}});
const gb=$('gas');
gb.addEventListener('pointerdown',e=>{audioInit();keys.t=true;syncGas();try{gb.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault()});
['pointerup','pointercancel','pointerleave'].forEach(n=>gb.addEventListener(n,()=>{keys.t=false;syncGas()}));
$('shift').addEventListener('pointerdown',e=>{audioInit();doShift();e.preventDefault()});
$('nos').addEventListener('pointerdown',e=>{audioInit();nitro();e.preventDefault()});
cv.addEventListener('pointerdown',()=>{if(paused&&!settingsOpen)setPaused(false)});
$('pausebtn').onclick=()=>{$('pausebtn').blur();togglePause()};
$('optbtn').onclick=()=>{$('optbtn').blur();openSettings()};
$('closeopt').onclick=closeSettings;
$('codego').onclick=applyCode;
$('codein').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();applyCode()}};
$('resetsave').onclick=()=>{if(!resetArm){resetArm=true;renderSettings();setTimeout(()=>{resetArm=false;if(settingsOpen)renderSettings()},4000)}else{resetArm=false;resetSave();renderSettings();renderGarage()}};
$('storebtn').onclick=()=>openStore();$('sback').onclick=closeStore;
$('race').onclick=()=>{renderSetup();$('garage').classList.remove('on');$('setup').classList.add('on')};
$('back').onclick=()=>{$('setup').classList.remove('on');$('garage').classList.add('on')};
$('start').onclick=newRace;$('rerace').onclick=newRace;
$('again').onclick=()=>{st='garage';R=null;setPaused(false);renderGarage();$('result').classList.remove('on');$('garage').classList.add('on')};
addEventListener('blur',()=>{keys.k=keys.t=keys.p=false;syncGas();if(st==='race'&&R&&!R.done)setPaused(true)});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&st==='race'&&R&&!R.done)setPaused(true)});
document.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('#ctl'))e.preventDefault()});
$('fsbtn').onclick=()=>{$('fsbtn').blur();toggleFullscreen()};
if(typeof document!=='undefined'&&(document.fullscreenEnabled||document.webkitFullscreenEnabled))$('fsbtn').hidden=false;
if(typeof innerWidth!=='undefined'){addEventListener('resize',applyLayout);addEventListener('orientationchange',()=>setTimeout(applyLayout,250));if(typeof ResizeObserver!=='undefined')new ResizeObserver(applyLayout).observe($('view'));if(typeof visualViewport!=='undefined'&&visualViewport)visualViewport.addEventListener('resize',applyLayout)}
loadSave();updateLabels();applyLayout();renderGarage();requestAnimationFrame(loop);
