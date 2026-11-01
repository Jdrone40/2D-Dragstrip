// Run with: npm test
const G = require('./harness');
const assert = require('assert');
const rnd = Math.random;
const set = c => G.setBuild(c);

function race(gasFn, opts = {}) {
  G.newRace(); const R = G.R;
  for (let i = 0; i < 5000 && !R.shown; i++) {
    const dt = opts.rough ? .008 + rnd() * .025 : .016, m = R.me;
    G.keys.gas = gasFn(R, m);
    if (!opts.noShift && m.go && !R.done && (opts.rough ? rnd() < .04 : m.g < G.maxGear() && m.rpm > .9)) G.doShift();
    if (opts.rough && rnd() < .01) G.nitro();
    G.step(dt); G.setDt(dt); G.setSt(R.shown ? 'result' : 'race');
    if (i % 7 === 0) G.draw();
    for (const k of ['pos', 'v', 'rpm', 'pitch', 'w', 'z', 'zv', 'rev', 'lr']) assert(Number.isFinite(R.me[k]), 'NaN in ' + k);
    assert(Number.isFinite(R.opp.pos) && R.opp.pos >= 0, 'bad rival position');
  }
  assert(R.shown, 'race never ended');
  return R;
}
let n = 0; const test = (name, fn) => { fn(); n++; console.log('ok  -', name); };

test('garage renders for every car', () => { for (let c = 0; c < G.MODELS.length; c++) { G.save.car = c; G.save.own[c] = 1; G.renderGarage(); G.setSt('garage'); G.draw(); } G.save.car = 0; });
test('stock car holding gas wins an early race', () => { G.save.tier = 0; set({}); assert.strictEqual(race(() => true).res, 'win'); });
test('high power without wheelie bars flips', () => { G.save.car = 1; set({ engine: 5, wheels: 3, turbo: 3, nitro: 3 }); assert.strictEqual(race(() => true).res, 'crash'); });
test('wheelie bars prevent the flip', () => { set({ engine: 5, wheels: 3, turbo: 3, nitro: 3, bars: 3 }); assert.strictEqual(race(() => true).res, 'win'); G.save.car = 0; });
test('never touching gas loses and ends', () => { set({}); assert.strictEqual(race(() => false).res, 'lose'); });
test('late launch still works', () => { const R = race(r => r.t > 1); assert(R.me.rx >= 1); });
test('winning pays cash and advances the tier', () => { G.save.tier = 0; G.save.cash = 0; set({}); const R = race(() => true); assert.strictEqual(R.res, 'win'); assert(G.save.cash >= 250); assert.strictEqual(G.save.tier, 1); });
test('300 random races: no NaN, no stuck races, no draw errors', () => {
  const keys = ['engine', 'turbo', 'wheels', 'bars', 'nitro', 'weight'], mx = [5, 3, 3, 3, 3, 3];
  for (let k = 0; k < 300; k++) {
    const bld = { trans: Math.floor(rnd() * 6), exhaust: Math.floor(rnd() * 4) }; keys.forEach((nme, i) => bld[nme] = Math.floor(rnd() * (mx[i] + 1))); set(bld);
    G.save.car = Math.floor(rnd() * G.MODELS.length); G.save.paint = Math.floor(rnd() * 6);
    Object.assign(G.save.opt, { mode: rnd() < .3 ? 1 : 0, dist: Math.floor(rnd() * 3), diff: Math.floor(rnd() * 3), wager: Math.floor(rnd() * 3) }); G.save.cash = Math.floor(rnd() * 600); G.save.tier = Math.floor(rnd() * 14);
    ['st', 'rh', 'dm'].forEach(s => G.SU[s] = [0, 1, rnd()][Math.floor(rnd() * 3)]);
    G.renderGarage(); race(k % 2 ? () => true : () => rnd() < .7, { rough: true });
  }
});
test('every distance and difficulty finishes', () => {
  for (let d = 0; d < 3; d++) for (let f = 0; f < 3; f++) { Object.assign(G.save.opt, { mode: 0, dist: d, diff: f, wager: 0 }); set({}); G.save.tier = 0; const R = race(() => true); assert(R.me.fin != null, 'no finish'); }
});
test('time trial has no rival and pays a small prize', () => {
  Object.assign(G.save.opt, { mode: 1, dist: 1, diff: 1, wager: 0 }); G.save.cash = 0; set({}); const R = race(() => true);
  assert.strictEqual(R.res, 'finish'); assert(G.save.cash > 0);
});
test('time trial ends if you never launch', () => { Object.assign(G.save.opt, { mode: 1 }); assert.strictEqual(race(() => false).res, 'abort'); });
test('losing a wager takes cash, never below zero', () => {
  Object.assign(G.save.opt, { mode: 0, dist: 1, diff: 2, wager: 2 }); G.save.cash = 400; G.save.tier = 12; set({}); const R = race(() => false);
  assert.strictEqual(R.res, 'lose'); assert(G.save.cash >= 0 && G.save.cash < 400);
});
test('best times are saved per distance', () => { Object.assign(G.save.opt, { mode: 1, dist: 0 }); set({}); race(() => true); assert(G.save.best[201] > 0); });
test('there are 18 cars and each one races', () => {
  assert.strictEqual(G.MODELS.length, 18);
  Object.assign(G.save.opt, { mode: 0, dist: 1, diff: 1, wager: 0 }); set({ bars: 3 });
  for (let c = 0; c < G.MODELS.length; c++) { G.save.car = c; G.save.own[c] = 1; G.renderGarage(); assert(race(() => true).me.fin != null, 'car ' + c); }
  G.save.car = 0;
});
test('auto-shift changes gears without the player', () => {
  G.save.set.auto = 1; set({}); const R = race(() => true, { noShift: true }); assert(R.me.g >= 3, 'gear ' + R.me.g); G.save.set.auto = 0;
});
test('without auto-shift and no shifting, the car stays in gear 1', () => { set({}); const R = race(() => true, { noShift: true }); assert.strictEqual(R.me.g, 0); });
test('game saves and loads', () => {
  G.save.cash = 1234; G.save.wins = 7; G.save.tier = 3; set({ engine: 4, bars: 2, trans: 3, turbo: 5, tires: 2 }); G.save.own[5] = 1; G.save.car = 5; G.save.paint = 3; G.SU.st = .9; G.save.best[402] = 8.88; G.save.set.vol = .2; G.save.binds.gas = 'KeyG';
  G.saveGame();
  G.save.cash = 0; G.save.wins = 0; G.save.tier = 0; set({}); G.save.own[5] = 0; G.save.car = 0; G.save.paint = 0; G.SU.st = .5; G.save.best = G.save.best; delete G.save.best[402]; G.save.set.vol = .7; G.save.binds.gas = 'Space';
  G.loadSave();
  assert.strictEqual(G.save.cash, 1234); assert.strictEqual(G.save.wins, 7); assert.strictEqual(G.save.tier, 3);
  assert.strictEqual(G.save.eq.engine, 4); assert.strictEqual(G.save.eq.bars, 2); assert.strictEqual(G.save.eq.trans, 3); assert.strictEqual(G.save.eq.turbo, 5); assert.strictEqual(G.save.eq.tires, 2); assert.strictEqual(G.save.car, 5); assert.strictEqual(G.save.paint, 3);
  assert.strictEqual(G.SU.st, .9); assert.strictEqual(G.save.best[402], 8.88); assert.strictEqual(G.save.set.vol, .2); assert.strictEqual(G.save.binds.gas, 'KeyG');
  G.save.binds.gas = 'Space';
});
test('corrupt or hostile save data is ignored safely', () => {
  G.ls.setItem('pixelDragRacer.v1', '{bad json'); G.loadSave();
  G.ls.setItem('pixelDragRacer.v1', JSON.stringify({ cash: 'lots', car: 99, own: 'x', lv: { engine: 999 }, su: { st: 50 }, paint: -4, opt: { dist: 77 } }));
  G.loadSave(); assert(G.save.car >= 0 && G.save.car < G.MODELS.length); assert(G.L().engine <= 6); assert(G.SU.st <= 1);
  assert(G.save.paint >= 0); assert(G.save.opt.dist <= 2); assert(Number.isFinite(G.save.cash));
});
test('reset save restores the defaults', () => { G.save.cash = 99999; set({ engine: 5, trans: 4 }); G.save.own[3] = 1; G.resetSave(); assert.strictEqual(G.save.cash, 500); assert.strictEqual(G.save.eq.engine, 0); assert.strictEqual(G.save.eq.trans, 0); assert.strictEqual(G.save.inv.engine[3], 0); assert.strictEqual(G.save.own[3], 0); assert.strictEqual(G.save.own[0], 1); });
test('key bindings resolve, including alternates', () => {
  G.save.binds.gas = 'Space'; assert.strictEqual(G.actOf('Space'), 'gas'); assert.strictEqual(G.actOf('ArrowUp'), 'gas'); assert.strictEqual(G.actOf('KeyW'), 'gas');
  assert.strictEqual(G.actOf('ShiftLeft'), 'shift'); assert.strictEqual(G.actOf('KeyN'), 'nitro'); assert.strictEqual(G.actOf('KeyP'), 'pause'); assert.strictEqual(G.actOf('KeyZ'), null);
});
const setTN = o => Object.assign(G.save.tn, { bar: .5, nos: .5, tb: .5, fd: .5, lr: .5 }, o);
const run = (o, c, dist = 1) => { setTN(o); set(c); Object.assign(G.save.opt, { mode: 1, dist, diff: 1, wager: 0 }); const R = race(() => true); return { et: R.me.fin - R.me.rx, v: R.me.endV, msg: R.msg, R }; };
test('wheelie bar height tuning raises the bar limit', () => { set({ bars: 2 }); setTN({ bar: 0 }); const lo = G.barLim(); setTN({ bar: 1 }); const hi = G.barLim(); assert(hi > lo * 2, lo + ' ' + hi); setTN({}); });
test('final drive trades launch for top speed', () => {
  const short = run({ fd: 0 }, {}, 0), tall = run({ fd: 1 }, {}, 0);
  assert(short.et < tall.et, 'short gears should win the 1/8: ' + short.et + ' vs ' + tall.et);
  const s2 = run({ fd: 0 }, { engine: 5, wheels: 3, bars: 3 }, 2), t2 = run({ fd: 1 }, { engine: 5, wheels: 3, bars: 3 }, 2);
  assert(t2.v > s2.v, 'tall gears should have the higher trap speed: ' + t2.v + ' vs ' + s2.v);
});
test('turbo boost pressure changes power and spools up', () => {
  const lo = run({ tb: 0 }, { turbo: 3, wheels: 3, engine: 3, bars: 3 }), hi = run({ tb: 1 }, { turbo: 3, wheels: 3, engine: 3, bars: 3 });
  assert(Math.abs(lo.et - hi.et) > .02, 'boost setting should matter: ' + lo.et + ' vs ' + hi.et); assert(hi.R.me.sp > 0);
});
test('nitrous tuning sets shot length', () => {
  for (const [v, want] of [[0, 2.6], [1, 1.0]]) {
    setTN({ nos: v }); set({ nitro: 2 }); G.newRace(); const R = G.R;
    for (let i = 0; i < 400 && !R.me.go; i++) { G.keys.gas = true; G.step(.016); G.setDt(.016); }
    G.nitro(); assert(Math.abs(R.me.nos - want) < 1e-9, 'nos ' + R.me.nos);
  }
  setTN({});
});
test('launch RPM tuning: low is a soft launch, high over-revs', () => {
  const launchMsg = o => { setTN(o); set({}); Object.assign(G.save.opt, { mode: 1, dist: 1 }); G.newRace(); const R = G.R; for (let i = 0; i < 600 && !R.me.go; i++) { G.keys.gas = true; G.step(.016); G.setDt(.016); } return R.msg; };
  assert.strictEqual(launchMsg({ lr: 1 }), 'OVER-REV'); assert.strictEqual(launchMsg({ lr: 0 }), 'GOOD LAUNCH'); assert.strictEqual(launchMsg({ lr: .5 }), 'PERFECT LAUNCH'); setTN({});
});
test('tuning saves and loads', () => {
  setTN({ bar: .1, nos: .9, tb: .3, fd: .8, lr: .2 }); G.saveGame(); setTN({}); G.loadSave();
  assert.deepStrictEqual([G.save.tn.bar, G.save.tn.nos, G.save.tn.tb, G.save.tn.fd, G.save.tn.lr], [.1, .9, .3, .8, .2]); setTN({}); G.saveGame();
});
test('losing makes the rival slower and a win resets it', () => {
  Object.assign(G.save.opt, { mode: 0, dist: 1, diff: 1, wager: 0 }); G.save.tier = 0; G.save.streak = 0; setTN({}); set({});
  const avg = () => { let s = 0; for (let i = 0; i < 40; i++) { G.newRace(); s += G.R.T; } return s / 40; };
  const base = avg(); race(() => false); race(() => false); race(() => false);
  assert.strictEqual(G.save.streak, 3); const slow = avg(); assert(slow > base * 1.1, 'slower rival: ' + base + ' -> ' + slow);
  race(() => true); assert.strictEqual(G.save.streak, 0, 'a win resets the streak'); assert(avg() < slow);
});
test('a crash counts as a loss, time trials do not, and the streak is capped', () => {
  Object.assign(G.save.opt, { mode: 0, dist: 1, diff: 1, wager: 0 }); G.save.streak = 0; set({ engine: 5, wheels: 3, turbo: 3, nitro: 3 }); G.save.car = 1;
  assert.strictEqual(race(() => true).res, 'crash'); assert.strictEqual(G.save.streak, 1);
  G.save.opt.mode = 1; race(() => false); assert.strictEqual(G.save.streak, 1);
  G.save.opt.mode = 0; set({}); G.save.car = 0; for (let i = 0; i < 12; i++) race(() => false); assert.strictEqual(G.save.streak, 8);
});
test('the loss streak saves and loads', () => { G.save.streak = 5; G.saveGame(); G.save.streak = 0; G.loadSave(); assert.strictEqual(G.save.streak, 5); G.save.streak = 0; G.saveGame(); });
test('the Jet Golf Cart costs $2500 and is the fastest car, without flipping', () => {
  const cart = G.MODELS.find(m => m.jet); assert.strictEqual(cart.c, 2500); assert(G.MODELS.every(m => m === cart || m.secret || m.c < 2500));
  Object.assign(G.save.opt, { mode: 1, dist: 1, diff: 1, wager: 0 }); set({});
  const et = i => { G.save.car = i; G.save.own[i] = 1; const R = race(() => true); assert.notStrictEqual(R.res, 'crash', 'car ' + i + ' flipped'); return R.me.fin - R.me.rx; };
  const cartEt = et(G.MODELS.indexOf(cart)); for (let i = 0; i < G.MODELS.length; i++) if (G.MODELS[i] !== cart && !G.MODELS[i].secret) assert(cartEt < et(i) - .5, 'cart ' + cartEt + ' vs car ' + i);
  G.save.car = 0;
});
test('the cheat code adds $1,000,000 and saves', () => {
  G.resetSave(); const before = G.save.cash;
  assert(G.redeem('moneyforlife')); assert.strictEqual(G.save.cash, before + 1000000);
  assert(G.redeem('  MoneyForLife ')); assert.strictEqual(G.save.cash, before + 2000000);
  G.save.cash = 0; G.loadSave(); assert.strictEqual(G.save.cash, before + 2000000, 'saved to storage');
  assert.strictEqual(G.redeem('notacode'), null); assert.strictEqual(G.redeem(''), null); assert.strictEqual(G.save.cash, before + 2000000);
  G.resetSave();
});
test('parts are bought in the store, owned parts can be swapped for free', () => {
  G.resetSave(); G.save.cash = 100; assert.strictEqual(G.buyPart('engine', 1), false, 'too poor'); assert.strictEqual(G.save.eq.engine, 0); assert.strictEqual(G.save.cash, 100);
  G.save.cash = 1000; assert.strictEqual(G.buyPart('engine', 1), true); assert.strictEqual(G.save.eq.engine, 1); assert.strictEqual(G.save.cash, 700);
  assert.strictEqual(G.buyPart('engine', 1), false, 'cannot buy the same part twice');
  assert.strictEqual(G.buyPart('engine', 2), true); assert.strictEqual(G.save.eq.engine, 2); assert.strictEqual(G.save.cash, 0);
  assert.strictEqual(G.equipPart('engine', 1), true); assert.strictEqual(G.save.eq.engine, 1, 'swap back for free'); assert.strictEqual(G.save.cash, 0);
  assert.strictEqual(G.equipPart('engine', 5), false, 'cannot equip a part you do not own');
  assert.strictEqual(G.buyPart('nonsense', 1), false); assert.strictEqual(G.buyPart('engine', 99), false); assert.strictEqual(G.equipPart('engine', 0), true, 'stock is always owned');
  for (const s of G.SLOTS) { G.renderStore(''); } G.renderGarage(); G.resetSave();
});
test('every part in the catalogue can be fitted and raced without errors', () => {
  Object.assign(G.save.opt, { mode: 1, dist: 0, diff: 1, wager: 0 });
  for (const sl of G.SLOTS) for (let i = 0; i < G.CAT[sl.k].length; i++) { G.setBuild({ [sl.k]: i }); G.renderGarage(); const R = race(() => true); assert(['finish', 'crash'].includes(R.res), sl.k + ' ' + i + ' ' + R.res); }
  set({});
});
test('better engines are faster', () => {
  Object.assign(G.save.opt, { mode: 1, dist: 1, diff: 1, wager: 0 }); G.save.car = 0; let last = 99;
  for (let e = 0; e <= 5; e++) { set({ engine: e, tires: 4, bars: 3 }); const R = race(() => true); const et = R.me.fin - R.me.rx; assert(et < last, 'engine ' + e + ' ' + et + ' vs ' + last); last = et; }
  set({});
});
test('transmissions: gear counts, auto and quick-shift behave', () => {
  assert.deepStrictEqual(G.CAT.trans.map(x => x.tops.length), [5, 5, 6, 2, 4, 7]);
  set({ trans: 3 }); let R = race(() => true, { noShift: true }); assert.strictEqual(R.me.g, 1, 'the auto trans shifts itself into top gear');
  set({ trans: 5 }); G.newRace(); R = G.R; for (let i = 0; i < 600 && !R.me.go; i++) { G.keys.gas = true; G.step(.016); G.setDt(.016); }
  for (let i = 0; i < 400 && R.me.rpm < .5; i++) { G.step(.016); G.setDt(.016); } R.me.rpm = .3; G.doShift(); assert.strictEqual(R.me.g, 1); assert(R.me.boost > 0, 'DCT gives a boost on any shift');
  set({ trans: 3 }); G.newRace(); R = G.R; for (let i = 0; i < 600 && !R.me.go; i++) { G.keys.gas = true; G.step(.016); G.setDt(.016); } G.doShift(); assert.strictEqual(R.me.g, 0, 'manual shift ignored on an auto');
  set({});
});
test('a supercharger spools faster than a big turbo', () => {
  const sp = i => { set({ turbo: i }); G.newRace(); const R = G.R; for (let k = 0; k < 40; k++) { G.keys.gas = true; G.step(.016); G.setDt(.016); } return R.me.sp; };
  const big = sp(3), roots = sp(4); assert(roots > big + .15, roots + ' vs ' + big); set({});
});
test('old saves with part levels are migrated to the new parts', () => {
  G.ls.setItem('pixelDragRacer.v1', JSON.stringify({ cash: 700, lv: { engine: 3, turbo: 2, wheels: 3, bars: 1, nitro: 2, weight: 1 } })); G.loadSave();
  assert.deepStrictEqual([G.save.eq.engine, G.save.eq.turbo, G.save.eq.tires, G.save.eq.bars, G.save.eq.nitro, G.save.eq.weight], [3, 2, 3, 1, 2, 1]);
  assert.strictEqual(G.save.inv.engine[2], 1, 'earlier parts count as owned'); G.resetSave();
});
test('the rival pops wheelies and settles back down', () => {
  Object.assign(G.save.opt, { mode: 0, dist: 1, diff: 1, wager: 0 }); set({}); G.newRace(); const R = G.R; let max = 0;
  for (let i = 0; i < 700; i++) { G.keys.gas = true; G.step(.016); G.setDt(.016); max = Math.max(max, R.opp.pitch); assert(Number.isFinite(R.opp.pitch) && R.opp.pitch >= 0 && R.opp.pitch < 1.2); }
  assert(max > .1, 'rival wheelie ' + max); assert(R.opp.pitch < max, 'settles');
});
test('devtool2 unlocks the C6 Drag Vette that reaches 1000 mph', () => {
  G.resetSave(); const ri = G.MODELS.findIndex(m => m.rocket); assert.strictEqual(G.save.own[ri], 0);
  assert(G.redeem('devtool2')); assert.strictEqual(G.save.own[ri], 1); assert.strictEqual(G.save.car, ri);
  Object.assign(G.save.opt, { mode: 1, dist: 2, diff: 1, wager: 0 }); set({}); const R = race(() => true);
  assert.strictEqual(R.res, 'finish'); const mph = R.me.endV * 2.237; assert(mph > 990 && mph < 1010, 'mph ' + mph);
  G.save.car = 0; G.resetSave();
});
test('devtool3 unlocks the Fighter Jet that reaches 20000 mph', () => {
  G.resetSave(); const ji = G.MODELS.findIndex(m => m.plane); assert.strictEqual(G.save.own[ji], 0);
  assert(G.redeem('devtool3')); assert.strictEqual(G.save.own[ji], 1); assert.strictEqual(G.save.car, ji);
  Object.assign(G.save.opt, { mode: 1, dist: 2, diff: 1, wager: 0 }); set({}); const R = race(() => true);
  assert.strictEqual(R.res, 'finish'); const mph = R.me.endV * 2.237; assert(mph > 19800 && mph < 20200, 'mph ' + mph);
  G.save.car = 0; G.resetSave();
});
test('the new part slots add power or grip and race cleanly', () => {
  assert.strictEqual(G.SLOTS.length, 14);
  const pw = G.power(), gr = G.grip(); set({ intake: 4, fuel: 4, ecu: 4 }); assert(G.power() > pw + 7, 'power ' + G.power());
  set({ clutch: 4, susp: 4, diff: 4 }); assert(G.grip() > gr + 9, 'grip ' + G.grip());
  set({ engine: 6, tires: 5, bars: 4, nitro: 4, intake: 4, fuel: 4, ecu: 4, clutch: 4, susp: 4, diff: 4 });
  Object.assign(G.save.opt, { mode: 1, dist: 1, diff: 1, wager: 0 }); G.save.car = 0; const R = race(() => true); assert.strictEqual(R.res, 'finish');
  G.renderStore(''); G.renderGarage(); set({});
});
test('style options save, load, validate and draw on every car', () => {
  Object.assign(G.save.sty, { body: '#12ab34', acc: '#fedcba', rim: 3, tint: 2, wing: 3, decal: 2, glow: 4 }); G.saveGame();
  Object.assign(G.save.sty, { body: null, acc: null, rim: 0, tint: 1, wing: 0, decal: 0, glow: 0 }); G.loadSave();
  assert.deepStrictEqual(G.save.sty, { body: '#12ab34', acc: '#fedcba', rim: 3, tint: 2, wing: 3, decal: 2, glow: 4 });
  G.ls.setItem('pixelDragRacer.v1', JSON.stringify({ sty: { body: 'red; alert(1)', acc: 5, rim: 99, tint: -3, wing: 'x', decal: 77, glow: 50 } })); G.loadSave();
  assert.deepStrictEqual(G.save.sty, { body: null, acc: null, rim: 5, tint: 0, wing: 0, decal: 3, glow: 5 });
  for (let d = 0; d < 4; d++) for (let c = 0; c < G.MODELS.length; c++) { Object.assign(G.save.sty, { body: '#336699', decal: d, wing: d, glow: d, tint: d % 3 }); G.save.car = c; G.save.own[c] = 1; G.renderGarage(); G.setSt('garage'); G.draw(); }
  G.save.car = 0; G.resetSave(); assert.strictEqual(G.save.sty.body, null);
});
console.log('\n' + n + ' tests passed');
