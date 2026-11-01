// Loads game.js headlessly with a stubbed DOM and canvas so the game logic can be tested in Node.
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');
const ctx = () => new Proxy({}, {
  get: (t, k) => k === 'getImageData' ? (_x, _y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }) : (k in t ? t[k] : () => {}),
  set: (t, k, v) => { t[k] = v; return true; }
});
const els = {};
const el = id => ({ id, style: {}, classList: { add() {}, remove() {} }, appendChild() {}, addEventListener() {},
  setAttribute() {}, getContext: ctx, set innerHTML(v) { this._h = v; }, get innerHTML() { return this._h || ''; },
  textContent: '', scrollTop: 0, toDataURL() { return ''; } });
const document = { getElementById: id => els[id] || (els[id] = el(id)), createElement: () => el('x'), addEventListener() {} };
const api = `;return {power,grip,SLOTS,CAT,EQ,setBuild,equipPart,maxGear,buyPart,renderStore,redeem,barLim,MODELS,saveGame,loadSave,resetSave,actOf,step,newRace,get R(){return R},keys,save,doShift,nitro,draw,renderGarage,L,SU,setDt:v=>{dt_=v},setSt:v=>{st=v}};`;
const ls = { d: {}, getItem(k) { return k in this.d ? this.d[k] : null; }, setItem(k, v) { this.d[k] = String(v); }, removeItem(k) { delete this.d[k]; } };
const G = new Function('document', 'window', 'requestAnimationFrame', 'addEventListener', 'localStorage', 'navigator', src + api)(document, {}, () => {}, () => {}, ls, {});
G.ls = ls;
module.exports = G;
