var aa=Object.defineProperty;var la=(s,e,t)=>e in s?aa(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var C=(s,e,t)=>la(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ks=globalThis,dr=ks.ShadowRoot&&(ks.ShadyCSS===void 0||ks.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hr=Symbol(),Dr=new WeakMap;let Go=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==hr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(dr&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Dr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Dr.set(t,e))}return e}toString(){return this.cssText}};const ca=s=>new Go(typeof s=="string"?s:s+"",void 0,hr),L=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new Go(t,s,hr)},da=(s,e)=>{if(dr)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=ks.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},Nr=dr?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ca(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ha,defineProperty:ua,getOwnPropertyDescriptor:pa,getOwnPropertyNames:fa,getOwnPropertySymbols:ma,getPrototypeOf:ga}=Object,Ke=globalThis,Mr=Ke.trustedTypes,va=Mr?Mr.emptyScript:"",Zs=Ke.reactiveElementPolyfillSupport,Ht=(s,e)=>s,Et={toAttribute(s,e){switch(e){case Boolean:s=s?va:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},ur=(s,e)=>!ha(s,e),jr={attribute:!0,type:String,converter:Et,reflect:!1,useDefault:!1,hasChanged:ur};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ke.litPropertyMetadata??(Ke.litPropertyMetadata=new WeakMap);let _t=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=jr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&ua(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=pa(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const a=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??jr}static _$Ei(){if(this.hasOwnProperty(Ht("elementProperties")))return;const e=ga(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ht("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ht("properties"))){const t=this.properties,i=[...fa(t),...ma(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(Nr(r))}else e!==void 0&&t.push(Nr(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return da(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Et).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=i.getPropertyOptions(r),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Et;this._$Em=r;const c=l.fromAttribute(t,a.type);this[r]=c??((n=this._$Ej)==null?void 0:n.get(r))??c,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){var n;if(e!==void 0){const a=this.constructor;if(r===!1&&(o=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??ur)(o,t)||i.useDefault&&i.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:a}=n,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,n,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};_t.elementStyles=[],_t.shadowRootOptions={mode:"open"},_t[Ht("elementProperties")]=new Map,_t[Ht("finalized")]=new Map,Zs==null||Zs({ReactiveElement:_t}),(Ke.reactiveElementVersions??(Ke.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=globalThis,Ur=s=>s,Ts=Wt.trustedTypes,zr=Ts?Ts.createPolicy("lit-html",{createHTML:s=>s}):void 0,Yo="$lit$",qe=`lit$${Math.random().toFixed(9).slice(2)}$`,Zo="?"+qe,_a=`<${Zo}>`,dt=document,Yt=()=>dt.createComment(""),Zt=s=>s===null||typeof s!="object"&&typeof s!="function",pr=Array.isArray,ba=s=>pr(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Xs=`[ 	
\f\r]`,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vr=/-->/g,Br=/>/g,et=RegExp(`>|${Xs}(?:([^\\s"'>=/]+)(${Xs}*=${Xs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fr=/'/g,qr=/"/g,Xo=/^(?:script|style|textarea|title)$/i,ya=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),_=ya(1),ye=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Hr=new WeakMap,at=dt.createTreeWalker(dt,129);function Qo(s,e){if(!pr(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return zr!==void 0?zr.createHTML(e):e}const wa=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=Nt;for(let a=0;a<t;a++){const l=s[a];let c,h,p=-1,f=0;for(;f<l.length&&(n.lastIndex=f,h=n.exec(l),h!==null);)f=n.lastIndex,n===Nt?h[1]==="!--"?n=Vr:h[1]!==void 0?n=Br:h[2]!==void 0?(Xo.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=et):h[3]!==void 0&&(n=et):n===et?h[0]===">"?(n=r??Nt,p=-1):h[1]===void 0?p=-2:(p=n.lastIndex-h[2].length,c=h[1],n=h[3]===void 0?et:h[3]==='"'?qr:Fr):n===qr||n===Fr?n=et:n===Vr||n===Br?n=Nt:(n=et,r=void 0);const u=n===et&&s[a+1].startsWith("/>")?" ":"";o+=n===Nt?l+_a:p>=0?(i.push(c),l.slice(0,p)+Yo+l.slice(p)+qe+u):l+qe+(p===-2?a:u)}return[Qo(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Xt{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[c,h]=wa(e,t);if(this.el=Xt.createElement(c,i),at.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=at.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Yo)){const f=h[n++],u=r.getAttribute(p).split(qe),d=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:d[2],strings:u,ctor:d[1]==="."?ka:d[1]==="?"?$a:d[1]==="@"?xa:js}),r.removeAttribute(p)}else p.startsWith(qe)&&(l.push({type:6,index:o}),r.removeAttribute(p));if(Xo.test(r.tagName)){const p=r.textContent.split(qe),f=p.length-1;if(f>0){r.textContent=Ts?Ts.emptyScript:"";for(let u=0;u<f;u++)r.append(p[u],Yt()),at.nextNode(),l.push({type:2,index:++o});r.append(p[f],Yt())}}}else if(r.nodeType===8)if(r.data===Zo)l.push({type:2,index:o});else{let p=-1;for(;(p=r.data.indexOf(qe,p+1))!==-1;)l.push({type:7,index:o}),p+=qe.length-1}o++}}static createElement(e,t){const i=dt.createElement("template");return i.innerHTML=e,i}}function Ct(s,e,t=s,i){var n,a;if(e===ye)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=Zt(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=Ct(s,r._$AS(s,e.values),r,i)),e}class Sa{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??dt).importNode(t,!0);at.currentNode=r;let o=at.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new as(o,o.nextSibling,this,e):l.type===1?c=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(c=new Ea(o,this,e)),this._$AV.push(c),l=i[++a]}n!==(l==null?void 0:l.index)&&(o=at.nextNode(),n++)}return at.currentNode=dt,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class as{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ct(this,e,t),Zt(e)?e===B||e==null||e===""?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==ye&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ba(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&Zt(this._$AH)?this._$AA.nextSibling.data=e:this.T(dt.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Xt.createElement(Qo(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new Sa(r,this),a=n.u(this.options);n.p(t),this.T(a),this._$AH=n}}_$AC(e){let t=Hr.get(e.strings);return t===void 0&&Hr.set(e.strings,t=new Xt(e)),t}k(e){pr(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new as(this.O(Yt()),this.O(Yt()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=Ur(e).nextSibling;Ur(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class js{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=Ct(this,e,t,0),n=!Zt(e)||e!==this._$AH&&e!==ye,n&&(this._$AH=e);else{const a=e;let l,c;for(e=o[0],l=0;l<o.length-1;l++)c=Ct(this,a[i+l],t,l),c===ye&&(c=this._$AH[l]),n||(n=!Zt(c)||c!==this._$AH[l]),c===B?e=B:e!==B&&(e+=(c??"")+o[l+1]),this._$AH[l]=c}n&&!r&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ka extends js{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class $a extends js{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class xa extends js{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=Ct(this,e,t,0)??B)===ye)return;const i=this._$AH,r=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==B&&(i===B||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ea{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ct(this,e)}}const Qs=Wt.litHtmlPolyfillSupport;Qs==null||Qs(Xt,as),(Wt.litHtmlVersions??(Wt.litHtmlVersions=[])).push("3.3.2");const Ca=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new as(e.insertBefore(Yt(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=globalThis;let D=class extends _t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ca(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ye}};var Jo;D._$litElement$=!0,D.finalized=!0,(Jo=ct.litElementHydrateSupport)==null||Jo.call(ct,{LitElement:D});const ei=ct.litElementPolyfillSupport;ei==null||ei({LitElement:D});(ct.litElementVersions??(ct.litElementVersions=[])).push("4.2.2");const Ms=class Ms{constructor({getSnapshot:e,applySnapshot:t,onUndo:i,onRedo:r,onEmpty:o}){this._undoStack=[],this._redoStack=[],this._getSnapshot=e,this._applySnap=t,this._onUndo=i,this._onRedo=r,this._onEmpty=o}push(e){this._undoStack.push(e),this._undoStack.length>Ms.MAX_STACK_SIZE&&this._undoStack.shift(),this._redoStack=[]}undo(e=1){if(!this._undoStack.length){this._onEmpty("undo");return}let t=0,i="";for(;t<e&&this._undoStack.length;){const r=this._undoStack.pop();this._redoStack.push({...this._getSnapshot(),desc:r.desc}),this._applySnap(r),i=r.desc,t++}this._onUndo(t,i)}redo(e=1){if(!this._redoStack.length){this._onEmpty("redo");return}let t=0,i="";for(;t<e&&this._redoStack.length;){const r=this._redoStack.pop();this._undoStack.push({...this._getSnapshot(),desc:r.desc}),this._applySnap(r),i=r.desc,t++}this._onRedo(t,i)}clear(){this._undoStack=[],this._redoStack=[]}get undoCount(){return this._undoStack.length}get redoCount(){return this._redoStack.length}};C(Ms,"MAX_STACK_SIZE",20);let bi=Ms;const Ta=2,fr=11,Aa=40,Ra=15,en=1;function mr(){return Math.random().toString(36).slice(2,9)}const M={seek_delta_default:5,seek_delta_choices:[.1,1,5,10,30,60,300,1800],loop_nudge_delta_default:5,loop_nudge_delta_choices:[1800,300,60,30,10,5,1,.1],speed_delta:.05,loop_pad_start:2,loop_pad_end:2,cloud_backup:!1};function Oa(){return{schema_version:fr,options:{...M},videos:[],stashes:{},currentVideoId:null}}function gr(s){return`https://www.youtube.com/watch?v=${s}`}function $s(s,e){return{id:e,url:gr(e),duration:null,time:0,start:0,end:null,name:"",speed:1,seek_delta:M.seek_delta_default,scratchLoop:{start:0,end:0,looping:!1,sourceId:null,sourceType:null},chapters:[],sections:[],loops:[],marks:[],jumps:[],entity_type:"any",nudge_delta:M.loop_nudge_delta_default,zone2_mode:"sections",last_modified:Date.now(),last_opened:null}}function Ia(s,e,t=""){return{id:mr(),name:t,start:s,end:e}}function La(s,e=""){return{id:mr(),time:s,name:e}}function vr(s,e){let t=null;for(const i of s)if(i.start<=e)t=i;else break;return t}function yi(s,e){var i;return s[e].end??((i=s[e+1])==null?void 0:i.start)??null}function tn(s,e,t){if(!s.length)return null;let i=-1;for(let n=0;n<s.length&&s[n].start<=e;n++)i=n;if(i===-1)return null;const r=s[i],o=yi(s,i)??t??null;return r.end!=null&&e>r.end?null:{start:r.start,end:o}}function sn(s,e,t){const i=s.findIndex(o=>o.id===e);if(i===-1)return!1;const r=s[i+1];return s[i].end=r?r.start:t??null,!0}function rn(s,e,t=""){const i=vr(s,e);if(i&&i.end!=null&&e<=i.end||s.some(o=>Math.abs(o.start-e)<en))return null;const r={id:mr(),name:t,start:e,end:null};return s.push(r),s.sort((o,n)=>o.start-n.start),r}function Pa(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function Da(s,e){let t=null;for(const i of s)if(i.time<=e)t=i;else break;return t}function Na(s,e,t=""){if(s.some(r=>Math.abs(r.time-e)<en))return null;const i=La(e,t);return s.push(i),s.sort((r,o)=>r.time-o.time),i}function Ma(s,e,t=""){return rn(s,e,t)}function ja(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function hs(s,e){return vr(s,e)}function Ua(s,e,t){return tn(s,e,t)}function za(s,e,t){return sn(s,e,t)}function on(s,e,t,i=""){const r=Ia(e,t,i);return s.push(r),s.sort((o,n)=>o.start-n.start),r}function Va(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function Ba(s,e,t){const i=s.find(r=>r.id===e);i&&Object.assign(i,t)}function Wr(s,{loopStart:e,loopEnd:t,duration:i}){const r=i??1/0,o=Math.max(0,Math.min(e+s,r));if(o<t)return o;const n=Math.max(0,Math.min(t+s,r));return n<t?n:o}function Kr(s,{loopStart:e,loopEnd:t,duration:i}){const r=i??1/0,o=Math.max(0,Math.min(t+s,r));if(e<o)return o;const n=Math.max(0,Math.min(e+s,r));return e<n?n:o}function Fa(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function ti(s,e){return vr(s,e)}function qa(s,e,t){return tn(s,e,t)}function Ha(s,e,t){return sn(s,e,t)}function Wa(s,e,t=""){return rn(s,e,t)}function Jr(s,e,t,i,r){var l;const o=s[e],n=s[e-1],a=s[e+1];if(t!==o.start&&n&&t<=n.start)return!1;if(i!=null&&i!==o.end&&a){const c=a.end!=null?a.end:((l=s[e+2])==null?void 0:l.start)??r??null;if(c!=null&&i>=c)return!1}return!0}function si(s,e,t,i){const r=s[e],o=s[e-1],n=s[e+1];t!==r.start&&(o&&o.end!=null&&t<o.end&&(o.end=t),r.start=t,s.sort((a,l)=>a.start-l.start)),i!==r.end&&(i!=null&&n&&i>n.start&&(n.start=i,s.sort((a,l)=>a.start-l.start)),r.end=i)}const Ka=17;function Us(s,e){var t={};for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&e.indexOf(i)<0&&(t[i]=s[i]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(s);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(s,i[r])&&(t[i[r]]=s[i[r]]);return t}function Ja(s,e,t,i){function r(o){return o instanceof t?o:new t(function(n){n(o)})}return new(t||(t=Promise))(function(o,n){function a(h){try{c(i.next(h))}catch(p){n(p)}}function l(h){try{c(i.throw(h))}catch(p){n(p)}}function c(h){h.done?o(h.value):r(h.value).then(a,l)}c((i=i.apply(s,e||[])).next())})}const Ga=s=>s?(...e)=>s(...e):(...e)=>fetch(...e);class _r extends Error{constructor(e,t="FunctionsError",i){super(e),this.name=t,this.context=i}}class Ya extends _r{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Gr extends _r{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Yr extends _r{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var wi;(function(s){s.Any="any",s.ApNortheast1="ap-northeast-1",s.ApNortheast2="ap-northeast-2",s.ApSouth1="ap-south-1",s.ApSoutheast1="ap-southeast-1",s.ApSoutheast2="ap-southeast-2",s.CaCentral1="ca-central-1",s.EuCentral1="eu-central-1",s.EuWest1="eu-west-1",s.EuWest2="eu-west-2",s.EuWest3="eu-west-3",s.SaEast1="sa-east-1",s.UsEast1="us-east-1",s.UsWest1="us-west-1",s.UsWest2="us-west-2"})(wi||(wi={}));class Za{constructor(e,{headers:t={},customFetch:i,region:r=wi.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=Ga(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Ja(this,arguments,void 0,function*(t,i={}){var r;let o,n;try{const{headers:a,method:l,body:c,signal:h,timeout:p}=i;let f={},{region:u}=i;u||(u=this.region);const d=new URL(`${this.url}/${t}`);u&&u!=="any"&&(f["x-region"]=u,d.searchParams.set("forceFunctionRegion",u));let v;c&&(a&&!Object.prototype.hasOwnProperty.call(a,"Content-Type")||!a)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(f["Content-Type"]="application/octet-stream",v=c):typeof c=="string"?(f["Content-Type"]="text/plain",v=c):typeof FormData<"u"&&c instanceof FormData?v=c:(f["Content-Type"]="application/json",v=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?v=JSON.stringify(c):v=c;let b=h;p&&(n=new AbortController,o=setTimeout(()=>n.abort(),p),h?(b=n.signal,h.addEventListener("abort",()=>n.abort())):b=n.signal);const y=yield this.fetch(d.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},f),this.headers),a),body:v,signal:b}).catch(A=>{throw new Ya(A)}),S=y.headers.get("x-relay-error");if(S&&S==="true")throw new Gr(y);if(!y.ok)throw new Yr(y);let g=((r=y.headers.get("Content-Type"))!==null&&r!==void 0?r:"text/plain").split(";")[0].trim(),k;return g==="application/json"?k=yield y.json():g==="application/octet-stream"||g==="application/pdf"?k=yield y.blob():g==="text/event-stream"?k=y:g==="multipart/form-data"?k=yield y.formData():k=yield y.text(),{data:k,error:null,response:y}}catch(a){return{data:null,error:a,response:a instanceof Yr||a instanceof Gr?a.context:void 0}}finally{o&&clearTimeout(o)}})}}var Xa=class extends Error{constructor(s){super(s.message),this.name="PostgrestError",this.details=s.details,this.hint=s.hint,this.code=s.code}},Qa=class{constructor(s){var e,t,i;this.shouldThrowOnError=!1,this.method=s.method,this.url=s.url,this.headers=new Headers(s.headers),this.schema=s.schema,this.body=s.body,this.shouldThrowOnError=(e=s.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=s.signal,this.isMaybeSingle=(t=s.isMaybeSingle)!==null&&t!==void 0?t:!1,this.urlLengthLimit=(i=s.urlLengthLimit)!==null&&i!==void 0?i:8e3,s.fetch?this.fetch=s.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(s,e){return this.headers=new Headers(this.headers),this.headers.set(s,e),this}then(s,e){var t=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const i=this.fetch;let r=i(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async o=>{let n=null,a=null,l=null,c=o.status,h=o.statusText;if(o.ok){var p,f;if(t.method!=="HEAD"){var u;const y=await o.text();y===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((u=t.headers.get("Accept"))===null||u===void 0)&&u.includes("application/vnd.pgrst.plan+text"))?a=y:a=JSON.parse(y))}const v=(p=t.headers.get("Prefer"))===null||p===void 0?void 0:p.match(/count=(exact|planned|estimated)/),b=(f=o.headers.get("content-range"))===null||f===void 0?void 0:f.split("/");v&&b&&b.length>1&&(l=parseInt(b[1])),t.isMaybeSingle&&t.method==="GET"&&Array.isArray(a)&&(a.length>1?(n={code:"PGRST116",details:`Results contain ${a.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},a=null,l=null,c=406,h="Not Acceptable"):a.length===1?a=a[0]:a=null)}else{var d;const v=await o.text();try{n=JSON.parse(v),Array.isArray(n)&&o.status===404&&(a=[],n=null,c=200,h="OK")}catch{o.status===404&&v===""?(c=204,h="No Content"):n={message:v}}if(n&&t.isMaybeSingle&&(!(n==null||(d=n.details)===null||d===void 0)&&d.includes("0 rows"))&&(n=null,c=200,h="OK"),n&&t.shouldThrowOnError)throw new Xa(n)}return{error:n,data:a,count:l,status:c,statusText:h}});return this.shouldThrowOnError||(r=r.catch(o=>{var n;let a="",l="",c="";const h=o==null?void 0:o.cause;if(h){var p,f,u,d;const y=(p=h==null?void 0:h.message)!==null&&p!==void 0?p:"",S=(f=h==null?void 0:h.code)!==null&&f!==void 0?f:"";a=`${(u=o==null?void 0:o.name)!==null&&u!==void 0?u:"FetchError"}: ${o==null?void 0:o.message}`,a+=`

Caused by: ${(d=h==null?void 0:h.name)!==null&&d!==void 0?d:"Error"}: ${y}`,S&&(a+=` (${S})`),h!=null&&h.stack&&(a+=`
${h.stack}`)}else{var v;a=(v=o==null?void 0:o.stack)!==null&&v!==void 0?v:""}const b=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(c="",l="Request was aborted (timeout or manual cancellation)",b>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${b} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((h==null?void 0:h.name)==="HeadersOverflowError"||(h==null?void 0:h.code)==="UND_ERR_HEADERS_OVERFLOW")&&(c="",l="HTTP headers exceeded server limits (typically 16KB)",b>this.urlLengthLimit&&(l+=`. Your request URL is ${b} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(n=o==null?void 0:o.name)!==null&&n!==void 0?n:"FetchError"}: ${o==null?void 0:o.message}`,details:a,hint:l,code:c},data:null,count:null,status:0,statusText:""}})),r.then(s,e)}returns(){return this}overrideTypes(){return this}},el=class extends Qa{select(s){let e=!1;const t=(s??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(s,{ascending:e=!0,nullsFirst:t,foreignTable:i,referencedTable:r=i}={}){const o=r?`${r}.order`:"order",n=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${n?`${n},`:""}${s}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(s,{foreignTable:e,referencedTable:t=e}={}){const i=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(i,`${s}`),this}range(s,e,{foreignTable:t,referencedTable:i=t}={}){const r=typeof i>"u"?"offset":`${i}.offset`,o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${s}`),this.url.searchParams.set(o,`${e-s+1}`),this}abortSignal(s){return this.signal=s,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:s=!1,verbose:e=!1,settings:t=!1,buffers:i=!1,wal:r=!1,format:o="text"}={}){var n;const a=[s?"analyze":null,e?"verbose":null,t?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(n=this.headers.get("Accept"))!==null&&n!==void 0?n:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${o}; for="${l}"; options=${a};`),o==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(s){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${s}`),this}};const Zr=new RegExp("[,()]");var bt=class extends el{eq(s,e){return this.url.searchParams.append(s,`eq.${e}`),this}neq(s,e){return this.url.searchParams.append(s,`neq.${e}`),this}gt(s,e){return this.url.searchParams.append(s,`gt.${e}`),this}gte(s,e){return this.url.searchParams.append(s,`gte.${e}`),this}lt(s,e){return this.url.searchParams.append(s,`lt.${e}`),this}lte(s,e){return this.url.searchParams.append(s,`lte.${e}`),this}like(s,e){return this.url.searchParams.append(s,`like.${e}`),this}likeAllOf(s,e){return this.url.searchParams.append(s,`like(all).{${e.join(",")}}`),this}likeAnyOf(s,e){return this.url.searchParams.append(s,`like(any).{${e.join(",")}}`),this}ilike(s,e){return this.url.searchParams.append(s,`ilike.${e}`),this}ilikeAllOf(s,e){return this.url.searchParams.append(s,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(s,e){return this.url.searchParams.append(s,`ilike(any).{${e.join(",")}}`),this}regexMatch(s,e){return this.url.searchParams.append(s,`match.${e}`),this}regexIMatch(s,e){return this.url.searchParams.append(s,`imatch.${e}`),this}is(s,e){return this.url.searchParams.append(s,`is.${e}`),this}isDistinct(s,e){return this.url.searchParams.append(s,`isdistinct.${e}`),this}in(s,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Zr.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(s,`in.(${t})`),this}notIn(s,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Zr.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(s,`not.in.(${t})`),this}contains(s,e){return typeof e=="string"?this.url.searchParams.append(s,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(s,`cs.{${e.join(",")}}`):this.url.searchParams.append(s,`cs.${JSON.stringify(e)}`),this}containedBy(s,e){return typeof e=="string"?this.url.searchParams.append(s,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(s,`cd.{${e.join(",")}}`):this.url.searchParams.append(s,`cd.${JSON.stringify(e)}`),this}rangeGt(s,e){return this.url.searchParams.append(s,`sr.${e}`),this}rangeGte(s,e){return this.url.searchParams.append(s,`nxl.${e}`),this}rangeLt(s,e){return this.url.searchParams.append(s,`sl.${e}`),this}rangeLte(s,e){return this.url.searchParams.append(s,`nxr.${e}`),this}rangeAdjacent(s,e){return this.url.searchParams.append(s,`adj.${e}`),this}overlaps(s,e){return typeof e=="string"?this.url.searchParams.append(s,`ov.${e}`):this.url.searchParams.append(s,`ov.{${e.join(",")}}`),this}textSearch(s,e,{config:t,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const o=t===void 0?"":`(${t})`;return this.url.searchParams.append(s,`${r}fts${o}.${e}`),this}match(s){return Object.entries(s).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(s,e,t){return this.url.searchParams.append(s,`not.${e}.${t}`),this}or(s,{foreignTable:e,referencedTable:t=e}={}){const i=t?`${t}.or`:"or";return this.url.searchParams.append(i,`(${s})`),this}filter(s,e,t){return this.url.searchParams.append(s,`${e}.${t}`),this}},tl=class{constructor(s,{headers:e={},schema:t,fetch:i,urlLengthLimit:r=8e3}){this.url=s,this.headers=new Headers(e),this.schema=t,this.fetch=i,this.urlLengthLimit=r}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(s,e){const{head:t=!1,count:i}=e??{},r=t?"HEAD":"GET";let o=!1;const n=(s??"*").split("").map(c=>/\s/.test(c)&&!o?"":(c==='"'&&(o=!o),c)).join(""),{url:a,headers:l}=this.cloneRequestState();return a.searchParams.set("select",n),i&&l.append("Prefer",`count=${i}`),new bt({method:r,url:a,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(s,{count:e,defaultToNull:t=!0}={}){var i;const r="POST",{url:o,headers:n}=this.cloneRequestState();if(e&&n.append("Prefer",`count=${e}`),t||n.append("Prefer","missing=default"),Array.isArray(s)){const a=s.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(a.length>0){const l=[...new Set(a)].map(c=>`"${c}"`);o.searchParams.set("columns",l.join(","))}}return new bt({method:r,url:o,headers:n,schema:this.schema,body:s,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(s,{onConflict:e,ignoreDuplicates:t=!1,count:i,defaultToNull:r=!0}={}){var o;const n="POST",{url:a,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&a.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),r||l.append("Prefer","missing=default"),Array.isArray(s)){const c=s.reduce((h,p)=>h.concat(Object.keys(p)),[]);if(c.length>0){const h=[...new Set(c)].map(p=>`"${p}"`);a.searchParams.set("columns",h.join(","))}}return new bt({method:n,url:a,headers:l,schema:this.schema,body:s,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit})}update(s,{count:e}={}){var t;const i="PATCH",{url:r,headers:o}=this.cloneRequestState();return e&&o.append("Prefer",`count=${e}`),new bt({method:i,url:r,headers:o,schema:this.schema,body:s,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:s}={}){var e;const t="DELETE",{url:i,headers:r}=this.cloneRequestState();return s&&r.append("Prefer",`count=${s}`),new bt({method:t,url:i,headers:r,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit})}};function Qt(s){"@babel/helpers - typeof";return Qt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Qt(s)}function sl(s,e){if(Qt(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(Qt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function il(s){var e=sl(s,"string");return Qt(e)=="symbol"?e:e+""}function rl(s,e,t){return(e=il(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function Xr(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function us(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Xr(Object(t),!0).forEach(function(i){rl(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):Xr(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}var ol=class nn{constructor(e,{headers:t={},schema:i,fetch:r,timeout:o,urlLengthLimit:n=8e3}={}){this.url=e,this.headers=new Headers(t),this.schemaName=i,this.urlLengthLimit=n;const a=r??globalThis.fetch;o!==void 0&&o>0?this.fetch=(l,c)=>{const h=new AbortController,p=setTimeout(()=>h.abort(),o),f=c==null?void 0:c.signal;if(f){if(f.aborted)return clearTimeout(p),a(l,c);const u=()=>{clearTimeout(p),h.abort()};return f.addEventListener("abort",u,{once:!0}),a(l,us(us({},c),{},{signal:h.signal})).finally(()=>{clearTimeout(p),f.removeEventListener("abort",u)})}return a(l,us(us({},c),{},{signal:h.signal})).finally(()=>clearTimeout(p))}:this.fetch=a}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new tl(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(e){return new nn(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(e,t={},{head:i=!1,get:r=!1,count:o}={}){var n;let a;const l=new URL(`${this.url}/rpc/${e}`);let c;const h=u=>u!==null&&typeof u=="object"&&(!Array.isArray(u)||u.some(h)),p=i&&Object.values(t).some(h);p?(a="POST",c=t):i||r?(a=i?"HEAD":"GET",Object.entries(t).filter(([u,d])=>d!==void 0).map(([u,d])=>[u,Array.isArray(d)?`{${d.join(",")}}`:`${d}`]).forEach(([u,d])=>{l.searchParams.append(u,d)})):(a="POST",c=t);const f=new Headers(this.headers);return p?f.set("Prefer",o?`count=${o},return=minimal`:"return=minimal"):o&&f.set("Prefer",`count=${o}`),new bt({method:a,url:l,headers:f,schema:this.schemaName,body:c,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit})}};class nl{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const t=globalThis.process;if(t){const i=t.versions;if(i&&i.node){const r=i.node,o=parseInt(r.replace(/^v/,"").split(".")[0]);return o>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${o} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${o} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const i=this.getWebSocketConstructor();return new i(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const al="2.99.1",ll=`realtime-js/${al}`,cl="1.0.0",an="2.0.0",Qr=an,Si=1e4,dl=1e3,hl=100;var Be;(function(s){s[s.connecting=0]="connecting",s[s.open=1]="open",s[s.closing=2]="closing",s[s.closed=3]="closed"})(Be||(Be={}));var H;(function(s){s.closed="closed",s.errored="errored",s.joined="joined",s.joining="joining",s.leaving="leaving"})(H||(H={}));var be;(function(s){s.close="phx_close",s.error="phx_error",s.join="phx_join",s.reply="phx_reply",s.leave="phx_leave",s.access_token="access_token"})(be||(be={}));var ki;(function(s){s.websocket="websocket"})(ki||(ki={}));var rt;(function(s){s.Connecting="connecting",s.Open="open",s.Closing="closing",s.Closed="closed"})(rt||(rt={}));class ul{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,i;const r=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,r)}_encodeJsonUserBroadcastPush(e){var t,i;const r=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:{},n=new TextEncoder().encode(JSON.stringify(r)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,i){var r,o;const n=e.topic,a=(r=e.ref)!==null&&r!==void 0?r:"",l=(o=e.join_ref)!==null&&o!==void 0?o:"",c=e.payload.event,h=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},p=Object.keys(h).length===0?"":JSON.stringify(h);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`ref length ${a.length} exceeds maximum of 255`);if(n.length>255)throw new Error(`topic length ${n.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(p.length>255)throw new Error(`metadata length ${p.length} exceeds maximum of 255`);const f=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+a.length+n.length+c.length+p.length,u=new ArrayBuffer(this.HEADER_LENGTH+f);let d=new DataView(u),v=0;d.setUint8(v++,this.KINDS.userBroadcastPush),d.setUint8(v++,l.length),d.setUint8(v++,a.length),d.setUint8(v++,n.length),d.setUint8(v++,c.length),d.setUint8(v++,p.length),d.setUint8(v++,t),Array.from(l,y=>d.setUint8(v++,y.charCodeAt(0))),Array.from(a,y=>d.setUint8(v++,y.charCodeAt(0))),Array.from(n,y=>d.setUint8(v++,y.charCodeAt(0))),Array.from(c,y=>d.setUint8(v++,y.charCodeAt(0))),Array.from(p,y=>d.setUint8(v++,y.charCodeAt(0)));var b=new Uint8Array(u.byteLength+i.byteLength);return b.set(new Uint8Array(u),0),b.set(new Uint8Array(i),u.byteLength),b.buffer}decode(e,t){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return t(i)}if(typeof e=="string"){const i=JSON.parse(e),[r,o,n,a,l]=i;return t({join_ref:r,ref:o,topic:n,event:a,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),i=t.getUint8(0),r=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,i){const r=t.getUint8(1),o=t.getUint8(2),n=t.getUint8(3),a=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+r));l=l+r;const h=i.decode(e.slice(l,l+o));l=l+o;const p=i.decode(e.slice(l,l+n));l=l+n;const f=e.slice(l,e.byteLength),u=a===this.JSON_ENCODING?JSON.parse(i.decode(f)):f,d={type:this.BROADCAST_EVENT,event:h,payload:u};return n>0&&(d.meta=JSON.parse(p)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:d}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>t.includes(i)))}}class ln{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var U;(function(s){s.abstime="abstime",s.bool="bool",s.date="date",s.daterange="daterange",s.float4="float4",s.float8="float8",s.int2="int2",s.int4="int4",s.int4range="int4range",s.int8="int8",s.int8range="int8range",s.json="json",s.jsonb="jsonb",s.money="money",s.numeric="numeric",s.oid="oid",s.reltime="reltime",s.text="text",s.time="time",s.timestamp="timestamp",s.timestamptz="timestamptz",s.timetz="timetz",s.tsrange="tsrange",s.tstzrange="tstzrange"})(U||(U={}));const eo=(s,e,t={})=>{var i;const r=(i=t.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((o,n)=>(o[n]=pl(n,s,e,r),o),{}):{}},pl=(s,e,t,i)=>{const r=e.find(a=>a.name===s),o=r==null?void 0:r.type,n=t[s];return o&&!i.includes(o)?cn(o,n):$i(n)},cn=(s,e)=>{if(s.charAt(0)==="_"){const t=s.slice(1,s.length);return vl(e,t)}switch(s){case U.bool:return fl(e);case U.float4:case U.float8:case U.int2:case U.int4:case U.int8:case U.numeric:case U.oid:return ml(e);case U.json:case U.jsonb:return gl(e);case U.timestamp:return _l(e);case U.abstime:case U.date:case U.daterange:case U.int4range:case U.int8range:case U.money:case U.reltime:case U.text:case U.time:case U.timestamptz:case U.timetz:case U.tsrange:case U.tstzrange:return $i(e);default:return $i(e)}},$i=s=>s,fl=s=>{switch(s){case"t":return!0;case"f":return!1;default:return s}},ml=s=>{if(typeof s=="string"){const e=parseFloat(s);if(!Number.isNaN(e))return e}return s},gl=s=>{if(typeof s=="string")try{return JSON.parse(s)}catch{return s}return s},vl=(s,e)=>{if(typeof s!="string")return s;const t=s.length-1,i=s[t];if(s[0]==="{"&&i==="}"){let o;const n=s.slice(1,t);try{o=JSON.parse("["+n+"]")}catch{o=n?n.split(","):[]}return o.map(a=>cn(e,a))}return s},_l=s=>typeof s=="string"?s.replace(" ","T"):s,dn=s=>{const e=new URL(s);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class ii{constructor(e,t,i={},r=Si){this.channel=e,this.event=t,this.payload=i,this.timeout=r,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var i;return this._hasReceived(e)&&t((i=this.receivedResp)===null||i===void 0?void 0:i.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(i=>i.status===e).forEach(i=>i.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var to;(function(s){s.SYNC="sync",s.JOIN="join",s.LEAVE="leave"})(to||(to={}));class Kt{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const i=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(i.state,{},r=>{const{onJoin:o,onLeave:n,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Kt.syncState(this.state,r,o,n),this.pendingDiffs.forEach(l=>{this.state=Kt.syncDiff(this.state,l,o,n)}),this.pendingDiffs=[],a()}),this.channel._on(i.diff,{},r=>{const{onJoin:o,onLeave:n,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(r):(this.state=Kt.syncDiff(this.state,r,o,n),a())}),this.onJoin((r,o,n)=>{this.channel._trigger("presence",{event:"join",key:r,currentPresences:o,newPresences:n})}),this.onLeave((r,o,n)=>{this.channel._trigger("presence",{event:"leave",key:r,currentPresences:o,leftPresences:n})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,i,r){const o=this.cloneDeep(e),n=this.transformState(t),a={},l={};return this.map(o,(c,h)=>{n[c]||(l[c]=h)}),this.map(n,(c,h)=>{const p=o[c];if(p){const f=h.map(b=>b.presence_ref),u=p.map(b=>b.presence_ref),d=h.filter(b=>u.indexOf(b.presence_ref)<0),v=p.filter(b=>f.indexOf(b.presence_ref)<0);d.length>0&&(a[c]=d),v.length>0&&(l[c]=v)}else a[c]=h}),this.syncDiff(o,{joins:a,leaves:l},i,r)}static syncDiff(e,t,i,r){const{joins:o,leaves:n}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return i||(i=()=>{}),r||(r=()=>{}),this.map(o,(a,l)=>{var c;const h=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),h.length>0){const p=e[a].map(u=>u.presence_ref),f=h.filter(u=>p.indexOf(u.presence_ref)<0);e[a].unshift(...f)}i(a,h,l)}),this.map(n,(a,l)=>{let c=e[a];if(!c)return;const h=l.map(p=>p.presence_ref);c=c.filter(p=>h.indexOf(p.presence_ref)<0),e[a]=c,r(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(i=>t(i,e[i]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,i)=>{const r=e[i];return"metas"in r?t[i]=r.metas.map(o=>(o.presence_ref=o.phx_ref,delete o.phx_ref,delete o.phx_ref_prev,o)):t[i]=r,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var so;(function(s){s.ALL="*",s.INSERT="INSERT",s.UPDATE="UPDATE",s.DELETE="DELETE"})(so||(so={}));var Jt;(function(s){s.BROADCAST="broadcast",s.PRESENCE="presence",s.POSTGRES_CHANGES="postgres_changes",s.SYSTEM="system"})(Jt||(Jt={}));var Ie;(function(s){s.SUBSCRIBED="SUBSCRIBED",s.TIMED_OUT="TIMED_OUT",s.CLOSED="CLOSED",s.CHANNEL_ERROR="CHANNEL_ERROR"})(Ie||(Ie={}));class St{constructor(e,t={config:{}},i){var r,o;if(this.topic=e,this.params=t,this.socket=i,this.bindings={},this.state=H.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new ii(this,be.join,this.params,this.timeout),this.rejoinTimer=new ln(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=H.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(n=>n.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=H.closed,this.socket._remove(this)}),this._onError(n=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,n),this.state=H.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=H.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",n=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,n),this.state=H.errored,this.rejoinTimer.scheduleTimeout())}),this._on(be.reply,{},(n,a)=>{this._trigger(this._replyEventName(a),n)}),this.presence=new Kt(this),this.broadcastEndpointURL=dn(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((o=(r=this.params.config)===null||r===void 0?void 0:r.broadcast)===null||o===void 0)&&o.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var i,r,o;if(this.socket.isConnected()||this.socket.connect(),this.state==H.closed){const{config:{broadcast:n,presence:a,private:l}}=this.params,c=(r=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(u=>u.filter))!==null&&r!==void 0?r:[],h=!!this.bindings[Jt.PRESENCE]&&this.bindings[Jt.PRESENCE].length>0||((o=this.params.config.presence)===null||o===void 0?void 0:o.enabled)===!0,p={},f={broadcast:n,presence:Object.assign(Object.assign({},a),{enabled:h}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(p.access_token=this.socket.accessTokenValue),this._onError(u=>e==null?void 0:e(Ie.CHANNEL_ERROR,u)),this._onClose(()=>e==null?void 0:e(Ie.CLOSED)),this.updateJoinPayload(Object.assign({config:f},p)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:u})=>{var d;if(this.socket._isManualToken()||this.socket.setAuth(),u===void 0){e==null||e(Ie.SUBSCRIBED);return}else{const v=this.bindings.postgres_changes,b=(d=v==null?void 0:v.length)!==null&&d!==void 0?d:0,y=[];for(let S=0;S<b;S++){const g=v[S],{filter:{event:k,schema:A,table:T,filter:I}}=g,W=u&&u[S];if(W&&W.event===k&&St.isFilterValueEqual(W.schema,A)&&St.isFilterValueEqual(W.table,T)&&St.isFilterValueEqual(W.filter,I))y.push(Object.assign(Object.assign({},g),{id:W.id}));else{this.unsubscribe(),this.state=H.errored,e==null||e(Ie.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=y,e&&e(Ie.SUBSCRIBED);return}}).receive("error",u=>{this.state=H.errored,e==null||e(Ie.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(u).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(Ie.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,i){return this.state===H.joined&&e===Jt.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(e,t,i)}async httpSend(e,t,i={}){var r;if(t==null)return Promise.reject("Payload is required for httpSend()");const o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const n={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,n,(r=i.timeout)!==null&&r!==void 0?r:this.timeout);if(a.status===202)return{success:!0};let l=a.statusText;try{const c=await a.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var i,r;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:o,payload:n}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:o,payload:n,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=t.timeout)!==null&&i!==void 0?i:this.timeout);return await((r=c.body)===null||r===void 0?void 0:r.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(o=>{var n,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(n=this.params)===null||n===void 0?void 0:n.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&o("ok"),c.receive("ok",()=>o("ok")),c.receive("error",()=>o("error")),c.receive("timeout",()=>o("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=H.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(be.close,"leave",this._joinRef())};this.joinPush.destroy();let i=null;return new Promise(r=>{i=new ii(this,be.leave,{},e),i.receive("ok",()=>{t(),r("ok")}).receive("timeout",()=>{t(),r("timed out")}).receive("error",()=>{r("error")}),i.send(),this._canPush()||i.trigger("ok",{})}).finally(()=>{i==null||i.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=H.closed,this.bindings={}}async _fetchWithTimeout(e,t,i){const r=new AbortController,o=setTimeout(()=>r.abort(),i),n=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(o),n}_push(e,t,i=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let r=new ii(this,e,t,i);return this._canPush()?r.send():this._addToPushBuffer(r),r}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>hl){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,i){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,i){var r,o;const n=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:h}=be;if(i&&[a,l,c,h].indexOf(n)>=0&&i!==this._joinRef())return;let f=this._onMessage(n,t,i);if(t&&!f)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(n)?(r=this.bindings.postgres_changes)===null||r===void 0||r.filter(u=>{var d,v,b;return((d=u.filter)===null||d===void 0?void 0:d.event)==="*"||((b=(v=u.filter)===null||v===void 0?void 0:v.event)===null||b===void 0?void 0:b.toLocaleLowerCase())===n}).map(u=>u.callback(f,i)):(o=this.bindings[n])===null||o===void 0||o.filter(u=>{var d,v,b,y,S,g;if(["broadcast","presence","postgres_changes"].includes(n))if("id"in u){const k=u.id,A=(d=u.filter)===null||d===void 0?void 0:d.event;return k&&((v=t.ids)===null||v===void 0?void 0:v.includes(k))&&(A==="*"||(A==null?void 0:A.toLocaleLowerCase())===((b=t.data)===null||b===void 0?void 0:b.type.toLocaleLowerCase()))}else{const k=(S=(y=u==null?void 0:u.filter)===null||y===void 0?void 0:y.event)===null||S===void 0?void 0:S.toLocaleLowerCase();return k==="*"||k===((g=t==null?void 0:t.event)===null||g===void 0?void 0:g.toLocaleLowerCase())}else return u.type.toLocaleLowerCase()===n}).map(u=>{if(typeof f=="object"&&"ids"in f){const d=f.data,{schema:v,table:b,commit_timestamp:y,type:S,errors:g}=d;f=Object.assign(Object.assign({},{schema:v,table:b,commit_timestamp:y,eventType:S,new:{},old:{},errors:g}),this._getPayloadRecords(d))}u.callback(f,i)})}_isClosed(){return this.state===H.closed}_isJoined(){return this.state===H.joined}_isJoining(){return this.state===H.joining}_isLeaving(){return this.state===H.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,i){const r=e.toLocaleLowerCase(),o={type:r,filter:t,callback:i};return this.bindings[r]?this.bindings[r].push(o):this.bindings[r]=[o],this}_off(e,t){const i=e.toLocaleLowerCase();return this.bindings[i]&&(this.bindings[i]=this.bindings[i].filter(r=>{var o;return!(((o=r.type)===null||o===void 0?void 0:o.toLocaleLowerCase())===i&&St.isEqual(r.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e)if(e[i]!==t[i])return!1;return!0}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(be.close,{},e)}_onError(e){this._on(be.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=H.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=eo(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=eo(e.columns,e.old_record)),t}}const ri=()=>{},ps={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},bl=[1e3,2e3,5e3,1e4],yl=1e4,wl=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Sl{constructor(e,t){var i;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Si,this.transport=null,this.heartbeatIntervalMs=ps.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=ri,this.ref=0,this.reconnectTimer=null,this.vsn=Qr,this.logger=ri,this.conn=null,this.sendBuffer=[],this.serializer=new ul,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=r=>r?(...o)=>r(...o):(...o)=>fetch(...o),!(!((i=t==null?void 0:t.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${ki.websocket}`,this.httpEndpoint=dn(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=nl.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const i=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(i),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,i){this.logger(e,t,i)}connectionState(){switch(this.conn&&this.conn.readyState){case Be.connecting:return rt.Connecting;case Be.open:return rt.Open;case Be.closing:return rt.Closing;default:return rt.Closed}}isConnected(){return this.connectionState()===rt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const i=`realtime:${e}`,r=this.getChannels().find(o=>o.topic===i);if(r)return r;{const o=new St(`realtime:${e}`,t,this);return this.channels.push(o),o}}push(e){const{topic:t,event:i,payload:r,ref:o}=e,n=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${i} (${o})`,r),this.isConnected()?n():this.sendBuffer.push(n)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(dl,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},ps.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(i=>i.topic===e&&(i._isJoined()||i._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply"&&t.ref&&t.ref===this.pendingHeartbeatRef){const c=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error",c)}catch(h){this.log("error","error in heartbeat callback",h)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:i,event:r,payload:o,ref:n}=t,a=n?`(${n})`:"",l=o.status||"";this.log("receive",`${l} ${i} ${r} ${a}`.trim(),o),this.channels.filter(c=>c._isMember(i)).forEach(c=>c._trigger(r,o,n)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e),this.conn.readyState===Be.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===Be.open||this.conn.readyState===Be.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.accessTokenValue&&(this.channels.forEach(t=>{t.updateJoinPayload({access_token:this.accessTokenValue})}),this.sendBuffer=[],this.channels.forEach(t=>{t._isJoining()&&(t.joinPush.sent=!1,t.joinPush.send())})),this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e);try{this.heartbeatCallback("error")}catch(t){this.log("error","error in heartbeat callback",t)}}_triggerChanError(){this.channels.forEach(e=>e._trigger(be.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const i=e.match(/\?/)?"&":"?",r=new URLSearchParams(t);return`${e}${i}${r}`}_workerObjectUrl(e){let t;if(e)t=e;else{const i=new Blob([wl],{type:"application/javascript"});t=URL.createObjectURL(i)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t,i=!1;if(e)t=e,i=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(r){this.log("error","Error fetching access token from callback",r),t=this.accessTokenValue}else t=this.accessTokenValue;i?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(r=>{const o={access_token:t,version:ll};t&&r.updateJoinPayload(o),r.joinedOnce&&r._isJoined()&&r._push(be.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(i=>{try{i(t)}catch(r){this.log("error",`error in ${e} callback`,r)}})}catch(i){this.log("error",`error triggering ${e} callbacks`,i)}}_setupReconnectionTimer(){this.reconnectTimer=new ln(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},ps.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,i,r,o,n,a,l,c,h,p,f,u;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(i=e==null?void 0:e.timeout)!==null&&i!==void 0?i:Si,this.heartbeatIntervalMs=(r=e==null?void 0:e.heartbeatIntervalMs)!==null&&r!==void 0?r:ps.HEARTBEAT_INTERVAL,this.worker=(o=e==null?void 0:e.worker)!==null&&o!==void 0?o:!1,this.accessToken=(n=e==null?void 0:e.accessToken)!==null&&n!==void 0?n:null,this.heartbeatCallback=(a=e==null?void 0:e.heartbeatCallback)!==null&&a!==void 0?a:ri,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Qr,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:(d=>bl[d-1]||yl),this.vsn){case cl:this.encode=(h=e==null?void 0:e.encode)!==null&&h!==void 0?h:((d,v)=>v(JSON.stringify(d))),this.decode=(p=e==null?void 0:e.decode)!==null&&p!==void 0?p:((d,v)=>v(JSON.parse(d)));break;case an:this.encode=(f=e==null?void 0:e.encode)!==null&&f!==void 0?f:this.serializer.encode.bind(this.serializer),this.decode=(u=e==null?void 0:e.decode)!==null&&u!==void 0?u:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}var es=class extends Error{constructor(s,e){var t;super(s),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function kl(s,e,t){const i=new URL(e,s);if(t)for(const[r,o]of Object.entries(t))o!==void 0&&i.searchParams.set(r,o);return i.toString()}async function $l(s){return!s||s.type==="none"?{}:s.type==="bearer"?{Authorization:`Bearer ${s.token}`}:s.type==="header"?{[s.name]:s.value}:s.type==="custom"?await s.getHeaders():{}}function xl(s){const e=s.fetchImpl??globalThis.fetch;return{async request({method:t,path:i,query:r,body:o,headers:n}){const a=kl(s.baseUrl,i,r),l=await $l(s.auth),c=await e(a,{method:t,headers:{...o?{"Content-Type":"application/json"}:{},...l,...n},body:o?JSON.stringify(o):void 0}),h=await c.text(),p=(c.headers.get("content-type")||"").includes("application/json"),f=p&&h?JSON.parse(h):h;if(!c.ok){const u=p?f:void 0,d=u==null?void 0:u.error;throw new es((d==null?void 0:d.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:d==null?void 0:d.type,icebergCode:d==null?void 0:d.code,details:u})}return{status:c.status,headers:c.headers,data:f}}}}function fs(s){return s.join("")}var El=class{constructor(s,e=""){this.client=s,this.prefix=e}async listNamespaces(s){const e=s?{parent:fs(s.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(s,e){const t={namespace:s.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(s){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${fs(s.namespace)}`})}async loadNamespaceMetadata(s){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${fs(s.namespace)}`})).data.properties}}async namespaceExists(s){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${fs(s.namespace)}`}),!0}catch(e){if(e instanceof es&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(s,e){try{return await this.createNamespace(s,e)}catch(t){if(t instanceof es&&t.status===409)return;throw t}}};function pt(s){return s.join("")}var Cl=class{constructor(s,e="",t){this.client=s,this.prefix=e,this.accessDelegation=t}async listTables(s){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${pt(s.namespace)}/tables`})).data.identifiers}async createTable(s,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${pt(s.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(s,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${pt(s.namespace)}/tables/${s.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(s,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${pt(s.namespace)}/tables/${s.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(s){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${pt(s.namespace)}/tables/${s.name}`,headers:e})).data.metadata}async tableExists(s){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${pt(s.namespace)}/tables/${s.name}`,headers:e}),!0}catch(t){if(t instanceof es&&t.status===404)return!1;throw t}}async createTableIfNotExists(s,e){try{return await this.createTable(s,e)}catch(t){if(t instanceof es&&t.status===409)return await this.loadTable({namespace:s.namespace,name:e.name});throw t}}},Tl=class{constructor(s){var i;let e="v1";s.catalogName&&(e+=`/${s.catalogName}`);const t=s.baseUrl.endsWith("/")?s.baseUrl:`${s.baseUrl}/`;this.client=xl({baseUrl:t,auth:s.auth,fetchImpl:s.fetch}),this.accessDelegation=(i=s.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new El(this.client,e),this.tableOps=new Cl(this.client,e,this.accessDelegation)}async listNamespaces(s){return this.namespaceOps.listNamespaces(s)}async createNamespace(s,e){return this.namespaceOps.createNamespace(s,e)}async dropNamespace(s){await this.namespaceOps.dropNamespace(s)}async loadNamespaceMetadata(s){return this.namespaceOps.loadNamespaceMetadata(s)}async listTables(s){return this.tableOps.listTables(s)}async createTable(s,e){return this.tableOps.createTable(s,e)}async updateTable(s,e){return this.tableOps.updateTable(s,e)}async dropTable(s,e){await this.tableOps.dropTable(s,e)}async loadTable(s){return this.tableOps.loadTable(s)}async namespaceExists(s){return this.namespaceOps.namespaceExists(s)}async tableExists(s){return this.tableOps.tableExists(s)}async createNamespaceIfNotExists(s,e){return this.namespaceOps.createNamespaceIfNotExists(s,e)}async createTableIfNotExists(s,e){return this.tableOps.createTableIfNotExists(s,e)}},zs=class extends Error{constructor(s,e="storage",t,i){super(s),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=i}};function Vs(s){return typeof s=="object"&&s!==null&&"__isStorageError"in s}var Ft=class extends zs{constructor(s,e,t,i="storage"){super(s,i,e,t),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},hn=class extends zs{constructor(s,e,t="storage"){super(s,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const Al=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),Rl=s=>{if(typeof s!="object"||s===null)return!1;const e=Object.getPrototypeOf(s);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in s)&&!(Symbol.iterator in s)},xi=s=>{if(Array.isArray(s))return s.map(t=>xi(t));if(typeof s=="function"||s!==Object(s))return s;const e={};return Object.entries(s).forEach(([t,i])=>{const r=t.replace(/([-_][a-z])/gi,o=>o.toUpperCase().replace(/[-_]/g,""));e[r]=xi(i)}),e},Ol=s=>!s||typeof s!="string"||s.length===0||s.length>100||s.trim()!==s||s.includes("/")||s.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(s);function ts(s){"@babel/helpers - typeof";return ts=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ts(s)}function Il(s,e){if(ts(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(ts(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function Ll(s){var e=Il(s,"string");return ts(e)=="symbol"?e:e+""}function Pl(s,e,t){return(e=Ll(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function io(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function R(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?io(Object(t),!0).forEach(function(i){Pl(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):io(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}const ro=s=>{var e;return s.msg||s.message||s.error_description||(typeof s.error=="string"?s.error:(e=s.error)===null||e===void 0?void 0:e.message)||JSON.stringify(s)},Dl=async(s,e,t,i)=>{if(s&&typeof s=="object"&&"status"in s&&"ok"in s&&typeof s.status=="number"){const r=s,o=r.status||500;if(typeof r.json=="function")r.json().then(n=>{const a=(n==null?void 0:n.statusCode)||(n==null?void 0:n.code)||o+"";e(new Ft(ro(n),o,a,i))}).catch(()=>{if(i==="vectors"){const n=o+"";e(new Ft(r.statusText||`HTTP ${o} error`,o,n,i))}else{const n=o+"";e(new Ft(r.statusText||`HTTP ${o} error`,o,n,i))}});else{const n=o+"";e(new Ft(r.statusText||`HTTP ${o} error`,o,n,i))}}else e(new hn(ro(s),s,i))},Nl=(s,e,t,i)=>{const r={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"||s==="HEAD"||!i?R(R({},r),t):(Rl(i)?(r.headers=R({"Content-Type":"application/json"},e==null?void 0:e.headers),r.body=JSON.stringify(i)):r.body=i,e!=null&&e.duplex&&(r.duplex=e.duplex),R(R({},r),t))};async function Mt(s,e,t,i,r,o,n){return new Promise((a,l)=>{s(t,Nl(e,i,r,o)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(n==="vectors"){const h=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!h||!h.includes("application/json"))return{}}return c.json()}).then(c=>a(c)).catch(c=>Dl(c,l,i,n))})}function un(s="storage"){return{get:async(e,t,i,r)=>Mt(e,"GET",t,i,r,void 0,s),post:async(e,t,i,r,o)=>Mt(e,"POST",t,r,o,i,s),put:async(e,t,i,r,o)=>Mt(e,"PUT",t,r,o,i,s),head:async(e,t,i,r)=>Mt(e,"HEAD",t,R(R({},i),{},{noResolveJson:!0}),r,void 0,s),remove:async(e,t,i,r,o)=>Mt(e,"DELETE",t,r,o,i,s)}}const Ml=un("storage"),{get:ss,post:_e,put:Ei,head:jl,remove:br}=Ml,ae=un("vectors");var Rt=class{constructor(s,e={},t,i="storage"){this.shouldThrowOnError=!1,this.url=s,this.headers=e,this.fetch=Al(t),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(s,e){return this.headers=R(R({},this.headers),{},{[s]:e}),this}async handleOperation(s){var e=this;try{return{data:await s(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Vs(t))return{data:null,error:t};throw t}}},Ul=class{constructor(s,e){this.downloadFn=s,this.shouldThrowOnError=e}then(s,e){return this.execute().then(s,e)}async execute(){var s=this;try{return{data:(await s.downloadFn()).body,error:null}}catch(e){if(s.shouldThrowOnError)throw e;if(Vs(e))return{data:null,error:e};throw e}}};let pn;pn=Symbol.toStringTag;var zl=class{constructor(s,e){this.downloadFn=s,this.shouldThrowOnError=e,this[pn]="BlobDownloadBuilder",this.promise=null}asStream(){return new Ul(this.downloadFn,this.shouldThrowOnError)}then(s,e){return this.getPromise().then(s,e)}catch(s){return this.getPromise().catch(s)}finally(s){return this.getPromise().finally(s)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var s=this;try{return{data:await(await s.downloadFn()).blob(),error:null}}catch(e){if(s.shouldThrowOnError)throw e;if(Vs(e))return{data:null,error:e};throw e}}};const Vl={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},oo={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Bl=class extends Rt{constructor(s,e={},t,i){super(s,e,i,"storage"),this.bucketId=t}async uploadOrUpdate(s,e,t,i){var r=this;return r.handleOperation(async()=>{let o;const n=R(R({},oo),i);let a=R(R({},r.headers),s==="POST"&&{"x-upsert":String(n.upsert)});const l=n.metadata;typeof Blob<"u"&&t instanceof Blob?(o=new FormData,o.append("cacheControl",n.cacheControl),l&&o.append("metadata",r.encodeMetadata(l)),o.append("",t)):typeof FormData<"u"&&t instanceof FormData?(o=t,o.has("cacheControl")||o.append("cacheControl",n.cacheControl),l&&!o.has("metadata")&&o.append("metadata",r.encodeMetadata(l))):(o=t,a["cache-control"]=`max-age=${n.cacheControl}`,a["content-type"]=n.contentType,l&&(a["x-metadata"]=r.toBase64(r.encodeMetadata(l))),(typeof ReadableStream<"u"&&o instanceof ReadableStream||o&&typeof o=="object"&&"pipe"in o&&typeof o.pipe=="function")&&!n.duplex&&(n.duplex="half")),i!=null&&i.headers&&(a=R(R({},a),i.headers));const c=r._removeEmptyFolders(e),h=r._getFinalPath(c),p=await(s=="PUT"?Ei:_e)(r.fetch,`${r.url}/object/${h}`,o,R({headers:a},n!=null&&n.duplex?{duplex:n.duplex}:{}));return{path:c,id:p.Id,fullPath:p.Key}})}async upload(s,e,t){return this.uploadOrUpdate("POST",s,e,t)}async uploadToSignedUrl(s,e,t,i){var r=this;const o=r._removeEmptyFolders(s),n=r._getFinalPath(o),a=new URL(r.url+`/object/upload/sign/${n}`);return a.searchParams.set("token",e),r.handleOperation(async()=>{let l;const c=R({upsert:oo.upsert},i),h=R(R({},r.headers),{"x-upsert":String(c.upsert)});return typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.append("cacheControl",c.cacheControl)):(l=t,h["cache-control"]=`max-age=${c.cacheControl}`,h["content-type"]=c.contentType),{path:o,fullPath:(await Ei(r.fetch,a.toString(),l,{headers:h})).Key}})}async createSignedUploadUrl(s,e){var t=this;return t.handleOperation(async()=>{let i=t._getFinalPath(s);const r=R({},t.headers);e!=null&&e.upsert&&(r["x-upsert"]="true");const o=await _e(t.fetch,`${t.url}/object/upload/sign/${i}`,{},{headers:r}),n=new URL(t.url+o.url),a=n.searchParams.get("token");if(!a)throw new zs("No token returned by API");return{signedUrl:n.toString(),path:s,token:a}})}async update(s,e,t){return this.uploadOrUpdate("PUT",s,e,t)}async move(s,e,t){var i=this;return i.handleOperation(async()=>await _e(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:s,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers}))}async copy(s,e,t){var i=this;return i.handleOperation(async()=>({path:(await _e(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:s,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(s,e,t){var i=this;return i.handleOperation(async()=>{let r=i._getFinalPath(s),o=await _e(i.fetch,`${i.url}/object/sign/${r}`,R({expiresIn:e},t!=null&&t.transform?{transform:t.transform}:{}),{headers:i.headers});const n=t!=null&&t.download?`&download=${t.download===!0?"":t.download}`:"",a=t!=null&&t.transform&&o.signedURL.includes("/object/sign/")?o.signedURL.replace("/object/sign/","/render/image/sign/"):o.signedURL;return{signedUrl:encodeURI(`${i.url}${a}${n}`)}})}async createSignedUrls(s,e,t){var i=this;return i.handleOperation(async()=>{const r=await _e(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:s},{headers:i.headers}),o=t!=null&&t.download?`&download=${t.download===!0?"":t.download}`:"";return r.map(n=>R(R({},n),{},{signedUrl:n.signedURL?encodeURI(`${i.url}${n.signedURL}${o}`):null}))})}download(s,e,t){const i=typeof(e==null?void 0:e.transform)<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((e==null?void 0:e.transform)||{}),o=r?`?${r}`:"",n=this._getFinalPath(s),a=()=>ss(this.fetch,`${this.url}/${i}/${n}${o}`,{headers:this.headers,noResolveJson:!0},t);return new zl(a,this.shouldThrowOnError)}async info(s){var e=this;const t=e._getFinalPath(s);return e.handleOperation(async()=>xi(await ss(e.fetch,`${e.url}/object/info/${t}`,{headers:e.headers})))}async exists(s){var e=this;const t=e._getFinalPath(s);try{return await jl(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(Vs(r)){var i;const o=r instanceof Ft?r.status:r instanceof hn?(i=r.originalError)===null||i===void 0?void 0:i.status:void 0;if(o!==void 0&&[400,404].includes(o))return{data:!1,error:r}}throw r}}getPublicUrl(s,e){const t=this._getFinalPath(s),i=[],r=e!=null&&e.download?`download=${e.download===!0?"":e.download}`:"";r!==""&&i.push(r);const o=typeof(e==null?void 0:e.transform)<"u"?"render/image":"object",n=this.transformOptsToQueryString((e==null?void 0:e.transform)||{});n!==""&&i.push(n);let a=i.join("&");return a!==""&&(a=`?${a}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${t}${a}`)}}}async remove(s){var e=this;return e.handleOperation(async()=>await br(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:s},{headers:e.headers}))}async list(s,e,t){var i=this;return i.handleOperation(async()=>{const r=R(R(R({},Vl),e),{},{prefix:s||""});return await _e(i.fetch,`${i.url}/object/list/${i.bucketId}`,r,{headers:i.headers},t)})}async listV2(s,e){var t=this;return t.handleOperation(async()=>{const i=R({},s);return await _e(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,i,{headers:t.headers},e)})}encodeMetadata(s){return JSON.stringify(s)}toBase64(s){return typeof Buffer<"u"?Buffer.from(s).toString("base64"):btoa(s)}_getFinalPath(s){return`${this.bucketId}/${s.replace(/^\/+/,"")}`}_removeEmptyFolders(s){return s.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(s){const e=[];return s.width&&e.push(`width=${s.width}`),s.height&&e.push(`height=${s.height}`),s.resize&&e.push(`resize=${s.resize}`),s.format&&e.push(`format=${s.format}`),s.quality&&e.push(`quality=${s.quality}`),e.join("&")}};const Fl="2.99.1",ls={"X-Client-Info":`storage-js/${Fl}`};var ql=class extends Rt{constructor(s,e={},t,i){const r=new URL(s);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase."));const o=r.href.replace(/\/$/,""),n=R(R({},ls),e);super(o,n,t,"storage")}async listBuckets(s){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(s);return await ss(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(s){var e=this;return e.handleOperation(async()=>await ss(e.fetch,`${e.url}/bucket/${s}`,{headers:e.headers}))}async createBucket(s,e={public:!1}){var t=this;return t.handleOperation(async()=>await _e(t.fetch,`${t.url}/bucket`,{id:s,name:s,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async updateBucket(s,e){var t=this;return t.handleOperation(async()=>await Ei(t.fetch,`${t.url}/bucket/${s}`,{id:s,name:s,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async emptyBucket(s){var e=this;return e.handleOperation(async()=>await _e(e.fetch,`${e.url}/bucket/${s}/empty`,{},{headers:e.headers}))}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await br(e.fetch,`${e.url}/bucket/${s}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(s){const e={};return s&&("limit"in s&&(e.limit=String(s.limit)),"offset"in s&&(e.offset=String(s.offset)),s.search&&(e.search=s.search),s.sortColumn&&(e.sortColumn=s.sortColumn),s.sortOrder&&(e.sortOrder=s.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Hl=class extends Rt{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=R(R({},ls),e);super(i,r,t,"storage")}async createBucket(s){var e=this;return e.handleOperation(async()=>await _e(e.fetch,`${e.url}/bucket`,{name:s},{headers:e.headers}))}async listBuckets(s){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;(s==null?void 0:s.limit)!==void 0&&t.set("limit",s.limit.toString()),(s==null?void 0:s.offset)!==void 0&&t.set("offset",s.offset.toString()),s!=null&&s.sortColumn&&t.set("sortColumn",s.sortColumn),s!=null&&s.sortOrder&&t.set("sortOrder",s.sortOrder),s!=null&&s.search&&t.set("search",s.search);const i=t.toString(),r=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await ss(e.fetch,r,{headers:e.headers})})}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await br(e.fetch,`${e.url}/bucket/${s}`,{},{headers:e.headers}))}from(s){var e=this;if(!Ol(s))throw new zs("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new Tl({baseUrl:this.url,catalogName:s,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(t,{get(r,o){const n=r[o];return typeof n!="function"?n:async(...a)=>{try{return{data:await n.apply(r,a),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},Wl=class extends Rt{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=R(R({},ls),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async createIndex(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/CreateIndex`,s,{headers:e.headers})||{})}async getIndex(s,e){var t=this;return t.handleOperation(async()=>await ae.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:s,indexName:e},{headers:t.headers}))}async listIndexes(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/ListIndexes`,s,{headers:e.headers}))}async deleteIndex(s,e){var t=this;return t.handleOperation(async()=>await ae.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:s,indexName:e},{headers:t.headers})||{})}},Kl=class extends Rt{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=R(R({},ls),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async putVectors(s){var e=this;if(s.vectors.length<1||s.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/PutVectors`,s,{headers:e.headers})||{})}async getVectors(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/GetVectors`,s,{headers:e.headers}))}async listVectors(s){var e=this;if(s.segmentCount!==void 0){if(s.segmentCount<1||s.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(s.segmentIndex!==void 0&&(s.segmentIndex<0||s.segmentIndex>=s.segmentCount))throw new Error(`segmentIndex must be between 0 and ${s.segmentCount-1}`)}return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/ListVectors`,s,{headers:e.headers}))}async queryVectors(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/QueryVectors`,s,{headers:e.headers}))}async deleteVectors(s){var e=this;if(s.keys.length<1||s.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/DeleteVectors`,s,{headers:e.headers})||{})}},Jl=class extends Rt{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=R(R({},ls),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async createBucket(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:s},{headers:e.headers})||{})}async getBucket(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:s},{headers:e.headers}))}async listBuckets(s={}){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/ListVectorBuckets`,s,{headers:e.headers}))}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await ae.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:s},{headers:e.headers})||{})}},Gl=class extends Jl{constructor(s,e={}){super(s,e.headers||{},e.fetch)}from(s){return new Yl(this.url,this.headers,s,this.fetch)}async createBucket(s){var e=()=>super.createBucket,t=this;return e().call(t,s)}async getBucket(s){var e=()=>super.getBucket,t=this;return e().call(t,s)}async listBuckets(s={}){var e=()=>super.listBuckets,t=this;return e().call(t,s)}async deleteBucket(s){var e=()=>super.deleteBucket,t=this;return e().call(t,s)}},Yl=class extends Wl{constructor(s,e,t,i){super(s,e,i),this.vectorBucketName=t}async createIndex(s){var e=()=>super.createIndex,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(s={}){var e=()=>super.listIndexes,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(s){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,s)}async deleteIndex(s){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,s)}index(s){return new Zl(this.url,this.headers,this.vectorBucketName,s,this.fetch)}},Zl=class extends Kl{constructor(s,e,t,i,r){super(s,e,r),this.vectorBucketName=t,this.indexName=i}async putVectors(s){var e=()=>super.putVectors,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(s){var e=()=>super.getVectors,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(s={}){var e=()=>super.listVectors,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(s){var e=()=>super.queryVectors,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(s){var e=()=>super.deleteVectors,t=this;return e().call(t,R(R({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},Xl=class extends ql{constructor(s,e={},t,i){super(s,e,t,i)}from(s){return new Bl(this.url,this.headers,s,this.fetch)}get vectors(){return new Gl(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Hl(this.url+"/iceberg",this.headers,this.fetch)}};const fn="2.99.1",yt=30*1e3,Ci=3,oi=Ci*yt,Ql="http://localhost:9999",ec="supabase.auth.token",tc={"X-Client-Info":`gotrue-js/${fn}`},Ti="X-Supabase-Api-Version",mn={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},sc=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,ic=600*1e3;class is extends Error{constructor(e,t,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=i}}function $(s){return typeof s=="object"&&s!==null&&"__isAuthError"in s}class rc extends is{constructor(e,t,i){super(e,t,i),this.name="AuthApiError",this.status=t,this.code=i}}function oc(s){return $(s)&&s.name==="AuthApiError"}class ot extends is{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class Me extends is{constructor(e,t,i,r){super(e,i,r),this.name=t,this.status=i}}class oe extends Me{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function ni(s){return $(s)&&s.name==="AuthSessionMissingError"}class ft extends Me{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class ms extends Me{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class gs extends Me{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function nc(s){return $(s)&&s.name==="AuthImplicitGrantRedirectError"}class no extends Me{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class ac extends Me{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ai extends Me{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function ai(s){return $(s)&&s.name==="AuthRetryableFetchError"}class ao extends Me{constructor(e,t,i){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=i}}class Ri extends Me{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const As="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),lo=` 	
\r=`.split(""),lc=(()=>{const s=new Array(128);for(let e=0;e<s.length;e+=1)s[e]=-1;for(let e=0;e<lo.length;e+=1)s[lo[e].charCodeAt(0)]=-2;for(let e=0;e<As.length;e+=1)s[As[e].charCodeAt(0)]=e;return s})();function co(s,e,t){if(s!==null)for(e.queue=e.queue<<8|s,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(As[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(As[i]),e.queuedBits-=6}}function gn(s,e,t){const i=lc[s];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(s)}"`)}}function ho(s){const e=[],t=n=>{e.push(String.fromCodePoint(n))},i={utf8seq:0,codepoint:0},r={queue:0,queuedBits:0},o=n=>{hc(n,i,t)};for(let n=0;n<s.length;n+=1)gn(s.charCodeAt(n),r,o);return e.join("")}function cc(s,e){if(s<=127){e(s);return}else if(s<=2047){e(192|s>>6),e(128|s&63);return}else if(s<=65535){e(224|s>>12),e(128|s>>6&63),e(128|s&63);return}else if(s<=1114111){e(240|s>>18),e(128|s>>12&63),e(128|s>>6&63),e(128|s&63);return}throw new Error(`Unrecognized Unicode codepoint: ${s.toString(16)}`)}function dc(s,e){for(let t=0;t<s.length;t+=1){let i=s.charCodeAt(t);if(i>55295&&i<=56319){const r=(i-55296)*1024&65535;i=(s.charCodeAt(t+1)-56320&65535|r)+65536,t+=1}cc(i,e)}}function hc(s,e,t){if(e.utf8seq===0){if(s<=127){t(s);return}for(let i=1;i<6;i+=1)if((s>>7-i&1)===0){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=s&31;else if(e.utf8seq===3)e.codepoint=s&15;else if(e.utf8seq===4)e.codepoint=s&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(s<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|s&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function $t(s){const e=[],t={queue:0,queuedBits:0},i=r=>{e.push(r)};for(let r=0;r<s.length;r+=1)gn(s.charCodeAt(r),t,i);return new Uint8Array(e)}function uc(s){const e=[];return dc(s,t=>e.push(t)),new Uint8Array(e)}function lt(s){const e=[],t={queue:0,queuedBits:0},i=r=>{e.push(r)};return s.forEach(r=>co(r,t,i)),co(null,t,i),e.join("")}function pc(s){return Math.round(Date.now()/1e3)+s}function fc(){return Symbol("auth-callback")}const G=()=>typeof window<"u"&&typeof document<"u",tt={tested:!1,writable:!1},vn=()=>{if(!G())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(tt.tested)return tt.writable;const s=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(s,s),globalThis.localStorage.removeItem(s),tt.tested=!0,tt.writable=!0}catch{tt.tested=!0,tt.writable=!1}return tt.writable};function mc(s){const e={},t=new URL(s);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((r,o)=>{e[o]=r})}catch{}return t.searchParams.forEach((i,r)=>{e[r]=i}),e}const _n=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),gc=s=>typeof s=="object"&&s!==null&&"status"in s&&"ok"in s&&"json"in s&&typeof s.json=="function",wt=async(s,e,t)=>{await s.setItem(e,JSON.stringify(t))},st=async(s,e)=>{const t=await s.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},J=async(s,e)=>{await s.removeItem(e)};class Bs{constructor(){this.promise=new Bs.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Bs.promiseConstructor=Promise;function vs(s){const e=s.split(".");if(e.length!==3)throw new Ri("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!sc.test(e[i]))throw new Ri("JWT not in base64url format");return{header:JSON.parse(ho(e[0])),payload:JSON.parse(ho(e[1])),signature:$t(e[2]),raw:{header:e[0],payload:e[1]}}}async function vc(s){return await new Promise(e=>{setTimeout(()=>e(null),s)})}function _c(s,e){return new Promise((i,r)=>{(async()=>{for(let o=0;o<1/0;o++)try{const n=await s(o);if(!e(o,null,n)){i(n);return}}catch(n){if(!e(o,n)){r(n);return}}})()})}function bc(s){return("0"+s.toString(16)).substr(-2)}function yc(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=t.length;let r="";for(let o=0;o<56;o++)r+=t.charAt(Math.floor(Math.random()*i));return r}return crypto.getRandomValues(e),Array.from(e,bc).join("")}async function wc(s){const t=new TextEncoder().encode(s),i=await crypto.subtle.digest("SHA-256",t),r=new Uint8Array(i);return Array.from(r).map(o=>String.fromCharCode(o)).join("")}async function Sc(s){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),s;const t=await wc(s);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function mt(s,e,t=!1){const i=yc();let r=i;t&&(r+="/PASSWORD_RECOVERY"),await wt(s,`${e}-code-verifier`,r);const o=await Sc(i);return[o,i===o?"plain":"s256"]}const kc=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function $c(s){const e=s.headers.get(Ti);if(!e||!e.match(kc))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function xc(s){if(!s)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(s<=e)throw new Error("JWT has expired")}function Ec(s){switch(s){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Cc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function gt(s){if(!Cc.test(s))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function li(){const s={};return new Proxy(s,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const i=t.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Tc(s,e){return new Proxy(s,{get:(t,i,r)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const o=i.toString();if(o==="Symbol(Symbol.toPrimitive)"||o==="Symbol(Symbol.toStringTag)"||o==="Symbol(util.inspect.custom)"||o==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,i,r)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,i,r)}})}function uo(s){return JSON.parse(JSON.stringify(s))}const it=s=>s.msg||s.message||s.error_description||s.error||JSON.stringify(s),Ac=[502,503,504];async function po(s){var e;if(!gc(s))throw new Ai(it(s),0);if(Ac.includes(s.status))throw new Ai(it(s),s.status);let t;try{t=await s.json()}catch(o){throw new ot(it(o),o)}let i;const r=$c(s);if(r&&r.getTime()>=mn["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?i=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(i=t.error_code),i){if(i==="weak_password")throw new ao(it(t),s.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new oe}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((o,n)=>o&&typeof n=="string",!0))throw new ao(it(t),s.status,t.weak_password.reasons);throw new rc(it(t),s.status||500,i)}const Rc=(s,e,t,i)=>{const r={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"?r:(r.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),r.body=JSON.stringify(i),Object.assign(Object.assign({},r),t))};async function E(s,e,t,i){var r;const o=Object.assign({},i==null?void 0:i.headers);o[Ti]||(o[Ti]=mn["2024-01-01"].name),i!=null&&i.jwt&&(o.Authorization=`Bearer ${i.jwt}`);const n=(r=i==null?void 0:i.query)!==null&&r!==void 0?r:{};i!=null&&i.redirectTo&&(n.redirect_to=i.redirectTo);const a=Object.keys(n).length?"?"+new URLSearchParams(n).toString():"",l=await Oc(s,e,t+a,{headers:o,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function Oc(s,e,t,i,r,o){const n=Rc(e,i,r,o);let a;try{a=await s(t,Object.assign({},n))}catch(l){throw console.error(l),new Ai(it(l),0)}if(a.ok||await po(a),i!=null&&i.noResolveJson)return a;try{return await a.json()}catch(l){await po(l)}}function ve(s){var e;let t=null;Pc(s)&&(t=Object.assign({},s),s.expires_at||(t.expires_at=pc(s.expires_in)));const i=(e=s.user)!==null&&e!==void 0?e:s;return{data:{session:t,user:i},error:null}}function fo(s){const e=ve(s);return!e.error&&s.weak_password&&typeof s.weak_password=="object"&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.message&&typeof s.weak_password.message=="string"&&s.weak_password.reasons.reduce((t,i)=>t&&typeof i=="string",!0)&&(e.data.weak_password=s.weak_password),e}function He(s){var e;return{data:{user:(e=s.user)!==null&&e!==void 0?e:s},error:null}}function Ic(s){return{data:s,error:null}}function Lc(s){const{action_link:e,email_otp:t,hashed_token:i,redirect_to:r,verification_type:o}=s,n=Us(s,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:i,redirect_to:r,verification_type:o},l=Object.assign({},n);return{data:{properties:a,user:l},error:null}}function mo(s){return s}function Pc(s){return s.access_token&&s.refresh_token&&s.expires_in}const ci=["global","local","others"];class Dc{constructor({url:e="",headers:t={},fetch:i}){this.url=e,this.headers=t,this.fetch=_n(i),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,t=ci[0]){if(ci.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ci.join(", ")}`);try{return await E(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if($(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,t={}){try{return await E(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:He})}catch(i){if($(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:t}=e,i=Us(e,["options"]),r=Object.assign(Object.assign({},i),t);return"newEmail"in i&&(r.new_email=i==null?void 0:i.newEmail,delete r.newEmail),await E(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:Lc,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if($(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await E(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:He})}catch(t){if($(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,i,r,o,n,a,l;try{const c={nextPage:null,lastPage:0,total:0},h=await E(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(o=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&o!==void 0?o:""},xform:mo});if(h.error)throw h.error;const p=await h.json(),f=(n=h.headers.get("x-total-count"))!==null&&n!==void 0?n:0,u=(l=(a=h.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return u.length>0&&(u.forEach(d=>{const v=parseInt(d.split(";")[0].split("=")[1].substring(0,1)),b=JSON.parse(d.split(";")[1].split("=")[1]);c[`${b}Page`]=v}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},p),c),error:null}}catch(c){if($(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){gt(e);try{return await E(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:He})}catch(t){if($(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){gt(e);try{return await E(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:He})}catch(i){if($(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,t=!1){gt(e);try{return await E(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:He})}catch(i){if($(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){gt(e.userId);try{const{data:t,error:i}=await E(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:r=>({data:{factors:r},error:null})});return{data:t,error:i}}catch(t){if($(t))return{data:null,error:t};throw t}}async _deleteFactor(e){gt(e.userId),gt(e.id);try{return{data:await E(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if($(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,i,r,o,n,a,l;try{const c={nextPage:null,lastPage:0,total:0},h=await E(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(o=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&o!==void 0?o:""},xform:mo});if(h.error)throw h.error;const p=await h.json(),f=(n=h.headers.get("x-total-count"))!==null&&n!==void 0?n:0,u=(l=(a=h.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return u.length>0&&(u.forEach(d=>{const v=parseInt(d.split(";")[0].split("=")[1].substring(0,1)),b=JSON.parse(d.split(";")[1].split("=")[1]);c[`${b}Page`]=v}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},p),c),error:null}}catch(c){if($(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await E(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await E(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if($(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if($(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _listCustomProviders(e){try{const t={};return e!=null&&e.type&&(t.type=e.type),await E(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:i=>{var r;return{data:{providers:(r=i==null?void 0:i.providers)!==null&&r!==void 0?r:[]},error:null}}})}catch(t){if($(t))return{data:{providers:[]},error:t};throw t}}async _createCustomProvider(e){try{return await E(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _getCustomProvider(e){try{return await E(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _updateCustomProvider(e,t){try{return await E(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if($(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if($(t))return{data:null,error:t};throw t}}}function go(s={}){return{getItem:e=>s[e]||null,setItem:(e,t)=>{s[e]=t},removeItem:e=>{delete s[e]}}}const Oe={debug:!!(globalThis&&vn()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class bn extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class Nc extends bn{}async function Mc(s,e,t){Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",s,e);const i=new globalThis.AbortController;e>0&&setTimeout(()=>{i.abort(),Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",s)},e),await Promise.resolve();try{return await globalThis.navigator.locks.request(s,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:i.signal},async r=>{if(r){Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",s,r.name);try{return await t()}finally{Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",s,r.name)}}else{if(e===0)throw Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",s),new Nc(`Acquiring an exclusive Navigator LockManager lock "${s}" immediately failed`);if(Oe.debug)try{const o=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(o,null,"  "))}catch(o){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",o)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}})}catch(r){if((r==null?void 0:r.name)==="AbortError"&&e>0)return Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",s),console.warn(`@supabase/gotrue-js: Lock "${s}" was not released within ${e}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(s,{mode:"exclusive",steal:!0},async o=>{if(o){Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",s,o.name);try{return await t()}finally{Oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",s,o.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await t()}));throw r}}function jc(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function yn(s){if(!/^0x[a-fA-F0-9]{40}$/.test(s))throw new Error(`@supabase/auth-js: Address "${s}" is invalid.`);return s.toLowerCase()}function Uc(s){return parseInt(s,16)}function zc(s){const e=new TextEncoder().encode(s);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Vc(s){var e;const{chainId:t,domain:i,expirationTime:r,issuedAt:o=new Date,nonce:n,notBefore:a,requestId:l,resources:c,scheme:h,uri:p,version:f}=s;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(n&&n.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${n}`);if(!p)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(f!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);if(!((e=s.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${s.statement}`)}const u=yn(s.address),d=h?`${h}://${i}`:i,v=s.statement?`${s.statement}
`:"",b=`${d} wants you to sign in with your Ethereum account:
${u}

${v}`;let y=`URI: ${p}
Version: ${f}
Chain ID: ${t}${n?`
Nonce: ${n}`:""}
Issued At: ${o.toISOString()}`;if(r&&(y+=`
Expiration Time: ${r.toISOString()}`),a&&(y+=`
Not Before: ${a.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let S=`
Resources:`;for(const g of c){if(!g||typeof g!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${g}`);S+=`
- ${g}`}y+=S}return`${b}
${y}`}class q extends Error{constructor({message:e,code:t,cause:i,name:r}){var o;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(o=r??(i instanceof Error?i.name:void 0))!==null&&o!==void 0?o:"Unknown Error",this.code=t}}class Rs extends q{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function Bc({error:s,options:e}){var t,i,r;const{publicKey:o}=e;if(!o)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new q({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else if(s.name==="ConstraintError"){if(((t=o.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new q({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:s});if(e.mediation==="conditional"&&((i=o.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new q({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:s});if(((r=o.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new q({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:s})}else{if(s.name==="InvalidStateError")return new q({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:s});if(s.name==="NotAllowedError")return new q({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="NotSupportedError")return o.pubKeyCredParams.filter(a=>a.type==="public-key").length===0?new q({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:s}):new q({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:s});if(s.name==="SecurityError"){const n=window.location.hostname;if(wn(n)){if(o.rp.id!==n)return new q({message:`The RP ID "${o.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="TypeError"){if(o.user.id.byteLength<1||o.user.id.byteLength>64)return new q({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:s})}else if(s.name==="UnknownError")return new q({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}function Fc({error:s,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new q({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else{if(s.name==="NotAllowedError")return new q({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="SecurityError"){const i=window.location.hostname;if(wn(i)){if(t.rpId!==i)return new q({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="UnknownError")return new q({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}class qc{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Hc=new qc;function Wc(s){if(!s)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(s);const{challenge:e,user:t,excludeCredentials:i}=s,r=Us(s,["challenge","user","excludeCredentials"]),o=$t(e).buffer,n=Object.assign(Object.assign({},t),{id:$t(t.id).buffer}),a=Object.assign(Object.assign({},r),{challenge:o,user:n});if(i&&i.length>0){a.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];a.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:$t(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return a}function Kc(s){if(!s)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(s);const{challenge:e,allowCredentials:t}=s,i=Us(s,["challenge","allowCredentials"]),r=$t(e).buffer,o=Object.assign(Object.assign({},i),{challenge:r});if(t&&t.length>0){o.allowCredentials=new Array(t.length);for(let n=0;n<t.length;n++){const a=t[n];o.allowCredentials[n]=Object.assign(Object.assign({},a),{id:$t(a.id).buffer,type:a.type||"public-key",transports:a.transports})}}return o}function Jc(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s;return{id:s.id,rawId:s.id,response:{attestationObject:lt(new Uint8Array(s.response.attestationObject)),clientDataJSON:lt(new Uint8Array(s.response.clientDataJSON))},type:"public-key",clientExtensionResults:s.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Gc(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s,i=s.getClientExtensionResults(),r=s.response;return{id:s.id,rawId:s.id,response:{authenticatorData:lt(new Uint8Array(r.authenticatorData)),clientDataJSON:lt(new Uint8Array(r.clientDataJSON)),signature:lt(new Uint8Array(r.signature)),userHandle:r.userHandle?lt(new Uint8Array(r.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function wn(s){return s==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(s)}function vo(){var s,e;return!!(G()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((s=navigator==null?void 0:navigator.credentials)===null||s===void 0?void 0:s.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Yc(s){try{const e=await navigator.credentials.create(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Rs("Browser returned unexpected credential type",e)}:{data:null,error:new Rs("Empty credential response",e)}}catch(e){return{data:null,error:Bc({error:e,options:s})}}}async function Zc(s){try{const e=await navigator.credentials.get(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Rs("Browser returned unexpected credential type",e)}:{data:null,error:new Rs("Empty credential response",e)}}catch(e){return{data:null,error:Fc({error:e,options:s})}}}const Xc={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Qc={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Os(...s){const e=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),t=r=>r instanceof ArrayBuffer||ArrayBuffer.isView(r),i={};for(const r of s)if(r)for(const o in r){const n=r[o];if(n!==void 0)if(Array.isArray(n))i[o]=n;else if(t(n))i[o]=n;else if(e(n)){const a=i[o];e(a)?i[o]=Os(a,n):i[o]=Os(n)}else i[o]=n}return i}function ed(s,e){return Os(Xc,s,e||{})}function td(s,e){return Os(Qc,s,e||{})}class sd{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:i,signal:r},o){var n;try{const{data:a,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:l};const c=r??Hc.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:h}=a.webauthn.credential_options.publicKey;if(!h.name){const p=i;if(p)h.name=`${h.id}:${p}`;else{const u=(await this.client.getUser()).data.user,d=((n=u==null?void 0:u.user_metadata)===null||n===void 0?void 0:n.name)||(u==null?void 0:u.email)||(u==null?void 0:u.id)||"User";h.name=`${h.id}:${d}`}}h.displayName||(h.displayName=h.name)}switch(a.webauthn.type){case"create":{const h=ed(a.webauthn.credential_options.publicKey,o==null?void 0:o.create),{data:p,error:f}=await Yc({publicKey:h,signal:c});return p?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:p}},error:null}:{data:null,error:f}}case"request":{const h=td(a.webauthn.credential_options.publicKey,o==null?void 0:o.request),{data:p,error:f}=await Zc(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:h,signal:c}));return p?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:p}},error:null}:{data:null,error:f}}}}catch(a){return $(a)?{data:null,error:a}:{data:null,error:new ot("Unexpected error in challenge",a)}}}async _verify({challengeId:e,factorId:t,webauthn:i}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},o){if(!t)return{data:null,error:new is("rpId is required for WebAuthn authentication")};try{if(!vo())return{data:null,error:new ot("Browser does not support WebAuthn",null)};const{data:n,error:a}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:i},signal:r},{request:o});if(!n)return{data:null,error:a};const{webauthn:l}=n;return this._verify({factorId:e,challengeId:n.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:i,credential_response:l.credential_response}})}catch(n){return $(n)?{data:null,error:n}:{data:null,error:new ot("Unexpected error in authenticate",n)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},o){if(!t)return{data:null,error:new is("rpId is required for WebAuthn registration")};try{if(!vo())return{data:null,error:new ot("Browser does not support WebAuthn",null)};const{data:n,error:a}=await this._enroll({friendlyName:e});if(!n)return await this.client.mfa.listFactors().then(h=>{var p;return(p=h.data)===null||p===void 0?void 0:p.all.find(f=>f.factor_type==="webauthn"&&f.friendly_name===e&&f.status!=="unverified")}).then(h=>h?this.client.mfa.unenroll({factorId:h==null?void 0:h.id}):void 0),{data:null,error:a};const{data:l,error:c}=await this._challenge({factorId:n.id,friendlyName:n.friendly_name,webauthn:{rpId:t,rpOrigins:i},signal:r},{create:o});return l?this._verify({factorId:n.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(n){return $(n)?{data:null,error:n}:{data:null,error:new ot("Unexpected error in register",n)}}}}jc();const id={url:Ql,storageKey:ec,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:tc,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function _o(s,e,t){return await t()}const vt={};class rs{get jwks(){var e,t;return(t=(e=vt[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){vt[this.storageKey]=Object.assign(Object.assign({},vt[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=vt[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){vt[this.storageKey]=Object.assign(Object.assign({},vt[this.storageKey]),{cachedAt:e})}constructor(e){var t,i,r;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const o=Object.assign(Object.assign({},id),e);if(this.storageKey=o.storageKey,this.instanceID=(t=rs.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,rs.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!o.debug,typeof o.debug=="function"&&(this.logger=o.debug),this.instanceID>0&&G()){const n=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(n),this.logDebugMessages&&console.trace(n)}if(this.persistSession=o.persistSession,this.autoRefreshToken=o.autoRefreshToken,this.admin=new Dc({url:o.url,headers:o.headers,fetch:o.fetch}),this.url=o.url,this.headers=o.headers,this.fetch=_n(o.fetch),this.lock=o.lock||_o,this.detectSessionInUrl=o.detectSessionInUrl,this.flowType=o.flowType,this.hasCustomAuthorizationHeader=o.hasCustomAuthorizationHeader,this.throwOnError=o.throwOnError,this.lockAcquireTimeout=o.lockAcquireTimeout,o.lock?this.lock=o.lock:this.persistSession&&G()&&(!((i=globalThis==null?void 0:globalThis.navigator)===null||i===void 0)&&i.locks)?this.lock=Mc:this.lock=_o,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new sd(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(o.storage?this.storage=o.storage:vn()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=go(this.memoryStorage)),o.userStorage&&(this.userStorage=o.userStorage)):(this.memoryStorage={},this.storage=go(this.memoryStorage)),G()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(n){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",n)}(r=this.broadcastChannel)===null||r===void 0||r.addEventListener("message",async n=>{this._debug("received broadcast notification from other tab or client",n);try{await this._notifyAllSubscribers(n.data.event,n.data.session,!1)}catch(a){this._debug("#broadcastChannel","error",a)}})}o.skipAutoInitialize||this.initialize().catch(n=>{this._debug("#initialize()","error",n)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${fn}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},i="none";if(G()&&(t=mc(window.location.href),this._isImplicitGrantCallback(t)?i="implicit":await this._isPKCECallback(t)&&(i="pkce")),G()&&this.detectSessionInUrl&&i!=="none"){const{data:r,error:o}=await this._getSessionFromURL(t,i);if(o){if(this._debug("#_initialize()","error detecting session from URL",o),nc(o)){const l=(e=o.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:o}}return{error:o}}const{session:n,redirectType:a}=r;return this._debug("#_initialize()","detected session in URL",n,"redirect type",a),await this._saveSession(n),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",n):await this._notifyAllSubscribers("SIGNED_IN",n)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return $(t)?this._returnResult({error:t}):this._returnResult({error:new ot("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,i,r;try{const o=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}},xform:ve}),{data:n,error:a}=o;if(a||!n)return this._returnResult({data:{user:null,session:null},error:a});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(o){if($(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signUp(e){var t,i,r;try{let o;if("email"in e){const{email:h,password:p,options:f}=e;let u=null,d=null;this.flowType==="pkce"&&([u,d]=await mt(this.storage,this.storageKey)),o=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:f==null?void 0:f.emailRedirectTo,body:{email:h,password:p,data:(t=f==null?void 0:f.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken},code_challenge:u,code_challenge_method:d},xform:ve})}else if("phone"in e){const{phone:h,password:p,options:f}=e;o=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:p,data:(i=f==null?void 0:f.data)!==null&&i!==void 0?i:{},channel:(r=f==null?void 0:f.channel)!==null&&r!==void 0?r:"sms",gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken}},xform:ve})}else throw new ms("You must provide either an email or phone number and a password");const{data:n,error:a}=o;if(a||!n)return await J(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:a});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(o){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signInWithPassword(e){try{let t;if("email"in e){const{email:o,password:n,options:a}=e;t=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:o,password:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:fo})}else if("phone"in e){const{phone:o,password:n,options:a}=e;t=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:o,password:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:fo})}else throw new ms("You must provide either an email or phone number and a password");const{data:i,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!i||!i.session||!i.user){const o=new ft;return this._returnResult({data:{user:null,session:null},error:o})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:r})}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,i,r,o;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(r=e.options)===null||r===void 0?void 0:r.queryParams,skipBrowserRedirect:(o=e.options)===null||o===void 0?void 0:o.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,i,r,o,n,a,l,c,h,p,f;let u,d;if("message"in e)u=e.message,d=e.signature;else{const{chain:v,wallet:b,statement:y,options:S}=e;let g;if(G())if(typeof b=="object")g=b;else{const F=window;if("ethereum"in F&&typeof F.ethereum=="object"&&"request"in F.ethereum&&typeof F.ethereum.request=="function")g=F.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(S!=null&&S.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");g=b}const k=new URL((t=S==null?void 0:S.url)!==null&&t!==void 0?t:window.location.href),A=await g.request({method:"eth_requestAccounts"}).then(F=>F).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!A||A.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const T=yn(A[0]);let I=(i=S==null?void 0:S.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!I){const F=await g.request({method:"eth_chainId"});I=Uc(F)}const W={domain:k.host,address:T,statement:y,uri:k.href,version:"1",chainId:I,nonce:(r=S==null?void 0:S.signInWithEthereum)===null||r===void 0?void 0:r.nonce,issuedAt:(n=(o=S==null?void 0:S.signInWithEthereum)===null||o===void 0?void 0:o.issuedAt)!==null&&n!==void 0?n:new Date,expirationTime:(a=S==null?void 0:S.signInWithEthereum)===null||a===void 0?void 0:a.expirationTime,notBefore:(l=S==null?void 0:S.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=S==null?void 0:S.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(h=S==null?void 0:S.signInWithEthereum)===null||h===void 0?void 0:h.resources};u=Vc(W),d=await g.request({method:"personal_sign",params:[zc(u),T]})}try{const{data:v,error:b}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:u,signature:d},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:ve});if(b)throw b;if(!v||!v.session||!v.user){const y=new ft;return this._returnResult({data:{user:null,session:null},error:y})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:b})}catch(v){if($(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async signInWithSolana(e){var t,i,r,o,n,a,l,c,h,p,f,u;let d,v;if("message"in e)d=e.message,v=e.signature;else{const{chain:b,wallet:y,statement:S,options:g}=e;let k;if(G())if(typeof y=="object")k=y;else{const T=window;if("solana"in T&&typeof T.solana=="object"&&("signIn"in T.solana&&typeof T.solana.signIn=="function"||"signMessage"in T.solana&&typeof T.solana.signMessage=="function"))k=T.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(g!=null&&g.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=y}const A=new URL((t=g==null?void 0:g.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in k&&k.signIn){const T=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},g==null?void 0:g.signInWithSolana),{version:"1",domain:A.host,uri:A.href}),S?{statement:S}:null));let I;if(Array.isArray(T)&&T[0]&&typeof T[0]=="object")I=T[0];else if(T&&typeof T=="object"&&"signedMessage"in T&&"signature"in T)I=T;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in I&&"signature"in I&&(typeof I.signedMessage=="string"||I.signedMessage instanceof Uint8Array)&&I.signature instanceof Uint8Array)d=typeof I.signedMessage=="string"?I.signedMessage:new TextDecoder().decode(I.signedMessage),v=I.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");d=[`${A.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),...S?["",S,""]:[""],"Version: 1",`URI: ${A.href}`,`Issued At: ${(r=(i=g==null?void 0:g.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&r!==void 0?r:new Date().toISOString()}`,...!((o=g==null?void 0:g.signInWithSolana)===null||o===void 0)&&o.notBefore?[`Not Before: ${g.signInWithSolana.notBefore}`]:[],...!((n=g==null?void 0:g.signInWithSolana)===null||n===void 0)&&n.expirationTime?[`Expiration Time: ${g.signInWithSolana.expirationTime}`]:[],...!((a=g==null?void 0:g.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${g.signInWithSolana.chainId}`]:[],...!((l=g==null?void 0:g.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${g.signInWithSolana.nonce}`]:[],...!((c=g==null?void 0:g.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${g.signInWithSolana.requestId}`]:[],...!((p=(h=g==null?void 0:g.signInWithSolana)===null||h===void 0?void 0:h.resources)===null||p===void 0)&&p.length?["Resources",...g.signInWithSolana.resources.map(I=>`- ${I}`)]:[]].join(`
`);const T=await k.signMessage(new TextEncoder().encode(d),"utf8");if(!T||!(T instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");v=T}}try{const{data:b,error:y}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:d,signature:lt(v)},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(u=e.options)===null||u===void 0?void 0:u.captchaToken}}:null),xform:ve});if(y)throw y;if(!b||!b.session||!b.user){const S=new ft;return this._returnResult({data:{user:null,session:null},error:S})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:y})}catch(b){if($(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async _exchangeCodeForSession(e){const t=await st(this.storage,`${this.storageKey}-code-verifier`),[i,r]=(t??"").split("/");try{if(!i&&this.flowType==="pkce")throw new ac;const{data:o,error:n}=await E(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:i},xform:ve});if(await J(this.storage,`${this.storageKey}-code-verifier`),n)throw n;if(!o||!o.session||!o.user){const a=new ft;return this._returnResult({data:{user:null,session:null,redirectType:null},error:a})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",o.session)),this._returnResult({data:Object.assign(Object.assign({},o),{redirectType:r??null}),error:n})}catch(o){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(o))return this._returnResult({data:{user:null,session:null,redirectType:null},error:o});throw o}}async signInWithIdToken(e){try{const{options:t,provider:i,token:r,access_token:o,nonce:n}=e,a=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:r,access_token:o,nonce:n,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:ve}),{data:l,error:c}=a;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const h=new ft;return this._returnResult({data:{user:null,session:null},error:h})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,i,r,o,n;try{if("email"in e){const{email:a,options:l}=e;let c=null,h=null;this.flowType==="pkce"&&([c,h]=await mt(this.storage,this.storageKey));const{error:p}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:h},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:p})}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:h}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(o=l==null?void 0:l.shouldCreateUser)!==null&&o!==void 0?o:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(n=l==null?void 0:l.channel)!==null&&n!==void 0?n:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:h})}throw new ms("You must provide either an email or phone number.")}catch(a){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async verifyOtp(e){var t,i;try{let r,o;"options"in e&&(r=(t=e.options)===null||t===void 0?void 0:t.redirectTo,o=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:n,error:a}=await E(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:o}}),redirectTo:r,xform:ve});if(a)throw a;if(!n)throw new Error("An error occurred on token verification.");const l=n.session,c=n.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(r){if($(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithSSO(e){var t,i,r,o,n;try{let a=null,l=null;this.flowType==="pkce"&&([a,l]=await mt(this.storage,this.storageKey));const c=await E(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&i!==void 0?i:void 0}),!((r=e==null?void 0:e.options)===null||r===void 0)&&r.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:a,code_challenge_method:l}),headers:this.headers,xform:Ic});return!((o=c.data)===null||o===void 0)&&o.url&&G()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(a){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(a))return this._returnResult({data:null,error:a});throw a}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)throw i;if(!t)throw new oe;const{error:r}=await E(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if($(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:i,type:r,options:o}=e,{error:n}=await E(this.fetch,"POST",t,{headers:this.headers,body:{email:i,type:r,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},redirectTo:o==null?void 0:o.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:n})}else if("phone"in e){const{phone:i,type:r,options:o}=e,{data:n,error:a}=await E(this.fetch,"POST",t,{headers:this.headers,body:{phone:i,type:r,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:n==null?void 0:n.message_id},error:a})}throw new ms("You must provide either an email or phone number and a type")}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await i,await t()))();return this.pendingInLock.push((async()=>{try{await r}catch{}})()),r}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=t();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const r=[...this.pendingInLock];await Promise.all(r),this.pendingInLock.splice(0,r.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await st(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<oi:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const n=await st(this.userStorage,this.storageKey+"-user");n!=null&&n.user?e.user=n.user:e.user=li()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const n={value:this.suppressGetSessionWarning};e.user=Tc(e.user,n),n.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:r,error:o}=await this._callRefreshToken(e.refresh_token);return o?this._returnResult({data:{session:null},error:o}):this._returnResult({data:{session:r},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:He}):await this._useSession(async t=>{var i,r,o;const{data:n,error:a}=t;if(a)throw a;return!(!((i=n.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new oe}:await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(o=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&o!==void 0?o:void 0,xform:He})})}catch(t){if($(t))return ni(t)&&(await this._removeSession(),await J(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async i=>{const{data:r,error:o}=i;if(o)throw o;if(!r.session)throw new oe;const n=r.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await mt(this.storage,this.storageKey));const{data:c,error:h}=await E(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:n.access_token,xform:He});if(h)throw h;return n.user=c.user,await this._saveSession(n),await this._notifyAllSubscribers("USER_UPDATED",n),this._returnResult({data:{user:n.user},error:null})})}catch(i){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new oe;const t=Date.now()/1e3;let i=t,r=!0,o=null;const{payload:n}=vs(e.access_token);if(n.exp&&(i=n.exp,r=i<=t),r){const{data:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!a)return{data:{user:null,session:null},error:null};o=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});o={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:i-t,expires_at:i},await this._saveSession(o),await this._notifyAllSubscribers("SIGNED_IN",o)}return this._returnResult({data:{user:o.user,session:o},error:null})}catch(t){if($(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var i;if(!e){const{data:n,error:a}=t;if(a)throw a;e=(i=n.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new oe;const{data:r,error:o}=await this._callRefreshToken(e.refresh_token);return o?this._returnResult({data:{user:null,session:null},error:o}):r?this._returnResult({data:{user:r.user,session:r},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!G())throw new gs("No browser detected.");if(e.error||e.error_description||e.error_code)throw new gs(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new no("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new gs("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new no("No code detected.");const{data:S,error:g}=await this._exchangeCodeForSession(e.code);if(g)throw g;const k=new URL(window.location.href);return k.searchParams.delete("code"),window.history.replaceState(window.history.state,"",k.toString()),{data:{session:S.session,redirectType:null},error:null}}const{provider_token:i,provider_refresh_token:r,access_token:o,refresh_token:n,expires_in:a,expires_at:l,token_type:c}=e;if(!o||!a||!n||!c)throw new gs("No session defined in URL");const h=Math.round(Date.now()/1e3),p=parseInt(a);let f=h+p;l&&(f=parseInt(l));const u=f-h;u*1e3<=yt&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${u}s, should have been closer to ${p}s`);const d=f-p;h-d>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",d,f,h):h-d<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",d,f,h);const{data:v,error:b}=await this._getUser(o);if(b)throw b;const y={provider_token:i,provider_refresh_token:r,access_token:o,expires_in:p,expires_at:f,refresh_token:n,token_type:c,user:v.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:y,redirectType:e.type},error:null})}catch(i){if($(i))return this._returnResult({data:{session:null,redirectType:null},error:i});throw i}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await st(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var i;const{data:r,error:o}=t;if(o&&!ni(o))return this._returnResult({error:o});const n=(i=r.session)===null||i===void 0?void 0:i.access_token;if(n){const{error:a}=await this.admin.signOut(n,e);if(a&&!(oc(a)&&(a.status===404||a.status===401||a.status===403)||ni(a)))return this._returnResult({error:a})}return e!=="others"&&(await this._removeSession(),await J(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=fc(),i={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,i),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async t=>{var i,r;try{const{data:{session:o},error:n}=t;if(n)throw n;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",o)),this._debug("INITIAL_SESSION","callback id",e,"session",o)}catch(o){await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",o),console.error(o)}})}async resetPasswordForEmail(e,t={}){let i=null,r=null;this.flowType==="pkce"&&([i,r]=await mt(this.storage,this.storageKey,!0));try{return await E(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(o){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(o))return this._returnResult({data:null,error:o});throw o}}async getUserIdentities(){var e;try{const{data:t,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:i,error:r}=await this._useSession(async o=>{var n,a,l,c,h;const{data:p,error:f}=o;if(f)throw f;const u=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(n=e.options)===null||n===void 0?void 0:n.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await E(this.fetch,"GET",u,{headers:this.headers,jwt:(h=(c=p.session)===null||c===void 0?void 0:c.access_token)!==null&&h!==void 0?h:void 0})});if(r)throw r;return G()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(i==null?void 0:i.url),this._returnResult({data:{provider:e.provider,url:i==null?void 0:i.url},error:null})}catch(i){if($(i))return this._returnResult({data:{provider:e.provider,url:null},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var i;try{const{error:r,data:{session:o}}=t;if(r)throw r;const{options:n,provider:a,token:l,access_token:c,nonce:h}=e,p=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=o==null?void 0:o.access_token)!==null&&i!==void 0?i:void 0,body:{provider:a,id_token:l,access_token:c,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:ve}),{data:f,error:u}=p;return u?this._returnResult({data:{user:null,session:null},error:u}):!f||!f.session||!f.user?this._returnResult({data:{user:null,session:null},error:new ft}):(f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("USER_UPDATED",f.session)),this._returnResult({data:f,error:u}))}catch(r){if(await J(this.storage,`${this.storageKey}-code-verifier`),$(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var i,r;const{data:o,error:n}=t;if(n)throw n;return await E(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const i=Date.now();return await _c(async r=>(r>0&&await vc(200*Math.pow(2,r-1)),this._debug(t,"refreshing attempt",r),await E(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:ve})),(r,o)=>{const n=200*Math.pow(2,r);return o&&ai(o)&&Date.now()+n-i<yt})}catch(i){if(this._debug(t,"error",i),$(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const i=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",i),G()&&!t.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i},error:null}}async _recoverAndRefresh(){var e,t;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const r=await st(this.storage,this.storageKey);if(r&&this.userStorage){let n=await st(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!n&&(n={user:r.user},await wt(this.userStorage,this.storageKey+"-user",n)),r.user=(e=n==null?void 0:n.user)!==null&&e!==void 0?e:li()}else if(r&&!r.user&&!r.user){const n=await st(this.storage,this.storageKey+"-user");n&&(n!=null&&n.user)?(r.user=n.user,await J(this.storage,this.storageKey+"-user"),await wt(this.storage,this.storageKey,r)):r.user=li()}if(this._debug(i,"session from storage",r),!this._isValidSession(r)){this._debug(i,"session is not valid"),r!==null&&await this._removeSession();return}const o=((t=r.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<oi;if(this._debug(i,`session has${o?"":" not"} expired with margin of ${oi}s`),o){if(this.autoRefreshToken&&r.refresh_token){const{error:n}=await this._callRefreshToken(r.refresh_token);n&&(console.error(n),ai(n)||(this._debug(i,"refresh failed with a non-retryable error, removing the session",n),await this._removeSession()))}}else if(r.user&&r.user.__isUserNotAvailableProxy===!0)try{const{data:n,error:a}=await this._getUser(r.access_token);!a&&(n!=null&&n.user)?(r.user=n.user,await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(n){console.error("Error getting user data:",n),this._debug(i,"error getting user data, skipping SIGNED_IN notification",n)}else await this._notifyAllSubscribers("SIGNED_IN",r)}catch(r){this._debug(i,"error",r),console.error(r);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var t,i;if(!e)throw new oe;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const r=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(r,"begin");try{this.refreshingDeferred=new Bs;const{data:o,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!o.session)throw new oe;await this._saveSession(o.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",o.session);const a={data:o.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(o){if(this._debug(r,"error",o),$(o)){const n={data:null,error:o};return ai(o)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(n),n}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(o),o}finally{this.refreshingDeferred=null,this._debug(r,"end")}}async _notifyAllSubscribers(e,t,i=!0){const r=`#_notifyAllSubscribers(${e})`;this._debug(r,"begin",t,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:t});const o=[],n=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){o.push(l)}});if(await Promise.all(n),o.length>0){for(let a=0;a<o.length;a+=1)console.error(o[a]);throw o[0]}}finally{this._debug(r,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await J(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),i=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&t.user&&await wt(this.userStorage,this.storageKey+"-user",{user:t.user});const r=Object.assign({},t);delete r.user;const o=uo(r);await wt(this.storage,this.storageKey,o)}else{const r=uo(t);await wt(this.storage,this.storageKey,r)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await J(this.storage,this.storageKey),await J(this.storage,this.storageKey+"-code-verifier"),await J(this.storage,this.storageKey+"-user"),this.userStorage&&await J(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&G()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),yt);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((i.expires_at*1e3-e)/yt);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${yt}ms, refresh threshold is ${Ci} ticks`),r<=Ci&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof bn)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!G()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,i){const r=[`provider=${encodeURIComponent(t)}`];if(i!=null&&i.redirectTo&&r.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),i!=null&&i.scopes&&r.push(`scopes=${encodeURIComponent(i.scopes)}`),this.flowType==="pkce"){const[o,n]=await mt(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(o)}`,code_challenge_method:`${encodeURIComponent(n)}`});r.push(a.toString())}if(i!=null&&i.queryParams){const o=new URLSearchParams(i.queryParams);r.push(o.toString())}return i!=null&&i.skipBrowserRedirect&&r.push(`skip_http_redirect=${i.skipBrowserRedirect}`),`${e}?${r.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var i;const{data:r,error:o}=t;return o?this._returnResult({data:null,error:o}):await E(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var i,r;const{data:o,error:n}=t;if(n)return this._returnResult({data:null,error:n});const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await E(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(i=o==null?void 0:o.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((r=l==null?void 0:l.totp)===null||r===void 0)&&r.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var i;const{data:r,error:o}=t;if(o)return this._returnResult({data:null,error:o});const n=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Jc(e.webauthn.credential_response):Gc(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:l}=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:n,headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",a),this._returnResult({data:a,error:l}))})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var i;const{data:r,error:o}=t;if(o)return this._returnResult({data:null,error:o});const n=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token});if(n.error)return n;const{data:a}=n;if(a.type!=="webauthn")return{data:a,error:null};switch(a.webauthn.type){case"create":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Wc(a.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Kc(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:i}=await this.getUser();if(i)return{data:null,error:i};const r={all:[],phone:[],totp:[],webauthn:[]};for(const o of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])r.all.push(o),o.status==="verified"&&r[o.factor_type].push(o);return{data:r,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,i,r,o;if(e)try{const{payload:u}=vs(e);let d=null;u.aal&&(d=u.aal);let v=d;const{data:{user:b},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((i=(t=b==null?void 0:b.factors)===null||t===void 0?void 0:t.filter(k=>k.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(v="aal2");const g=u.amr||[];return{data:{currentLevel:d,nextLevel:v,currentAuthenticationMethods:g},error:null}}catch(u){if($(u))return this._returnResult({data:null,error:u});throw u}const{data:{session:n},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!n)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=vs(n.access_token);let c=null;l.aal&&(c=l.aal);let h=c;((o=(r=n.user.factors)===null||r===void 0?void 0:r.filter(u=>u.status==="verified"))!==null&&o!==void 0?o:[]).length>0&&(h="aal2");const f=l.amr||[];return{data:{currentLevel:c,nextLevel:h,currentAuthenticationMethods:f},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;return r?this._returnResult({data:null,error:r}):i?await E(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:o=>({data:o,error:null})}):this._returnResult({data:null,error:new oe})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:r},error:o}=i;if(o)return this._returnResult({data:null,error:o});if(!r)return this._returnResult({data:null,error:new oe});const n=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"approve"},xform:a=>({data:a,error:null})});return n.data&&n.data.redirect_url&&G()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if($(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:r},error:o}=i;if(o)return this._returnResult({data:null,error:o});if(!r)return this._returnResult({data:null,error:new oe});const n=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"deny"},xform:a=>({data:a,error:null})});return n.data&&n.data.redirect_url&&G()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if($(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;return i?this._returnResult({data:null,error:i}):t?await E(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:r=>({data:r,error:null})}):this._returnResult({data:null,error:new oe})})}catch(e){if($(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;return r?this._returnResult({data:null,error:r}):i?(await E(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new oe})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let i=t.keys.find(a=>a.kid===e);if(i)return i;const r=Date.now();if(i=this.jwks.keys.find(a=>a.kid===e),i&&this.jwks_cached_at+ic>r)return i;const{data:o,error:n}=await E(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(n)throw n;return!o.keys||o.keys.length===0||(this.jwks=o,this.jwks_cached_at=r,i=o.keys.find(a=>a.kid===e),!i)?null:i}async getClaims(e,t={}){try{let i=e;if(!i){const{data:u,error:d}=await this.getSession();if(d||!u.session)return this._returnResult({data:null,error:d});i=u.session.access_token}const{header:r,payload:o,signature:n,raw:{header:a,payload:l}}=vs(i);t!=null&&t.allowExpired||xc(o.exp);const c=!r.alg||r.alg.startsWith("HS")||!r.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(r.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:u}=await this.getUser(i);if(u)throw u;return{data:{claims:o,header:r,signature:n},error:null}}const h=Ec(r.alg),p=await crypto.subtle.importKey("jwk",c,h,!0,["verify"]);if(!await crypto.subtle.verify(h,p,n,uc(`${a}.${l}`)))throw new Ri("Invalid JWT signature");return{data:{claims:o,header:r,signature:n},error:null}}catch(i){if($(i))return this._returnResult({data:null,error:i});throw i}}}rs.nextInstanceID={};const rd=rs,od="2.99.1";let qt="";typeof Deno<"u"?qt="deno":typeof document<"u"?qt="web":typeof navigator<"u"&&navigator.product==="ReactNative"?qt="react-native":qt="node";const nd={"X-Client-Info":`supabase-js-${qt}/${od}`},ad={headers:nd},ld={schema:"public"},cd={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},dd={};function os(s){"@babel/helpers - typeof";return os=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},os(s)}function hd(s,e){if(os(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(os(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function ud(s){var e=hd(s,"string");return os(e)=="symbol"?e:e+""}function pd(s,e,t){return(e=ud(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function bo(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function V(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?bo(Object(t),!0).forEach(function(i){pd(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):bo(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}const fd=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),md=()=>Headers,gd=(s,e,t)=>{const i=fd(t),r=md();return async(o,n)=>{var a;const l=(a=await e())!==null&&a!==void 0?a:s;let c=new r(n==null?void 0:n.headers);return c.has("apikey")||c.set("apikey",s),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),i(o,V(V({},n),{},{headers:c}))}};function vd(s){return s.endsWith("/")?s:s+"/"}function _d(s,e){var t,i;const{db:r,auth:o,realtime:n,global:a}=s,{db:l,auth:c,realtime:h,global:p}=e,f={db:V(V({},l),r),auth:V(V({},c),o),realtime:V(V({},h),n),storage:{},global:V(V(V({},p),a),{},{headers:V(V({},(t=p==null?void 0:p.headers)!==null&&t!==void 0?t:{}),(i=a==null?void 0:a.headers)!==null&&i!==void 0?i:{})}),accessToken:async()=>""};return s.accessToken?f.accessToken=s.accessToken:delete f.accessToken,f}function bd(s){const e=s==null?void 0:s.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(vd(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var yd=class extends rd{constructor(s){super(s)}},wd=class{constructor(s,e,t){var i,r;this.supabaseUrl=s,this.supabaseKey=e;const o=bd(s);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const n=`sb-${o.hostname.split(".")[0]}-auth-token`,a={db:ld,realtime:dd,auth:V(V({},cd),{},{storageKey:n}),global:ad},l=_d(t??{},a);if(this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=l.global.headers)!==null&&r!==void 0?r:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(h,p)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=gd(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(V({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(h=>this.realtime.setAuth(h)).catch(h=>console.warn("Failed to set initial Realtime auth token:",h)),this.rest=new ol(new URL("rest/v1",o).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Xl(this.storageUrl.href,this.headers,this.fetch,t==null?void 0:t.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Za(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(s){return this.rest.from(s)}schema(s){return this.rest.schema(s)}rpc(s,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(s,e,t)}channel(s,e={config:{}}){return this.realtime.channel(s,e)}getChannels(){return this.realtime.getChannels()}removeChannel(s){return this.realtime.removeChannel(s)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var s=this,e,t;if(s.accessToken)return await s.accessToken();const{data:i}=await s.auth.getSession();return(e=(t=i.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:s.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:s,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:r,storageKey:o,flowType:n,lock:a,debug:l,throwOnError:c},h,p){const f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new yd({url:this.authUrl.href,headers:V(V({},f),h),storageKey:o,autoRefreshToken:s,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:r,flowType:n,lock:a,debug:l,throwOnError:c,fetch:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(u=>u.toLowerCase()==="authorization")})}_initRealtimeClient(s){return new Sl(this.realtimeUrl.href,V(V({},s),{},{params:V(V({},{apikey:this.supabaseKey}),s==null?void 0:s.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((s,e)=>{this._handleTokenChanged(s,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(s,e,t){(s==="TOKEN_REFRESHED"||s==="SIGNED_IN")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):s==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Sd=(s,e,t)=>new wd(s,e,t);function kd(){if(typeof window<"u")return!1;const s=globalThis.process;if(!s)return!1;const e=s.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=18:!1}kd()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const ke=Sd("https://wasdctencljkzoefqznp.supabase.co","sb_publishable_y5Zitl8WdJZIQzf95Vi8XA_K1jYgB3E"),Sn="loopllama-v2";function yo(s){return"version"in s&&((s.version??1)<2&&(s.title&&(s.name=s.title),delete s.title),delete s.version),delete s.schema_version,s.id&&(s.url=gr(s.id)),s}function yr(s){if("version"in s){if(s.version||(s.version=1),s.version<2){for(const e of s.videos??[])(e.version??1)<2&&(e.title&&(e.name=e.title),delete e.title,e.version=2);s.version=2}if(s.version<3){const e=s.options??{};"section_loop_pad_start"in e&&(e.loop_pad_start=e.section_loop_pad_start,delete e.section_loop_pad_start),"section_loop_pad_end"in e&&(e.loop_pad_end=e.section_loop_pad_end,delete e.section_loop_pad_end),s.version=3}if(s.version<4){for(const e of s.videos??[]){for(const t of e.sections??[])"time"in t&&(t.start=t.time,delete t.time),delete t.chapterId;for(const t of e.marks??[])delete t.chapterId;for(const t of e.loops??[])delete t.chapterId}s.version=4}for(const e of s.videos??[])yo(e);s.schema_version=5,delete s.version}if((s.schema_version??0)<6){for(const e of s.videos??[])"last_modified"in e||(e.last_modified=0),e.schema_version=6;s.schema_version=6}if((s.schema_version??0)<7&&(s.options||(s.options={}),"cloud_backup"in s.options||(s.options.cloud_backup=s.ever_logged_in===!0),delete s.ever_logged_in,s.schema_version=7),(s.schema_version??0)<8){for(const e of s.videos??[])delete e.schema_version;s.schema_version=8}if((s.schema_version??0)<9&&(s.stashes||(s.stashes={}),s.schema_version=9),(s.schema_version??0)<10){for(const e of s.videos??[])e.url=gr(e.id);s.schema_version=10}if((s.schema_version??0)<11){for(const e of s.videos??[]){const t=(e.loops??[]).findIndex(r=>r.is_scratch),i=t!==-1?e.loops[t]:null;e.scratchLoop={start:(i==null?void 0:i.start)??0,end:(i==null?void 0:i.end)??0,looping:e.looping??!1,sourceId:null,sourceType:null},t!==-1&&e.loops.splice(t,1),delete e.looping;for(const r of e.loops??[])delete r.source,delete r.is_scratch}s.schema_version=11}for(const e of s.videos??[])yo(e);return s}function $d(s){const{id:e,url:t,name:i,last_modified:r,duration:o,time:n,start:a,end:l,speed:c,seek_delta:h,nudge_delta:p,entity_type:f,zone2_mode:u,last_opened:d,scratchLoop:v,chapters:b,sections:y,loops:S,marks:g,jumps:k}=s,A=new Set(["id","url","name","last_modified","duration","time","start","end","speed","seek_delta","nudge_delta","entity_type","zone2_mode","last_opened","scratchLoop","chapters","sections","loops","marks","jumps","schema_version","version"]),T=Object.fromEntries(Object.entries(s).filter(([I])=>!A.has(I)));return{id:e,url:t,name:i,last_modified:r,duration:o,time:n,start:a,end:l,speed:c,seek_delta:h,nudge_delta:p,entity_type:f,zone2_mode:u,last_opened:d,scratchLoop:v,...T,chapters:b,sections:y,loops:S,marks:g,jumps:k}}function xd(s){const{schema_version:e,currentVideoId:t,options:i,videos:r}=s,o=new Set(["schema_version","currentVideoId","options","videos","stashes"]),n=Object.fromEntries(Object.entries(s).filter(([a])=>!o.has(a)));return{schema_version:e,currentVideoId:t,...n,options:i,videos:(r??[]).map($d)}}function Ed(){const s=localStorage.getItem(Sn);if(!s)return null;try{const e=JSON.parse(s),t=e.schema_version??e.version;return yr(e),e.schema_version!==t&&(console.log(`LoopLlama: migrated stored data from schema v${t} to v${e.schema_version}`),kn(e)),e}catch(e){return console.error("LoopLlama: failed to parse stored data",e),null}}function kn(s){localStorage.setItem(Sn,JSON.stringify(s))}function $n(s){const e=xd(s);return JSON.stringify({app_version:Ta,build_num:Ka,...e},null,2)}async function di(s){try{const{data:e,error:t}=await ke.from("users").select("app_state").eq("id",s).maybeSingle();if(t)throw t;const i=(e==null?void 0:e.app_state)??null;return i&&yr(i),i}catch(e){return console.error("LoopLlama: loadFromCloud failed",e),!1}}async function Cd(s,e){try{const{error:t}=await ke.from("users").upsert({id:e,app_state:s});if(t)throw t;return!0}catch(t){return console.error("LoopLlama: saveToCloud failed",t),!1}}async function Td(s){try{const{error:e}=await ke.from("users").delete().eq("id",s);if(e)throw e}catch(e){console.error("LoopLlama: deleteFromCloud failed",e)}}function Ad(s){const e=JSON.parse(s);let t;if(Array.isArray(e.videos))t=e.videos;else if(e.id&&typeof e.id=="string")t=[e];else throw new Error("Unrecognized format: expected a LoopLlama export.");const i="version"in e?{version:e.version??1,options:e.options??{},videos:t}:{schema_version:e.schema_version??0,options:{},videos:t};return yr(i),i.videos}function _s(s,e){const t=new Map(e.map(c=>[c.id,c])),i=new Set(s.map(c=>c.id)),r=[],o=[],n=[],a=[],l=[];for(const c of s){const h=t.get(c.id);h?(c.last_modified??0)>(h.last_modified??0)?o.push(c):(h.last_modified??0)>(c.last_modified??0)?a.push(h):l.push(c):r.push(c)}for(const c of e)i.has(c.id)||n.push(c);return{srcOnly:r,srcNewer:o,destOnly:n,destNewer:a,same:l}}function Rd(){const s="ll_client_id";let e=localStorage.getItem(s);return e||(e=crypto.randomUUID(),localStorage.setItem(s,e)),e}function Od(){const s="ll_session_id";let e=sessionStorage.getItem(s);return e||(e=crypto.randomUUID(),sessionStorage.setItem(s,e)),e}async function xn(s,e={}){const t={event_type:s,session_id:Od(),...e},{error:i}=await ke.from("events").insert(t);i&&console.warn("analytics logEvent failed:",i.message)}function Id(){xn("session_start",{client_id:Rd()})}function En(s){xn("video_load",{video_id:s})}function Ld(){return ke.auth.signInWithOAuth({provider:"google",options:{redirectTo:Tn()}})}function Pd(){return ke.auth.signInWithOAuth({provider:"github",options:{redirectTo:Tn()}})}function Cn(){return ke.auth.signOut()}async function Dd(){const{data:{session:s}}=await ke.auth.getSession();return(s==null?void 0:s.user)??null}function Nd(s){const{data:{subscription:e}}=ke.auth.onAuthStateChange((t,i)=>s((i==null?void 0:i.user)??null));return()=>e.unsubscribe()}function Tn(){const s=new URL(window.location.href);return s.search="",s.hash="",s.toString()}const Md="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let jd=(s=21)=>{let e="",t=crypto.getRandomValues(new Uint8Array(s|=0));for(;s--;)e+=Md[t[s]&63];return e};function wo(s){const e=new URL(window.location.href);return e.search="",e.hash="",e.searchParams.set("share",s),e.toString()}function Ud(){return new URLSearchParams(window.location.search).get("share")}function zd(s){const e=s.scratchLoop;return{schema_version:fr,videoUrl:s.url,videoTitle:s.name||null,sections:s.sections,namedLoops:s.loops,marks:s.marks,chapters:s.chapters,speed:s.speed,start:s.start,end:s.end,looping:(e==null?void 0:e.looping)??!1,scratchLoop:e?{start:e.start,end:e.end}:null,last_modified:s.last_modified??null}}function Vd(s,e,t,i=""){return{schema_version:fr,videoUrl:s.url,videoTitle:s.name||null,loop:{name:i,start:e,end:t},speed:s.speed}}async function So(s,e,t=null,i=null){const r=jd(10),o={id:r,share_type:s,payload:e,video_url:t,video_title:i},{error:n}=await ke.from("shares").insert(o);if(n)throw new Error(`createShare failed: ${n.message}`);return r}async function Bd(s){const{data:e,error:t}=await ke.from("shares").select("*").eq("id",s).single();if(t)throw new Error(`fetchShare failed: ${t.message}`);return e}class Fd{constructor(e){this._app=e,this._dataOpResolve=null,this._sharedVideoConflictResolve=null}async dataCompare(){var p,f;const e=this._app,t=(p=e.currentUser)==null?void 0:p.id;if(!t){e._setWarning("Cannot compare local and cloud data: you must be signed in.");return}const i=await di(t);if(i===!1){e._setError("Cannot compare local and cloud data: cloud request failed.");return}const r=(i==null?void 0:i.videos)??[],{srcOnly:o,srcNewer:n,destOnly:a,destNewer:l,same:c}=_s(e._appState.videos,r),h=u=>u.name||u.id;(f=e._cloudStatusModalEl)==null||f.show({localOnly:o.map(h),localNewer:n.map(h),cloudOnly:a.map(h),cloudNewer:l.map(h),same:c.map(h)})}async dataSave(){var S;const e=this._app,t=(S=e.currentUser)==null?void 0:S.id;if(!t){e._setWarning("Cannot save data to cloud: you must be signed in.");return}const i=await di(t);if(i===!1){e._setError("Cannot save data to cloud: cloud request failed.");return}const r=(i==null?void 0:i.videos)??[],o=new Map(r.map(g=>[g.id,g])),n=new Map(e._appState.videos.map(g=>[g.id,g])),{srcOnly:a,srcNewer:l,destOnly:c,destNewer:h,same:p}=_s(e._appState.videos,r),f=await this._showDataOp({operation:"cloud save",srcLabel:"Library",destLabel:"Cloud",srcOnly:a.map(g=>g.name||g.id),srcNewer:l.map(g=>g.name||g.id),destOnly:c.map(g=>g.name||g.id),destNewer:h.map(g=>g.name||g.id),same:p.map(g=>g.name||g.id)});if(f===null)return;const u=[];for(const g of o.values()){const k=n.get(g.id);if(!k)f.deleteDestOnly||u.push(g);else{const A=g.last_modified??0,T=k.last_modified??0;A>T?f.replaceDestNewer?u.push(k):u.push(g):T>A?f.replaceSrcNewer?u.push(k):u.push(g):f.replaceSame?u.push(k):u.push(g)}}for(const g of a)f.addSrcOnly&&u.push(g);const{stashes:d,...v}=e._appState,b={...v,videos:u};await Cd(b,t)?e.statusMsg="Data: saved to cloud.":e._setError("Cannot save data to cloud: cloud request failed.")}async dataRead(){var f;const e=this._app,t=(f=e.currentUser)==null?void 0:f.id;if(!t){e._setWarning("Cannot read data from cloud: you must be signed in.");return}const i=await di(t);if(i===!1){e._setError("Cannot read data from cloud: cloud request failed.");return}if(!i){e._setWarning("Cannot read data from cloud: no cloud data found.");return}const r=i.videos??[],{srcOnly:o,srcNewer:n,destOnly:a,destNewer:l,same:c}=_s(r,e._appState.videos),h=await this._showDataOp({operation:"cloud read",srcLabel:"Cloud",destLabel:"Library",srcOnly:o.map(u=>u.name||u.id),srcNewer:n.map(u=>u.name||u.id),destOnly:a.map(u=>u.name||u.id),destNewer:l.map(u=>u.name||u.id),same:c.map(u=>u.name||u.id)});if(h===null)return;this._mergeIncomingVideos({srcOnly:o,srcNewer:n,destOnly:a,destNewer:l,same:c},h,r);const p=e._appState.videos.find(u=>u.id===e.currentVideoId);p&&(e._undoMgr.clear(),e._syncFromVideo(p)),e._save(),e.videos=[...e._appState.videos],e.stashes={...e._appState.stashes},e.statusMsg="Data: read from cloud."}exportAll(){const e=this._app;e._saveCurrentState();const t=new Date,i=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;Wd($n(e._appState),`loopllama-${i}.json`),e.statusMsg="Data: exported."}async createVideoShare(){const e=this._app;if(!e.currentVideoId){e._setWarning("No current video.");return}e._saveCurrentState();const t=e._appState.videos.find(r=>r.id===e.currentVideoId),i=zd(t);try{const r=await So("video",i,t.url,t.name||null),o=wo(r);navigator.clipboard.writeText(o).then(()=>{e.statusMsg="Shared video: URL copied to clipboard."}).catch(()=>{e._setError("Cannot provide shared video URL: clipboard blocked.")})}catch(r){e.errorMsg=`Cannot provide shared video URL: ${r.message}.`}}async createLoopShare(){const e=this._app;if(!e.currentVideoId){e._setWarning("No current video.");return}if(!(e.loopStart<e.loopEnd)){e._setWarning("Cannot provide shared scratch loop URL: invalid range.");return}e._saveCurrentState();const t=e._appState.videos.find(r=>r.id===e.currentVideoId),i=Vd(t,e.loopStart,e.loopEnd);try{const r=await So("loop",i,t.url,t.name||null),o=wo(r);navigator.clipboard.writeText(o).then(()=>{e.statusMsg="Shared scratch loop: URL copied to clipboard."}).catch(()=>{e._setError("Cannot provide shared scratch loop URL: clipboard blocked.")})}catch(r){e.errorMsg=`Cannot provide shared scratch loop URL: ${r.message}.`}}onFileImport(e){var r;const t=(r=e.target.files)==null?void 0:r[0];if(!t)return;e.target.value="";const i=new FileReader;i.onload=async o=>{await this.importFromJson(o.target.result)},i.readAsText(t)}async importFromJson(e){const t=this._app;let i;try{i=Ad(e)}catch(f){t.errorMsg=`Cannot import data: ${f.message}.`;return}const r=i.filter(f=>f.id),{srcOnly:o,srcNewer:n,destOnly:a,destNewer:l,same:c}=_s(r,t._appState.videos),h=await this._showDataOp({operation:"import data",srcLabel:"File",destLabel:"Library",srcOnly:o.map(f=>f.name||f.id),srcNewer:n.map(f=>f.name||f.id),destOnly:a.map(f=>f.name||f.id),destNewer:l.map(f=>f.name||f.id),same:c.map(f=>f.name||f.id)});if(h===null)return;this._mergeIncomingVideos({srcOnly:o,srcNewer:n,destOnly:a,destNewer:l,same:c},h,r),t.videos=[...t._appState.videos],t.stashes={...t._appState.stashes};const p=t._appState.videos.find(f=>f.id===t.currentVideoId);p&&(t._undoMgr.clear(),t._syncFromVideo(p)),t._save(),t.statusMsg="Data: imported."}_mergeIncomingVideos(e,t,i=[]){const r=this._app,{srcOnly:o,srcNewer:n,destOnly:a,destNewer:l,same:c}=e,h=new Map(i.map(u=>[u.id,u]));if(t.deleteDestOnly){const u=new Set(a.map(d=>d.id));r._appState.videos=r._appState.videos.filter(d=>!u.has(d.id))}const p=new Map(r._appState.videos.map((u,d)=>[u.id,{v:u,i:d}]));if(t.addSrcOnly)for(const u of o)r._appState.videos.push(u);const f=[{bucket:n,flag:t.replaceSrcNewer},{bucket:l,flag:t.replaceDestNewer},{bucket:c,flag:t.replaceSame}];for(const{bucket:u,flag:d}of f)if(d)for(const v of u){const b=h.get(v.id)??v,y=p.get(v.id);y&&(r._appState.stashes[y.v.id]=JSON.parse(JSON.stringify(y.v)),r._appState.videos[y.i]=b)}}_showSharedVideoConflict(e){return new Promise(t=>{var i;this._sharedVideoConflictResolve=t,(i=this._app._sharedVideoConflictModalEl)==null||i.show(e)})}onShareConflictReplace(){var e;(e=this._sharedVideoConflictResolve)==null||e.call(this,!0),this._sharedVideoConflictResolve=null}onShareConflictSkip(){var e;(e=this._sharedVideoConflictResolve)==null||e.call(this,!1),this._sharedVideoConflictResolve=null}_showDataOp(e){return new Promise(t=>{var i;this._dataOpResolve=t,(i=this._app._dataOpModalEl)==null||i.show(e)})}onDataOpResult(e){var t;(t=this._dataOpResolve)==null||t.call(this,e.detail),this._dataOpResolve=null}applyLoopShare(e){const t=this._app,{videoUrl:i,videoTitle:r,loop:o,speed:n}=e,a=Oi(i);if(!a){t.errorMsg="Invalid URL: shared loop.";return}let l=t._appState.videos.find(p=>p.id===a.id);l||(l=$s(i,a.id),r&&(l.name=r),t._appState.videos.push(l),t.videos=[...t._appState.videos]);const c=Hd(l.loops,o.name||""),h=on(l.loops,o.start,o.end,c);t._appState.currentVideoId=l.id,t.currentVideoId=l.id,t._undoMgr.clear(),t._syncFromVideo(l),t.loopStart=o.start,t.loopEnd=o.end,t.loopSrc={id:h.id,label:c||null,type:"loop",start:o.start,end:o.end},t.looping=!0,n&&t._vc.setPlaybackRate(n),t._vc.cueVideo(l.id,o.start),t._save(),t.statusMsg="Shared loop: loaded."}async applyVideoShare(e){const t=this._app,{videoUrl:i,videoTitle:r,sections:o,namedLoops:n,marks:a,chapters:l,speed:c,start:h,end:p}=e,f=Oi(i);if(!f){t.errorMsg="Invalid URL: shared video.";return}const u=r||f.id;let d=t._appState.videos.find(g=>g.id===f.id);if(d){if(!await this._showSharedVideoConflict({videoName:u,localModified:d.last_modified??null,sharedModified:e.last_modified??null}))return!1;t._appState.stashes[d.id]=JSON.parse(JSON.stringify(d)),t.stashes={...t._appState.stashes}}else d=$s(i,f.id),t._appState.videos.push(d);r&&(d.name=r),d.sections=o??[],d.marks=a??[],d.chapters=l??[],d.speed=c??1,d.start=h??0,d.end=p??null;const v=e.scratchLoop??{},b=v.start??0,y=v.end??0;d.scratchLoop={start:b,end:y,looping:!!(e.looping&&b<y),sourceId:null,sourceType:null},d.loops=[...n??[]],t.videos=[...t._appState.videos],d.last_opened=Date.now(),t._appState.currentVideoId=d.id,t.currentVideoId=d.id,t._undoMgr.clear(),t._syncFromVideo(d);const S=t.looping&&t.loopStart<t.loopEnd?t.loopStart:0;return t._vc.cueVideo(d.id,S),t.duration=null,t._save(),En(d.id),t.statusMsg="Shared video: loaded.",!0}async handleStartupShare(){const e=this._app,t=Ud();if(t){let i=!1;try{const o=await Bd(t);o.share_type==="loop"&&(this.applyLoopShare(o.payload),i=!0),o.share_type==="video"&&(i=await this.applyVideoShare(o.payload)??!1)}catch(o){e.errorMsg=`Could not load share URL: ${o.message}.`}const r=new URL(window.location.href);return r.searchParams.delete("share"),history.replaceState(null,"",r.toString()),i}return this.handleStartupUrlParams()}handleStartupUrlParams(){const e=this._app,t=new URLSearchParams(window.location.search),i=t.get("v"),r=parseFloat(t.get("s")),o=parseFloat(t.get("e"));if(!i||isNaN(r)||isNaN(o)||r>=o)return!1;let n=e._appState.videos.find(l=>l.id===i);n||(n=$s(i,i),e._appState.videos.push(n),e.videos=[...e._appState.videos]),e._appState.currentVideoId=n.id,e.currentVideoId=n.id,e._syncFromVideo(n),e.loopStart=r,e.loopEnd=o,e._vc.cueVideo(n.id,r),e.statusMsg="Shared loop: loaded.",e._save();const a=new URL(window.location.href);return a.searchParams.delete("v"),a.searchParams.delete("s"),a.searchParams.delete("e"),history.replaceState(null,"",a.toString()),!0}async handleSignIn(e){const t=this._app;t._appState.options.cloud_backup=!0,t._save(),t.statusMsg="Signed in."}async signOutAndRemoveCloudData(){var i;const e=this._app,t=(i=e.currentUser)==null?void 0:i.id;if(e._skipSignOutMsg=!0,t)try{await Td(t),e.statusMsg="Cloud data: deleted."}catch(r){e._setError(`Cannot delete cloud data: ${r.message}.`)}e._appState.options.cloud_backup=!1,e._save(),await Cn()}}function Oi(s){if(s=s.trim(),!s)return null;if(/^[A-Za-z0-9_-]{11}$/.test(s))return{id:s,startTime:0};let e;try{e=new URL(s.startsWith("http")?s:"https://"+s)}catch{return null}const t=e.searchParams,i=qd(t.get("t")??"");let r=t.get("v")??null;if(!r){const o=e.pathname.split("/").filter(Boolean);r=o[o.length-1]??null}return r?{id:r,startTime:i}:null}function qd(s){if(!s)return 0;const e=Number(s);if(!isNaN(e))return e;let t=0;const i=s.match(/(\d+)h/),r=s.match(/(\d+)m/),o=s.match(/(\d+(?:\.\d+)?)s/);return i&&(t+=parseInt(i[1])*3600),r&&(t+=parseInt(r[1])*60),o&&(t+=parseFloat(o[1])),t}function Hd(s,e){const t=s.map(r=>r.name);if(!t.includes(e))return e;const i=e?`${e} (shared)`:"(shared)";if(!t.includes(i))return i;for(let r=2;r<=99;r++){const o=e?`${e} (shared #${r})`:`(shared #${r})`;if(!t.includes(o))return o}return i}function Wd(s,e){const t=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=e,r.click(),URL.revokeObjectURL(i)}function xe(s){if(s==null||isNaN(s))return"";const e=Math.round(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function z(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Kd({onReady:s,onStateChange:e,onError:t}={}){let i=null,r=!1;function o(){return new Promise(g=>{var A;if((A=window.YT)!=null&&A.Player){g();return}window.onYouTubeIframeAPIReady=g;const k=document.createElement("script");k.src="https://www.youtube.com/iframe_api",document.head.appendChild(k)})}async function n(g){return await o(),new Promise(k=>{i=new YT.Player(g,{width:"100%",height:"100%",events:{onReady:()=>{s==null||s(),k()},onError:A=>{t==null||t(A.data)},onStateChange:A=>{!r&&(A.data===YT.PlayerState.PLAYING||A.data===YT.PlayerState.CUED)&&(r=!0),e==null||e(A.data)}}})})}function a(g,k=0){r=!1,i.loadVideoById({videoId:g,startSeconds:k})}function l(g,k=0){r=!1,i.cueVideoById({videoId:g,startSeconds:k})}function c(){i.playVideo()}function h(){i.pauseVideo()}function p(){i.stopVideo()}function f(g){i.seekTo(g,!0)}function u(){return i.getCurrentTime()??0}function d(){return r?i.getDuration():null}function v(){return(i==null?void 0:i.getPlayerState())===YT.PlayerState.PLAYING}function b(g){i.setPlaybackRate(g)}function y(){return i.getPlaybackRate()}function S(){var g;return((g=i==null?void 0:i.getVideoData())==null?void 0:g.title)??null}return{initialize:n,loadVideo:a,cueVideo:l,play:c,pause:h,stop:p,seekTo:f,getCurrentTime:u,getDuration:d,isPlaying:v,setPlaybackRate:b,getPlaybackRate:y,getVideoTitle:S}}const Ii={" ":{handler:"playPause",desc:"Play/pause"},"-":{handler:"speedDown",desc:"Speed: slower"},"=":{handler:"speedUp",desc:"Speed: faster"},Backspace:{handler:"speedReset",desc:"Reset speed"},ArrowRight:{handler:"seekForward",desc:"Seek forward"},ArrowLeft:{handler:"seekBack",desc:"Seek backward"},ArrowDown:{handler:"seekDeltaDown",desc:"Seek delta: reduce"},ArrowUp:{handler:"seekDeltaUp",desc:"Seek delta: increase"},",":{handler:"prevEntity",desc:"Previous entity"},"/":{handler:"entityType",desc:"Entity type dropdown"},".":{handler:"nextEntity",desc:"Next entity"},Enter:{handler:"jumpToStart",desc:"Jump to start"},y:{handler:"videoUrl",desc:"Switch to YouTube URL (synonym: vl)"},"\\":{handler:"editScratch",desc:"Edit scratch loop (synonym: xe)"},u:{handler:"undo",desc:"Undo (synonym: au)"},U:{handler:"redo",desc:"Redo (synonym: ar)"},t:{handler:"toggleZone2",desc:"Toggle timeline (synonym: at)"},o:{handler:"options",desc:"Options (synonym: ao)"},z:{handler:"zoomOff",desc:"Zoom off (synonym: az)"},"[":{completions:{"[":{handler:"setLoopStart",desc:"Set now"},Backspace:{handler:"resetLoopStart",desc:"Reset"},"\\":{handler:"focusLoopStart",desc:"Edit"},"-":{handler:"nudgeStartDown",desc:"Nudge decrease"},"=":{handler:"nudgeStartUp",desc:"Nudge increase"},"]":{handler:"focusLoopNudgeDelta",desc:"Nudge dropdown"}}},"]":{completions:{"]":{handler:"setLoopEnd",desc:"Set now"},Backspace:{handler:"resetLoopEnd",desc:"Reset"},"\\":{handler:"focusLoopEnd",desc:"Edit"},"-":{handler:"nudgeEndDown",desc:"Nudge decrease"},"=":{handler:"nudgeEndUp",desc:"Nudge increase"},"[":{handler:"focusLoopNudgeDelta",desc:"Nudge dropdown"}}},v:{completions:{l:{handler:"videoUrl",desc:"Load URL"},o:{handler:"videoPickerRecent",desc:"Open"},v:{handler:"videoPickerRecent",desc:"Open"},e:{handler:"editVideo",desc:"Edit"},x:{handler:"scratchVideo",desc:"Scratch"},z:{handler:"zoomVideo",desc:"Zoom"},d:{handler:"deleteVideo",desc:"Delete"},u:{handler:"restoreVideo",desc:"Unstash"},i:{handler:"videoInfo",desc:"Info"}}},j:{completions:{j:{handler:"jumpTime",desc:"Jump by time"},h:{handler:"jumpHistory",desc:"Jump history"},b:{handler:"jumpBack",desc:"Back"},f:{handler:"jumpForward",desc:"Forward"}}},l:{completions:{l:{handler:"saveLoop",desc:"Create"},e:{handler:"editLoop",desc:"Edit"},x:{handler:"scratchLoop",desc:"Scratch"},j:{handler:"jumpLoop",desc:"Jump"},z:{handler:"zoomLoop",desc:"Zoom"},d:{handler:"deleteLoop",desc:"Delete"}}},x:{completions:{x:{handler:"toggleLoop",desc:"Toggle"},e:{handler:"editScratch",desc:"Edit mode"},z:{handler:"zoomScratch",desc:"Zoom"},s:{handler:"saveBack",desc:"Save to source"},r:{handler:"resetLoopToSource",desc:"Reset to source"},u:{handler:"unlinkLoopSource",desc:"Unlink source"}}},c:{completions:{c:{handler:"setChapter",desc:"Create"},e:{handler:"editChapter",desc:"Edit"},x:{handler:"scratchChapter",desc:"Scratch"},j:{handler:"jumpChapter",desc:"Jump"},z:{handler:"zoomChapter",desc:"Zoom"},f:{handler:"fixChapter",desc:"Fix end"},d:{handler:"deleteChapter",desc:"Delete"}}},s:{completions:{s:{handler:"setSection",desc:"Create"},e:{handler:"editSection",desc:"Edit"},x:{handler:"scratchSection",desc:"Scratch"},j:{handler:"jumpSection",desc:"Jump"},z:{handler:"zoomSection",desc:"Zoom"},f:{handler:"fixSection",desc:"Fix end"},d:{handler:"deleteSection",desc:"Delete"}}},"`":{completions:{v:{handler:"openMenuVideo",desc:"Video"},c:{handler:"openMenuChapter",desc:"Chapter"},s:{handler:"openMenuSection",desc:"Section"},l:{handler:"openMenuLoop",desc:"Loop"},x:{handler:"openMenuScratch",desc:"Scratch"},m:{handler:"openMenuMark",desc:"Mark"},d:{handler:"openMenuData",desc:"Data"},a:{handler:"openMenuApp",desc:"App"}}},a:{completions:{u:{handler:"undo",desc:"Undo"},r:{handler:"redo",desc:"Redo"},Backspace:{handler:"clearHistory",desc:"Clear history"},m:{handler:"msgRecall",desc:"Recall message"},c:{handler:"copyTime",desc:"Copy time"},t:{handler:"toggleZone2",desc:"Toggle timeline"},z:{handler:"zoomOff",desc:"Zoom off"},o:{handler:"options",desc:"Options"}}},h:{completions:{h:{handler:"helpGeneral",desc:"Help"},k:{handler:"helpKeys",desc:"Key bindings"},e:{handler:"loadExamples",desc:"Load examples"}}},m:{completions:{m:{handler:"setMark",desc:"Create"},e:{handler:"editMark",desc:"Edit"},j:{handler:"jumpMark",desc:"Jump"},d:{handler:"deleteMark",desc:"Delete"}}},d:{completions:{v:{handler:"shareVideo",desc:"Share video"},x:{handler:"shareLoop",desc:"Share scratch loop"},e:{handler:"exportAll",desc:"Export"},i:{handler:"importData",desc:"Import"},I:{handler:"inspectData",desc:"Inspect"},s:{handler:"dataSave",desc:"Save to cloud"},d:{handler:"dataSave",desc:"Save to cloud"},r:{handler:"dataRead",desc:"Read from cloud"},c:{handler:"dataCompare",desc:"Compare"},Backspace:{handler:"deleteData",desc:"Delete"}}}};function Jd(s,{onPendingKey:e,onCountChange:t}={}){let i=!0,r=null,o="",n=null;function a(){r=null,clearTimeout(n),n=null,e==null||e(null,null)}function l(){o="",t==null||t(null)}function c(d,v){const b=s[d];b?b(v):console.log(`[kb] no handler: ${d}`)}function h(d){var g;if(!i)return;const v=d.composedPath()[0],b=v==null?void 0:v.tagName;if(b==="INPUT"||b==="TEXTAREA"||b==="SELECT"||v!=null&&v.isContentEditable||d.ctrlKey||d.altKey||d.metaKey)return;const y=d.key;if(r!==null){if(y==="Shift"||y==="Control"||y==="Alt"||y==="Meta")return;d.preventDefault();const k=(g=Ii[r])==null?void 0:g.completions,A=k==null?void 0:k[y],T=o?parseInt(o,10):1;a(),l(),y!=="Escape"&&A&&c(A.handler,T);return}if(y==="Escape"){o&&(d.preventDefault(),l());return}if(/^\d$/.test(y)&&(y!=="0"||o!=="")){d.preventDefault(),o+=y,t==null||t(parseInt(o,10));return}const S=Ii[y];if(S)if(d.preventDefault(),S.completions)r=y,n=setTimeout(()=>{e==null||e(y,S.completions)},300);else{const k=o?parseInt(o,10):1;l(),c(S.handler,k)}}document.addEventListener("keydown",h);function p(){i=!0}function f(){i=!1,a(),l()}function u(){document.removeEventListener("keydown",h),a(),l()}return{enable:p,disable:f,destroy:u}}const ko=[{id:"zP4lYpsfL8c",url:"https://www.youtube.com/watch?v=zP4lYpsfL8c",name:"Catfish blues — daddystovepipe",last_modified:1775858192218,duration:250.661,time:0,start:0,end:null,speed:1,seek_delta:1,nudge_delta:1,entity_type:"section",scratchLoop:{start:0,end:19,looping:!0,sourceId:null,sourceType:null},last_opened:1775858168685,zone2_mode:"sections",chapters:[{id:"ug9fe48",name:"Ch1: intro",start:0,end:null},{id:"icagmb1",name:"Ch2: A1-A3",start:17,end:null},{id:"jqmysbg",name:"Ch3: solo",start:127,end:null},{id:"k4kjfe3",name:"Ch4: A4-A5",start:160,end:null},{id:"3jhycz1",name:"Ch5: outro",start:220,end:null}],sections:[{id:"ojt7aob",end:null,name:"Intro",start:0},{id:"kszi8qb",start:17,end:null,name:"A1"},{id:"xmi5snx",start:50,end:null,name:"A2"},{id:"nkk44dh",start:90,end:null,name:"A3"},{id:"cs046zs",start:127,end:null,name:"Solo"},{id:"zvrk99d",start:160,end:null,name:"A4"},{id:"e36hlwi",start:196,end:null,name:"A5"},{id:"l6ov0a8",start:220,end:null,name:"Outro"}],loops:[{id:"m4cj7fs",name:"Section tag",start:76.94232,end:90.78550597138977},{id:"qbm6vir",name:"Solo",start:125,end:162},{id:"2f0c069",name:"Outro riff",start:225.67748203814696,end:233.05485189318847}],marks:[{id:"6jkw6w9",time:26.310959961853026,name:"Thumb hit"},{id:"wqz92g0",time:46.948387032424925,name:"E7 trill"},{id:"71y4hzo",time:77.48883514305115,name:"Tag"},{id:"zszxj65",time:127.7603690114441,name:"Bends"},{id:"4mh3h4r",time:247.388527,name:"The look"}],jumps:[]},{id:"iZMZ_xk2big",url:"https://www.youtube.com/watch?v=iZMZ_xk2big",name:"Edith Pageaud - SiccasGuitars",last_modified:1775858065671,duration:null,time:865.092756,start:0,end:null,speed:1,seek_delta:1,nudge_delta:5,entity_type:"any",scratchLoop:{start:864.751025,end:1156,looping:!0,sourceId:null,sourceType:null},last_opened:1775857572383,zone2_mode:"chapters",chapters:[{id:"spssetk",name:"Passacaglia in B - Biber",start:20.679577,end:null},{id:"iryfgek",name:"Sonata 24 - Seixas",start:529.937977,end:null},{id:"qnm6whl",name:"Oblivion - Piazzolla",start:600,end:null},{id:"p9dudc0",name:"Prelude in C#m - Rachmaninov",start:866.751025,end:null},{id:"hiqggpp",name:"Passacaille - Tansman",start:1154,end:null},{id:"uqdazzl",name:"Segovia - Presti",start:1519,end:null},{id:"undm4oa",name:"Los Caujaritos - Figueredo",start:1933.971781,end:null}],sections:[],loops:[],marks:[],jumps:[]}];/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gd=(s,e)=>(s==null?void 0:s._$litType$)!==void 0,An=s=>s.strings===void 0,Yd={},Zd=(s,e=Yd)=>s._$AH=e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},wr=s=>(...e)=>({_$litDirective$:s,values:e});let Sr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt=(s,e)=>{var i;const t=s._$AN;if(t===void 0)return!1;for(const r of t)(i=r._$AO)==null||i.call(r,e,!1),Gt(r,e);return!0},Is=s=>{let e,t;do{if((e=s._$AM)===void 0)break;t=e._$AN,t.delete(s),s=e}while((t==null?void 0:t.size)===0)},Rn=s=>{for(let e;e=s._$AM;s=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(s))break;t.add(s),eh(e)}};function Xd(s){this._$AN!==void 0?(Is(this),this._$AM=s,Rn(this)):this._$AM=s}function Qd(s,e=!1,t=0){const i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(i))for(let o=t;o<i.length;o++)Gt(i[o],!1),Is(i[o]);else i!=null&&(Gt(i,!1),Is(i));else Gt(this,s)}const eh=s=>{s.type==Fe.CHILD&&(s._$AP??(s._$AP=Qd),s._$AQ??(s._$AQ=Xd))};class th extends Sr{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),Rn(this),this.isConnected=e._$AU}_$AO(e,t=!0){var i,r;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(r=this.disconnected)==null||r.call(this)),t&&(Gt(this,e),Is(this))}setValue(e){if(An(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ie=()=>new sh;class sh{}const hi=new WeakMap,re=wr(class extends th{render(s){return B}update(s,[e]){var i;const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=(i=s.options)==null?void 0:i.host,this.rt(this.ct=s.element)),B}rt(s){if(this.isConnected||(s=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=hi.get(e);t===void 0&&(t=new WeakMap,hi.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,s),s!==void 0&&this.G.call(this.ht,s)}else this.G.value=s}get lt(){var s,e;return typeof this.G=="function"?(s=hi.get(this.ht??globalThis))==null?void 0:s.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var On=Object.defineProperty,ih=Object.defineProperties,rh=Object.getOwnPropertyDescriptor,oh=Object.getOwnPropertyDescriptors,$o=Object.getOwnPropertySymbols,nh=Object.prototype.hasOwnProperty,ah=Object.prototype.propertyIsEnumerable,ui=(s,e)=>(e=Symbol[s])?e:Symbol.for("Symbol."+s),kr=s=>{throw TypeError(s)},xo=(s,e,t)=>e in s?On(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,ut=(s,e)=>{for(var t in e||(e={}))nh.call(e,t)&&xo(s,t,e[t]);if($o)for(var t of $o(e))ah.call(e,t)&&xo(s,t,e[t]);return s},Fs=(s,e)=>ih(s,oh(e)),m=(s,e,t,i)=>{for(var r=i>1?void 0:i?rh(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&On(e,t,r),r},In=(s,e,t)=>e.has(s)||kr("Cannot "+t),lh=(s,e,t)=>(In(s,e,"read from private field"),e.get(s)),ch=(s,e,t)=>e.has(s)?kr("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t),dh=(s,e,t,i)=>(In(s,e,"write to private field"),e.set(s,t),t),hh=function(s,e){this[0]=s,this[1]=e},uh=s=>{var e=s[ui("asyncIterator")],t=!1,i,r={};return e==null?(e=s[ui("iterator")](),i=o=>r[o]=n=>e[o](n)):(e=e.call(s),i=o=>r[o]=n=>{if(t){if(t=!1,o==="throw")throw n;return n}return t=!0,{done:!1,value:new hh(new Promise(a=>{var l=e[o](n);l instanceof Object||kr("Object expected"),a(l)}),1)}}),r[ui("iterator")]=()=>r,i("next"),"throw"in e?i("throw"):r.throw=o=>{throw o},"return"in e&&i("return"),r};function*$r(s=document.activeElement){s!=null&&(yield s,"shadowRoot"in s&&s.shadowRoot&&s.shadowRoot.mode!=="closed"&&(yield*uh($r(s.shadowRoot.activeElement))))}function Ln(){return[...$r()].pop()}var Eo=new WeakMap;function Pn(s){let e=Eo.get(s);return e||(e=window.getComputedStyle(s,null),Eo.set(s,e)),e}function ph(s){if(typeof s.checkVisibility=="function")return s.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=Pn(s);return e.visibility!=="hidden"&&e.display!=="none"}function fh(s){const e=Pn(s),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:s.scrollHeight>s.clientHeight&&t==="auto"||s.scrollWidth>s.clientWidth&&i==="auto"}function mh(s){const e=s.tagName.toLowerCase(),t=Number(s.getAttribute("tabindex"));if(s.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||s.hasAttribute("disabled")||s.closest("[inert]"))return!1;if(e==="input"&&s.getAttribute("type")==="radio"){const o=s.getRootNode(),n=`input[type='radio'][name="${s.getAttribute("name")}"]`,a=o.querySelector(`${n}:checked`);return a?a===s:o.querySelector(n)===s}return ph(s)?(e==="audio"||e==="video")&&s.hasAttribute("controls")||s.hasAttribute("tabindex")||s.hasAttribute("contenteditable")&&s.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:fh(s):!1}function gh(s){var e,t;const i=Li(s),r=(e=i[0])!=null?e:null,o=(t=i[i.length-1])!=null?t:null;return{start:r,end:o}}function vh(s,e){var t;return((t=s.getRootNode({composed:!0}))==null?void 0:t.host)!==e}function Li(s){const e=new WeakMap,t=[];function i(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||e.has(r))return;e.set(r,!0),!t.includes(r)&&mh(r)&&t.push(r),r instanceof HTMLSlotElement&&vh(r,s)&&r.assignedElements({flatten:!0}).forEach(o=>{i(o)}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&i(r.shadowRoot)}for(const o of r.children)i(o)}return i(s),t.sort((r,o)=>{const n=Number(r.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-n})}var jt=[],_h=class{constructor(s){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var t;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=Ln();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const r=Li(this.element);let o=r.findIndex(a=>a===i);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){o+n>=r.length?o=0:o+n<0?o=r.length-1:o+=n,this.previousFocus=this.currentFocus;const a=r[o];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||a&&this.possiblyHasTabbableChildren(a))return;e.preventDefault(),this.currentFocus=a,(t=this.currentFocus)==null||t.focus({preventScroll:!1});const l=[...$r()];if(l.includes(this.currentFocus)||!l.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=s,this.elementsWithTabbableControls=["iframe"]}activate(){jt.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){jt=jt.filter(s=>s!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return jt[jt.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const s=Li(this.element);if(!this.element.matches(":focus-within")){const e=s[0],t=s[s.length-1],i=this.tabDirection==="forward"?e:t;typeof(i==null?void 0:i.focus)=="function"&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(s){return this.elementsWithTabbableControls.includes(s.tagName.toLowerCase())||s.hasAttribute("controls")}},Pi=new Set;function bh(){const s=document.documentElement.clientWidth;return Math.abs(window.innerWidth-s)}function yh(){const s=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(s)||!s?0:s}function Co(s){if(Pi.add(s),!document.documentElement.classList.contains("sl-scroll-lock")){const e=bh()+yh();let t=getComputedStyle(document.documentElement).scrollbarGutter;(!t||t==="auto")&&(t="stable"),e<2&&(t=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",t),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function To(s){Pi.delete(s),Pi.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var wh=L`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,Sh=s=>{var e;const{activeElement:t}=document;t&&s.contains(t)&&((e=document.activeElement)==null||e.blur())},kh=L`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,Di="";function Ao(s){Di=s}function $h(s=""){if(!Di){const e=[...document.getElementsByTagName("script")],t=e.find(i=>i.hasAttribute("data-shoelace"));if(t)Ao(t.getAttribute("data-shoelace"));else{const i=e.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src));let r="";i&&(r=i.getAttribute("src")),Ao(r.split("/").slice(0,-1).join("/"))}}return Di.replace(/\/$/,"")+(s?`/${s.replace(/^\//,"")}`:"")}var xh={name:"default",resolver:s=>$h(`assets/icons/${s}.svg`)},Eh=xh,Ro={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Ch={name:"system",resolver:s=>s in Ro?`data:image/svg+xml,${encodeURIComponent(Ro[s])}`:""},Th=Ch,Ah=[Eh,Th],Ni=[];function Rh(s){Ni.push(s)}function Oh(s){Ni=Ni.filter(e=>e!==s)}function Oo(s){return Ah.find(e=>e.name===s)}var Ih=L`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function Y(s,e){const t=ut({waitUntilFirstUpdate:!1},e);return(i,r)=>{const{update:o}=i,n=Array.isArray(s)?s:[s];i.update=function(a){n.forEach(l=>{const c=l;if(a.has(c)){const h=a.get(c),p=this[c];h!==p&&(!t.waitUntilFirstUpdate||this.hasUpdated)&&this[r](h,p)}}),o.call(this,a)}}}var ce=L`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lh={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:ur},Ph=(s=Lh,e,t)=>{const{kind:i,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){const{name:n}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,s,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,s,a),a}}}if(i==="setter"){const{name:n}=t;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,s,!0,a)}}throw Error("Unsupported decorator location: "+i)};function w(s){return(e,t)=>typeof t=="object"?Ph(s,e,t):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ot(s){return w({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dh=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function K(s,e){return(t,i,r)=>{const o=n=>{var a;return((a=n.renderRoot)==null?void 0:a.querySelector(s))??null};return Dh(t,i,{get(){return o(this)}})}}var xs,Z=class extends D{constructor(){super(),ch(this,xs,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([s,e])=>{this.constructor.define(s,e)})}emit(s,e){const t=new CustomEvent(s,ut({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(t),t}static define(s,e=this,t={}){const i=customElements.get(s);if(!i){try{customElements.define(s,e,t)}catch{customElements.define(s,class extends e{},t)}return}let r=" (unknown version)",o=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in i&&i.version&&(o=" v"+i.version),!(r&&o&&r===o)&&console.warn(`Attempted to register <${s}>${r}, but <${s}>${o} has already been registered.`)}attributeChangedCallback(s,e,t){lh(this,xs)||(this.constructor.elementProperties.forEach((i,r)=>{i.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),dh(this,xs,!0)),super.attributeChangedCallback(s,e,t)}willUpdate(s){super.willUpdate(s),this.initialReflectedProperties.forEach((e,t)=>{s.has(t)&&this[t]==null&&(this[t]=e)})}};xs=new WeakMap;Z.version="2.20.1";Z.dependencies={};m([w()],Z.prototype,"dir",2);m([w()],Z.prototype,"lang",2);var Ut=Symbol(),bs=Symbol(),pi,fi=new Map,fe=class extends Z{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(s,e){var t;let i;if(e!=null&&e.spriteSheet)return this.svg=_`<svg part="svg">
        <use part="use" href="${s}"></use>
      </svg>`,this.svg;try{if(i=await fetch(s,{mode:"cors"}),!i.ok)return i.status===410?Ut:bs}catch{return bs}try{const r=document.createElement("div");r.innerHTML=await i.text();const o=r.firstElementChild;if(((t=o==null?void 0:o.tagName)==null?void 0:t.toLowerCase())!=="svg")return Ut;pi||(pi=new DOMParser);const a=pi.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):Ut}catch{return Ut}}connectedCallback(){super.connectedCallback(),Rh(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Oh(this)}getIconSource(){const s=Oo(this.library);return this.name&&s?{url:s.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var s;const{url:e,fromLibrary:t}=this.getIconSource(),i=t?Oo(this.library):void 0;if(!e){this.svg=null;return}let r=fi.get(e);if(r||(r=this.resolveIcon(e,i),fi.set(e,r)),!this.initialRender)return;const o=await r;if(o===bs&&fi.delete(e),e===this.getIconSource().url){if(Gd(o)){if(this.svg=o,i){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n)}return}switch(o){case bs:case Ut:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(!0),(s=i==null?void 0:i.mutator)==null||s.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};fe.styles=[ce,Ih];m([Ot()],fe.prototype,"svg",2);m([w({reflect:!0})],fe.prototype,"name",2);m([w()],fe.prototype,"src",2);m([w()],fe.prototype,"label",2);m([w({reflect:!0})],fe.prototype,"library",2);m([Y("label")],fe.prototype,"handleLabelChange",1);m([Y(["name","src","library"])],fe.prototype,"setIcon",1);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=wr(class extends Sr{constructor(s){var e;if(super(s),s.type!==Fe.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var i,r;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const t=s.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const n=!!e[o];n===this.st.has(o)||(r=this.nt)!=null&&r.has(o)||(n?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return ye}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dn=Symbol.for(""),Nh=s=>{if((s==null?void 0:s.r)===Dn)return s==null?void 0:s._$litStatic$},Ls=(s,...e)=>({_$litStatic$:e.reduce((t,i,r)=>t+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+s[r+1],s[0]),r:Dn}),Io=new Map,Mh=s=>(e,...t)=>{const i=t.length;let r,o;const n=[],a=[];let l,c=0,h=!1;for(;c<i;){for(l=e[c];c<i&&(o=t[c],(r=Nh(o))!==void 0);)l+=r+e[++c],h=!0;c!==i&&a.push(o),n.push(l),c++}if(c===i&&n.push(e[i]),h){const p=n.join("$$lit$$");(e=Io.get(p))===void 0&&(n.raw=n,Io.set(p,e=n)),t=a}return s(e,...t)},Es=Mh(_);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=s=>s??B;var de=class extends Z{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(s){this.disabled&&(s.preventDefault(),s.stopPropagation())}click(){this.button.click()}focus(s){this.button.focus(s)}blur(){this.button.blur()}render(){const s=!!this.href,e=s?Ls`a`:Ls`button`;return Es`
      <${e}
        part="base"
        class=${pe({"icon-button":!0,"icon-button--disabled":!s&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${P(s?void 0:this.disabled)}
        type=${P(s?void 0:"button")}
        href=${P(s?this.href:void 0)}
        target=${P(s?this.target:void 0)}
        download=${P(s?this.download:void 0)}
        rel=${P(s&&this.target?"noreferrer noopener":void 0)}
        role=${P(s?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${P(this.name)}
          library=${P(this.library)}
          src=${P(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};de.styles=[ce,kh];de.dependencies={"sl-icon":fe};m([K(".icon-button")],de.prototype,"button",2);m([Ot()],de.prototype,"hasFocus",2);m([w()],de.prototype,"name",2);m([w()],de.prototype,"library",2);m([w()],de.prototype,"src",2);m([w()],de.prototype,"href",2);m([w()],de.prototype,"target",2);m([w()],de.prototype,"download",2);m([w()],de.prototype,"label",2);m([w({type:Boolean,reflect:!0})],de.prototype,"disabled",2);var Nn=new Map,jh=new WeakMap;function Uh(s){return s??{keyframes:[],options:{duration:0}}}function Lo(s,e){return e.toLowerCase()==="rtl"?{keyframes:s.rtlKeyframes||s.keyframes,options:s.options}:s}function je(s,e){Nn.set(s,Uh(e))}function Le(s,e,t){const i=jh.get(s);if(i!=null&&i[e])return Lo(i[e],t.dir);const r=Nn.get(e);return r?Lo(r,t.dir):{keyframes:[],options:{duration:0}}}function Tt(s,e){return new Promise(t=>{function i(r){r.target===s&&(s.removeEventListener(e,i),t())}s.addEventListener(e,i)})}function Pe(s,e,t){return new Promise(i=>{if((t==null?void 0:t.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=s.animate(e,Fs(ut({},t),{duration:zh()?0:t.duration}));r.addEventListener("cancel",i,{once:!0}),r.addEventListener("finish",i,{once:!0})})}function Po(s){return s=s.toString().toLowerCase(),s.indexOf("ms")>-1?parseFloat(s):s.indexOf("s")>-1?parseFloat(s)*1e3:parseFloat(s)}function zh(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function We(s){return Promise.all(s.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}var cs=class{constructor(s,...e){this.slotNames=[],this.handleSlotChange=t=>{const i=t.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=s).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(s=>{if(s.nodeType===s.TEXT_NODE&&s.textContent.trim()!=="")return!0;if(s.nodeType===s.ELEMENT_NODE){const e=s;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(s){return this.host.querySelector(`:scope > [slot="${s}"]`)!==null}test(s){return s==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(s)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function Vh(s){if(!s)return"";const e=s.assignedNodes({flatten:!0});let t="";return[...e].forEach(i=>{i.nodeType===Node.TEXT_NODE&&(t+=i.textContent)}),t}const Mi=new Set,kt=new Map;let nt,xr="ltr",Er="en";const Mn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Mn){const s=new MutationObserver(Un);xr=document.documentElement.dir||"ltr",Er=document.documentElement.lang||navigator.language,s.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function jn(...s){s.map(e=>{const t=e.$code.toLowerCase();kt.has(t)?kt.set(t,Object.assign(Object.assign({},kt.get(t)),e)):kt.set(t,e),nt||(nt=e)}),Un()}function Un(){Mn&&(xr=document.documentElement.dir||"ltr",Er=document.documentElement.lang||navigator.language),[...Mi.keys()].map(s=>{typeof s.requestUpdate=="function"&&s.requestUpdate()})}let Bh=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Mi.add(this.host)}hostDisconnected(){Mi.delete(this.host)}dir(){return`${this.host.dir||xr}`.toLowerCase()}lang(){return`${this.host.lang||Er}`.toLowerCase()}getTranslationData(e){var t,i;const r=new Intl.Locale(e.replace(/_/g,"-")),o=r==null?void 0:r.language.toLowerCase(),n=(i=(t=r==null?void 0:r.region)===null||t===void 0?void 0:t.toLowerCase())!==null&&i!==void 0?i:"",a=kt.get(`${o}-${n}`),l=kt.get(o);return{locale:r,language:o,region:n,primary:a,secondary:l}}exists(e,t){var i;const{primary:r,secondary:o}=this.getTranslationData((i=t.lang)!==null&&i!==void 0?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!(r&&r[e]||o&&o[e]||t.includeFallback&&nt&&nt[e])}term(e,...t){const{primary:i,secondary:r}=this.getTranslationData(this.lang());let o;if(i&&i[e])o=i[e];else if(r&&r[e])o=r[e];else if(nt&&nt[e])o=nt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof o=="function"?o(...t):o}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var zn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(s,e)=>`Go to slide ${s} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:s=>s===0?"No options selected":s===1?"1 option selected":`${s} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:s=>`Slide ${s}`,toggleColorFormat:"Toggle color format"};jn(zn);var Fh=zn,Xe=class extends Bh{};jn(Fh);var Te=class extends Z{constructor(){super(...arguments),this.hasSlotController=new cs(this,"footer"),this.localize=new Xe(this),this.modal=new _h(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=s=>{s.key==="Escape"&&this.modal.isActive()&&this.open&&(s.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Co(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),To(this),this.removeOpenListeners()}requestClose(s){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:s}}).defaultPrevented){const t=Le(this,"dialog.denyClose",{dir:this.localize.dir()});Pe(this.panel,t.keyframes,t.options);return}this.hide()}addOpenListeners(){var s;"CloseWatcher"in window?((s=this.closeWatcher)==null||s.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var s;(s=this.closeWatcher)==null||s.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Co(this);const s=this.querySelector("[autofocus]");s&&s.removeAttribute("autofocus"),await Promise.all([We(this.dialog),We(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(s?s.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),s&&s.setAttribute("autofocus","")});const e=Le(this,"dialog.show",{dir:this.localize.dir()}),t=Le(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Pe(this.panel,e.keyframes,e.options),Pe(this.overlay,t.keyframes,t.options)]),this.emit("sl-after-show")}else{Sh(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([We(this.dialog),We(this.overlay)]);const s=Le(this,"dialog.hide",{dir:this.localize.dir()}),e=Le(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Pe(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),Pe(this.panel,s.keyframes,s.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,To(this);const t=this.originalTrigger;typeof(t==null?void 0:t.focus)=="function"&&setTimeout(()=>t.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Tt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Tt(this,"sl-after-hide")}render(){return _`
      <div
        part="base"
        class=${pe({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${P(this.noHeader?this.label:void 0)}
          aria-labelledby=${P(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":_`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Te.styles=[ce,wh];Te.dependencies={"sl-icon-button":de};m([K(".dialog")],Te.prototype,"dialog",2);m([K(".dialog__panel")],Te.prototype,"panel",2);m([K(".dialog__overlay")],Te.prototype,"overlay",2);m([w({type:Boolean,reflect:!0})],Te.prototype,"open",2);m([w({reflect:!0})],Te.prototype,"label",2);m([w({attribute:"no-header",type:Boolean,reflect:!0})],Te.prototype,"noHeader",2);m([Y("open",{waitUntilFirstUpdate:!0})],Te.prototype,"handleOpenChange",1);je("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});je("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});je("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});je("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});je("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Te.define("sl-dialog");class Vn extends D{_emit(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_onShow(){this._emit("ll-modal-open")}_onAfterHide(){setTimeout(()=>{var e;(e=document.activeElement)==null||e.blur(),this._emit("ll-modal-close")},0)}_onInitialFocus(e){e.preventDefault(),this._emit("ll-modal-initial-focus")}render(){return _`
      <sl-dialog
        label=${this.label??""}
        style=${this.width?`--width: ${this.width}`:""}
        @sl-show=${this._onShow}
        @sl-after-hide=${this._onAfterHide}
        @sl-initial-focus=${this._onInitialFocus}
      >
        <slot></slot>
        <slot name="footer" slot="footer"></slot>
      </sl-dialog>
    `}show(){var e;(e=this.renderRoot.querySelector("sl-dialog"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("sl-dialog"))==null||e.hide()}}C(Vn,"properties",{label:{type:String},width:{type:String}});customElements.define("llama-modal",Vn);var qh=L`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,Cr=class extends Z{constructor(){super(...arguments),this.localize=new Xe(this)}render(){return _`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Cr.styles=[ce,qh];var zt=new WeakMap,Vt=new WeakMap,Bt=new WeakMap,mi=new WeakSet,ys=new WeakMap,Tr=class{constructor(s,e){this.handleFormData=t=>{const i=this.options.disabled(this.host),r=this.options.name(this.host),o=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof r=="string"&&r.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(a=>{t.formData.append(r,a.toString())}):t.formData.append(r,o.toString()))},this.handleFormSubmit=t=>{var i;const r=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=zt.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!r&&!o(this.host)&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),ys.set(this.host,[])},this.handleInteraction=t=>{const i=ys.get(this.host);i.includes(t.type)||i.push(t.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const i of t)if(typeof i.checkValidity=="function"&&!i.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const i of t)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=s).addController(this),this.options=ut({form:t=>{const i=t.form;if(i){const o=t.getRootNode().querySelector(`#${i}`);if(o)return o}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var i;return(i=t.disabled)!=null?i:!1},reportValidity:t=>typeof t.reportValidity=="function"?t.reportValidity():!0,checkValidity:t=>typeof t.checkValidity=="function"?t.checkValidity():!0,setValue:(t,i)=>t.value=i,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const s=this.options.form(this.host);s&&this.attachForm(s),ys.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),ys.delete(this.host),this.options.assumeInteractionOn.forEach(s=>{this.host.removeEventListener(s,this.handleInteraction)})}hostUpdated(){const s=this.options.form(this.host);s||this.detachForm(),s&&this.form!==s&&(this.detachForm(),this.attachForm(s)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(s){s?(this.form=s,zt.has(this.form)?zt.get(this.form).add(this.host):zt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Vt.has(this.form)||(Vt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Bt.has(this.form)||(Bt.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const s=zt.get(this.form);s&&(s.delete(this.host),s.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Vt.has(this.form)&&(this.form.reportValidity=Vt.get(this.form),Vt.delete(this.form)),Bt.has(this.form)&&(this.form.checkValidity=Bt.get(this.form),Bt.delete(this.form)),this.form=void 0))}setUserInteracted(s,e){e?mi.add(s):mi.delete(s),s.requestUpdate()}doAction(s,e){if(this.form){const t=document.createElement("button");t.type=s,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",e&&(t.name=e.name,t.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&t.setAttribute(i,e.getAttribute(i))})),this.form.append(t),t.click(),t.remove()}}getForm(){var s;return(s=this.form)!=null?s:null}reset(s){this.doAction("reset",s)}submit(s){this.doAction("submit",s)}setValidity(s){const e=this.host,t=!!mi.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!s),e.toggleAttribute("data-valid",s),e.toggleAttribute("data-user-invalid",!s&&t),e.toggleAttribute("data-user-valid",s&&t)}updateValidity(){const s=this.host;this.setValidity(s.validity.valid)}emitInvalidEvent(s){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});s||e.preventDefault(),this.host.dispatchEvent(e)||s==null||s.preventDefault()}},Ar=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(Fs(ut({},Ar),{valid:!1,valueMissing:!0}));Object.freeze(Fs(ut({},Ar),{valid:!1,customError:!0}));var Hh=L`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,N=class extends Z{constructor(){super(...arguments),this.formControlController=new Tr(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new cs(this,"[default]","prefix","suffix"),this.localize=new Xe(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Ar}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(s){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(s)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(s){this.button.focus(s)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(s){this.isButton()&&(this.button.setCustomValidity(s),this.formControlController.updateValidity())}render(){const s=this.isLink(),e=s?Ls`a`:Ls`button`;return Es`
      <${e}
        part="base"
        class=${pe({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${P(s?void 0:this.disabled)}
        type=${P(s?void 0:this.type)}
        title=${this.title}
        name=${P(s?void 0:this.name)}
        value=${P(s?void 0:this.value)}
        href=${P(s&&!this.disabled?this.href:void 0)}
        target=${P(s?this.target:void 0)}
        download=${P(s?this.download:void 0)}
        rel=${P(s?this.rel:void 0)}
        role=${P(s?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Es` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Es`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};N.styles=[ce,Hh];N.dependencies={"sl-icon":fe,"sl-spinner":Cr};m([K(".button")],N.prototype,"button",2);m([Ot()],N.prototype,"hasFocus",2);m([Ot()],N.prototype,"invalid",2);m([w()],N.prototype,"title",2);m([w({reflect:!0})],N.prototype,"variant",2);m([w({reflect:!0})],N.prototype,"size",2);m([w({type:Boolean,reflect:!0})],N.prototype,"caret",2);m([w({type:Boolean,reflect:!0})],N.prototype,"disabled",2);m([w({type:Boolean,reflect:!0})],N.prototype,"loading",2);m([w({type:Boolean,reflect:!0})],N.prototype,"outline",2);m([w({type:Boolean,reflect:!0})],N.prototype,"pill",2);m([w({type:Boolean,reflect:!0})],N.prototype,"circle",2);m([w()],N.prototype,"type",2);m([w()],N.prototype,"name",2);m([w()],N.prototype,"value",2);m([w()],N.prototype,"href",2);m([w()],N.prototype,"target",2);m([w()],N.prototype,"rel",2);m([w()],N.prototype,"download",2);m([w()],N.prototype,"form",2);m([w({attribute:"formaction"})],N.prototype,"formAction",2);m([w({attribute:"formenctype"})],N.prototype,"formEnctype",2);m([w({attribute:"formmethod"})],N.prototype,"formMethod",2);m([w({attribute:"formnovalidate",type:Boolean})],N.prototype,"formNoValidate",2);m([w({attribute:"formtarget"})],N.prototype,"formTarget",2);m([Y("disabled",{waitUntilFirstUpdate:!0})],N.prototype,"handleDisabledChange",1);N.define("sl-button");var Wh=L`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Kh=L`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Je=Math.min,ne=Math.max,Ps=Math.round,ws=Math.floor,Ee=s=>({x:s,y:s}),Jh={left:"right",right:"left",bottom:"top",top:"bottom"},Gh={start:"end",end:"start"};function ji(s,e,t){return ne(s,Je(e,t))}function It(s,e){return typeof s=="function"?s(e):s}function Ge(s){return s.split("-")[0]}function Lt(s){return s.split("-")[1]}function Bn(s){return s==="x"?"y":"x"}function Rr(s){return s==="y"?"height":"width"}const Yh=new Set(["top","bottom"]);function De(s){return Yh.has(Ge(s))?"y":"x"}function Or(s){return Bn(De(s))}function Zh(s,e,t){t===void 0&&(t=!1);const i=Lt(s),r=Or(s),o=Rr(r);let n=r==="x"?i===(t?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[o]>e.floating[o]&&(n=Ds(n)),[n,Ds(n)]}function Xh(s){const e=Ds(s);return[Ui(s),e,Ui(e)]}function Ui(s){return s.replace(/start|end/g,e=>Gh[e])}const Do=["left","right"],No=["right","left"],Qh=["top","bottom"],eu=["bottom","top"];function tu(s,e,t){switch(s){case"top":case"bottom":return t?e?No:Do:e?Do:No;case"left":case"right":return e?Qh:eu;default:return[]}}function su(s,e,t,i){const r=Lt(s);let o=tu(Ge(s),t==="start",i);return r&&(o=o.map(n=>n+"-"+r),e&&(o=o.concat(o.map(Ui)))),o}function Ds(s){return s.replace(/left|right|bottom|top/g,e=>Jh[e])}function iu(s){return{top:0,right:0,bottom:0,left:0,...s}}function Fn(s){return typeof s!="number"?iu(s):{top:s,right:s,bottom:s,left:s}}function Ns(s){const{x:e,y:t,width:i,height:r}=s;return{width:i,height:r,top:t,left:e,right:e+i,bottom:t+r,x:e,y:t}}function Mo(s,e,t){let{reference:i,floating:r}=s;const o=De(e),n=Or(e),a=Rr(n),l=Ge(e),c=o==="y",h=i.x+i.width/2-r.width/2,p=i.y+i.height/2-r.height/2,f=i[a]/2-r[a]/2;let u;switch(l){case"top":u={x:h,y:i.y-r.height};break;case"bottom":u={x:h,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:p};break;case"left":u={x:i.x-r.width,y:p};break;default:u={x:i.x,y:i.y}}switch(Lt(e)){case"start":u[n]-=f*(t&&c?-1:1);break;case"end":u[n]+=f*(t&&c?-1:1);break}return u}async function ru(s,e){var t;e===void 0&&(e={});const{x:i,y:r,platform:o,rects:n,elements:a,strategy:l}=s,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:f=!1,padding:u=0}=It(e,s),d=Fn(u),b=a[f?p==="floating"?"reference":"floating":p],y=Ns(await o.getClippingRect({element:(t=await(o.isElement==null?void 0:o.isElement(b)))==null||t?b:b.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),S=p==="floating"?{x:i,y:r,width:n.floating.width,height:n.floating.height}:n.reference,g=await(o.getOffsetParent==null?void 0:o.getOffsetParent(a.floating)),k=await(o.isElement==null?void 0:o.isElement(g))?await(o.getScale==null?void 0:o.getScale(g))||{x:1,y:1}:{x:1,y:1},A=Ns(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:S,offsetParent:g,strategy:l}):S);return{top:(y.top-A.top+d.top)/k.y,bottom:(A.bottom-y.bottom+d.bottom)/k.y,left:(y.left-A.left+d.left)/k.x,right:(A.right-y.right+d.right)/k.x}}const ou=async(s,e,t)=>{const{placement:i="bottom",strategy:r="absolute",middleware:o=[],platform:n}=t,a=o.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e));let c=await n.getElementRects({reference:s,floating:e,strategy:r}),{x:h,y:p}=Mo(c,i,l),f=i,u={},d=0;for(let b=0;b<a.length;b++){var v;const{name:y,fn:S}=a[b],{x:g,y:k,data:A,reset:T}=await S({x:h,y:p,initialPlacement:i,placement:f,strategy:r,middlewareData:u,rects:c,platform:{...n,detectOverflow:(v=n.detectOverflow)!=null?v:ru},elements:{reference:s,floating:e}});h=g??h,p=k??p,u={...u,[y]:{...u[y],...A}},T&&d<=50&&(d++,typeof T=="object"&&(T.placement&&(f=T.placement),T.rects&&(c=T.rects===!0?await n.getElementRects({reference:s,floating:e,strategy:r}):T.rects),{x:h,y:p}=Mo(c,f,l)),b=-1)}return{x:h,y:p,placement:f,strategy:r,middlewareData:u}},nu=s=>({name:"arrow",options:s,async fn(e){const{x:t,y:i,placement:r,rects:o,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=It(s,e)||{};if(c==null)return{};const p=Fn(h),f={x:t,y:i},u=Or(r),d=Rr(u),v=await n.getDimensions(c),b=u==="y",y=b?"top":"left",S=b?"bottom":"right",g=b?"clientHeight":"clientWidth",k=o.reference[d]+o.reference[u]-f[u]-o.floating[d],A=f[u]-o.reference[u],T=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c));let I=T?T[g]:0;(!I||!await(n.isElement==null?void 0:n.isElement(T)))&&(I=a.floating[g]||o.floating[d]);const W=k/2-A/2,F=I/2-v[d]/2-1,ue=Je(p[y],F),Ue=Je(p[S],F),$e=ue,ze=I-v[d]-Ue,te=I/2-v[d]/2+W,Qe=ji($e,te,ze),Re=!l.arrow&&Lt(r)!=null&&te!==Qe&&o.reference[d]/2-(te<$e?ue:Ue)-v[d]/2<0,me=Re?te<$e?te-$e:te-ze:0;return{[u]:f[u]+me,data:{[u]:Qe,centerOffset:te-Qe-me,...Re&&{alignmentOffset:me}},reset:Re}}}),au=function(s){return s===void 0&&(s={}),{name:"flip",options:s,async fn(e){var t,i;const{placement:r,middlewareData:o,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:d="none",flipAlignment:v=!0,...b}=It(s,e);if((t=o.arrow)!=null&&t.alignmentOffset)return{};const y=Ge(r),S=De(a),g=Ge(a)===a,k=await(l.isRTL==null?void 0:l.isRTL(c.floating)),A=f||(g||!v?[Ds(a)]:Xh(a)),T=d!=="none";!f&&T&&A.push(...su(a,v,d,k));const I=[a,...A],W=await l.detectOverflow(e,b),F=[];let ue=((i=o.flip)==null?void 0:i.overflows)||[];if(h&&F.push(W[y]),p){const te=Zh(r,n,k);F.push(W[te[0]],W[te[1]])}if(ue=[...ue,{placement:r,overflows:F}],!F.every(te=>te<=0)){var Ue,$e;const te=(((Ue=o.flip)==null?void 0:Ue.index)||0)+1,Qe=I[te];if(Qe&&(!(p==="alignment"?S!==De(Qe):!1)||ue.every(ge=>De(ge.placement)===S?ge.overflows[0]>0:!0)))return{data:{index:te,overflows:ue},reset:{placement:Qe}};let Re=($e=ue.filter(me=>me.overflows[0]<=0).sort((me,ge)=>me.overflows[1]-ge.overflows[1])[0])==null?void 0:$e.placement;if(!Re)switch(u){case"bestFit":{var ze;const me=(ze=ue.filter(ge=>{if(T){const Ve=De(ge.placement);return Ve===S||Ve==="y"}return!0}).map(ge=>[ge.placement,ge.overflows.filter(Ve=>Ve>0).reduce((Ve,na)=>Ve+na,0)]).sort((ge,Ve)=>ge[1]-Ve[1])[0])==null?void 0:ze[0];me&&(Re=me);break}case"initialPlacement":Re=a;break}if(r!==Re)return{reset:{placement:Re}}}return{}}}},lu=new Set(["left","top"]);async function cu(s,e){const{placement:t,platform:i,elements:r}=s,o=await(i.isRTL==null?void 0:i.isRTL(r.floating)),n=Ge(t),a=Lt(t),l=De(t)==="y",c=lu.has(n)?-1:1,h=o&&l?-1:1,p=It(e,s);let{mainAxis:f,crossAxis:u,alignmentAxis:d}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return a&&typeof d=="number"&&(u=a==="end"?d*-1:d),l?{x:u*h,y:f*c}:{x:f*c,y:u*h}}const du=function(s){return s===void 0&&(s=0),{name:"offset",options:s,async fn(e){var t,i;const{x:r,y:o,placement:n,middlewareData:a}=e,l=await cu(e,s);return n===((t=a.offset)==null?void 0:t.placement)&&(i=a.arrow)!=null&&i.alignmentOffset?{}:{x:r+l.x,y:o+l.y,data:{...l,placement:n}}}}},hu=function(s){return s===void 0&&(s={}),{name:"shift",options:s,async fn(e){const{x:t,y:i,placement:r,platform:o}=e,{mainAxis:n=!0,crossAxis:a=!1,limiter:l={fn:y=>{let{x:S,y:g}=y;return{x:S,y:g}}},...c}=It(s,e),h={x:t,y:i},p=await o.detectOverflow(e,c),f=De(Ge(r)),u=Bn(f);let d=h[u],v=h[f];if(n){const y=u==="y"?"top":"left",S=u==="y"?"bottom":"right",g=d+p[y],k=d-p[S];d=ji(g,d,k)}if(a){const y=f==="y"?"top":"left",S=f==="y"?"bottom":"right",g=v+p[y],k=v-p[S];v=ji(g,v,k)}const b=l.fn({...e,[u]:d,[f]:v});return{...b,data:{x:b.x-t,y:b.y-i,enabled:{[u]:n,[f]:a}}}}}},uu=function(s){return s===void 0&&(s={}),{name:"size",options:s,async fn(e){var t,i;const{placement:r,rects:o,platform:n,elements:a}=e,{apply:l=()=>{},...c}=It(s,e),h=await n.detectOverflow(e,c),p=Ge(r),f=Lt(r),u=De(r)==="y",{width:d,height:v}=o.floating;let b,y;p==="top"||p==="bottom"?(b=p,y=f===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(y=p,b=f==="end"?"top":"bottom");const S=v-h.top-h.bottom,g=d-h.left-h.right,k=Je(v-h[b],S),A=Je(d-h[y],g),T=!e.middlewareData.shift;let I=k,W=A;if((t=e.middlewareData.shift)!=null&&t.enabled.x&&(W=g),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(I=S),T&&!f){const ue=ne(h.left,0),Ue=ne(h.right,0),$e=ne(h.top,0),ze=ne(h.bottom,0);u?W=d-2*(ue!==0||Ue!==0?ue+Ue:ne(h.left,h.right)):I=v-2*($e!==0||ze!==0?$e+ze:ne(h.top,h.bottom))}await l({...e,availableWidth:W,availableHeight:I});const F=await n.getDimensions(a.floating);return d!==F.width||v!==F.height?{reset:{rects:!0}}:{}}}};function qs(){return typeof window<"u"}function Pt(s){return qn(s)?(s.nodeName||"").toLowerCase():"#document"}function le(s){var e;return(s==null||(e=s.ownerDocument)==null?void 0:e.defaultView)||window}function Ae(s){var e;return(e=(qn(s)?s.ownerDocument:s.document)||window.document)==null?void 0:e.documentElement}function qn(s){return qs()?s instanceof Node||s instanceof le(s).Node:!1}function we(s){return qs()?s instanceof Element||s instanceof le(s).Element:!1}function Ce(s){return qs()?s instanceof HTMLElement||s instanceof le(s).HTMLElement:!1}function jo(s){return!qs()||typeof ShadowRoot>"u"?!1:s instanceof ShadowRoot||s instanceof le(s).ShadowRoot}const pu=new Set(["inline","contents"]);function ds(s){const{overflow:e,overflowX:t,overflowY:i,display:r}=Se(s);return/auto|scroll|overlay|hidden|clip/.test(e+i+t)&&!pu.has(r)}const fu=new Set(["table","td","th"]);function mu(s){return fu.has(Pt(s))}const gu=[":popover-open",":modal"];function Hs(s){return gu.some(e=>{try{return s.matches(e)}catch{return!1}})}const vu=["transform","translate","scale","rotate","perspective"],_u=["transform","translate","scale","rotate","perspective","filter"],bu=["paint","layout","strict","content"];function Ws(s){const e=Ir(),t=we(s)?Se(s):s;return vu.some(i=>t[i]?t[i]!=="none":!1)||(t.containerType?t.containerType!=="normal":!1)||!e&&(t.backdropFilter?t.backdropFilter!=="none":!1)||!e&&(t.filter?t.filter!=="none":!1)||_u.some(i=>(t.willChange||"").includes(i))||bu.some(i=>(t.contain||"").includes(i))}function yu(s){let e=Ye(s);for(;Ce(e)&&!At(e);){if(Ws(e))return e;if(Hs(e))return null;e=Ye(e)}return null}function Ir(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const wu=new Set(["html","body","#document"]);function At(s){return wu.has(Pt(s))}function Se(s){return le(s).getComputedStyle(s)}function Ks(s){return we(s)?{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}:{scrollLeft:s.scrollX,scrollTop:s.scrollY}}function Ye(s){if(Pt(s)==="html")return s;const e=s.assignedSlot||s.parentNode||jo(s)&&s.host||Ae(s);return jo(e)?e.host:e}function Hn(s){const e=Ye(s);return At(e)?s.ownerDocument?s.ownerDocument.body:s.body:Ce(e)&&ds(e)?e:Hn(e)}function ns(s,e,t){var i;e===void 0&&(e=[]),t===void 0&&(t=!0);const r=Hn(s),o=r===((i=s.ownerDocument)==null?void 0:i.body),n=le(r);if(o){const a=zi(n);return e.concat(n,n.visualViewport||[],ds(r)?r:[],a&&t?ns(a):[])}return e.concat(r,ns(r,[],t))}function zi(s){return s.parent&&Object.getPrototypeOf(s.parent)?s.frameElement:null}function Wn(s){const e=Se(s);let t=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=Ce(s),o=r?s.offsetWidth:t,n=r?s.offsetHeight:i,a=Ps(t)!==o||Ps(i)!==n;return a&&(t=o,i=n),{width:t,height:i,$:a}}function Lr(s){return we(s)?s:s.contextElement}function xt(s){const e=Lr(s);if(!Ce(e))return Ee(1);const t=e.getBoundingClientRect(),{width:i,height:r,$:o}=Wn(e);let n=(o?Ps(t.width):t.width)/i,a=(o?Ps(t.height):t.height)/r;return(!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}const Su=Ee(0);function Kn(s){const e=le(s);return!Ir()||!e.visualViewport?Su:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ku(s,e,t){return e===void 0&&(e=!1),!t||e&&t!==le(s)?!1:e}function ht(s,e,t,i){e===void 0&&(e=!1),t===void 0&&(t=!1);const r=s.getBoundingClientRect(),o=Lr(s);let n=Ee(1);e&&(i?we(i)&&(n=xt(i)):n=xt(s));const a=ku(o,t,i)?Kn(o):Ee(0);let l=(r.left+a.x)/n.x,c=(r.top+a.y)/n.y,h=r.width/n.x,p=r.height/n.y;if(o){const f=le(o),u=i&&we(i)?le(i):i;let d=f,v=zi(d);for(;v&&i&&u!==d;){const b=xt(v),y=v.getBoundingClientRect(),S=Se(v),g=y.left+(v.clientLeft+parseFloat(S.paddingLeft))*b.x,k=y.top+(v.clientTop+parseFloat(S.paddingTop))*b.y;l*=b.x,c*=b.y,h*=b.x,p*=b.y,l+=g,c+=k,d=le(v),v=zi(d)}}return Ns({width:h,height:p,x:l,y:c})}function Js(s,e){const t=Ks(s).scrollLeft;return e?e.left+t:ht(Ae(s)).left+t}function Jn(s,e){const t=s.getBoundingClientRect(),i=t.left+e.scrollLeft-Js(s,t),r=t.top+e.scrollTop;return{x:i,y:r}}function $u(s){let{elements:e,rect:t,offsetParent:i,strategy:r}=s;const o=r==="fixed",n=Ae(i),a=e?Hs(e.floating):!1;if(i===n||a&&o)return t;let l={scrollLeft:0,scrollTop:0},c=Ee(1);const h=Ee(0),p=Ce(i);if((p||!p&&!o)&&((Pt(i)!=="body"||ds(n))&&(l=Ks(i)),Ce(i))){const u=ht(i);c=xt(i),h.x=u.x+i.clientLeft,h.y=u.y+i.clientTop}const f=n&&!p&&!o?Jn(n,l):Ee(0);return{width:t.width*c.x,height:t.height*c.y,x:t.x*c.x-l.scrollLeft*c.x+h.x+f.x,y:t.y*c.y-l.scrollTop*c.y+h.y+f.y}}function xu(s){return Array.from(s.getClientRects())}function Eu(s){const e=Ae(s),t=Ks(s),i=s.ownerDocument.body,r=ne(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),o=ne(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let n=-t.scrollLeft+Js(s);const a=-t.scrollTop;return Se(i).direction==="rtl"&&(n+=ne(e.clientWidth,i.clientWidth)-r),{width:r,height:o,x:n,y:a}}const Uo=25;function Cu(s,e){const t=le(s),i=Ae(s),r=t.visualViewport;let o=i.clientWidth,n=i.clientHeight,a=0,l=0;if(r){o=r.width,n=r.height;const h=Ir();(!h||h&&e==="fixed")&&(a=r.offsetLeft,l=r.offsetTop)}const c=Js(i);if(c<=0){const h=i.ownerDocument,p=h.body,f=getComputedStyle(p),u=h.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,d=Math.abs(i.clientWidth-p.clientWidth-u);d<=Uo&&(o-=d)}else c<=Uo&&(o+=c);return{width:o,height:n,x:a,y:l}}const Tu=new Set(["absolute","fixed"]);function Au(s,e){const t=ht(s,!0,e==="fixed"),i=t.top+s.clientTop,r=t.left+s.clientLeft,o=Ce(s)?xt(s):Ee(1),n=s.clientWidth*o.x,a=s.clientHeight*o.y,l=r*o.x,c=i*o.y;return{width:n,height:a,x:l,y:c}}function zo(s,e,t){let i;if(e==="viewport")i=Cu(s,t);else if(e==="document")i=Eu(Ae(s));else if(we(e))i=Au(e,t);else{const r=Kn(s);i={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return Ns(i)}function Gn(s,e){const t=Ye(s);return t===e||!we(t)||At(t)?!1:Se(t).position==="fixed"||Gn(t,e)}function Ru(s,e){const t=e.get(s);if(t)return t;let i=ns(s,[],!1).filter(a=>we(a)&&Pt(a)!=="body"),r=null;const o=Se(s).position==="fixed";let n=o?Ye(s):s;for(;we(n)&&!At(n);){const a=Se(n),l=Ws(n);!l&&a.position==="fixed"&&(r=null),(o?!l&&!r:!l&&a.position==="static"&&!!r&&Tu.has(r.position)||ds(n)&&!l&&Gn(s,n))?i=i.filter(h=>h!==n):r=a,n=Ye(n)}return e.set(s,i),i}function Ou(s){let{element:e,boundary:t,rootBoundary:i,strategy:r}=s;const n=[...t==="clippingAncestors"?Hs(e)?[]:Ru(e,this._c):[].concat(t),i],a=n[0],l=n.reduce((c,h)=>{const p=zo(e,h,r);return c.top=ne(p.top,c.top),c.right=Je(p.right,c.right),c.bottom=Je(p.bottom,c.bottom),c.left=ne(p.left,c.left),c},zo(e,a,r));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Iu(s){const{width:e,height:t}=Wn(s);return{width:e,height:t}}function Lu(s,e,t){const i=Ce(e),r=Ae(e),o=t==="fixed",n=ht(s,!0,o,e);let a={scrollLeft:0,scrollTop:0};const l=Ee(0);function c(){l.x=Js(r)}if(i||!i&&!o)if((Pt(e)!=="body"||ds(r))&&(a=Ks(e)),i){const u=ht(e,!0,o,e);l.x=u.x+e.clientLeft,l.y=u.y+e.clientTop}else r&&c();o&&!i&&r&&c();const h=r&&!i&&!o?Jn(r,a):Ee(0),p=n.left+a.scrollLeft-l.x-h.x,f=n.top+a.scrollTop-l.y-h.y;return{x:p,y:f,width:n.width,height:n.height}}function gi(s){return Se(s).position==="static"}function Vo(s,e){if(!Ce(s)||Se(s).position==="fixed")return null;if(e)return e(s);let t=s.offsetParent;return Ae(s)===t&&(t=t.ownerDocument.body),t}function Yn(s,e){const t=le(s);if(Hs(s))return t;if(!Ce(s)){let r=Ye(s);for(;r&&!At(r);){if(we(r)&&!gi(r))return r;r=Ye(r)}return t}let i=Vo(s,e);for(;i&&mu(i)&&gi(i);)i=Vo(i,e);return i&&At(i)&&gi(i)&&!Ws(i)?t:i||yu(s)||t}const Pu=async function(s){const e=this.getOffsetParent||Yn,t=this.getDimensions,i=await t(s.floating);return{reference:Lu(s.reference,await e(s.floating),s.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function Du(s){return Se(s).direction==="rtl"}const Cs={convertOffsetParentRelativeRectToViewportRelativeRect:$u,getDocumentElement:Ae,getClippingRect:Ou,getOffsetParent:Yn,getElementRects:Pu,getClientRects:xu,getDimensions:Iu,getScale:xt,isElement:we,isRTL:Du};function Zn(s,e){return s.x===e.x&&s.y===e.y&&s.width===e.width&&s.height===e.height}function Nu(s,e){let t=null,i;const r=Ae(s);function o(){var a;clearTimeout(i),(a=t)==null||a.disconnect(),t=null}function n(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),o();const c=s.getBoundingClientRect(),{left:h,top:p,width:f,height:u}=c;if(a||e(),!f||!u)return;const d=ws(p),v=ws(r.clientWidth-(h+f)),b=ws(r.clientHeight-(p+u)),y=ws(h),g={rootMargin:-d+"px "+-v+"px "+-b+"px "+-y+"px",threshold:ne(0,Je(1,l))||1};let k=!0;function A(T){const I=T[0].intersectionRatio;if(I!==l){if(!k)return n();I?n(!1,I):i=setTimeout(()=>{n(!1,1e-7)},1e3)}I===1&&!Zn(c,s.getBoundingClientRect())&&n(),k=!1}try{t=new IntersectionObserver(A,{...g,root:r.ownerDocument})}catch{t=new IntersectionObserver(A,g)}t.observe(s)}return n(!0),o}function Mu(s,e,t,i){i===void 0&&(i={});const{ancestorScroll:r=!0,ancestorResize:o=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=i,c=Lr(s),h=r||o?[...c?ns(c):[],...ns(e)]:[];h.forEach(y=>{r&&y.addEventListener("scroll",t,{passive:!0}),o&&y.addEventListener("resize",t)});const p=c&&a?Nu(c,t):null;let f=-1,u=null;n&&(u=new ResizeObserver(y=>{let[S]=y;S&&S.target===c&&u&&(u.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var g;(g=u)==null||g.observe(e)})),t()}),c&&!l&&u.observe(c),u.observe(e));let d,v=l?ht(s):null;l&&b();function b(){const y=ht(s);v&&!Zn(v,y)&&t(),v=y,d=requestAnimationFrame(b)}return t(),()=>{var y;h.forEach(S=>{r&&S.removeEventListener("scroll",t),o&&S.removeEventListener("resize",t)}),p==null||p(),(y=u)==null||y.disconnect(),u=null,l&&cancelAnimationFrame(d)}}const ju=du,Uu=hu,zu=au,Bo=uu,Vu=nu,Bu=(s,e,t)=>{const i=new Map,r={platform:Cs,...t},o={...r.platform,_c:i};return ou(s,e,{...r,platform:o})};function Fu(s){return qu(s)}function vi(s){return s.assignedSlot?s.assignedSlot:s.parentNode instanceof ShadowRoot?s.parentNode.host:s.parentNode}function qu(s){for(let e=s;e;e=vi(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=vi(s);e;e=vi(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if(t.display!=="contents"&&(t.position!=="static"||Ws(t)||e.tagName==="BODY"))return e}return null}function Hu(s){return s!==null&&typeof s=="object"&&"getBoundingClientRect"in s&&("contextElement"in s?s.contextElement instanceof Element:!0)}var j=class extends Z{constructor(){super(...arguments),this.localize=new Xe(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const s=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),t=this.placement.includes("top")||this.placement.includes("bottom");let i=0,r=0,o=0,n=0,a=0,l=0,c=0,h=0;t?s.top<e.top?(i=s.left,r=s.bottom,o=s.right,n=s.bottom,a=e.left,l=e.top,c=e.right,h=e.top):(i=e.left,r=e.bottom,o=e.right,n=e.bottom,a=s.left,l=s.top,c=s.right,h=s.top):s.left<e.left?(i=s.right,r=s.top,o=e.left,n=e.top,a=s.right,l=s.bottom,c=e.left,h=e.bottom):(i=e.right,r=e.top,o=s.left,n=s.top,a=e.right,l=e.bottom,c=s.left,h=s.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${o}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(s){super.updated(s),s.has("active")&&(this.active?this.start():this.stop()),s.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const s=this.getRootNode();this.anchorEl=s.getElementById(this.anchor)}else this.anchor instanceof Element||Hu(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Mu(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(s=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>s())):s()})}reposition(){if(!this.active||!this.anchorEl)return;const s=[ju({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?s.push(Bo({apply:({rects:t})=>{const i=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${t.reference.width}px`:"",this.popup.style.height=r?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&s.push(zu({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&s.push(Uu({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?s.push(Bo({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&s.push(Vu({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?t=>Cs.getOffsetParent(t,Fu):Cs.getOffsetParent;Bu(this.anchorEl,this.popup,{placement:this.placement,middleware:s,strategy:this.strategy,platform:Fs(ut({},Cs),{getOffsetParent:e})}).then(({x:t,y:i,middlewareData:r,placement:o})=>{const n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${t}px`,top:`${i}px`}),this.arrow){const l=r.arrow.x,c=r.arrow.y;let h="",p="",f="",u="";if(this.arrowPlacement==="start"){const d=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?d:"",u=n?"":d}else if(this.arrowPlacement==="end"){const d=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":d,u=n?d:"",f=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(u=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(u=typeof l=="number"?`${l}px`:"",h=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:h,right:p,bottom:f,left:u,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return _`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${pe({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${pe({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?_`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};j.styles=[ce,Kh];m([K(".popup")],j.prototype,"popup",2);m([K(".popup__arrow")],j.prototype,"arrowEl",2);m([w()],j.prototype,"anchor",2);m([w({type:Boolean,reflect:!0})],j.prototype,"active",2);m([w({reflect:!0})],j.prototype,"placement",2);m([w({reflect:!0})],j.prototype,"strategy",2);m([w({type:Number})],j.prototype,"distance",2);m([w({type:Number})],j.prototype,"skidding",2);m([w({type:Boolean})],j.prototype,"arrow",2);m([w({attribute:"arrow-placement"})],j.prototype,"arrowPlacement",2);m([w({attribute:"arrow-padding",type:Number})],j.prototype,"arrowPadding",2);m([w({type:Boolean})],j.prototype,"flip",2);m([w({attribute:"flip-fallback-placements",converter:{fromAttribute:s=>s.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:s=>s.join(" ")}})],j.prototype,"flipFallbackPlacements",2);m([w({attribute:"flip-fallback-strategy"})],j.prototype,"flipFallbackStrategy",2);m([w({type:Object})],j.prototype,"flipBoundary",2);m([w({attribute:"flip-padding",type:Number})],j.prototype,"flipPadding",2);m([w({type:Boolean})],j.prototype,"shift",2);m([w({type:Object})],j.prototype,"shiftBoundary",2);m([w({attribute:"shift-padding",type:Number})],j.prototype,"shiftPadding",2);m([w({attribute:"auto-size"})],j.prototype,"autoSize",2);m([w()],j.prototype,"sync",2);m([w({type:Object})],j.prototype,"autoSizeBoundary",2);m([w({attribute:"auto-size-padding",type:Number})],j.prototype,"autoSizePadding",2);m([w({attribute:"hover-bridge",type:Boolean})],j.prototype,"hoverBridge",2);var X=class extends Z{constructor(){super(),this.localize=new Xe(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=s=>{s.key==="Escape"&&(s.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const s=Po(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),s)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const s=Po(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),s)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var s;super.disconnectedCallback(),(s=this.closeWatcher)==null||s.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(s){return this.trigger.split(" ").includes(s)}async handleOpenChange(){var s,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((s=this.closeWatcher)==null||s.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await We(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:t,options:i}=Le(this,"tooltip.show",{dir:this.localize.dir()});await Pe(this.popup.popup,t,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await We(this.body);const{keyframes:t,options:i}=Le(this,"tooltip.hide",{dir:this.localize.dir()});await Pe(this.popup.popup,t,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Tt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Tt(this,"sl-after-hide")}render(){return _`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${pe({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};X.styles=[ce,Wh];X.dependencies={"sl-popup":j};m([K("slot:not([name])")],X.prototype,"defaultSlot",2);m([K(".tooltip__body")],X.prototype,"body",2);m([K("sl-popup")],X.prototype,"popup",2);m([w()],X.prototype,"content",2);m([w()],X.prototype,"placement",2);m([w({type:Boolean,reflect:!0})],X.prototype,"disabled",2);m([w({type:Number})],X.prototype,"distance",2);m([w({type:Boolean,reflect:!0})],X.prototype,"open",2);m([w({type:Number})],X.prototype,"skidding",2);m([w()],X.prototype,"trigger",2);m([w({type:Boolean})],X.prototype,"hoist",2);m([Y("open",{waitUntilFirstUpdate:!0})],X.prototype,"handleOpenChange",1);m([Y(["content","distance","hoist","placement","skidding"])],X.prototype,"handleOptionsChange",1);m([Y("disabled")],X.prototype,"handleDisabledChange",1);je("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});je("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});X.define("sl-tooltip");const Wu="Skip does nothing, leaving your local copy in place. Replace first stashes a copy of your local video before loading the shared copy into your library. Later, you can restore the prior local copy using vu (Video › Unstash).";class Vi extends D{constructor(){super(),this._videoName="",this._localModified=null,this._sharedModified=null,this._answer="skip",this._skipRef=ie()}show({videoName:e,localModified:t=null,sharedModified:i=null}){var r;this._videoName=e,this._localModified=t,this._sharedModified=i,this._answer="skip",(r=this.renderRoot.querySelector("llama-modal"))==null||r.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onReplace(){this._answer="replace",this.hide()}_onSkip(){this._answer="skip",this.hide()}_onInitialFocus(){var e;(e=this._skipRef.value)==null||e.focus()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),e.stopPropagation(),this._onSkip())}_onAfterHide(){const e=this._answer==="replace"?"ll-share-conflict-replace":"ll-share-conflict-skip";this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0})),this._answer="skip"}_fmtDate(e){return new Date(e).toLocaleString()}render(){const e=this._localModified||this._sharedModified;return _`
      <llama-modal label="Review conflict: shared video"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
        @keydown=${this._onKeyDown}
      >
        <div class="top-info">
          <sl-tooltip content=${Wu}>
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="section-heading">Video</div>
        <div class="video-name">${this._videoName}</div>

        ${e?_`
          <div class="section-heading">Last modified</div>
          <div class="dates">
            ${this._localModified?_`<span>Local</span><span>${this._fmtDate(this._localModified)}</span>`:""}
            ${this._sharedModified?_`<span>Shared</span><span>${this._fmtDate(this._sharedModified)}</span>`:""}
          </div>
        `:""}

        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button variant="primary" ${re(this._skipRef)} @click=${this._onSkip}>Skip</sl-button>
          <sl-button @click=${this._onReplace}>Replace</sl-button>
        </div>
      </llama-modal>
    `}}C(Vi,"styles",L`
    .top-info {
      margin: -1.25rem 0 1rem;
    }
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
      cursor: default;
      user-select: none;
    }
    .section-heading {
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
      margin-bottom: 0.25rem;
    }
    .video-name {
      font-weight: 500;
      padding-left: 1rem;
      margin-bottom: 0.75rem;
    }
    .dates {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.15rem 0.6rem;
      font-size: var(--ll-text-sm, 0.85rem);
      padding-left: 1rem;
      margin-bottom: 0.75rem;
    }
  `),C(Vi,"properties",{_videoName:{state:!0},_localModified:{state:!0},_sharedModified:{state:!0}});customElements.define("llama-shared-video-conflict-modal",Vi);const Ku={Backspace:"⌫"};function Ju(s){return Ku[s]??s}const Gu={v:"Video",c:"Chapter",s:"Section",l:"Loop",x:"Scratch",m:"Mark",d:"Data",j:"Jump",a:"App","`":"Menus","[":"Scratch start","]":"Scratch end"};class Bi extends D{constructor(){super(),this.prefix=null,this.completions=null,this.count=null,this.windowFocused=!0,this.editScratchActive=!1,this.warningMsg=null,this.errorMsg=null,this.statusMsg=null}_kbItem(e,t){return _`
      <span class="item">
        <span class="key">${e}</span>
        <span class="desc">${t}</span>
      </span>
    `}render(){if(this.errorMsg)return _`
        <div class="bar">
          <div class="row"><span class="error">${this.errorMsg}</span></div>
        </div>
      `;if(!this.windowFocused)return _`
        <div class="bar">
          <div class="row">
            <span class="warning">
              Key bindings inactive.
            </span>
          </div>
        </div>
      `;if(this.editScratchActive){const e=_`
        <div class="row">
          <span class="cheat-label">Scratch edit</span>
          ${this._kbItem("Tab","Toggle focus")}
          ${this._kbItem("Left","Decrease")}
          ${this._kbItem("Right","Increase")}
          ${this._kbItem("Down","Delta decrease")}
          ${this._kbItem("Up","Delta increase")}
          ${this._kbItem("⌫","Reset")}
          ${this._kbItem("Space","Play/pause")}
          ${this._kbItem("0-9","Time")}
          ${this._kbItem("Enter/Esc","Exit")}
        </div>
      `;return this.warningMsg?_`
          <div class="bar">
            <div class="row"><span class="warning">${this.warningMsg}</span></div>
            ${e}
          </div>
        `:_`<div class="bar">${e}</div>`}if(this.warningMsg)return _`
        <div class="bar">
          <div class="row"><span class="warning">${this.warningMsg}</span></div>
        </div>
      `;if(this.prefix&&this.completions){const e=Gu[this.prefix],t=e?_`<span class="prefix-label">${e}</span>`:null,i=this.count!=null?_`<span class="item"><span class="key">Count:</span><span class="state-val">${this.count}</span></span>`:null,r=Object.entries(this.completions).map(([o,{desc:n}])=>_`
        <span class="item">
          <span class="key">${this.prefix}${Ju(o)}</span>
          <span class="desc">${n}</span>
        </span>
      `);return _`<div class="bar"><div class="row">${t}${i}${r}</div></div>`}return this.count!=null?_`
        <div class="bar">
          <div class="row">
            <span class="item">
              <span class="key">Count:</span>
              <span class="state-val">${this.count}</span>
            </span>
          </div>
        </div>
      `:this.statusMsg?_`
        <div class="bar">
          <div class="row"><span class="status">${this.statusMsg}</span></div>
        </div>
      `:_``}}C(Bi,"styles",L`
    .bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #2a2a2a;
      border-top: 1px solid #444;
      padding: 0.35rem 1rem;
      font-family: monospace;
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      z-index: 100;
    }
    .row {
      display: flex;
      column-gap: 1.5rem;
      row-gap: 0.15rem;
      flex-wrap: wrap;
      align-items: baseline;
    }
    .item {
      display: flex;
      gap: 0.4rem;
      align-items: baseline;
    }
    .key {
      color: #7ec8e3;
      font-weight: bold;
    }
    .desc {
      color: #999;
    }
    .state-val {
      color: #e0e0e0;
    }
    .warning {
      color: #c8a97e;
      font-style: italic;
    }
    .error {
      color: #e37e7e;
      font-style: italic;
    }
    .cheat-label {
      color: #e3a857;
      font-weight: bold;
    }
    .prefix-label {
      color: #e3a857;
      font-weight: bold;
      margin-right: 0.25rem;
    }
    .status {
      color: var(--ll-text-dim, #aaa);
    }
  `),C(Bi,"properties",{prefix:{type:String},completions:{type:Object},count:{type:Number},windowFocused:{type:Boolean},editScratchActive:{type:Boolean},warningMsg:{type:String},errorMsg:{type:String},statusMsg:{type:String}});customElements.define("llama-whichkey",Bi);const Fo=/^\d+(\.\d+)?$/;function Ze(s){if(s=(s||"").trim().replace(/\//g,":"),!s)return null;const e=s.split(":");if(e.length===2||e.length===3){if(e.some(i=>!Fo.test(i)))return null;const t=e.map(Number);return e.length===2?t[0]*60+t[1]:t[0]*3600+t[1]*60+t[2]}return Fo.test(s)?Number(s):null}var Yu=L`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Q=class extends Z{constructor(){super(...arguments),this.localize=new Xe(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=s=>{this.open&&s.key==="Escape"&&(s.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=s=>{var e;if(s.key==="Escape"&&this.open&&!this.closeWatcher){s.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(s.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){s.preventDefault(),this.hide(),this.focusOnTrigger();return}const t=(i,r)=>{if(!i)return null;const o=i.closest(r);if(o)return o;const n=i.getRootNode();return n instanceof ShadowRoot?t(n.host,r):null};setTimeout(()=>{var i;const r=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?Ln():document.activeElement;(!this.containingElement||t(r,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=s=>{const e=s.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=s=>{const e=s.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const s=this.trigger.assignedElements({flatten:!0})[0];typeof(s==null?void 0:s.focus)=="function"&&s.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(s=>s.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(s){if([" ","Enter"].includes(s.key)){s.preventDefault(),this.handleTriggerClick();return}const e=this.getMenu();if(e){const t=e.getAllItems(),i=t[0],r=t[t.length-1];["ArrowDown","ArrowUp","Home","End"].includes(s.key)&&(s.preventDefault(),this.open||(this.show(),await this.updateComplete),t.length>0&&this.updateComplete.then(()=>{(s.key==="ArrowDown"||s.key==="Home")&&(e.setCurrentItem(i),i.focus()),(s.key==="ArrowUp"||s.key==="End")&&(e.setCurrentItem(r),r.focus())}))}}handleTriggerKeyUp(s){s.key===" "&&s.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const e=this.trigger.assignedElements({flatten:!0}).find(i=>gh(i).start);let t;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":t=e.button;break;default:t=e}t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Tt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Tt(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var s;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((s=this.closeWatcher)==null||s.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var s;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(s=this.closeWatcher)==null||s.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await We(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:s,options:e}=Le(this,"dropdown.show",{dir:this.localize.dir()});await Pe(this.popup.popup,s,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await We(this);const{keyframes:s,options:e}=Le(this,"dropdown.hide",{dir:this.localize.dir()});await Pe(this.popup.popup,s,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return _`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${P(this.sync?this.sync:void 0)}
        class=${pe({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};Q.styles=[ce,Yu];Q.dependencies={"sl-popup":j};m([K(".dropdown")],Q.prototype,"popup",2);m([K(".dropdown__trigger")],Q.prototype,"trigger",2);m([K(".dropdown__panel")],Q.prototype,"panel",2);m([w({type:Boolean,reflect:!0})],Q.prototype,"open",2);m([w({reflect:!0})],Q.prototype,"placement",2);m([w({type:Boolean,reflect:!0})],Q.prototype,"disabled",2);m([w({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Q.prototype,"stayOpenOnSelect",2);m([w({attribute:!1})],Q.prototype,"containingElement",2);m([w({type:Number})],Q.prototype,"distance",2);m([w({type:Number})],Q.prototype,"skidding",2);m([w({type:Boolean})],Q.prototype,"hoist",2);m([w({reflect:!0})],Q.prototype,"sync",2);m([Y("open",{waitUntilFirstUpdate:!0})],Q.prototype,"handleOpenChange",1);je("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});je("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});Q.define("sl-dropdown");var Zu=L`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Pr=class extends Z{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(s){const e=["menuitem","menuitemcheckbox"],t=s.composedPath(),i=t.find(a=>{var l;return e.includes(((l=a==null?void 0:a.getAttribute)==null?void 0:l.call(a,"role"))||"")});if(!i||t.find(a=>{var l;return((l=a==null?void 0:a.getAttribute)==null?void 0:l.call(a,"role"))==="menu"})!==this)return;const n=i;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}})}handleKeyDown(s){if(s.key==="Enter"||s.key===" "){const e=this.getCurrentItem();s.preventDefault(),s.stopPropagation(),e==null||e.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(s.key)){const e=this.getAllItems(),t=this.getCurrentItem();let i=t?e.indexOf(t):0;e.length>0&&(s.preventDefault(),s.stopPropagation(),s.key==="ArrowDown"?i++:s.key==="ArrowUp"?i--:s.key==="Home"?i=0:s.key==="End"&&(i=e.length-1),i<0&&(i=e.length-1),i>e.length-1&&(i=0),this.setCurrentItem(e[i]),e[i].focus())}}handleMouseDown(s){const e=s.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const s=this.getAllItems();s.length>0&&this.setCurrentItem(s[0])}isMenuItem(s){var e;return s.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=s.getAttribute("role"))!=null?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(s=>!(s.inert||!this.isMenuItem(s)))}getCurrentItem(){return this.getAllItems().find(s=>s.getAttribute("tabindex")==="0")}setCurrentItem(s){this.getAllItems().forEach(t=>{t.setAttribute("tabindex",t===s?"0":"-1")})}render(){return _`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Pr.styles=[ce,Zu];m([K("slot")],Pr.prototype,"defaultSlot",2);Pr.define("sl-menu");var Xu=L`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Qu=class{constructor(s,e){this.popupRef=ie(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=t=>{switch(t.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(t);break}},this.handleClick=t=>{var i;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&(t.target.tagName==="sl-menu-item"||(i=t.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=t=>{t.stopPropagation()},this.handlePopupReposition=()=>{const t=this.host.renderRoot.querySelector("slot[name='submenu']"),i=t==null?void 0:t.assignedElements({flatten:!0}).filter(c=>c.localName==="sl-menu")[0],r=getComputedStyle(this.host).direction==="rtl";if(!i)return;const{left:o,top:n,width:a,height:l}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${r?o+a:o}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${r?o+a:o}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`)},(this.host=s).addController(this),this.hasSlotController=e}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(s){const e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let t=null;for(const i of e.assignedElements())if(t=i.querySelectorAll("sl-menu-item, [role^='menuitem']"),t.length!==0)break;if(!(!t||t.length===0)){t[0].setAttribute("tabindex","0");for(let i=1;i!==t.length;++i)t[i].setAttribute("tabindex","-1");this.popupRef.value&&(s.preventDefault(),s.stopPropagation(),this.popupRef.value.active?t[0]instanceof HTMLElement&&t[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{t[0]instanceof HTMLElement&&t[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(s){this.popupRef.value&&this.popupRef.value.active!==s&&(this.popupRef.value.active=s,this.host.requestUpdate())}enableSubmenu(s=!0){s?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var s;if(!((s=this.host.parentElement)!=null&&s.computedStyleMap))return;const e=this.host.parentElement.computedStyleMap(),i=["padding-top","border-top-width","margin-top"].reduce((r,o)=>{var n;const a=(n=e.get(o))!=null?n:new CSSUnitValue(0,"px"),c=(a instanceof CSSUnitValue?a:new CSSUnitValue(0,"px")).to("px");return r-c.value},0);this.skidding=i}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const s=getComputedStyle(this.host).direction==="rtl";return this.isConnected?_`
      <sl-popup
        ${re(this.popupRef)}
        placement=${s?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:_` <slot name="submenu" hidden></slot> `}},he=class extends Z{constructor(){super(...arguments),this.localize=new Xe(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new cs(this,"submenu"),this.submenuController=new Qu(this,this.hasSlotController),this.handleHostClick=s=>{this.disabled&&(s.preventDefault(),s.stopImmediatePropagation())},this.handleMouseOver=s=>{this.focus(),s.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const s=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=s;return}s!==this.cachedTextLabel&&(this.cachedTextLabel=s,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return Vh(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const s=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return _`
      <div
        id="anchor"
        part="base"
        class=${pe({"menu-item":!0,"menu-item--rtl":s,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!e}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${s?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?_` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};he.styles=[ce,Xu];he.dependencies={"sl-icon":fe,"sl-popup":j,"sl-spinner":Cr};m([K("slot:not([name])")],he.prototype,"defaultSlot",2);m([K(".menu-item")],he.prototype,"menuItem",2);m([w()],he.prototype,"type",2);m([w({type:Boolean,reflect:!0})],he.prototype,"checked",2);m([w()],he.prototype,"value",2);m([w({type:Boolean,reflect:!0})],he.prototype,"loading",2);m([w({type:Boolean,reflect:!0})],he.prototype,"disabled",2);m([Y("checked")],he.prototype,"handleCheckedChange",1);m([Y("disabled")],he.prototype,"handleDisabledChange",1);m([Y("type")],he.prototype,"handleTypeChange",1);he.define("sl-menu-item");var ep=L`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,Gs=class extends Z{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};Gs.styles=[ce,ep];m([w({type:Boolean,reflect:!0})],Gs.prototype,"vertical",2);m([Y("vertical")],Gs.prototype,"handleVerticalChange",1);Gs.define("sl-divider");class Fi extends D{constructor(){super(),this.label="",this.items=[]}open(){const e=this.renderRoot.querySelector("sl-dropdown");e&&e.show().then(()=>{var t;(t=this.renderRoot.querySelector("sl-menu-item:not([disabled])"))==null||t.focus()})}_onMenuOpen(){this.dispatchEvent(new CustomEvent("ll-menu-open",{bubbles:!0,composed:!0}))}_onMenuClose(){var e;(e=this.renderRoot.querySelector(".trigger-btn"))==null||e.blur(),this.dispatchEvent(new CustomEvent("ll-menu-close",{bubbles:!0,composed:!0}))}_onSelect(e){const t=e.detail.item.value,i=e.detail.item.textContent.trim();this.dispatchEvent(new CustomEvent("ll-menu-select",{bubbles:!0,composed:!0,detail:{action:t,label:i}}))}render(){return _`
      <sl-dropdown @sl-show=${this._onMenuOpen} @sl-after-hide=${this._onMenuClose} @sl-select=${this._onSelect}>
        <button slot="trigger" class="trigger-btn" part="trigger">
          ${this.label}<span class="caret">▾</span>
        </button>
        <sl-menu>
          ${this.items.map(e=>e.type==="divider"?_`<sl-divider></sl-divider>`:_`
                <sl-menu-item
                  value=${e.action??""}
                  ?disabled=${e.disabled??!1}
                >${e.label}${e.hint?_`<span slot="suffix" class="hint">${e.hint}</span>`:""}</sl-menu-item>
              `)}
        </sl-menu>
      </sl-dropdown>
    `}}C(Fi,"styles",L`
    :host {
      display: inline-block;
    }

    .trigger-btn {
      padding: 0.25rem 0.7rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    .trigger-btn:hover {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
    }

    .caret {
      font-size: 0.7em;
      margin-left: 0.3em;
      opacity: 0.65;
    }

    .hint {
      opacity: 0.55;
      padding-left: 1.5em;
    }
  `),C(Fi,"properties",{label:{type:String},items:{type:Array}});customElements.define("llama-dropdown",Fi);var tp=L`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,Xn=(s="value")=>(e,t)=>{const i=e.constructor,r=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(o,n,a){var l;const c=i.getPropertyOptions(s),h=typeof c.attribute=="string"?c.attribute:s;if(o===h){const p=c.converter||Et,u=(typeof p=="function"?p:(l=p==null?void 0:p.fromAttribute)!=null?l:Et.fromAttribute)(a,c.type);this[s]!==u&&(this[t]=u)}r.call(this,o,n,a)}},Qn=L`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ea=wr(class extends Sr{constructor(s){if(super(s),s.type!==Fe.PROPERTY&&s.type!==Fe.ATTRIBUTE&&s.type!==Fe.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!An(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===ye||e===B)return e;const t=s.element,i=s.name;if(s.type===Fe.PROPERTY){if(e===t[i])return ye}else if(s.type===Fe.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return ye}else if(s.type===Fe.ATTRIBUTE&&t.getAttribute(i)===e+"")return ye;return Zd(s),e}});var ee=class extends Z{constructor(){super(...arguments),this.formControlController=new Tr(this,{value:s=>s.checked?s.value||"on":void 0,defaultValue:s=>s.defaultChecked,setValue:(s,e)=>s.checked=e}),this.hasSlotController=new cs(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(s){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(s)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(s){s.key==="ArrowLeft"&&(s.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),s.key==="ArrowRight"&&(s.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(s){this.input.focus(s)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(s){this.input.setCustomValidity(s),this.formControlController.updateValidity()}render(){const s=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!s;return _`
      <div
        class=${pe({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${pe({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${P(this.value)}
            .checked=${ea(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ee.styles=[ce,Qn,tp];m([K('input[type="checkbox"]')],ee.prototype,"input",2);m([Ot()],ee.prototype,"hasFocus",2);m([w()],ee.prototype,"title",2);m([w()],ee.prototype,"name",2);m([w()],ee.prototype,"value",2);m([w({reflect:!0})],ee.prototype,"size",2);m([w({type:Boolean,reflect:!0})],ee.prototype,"disabled",2);m([w({type:Boolean,reflect:!0})],ee.prototype,"checked",2);m([Xn("checked")],ee.prototype,"defaultChecked",2);m([w({reflect:!0})],ee.prototype,"form",2);m([w({type:Boolean,reflect:!0})],ee.prototype,"required",2);m([w({attribute:"help-text"})],ee.prototype,"helpText",2);m([Y("checked",{waitUntilFirstUpdate:!0})],ee.prototype,"handleCheckedChange",1);m([Y("disabled",{waitUntilFirstUpdate:!0})],ee.prototype,"handleDisabledChange",1);ee.define("sl-switch");const sp={Backspace:"⌫"};function _i(s){return sp[s]??s}function x(s){const e=[],t=[];for(const[i,r]of Object.entries(Ii))if(r.handler===s&&t.push(_i(i)),r.completions)for(const[o,n]of Object.entries(r.completions))n.handler===s&&e.push(_i(i)+_i(o));return[...e,...t].join(" · ")}const ip=[{label:"Video",items:[{label:"Load URL",action:"videoUrl",hint:x("videoUrl")},{label:"Open...",action:"videoPickerRecent",hint:x("videoPickerRecent")},{label:"Edit",action:"editVideo",hint:x("editVideo")},{label:"Scratch",action:"scratchVideo",hint:x("scratchVideo")},{label:"Zoom",action:"zoomVideo",hint:x("zoomVideo")},{label:"Delete...",action:"deleteVideo",hint:x("deleteVideo")},{label:"Unstash...",action:"restoreVideo",hint:x("restoreVideo")},{label:"Info",action:"videoInfo",hint:x("videoInfo")}]},{label:"Chapter",items:[{label:"Create",action:"setChapter",hint:x("setChapter")},{label:"Edit",action:"editChapter",hint:x("editChapter")},{label:"Scratch",action:"scratchChapter",hint:x("scratchChapter")},{label:"Jump...",action:"jumpChapter",hint:x("jumpChapter")},{label:"Zoom",action:"zoomChapter",hint:x("zoomChapter")},{label:"Fix end",action:"fixChapter",hint:x("fixChapter")},{label:"Delete...",action:"deleteChapter",hint:x("deleteChapter")}]},{label:"Section",items:[{label:"Create",action:"setSection",hint:x("setSection")},{label:"Edit",action:"editSection",hint:x("editSection")},{label:"Scratch",action:"scratchSection",hint:x("scratchSection")},{label:"Jump...",action:"jumpSection",hint:x("jumpSection")},{label:"Zoom",action:"zoomSection",hint:x("zoomSection")},{label:"Fix end",action:"fixSection",hint:x("fixSection")},{label:"Delete...",action:"deleteSection",hint:x("deleteSection")}]},{label:"Loop",items:[{label:"Create",action:"saveLoop",hint:x("saveLoop")},{label:"Edit",action:"editLoop",hint:x("editLoop")},{label:"Scratch",action:"scratchLoop",hint:x("scratchLoop")},{label:"Jump...",action:"jumpLoop",hint:x("jumpLoop")},{label:"Zoom",action:"zoomLoop",hint:x("zoomLoop")},{label:"Delete...",action:"deleteLoop",hint:x("deleteLoop")}]},{label:"Scratch",items:[{label:"Toggle",action:"toggleLoop",hint:x("toggleLoop")},{label:"Edit mode",action:"editScratch",hint:x("editScratch")},{label:"Zoom",action:"zoomScratch",hint:x("zoomScratch")},{type:"divider"},{label:"Save to source",action:"saveBack",hint:x("saveBack")},{label:"Reset to source",action:"resetLoopToSource",hint:x("resetLoopToSource")},{label:"Unlink source",action:"unlinkLoopSource",hint:x("unlinkLoopSource")}]},{label:"Mark",items:[{label:"Create",action:"setMark",hint:x("setMark")},{label:"Edit",action:"editMark",hint:x("editMark")},{label:"Jump...",action:"jumpMark",hint:x("jumpMark")},{label:"Delete...",action:"deleteMark",hint:x("deleteMark")}]},{label:"Data",items:[{label:"Share video",action:"shareVideo",hint:x("shareVideo")},{label:"Share scratch loop",action:"shareLoop",hint:x("shareLoop")},{type:"divider"},{label:"Export",action:"exportAll",hint:x("exportAll")},{label:"Import",action:"importData",hint:x("importData")},{label:"Inspect",action:"inspectData",hint:x("inspectData")},{type:"divider"},{label:"Save to cloud",action:"dataSave",hint:x("dataSave")},{label:"Read from cloud",action:"dataRead",hint:x("dataRead")},{label:"Compare",action:"dataCompare",hint:x("dataCompare")},{type:"divider"},{label:"Delete...",action:"deleteData",hint:x("deleteData")}]},{label:"App",items:[{label:"Jump history...",action:"jumpHistory",hint:x("jumpHistory")},{label:"Back",action:"jumpBack",hint:x("jumpBack")},{label:"Forward",action:"jumpForward",hint:x("jumpForward")},{type:"divider"},{label:"Undo",action:"undo",hint:x("undo")},{label:"Redo",action:"redo",hint:x("redo")},{label:"Clear history",action:"clearHistory",hint:x("clearHistory")},{type:"divider"},{label:"Recall message",action:"msgRecall",hint:x("msgRecall")},{label:"Copy time",action:"copyTime",hint:x("copyTime")},{label:"Toggle timeline",action:"toggleZone2",hint:x("toggleZone2")},{label:"Zoom off",action:"zoomOff",hint:x("zoomOff")},{type:"divider"},{label:"Options",action:"options",hint:x("options")}]}],rp=[{label:"Help",action:"helpGeneral",hint:x("helpGeneral")},{label:"Key bindings",action:"helpKeys",hint:x("helpKeys")},{label:"Load examples",action:"loadExamples",hint:x("loadExamples")},{type:"divider"},{label:"The Fifth Fret",action:"siteHome"},{label:"Code",action:"siteCode"},{label:"Issues",action:"siteIssues"}];function se(s,e){return _`<span slot="content">${s}<span style="color:#888;margin-left:0.75em;">${e}</span></span>`}class qi extends D{constructor(){super(),this.currentTime=0,this.speed=1,this.isPlaying=!1,this.looping=!1,this.loopStart=0,this.loopEnd=0,this.loopSrc=null,this.seekDelta=M.seek_delta_default,this.seekDeltaChoices=M.seek_delta_choices,this.loopNudgeDelta=M.loop_nudge_delta_default,this.loopNudgeDeltaChoices=M.loop_nudge_delta_choices,this.editScratchActive=!1,this.editScratchFocus="start",this.activeEntityType="any",this._playPauseRef=ie(),this._timeRef=ie(),this._timeFocused=!1,this._startRef=ie(),this._endRef=ie(),this._speedRef=ie(),this._entitySelectRef=ie(),this._seekDeltaRef=ie(),this._nudgeDeltaRef=ie()}_fmt(e){if(e==null)return"?";if(this.seekDelta<1){const o=Math.round(e*10)/10,n=Math.floor(o/60),a=o%60;return`${n}:${a.toFixed(1).padStart(4,"0")}`}const t=Math.round(e),i=Math.floor(t/60),r=(t%60).toString().padStart(2,"0");return`${i}:${r}`}_fmtDelta(e){return e<60?`${e}s`:`${e/60}m`}_fmtLoop(e){if(e==null)return"?";if(this.loopNudgeDelta<1){const o=Math.round(e*10)/10,n=Math.floor(o/60),a=o%60;return`${n}:${a.toFixed(1).padStart(4,"0")}`}const t=Math.round(e),i=Math.floor(t/60),r=(t%60).toString().padStart(2,"0");return`${i}:${r}`}_parseTime(e){return Ze(e)}_parseSpeed(e){e=e.trim().replace(/%$/,"");const t=parseFloat(e);return isNaN(t)||t<=0?null:t>4?t/100:t}_emit(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}firstUpdated(){this._timeRef.value&&(this._timeRef.value.value=this._fmt(this.currentTime)),this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart)),this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd)),this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}`)}updated(e){(e.has("currentTime")||e.has("seekDelta"))&&this._timeRef.value&&!this._timeFocused&&(this._timeRef.value.value=this._fmt(this.currentTime)),(e.has("loopStart")||e.has("loopNudgeDelta"))&&this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart)),(e.has("loopEnd")||e.has("loopNudgeDelta"))&&this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd)),e.has("speed")&&this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}`),e.has("loopNudgeDelta")&&this._nudgeDeltaRef.value&&(this._nudgeDeltaRef.value.value=String(this.loopNudgeDelta))}_submitStart(){var t;const e=this._parseTime(((t=this._startRef.value)==null?void 0:t.value)??"");e!==null?this._emit("ll-loop-start-change",{value:e}):this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart),this._emit("ll-invalid-time",{}))}_submitEnd(){var t;const e=this._parseTime(((t=this._endRef.value)==null?void 0:t.value)??"");e!==null?this._emit("ll-loop-end-change",{value:e}):this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd),this._emit("ll-invalid-time",{}))}_submitSpeed(){var t;const e=this._parseSpeed(((t=this._speedRef.value)==null?void 0:t.value)??"");e!==null?this._emit("ll-speed-change",{value:e}):this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}`)}_onSpeedPreset(e){const t=parseInt(e.target.value);e.target.selectedIndex=0,e.target.blur(),!isNaN(t)&&(this._speedRef.value&&(this._speedRef.value.value=`${t}`),this._emit("ll-speed-change",{value:t/100}))}focusTimeInput(){const e=this._timeRef.value;e&&(e.focus(),e.select())}_onTimeKeyDown(e){var t;if(e.key==="Enter"){const i=this._parseTime(((t=this._timeRef.value)==null?void 0:t.value)??"");i!==null&&this._emit("ll-seek-to",{value:i}),e.target.blur()}else e.key==="Escape"&&e.target.blur()}focusStartInput(){var e,t;(e=this._startRef.value)==null||e.focus(),(t=this._startRef.value)==null||t.select()}focusEndInput(){var e,t;(e=this._endRef.value)==null||e.focus(),(t=this._endRef.value)==null||t.select()}focusEntitySelect(){var e;(e=this._entitySelectRef.value)==null||e.focus()}openMenu(e){const t=this.renderRoot.querySelectorAll("llama-dropdown");for(const i of t)if(i.label===e){i.open();return}}focusNudgeDeltaSelect(){var e;(e=this._nudgeDeltaRef.value)==null||e.focus()}flash(e,t="timed"){var o;const r=(o={playPause:this._playPauseRef,time:this._timeRef,speed:this._speedRef,seekDelta:this._seekDeltaRef,loopStart:this._startRef,loopEnd:this._endRef,nudgeDelta:this._nudgeDeltaRef,entitySelect:this._entitySelectRef}[e])==null?void 0:o.value;if(r)if(this._flashTimers??(this._flashTimers={}),this._flashListeners??(this._flashListeners={}),clearTimeout(this._flashTimers[e]),this._flashListeners[e]&&(r.removeEventListener("blur",this._flashListeners[e]),this._flashListeners[e]=null),r.classList.add("kb-flash"),t==="until-blur"){const n=()=>{r.classList.remove("kb-flash"),this._flashListeners[e]=null};this._flashListeners[e]=n,r.addEventListener("blur",n,{once:!0})}else this._flashTimers[e]=setTimeout(()=>r.classList.remove("kb-flash"),1500)}render(){var e;return _`
      <div class="controls-wrap ${this.editScratchActive?"edit-scratch-active":""}">

        <div class="ctrl-groups">

          <div class="ctrl-group">
            <span class="ctrl-group-label">Play</span>
            <div class="ctrl-group-body">
              <sl-tooltip>${se("Play / pause","Space")}
                <button class="btn-play-pause" ${re(this._playPauseRef)} @click=${()=>this._emit("ll-play-pause")}>
                  ${this.isPlaying?"Pause":"Play"}
                </button>
              </sl-tooltip>
              <sl-tooltip>${se("Seek to time","jj")}
                <input
                  ${re(this._timeRef)}
                  class="time-input-play"
                  type="text"
                  @focus=${()=>{var t;this._timeFocused=!0,(t=this._timeRef.value)==null||t.select()}}
                  @blur=${()=>{this._timeFocused=!1,this._timeRef.value&&(this._timeRef.value.value=this._fmt(this.currentTime))}}
                  @keydown=${this._onTimeKeyDown}
                />
              </sl-tooltip>
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Speed</span>
            <div class="ctrl-group-body">
              <div class="btn-group">
                <sl-tooltip>${se("Speed","- / =")}
                  <input
                    ${re(this._speedRef)}
                    class="speed-input"
                    type="text"
                    @keydown=${t=>{t.key==="Enter"&&(this._submitSpeed(),t.target.blur())}}
                    @blur=${()=>this._submitSpeed()}
                  />
                </sl-tooltip>
                <select class="speed-preset" @change=${this._onSpeedPreset}>
                  <option value="">▾</option>
                  ${[25,30,40,50,60,70,75,80,85,90,95,100,110,125,150,200].map(t=>_`<option value="${t}">${t}</option>`)}
                </select>
              </div>
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Navigate</span>
            <div class="ctrl-group-body">
              <div class="btn-group">
                <sl-tooltip>${se("Seek back","←")}
                  <button class="btn-accent" @click=${()=>this._emit("ll-seek-back")}>◀</button>
                </sl-tooltip>
                <sl-tooltip>${se("Seek delta","↓ / ↑")}
                  <select
                    ${re(this._seekDeltaRef)}
                    class="delta-select"
                    @change=${t=>{this._emit("ll-seek-delta-change",{value:Number(t.target.value)}),t.target.blur()}}
                  >
                    ${[...this.seekDeltaChoices].sort((t,i)=>i-t).map(t=>_`
                      <option value=${t} ?selected=${this.seekDelta===t}>${this._fmtDelta(t)}</option>
                    `)}
                  </select>
                </sl-tooltip>
                <sl-tooltip>${se("Seek forward","→")}
                  <button class="btn-accent" @click=${()=>this._emit("ll-seek-forward")}>▶</button>
                </sl-tooltip>
              </div>
              <div class="btn-group">
                <sl-tooltip>${se("Prev entity",",")}
                  <button class="btn-accent" @click=${()=>this._emit("ll-prev-entity")}>⏮</button>
                </sl-tooltip>
                <sl-tooltip>${se("Entity type","/")}
                  <select
                    ${re(this._entitySelectRef)}
                    class="entity-type-select"
                    @change=${t=>{this._emit("ll-entity-type-change",{value:t.target.value}),t.target.blur()}}
                    @keydown=${t=>{(t.key==="Enter"||t.key==="Escape")&&t.target.blur()}}
                  >
                    <option value="any"     ?selected=${this.activeEntityType==="any"}>Any</option>
                    <option value="chapter" ?selected=${this.activeEntityType==="chapter"}>Chapter</option>
                    <option value="section" ?selected=${this.activeEntityType==="section"}>Section</option>
                    <option value="loop"    ?selected=${this.activeEntityType==="loop"}>Loop</option>
                    <option value="mark"    ?selected=${this.activeEntityType==="mark"}>Mark</option>
                  </select>
                </sl-tooltip>
                <sl-tooltip>${se("Next entity",".")}
                  <button class="btn-accent" @click=${()=>this._emit("ll-next-entity")}>⏭</button>
                </sl-tooltip>
              </div>
            </div>
          </div>

          <div class="ctrl-group looping-group">
            <span class="ctrl-group-label">Scratch loop</span>
            <div class="ctrl-group-body">
              <sl-tooltip>${se("Toggle looping","ll")}
                <sl-switch
                  class="loop-switch"
                  ?checked=${this.looping}
                  @sl-change=${()=>this._emit("ll-toggle-loop")}
                ></sl-switch>
              </sl-tooltip>
              <div class="btn-group">
                <sl-tooltip>${se("Set loop start to now","[[")}
                  <button
                    class="btn-now"
                    @click=${()=>this._emit("ll-set-loop-start-now")}
                  >Now</button>
                </sl-tooltip>
                <sl-tooltip>${se("Edit loop start","[\\")}
                  <input
                    ${re(this._startRef)}
                    class="time-input align-left ${this.editScratchActive&&this.editScratchFocus==="start"?"loop-edit-focus":""} ${this.loopStart>=this.loopEnd?"loop-invalid":""} ${this.loopSrc&&this.currentTime<this.loopSrc.start?"source-outside":""}"
                    type="text"
                    @keydown=${t=>{t.key==="Enter"?(this._submitStart(),t.target.blur()):t.key==="Escape"&&(t.target.value=this._fmtLoop(this.loopStart),t.target.blur())}}
                    @blur=${()=>this._submitStart()}
                  />
                </sl-tooltip>
              </div>
              <sl-tooltip>${se("Nudge delta","[]")}
                <select
                  ${re(this._nudgeDeltaRef)}
                  class="delta-select"
                  @change=${t=>{this._emit("ll-loop-nudge-delta-change",{value:Number(t.target.value)}),t.target.blur()}}
                  @keydown=${t=>{(t.key==="Enter"||t.key==="Escape")&&t.target.blur()}}
                >
                  ${[...this.loopNudgeDeltaChoices].sort((t,i)=>i-t).map(t=>_`
                    <option value=${t} ?selected=${this.loopNudgeDelta===t}>${this._fmtDelta(t)}</option>
                  `)}
                </select>
              </sl-tooltip>
              <div class="btn-group">
                <sl-tooltip>${se("Edit loop end","]\\")}
                  <input
                    ${re(this._endRef)}
                    class="time-input ${this.editScratchActive&&this.editScratchFocus==="end"?"loop-edit-focus":""} ${this.loopStart>=this.loopEnd?"loop-invalid":""} ${((e=this.loopSrc)==null?void 0:e.end)!=null&&this.currentTime>this.loopSrc.end?"source-outside":""}"
                    type="text"
                    @keydown=${t=>{t.key==="Enter"?(this._submitEnd(),t.target.blur()):t.key==="Escape"&&(t.target.value=this._fmtLoop(this.loopEnd),t.target.blur())}}
                    @blur=${()=>this._submitEnd()}
                  />
                </sl-tooltip>
                <sl-tooltip>${se("Set loop end to now","]]")}
                  <button
                    class="btn-now"
                    @click=${()=>this._emit("ll-set-loop-end-now")}
                  >Now</button>
                </sl-tooltip>
              </div>
            </div>
          </div>

        </div>

        <div class="controls-row menus-row">
          ${ip.map(t=>_`
            <llama-dropdown .label=${t.label} .items=${t.items}></llama-dropdown>
          `)}
        </div>

      </div>
    `}}C(qi,"styles",L`
    :host {
      display: block;
    }

    .controls-wrap {
      display: flex;
      flex-direction: column;
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
    }

    /* --- Labeled control groups row --- */

    .ctrl-groups {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }

    .ctrl-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.35rem 0.75rem;
      border-right: 1px solid var(--ll-border, #444);
    }

    .ctrl-group:last-child {
      border-right: none;
    }

    .ctrl-group-label {
      font-size: 0.7rem;
      color: var(--ll-text-muted, #666);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .ctrl-group-body {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    /* --- Button groups: zero-gap connected controls --- */

    .btn-group {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .btn-group > * {
      border-radius: 0;
    }

    .btn-group > * + * {
      margin-left: -1px;
    }

    .btn-group > *:first-child {
      border-radius: var(--ll-radius, 3px) 0 0 var(--ll-radius, 3px);
    }

    .btn-group > *:last-child {
      border-radius: 0 var(--ll-radius, 3px) var(--ll-radius, 3px) 0;
    }

    /* Bring the active/hovered element's border to the front. */
    .btn-group > *:hover,
    .btn-group > *:focus {
      position: relative;
      z-index: 1;
    }

    /* sl-tooltip inside btn-group must not generate a box of its own,
       so the border-radius / margin rules still target the inner button. */
    .btn-group > sl-tooltip {
      display: contents;
    }

    /* --- Menus row --- */

    .controls-row {
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem) var(--ll-pad-lg, 1rem);
      border-top: 1px solid var(--ll-border, #444);
    }

    .menus-row {
      flex-wrap: wrap;
    }

    /* --- Buttons --- */

    button {
      padding: 0.25rem 0.7rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      line-height: 1;
      cursor: pointer;
    }

    button:hover {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
    }

    .btn-play-pause {
      min-width: 4rem;
      background: var(--ll-accent, #7ec8e3);
      border-color: var(--ll-accent, #7ec8e3);
      color: #1a1a1a;
    }

    .btn-play-pause:hover {
      background: #9fd5e8;
      border-color: #9fd5e8;
      color: #1a1a1a;
    }

    /* Accent-colored buttons: Play/Pause, Now, and nav/seek buttons. */
    .btn-now,
    .btn-accent {
      background: var(--ll-accent, #7ec8e3);
      border-color: var(--ll-accent, #7ec8e3);
      color: #1a1a1a;
    }

    .btn-now:hover,
    .btn-accent:hover {
      background: #9fd5e8;
      border-color: #9fd5e8;
      color: #1a1a1a;
    }

    /* Loop toggle switch. */
    .loop-switch {
      --sl-color-primary-600: var(--ll-accent, #7ec8e3);
      --sl-color-primary-500: var(--ll-accent, #7ec8e3);
      --sl-color-primary-400: #9fd5e8;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }

    /* --- Text displays and inputs --- */

    /* Standalone time textbox in the Play group. */
    .time-input-play {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 7ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-accent, #7ec8e3);
      text-align: left;
    }

    .time-input-play:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    /* Delta dropdowns (seek_delta, loop_nudge_delta). */
    select.delta-select {
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    select.delta-select:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .time-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 7ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      color: var(--ll-text, #e0e0e0);
      text-align: right;
    }

    .time-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .time-input.align-left {
      text-align: left;
    }

    .time-input.loop-edit-focus {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent-warm, #e3a857);
    }

    .time-input.loop-invalid {
      color: var(--ll-danger, #e05a5a);
    }

    .time-input.source-outside {
      color: var(--ll-accent-warm, #e3a857);
    }

    .speed-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 3.5ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text-dim, #aaa);
      text-align: left;
    }

    .speed-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .speed-preset {
      appearance: none;
      -webkit-appearance: none;
      font-size: var(--ll-text-sm, 0.85rem);
      width: 1.6rem;
      padding: 0.2rem 0;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text-dim, #aaa);
      cursor: pointer;
      text-align: center;
    }

    .speed-preset:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    select.entity-type-select {
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    select.entity-type-select:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    /* --- Edit-scratch mode --- */

    /* Highlight the Looping group; dim everything else. */
    .controls-wrap.edit-scratch-active .ctrl-group:not(.looping-group) {
      opacity: 0.35;
    }

    .controls-wrap.edit-scratch-active .looping-group {
      background: rgba(227, 168, 87, 0.07);
      box-shadow: inset 3px 0 0 var(--ll-accent-warm, #e3a857);
    }

    .controls-wrap.edit-scratch-active .menus-row {
      opacity: 0.35;
    }

    /* Temporary highlight when a keyboard binding modifies a control. */
    .kb-flash {
      border-color: var(--ll-accent-warm, #f0c040) !important;
      box-shadow: 0 0 0 1px var(--ll-accent-warm, #f0c040) !important;
      position: relative;
      z-index: 1;
    }
  `),C(qi,"properties",{currentTime:{type:Number},speed:{type:Number},isPlaying:{type:Boolean},looping:{type:Boolean},loopStart:{type:Number},loopEnd:{type:Number},loopSrc:{type:Object},seekDelta:{type:Number},seekDeltaChoices:{type:Array},loopNudgeDelta:{type:Number},loopNudgeDeltaChoices:{type:Array},editScratchActive:{type:Boolean},editScratchFocus:{type:String},activeEntityType:{type:String}});customElements.define("llama-controls",qi);class Hi extends D{constructor(){super(),this.videoId=null,this.currentTime=0,this.duration=null,this.sections=[],this.chapters=[],this.zone2Mode="sections",this.marks=[],this.namedLoops=[],this.loopStart=0,this.loopEnd=0,this.scopeStart=null,this.scopeEnd=null,this.zoomed=!1,this._zoneWidth=0,this._ro=null,this._hoverX=null,this._hoverTime=null}firstUpdated(){this._ro=new ResizeObserver(e=>{this._zoneWidth=e[0].contentRect.width}),this._ro.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._ro)==null||e.disconnect()}_pct(e){const t=this.scopeStart??0,i=this.scopeEnd??this.duration;return!i||i<=t?0:Math.max(0,Math.min(100,(e-t)/(i-t)*100))}_fmt(e){if(e==null)return"?";const t=Math.round(e),i=Math.floor(t/60),r=(t%60).toString().padStart(2,"0");return`${i}:${r}`}_computeRegions(e){return e.map((t,i)=>{const r=e[i+1],o=t.end!=null?t.end:r?r.start:this.duration;return{start:t.start,end:o,name:t.name,isCurrent:this.currentTime>=t.start&&this.currentTime<o}})}_tipContent(e,t,i){return _`<span class="tip-meta">${e}</span> <span class="tip-meta">${t}</span>${i?_` <span class="tip-meta">•</span> <span class="tip-label">${i}</span>`:""}`}_renderSections(){const e=this.zone2Mode==="chapters"?this.chapters:this.sections;return e!=null&&e.length?this._computeRegions(e).map((i,r)=>{const o=this._pct(i.start),a=(i.end!=null?this._pct(i.end):100)-o;a/100*this._zoneWidth;const l=this.zone2Mode==="chapters"?"Chapter":"Section",c=r%2===0?"section-region--even":"section-region--odd",h=i.isCurrent?"section-region--current":c;return _`
        <sl-tooltip hoist>
          <span slot="content">${this._tipContent(l,this._fmt(i.start),i.name)}</span>
          <div
            class="section-region ${h}"
            style="left: ${o}%; width: ${a}%"
            @click=${()=>this._onSectionClick(i)}
          ><span class="section-label">${i.name}</span></div>
        </sl-tooltip>
      `}):""}_inScope(e){const t=this.scopeStart??0,i=this.scopeEnd??this.duration;return e>=t&&e<=i}_loopInScope(e){const t=this.scopeStart??0,i=this.scopeEnd??this.duration;return e.end>t&&e.start<i}_packLoops(e){const t=[[],[]];for(const i of[...e].sort((r,o)=>r.start-o.start)){let r=!1;for(const o of t)if(!o.some(n=>i.start<n.end&&i.end>n.start)){o.push(i),r=!0;break}r||t[1].push(i)}return t}_renderMarks(){return(this.marks??[]).filter(e=>this._inScope(e.time)).map(e=>_`
          <sl-tooltip hoist>
            <span slot="content">${this._tipContent("Mark",this._fmt(e.time),e.name)}</span>
            <div
              class="mark-dot"
              style="left: ${this._pct(e.time)}%"
              @click=${()=>this._onMarkClick(e)}
            ></div>
          </sl-tooltip>
        `)}_renderLoops(){const e=[];if(this.loopEnd>this.loopStart){const i={_scratch:!0,start:this.loopStart,end:this.loopEnd};if(this._loopInScope(i)){const r=this._pct(i.start),o=this._pct(i.end)-r;e.push(_`
          <sl-tooltip hoist>
            <span slot="content">${this._tipContent("Scratch Loop",this._fmt(i.start),"")}</span>
            <div
              class="loop-bar loop-bar--scratch"
              style="left: ${r}%; width: ${o}%; top: 0px"
              @click=${()=>this._onLoopBarClick(i)}
            ></div>
          </sl-tooltip>
        `)}}return this._packLoops(this.namedLoops??[]).forEach((i,r)=>{const o=(r+1)*7;for(const n of i){if(!this._loopInScope(n))continue;const a=this._pct(n.start),l=this._pct(n.end)-a;e.push(_`
          <sl-tooltip hoist>
            <span slot="content">${this._tipContent("Loop",this._fmt(n.start),n.name)}</span>
            <div
              class="loop-bar"
              style="left: ${a}%; width: ${l}%; top: ${o}px"
              @click=${()=>this._onLoopBarClick(n)}
            ></div>
          </sl-tooltip>
        `)}}),e}_onPlayZoneMouseMove(e){if(!this.duration)return;const t=this.scopeStart??0,i=this.scopeEnd??this.duration,r=e.currentTarget.getBoundingClientRect(),o=(e.clientX-r.left)/r.width;this._hoverTime=Math.max(t,Math.min(i,t+o*(i-t))),this._hoverX=e.clientX-r.left}_onPlayZoneMouseLeave(){this._hoverTime=null,this._hoverX=null}_fireSeekTo(e){this.dispatchEvent(new CustomEvent("ll-seek-to",{bubbles:!0,composed:!0,detail:{time:e}}))}_onSectionClick(e){this._fireSeekTo(e.start)}_onMarkClick(e){this._fireSeekTo(e.time)}_onLoopBarClick(e){e._scratch?this._fireSeekTo(e.start):this.dispatchEvent(new CustomEvent("ll-activate-loop",{bubbles:!0,composed:!0,detail:{id:e.id}}))}_onPlayZoneClick(e){if(!this.duration)return;const t=this.scopeStart??0,i=this.scopeEnd??this.duration,r=e.currentTarget.getBoundingClientRect(),o=(e.clientX-r.left)/r.width,n=Math.max(t,Math.min(i,t+o*(i-t)));this._fireSeekTo(n)}render(){if(!this.duration){const t=this.videoId?"Loading...":"No video loaded";return _`
        <div class="timeline-wrap">
          <div class="no-video">${t}</div>
        </div>
      `}const e=this._pct(this.currentTime);return _`
      <div class="timeline-wrap ${this.zoomed?"zoomed":""}">

        <div class="zone--play"
          @click=${this._onPlayZoneClick}
          @mousemove=${this._onPlayZoneMouseMove}
          @mouseleave=${this._onPlayZoneMouseLeave}
        >
          <div class="play-track">
            <div class="play-fill" style="width: ${e}%"></div>
          </div>
          <div class="play-dot" style="left: ${e}%"></div>
        </div>

        <div class="zone--section mode--${this.zone2Mode}">${this._renderSections()}</div>

        <div class="zone--mark">${this._renderMarks()}</div>

        <div class="zone--loop">${this._renderLoops()}</div>

      </div>
      ${this._hoverTime!=null?_`<span class="play-hover-time" style="left: ${this._hoverX}px">${this._fmt(this._hoverTime)}</span>`:""}
    `}}C(Hi,"styles",L`
    :host {
      display: block;
      position: relative;
    }

    .timeline-wrap {
      background: var(--ll-bg, #1a1a1a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      overflow: hidden;
      user-select: none;
    }

    .no-video {
      height: 75px; /* matches zone--play(24) + zone--section(18) + zone--mark(12) + zone--loop(21) */
      display: flex;
      align-items: center;
      padding: 0 var(--ll-pad-lg, 1rem);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #555);
    }

    /* === Zones === */

    /* Play zone: thick track + dot playhead */

    .zone--play {
      height: 24px;
      position: relative;
      background: #1a1a1a;
      cursor: pointer;
    }

    .zone--play:hover .play-dot {
      transform: translate(-50%, -50%) scale(1.4);
    }

    /* Hover time label: floats above the play zone, positioned relative to :host */
    .play-hover-time {
      position: absolute;
      top: -16px;
      font-size: 0.72rem;
      color: #ddd;
      background: rgba(0, 0, 0, 0.7);
      padding: 1px 5px;
      border-radius: 3px;
      pointer-events: none;
      transform: translateX(-50%);
      white-space: nowrap;
      z-index: 20;
    }

    /* Track: a thick horizontal line centered in the zone */
    .play-track {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 5px;
      background: var(--ll-text-muted, #555);
      pointer-events: none;
    }

    /* Elapsed fill (left of playhead) */
    .play-fill {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: var(--ll-accent, #7ec8e3);
      pointer-events: none;
    }

    /* Playhead dot */
    .play-dot {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--ll-accent, #7ec8e3);
      pointer-events: none;
      z-index: 10;
      transition: transform 0.1s ease;
    }

    /* Zoomed state: recolor play fill and playhead to yellow */
    .timeline-wrap.zoomed .play-fill,
    .timeline-wrap.zoomed .play-dot {
      background: #f0c040;
    }

    /* Section zone */
    .zone--section {
      height: 18px;
      background: var(--ll-surface, #252525);
      position: relative;
      overflow: hidden;
    }

    .section-region {
      position: absolute;
      top: 0;
      bottom: 0;
      box-sizing: border-box;
      border-left: 2px solid #666;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 0 4px;
      cursor: pointer;
    }

    /* With sl-tooltip wrapping each region, :first-child targets the tooltip. */
    sl-tooltip:first-child > .section-region {
      border-left: none;
    }

    /* Alternating background tints so adjacent sections are distinguishable */
    .section-region--even {
      background: rgba(255, 255, 255, 0.04);
    }

    .section-region--odd {
      background: rgba(255, 255, 255, 0.09);
    }

    .section-region--current {
      background: rgba(126, 200, 227, 0.28);
    }

    .section-label {
      font-size: var(--ll-text-xs, 0.75rem);
      color: #aaa;
      white-space: nowrap;
      overflow: hidden;
      pointer-events: none;
    }

    .section-region--current .section-label {
      color: var(--ll-accent, #7ec8e3);
    }

    /* Chapter mode overrides: amber dividers + warm current-region tint */
    .zone--section.mode--chapters .section-region {
      border-left-color: #7a5010;
    }

    .zone--section.mode--chapters .section-region--current {
      background: rgba(220, 140, 40, 0.28);
    }

    .zone--section.mode--chapters .section-region--current .section-label {
      color: #e8a050;
    }

    /* Mark zone */
    .zone--mark {
      height: 12px;
      background: var(--ll-bg, #1a1a1a);
      position: relative;
      overflow: hidden;
    }

    /* Mark dot: small yellow circle, centered vertically in the mark zone */
    .mark-dot {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #f0c040;
      top: 6px;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }

    /* Loop zone */
    .zone--loop {
      height: 21px;
      background: var(--ll-surface-raised, #2a2a2a);
      position: relative;
      overflow: hidden;
    }

    /* Horizontal loop bar: lane height as hit area, 2px visual line via ::after */
    .loop-bar {
      position: absolute;
      height: 7px;
      background: transparent;
      cursor: pointer;
    }

    .loop-bar::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 2px;
      transform: translateY(-50%);
      background: #c87820;
    }

    .loop-bar--scratch::after {
      background: var(--ll-accent, #7ec8e3);
    }

    /* Tooltip rich content: TYPE and START share metadata style */
    .tip-meta {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #777;
    }

    .tip-label {
      font-size: 0.72rem;
    }

  `),C(Hi,"properties",{videoId:{type:String},currentTime:{type:Number},duration:{type:Number},sections:{type:Array},chapters:{type:Array},zone2Mode:{type:String},marks:{type:Array},namedLoops:{type:Array},loopStart:{type:Number},loopEnd:{type:Number},scopeStart:{type:Number},scopeEnd:{type:Number},zoomed:{type:Boolean},_zoneWidth:{type:Number,state:!0},_hoverX:{type:Number,state:!0},_hoverTime:{type:Number,state:!0}});customElements.define("llama-timeline",Hi);var op=L`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,O=class extends Z{constructor(){super(...arguments),this.formControlController=new Tr(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new cs(this,"help-text","label"),this.localize=new Xe(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var s;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((s=this.input)==null?void 0:s.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(s){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=s,this.value=this.__dateInput.value}get valueAsNumber(){var s;return this.__numberInput.value=this.value,((s=this.input)==null?void 0:s.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(s){this.__numberInput.valueAsNumber=s,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(s){s.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(s){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(s)}handleKeyDown(s){const e=s.metaKey||s.ctrlKey||s.shiftKey||s.altKey;s.key==="Enter"&&!e&&setTimeout(()=>{!s.defaultPrevented&&!s.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(s){this.input.focus(s)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(s,e,t="none"){this.input.setSelectionRange(s,e,t)}setRangeText(s,e,t,i="preserve"){const r=e??this.input.selectionStart,o=t??this.input.selectionEnd;this.input.setRangeText(s,r,o,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(s){this.input.setCustomValidity(s),this.formControlController.updateValidity()}render(){const s=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),t=this.label?!0:!!s,i=this.helpText?!0:!!e,o=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return _`
      <div
        part="form-control"
        class=${pe({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${t?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${pe({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${P(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${P(this.placeholder)}
              minlength=${P(this.minlength)}
              maxlength=${P(this.maxlength)}
              min=${P(this.min)}
              max=${P(this.max)}
              step=${P(this.step)}
              .value=${ea(this.value)}
              autocapitalize=${P(this.autocapitalize)}
              autocomplete=${P(this.autocomplete)}
              autocorrect=${P(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${P(this.pattern)}
              enterkeyhint=${P(this.enterkeyhint)}
              inputmode=${P(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${o?_`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?_`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?_`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:_`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};O.styles=[ce,Qn,op];O.dependencies={"sl-icon":fe};m([K(".input__control")],O.prototype,"input",2);m([Ot()],O.prototype,"hasFocus",2);m([w()],O.prototype,"title",2);m([w({reflect:!0})],O.prototype,"type",2);m([w()],O.prototype,"name",2);m([w()],O.prototype,"value",2);m([Xn()],O.prototype,"defaultValue",2);m([w({reflect:!0})],O.prototype,"size",2);m([w({type:Boolean,reflect:!0})],O.prototype,"filled",2);m([w({type:Boolean,reflect:!0})],O.prototype,"pill",2);m([w()],O.prototype,"label",2);m([w({attribute:"help-text"})],O.prototype,"helpText",2);m([w({type:Boolean})],O.prototype,"clearable",2);m([w({type:Boolean,reflect:!0})],O.prototype,"disabled",2);m([w()],O.prototype,"placeholder",2);m([w({type:Boolean,reflect:!0})],O.prototype,"readonly",2);m([w({attribute:"password-toggle",type:Boolean})],O.prototype,"passwordToggle",2);m([w({attribute:"password-visible",type:Boolean})],O.prototype,"passwordVisible",2);m([w({attribute:"no-spin-buttons",type:Boolean})],O.prototype,"noSpinButtons",2);m([w({reflect:!0})],O.prototype,"form",2);m([w({type:Boolean,reflect:!0})],O.prototype,"required",2);m([w()],O.prototype,"pattern",2);m([w({type:Number})],O.prototype,"minlength",2);m([w({type:Number})],O.prototype,"maxlength",2);m([w()],O.prototype,"min",2);m([w()],O.prototype,"max",2);m([w()],O.prototype,"step",2);m([w()],O.prototype,"autocapitalize",2);m([w()],O.prototype,"autocorrect",2);m([w()],O.prototype,"autocomplete",2);m([w({type:Boolean})],O.prototype,"autofocus",2);m([w()],O.prototype,"enterkeyhint",2);m([w({type:Boolean,converter:{fromAttribute:s=>!(!s||s==="false"),toAttribute:s=>s?"true":"false"}})],O.prototype,"spellcheck",2);m([w()],O.prototype,"inputmode",2);m([Y("disabled",{waitUntilFirstUpdate:!0})],O.prototype,"handleDisabledChange",1);m([Y("step",{waitUntilFirstUpdate:!0})],O.prototype,"handleStepChange",1);m([Y("value",{waitUntilFirstUpdate:!0})],O.prototype,"handleValueChange",1);O.define("sl-input");class ta extends D{constructor(){super(),this._value=""}show(){var e;this._value="",(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onInput(e){this._value=e.target.value}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._submit())}_submit(){const e=this._value.trim();e&&(this.dispatchEvent(new CustomEvent("ll-load-url",{detail:{url:e},bubbles:!0,composed:!0})),this.hide())}render(){return _`
      <llama-modal
        label="Load video"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <sl-input autocomplete="off"
          placeholder="YouTube URL or video ID"
          .value=${this._value}
          @sl-input=${this._onInput}
          @keydown=${this._onKeyDown}
          clearable
        ></sl-input>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._submit}>Load</sl-button>
        </div>
      </llama-modal>
    `}}C(ta,"properties",{_value:{state:!0}});customElements.define("llama-url-input-modal",ta);const Dt=s=>{var e;return e=class extends s{constructor(...t){super(...t),this._filter="",this._selIdx=0}get _listClass(){return"list"}get _rowClass(){return"row"}show(t){var i;t&&(this.mode=t),this._filter="",this._selIdx=0,(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_onFilterKeyDown(t){const i=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,i.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const r=i[this._selIdx]??i[0];r&&this._select(r)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(`.${this._listClass}`),i=t==null?void 0:t.querySelector(`.${this._rowClass}.selected`);i==null||i.scrollIntoView({block:"nearest"})})}},C(e,"properties",{_filter:{state:!0},_selIdx:{state:!0}}),e};class Wi extends Dt(D){constructor(){super(),this.videos=[],this.currentVideoId=null,this.mode="switch",this.stashes={},this._sortMode="recent"}get _listClass(){return"video-list"}get _rowClass(){return"video-row"}show(e="switch",t="recent"){this._sortMode=t,super.show(e)}_onInitialFocus(){var e;(e=this.renderRoot.querySelector(".video-list"))==null||e.scrollTo(0,0),super._onInitialFocus()}_select(e){this.mode==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-video",{detail:{id:e.id},bubbles:!0,composed:!0})):this.mode==="restore"?this.dispatchEvent(new CustomEvent("ll-restore-video",{detail:{id:e.id},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-pick-video",{detail:{videoId:e.id},bubbles:!0,composed:!0})),this.hide()}_sortedAlpha(){const e=this.currentVideoId;return[...this.videos].sort((t,i)=>{if(t.id===e)return-1;if(i.id===e)return 1;const r=t.name,o=i.name;return r&&!o?-1:!r&&o?1:r&&o?r.toLowerCase().localeCompare(o.toLowerCase()):0})}_sortedRecent(){const e=this.currentVideoId;return[...this.videos].sort((t,i)=>{if(t.id===e)return-1;if(i.id===e)return 1;const r=t.last_opened??0,o=i.last_opened??0;return r!==o?o-r:(t.name||"").toLowerCase().localeCompare((i.name||"").toLowerCase())})}_sorted(){return this._sortMode==="alpha"?this._sortedAlpha():this._sortedRecent()}_stashEntries(){return Object.values(this.stashes).sort((e,t)=>{const i=(e.name||e.id).toLowerCase(),r=(t.name||t.id).toLowerCase();return i.localeCompare(r)})}_filtered(){const e=this._filter.trim().toLowerCase(),t=this.mode==="restore"?this._stashEntries():this._sorted();return e?t.filter(i=>(i.name||"").toLowerCase().includes(e)||i.id.toLowerCase().includes(e)):t}_primaryLabel(e){return e.name||e.id}_subLabel(e){return e.id}render(){const e=this._filtered(),t=this.mode==="delete",i=this.mode==="restore",r=t?"Delete video":i?"Unstash video":"Open video",o=i?new Set(this.videos.map(n=>n.id)):null;return _`
      <llama-modal label=${r} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${i?_`
          <div class="restore-info">
            <sl-tooltip content="Restores a video to a saved copy from before the last deletion, replacement, or unstash. Videos marked [not in library] were deleted and will be re-added.">
              <span class="help-icon">ⓘ</span>
            </sl-tooltip>
          </div>`:""}
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or ID"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            autocomplete="off"
            clearable
          ></sl-input>
        </div>
        <div class="video-list">
          ${e.length?e.map((n,a)=>{const l=i&&!o.has(n.id);return _`
                <div
                  class="video-row
                    ${t?"mode-delete":i?"mode-restore":""}
                    ${l?"not-in-library":""}
                    ${n.id===this.currentVideoId?"current":""}
                    ${a===this._selIdx?"selected":""}"
                  @click=${()=>this._select(n)}
                >
                  <div class="video-primary">${this._primaryLabel(n)}</div>
                  <div class="video-sub">${n.id}${l?"   [not in library]":""}</div>
                </div>`}):_`<div class="empty">No videos match.</div>`}
        </div>
      </llama-modal>
    `}}C(Wi,"styles",L`
    :host {
      --width: 52rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .video-list {
      max-height: 520px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .video-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .video-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .video-row.current {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .video-row.current.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .video-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .video-row.mode-delete:hover,
    .video-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .video-row.mode-restore:hover,
    .video-row.mode-restore.selected {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .video-row.not-in-library .video-primary {
      color: var(--ll-text-dim, #aaa);
    }
    .video-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .video-sub {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-top: 0.1rem;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
    .restore-info {
      margin: -1.25rem 0 1rem;
    }
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
      cursor: default;
    }
  `),C(Wi,"properties",{videos:{type:Array},currentVideoId:{type:String},mode:{type:String},stashes:{type:Object},_sortMode:{state:!0}});customElements.define("llama-video-picker",Wi);const Ys=L`
  .field-row {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 0.7rem;
  }
  .field-label {
    font-size: var(--ll-text-sm, 0.85rem);
    color: var(--ll-text-dim, #aaa);
  }
  .error {
    font-size: var(--ll-text-sm, 0.85rem);
    color: var(--ll-danger, #e05a5a);
    margin-bottom: 0.5rem;
  }
`;function Ne(s,e,t,i,r,o){return _`
    <div class="field-row">
      <span class="field-label">${s}</span>
      <sl-input autocomplete="off"
        data-field=${e}
        placeholder=${i}
        .value=${t}
        @sl-input=${r}
        @keydown=${o}
      ></sl-input>
    </div>
  `}class Ki extends D{constructor(){super(),this.video=null,this._name="",this._start="",this._end="",this._startEdited=!1,this._endEdited=!1,this._originalStart=null,this._originalEnd=null}show(){var t;const e=this.video;e&&(this._name=e.name||"",this._start=e.start>0?xe(e.start):"",this._end=e.end!=null?xe(e.end):"",this._originalStart=e.start??0,this._originalEnd=e.end??null),this._startEdited=!1,this._endEdited=!1,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){if(!this.video)return;const e=this._startEdited?Ze(this._start)??0:this._originalStart,t=this._endEdited?this._end.trim()?Ze(this._end)??null:null:this._originalEnd;this.dispatchEvent(new CustomEvent("ll-update-video",{detail:{id:this.video.id,name:this._name.trim(),start:e,end:t},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}render(){var e;return _`
      <llama-modal label="Edit video" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${Ne("Name","name",this._name,"Name",t=>{this._name=t.target.value},this._onKeyDown)}
        ${Ne("Start","start",this._start,"Custom start",t=>{this._start=t.target.value,this._startEdited=!0},this._onKeyDown)}
        ${Ne("End","end",this._end,"Custom end",t=>{this._end=t.target.value,this._endEdited=!0},this._onKeyDown)}
        <div class="field-row">
          <span class="field-label">Video ID</span>
          <div class="video-id">${((e=this.video)==null?void 0:e.id)??""}</div>
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Ki,"styles",[Ys,L`
    .video-id {
      font-family: monospace;
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.2rem 0;
    }
  `]),C(Ki,"properties",{video:{type:Object},_name:{state:!0},_start:{state:!0},_end:{state:!0},_startEdited:{state:!0},_endEdited:{state:!0}});customElements.define("llama-edit-video-modal",Ki);class Ji extends D{constructor(){super(),this.loopStart=0,this.loopEnd=0,this._editId=null,this._name="",this._start="",this._end="",this._error="",this._startEdited=!1,this._endEdited=!1,this._originalStart=null,this._originalEnd=null}show(e=null){var t;e?(this._editId=e.id,this._name=e.name||"",this._start=xe(e.start),this._end=xe(e.end),this._originalStart=e.start,this._originalEnd=e.end):(this._editId=null,this._name="",this._start=xe(this.loopStart),this._end=xe(this.loopEnd),this._originalStart=this.loopStart,this._originalEnd=this.loopEnd),this._error="",this._startEdited=!1,this._endEdited=!1,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){const e=this._startEdited?Ze(this._start):this._originalStart,t=this._endEdited?Ze(this._end):this._originalEnd;if(e===null||t===null){this._error="Start and end are required.";return}if(t<=e){this._error="End must be after start.";return}this._error="";const i=this._name.trim();this._editId?this.dispatchEvent(new CustomEvent("ll-update-loop",{detail:{id:this._editId,name:i,start:e,end:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-save-loop",{detail:{name:i,start:e,end:t},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}render(){const e=this._editId?"Edit loop":"Save loop";return _`
      <llama-modal label=${e} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${Ne("Name","name",this._name,"Name",t=>{this._name=t.target.value},this._onKeyDown)}
        ${Ne("Start","start",this._start,"Start",t=>{this._start=t.target.value,this._startEdited=!0},this._onKeyDown)}
        ${Ne("End","end",this._end,"End",t=>{this._end=t.target.value,this._endEdited=!0},this._onKeyDown)}
        <div class="error" style=${this._error?"":"visibility: hidden"}>${this._error||" "}</div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Ji,"styles",Ys),C(Ji,"properties",{loopStart:{type:Number},loopEnd:{type:Number},_editId:{state:!0},_name:{state:!0},_start:{state:!0},_end:{state:!0},_error:{state:!0},_startEdited:{state:!0},_endEdited:{state:!0}});customElements.define("llama-save-loop-modal",Ji);const np={jump:"Jump to loop",delete:"Delete loop"};class Gi extends Dt(D){constructor(){super(),this.namedLoops=[],this.loopSource=null,this.mode="load"}get _listClass(){return"loop-list"}get _rowClass(){return"loop-row"}_select(e){const t=this.mode;t==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-loop",{detail:{id:e.id,start:e.start},bubbles:!0,composed:!0})):t==="delete"&&this.dispatchEvent(new CustomEvent("ll-delete-loop",{detail:{id:e.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.namedLoops.filter(t=>(t.name||"").toLowerCase().includes(e)||!t.name&&qo(t.start,t.end).includes(e)):this.namedLoops}_range(e){return qo(e.start,e.end)}render(){const e=this._filtered(),t=np[this.mode]??"Select Loop",i=this.mode==="delete";return _`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or time"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="loop-list">
          ${e.length?e.map((r,o)=>_`
                <div
                  class="loop-row
                    ${i?"mode-delete":""}
                    ${r.id===this.loopSource?"active":""}
                    ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="loop-primary">${r.name||this._range(r)}</div>
                  ${r.name?_`<div class="loop-sub">${this._range(r)}</div>`:""}
                </div>
              `):_`<div class="empty">No loops${this._filter?" match.":" saved."}</div>`}
        </div>
      </llama-modal>
    `}}C(Gi,"styles",L`
    :host {
      --width: 52rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .loop-list {
      max-height: 520px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .loop-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .loop-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .loop-row.active {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .loop-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .loop-row.active.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .loop-row.mode-delete:hover,
    .loop-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .loop-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .loop-sub {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-top: 0.1rem;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `),C(Gi,"properties",{namedLoops:{type:Array},loopSource:{type:String},mode:{type:String}});function qo(s,e){return`${z(s)} – ${z(e)}`}customElements.define("llama-loop-picker",Gi);const ap={jump:"Jump to mark",delete:"Delete mark"};class Yi extends Dt(D){constructor(){super(),this.marks=[],this.mode="jump"}get _listClass(){return"mark-list"}get _rowClass(){return"mark-row"}_select(e){const t=this.mode;t==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-mark",{detail:{id:e.id,time:e.time},bubbles:!0,composed:!0})):t==="delete"&&this.dispatchEvent(new CustomEvent("ll-delete-mark",{detail:{id:e.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.marks.filter(t=>(t.name||"").toLowerCase().includes(e)||!t.name&&z(t.time).includes(e)):this.marks}render(){const e=this._filtered(),t=ap[this.mode]??"Select Mark",i=this.mode==="delete";return _`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or time"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="mark-list">
          ${e.length?e.map((r,o)=>_`
                <div
                  class="mark-row ${i?"mode-delete":""} ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="mark-primary">${r.name||z(r.time)}</div>
                  ${r.name?_`<div class="mark-sub">${z(r.time)}</div>`:""}
                </div>
              `):_`<div class="empty">No marks${this._filter?" match.":" set."}</div>`}
        </div>
      </llama-modal>
    `}}C(Yi,"styles",L`
    :host {
      --width: 44rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .mark-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .mark-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .mark-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .mark-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .mark-row.mode-delete:hover,
    .mark-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .mark-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .mark-sub {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-top: 0.1rem;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `),C(Yi,"properties",{marks:{type:Array},mode:{type:String}});customElements.define("llama-marks-picker",Yi);class Zi extends D{constructor(){super(),this.mark=null,this._name="",this._time="",this._timeEdited=!1,this._error="",this._originalTime=null}show(e){var i;const t=e??this.mark;t&&(this.mark=t,this._name=t.name||"",this._time=xe(t.time),this._originalTime=t.time),this._timeEdited=!1,this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){if(!this.mark)return;const e=this._timeEdited?Ze(this._time):this._originalTime;if(e===null){this._error="Time is required.";return}this._error="",this.dispatchEvent(new CustomEvent("ll-update-mark",{detail:{id:this.mark.id,name:this._name.trim(),time:e},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}render(){return _`
      <llama-modal label="Edit mark" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input autocomplete="off"
            data-field="name"
            placeholder="Name"
            .value=${this._name}
            @sl-input=${e=>{this._name=e.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Time</span>
          <sl-input autocomplete="off"
            data-field="time"
            placeholder="Time"
            .value=${this._time}
            @sl-input=${e=>{this._time=e.target.value,this._timeEdited=!0}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="error" style=${this._error?"":"visibility: hidden"}>${this._error||" "}</div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Zi,"styles",L`
    .field-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      margin-bottom: 0.7rem;
    }
    .field-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }
    .error {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-danger, #e05a5a);
      margin-bottom: 0.5rem;
    }
  `),C(Zi,"properties",{mark:{type:Object},_name:{state:!0},_time:{state:!0},_timeEdited:{state:!0},_error:{state:!0}});customElements.define("llama-edit-mark-modal",Zi);const lp={jump:"Jump to section",delete:"Delete section"};class Xi extends Dt(D){constructor(){super(),this.sections=[],this.mode="jump",this.activeSectionId=null}get _listClass(){return"section-list"}get _rowClass(){return"section-row"}_select(e){const t=this.mode;t==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-section",{detail:{id:e.id,start:e.start},bubbles:!0,composed:!0})):t==="delete"&&this.dispatchEvent(new CustomEvent("ll-delete-section",{detail:{id:e.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.sections.filter(t=>(t.name||"").toLowerCase().includes(e)||!t.name&&z(t.start).includes(e)):this.sections}render(){const e=this._filtered(),t=lp[this.mode]??"Select Section",i=this.mode==="delete";return _`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or time"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="section-list">
          ${e.length?e.map((r,o)=>_`
                <div
                  class="section-row
                    ${i?"mode-delete":""}
                    ${r.id===this.activeSectionId?"active":""}
                    ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="section-primary">${r.name||z(r.start)}</div>
                  ${r.name?_`<div class="section-sub">${z(r.start)}</div>`:""}
                </div>
              `):_`<div class="empty">No sections${this._filter?" match.":" set."}</div>`}
        </div>
      </llama-modal>
    `}}C(Xi,"styles",L`
    :host {
      --width: 44rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .section-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .section-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .section-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .section-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .section-row.active {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .section-row.active.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .section-row.mode-delete:hover,
    .section-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .section-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .section-sub {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-top: 0.1rem;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `),C(Xi,"properties",{sections:{type:Array},mode:{type:String},activeSectionId:{type:String}});customElements.define("llama-sections-picker",Xi);const sa=s=>{var e;return e=class extends s{constructor(...t){super(...t),this._entityId=null,this._name="",this._start="",this._end="",this._derivedEnd=null,this._error="",this._startEdited=!1,this._endEdited=!1,this._originalStart=null,this._originalEnd=null,this._validator=null}show(t,i=null,r=null){var o;this._entityId=t.id,this._name=t.name||"",this._start=xe(t.start),this._end=xe(t.end),this._originalStart=t.start,this._originalEnd=t.end,this._derivedEnd=i,this._error="",this._startEdited=!1,this._endEdited=!1,this._validator=r,(o=this.renderRoot.querySelector("llama-modal"))==null||o.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||t.focus()}_save(){if(!this._entityId)return;const t=this._startEdited?Ze(this._start):this._originalStart;if(t===null){this._error="Start is required.";return}let i=null;if(this._endEdited?this._end.trim():this._originalEnd!=null){if(i=this._endEdited?Ze(this._end):this._originalEnd,i===null){this._error="Invalid end time.";return}if(i<=t){this._error="End must be after start.";return}}if(this._validator&&!this._validator(t,i)){this._error=`Edit would eliminate a neighbor ${this._entityLabel}.`;return}this._error="",this.dispatchEvent(new CustomEvent(this._eventName,{detail:{id:this._entityId,name:this._name.trim(),start:t,end:i},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}render(){const t=this._derivedEnd!=null?`${xe(this._derivedEnd)} (derived)`:"";return _`
      <llama-modal label=${this._modalLabel} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${Ne("Name","name",this._name,"Name",i=>{this._name=i.target.value},this._onKeyDown)}
        ${Ne("Start","start",this._start,"Start",i=>{this._start=i.target.value,this._startEdited=!0},this._onKeyDown)}
        ${Ne("End","end",this._end,t,i=>{this._end=i.target.value,this._endEdited=!0},this._onKeyDown)}
        <div class="error" style=${this._error?"":"visibility: hidden"}>${this._error||" "}</div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}},C(e,"properties",{_name:{state:!0},_start:{state:!0},_end:{state:!0},_derivedEnd:{state:!0},_error:{state:!0},_startEdited:{state:!0},_endEdited:{state:!0}}),e};class ia extends sa(D){get _eventName(){return"ll-update-section"}get _entityLabel(){return"section"}get _modalLabel(){return"Edit section"}}C(ia,"styles",Ys);customElements.define("llama-edit-section-modal",ia);const cp={delete:"Delete chapter",jump:"Jump to chapter"};class Qi extends Dt(D){constructor(){super(),this.chapters=[],this.mode="jump",this.activeChapterId=null}get _listClass(){return"chapter-list"}get _rowClass(){return"chapter-row"}_select(e){this.mode==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-chapter",{detail:{id:e.id},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-jump-chapter",{detail:{id:e.id,time:e.start},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.chapters.filter(t=>(t.name||"").toLowerCase().includes(e)||!t.name&&z(t.start).includes(e)):this.chapters}render(){const e=this._filtered(),t=cp[this.mode]??"Select Chapter",i=this.mode==="delete";return _`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or time"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="chapter-list">
          ${e.length?e.map((r,o)=>_`
                <div
                  class="chapter-row
                    ${i?"mode-delete":""}
                    ${r.id===this.activeChapterId?"active":""}
                    ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="chapter-primary">${r.name||z(r.start)}</div>
                  ${r.name?_`<div class="chapter-sub">${z(r.start)}</div>`:""}
                </div>
              `):_`<div class="empty">No chapters${this._filter?" match.":" set."}</div>`}
        </div>
      </llama-modal>
    `}}C(Qi,"styles",L`
    :host {
      --width: 44rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .chapter-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .chapter-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .chapter-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .chapter-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .chapter-row.active {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .chapter-row.active.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .chapter-row.mode-delete:hover,
    .chapter-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .chapter-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .chapter-sub {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-top: 0.1rem;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `),C(Qi,"properties",{chapters:{type:Array},mode:{type:String},activeChapterId:{type:String}});customElements.define("llama-chapter-picker",Qi);class ra extends sa(D){get _eventName(){return"ll-update-chapter"}get _entityLabel(){return"chapter"}get _modalLabel(){return"Edit chapter"}}C(ra,"styles",Ys);customElements.define("llama-edit-chapter-modal",ra);class er extends D{constructor(){super(),this.videoName="",this.videoId=null,this.chapterName=null,this.sectionName=null,this.loopSrc=null,this.loopDirty=!1,this.duration=null,this.zoomLabel=null,this.zone2Mode="sections"}_fmtDuration(e){const t=Math.floor(e/60),i=Math.floor(e%60).toString().padStart(2,"0");return`${t}:${i}`}_row(e,t){return _`
      <div class="current-row">
        <div class="row-label">${e}</div>
        <div class="row-value ${!t?"dim":""}">${t||"—"}</div>
      </div>
    `}_loopSourceValue(){if(!this.loopSrc)return null;const e=this.loopSrc.type[0].toUpperCase()+this.loopSrc.type.slice(1),t=this.loopSrc.label?`: ${this.loopSrc.label}`:"";if(this.loopSrc.start==null||this.loopSrc.end==null)return _`${e}${t}`;const i=` [${this._fmtDuration(this.loopSrc.start)} – ${this._fmtDuration(this.loopSrc.end)}]`;return _`${e}${t}<span class="${this.loopDirty?"dirty-range":""}">${i}</span>`}render(){return _`
      <div class="current-panel">
        <div class="panel-title">Current</div>
        <div class="current-rows">
          ${this._row("Name",this.videoName)}
          ${this._row("Video ID",this.videoId)}
          ${this._row("Duration",this.duration!=null?this._fmtDuration(this.duration):null)}
          ${this._row("Timeline display",this.zone2Mode==="sections"?"Sections":"Chapters")}
          ${this._row("Chapter",this.chapterName)}
          ${this._row("Section",this.sectionName)}
          <div class="current-row">
            <div class="row-label">Scratch loop source</div>
            <div class="row-value ${this.loopSrc?"":"dim"}">${this._loopSourceValue()??"—"}</div>
          </div>
          ${this.zoomLabel?_`
            <div class="current-row">
              <div class="row-label zoom-label">Zoom</div>
              <div class="row-value">${this.zoomLabel}</div>
            </div>`:""}
        </div>
      </div>
    `}}C(er,"styles",L`
    :host {
      display: block;
    }

    .current-panel {
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      padding: var(--ll-pad, 0.5rem);
      height: 100%;
      box-sizing: border-box;
    }

    .panel-title {
      font-size: 0.72rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--ll-text-muted, #666);
      margin-bottom: 0.5rem;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .current-rows {
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .row-label {
      font-size: 0.67rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--ll-text-muted, #666);
      margin-bottom: 0.1rem;
    }

    .row-value {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text, #e0e0e0);
      line-height: 1.4;
      overflow-wrap: break-word;
    }

    .row-value.dim {
      color: var(--ll-text-muted, #666);
    }

    .row-label.zoom-label {
      color: var(--ll-warn, #f0c040);
    }

    .dirty-range {
      color: var(--ll-warn, #f0c040);
    }

  `),C(er,"properties",{videoName:{type:String},videoId:{type:String},chapterName:{type:String},sectionName:{type:String},loopSrc:{type:Object},loopDirty:{type:Boolean},duration:{type:Number},zoomLabel:{type:String},zone2Mode:{type:String}});customElements.define("llama-current",er);class tr extends D{constructor(){super(),this.video=null,this.chapters=[],this.sections=[],this.namedLoops=[],this.marks=[],this.duration=null,this.undoCount=0,this.redoCount=0,this.stash=null,this._keyHandler=null}show(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.show(),this._addKeyHandler()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_addKeyHandler(){this._keyHandler||(this._keyHandler=e=>this._onKeyDown(e),document.addEventListener("keydown",this._keyHandler))}_removeKeyHandler(){this._keyHandler&&(document.removeEventListener("keydown",this._keyHandler),this._keyHandler=null)}_onKeyDown(e){const t=this.renderRoot.querySelector(".content");t&&(e.key==="ArrowDown"?(e.preventDefault(),t.scrollBy({top:60,behavior:"smooth"})):e.key==="ArrowUp"?(e.preventDefault(),t.scrollBy({top:-60,behavior:"smooth"})):e.key==="PageDown"?(e.preventDefault(),t.scrollBy({top:t.clientHeight*.9,behavior:"smooth"})):e.key==="PageUp"?(e.preventDefault(),t.scrollBy({top:-t.clientHeight*.9,behavior:"smooth"})):e.key==="Enter"&&(e.preventDefault(),this.hide()))}_onModalClose(){this._removeKeyHandler()}_fmt(e){if(e==null||isNaN(e))return"?";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}_fmtDate(e){return e?new Date(e).toLocaleString():"—"}_renderVideo(){const e=this.video;if(!e)return _`<div class="empty">No video loaded.</div>`;const t=this.duration??e.duration;return _`
      <div class="info-grid">
        <span class="info-label">ID</span>
        <span class="info-value">${e.id}</span>
        ${e.name?_`
          <span class="info-label">Name</span>
          <span class="info-value">${e.name}</span>
        `:""}
        <span class="info-label">URL</span>
        <span class="info-value">${e.url||"—"}</span>
        <span class="info-label">Duration</span>
        <span class="info-value">${t!=null?this._fmt(t):"—"}</span>
        <span class="info-label">Custom range</span>
        <span class="info-value">${e.start===0&&e.end==null?"—":`${this._fmt(e.start)} – ${e.end!=null?this._fmt(e.end):"end"}`}</span>
      </div>
    `}_renderChapters(){return this.chapters.length?_`
      <div class="entity-list">
        ${this.chapters.map(e=>_`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.start)}</span>
          </div>
        `)}
      </div>
    `:_`<div class="empty">None.</div>`}_renderSections(){return this.sections.length?_`
      <div class="entity-list">
        ${this.sections.map(e=>_`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.start)}</span>
          </div>
        `)}
      </div>
    `:_`<div class="empty">None.</div>`}_renderLoops(){return this.namedLoops.length?_`
      <div class="entity-list">
        ${this.namedLoops.map(e=>_`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.start)} – ${this._fmt(e.end)}</span>
          </div>
        `)}
      </div>
    `:_`<div class="empty">None.</div>`}_renderMarks(){return this.marks.length?_`
      <div class="entity-list">
        ${this.marks.map(e=>_`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.time)}</span>
          </div>
        `)}
      </div>
    `:_`<div class="empty">None.</div>`}_renderOther(){var i;const e=this.video;if(!e)return"";const t=this.stash?this._fmtDate(this.stash.last_modified):"—";return _`
      <div class="info-grid">
        <span class="info-label">Last modified</span>
        <span class="info-value">${this._fmtDate(e.last_modified)}</span>
        <span class="info-label">Last opened</span>
        <span class="info-value">${this._fmtDate(e.last_opened)}</span>
        <span class="info-label">Jump history</span>
        <span class="info-value">${((i=e.jumps)==null?void 0:i.length)??0}</span>
        <span class="info-label">Undo history</span>
        <span class="info-value">${this.undoCount}</span>
        <span class="info-label">Redo history</span>
        <span class="info-value">${this.redoCount}</span>
        <span class="info-label">Stashed</span>
        <span class="info-value">${t}</span>
      </div>
    `}render(){return _`
      <llama-modal label="Video info" @ll-modal-close=${this._onModalClose}>
        <div class="content">
          <div class="section-heading">Video</div>
          ${this._renderVideo()}
          <div class="section-heading">Chapters (${this.chapters.length})</div>
          ${this._renderChapters()}
          <div class="section-heading">Sections (${this.sections.length})</div>
          ${this._renderSections()}
          <div class="section-heading">Named Loops (${this.namedLoops.length})</div>
          ${this._renderLoops()}
          <div class="section-heading">Marks (${this.marks.length})</div>
          ${this._renderMarks()}
          <div class="section-heading">Other</div>
          ${this._renderOther()}
        </div>
        <div slot="footer">
          <sl-button variant="primary" @click=${this.hide}>Close</sl-button>
        </div>
      </llama-modal>
    `}}C(tr,"styles",L`
    :host {
      --width: 60rem;
    }

    .content {
      max-height: 70vh;
      overflow-y: auto;
    }

    .section-heading {
      font-size: var(--ll-text-sm, 0.85rem);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ll-text-muted, #666);
      margin: 1.25rem 0 0.4rem;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .section-heading:first-child {
      margin-top: 0;
    }

    /* Two-column key/value grid for video details. */
    .info-grid {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.2rem 0.75rem;
    }

    .info-label {
      color: var(--ll-text-dim, #aaa);
      font-size: var(--ll-text-sm, 0.85rem);
      white-space: nowrap;
    }

    .info-value {
      font-size: var(--ll-text-sm, 0.85rem);
      word-break: break-all;
    }

    /* Entity rows: name on left, time on right. */
    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .entity-row {
      display: grid;
      grid-template-columns: 1fr max-content;
      gap: 0.75rem;
      align-items: baseline;
      padding: 0.25rem 0.4rem;
      border-radius: var(--ll-radius, 3px);
    }

    .entity-row:nth-child(odd) {
      background: var(--ll-surface-raised, #2a2a2a);
    }

    .entity-name {
      font-size: var(--ll-text-sm, 0.85rem);
    }

    .entity-name.dim {
      color: var(--ll-text-dim, #aaa);
    }

    .entity-time {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      white-space: nowrap;
    }

    .empty {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #666);
      font-style: italic;
      padding: 0.25rem 0.4rem;
    }
  `),C(tr,"properties",{video:{type:Object},chapters:{type:Array},sections:{type:Array},namedLoops:{type:Array},marks:{type:Array},duration:{type:Number},undoCount:{type:Number},redoCount:{type:Number},stash:{type:Object}});customElements.define("llama-video-info-modal",tr);class sr extends Dt(D){constructor(){super(),this.jumps=[]}get _listClass(){return"jump-list"}get _rowClass(){return"jump-row"}_select(e){this.dispatchEvent(new CustomEvent("ll-jump-history",{detail:{time:e.time},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=[...this.jumps].map(i=>({time:i})).reverse(),t=this._filter.trim().toLowerCase();return t?e.filter(i=>z(i.time).includes(t)):e}render(){const e=this._filtered();return _`
      <llama-modal label="Jump history" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by time"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="jump-list">
          ${e.length?e.map((t,i)=>_`
                <div
                  class="jump-row ${i===this._selIdx?"selected":""}"
                  @click=${()=>this._select(t)}
                >
                  <span class="jump-time">${z(t.time)}</span>
                </div>
              `):_`<div class="empty">No jump history${this._filter?" matches.":"."}</div>`}
        </div>
      </llama-modal>
    `}}C(sr,"styles",L`
    :host {
      --width: 32rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .jump-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .jump-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
    }
    .jump-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .jump-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .jump-time {
      font-size: var(--ll-text-base, 1.05rem);
      font-variant-numeric: tabular-nums;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `),C(sr,"properties",{jumps:{type:Array}});customElements.define("llama-jump-history-picker",sr);class ir extends D{constructor(){super(),this._seekDefault="",this._seekChoices="",this._nudgeDefault="",this._nudgeChoices="",this._speedDelta="",this._padStart="",this._padEnd="",this._error=""}show(e){var i;const t=e??M;this._seekDefault=String(t.seek_delta_default),this._seekChoices=t.seek_delta_choices.join(" "),this._nudgeDefault=String(t.loop_nudge_delta_default),this._nudgeChoices=t.loop_nudge_delta_choices.join(" "),this._speedDelta=String(Math.round(t.speed_delta*100)),this._padStart=String(t.loop_pad_start),this._padEnd=String(t.loop_pad_end),this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="seek-default"]'))==null||e.focus()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}_parseChoices(e){const t=e.trim().split(/\s+/).filter(Boolean);if(!t.length)return null;const i=t.map(Number);return i.some(r=>isNaN(r)||!isFinite(r)||r<=0)?null:[...new Set(i)].sort((r,o)=>r-o)}_parsePositive(e){const t=Number(e.trim());return isNaN(t)||!isFinite(t)||t<=0?null:t}_parseNonNeg(e){const t=Number(e.trim());return isNaN(t)||!isFinite(t)||t<0?null:t}_save(){const e=this._parseChoices(this._seekChoices);if(!e){this._error="Seek delta choices: enter space-separated positive numbers.";return}const t=this._parsePositive(this._seekDefault);if(t===null){this._error="Seek delta default: must be a positive number.";return}if(!e.includes(t)){this._error="Seek delta default must be one of the seek delta choices.";return}const i=this._parseChoices(this._nudgeChoices);if(!i){this._error="Loop nudge delta choices: enter space-separated positive numbers.";return}const r=this._parsePositive(this._nudgeDefault);if(r===null){this._error="Loop nudge delta default: must be a positive number.";return}if(!i.includes(r)){this._error="Loop nudge delta default must be one of the loop nudge delta choices.";return}const o=this._parsePositive(this._speedDelta);if(o===null){this._error="Speed delta: must be a positive number.";return}const n=o/100,a=this._parseNonNeg(this._padStart);if(a===null){this._error="Pad start: must be a non-negative number.";return}const l=this._parseNonNeg(this._padEnd);if(l===null){this._error="Pad end: must be a non-negative number.";return}const c={seek_delta_default:t,seek_delta_choices:e,loop_nudge_delta_default:r,loop_nudge_delta_choices:i,speed_delta:n,loop_pad_start:a,loop_pad_end:l};this.dispatchEvent(new CustomEvent("ll-options-saved",{detail:{options:c},bubbles:!0,composed:!0})),this.hide()}render(){return _`
      <llama-modal label="Options" @ll-modal-initial-focus=${this._onInitialFocus}>

        <div class="section-heading">Seek delta</div>

        <div class="field-row">
          <span class="field-label">Default</span>
          <sl-input autocomplete="off"
            data-field="seek-default"
            .value=${this._seekDefault}
            @sl-input=${e=>{this._seekDefault=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input autocomplete="off"
            .value=${this._seekChoices}
            @sl-input=${e=>{this._seekChoices=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">Loop nudge delta</div>

        <div class="field-row">
          <span class="field-label">Default</span>
          <sl-input autocomplete="off"
            .value=${this._nudgeDefault}
            @sl-input=${e=>{this._nudgeDefault=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input autocomplete="off"
            .value=${this._nudgeChoices}
            @sl-input=${e=>{this._nudgeChoices=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">Speed</div>

        <div class="field-row">
          <span class="field-label">Delta</span>
          <sl-input autocomplete="off"
            .value=${this._speedDelta}
            @sl-input=${e=>{this._speedDelta=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">Loop pad</div>

        <div class="field-row">
          <span class="field-label">Start</span>
          <sl-input autocomplete="off"
            .value=${this._padStart}
            @sl-input=${e=>{this._padStart=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End</span>
          <sl-input autocomplete="off"
            .value=${this._padEnd}
            @sl-input=${e=>{this._padEnd=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="error-msg">${this._error}</div>

        <div slot="footer">
          <sl-button @click=${()=>this.hide()}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(ir,"styles",L`
    .field-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      margin-bottom: 0.8rem;
    }
    .field-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }
    .section-heading {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7eb8f7);
      margin: 0.8rem 0 0.4rem;
      border-bottom: 1px solid var(--ll-border, #444);
      padding-bottom: 0.2rem;
    }
    .error-msg {
      color: var(--ll-error, #f87171);
      font-size: var(--ll-text-sm, 0.85rem);
      margin-top: 0.4rem;
      min-height: 1.2em;
    }
  `),C(ir,"properties",{_seekDefault:{state:!0},_seekChoices:{state:!0},_nudgeDefault:{state:!0},_nudgeChoices:{state:!0},_speedDelta:{state:!0},_padStart:{state:!0},_padEnd:{state:!0},_error:{state:!0}});customElements.define("llama-options-modal",ir);class rr extends D{constructor(){super(),this._mode="current",this._checked={},this._sections=[],this._loops=[],this._marks=[],this._chapters=[],this._videos=[],this._currentVideoId=null,this._keyHandler=null}show({videos:e,currentVideoId:t,currentVideoName:i,sections:r,namedLoops:o,marks:n,chapters:a,initialMode:l="current",preCheckedVideoId:c=null}){var h;this._mode=l,this._sections=r??[],this._loops=o??[],this._marks=n??[],this._chapters=a??[],this._videos=(e??[]).slice().sort((p,f)=>(p.name||p.id).localeCompare(f.name||f.id,void 0,{sensitivity:"base"})),this._currentVideoId=t??null,this._checked=c?{[c]:!0}:{},(h=this.renderRoot.querySelector("llama-modal"))==null||h.show(),this._addKeyHandler()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_addKeyHandler(){this._keyHandler||(this._keyHandler=e=>{e.key==="Enter"&&(e.preventDefault(),this._confirm())},document.addEventListener("keydown",this._keyHandler))}_removeKeyHandler(){this._keyHandler&&(document.removeEventListener("keydown",this._keyHandler),this._keyHandler=null)}_onModalClose(){this._removeKeyHandler()}_isChecked(e){return this._checked[e]??!1}_toggle(e){this._checked={...this._checked,[e]:!this._isChecked(e)}}_groupState(e){const t=e.filter(i=>this._isChecked(i.id)).length;return t===0?"none":t===e.length?"all":"some"}_setGroup(e,t){const i={};for(const r of e)i[r.id]=t;this._checked={...this._checked,...i}}_onGroupChange(e){this._setGroup(e,this._groupState(e)!=="all")}_renderGroup(e,t,i){if(!t.length)return"";const r=this._groupState(t);return _`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${r==="all"}
            .indeterminate=${r==="some"}
            @change=${()=>this._onGroupChange(t)}
          >
          <span>${e} (${t.length})</span>
        </div>
        <div class="group-items">
          ${t.map(o=>_`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(o.id)}
                @change=${()=>this._toggle(o.id)}
              >
              ${i(o)}
            </div>
          `)}
        </div>
      </div>
    `}_renderCurrentVideoContent(){return this._currentVideoId?this._sections.length||this._loops.length||this._marks.length||this._chapters.length?_`
${this._renderGroup("Chapters",this._chapters,t=>_`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">${z(t.start)}</span>`)}
      ${this._renderGroup("Sections",this._sections,t=>_`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">${z(t.start)}</span>`)}
      ${this._renderGroup("Loops",this._loops,t=>_`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">${z(t.start)} – ${z(t.end)}</span>`)}
      ${this._renderGroup("Marks",this._marks,t=>_`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">${z(t.time)}</span>`)}
    `:_`<div class="empty-msg">Current video has no entities to delete.</div>`:_`<div class="no-video-msg">No video loaded.</div>`}_renderVideosContent(){if(!this._videos.length)return _`<div class="empty-msg">No videos saved.</div>`;const e=this._groupState(this._videos);return _`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${e==="all"}
            .indeterminate=${e==="some"}
            @change=${()=>this._onGroupChange(this._videos)}
          >
          <span>Videos (${this._videos.length})</span>
        </div>
        <div class="group-items">
          ${this._videos.map(t=>_`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(t.id)}
                @change=${()=>this._toggle(t.id)}
              >
              <div class="item-text"><span class="item-label">${t.name||t.id}</span>${t.name?_`<span class="item-sub">${t.id}</span>`:""}</div>
            </div>
          `)}
        </div>
      </div>
    `}_getSelectedCount(){return this._mode==="videos"?this._videos.filter(e=>this._isChecked(e.id)).length:[...this._sections,...this._loops,...this._marks,...this._chapters].filter(e=>this._isChecked(e.id)).length}_confirm(){if(this._mode==="videos"){const e=this._videos.filter(t=>this._isChecked(t.id)).map(t=>t.id);if(!e.length)return;this.dispatchEvent(new CustomEvent("ll-delete-data",{detail:{mode:"videos",videoIds:e},bubbles:!0,composed:!0}))}else{const e=this._sections.filter(o=>this._isChecked(o.id)).map(o=>o.id),t=this._loops.filter(o=>this._isChecked(o.id)).map(o=>o.id),i=this._marks.filter(o=>this._isChecked(o.id)).map(o=>o.id),r=this._chapters.filter(o=>this._isChecked(o.id)).map(o=>o.id);if(!e.length&&!t.length&&!i.length&&!r.length)return;this.dispatchEvent(new CustomEvent("ll-delete-data",{detail:{mode:"current",sections:e,loops:t,marks:i,chapters:r},bubbles:!0,composed:!0}))}this.hide()}render(){const e=this._getSelectedCount();return _`
      <llama-modal label="Delete data" @ll-modal-close=${this._onModalClose}>
        <div class="mode-toggle">
          <button
            class="mode-btn ${this._mode==="current"?"active":""}"
            @click=${()=>{this._mode="current",this._checked={}}}
          >Current video</button>
          <button
            class="mode-btn ${this._mode==="videos"?"active":""}"
            @click=${()=>{this._mode="videos",this._checked={}}}
          >Entire videos</button>
        </div>
        ${this._mode==="current"?this._renderCurrentVideoContent():this._renderVideosContent()}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button
            variant="danger"
            ?disabled=${e===0}
            @click=${this._confirm}
          >Delete${e>0?` (${e})`:""}</sl-button>
        </div>
      </llama-modal>
    `}}C(rr,"styles",L`
    .mode-toggle {
      display: flex;
      margin-bottom: 1rem;
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      overflow: hidden;
    }
    .mode-btn {
      flex: 1;
      padding: 0.35rem 0.5rem;
      background: none;
      border: none;
      color: var(--ll-text-dim, #aaa);
      cursor: pointer;
      font-size: var(--ll-text-sm, 0.85rem);
    }
    .mode-btn:not(:last-child) {
      border-right: 1px solid var(--ll-border, #444);
    }
    .mode-btn.active {
      background: var(--ll-accent, #7ec8e3);
      color: #000;
    }
    .mode-btn:not(.active):hover {
      background: var(--ll-surface-raised, #2a2a2a);
      color: var(--ll-text, #e0e0e0);
    }
    .no-video-msg,
    .empty-msg {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem 0;
    }
    .group {
      margin-bottom: 0.85rem;
    }
    .group-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
    }
    .group-items {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      padding-left: 1.5rem;
    }
    .item-row {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
    .item-text {
      min-width: 0;
    }
    .item-label {
      color: var(--ll-text, #e0e0e0);
    }
    .item-sub {
      color: var(--ll-text-dim, #aaa);
      margin-left: 0.3em;
    }
    input[type="checkbox"] {
      cursor: pointer;
      accent-color: var(--ll-accent, #7ec8e3);
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
  `),C(rr,"properties",{_mode:{state:!0},_checked:{state:!0},_sections:{state:!0},_loops:{state:!0},_marks:{state:!0},_chapters:{state:!0},_videos:{state:!0},_currentVideoId:{state:!0}});customElements.define("llama-delete-data-modal",rr);class or extends D{constructor(){super(),this._json=""}show(e){var t;try{this._json=JSON.stringify(e,null,2)}catch(i){this._json=`(serialization error: ${i.message})`}(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector(".json-pre"))==null||e.focus()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this.hide())}render(){return _`
      <llama-modal
        label="Inspect data"
        width="60vw"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <pre class="json-pre" tabindex="0" @keydown=${this._onKeyDown}>${this._json}</pre>
        <div slot="footer">
          <sl-button variant="primary" @click=${this.hide}>Close</sl-button>
        </div>
      </llama-modal>
    `}}C(or,"styles",L`
    .json-pre {
      margin: 0;
      padding: 0.5rem;
      font-family: monospace;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text, #e0e0e0);
      background: var(--ll-surface, #1a1a1a);
      border: 1px solid var(--ll-border, #444);
      border-radius: 4px;
      white-space: pre;
      overflow-y: auto;
      max-height: 72vh;
      outline: none;
      cursor: default;
    }
  `),C(or,"properties",{_json:{state:!0}});customElements.define("llama-inspect-modal",or);class nr extends D{constructor(){super(),this._data=null}show(e){var t;this._data=e,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-button"))==null||e.focus()}_renderGroup(e,t){return _`
      <div class="group">
        <div class="group-header">${e} (${t.length})</div>
        ${t.length>0?_`<ul class="name-list">${t.map(i=>_`<li>${i}</li>`)}</ul>`:_`<div class="section-empty">None</div>`}
      </div>
    `}render(){const e=this._data;return _`
      <llama-modal
        label="Compare: library and cloud"
        width="44rem"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        ${e?_`
          <div class="body">
            ${this._renderGroup("Library only",e.localOnly)}
            ${this._renderGroup("Library newer",e.localNewer)}
            ${this._renderGroup("Cloud only",e.cloudOnly)}
            ${this._renderGroup("Cloud newer",e.cloudNewer)}
            ${this._renderGroup("Same last-modified",e.same)}
          </div>
        `:""}
        <div slot="footer">
          <sl-button variant="primary" @click=${()=>this.hide()}>Close</sl-button>
        </div>
      </llama-modal>
    `}}C(nr,"styles",L`
    .body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .group-header {
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
    }
    .name-list {
      list-style: disc;
      margin: 0;
      padding: 0 0 0 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    .name-list li {
      color: var(--ll-text, #e0e0e0);
      font-size: 0.9rem;
    }
    .section-empty {
      color: var(--ll-text-muted, #888);
      font-style: italic;
      padding-left: 0.75rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
  `),C(nr,"properties",{_data:{state:!0}});customElements.define("llama-cloud-status-modal",nr);class ar extends D{constructor(){super(),this._operation="",this._srcLabel="Source",this._destLabel="Destination",this._srcOnly=[],this._srcNewer=[],this._destOnly=[],this._destNewer=[],this._same=[],this._addSrcOnly=!0,this._replaceSrcNewer=!0,this._deleteDestOnly=!1,this._replaceDestNewer=!1,this._replaceSame=!1,this._answer=null,this._applyRef=ie(),this._cancelRef=ie()}show({operation:e="",srcLabel:t="Source",destLabel:i="Destination",srcOnly:r=[],srcNewer:o=[],destOnly:n=[],destNewer:a=[],same:l=[]}){var c;this._operation=e,this._srcLabel=t,this._destLabel=i,this._srcOnly=r,this._srcNewer=o,this._destOnly=n,this._destNewer=a,this._same=l,this._addSrcOnly=!0,this._replaceSrcNewer=!0,this._deleteDestOnly=!1,this._replaceDestNewer=!1,this._replaceSame=!1,this._answer=null,(c=this.renderRoot.querySelector("llama-modal"))==null||c.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}get _affectedCount(){let e=0;return this._addSrcOnly&&(e+=this._srcOnly.length),this._replaceSrcNewer&&(e+=this._srcNewer.length),this._deleteDestOnly&&(e+=this._destOnly.length),this._replaceDestNewer&&(e+=this._destNewer.length),this._replaceSame&&(e+=this._same.length),e}_onApply(){this._answer={addSrcOnly:this._addSrcOnly,replaceSrcNewer:this._replaceSrcNewer,deleteDestOnly:this._deleteDestOnly,replaceDestNewer:this._replaceDestNewer,replaceSame:this._replaceSame},this.hide()}_onCancel(){this._answer=null,this.hide()}_onInitialFocus(){var e;(e=this._applyRef.value)==null||e.focus()}_onAfterHide(){this.dispatchEvent(new CustomEvent("ll-data-op-result",{detail:this._answer,bubbles:!0,composed:!0})),this._answer=null}_renderGroup(e,t,i,r,o){return _`
      <div class="group">
        <div class="group-header">${e} (${t.length})</div>
        ${t.length>0?_`
          <sl-switch
            ?checked=${i}
            @sl-change=${n=>r(n.target.checked)}
          >${o}</sl-switch>
          <ul class="name-list">
            ${t.map(n=>_`<li>${n}</li>`)}
          </ul>
        `:_`<div class="section-empty">None</div>`}
      </div>
    `}render(){const e=this._srcLabel,t=this._destLabel,i=this._affectedCount;return _`
      <llama-modal
        label="Review: ${this._operation}"
        width="47.5rem"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <div class="body">
          ${this._renderGroup(`${e} only`,this._srcOnly,this._addSrcOnly,r=>{this._addSrcOnly=r},"Add")}
          ${this._renderGroup(`${e} newer`,this._srcNewer,this._replaceSrcNewer,r=>{this._replaceSrcNewer=r},"Replace")}
          ${this._renderGroup(`${t} only`,this._destOnly,this._deleteDestOnly,r=>{this._deleteDestOnly=r},"Delete")}
          ${this._renderGroup(`${t} newer`,this._destNewer,this._replaceDestNewer,r=>{this._replaceDestNewer=r},"Replace")}
          ${this._renderGroup("Same last-modified",this._same,this._replaceSame,r=>{this._replaceSame=r},"Replace")}
        </div>
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button ${re(this._applyRef)} variant="primary" ?disabled=${i===0} @click=${this._onApply}>
            Apply${i>0?` (${i})`:""}
          </sl-button>
          <sl-button ${re(this._cancelRef)} @click=${this._onCancel}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(ar,"styles",L`
    .body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .group-header {
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
    }
    .name-list {
      list-style: disc;
      margin: 0;
      padding: 0 0 0 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    .name-list li {
      color: var(--ll-text, #e0e0e0);
      font-size: 0.9rem;
    }
    .section-empty {
      color: var(--ll-text-muted, #888);
      font-style: italic;
      padding-left: 0.75rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
  `),C(ar,"properties",{_operation:{state:!0},_srcLabel:{state:!0},_destLabel:{state:!0},_srcOnly:{state:!0},_srcNewer:{state:!0},_destOnly:{state:!0},_destNewer:{state:!0},_same:{state:!0},_addSrcOnly:{state:!0},_replaceSrcNewer:{state:!0},_deleteDestOnly:{state:!0},_replaceDestNewer:{state:!0},_replaceSame:{state:!0}});customElements.define("llama-data-op-modal",ar);class lr extends D{constructor(){super(),this._newVideos=[],this._existingVideos=[],this._addNew=!0,this._replaceExisting=!1,this._answer=null,this._applyRef=ie(),this._cancelRef=ie()}show({newVideos:e=[],existingVideos:t=[]}){var i;this._newVideos=e,this._existingVideos=t,this._addNew=!0,this._replaceExisting=!1,this._answer=null,(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}get _affectedCount(){let e=0;return this._addNew&&(e+=this._newVideos.length),this._replaceExisting&&(e+=this._existingVideos.length),e}_onApply(){this._answer={addNew:this._addNew,replaceExisting:this._replaceExisting},this.hide()}_onCancel(){this._answer=null,this.hide()}_onInitialFocus(){var e;(e=this._applyRef.value)==null||e.focus()}_onAfterHide(){this.dispatchEvent(new CustomEvent("ll-load-examples-result",{detail:this._answer,bubbles:!0,composed:!0})),this._answer=null}_renderGroup(e,t,i,r,o){return _`
      <div class="group">
        <div class="group-header">${e} (${t.length})</div>
        ${t.length>0?_`
          <sl-switch
            ?checked=${i}
            @sl-change=${n=>r(n.target.checked)}
          >${o}</sl-switch>
          <ul class="name-list">
            ${t.map(n=>_`<li>${n}</li>`)}
          </ul>
        `:_`<div class="section-empty">None</div>`}
      </div>
    `}render(){const e=this._affectedCount;return _`
      <llama-modal
        label="Load examples"
        width="47.5rem"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <div class="body">
          ${this._renderGroup("Not in library",this._newVideos,this._addNew,t=>{this._addNew=t},"Add")}
          ${this._renderGroup("Already in library",this._existingVideos,this._replaceExisting,t=>{this._replaceExisting=t},"Replace")}
        </div>
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button ${re(this._applyRef)} variant="primary" ?disabled=${e===0} @click=${this._onApply}>
            Apply${e>0?` (${e})`:""}
          </sl-button>
          <sl-button ${re(this._cancelRef)} @click=${this._onCancel}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(lr,"styles",L`
    .body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .group-header {
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
    }
    .name-list {
      list-style: disc;
      margin: 0;
      padding: 0 0 0 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    .name-list li {
      color: var(--ll-text, #e0e0e0);
      font-size: 0.9rem;
    }
    .section-empty {
      color: var(--ll-text-muted, #888);
      font-style: italic;
      padding-left: 0.75rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
  `),C(lr,"properties",{_newVideos:{state:!0},_existingVideos:{state:!0},_addNew:{state:!0},_replaceExisting:{state:!0}});customElements.define("llama-load-examples-modal",lr);const dp=6e3,Ho=.25,Wo=2,oa=["Freedom isn't free — but looping is.","How about a little something, you know, for the effort?","I have two speeds: loop and scratch.","It's loops all the way down.","Keep on loopin' in the free world!","Time is a flat circle — so a loop.","The Llama abides.","Hey, baby, scratch my ears.","¿Cómo se Llama?","Need loops? No probllama.",`Dream ticket: Millard Fillmore & Barack "Murphy" O'Llama.`,"Which side of The Llama has the most fleece? The outside.","Top productivity hack: an allama clock.","What's two llamas next to the Liberty Bell? Llama llama ding dong.","Never doubt The Llama.","If life gives you lemons, make Llamonade."];class cr extends D{constructor(){super(),this.currentTime=0,this.duration=null,this.speed=1,this.isPlaying=!1,this.looping=!1,this.loopStart=0,this.loopEnd=0,this.sections=[],this.marks=[],this.namedLoops=[],this.jumps=[],this.loopSrc=null,this.statusMsg=null,this._skipSignOutMsg=!1,this.wkPrefix=null,this.wkCompletions=null,this.wkCount=null,this.windowFocused=!0,this.currentUser=null,this.editScratchActive=!1,this.editScratchFocus="start",this._appState=Ed()??Oa(),this.videos=this._appState.videos,this.stashes=this._appState.stashes??{},this.currentVideoId=this._appState.currentVideoId,this.activeEntityType="any",this.chapters=[],this.zoomSource=null,this.warningMsg=null,this.errorMsg=null,this.zone2Mode="sections",this._quip="",this._quipDeck=[],this._quipPos=0,this._quipInterval=null,this._pendingNewVideoId=null,this._warnTimeout=null,this._statusTimeout=null,this._errorTimeout=null,this._lastMsg=null,this._vc=null,this._kb=null,this._pollId=null,this._editScratchHandler=null,this._urlInputModalEl=null,this._videoPickerEl=null,this._editVideoModalEl=null,this._saveLoopModalEl=null,this._loopPickerEl=null,this._marksPickerEl=null,this._editMarkModalEl=null,this._sectionsPickerEl=null,this._editSectionModalEl=null,this._chapterPickerEl=null,this._editChapterModalEl=null,this._videoInfoModalEl=null,this._jumpHistoryPickerEl=null,this._optionsModalEl=null,this._deleteDataModalEl=null,this._cloudStatusModalEl=null,this._fileInputEl=null,this._jumpIdx=-1,this._jumpFromTime=null,this._suppressJumpPush=!1,this._undoMgr=new bi({getSnapshot:()=>{this._saveCurrentState();const e=this._appState.videos.find(t=>t.id===this.currentVideoId);return{video:JSON.parse(JSON.stringify(e)),currentVideoId:this.currentVideoId}},applySnapshot:e=>this._applySnapshot(e),onUndo:(e,t)=>{this.statusMsg=e>1?`Undone: ${e} edits.`:`Undone › ${t}.`},onRedo:(e,t)=>{this.statusMsg=e>1?`Redone: ${e} edits.`:`Redone › ${t}.`},onEmpty:e=>this._setWarning(`Cannot ${e}: no edit history.`)}),this._dataMgr=new Fd(this),this.seekDelta=M.seek_delta_default,this.speedDelta=M.speed_delta,this.loopNudgeDelta=M.loop_nudge_delta_default}updated(e){var t,i,r;e.has("statusMsg")&&this.statusMsg&&(clearTimeout(this._statusTimeout),this._statusTimeout=setTimeout(()=>{this.statusMsg=null},5e3),this.statusMsg!==((t=this._lastMsg)==null?void 0:t.text)&&(this._lastMsg={text:this.statusMsg,type:"status"})),e.has("warningMsg")&&this.warningMsg&&(clearTimeout(this._warnTimeout),this._warnTimeout=setTimeout(()=>{this.warningMsg=null},5e3),this.warningMsg!==((i=this._lastMsg)==null?void 0:i.text)&&(this._lastMsg={text:this.warningMsg,type:"warning"})),e.has("errorMsg")&&this.errorMsg&&(clearTimeout(this._errorTimeout),this._errorTimeout=setTimeout(()=>{this.errorMsg=null},5e3),this.errorMsg!==((r=this._lastMsg)==null?void 0:r.text)&&(this._lastMsg={text:this.errorMsg,type:"error"}))}_syncFromVideo(e){var r;this.chapters=[...e.chapters??[]],this.sections=[...e.sections??[]],this.marks=[...e.marks??[]],this.namedLoops=[...e.loops??[]],this.jumps=[...e.jumps??[]],this._jumpIdx=-1,this._jumpFromTime=null;const t=e.scratchLoop;this.loopStart=(t==null?void 0:t.start)??0,this.loopEnd=(t==null?void 0:t.end)??0,this.looping=(t==null?void 0:t.looping)??!1;const i=hp(e,t==null?void 0:t.sourceId,t==null?void 0:t.sourceType);!i&&(t!=null&&t.sourceId)&&t&&(t.sourceId=null,t.sourceType=null),this.loopSrc=i,this.speed=e.speed??1,(r=this._vc)==null||r.setPlaybackRate(this.speed),this.seekDelta=e.seek_delta??M.seek_delta_default,this.loopNudgeDelta=e.nudge_delta??M.loop_nudge_delta_default,this.activeEntityType=e.entity_type??"any",this.zoomSource=null,this.zone2Mode=e.zone2_mode??"sections"}_clearCurrentVideoState(){var e;this._undoMgr.clear(),(e=this._vc)==null||e.pause(),this._appState.currentVideoId=null,this.currentVideoId=null,this.sections=[],this.marks=[],this.namedLoops=[],this.chapters=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSrc=null,this.duration=null}_maybePushJump(e,t){var r;if(this._suppressJumpPush||Math.abs(t-e)<=Ra)return;const i=(r=this._appState)==null?void 0:r.videos.find(o=>o.id===this.currentVideoId);i&&(i.jumps.push(e),i.jumps.length>Aa&&i.jumps.shift(),this.jumps=[...i.jumps],this._jumpIdx=-1,this._jumpFromTime=null,this._save())}_saveCurrentState(){var t,i,r;const e=(t=this._appState)==null?void 0:t.videos.find(o=>o.id===this.currentVideoId);e&&(e.chapters=[...this.chapters],e.sections=[...this.sections],e.marks=[...this.marks],e.jumps=[...this.jumps],e.time=this.currentTime,e.scratchLoop||(e.scratchLoop={start:0,end:0,looping:!1,sourceId:null,sourceType:null}),e.scratchLoop.start=this.loopStart,e.scratchLoop.end=this.loopEnd,e.scratchLoop.looping=this.looping,e.scratchLoop.sourceId=((i=this.loopSrc)==null?void 0:i.id)??null,e.scratchLoop.sourceType=((r=this.loopSrc)==null?void 0:r.type)??null,e.loops=[...this.namedLoops],e.speed=this.speed,e.seek_delta=this.seekDelta,e.nudge_delta=this.loopNudgeDelta,e.entity_type=this.activeEntityType,e.zone2_mode=this.zone2Mode,e.last_modified=Date.now(),this._save())}_applyOptions(e){if(!e)return;e.loop_nudge_delta_default==null&&(e.loop_nudge_delta_default=M.loop_nudge_delta_default),e.loop_nudge_delta_choices==null&&(e.loop_nudge_delta_choices=M.loop_nudge_delta_choices);const t=e.seek_delta_choices,i=e.loop_nudge_delta_choices;t.includes(this.seekDelta)||(this.seekDelta=e.seek_delta_default),i.includes(this.loopNudgeDelta)||(this.loopNudgeDelta=e.loop_nudge_delta_default),this.speedDelta=e.speed_delta}_onOptionsSaved(e){const{options:t}=e.detail;this._appState.options=t,this._applyOptions(t),this._save(),this.statusMsg="Options: saved."}_loadVideoObject(e,t=null,i="Video: loaded."){this._undoMgr.clear(),this._saveCurrentState(),e.last_opened=Date.now(),this._appState.currentVideoId=e.id,this.currentVideoId=e.id,this._syncFromVideo(e);const r=t??(this.looping&&this.loopStart<this.loopEnd?this.loopStart:e.time??0);this._vc.cueVideo(e.id,r),this.duration=null,this.statusMsg=i,this._save(),En(e.id)}_speedChange(e){var o,n;const t=((o=this._vc)==null?void 0:o.getPlaybackRate())??1,i=Math.round((t+e)*100)/100,r=Math.max(Ho,Math.min(Wo,i));(n=this._vc)==null||n.setPlaybackRate(r),this.speed=r,this._saveCurrentState()}_flash(e,t="timed"){var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.flash(e,t)}_pushUndoSnapshot(){var r,o;const e=this._appState.videos.find(n=>n.id===this.currentVideoId);if(!e)return;const t=(this.statusMsg??"").replace(/\.$/,""),i=JSON.parse(JSON.stringify(e));i.scratchLoop={start:this.loopStart,end:this.loopEnd,looping:this.looping,sourceId:((r=this.loopSrc)==null?void 0:r.id)??null,sourceType:((o=this.loopSrc)==null?void 0:o.type)??null},this._undoMgr.push({video:i,currentVideoId:this.currentVideoId,desc:t})}_applySnapshot(e){const t=this._appState.videos.findIndex(i=>i.id===e.currentVideoId);t!==-1&&(this._appState.videos[t]=JSON.parse(JSON.stringify(e.video)),this.videos=[...this._appState.videos],this._syncFromVideo(this._appState.videos[t]),this._save())}_makeHandlers(){const e=()=>this.currentVideoId?!1:(this._setWarning("No current video."),!0);return{playPause:()=>{e()||(this._onPlayPause(),this._flash("playPause"))},speedDown:(t=1)=>{this._speedChange(-this.speedDelta*t),this._flash("speed")},speedUp:(t=1)=>{this._speedChange(this.speedDelta*t),this._flash("speed")},speedReset:()=>{var t;(t=this._vc)==null||t.setPlaybackRate(1),this.speed=1,this._saveCurrentState(),this._flash("speed")},seekForward:(t=1)=>{e()||(this._seek(this.seekDelta*t),this._flash("time"))},seekBack:(t=1)=>{e()||(this._seek(-this.seekDelta*t),this._flash("time"))},seekDeltaDown:()=>{var r;const t=((r=this._appState)==null?void 0:r.options.seek_delta_choices)??M.seek_delta_choices,i=t.indexOf(this.seekDelta);this.seekDelta=t[Math.max(i-1,0)],this._flash("seekDelta")},seekDeltaUp:()=>{var r;const t=((r=this._appState)==null?void 0:r.options.seek_delta_choices)??M.seek_delta_choices,i=t.indexOf(this.seekDelta);this.seekDelta=t[Math.min(i+1,t.length-1)],this._flash("seekDelta")},prevEntity:(t=1)=>{this._navigateEntity("prev",t)},entityType:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusEntitySelect(),this._flash("entitySelect","until-blur")},nextEntity:(t=1)=>{this._navigateEntity("next",t)},jumpToStart:()=>{var r,o,n;if(e())return;const t=(r=this._appState)==null?void 0:r.videos.find(a=>a.id===this.currentVideoId),i=this.looping?this.loopStart:(t==null?void 0:t.start)??0;this._maybePushJump(((o=this._vc)==null?void 0:o.getCurrentTime())??0,i),(n=this._vc)==null||n.seekTo(i),this._flash("time")},setLoopStart:()=>{var t;e()||(this.loopStart=((t=this._vc)==null?void 0:t.getCurrentTime())??0,this._autoDisableLoopIfInvalid(),this._flash("loopStart"))},setLoopEnd:()=>{var t;e()||(this.loopEnd=((t=this._vc)==null?void 0:t.getCurrentTime())??0,this._autoDisableLoopIfInvalid(),this._flash("loopEnd"))},resetLoopStart:()=>{e()||(this.loopStart=0,this._autoDisableLoopIfInvalid(),this._flash("loopStart"))},resetLoopEnd:()=>{e()||(this.loopEnd=this.duration??0,this._autoDisableLoopIfInvalid(),this._flash("loopEnd"))},nudgeStartDown:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopStart=Wr(-this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopStart")},nudgeStartUp:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopStart=Wr(+this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopStart")},nudgeEndDown:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopEnd=Kr(-this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopEnd")},nudgeEndUp:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopEnd=Kr(+this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopEnd")},focusLoopNudgeDelta:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusNudgeDeltaSelect(),this._flash("nudgeDelta","until-blur")},focusLoopStart:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusStartInput(),this._flash("loopStart","until-blur")},focusLoopEnd:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusEndInput(),this._flash("loopEnd","until-blur")},copyTime:()=>{const t=this.currentTime??0,i=Math.floor(t/60),r=Math.floor(t%60).toString().padStart(2,"0"),o=`${i}:${r}`;navigator.clipboard.writeText(o).then(()=>{this.statusMsg=`Time copied: ${o}.`},()=>this._setWarning("Cannot copy current time: clipboard blocked."))},undo:t=>this._undoMgr.undo(t),redo:t=>this._undoMgr.redo(t),clearHistory:()=>{this._undoMgr.clear(),this.statusMsg="Edit history: cleared."},helpKeys:()=>window.open(`${Ss()}/loopllama/v2/keybindings/`,"_blank"),options:()=>{var t,i;return(i=this._optionsModalEl)==null?void 0:i.show((t=this._appState)==null?void 0:t.options)},videoUrl:()=>{var t;return(t=this._urlInputModalEl)==null?void 0:t.show()},videoPickerRecent:()=>{var t,i;if(!((t=this._appState)!=null&&t.videos.length)){this._setWarning("No videos.");return}(i=this._videoPickerEl)==null||i.show("switch","recent")},editVideo:()=>{var t;if(!this.currentVideoId){this._setWarning("No current video.");return}(t=this._editVideoModalEl)==null||t.show()},scratchVideo:()=>{var o;if(this.duration==null){this._setError("Cannot scratch video: video duration unknown.");return}const t=(o=this._appState)==null?void 0:o.videos.find(n=>n.id===this.currentVideoId),i=(t==null?void 0:t.start)??0,r=(t==null?void 0:t.end)??this.duration;this._clearZoomIfOutside(i,r),this.loopStart=i,this.loopEnd=r,this.looping=!0,this.loopSrc=null,this.statusMsg="Video: scratched."},zoomVideo:()=>{var o,n;if(((o=this.zoomSource)==null?void 0:o.trigger)==="video"){this.zoomSource=null,this.statusMsg="Zoom: off.";return}const t=(n=this._appState)==null?void 0:n.videos.find(a=>a.id===this.currentVideoId);if(!t){this._setWarning("No current video.");return}const i=t.start??0,r=t.end??this.duration;if(i===0&&(r==null||r>=this.duration)){this._setWarning("Cannot zoom a range spanning entire video.");return}this.zoomSource={start:i,end:r,trigger:"video"},this.statusMsg="Video: zoomed.",this._seekIntoZoomIfNeeded()},deleteVideo:()=>{var t,i;if(!((t=this._appState)!=null&&t.videos.length)){this._setWarning("No videos.");return}(i=this._videoPickerEl)==null||i.show("delete")},restoreVideo:()=>{var t;if(!Object.keys(this._appState.stashes??{}).length){this._setWarning("No stashed videos.");return}(t=this._videoPickerEl)==null||t.show("restore")},jumpTime:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusTimeInput(),this._flash("time","until-blur")},jumpSection:()=>{this._openSectionsPicker("jump")},jumpLoop:()=>{this._openLoopsPicker("jump")},jumpMark:()=>{this._openMarksPicker("jump")},jumpChapter:()=>{this._openChapterPicker("jump")},jumpHistory:()=>{var t;if(!this.jumps.length){this._setWarning("No jump history.");return}(t=this._jumpHistoryPickerEl)==null||t.show()},jumpBack:()=>{var i,r;if(!this.jumps.length){this._setWarning("Cannot jump: no jump history.");return}if(this._jumpIdx===-1)this._jumpFromTime=((i=this._vc)==null?void 0:i.getCurrentTime())??0,this._jumpIdx=this.jumps.length-1;else if(this._jumpIdx>0)this._jumpIdx--;else{this._setWarning("Cannot jump: at oldest position.");return}const t=this.jumps[this._jumpIdx];this._suppressJumpPush=!0,(r=this._vc)==null||r.seekTo(t),this._suppressJumpPush=!1,this._flash("time")},jumpForward:()=>{var t,i;if(!this.jumps.length){this._setWarning("Cannot jump: no jump history.");return}if(this._jumpIdx===-1){this._setWarning("Cannot jump: at newest position.");return}if(this._jumpIdx<this.jumps.length-1){this._jumpIdx++;const r=this.jumps[this._jumpIdx];this._suppressJumpPush=!0,(t=this._vc)==null||t.seekTo(r),this._suppressJumpPush=!1,this._flash("time")}else{this._jumpIdx=-1;const r=this._jumpFromTime??0;this._jumpFromTime=null,this._suppressJumpPush=!0,(i=this._vc)==null||i.seekTo(r),this._suppressJumpPush=!1,this._flash("time")}},toggleLoop:()=>{e()||this._toggleLoop()},saveLoop:()=>{if(this.loopEnd<=this.loopStart){this._setWarning("Cannot create loop: invalid range.");return}this.statusMsg="Loop: created.",this._pushUndoSnapshot(),on(this.namedLoops,this.loopStart,this.loopEnd),this.namedLoops=[...this.namedLoops],this._saveCurrentState()},saveBack:()=>{var t,i;if(!this.loopSrc){this._setWarning("Cannot save: no scratch loop source.");return}if(this.loopStart>=this.loopEnd){this._setWarning("Cannot save: invalid scratch loop range.");return}if(this.loopSrc.type==="loop"){const r=this.namedLoops.findIndex(o=>o.id===this.loopSrc.id);if(r===-1){this._setWarning("Cannot save: scratch loop source not found.");return}this.statusMsg="Scratch loop: saved back to source.",this._pushUndoSnapshot(),this.namedLoops[r].start=this.loopStart,this.namedLoops[r].end=this.loopEnd,this.namedLoops=[...this.namedLoops],this.loopSrc={...this.loopSrc,start:this.loopStart,end:this.loopEnd},this._saveCurrentState();return}if(this.loopSrc.type==="section"||this.loopSrc.type==="chapter"){const r=this.loopSrc.type==="section",o=r?this.sections:this.chapters,n=o.findIndex(p=>p.id===this.loopSrc.id);if(n===-1){this._setWarning("Cannot save: scratch loop source not found.");return}const a=((t=this._appState)==null?void 0:t.options.loop_pad_start)??M.loop_pad_start,l=((i=this._appState)==null?void 0:i.options.loop_pad_end)??M.loop_pad_end,c=this.loopStart+a,h=this.loopEnd-l;if(c>=h){this._setWarning("Cannot save: invalid scratch loop range.");return}if(!Jr(o,n,c,h,this.duration)){this._setWarning("Cannot save: would eliminate a neighboring source.");return}this.statusMsg="Scratch loop: saved back to source.",this._pushUndoSnapshot(),si(o,n,c,h),r?this.sections=[...this.sections]:this.chapters=[...this.chapters],this.loopSrc={...this.loopSrc,start:c,end:h},this._saveCurrentState();return}this._setWarning("Cannot save: no scratch loop source.")},resetLoopToSource:()=>{var o,n;if(!this.loopSrc){this._setWarning("Cannot reset: no scratch loop source.");return}const t=this.loopSrc.type!=="loop"?((o=this._appState)==null?void 0:o.options.loop_pad_start)??M.loop_pad_start:0,i=this.loopSrc.type!=="loop"?((n=this._appState)==null?void 0:n.options.loop_pad_end)??M.loop_pad_end:0,r=this.loopSrc.end??this.duration??1/0;this.loopStart=Math.max(0,this.loopSrc.start-t),this.loopEnd=Math.min(this.duration??1/0,r+i),this._clearZoomIfOutside(this.loopStart,this.loopEnd),this._autoDisableLoopIfInvalid(),this.statusMsg="Scratch loop: reset to source."},unlinkLoopSource:()=>{if(!this.loopSrc){this._setWarning("Cannot unlink: no scratch loop source.");return}this.loopSrc=null,this.statusMsg="Scratch loop: source unlinked."},editScratch:()=>this._enterEditScratch(),editLoop:()=>{var i;const t=this.namedLoops.find(r=>this.currentTime>=r.start&&this.currentTime<=r.end);if(!t){this._setWarning("No current loop.");return}(i=this._saveLoopModalEl)==null||i.show(t)},scratchLoop:()=>{const t=this.namedLoops.find(i=>this.currentTime>=i.start&&this.currentTime<=i.end);if(!t){this._setWarning("No current loop.");return}this._clearZoomIfOutside(t.start,t.end),this.loopStart=t.start,this.loopEnd=t.end,this.looping=!0,this.loopSrc={id:t.id,label:t.name||null,type:"loop",start:t.start,end:t.end},this.statusMsg="Loop: scratched."},deleteLoop:()=>this._openLoopsPicker("delete"),zoomLoop:()=>{var i;if(((i=this.zoomSource)==null?void 0:i.trigger)==="loop"){this.zoomSource=null,this.statusMsg="Zoom: off.";return}const t=this.namedLoops.find(r=>this.currentTime>=r.start&&this.currentTime<=r.end);if(!t){this._setWarning("No current loop.");return}if(t.start===0&&t.end===this.duration){this._setWarning("Cannot zoom a range spanning entire video.");return}this.zoomSource={start:t.start,end:t.end,trigger:"loop"},this.statusMsg="Loop: zoomed.",this._seekIntoZoomIfNeeded()},zoomScratch:()=>{var t;if(((t=this.zoomSource)==null?void 0:t.trigger)==="scratch"){this.zoomSource=null,this.statusMsg="Zoom: off.";return}if(!this._isLoopValid()){this._setWarning("Cannot zoom scratch loop: invalid range.");return}if(this.loopStart===0&&this.loopEnd===this.duration){this._setWarning("Cannot zoom a range spanning entire video.");return}this.zoomSource={start:this.loopStart,end:this.loopEnd,trigger:"scratch"},this.statusMsg="Scratch loop: zoomed.",this._seekIntoZoomIfNeeded()},zoomSection:()=>this._zoomDivider("section"),setSection:()=>this._setDivider("section"),editSection:()=>this._editCurrentDivider("section"),scratchSection:()=>this._scratchDivider("section"),deleteSection:()=>this._openSectionsPicker("delete"),fixSection:()=>this._fixDivider("section"),setMark:()=>{var i;const t=((i=this._vc)==null?void 0:i.getCurrentTime())??0;if(!Na(this.marks,t)){this._setWarning("Cannot create mark: mark exists at current time.");return}this.statusMsg="Mark: created.",this._pushUndoSnapshot(),this.marks=[...this.marks],this._saveCurrentState()},editMark:()=>this._editCurrentMark(),deleteMark:()=>this._openMarksPicker("delete"),setChapter:()=>this._setDivider("chapter"),editChapter:()=>this._editCurrentDivider("chapter"),scratchChapter:()=>this._scratchDivider("chapter"),deleteChapter:()=>this._openChapterPicker("delete"),fixChapter:()=>this._fixDivider("chapter"),toggleZone2:()=>{this.zone2Mode=this.zone2Mode==="sections"?"chapters":"sections",this.statusMsg=`Timeline displaying: ${this.zone2Mode}.`,this._saveCurrentState()},zoomChapter:()=>this._zoomDivider("chapter"),zoomOff:()=>{if(!this.zoomSource){this._setWarning("No current zoom.");return}this.zoomSource=null,this.statusMsg="Zoom: off."},videoInfo:()=>{var t;return(t=this._videoInfoModalEl)==null?void 0:t.show()},helpGeneral:()=>window.open(`${Ss()}/loopllama/v2/help/`,"_blank"),siteHome:()=>window.open("https://hindman.github.io/","_blank"),siteCode:()=>window.open("https://github.com/hindman/hindman.github.io/tree/master/loopllama","_blank"),siteIssues:()=>window.open("https://github.com/hindman/hindman.github.io/issues","_blank"),deleteData:()=>{var i,r,o;const t=(i=this._appState)==null?void 0:i.videos.find(n=>n.id===this.currentVideoId);(o=this._deleteDataModalEl)==null||o.show({videos:((r=this._appState)==null?void 0:r.videos)??[],currentVideoId:this.currentVideoId,currentVideoName:(t==null?void 0:t.name)||(t==null?void 0:t.id)||null,sections:this.sections,namedLoops:this.namedLoops,marks:this.marks,chapters:this.chapters})},exportAll:()=>this._dataMgr.exportAll(),importData:()=>{var t;return(t=this._fileInputEl)==null?void 0:t.click()},inspectData:()=>{var t;return(t=this._inspectModalEl)==null?void 0:t.show(JSON.parse($n(this._appState)))},shareVideo:()=>this._dataMgr.createVideoShare(),shareLoop:()=>this._dataMgr.createLoopShare(),dataSave:()=>this._dataMgr.dataSave(),dataRead:()=>this._dataMgr.dataRead(),dataCompare:()=>this._dataMgr.dataCompare(),loadExamples:()=>{var o;const t=ko.filter(n=>!this._appState.videos.find(a=>a.id===n.id)),i=ko.filter(n=>this._appState.videos.find(a=>a.id===n.id));this._loadExamplesResolve=null;const r=new Promise(n=>{this._loadExamplesResolve=n});(o=this._loadExamplesModalEl)==null||o.show({newVideos:t.map(n=>n.name),existingVideos:i.map(n=>n.name)}),r.then(n=>{if(!n)return;let a=!1;if(n.addNew)for(const l of t)this._appState.videos.push(l),a=!0;if(n.replaceExisting)for(const l of i){const c=this._appState.videos.findIndex(h=>h.id===l.id);c!==-1&&(this._appState.videos[c]=l,a=!0)}a&&(this.videos=[...this._appState.videos],this._save()),this.statusMsg="Examples: loaded."})},msgRecall:()=>{if(!this._lastMsg){this._setWarning("No recent message.");return}const{text:t,type:i}=this._lastMsg;i==="warning"?this.warningMsg=t:i==="error"?this.errorMsg=t:this.statusMsg=t},openMenuVideo:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Video")},openMenuChapter:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Chapter")},openMenuSection:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Section")},openMenuLoop:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Loop")},openMenuScratch:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Scratch")},openMenuMark:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Mark")},openMenuData:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("Data")},openMenuApp:()=>{var t;return(t=this.renderRoot.querySelector("llama-controls"))==null?void 0:t.openMenu("App")}}}_save(){kn(this._appState)}async firstUpdated(){Id();const e=this.renderRoot.querySelector("#player-container");if(this._vc=Kd({onError:()=>{this._setError("YouTube failed to load video."),this._pendingNewVideoId&&(this._appState.videos=this._appState.videos.filter(i=>i.id!==this._pendingNewVideoId),this.videos=[...this._appState.videos],this._pendingNewVideoId=null)},onReady:()=>{},onStateChange:i=>{if(i===1||i===5){const r=this._appState.videos.find(o=>o.id===this.currentVideoId);if(r&&!r.name){const o=this._vc.getVideoTitle();o&&(r.name=o,this.videos=[...this._appState.videos],this._save())}}}}),await this._vc.initialize(e),this._handlers=this._makeHandlers(),this._kb=Jd(this._handlers,{onPendingKey:(i,r)=>{this.wkPrefix=i,this.wkCompletions=r},onCountChange:i=>{this.wkCount=i}}),this._urlInputModalEl=this.renderRoot.querySelector("llama-url-input-modal"),this._videoPickerEl=this.renderRoot.querySelector("llama-video-picker"),this._editVideoModalEl=this.renderRoot.querySelector("llama-edit-video-modal"),this._saveLoopModalEl=this.renderRoot.querySelector("llama-save-loop-modal"),this._loopPickerEl=this.renderRoot.querySelector("llama-loop-picker"),this._marksPickerEl=this.renderRoot.querySelector("llama-marks-picker"),this._editMarkModalEl=this.renderRoot.querySelector("llama-edit-mark-modal"),this._sectionsPickerEl=this.renderRoot.querySelector("llama-sections-picker"),this._editSectionModalEl=this.renderRoot.querySelector("llama-edit-section-modal"),this._chapterPickerEl=this.renderRoot.querySelector("llama-chapter-picker"),this._editChapterModalEl=this.renderRoot.querySelector("llama-edit-chapter-modal"),this._videoInfoModalEl=this.renderRoot.querySelector("llama-video-info-modal"),this._jumpHistoryPickerEl=this.renderRoot.querySelector("llama-jump-history-picker"),this._optionsModalEl=this.renderRoot.querySelector("llama-options-modal"),this._deleteDataModalEl=this.renderRoot.querySelector("llama-delete-data-modal"),this._inspectModalEl=this.renderRoot.querySelector("llama-inspect-modal"),this._cloudStatusModalEl=this.renderRoot.querySelector("llama-cloud-status-modal"),this._sharedVideoConflictModalEl=this.renderRoot.querySelector("llama-shared-video-conflict-modal"),this._dataOpModalEl=this.renderRoot.querySelector("llama-data-op-modal"),this._loadExamplesModalEl=this.renderRoot.querySelector("llama-load-examples-modal"),this._fileInputEl=this.renderRoot.querySelector("#import-file-input"),this._applyOptions(this._appState.options),window.addEventListener("blur",()=>{this.windowFocused=!1}),window.addEventListener("focus",()=>{this.windowFocused=!0}),this.currentUser=await Dd(),this.currentUser&&await this._dataMgr.handleSignIn(this.currentUser),this._unsubscribeAuth=Nd(async i=>{const r=!this.currentUser;this.currentUser=i,i&&r&&await this._dataMgr.handleSignIn(i),!i&&!r&&(this._skipSignOutMsg||(this.statusMsg="Signed out."),this._skipSignOutMsg=!1)}),!await this._dataMgr.handleStartupShare()&&this._appState.currentVideoId){const i=this._appState.videos.find(r=>r.id===this._appState.currentVideoId);if(i){this._syncFromVideo(i);const r=this.looping&&this.loopStart<this.loopEnd?this.loopStart:i.time??0;this._vc.cueVideo(i.id,r)}}this._pollId=setInterval(()=>{const i=this._vc.getCurrentTime();this.currentTime=i,this.isPlaying=this._vc.isPlaying(),this.speed=this._vc.getPlaybackRate();const r=this._vc.getDuration();if(r!==null&&(this.duration=r),this.zoomSource&&i!==null&&(i>=this.zoomSource.end?this.looping&&this.loopStart<this.loopEnd?this._vc.seekTo(Math.max(this.zoomSource.start,this.loopStart)):this.looping?this._vc.seekTo(this.zoomSource.start):this._vc.pause():i<this.zoomSource.start&&this._vc.seekTo(this.zoomSource.start)),this.looping&&this.loopStart<this.loopEnd&&i!==null&&i>=this.loopEnd){const o=this.zoomSource?Math.max(this.zoomSource.start,this.loopStart):this.loopStart;this._vc.seekTo(o)}},500)}_enterEditScratch(){var t;this._kb.disable(),this.editScratchActive=!0,this.editScratchFocus="start",this._editScratchHandler=i=>this._editScratchKeyDown(i);let e=document.activeElement;for(;(t=e==null?void 0:e.shadowRoot)!=null&&t.activeElement;)e=e.shadowRoot.activeElement;e==null||e.blur(),document.addEventListener("keydown",this._editScratchHandler)}_exitEditScratch(){document.removeEventListener("keydown",this._editScratchHandler),this._editScratchHandler=null,this.editScratchActive=!1,this._kb.enable()}_editScratchKeyDown(e){var o,n,a,l;const t=e.composedPath()[0],i=t==null?void 0:t.tagName;if(i==="INPUT"||i==="TEXTAREA"||i==="SELECT"||t!=null&&t.isContentEditable)return;const r=e.key;if(/^[0-9:/]$/.test(r)){const c=this.renderRoot.querySelector("llama-controls");this.editScratchFocus==="start"?c==null||c.focusStartInput():c==null||c.focusEndInput();return}if(r==="Tab"){e.preventDefault(),this.editScratchFocus=this.editScratchFocus==="start"?"end":"start";return}if(r==="ArrowLeft"||r==="ArrowRight"){e.preventDefault();const c=(r==="ArrowRight"?1:-1)*this.loopNudgeDelta,h=this.duration??1/0;this.editScratchFocus==="start"?this.loopStart=Math.max(0,Math.min(this.loopStart+c,h)):this.loopEnd=Math.max(0,Math.min(this.loopEnd+c,h)),this._autoDisableLoopIfInvalid();return}if(r==="ArrowUp"||r==="ArrowDown"){e.preventDefault();const c=[...((o=this._appState)==null?void 0:o.options.loop_nudge_delta_choices)??M.loop_nudge_delta_choices].sort((p,f)=>p-f),h=c.indexOf(this.loopNudgeDelta);r==="ArrowUp"?this.loopNudgeDelta=c[Math.min(h+1,c.length-1)]:this.loopNudgeDelta=c[Math.max(h-1,0)];return}if(r===" "){e.preventDefault();const c=this.editScratchFocus==="start"?this.loopStart:Math.max(0,this.loopEnd-3);(n=this._vc)==null||n.seekTo(c),(a=this._vc)!=null&&a.isPlaying()||(l=this._vc)==null||l.play();return}if(r==="Backspace"){e.preventDefault(),this.editScratchFocus==="start"?this.loopStart=0:this.loopEnd=this.duration??0,this._autoDisableLoopIfInvalid();return}(r==="Enter"||r==="Escape")&&(e.preventDefault(),this._exitEditScratch())}disconnectedCallback(){var e,t;super.disconnectedCallback(),clearInterval(this._pollId),clearTimeout(this._warnTimeout),clearTimeout(this._statusTimeout),clearTimeout(this._errorTimeout),(e=this._kb)==null||e.destroy(),this._editScratchHandler&&document.removeEventListener("keydown",this._editScratchHandler),(t=this._unsubscribeAuth)==null||t.call(this)}_loadUrl(e){if(e=e.trim(),!e)return;const t=Oi(e);if(!t){this._setWarning("Invalid YouTube URL or ID.");return}let i=this._appState.videos.find(r=>r.id===t.id);i?this._pendingNewVideoId=null:(i=$s(e,t.id),this._appState.videos.push(i),this.videos=[...this._appState.videos],this._pendingNewVideoId=t.id),this._loadVideoObject(i,t.startTime)}_onLoadUrl(e){this._loadUrl(e.detail.url)}_onPickVideo(e){var i;const t=(i=this._appState)==null?void 0:i.videos.find(r=>r.id===e.detail.videoId);t&&(this._loadVideoObject(t,null,"Video: opened."),this.videos=[...this._appState.videos])}_onUpdateVideo(e){var a;const{id:t,name:i,start:r,end:o}=e.detail,n=(a=this._appState)==null?void 0:a.videos.find(l=>l.id===t);n&&(this.statusMsg="Video: edited.",this._pushUndoSnapshot(),n.name=i,n.start=r,n.end=o,this.videos=[...this._appState.videos],this._save())}_onDeleteVideo(e){var r;const{id:t}=e.detail,i=(r=this._appState)==null?void 0:r.videos.findIndex(o=>o.id===t);i==null||i===-1||(this.statusMsg="Video: deleted.",this._appState.stashes[t]=JSON.parse(JSON.stringify(this._appState.videos[i])),this._appState.videos.splice(i,1),this.currentVideoId===t&&this._clearCurrentVideoState(),this.stashes={...this._appState.stashes},this.videos=[...this._appState.videos],this._save())}_onRestoreVideo(e){var o;const{id:t}=e.detail,i=(o=this._appState.stashes)==null?void 0:o[t];if(!i)return;this.statusMsg="Video: unstashed.";const r=this._appState.videos.findIndex(n=>n.id===t);if(r!==-1){const n=JSON.parse(JSON.stringify(this._appState.videos[r]));this._appState.stashes[t]=n,this._appState.videos[r]=i,this.currentVideoId===t&&this._syncFromVideo(i)}else this._appState.videos.push(i),delete this._appState.stashes[t];this.stashes={...this._appState.stashes},this.videos=[...this._appState.videos],this._save()}_setWarning(e){this.warningMsg=e}_setError(e){this.errorMsg=e}_jumpTo(e){var t,i;this.zoomSource&&(e=Math.max(this.zoomSource.start,Math.min(this.zoomSource.end,e))),this._maybePushJump(((t=this._vc)==null?void 0:t.getCurrentTime())??0,e),(i=this._vc)==null||i.seekTo(e)}_jumpToExplicit(e){var t,i;this.zoomSource&&(e=Math.max(this.zoomSource.start,Math.min(this.zoomSource.end,e))),this.looping&&this.loopStart<this.loopEnd&&(e<this.loopStart||e>this.loopEnd)&&this._clearLoopingIfActive(),this._maybePushJump(((t=this._vc)==null?void 0:t.getCurrentTime())??0,e),(i=this._vc)==null||i.seekTo(e)}_seek(e){var i;let t=(((i=this._vc)==null?void 0:i.getCurrentTime())??0)+e;this.looping&&this.loopStart<this.loopEnd&&(t=Math.max(this.loopStart,Math.min(this.loopEnd,t))),this._jumpTo(t)}_onPlayPause(){var e,t,i;if(this.currentVideoId)if((e=this._vc)!=null&&e.isPlaying())this._vc.pause();else{if(this.zoomSource&&this.currentTime>=this.zoomSource.end){const r=this.looping&&this.loopStart<this.loopEnd?Math.max(this.zoomSource.start,this.loopStart):this.zoomSource.start;(t=this._vc)==null||t.seekTo(r)}(i=this._vc)==null||i.play()}}_onSeekForward(){this.currentVideoId&&this._seek(this.seekDelta)}_onSeekBack(){this.currentVideoId&&this._seek(-this.seekDelta)}_isLoopValid(){return this.loopStart<this.loopEnd}_autoDisableLoopIfInvalid(){this.looping&&!this._isLoopValid()&&(this.looping=!1)}_clearZoomIfOutside(e,t){this.zoomSource&&(e<this.zoomSource.start||t>this.zoomSource.end)&&(this.zoomSource=null)}_seekIntoZoomIfNeeded(){var t,i;if(!this.zoomSource)return;const e=((t=this._vc)==null?void 0:t.getCurrentTime())??this.currentTime;(e<this.zoomSource.start||e>this.zoomSource.end)&&((i=this._vc)==null||i.seekTo(this.zoomSource.start))}_seekIntoLoopIfNeeded(){var t;const e=(t=this._vc)==null?void 0:t.getCurrentTime();e!=null&&(e<this.loopStart||e>=this.loopEnd)&&this._vc.seekTo(this.loopStart)}_clearLoopingIfActive(){this.looping&&(this.looping=!1,this._saveCurrentState(),this.statusMsg="Looping off.")}_toggleLoop(){if(!this.looping&&!this._isLoopValid()){this._setWarning("Cannot activate scratch loop: invalid range.");return}this.looping=!this.looping,this.looping&&this._seekIntoLoopIfNeeded(),this.statusMsg=`Scratch loop: ${this.looping?"on":"off"}.`}_onToggleLoop(){this.currentVideoId&&this._toggleLoop()}_onSetLoopStartNow(){this.currentVideoId&&(this.loopStart=this.currentTime,this._autoDisableLoopIfInvalid())}_onSetLoopEndNow(){this.currentVideoId&&(this.loopEnd=this.currentTime,this._autoDisableLoopIfInvalid())}_onLoopStartChange(e){this.loopStart=e.detail.value,this._autoDisableLoopIfInvalid()}_onLoopEndChange(e){this.loopEnd=e.detail.value,this._autoDisableLoopIfInvalid()}_getEntityTimes(e){const t=new Set,i=r=>{r!=null&&isFinite(r)&&t.add(r)};return(e==="any"||e==="section")&&this.sections.forEach(r=>i(r.start)),(e==="any"||e==="loop")&&this.namedLoops.forEach(r=>i(r.start)),(e==="any"||e==="mark")&&this.marks.forEach(r=>i(r.time)),(e==="any"||e==="chapter")&&this.chapters.forEach(r=>i(r.start)),[...t].sort((r,o)=>r-o)}_navigateEntity(e,t=1){var a;const i=((a=this._vc)==null?void 0:a.getCurrentTime())??this.currentTime,r=this._getEntityTimes(this.activeEntityType);if(!r.length)return;const o=e==="prev"?2:.1;let n=null;if(e==="prev"){const l=r.filter(c=>c<i-o);l.length&&(n=l[Math.max(l.length-t,0)])}else{const l=r.filter(c=>c>i+o);l.length&&(n=l[Math.min(t-1,l.length-1)])}n!=null&&this._jumpToExplicit(n)}_onEntityTypeChange(e){this.activeEntityType=e.detail.value}_onDeleteSection(e){var t,i;this.statusMsg="Section: deleted.",this._pushUndoSnapshot(),ja(this.sections,e.detail.id),this.sections=[...this.sections],((t=this.loopSrc)==null?void 0:t.id)===e.detail.id&&(this.loopSrc=null),((i=this.zoomSource)==null?void 0:i.trigger)==="section"&&(this.zoomSource=null),this._saveCurrentState()}_onDeleteMark(e){var t;this.statusMsg="Mark: deleted.",this._pushUndoSnapshot(),Pa(this.marks,e.detail.id),this.marks=[...this.marks],((t=this.loopSrc)==null?void 0:t.id)===e.detail.id&&(this.loopSrc=null),this._saveCurrentState()}_onUpdateLoop(e){this.statusMsg="Loop: edited.",this._pushUndoSnapshot(),Ba(this.namedLoops,e.detail.id,{name:e.detail.name,start:e.detail.start,end:e.detail.end}),this.namedLoops=[...this.namedLoops],this._saveCurrentState()}_onActivateLoop(e){const t=this.namedLoops.find(i=>i.id===e.detail.id);t&&this._jumpToExplicit(t.start)}_onJumpLoop(e){this._jumpToExplicit(e.detail.start)}_onSeekTo(e){this._jumpToExplicit(e.detail.time)}_onDeleteLoop(e){var t;this.statusMsg="Loop: deleted.",this._pushUndoSnapshot(),Va(this.namedLoops,e.detail.id),this.namedLoops=[...this.namedLoops],((t=this.loopSrc)==null?void 0:t.id)===e.detail.id&&(this.loopSrc=null),this._saveCurrentState()}_openLoopsPicker(e){var t;if(!this.namedLoops.length){this._setWarning("No loops.");return}(t=this._loopPickerEl)==null||t.show(e)}_openMarksPicker(e){var t;if(!this.marks.length){this._setWarning("No marks.");return}(t=this._marksPickerEl)==null||t.show(e)}_onJumpMark(e){this._jumpToExplicit(e.detail.time)}_editCurrentMark(){var t;const e=Da(this.marks,this.currentTime);if(!e){this._setWarning("No current mark.");return}(t=this._editMarkModalEl)==null||t.show(e)}_onUpdateMark(e){const{id:t,name:i,time:r}=e.detail,o=this.marks.find(n=>n.id===t);o&&(this.statusMsg="Mark: edited.",this._pushUndoSnapshot(),o.name=i,o.time=r,this.marks=[...this.marks].sort((n,a)=>n.time-a.time),this._saveCurrentState())}_openSectionsPicker(e){var t;if(!this.sections.length){this._setWarning("No sections.");return}(t=this._sectionsPickerEl)==null||t.show(e)}_getDividerCtx(e){return e==="section"?{entities:this.sections,setEntities:t=>{this.sections=t},modalEl:this._editSectionModalEl,label:"Section",addFn:Ma,nearestFn:hs,getBoundsFn:Ua,fixEndFn:za}:{entities:this.chapters,setEntities:t=>{this.chapters=t},modalEl:this._editChapterModalEl,label:"Chapter",addFn:Wa,nearestFn:ti,getBoundsFn:qa,fixEndFn:Ha}}_scratchDivider(e){var f,u;const{entities:t,label:i,nearestFn:r,getBoundsFn:o}=this._getDividerCtx(e),n=o(t,this.currentTime,this.duration);if(!n||n.end==null){this._setWarning(`No current ${i.toLowerCase()}.`);return}const a=r(t,this.currentTime),l=((f=this._appState)==null?void 0:f.options.loop_pad_start)??M.loop_pad_start,c=((u=this._appState)==null?void 0:u.options.loop_pad_end)??M.loop_pad_end,h=Math.max(0,n.start-l),p=Math.min(this.duration??1/0,n.end+c);this._clearZoomIfOutside(h,p),this.loopStart=h,this.loopEnd=p,this.looping=!0,this.loopSrc={id:(a==null?void 0:a.id)??null,label:(a==null?void 0:a.name)||null,type:e,start:n.start,end:n.end},this.statusMsg=`${i}: scratched.`}_setDivider(e){var p;const{entities:t,setEntities:i,label:r,addFn:o,nearestFn:n}=this._getDividerCtx(e),a=r.toLowerCase(),l=((p=this._vc)==null?void 0:p.getCurrentTime())??0,c=n(t,l);if(c&&c.end!=null&&l<=c.end){this._setWarning(`Cannot create ${a}: inside a fixed ${a}.`);return}if(!o(t,l)){this._setWarning(`Cannot create ${a}: too close to an existing one.`);return}this.statusMsg=`${r}: created.`,this._pushUndoSnapshot(),i([...t]),this._saveCurrentState()}_fixDivider(e){const{entities:t,setEntities:i,label:r,nearestFn:o,fixEndFn:n}=this._getDividerCtx(e),a=r.toLowerCase(),l=o(t,this.currentTime);if(!l){this._setWarning(`No current ${a}.`);return}if(l.end!=null)this.statusMsg=`${r}: end unfixed.`,this._pushUndoSnapshot(),l.end=null;else{if(this.duration==null){this._setError(`Cannot fix ${a} end: video duration unknown.`);return}this.statusMsg=`${r}: end fixed.`,this._pushUndoSnapshot(),n(t,l.id,this.duration)}i([...t]),this._saveCurrentState()}_zoomDivider(e){var n;const{entities:t,label:i,getBoundsFn:r}=this._getDividerCtx(e);if(((n=this.zoomSource)==null?void 0:n.trigger)===e){this.zoomSource=null,this.statusMsg="Zoom: off.";return}const o=r(t,this.currentTime,this.duration);if(!o||o.end==null){this._setWarning(`No current ${i.toLowerCase()}.`);return}this.zoomSource={start:o.start,end:o.end,trigger:e},this.statusMsg=`${i}: zoomed.`,this._seekIntoZoomIfNeeded()}_editCurrentDivider(e){const{entities:t,label:i,nearestFn:r,getBoundsFn:o,modalEl:n}=this._getDividerCtx(e),a=r(t,this.currentTime);if(!a){this._setWarning(`No current ${i.toLowerCase()}.`);return}const l=o(t,a.start,this.duration),c=a.end==null?(l==null?void 0:l.end)??null:null,h=t.findIndex(f=>f.id===a.id),p=(f,u)=>Jr(t,h,f,u,this.duration);n==null||n.show(a,c,p)}_openChapterPicker(e){var t;if(!this.chapters.length){this._setWarning("No chapters.");return}(t=this._chapterPickerEl)==null||t.show(e)}_onJumpChapter(e){this._jumpToExplicit(e.detail.time)}_onUpdateChapter(e){const{id:t,name:i,start:r,end:o}=e.detail,n=this.chapters.findIndex(a=>a.id===t);n!==-1&&(this.statusMsg="Chapter: edited.",this._pushUndoSnapshot(),this.chapters[n].name=i,si(this.chapters,n,r,o),this.chapters=[...this.chapters],this._saveCurrentState())}_onDeleteChapter(e){var t,i;this.statusMsg="Chapter: deleted.",this._pushUndoSnapshot(),Fa(this.chapters,e.detail.id),this.chapters=[...this.chapters],((t=this.loopSrc)==null?void 0:t.id)===e.detail.id&&(this.loopSrc=null),((i=this.zoomSource)==null?void 0:i.trigger)==="chapter"&&(this.zoomSource=null),this._saveCurrentState()}_onJumpHistory(e){this._jumpToExplicit(e.detail.time)}_onFileImport(e){this._dataMgr.onFileImport(e)}_onDataOpResult(e){this._dataMgr.onDataOpResult(e)}_onShareConflictReplace(){this._dataMgr.onShareConflictReplace()}_onShareConflictSkip(){this._dataMgr.onShareConflictSkip()}_onLoadExamplesResult(e){var t;(t=this._loadExamplesResolve)==null||t.call(this,e.detail),this._loadExamplesResolve=null}_onJumpSection(e){this._jumpToExplicit(e.detail.start)}_onUpdateSection(e){const{id:t,name:i,start:r,end:o}=e.detail,n=this.sections.findIndex(a=>a.id===t);n!==-1&&(this.statusMsg="Section: edited.",this._pushUndoSnapshot(),this.sections[n].name=i,si(this.sections,n,r,o),this.sections=[...this.sections],this._saveCurrentState())}_onDeleteData(e){var i;const{mode:t}=e.detail;if(t==="videos"){const{videoIds:r}=e.detail;this.statusMsg="Data: deleted.";const o=new Set(r);for(const n of this._appState.videos)o.has(n.id)&&(this._appState.stashes[n.id]=JSON.parse(JSON.stringify(n)));this._appState.videos=this._appState.videos.filter(n=>!o.has(n.id)),o.has(this.currentVideoId)&&this._clearCurrentVideoState(),this.stashes={...this._appState.stashes},this.videos=[...this._appState.videos],this._save()}else{const{sections:r,loops:o,marks:n,chapters:a}=e.detail;this.statusMsg="Data: deleted.",this._pushUndoSnapshot(),this.sections=this.sections.filter(l=>!r.includes(l.id)),this.namedLoops=this.namedLoops.filter(l=>!o.includes(l.id)),this.marks=this.marks.filter(l=>!n.includes(l.id)),this.chapters=this.chapters.filter(l=>!a.includes(l.id)),((i=this.loopSrc)==null?void 0:i.type)==="loop"&&!this.namedLoops.find(l=>l.id===this.loopSrc.id)&&(this.loopSrc=null),this._saveCurrentState()}}_onMenuSelect(e){var i;const t=(i=this._handlers)==null?void 0:i[e.detail.action];t&&t()}_accountMenuItems(){const e=[];return this.currentUser?(e.push({label:this.currentUser.email,action:"",disabled:!0}),e.push({type:"divider"}),e.push({label:"Sign out",action:"signOut"}),e.push({label:"Sign out and remove cloud data",action:"signOutRemove"})):(e.push({label:"Sign in with Google",action:"signInGoogle"}),e.push({label:"Sign in with GitHub",action:"signInGitHub"})),e.push({type:"divider"}),e.push({label:"Why sign in?",action:"whySignIn"}),e.push({label:"Privacy policy",action:"privacyPolicy"}),e}_onAccountMenuSelect(e){const{action:t}=e.detail;t==="signInGoogle"&&Ld(),t==="signInGitHub"&&Pd(),t==="signOut"&&Cn(),t==="signOutRemove"&&this._dataMgr.signOutAndRemoveCloudData(),t==="whySignIn"&&window.open(`${Ss()}/loopllama/v2/help/#why-sign-in`,"_blank"),t==="privacyPolicy"&&window.open(`${Ss()}/loopllama/v2/help/#privacy-policy`,"_blank")}_nextQuip(){if(this._quipPos>=this._quipDeck.length){const e=this._quipDeck[this._quipDeck.length-1];this._quipDeck=Ko(e),this._quipPos=0}this._quip=oa[this._quipDeck[this._quipPos++]],this.requestUpdate()}_onQuipEnter(){this._quipDeck=Ko(),this._quipPos=0,this._nextQuip(),this._quipInterval=setInterval(()=>this._nextQuip(),dp)}_onQuipLeave(){clearInterval(this._quipInterval),this._quipInterval=null,this._quip="",this.requestUpdate()}_isLoopDirty(){var o,n;if(!this.loopSrc)return!1;const e=this.loopSrc.type!=="loop"?((o=this._appState)==null?void 0:o.options.loop_pad_start)??M.loop_pad_start:0,t=this.loopSrc.type!=="loop"?((n=this._appState)==null?void 0:n.options.loop_pad_end)??M.loop_pad_end:0,i=Math.max(0,this.loopSrc.start-e),r=Math.min(this.duration??1/0,this.loopSrc.end+t);return this.loopStart!==i||this.loopEnd!==r}render(){var n,a,l,c,h,p,f,u;const e=((n=this._appState)==null?void 0:n.videos.find(d=>d.id===this.currentVideoId))??null,t=ti(this.chapters,this.currentTime),i=hs(this.sections,this.currentTime),r=this._isLoopDirty(),o=(()=>{var y;if(!this.zoomSource)return null;const{trigger:d,start:v,end:b}=this.zoomSource;if(d==="loop"){const S=this.namedLoops.find(g=>g.start===v&&g.end===b);return S!=null&&S.name?`Loop: ${S.name}`:`Loop: ${z(v)} – ${z(b)}`}if(d==="scratch")return`Scratch loop: ${z(v)} – ${z(b)}`;if(d==="section"){const S=hs(this.sections,v);return S!=null&&S.name?`Section: ${S.name}`:`Section: ${z(v)}`}if(d==="chapter"){const S=this.chapters.find(g=>g.start===v);return S!=null&&S.name?`Chapter: ${S.name}`:`Chapter: ${z(v)}`}if(d==="video"){const S=(y=this._appState)==null?void 0:y.videos.find(g=>g.id===this.currentVideoId);return S!=null&&S.name?`Video: ${S.name}`:`Video: ${z(v)} – ${z(b)}`}return null})();return _`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <div class="header-llama-wrap">
          <img src="${"/loopllama/v2/"}llama-mascot.png" class="header-llama" alt=""
            @mouseenter=${this._onQuipEnter}
            @mouseleave=${this._onQuipLeave}
          >
          <span class="header-quip ${this._quip?"visible":""}">${this._quip}</span>
        </div>
        <nav class="header-nav">
          <img src="${"/loopllama/v2/"}flag.svg" class="header-flag" alt="">
          <span class="nav-sep">|</span>
          <llama-dropdown
            label="Help"
            .items=${rp}
            @ll-menu-select=${this._onMenuSelect}
          ></llama-dropdown>
          <span class="nav-sep">|</span>
          <llama-dropdown
            label="Account"
            .items=${this._accountMenuItems()}
            @ll-menu-select=${this._onAccountMenuSelect}
          ></llama-dropdown>
        </nav>
      </header>

      <div class="app-body">
        <div class="app-main">
          <div class="video-col">
            <div class="player-wrap">
              <div id="player-container"></div>
              ${this.currentVideoId?"":_`<div class="player-overlay"></div>`}
            </div>
            <llama-timeline
              .videoId=${this.currentVideoId}
              .currentTime=${this.currentTime}
              .duration=${this.duration}
              .sections=${this.sections}
              .chapters=${this.chapters}
              .zone2Mode=${this.zone2Mode}
              .marks=${this.marks}
              .namedLoops=${this.namedLoops}
              .loopStart=${this.loopStart}
              .loopEnd=${this.loopEnd}
              .zoomed=${!!this.zoomSource}
              .scopeStart=${((a=this.zoomSource)==null?void 0:a.start)??null}
              .scopeEnd=${((l=this.zoomSource)==null?void 0:l.end)??null}
              @ll-seek-to=${this._onSeekTo}
              @ll-activate-loop=${this._onActivateLoop}
            ></llama-timeline>
          </div>
        </div>
        <llama-controls
          .currentTime=${this.currentTime}
          .speed=${this.speed}
          .isPlaying=${this.isPlaying}
          .looping=${this.looping}
          .loopStart=${this.loopStart}
          .loopEnd=${this.loopEnd}
          .loopSrc=${this.loopSrc}
          .seekDelta=${this.seekDelta}
          .seekDeltaChoices=${((c=this._appState)==null?void 0:c.options.seek_delta_choices)??M.seek_delta_choices}
          .loopNudgeDelta=${this.loopNudgeDelta}
          .loopNudgeDeltaChoices=${((h=this._appState)==null?void 0:h.options.loop_nudge_delta_choices)??M.loop_nudge_delta_choices}
          .editScratchActive=${this.editScratchActive}
          .editScratchFocus=${this.editScratchFocus}
          .activeEntityType=${this.activeEntityType}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-to=${d=>this._jumpToExplicit(d.detail.value)}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
          @ll-seek-delta-change=${d=>{this.seekDelta=d.detail.value}}
          @ll-loop-nudge-delta-change=${d=>{this.loopNudgeDelta=d.detail.value}}
          @ll-toggle-loop=${this._onToggleLoop}
          @ll-set-loop-start-now=${this._onSetLoopStartNow}
          @ll-set-loop-end-now=${this._onSetLoopEndNow}
          @ll-loop-start-change=${this._onLoopStartChange}
          @ll-loop-end-change=${this._onLoopEndChange}
          @ll-speed-change=${d=>{var b;const v=Math.max(Ho,Math.min(Wo,d.detail.value));(b=this._vc)==null||b.setPlaybackRate(v),this.speed=v,this._saveCurrentState()}}
          @ll-prev-entity=${()=>this._navigateEntity("prev")}
          @ll-next-entity=${()=>this._navigateEntity("next")}
          @ll-entity-type-change=${this._onEntityTypeChange}
          @ll-invalid-time=${()=>this._setWarning("Invalid time.")}
          @ll-menu-select=${this._onMenuSelect}
          @ll-menu-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
          @ll-menu-close=${()=>{var d;this.editScratchActive||(d=this._kb)==null||d.enable()}}
        ></llama-controls>

        <llama-current
          .videoName=${(e==null?void 0:e.name)??""}
          .videoId=${(e==null?void 0:e.id)??null}
          .chapterName=${(t==null?void 0:t.name)??null}
          .sectionName=${(i==null?void 0:i.name)??null}
          .loopSrc=${this.loopSrc}
          .loopDirty=${r}
          .duration=${this.duration}
          .zoomLabel=${o}
          .zone2Mode=${this.zone2Mode}
        ></llama-current>
      </div>


      <llama-url-input-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-load-url=${this._onLoadUrl}
      ></llama-url-input-modal>

      <llama-video-picker
        .videos=${this.videos}
        .stashes=${this.stashes}
        .currentVideoId=${this.currentVideoId}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-pick-video=${this._onPickVideo}
        @ll-delete-video=${this._onDeleteVideo}
        @ll-restore-video=${this._onRestoreVideo}
      ></llama-video-picker>

      <llama-edit-video-modal
        .video=${e}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-video=${this._onUpdateVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-edit-video-modal>

      <llama-save-loop-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-loop=${this._onUpdateLoop}
      ></llama-save-loop-modal>

      <llama-loop-picker
        .namedLoops=${this.namedLoops}
        .loopSource=${((p=this.loopSrc)==null?void 0:p.id)??null}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-loop=${this._onJumpLoop}
        @ll-delete-loop=${this._onDeleteLoop}
      ></llama-loop-picker>

      <llama-marks-picker
        .marks=${this.marks}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-mark=${this._onJumpMark}
        @ll-delete-mark=${this._onDeleteMark}
      ></llama-marks-picker>

      <llama-edit-mark-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-mark=${this._onUpdateMark}
      ></llama-edit-mark-modal>

      <llama-sections-picker
        .sections=${this.sections}
        .activeSectionId=${((f=hs(this.sections,this.currentTime))==null?void 0:f.id)??null}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-section=${this._onJumpSection}
        @ll-delete-section=${this._onDeleteSection}
      ></llama-sections-picker>

      <llama-edit-section-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-section=${this._onUpdateSection}
      ></llama-edit-section-modal>

      <llama-chapter-picker
        .chapters=${this.chapters}
        .activeChapterId=${((u=ti(this.chapters,this.currentTime))==null?void 0:u.id)??null}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-chapter=${this._onJumpChapter}
        @ll-delete-chapter=${this._onDeleteChapter}
      ></llama-chapter-picker>

      <llama-edit-chapter-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-chapter=${this._onUpdateChapter}
      ></llama-edit-chapter-modal>

      <llama-video-info-modal
        .video=${e}
        .chapters=${this.chapters}
        .sections=${this.sections}
        .namedLoops=${this.namedLoops}
        .marks=${this.marks}
        .duration=${this.duration}
        .undoCount=${this._undoMgr.undoCount}
        .redoCount=${this._undoMgr.redoCount}
        .stash=${this.stashes[this.currentVideoId]??null}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-video-info-modal>

      <llama-jump-history-picker
        .jumps=${this.jumps}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-history=${this._onJumpHistory}
      ></llama-jump-history-picker>

      <input
        id="import-file-input"
        type="file"
        accept=".json"
        style="display:none"
        @change=${this._onFileImport}
      >

      <llama-options-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-options-saved=${this._onOptionsSaved}
      ></llama-options-modal>

      <llama-delete-data-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-delete-data=${this._onDeleteData}
      ></llama-delete-data-modal>

      <llama-inspect-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-inspect-modal>

      <llama-cloud-status-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-cloud-status-modal>

      <llama-shared-video-conflict-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-share-conflict-replace=${this._onShareConflictReplace}
        @ll-share-conflict-skip=${this._onShareConflictSkip}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-shared-video-conflict-modal>

      <llama-data-op-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-data-op-result=${this._onDataOpResult}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-data-op-modal>

      <llama-load-examples-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-load-examples-result=${this._onLoadExamplesResult}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-load-examples-modal>

      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .count=${this.wkCount}
        .windowFocused=${this.windowFocused}
        .editScratchActive=${this.editScratchActive}
        .warningMsg=${this.warningMsg}
        .errorMsg=${this.errorMsg}
        .statusMsg=${this.statusMsg}
      ></llama-whichkey>
    `}}C(cr,"styles",L`
    :host {
      display: block;
      font-family: var(--ll-font-sans, sans-serif);
      color: var(--ll-text, #e0e0e0);
      --ll-header-font: #a0a0e8;
    }

    /* --- Header --- */
    .app-header {
      display: flex;
      align-items: center;
      padding: var(--ll-pad, 0.5rem) var(--ll-pad-lg, 1rem);
      background: var(--ll-surface-raised, #2a2a2a);
      border-top: 3px solid var(--ll-accent, #7ec8e3);
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .header-llama {
      height: 1.8rem;
      width: auto;
      margin-left: 0.5rem;
      filter: invert(1);
      cursor: pointer;
    }

    .header-flag {
      height: 1.8rem;
      width: auto;
    }

    .app-title {
      font-size: var(--ll-text-xl, 1.4rem);
      font-weight: bold;
      color: var(--ll-header-font);
      white-space: nowrap;
    }

    .header-llama-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .header-quip {
      position: absolute;
      top: calc(100% + 0.3rem);
      left: 0;
      font-size: var(--ll-text-xs, 0.78rem);
      font-style: italic;
      color: var(--ll-text-dim, #aaa);
      width: max-content;
      max-width: 28rem;
      text-align: left;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      z-index: 20;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .header-quip.visible {
      opacity: 1;
    }

    .header-nav {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      font-size: var(--ll-text-base, 1.05rem);
    }

    .nav-link {
      color: var(--ll-header-font);
      text-decoration: none;
    }

    .nav-link:hover {
      color: var(--ll-accent, #7ec8e3);
    }

    .nav-sep {
      color: var(--ll-text-muted, #666);
    }

    .header-nav llama-dropdown::part(trigger) {
      padding: 0;
      background: none;
      border: none;
      color: var(--ll-header-font, #a0a0e8);
      font-size: inherit;
    }

    .header-nav llama-dropdown::part(trigger):hover {
      color: var(--ll-accent, #7ec8e3);
    }

    /* --- Body --- */
    .app-body {
      display: flex;
      flex-direction: column;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem);
    }

    /* --- Main row: video only (narrow) --- */
    .app-main {
      display: flex;
      gap: var(--ll-gap, 0.5rem);
    }

    .video-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--ll-gap, 0.5rem);
    }

    .player-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    #player-container {
      width: 100%;
      height: 100%;
      background: #000;
    }

    .player-overlay {
      position: absolute;
      inset: 0;
      background: #000;
      pointer-events: none;
    }

    /* --- Short viewport: cap video height so controls stay visible --- */
    @media (max-height: 920px) {
      .player-wrap {
        max-height: 63vh;
      }
    }

    /* --- Wide layout: cap video height to keep controls in view --- */
    @media (min-width: 768px) {
      .player-wrap {
        max-height: calc(100svh - 280px);
      }
    }

    /* --- Small screens: hide decorative header elements --- */
    @media (max-width: 480px) {
      .header-llama { display: none; }
      .header-flag  { display: none; }
      .header-nav > span:first-of-type { display: none; }
    }

    /* --- Wide layout: CSS grid puts current panel as right column --- */
    @media (min-width: 768px) {
      .app-body {
        display: grid;
        grid-template-areas:
          "main    current"
          "controls current";
        grid-template-columns: 1fr 220px;
        grid-template-rows: auto auto;
        gap: var(--ll-gap, 0.5rem);
      }

      .app-main      { grid-area: main; }
      llama-controls { grid-area: controls; }
      llama-current  { grid-area: current; }
    }

  `),C(cr,"properties",{currentTime:{type:Number},duration:{type:Number},speed:{type:Number},isPlaying:{type:Boolean},looping:{type:Boolean},loopStart:{type:Number},loopEnd:{type:Number},sections:{type:Array},marks:{type:Array},namedLoops:{type:Array},jumps:{type:Array},loopSrc:{type:Object},statusMsg:{type:String},wkPrefix:{type:String},wkCompletions:{type:Object},wkCount:{type:Number},windowFocused:{type:Boolean},currentUser:{type:Object},editScratchActive:{type:Boolean},editScratchFocus:{type:String},videos:{type:Array},stashes:{type:Object},currentVideoId:{type:String},activeEntityType:{type:String},chapters:{type:Array},zoomSource:{type:Object},warningMsg:{type:String},errorMsg:{type:String},loopNudgeDelta:{type:Number},seekDelta:{type:Number},zone2Mode:{type:String}});function Ko(s=null){const e=oa.map((t,i)=>i);for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return s!==null&&e[0]===s&&e.length>1&&([e[0],e[1]]=[e[1],e[0]]),e}function hp(s,e,t){if(!e||!t)return null;if(t==="loop"){const i=(s.loops??[]).find(r=>r.id===e);return i?{id:i.id,label:i.name||null,type:"loop",start:i.start,end:i.end}:null}if(t==="section"){const i=s.sections??[],r=i.findIndex(a=>a.id===e);if(r===-1)return null;const o=i[r],n=yi(i,r);return{id:o.id,label:o.name||null,type:"section",start:o.start,end:n}}if(t==="chapter"){const i=s.chapters??[],r=i.findIndex(a=>a.id===e);if(r===-1)return null;const o=i[r],n=yi(i,r);return{id:o.id,label:o.name||null,type:"chapter",start:o.start,end:n}}return null}function Ss(){return window.location.port==="5173"?"http://127.0.0.1:4000":window.location.origin}customElements.define("llama-app",cr);
