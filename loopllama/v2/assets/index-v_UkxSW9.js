var Gn=Object.defineProperty;var Yn=(s,e,t)=>e in s?Gn(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var C=(s,e,t)=>Yn(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $s=globalThis,lr=$s.ShadowRoot&&($s.ShadyCSS===void 0||$s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,cr=Symbol(),Ar=new WeakMap;let Go=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==cr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(lr&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ar.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ar.set(t,e))}return e}toString(){return this.cssText}};const Zn=s=>new Go(typeof s=="string"?s:s+"",void 0,cr),I=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new Go(t,s,cr)},Xn=(s,e)=>{if(lr)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=$s.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},Ir=lr?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Zn(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qn,defineProperty:ea,getOwnPropertyDescriptor:ta,getOwnPropertyNames:sa,getOwnPropertySymbols:ia,getPrototypeOf:ra}=Object,We=globalThis,Rr=We.trustedTypes,oa=Rr?Rr.emptyScript:"",Gs=We.reactiveElementPolyfillSupport,Kt=(s,e)=>s,xt={toAttribute(s,e){switch(e){case Boolean:s=s?oa:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},dr=(s,e)=>!Qn(s,e),Lr={attribute:!0,type:String,converter:xt,reflect:!1,useDefault:!1,hasChanged:dr};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),We.litPropertyMetadata??(We.litPropertyMetadata=new WeakMap);let gt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Lr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&ea(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=ta(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const a=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Lr}static _$Ei(){if(this.hasOwnProperty(Kt("elementProperties")))return;const e=ra(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Kt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Kt("properties"))){const t=this.properties,i=[...sa(t),...ia(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(Ir(r))}else e!==void 0&&t.push(Ir(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xn(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:xt).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=i.getPropertyOptions(r),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:xt;this._$Em=r;const c=l.fromAttribute(t,a.type);this[r]=c??((n=this._$Ej)==null?void 0:n.get(r))??c,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){var n;if(e!==void 0){const a=this.constructor;if(r===!1&&(o=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??dr)(o,t)||i.useDefault&&i.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:a}=n,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,n,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};gt.elementStyles=[],gt.shadowRootOptions={mode:"open"},gt[Kt("elementProperties")]=new Map,gt[Kt("finalized")]=new Map,Gs==null||Gs({ReactiveElement:gt}),(We.reactiveElementVersions??(We.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=globalThis,Or=s=>s,Ts=Jt.trustedTypes,Pr=Ts?Ts.createPolicy("lit-html",{createHTML:s=>s}):void 0,Yo="$lit$",Be=`lit$${Math.random().toFixed(9).slice(2)}$`,Zo="?"+Be,na=`<${Zo}>`,at=document,Xt=()=>at.createComment(""),Qt=s=>s===null||typeof s!="object"&&typeof s!="function",hr=Array.isArray,aa=s=>hr(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Ys=`[ 	
\f\r]`,Dt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dr=/-->/g,Nr=/>/g,Ze=RegExp(`>|${Ys}(?:([^\\s"'>=/]+)(${Ys}*=${Ys}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jr=/'/g,Mr=/"/g,Xo=/^(?:script|style|textarea|title)$/i,la=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),g=la(1),ge=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),Ur=new WeakMap,rt=at.createTreeWalker(at,129);function Qo(s,e){if(!hr(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pr!==void 0?Pr.createHTML(e):e}const ca=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=Dt;for(let a=0;a<t;a++){const l=s[a];let c,h,p=-1,d=0;for(;d<l.length&&(n.lastIndex=d,h=n.exec(l),h!==null);)d=n.lastIndex,n===Dt?h[1]==="!--"?n=Dr:h[1]!==void 0?n=Nr:h[2]!==void 0?(Xo.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=Ze):h[3]!==void 0&&(n=Ze):n===Ze?h[0]===">"?(n=r??Dt,p=-1):h[1]===void 0?p=-2:(p=n.lastIndex-h[2].length,c=h[1],n=h[3]===void 0?Ze:h[3]==='"'?Mr:jr):n===Mr||n===jr?n=Ze:n===Dr||n===Nr?n=Dt:(n=Ze,r=void 0);const u=n===Ze&&s[a+1].startsWith("/>")?" ":"";o+=n===Dt?l+na:p>=0?(i.push(c),l.slice(0,p)+Yo+l.slice(p)+Be+u):l+Be+(p===-2?a:u)}return[Qo(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class es{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[c,h]=ca(e,t);if(this.el=es.createElement(c,i),rt.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=rt.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Yo)){const d=h[n++],u=r.getAttribute(p).split(Be),f=/([.?@])?(.*)/.exec(d);l.push({type:1,index:o,name:f[2],strings:u,ctor:f[1]==="."?ha:f[1]==="?"?ua:f[1]==="@"?pa:js}),r.removeAttribute(p)}else p.startsWith(Be)&&(l.push({type:6,index:o}),r.removeAttribute(p));if(Xo.test(r.tagName)){const p=r.textContent.split(Be),d=p.length-1;if(d>0){r.textContent=Ts?Ts.emptyScript:"";for(let u=0;u<d;u++)r.append(p[u],Xt()),rt.nextNode(),l.push({type:2,index:++o});r.append(p[d],Xt())}}}else if(r.nodeType===8)if(r.data===Zo)l.push({type:2,index:o});else{let p=-1;for(;(p=r.data.indexOf(Be,p+1))!==-1;)l.push({type:7,index:o}),p+=Be.length-1}o++}}static createElement(e,t){const i=at.createElement("template");return i.innerHTML=e,i}}function Et(s,e,t=s,i){var n,a;if(e===ge)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=Qt(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=Et(s,r._$AS(s,e.values),r,i)),e}class da{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??at).importNode(t,!0);rt.currentNode=r;let o=rt.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new cs(o,o.nextSibling,this,e):l.type===1?c=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(c=new fa(o,this,e)),this._$AV.push(c),l=i[++a]}n!==(l==null?void 0:l.index)&&(o=rt.nextNode(),n++)}return rt.currentNode=at,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class cs{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Et(this,e,t),Qt(e)?e===z||e==null||e===""?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==ge&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):aa(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(at.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=es.createElement(Qo(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new da(r,this),a=n.u(this.options);n.p(t),this.T(a),this._$AH=n}}_$AC(e){let t=Ur.get(e.strings);return t===void 0&&Ur.set(e.strings,t=new es(e)),t}k(e){hr(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new cs(this.O(Xt()),this.O(Xt()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=Or(e).nextSibling;Or(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class js{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=Et(this,e,t,0),n=!Qt(e)||e!==this._$AH&&e!==ge,n&&(this._$AH=e);else{const a=e;let l,c;for(e=o[0],l=0;l<o.length-1;l++)c=Et(this,a[i+l],t,l),c===ge&&(c=this._$AH[l]),n||(n=!Qt(c)||c!==this._$AH[l]),c===z?e=z:e!==z&&(e+=(c??"")+o[l+1]),this._$AH[l]=c}n&&!r&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ha extends js{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}}class ua extends js{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}}class pa extends js{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=Et(this,e,t,0)??z)===ge)return;const i=this._$AH,r=e===z&&i!==z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==z&&(i===z||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class fa{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Et(this,e)}}const Zs=Jt.litHtmlPolyfillSupport;Zs==null||Zs(es,cs),(Jt.litHtmlVersions??(Jt.litHtmlVersions=[])).push("3.3.2");const ma=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new cs(e.insertBefore(Xt(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=globalThis;let D=class extends gt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ma(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ge}};var Jo;D._$litElement$=!0,D.finalized=!0,(Jo=nt.litElementHydrateSupport)==null||Jo.call(nt,{LitElement:D});const Xs=nt.litElementPolyfillSupport;Xs==null||Xs({LitElement:D});(nt.litElementVersions??(nt.litElementVersions=[])).push("4.2.2");function va({onReady:s,onStateChange:e}={}){let t=null,i=!1;function r(){return new Promise(S=>{var k;if((k=window.YT)!=null&&k.Player){S();return}window.onYouTubeIframeAPIReady=S;const w=document.createElement("script");w.src="https://www.youtube.com/iframe_api",document.head.appendChild(w)})}async function o(S){return await r(),new Promise(w=>{t=new YT.Player(S,{width:"100%",height:"100%",events:{onReady:()=>{s==null||s(),w()},onStateChange:k=>{!i&&(k.data===YT.PlayerState.PLAYING||k.data===YT.PlayerState.CUED)&&(i=!0),e==null||e(k.data)}}})})}function n(S,w=0){i=!1,t.loadVideoById({videoId:S,startSeconds:w})}function a(S,w=0){i=!1,t.cueVideoById({videoId:S,startSeconds:w})}function l(){t.playVideo()}function c(){t.pauseVideo()}function h(){t.stopVideo()}function p(S){t.seekTo(S,!0)}function d(){return t.getCurrentTime()??0}function u(){return i?t.getDuration():null}function f(){return(t==null?void 0:t.getPlayerState())===YT.PlayerState.PLAYING}function v(S){t.setPlaybackRate(S)}function _(){return t.getPlaybackRate()}function y(){var S;return((S=t==null?void 0:t.getVideoData())==null?void 0:S.title)??null}return{initialize:o,loadVideo:n,cueVideo:a,play:l,pause:c,stop:h,seekTo:p,getCurrentTime:d,getDuration:u,isPlaying:f,setPlaybackRate:v,getPlaybackRate:_,getVideoTitle:y}}const zr={" ":{handler:"playPause",desc:"Play/pause"},"-":{handler:"speedDown",desc:"Speed: slower"},"=":{handler:"speedUp",desc:"Speed: faster"},Backspace:{handler:"speedReset",desc:"Reset speed"},ArrowRight:{handler:"seekForward",desc:"Seek forward"},ArrowLeft:{handler:"seekBack",desc:"Seek backward"},ArrowDown:{handler:"seekDeltaDown",desc:"Seek delta: reduce"},ArrowUp:{handler:"seekDeltaUp",desc:"Seek delta: increase"},",":{handler:"prevEntity",desc:"Previous entity"},"/":{handler:"entityType",desc:"Entity type dropdown"},".":{handler:"nextEntity",desc:"Next entity"},Enter:{handler:"jumpToStart",desc:"Jump to start"},u:{handler:"undo",desc:"Undo"},U:{handler:"redo",desc:"Redo"},"?":{handler:"helpKeys",desc:"Key bindings help"},o:{handler:"options",desc:"Options"},y:{handler:"videoUrl",desc:"Switch to YouTube URL"},"\\":{handler:"editScratch",desc:"Edit scratch loop (synonym for le)"},"[":{completions:{"[":{handler:"setLoopStart",desc:"Set loop start to current time"},Backspace:{handler:"resetLoopStart",desc:"Reset loop start to 0"},"-":{handler:"nudgeStartDown",desc:"Nudge start: decrease"},"=":{handler:"nudgeStartUp",desc:"Nudge start: increase"},"]":{handler:"focusLoopNudgeDelta",desc:"Loop nudge delta dropdown"},"\\":{handler:"focusLoopStart",desc:"Loop start: edit"}}},"]":{completions:{"]":{handler:"setLoopEnd",desc:"Set loop end to current time"},Backspace:{handler:"resetLoopEnd",desc:"Reset loop end to duration"},"-":{handler:"nudgeEndDown",desc:"Nudge end: decrease"},"=":{handler:"nudgeEndUp",desc:"Nudge end: increase"},"[":{handler:"focusLoopNudgeDelta",desc:"Loop nudge delta dropdown"},"\\":{handler:"focusLoopEnd",desc:"Loop end: edit"}}},v:{completions:{u:{handler:"videoUrl",desc:"Switch to YouTube video via URL"},v:{handler:"videoPicker",desc:"Switch to video"},o:{handler:"videoPicker",desc:"Switch to video"},e:{handler:"editVideo",desc:"Edit video attributes"},i:{handler:"videoInfo",desc:"Video info"},d:{handler:"deleteVideo",desc:"Delete current video"},l:{handler:"loopVideo",desc:"Loop: full video as scratch loop"}}},j:{completions:{c:{handler:"jumpChapter",desc:"Jump to chapter"},j:{handler:"jumpTime",desc:"Jump by time"},s:{handler:"jumpSection",desc:"Jump to section"},l:{handler:"jumpLoop",desc:"Jump to loop"},m:{handler:"jumpMark",desc:"Jump to mark"},h:{handler:"jumpHistory",desc:"Jump history picker"},b:{handler:"jumpBack",desc:"Jump back in history"},f:{handler:"jumpForward",desc:"Jump forward in history"}}},l:{completions:{l:{handler:"toggleLoop",desc:"Toggle looping"},o:{handler:"openLoop",desc:"Open saved loop"},n:{handler:"saveLoop",desc:"Save new loop"},b:{handler:"saveBack",desc:"Save back to loop source"},"=":{handler:"resetLoopToSource",desc:"Reset loop to source"},Backspace:{handler:"unlinkLoopSource",desc:"Unlink loop source"},e:{handler:"editScratch",desc:"Edit scratch loop"},d:{handler:"deleteLoop",desc:"Delete a loop"},z:{handler:"zoomLoop",desc:"Toggle loop zoom"},s:{handler:"loopSection",desc:"Loop current section (synonym: sl)"},c:{handler:"loopChapter",desc:"Loop current chapter (synonym: cl)"},v:{handler:"loopVideo",desc:"Loop full video (synonym: vl)"}}},c:{completions:{c:{handler:"setChapter",desc:"Create chapter divider here"},o:{handler:"openChapter",desc:"Open chapter"},e:{handler:"editChapter",desc:"Edit current chapter"},l:{handler:"loopChapter",desc:"Loop: current chapter as scratch loop"},d:{handler:"deleteChapter",desc:"Delete a chapter"},z:{handler:"zoomChapter",desc:"Toggle chapter zoom"},f:{handler:"fixChapter",desc:"Fix chapter end to derived boundary"}}},s:{completions:{s:{handler:"setSection",desc:"Set section divider here"},e:{handler:"editSection",desc:"Edit current section"},o:{handler:"openSection",desc:"Open section"},l:{handler:"loopSection",desc:"Loop current section"},d:{handler:"deleteSection",desc:"Delete a section"},z:{handler:"zoomSection",desc:"Toggle section zoom"},f:{handler:"fixSection",desc:"Fix section end to derived boundary"}}},t:{completions:{t:{handler:"toggleZone2",desc:"Toggle zone 2: sections / chapters"}}},m:{completions:{m:{handler:"setMark",desc:"Set mark here"},e:{handler:"editMark",desc:"Edit a mark"},d:{handler:"deleteMark",desc:"Delete a mark"}}},h:{completions:{h:{handler:"helpGeneral",desc:"General help"},k:{handler:"helpKeys",desc:"Key bindings"}}},d:{completions:{d:{handler:"deleteData",desc:"Delete data modal"},e:{handler:"exportAll",desc:"Export data as JSON"},i:{handler:"importData",desc:"Import data from JSON"},I:{handler:"inspectData",desc:"Inspect data as JSON"},v:{handler:"shareVideo",desc:"Share video as JSON"},l:{handler:"shareLoop",desc:"Share loop via URL"}}}};function ga(s,{onPendingKey:e,onCountChange:t}={}){let i=!0,r=null,o="",n=null;function a(){r=null,clearTimeout(n),n=null,e==null||e(null,null)}function l(){o="",t==null||t(null)}function c(f,v){const _=s[f];_?_(v):console.log(`[kb] no handler: ${f}`)}function h(f){var w;if(!i)return;const v=f.composedPath()[0],_=v==null?void 0:v.tagName;if(_==="INPUT"||_==="TEXTAREA"||_==="SELECT"||v!=null&&v.isContentEditable||f.ctrlKey||f.altKey||f.metaKey)return;const y=f.key;if(r!==null){if(y==="Shift"||y==="Control"||y==="Alt"||y==="Meta")return;f.preventDefault();const k=(w=zr[r])==null?void 0:w.completions,R=k==null?void 0:k[y],T=o?parseInt(o,10):1;a(),l(),y!=="Escape"&&R&&c(R.handler,T);return}if(y==="Escape"){o&&(f.preventDefault(),l());return}if(/^\d$/.test(y)&&(y!=="0"||o!=="")){f.preventDefault(),o+=y,t==null||t(parseInt(o,10));return}const S=zr[y];if(S)if(f.preventDefault(),S.completions)r=y,n=setTimeout(()=>{e==null||e(y,S.completions)},300);else{const k=o?parseInt(o,10):1;l(),c(S.handler,k)}}document.addEventListener("keydown",h);function p(){i=!0}function d(){i=!1,a(),l()}function u(){document.removeEventListener("keydown",h),a(),l()}return{enable:p,disable:d,destroy:u}}const ba=2,At=5,_a=40,ya=15;function ds(){return Math.random().toString(36).slice(2,9)}const P={seek_delta_default:5,seek_delta_choices:[.1,1,5,10,30,60,300,1800],loop_nudge_delta_default:5,loop_nudge_delta_choices:[.1,1,5,10,30,60,300,1800],speed_delta:.05,loop_pad_start:2,loop_pad_end:2};function wa(){return{schema_version:At,options:{...P},videos:[],currentVideoId:null}}function fs(s,e){return{id:e,url:s,duration:null,time:0,start:0,end:null,name:"",looping:!1,speed:1,seek_delta:P.seek_delta_default,speed_delta:P.speed_delta,chapters:[],sections:[],loops:[yi()],marks:[],jumps:[],schema_version:At}}function en(s,e,t){return{id:ds(),name:s,start:e,end:t}}function Sa(s,e=""){return{id:ds(),start:s,end:null,name:e}}function ka(s,e,t=""){return{id:ds(),name:t,start:s,end:e,source:null,is_scratch:!1}}function yi(){return{id:ds(),name:"",start:0,end:0,source:null,is_scratch:!0}}function $a(s,e=""){return{id:ds(),time:s,name:e}}function xa(s,e,t,i){const r=en(e,t,i);return s.push(r),s.sort((o,n)=>o.start-n.start),r}function Ea(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function Vr(s,e,t=""){const i=Math.round(e);if(s.some(o=>Math.round(o.time)===i))return null;const r=$a(e,t);return s.push(r),s.sort((o,n)=>o.time-n.time),r}function Ca(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function Br(s,e,t=""){const i=Ie(s,e);if(i&&i.end!=null&&e<=i.end||s.some(o=>Math.abs(o.start-e)<2))return null;const r=Sa(e,t);return s.push(r),s.sort((o,n)=>o.start-n.start),r}function Ta(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function Ie(s,e){let t=null;for(const i of s)if(i.start<=e)t=i;else break;return t}function Fr(s,e,t,i=""){const r=ka(e,t,i);return s.push(r),s.sort((o,n)=>o.start-n.start),r}function Aa(s,e){const t=s.findIndex(i=>i.id===e);t!==-1&&s.splice(t,1)}function qr(s,{loopStart:e,loopEnd:t,duration:i}){const r=i??1/0,o=Math.max(0,Math.min(e+s,r));if(o<t)return o;const n=Math.max(0,Math.min(t+s,r));return n<t?n:o}function Wr(s,{loopStart:e,loopEnd:t,duration:i}){const r=i??1/0,o=Math.max(0,Math.min(t+s,r));if(e<o)return o;const n=Math.max(0,Math.min(e+s,r));return e<n?n:o}function Nt(s,e,t){if(!s.length)return null;let i=null,r=null;for(const a of s)if(a.start<=e)i=a;else{r=a;break}if(!i)return null;const o=r?r.start:t??null,n=i.end!=null?i.end:o;return i.end!=null&&e>i.end?null:{start:i.start,end:n}}function qt(s,e){let t=null;for(const i of s)if(i.start<=e)t=i;else break;return t}function Qs(s,e,t){if(!s.length)return null;let i=null,r=null;for(const a of s)if(a.start<=e)i=a;else{r=a;break}if(!i)return null;const o=r?r.start:t??null,n=i.end!=null?i.end:o;return i.end!=null&&e>i.end?null:{start:i.start,end:n}}function Ia(s,e,t){const i=s.findIndex(o=>o.id===e);if(i===-1)return!1;const r=s[i+1];return s[i].end=r?r.start:t??null,!0}function Ra(s,e,t){const i=s.findIndex(o=>o.id===e);if(i===-1)return!1;const r=s[i+1];return s[i].end=r?r.start:t??null,!0}function ei(s,e,t,i,r){var l;const o=s[e],n=s[e-1],a=s[e+1];if(t!==o.start&&n&&t<=n.start)return!1;if(i!=null&&i!==o.end&&a){const c=a.end!=null?a.end:((l=s[e+2])==null?void 0:l.start)??r??null;if(c!=null&&i>=c)return!1}return!0}function ti(s,e,t,i){const r=s[e],o=s[e-1],n=s[e+1];t!==r.start&&(o&&o.end!=null&&t<o.end&&(o.end=t),r.start=t,s.sort((a,l)=>a.start-l.start)),i!==r.end&&(i!=null&&n&&i>n.start&&(n.start=i,s.sort((a,l)=>a.start-l.start)),r.end=i)}function La(s,e,t=""){const i=qt(s,e);if(i&&i.end!=null&&e<=i.end||s.some(o=>Math.abs(o.start-e)<2))return null;const r=en(t,e,null);return s.push(r),s.sort((o,n)=>o.start-n.start),r}const Oa=5,tn="loopllama-v2";function sn(s){return("version"in s||!s.schema_version)&&((s.version??1)<2&&(s.title&&(s.name=s.title),delete s.title),s.schema_version=At,delete s.version),s}function Pa(s){if("version"in s){if(s.version||(s.version=1),s.version<2){for(const e of s.videos??[])(e.version??1)<2&&(e.title&&(e.name=e.title),delete e.title,e.version=2);s.version=2}if(s.version<3){const e=s.options??{};"section_loop_pad_start"in e&&(e.loop_pad_start=e.section_loop_pad_start,delete e.section_loop_pad_start),"section_loop_pad_end"in e&&(e.loop_pad_end=e.section_loop_pad_end,delete e.section_loop_pad_end),s.version=3}if(s.version<4){for(const e of s.videos??[]){for(const t of e.sections??[])"time"in t&&(t.start=t.time,delete t.time),delete t.chapterId;for(const t of e.marks??[])delete t.chapterId;for(const t of e.loops??[])delete t.chapterId}s.version=4}for(const e of s.videos??[])sn(e);s.schema_version=At,delete s.version}return s}function Da(){const s=localStorage.getItem(tn);if(!s)return null;try{const e=JSON.parse(s),t=e.schema_version??e.version;return Pa(e),e.schema_version!==t&&(console.log(`LoopLlama: migrated stored data from schema v${t} to v${e.schema_version}`),ee(e)),e}catch(e){return console.error("LoopLlama: failed to parse stored data",e),null}}function ee(s){localStorage.setItem(tn,JSON.stringify(s))}function Hr(s){const{schema_version:e,videos:t,...i}=s;return JSON.stringify({app_version:ba,build_num:Oa,schema_version:e,...i,videos:t},null,2)}function Na(s,e){const t=JSON.parse(s);let i;if(Array.isArray(t.videos))i=t.videos;else if(t.id&&typeof t.id=="string")i=[t];else throw new Error("Unrecognized format: expected a LoopLlama export.");i=i.map(sn);let r=0,o=0;for(const n of i){if(!n.id)continue;const a=e.videos.findIndex(l=>l.id===n.id);a===-1?(e.videos.push(n),r++):(e.videos[a]=n,o++)}return{added:r,updated:o}}function Ms(s,e){var t={};for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&e.indexOf(i)<0&&(t[i]=s[i]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(s);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(s,i[r])&&(t[i[r]]=s[i[r]]);return t}function ja(s,e,t,i){function r(o){return o instanceof t?o:new t(function(n){n(o)})}return new(t||(t=Promise))(function(o,n){function a(h){try{c(i.next(h))}catch(p){n(p)}}function l(h){try{c(i.throw(h))}catch(p){n(p)}}function c(h){h.done?o(h.value):r(h.value).then(a,l)}c((i=i.apply(s,e||[])).next())})}const Ma=s=>s?(...e)=>s(...e):(...e)=>fetch(...e);class ur extends Error{constructor(e,t="FunctionsError",i){super(e),this.name=t,this.context=i}}class Ua extends ur{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Kr extends ur{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Jr extends ur{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var wi;(function(s){s.Any="any",s.ApNortheast1="ap-northeast-1",s.ApNortheast2="ap-northeast-2",s.ApSouth1="ap-south-1",s.ApSoutheast1="ap-southeast-1",s.ApSoutheast2="ap-southeast-2",s.CaCentral1="ca-central-1",s.EuCentral1="eu-central-1",s.EuWest1="eu-west-1",s.EuWest2="eu-west-2",s.EuWest3="eu-west-3",s.SaEast1="sa-east-1",s.UsEast1="us-east-1",s.UsWest1="us-west-1",s.UsWest2="us-west-2"})(wi||(wi={}));class za{constructor(e,{headers:t={},customFetch:i,region:r=wi.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=Ma(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return ja(this,arguments,void 0,function*(t,i={}){var r;let o,n;try{const{headers:a,method:l,body:c,signal:h,timeout:p}=i;let d={},{region:u}=i;u||(u=this.region);const f=new URL(`${this.url}/${t}`);u&&u!=="any"&&(d["x-region"]=u,f.searchParams.set("forceFunctionRegion",u));let v;c&&(a&&!Object.prototype.hasOwnProperty.call(a,"Content-Type")||!a)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(d["Content-Type"]="application/octet-stream",v=c):typeof c=="string"?(d["Content-Type"]="text/plain",v=c):typeof FormData<"u"&&c instanceof FormData?v=c:(d["Content-Type"]="application/json",v=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?v=JSON.stringify(c):v=c;let _=h;p&&(n=new AbortController,o=setTimeout(()=>n.abort(),p),h?(_=n.signal,h.addEventListener("abort",()=>n.abort())):_=n.signal);const y=yield this.fetch(f.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},d),this.headers),a),body:v,signal:_}).catch(R=>{throw new Ua(R)}),S=y.headers.get("x-relay-error");if(S&&S==="true")throw new Kr(y);if(!y.ok)throw new Jr(y);let w=((r=y.headers.get("Content-Type"))!==null&&r!==void 0?r:"text/plain").split(";")[0].trim(),k;return w==="application/json"?k=yield y.json():w==="application/octet-stream"||w==="application/pdf"?k=yield y.blob():w==="text/event-stream"?k=y:w==="multipart/form-data"?k=yield y.formData():k=yield y.text(),{data:k,error:null,response:y}}catch(a){return{data:null,error:a,response:a instanceof Jr||a instanceof Kr?a.context:void 0}}finally{o&&clearTimeout(o)}})}}var Va=class extends Error{constructor(s){super(s.message),this.name="PostgrestError",this.details=s.details,this.hint=s.hint,this.code=s.code}},Ba=class{constructor(s){var e,t,i;this.shouldThrowOnError=!1,this.method=s.method,this.url=s.url,this.headers=new Headers(s.headers),this.schema=s.schema,this.body=s.body,this.shouldThrowOnError=(e=s.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=s.signal,this.isMaybeSingle=(t=s.isMaybeSingle)!==null&&t!==void 0?t:!1,this.urlLengthLimit=(i=s.urlLengthLimit)!==null&&i!==void 0?i:8e3,s.fetch?this.fetch=s.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(s,e){return this.headers=new Headers(this.headers),this.headers.set(s,e),this}then(s,e){var t=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const i=this.fetch;let r=i(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async o=>{let n=null,a=null,l=null,c=o.status,h=o.statusText;if(o.ok){var p,d;if(t.method!=="HEAD"){var u;const y=await o.text();y===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((u=t.headers.get("Accept"))===null||u===void 0)&&u.includes("application/vnd.pgrst.plan+text"))?a=y:a=JSON.parse(y))}const v=(p=t.headers.get("Prefer"))===null||p===void 0?void 0:p.match(/count=(exact|planned|estimated)/),_=(d=o.headers.get("content-range"))===null||d===void 0?void 0:d.split("/");v&&_&&_.length>1&&(l=parseInt(_[1])),t.isMaybeSingle&&t.method==="GET"&&Array.isArray(a)&&(a.length>1?(n={code:"PGRST116",details:`Results contain ${a.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},a=null,l=null,c=406,h="Not Acceptable"):a.length===1?a=a[0]:a=null)}else{var f;const v=await o.text();try{n=JSON.parse(v),Array.isArray(n)&&o.status===404&&(a=[],n=null,c=200,h="OK")}catch{o.status===404&&v===""?(c=204,h="No Content"):n={message:v}}if(n&&t.isMaybeSingle&&(!(n==null||(f=n.details)===null||f===void 0)&&f.includes("0 rows"))&&(n=null,c=200,h="OK"),n&&t.shouldThrowOnError)throw new Va(n)}return{error:n,data:a,count:l,status:c,statusText:h}});return this.shouldThrowOnError||(r=r.catch(o=>{var n;let a="",l="",c="";const h=o==null?void 0:o.cause;if(h){var p,d,u,f;const y=(p=h==null?void 0:h.message)!==null&&p!==void 0?p:"",S=(d=h==null?void 0:h.code)!==null&&d!==void 0?d:"";a=`${(u=o==null?void 0:o.name)!==null&&u!==void 0?u:"FetchError"}: ${o==null?void 0:o.message}`,a+=`

Caused by: ${(f=h==null?void 0:h.name)!==null&&f!==void 0?f:"Error"}: ${y}`,S&&(a+=` (${S})`),h!=null&&h.stack&&(a+=`
${h.stack}`)}else{var v;a=(v=o==null?void 0:o.stack)!==null&&v!==void 0?v:""}const _=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(c="",l="Request was aborted (timeout or manual cancellation)",_>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${_} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((h==null?void 0:h.name)==="HeadersOverflowError"||(h==null?void 0:h.code)==="UND_ERR_HEADERS_OVERFLOW")&&(c="",l="HTTP headers exceeded server limits (typically 16KB)",_>this.urlLengthLimit&&(l+=`. Your request URL is ${_} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(n=o==null?void 0:o.name)!==null&&n!==void 0?n:"FetchError"}: ${o==null?void 0:o.message}`,details:a,hint:l,code:c},data:null,count:null,status:0,statusText:""}})),r.then(s,e)}returns(){return this}overrideTypes(){return this}},Fa=class extends Ba{select(s){let e=!1;const t=(s??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(s,{ascending:e=!0,nullsFirst:t,foreignTable:i,referencedTable:r=i}={}){const o=r?`${r}.order`:"order",n=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${n?`${n},`:""}${s}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(s,{foreignTable:e,referencedTable:t=e}={}){const i=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(i,`${s}`),this}range(s,e,{foreignTable:t,referencedTable:i=t}={}){const r=typeof i>"u"?"offset":`${i}.offset`,o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${s}`),this.url.searchParams.set(o,`${e-s+1}`),this}abortSignal(s){return this.signal=s,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:s=!1,verbose:e=!1,settings:t=!1,buffers:i=!1,wal:r=!1,format:o="text"}={}){var n;const a=[s?"analyze":null,e?"verbose":null,t?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(n=this.headers.get("Accept"))!==null&&n!==void 0?n:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${o}; for="${l}"; options=${a};`),o==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(s){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${s}`),this}};const Gr=new RegExp("[,()]");var bt=class extends Fa{eq(s,e){return this.url.searchParams.append(s,`eq.${e}`),this}neq(s,e){return this.url.searchParams.append(s,`neq.${e}`),this}gt(s,e){return this.url.searchParams.append(s,`gt.${e}`),this}gte(s,e){return this.url.searchParams.append(s,`gte.${e}`),this}lt(s,e){return this.url.searchParams.append(s,`lt.${e}`),this}lte(s,e){return this.url.searchParams.append(s,`lte.${e}`),this}like(s,e){return this.url.searchParams.append(s,`like.${e}`),this}likeAllOf(s,e){return this.url.searchParams.append(s,`like(all).{${e.join(",")}}`),this}likeAnyOf(s,e){return this.url.searchParams.append(s,`like(any).{${e.join(",")}}`),this}ilike(s,e){return this.url.searchParams.append(s,`ilike.${e}`),this}ilikeAllOf(s,e){return this.url.searchParams.append(s,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(s,e){return this.url.searchParams.append(s,`ilike(any).{${e.join(",")}}`),this}regexMatch(s,e){return this.url.searchParams.append(s,`match.${e}`),this}regexIMatch(s,e){return this.url.searchParams.append(s,`imatch.${e}`),this}is(s,e){return this.url.searchParams.append(s,`is.${e}`),this}isDistinct(s,e){return this.url.searchParams.append(s,`isdistinct.${e}`),this}in(s,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Gr.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(s,`in.(${t})`),this}notIn(s,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Gr.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(s,`not.in.(${t})`),this}contains(s,e){return typeof e=="string"?this.url.searchParams.append(s,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(s,`cs.{${e.join(",")}}`):this.url.searchParams.append(s,`cs.${JSON.stringify(e)}`),this}containedBy(s,e){return typeof e=="string"?this.url.searchParams.append(s,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(s,`cd.{${e.join(",")}}`):this.url.searchParams.append(s,`cd.${JSON.stringify(e)}`),this}rangeGt(s,e){return this.url.searchParams.append(s,`sr.${e}`),this}rangeGte(s,e){return this.url.searchParams.append(s,`nxl.${e}`),this}rangeLt(s,e){return this.url.searchParams.append(s,`sl.${e}`),this}rangeLte(s,e){return this.url.searchParams.append(s,`nxr.${e}`),this}rangeAdjacent(s,e){return this.url.searchParams.append(s,`adj.${e}`),this}overlaps(s,e){return typeof e=="string"?this.url.searchParams.append(s,`ov.${e}`):this.url.searchParams.append(s,`ov.{${e.join(",")}}`),this}textSearch(s,e,{config:t,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const o=t===void 0?"":`(${t})`;return this.url.searchParams.append(s,`${r}fts${o}.${e}`),this}match(s){return Object.entries(s).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(s,e,t){return this.url.searchParams.append(s,`not.${e}.${t}`),this}or(s,{foreignTable:e,referencedTable:t=e}={}){const i=t?`${t}.or`:"or";return this.url.searchParams.append(i,`(${s})`),this}filter(s,e,t){return this.url.searchParams.append(s,`${e}.${t}`),this}},qa=class{constructor(s,{headers:e={},schema:t,fetch:i,urlLengthLimit:r=8e3}){this.url=s,this.headers=new Headers(e),this.schema=t,this.fetch=i,this.urlLengthLimit=r}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(s,e){const{head:t=!1,count:i}=e??{},r=t?"HEAD":"GET";let o=!1;const n=(s??"*").split("").map(c=>/\s/.test(c)&&!o?"":(c==='"'&&(o=!o),c)).join(""),{url:a,headers:l}=this.cloneRequestState();return a.searchParams.set("select",n),i&&l.append("Prefer",`count=${i}`),new bt({method:r,url:a,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(s,{count:e,defaultToNull:t=!0}={}){var i;const r="POST",{url:o,headers:n}=this.cloneRequestState();if(e&&n.append("Prefer",`count=${e}`),t||n.append("Prefer","missing=default"),Array.isArray(s)){const a=s.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(a.length>0){const l=[...new Set(a)].map(c=>`"${c}"`);o.searchParams.set("columns",l.join(","))}}return new bt({method:r,url:o,headers:n,schema:this.schema,body:s,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(s,{onConflict:e,ignoreDuplicates:t=!1,count:i,defaultToNull:r=!0}={}){var o;const n="POST",{url:a,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&a.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),r||l.append("Prefer","missing=default"),Array.isArray(s)){const c=s.reduce((h,p)=>h.concat(Object.keys(p)),[]);if(c.length>0){const h=[...new Set(c)].map(p=>`"${p}"`);a.searchParams.set("columns",h.join(","))}}return new bt({method:n,url:a,headers:l,schema:this.schema,body:s,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit})}update(s,{count:e}={}){var t;const i="PATCH",{url:r,headers:o}=this.cloneRequestState();return e&&o.append("Prefer",`count=${e}`),new bt({method:i,url:r,headers:o,schema:this.schema,body:s,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:s}={}){var e;const t="DELETE",{url:i,headers:r}=this.cloneRequestState();return s&&r.append("Prefer",`count=${s}`),new bt({method:t,url:i,headers:r,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit})}};function ts(s){"@babel/helpers - typeof";return ts=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ts(s)}function Wa(s,e){if(ts(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(ts(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function Ha(s){var e=Wa(s,"string");return ts(e)=="symbol"?e:e+""}function Ka(s,e,t){return(e=Ha(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function Yr(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function ms(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Yr(Object(t),!0).forEach(function(i){Ka(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):Yr(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}var Ja=class rn{constructor(e,{headers:t={},schema:i,fetch:r,timeout:o,urlLengthLimit:n=8e3}={}){this.url=e,this.headers=new Headers(t),this.schemaName=i,this.urlLengthLimit=n;const a=r??globalThis.fetch;o!==void 0&&o>0?this.fetch=(l,c)=>{const h=new AbortController,p=setTimeout(()=>h.abort(),o),d=c==null?void 0:c.signal;if(d){if(d.aborted)return clearTimeout(p),a(l,c);const u=()=>{clearTimeout(p),h.abort()};return d.addEventListener("abort",u,{once:!0}),a(l,ms(ms({},c),{},{signal:h.signal})).finally(()=>{clearTimeout(p),d.removeEventListener("abort",u)})}return a(l,ms(ms({},c),{},{signal:h.signal})).finally(()=>clearTimeout(p))}:this.fetch=a}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new qa(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(e){return new rn(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(e,t={},{head:i=!1,get:r=!1,count:o}={}){var n;let a;const l=new URL(`${this.url}/rpc/${e}`);let c;const h=u=>u!==null&&typeof u=="object"&&(!Array.isArray(u)||u.some(h)),p=i&&Object.values(t).some(h);p?(a="POST",c=t):i||r?(a=i?"HEAD":"GET",Object.entries(t).filter(([u,f])=>f!==void 0).map(([u,f])=>[u,Array.isArray(f)?`{${f.join(",")}}`:`${f}`]).forEach(([u,f])=>{l.searchParams.append(u,f)})):(a="POST",c=t);const d=new Headers(this.headers);return p?d.set("Prefer",o?`count=${o},return=minimal`:"return=minimal"):o&&d.set("Prefer",`count=${o}`),new bt({method:a,url:l,headers:d,schema:this.schemaName,body:c,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit})}};class Ga{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const t=globalThis.process;if(t){const i=t.versions;if(i&&i.node){const r=i.node,o=parseInt(r.replace(/^v/,"").split(".")[0]);return o>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${o} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${o} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const i=this.getWebSocketConstructor();return new i(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Ya="2.99.1",Za=`realtime-js/${Ya}`,Xa="1.0.0",on="2.0.0",Zr=on,Si=1e4,Qa=1e3,el=100;var ze;(function(s){s[s.connecting=0]="connecting",s[s.open=1]="open",s[s.closing=2]="closing",s[s.closed=3]="closed"})(ze||(ze={}));var F;(function(s){s.closed="closed",s.errored="errored",s.joined="joined",s.joining="joining",s.leaving="leaving"})(F||(F={}));var ve;(function(s){s.close="phx_close",s.error="phx_error",s.join="phx_join",s.reply="phx_reply",s.leave="phx_leave",s.access_token="access_token"})(ve||(ve={}));var ki;(function(s){s.websocket="websocket"})(ki||(ki={}));var tt;(function(s){s.Connecting="connecting",s.Open="open",s.Closing="closing",s.Closed="closed"})(tt||(tt={}));class tl{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,i;const r=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,r)}_encodeJsonUserBroadcastPush(e){var t,i;const r=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:{},n=new TextEncoder().encode(JSON.stringify(r)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,i){var r,o;const n=e.topic,a=(r=e.ref)!==null&&r!==void 0?r:"",l=(o=e.join_ref)!==null&&o!==void 0?o:"",c=e.payload.event,h=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},p=Object.keys(h).length===0?"":JSON.stringify(h);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`ref length ${a.length} exceeds maximum of 255`);if(n.length>255)throw new Error(`topic length ${n.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(p.length>255)throw new Error(`metadata length ${p.length} exceeds maximum of 255`);const d=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+a.length+n.length+c.length+p.length,u=new ArrayBuffer(this.HEADER_LENGTH+d);let f=new DataView(u),v=0;f.setUint8(v++,this.KINDS.userBroadcastPush),f.setUint8(v++,l.length),f.setUint8(v++,a.length),f.setUint8(v++,n.length),f.setUint8(v++,c.length),f.setUint8(v++,p.length),f.setUint8(v++,t),Array.from(l,y=>f.setUint8(v++,y.charCodeAt(0))),Array.from(a,y=>f.setUint8(v++,y.charCodeAt(0))),Array.from(n,y=>f.setUint8(v++,y.charCodeAt(0))),Array.from(c,y=>f.setUint8(v++,y.charCodeAt(0))),Array.from(p,y=>f.setUint8(v++,y.charCodeAt(0)));var _=new Uint8Array(u.byteLength+i.byteLength);return _.set(new Uint8Array(u),0),_.set(new Uint8Array(i),u.byteLength),_.buffer}decode(e,t){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return t(i)}if(typeof e=="string"){const i=JSON.parse(e),[r,o,n,a,l]=i;return t({join_ref:r,ref:o,topic:n,event:a,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),i=t.getUint8(0),r=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,i){const r=t.getUint8(1),o=t.getUint8(2),n=t.getUint8(3),a=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+r));l=l+r;const h=i.decode(e.slice(l,l+o));l=l+o;const p=i.decode(e.slice(l,l+n));l=l+n;const d=e.slice(l,e.byteLength),u=a===this.JSON_ENCODING?JSON.parse(i.decode(d)):d,f={type:this.BROADCAST_EVENT,event:h,payload:u};return n>0&&(f.meta=JSON.parse(p)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:f}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>t.includes(i)))}}class nn{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var M;(function(s){s.abstime="abstime",s.bool="bool",s.date="date",s.daterange="daterange",s.float4="float4",s.float8="float8",s.int2="int2",s.int4="int4",s.int4range="int4range",s.int8="int8",s.int8range="int8range",s.json="json",s.jsonb="jsonb",s.money="money",s.numeric="numeric",s.oid="oid",s.reltime="reltime",s.text="text",s.time="time",s.timestamp="timestamp",s.timestamptz="timestamptz",s.timetz="timetz",s.tsrange="tsrange",s.tstzrange="tstzrange"})(M||(M={}));const Xr=(s,e,t={})=>{var i;const r=(i=t.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((o,n)=>(o[n]=sl(n,s,e,r),o),{}):{}},sl=(s,e,t,i)=>{const r=e.find(a=>a.name===s),o=r==null?void 0:r.type,n=t[s];return o&&!i.includes(o)?an(o,n):$i(n)},an=(s,e)=>{if(s.charAt(0)==="_"){const t=s.slice(1,s.length);return nl(e,t)}switch(s){case M.bool:return il(e);case M.float4:case M.float8:case M.int2:case M.int4:case M.int8:case M.numeric:case M.oid:return rl(e);case M.json:case M.jsonb:return ol(e);case M.timestamp:return al(e);case M.abstime:case M.date:case M.daterange:case M.int4range:case M.int8range:case M.money:case M.reltime:case M.text:case M.time:case M.timestamptz:case M.timetz:case M.tsrange:case M.tstzrange:return $i(e);default:return $i(e)}},$i=s=>s,il=s=>{switch(s){case"t":return!0;case"f":return!1;default:return s}},rl=s=>{if(typeof s=="string"){const e=parseFloat(s);if(!Number.isNaN(e))return e}return s},ol=s=>{if(typeof s=="string")try{return JSON.parse(s)}catch{return s}return s},nl=(s,e)=>{if(typeof s!="string")return s;const t=s.length-1,i=s[t];if(s[0]==="{"&&i==="}"){let o;const n=s.slice(1,t);try{o=JSON.parse("["+n+"]")}catch{o=n?n.split(","):[]}return o.map(a=>an(e,a))}return s},al=s=>typeof s=="string"?s.replace(" ","T"):s,ln=s=>{const e=new URL(s);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class si{constructor(e,t,i={},r=Si){this.channel=e,this.event=t,this.payload=i,this.timeout=r,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var i;return this._hasReceived(e)&&t((i=this.receivedResp)===null||i===void 0?void 0:i.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(i=>i.status===e).forEach(i=>i.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var Qr;(function(s){s.SYNC="sync",s.JOIN="join",s.LEAVE="leave"})(Qr||(Qr={}));class Gt{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const i=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(i.state,{},r=>{const{onJoin:o,onLeave:n,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Gt.syncState(this.state,r,o,n),this.pendingDiffs.forEach(l=>{this.state=Gt.syncDiff(this.state,l,o,n)}),this.pendingDiffs=[],a()}),this.channel._on(i.diff,{},r=>{const{onJoin:o,onLeave:n,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(r):(this.state=Gt.syncDiff(this.state,r,o,n),a())}),this.onJoin((r,o,n)=>{this.channel._trigger("presence",{event:"join",key:r,currentPresences:o,newPresences:n})}),this.onLeave((r,o,n)=>{this.channel._trigger("presence",{event:"leave",key:r,currentPresences:o,leftPresences:n})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,i,r){const o=this.cloneDeep(e),n=this.transformState(t),a={},l={};return this.map(o,(c,h)=>{n[c]||(l[c]=h)}),this.map(n,(c,h)=>{const p=o[c];if(p){const d=h.map(_=>_.presence_ref),u=p.map(_=>_.presence_ref),f=h.filter(_=>u.indexOf(_.presence_ref)<0),v=p.filter(_=>d.indexOf(_.presence_ref)<0);f.length>0&&(a[c]=f),v.length>0&&(l[c]=v)}else a[c]=h}),this.syncDiff(o,{joins:a,leaves:l},i,r)}static syncDiff(e,t,i,r){const{joins:o,leaves:n}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return i||(i=()=>{}),r||(r=()=>{}),this.map(o,(a,l)=>{var c;const h=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),h.length>0){const p=e[a].map(u=>u.presence_ref),d=h.filter(u=>p.indexOf(u.presence_ref)<0);e[a].unshift(...d)}i(a,h,l)}),this.map(n,(a,l)=>{let c=e[a];if(!c)return;const h=l.map(p=>p.presence_ref);c=c.filter(p=>h.indexOf(p.presence_ref)<0),e[a]=c,r(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(i=>t(i,e[i]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,i)=>{const r=e[i];return"metas"in r?t[i]=r.metas.map(o=>(o.presence_ref=o.phx_ref,delete o.phx_ref,delete o.phx_ref_prev,o)):t[i]=r,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var eo;(function(s){s.ALL="*",s.INSERT="INSERT",s.UPDATE="UPDATE",s.DELETE="DELETE"})(eo||(eo={}));var Yt;(function(s){s.BROADCAST="broadcast",s.PRESENCE="presence",s.POSTGRES_CHANGES="postgres_changes",s.SYSTEM="system"})(Yt||(Yt={}));var Re;(function(s){s.SUBSCRIBED="SUBSCRIBED",s.TIMED_OUT="TIMED_OUT",s.CLOSED="CLOSED",s.CHANNEL_ERROR="CHANNEL_ERROR"})(Re||(Re={}));class wt{constructor(e,t={config:{}},i){var r,o;if(this.topic=e,this.params=t,this.socket=i,this.bindings={},this.state=F.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new si(this,ve.join,this.params,this.timeout),this.rejoinTimer=new nn(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=F.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(n=>n.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=F.closed,this.socket._remove(this)}),this._onError(n=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,n),this.state=F.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=F.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",n=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,n),this.state=F.errored,this.rejoinTimer.scheduleTimeout())}),this._on(ve.reply,{},(n,a)=>{this._trigger(this._replyEventName(a),n)}),this.presence=new Gt(this),this.broadcastEndpointURL=ln(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((o=(r=this.params.config)===null||r===void 0?void 0:r.broadcast)===null||o===void 0)&&o.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var i,r,o;if(this.socket.isConnected()||this.socket.connect(),this.state==F.closed){const{config:{broadcast:n,presence:a,private:l}}=this.params,c=(r=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(u=>u.filter))!==null&&r!==void 0?r:[],h=!!this.bindings[Yt.PRESENCE]&&this.bindings[Yt.PRESENCE].length>0||((o=this.params.config.presence)===null||o===void 0?void 0:o.enabled)===!0,p={},d={broadcast:n,presence:Object.assign(Object.assign({},a),{enabled:h}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(p.access_token=this.socket.accessTokenValue),this._onError(u=>e==null?void 0:e(Re.CHANNEL_ERROR,u)),this._onClose(()=>e==null?void 0:e(Re.CLOSED)),this.updateJoinPayload(Object.assign({config:d},p)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:u})=>{var f;if(this.socket._isManualToken()||this.socket.setAuth(),u===void 0){e==null||e(Re.SUBSCRIBED);return}else{const v=this.bindings.postgres_changes,_=(f=v==null?void 0:v.length)!==null&&f!==void 0?f:0,y=[];for(let S=0;S<_;S++){const w=v[S],{filter:{event:k,schema:R,table:T,filter:L}}=w,q=u&&u[S];if(q&&q.event===k&&wt.isFilterValueEqual(q.schema,R)&&wt.isFilterValueEqual(q.table,T)&&wt.isFilterValueEqual(q.filter,L))y.push(Object.assign(Object.assign({},w),{id:q.id}));else{this.unsubscribe(),this.state=F.errored,e==null||e(Re.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=y,e&&e(Re.SUBSCRIBED);return}}).receive("error",u=>{this.state=F.errored,e==null||e(Re.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(u).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(Re.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,i){return this.state===F.joined&&e===Yt.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(e,t,i)}async httpSend(e,t,i={}){var r;if(t==null)return Promise.reject("Payload is required for httpSend()");const o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const n={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,n,(r=i.timeout)!==null&&r!==void 0?r:this.timeout);if(a.status===202)return{success:!0};let l=a.statusText;try{const c=await a.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var i,r;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:o,payload:n}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:o,payload:n,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=t.timeout)!==null&&i!==void 0?i:this.timeout);return await((r=c.body)===null||r===void 0?void 0:r.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(o=>{var n,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(n=this.params)===null||n===void 0?void 0:n.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&o("ok"),c.receive("ok",()=>o("ok")),c.receive("error",()=>o("error")),c.receive("timeout",()=>o("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=F.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(ve.close,"leave",this._joinRef())};this.joinPush.destroy();let i=null;return new Promise(r=>{i=new si(this,ve.leave,{},e),i.receive("ok",()=>{t(),r("ok")}).receive("timeout",()=>{t(),r("timed out")}).receive("error",()=>{r("error")}),i.send(),this._canPush()||i.trigger("ok",{})}).finally(()=>{i==null||i.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=F.closed,this.bindings={}}async _fetchWithTimeout(e,t,i){const r=new AbortController,o=setTimeout(()=>r.abort(),i),n=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(o),n}_push(e,t,i=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let r=new si(this,e,t,i);return this._canPush()?r.send():this._addToPushBuffer(r),r}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>el){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,i){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,i){var r,o;const n=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:h}=ve;if(i&&[a,l,c,h].indexOf(n)>=0&&i!==this._joinRef())return;let d=this._onMessage(n,t,i);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(n)?(r=this.bindings.postgres_changes)===null||r===void 0||r.filter(u=>{var f,v,_;return((f=u.filter)===null||f===void 0?void 0:f.event)==="*"||((_=(v=u.filter)===null||v===void 0?void 0:v.event)===null||_===void 0?void 0:_.toLocaleLowerCase())===n}).map(u=>u.callback(d,i)):(o=this.bindings[n])===null||o===void 0||o.filter(u=>{var f,v,_,y,S,w;if(["broadcast","presence","postgres_changes"].includes(n))if("id"in u){const k=u.id,R=(f=u.filter)===null||f===void 0?void 0:f.event;return k&&((v=t.ids)===null||v===void 0?void 0:v.includes(k))&&(R==="*"||(R==null?void 0:R.toLocaleLowerCase())===((_=t.data)===null||_===void 0?void 0:_.type.toLocaleLowerCase()))}else{const k=(S=(y=u==null?void 0:u.filter)===null||y===void 0?void 0:y.event)===null||S===void 0?void 0:S.toLocaleLowerCase();return k==="*"||k===((w=t==null?void 0:t.event)===null||w===void 0?void 0:w.toLocaleLowerCase())}else return u.type.toLocaleLowerCase()===n}).map(u=>{if(typeof d=="object"&&"ids"in d){const f=d.data,{schema:v,table:_,commit_timestamp:y,type:S,errors:w}=f;d=Object.assign(Object.assign({},{schema:v,table:_,commit_timestamp:y,eventType:S,new:{},old:{},errors:w}),this._getPayloadRecords(f))}u.callback(d,i)})}_isClosed(){return this.state===F.closed}_isJoined(){return this.state===F.joined}_isJoining(){return this.state===F.joining}_isLeaving(){return this.state===F.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,i){const r=e.toLocaleLowerCase(),o={type:r,filter:t,callback:i};return this.bindings[r]?this.bindings[r].push(o):this.bindings[r]=[o],this}_off(e,t){const i=e.toLocaleLowerCase();return this.bindings[i]&&(this.bindings[i]=this.bindings[i].filter(r=>{var o;return!(((o=r.type)===null||o===void 0?void 0:o.toLocaleLowerCase())===i&&wt.isEqual(r.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e)if(e[i]!==t[i])return!1;return!0}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(ve.close,{},e)}_onError(e){this._on(ve.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=F.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Xr(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Xr(e.columns,e.old_record)),t}}const ii=()=>{},vs={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},ll=[1e3,2e3,5e3,1e4],cl=1e4,dl=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class hl{constructor(e,t){var i;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Si,this.transport=null,this.heartbeatIntervalMs=vs.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=ii,this.ref=0,this.reconnectTimer=null,this.vsn=Zr,this.logger=ii,this.conn=null,this.sendBuffer=[],this.serializer=new tl,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=r=>r?(...o)=>r(...o):(...o)=>fetch(...o),!(!((i=t==null?void 0:t.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${ki.websocket}`,this.httpEndpoint=ln(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=Ga.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const i=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(i),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,i){this.logger(e,t,i)}connectionState(){switch(this.conn&&this.conn.readyState){case ze.connecting:return tt.Connecting;case ze.open:return tt.Open;case ze.closing:return tt.Closing;default:return tt.Closed}}isConnected(){return this.connectionState()===tt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const i=`realtime:${e}`,r=this.getChannels().find(o=>o.topic===i);if(r)return r;{const o=new wt(`realtime:${e}`,t,this);return this.channels.push(o),o}}push(e){const{topic:t,event:i,payload:r,ref:o}=e,n=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${i} (${o})`,r),this.isConnected()?n():this.sendBuffer.push(n)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(Qa,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},vs.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(i=>i.topic===e&&(i._isJoined()||i._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply"&&t.ref&&t.ref===this.pendingHeartbeatRef){const c=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error",c)}catch(h){this.log("error","error in heartbeat callback",h)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:i,event:r,payload:o,ref:n}=t,a=n?`(${n})`:"",l=o.status||"";this.log("receive",`${l} ${i} ${r} ${a}`.trim(),o),this.channels.filter(c=>c._isMember(i)).forEach(c=>c._trigger(r,o,n)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e),this.conn.readyState===ze.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===ze.open||this.conn.readyState===ze.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.accessTokenValue&&(this.channels.forEach(t=>{t.updateJoinPayload({access_token:this.accessTokenValue})}),this.sendBuffer=[],this.channels.forEach(t=>{t._isJoining()&&(t.joinPush.sent=!1,t.joinPush.send())})),this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e);try{this.heartbeatCallback("error")}catch(t){this.log("error","error in heartbeat callback",t)}}_triggerChanError(){this.channels.forEach(e=>e._trigger(ve.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const i=e.match(/\?/)?"&":"?",r=new URLSearchParams(t);return`${e}${i}${r}`}_workerObjectUrl(e){let t;if(e)t=e;else{const i=new Blob([dl],{type:"application/javascript"});t=URL.createObjectURL(i)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t,i=!1;if(e)t=e,i=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(r){this.log("error","Error fetching access token from callback",r),t=this.accessTokenValue}else t=this.accessTokenValue;i?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(r=>{const o={access_token:t,version:Za};t&&r.updateJoinPayload(o),r.joinedOnce&&r._isJoined()&&r._push(ve.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(i=>{try{i(t)}catch(r){this.log("error",`error in ${e} callback`,r)}})}catch(i){this.log("error",`error triggering ${e} callbacks`,i)}}_setupReconnectionTimer(){this.reconnectTimer=new nn(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},vs.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,i,r,o,n,a,l,c,h,p,d,u;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(i=e==null?void 0:e.timeout)!==null&&i!==void 0?i:Si,this.heartbeatIntervalMs=(r=e==null?void 0:e.heartbeatIntervalMs)!==null&&r!==void 0?r:vs.HEARTBEAT_INTERVAL,this.worker=(o=e==null?void 0:e.worker)!==null&&o!==void 0?o:!1,this.accessToken=(n=e==null?void 0:e.accessToken)!==null&&n!==void 0?n:null,this.heartbeatCallback=(a=e==null?void 0:e.heartbeatCallback)!==null&&a!==void 0?a:ii,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Zr,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:(f=>ll[f-1]||cl),this.vsn){case Xa:this.encode=(h=e==null?void 0:e.encode)!==null&&h!==void 0?h:((f,v)=>v(JSON.stringify(f))),this.decode=(p=e==null?void 0:e.decode)!==null&&p!==void 0?p:((f,v)=>v(JSON.parse(f)));break;case on:this.encode=(d=e==null?void 0:e.encode)!==null&&d!==void 0?d:this.serializer.encode.bind(this.serializer),this.decode=(u=e==null?void 0:e.decode)!==null&&u!==void 0?u:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}var ss=class extends Error{constructor(s,e){var t;super(s),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function ul(s,e,t){const i=new URL(e,s);if(t)for(const[r,o]of Object.entries(t))o!==void 0&&i.searchParams.set(r,o);return i.toString()}async function pl(s){return!s||s.type==="none"?{}:s.type==="bearer"?{Authorization:`Bearer ${s.token}`}:s.type==="header"?{[s.name]:s.value}:s.type==="custom"?await s.getHeaders():{}}function fl(s){const e=s.fetchImpl??globalThis.fetch;return{async request({method:t,path:i,query:r,body:o,headers:n}){const a=ul(s.baseUrl,i,r),l=await pl(s.auth),c=await e(a,{method:t,headers:{...o?{"Content-Type":"application/json"}:{},...l,...n},body:o?JSON.stringify(o):void 0}),h=await c.text(),p=(c.headers.get("content-type")||"").includes("application/json"),d=p&&h?JSON.parse(h):h;if(!c.ok){const u=p?d:void 0,f=u==null?void 0:u.error;throw new ss((f==null?void 0:f.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:f==null?void 0:f.type,icebergCode:f==null?void 0:f.code,details:u})}return{status:c.status,headers:c.headers,data:d}}}}function gs(s){return s.join("")}var ml=class{constructor(s,e=""){this.client=s,this.prefix=e}async listNamespaces(s){const e=s?{parent:gs(s.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(s,e){const t={namespace:s.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(s){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${gs(s.namespace)}`})}async loadNamespaceMetadata(s){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${gs(s.namespace)}`})).data.properties}}async namespaceExists(s){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${gs(s.namespace)}`}),!0}catch(e){if(e instanceof ss&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(s,e){try{return await this.createNamespace(s,e)}catch(t){if(t instanceof ss&&t.status===409)return;throw t}}};function dt(s){return s.join("")}var vl=class{constructor(s,e="",t){this.client=s,this.prefix=e,this.accessDelegation=t}async listTables(s){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${dt(s.namespace)}/tables`})).data.identifiers}async createTable(s,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${dt(s.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(s,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${dt(s.namespace)}/tables/${s.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(s,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${dt(s.namespace)}/tables/${s.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(s){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${dt(s.namespace)}/tables/${s.name}`,headers:e})).data.metadata}async tableExists(s){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${dt(s.namespace)}/tables/${s.name}`,headers:e}),!0}catch(t){if(t instanceof ss&&t.status===404)return!1;throw t}}async createTableIfNotExists(s,e){try{return await this.createTable(s,e)}catch(t){if(t instanceof ss&&t.status===409)return await this.loadTable({namespace:s.namespace,name:e.name});throw t}}},gl=class{constructor(s){var i;let e="v1";s.catalogName&&(e+=`/${s.catalogName}`);const t=s.baseUrl.endsWith("/")?s.baseUrl:`${s.baseUrl}/`;this.client=fl({baseUrl:t,auth:s.auth,fetchImpl:s.fetch}),this.accessDelegation=(i=s.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new ml(this.client,e),this.tableOps=new vl(this.client,e,this.accessDelegation)}async listNamespaces(s){return this.namespaceOps.listNamespaces(s)}async createNamespace(s,e){return this.namespaceOps.createNamespace(s,e)}async dropNamespace(s){await this.namespaceOps.dropNamespace(s)}async loadNamespaceMetadata(s){return this.namespaceOps.loadNamespaceMetadata(s)}async listTables(s){return this.tableOps.listTables(s)}async createTable(s,e){return this.tableOps.createTable(s,e)}async updateTable(s,e){return this.tableOps.updateTable(s,e)}async dropTable(s,e){await this.tableOps.dropTable(s,e)}async loadTable(s){return this.tableOps.loadTable(s)}async namespaceExists(s){return this.namespaceOps.namespaceExists(s)}async tableExists(s){return this.tableOps.tableExists(s)}async createNamespaceIfNotExists(s,e){return this.namespaceOps.createNamespaceIfNotExists(s,e)}async createTableIfNotExists(s,e){return this.tableOps.createTableIfNotExists(s,e)}},Us=class extends Error{constructor(s,e="storage",t,i){super(s),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=i}};function zs(s){return typeof s=="object"&&s!==null&&"__isStorageError"in s}var Wt=class extends Us{constructor(s,e,t,i="storage"){super(s,i,e,t),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},cn=class extends Us{constructor(s,e,t="storage"){super(s,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const bl=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),_l=s=>{if(typeof s!="object"||s===null)return!1;const e=Object.getPrototypeOf(s);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in s)&&!(Symbol.iterator in s)},xi=s=>{if(Array.isArray(s))return s.map(t=>xi(t));if(typeof s=="function"||s!==Object(s))return s;const e={};return Object.entries(s).forEach(([t,i])=>{const r=t.replace(/([-_][a-z])/gi,o=>o.toUpperCase().replace(/[-_]/g,""));e[r]=xi(i)}),e},yl=s=>!s||typeof s!="string"||s.length===0||s.length>100||s.trim()!==s||s.includes("/")||s.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(s);function is(s){"@babel/helpers - typeof";return is=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},is(s)}function wl(s,e){if(is(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(is(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function Sl(s){var e=wl(s,"string");return is(e)=="symbol"?e:e+""}function kl(s,e,t){return(e=Sl(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function to(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function E(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?to(Object(t),!0).forEach(function(i){kl(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):to(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}const so=s=>{var e;return s.msg||s.message||s.error_description||(typeof s.error=="string"?s.error:(e=s.error)===null||e===void 0?void 0:e.message)||JSON.stringify(s)},$l=async(s,e,t,i)=>{if(s&&typeof s=="object"&&"status"in s&&"ok"in s&&typeof s.status=="number"){const r=s,o=r.status||500;if(typeof r.json=="function")r.json().then(n=>{const a=(n==null?void 0:n.statusCode)||(n==null?void 0:n.code)||o+"";e(new Wt(so(n),o,a,i))}).catch(()=>{if(i==="vectors"){const n=o+"";e(new Wt(r.statusText||`HTTP ${o} error`,o,n,i))}else{const n=o+"";e(new Wt(r.statusText||`HTTP ${o} error`,o,n,i))}});else{const n=o+"";e(new Wt(r.statusText||`HTTP ${o} error`,o,n,i))}}else e(new cn(so(s),s,i))},xl=(s,e,t,i)=>{const r={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"||s==="HEAD"||!i?E(E({},r),t):(_l(i)?(r.headers=E({"Content-Type":"application/json"},e==null?void 0:e.headers),r.body=JSON.stringify(i)):r.body=i,e!=null&&e.duplex&&(r.duplex=e.duplex),E(E({},r),t))};async function jt(s,e,t,i,r,o,n){return new Promise((a,l)=>{s(t,xl(e,i,r,o)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(n==="vectors"){const h=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!h||!h.includes("application/json"))return{}}return c.json()}).then(c=>a(c)).catch(c=>$l(c,l,i,n))})}function dn(s="storage"){return{get:async(e,t,i,r)=>jt(e,"GET",t,i,r,void 0,s),post:async(e,t,i,r,o)=>jt(e,"POST",t,r,o,i,s),put:async(e,t,i,r,o)=>jt(e,"PUT",t,r,o,i,s),head:async(e,t,i,r)=>jt(e,"HEAD",t,E(E({},i),{},{noResolveJson:!0}),r,void 0,s),remove:async(e,t,i,r,o)=>jt(e,"DELETE",t,r,o,i,s)}}const El=dn("storage"),{get:rs,post:me,put:Ei,head:Cl,remove:pr}=El,re=dn("vectors");var It=class{constructor(s,e={},t,i="storage"){this.shouldThrowOnError=!1,this.url=s,this.headers=e,this.fetch=bl(t),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(s,e){return this.headers=E(E({},this.headers),{},{[s]:e}),this}async handleOperation(s){var e=this;try{return{data:await s(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(zs(t))return{data:null,error:t};throw t}}},Tl=class{constructor(s,e){this.downloadFn=s,this.shouldThrowOnError=e}then(s,e){return this.execute().then(s,e)}async execute(){var s=this;try{return{data:(await s.downloadFn()).body,error:null}}catch(e){if(s.shouldThrowOnError)throw e;if(zs(e))return{data:null,error:e};throw e}}};let hn;hn=Symbol.toStringTag;var Al=class{constructor(s,e){this.downloadFn=s,this.shouldThrowOnError=e,this[hn]="BlobDownloadBuilder",this.promise=null}asStream(){return new Tl(this.downloadFn,this.shouldThrowOnError)}then(s,e){return this.getPromise().then(s,e)}catch(s){return this.getPromise().catch(s)}finally(s){return this.getPromise().finally(s)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var s=this;try{return{data:await(await s.downloadFn()).blob(),error:null}}catch(e){if(s.shouldThrowOnError)throw e;if(zs(e))return{data:null,error:e};throw e}}};const Il={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},io={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Rl=class extends It{constructor(s,e={},t,i){super(s,e,i,"storage"),this.bucketId=t}async uploadOrUpdate(s,e,t,i){var r=this;return r.handleOperation(async()=>{let o;const n=E(E({},io),i);let a=E(E({},r.headers),s==="POST"&&{"x-upsert":String(n.upsert)});const l=n.metadata;typeof Blob<"u"&&t instanceof Blob?(o=new FormData,o.append("cacheControl",n.cacheControl),l&&o.append("metadata",r.encodeMetadata(l)),o.append("",t)):typeof FormData<"u"&&t instanceof FormData?(o=t,o.has("cacheControl")||o.append("cacheControl",n.cacheControl),l&&!o.has("metadata")&&o.append("metadata",r.encodeMetadata(l))):(o=t,a["cache-control"]=`max-age=${n.cacheControl}`,a["content-type"]=n.contentType,l&&(a["x-metadata"]=r.toBase64(r.encodeMetadata(l))),(typeof ReadableStream<"u"&&o instanceof ReadableStream||o&&typeof o=="object"&&"pipe"in o&&typeof o.pipe=="function")&&!n.duplex&&(n.duplex="half")),i!=null&&i.headers&&(a=E(E({},a),i.headers));const c=r._removeEmptyFolders(e),h=r._getFinalPath(c),p=await(s=="PUT"?Ei:me)(r.fetch,`${r.url}/object/${h}`,o,E({headers:a},n!=null&&n.duplex?{duplex:n.duplex}:{}));return{path:c,id:p.Id,fullPath:p.Key}})}async upload(s,e,t){return this.uploadOrUpdate("POST",s,e,t)}async uploadToSignedUrl(s,e,t,i){var r=this;const o=r._removeEmptyFolders(s),n=r._getFinalPath(o),a=new URL(r.url+`/object/upload/sign/${n}`);return a.searchParams.set("token",e),r.handleOperation(async()=>{let l;const c=E({upsert:io.upsert},i),h=E(E({},r.headers),{"x-upsert":String(c.upsert)});return typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.append("cacheControl",c.cacheControl)):(l=t,h["cache-control"]=`max-age=${c.cacheControl}`,h["content-type"]=c.contentType),{path:o,fullPath:(await Ei(r.fetch,a.toString(),l,{headers:h})).Key}})}async createSignedUploadUrl(s,e){var t=this;return t.handleOperation(async()=>{let i=t._getFinalPath(s);const r=E({},t.headers);e!=null&&e.upsert&&(r["x-upsert"]="true");const o=await me(t.fetch,`${t.url}/object/upload/sign/${i}`,{},{headers:r}),n=new URL(t.url+o.url),a=n.searchParams.get("token");if(!a)throw new Us("No token returned by API");return{signedUrl:n.toString(),path:s,token:a}})}async update(s,e,t){return this.uploadOrUpdate("PUT",s,e,t)}async move(s,e,t){var i=this;return i.handleOperation(async()=>await me(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:s,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers}))}async copy(s,e,t){var i=this;return i.handleOperation(async()=>({path:(await me(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:s,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(s,e,t){var i=this;return i.handleOperation(async()=>{let r=i._getFinalPath(s),o=await me(i.fetch,`${i.url}/object/sign/${r}`,E({expiresIn:e},t!=null&&t.transform?{transform:t.transform}:{}),{headers:i.headers});const n=t!=null&&t.download?`&download=${t.download===!0?"":t.download}`:"",a=t!=null&&t.transform&&o.signedURL.includes("/object/sign/")?o.signedURL.replace("/object/sign/","/render/image/sign/"):o.signedURL;return{signedUrl:encodeURI(`${i.url}${a}${n}`)}})}async createSignedUrls(s,e,t){var i=this;return i.handleOperation(async()=>{const r=await me(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:s},{headers:i.headers}),o=t!=null&&t.download?`&download=${t.download===!0?"":t.download}`:"";return r.map(n=>E(E({},n),{},{signedUrl:n.signedURL?encodeURI(`${i.url}${n.signedURL}${o}`):null}))})}download(s,e,t){const i=typeof(e==null?void 0:e.transform)<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((e==null?void 0:e.transform)||{}),o=r?`?${r}`:"",n=this._getFinalPath(s),a=()=>rs(this.fetch,`${this.url}/${i}/${n}${o}`,{headers:this.headers,noResolveJson:!0},t);return new Al(a,this.shouldThrowOnError)}async info(s){var e=this;const t=e._getFinalPath(s);return e.handleOperation(async()=>xi(await rs(e.fetch,`${e.url}/object/info/${t}`,{headers:e.headers})))}async exists(s){var e=this;const t=e._getFinalPath(s);try{return await Cl(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(zs(r)){var i;const o=r instanceof Wt?r.status:r instanceof cn?(i=r.originalError)===null||i===void 0?void 0:i.status:void 0;if(o!==void 0&&[400,404].includes(o))return{data:!1,error:r}}throw r}}getPublicUrl(s,e){const t=this._getFinalPath(s),i=[],r=e!=null&&e.download?`download=${e.download===!0?"":e.download}`:"";r!==""&&i.push(r);const o=typeof(e==null?void 0:e.transform)<"u"?"render/image":"object",n=this.transformOptsToQueryString((e==null?void 0:e.transform)||{});n!==""&&i.push(n);let a=i.join("&");return a!==""&&(a=`?${a}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${t}${a}`)}}}async remove(s){var e=this;return e.handleOperation(async()=>await pr(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:s},{headers:e.headers}))}async list(s,e,t){var i=this;return i.handleOperation(async()=>{const r=E(E(E({},Il),e),{},{prefix:s||""});return await me(i.fetch,`${i.url}/object/list/${i.bucketId}`,r,{headers:i.headers},t)})}async listV2(s,e){var t=this;return t.handleOperation(async()=>{const i=E({},s);return await me(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,i,{headers:t.headers},e)})}encodeMetadata(s){return JSON.stringify(s)}toBase64(s){return typeof Buffer<"u"?Buffer.from(s).toString("base64"):btoa(s)}_getFinalPath(s){return`${this.bucketId}/${s.replace(/^\/+/,"")}`}_removeEmptyFolders(s){return s.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(s){const e=[];return s.width&&e.push(`width=${s.width}`),s.height&&e.push(`height=${s.height}`),s.resize&&e.push(`resize=${s.resize}`),s.format&&e.push(`format=${s.format}`),s.quality&&e.push(`quality=${s.quality}`),e.join("&")}};const Ll="2.99.1",hs={"X-Client-Info":`storage-js/${Ll}`};var Ol=class extends It{constructor(s,e={},t,i){const r=new URL(s);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase."));const o=r.href.replace(/\/$/,""),n=E(E({},hs),e);super(o,n,t,"storage")}async listBuckets(s){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(s);return await rs(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(s){var e=this;return e.handleOperation(async()=>await rs(e.fetch,`${e.url}/bucket/${s}`,{headers:e.headers}))}async createBucket(s,e={public:!1}){var t=this;return t.handleOperation(async()=>await me(t.fetch,`${t.url}/bucket`,{id:s,name:s,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async updateBucket(s,e){var t=this;return t.handleOperation(async()=>await Ei(t.fetch,`${t.url}/bucket/${s}`,{id:s,name:s,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async emptyBucket(s){var e=this;return e.handleOperation(async()=>await me(e.fetch,`${e.url}/bucket/${s}/empty`,{},{headers:e.headers}))}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await pr(e.fetch,`${e.url}/bucket/${s}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(s){const e={};return s&&("limit"in s&&(e.limit=String(s.limit)),"offset"in s&&(e.offset=String(s.offset)),s.search&&(e.search=s.search),s.sortColumn&&(e.sortColumn=s.sortColumn),s.sortOrder&&(e.sortOrder=s.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Pl=class extends It{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=E(E({},hs),e);super(i,r,t,"storage")}async createBucket(s){var e=this;return e.handleOperation(async()=>await me(e.fetch,`${e.url}/bucket`,{name:s},{headers:e.headers}))}async listBuckets(s){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;(s==null?void 0:s.limit)!==void 0&&t.set("limit",s.limit.toString()),(s==null?void 0:s.offset)!==void 0&&t.set("offset",s.offset.toString()),s!=null&&s.sortColumn&&t.set("sortColumn",s.sortColumn),s!=null&&s.sortOrder&&t.set("sortOrder",s.sortOrder),s!=null&&s.search&&t.set("search",s.search);const i=t.toString(),r=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await rs(e.fetch,r,{headers:e.headers})})}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await pr(e.fetch,`${e.url}/bucket/${s}`,{},{headers:e.headers}))}from(s){var e=this;if(!yl(s))throw new Us("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new gl({baseUrl:this.url,catalogName:s,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(t,{get(r,o){const n=r[o];return typeof n!="function"?n:async(...a)=>{try{return{data:await n.apply(r,a),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},Dl=class extends It{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=E(E({},hs),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async createIndex(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/CreateIndex`,s,{headers:e.headers})||{})}async getIndex(s,e){var t=this;return t.handleOperation(async()=>await re.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:s,indexName:e},{headers:t.headers}))}async listIndexes(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListIndexes`,s,{headers:e.headers}))}async deleteIndex(s,e){var t=this;return t.handleOperation(async()=>await re.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:s,indexName:e},{headers:t.headers})||{})}},Nl=class extends It{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=E(E({},hs),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async putVectors(s){var e=this;if(s.vectors.length<1||s.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/PutVectors`,s,{headers:e.headers})||{})}async getVectors(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/GetVectors`,s,{headers:e.headers}))}async listVectors(s){var e=this;if(s.segmentCount!==void 0){if(s.segmentCount<1||s.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(s.segmentIndex!==void 0&&(s.segmentIndex<0||s.segmentIndex>=s.segmentCount))throw new Error(`segmentIndex must be between 0 and ${s.segmentCount-1}`)}return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListVectors`,s,{headers:e.headers}))}async queryVectors(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/QueryVectors`,s,{headers:e.headers}))}async deleteVectors(s){var e=this;if(s.keys.length<1||s.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/DeleteVectors`,s,{headers:e.headers})||{})}},jl=class extends It{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=E(E({},hs),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async createBucket(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:s},{headers:e.headers})||{})}async getBucket(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:s},{headers:e.headers}))}async listBuckets(s={}){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListVectorBuckets`,s,{headers:e.headers}))}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:s},{headers:e.headers})||{})}},Ml=class extends jl{constructor(s,e={}){super(s,e.headers||{},e.fetch)}from(s){return new Ul(this.url,this.headers,s,this.fetch)}async createBucket(s){var e=()=>super.createBucket,t=this;return e().call(t,s)}async getBucket(s){var e=()=>super.getBucket,t=this;return e().call(t,s)}async listBuckets(s={}){var e=()=>super.listBuckets,t=this;return e().call(t,s)}async deleteBucket(s){var e=()=>super.deleteBucket,t=this;return e().call(t,s)}},Ul=class extends Dl{constructor(s,e,t,i){super(s,e,i),this.vectorBucketName=t}async createIndex(s){var e=()=>super.createIndex,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(s={}){var e=()=>super.listIndexes,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(s){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,s)}async deleteIndex(s){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,s)}index(s){return new zl(this.url,this.headers,this.vectorBucketName,s,this.fetch)}},zl=class extends Nl{constructor(s,e,t,i,r){super(s,e,r),this.vectorBucketName=t,this.indexName=i}async putVectors(s){var e=()=>super.putVectors,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(s){var e=()=>super.getVectors,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(s={}){var e=()=>super.listVectors,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(s){var e=()=>super.queryVectors,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(s){var e=()=>super.deleteVectors,t=this;return e().call(t,E(E({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},Vl=class extends Ol{constructor(s,e={},t,i){super(s,e,t,i)}from(s){return new Rl(this.url,this.headers,s,this.fetch)}get vectors(){return new Ml(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Pl(this.url+"/iceberg",this.headers,this.fetch)}};const un="2.99.1",_t=30*1e3,Ci=3,ri=Ci*_t,Bl="http://localhost:9999",Fl="supabase.auth.token",ql={"X-Client-Info":`gotrue-js/${un}`},Ti="X-Supabase-Api-Version",pn={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Wl=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Hl=600*1e3;class os extends Error{constructor(e,t,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=i}}function $(s){return typeof s=="object"&&s!==null&&"__isAuthError"in s}class Kl extends os{constructor(e,t,i){super(e,t,i),this.name="AuthApiError",this.status=t,this.code=i}}function Jl(s){return $(s)&&s.name==="AuthApiError"}class st extends os{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class De extends os{constructor(e,t,i,r){super(e,i,r),this.name=t,this.status=i}}class se extends De{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function oi(s){return $(s)&&s.name==="AuthSessionMissingError"}class ht extends De{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class bs extends De{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class _s extends De{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function Gl(s){return $(s)&&s.name==="AuthImplicitGrantRedirectError"}class ro extends De{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Yl extends De{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ai extends De{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function ni(s){return $(s)&&s.name==="AuthRetryableFetchError"}class oo extends De{constructor(e,t,i){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=i}}class Ii extends De{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const As="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),no=` 	
\r=`.split(""),Zl=(()=>{const s=new Array(128);for(let e=0;e<s.length;e+=1)s[e]=-1;for(let e=0;e<no.length;e+=1)s[no[e].charCodeAt(0)]=-2;for(let e=0;e<As.length;e+=1)s[As[e].charCodeAt(0)]=e;return s})();function ao(s,e,t){if(s!==null)for(e.queue=e.queue<<8|s,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(As[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(As[i]),e.queuedBits-=6}}function fn(s,e,t){const i=Zl[s];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(s)}"`)}}function lo(s){const e=[],t=n=>{e.push(String.fromCodePoint(n))},i={utf8seq:0,codepoint:0},r={queue:0,queuedBits:0},o=n=>{ec(n,i,t)};for(let n=0;n<s.length;n+=1)fn(s.charCodeAt(n),r,o);return e.join("")}function Xl(s,e){if(s<=127){e(s);return}else if(s<=2047){e(192|s>>6),e(128|s&63);return}else if(s<=65535){e(224|s>>12),e(128|s>>6&63),e(128|s&63);return}else if(s<=1114111){e(240|s>>18),e(128|s>>12&63),e(128|s>>6&63),e(128|s&63);return}throw new Error(`Unrecognized Unicode codepoint: ${s.toString(16)}`)}function Ql(s,e){for(let t=0;t<s.length;t+=1){let i=s.charCodeAt(t);if(i>55295&&i<=56319){const r=(i-55296)*1024&65535;i=(s.charCodeAt(t+1)-56320&65535|r)+65536,t+=1}Xl(i,e)}}function ec(s,e,t){if(e.utf8seq===0){if(s<=127){t(s);return}for(let i=1;i<6;i+=1)if((s>>7-i&1)===0){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=s&31;else if(e.utf8seq===3)e.codepoint=s&15;else if(e.utf8seq===4)e.codepoint=s&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(s<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|s&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function kt(s){const e=[],t={queue:0,queuedBits:0},i=r=>{e.push(r)};for(let r=0;r<s.length;r+=1)fn(s.charCodeAt(r),t,i);return new Uint8Array(e)}function tc(s){const e=[];return Ql(s,t=>e.push(t)),new Uint8Array(e)}function ot(s){const e=[],t={queue:0,queuedBits:0},i=r=>{e.push(r)};return s.forEach(r=>ao(r,t,i)),ao(null,t,i),e.join("")}function sc(s){return Math.round(Date.now()/1e3)+s}function ic(){return Symbol("auth-callback")}const K=()=>typeof window<"u"&&typeof document<"u",Xe={tested:!1,writable:!1},mn=()=>{if(!K())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Xe.tested)return Xe.writable;const s=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(s,s),globalThis.localStorage.removeItem(s),Xe.tested=!0,Xe.writable=!0}catch{Xe.tested=!0,Xe.writable=!1}return Xe.writable};function rc(s){const e={},t=new URL(s);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((r,o)=>{e[o]=r})}catch{}return t.searchParams.forEach((i,r)=>{e[r]=i}),e}const vn=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),oc=s=>typeof s=="object"&&s!==null&&"status"in s&&"ok"in s&&"json"in s&&typeof s.json=="function",yt=async(s,e,t)=>{await s.setItem(e,JSON.stringify(t))},Qe=async(s,e)=>{const t=await s.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},H=async(s,e)=>{await s.removeItem(e)};class Vs{constructor(){this.promise=new Vs.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Vs.promiseConstructor=Promise;function ys(s){const e=s.split(".");if(e.length!==3)throw new Ii("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!Wl.test(e[i]))throw new Ii("JWT not in base64url format");return{header:JSON.parse(lo(e[0])),payload:JSON.parse(lo(e[1])),signature:kt(e[2]),raw:{header:e[0],payload:e[1]}}}async function nc(s){return await new Promise(e=>{setTimeout(()=>e(null),s)})}function ac(s,e){return new Promise((i,r)=>{(async()=>{for(let o=0;o<1/0;o++)try{const n=await s(o);if(!e(o,null,n)){i(n);return}}catch(n){if(!e(o,n)){r(n);return}}})()})}function lc(s){return("0"+s.toString(16)).substr(-2)}function cc(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=t.length;let r="";for(let o=0;o<56;o++)r+=t.charAt(Math.floor(Math.random()*i));return r}return crypto.getRandomValues(e),Array.from(e,lc).join("")}async function dc(s){const t=new TextEncoder().encode(s),i=await crypto.subtle.digest("SHA-256",t),r=new Uint8Array(i);return Array.from(r).map(o=>String.fromCharCode(o)).join("")}async function hc(s){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),s;const t=await dc(s);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function ut(s,e,t=!1){const i=cc();let r=i;t&&(r+="/PASSWORD_RECOVERY"),await yt(s,`${e}-code-verifier`,r);const o=await hc(i);return[o,i===o?"plain":"s256"]}const uc=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function pc(s){const e=s.headers.get(Ti);if(!e||!e.match(uc))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function fc(s){if(!s)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(s<=e)throw new Error("JWT has expired")}function mc(s){switch(s){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const vc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function pt(s){if(!vc.test(s))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function ai(){const s={};return new Proxy(s,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const i=t.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function gc(s,e){return new Proxy(s,{get:(t,i,r)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const o=i.toString();if(o==="Symbol(Symbol.toPrimitive)"||o==="Symbol(Symbol.toStringTag)"||o==="Symbol(util.inspect.custom)"||o==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,i,r)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,i,r)}})}function co(s){return JSON.parse(JSON.stringify(s))}const et=s=>s.msg||s.message||s.error_description||s.error||JSON.stringify(s),bc=[502,503,504];async function ho(s){var e;if(!oc(s))throw new Ai(et(s),0);if(bc.includes(s.status))throw new Ai(et(s),s.status);let t;try{t=await s.json()}catch(o){throw new st(et(o),o)}let i;const r=pc(s);if(r&&r.getTime()>=pn["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?i=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(i=t.error_code),i){if(i==="weak_password")throw new oo(et(t),s.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new se}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((o,n)=>o&&typeof n=="string",!0))throw new oo(et(t),s.status,t.weak_password.reasons);throw new Kl(et(t),s.status||500,i)}const _c=(s,e,t,i)=>{const r={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"?r:(r.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),r.body=JSON.stringify(i),Object.assign(Object.assign({},r),t))};async function x(s,e,t,i){var r;const o=Object.assign({},i==null?void 0:i.headers);o[Ti]||(o[Ti]=pn["2024-01-01"].name),i!=null&&i.jwt&&(o.Authorization=`Bearer ${i.jwt}`);const n=(r=i==null?void 0:i.query)!==null&&r!==void 0?r:{};i!=null&&i.redirectTo&&(n.redirect_to=i.redirectTo);const a=Object.keys(n).length?"?"+new URLSearchParams(n).toString():"",l=await yc(s,e,t+a,{headers:o,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function yc(s,e,t,i,r,o){const n=_c(e,i,r,o);let a;try{a=await s(t,Object.assign({},n))}catch(l){throw console.error(l),new Ai(et(l),0)}if(a.ok||await ho(a),i!=null&&i.noResolveJson)return a;try{return await a.json()}catch(l){await ho(l)}}function fe(s){var e;let t=null;kc(s)&&(t=Object.assign({},s),s.expires_at||(t.expires_at=sc(s.expires_in)));const i=(e=s.user)!==null&&e!==void 0?e:s;return{data:{session:t,user:i},error:null}}function uo(s){const e=fe(s);return!e.error&&s.weak_password&&typeof s.weak_password=="object"&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.message&&typeof s.weak_password.message=="string"&&s.weak_password.reasons.reduce((t,i)=>t&&typeof i=="string",!0)&&(e.data.weak_password=s.weak_password),e}function Fe(s){var e;return{data:{user:(e=s.user)!==null&&e!==void 0?e:s},error:null}}function wc(s){return{data:s,error:null}}function Sc(s){const{action_link:e,email_otp:t,hashed_token:i,redirect_to:r,verification_type:o}=s,n=Ms(s,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:i,redirect_to:r,verification_type:o},l=Object.assign({},n);return{data:{properties:a,user:l},error:null}}function po(s){return s}function kc(s){return s.access_token&&s.refresh_token&&s.expires_in}const li=["global","local","others"];class $c{constructor({url:e="",headers:t={},fetch:i}){this.url=e,this.headers=t,this.fetch=vn(i),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,t=li[0]){if(li.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${li.join(", ")}`);try{return await x(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if($(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,t={}){try{return await x(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Fe})}catch(i){if($(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:t}=e,i=Ms(e,["options"]),r=Object.assign(Object.assign({},i),t);return"newEmail"in i&&(r.new_email=i==null?void 0:i.newEmail,delete r.newEmail),await x(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:Sc,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if($(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await x(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Fe})}catch(t){if($(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,i,r,o,n,a,l;try{const c={nextPage:null,lastPage:0,total:0},h=await x(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(o=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&o!==void 0?o:""},xform:po});if(h.error)throw h.error;const p=await h.json(),d=(n=h.headers.get("x-total-count"))!==null&&n!==void 0?n:0,u=(l=(a=h.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return u.length>0&&(u.forEach(f=>{const v=parseInt(f.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(f.split(";")[1].split("=")[1]);c[`${_}Page`]=v}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},p),c),error:null}}catch(c){if($(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){pt(e);try{return await x(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Fe})}catch(t){if($(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){pt(e);try{return await x(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Fe})}catch(i){if($(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,t=!1){pt(e);try{return await x(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Fe})}catch(i){if($(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){pt(e.userId);try{const{data:t,error:i}=await x(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:r=>({data:{factors:r},error:null})});return{data:t,error:i}}catch(t){if($(t))return{data:null,error:t};throw t}}async _deleteFactor(e){pt(e.userId),pt(e.id);try{return{data:await x(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if($(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,i,r,o,n,a,l;try{const c={nextPage:null,lastPage:0,total:0},h=await x(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(o=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&o!==void 0?o:""},xform:po});if(h.error)throw h.error;const p=await h.json(),d=(n=h.headers.get("x-total-count"))!==null&&n!==void 0?n:0,u=(l=(a=h.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return u.length>0&&(u.forEach(f=>{const v=parseInt(f.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(f.split(";")[1].split("=")[1]);c[`${_}Page`]=v}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},p),c),error:null}}catch(c){if($(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await x(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await x(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await x(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if($(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await x(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if($(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await x(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _listCustomProviders(e){try{const t={};return e!=null&&e.type&&(t.type=e.type),await x(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:i=>{var r;return{data:{providers:(r=i==null?void 0:i.providers)!==null&&r!==void 0?r:[]},error:null}}})}catch(t){if($(t))return{data:{providers:[]},error:t};throw t}}async _createCustomProvider(e){try{return await x(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _getCustomProvider(e){try{return await x(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if($(t))return{data:null,error:t};throw t}}async _updateCustomProvider(e,t){try{return await x(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if($(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await x(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if($(t))return{data:null,error:t};throw t}}}function fo(s={}){return{getItem:e=>s[e]||null,setItem:(e,t)=>{s[e]=t},removeItem:e=>{delete s[e]}}}const Ae={debug:!!(globalThis&&mn()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class gn extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class xc extends gn{}async function Ec(s,e,t){Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",s,e);const i=new globalThis.AbortController;e>0&&setTimeout(()=>{i.abort(),Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",s)},e),await Promise.resolve();try{return await globalThis.navigator.locks.request(s,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:i.signal},async r=>{if(r){Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",s,r.name);try{return await t()}finally{Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",s,r.name)}}else{if(e===0)throw Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",s),new xc(`Acquiring an exclusive Navigator LockManager lock "${s}" immediately failed`);if(Ae.debug)try{const o=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(o,null,"  "))}catch(o){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",o)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}})}catch(r){if((r==null?void 0:r.name)==="AbortError"&&e>0)return Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",s),console.warn(`@supabase/gotrue-js: Lock "${s}" was not released within ${e}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(s,{mode:"exclusive",steal:!0},async o=>{if(o){Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",s,o.name);try{return await t()}finally{Ae.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",s,o.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await t()}));throw r}}function Cc(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function bn(s){if(!/^0x[a-fA-F0-9]{40}$/.test(s))throw new Error(`@supabase/auth-js: Address "${s}" is invalid.`);return s.toLowerCase()}function Tc(s){return parseInt(s,16)}function Ac(s){const e=new TextEncoder().encode(s);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Ic(s){var e;const{chainId:t,domain:i,expirationTime:r,issuedAt:o=new Date,nonce:n,notBefore:a,requestId:l,resources:c,scheme:h,uri:p,version:d}=s;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(n&&n.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${n}`);if(!p)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(d!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(!((e=s.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${s.statement}`)}const u=bn(s.address),f=h?`${h}://${i}`:i,v=s.statement?`${s.statement}
`:"",_=`${f} wants you to sign in with your Ethereum account:
${u}

${v}`;let y=`URI: ${p}
Version: ${d}
Chain ID: ${t}${n?`
Nonce: ${n}`:""}
Issued At: ${o.toISOString()}`;if(r&&(y+=`
Expiration Time: ${r.toISOString()}`),a&&(y+=`
Not Before: ${a.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let S=`
Resources:`;for(const w of c){if(!w||typeof w!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${w}`);S+=`
- ${w}`}y+=S}return`${_}
${y}`}class B extends Error{constructor({message:e,code:t,cause:i,name:r}){var o;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(o=r??(i instanceof Error?i.name:void 0))!==null&&o!==void 0?o:"Unknown Error",this.code=t}}class Is extends B{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function Rc({error:s,options:e}){var t,i,r;const{publicKey:o}=e;if(!o)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new B({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else if(s.name==="ConstraintError"){if(((t=o.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new B({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:s});if(e.mediation==="conditional"&&((i=o.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new B({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:s});if(((r=o.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new B({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:s})}else{if(s.name==="InvalidStateError")return new B({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:s});if(s.name==="NotAllowedError")return new B({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="NotSupportedError")return o.pubKeyCredParams.filter(a=>a.type==="public-key").length===0?new B({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:s}):new B({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:s});if(s.name==="SecurityError"){const n=window.location.hostname;if(_n(n)){if(o.rp.id!==n)return new B({message:`The RP ID "${o.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new B({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="TypeError"){if(o.user.id.byteLength<1||o.user.id.byteLength>64)return new B({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:s})}else if(s.name==="UnknownError")return new B({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new B({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}function Lc({error:s,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new B({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else{if(s.name==="NotAllowedError")return new B({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="SecurityError"){const i=window.location.hostname;if(_n(i)){if(t.rpId!==i)return new B({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new B({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="UnknownError")return new B({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new B({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}class Oc{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Pc=new Oc;function Dc(s){if(!s)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(s);const{challenge:e,user:t,excludeCredentials:i}=s,r=Ms(s,["challenge","user","excludeCredentials"]),o=kt(e).buffer,n=Object.assign(Object.assign({},t),{id:kt(t.id).buffer}),a=Object.assign(Object.assign({},r),{challenge:o,user:n});if(i&&i.length>0){a.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];a.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:kt(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return a}function Nc(s){if(!s)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(s);const{challenge:e,allowCredentials:t}=s,i=Ms(s,["challenge","allowCredentials"]),r=kt(e).buffer,o=Object.assign(Object.assign({},i),{challenge:r});if(t&&t.length>0){o.allowCredentials=new Array(t.length);for(let n=0;n<t.length;n++){const a=t[n];o.allowCredentials[n]=Object.assign(Object.assign({},a),{id:kt(a.id).buffer,type:a.type||"public-key",transports:a.transports})}}return o}function jc(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s;return{id:s.id,rawId:s.id,response:{attestationObject:ot(new Uint8Array(s.response.attestationObject)),clientDataJSON:ot(new Uint8Array(s.response.clientDataJSON))},type:"public-key",clientExtensionResults:s.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Mc(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s,i=s.getClientExtensionResults(),r=s.response;return{id:s.id,rawId:s.id,response:{authenticatorData:ot(new Uint8Array(r.authenticatorData)),clientDataJSON:ot(new Uint8Array(r.clientDataJSON)),signature:ot(new Uint8Array(r.signature)),userHandle:r.userHandle?ot(new Uint8Array(r.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function _n(s){return s==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(s)}function mo(){var s,e;return!!(K()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((s=navigator==null?void 0:navigator.credentials)===null||s===void 0?void 0:s.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Uc(s){try{const e=await navigator.credentials.create(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Is("Browser returned unexpected credential type",e)}:{data:null,error:new Is("Empty credential response",e)}}catch(e){return{data:null,error:Rc({error:e,options:s})}}}async function zc(s){try{const e=await navigator.credentials.get(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Is("Browser returned unexpected credential type",e)}:{data:null,error:new Is("Empty credential response",e)}}catch(e){return{data:null,error:Lc({error:e,options:s})}}}const Vc={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Bc={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Rs(...s){const e=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),t=r=>r instanceof ArrayBuffer||ArrayBuffer.isView(r),i={};for(const r of s)if(r)for(const o in r){const n=r[o];if(n!==void 0)if(Array.isArray(n))i[o]=n;else if(t(n))i[o]=n;else if(e(n)){const a=i[o];e(a)?i[o]=Rs(a,n):i[o]=Rs(n)}else i[o]=n}return i}function Fc(s,e){return Rs(Vc,s,e||{})}function qc(s,e){return Rs(Bc,s,e||{})}class Wc{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:i,signal:r},o){var n;try{const{data:a,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:l};const c=r??Pc.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:h}=a.webauthn.credential_options.publicKey;if(!h.name){const p=i;if(p)h.name=`${h.id}:${p}`;else{const u=(await this.client.getUser()).data.user,f=((n=u==null?void 0:u.user_metadata)===null||n===void 0?void 0:n.name)||(u==null?void 0:u.email)||(u==null?void 0:u.id)||"User";h.name=`${h.id}:${f}`}}h.displayName||(h.displayName=h.name)}switch(a.webauthn.type){case"create":{const h=Fc(a.webauthn.credential_options.publicKey,o==null?void 0:o.create),{data:p,error:d}=await Uc({publicKey:h,signal:c});return p?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:p}},error:null}:{data:null,error:d}}case"request":{const h=qc(a.webauthn.credential_options.publicKey,o==null?void 0:o.request),{data:p,error:d}=await zc(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:h,signal:c}));return p?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:p}},error:null}:{data:null,error:d}}}}catch(a){return $(a)?{data:null,error:a}:{data:null,error:new st("Unexpected error in challenge",a)}}}async _verify({challengeId:e,factorId:t,webauthn:i}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},o){if(!t)return{data:null,error:new os("rpId is required for WebAuthn authentication")};try{if(!mo())return{data:null,error:new st("Browser does not support WebAuthn",null)};const{data:n,error:a}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:i},signal:r},{request:o});if(!n)return{data:null,error:a};const{webauthn:l}=n;return this._verify({factorId:e,challengeId:n.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:i,credential_response:l.credential_response}})}catch(n){return $(n)?{data:null,error:n}:{data:null,error:new st("Unexpected error in authenticate",n)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},o){if(!t)return{data:null,error:new os("rpId is required for WebAuthn registration")};try{if(!mo())return{data:null,error:new st("Browser does not support WebAuthn",null)};const{data:n,error:a}=await this._enroll({friendlyName:e});if(!n)return await this.client.mfa.listFactors().then(h=>{var p;return(p=h.data)===null||p===void 0?void 0:p.all.find(d=>d.factor_type==="webauthn"&&d.friendly_name===e&&d.status!=="unverified")}).then(h=>h?this.client.mfa.unenroll({factorId:h==null?void 0:h.id}):void 0),{data:null,error:a};const{data:l,error:c}=await this._challenge({factorId:n.id,friendlyName:n.friendly_name,webauthn:{rpId:t,rpOrigins:i},signal:r},{create:o});return l?this._verify({factorId:n.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(n){return $(n)?{data:null,error:n}:{data:null,error:new st("Unexpected error in register",n)}}}}Cc();const Hc={url:Bl,storageKey:Fl,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:ql,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function vo(s,e,t){return await t()}const ft={};class ns{get jwks(){var e,t;return(t=(e=ft[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){ft[this.storageKey]=Object.assign(Object.assign({},ft[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=ft[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){ft[this.storageKey]=Object.assign(Object.assign({},ft[this.storageKey]),{cachedAt:e})}constructor(e){var t,i,r;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const o=Object.assign(Object.assign({},Hc),e);if(this.storageKey=o.storageKey,this.instanceID=(t=ns.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,ns.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!o.debug,typeof o.debug=="function"&&(this.logger=o.debug),this.instanceID>0&&K()){const n=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(n),this.logDebugMessages&&console.trace(n)}if(this.persistSession=o.persistSession,this.autoRefreshToken=o.autoRefreshToken,this.admin=new $c({url:o.url,headers:o.headers,fetch:o.fetch}),this.url=o.url,this.headers=o.headers,this.fetch=vn(o.fetch),this.lock=o.lock||vo,this.detectSessionInUrl=o.detectSessionInUrl,this.flowType=o.flowType,this.hasCustomAuthorizationHeader=o.hasCustomAuthorizationHeader,this.throwOnError=o.throwOnError,this.lockAcquireTimeout=o.lockAcquireTimeout,o.lock?this.lock=o.lock:this.persistSession&&K()&&(!((i=globalThis==null?void 0:globalThis.navigator)===null||i===void 0)&&i.locks)?this.lock=Ec:this.lock=vo,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Wc(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(o.storage?this.storage=o.storage:mn()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=fo(this.memoryStorage)),o.userStorage&&(this.userStorage=o.userStorage)):(this.memoryStorage={},this.storage=fo(this.memoryStorage)),K()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(n){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",n)}(r=this.broadcastChannel)===null||r===void 0||r.addEventListener("message",async n=>{this._debug("received broadcast notification from other tab or client",n);try{await this._notifyAllSubscribers(n.data.event,n.data.session,!1)}catch(a){this._debug("#broadcastChannel","error",a)}})}o.skipAutoInitialize||this.initialize().catch(n=>{this._debug("#initialize()","error",n)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${un}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},i="none";if(K()&&(t=rc(window.location.href),this._isImplicitGrantCallback(t)?i="implicit":await this._isPKCECallback(t)&&(i="pkce")),K()&&this.detectSessionInUrl&&i!=="none"){const{data:r,error:o}=await this._getSessionFromURL(t,i);if(o){if(this._debug("#_initialize()","error detecting session from URL",o),Gl(o)){const l=(e=o.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:o}}return{error:o}}const{session:n,redirectType:a}=r;return this._debug("#_initialize()","detected session in URL",n,"redirect type",a),await this._saveSession(n),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",n):await this._notifyAllSubscribers("SIGNED_IN",n)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return $(t)?this._returnResult({error:t}):this._returnResult({error:new st("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,i,r;try{const o=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}},xform:fe}),{data:n,error:a}=o;if(a||!n)return this._returnResult({data:{user:null,session:null},error:a});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(o){if($(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signUp(e){var t,i,r;try{let o;if("email"in e){const{email:h,password:p,options:d}=e;let u=null,f=null;this.flowType==="pkce"&&([u,f]=await ut(this.storage,this.storageKey)),o=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:h,password:p,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:u,code_challenge_method:f},xform:fe})}else if("phone"in e){const{phone:h,password:p,options:d}=e;o=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:p,data:(i=d==null?void 0:d.data)!==null&&i!==void 0?i:{},channel:(r=d==null?void 0:d.channel)!==null&&r!==void 0?r:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:fe})}else throw new bs("You must provide either an email or phone number and a password");const{data:n,error:a}=o;if(a||!n)return await H(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:a});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signInWithPassword(e){try{let t;if("email"in e){const{email:o,password:n,options:a}=e;t=await x(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:o,password:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:uo})}else if("phone"in e){const{phone:o,password:n,options:a}=e;t=await x(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:o,password:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:uo})}else throw new bs("You must provide either an email or phone number and a password");const{data:i,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!i||!i.session||!i.user){const o=new ht;return this._returnResult({data:{user:null,session:null},error:o})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:r})}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,i,r,o;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(r=e.options)===null||r===void 0?void 0:r.queryParams,skipBrowserRedirect:(o=e.options)===null||o===void 0?void 0:o.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,i,r,o,n,a,l,c,h,p,d;let u,f;if("message"in e)u=e.message,f=e.signature;else{const{chain:v,wallet:_,statement:y,options:S}=e;let w;if(K())if(typeof _=="object")w=_;else{const V=window;if("ethereum"in V&&typeof V.ethereum=="object"&&"request"in V.ethereum&&typeof V.ethereum.request=="function")w=V.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof _!="object"||!(S!=null&&S.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");w=_}const k=new URL((t=S==null?void 0:S.url)!==null&&t!==void 0?t:window.location.href),R=await w.request({method:"eth_requestAccounts"}).then(V=>V).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!R||R.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const T=bn(R[0]);let L=(i=S==null?void 0:S.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!L){const V=await w.request({method:"eth_chainId"});L=Tc(V)}const q={domain:k.host,address:T,statement:y,uri:k.href,version:"1",chainId:L,nonce:(r=S==null?void 0:S.signInWithEthereum)===null||r===void 0?void 0:r.nonce,issuedAt:(n=(o=S==null?void 0:S.signInWithEthereum)===null||o===void 0?void 0:o.issuedAt)!==null&&n!==void 0?n:new Date,expirationTime:(a=S==null?void 0:S.signInWithEthereum)===null||a===void 0?void 0:a.expirationTime,notBefore:(l=S==null?void 0:S.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=S==null?void 0:S.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(h=S==null?void 0:S.signInWithEthereum)===null||h===void 0?void 0:h.resources};u=Ic(q),f=await w.request({method:"personal_sign",params:[Ac(u),T]})}try{const{data:v,error:_}=await x(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:u,signature:f},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(d=e.options)===null||d===void 0?void 0:d.captchaToken}}:null),xform:fe});if(_)throw _;if(!v||!v.session||!v.user){const y=new ht;return this._returnResult({data:{user:null,session:null},error:y})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:_})}catch(v){if($(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async signInWithSolana(e){var t,i,r,o,n,a,l,c,h,p,d,u;let f,v;if("message"in e)f=e.message,v=e.signature;else{const{chain:_,wallet:y,statement:S,options:w}=e;let k;if(K())if(typeof y=="object")k=y;else{const T=window;if("solana"in T&&typeof T.solana=="object"&&("signIn"in T.solana&&typeof T.solana.signIn=="function"||"signMessage"in T.solana&&typeof T.solana.signMessage=="function"))k=T.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(w!=null&&w.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=y}const R=new URL((t=w==null?void 0:w.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in k&&k.signIn){const T=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},w==null?void 0:w.signInWithSolana),{version:"1",domain:R.host,uri:R.href}),S?{statement:S}:null));let L;if(Array.isArray(T)&&T[0]&&typeof T[0]=="object")L=T[0];else if(T&&typeof T=="object"&&"signedMessage"in T&&"signature"in T)L=T;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in L&&"signature"in L&&(typeof L.signedMessage=="string"||L.signedMessage instanceof Uint8Array)&&L.signature instanceof Uint8Array)f=typeof L.signedMessage=="string"?L.signedMessage:new TextDecoder().decode(L.signedMessage),v=L.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");f=[`${R.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),...S?["",S,""]:[""],"Version: 1",`URI: ${R.href}`,`Issued At: ${(r=(i=w==null?void 0:w.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&r!==void 0?r:new Date().toISOString()}`,...!((o=w==null?void 0:w.signInWithSolana)===null||o===void 0)&&o.notBefore?[`Not Before: ${w.signInWithSolana.notBefore}`]:[],...!((n=w==null?void 0:w.signInWithSolana)===null||n===void 0)&&n.expirationTime?[`Expiration Time: ${w.signInWithSolana.expirationTime}`]:[],...!((a=w==null?void 0:w.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${w.signInWithSolana.chainId}`]:[],...!((l=w==null?void 0:w.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${w.signInWithSolana.nonce}`]:[],...!((c=w==null?void 0:w.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${w.signInWithSolana.requestId}`]:[],...!((p=(h=w==null?void 0:w.signInWithSolana)===null||h===void 0?void 0:h.resources)===null||p===void 0)&&p.length?["Resources",...w.signInWithSolana.resources.map(L=>`- ${L}`)]:[]].join(`
`);const T=await k.signMessage(new TextEncoder().encode(f),"utf8");if(!T||!(T instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");v=T}}try{const{data:_,error:y}=await x(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:f,signature:ot(v)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(u=e.options)===null||u===void 0?void 0:u.captchaToken}}:null),xform:fe});if(y)throw y;if(!_||!_.session||!_.user){const S=new ht;return this._returnResult({data:{user:null,session:null},error:S})}return _.session&&(await this._saveSession(_.session),await this._notifyAllSubscribers("SIGNED_IN",_.session)),this._returnResult({data:Object.assign({},_),error:y})}catch(_){if($(_))return this._returnResult({data:{user:null,session:null},error:_});throw _}}async _exchangeCodeForSession(e){const t=await Qe(this.storage,`${this.storageKey}-code-verifier`),[i,r]=(t??"").split("/");try{if(!i&&this.flowType==="pkce")throw new Yl;const{data:o,error:n}=await x(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:i},xform:fe});if(await H(this.storage,`${this.storageKey}-code-verifier`),n)throw n;if(!o||!o.session||!o.user){const a=new ht;return this._returnResult({data:{user:null,session:null,redirectType:null},error:a})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",o.session)),this._returnResult({data:Object.assign(Object.assign({},o),{redirectType:r??null}),error:n})}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(o))return this._returnResult({data:{user:null,session:null,redirectType:null},error:o});throw o}}async signInWithIdToken(e){try{const{options:t,provider:i,token:r,access_token:o,nonce:n}=e,a=await x(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:r,access_token:o,nonce:n,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:fe}),{data:l,error:c}=a;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const h=new ht;return this._returnResult({data:{user:null,session:null},error:h})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,i,r,o,n;try{if("email"in e){const{email:a,options:l}=e;let c=null,h=null;this.flowType==="pkce"&&([c,h]=await ut(this.storage,this.storageKey));const{error:p}=await x(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:h},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:p})}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:h}=await x(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(o=l==null?void 0:l.shouldCreateUser)!==null&&o!==void 0?o:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(n=l==null?void 0:l.channel)!==null&&n!==void 0?n:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:h})}throw new bs("You must provide either an email or phone number.")}catch(a){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async verifyOtp(e){var t,i;try{let r,o;"options"in e&&(r=(t=e.options)===null||t===void 0?void 0:t.redirectTo,o=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:n,error:a}=await x(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:o}}),redirectTo:r,xform:fe});if(a)throw a;if(!n)throw new Error("An error occurred on token verification.");const l=n.session,c=n.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(r){if($(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithSSO(e){var t,i,r,o,n;try{let a=null,l=null;this.flowType==="pkce"&&([a,l]=await ut(this.storage,this.storageKey));const c=await x(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&i!==void 0?i:void 0}),!((r=e==null?void 0:e.options)===null||r===void 0)&&r.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:a,code_challenge_method:l}),headers:this.headers,xform:wc});return!((o=c.data)===null||o===void 0)&&o.url&&K()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(a){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(a))return this._returnResult({data:null,error:a});throw a}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)throw i;if(!t)throw new se;const{error:r}=await x(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if($(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:i,type:r,options:o}=e,{error:n}=await x(this.fetch,"POST",t,{headers:this.headers,body:{email:i,type:r,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},redirectTo:o==null?void 0:o.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:n})}else if("phone"in e){const{phone:i,type:r,options:o}=e,{data:n,error:a}=await x(this.fetch,"POST",t,{headers:this.headers,body:{phone:i,type:r,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:n==null?void 0:n.message_id},error:a})}throw new bs("You must provide either an email or phone number and a type")}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await i,await t()))();return this.pendingInLock.push((async()=>{try{await r}catch{}})()),r}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=t();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const r=[...this.pendingInLock];await Promise.all(r),this.pendingInLock.splice(0,r.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Qe(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<ri:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const n=await Qe(this.userStorage,this.storageKey+"-user");n!=null&&n.user?e.user=n.user:e.user=ai()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const n={value:this.suppressGetSessionWarning};e.user=gc(e.user,n),n.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:r,error:o}=await this._callRefreshToken(e.refresh_token);return o?this._returnResult({data:{session:null},error:o}):this._returnResult({data:{session:r},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await x(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Fe}):await this._useSession(async t=>{var i,r,o;const{data:n,error:a}=t;if(a)throw a;return!(!((i=n.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new se}:await x(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(o=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&o!==void 0?o:void 0,xform:Fe})})}catch(t){if($(t))return oi(t)&&(await this._removeSession(),await H(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async i=>{const{data:r,error:o}=i;if(o)throw o;if(!r.session)throw new se;const n=r.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await ut(this.storage,this.storageKey));const{data:c,error:h}=await x(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:n.access_token,xform:Fe});if(h)throw h;return n.user=c.user,await this._saveSession(n),await this._notifyAllSubscribers("USER_UPDATED",n),this._returnResult({data:{user:n.user},error:null})})}catch(i){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new se;const t=Date.now()/1e3;let i=t,r=!0,o=null;const{payload:n}=ys(e.access_token);if(n.exp&&(i=n.exp,r=i<=t),r){const{data:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!a)return{data:{user:null,session:null},error:null};o=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});o={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:i-t,expires_at:i},await this._saveSession(o),await this._notifyAllSubscribers("SIGNED_IN",o)}return this._returnResult({data:{user:o.user,session:o},error:null})}catch(t){if($(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var i;if(!e){const{data:n,error:a}=t;if(a)throw a;e=(i=n.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new se;const{data:r,error:o}=await this._callRefreshToken(e.refresh_token);return o?this._returnResult({data:{user:null,session:null},error:o}):r?this._returnResult({data:{user:r.user,session:r},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if($(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!K())throw new _s("No browser detected.");if(e.error||e.error_description||e.error_code)throw new _s(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new ro("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new _s("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new ro("No code detected.");const{data:S,error:w}=await this._exchangeCodeForSession(e.code);if(w)throw w;const k=new URL(window.location.href);return k.searchParams.delete("code"),window.history.replaceState(window.history.state,"",k.toString()),{data:{session:S.session,redirectType:null},error:null}}const{provider_token:i,provider_refresh_token:r,access_token:o,refresh_token:n,expires_in:a,expires_at:l,token_type:c}=e;if(!o||!a||!n||!c)throw new _s("No session defined in URL");const h=Math.round(Date.now()/1e3),p=parseInt(a);let d=h+p;l&&(d=parseInt(l));const u=d-h;u*1e3<=_t&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${u}s, should have been closer to ${p}s`);const f=d-p;h-f>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",f,d,h):h-f<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",f,d,h);const{data:v,error:_}=await this._getUser(o);if(_)throw _;const y={provider_token:i,provider_refresh_token:r,access_token:o,expires_in:p,expires_at:d,refresh_token:n,token_type:c,user:v.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:y,redirectType:e.type},error:null})}catch(i){if($(i))return this._returnResult({data:{session:null,redirectType:null},error:i});throw i}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await Qe(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var i;const{data:r,error:o}=t;if(o&&!oi(o))return this._returnResult({error:o});const n=(i=r.session)===null||i===void 0?void 0:i.access_token;if(n){const{error:a}=await this.admin.signOut(n,e);if(a&&!(Jl(a)&&(a.status===404||a.status===401||a.status===403)||oi(a)))return this._returnResult({error:a})}return e!=="others"&&(await this._removeSession(),await H(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=ic(),i={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,i),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async t=>{var i,r;try{const{data:{session:o},error:n}=t;if(n)throw n;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",o)),this._debug("INITIAL_SESSION","callback id",e,"session",o)}catch(o){await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",o),console.error(o)}})}async resetPasswordForEmail(e,t={}){let i=null,r=null;this.flowType==="pkce"&&([i,r]=await ut(this.storage,this.storageKey,!0));try{return await x(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(o))return this._returnResult({data:null,error:o});throw o}}async getUserIdentities(){var e;try{const{data:t,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:i,error:r}=await this._useSession(async o=>{var n,a,l,c,h;const{data:p,error:d}=o;if(d)throw d;const u=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(n=e.options)===null||n===void 0?void 0:n.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await x(this.fetch,"GET",u,{headers:this.headers,jwt:(h=(c=p.session)===null||c===void 0?void 0:c.access_token)!==null&&h!==void 0?h:void 0})});if(r)throw r;return K()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(i==null?void 0:i.url),this._returnResult({data:{provider:e.provider,url:i==null?void 0:i.url},error:null})}catch(i){if($(i))return this._returnResult({data:{provider:e.provider,url:null},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var i;try{const{error:r,data:{session:o}}=t;if(r)throw r;const{options:n,provider:a,token:l,access_token:c,nonce:h}=e,p=await x(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=o==null?void 0:o.access_token)!==null&&i!==void 0?i:void 0,body:{provider:a,id_token:l,access_token:c,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:fe}),{data:d,error:u}=p;return u?this._returnResult({data:{user:null,session:null},error:u}):!d||!d.session||!d.user?this._returnResult({data:{user:null,session:null},error:new ht}):(d.session&&(await this._saveSession(d.session),await this._notifyAllSubscribers("USER_UPDATED",d.session)),this._returnResult({data:d,error:u}))}catch(r){if(await H(this.storage,`${this.storageKey}-code-verifier`),$(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var i,r;const{data:o,error:n}=t;if(n)throw n;return await x(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const i=Date.now();return await ac(async r=>(r>0&&await nc(200*Math.pow(2,r-1)),this._debug(t,"refreshing attempt",r),await x(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:fe})),(r,o)=>{const n=200*Math.pow(2,r);return o&&ni(o)&&Date.now()+n-i<_t})}catch(i){if(this._debug(t,"error",i),$(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const i=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",i),K()&&!t.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i},error:null}}async _recoverAndRefresh(){var e,t;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const r=await Qe(this.storage,this.storageKey);if(r&&this.userStorage){let n=await Qe(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!n&&(n={user:r.user},await yt(this.userStorage,this.storageKey+"-user",n)),r.user=(e=n==null?void 0:n.user)!==null&&e!==void 0?e:ai()}else if(r&&!r.user&&!r.user){const n=await Qe(this.storage,this.storageKey+"-user");n&&(n!=null&&n.user)?(r.user=n.user,await H(this.storage,this.storageKey+"-user"),await yt(this.storage,this.storageKey,r)):r.user=ai()}if(this._debug(i,"session from storage",r),!this._isValidSession(r)){this._debug(i,"session is not valid"),r!==null&&await this._removeSession();return}const o=((t=r.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<ri;if(this._debug(i,`session has${o?"":" not"} expired with margin of ${ri}s`),o){if(this.autoRefreshToken&&r.refresh_token){const{error:n}=await this._callRefreshToken(r.refresh_token);n&&(console.error(n),ni(n)||(this._debug(i,"refresh failed with a non-retryable error, removing the session",n),await this._removeSession()))}}else if(r.user&&r.user.__isUserNotAvailableProxy===!0)try{const{data:n,error:a}=await this._getUser(r.access_token);!a&&(n!=null&&n.user)?(r.user=n.user,await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(n){console.error("Error getting user data:",n),this._debug(i,"error getting user data, skipping SIGNED_IN notification",n)}else await this._notifyAllSubscribers("SIGNED_IN",r)}catch(r){this._debug(i,"error",r),console.error(r);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var t,i;if(!e)throw new se;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const r=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(r,"begin");try{this.refreshingDeferred=new Vs;const{data:o,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!o.session)throw new se;await this._saveSession(o.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",o.session);const a={data:o.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(o){if(this._debug(r,"error",o),$(o)){const n={data:null,error:o};return ni(o)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(n),n}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(o),o}finally{this.refreshingDeferred=null,this._debug(r,"end")}}async _notifyAllSubscribers(e,t,i=!0){const r=`#_notifyAllSubscribers(${e})`;this._debug(r,"begin",t,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:t});const o=[],n=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){o.push(l)}});if(await Promise.all(n),o.length>0){for(let a=0;a<o.length;a+=1)console.error(o[a]);throw o[0]}}finally{this._debug(r,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await H(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),i=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&t.user&&await yt(this.userStorage,this.storageKey+"-user",{user:t.user});const r=Object.assign({},t);delete r.user;const o=co(r);await yt(this.storage,this.storageKey,o)}else{const r=co(t);await yt(this.storage,this.storageKey,r)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await H(this.storage,this.storageKey),await H(this.storage,this.storageKey+"-code-verifier"),await H(this.storage,this.storageKey+"-user"),this.userStorage&&await H(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&K()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),_t);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((i.expires_at*1e3-e)/_t);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${_t}ms, refresh threshold is ${Ci} ticks`),r<=Ci&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof gn)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!K()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,i){const r=[`provider=${encodeURIComponent(t)}`];if(i!=null&&i.redirectTo&&r.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),i!=null&&i.scopes&&r.push(`scopes=${encodeURIComponent(i.scopes)}`),this.flowType==="pkce"){const[o,n]=await ut(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(o)}`,code_challenge_method:`${encodeURIComponent(n)}`});r.push(a.toString())}if(i!=null&&i.queryParams){const o=new URLSearchParams(i.queryParams);r.push(o.toString())}return i!=null&&i.skipBrowserRedirect&&r.push(`skip_http_redirect=${i.skipBrowserRedirect}`),`${e}?${r.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var i;const{data:r,error:o}=t;return o?this._returnResult({data:null,error:o}):await x(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var i,r;const{data:o,error:n}=t;if(n)return this._returnResult({data:null,error:n});const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await x(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(i=o==null?void 0:o.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((r=l==null?void 0:l.totp)===null||r===void 0)&&r.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var i;const{data:r,error:o}=t;if(o)return this._returnResult({data:null,error:o});const n=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?jc(e.webauthn.credential_response):Mc(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:l}=await x(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:n,headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",a),this._returnResult({data:a,error:l}))})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var i;const{data:r,error:o}=t;if(o)return this._returnResult({data:null,error:o});const n=await x(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token});if(n.error)return n;const{data:a}=n;if(a.type!=="webauthn")return{data:a,error:null};switch(a.webauthn.type){case"create":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Dc(a.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Nc(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:i}=await this.getUser();if(i)return{data:null,error:i};const r={all:[],phone:[],totp:[],webauthn:[]};for(const o of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])r.all.push(o),o.status==="verified"&&r[o.factor_type].push(o);return{data:r,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,i,r,o;if(e)try{const{payload:u}=ys(e);let f=null;u.aal&&(f=u.aal);let v=f;const{data:{user:_},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((i=(t=_==null?void 0:_.factors)===null||t===void 0?void 0:t.filter(k=>k.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(v="aal2");const w=u.amr||[];return{data:{currentLevel:f,nextLevel:v,currentAuthenticationMethods:w},error:null}}catch(u){if($(u))return this._returnResult({data:null,error:u});throw u}const{data:{session:n},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!n)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=ys(n.access_token);let c=null;l.aal&&(c=l.aal);let h=c;((o=(r=n.user.factors)===null||r===void 0?void 0:r.filter(u=>u.status==="verified"))!==null&&o!==void 0?o:[]).length>0&&(h="aal2");const d=l.amr||[];return{data:{currentLevel:c,nextLevel:h,currentAuthenticationMethods:d},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;return r?this._returnResult({data:null,error:r}):i?await x(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:o=>({data:o,error:null})}):this._returnResult({data:null,error:new se})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:r},error:o}=i;if(o)return this._returnResult({data:null,error:o});if(!r)return this._returnResult({data:null,error:new se});const n=await x(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"approve"},xform:a=>({data:a,error:null})});return n.data&&n.data.redirect_url&&K()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if($(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:r},error:o}=i;if(o)return this._returnResult({data:null,error:o});if(!r)return this._returnResult({data:null,error:new se});const n=await x(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"deny"},xform:a=>({data:a,error:null})});return n.data&&n.data.redirect_url&&K()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if($(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;return i?this._returnResult({data:null,error:i}):t?await x(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:r=>({data:r,error:null})}):this._returnResult({data:null,error:new se})})}catch(e){if($(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;return r?this._returnResult({data:null,error:r}):i?(await x(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new se})})}catch(t){if($(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let i=t.keys.find(a=>a.kid===e);if(i)return i;const r=Date.now();if(i=this.jwks.keys.find(a=>a.kid===e),i&&this.jwks_cached_at+Hl>r)return i;const{data:o,error:n}=await x(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(n)throw n;return!o.keys||o.keys.length===0||(this.jwks=o,this.jwks_cached_at=r,i=o.keys.find(a=>a.kid===e),!i)?null:i}async getClaims(e,t={}){try{let i=e;if(!i){const{data:u,error:f}=await this.getSession();if(f||!u.session)return this._returnResult({data:null,error:f});i=u.session.access_token}const{header:r,payload:o,signature:n,raw:{header:a,payload:l}}=ys(i);t!=null&&t.allowExpired||fc(o.exp);const c=!r.alg||r.alg.startsWith("HS")||!r.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(r.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:u}=await this.getUser(i);if(u)throw u;return{data:{claims:o,header:r,signature:n},error:null}}const h=mc(r.alg),p=await crypto.subtle.importKey("jwk",c,h,!0,["verify"]);if(!await crypto.subtle.verify(h,p,n,tc(`${a}.${l}`)))throw new Ii("Invalid JWT signature");return{data:{claims:o,header:r,signature:n},error:null}}catch(i){if($(i))return this._returnResult({data:null,error:i});throw i}}}ns.nextInstanceID={};const Kc=ns,Jc="2.99.1";let Ht="";typeof Deno<"u"?Ht="deno":typeof document<"u"?Ht="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Ht="react-native":Ht="node";const Gc={"X-Client-Info":`supabase-js-${Ht}/${Jc}`},Yc={headers:Gc},Zc={schema:"public"},Xc={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Qc={};function as(s){"@babel/helpers - typeof";return as=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},as(s)}function ed(s,e){if(as(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(as(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function td(s){var e=ed(s,"string");return as(e)=="symbol"?e:e+""}function sd(s,e,t){return(e=td(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function go(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function U(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?go(Object(t),!0).forEach(function(i){sd(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):go(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}const id=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),rd=()=>Headers,od=(s,e,t)=>{const i=id(t),r=rd();return async(o,n)=>{var a;const l=(a=await e())!==null&&a!==void 0?a:s;let c=new r(n==null?void 0:n.headers);return c.has("apikey")||c.set("apikey",s),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),i(o,U(U({},n),{},{headers:c}))}};function nd(s){return s.endsWith("/")?s:s+"/"}function ad(s,e){var t,i;const{db:r,auth:o,realtime:n,global:a}=s,{db:l,auth:c,realtime:h,global:p}=e,d={db:U(U({},l),r),auth:U(U({},c),o),realtime:U(U({},h),n),storage:{},global:U(U(U({},p),a),{},{headers:U(U({},(t=p==null?void 0:p.headers)!==null&&t!==void 0?t:{}),(i=a==null?void 0:a.headers)!==null&&i!==void 0?i:{})}),accessToken:async()=>""};return s.accessToken?d.accessToken=s.accessToken:delete d.accessToken,d}function ld(s){const e=s==null?void 0:s.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(nd(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var cd=class extends Kc{constructor(s){super(s)}},dd=class{constructor(s,e,t){var i,r;this.supabaseUrl=s,this.supabaseKey=e;const o=ld(s);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const n=`sb-${o.hostname.split(".")[0]}-auth-token`,a={db:Zc,realtime:Qc,auth:U(U({},Xc),{},{storageKey:n}),global:Yc},l=ad(t??{},a);if(this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=l.global.headers)!==null&&r!==void 0?r:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(h,p)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=od(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(U({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(h=>this.realtime.setAuth(h)).catch(h=>console.warn("Failed to set initial Realtime auth token:",h)),this.rest=new Ja(new URL("rest/v1",o).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Vl(this.storageUrl.href,this.headers,this.fetch,t==null?void 0:t.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new za(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(s){return this.rest.from(s)}schema(s){return this.rest.schema(s)}rpc(s,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(s,e,t)}channel(s,e={config:{}}){return this.realtime.channel(s,e)}getChannels(){return this.realtime.getChannels()}removeChannel(s){return this.realtime.removeChannel(s)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var s=this,e,t;if(s.accessToken)return await s.accessToken();const{data:i}=await s.auth.getSession();return(e=(t=i.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:s.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:s,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:r,storageKey:o,flowType:n,lock:a,debug:l,throwOnError:c},h,p){const d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new cd({url:this.authUrl.href,headers:U(U({},d),h),storageKey:o,autoRefreshToken:s,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:r,flowType:n,lock:a,debug:l,throwOnError:c,fetch:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(u=>u.toLowerCase()==="authorization")})}_initRealtimeClient(s){return new hl(this.realtimeUrl.href,U(U({},s),{},{params:U(U({},{apikey:this.supabaseKey}),s==null?void 0:s.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((s,e)=>{this._handleTokenChanged(s,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(s,e,t){(s==="TOKEN_REFRESHED"||s==="SIGNED_IN")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):s==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const hd=(s,e,t)=>new dd(s,e,t);function ud(){if(typeof window<"u")return!1;const s=globalThis.process;if(!s)return!1;const e=s.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=18:!1}ud()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const fr=hd("https://wasdctencljkzoefqznp.supabase.co","sb_publishable_y5Zitl8WdJZIQzf95Vi8XA_K1jYgB3E");function pd(){const s="ll_client_id";let e=localStorage.getItem(s);return e||(e=crypto.randomUUID(),localStorage.setItem(s,e)),e}function fd(){const s="ll_session_id";let e=sessionStorage.getItem(s);return e||(e=crypto.randomUUID(),sessionStorage.setItem(s,e)),e}async function yn(s,e={}){const t={event_type:s,session_id:fd(),...e},{error:i}=await fr.from("events").insert(t);i&&console.warn("analytics logEvent failed:",i.message)}function md(){yn("session_start",{client_id:pd()})}function bo(s){yn("video_load",{video_id:s})}const vd="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let gd=(s=21)=>{let e="",t=crypto.getRandomValues(new Uint8Array(s|=0));for(;s--;)e+=vd[t[s]&63];return e};function _o(s){const e=new URL(window.location.href);return e.search="",e.hash="",e.searchParams.set("share",s),e.toString()}function bd(){return new URLSearchParams(window.location.search).get("share")}function _d(s){const e=s.loops.find(t=>t.is_scratch);return{schema_version:At,videoUrl:s.url,videoTitle:s.name||null,sections:s.sections,namedLoops:s.loops.filter(t=>!t.is_scratch),marks:s.marks,chapters:s.chapters,speed:s.speed,start:s.start,end:s.end,looping:s.looping??!1,scratchLoop:e?{start:e.start,end:e.end}:null}}function yd(s,e,t,i=""){return{schema_version:At,videoUrl:s.url,videoTitle:s.name||null,loop:{name:i,start:e,end:t},speed:s.speed}}async function yo(s,e,t=null,i=null){const r=gd(10),o={id:r,share_type:s,payload:e,video_url:t,video_title:i},{error:n}=await fr.from("shares").insert(o);if(n)throw new Error(`createShare failed: ${n.message}`);return r}async function wd(s){const{data:e,error:t}=await fr.from("shares").select("*").eq("id",s).single();if(t)throw new Error(`fetchShare failed: ${t.message}`);return e}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Sd=(s,e)=>(s==null?void 0:s._$litType$)!==void 0,wn=s=>s.strings===void 0,kd={},$d=(s,e=kd)=>s._$AH=e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ve={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},mr=s=>(...e)=>({_$litDirective$:s,values:e});let vr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zt=(s,e)=>{var i;const t=s._$AN;if(t===void 0)return!1;for(const r of t)(i=r._$AO)==null||i.call(r,e,!1),Zt(r,e);return!0},Ls=s=>{let e,t;do{if((e=s._$AM)===void 0)break;t=e._$AN,t.delete(s),s=e}while((t==null?void 0:t.size)===0)},Sn=s=>{for(let e;e=s._$AM;s=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(s))break;t.add(s),Cd(e)}};function xd(s){this._$AN!==void 0?(Ls(this),this._$AM=s,Sn(this)):this._$AM=s}function Ed(s,e=!1,t=0){const i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(i))for(let o=t;o<i.length;o++)Zt(i[o],!1),Ls(i[o]);else i!=null&&(Zt(i,!1),Ls(i));else Zt(this,s)}const Cd=s=>{s.type==Ve.CHILD&&(s._$AP??(s._$AP=Ed),s._$AQ??(s._$AQ=xd))};class Td extends vr{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),Sn(this),this.isConnected=e._$AU}_$AO(e,t=!0){var i,r;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(r=this.disconnected)==null||r.call(this)),t&&(Zt(this,e),Ls(this))}setValue(e){if(wn(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=()=>new Ad;class Ad{}const ci=new WeakMap,ke=mr(class extends Td{render(s){return z}update(s,[e]){var i;const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=(i=s.options)==null?void 0:i.host,this.rt(this.ct=s.element)),z}rt(s){if(this.isConnected||(s=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=ci.get(e);t===void 0&&(t=new WeakMap,ci.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,s),s!==void 0&&this.G.call(this.ht,s)}else this.G.value=s}get lt(){var s,e;return typeof this.G=="function"?(s=ci.get(this.ht??globalThis))==null?void 0:s.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var kn=Object.defineProperty,Id=Object.defineProperties,Rd=Object.getOwnPropertyDescriptor,Ld=Object.getOwnPropertyDescriptors,wo=Object.getOwnPropertySymbols,Od=Object.prototype.hasOwnProperty,Pd=Object.prototype.propertyIsEnumerable,di=(s,e)=>(e=Symbol[s])?e:Symbol.for("Symbol."+s),gr=s=>{throw TypeError(s)},So=(s,e,t)=>e in s?kn(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,ct=(s,e)=>{for(var t in e||(e={}))Od.call(e,t)&&So(s,t,e[t]);if(wo)for(var t of wo(e))Pd.call(e,t)&&So(s,t,e[t]);return s},Bs=(s,e)=>Id(s,Ld(e)),m=(s,e,t,i)=>{for(var r=i>1?void 0:i?Rd(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&kn(e,t,r),r},$n=(s,e,t)=>e.has(s)||gr("Cannot "+t),Dd=(s,e,t)=>($n(s,e,"read from private field"),e.get(s)),Nd=(s,e,t)=>e.has(s)?gr("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t),jd=(s,e,t,i)=>($n(s,e,"write to private field"),e.set(s,t),t),Md=function(s,e){this[0]=s,this[1]=e},Ud=s=>{var e=s[di("asyncIterator")],t=!1,i,r={};return e==null?(e=s[di("iterator")](),i=o=>r[o]=n=>e[o](n)):(e=e.call(s),i=o=>r[o]=n=>{if(t){if(t=!1,o==="throw")throw n;return n}return t=!0,{done:!1,value:new Md(new Promise(a=>{var l=e[o](n);l instanceof Object||gr("Object expected"),a(l)}),1)}}),r[di("iterator")]=()=>r,i("next"),"throw"in e?i("throw"):r.throw=o=>{throw o},"return"in e&&i("return"),r};function*br(s=document.activeElement){s!=null&&(yield s,"shadowRoot"in s&&s.shadowRoot&&s.shadowRoot.mode!=="closed"&&(yield*Ud(br(s.shadowRoot.activeElement))))}function xn(){return[...br()].pop()}var ko=new WeakMap;function En(s){let e=ko.get(s);return e||(e=window.getComputedStyle(s,null),ko.set(s,e)),e}function zd(s){if(typeof s.checkVisibility=="function")return s.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=En(s);return e.visibility!=="hidden"&&e.display!=="none"}function Vd(s){const e=En(s),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:s.scrollHeight>s.clientHeight&&t==="auto"||s.scrollWidth>s.clientWidth&&i==="auto"}function Bd(s){const e=s.tagName.toLowerCase(),t=Number(s.getAttribute("tabindex"));if(s.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||s.hasAttribute("disabled")||s.closest("[inert]"))return!1;if(e==="input"&&s.getAttribute("type")==="radio"){const o=s.getRootNode(),n=`input[type='radio'][name="${s.getAttribute("name")}"]`,a=o.querySelector(`${n}:checked`);return a?a===s:o.querySelector(n)===s}return zd(s)?(e==="audio"||e==="video")&&s.hasAttribute("controls")||s.hasAttribute("tabindex")||s.hasAttribute("contenteditable")&&s.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Vd(s):!1}function Fd(s){var e,t;const i=Ri(s),r=(e=i[0])!=null?e:null,o=(t=i[i.length-1])!=null?t:null;return{start:r,end:o}}function qd(s,e){var t;return((t=s.getRootNode({composed:!0}))==null?void 0:t.host)!==e}function Ri(s){const e=new WeakMap,t=[];function i(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||e.has(r))return;e.set(r,!0),!t.includes(r)&&Bd(r)&&t.push(r),r instanceof HTMLSlotElement&&qd(r,s)&&r.assignedElements({flatten:!0}).forEach(o=>{i(o)}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&i(r.shadowRoot)}for(const o of r.children)i(o)}return i(s),t.sort((r,o)=>{const n=Number(r.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-n})}var Mt=[],Wd=class{constructor(s){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var t;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=xn();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const r=Ri(this.element);let o=r.findIndex(a=>a===i);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){o+n>=r.length?o=0:o+n<0?o=r.length-1:o+=n,this.previousFocus=this.currentFocus;const a=r[o];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||a&&this.possiblyHasTabbableChildren(a))return;e.preventDefault(),this.currentFocus=a,(t=this.currentFocus)==null||t.focus({preventScroll:!1});const l=[...br()];if(l.includes(this.currentFocus)||!l.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=s,this.elementsWithTabbableControls=["iframe"]}activate(){Mt.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Mt=Mt.filter(s=>s!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Mt[Mt.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const s=Ri(this.element);if(!this.element.matches(":focus-within")){const e=s[0],t=s[s.length-1],i=this.tabDirection==="forward"?e:t;typeof(i==null?void 0:i.focus)=="function"&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(s){return this.elementsWithTabbableControls.includes(s.tagName.toLowerCase())||s.hasAttribute("controls")}},Li=new Set;function Hd(){const s=document.documentElement.clientWidth;return Math.abs(window.innerWidth-s)}function Kd(){const s=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(s)||!s?0:s}function $o(s){if(Li.add(s),!document.documentElement.classList.contains("sl-scroll-lock")){const e=Hd()+Kd();let t=getComputedStyle(document.documentElement).scrollbarGutter;(!t||t==="auto")&&(t="stable"),e<2&&(t=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",t),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function xo(s){Li.delete(s),Li.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var Jd=I`
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
`,Gd=s=>{var e;const{activeElement:t}=document;t&&s.contains(t)&&((e=document.activeElement)==null||e.blur())},Yd=I`
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
`,Oi="";function Eo(s){Oi=s}function Zd(s=""){if(!Oi){const e=[...document.getElementsByTagName("script")],t=e.find(i=>i.hasAttribute("data-shoelace"));if(t)Eo(t.getAttribute("data-shoelace"));else{const i=e.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src));let r="";i&&(r=i.getAttribute("src")),Eo(r.split("/").slice(0,-1).join("/"))}}return Oi.replace(/\/$/,"")+(s?`/${s.replace(/^\//,"")}`:"")}var Xd={name:"default",resolver:s=>Zd(`assets/icons/${s}.svg`)},Qd=Xd,Co={caret:`
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
  `},eh={name:"system",resolver:s=>s in Co?`data:image/svg+xml,${encodeURIComponent(Co[s])}`:""},th=eh,sh=[Qd,th],Pi=[];function ih(s){Pi.push(s)}function rh(s){Pi=Pi.filter(e=>e!==s)}function To(s){return sh.find(e=>e.name===s)}var oh=I`
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
`;function J(s,e){const t=ct({waitUntilFirstUpdate:!1},e);return(i,r)=>{const{update:o}=i,n=Array.isArray(s)?s:[s];i.update=function(a){n.forEach(l=>{const c=l;if(a.has(c)){const h=a.get(c),p=this[c];h!==p&&(!t.waitUntilFirstUpdate||this.hasUpdated)&&this[r](h,p)}}),o.call(this,a)}}}var ne=I`
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
 */const nh={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:dr},ah=(s=nh,e,t)=>{const{kind:i,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){const{name:n}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,s,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,s,a),a}}}if(i==="setter"){const{name:n}=t;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,s,!0,a)}}throw Error("Unsupported decorator location: "+i)};function b(s){return(e,t)=>typeof t=="object"?ah(s,e,t):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rt(s){return b({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lh=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function W(s,e){return(t,i,r)=>{const o=n=>{var a;return((a=n.renderRoot)==null?void 0:a.querySelector(s))??null};return lh(t,i,{get(){return o(this)}})}}var xs,G=class extends D{constructor(){super(),Nd(this,xs,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([s,e])=>{this.constructor.define(s,e)})}emit(s,e){const t=new CustomEvent(s,ct({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(t),t}static define(s,e=this,t={}){const i=customElements.get(s);if(!i){try{customElements.define(s,e,t)}catch{customElements.define(s,class extends e{},t)}return}let r=" (unknown version)",o=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in i&&i.version&&(o=" v"+i.version),!(r&&o&&r===o)&&console.warn(`Attempted to register <${s}>${r}, but <${s}>${o} has already been registered.`)}attributeChangedCallback(s,e,t){Dd(this,xs)||(this.constructor.elementProperties.forEach((i,r)=>{i.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),jd(this,xs,!0)),super.attributeChangedCallback(s,e,t)}willUpdate(s){super.willUpdate(s),this.initialReflectedProperties.forEach((e,t)=>{s.has(t)&&this[t]==null&&(this[t]=e)})}};xs=new WeakMap;G.version="2.20.1";G.dependencies={};m([b()],G.prototype,"dir",2);m([b()],G.prototype,"lang",2);var Ut=Symbol(),ws=Symbol(),hi,ui=new Map,he=class extends G{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(s,e){var t;let i;if(e!=null&&e.spriteSheet)return this.svg=g`<svg part="svg">
        <use part="use" href="${s}"></use>
      </svg>`,this.svg;try{if(i=await fetch(s,{mode:"cors"}),!i.ok)return i.status===410?Ut:ws}catch{return ws}try{const r=document.createElement("div");r.innerHTML=await i.text();const o=r.firstElementChild;if(((t=o==null?void 0:o.tagName)==null?void 0:t.toLowerCase())!=="svg")return Ut;hi||(hi=new DOMParser);const a=hi.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):Ut}catch{return Ut}}connectedCallback(){super.connectedCallback(),ih(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),rh(this)}getIconSource(){const s=To(this.library);return this.name&&s?{url:s.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var s;const{url:e,fromLibrary:t}=this.getIconSource(),i=t?To(this.library):void 0;if(!e){this.svg=null;return}let r=ui.get(e);if(r||(r=this.resolveIcon(e,i),ui.set(e,r)),!this.initialRender)return;const o=await r;if(o===ws&&ui.delete(e),e===this.getIconSource().url){if(Sd(o)){if(this.svg=o,i){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n)}return}switch(o){case ws:case Ut:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(!0),(s=i==null?void 0:i.mutator)==null||s.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};he.styles=[ne,oh];m([Rt()],he.prototype,"svg",2);m([b({reflect:!0})],he.prototype,"name",2);m([b()],he.prototype,"src",2);m([b()],he.prototype,"label",2);m([b({reflect:!0})],he.prototype,"library",2);m([J("label")],he.prototype,"handleLabelChange",1);m([J(["name","src","library"])],he.prototype,"setIcon",1);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=mr(class extends vr{constructor(s){var e;if(super(s),s.type!==Ve.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var i,r;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const t=s.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const n=!!e[o];n===this.st.has(o)||(r=this.nt)!=null&&r.has(o)||(n?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return ge}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cn=Symbol.for(""),ch=s=>{if((s==null?void 0:s.r)===Cn)return s==null?void 0:s._$litStatic$},Os=(s,...e)=>({_$litStatic$:e.reduce((t,i,r)=>t+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+s[r+1],s[0]),r:Cn}),Ao=new Map,dh=s=>(e,...t)=>{const i=t.length;let r,o;const n=[],a=[];let l,c=0,h=!1;for(;c<i;){for(l=e[c];c<i&&(o=t[c],(r=ch(o))!==void 0);)l+=r+e[++c],h=!0;c!==i&&a.push(o),n.push(l),c++}if(c===i&&n.push(e[i]),h){const p=n.join("$$lit$$");(e=Ao.get(p))===void 0&&(n.raw=n,Ao.set(p,e=n)),t=a}return s(e,...t)},Es=dh(g);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=s=>s??z;var ae=class extends G{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(s){this.disabled&&(s.preventDefault(),s.stopPropagation())}click(){this.button.click()}focus(s){this.button.focus(s)}blur(){this.button.blur()}render(){const s=!!this.href,e=s?Os`a`:Os`button`;return Es`
      <${e}
        part="base"
        class=${de({"icon-button":!0,"icon-button--disabled":!s&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${O(s?void 0:this.disabled)}
        type=${O(s?void 0:"button")}
        href=${O(s?this.href:void 0)}
        target=${O(s?this.target:void 0)}
        download=${O(s?this.download:void 0)}
        rel=${O(s&&this.target?"noreferrer noopener":void 0)}
        role=${O(s?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${O(this.name)}
          library=${O(this.library)}
          src=${O(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};ae.styles=[ne,Yd];ae.dependencies={"sl-icon":he};m([W(".icon-button")],ae.prototype,"button",2);m([Rt()],ae.prototype,"hasFocus",2);m([b()],ae.prototype,"name",2);m([b()],ae.prototype,"library",2);m([b()],ae.prototype,"src",2);m([b()],ae.prototype,"href",2);m([b()],ae.prototype,"target",2);m([b()],ae.prototype,"download",2);m([b()],ae.prototype,"label",2);m([b({type:Boolean,reflect:!0})],ae.prototype,"disabled",2);var Tn=new Map,hh=new WeakMap;function uh(s){return s??{keyframes:[],options:{duration:0}}}function Io(s,e){return e.toLowerCase()==="rtl"?{keyframes:s.rtlKeyframes||s.keyframes,options:s.options}:s}function Ne(s,e){Tn.set(s,uh(e))}function Le(s,e,t){const i=hh.get(s);if(i!=null&&i[e])return Io(i[e],t.dir);const r=Tn.get(e);return r?Io(r,t.dir):{keyframes:[],options:{duration:0}}}function Ct(s,e){return new Promise(t=>{function i(r){r.target===s&&(s.removeEventListener(e,i),t())}s.addEventListener(e,i)})}function Oe(s,e,t){return new Promise(i=>{if((t==null?void 0:t.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=s.animate(e,Bs(ct({},t),{duration:ph()?0:t.duration}));r.addEventListener("cancel",i,{once:!0}),r.addEventListener("finish",i,{once:!0})})}function Ro(s){return s=s.toString().toLowerCase(),s.indexOf("ms")>-1?parseFloat(s):s.indexOf("s")>-1?parseFloat(s)*1e3:parseFloat(s)}function ph(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function qe(s){return Promise.all(s.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}var us=class{constructor(s,...e){this.slotNames=[],this.handleSlotChange=t=>{const i=t.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=s).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(s=>{if(s.nodeType===s.TEXT_NODE&&s.textContent.trim()!=="")return!0;if(s.nodeType===s.ELEMENT_NODE){const e=s;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(s){return this.host.querySelector(`:scope > [slot="${s}"]`)!==null}test(s){return s==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(s)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function fh(s){if(!s)return"";const e=s.assignedNodes({flatten:!0});let t="";return[...e].forEach(i=>{i.nodeType===Node.TEXT_NODE&&(t+=i.textContent)}),t}const Di=new Set,St=new Map;let it,_r="ltr",yr="en";const An=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(An){const s=new MutationObserver(Rn);_r=document.documentElement.dir||"ltr",yr=document.documentElement.lang||navigator.language,s.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function In(...s){s.map(e=>{const t=e.$code.toLowerCase();St.has(t)?St.set(t,Object.assign(Object.assign({},St.get(t)),e)):St.set(t,e),it||(it=e)}),Rn()}function Rn(){An&&(_r=document.documentElement.dir||"ltr",yr=document.documentElement.lang||navigator.language),[...Di.keys()].map(s=>{typeof s.requestUpdate=="function"&&s.requestUpdate()})}let mh=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Di.add(this.host)}hostDisconnected(){Di.delete(this.host)}dir(){return`${this.host.dir||_r}`.toLowerCase()}lang(){return`${this.host.lang||yr}`.toLowerCase()}getTranslationData(e){var t,i;const r=new Intl.Locale(e.replace(/_/g,"-")),o=r==null?void 0:r.language.toLowerCase(),n=(i=(t=r==null?void 0:r.region)===null||t===void 0?void 0:t.toLowerCase())!==null&&i!==void 0?i:"",a=St.get(`${o}-${n}`),l=St.get(o);return{locale:r,language:o,region:n,primary:a,secondary:l}}exists(e,t){var i;const{primary:r,secondary:o}=this.getTranslationData((i=t.lang)!==null&&i!==void 0?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!(r&&r[e]||o&&o[e]||t.includeFallback&&it&&it[e])}term(e,...t){const{primary:i,secondary:r}=this.getTranslationData(this.lang());let o;if(i&&i[e])o=i[e];else if(r&&r[e])o=r[e];else if(it&&it[e])o=it[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof o=="function"?o(...t):o}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var Ln={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(s,e)=>`Go to slide ${s} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:s=>s===0?"No options selected":s===1?"1 option selected":`${s} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:s=>`Slide ${s}`,toggleColorFormat:"Toggle color format"};In(Ln);var vh=Ln,Ge=class extends mh{};In(vh);var Ee=class extends G{constructor(){super(...arguments),this.hasSlotController=new us(this,"footer"),this.localize=new Ge(this),this.modal=new Wd(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=s=>{s.key==="Escape"&&this.modal.isActive()&&this.open&&(s.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),$o(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),xo(this),this.removeOpenListeners()}requestClose(s){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:s}}).defaultPrevented){const t=Le(this,"dialog.denyClose",{dir:this.localize.dir()});Oe(this.panel,t.keyframes,t.options);return}this.hide()}addOpenListeners(){var s;"CloseWatcher"in window?((s=this.closeWatcher)==null||s.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var s;(s=this.closeWatcher)==null||s.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),$o(this);const s=this.querySelector("[autofocus]");s&&s.removeAttribute("autofocus"),await Promise.all([qe(this.dialog),qe(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(s?s.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),s&&s.setAttribute("autofocus","")});const e=Le(this,"dialog.show",{dir:this.localize.dir()}),t=Le(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Oe(this.panel,e.keyframes,e.options),Oe(this.overlay,t.keyframes,t.options)]),this.emit("sl-after-show")}else{Gd(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([qe(this.dialog),qe(this.overlay)]);const s=Le(this,"dialog.hide",{dir:this.localize.dir()}),e=Le(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Oe(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),Oe(this.panel,s.keyframes,s.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,xo(this);const t=this.originalTrigger;typeof(t==null?void 0:t.focus)=="function"&&setTimeout(()=>t.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Ct(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ct(this,"sl-after-hide")}render(){return g`
      <div
        part="base"
        class=${de({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${O(this.noHeader?this.label:void 0)}
          aria-labelledby=${O(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":g`
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
    `}};Ee.styles=[ne,Jd];Ee.dependencies={"sl-icon-button":ae};m([W(".dialog")],Ee.prototype,"dialog",2);m([W(".dialog__panel")],Ee.prototype,"panel",2);m([W(".dialog__overlay")],Ee.prototype,"overlay",2);m([b({type:Boolean,reflect:!0})],Ee.prototype,"open",2);m([b({reflect:!0})],Ee.prototype,"label",2);m([b({attribute:"no-header",type:Boolean,reflect:!0})],Ee.prototype,"noHeader",2);m([J("open",{waitUntilFirstUpdate:!0})],Ee.prototype,"handleOpenChange",1);Ne("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});Ne("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});Ne("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});Ne("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});Ne("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Ee.define("sl-dialog");class On extends D{_emit(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_onShow(){this._emit("ll-modal-open")}_onAfterHide(){this._emit("ll-modal-close")}_onInitialFocus(e){e.preventDefault(),this._emit("ll-modal-initial-focus")}render(){return g`
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
    `}show(){var e;(e=this.renderRoot.querySelector("sl-dialog"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("sl-dialog"))==null||e.hide()}}C(On,"properties",{label:{type:String},width:{type:String}});customElements.define("llama-modal",On);var gh=I`
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
`,wr=class extends G{constructor(){super(...arguments),this.localize=new Ge(this)}render(){return g`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};wr.styles=[ne,gh];var zt=new WeakMap,Vt=new WeakMap,Bt=new WeakMap,pi=new WeakSet,Ss=new WeakMap,Sr=class{constructor(s,e){this.handleFormData=t=>{const i=this.options.disabled(this.host),r=this.options.name(this.host),o=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof r=="string"&&r.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(a=>{t.formData.append(r,a.toString())}):t.formData.append(r,o.toString()))},this.handleFormSubmit=t=>{var i;const r=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=zt.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!r&&!o(this.host)&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Ss.set(this.host,[])},this.handleInteraction=t=>{const i=Ss.get(this.host);i.includes(t.type)||i.push(t.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const i of t)if(typeof i.checkValidity=="function"&&!i.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const i of t)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=s).addController(this),this.options=ct({form:t=>{const i=t.form;if(i){const o=t.getRootNode().querySelector(`#${i}`);if(o)return o}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var i;return(i=t.disabled)!=null?i:!1},reportValidity:t=>typeof t.reportValidity=="function"?t.reportValidity():!0,checkValidity:t=>typeof t.checkValidity=="function"?t.checkValidity():!0,setValue:(t,i)=>t.value=i,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const s=this.options.form(this.host);s&&this.attachForm(s),Ss.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Ss.delete(this.host),this.options.assumeInteractionOn.forEach(s=>{this.host.removeEventListener(s,this.handleInteraction)})}hostUpdated(){const s=this.options.form(this.host);s||this.detachForm(),s&&this.form!==s&&(this.detachForm(),this.attachForm(s)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(s){s?(this.form=s,zt.has(this.form)?zt.get(this.form).add(this.host):zt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Vt.has(this.form)||(Vt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Bt.has(this.form)||(Bt.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const s=zt.get(this.form);s&&(s.delete(this.host),s.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Vt.has(this.form)&&(this.form.reportValidity=Vt.get(this.form),Vt.delete(this.form)),Bt.has(this.form)&&(this.form.checkValidity=Bt.get(this.form),Bt.delete(this.form)),this.form=void 0))}setUserInteracted(s,e){e?pi.add(s):pi.delete(s),s.requestUpdate()}doAction(s,e){if(this.form){const t=document.createElement("button");t.type=s,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",e&&(t.name=e.name,t.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&t.setAttribute(i,e.getAttribute(i))})),this.form.append(t),t.click(),t.remove()}}getForm(){var s;return(s=this.form)!=null?s:null}reset(s){this.doAction("reset",s)}submit(s){this.doAction("submit",s)}setValidity(s){const e=this.host,t=!!pi.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!s),e.toggleAttribute("data-valid",s),e.toggleAttribute("data-user-invalid",!s&&t),e.toggleAttribute("data-user-valid",s&&t)}updateValidity(){const s=this.host;this.setValidity(s.validity.valid)}emitInvalidEvent(s){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});s||e.preventDefault(),this.host.dispatchEvent(e)||s==null||s.preventDefault()}},kr=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(Bs(ct({},kr),{valid:!1,valueMissing:!0}));Object.freeze(Bs(ct({},kr),{valid:!1,customError:!0}));var bh=I`
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
`,N=class extends G{constructor(){super(...arguments),this.formControlController=new Sr(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new us(this,"[default]","prefix","suffix"),this.localize=new Ge(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:kr}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(s){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(s)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(s){this.button.focus(s)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(s){this.isButton()&&(this.button.setCustomValidity(s),this.formControlController.updateValidity())}render(){const s=this.isLink(),e=s?Os`a`:Os`button`;return Es`
      <${e}
        part="base"
        class=${de({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${O(s?void 0:this.disabled)}
        type=${O(s?void 0:this.type)}
        title=${this.title}
        name=${O(s?void 0:this.name)}
        value=${O(s?void 0:this.value)}
        href=${O(s&&!this.disabled?this.href:void 0)}
        target=${O(s?this.target:void 0)}
        download=${O(s?this.download:void 0)}
        rel=${O(s?this.rel:void 0)}
        role=${O(s?void 0:"button")}
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
    `}};N.styles=[ne,bh];N.dependencies={"sl-icon":he,"sl-spinner":wr};m([W(".button")],N.prototype,"button",2);m([Rt()],N.prototype,"hasFocus",2);m([Rt()],N.prototype,"invalid",2);m([b()],N.prototype,"title",2);m([b({reflect:!0})],N.prototype,"variant",2);m([b({reflect:!0})],N.prototype,"size",2);m([b({type:Boolean,reflect:!0})],N.prototype,"caret",2);m([b({type:Boolean,reflect:!0})],N.prototype,"disabled",2);m([b({type:Boolean,reflect:!0})],N.prototype,"loading",2);m([b({type:Boolean,reflect:!0})],N.prototype,"outline",2);m([b({type:Boolean,reflect:!0})],N.prototype,"pill",2);m([b({type:Boolean,reflect:!0})],N.prototype,"circle",2);m([b()],N.prototype,"type",2);m([b()],N.prototype,"name",2);m([b()],N.prototype,"value",2);m([b()],N.prototype,"href",2);m([b()],N.prototype,"target",2);m([b()],N.prototype,"rel",2);m([b()],N.prototype,"download",2);m([b()],N.prototype,"form",2);m([b({attribute:"formaction"})],N.prototype,"formAction",2);m([b({attribute:"formenctype"})],N.prototype,"formEnctype",2);m([b({attribute:"formmethod"})],N.prototype,"formMethod",2);m([b({attribute:"formnovalidate",type:Boolean})],N.prototype,"formNoValidate",2);m([b({attribute:"formtarget"})],N.prototype,"formTarget",2);m([J("disabled",{waitUntilFirstUpdate:!0})],N.prototype,"handleDisabledChange",1);N.define("sl-button");class Pn extends D{constructor(){super(),this.lines=[],this.confirmLabel="Yes",this.cancelLabel="No",this.defaultButton="cancel",this._answer=!1,this._confirmRef=Se(),this._cancelRef=Se()}show({lines:e,confirmLabel:t="Yes",cancelLabel:i="No",defaultButton:r="cancel"}){var o;this.lines=e,this.confirmLabel=t,this.cancelLabel=i,this.defaultButton=r,this._answer=!1,(o=this.renderRoot.querySelector("llama-modal"))==null||o.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onYes(){this._answer=!0,this.hide()}_onNo(){this._answer=!1,this.hide()}_onInitialFocus(){const e=this.defaultButton==="confirm"?this._confirmRef.value:this._cancelRef.value;e==null||e.focus()}_onAfterHide(){this.dispatchEvent(new CustomEvent(this._answer?"ll-confirm-yes":"ll-confirm-no",{bubbles:!0,composed:!0})),this._answer=!1}render(){return g`
      <llama-modal label="Confirm"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        ${this.lines.map(e=>g`<p>${e}</p>`)}
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button ${ke(this._confirmRef)} @click=${this._onYes}>${this.confirmLabel}</sl-button>
          <sl-button ${ke(this._cancelRef)}  @click=${this._onNo}>${this.cancelLabel}</sl-button>
        </div>
      </llama-modal>
    `}}C(Pn,"properties",{lines:{type:Array},confirmLabel:{type:String},cancelLabel:{type:String},defaultButton:{type:String}});customElements.define("llama-confirm-modal",Pn);class Ni extends D{constructor(){super(),this.prefix=null,this.completions=null,this.count=null,this.windowFocused=!0,this.editScratchActive=!1,this.editScratchFocus="start",this.editScratchDelta=5,this.warningMsg=null,this.errorMsg=null,this.statusMsg=null}_kbItem(e,t){return g`
      <span class="item">
        <span class="key">${e}</span>
        <span class="desc">${t}</span>
      </span>
    `}render(){if(this.errorMsg)return g`
        <div class="bar">
          <div class="row"><span class="error">${this.errorMsg}</span></div>
        </div>
      `;if(!this.windowFocused)return g`
        <div class="bar">
          <div class="row">
            <span class="warning">
              Keyboard control inactive — click anywhere in the app to restore
            </span>
          </div>
        </div>
      `;if(this.editScratchActive){const e=this.editScratchFocus==="start"?"Start":"End",t=g`
        <div class="row">
          <span class="cheat-label">Edit Loop</span>
          ${this._kbItem("Tab","toggle focus")}
          ${this._kbItem("←/→","nudge")}
          ${this._kbItem("↑/↓","delta")}
          ${this._kbItem("Space","play/pause")}
          ${this._kbItem("Bsp","reset")}
          ${this._kbItem("0-9/:","type time")}
          ${this._kbItem("Enter/Esc","done")}
          <span class="item">
            <span class="desc">Focus:</span>
            <span class="state-val">${e}</span>
          </span>
          <span class="item">
            <span class="desc">Delta:</span>
            <span class="state-val">${this.editScratchDelta}s</span>
          </span>
        </div>
      `;return this.warningMsg?g`
          <div class="bar">
            <div class="row"><span class="warning">${this.warningMsg}</span></div>
            ${t}
          </div>
        `:g`<div class="bar">${t}</div>`}if(this.warningMsg)return g`
        <div class="bar">
          <div class="row"><span class="warning">${this.warningMsg}</span></div>
        </div>
      `;if(this.prefix&&this.completions){const e=this.count!=null?g`<span class="item"><span class="key">Count:</span><span class="state-val">${this.count}</span></span>`:null,t=Object.entries(this.completions).map(([i,{desc:r}])=>g`
        <span class="item">
          <span class="key">${this.prefix}${i}</span>
          <span class="desc">${r}</span>
        </span>
      `);return g`<div class="bar"><div class="row">${e}${t}</div></div>`}return this.count!=null?g`
        <div class="bar">
          <div class="row">
            <span class="item">
              <span class="key">Count:</span>
              <span class="state-val">${this.count}</span>
            </span>
          </div>
        </div>
      `:this.statusMsg?g`
        <div class="bar">
          <div class="row"><span class="status">${this.statusMsg}</span></div>
        </div>
      `:g``}}C(Ni,"styles",I`
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
      gap: 1.5rem;
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
    .status {
      color: var(--ll-text-dim, #aaa);
    }
  `),C(Ni,"properties",{prefix:{type:String},completions:{type:Object},count:{type:Number},windowFocused:{type:Boolean},editScratchActive:{type:Boolean},editScratchFocus:{type:String},editScratchDelta:{type:Number},warningMsg:{type:String},errorMsg:{type:String},statusMsg:{type:String}});customElements.define("llama-whichkey",Ni);const Lo=/^\d+(\.\d+)?$/;function be(s){if(s=(s||"").trim().replace(/\//g,":"),!s)return null;const e=s.split(":");if(e.length===2||e.length===3){if(e.some(i=>!Lo.test(i)))return null;const t=e.map(Number);return e.length===2?t[0]*60+t[1]:t[0]*3600+t[1]*60+t[2]}return Lo.test(s)?Number(s):null}var _h=I`
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
`,yh=I`
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
`;const He=Math.min,ie=Math.max,Ps=Math.round,ks=Math.floor,$e=s=>({x:s,y:s}),wh={left:"right",right:"left",bottom:"top",top:"bottom"},Sh={start:"end",end:"start"};function ji(s,e,t){return ie(s,He(e,t))}function Lt(s,e){return typeof s=="function"?s(e):s}function Ke(s){return s.split("-")[0]}function Ot(s){return s.split("-")[1]}function Dn(s){return s==="x"?"y":"x"}function $r(s){return s==="y"?"height":"width"}const kh=new Set(["top","bottom"]);function Pe(s){return kh.has(Ke(s))?"y":"x"}function xr(s){return Dn(Pe(s))}function $h(s,e,t){t===void 0&&(t=!1);const i=Ot(s),r=xr(s),o=$r(r);let n=r==="x"?i===(t?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[o]>e.floating[o]&&(n=Ds(n)),[n,Ds(n)]}function xh(s){const e=Ds(s);return[Mi(s),e,Mi(e)]}function Mi(s){return s.replace(/start|end/g,e=>Sh[e])}const Oo=["left","right"],Po=["right","left"],Eh=["top","bottom"],Ch=["bottom","top"];function Th(s,e,t){switch(s){case"top":case"bottom":return t?e?Po:Oo:e?Oo:Po;case"left":case"right":return e?Eh:Ch;default:return[]}}function Ah(s,e,t,i){const r=Ot(s);let o=Th(Ke(s),t==="start",i);return r&&(o=o.map(n=>n+"-"+r),e&&(o=o.concat(o.map(Mi)))),o}function Ds(s){return s.replace(/left|right|bottom|top/g,e=>wh[e])}function Ih(s){return{top:0,right:0,bottom:0,left:0,...s}}function Nn(s){return typeof s!="number"?Ih(s):{top:s,right:s,bottom:s,left:s}}function Ns(s){const{x:e,y:t,width:i,height:r}=s;return{width:i,height:r,top:t,left:e,right:e+i,bottom:t+r,x:e,y:t}}function Do(s,e,t){let{reference:i,floating:r}=s;const o=Pe(e),n=xr(e),a=$r(n),l=Ke(e),c=o==="y",h=i.x+i.width/2-r.width/2,p=i.y+i.height/2-r.height/2,d=i[a]/2-r[a]/2;let u;switch(l){case"top":u={x:h,y:i.y-r.height};break;case"bottom":u={x:h,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:p};break;case"left":u={x:i.x-r.width,y:p};break;default:u={x:i.x,y:i.y}}switch(Ot(e)){case"start":u[n]-=d*(t&&c?-1:1);break;case"end":u[n]+=d*(t&&c?-1:1);break}return u}async function Rh(s,e){var t;e===void 0&&(e={});const{x:i,y:r,platform:o,rects:n,elements:a,strategy:l}=s,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:d=!1,padding:u=0}=Lt(e,s),f=Nn(u),_=a[d?p==="floating"?"reference":"floating":p],y=Ns(await o.getClippingRect({element:(t=await(o.isElement==null?void 0:o.isElement(_)))==null||t?_:_.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),S=p==="floating"?{x:i,y:r,width:n.floating.width,height:n.floating.height}:n.reference,w=await(o.getOffsetParent==null?void 0:o.getOffsetParent(a.floating)),k=await(o.isElement==null?void 0:o.isElement(w))?await(o.getScale==null?void 0:o.getScale(w))||{x:1,y:1}:{x:1,y:1},R=Ns(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:S,offsetParent:w,strategy:l}):S);return{top:(y.top-R.top+f.top)/k.y,bottom:(R.bottom-y.bottom+f.bottom)/k.y,left:(y.left-R.left+f.left)/k.x,right:(R.right-y.right+f.right)/k.x}}const Lh=async(s,e,t)=>{const{placement:i="bottom",strategy:r="absolute",middleware:o=[],platform:n}=t,a=o.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e));let c=await n.getElementRects({reference:s,floating:e,strategy:r}),{x:h,y:p}=Do(c,i,l),d=i,u={},f=0;for(let _=0;_<a.length;_++){var v;const{name:y,fn:S}=a[_],{x:w,y:k,data:R,reset:T}=await S({x:h,y:p,initialPlacement:i,placement:d,strategy:r,middlewareData:u,rects:c,platform:{...n,detectOverflow:(v=n.detectOverflow)!=null?v:Rh},elements:{reference:s,floating:e}});h=w??h,p=k??p,u={...u,[y]:{...u[y],...R}},T&&f<=50&&(f++,typeof T=="object"&&(T.placement&&(d=T.placement),T.rects&&(c=T.rects===!0?await n.getElementRects({reference:s,floating:e,strategy:r}):T.rects),{x:h,y:p}=Do(c,d,l)),_=-1)}return{x:h,y:p,placement:d,strategy:r,middlewareData:u}},Oh=s=>({name:"arrow",options:s,async fn(e){const{x:t,y:i,placement:r,rects:o,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=Lt(s,e)||{};if(c==null)return{};const p=Nn(h),d={x:t,y:i},u=xr(r),f=$r(u),v=await n.getDimensions(c),_=u==="y",y=_?"top":"left",S=_?"bottom":"right",w=_?"clientHeight":"clientWidth",k=o.reference[f]+o.reference[u]-d[u]-o.floating[f],R=d[u]-o.reference[u],T=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c));let L=T?T[w]:0;(!L||!await(n.isElement==null?void 0:n.isElement(T)))&&(L=a.floating[w]||o.floating[f]);const q=k/2-R/2,V=L/2-v[f]/2-1,ce=He(p[y],V),je=He(p[S],V),we=ce,Me=L-v[f]-je,Q=L/2-v[f]/2+q,Ye=ji(we,Q,Me),Te=!l.arrow&&Ot(r)!=null&&Q!==Ye&&o.reference[f]/2-(Q<we?ce:je)-v[f]/2<0,ue=Te?Q<we?Q-we:Q-Me:0;return{[u]:d[u]+ue,data:{[u]:Ye,centerOffset:Q-Ye-ue,...Te&&{alignmentOffset:ue}},reset:Te}}}),Ph=function(s){return s===void 0&&(s={}),{name:"flip",options:s,async fn(e){var t,i;const{placement:r,middlewareData:o,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:p=!0,fallbackPlacements:d,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:v=!0,..._}=Lt(s,e);if((t=o.arrow)!=null&&t.alignmentOffset)return{};const y=Ke(r),S=Pe(a),w=Ke(a)===a,k=await(l.isRTL==null?void 0:l.isRTL(c.floating)),R=d||(w||!v?[Ds(a)]:xh(a)),T=f!=="none";!d&&T&&R.push(...Ah(a,v,f,k));const L=[a,...R],q=await l.detectOverflow(e,_),V=[];let ce=((i=o.flip)==null?void 0:i.overflows)||[];if(h&&V.push(q[y]),p){const Q=$h(r,n,k);V.push(q[Q[0]],q[Q[1]])}if(ce=[...ce,{placement:r,overflows:V}],!V.every(Q=>Q<=0)){var je,we;const Q=(((je=o.flip)==null?void 0:je.index)||0)+1,Ye=L[Q];if(Ye&&(!(p==="alignment"?S!==Pe(Ye):!1)||ce.every(pe=>Pe(pe.placement)===S?pe.overflows[0]>0:!0)))return{data:{index:Q,overflows:ce},reset:{placement:Ye}};let Te=(we=ce.filter(ue=>ue.overflows[0]<=0).sort((ue,pe)=>ue.overflows[1]-pe.overflows[1])[0])==null?void 0:we.placement;if(!Te)switch(u){case"bestFit":{var Me;const ue=(Me=ce.filter(pe=>{if(T){const Ue=Pe(pe.placement);return Ue===S||Ue==="y"}return!0}).map(pe=>[pe.placement,pe.overflows.filter(Ue=>Ue>0).reduce((Ue,Jn)=>Ue+Jn,0)]).sort((pe,Ue)=>pe[1]-Ue[1])[0])==null?void 0:Me[0];ue&&(Te=ue);break}case"initialPlacement":Te=a;break}if(r!==Te)return{reset:{placement:Te}}}return{}}}},Dh=new Set(["left","top"]);async function Nh(s,e){const{placement:t,platform:i,elements:r}=s,o=await(i.isRTL==null?void 0:i.isRTL(r.floating)),n=Ke(t),a=Ot(t),l=Pe(t)==="y",c=Dh.has(n)?-1:1,h=o&&l?-1:1,p=Lt(e,s);let{mainAxis:d,crossAxis:u,alignmentAxis:f}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return a&&typeof f=="number"&&(u=a==="end"?f*-1:f),l?{x:u*h,y:d*c}:{x:d*c,y:u*h}}const jh=function(s){return s===void 0&&(s=0),{name:"offset",options:s,async fn(e){var t,i;const{x:r,y:o,placement:n,middlewareData:a}=e,l=await Nh(e,s);return n===((t=a.offset)==null?void 0:t.placement)&&(i=a.arrow)!=null&&i.alignmentOffset?{}:{x:r+l.x,y:o+l.y,data:{...l,placement:n}}}}},Mh=function(s){return s===void 0&&(s={}),{name:"shift",options:s,async fn(e){const{x:t,y:i,placement:r,platform:o}=e,{mainAxis:n=!0,crossAxis:a=!1,limiter:l={fn:y=>{let{x:S,y:w}=y;return{x:S,y:w}}},...c}=Lt(s,e),h={x:t,y:i},p=await o.detectOverflow(e,c),d=Pe(Ke(r)),u=Dn(d);let f=h[u],v=h[d];if(n){const y=u==="y"?"top":"left",S=u==="y"?"bottom":"right",w=f+p[y],k=f-p[S];f=ji(w,f,k)}if(a){const y=d==="y"?"top":"left",S=d==="y"?"bottom":"right",w=v+p[y],k=v-p[S];v=ji(w,v,k)}const _=l.fn({...e,[u]:f,[d]:v});return{..._,data:{x:_.x-t,y:_.y-i,enabled:{[u]:n,[d]:a}}}}}},Uh=function(s){return s===void 0&&(s={}),{name:"size",options:s,async fn(e){var t,i;const{placement:r,rects:o,platform:n,elements:a}=e,{apply:l=()=>{},...c}=Lt(s,e),h=await n.detectOverflow(e,c),p=Ke(r),d=Ot(r),u=Pe(r)==="y",{width:f,height:v}=o.floating;let _,y;p==="top"||p==="bottom"?(_=p,y=d===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(y=p,_=d==="end"?"top":"bottom");const S=v-h.top-h.bottom,w=f-h.left-h.right,k=He(v-h[_],S),R=He(f-h[y],w),T=!e.middlewareData.shift;let L=k,q=R;if((t=e.middlewareData.shift)!=null&&t.enabled.x&&(q=w),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(L=S),T&&!d){const ce=ie(h.left,0),je=ie(h.right,0),we=ie(h.top,0),Me=ie(h.bottom,0);u?q=f-2*(ce!==0||je!==0?ce+je:ie(h.left,h.right)):L=v-2*(we!==0||Me!==0?we+Me:ie(h.top,h.bottom))}await l({...e,availableWidth:q,availableHeight:L});const V=await n.getDimensions(a.floating);return f!==V.width||v!==V.height?{reset:{rects:!0}}:{}}}};function Fs(){return typeof window<"u"}function Pt(s){return jn(s)?(s.nodeName||"").toLowerCase():"#document"}function oe(s){var e;return(s==null||(e=s.ownerDocument)==null?void 0:e.defaultView)||window}function Ce(s){var e;return(e=(jn(s)?s.ownerDocument:s.document)||window.document)==null?void 0:e.documentElement}function jn(s){return Fs()?s instanceof Node||s instanceof oe(s).Node:!1}function _e(s){return Fs()?s instanceof Element||s instanceof oe(s).Element:!1}function xe(s){return Fs()?s instanceof HTMLElement||s instanceof oe(s).HTMLElement:!1}function No(s){return!Fs()||typeof ShadowRoot>"u"?!1:s instanceof ShadowRoot||s instanceof oe(s).ShadowRoot}const zh=new Set(["inline","contents"]);function ps(s){const{overflow:e,overflowX:t,overflowY:i,display:r}=ye(s);return/auto|scroll|overlay|hidden|clip/.test(e+i+t)&&!zh.has(r)}const Vh=new Set(["table","td","th"]);function Bh(s){return Vh.has(Pt(s))}const Fh=[":popover-open",":modal"];function qs(s){return Fh.some(e=>{try{return s.matches(e)}catch{return!1}})}const qh=["transform","translate","scale","rotate","perspective"],Wh=["transform","translate","scale","rotate","perspective","filter"],Hh=["paint","layout","strict","content"];function Ws(s){const e=Er(),t=_e(s)?ye(s):s;return qh.some(i=>t[i]?t[i]!=="none":!1)||(t.containerType?t.containerType!=="normal":!1)||!e&&(t.backdropFilter?t.backdropFilter!=="none":!1)||!e&&(t.filter?t.filter!=="none":!1)||Wh.some(i=>(t.willChange||"").includes(i))||Hh.some(i=>(t.contain||"").includes(i))}function Kh(s){let e=Je(s);for(;xe(e)&&!Tt(e);){if(Ws(e))return e;if(qs(e))return null;e=Je(e)}return null}function Er(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Jh=new Set(["html","body","#document"]);function Tt(s){return Jh.has(Pt(s))}function ye(s){return oe(s).getComputedStyle(s)}function Hs(s){return _e(s)?{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}:{scrollLeft:s.scrollX,scrollTop:s.scrollY}}function Je(s){if(Pt(s)==="html")return s;const e=s.assignedSlot||s.parentNode||No(s)&&s.host||Ce(s);return No(e)?e.host:e}function Mn(s){const e=Je(s);return Tt(e)?s.ownerDocument?s.ownerDocument.body:s.body:xe(e)&&ps(e)?e:Mn(e)}function ls(s,e,t){var i;e===void 0&&(e=[]),t===void 0&&(t=!0);const r=Mn(s),o=r===((i=s.ownerDocument)==null?void 0:i.body),n=oe(r);if(o){const a=Ui(n);return e.concat(n,n.visualViewport||[],ps(r)?r:[],a&&t?ls(a):[])}return e.concat(r,ls(r,[],t))}function Ui(s){return s.parent&&Object.getPrototypeOf(s.parent)?s.frameElement:null}function Un(s){const e=ye(s);let t=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=xe(s),o=r?s.offsetWidth:t,n=r?s.offsetHeight:i,a=Ps(t)!==o||Ps(i)!==n;return a&&(t=o,i=n),{width:t,height:i,$:a}}function Cr(s){return _e(s)?s:s.contextElement}function $t(s){const e=Cr(s);if(!xe(e))return $e(1);const t=e.getBoundingClientRect(),{width:i,height:r,$:o}=Un(e);let n=(o?Ps(t.width):t.width)/i,a=(o?Ps(t.height):t.height)/r;return(!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}const Gh=$e(0);function zn(s){const e=oe(s);return!Er()||!e.visualViewport?Gh:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Yh(s,e,t){return e===void 0&&(e=!1),!t||e&&t!==oe(s)?!1:e}function lt(s,e,t,i){e===void 0&&(e=!1),t===void 0&&(t=!1);const r=s.getBoundingClientRect(),o=Cr(s);let n=$e(1);e&&(i?_e(i)&&(n=$t(i)):n=$t(s));const a=Yh(o,t,i)?zn(o):$e(0);let l=(r.left+a.x)/n.x,c=(r.top+a.y)/n.y,h=r.width/n.x,p=r.height/n.y;if(o){const d=oe(o),u=i&&_e(i)?oe(i):i;let f=d,v=Ui(f);for(;v&&i&&u!==f;){const _=$t(v),y=v.getBoundingClientRect(),S=ye(v),w=y.left+(v.clientLeft+parseFloat(S.paddingLeft))*_.x,k=y.top+(v.clientTop+parseFloat(S.paddingTop))*_.y;l*=_.x,c*=_.y,h*=_.x,p*=_.y,l+=w,c+=k,f=oe(v),v=Ui(f)}}return Ns({width:h,height:p,x:l,y:c})}function Ks(s,e){const t=Hs(s).scrollLeft;return e?e.left+t:lt(Ce(s)).left+t}function Vn(s,e){const t=s.getBoundingClientRect(),i=t.left+e.scrollLeft-Ks(s,t),r=t.top+e.scrollTop;return{x:i,y:r}}function Zh(s){let{elements:e,rect:t,offsetParent:i,strategy:r}=s;const o=r==="fixed",n=Ce(i),a=e?qs(e.floating):!1;if(i===n||a&&o)return t;let l={scrollLeft:0,scrollTop:0},c=$e(1);const h=$e(0),p=xe(i);if((p||!p&&!o)&&((Pt(i)!=="body"||ps(n))&&(l=Hs(i)),xe(i))){const u=lt(i);c=$t(i),h.x=u.x+i.clientLeft,h.y=u.y+i.clientTop}const d=n&&!p&&!o?Vn(n,l):$e(0);return{width:t.width*c.x,height:t.height*c.y,x:t.x*c.x-l.scrollLeft*c.x+h.x+d.x,y:t.y*c.y-l.scrollTop*c.y+h.y+d.y}}function Xh(s){return Array.from(s.getClientRects())}function Qh(s){const e=Ce(s),t=Hs(s),i=s.ownerDocument.body,r=ie(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),o=ie(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let n=-t.scrollLeft+Ks(s);const a=-t.scrollTop;return ye(i).direction==="rtl"&&(n+=ie(e.clientWidth,i.clientWidth)-r),{width:r,height:o,x:n,y:a}}const jo=25;function eu(s,e){const t=oe(s),i=Ce(s),r=t.visualViewport;let o=i.clientWidth,n=i.clientHeight,a=0,l=0;if(r){o=r.width,n=r.height;const h=Er();(!h||h&&e==="fixed")&&(a=r.offsetLeft,l=r.offsetTop)}const c=Ks(i);if(c<=0){const h=i.ownerDocument,p=h.body,d=getComputedStyle(p),u=h.compatMode==="CSS1Compat"&&parseFloat(d.marginLeft)+parseFloat(d.marginRight)||0,f=Math.abs(i.clientWidth-p.clientWidth-u);f<=jo&&(o-=f)}else c<=jo&&(o+=c);return{width:o,height:n,x:a,y:l}}const tu=new Set(["absolute","fixed"]);function su(s,e){const t=lt(s,!0,e==="fixed"),i=t.top+s.clientTop,r=t.left+s.clientLeft,o=xe(s)?$t(s):$e(1),n=s.clientWidth*o.x,a=s.clientHeight*o.y,l=r*o.x,c=i*o.y;return{width:n,height:a,x:l,y:c}}function Mo(s,e,t){let i;if(e==="viewport")i=eu(s,t);else if(e==="document")i=Qh(Ce(s));else if(_e(e))i=su(e,t);else{const r=zn(s);i={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return Ns(i)}function Bn(s,e){const t=Je(s);return t===e||!_e(t)||Tt(t)?!1:ye(t).position==="fixed"||Bn(t,e)}function iu(s,e){const t=e.get(s);if(t)return t;let i=ls(s,[],!1).filter(a=>_e(a)&&Pt(a)!=="body"),r=null;const o=ye(s).position==="fixed";let n=o?Je(s):s;for(;_e(n)&&!Tt(n);){const a=ye(n),l=Ws(n);!l&&a.position==="fixed"&&(r=null),(o?!l&&!r:!l&&a.position==="static"&&!!r&&tu.has(r.position)||ps(n)&&!l&&Bn(s,n))?i=i.filter(h=>h!==n):r=a,n=Je(n)}return e.set(s,i),i}function ru(s){let{element:e,boundary:t,rootBoundary:i,strategy:r}=s;const n=[...t==="clippingAncestors"?qs(e)?[]:iu(e,this._c):[].concat(t),i],a=n[0],l=n.reduce((c,h)=>{const p=Mo(e,h,r);return c.top=ie(p.top,c.top),c.right=He(p.right,c.right),c.bottom=He(p.bottom,c.bottom),c.left=ie(p.left,c.left),c},Mo(e,a,r));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function ou(s){const{width:e,height:t}=Un(s);return{width:e,height:t}}function nu(s,e,t){const i=xe(e),r=Ce(e),o=t==="fixed",n=lt(s,!0,o,e);let a={scrollLeft:0,scrollTop:0};const l=$e(0);function c(){l.x=Ks(r)}if(i||!i&&!o)if((Pt(e)!=="body"||ps(r))&&(a=Hs(e)),i){const u=lt(e,!0,o,e);l.x=u.x+e.clientLeft,l.y=u.y+e.clientTop}else r&&c();o&&!i&&r&&c();const h=r&&!i&&!o?Vn(r,a):$e(0),p=n.left+a.scrollLeft-l.x-h.x,d=n.top+a.scrollTop-l.y-h.y;return{x:p,y:d,width:n.width,height:n.height}}function fi(s){return ye(s).position==="static"}function Uo(s,e){if(!xe(s)||ye(s).position==="fixed")return null;if(e)return e(s);let t=s.offsetParent;return Ce(s)===t&&(t=t.ownerDocument.body),t}function Fn(s,e){const t=oe(s);if(qs(s))return t;if(!xe(s)){let r=Je(s);for(;r&&!Tt(r);){if(_e(r)&&!fi(r))return r;r=Je(r)}return t}let i=Uo(s,e);for(;i&&Bh(i)&&fi(i);)i=Uo(i,e);return i&&Tt(i)&&fi(i)&&!Ws(i)?t:i||Kh(s)||t}const au=async function(s){const e=this.getOffsetParent||Fn,t=this.getDimensions,i=await t(s.floating);return{reference:nu(s.reference,await e(s.floating),s.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function lu(s){return ye(s).direction==="rtl"}const Cs={convertOffsetParentRelativeRectToViewportRelativeRect:Zh,getDocumentElement:Ce,getClippingRect:ru,getOffsetParent:Fn,getElementRects:au,getClientRects:Xh,getDimensions:ou,getScale:$t,isElement:_e,isRTL:lu};function qn(s,e){return s.x===e.x&&s.y===e.y&&s.width===e.width&&s.height===e.height}function cu(s,e){let t=null,i;const r=Ce(s);function o(){var a;clearTimeout(i),(a=t)==null||a.disconnect(),t=null}function n(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),o();const c=s.getBoundingClientRect(),{left:h,top:p,width:d,height:u}=c;if(a||e(),!d||!u)return;const f=ks(p),v=ks(r.clientWidth-(h+d)),_=ks(r.clientHeight-(p+u)),y=ks(h),w={rootMargin:-f+"px "+-v+"px "+-_+"px "+-y+"px",threshold:ie(0,He(1,l))||1};let k=!0;function R(T){const L=T[0].intersectionRatio;if(L!==l){if(!k)return n();L?n(!1,L):i=setTimeout(()=>{n(!1,1e-7)},1e3)}L===1&&!qn(c,s.getBoundingClientRect())&&n(),k=!1}try{t=new IntersectionObserver(R,{...w,root:r.ownerDocument})}catch{t=new IntersectionObserver(R,w)}t.observe(s)}return n(!0),o}function du(s,e,t,i){i===void 0&&(i={});const{ancestorScroll:r=!0,ancestorResize:o=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=i,c=Cr(s),h=r||o?[...c?ls(c):[],...ls(e)]:[];h.forEach(y=>{r&&y.addEventListener("scroll",t,{passive:!0}),o&&y.addEventListener("resize",t)});const p=c&&a?cu(c,t):null;let d=-1,u=null;n&&(u=new ResizeObserver(y=>{let[S]=y;S&&S.target===c&&u&&(u.unobserve(e),cancelAnimationFrame(d),d=requestAnimationFrame(()=>{var w;(w=u)==null||w.observe(e)})),t()}),c&&!l&&u.observe(c),u.observe(e));let f,v=l?lt(s):null;l&&_();function _(){const y=lt(s);v&&!qn(v,y)&&t(),v=y,f=requestAnimationFrame(_)}return t(),()=>{var y;h.forEach(S=>{r&&S.removeEventListener("scroll",t),o&&S.removeEventListener("resize",t)}),p==null||p(),(y=u)==null||y.disconnect(),u=null,l&&cancelAnimationFrame(f)}}const hu=jh,uu=Mh,pu=Ph,zo=Uh,fu=Oh,mu=(s,e,t)=>{const i=new Map,r={platform:Cs,...t},o={...r.platform,_c:i};return Lh(s,e,{...r,platform:o})};function vu(s){return gu(s)}function mi(s){return s.assignedSlot?s.assignedSlot:s.parentNode instanceof ShadowRoot?s.parentNode.host:s.parentNode}function gu(s){for(let e=s;e;e=mi(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=mi(s);e;e=mi(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if(t.display!=="contents"&&(t.position!=="static"||Ws(t)||e.tagName==="BODY"))return e}return null}function bu(s){return s!==null&&typeof s=="object"&&"getBoundingClientRect"in s&&("contextElement"in s?s.contextElement instanceof Element:!0)}var j=class extends G{constructor(){super(...arguments),this.localize=new Ge(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const s=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),t=this.placement.includes("top")||this.placement.includes("bottom");let i=0,r=0,o=0,n=0,a=0,l=0,c=0,h=0;t?s.top<e.top?(i=s.left,r=s.bottom,o=s.right,n=s.bottom,a=e.left,l=e.top,c=e.right,h=e.top):(i=e.left,r=e.bottom,o=e.right,n=e.bottom,a=s.left,l=s.top,c=s.right,h=s.top):s.left<e.left?(i=s.right,r=s.top,o=e.left,n=e.top,a=s.right,l=s.bottom,c=e.left,h=e.bottom):(i=e.right,r=e.top,o=s.left,n=s.top,a=e.right,l=e.bottom,c=s.left,h=s.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${o}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(s){super.updated(s),s.has("active")&&(this.active?this.start():this.stop()),s.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const s=this.getRootNode();this.anchorEl=s.getElementById(this.anchor)}else this.anchor instanceof Element||bu(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=du(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(s=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>s())):s()})}reposition(){if(!this.active||!this.anchorEl)return;const s=[hu({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?s.push(zo({apply:({rects:t})=>{const i=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${t.reference.width}px`:"",this.popup.style.height=r?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&s.push(pu({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&s.push(uu({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?s.push(zo({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&s.push(fu({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?t=>Cs.getOffsetParent(t,vu):Cs.getOffsetParent;mu(this.anchorEl,this.popup,{placement:this.placement,middleware:s,strategy:this.strategy,platform:Bs(ct({},Cs),{getOffsetParent:e})}).then(({x:t,y:i,middlewareData:r,placement:o})=>{const n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${t}px`,top:`${i}px`}),this.arrow){const l=r.arrow.x,c=r.arrow.y;let h="",p="",d="",u="";if(this.arrowPlacement==="start"){const f=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?f:"",u=n?"":f}else if(this.arrowPlacement==="end"){const f=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":f,u=n?f:"",d=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(u=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(u=typeof l=="number"?`${l}px`:"",h=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:h,right:p,bottom:d,left:u,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return g`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${de({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${de({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?g`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};j.styles=[ne,yh];m([W(".popup")],j.prototype,"popup",2);m([W(".popup__arrow")],j.prototype,"arrowEl",2);m([b()],j.prototype,"anchor",2);m([b({type:Boolean,reflect:!0})],j.prototype,"active",2);m([b({reflect:!0})],j.prototype,"placement",2);m([b({reflect:!0})],j.prototype,"strategy",2);m([b({type:Number})],j.prototype,"distance",2);m([b({type:Number})],j.prototype,"skidding",2);m([b({type:Boolean})],j.prototype,"arrow",2);m([b({attribute:"arrow-placement"})],j.prototype,"arrowPlacement",2);m([b({attribute:"arrow-padding",type:Number})],j.prototype,"arrowPadding",2);m([b({type:Boolean})],j.prototype,"flip",2);m([b({attribute:"flip-fallback-placements",converter:{fromAttribute:s=>s.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:s=>s.join(" ")}})],j.prototype,"flipFallbackPlacements",2);m([b({attribute:"flip-fallback-strategy"})],j.prototype,"flipFallbackStrategy",2);m([b({type:Object})],j.prototype,"flipBoundary",2);m([b({attribute:"flip-padding",type:Number})],j.prototype,"flipPadding",2);m([b({type:Boolean})],j.prototype,"shift",2);m([b({type:Object})],j.prototype,"shiftBoundary",2);m([b({attribute:"shift-padding",type:Number})],j.prototype,"shiftPadding",2);m([b({attribute:"auto-size"})],j.prototype,"autoSize",2);m([b()],j.prototype,"sync",2);m([b({type:Object})],j.prototype,"autoSizeBoundary",2);m([b({attribute:"auto-size-padding",type:Number})],j.prototype,"autoSizePadding",2);m([b({attribute:"hover-bridge",type:Boolean})],j.prototype,"hoverBridge",2);var Z=class extends G{constructor(){super(...arguments),this.localize=new Ge(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=s=>{this.open&&s.key==="Escape"&&(s.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=s=>{var e;if(s.key==="Escape"&&this.open&&!this.closeWatcher){s.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(s.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){s.preventDefault(),this.hide(),this.focusOnTrigger();return}const t=(i,r)=>{if(!i)return null;const o=i.closest(r);if(o)return o;const n=i.getRootNode();return n instanceof ShadowRoot?t(n.host,r):null};setTimeout(()=>{var i;const r=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?xn():document.activeElement;(!this.containingElement||t(r,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=s=>{const e=s.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=s=>{const e=s.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const s=this.trigger.assignedElements({flatten:!0})[0];typeof(s==null?void 0:s.focus)=="function"&&s.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(s=>s.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(s){if([" ","Enter"].includes(s.key)){s.preventDefault(),this.handleTriggerClick();return}const e=this.getMenu();if(e){const t=e.getAllItems(),i=t[0],r=t[t.length-1];["ArrowDown","ArrowUp","Home","End"].includes(s.key)&&(s.preventDefault(),this.open||(this.show(),await this.updateComplete),t.length>0&&this.updateComplete.then(()=>{(s.key==="ArrowDown"||s.key==="Home")&&(e.setCurrentItem(i),i.focus()),(s.key==="ArrowUp"||s.key==="End")&&(e.setCurrentItem(r),r.focus())}))}}handleTriggerKeyUp(s){s.key===" "&&s.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const e=this.trigger.assignedElements({flatten:!0}).find(i=>Fd(i).start);let t;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":t=e.button;break;default:t=e}t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Ct(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ct(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var s;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((s=this.closeWatcher)==null||s.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var s;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(s=this.closeWatcher)==null||s.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await qe(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:s,options:e}=Le(this,"dropdown.show",{dir:this.localize.dir()});await Oe(this.popup.popup,s,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await qe(this);const{keyframes:s,options:e}=Le(this,"dropdown.hide",{dir:this.localize.dir()});await Oe(this.popup.popup,s,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return g`
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
        sync=${O(this.sync?this.sync:void 0)}
        class=${de({dropdown:!0,"dropdown--open":this.open})}
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
    `}};Z.styles=[ne,_h];Z.dependencies={"sl-popup":j};m([W(".dropdown")],Z.prototype,"popup",2);m([W(".dropdown__trigger")],Z.prototype,"trigger",2);m([W(".dropdown__panel")],Z.prototype,"panel",2);m([b({type:Boolean,reflect:!0})],Z.prototype,"open",2);m([b({reflect:!0})],Z.prototype,"placement",2);m([b({type:Boolean,reflect:!0})],Z.prototype,"disabled",2);m([b({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Z.prototype,"stayOpenOnSelect",2);m([b({attribute:!1})],Z.prototype,"containingElement",2);m([b({type:Number})],Z.prototype,"distance",2);m([b({type:Number})],Z.prototype,"skidding",2);m([b({type:Boolean})],Z.prototype,"hoist",2);m([b({reflect:!0})],Z.prototype,"sync",2);m([J("open",{waitUntilFirstUpdate:!0})],Z.prototype,"handleOpenChange",1);Ne("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Ne("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});Z.define("sl-dropdown");var _u=I`
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
`,Tr=class extends G{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(s){const e=["menuitem","menuitemcheckbox"],t=s.composedPath(),i=t.find(a=>{var l;return e.includes(((l=a==null?void 0:a.getAttribute)==null?void 0:l.call(a,"role"))||"")});if(!i||t.find(a=>{var l;return((l=a==null?void 0:a.getAttribute)==null?void 0:l.call(a,"role"))==="menu"})!==this)return;const n=i;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}})}handleKeyDown(s){if(s.key==="Enter"||s.key===" "){const e=this.getCurrentItem();s.preventDefault(),s.stopPropagation(),e==null||e.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(s.key)){const e=this.getAllItems(),t=this.getCurrentItem();let i=t?e.indexOf(t):0;e.length>0&&(s.preventDefault(),s.stopPropagation(),s.key==="ArrowDown"?i++:s.key==="ArrowUp"?i--:s.key==="Home"?i=0:s.key==="End"&&(i=e.length-1),i<0&&(i=e.length-1),i>e.length-1&&(i=0),this.setCurrentItem(e[i]),e[i].focus())}}handleMouseDown(s){const e=s.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const s=this.getAllItems();s.length>0&&this.setCurrentItem(s[0])}isMenuItem(s){var e;return s.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=s.getAttribute("role"))!=null?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(s=>!(s.inert||!this.isMenuItem(s)))}getCurrentItem(){return this.getAllItems().find(s=>s.getAttribute("tabindex")==="0")}setCurrentItem(s){this.getAllItems().forEach(t=>{t.setAttribute("tabindex",t===s?"0":"-1")})}render(){return g`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Tr.styles=[ne,_u];m([W("slot")],Tr.prototype,"defaultSlot",2);Tr.define("sl-menu");var yu=I`
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
`,wu=class{constructor(s,e){this.popupRef=Se(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=t=>{switch(t.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(t);break}},this.handleClick=t=>{var i;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&(t.target.tagName==="sl-menu-item"||(i=t.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=t=>{t.stopPropagation()},this.handlePopupReposition=()=>{const t=this.host.renderRoot.querySelector("slot[name='submenu']"),i=t==null?void 0:t.assignedElements({flatten:!0}).filter(c=>c.localName==="sl-menu")[0],r=getComputedStyle(this.host).direction==="rtl";if(!i)return;const{left:o,top:n,width:a,height:l}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${r?o+a:o}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${r?o+a:o}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+l}px`)},(this.host=s).addController(this),this.hasSlotController=e}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(s){const e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let t=null;for(const i of e.assignedElements())if(t=i.querySelectorAll("sl-menu-item, [role^='menuitem']"),t.length!==0)break;if(!(!t||t.length===0)){t[0].setAttribute("tabindex","0");for(let i=1;i!==t.length;++i)t[i].setAttribute("tabindex","-1");this.popupRef.value&&(s.preventDefault(),s.stopPropagation(),this.popupRef.value.active?t[0]instanceof HTMLElement&&t[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{t[0]instanceof HTMLElement&&t[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(s){this.popupRef.value&&this.popupRef.value.active!==s&&(this.popupRef.value.active=s,this.host.requestUpdate())}enableSubmenu(s=!0){s?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var s;if(!((s=this.host.parentElement)!=null&&s.computedStyleMap))return;const e=this.host.parentElement.computedStyleMap(),i=["padding-top","border-top-width","margin-top"].reduce((r,o)=>{var n;const a=(n=e.get(o))!=null?n:new CSSUnitValue(0,"px"),c=(a instanceof CSSUnitValue?a:new CSSUnitValue(0,"px")).to("px");return r-c.value},0);this.skidding=i}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const s=getComputedStyle(this.host).direction==="rtl";return this.isConnected?g`
      <sl-popup
        ${ke(this.popupRef)}
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
    `:g` <slot name="submenu" hidden></slot> `}},le=class extends G{constructor(){super(...arguments),this.localize=new Ge(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new us(this,"submenu"),this.submenuController=new wu(this,this.hasSlotController),this.handleHostClick=s=>{this.disabled&&(s.preventDefault(),s.stopImmediatePropagation())},this.handleMouseOver=s=>{this.focus(),s.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const s=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=s;return}s!==this.cachedTextLabel&&(this.cachedTextLabel=s,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return fh(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const s=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return g`
      <div
        id="anchor"
        part="base"
        class=${de({"menu-item":!0,"menu-item--rtl":s,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
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
        ${this.loading?g` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};le.styles=[ne,yu];le.dependencies={"sl-icon":he,"sl-popup":j,"sl-spinner":wr};m([W("slot:not([name])")],le.prototype,"defaultSlot",2);m([W(".menu-item")],le.prototype,"menuItem",2);m([b()],le.prototype,"type",2);m([b({type:Boolean,reflect:!0})],le.prototype,"checked",2);m([b()],le.prototype,"value",2);m([b({type:Boolean,reflect:!0})],le.prototype,"loading",2);m([b({type:Boolean,reflect:!0})],le.prototype,"disabled",2);m([J("checked")],le.prototype,"handleCheckedChange",1);m([J("disabled")],le.prototype,"handleDisabledChange",1);m([J("type")],le.prototype,"handleTypeChange",1);le.define("sl-menu-item");var Su=I`
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
`,Js=class extends G{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};Js.styles=[ne,Su];m([b({type:Boolean,reflect:!0})],Js.prototype,"vertical",2);m([J("vertical")],Js.prototype,"handleVerticalChange",1);Js.define("sl-divider");class zi extends D{constructor(){super(),this.label="",this.items=[]}_onSelect(e){const t=e.detail.item.value,i=e.detail.item.textContent.trim();this.dispatchEvent(new CustomEvent("ll-menu-select",{bubbles:!0,composed:!0,detail:{action:t,label:i}}))}render(){return g`
      <sl-dropdown @sl-select=${this._onSelect}>
        <button slot="trigger" class="trigger-btn">
          ${this.label}<span class="caret">▾</span>
        </button>
        <sl-menu>
          ${this.items.map(e=>e.type==="divider"?g`<sl-divider></sl-divider>`:g`
                <sl-menu-item
                  value=${e.action??""}
                  ?disabled=${e.disabled??!1}
                >${e.label}</sl-menu-item>
              `)}
        </sl-menu>
      </sl-dropdown>
    `}}C(zi,"styles",I`
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
  `),C(zi,"properties",{label:{type:String},items:{type:Array}});customElements.define("llama-dropdown",zi);var ku=I`
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
`,Wn=(s="value")=>(e,t)=>{const i=e.constructor,r=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(o,n,a){var l;const c=i.getPropertyOptions(s),h=typeof c.attribute=="string"?c.attribute:s;if(o===h){const p=c.converter||xt,u=(typeof p=="function"?p:(l=p==null?void 0:p.fromAttribute)!=null?l:xt.fromAttribute)(a,c.type);this[s]!==u&&(this[t]=u)}r.call(this,o,n,a)}},Hn=I`
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
 */const Kn=mr(class extends vr{constructor(s){if(super(s),s.type!==Ve.PROPERTY&&s.type!==Ve.ATTRIBUTE&&s.type!==Ve.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wn(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===ge||e===z)return e;const t=s.element,i=s.name;if(s.type===Ve.PROPERTY){if(e===t[i])return ge}else if(s.type===Ve.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return ge}else if(s.type===Ve.ATTRIBUTE&&t.getAttribute(i)===e+"")return ge;return $d(s),e}});var X=class extends G{constructor(){super(...arguments),this.formControlController=new Sr(this,{value:s=>s.checked?s.value||"on":void 0,defaultValue:s=>s.defaultChecked,setValue:(s,e)=>s.checked=e}),this.hasSlotController=new us(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(s){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(s)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(s){s.key==="ArrowLeft"&&(s.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),s.key==="ArrowRight"&&(s.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(s){this.input.focus(s)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(s){this.input.setCustomValidity(s),this.formControlController.updateValidity()}render(){const s=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!s;return g`
      <div
        class=${de({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${de({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${O(this.value)}
            .checked=${Kn(this.checked)}
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
    `}};X.styles=[ne,Hn,ku];m([W('input[type="checkbox"]')],X.prototype,"input",2);m([Rt()],X.prototype,"hasFocus",2);m([b()],X.prototype,"title",2);m([b()],X.prototype,"name",2);m([b()],X.prototype,"value",2);m([b({reflect:!0})],X.prototype,"size",2);m([b({type:Boolean,reflect:!0})],X.prototype,"disabled",2);m([b({type:Boolean,reflect:!0})],X.prototype,"checked",2);m([Wn("checked")],X.prototype,"defaultChecked",2);m([b({reflect:!0})],X.prototype,"form",2);m([b({type:Boolean,reflect:!0})],X.prototype,"required",2);m([b({attribute:"help-text"})],X.prototype,"helpText",2);m([J("checked",{waitUntilFirstUpdate:!0})],X.prototype,"handleCheckedChange",1);m([J("disabled",{waitUntilFirstUpdate:!0})],X.prototype,"handleDisabledChange",1);X.define("sl-switch");const $u=[{label:"Video",items:[{label:"Load URL",action:"videoUrl"},{label:"Open video",action:"videoPicker"},{label:"Edit current",action:"editVideo"},{label:"Video info",action:"videoInfo"},{label:"Loop full video",action:"loopVideo"},{label:"Delete video",action:"deleteVideo"},{type:"divider"},{label:"Create chapter divider here",action:"setChapter"},{label:"Open chapter",action:"openChapter"},{label:"Edit chapter",action:"editChapter"},{label:"Loop current chapter",action:"loopChapter"},{label:"Delete chapter",action:"deleteChapter"},{label:"Zoom current chapter",action:"zoomChapter"},{label:"Fix chapter end",action:"fixChapter"}]},{label:"Section",items:[{label:"Set section here",action:"setSection"},{label:"Edit current section",action:"editSection"},{label:"Open section",action:"openSection"},{label:"Loop current section",action:"loopSection"},{label:"Delete section",action:"deleteSection"},{label:"Zoom current section",action:"zoomSection"},{label:"Fix section end",action:"fixSection"},{type:"divider"},{label:"Toggle zone 2 (sections/chapters)",action:"toggleZone2"}]},{label:"Loop",items:[{label:"Loop current section",action:"loopSection"},{label:"Loop current chapter",action:"loopChapter"},{label:"Loop full video",action:"loopVideo"},{type:"divider"},{label:"Open loop",action:"openLoop"},{label:"Save new loop",action:"saveLoop"},{label:"Save back to loop source",action:"saveBack"},{label:"Reset loop to source",action:"resetLoopToSource"},{label:"Unlink loop source",action:"unlinkLoopSource"},{label:"Delete loop",action:"deleteLoop"},{label:"Zoom current loop",action:"zoomLoop"},{type:"divider"},{label:"Edit scratch loop",action:"editScratch"}]},{label:"Mark",items:[{label:"Set mark here",action:"setMark"},{label:"Edit mark",action:"editMark"},{label:"Delete mark",action:"deleteMark"}]},{label:"Jump",items:[{label:"Jump to Chapter",action:"jumpChapter"},{label:"Jump to Section",action:"jumpSection"},{label:"Jump to Loop",action:"jumpLoop"},{label:"Jump to Mark",action:"jumpMark"},{type:"divider"},{label:"Jump history",action:"jumpHistory"},{label:"Jump Back",action:"jumpBack"},{label:"Jump Forward",action:"jumpForward"}]},{label:"App",items:[{label:"Undo",action:"undo"},{label:"Redo",action:"redo"},{type:"divider"},{label:"Share video",action:"shareVideo"},{label:"Share loop",action:"shareLoop"},{type:"divider"},{label:"Export all data",action:"exportAll"},{label:"Import data",action:"importData"},{label:"Inspect JSON",action:"inspectData"},{type:"divider"},{label:"Bulk data delete",action:"deleteData"},{label:"Options",action:"options"}]},{label:"Help",items:[{label:"General help",action:"helpGeneral"},{label:"Key bindings",action:"helpKeys"}]}];class Vi extends D{constructor(){super(),this.currentTime=0,this.speed=1,this.isPlaying=!1,this.looping=!1,this.loopStart=0,this.loopEnd=0,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.seekDelta=P.seek_delta_default,this.seekDeltaChoices=P.seek_delta_choices,this.loopNudgeDelta=P.loop_nudge_delta_default,this.loopNudgeDeltaChoices=P.loop_nudge_delta_choices,this.editScratchActive=!1,this.editScratchFocus="start",this.editScratchDelta=1,this.activeEntityType="any",this._timeRef=Se(),this._timeFocused=!1,this._startRef=Se(),this._endRef=Se(),this._speedRef=Se(),this._entitySelectRef=Se(),this._seekDeltaRef=Se(),this._nudgeDeltaRef=Se()}_fmt(e){if(e==null)return"?";const t=Math.floor(e/60),i=Math.floor(e%60).toString().padStart(2,"0");return`${t}:${i}`}_fmtDelta(e){return e<60?`${e}s`:`${e/60}m`}_fmtLoop(e){if(e==null)return"?";if(this.editScratchDelta<1){const t=Math.round(e*10)/10,i=Math.floor(t/60),r=t%60;return`${i}:${r.toFixed(1).padStart(4,"0")}`}return this._fmt(e)}_parseTime(e){return be(e)}_parseSpeed(e){e=e.trim().replace(/%$/,"");const t=parseFloat(e);return isNaN(t)||t<=0?null:t>4?t/100:t}_emit(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}firstUpdated(){this._timeRef.value&&(this._timeRef.value.value=this._fmt(this.currentTime)),this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart)),this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd)),this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}%`)}updated(e){e.has("currentTime")&&this._timeRef.value&&!this._timeFocused&&(this._timeRef.value.value=this._fmt(this.currentTime)),(e.has("loopStart")||e.has("editScratchDelta"))&&this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart)),(e.has("loopEnd")||e.has("editScratchDelta"))&&this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd)),e.has("speed")&&this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}%`)}_submitStart(){var t;const e=this._parseTime(((t=this._startRef.value)==null?void 0:t.value)??"");e!==null?this._emit("ll-loop-start-change",{value:e}):this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart),this._emit("ll-invalid-time",{}))}_submitEnd(){var t;const e=this._parseTime(((t=this._endRef.value)==null?void 0:t.value)??"");e!==null?this._emit("ll-loop-end-change",{value:e}):this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd),this._emit("ll-invalid-time",{}))}_submitSpeed(){var t;const e=this._parseSpeed(((t=this._speedRef.value)==null?void 0:t.value)??"");e!==null?this._emit("ll-speed-change",{value:e}):this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}%`)}focusTimeInput(){const e=this._timeRef.value;e&&(e.focus(),e.select())}_onTimeKeyDown(e){var t;if(e.key==="Enter"){const i=this._parseTime(((t=this._timeRef.value)==null?void 0:t.value)??"");i!==null&&this._emit("ll-seek-to",{value:i}),e.target.blur()}else e.key==="Escape"&&e.target.blur()}focusStartInput(){var e,t;(e=this._startRef.value)==null||e.focus(),(t=this._startRef.value)==null||t.select()}focusEndInput(){var e,t;(e=this._endRef.value)==null||e.focus(),(t=this._endRef.value)==null||t.select()}focusEntitySelect(){var e;(e=this._entitySelectRef.value)==null||e.focus()}focusNudgeDeltaSelect(){var e;(e=this._nudgeDeltaRef.value)==null||e.focus()}flash(e,t="timed"){var o;const r=(o={time:this._timeRef,speed:this._speedRef,seekDelta:this._seekDeltaRef,loopStart:this._startRef,loopEnd:this._endRef,nudgeDelta:this._nudgeDeltaRef,entitySelect:this._entitySelectRef}[e])==null?void 0:o.value;if(r)if(this._flashTimers??(this._flashTimers={}),this._flashListeners??(this._flashListeners={}),clearTimeout(this._flashTimers[e]),this._flashListeners[e]&&(r.removeEventListener("blur",this._flashListeners[e]),this._flashListeners[e]=null),r.classList.add("kb-flash"),t==="until-blur"){const n=()=>{r.classList.remove("kb-flash"),this._flashListeners[e]=null};this._flashListeners[e]=n,r.addEventListener("blur",n,{once:!0})}else this._flashTimers[e]=setTimeout(()=>r.classList.remove("kb-flash"),1500)}render(){return g`
      <div class="controls-wrap ${this.editScratchActive?"edit-scratch-active":""}">

        <div class="ctrl-groups">

          <div class="ctrl-group">
            <span class="ctrl-group-label">Play</span>
            <div class="ctrl-group-body">
              <button class="btn-play-pause" @click=${()=>this._emit("ll-play-pause")}>
                ${this.isPlaying?"Pause":"Play"}
              </button>
              <input
                ${ke(this._timeRef)}
                class="time-input-play"
                type="text"
                @focus=${()=>{var e;this._timeFocused=!0,(e=this._timeRef.value)==null||e.select()}}
                @blur=${()=>{this._timeFocused=!1,this._timeRef.value&&(this._timeRef.value.value=this._fmt(this.currentTime))}}
                @keydown=${this._onTimeKeyDown}
              />
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Speed</span>
            <div class="ctrl-group-body">
              <input
                ${ke(this._speedRef)}
                class="speed-input"
                type="text"
                @keydown=${e=>{e.key==="Enter"&&(this._submitSpeed(),e.target.blur())}}
                @blur=${()=>this._submitSpeed()}
              />
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Navigate</span>
            <div class="ctrl-group-body">
              <div class="btn-group">
                <button class="btn-accent" @click=${()=>this._emit("ll-seek-back")}>◀</button>
                <select
                  ${ke(this._seekDeltaRef)}
                  class="delta-select"
                  @change=${e=>{this._emit("ll-seek-delta-change",{value:Number(e.target.value)}),e.target.blur()}}
                >
                  ${this.seekDeltaChoices.map(e=>g`
                    <option value=${e} ?selected=${this.seekDelta===e}>${this._fmtDelta(e)}</option>
                  `)}
                </select>
                <button class="btn-accent" @click=${()=>this._emit("ll-seek-forward")}>▶</button>
              </div>
              <div class="btn-group">
                <button class="btn-accent" @click=${()=>this._emit("ll-prev-entity")}>⏮</button>
                <select
                  ${ke(this._entitySelectRef)}
                  class="entity-type-select"
                  @change=${e=>{this._emit("ll-entity-type-change",{value:e.target.value}),e.target.blur()}}
                  @keydown=${e=>{(e.key==="Enter"||e.key==="Escape")&&e.target.blur()}}
                >
                  <option value="any"     ?selected=${this.activeEntityType==="any"}>Any</option>
                  <option value="section" ?selected=${this.activeEntityType==="section"}>Section</option>
                  <option value="loop"    ?selected=${this.activeEntityType==="loop"}>Loop</option>
                  <option value="mark"    ?selected=${this.activeEntityType==="mark"}>Mark</option>
                  <option value="chapter" ?selected=${this.activeEntityType==="chapter"}>Chapter</option>
                  <option value="video"   ?selected=${this.activeEntityType==="video"}>Video</option>
                </select>
                <button class="btn-accent" @click=${()=>this._emit("ll-next-entity")}>⏭</button>
              </div>
            </div>
          </div>

          <div class="ctrl-group looping-group">
            <span class="ctrl-group-label">Looping</span>
            <div class="ctrl-group-body">
              <sl-switch
                class="loop-switch"
                ?checked=${this.looping}
                @sl-change=${()=>this._emit("ll-toggle-loop")}
              ></sl-switch>
              <div class="btn-group">
                <button
                  class="btn-now"
                  @click=${()=>this._emit("ll-set-loop-start-now")}
                >Now</button>
                <input
                  ${ke(this._startRef)}
                  class="time-input align-left ${this.editScratchActive&&this.editScratchFocus==="start"?"loop-edit-focus":""} ${this.loopStart>=this.loopEnd?"loop-invalid":""} ${this.loopSourceType&&this.currentTime<this.loopSourceStart?"source-outside":""}"
                  type="text"
                  @keydown=${e=>{e.key==="Enter"?(this._submitStart(),e.target.blur()):e.key==="Escape"&&(e.target.value=this._fmtLoop(this.loopStart),e.target.blur())}}
                  @blur=${()=>this._submitStart()}
                />
              </div>
              <select
                ${ke(this._nudgeDeltaRef)}
                class="delta-select"
                @change=${e=>{this._emit("ll-loop-nudge-delta-change",{value:Number(e.target.value)}),e.target.blur()}}
                @keydown=${e=>{(e.key==="Enter"||e.key==="Escape")&&e.target.blur()}}
              >
                ${this.loopNudgeDeltaChoices.map(e=>g`
                  <option value=${e} ?selected=${this.loopNudgeDelta===e}>${this._fmtDelta(e)}</option>
                `)}
              </select>
              <div class="btn-group">
                <input
                  ${ke(this._endRef)}
                  class="time-input ${this.editScratchActive&&this.editScratchFocus==="end"?"loop-edit-focus":""} ${this.loopStart>=this.loopEnd?"loop-invalid":""} ${this.loopSourceType&&this.currentTime>this.loopSourceEnd?"source-outside":""}"
                  type="text"
                  @keydown=${e=>{e.key==="Enter"?(this._submitEnd(),e.target.blur()):e.key==="Escape"&&(e.target.value=this._fmtLoop(this.loopEnd),e.target.blur())}}
                  @blur=${()=>this._submitEnd()}
                />
                <button
                  class="btn-now"
                  @click=${()=>this._emit("ll-set-loop-end-now")}
                >Now</button>
              </div>
            </div>
          </div>

        </div>

        <div class="controls-row menus-row">
          <span class="ctrl-group-label">Actions</span>
          ${$u.map(e=>g`
            <llama-dropdown .label=${e.label} .items=${e.items}></llama-dropdown>
          `)}
        </div>

      </div>
    `}}C(Vi,"styles",I`
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
      width: 5ch;
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
  `),C(Vi,"properties",{currentTime:{type:Number},speed:{type:Number},isPlaying:{type:Boolean},looping:{type:Boolean},loopStart:{type:Number},loopEnd:{type:Number},loopSourceType:{type:String},loopSourceStart:{type:Number},loopSourceEnd:{type:Number},seekDelta:{type:Number},seekDeltaChoices:{type:Array},loopNudgeDelta:{type:Number},loopNudgeDeltaChoices:{type:Array},editScratchActive:{type:Boolean},editScratchFocus:{type:String},editScratchDelta:{type:Number},activeEntityType:{type:String}});customElements.define("llama-controls",Vi);class Bi extends D{constructor(){super(),this.videoId=null,this.currentTime=0,this.duration=null,this.sections=[],this.chapters=[],this.zone2Mode="sections",this.marks=[],this.namedLoops=[],this.loopStart=0,this.loopEnd=0,this.scopeStart=null,this.scopeEnd=null,this.zoomed=!1,this._zoneWidth=0,this._ro=null}firstUpdated(){this._ro=new ResizeObserver(e=>{this._zoneWidth=e[0].contentRect.width}),this._ro.observe(this)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._ro)==null||e.disconnect()}_pct(e){const t=this.scopeStart??0,i=this.scopeEnd??this.duration;return!i||i<=t?0:Math.max(0,Math.min(100,(e-t)/(i-t)*100))}_fmt(e){if(e==null)return"?";const t=Math.floor(e/60),i=Math.floor(e%60).toString().padStart(2,"0");return`${t}:${i}`}_computeRegions(e){return e.map((t,i)=>{const r=e[i+1],o=t.end!=null?t.end:r?r.start:this.duration;return{start:t.start,end:o,name:t.name,isCurrent:this.currentTime>=t.start&&this.currentTime<o}})}_renderSections(){const e=this.zone2Mode==="chapters"?this.chapters:this.sections;return e!=null&&e.length?this._computeRegions(e).map((i,r)=>{const o=this._pct(i.start),a=(i.end!=null?this._pct(i.end):100)-o,c=a/100*this._zoneWidth>=i.name.length*7+8,h=`${i.name} (${this._fmt(i.start)})`,p=r%2===0?"section-region--even":"section-region--odd",d=i.isCurrent?"section-region--current":p;return g`
        <div
          class="section-region ${d}"
          style="left: ${o}%; width: ${a}%"
          title="${h}"
          @click=${()=>this._onSectionClick(i)}
        >${c?g`<span class="section-label">${i.name}</span>`:""}</div>
      `}):""}_inScope(e){const t=this.scopeStart??0,i=this.scopeEnd??this.duration;return e>=t&&e<=i}_loopInScope(e){const t=this.scopeStart??0,i=this.scopeEnd??this.duration;return e.end>t&&e.start<i}_packLoops(e){const t=[[],[]];for(const i of[...e].sort((r,o)=>r.start-o.start)){let r=!1;for(const o of t)if(!o.some(n=>i.start<n.end&&i.end>n.start)){o.push(i),r=!0;break}r||t[1].push(i)}return t}_renderMarks(){return(this.marks??[]).filter(e=>this._inScope(e.time)).map(e=>g`
        <div
          class="mark-dot"
          style="left: ${this._pct(e.time)}%"
          title="${e.name}: ${this._fmt(e.time)}"
          @click=${()=>this._onMarkClick(e)}
        ></div>
      `)}_renderLoops(){const e=[];if(this.loopEnd>this.loopStart){const i={_scratch:!0,start:this.loopStart,end:this.loopEnd};if(this._loopInScope(i)){const r=this._pct(i.start),o=this._pct(i.end)-r;e.push(g`
          <div
            class="loop-bar loop-bar--scratch"
            style="left: ${r}%; width: ${o}%; top: 0px"
            title="Loop: ${this._fmt(i.start)} – ${this._fmt(i.end)}"
            @click=${()=>this._onLoopBarClick(i)}
          ></div>
        `)}}return this._packLoops(this.namedLoops??[]).forEach((i,r)=>{const o=(r+1)*7;for(const n of i){if(!this._loopInScope(n))continue;const a=this._pct(n.start),l=this._pct(n.end)-a;e.push(g`
          <div
            class="loop-bar"
            style="left: ${a}%; width: ${l}%; top: ${o}px"
            title="${n.name}: ${this._fmt(n.start)} – ${this._fmt(n.end)}"
            @click=${()=>this._onLoopBarClick(n)}
          ></div>
        `)}}),e}_fireSeekTo(e){this.dispatchEvent(new CustomEvent("ll-seek-to",{bubbles:!0,composed:!0,detail:{time:e}}))}_onSectionClick(e){this._fireSeekTo(e.start)}_onMarkClick(e){this._fireSeekTo(e.time)}_onLoopBarClick(e){e._scratch?this._fireSeekTo(e.start):this.dispatchEvent(new CustomEvent("ll-activate-loop",{bubbles:!0,composed:!0,detail:{id:e.id}}))}_onPlayZoneClick(e){if(!this.duration)return;const t=this.scopeStart??0,i=this.scopeEnd??this.duration,r=e.currentTarget.getBoundingClientRect(),o=(e.clientX-r.left)/r.width,n=Math.max(t,Math.min(i,t+o*(i-t)));this._fireSeekTo(n)}render(){if(!this.duration){const t=this.videoId?"Loading...":"No video loaded";return g`
        <div class="timeline-wrap">
          <div class="no-video">${t}</div>
        </div>
      `}const e=this._pct(this.currentTime);return g`
      <div class="timeline-wrap ${this.zoomed?"zoomed":""}">

        <div class="zone--play" @click=${this._onPlayZoneClick}>
          <div class="play-track">
            <div class="play-fill" style="width: ${e}%"></div>
          </div>
          <div class="play-dot" style="left: ${e}%"></div>
        </div>

        <div class="zone--section mode--${this.zone2Mode}">${this._renderSections()}</div>

        <div class="zone--mark">${this._renderMarks()}</div>

        <div class="zone--loop">${this._renderLoops()}</div>

      </div>
    `}}C(Bi,"styles",I`
    :host {
      display: block;
    }

    .timeline-wrap {
      background: var(--ll-bg, #1a1a1a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      overflow: hidden;
      user-select: none;
    }

    .no-video {
      height: 40px;
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

    .section-region:first-child {
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
  `),C(Bi,"properties",{videoId:{type:String},currentTime:{type:Number},duration:{type:Number},sections:{type:Array},chapters:{type:Array},zone2Mode:{type:String},marks:{type:Array},namedLoops:{type:Array},loopStart:{type:Number},loopEnd:{type:Number},scopeStart:{type:Number},scopeEnd:{type:Number},zoomed:{type:Boolean},_zoneWidth:{type:Number,state:!0}});customElements.define("llama-timeline",Bi);var xu=I`
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
`,A=class extends G{constructor(){super(...arguments),this.formControlController=new Sr(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new us(this,"help-text","label"),this.localize=new Ge(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var s;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((s=this.input)==null?void 0:s.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(s){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=s,this.value=this.__dateInput.value}get valueAsNumber(){var s;return this.__numberInput.value=this.value,((s=this.input)==null?void 0:s.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(s){this.__numberInput.valueAsNumber=s,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(s){s.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(s){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(s)}handleKeyDown(s){const e=s.metaKey||s.ctrlKey||s.shiftKey||s.altKey;s.key==="Enter"&&!e&&setTimeout(()=>{!s.defaultPrevented&&!s.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(s){this.input.focus(s)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(s,e,t="none"){this.input.setSelectionRange(s,e,t)}setRangeText(s,e,t,i="preserve"){const r=e??this.input.selectionStart,o=t??this.input.selectionEnd;this.input.setRangeText(s,r,o,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(s){this.input.setCustomValidity(s),this.formControlController.updateValidity()}render(){const s=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),t=this.label?!0:!!s,i=this.helpText?!0:!!e,o=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return g`
      <div
        part="form-control"
        class=${de({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":t,"form-control--has-help-text":i})}
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
            class=${de({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
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
              name=${O(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${O(this.placeholder)}
              minlength=${O(this.minlength)}
              maxlength=${O(this.maxlength)}
              min=${O(this.min)}
              max=${O(this.max)}
              step=${O(this.step)}
              .value=${Kn(this.value)}
              autocapitalize=${O(this.autocapitalize)}
              autocomplete=${O(this.autocomplete)}
              autocorrect=${O(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${O(this.pattern)}
              enterkeyhint=${O(this.enterkeyhint)}
              inputmode=${O(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${o?g`
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
            ${this.passwordToggle&&!this.disabled?g`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?g`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:g`
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
    `}};A.styles=[ne,Hn,xu];A.dependencies={"sl-icon":he};m([W(".input__control")],A.prototype,"input",2);m([Rt()],A.prototype,"hasFocus",2);m([b()],A.prototype,"title",2);m([b({reflect:!0})],A.prototype,"type",2);m([b()],A.prototype,"name",2);m([b()],A.prototype,"value",2);m([Wn()],A.prototype,"defaultValue",2);m([b({reflect:!0})],A.prototype,"size",2);m([b({type:Boolean,reflect:!0})],A.prototype,"filled",2);m([b({type:Boolean,reflect:!0})],A.prototype,"pill",2);m([b()],A.prototype,"label",2);m([b({attribute:"help-text"})],A.prototype,"helpText",2);m([b({type:Boolean})],A.prototype,"clearable",2);m([b({type:Boolean,reflect:!0})],A.prototype,"disabled",2);m([b()],A.prototype,"placeholder",2);m([b({type:Boolean,reflect:!0})],A.prototype,"readonly",2);m([b({attribute:"password-toggle",type:Boolean})],A.prototype,"passwordToggle",2);m([b({attribute:"password-visible",type:Boolean})],A.prototype,"passwordVisible",2);m([b({attribute:"no-spin-buttons",type:Boolean})],A.prototype,"noSpinButtons",2);m([b({reflect:!0})],A.prototype,"form",2);m([b({type:Boolean,reflect:!0})],A.prototype,"required",2);m([b()],A.prototype,"pattern",2);m([b({type:Number})],A.prototype,"minlength",2);m([b({type:Number})],A.prototype,"maxlength",2);m([b()],A.prototype,"min",2);m([b()],A.prototype,"max",2);m([b()],A.prototype,"step",2);m([b()],A.prototype,"autocapitalize",2);m([b()],A.prototype,"autocorrect",2);m([b()],A.prototype,"autocomplete",2);m([b({type:Boolean})],A.prototype,"autofocus",2);m([b()],A.prototype,"enterkeyhint",2);m([b({type:Boolean,converter:{fromAttribute:s=>!(!s||s==="false"),toAttribute:s=>s?"true":"false"}})],A.prototype,"spellcheck",2);m([b()],A.prototype,"inputmode",2);m([J("disabled",{waitUntilFirstUpdate:!0})],A.prototype,"handleDisabledChange",1);m([J("step",{waitUntilFirstUpdate:!0})],A.prototype,"handleStepChange",1);m([J("value",{waitUntilFirstUpdate:!0})],A.prototype,"handleValueChange",1);A.define("sl-input");class Fi extends D{constructor(){super(),this._value=""}show(){var e;this._value="",(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onInput(e){this._value=e.target.value}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._submit())}_submit(){const e=this._value.trim();e&&(this.dispatchEvent(new CustomEvent("ll-load-url",{detail:{url:e},bubbles:!0,composed:!0})),this.hide())}render(){return g`
      <llama-modal
        label="Load Video"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <sl-input
          placeholder="YouTube URL or video ID"
          .value=${this._value}
          @sl-input=${this._onInput}
          @keydown=${this._onKeyDown}
          clearable
        ></sl-input>
        <p class="url-hint">Paste a URL or bare video ID (e.g. dQw4w9WgXcQ)</p>

        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._submit}>Load</sl-button>
        </div>
      </llama-modal>
    `}}C(Fi,"styles",I`
    .url-hint {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-neutral-400);
    }
  `),C(Fi,"properties",{_value:{state:!0}});customElements.define("llama-url-input-modal",Fi);class qi extends D{constructor(){super(),this.videos=[],this.currentVideoId=null,this.mode="switch",this._filter="",this._selIdx=0}show(e){var t;this.mode=e||"switch",this._filter="",this._selIdx=0,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e,t;(e=this.renderRoot.querySelector(".video-list"))==null||e.scrollTo(0,0),(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterKeyDown(e){const t=this._filtered();if(e.key==="ArrowDown")e.preventDefault(),this._selIdx=Math.min(this._selIdx+1,t.length-1),this._scrollSelectedIntoView();else if(e.key==="ArrowUp")e.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(e.key==="Enter"){const i=t[this._selIdx]??t[0];i&&this._select(i)}}_onFilterInput(e){this._filter=e.target.value,this._selIdx=0}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".video-list"),t=e==null?void 0:e.querySelector(".video-row.selected");t==null||t.scrollIntoView({block:"nearest"})})}_select(e){this.mode==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-video",{detail:{id:e.id},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-pick-video",{detail:{videoId:e.id},bubbles:!0,composed:!0})),this.hide()}_sorted(){const e=this.currentVideoId;return[...this.videos].sort((t,i)=>{if(t.id===e)return-1;if(i.id===e)return 1;const r=t.name,o=i.name;return r&&!o?-1:!r&&o?1:r&&o?r.toLowerCase().localeCompare(o.toLowerCase()):0})}_filtered(){const e=this._filter.trim().toLowerCase(),t=this._sorted();return e?t.filter(i=>(i.name||"").toLowerCase().includes(e)||i.id.toLowerCase().includes(e)):t}_primaryLabel(e){return e.name||e.id}_subLabel(e){return e.id}render(){const e=this._filtered(),t=this.mode==="delete";return g`
      <llama-modal label=${t?"Delete Video":"Open Video"} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="video-list">
          ${e.length?e.map((r,o)=>g`
                <div
                  class="video-row
                    ${t?"mode-delete":""}
                    ${r.id===this.currentVideoId?"current":""}
                    ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="video-primary">${this._primaryLabel(r)}</div>
                  <div class="video-sub">${this._subLabel(r)}</div>
                </div>
              `):g`<div class="empty">No videos match.</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(qi,"styles",I`
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
  `),C(qi,"properties",{videos:{type:Array},currentVideoId:{type:String},mode:{type:String},_filter:{state:!0},_selIdx:{state:!0}});customElements.define("llama-video-picker",qi);class Wi extends D{constructor(){super(),this.video=null,this._name="",this._url="",this._start="",this._end=""}show(){var t;const e=this.video;e&&(this._name=e.name||"",this._url=e.url||"",this._start=e.start>0?Vo(e.start):"",this._end=e.end!=null?Vo(e.end):""),(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){if(!this.video)return;const e=be(this._start)??0,t=this._end.trim()?be(this._end)??null:null;this.dispatchEvent(new CustomEvent("ll-update-video",{detail:{id:this.video.id,name:this._name.trim(),url:this._url.trim(),start:e,end:t},bubbles:!0,composed:!0})),this.hide()}_delete(){this.video&&(this.dispatchEvent(new CustomEvent("ll-delete-video",{detail:{id:this.video.id},bubbles:!0,composed:!0})),this.hide())}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}_renderField(e,t,i,r,o){return g`
      <div class="field-row">
        <span class="field-label">${e}</span>
        <sl-input
          data-field=${t}
          placeholder=${r}
          .value=${i}
          @sl-input=${o}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `}render(){var e;return g`
      <llama-modal label="Edit Video" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField("Name","name",this._name,'Short label (e.g. "Autumn Leaves")',t=>{this._name=t.target.value})}
        ${this._renderField("URL","url",this._url,"YouTube URL or video ID",t=>{this._url=t.target.value})}
        ${this._renderField("Start","start",this._start,"0 or m:ss — effective start offset",t=>{this._start=t.target.value})}
        ${this._renderField("End","end",this._end,"m:ss or blank (use video duration)",t=>{this._end=t.target.value})}
        <div class="field-row">
          <span class="field-label">Video ID (read-only)</span>
          <div class="video-id">${((e=this.video)==null?void 0:e.id)??""}</div>
        </div>
        <div class="delete-row">
          <sl-button variant="danger" @click=${this._delete}>Delete Video</sl-button>
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Wi,"styles",I`
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
    .video-id {
      font-family: monospace;
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.2rem 0;
    }
    .delete-row {
      margin-top: 0.75rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--ll-border, #444);
    }
  `),C(Wi,"properties",{video:{type:Object},_name:{state:!0},_url:{state:!0},_start:{state:!0},_end:{state:!0}});function Vo(s){if(s==null||isNaN(s))return"";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-edit-video-modal",Wi);class Hi extends D{constructor(){super(),this.loopStart=0,this.loopEnd=0,this._name="",this._start="",this._end="",this._error=""}show(){var e;this._name="",this._start=Bo(this.loopStart),this._end=Bo(this.loopEnd),this._error="",(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){const e=be(this._start),t=be(this._end);if(e===null||t===null){this._error="Start and end are required.";return}if(t<=e){this._error="End must be after start.";return}this._error="",this.dispatchEvent(new CustomEvent("ll-save-loop",{detail:{name:this._name.trim(),start:e,end:t},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}_renderField(e,t,i,r,o){return g`
      <div class="field-row">
        <span class="field-label">${e}</span>
        <sl-input
          data-field=${t}
          placeholder=${r}
          .value=${i}
          @sl-input=${o}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `}render(){return g`
      <llama-modal label="Save Loop" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField("Name (optional)","name",this._name,'Short label (e.g. "outro lick")',e=>{this._name=e.target.value})}
        ${this._renderField("Start","start",this._start,"m:ss",e=>{this._start=e.target.value})}
        ${this._renderField("End","end",this._end,"m:ss",e=>{this._end=e.target.value})}
        ${this._error?g`<div class="error">${this._error}</div>`:""}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Hi,"styles",I`
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
  `),C(Hi,"properties",{loopStart:{type:Number},loopEnd:{type:Number},_name:{state:!0},_start:{state:!0},_end:{state:!0},_error:{state:!0}});function Bo(s){if(s==null||isNaN(s))return"";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-save-loop-modal",Hi);const Eu={jump:"Jump to Loop",load:"Load Loop",delete:"Delete Loop"};class Ki extends D{constructor(){super(),this.namedLoops=[],this.loopSource=null,this.mode="load",this._filter="",this._selIdx=0}show(e){var t;e&&(this.mode=e),this._filter="",this._selIdx=0,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onFilterKeyDown(e){const t=this._filtered();if(e.key==="ArrowDown")e.preventDefault(),this._selIdx=Math.min(this._selIdx+1,t.length-1),this._scrollSelectedIntoView();else if(e.key==="ArrowUp")e.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(e.key==="Enter"){const i=t[this._selIdx]??t[0];i&&this._select(i)}}_onFilterInput(e){this._filter=e.target.value,this._selIdx=0}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".loop-list"),t=e==null?void 0:e.querySelector(".loop-row.selected");t==null||t.scrollIntoView({block:"nearest"})})}_select(e){const t=this.mode;t==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-loop",{detail:{id:e.id,start:e.start},bubbles:!0,composed:!0})):t==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-loop",{detail:{id:e.id},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-load-loop",{detail:{id:e.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.namedLoops.filter(t=>(t.name||"").toLowerCase().includes(e)):this.namedLoops}_displayLabel(e){return e.name?e.name:`#${this.namedLoops.indexOf(e)+1}`}_subLabel(e){return`${Fo(e.start)} – ${Fo(e.end)}`}render(){const e=this._filtered(),t=Eu[this.mode]??"Select Loop",i=this.mode==="delete";return g`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="loop-list">
          ${e.length?e.map((r,o)=>g`
                <div
                  class="loop-row
                    ${i?"mode-delete":""}
                    ${r.id===this.loopSource?"active":""}
                    ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="loop-primary">${this._displayLabel(r)}</div>
                  <div class="loop-sub">${this._subLabel(r)}</div>
                </div>
              `):g`<div class="empty">No loops${this._filter?" match.":" saved."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(Ki,"styles",I`
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
  `),C(Ki,"properties",{namedLoops:{type:Array},loopSource:{type:String},mode:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function Fo(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-loop-picker",Ki);const Cu={jump:"Jump to Mark",edit:"Edit Mark",delete:"Delete Mark"};class Ji extends D{constructor(){super(),this.marks=[],this.mode="jump",this._filter="",this._selIdx=0}show(e){var t;e&&(this.mode=e),this._filter="",this._selIdx=0,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onFilterInput(e){this._filter=e.target.value,this._selIdx=0}_onFilterKeyDown(e){const t=this._filtered();if(e.key==="ArrowDown")e.preventDefault(),this._selIdx=Math.min(this._selIdx+1,t.length-1),this._scrollSelectedIntoView();else if(e.key==="ArrowUp")e.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(e.key==="Enter"){const i=t[this._selIdx]??t[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".mark-list"),t=e==null?void 0:e.querySelector(".mark-row.selected");t==null||t.scrollIntoView({block:"nearest"})})}_select(e){const t=this.mode;t==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-mark",{detail:{id:e.id,time:e.time},bubbles:!0,composed:!0})):t==="edit"?this.dispatchEvent(new CustomEvent("ll-pick-mark-edit",{detail:{id:e.id},bubbles:!0,composed:!0})):t==="delete"&&this.dispatchEvent(new CustomEvent("ll-delete-mark",{detail:{id:e.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.marks.filter(t=>(t.name||"").toLowerCase().includes(e)||qo(t.time).includes(e)):this.marks}render(){const e=this._filtered(),t=Cu[this.mode]??"Select Mark",i=this.mode==="delete";return g`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name or time…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="mark-list">
          ${e.length?e.map((r,o)=>g`
                <div
                  class="mark-row ${i?"mode-delete":""} ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="mark-primary">${qo(r.time)}</div>
                  ${r.name?g`<div class="mark-sub">${r.name}</div>`:""}
                </div>
              `):g`<div class="empty">No marks${this._filter?" match.":" set."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(Ji,"styles",I`
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
  `),C(Ji,"properties",{marks:{type:Array},mode:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function qo(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-marks-picker",Ji);class Gi extends D{constructor(){super(),this.mark=null,this._name="",this._time=""}show(e){var i;const t=e??this.mark;t&&(this.mark=t,this._name=t.name||"",this._time=Tu(t.time)),(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){if(!this.mark)return;const e=be(this._time);e!==null&&(this.dispatchEvent(new CustomEvent("ll-update-mark",{detail:{id:this.mark.id,name:this._name.trim(),time:e},bubbles:!0,composed:!0})),this.hide())}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}render(){return g`
      <llama-modal label="Edit Mark" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input
            data-field="name"
            placeholder="Optional label (e.g. "Bridge start")"
            .value=${this._name}
            @sl-input=${e=>{this._name=e.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Time (m:ss)</span>
          <sl-input
            data-field="time"
            placeholder="e.g. 1:23"
            .value=${this._time}
            @sl-input=${e=>{this._time=e.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Gi,"styles",I`
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
  `),C(Gi,"properties",{mark:{type:Object},_name:{state:!0},_time:{state:!0}});function Tu(s){if(s==null||isNaN(s))return"";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-edit-mark-modal",Gi);const Au={jump:"Jump to Section",edit:"Edit Section",delete:"Delete Section",open:"Open Section"};class Yi extends D{constructor(){super(),this.sections=[],this.mode="jump",this.activeSectionId=null,this._filter="",this._selIdx=0}show(e){var t;e&&(this.mode=e),this._filter="",this._selIdx=0,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onFilterInput(e){this._filter=e.target.value,this._selIdx=0}_onFilterKeyDown(e){const t=this._filtered();if(e.key==="ArrowDown")e.preventDefault(),this._selIdx=Math.min(this._selIdx+1,t.length-1),this._scrollSelectedIntoView();else if(e.key==="ArrowUp")e.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(e.key==="Enter"){const i=t[this._selIdx]??t[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".section-list"),t=e==null?void 0:e.querySelector(".section-row.selected");t==null||t.scrollIntoView({block:"nearest"})})}_select(e){const t=this.mode;t==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-section",{detail:{id:e.id,start:e.start},bubbles:!0,composed:!0})):t==="edit"?this.dispatchEvent(new CustomEvent("ll-pick-section-edit",{detail:{id:e.id},bubbles:!0,composed:!0})):t==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-section",{detail:{id:e.id},bubbles:!0,composed:!0})):t==="open"&&this.dispatchEvent(new CustomEvent("ll-open-section",{detail:{id:e.id,start:e.start},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.sections.filter(t=>(t.name||"").toLowerCase().includes(e)||vi(t.start).includes(e)):this.sections}render(){const e=this._filtered(),t=Au[this.mode]??"Select Section",i=this.mode==="delete";return g`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name or time…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="section-list">
          ${e.length?e.map((r,o)=>g`
                <div
                  class="section-row
                    ${i?"mode-delete":""}
                    ${r.id===this.activeSectionId?"active":""}
                    ${o===this._selIdx?"selected":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="section-primary">${r.name||vi(r.start)}</div>
                  ${r.name?g`<div class="section-sub">${vi(r.start)}</div>`:""}
                </div>
              `):g`<div class="empty">No sections${this._filter?" match.":" set."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(Yi,"styles",I`
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
  `),C(Yi,"properties",{sections:{type:Array},mode:{type:String},activeSectionId:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function vi(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-sections-picker",Yi);class Zi extends D{constructor(){super(),this.section=null,this._name="",this._time="",this._end="",this._derivedEnd=null,this._error=""}show(e,t=null){var r;const i=e??this.section;i&&(this.section=i,this._name=i.name||"",this._time=gi(i.start),this._end=gi(i.end),this._derivedEnd=t,this._error=""),(r=this.renderRoot.querySelector("llama-modal"))==null||r.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){if(!this.section)return;const e=be(this._time);if(e===null){this._error="Invalid start time.";return}let t=null;if(this._end.trim()){if(t=be(this._end),t===null){this._error="Invalid end time.";return}if(t<=e){this._error="End must be after start.";return}}this._error="",this.dispatchEvent(new CustomEvent("ll-update-section",{detail:{id:this.section.id,name:this._name.trim(),start:e,end:t},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}render(){const e=this._derivedEnd!=null?`${gi(this._derivedEnd)} (derived — leave blank to keep open-ended)`:"Leave blank to derive from next section";return g`
      <llama-modal label="Edit Section" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input
            data-field="name"
            placeholder="Optional label (e.g. &quot;Verse&quot;, &quot;Solo&quot;)"
            .value=${this._name}
            @sl-input=${t=>{this._name=t.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Start (m:ss)</span>
          <sl-input
            data-field="time"
            placeholder="e.g. 1:23"
            .value=${this._time}
            @sl-input=${t=>{this._time=t.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End (m:ss) — optional</span>
          <sl-input
            data-field="end"
            placeholder=${e}
            .value=${this._end}
            @sl-input=${t=>{this._end=t.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        ${this._error?g`<div class="error">${this._error}</div>`:""}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(Zi,"styles",I`
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
  `),C(Zi,"properties",{section:{type:Object},_name:{state:!0},_time:{state:!0},_end:{state:!0},_derivedEnd:{state:!0},_error:{state:!0}});function gi(s){if(s==null||isNaN(s))return"";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-edit-section-modal",Zi);class Xi extends D{constructor(){super(),this._value="",this._hasError=!1}show(){var e;this._value="",this._hasError=!1,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onInput(e){this._value=e.target.value,this._hasError=!1}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._submit())}_submit(){const e=be(this._value);if(e===null){this._hasError=!0;return}this.dispatchEvent(new CustomEvent("ll-jump-time",{detail:{time:e},bubbles:!0,composed:!0})),this.hide()}render(){return g`
      <llama-modal
        label="Jump to Time"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <sl-input
          placeholder="e.g. 1:23 or 83"
          .value=${this._value}
          @sl-input=${this._onInput}
          @keydown=${this._onKeyDown}
          clearable
        ></sl-input>
        ${this._hasError?g`<p class="time-error">Invalid time — use m:ss or raw seconds.</p>`:g`<p class="time-hint">Enter m:ss (e.g. 1:23) or raw seconds (e.g. 83).</p>`}

        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._submit}>Go</sl-button>
        </div>
      </llama-modal>
    `}}C(Xi,"styles",I`
    .time-hint {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-neutral-400);
    }
    .time-error {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-danger-600);
    }
  `),C(Xi,"properties",{_value:{state:!0},_hasError:{state:!0}});customElements.define("llama-jump-time-modal",Xi);const Iu={open:"Open Chapter",delete:"Delete Chapter",jump:"Jump to Chapter"};class Qi extends D{constructor(){super(),this.chapters=[],this.mode="open",this.activeChapterId=null,this._filter="",this._selIdx=0}show(e){var t;e&&(this.mode=e),this._filter="",this._selIdx=0,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onFilterInput(e){this._filter=e.target.value,this._selIdx=0}_onFilterKeyDown(e){const t=this._filtered();if(e.key==="ArrowDown")e.preventDefault(),this._selIdx=Math.min(this._selIdx+1,t.length-1),this._scrollSelectedIntoView();else if(e.key==="ArrowUp")e.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(e.key==="Enter"){const i=t[this._selIdx]??t[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".chapter-list"),t=e==null?void 0:e.querySelector(".chapter-row.selected");t==null||t.scrollIntoView({block:"nearest"})})}_select(e){const t=this.mode;t==="open"?this.dispatchEvent(new CustomEvent("ll-open-chapter",{detail:{id:e.id},bubbles:!0,composed:!0})):t==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-chapter",{detail:{id:e.id},bubbles:!0,composed:!0})):t==="jump"&&this.dispatchEvent(new CustomEvent("ll-jump-chapter",{detail:{id:e.id,time:e.start},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=this._filter.trim().toLowerCase();return e?this.chapters.filter(t=>(t.name||"").toLowerCase().includes(e)||bi(t.start,t.end).includes(e)):this.chapters}render(){const e=this._filtered(),t=Iu[this.mode]??"Select Chapter",i=this.mode==="delete";return g`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name or time…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="chapter-list">
          ${e.length?e.map((r,o)=>g`
                <div
                  class="chapter-row
                    ${i?"mode-delete":""}
                    ${o===this._selIdx?"selected":""}
                    ${r.id===this.activeChapterId?"active-chapter":""}"
                  @click=${()=>this._select(r)}
                >
                  <div class="chapter-primary">${r.name||bi(r.start,r.end)}</div>
                  ${r.name?g`<div class="chapter-sub">${bi(r.start,r.end)}</div>`:""}
                </div>
              `):g`<div class="empty">No chapters${this._filter?" match.":" set."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(Qi,"styles",I`
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
    .chapter-row.active-chapter {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .chapter-row.active-chapter.selected {
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
  `),C(Qi,"properties",{chapters:{type:Array},mode:{type:String},activeChapterId:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function Wo(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function bi(s,e){return`${Wo(s)} → ${Wo(e)}`}customElements.define("llama-chapter-picker",Qi);class er extends D{constructor(){super(),this._mode="create",this._id=null,this._name="",this._start="",this._end="",this._derivedEnd=null,this._error=""}showCreate(e,t){var i;this._mode="create",this._id=null,this._name="",this._start=Ft(e),this._end=Ft(t),this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}showEdit(e,t=null){var i;this._mode="edit",this._id=e.id,this._name=e.name||"",this._start=Ft(e.start),this._end=Ft(e.end),this._derivedEnd=t,this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||e.focus()}_save(){const e=be(this._start);if(e===null){this._error="Start is required.";return}let t=null;if(this._end.trim()){if(t=be(this._end),t===null){this._error="Invalid end time.";return}if(t<=e){this._error="End must be after start.";return}}this._error="",this._mode==="create"?this.dispatchEvent(new CustomEvent("ll-create-chapter",{detail:{name:this._name.trim(),start:e,end:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-update-chapter",{detail:{id:this._id,name:this._name.trim(),start:e,end:t},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}_renderField(e,t,i,r,o){return g`
      <div class="field-row">
        <span class="field-label">${e}</span>
        <sl-input
          data-field=${t}
          placeholder=${r}
          .value=${i}
          @sl-input=${o}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `}render(){const e=this._mode==="create"?"Create Chapter":"Edit Chapter",t=this._mode==="edit"&&this._derivedEnd!=null?`${Ft(this._derivedEnd)} (derived — leave blank to keep open-ended)`:"Leave blank to derive from next chapter";return g`
      <llama-modal label=${e} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField("Name (optional)","name",this._name,'e.g. "Verse", "Bridge"',i=>{this._name=i.target.value})}
        ${this._renderField("Start","start",this._start,"m:ss",i=>{this._start=i.target.value})}
        ${this._renderField("End — optional","end",this._end,t,i=>{this._end=i.target.value})}
        ${this._error?g`<div class="error">${this._error}</div>`:""}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}C(er,"styles",I`
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
  `),C(er,"properties",{_mode:{state:!0},_id:{state:!0},_name:{state:!0},_start:{state:!0},_end:{state:!0},_derivedEnd:{state:!0},_error:{state:!0}});function Ft(s){if(s==null||isNaN(s))return"";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-edit-chapter-modal",er);class tr extends D{constructor(){super(),this.videoName="",this.videoId=null,this.chapterName=null,this.sectionName=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.loopDirty=!1,this.duration=null,this.zoomLabel=null}_fmtDuration(e){const t=Math.floor(e/60),i=Math.floor(e%60).toString().padStart(2,"0");return`${t}:${i}`}_row(e,t){return g`
      <div class="current-row">
        <div class="row-label">${e}</div>
        <div class="row-value ${!t?"dim":""}">${t||"—"}</div>
      </div>
    `}_loopSourceValue(){if(!this.loopSourceType)return null;const e=this.loopSourceType[0].toUpperCase()+this.loopSourceType.slice(1),t=this.loopSourceLabel?`: ${this.loopSourceLabel}`:"";if(this.loopSourceStart==null||this.loopSourceEnd==null)return g`${e}${t}`;const i=` [${this._fmtDuration(this.loopSourceStart)} – ${this._fmtDuration(this.loopSourceEnd)}]`;return g`${e}${t}<span class="${this.loopDirty?"dirty-range":""}">${i}</span>`}render(){return g`
      <div class="current-panel">
        <div class="panel-title">Current</div>
        <div class="current-rows">
          ${this._row("Name",this.videoName)}
          ${this._row("Video ID",this.videoId)}
          ${this._row("Chapter",this.chapterName)}
          ${this._row("Section",this.sectionName)}
          <div class="current-row">
            <div class="row-label">Loop Source</div>
            <div class="row-value ${this.loopSourceType?"":"dim"}">${this._loopSourceValue()??"—"}</div>
          </div>
          ${this._row("Duration",this.duration!=null?this._fmtDuration(this.duration):null)}
          ${this.zoomLabel?g`
            <div class="current-row">
              <div class="row-label zoom-label">Zoom</div>
              <div class="row-value">${this.zoomLabel}</div>
            </div>`:""}
        </div>
      </div>
    `}}C(tr,"styles",I`
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

  `),C(tr,"properties",{videoName:{type:String},videoId:{type:String},chapterName:{type:String},sectionName:{type:String},loopSourceLabel:{type:String},loopSourceType:{type:String},loopSourceStart:{type:Number},loopSourceEnd:{type:Number},loopDirty:{type:Boolean},duration:{type:Number},zoomLabel:{type:String}});customElements.define("llama-current",tr);class sr extends D{constructor(){super(),this.video=null,this.chapters=[],this.sections=[],this.namedLoops=[],this.marks=[],this.duration=null,this._keyHandler=null}show(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.show(),this._addKeyHandler()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_addKeyHandler(){this._keyHandler||(this._keyHandler=e=>this._onKeyDown(e),document.addEventListener("keydown",this._keyHandler))}_removeKeyHandler(){this._keyHandler&&(document.removeEventListener("keydown",this._keyHandler),this._keyHandler=null)}_onKeyDown(e){const t=this.renderRoot.querySelector(".content");t&&(e.key==="ArrowDown"?(e.preventDefault(),t.scrollBy({top:60,behavior:"smooth"})):e.key==="ArrowUp"?(e.preventDefault(),t.scrollBy({top:-60,behavior:"smooth"})):e.key==="PageDown"?(e.preventDefault(),t.scrollBy({top:t.clientHeight*.9,behavior:"smooth"})):e.key==="PageUp"?(e.preventDefault(),t.scrollBy({top:-t.clientHeight*.9,behavior:"smooth"})):e.key==="Enter"&&(e.preventDefault(),this.hide()))}_onModalClose(){this._removeKeyHandler()}_fmt(e){if(e==null||isNaN(e))return"?";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}_renderVideo(){const e=this.video;if(!e)return g`<div class="empty">No video loaded.</div>`;const t=this.duration??e.duration,i=e.speed??1;return g`
      <div class="info-grid">
        <span class="info-label">ID</span>
        <span class="info-value">${e.id}</span>
        ${e.name?g`
          <span class="info-label">Name</span>
          <span class="info-value">${e.name}</span>
        `:""}
        <span class="info-label">URL</span>
        <span class="info-value">${e.url||"—"}</span>
        <span class="info-label">Duration</span>
        <span class="info-value">${t!=null?this._fmt(t):"—"}</span>
        <span class="info-label">Speed</span>
        <span class="info-value">${(i*100).toFixed(0)}%</span>
      </div>
    `}_renderChapters(){return this.chapters.length?g`
      <div class="entity-list">
        ${this.chapters.map(e=>g`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.start)} – ${this._fmt(e.end)}</span>
          </div>
        `)}
      </div>
    `:g`<div class="empty">None.</div>`}_renderSections(){return this.sections.length?g`
      <div class="entity-list">
        ${this.sections.map(e=>g`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.start)}</span>
          </div>
        `)}
      </div>
    `:g`<div class="empty">None.</div>`}_renderLoops(){return this.namedLoops.length?g`
      <div class="entity-list">
        ${this.namedLoops.map(e=>g`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.start)} – ${this._fmt(e.end)}</span>
          </div>
        `)}
      </div>
    `:g`<div class="empty">None.</div>`}_renderMarks(){return this.marks.length?g`
      <div class="entity-list">
        ${this.marks.map(e=>g`
          <div class="entity-row">
            <span class="entity-name ${e.name?"":"dim"}">${e.name||"—"}</span>
            <span class="entity-time">${this._fmt(e.time)}</span>
          </div>
        `)}
      </div>
    `:g`<div class="empty">None.</div>`}render(){return g`
      <llama-modal label="Video Info" @ll-modal-close=${this._onModalClose}>
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
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Close</sl-button>
        </div>
      </llama-modal>
    `}}C(sr,"styles",I`
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
  `),C(sr,"properties",{video:{type:Object},chapters:{type:Array},sections:{type:Array},namedLoops:{type:Array},marks:{type:Array},duration:{type:Number}});customElements.define("llama-video-info-modal",sr);class ir extends D{constructor(){super(),this.jumps=[],this._filter="",this._selIdx=0}show(){var e;this._filter="",this._selIdx=0,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onFilterInput(e){this._filter=e.target.value,this._selIdx=0}_onFilterKeyDown(e){const t=this._filtered();if(e.key==="ArrowDown")e.preventDefault(),this._selIdx=Math.min(this._selIdx+1,t.length-1),this._scrollSelectedIntoView();else if(e.key==="ArrowUp")e.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(e.key==="Enter"){const i=t[this._selIdx]??t[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".jump-list"),t=e==null?void 0:e.querySelector(".jump-row.selected");t==null||t.scrollIntoView({block:"nearest"})})}_select(e){this.dispatchEvent(new CustomEvent("ll-jump-history",{detail:{time:e.time},bubbles:!0,composed:!0})),this.hide()}_filtered(){const e=[...this.jumps].map((i,r)=>({time:i,idx:r})).reverse(),t=this._filter.trim().toLowerCase();return t?e.filter(i=>Ho(i.time).includes(t)):e}render(){const e=this._filtered();return g`
      <llama-modal label="Jump History" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by time…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="jump-list">
          ${e.length?e.map((t,i)=>g`
                <div
                  class="jump-row ${i===this._selIdx?"selected":""}"
                  @click=${()=>this._select(t)}
                >
                  <span class="jump-time">${Ho(t.time)}</span>
                  <span class="jump-idx">#${t.idx+1}</span>
                </div>
              `):g`<div class="empty">No jump history${this._filter?" matches.":"."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}C(ir,"styles",I`
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
    .jump-idx {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `),C(ir,"properties",{jumps:{type:Array},_filter:{state:!0},_selIdx:{state:!0}});function Ho(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-jump-history-picker",ir);var Ru=I`
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
`,Y=class extends G{constructor(){super(),this.localize=new Ge(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=s=>{s.key==="Escape"&&(s.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const s=Ro(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),s)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const s=Ro(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),s)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var s;super.disconnectedCallback(),(s=this.closeWatcher)==null||s.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(s){return this.trigger.split(" ").includes(s)}async handleOpenChange(){var s,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((s=this.closeWatcher)==null||s.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await qe(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:t,options:i}=Le(this,"tooltip.show",{dir:this.localize.dir()});await Oe(this.popup.popup,t,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await qe(this.body);const{keyframes:t,options:i}=Le(this,"tooltip.hide",{dir:this.localize.dir()});await Oe(this.popup.popup,t,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Ct(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ct(this,"sl-after-hide")}render(){return g`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${de({tooltip:!0,"tooltip--open":this.open})}
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
    `}};Y.styles=[ne,Ru];Y.dependencies={"sl-popup":j};m([W("slot:not([name])")],Y.prototype,"defaultSlot",2);m([W(".tooltip__body")],Y.prototype,"body",2);m([W("sl-popup")],Y.prototype,"popup",2);m([b()],Y.prototype,"content",2);m([b()],Y.prototype,"placement",2);m([b({type:Boolean,reflect:!0})],Y.prototype,"disabled",2);m([b({type:Number})],Y.prototype,"distance",2);m([b({type:Boolean,reflect:!0})],Y.prototype,"open",2);m([b({type:Number})],Y.prototype,"skidding",2);m([b()],Y.prototype,"trigger",2);m([b({type:Boolean})],Y.prototype,"hoist",2);m([J("open",{waitUntilFirstUpdate:!0})],Y.prototype,"handleOpenChange",1);m([J(["content","distance","hoist","placement","skidding"])],Y.prototype,"handleOptionsChange",1);m([J("disabled")],Y.prototype,"handleDisabledChange",1);Ne("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});Ne("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});Y.define("sl-tooltip");class rr extends D{constructor(){super(),this._seekDefault="",this._seekChoices="",this._nudgeDefault="",this._nudgeChoices="",this._speedDelta="",this._padStart="",this._padEnd="",this._error=""}show(e){var i;const t=e??P;this._seekDefault=String(t.seek_delta_default),this._seekChoices=t.seek_delta_choices.join(" "),this._nudgeDefault=String(t.loop_nudge_delta_default),this._nudgeChoices=t.loop_nudge_delta_choices.join(" "),this._speedDelta=String(Math.round(t.speed_delta*100)),this._padStart=String(t.loop_pad_start),this._padEnd=String(t.loop_pad_end),this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector('sl-input[data-field="seek-default"]'))==null||e.focus()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this._save())}_parseChoices(e){const t=e.trim().split(/\s+/).filter(Boolean);if(!t.length)return null;const i=t.map(Number);return i.some(r=>isNaN(r)||!isFinite(r)||r<=0)?null:[...new Set(i)].sort((r,o)=>r-o)}_parsePositive(e){const t=Number(e.trim());return isNaN(t)||!isFinite(t)||t<=0?null:t}_parseNonNeg(e){const t=Number(e.trim());return isNaN(t)||!isFinite(t)||t<0?null:t}_save(){const e=this._parseChoices(this._seekChoices);if(!e){this._error="Seek delta choices: enter space-separated positive numbers.";return}const t=this._parsePositive(this._seekDefault);if(t===null){this._error="Seek delta default: must be a positive number.";return}if(!e.includes(t)){this._error="Seek delta default must be one of the seek delta choices.";return}const i=this._parseChoices(this._nudgeChoices);if(!i){this._error="Loop nudge delta choices: enter space-separated positive numbers.";return}const r=this._parsePositive(this._nudgeDefault);if(r===null){this._error="Loop nudge delta default: must be a positive number.";return}if(!i.includes(r)){this._error="Loop nudge delta default must be one of the loop nudge delta choices.";return}const o=this._parsePositive(this._speedDelta);if(o===null){this._error="Speed delta: must be a positive number.";return}const n=o/100,a=this._parseNonNeg(this._padStart);if(a===null){this._error="Pad start: must be a non-negative number.";return}const l=this._parseNonNeg(this._padEnd);if(l===null){this._error="Pad end: must be a non-negative number.";return}const c={seek_delta_default:t,seek_delta_choices:e,loop_nudge_delta_default:r,loop_nudge_delta_choices:i,speed_delta:n,loop_pad_start:a,loop_pad_end:l};this.dispatchEvent(new CustomEvent("ll-options-saved",{detail:{options:c},bubbles:!0,composed:!0})),this.hide()}render(){return g`
      <llama-modal label="Options" @ll-modal-initial-focus=${this._onInitialFocus}>

        <div class="section-heading">
          Seek delta
          <sl-tooltip content="How far the seek keys jump (seconds). Default is the starting value; choices are the steps available in the dropdown.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Default</span>
          <sl-input
            data-field="seek-default"
            .value=${this._seekDefault}
            @sl-input=${e=>{this._seekDefault=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input
            .value=${this._seekChoices}
            @sl-input=${e=>{this._seekChoices=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">
          Loop nudge delta
          <sl-tooltip content="How far the loop start/end points move when nudged (seconds). Default is the starting value; choices are the steps available in the dropdown.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Default</span>
          <sl-input
            .value=${this._nudgeDefault}
            @sl-input=${e=>{this._nudgeDefault=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input
            .value=${this._nudgeChoices}
            @sl-input=${e=>{this._nudgeChoices=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">
          Speed
          <sl-tooltip content="Percentage point change applied each time you speed up or slow down.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Delta</span>
          <sl-input
            .value=${this._speedDelta}
            @sl-input=${e=>{this._speedDelta=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">
          Loop pad
          <sl-tooltip content="Extra seconds added before and after a section or chapter when you loop it.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Start</span>
          <sl-input
            .value=${this._padStart}
            @sl-input=${e=>{this._padStart=e.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End</span>
          <sl-input
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
    `}}C(rr,"styles",I`
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
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
      cursor: default;
      user-select: none;
    }
    .error-msg {
      color: var(--ll-error, #f87171);
      font-size: var(--ll-text-sm, 0.85rem);
      margin-top: 0.4rem;
      min-height: 1.2em;
    }
  `),C(rr,"properties",{_seekDefault:{state:!0},_seekChoices:{state:!0},_nudgeDefault:{state:!0},_nudgeChoices:{state:!0},_speedDelta:{state:!0},_padStart:{state:!0},_padEnd:{state:!0},_error:{state:!0}});customElements.define("llama-options-modal",rr);class or extends D{constructor(){super(),this._mode="current",this._checked={},this._sections=[],this._loops=[],this._marks=[],this._chapters=[],this._videos=[],this._currentVideoId=null,this._currentVideoName=null}show({videos:e,currentVideoId:t,currentVideoName:i,sections:r,namedLoops:o,marks:n,chapters:a,initialMode:l="current",preCheckedVideoId:c=null}){var h;this._mode=l,this._sections=r??[],this._loops=o??[],this._marks=n??[],this._chapters=a??[],this._videos=e??[],this._currentVideoId=t??null,this._currentVideoName=i??null,this._checked=c?{[c]:!0}:{},(h=this.renderRoot.querySelector("llama-modal"))==null||h.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_isChecked(e){return this._checked[e]??!1}_toggle(e){this._checked={...this._checked,[e]:!this._isChecked(e)}}_groupState(e){const t=e.filter(i=>this._isChecked(i.id)).length;return t===0?"none":t===e.length?"all":"some"}_setGroup(e,t){const i={};for(const r of e)i[r.id]=t;this._checked={...this._checked,...i}}_onGroupChange(e){this._setGroup(e,this._groupState(e)!=="all")}_renderGroup(e,t,i){if(!t.length)return"";const r=this._groupState(t);return g`
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
          ${t.map(o=>g`
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
    `}_renderCurrentVideoContent(){return this._currentVideoId?this._sections.length||this._loops.length||this._marks.length||this._chapters.length?g`
      <div class="current-video-label">
        Video: ${this._currentVideoName||this._currentVideoId}
      </div>
      ${this._renderGroup("Sections",this._sections,t=>g`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">@${mt(t.start)}</span>`)}
      ${this._renderGroup("Loops",this._loops,t=>g`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">${mt(t.start)} – ${mt(t.end)}</span>`)}
      ${this._renderGroup("Marks",this._marks,t=>g`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">@${mt(t.time)}</span>`)}
      ${this._renderGroup("Chapters",this._chapters,t=>g`<span class="item-label">${t.name||""}</span>
                    <span class="item-sub">${mt(t.start)} – ${mt(t.end)}</span>`)}
    `:g`<div class="empty-msg">Current video has no entities to delete.</div>`:g`<div class="no-video-msg">No video loaded.</div>`}_renderVideosContent(){if(!this._videos.length)return g`<div class="empty-msg">No videos saved.</div>`;const e=this._groupState(this._videos);return g`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${e==="all"}
            .indeterminate=${e==="some"}
            @change=${()=>this._onGroupChange(this._videos)}
          >
          <span>All videos (${this._videos.length})</span>
        </div>
        <div class="group-items">
          ${this._videos.map(t=>g`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(t.id)}
                @change=${()=>this._toggle(t.id)}
              >
              <span class="item-label">${t.name||t.id}</span>
              ${t.name?g`<span class="item-sub">${t.id}</span>`:""}
            </div>
          `)}
        </div>
      </div>
    `}_getSelectedCount(){return this._mode==="videos"?this._videos.filter(e=>this._isChecked(e.id)).length:[...this._sections,...this._loops,...this._marks,...this._chapters].filter(e=>this._isChecked(e.id)).length}_confirm(){if(this._mode==="videos"){const e=this._videos.filter(t=>this._isChecked(t.id)).map(t=>t.id);if(!e.length)return;this.dispatchEvent(new CustomEvent("ll-delete-data",{detail:{mode:"videos",videoIds:e},bubbles:!0,composed:!0}))}else{const e=this._sections.filter(o=>this._isChecked(o.id)).map(o=>o.id),t=this._loops.filter(o=>this._isChecked(o.id)).map(o=>o.id),i=this._marks.filter(o=>this._isChecked(o.id)).map(o=>o.id),r=this._chapters.filter(o=>this._isChecked(o.id)).map(o=>o.id);if(!e.length&&!t.length&&!i.length&&!r.length)return;this.dispatchEvent(new CustomEvent("ll-delete-data",{detail:{mode:"current",sections:e,loops:t,marks:i,chapters:r},bubbles:!0,composed:!0}))}this.hide()}render(){const e=this._getSelectedCount();return g`
      <llama-modal label="Delete Video Data">
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
    `}}C(or,"styles",I`
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
    .current-video-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-bottom: 0.75rem;
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
      align-items: center;
      gap: 0.5rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
    .item-label {
      color: var(--ll-text, #e0e0e0);
    }
    .item-sub {
      color: var(--ll-text-dim, #aaa);
    }
    input[type="checkbox"] {
      cursor: pointer;
      accent-color: var(--ll-accent, #7ec8e3);
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
  `),C(or,"properties",{_mode:{state:!0},_checked:{state:!0},_sections:{state:!0},_loops:{state:!0},_marks:{state:!0},_chapters:{state:!0},_videos:{state:!0},_currentVideoId:{state:!0},_currentVideoName:{state:!0}});function mt(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}customElements.define("llama-delete-data-modal",or);class nr extends D{constructor(){super(),this._json=""}show(e){var t;try{this._json=JSON.stringify(e,null,2)}catch(i){this._json=`(serialization error: ${i.message})`}(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var e;(e=this.renderRoot.querySelector("llama-modal"))==null||e.hide()}_onInitialFocus(){var e;(e=this.renderRoot.querySelector(".json-pre"))==null||e.focus()}_onKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this.hide())}render(){return g`
      <llama-modal
        label="Inspect App Data"
        width="60vw"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <pre class="json-pre" tabindex="0" @keydown=${this._onKeyDown}>${this._json}</pre>
        <div slot="footer">
          <sl-button @click=${this.hide}>Close</sl-button>
        </div>
      </llama-modal>
    `}}C(nr,"styles",I`
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
  `),C(nr,"properties",{_json:{state:!0}});customElements.define("llama-inspect-modal",nr);const vt=[.1,1,5,10,30],Lu=3e3,_i=["Freedom isn't free — but looping is","Freedom to loop","How about a little something, you know, for the effort","I have two speeds: loop and nap","It's loops all the way down","Keep on loopin' in the free world!","Loop the good stuff","Time is a flat circle — so a loop"];class ar extends D{constructor(){super(),this.currentTime=0,this.duration=null,this.speed=1,this.isPlaying=!1,this.looping=!1,this.loopStart=0,this.loopEnd=0,this.sections=[],this.marks=[],this.namedLoops=[],this.jumps=[],this.loopSource=null,this.statusMsg="Initializing...",this.wkPrefix=null,this.wkCompletions=null,this.wkCount=null,this.windowFocused=!0,this.editScratchActive=!1,this.editScratchFocus="start",this.editScratchDelta=vt[2],this._appState=Da()??wa(),this.videos=this._appState.videos,this.currentVideoId=this._appState.currentVideoId,this.activeEntityType="any",this.chapters=[],this.activeChapterId=null,this.zoomSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.warningMsg=null,this.errorMsg=null,this.zone2Mode="sections",this.loopSourceStart=null,this.loopSourceEnd=null,this._quip="",this._quipIndex=-1,this._quipInterval=null,this._warnTimeout=null,this._statusTimeout=null,this._errorTimeout=null,this._vc=null,this._kb=null,this._pollId=null,this._editScratchHandler=null,this._urlInputModalEl=null,this._videoPickerEl=null,this._editVideoModalEl=null,this._saveLoopModalEl=null,this._loopPickerEl=null,this._marksPickerEl=null,this._editMarkModalEl=null,this._sectionsPickerEl=null,this._editSectionModalEl=null,this._jumpTimeModalEl=null,this._chapterPickerEl=null,this._editChapterModalEl=null,this._videoInfoModalEl=null,this._jumpHistoryPickerEl=null,this._optionsModalEl=null,this._deleteDataModalEl=null,this._fileInputEl=null,this._jumpIdx=-1,this._jumpFromTime=null,this._suppressJumpPush=!1,this._undoStack=[],this._redoStack=[],this.seekDelta=P.seek_delta_default,this.speedDelta=P.speed_delta,this.loopNudgeDelta=P.loop_nudge_delta_default}updated(e){e.has("statusMsg")&&this.statusMsg&&(clearTimeout(this._statusTimeout),this._statusTimeout=setTimeout(()=>{this.statusMsg=null},4e3)),e.has("warningMsg")&&this.warningMsg&&(clearTimeout(this._warnTimeout),this._warnTimeout=setTimeout(()=>{this.warningMsg=null},4e3)),e.has("errorMsg")&&this.errorMsg&&(clearTimeout(this._errorTimeout),this._errorTimeout=setTimeout(()=>{this.errorMsg=null},4e3))}_syncFromVideo(e){var i;this.chapters=[...e.chapters??[]],this.sections=[...e.sections??[]],this.marks=[...e.marks??[]],this.namedLoops=(e.loops??[]).filter(r=>!r.is_scratch),this.jumps=[...e.jumps??[]],this._jumpIdx=-1,this._jumpFromTime=null;const t=(e.loops??[]).find(r=>r.is_scratch);this.loopStart=(t==null?void 0:t.start)??0,this.loopEnd=(t==null?void 0:t.end)??0,this.looping=e.looping??!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.speed=e.speed??1,(i=this._vc)==null||i.setPlaybackRate(this.speed),this.zoomSource=null,this.activeChapterId&&(this.activeChapterId=null)}_maybePushJump(e,t){var r;if(this._suppressJumpPush||Math.abs(t-e)<=ya)return;const i=(r=this._appState)==null?void 0:r.videos.find(o=>o.id===this.currentVideoId);i&&(i.jumps.push(e),i.jumps.length>_a&&i.jumps.shift(),this.jumps=[...i.jumps],this._jumpIdx=-1,this._jumpFromTime=null,ee(this._appState))}_saveCurrentState(){var i,r;const e=(i=this._appState)==null?void 0:i.videos.find(o=>o.id===this.currentVideoId);if(!e)return;e.chapters=this.chapters,e.sections=this.sections,e.marks=this.marks,e.jumps=this.jumps,e.time=this.currentTime;let t=(r=e.loops)==null?void 0:r.find(o=>o.is_scratch);t||(t=yi()),t.start=this.loopStart,t.end=this.loopEnd,e.looping=this.looping,e.loops=[t,...this.namedLoops],ee(this._appState)}_applyOptions(e){if(!e)return;e.loop_nudge_delta_default==null&&(e.loop_nudge_delta_default=P.loop_nudge_delta_default),e.loop_nudge_delta_choices==null&&(e.loop_nudge_delta_choices=P.loop_nudge_delta_choices);const t=e.seek_delta_choices,i=e.loop_nudge_delta_choices;t.includes(this.seekDelta)||(this.seekDelta=e.seek_delta_default),i.includes(this.loopNudgeDelta)||(this.loopNudgeDelta=e.loop_nudge_delta_default),this.speedDelta=e.speed_delta}_onOptionsSaved(e){const{options:t}=e.detail;this._appState.options=t,this._applyOptions(t),ee(this._appState),this.statusMsg="Options saved."}_loadVideoObject(e,t=null){this._saveCurrentState(),this._appState.currentVideoId=e.id,this.currentVideoId=e.id,this._syncFromVideo(e);const i=t??(this.looping&&this.loopStart<this.loopEnd?this.loopStart:e.time??0);this._vc.loadVideo(e.id,i),this.duration=null,this.statusMsg=`Loading: ${e.id}`,ee(this._appState),bo(e.id)}_speedChange(e){var o,n;const t=((o=this._vc)==null?void 0:o.getPlaybackRate())??1,i=Math.round((t+e)*100)/100,r=Math.max(.25,Math.min(2,i));(n=this._vc)==null||n.setPlaybackRate(r),this.speed=r}_flash(e,t="timed"){var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.flash(e,t)}_pushUndoSnapshot(e=""){const t={videos:JSON.parse(JSON.stringify(this._appState.videos)),currentVideoId:this.currentVideoId,desc:e};this._undoStack.push(t),this._undoStack.length>20&&this._undoStack.shift(),this._redoStack=[]}_currentSnapshot(){return this._saveCurrentState(),{videos:JSON.parse(JSON.stringify(this._appState.videos)),currentVideoId:this.currentVideoId}}_applySnapshot(e){var i,r;this._appState.videos=JSON.parse(JSON.stringify(e.videos)),this.videos=[...this._appState.videos];const t=this._appState.videos.find(o=>o.id===e.currentVideoId)??null;e.currentVideoId!==this.currentVideoId?(this._appState.currentVideoId=e.currentVideoId,this.currentVideoId=e.currentVideoId,t?(this._syncFromVideo(t),(i=this._vc)==null||i.cueVideo(t.id,t.time??0),this.duration=null):((r=this._vc)==null||r.pause(),this.sections=[],this.marks=[],this.namedLoops=[],this.chapters=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null)):t&&(this.sections=[...t.sections??[]],this.marks=[...t.marks??[]],this.namedLoops=(t.loops??[]).filter(o=>!o.is_scratch),this.chapters=[...t.chapters??[]],this.loopSource&&this.loopSourceType==="loop"&&!this.namedLoops.find(o=>o.id===this.loopSource)&&(this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null)),ee(this._appState)}_undo(){if(!this._undoStack.length){this._setWarning("Nothing to undo.");return}const e=this._undoStack.pop();this._redoStack.push({...this._currentSnapshot(),desc:e.desc}),this._applySnapshot(e),this.statusMsg=`Undone: ${e.desc}`}_redo(){if(!this._redoStack.length){this._setWarning("Nothing to redo.");return}const e=this._redoStack.pop();this._undoStack.push({...this._currentSnapshot(),desc:e.desc}),this._applySnapshot(e),this.statusMsg=`Redone: ${e.desc}`}_makeHandlers(){const e=()=>this.currentVideoId?!1:(this._setWarning("No video loaded."),!0);return{playPause:()=>{e()||this._onPlayPause()},speedDown:(t=1)=>{this._speedChange(-this.speedDelta*t),this._flash("speed")},speedUp:(t=1)=>{this._speedChange(this.speedDelta*t),this._flash("speed")},speedReset:()=>{var t;(t=this._vc)==null||t.setPlaybackRate(1),this.speed=1,this._flash("speed")},seekForward:(t=1)=>{e()||(this._seek(this.seekDelta*t),this._flash("time"))},seekBack:(t=1)=>{e()||(this._seek(-this.seekDelta*t),this._flash("time"))},seekDeltaDown:()=>{var r;const t=((r=this._appState)==null?void 0:r.options.seek_delta_choices)??P.seek_delta_choices,i=t.indexOf(this.seekDelta);this.seekDelta=t[Math.max(i-1,0)],this._flash("seekDelta")},seekDeltaUp:()=>{var r;const t=((r=this._appState)==null?void 0:r.options.seek_delta_choices)??P.seek_delta_choices,i=t.indexOf(this.seekDelta);this.seekDelta=t[Math.min(i+1,t.length-1)],this._flash("seekDelta")},prevEntity:(t=1)=>this._navigateEntity("prev",t),entityType:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusEntitySelect(),this._flash("entitySelect","until-blur")},nextEntity:(t=1)=>this._navigateEntity("next",t),jumpToStart:()=>{var i,r;if(e())return;const t=this.looping?this.loopStart:0;this._maybePushJump(((i=this._vc)==null?void 0:i.getCurrentTime())??0,t),(r=this._vc)==null||r.seekTo(t),this._flash("time")},setLoopStart:()=>{var t;e()||(this.loopStart=((t=this._vc)==null?void 0:t.getCurrentTime())??0,this._autoDisableLoopIfInvalid(),this._flash("loopStart"))},setLoopEnd:()=>{var t;e()||(this.loopEnd=((t=this._vc)==null?void 0:t.getCurrentTime())??0,this._autoDisableLoopIfInvalid(),this._flash("loopEnd"))},resetLoopStart:()=>{e()||(this.loopStart=0,this._autoDisableLoopIfInvalid(),this._flash("loopStart"))},resetLoopEnd:()=>{e()||(this.loopEnd=this.duration??0,this._autoDisableLoopIfInvalid(),this._flash("loopEnd"))},nudgeStartDown:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopStart=qr(-this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopStart")},nudgeStartUp:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopStart=qr(+this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopStart")},nudgeEndDown:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopEnd=Wr(-this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopEnd")},nudgeEndUp:(t=1)=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopEnd=Wr(+this.loopNudgeDelta*t,i),this._autoDisableLoopIfInvalid(),this._flash("loopEnd")},focusLoopNudgeDelta:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusNudgeDeltaSelect(),this._flash("nudgeDelta","until-blur")},focusLoopStart:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusStartInput(),this._flash("loopStart","until-blur")},focusLoopEnd:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusEndInput(),this._flash("loopEnd","until-blur")},undo:()=>this._undo(),redo:()=>this._redo(),helpKeys:()=>window.open(`${Ko()}/loopllama/v2/keybindings/`,"_blank"),options:()=>{var t,i;return(i=this._optionsModalEl)==null?void 0:i.show((t=this._appState)==null?void 0:t.options)},videoUrl:()=>{var t;return(t=this._urlInputModalEl)==null?void 0:t.show()},videoPicker:()=>{var t;return(t=this._videoPickerEl)==null?void 0:t.show()},editVideo:()=>{var t;return(t=this._editVideoModalEl)==null?void 0:t.show()},loopVideo:()=>{if(this.duration==null){this._setError("Video duration not yet known.");return}this._clearZoomIfOutside(0,this.duration),this.loopStart=0,this.loopEnd=this.duration,this.looping=!0,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=0,this.loopSourceEnd=this.duration,this.statusMsg="Looping full video."},deleteVideo:()=>{var t,i;if(!((t=this._appState)!=null&&t.videos.length)){this._setWarning("No videos saved.");return}(i=this._videoPickerEl)==null||i.show("delete")},jumpTime:()=>{var t;(t=this.renderRoot.querySelector("llama-controls"))==null||t.focusTimeInput(),this._flash("time","until-blur")},jumpSection:()=>this._openSectionsPicker("jump"),jumpLoop:()=>this._openLoopsPicker("jump"),jumpMark:()=>this._openMarksPicker("jump"),jumpChapter:()=>this._openChapterPicker("jump"),jumpHistory:()=>{var t;return(t=this._jumpHistoryPickerEl)==null?void 0:t.show()},jumpBack:()=>{var i,r;if(!this.jumps.length){this._setWarning("No jump history.");return}if(this._jumpIdx===-1)this._jumpFromTime=((i=this._vc)==null?void 0:i.getCurrentTime())??0,this._jumpIdx=this.jumps.length-1;else if(this._jumpIdx>0)this._jumpIdx--;else{this._setWarning("At oldest jump.");return}const t=this.jumps[this._jumpIdx];this._suppressJumpPush=!0,(r=this._vc)==null||r.seekTo(t),this._suppressJumpPush=!1,this.statusMsg=`Jump back: ${te(t)}`,this._flash("time")},jumpForward:()=>{var t,i;if(this._jumpIdx===-1){this._setWarning("At current position.");return}if(this._jumpIdx<this.jumps.length-1){this._jumpIdx++;const r=this.jumps[this._jumpIdx];this._suppressJumpPush=!0,(t=this._vc)==null||t.seekTo(r),this._suppressJumpPush=!1,this.statusMsg=`Jump forward: ${te(r)}`,this._flash("time")}else{this._jumpIdx=-1;const r=this._jumpFromTime??0;this._jumpFromTime=null,this._suppressJumpPush=!0,(i=this._vc)==null||i.seekTo(r),this._suppressJumpPush=!1,this.statusMsg="Returned to current position.",this._flash("time")}},toggleLoop:()=>{if(!e()){if(!this.looping&&!this._isLoopValid()){this._setWarning("Invalid loop range: start must be before end.");return}this.looping=!this.looping,this.looping&&this._seekIntoLoopIfNeeded()}},saveLoop:()=>{var t;return(t=this._saveLoopModalEl)==null?void 0:t.show()},openLoop:()=>this._openLoopsPicker("load"),saveBack:()=>{var t,i;if(!this.loopSource){this._setWarning("No source to save back to.");return}if(this.loopStart>=this.loopEnd){this._setWarning("Scratch loop is invalid (start must be before end).");return}if(this.loopSourceType==="loop"){const r=this.namedLoops.findIndex(o=>o.id===this.loopSource);if(r===-1){this._setWarning("Source loop not found.");return}this._pushUndoSnapshot("Loop updated"),this.namedLoops[r].start=this.loopStart,this.namedLoops[r].end=this.loopEnd,this.namedLoops=[...this.namedLoops],this.loopSourceStart=this.loopStart,this.loopSourceEnd=this.loopEnd,this.statusMsg="Loop updated",this._saveCurrentState();return}if(this.loopSourceType==="section"||this.loopSourceType==="chapter"){const r=this.loopSourceType==="section",o=r?"section":"chapter",n=r?this.sections:this.chapters,a=n.findIndex(d=>d.id===this.loopSource);if(a===-1){this._setWarning(`Source ${o} not found.`);return}const l=((t=this._appState)==null?void 0:t.options.loop_pad_start)??P.loop_pad_start,c=((i=this._appState)==null?void 0:i.options.loop_pad_end)??P.loop_pad_end,h=this.loopStart+l,p=this.loopEnd-c;if(h>=p){this._setWarning("Padded range too small — cannot compute valid entity bounds.");return}if(!ei(n,a,h,p,this.duration)){this._setWarning(`Save-back would eliminate a neighbor ${o}.`);return}this._pushUndoSnapshot(`${r?"Section":"Chapter"} updated`),ti(n,a,h,p),r?this.sections=[...this.sections]:this.chapters=[...this.chapters],this.loopSourceStart=h,this.loopSourceEnd=p,this.statusMsg=`${r?"Section":"Chapter"} saved back.`,this._saveCurrentState();return}this._setWarning("No source to save back to.")},resetLoopToSource:()=>{var r,o;if(!this.loopSource){this._setWarning("No source to reset to.");return}const t=this.loopSourceType!=="loop"?((r=this._appState)==null?void 0:r.options.loop_pad_start)??P.loop_pad_start:0,i=this.loopSourceType!=="loop"?((o=this._appState)==null?void 0:o.options.loop_pad_end)??P.loop_pad_end:0;this.loopStart=Math.max(0,this.loopSourceStart-t),this.loopEnd=this.loopSourceEnd+i,this._clearZoomIfOutside(this.loopStart,this.loopEnd),this._autoDisableLoopIfInvalid(),this.statusMsg="Loop reset to source."},unlinkLoopSource:()=>{if(!this.loopSource){this._setWarning("No source to unlink.");return}this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.statusMsg="Loop source unlinked."},editScratch:()=>this._enterEditScratch(),deleteLoop:()=>this._openLoopsPicker("delete"),zoomLoop:()=>{var t;if(((t=this.zoomSource)==null?void 0:t.trigger)==="loop"){this.zoomSource=null,this.statusMsg="Loop zoom off.";return}if(!this._isLoopValid()){this._setWarning("No valid scratch loop to zoom.");return}if(this.loopStart===0&&this.loopEnd===this.duration){this._setWarning("Loop spans full video; zoom has no effect.");return}this.zoomSource={start:this.loopStart,end:this.loopEnd,trigger:"loop"},this.statusMsg="Loop zoom on.",this._seekIntoZoomIfNeeded()},zoomSection:()=>{var i;if(((i=this.zoomSource)==null?void 0:i.trigger)==="section"){this.zoomSource=null,this.statusMsg="Section zoom off.";return}const t=Nt(this.sections,this.currentTime,this.duration);if(!t||t.end==null){this._setWarning("No section at current position.");return}this.zoomSource={start:t.start,end:t.end,trigger:"section"},this.statusMsg="Section zoom on."},setSection:()=>{var r;const t=((r=this._vc)==null?void 0:r.getCurrentTime())??0,i=Ie(this.sections,t);if(i&&i.end!=null&&t<=i.end){this._setWarning("Cannot set section inside a fixed section.");return}this._pushUndoSnapshot("Section created"),Br(this.sections,t),this.sections=[...this.sections],this.statusMsg="Section created",this._saveCurrentState()},editSection:()=>this._editCurrentSection(),openSection:()=>this._openSectionsPicker("open"),loopSection:()=>{var l,c;const t=Nt(this.sections,this.currentTime,this.duration);if(!t||t.end==null){this._setWarning("No section at current position.");return}const i=Ie(this.sections,this.currentTime),r=((l=this._appState)==null?void 0:l.options.loop_pad_start)??P.loop_pad_start,o=((c=this._appState)==null?void 0:c.options.loop_pad_end)??P.loop_pad_end,n=Math.max(0,t.start-r),a=t.end+o;this._clearZoomIfOutside(n,a),this.loopStart=n,this.loopEnd=a,this.looping=!0,this.loopSource=(i==null?void 0:i.id)??null,this.loopSourceLabel=(i==null?void 0:i.name)||null,this.loopSourceType="section",this.loopSourceStart=t.start,this.loopSourceEnd=t.end,this.statusMsg="Looping section."},deleteSection:()=>this._openSectionsPicker("delete"),fixSection:()=>{const t=Ie(this.sections,this.currentTime);if(!t){this._setWarning("No section at current position.");return}if(t.end!=null)this._pushUndoSnapshot("Section end unfixed"),t.end=null,this.statusMsg="Section end unfixed.";else{if(this.duration==null){this._setError("Video duration not yet known.");return}this._pushUndoSnapshot("Section end fixed"),Ia(this.sections,t.id,this.duration),this.statusMsg="Section end fixed."}this.sections=[...this.sections],this._saveCurrentState()},setMark:()=>{var i;const t=((i=this._vc)==null?void 0:i.getCurrentTime())??0;if(!Vr(this.marks,t)){this._setWarning("Mark already exists at this time.");return}this._pushUndoSnapshot("Mark created"),this.marks=[...this.marks],this.statusMsg="Mark created",this._saveCurrentState()},editMark:()=>this._openMarksPicker("edit"),deleteMark:()=>this._openMarksPicker("delete"),setChapter:()=>{var r;const t=((r=this._vc)==null?void 0:r.getCurrentTime())??0,i=qt(this.chapters,t);if(i&&i.end!=null&&t<=i.end){this._setWarning("Cannot set chapter inside a fixed chapter.");return}this._pushUndoSnapshot("Chapter created"),La(this.chapters,t),this.chapters=[...this.chapters],this.statusMsg="Chapter created",this._saveCurrentState()},openChapter:()=>this._openChapterPicker("open"),editChapter:()=>this._editCurrentChapter(),loopChapter:()=>{var l,c;const t=Qs(this.chapters,this.currentTime,this.duration);if(!t||t.end==null){this._setWarning("No chapter at current position.");return}const i=qt(this.chapters,this.currentTime),r=((l=this._appState)==null?void 0:l.options.loop_pad_start)??P.loop_pad_start,o=((c=this._appState)==null?void 0:c.options.loop_pad_end)??P.loop_pad_end,n=Math.max(0,t.start-r),a=t.end+o;this._clearZoomIfOutside(n,a),this.loopStart=n,this.loopEnd=a,this.looping=!0,this.loopSource=(i==null?void 0:i.id)??null,this.loopSourceLabel=(i==null?void 0:i.name)||null,this.loopSourceType="chapter",this.loopSourceStart=t.start,this.loopSourceEnd=t.end,this.statusMsg="Looping chapter."},deleteChapter:()=>this._openChapterPicker("delete"),fixChapter:()=>{const t=qt(this.chapters,this.currentTime);if(!t){this._setWarning("No chapter at current position.");return}if(t.end!=null)this._pushUndoSnapshot("Chapter end unfixed"),t.end=null,this.statusMsg="Chapter end unfixed.";else{if(this.duration==null){this._setError("Video duration not yet known.");return}this._pushUndoSnapshot("Chapter end fixed"),Ra(this.chapters,t.id,this.duration),this.statusMsg="Chapter end fixed."}this.chapters=[...this.chapters],this._saveCurrentState()},toggleZone2:()=>{this.zone2Mode=this.zone2Mode==="sections"?"chapters":"sections",this.statusMsg=`Zone 2: ${this.zone2Mode}.`},zoomChapter:()=>{var i;if(((i=this.zoomSource)==null?void 0:i.trigger)==="chapter"){this.zoomSource=null,this.statusMsg="Chapter zoom off.";return}if(!this.activeChapterId){this._setWarning("No active chapter. Open one first (co).");return}const t=this.chapters.find(r=>r.id===this.activeChapterId);if(!t){this._setWarning("Active chapter not found.");return}this.zoomSource={start:t.start,end:t.end,trigger:"chapter"},this.statusMsg="Chapter zoom on.",this._seekIntoZoomIfNeeded()},videoInfo:()=>{var t;return(t=this._videoInfoModalEl)==null?void 0:t.show()},helpGeneral:()=>window.open(`${Ko()}/loopllama/v2/help/`,"_blank"),deleteData:()=>{var i,r,o;const t=(i=this._appState)==null?void 0:i.videos.find(n=>n.id===this.currentVideoId);(o=this._deleteDataModalEl)==null||o.show({videos:((r=this._appState)==null?void 0:r.videos)??[],currentVideoId:this.currentVideoId,currentVideoName:(t==null?void 0:t.name)||(t==null?void 0:t.id)||null,sections:this.sections,namedLoops:this.namedLoops,marks:this.marks,chapters:this.chapters})},exportAll:()=>this._exportAll(),importData:()=>{var t;return(t=this._fileInputEl)==null?void 0:t.click()},inspectData:()=>{var t;return(t=this._inspectModalEl)==null?void 0:t.show(JSON.parse(Hr(this._appState)))},shareVideo:()=>this._createVideoShare(),shareLoop:()=>this._createLoopShare()}}async firstUpdated(){md();const e=this.renderRoot.querySelector("#player-container");if(this._vc=va({onReady:()=>{this.statusMsg="Player ready. Enter a YouTube URL or video ID above."},onStateChange:i=>{if(i===0&&(this.statusMsg="Ended"),i===1||i===5){const r=this._appState.videos.find(o=>o.id===this.currentVideoId);if(r&&!r.name){const o=this._vc.getVideoTitle();o&&(r.name=o,this.videos=[...this._appState.videos],ee(this._appState))}}}}),await this._vc.initialize(e),this._handlers=this._makeHandlers(),this._kb=ga(this._handlers,{onPendingKey:(i,r)=>{this.wkPrefix=i,this.wkCompletions=r},onCountChange:i=>{this.wkCount=i}}),this._urlInputModalEl=this.renderRoot.querySelector("llama-url-input-modal"),this._videoPickerEl=this.renderRoot.querySelector("llama-video-picker"),this._editVideoModalEl=this.renderRoot.querySelector("llama-edit-video-modal"),this._saveLoopModalEl=this.renderRoot.querySelector("llama-save-loop-modal"),this._loopPickerEl=this.renderRoot.querySelector("llama-loop-picker"),this._marksPickerEl=this.renderRoot.querySelector("llama-marks-picker"),this._editMarkModalEl=this.renderRoot.querySelector("llama-edit-mark-modal"),this._sectionsPickerEl=this.renderRoot.querySelector("llama-sections-picker"),this._editSectionModalEl=this.renderRoot.querySelector("llama-edit-section-modal"),this._jumpTimeModalEl=this.renderRoot.querySelector("llama-jump-time-modal"),this._chapterPickerEl=this.renderRoot.querySelector("llama-chapter-picker"),this._editChapterModalEl=this.renderRoot.querySelector("llama-edit-chapter-modal"),this._videoInfoModalEl=this.renderRoot.querySelector("llama-video-info-modal"),this._jumpHistoryPickerEl=this.renderRoot.querySelector("llama-jump-history-picker"),this._optionsModalEl=this.renderRoot.querySelector("llama-options-modal"),this._deleteDataModalEl=this.renderRoot.querySelector("llama-delete-data-modal"),this._inspectModalEl=this.renderRoot.querySelector("llama-inspect-modal"),this._confirmModalEl=this.renderRoot.querySelector("llama-confirm-modal"),this._fileInputEl=this.renderRoot.querySelector("#import-file-input"),this._applyOptions(this._appState.options),window.addEventListener("blur",()=>{this.windowFocused=!1}),window.addEventListener("focus",()=>{this.windowFocused=!0}),!await this._handleStartupShare()&&this._appState.currentVideoId){const i=this._appState.videos.find(r=>r.id===this._appState.currentVideoId);if(i){this._syncFromVideo(i);const r=this.looping&&this.loopStart<this.loopEnd?this.loopStart:i.time??0;this._vc.cueVideo(i.id,r),this.statusMsg=`Video cued: ${i.name||i.id}`}}this._pollId=setInterval(()=>{const i=this._vc.getCurrentTime();this.currentTime=i,this.isPlaying=this._vc.isPlaying(),this.speed=this._vc.getPlaybackRate();const r=this._vc.getDuration();if(r!==null&&(this.duration=r),this.zoomSource&&i!==null&&(i>=this.zoomSource.end?this.looping&&this.loopStart<this.loopEnd?this._vc.seekTo(Math.max(this.zoomSource.start,this.loopStart)):this.looping?this._vc.seekTo(this.zoomSource.start):this._vc.pause():i<this.zoomSource.start&&this._vc.seekTo(this.zoomSource.start)),this.looping&&this.loopStart<this.loopEnd&&i!==null&&i>=this.loopEnd){const o=this.zoomSource?Math.max(this.zoomSource.start,this.loopStart):this.loopStart;this._vc.seekTo(o)}},500)}_enterEditScratch(){this._kb.disable(),this.editScratchActive=!0,this.editScratchFocus="start",this.editScratchDelta=vt[2],this._editScratchHandler=e=>this._editScratchKeyDown(e),document.addEventListener("keydown",this._editScratchHandler)}_exitEditScratch(){document.removeEventListener("keydown",this._editScratchHandler),this._editScratchHandler=null,this.editScratchActive=!1,this._kb.enable()}_editScratchKeyDown(e){var o;const t=e.composedPath()[0],i=t==null?void 0:t.tagName;if(i==="INPUT"||i==="TEXTAREA"||i==="SELECT"||t!=null&&t.isContentEditable)return;const r=e.key;if(/^[0-9:/]$/.test(r)){const n=this.renderRoot.querySelector("llama-controls");this.editScratchFocus==="start"?n==null||n.focusStartInput():n==null||n.focusEndInput();return}if(r==="Tab"){e.preventDefault(),this.editScratchFocus=this.editScratchFocus==="start"?"end":"start";return}if(r==="ArrowLeft"||r==="ArrowRight"){e.preventDefault();const n=(r==="ArrowRight"?1:-1)*this.editScratchDelta,a=this.duration??1/0;this.editScratchFocus==="start"?this.loopStart=Math.max(0,Math.min(this.loopStart+n,a)):this.loopEnd=Math.max(0,Math.min(this.loopEnd+n,a)),this._autoDisableLoopIfInvalid();return}if(r==="ArrowUp"||r==="ArrowDown"){e.preventDefault();const n=vt.indexOf(this.editScratchDelta);r==="ArrowUp"?this.editScratchDelta=vt[Math.min(n+1,vt.length-1)]:this.editScratchDelta=vt[Math.max(n-1,0)];return}if(r===" "){e.preventDefault();const n=this.editScratchFocus==="start"?this.loopStart:Math.max(0,this.loopEnd-3);(o=this._vc)==null||o.seekTo(n),this._onPlayPause();return}if(r==="Backspace"){e.preventDefault(),this.editScratchFocus==="start"?this.loopStart=0:this.loopEnd=this.duration??0,this._autoDisableLoopIfInvalid();return}(r==="Enter"||r==="Escape")&&(e.preventDefault(),this._exitEditScratch())}disconnectedCallback(){var e;super.disconnectedCallback(),clearInterval(this._pollId),clearTimeout(this._warnTimeout),clearTimeout(this._statusTimeout),clearTimeout(this._errorTimeout),(e=this._kb)==null||e.destroy(),this._editScratchHandler&&document.removeEventListener("keydown",this._editScratchHandler)}_parseVideoInput(e){if(e=e.trim(),!e)return null;if(/^[A-Za-z0-9_-]{11}$/.test(e))return{id:e,startTime:0};let t;try{t=new URL(e.startsWith("http")?e:"https://"+e)}catch{return null}const i=t.searchParams,r=this._parseTimeParam(i.get("t")??"");let o=i.get("v")??null;if(!o){const n=t.pathname.split("/").filter(Boolean);o=n[n.length-1]??null}return o?{id:o,startTime:r}:null}_parseTimeParam(e){if(!e)return 0;const t=Number(e);if(!isNaN(t))return t;let i=0;const r=e.match(/(\d+)h/),o=e.match(/(\d+)m/),n=e.match(/(\d+(?:\.\d+)?)s/);return r&&(i+=parseInt(r[1])*3600),o&&(i+=parseInt(o[1])*60),n&&(i+=parseFloat(n[1])),i}_loadUrl(e){if(e=e.trim(),!e)return;const t=this._parseVideoInput(e);if(!t){this._setWarning("Could not parse a YouTube video ID from that input.");return}let i=this._appState.videos.find(r=>r.id===t.id);i||(i=fs(e,t.id),this._appState.videos.push(i),this.videos=[...this._appState.videos]),this._loadVideoObject(i,t.startTime)}_onLoadUrl(e){this._loadUrl(e.detail.url)}_onPickVideo(e){var i;const t=(i=this._appState)==null?void 0:i.videos.find(r=>r.id===e.detail.videoId);t&&(this._loadVideoObject(t),this.videos=[...this._appState.videos])}_onUpdateVideo(e){var l;const{id:t,name:i,url:r,start:o,end:n}=e.detail,a=(l=this._appState)==null?void 0:l.videos.find(c=>c.id===t);a&&(this._pushUndoSnapshot("Video updated"),a.name=i,a.url=r,a.start=o,a.end=n,this.videos=[...this._appState.videos],ee(this._appState))}_onDeleteVideo(e){var r,o;const{id:t}=e.detail,i=(r=this._appState)==null?void 0:r.videos.findIndex(n=>n.id===t);i==null||i===-1||(this._pushUndoSnapshot("Video deleted"),this._appState.videos.splice(i,1),this.currentVideoId===t&&((o=this._vc)==null||o.pause(),this._appState.currentVideoId=null,this.currentVideoId=null,this.sections=[],this.marks=[],this.namedLoops=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null,this.statusMsg="Video deleted."),this.videos=[...this._appState.videos],ee(this._appState))}_setWarning(e){this.warningMsg=e}_setError(e){this.errorMsg=e}_flashLoopViolation(){this._setWarning("Outside active loop range.")}_jumpTo(e){var t,i;if(this.zoomSource&&(e=Math.max(this.zoomSource.start,Math.min(this.zoomSource.end,e))),this.looping&&this.loopStart<this.loopEnd&&(e<this.loopStart||e>this.loopEnd)){this._flashLoopViolation();return}this._maybePushJump(((t=this._vc)==null?void 0:t.getCurrentTime())??0,e),(i=this._vc)==null||i.seekTo(e)}_seek(e){var t;this._jumpTo((((t=this._vc)==null?void 0:t.getCurrentTime())??0)+e)}_onPlayPause(){var e,t,i;if(this.currentVideoId)if((e=this._vc)!=null&&e.isPlaying())this._vc.pause();else{if(this.zoomSource&&this.currentTime>=this.zoomSource.end){const r=this.looping&&this.loopStart<this.loopEnd?Math.max(this.zoomSource.start,this.loopStart):this.zoomSource.start;(t=this._vc)==null||t.seekTo(r)}(i=this._vc)==null||i.play()}}_onSeekForward(){this.currentVideoId&&this._seek(this.seekDelta)}_onSeekBack(){this.currentVideoId&&this._seek(-this.seekDelta)}_isLoopValid(){return this.loopStart<this.loopEnd}_autoDisableLoopIfInvalid(){this.looping&&!this._isLoopValid()&&(this.looping=!1)}_clearZoomIfOutside(e,t){this.zoomSource&&(e<this.zoomSource.start||t>this.zoomSource.end)&&(this.zoomSource=null)}_seekIntoZoomIfNeeded(){var t,i;if(!this.zoomSource)return;const e=((t=this._vc)==null?void 0:t.getCurrentTime())??this.currentTime;(e<this.zoomSource.start||e>this.zoomSource.end)&&((i=this._vc)==null||i.seekTo(this.zoomSource.start))}_seekIntoLoopIfNeeded(){var t;const e=(t=this._vc)==null?void 0:t.getCurrentTime();e!=null&&(e<this.loopStart||e>=this.loopEnd)&&this._vc.seekTo(this.loopStart)}_onToggleLoop(){if(this.currentVideoId){if(!this.looping&&!this._isLoopValid()){this._setWarning("Invalid loop range: start must be before end.");return}this.looping=!this.looping,this.looping&&this._seekIntoLoopIfNeeded()}}_onSetLoopStartNow(){this.currentVideoId&&(this.loopStart=this.currentTime,this._autoDisableLoopIfInvalid())}_onSetLoopEndNow(){this.currentVideoId&&(this.loopEnd=this.currentTime,this._autoDisableLoopIfInvalid())}_onLoopStartChange(e){this.loopStart=e.detail.value,this._autoDisableLoopIfInvalid()}_onLoopEndChange(e){this.loopEnd=e.detail.value,this._autoDisableLoopIfInvalid()}_getEntityTimes(e){var r;const t=new Set,i=o=>{o!=null&&isFinite(o)&&t.add(o)};if((e==="any"||e==="section")&&this.sections.forEach(o=>i(o.start)),(e==="any"||e==="loop")&&this.namedLoops.forEach(o=>i(o.start)),(e==="any"||e==="mark")&&this.marks.forEach(o=>i(o.time)),(e==="any"||e==="chapter")&&this.chapters.forEach(o=>i(o.start)),e==="any"||e==="video"){const o=(r=this._appState)==null?void 0:r.videos.find(n=>n.id===this.currentVideoId);o&&(i(o.start??0),o.end!=null?i(o.end):this.duration!=null&&i(this.duration))}return[...t].sort((o,n)=>o-n)}_navigateEntity(e,t=1){var a;const i=((a=this._vc)==null?void 0:a.getCurrentTime())??this.currentTime,r=this._getEntityTimes(this.activeEntityType);if(!r.length)return;const o=e==="prev"?2:.1;let n=null;if(e==="prev"){const l=r.filter(c=>c<i-o);l.length&&(n=l[Math.max(l.length-t,0)])}else{const l=r.filter(c=>c>i+o);l.length&&(n=l[Math.min(t-1,l.length-1)])}n!=null&&this._jumpTo(n)}_onEntityTypeChange(e){this.activeEntityType=e.detail.value}_onSetSection(){var i;const e=((i=this._vc)==null?void 0:i.getCurrentTime())??0,t=Ie(this.sections,e);if(t&&t.end!=null&&e<=t.end){this._setWarning("Cannot set section inside a fixed section.");return}this._pushUndoSnapshot("Section created"),Br(this.sections,e),this.sections=[...this.sections],this.statusMsg="Section created",this._saveCurrentState()}_onDeleteSection(e){this._pushUndoSnapshot("Section deleted"),Ta(this.sections,e.detail.id),this.sections=[...this.sections],this.statusMsg="Section deleted",this._saveCurrentState()}_onSetMark(){var t;const e=((t=this._vc)==null?void 0:t.getCurrentTime())??0;if(!Vr(this.marks,e)){this._setWarning("Mark already exists at this time.");return}this._pushUndoSnapshot("Mark created"),this.marks=[...this.marks],this.statusMsg="Mark created",this._saveCurrentState()}_onDeleteMark(e){this._pushUndoSnapshot("Mark deleted"),Ca(this.marks,e.detail.id),this.marks=[...this.marks],this.statusMsg="Mark deleted",this._saveCurrentState()}_onSaveLoop(e){this._pushUndoSnapshot("Loop saved");const t=e.detail.start??this.loopStart,i=e.detail.end??this.loopEnd;Fr(this.namedLoops,t,i,e.detail.name),this.namedLoops=[...this.namedLoops],this.statusMsg="Loop saved",this._saveCurrentState()}_onLoadLoop(e){var i,r;const t=this.namedLoops.find(o=>o.id===e.detail.id);t&&(this._clearZoomIfOutside(t.start,t.end),this.loopStart=t.start,this.loopEnd=t.end,this.loopSource=t.id,this.loopSourceLabel=t.name||null,this.loopSourceType="loop",this.loopSourceStart=t.start,this.loopSourceEnd=t.end,this.statusMsg=`Loop loaded: ${t.name||"unnamed"}`,this.looping&&(this._maybePushJump(((i=this._vc)==null?void 0:i.getCurrentTime())??0,t.start),(r=this._vc)==null||r.seekTo(t.start)))}_onActivateLoop(e){var i,r;const t=this.namedLoops.find(o=>o.id===e.detail.id);t&&(this._clearZoomIfOutside(t.start,t.end),this.loopStart=t.start,this.loopEnd=t.end,this.loopSource=t.id,this.loopSourceLabel=t.name||null,this.loopSourceType="loop",this.loopSourceStart=t.start,this.loopSourceEnd=t.end,this.statusMsg=`Loop loaded: ${t.name||"unnamed"}`,this._maybePushJump(((i=this._vc)==null?void 0:i.getCurrentTime())??0,t.start),(r=this._vc)==null||r.seekTo(t.start))}_onJumpLoop(e){this._jumpTo(e.detail.start)}_onSeekTo(e){this._jumpTo(e.detail.time)}_onDeleteLoop(e){this._pushUndoSnapshot("Loop deleted"),Aa(this.namedLoops,e.detail.id),this.namedLoops=[...this.namedLoops],this.loopSource===e.detail.id&&(this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null),this.statusMsg="Loop deleted",this._saveCurrentState()}_openLoopsPicker(e){var t;if(!this.namedLoops.length){this._setWarning("No saved loops.");return}(t=this._loopPickerEl)==null||t.show(e)}_openMarksPicker(e){var t;if(!this.marks.length){this._setWarning("No marks set.");return}(t=this._marksPickerEl)==null||t.show(e)}_onJumpMark(e){this._jumpTo(e.detail.time)}_onPickMarkEdit(e){var i;const t=this.marks.find(r=>r.id===e.detail.id);t&&((i=this._editMarkModalEl)==null||i.show(t))}_onUpdateMark(e){this._pushUndoSnapshot("Mark updated");const{id:t,name:i,time:r}=e.detail,o=this.marks.find(n=>n.id===t);o&&(o.name=i,o.time=r,this.marks=[...this.marks].sort((n,a)=>n.time-a.time),this.statusMsg="Mark updated",this._saveCurrentState())}_openSectionsPicker(e){var t;if(!this.sections.length){this._setWarning("No sections set.");return}(t=this._sectionsPickerEl)==null||t.show(e)}_editCurrentSection(){var r;const e=Ie(this.sections,this.currentTime);if(!e){this._setWarning("No section at current position.");return}const t=Nt(this.sections,e.start,this.duration),i=e.end==null?(t==null?void 0:t.end)??null:null;(r=this._editSectionModalEl)==null||r.show(e,i)}_editCurrentChapter(){var r;const e=qt(this.chapters,this.currentTime);if(!e){this._setWarning("No chapter at current position.");return}const t=Qs(this.chapters,e.start,this.duration),i=e.end==null?(t==null?void 0:t.end)??null:null;(r=this._editChapterModalEl)==null||r.showEdit(e,i)}_openChapterPicker(e){var t;if(!this.chapters.length){this._setWarning("No chapters set.");return}(t=this._chapterPickerEl)==null||t.show(e)}_onJumpChapter(e){this._jumpTo(e.detail.time)}_onOpenChapter(e){var l,c,h,p;const t=this.chapters.find(d=>d.id===e.detail.id);if(!t)return;const i=Qs(this.chapters,t.start,this.duration);if(!i||i.end==null){this._setWarning("Chapter has no end boundary.");return}const r=((l=this._appState)==null?void 0:l.options.loop_pad_start)??P.loop_pad_start,o=((c=this._appState)==null?void 0:c.options.loop_pad_end)??P.loop_pad_end,n=Math.max(0,i.start-r),a=i.end+o;this._clearZoomIfOutside(n,a),this.activeChapterId=t.id,this.loopStart=n,this.loopEnd=a,this.loopSource=t.id,this.loopSourceLabel=t.name||null,this.loopSourceType="chapter",this.loopSourceStart=i.start,this.loopSourceEnd=i.end,this._autoDisableLoopIfInvalid(),this._maybePushJump(((h=this._vc)==null?void 0:h.getCurrentTime())??0,i.start),(p=this._vc)==null||p.seekTo(i.start),this.statusMsg=`Chapter: ${t.name||`${te(i.start)} → ${te(i.end)}`}`}_onOpenSection(e){var l,c,h,p;const t=this.sections.find(d=>d.id===e.detail.id);if(!t)return;const i=Nt(this.sections,t.start,this.duration);if(!i||i.end==null){this._setWarning("Section has no end boundary.");return}const r=((l=this._appState)==null?void 0:l.options.loop_pad_start)??P.loop_pad_start,o=((c=this._appState)==null?void 0:c.options.loop_pad_end)??P.loop_pad_end,n=Math.max(0,i.start-r),a=i.end+o;this._clearZoomIfOutside(n,a),this.loopStart=n,this.loopEnd=a,this.loopSource=t.id,this.loopSourceLabel=t.name||null,this.loopSourceType="section",this.loopSourceStart=i.start,this.loopSourceEnd=i.end,this._autoDisableLoopIfInvalid(),this._maybePushJump(((h=this._vc)==null?void 0:h.getCurrentTime())??0,i.start),(p=this._vc)==null||p.seekTo(i.start),this.statusMsg=`Section: ${t.name||te(t.start)}`}_onCreateChapter(e){this._pushUndoSnapshot("Chapter created");const{name:t,start:i,end:r}=e.detail;xa(this.chapters,t,i,r),this.chapters=[...this.chapters],this.statusMsg="Chapter created",this._saveCurrentState()}_onUpdateChapter(e){const{id:t,name:i,start:r,end:o}=e.detail,n=this.chapters.findIndex(a=>a.id===t);if(n!==-1){if(!ei(this.chapters,n,r,o,this.duration)){this._setWarning("Edit would eliminate a neighbor chapter.");return}this._pushUndoSnapshot("Chapter updated"),this.chapters[n].name=i,ti(this.chapters,n,r,o),this.chapters=[...this.chapters],this.statusMsg="Chapter updated",this._saveCurrentState()}}_onDeleteChapter(e){var t;this._pushUndoSnapshot("Chapter deleted"),Ea(this.chapters,e.detail.id),this.chapters=[...this.chapters],this.statusMsg="Chapter deleted",this.activeChapterId===e.detail.id&&(this.activeChapterId=null,((t=this.zoomSource)==null?void 0:t.trigger)==="chapter"&&(this.zoomSource=null)),this._saveCurrentState()}_onJumpTime(e){this._jumpTo(e.detail.time)}_onJumpHistory(e){this._jumpTo(e.detail.time)}_exportAll(){Pu(Hr(this._appState),"loopllama-all.json"),this.statusMsg="Exported all data."}async _createVideoShare(){if(!this.currentVideoId){this._setWarning("No video loaded.");return}this._saveCurrentState();const e=this._appState.videos.find(i=>i.id===this.currentVideoId),t=_d(e);try{const i=await yo("video",t,e.url,e.name||null),r=_o(i);navigator.clipboard.writeText(r).then(()=>{this.statusMsg="Video share URL copied to clipboard."}).catch(()=>{this.statusMsg="Video share URL ready (clipboard unavailable)."})}catch(i){this.errorMsg=`Share failed: ${i.message}`}}async _createLoopShare(){if(!this.currentVideoId){this._setWarning("No video loaded.");return}if(!this._isLoopValid()){this._setWarning("Set a valid scratch loop first.");return}this._saveCurrentState();const e=this._appState.videos.find(i=>i.id===this.currentVideoId),t=yd(e,this.loopStart,this.loopEnd);try{const i=await yo("loop",t,e.url,e.name||null),r=_o(i);navigator.clipboard.writeText(r).then(()=>{this.statusMsg="Loop share URL copied to clipboard."}).catch(()=>{this.statusMsg="Loop share URL ready (clipboard unavailable)."})}catch(i){this.errorMsg=`Share failed: ${i.message}`}}_onFileImport(e){var r;const t=(r=e.target.files)==null?void 0:r[0];if(!t)return;const i=new FileReader;i.onload=o=>{try{const n=Na(o.target.result,this._appState);this.videos=[...this._appState.videos],ee(this._appState),this.statusMsg=`Imported: ${n.added} added, ${n.updated} updated.`}catch(n){this.errorMsg=`Import failed: ${n.message}`}},i.readAsText(t),e.target.value=""}_showConfirm(e){return new Promise(t=>{var i;this._confirmResolve=t,(i=this._confirmModalEl)==null||i.show(e)})}_onConfirmYes(){var e;(e=this._confirmResolve)==null||e.call(this,!0),this._confirmResolve=null}_onConfirmNo(){var e;(e=this._confirmResolve)==null||e.call(this,!1),this._confirmResolve=null}_applyLoopShare(e){const{videoUrl:t,videoTitle:i,loop:r,speed:o}=e,n=this._parseVideoInput(t);if(!n){this.errorMsg="Shared loop: could not parse video URL.";return}let a=this._appState.videos.find(h=>h.id===n.id);a||(a=fs(t,n.id),i&&(a.name=i),this._appState.videos.push(a),this.videos=[...this._appState.videos]);const l=Ou(a.loops,r.name||""),c=Fr(a.loops,r.start,r.end,l);this._appState.currentVideoId=a.id,this.currentVideoId=a.id,this._syncFromVideo(a),this.loopStart=r.start,this.loopEnd=r.end,this.loopSource=c.id,this.loopSourceLabel=l||null,this.loopSourceType="loop",this.loopSourceStart=r.start,this.loopSourceEnd=r.end,this.looping=!0,a.looping=!0,o&&this._vc.setPlaybackRate(o),this._vc.cueVideo(a.id,r.start),ee(this._appState),this.statusMsg=`Shared loop loaded: ${l||te(r.start)+" → "+te(r.end)}`}async _applyVideoShare(e){const{videoUrl:t,videoTitle:i,sections:r,namedLoops:o,marks:n,chapters:a,speed:l,start:c,end:h}=e,p=this._parseVideoInput(t);if(!p){this.errorMsg="Shared video: could not parse video URL.";return}const d=i||p.id;let u=this._appState.videos.find(_=>_.id===p.id);if(u){if(!await this._showConfirm({lines:[`"${d}" is already in your library.`,"Replace it with the shared version?"],confirmLabel:"Replace",cancelLabel:"Skip",defaultButton:"cancel"})){this.statusMsg=`Skipped: "${d}" already in your library.`;return}}else u=fs(t,p.id),this._appState.videos.push(u);i&&(u.name=i),u.sections=r??[],u.marks=n??[],u.chapters=a??[],u.speed=l??1,u.start=c??0,u.end=h??null;const f=yi();e.scratchLoop&&(f.start=e.scratchLoop.start,f.end=e.scratchLoop.end),u.looping=!!(e.looping&&f.start<f.end),u.loops=[f,...o??[]],this.videos=[...this._appState.videos],this._appState.currentVideoId=u.id,this.currentVideoId=u.id,this._syncFromVideo(u);const v=this.looping&&this.loopStart<this.loopEnd?this.loopStart:0;this._vc.loadVideo(u.id,v),this.duration=null,ee(this._appState),bo(u.id),this.statusMsg=`Shared video loaded: ${d}`}async _handleStartupShare(){const e=bd();if(e){try{const i=await wd(e);i.share_type==="loop"&&this._applyLoopShare(i.payload),i.share_type==="video"&&await this._applyVideoShare(i.payload)}catch(i){this.errorMsg=`Could not load shared content: ${i.message}`}const t=new URL(window.location.href);return t.searchParams.delete("share"),history.replaceState(null,"",t.toString()),!0}return this._handleStartupUrlParams()}_handleStartupUrlParams(){const e=new URLSearchParams(window.location.search),t=e.get("v"),i=parseFloat(e.get("s")),r=parseFloat(e.get("e"));if(!t||isNaN(i)||isNaN(r)||i>=r)return!1;let o=this._appState.videos.find(a=>a.id===t);o||(o=fs(t,t),this._appState.videos.push(o),this.videos=[...this._appState.videos]),this._appState.currentVideoId=o.id,this.currentVideoId=o.id,this._syncFromVideo(o),this.loopStart=i,this.loopEnd=r,this._vc.cueVideo(o.id,i),this.statusMsg=`Shared loop loaded: ${te(i)} → ${te(r)}`,ee(this._appState);const n=new URL(window.location.href);return n.searchParams.delete("v"),n.searchParams.delete("s"),n.searchParams.delete("e"),history.replaceState(null,"",n.toString()),!0}_onJumpSection(e){this._jumpTo(e.detail.start)}_onPickSectionEdit(e){var o;const t=this.sections.find(n=>n.id===e.detail.id);if(!t)return;const i=Nt(this.sections,t.start,this.duration),r=t.end==null?(i==null?void 0:i.end)??null:null;(o=this._editSectionModalEl)==null||o.show(t,r)}_onUpdateSection(e){const{id:t,name:i,start:r,end:o}=e.detail,n=this.sections.findIndex(a=>a.id===t);if(n!==-1){if(!ei(this.sections,n,r,o,this.duration)){this._setWarning("Edit would eliminate a neighbor section.");return}this._pushUndoSnapshot("Section updated"),this.sections[n].name=i,ti(this.sections,n,r,o),this.sections=[...this.sections],this.statusMsg="Section updated",this._saveCurrentState()}}_onDeleteData(e){var i;const{mode:t}=e.detail;if(t==="videos"){const{videoIds:r}=e.detail;this._pushUndoSnapshot(`Video${r.length!==1?"s":""} deleted`),this._appState.videos=this._appState.videos.filter(n=>!r.includes(n.id)),r.includes(this.currentVideoId)&&((i=this._vc)==null||i.pause(),this._appState.currentVideoId=null,this.currentVideoId=null,this.sections=[],this.marks=[],this.namedLoops=[],this.chapters=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null),this.videos=[...this._appState.videos],ee(this._appState);const o=r.length;this.statusMsg=`Deleted ${o} video${o!==1?"s":""}.`}else{const{sections:r,loops:o,marks:n,chapters:a}=e.detail;this._pushUndoSnapshot("Data deleted"),this.sections=this.sections.filter(c=>!r.includes(c.id)),this.namedLoops=this.namedLoops.filter(c=>!o.includes(c.id)),this.marks=this.marks.filter(c=>!n.includes(c.id)),this.chapters=this.chapters.filter(c=>!a.includes(c.id)),this.loopSource&&this.loopSourceType==="loop"&&!this.namedLoops.find(c=>c.id===this.loopSource)&&(this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null),this._saveCurrentState();const l=r.length+o.length+n.length+a.length;this.statusMsg=`Deleted ${l} item${l!==1?"s":""}.`}}_onMenuSelect(e){var i;const t=(i=this._handlers)==null?void 0:i[e.detail.action];t&&t()}_nextQuip(){let e;do e=Math.floor(Math.random()*_i.length);while(e===this._quipIndex&&_i.length>1);this._quipIndex=e,this._quip=_i[e],this.requestUpdate()}_onQuipEnter(){this._nextQuip(),this._quipInterval=setInterval(()=>this._nextQuip(),Lu)}_onQuipLeave(){clearInterval(this._quipInterval),this._quipInterval=null,this._quip="",this.requestUpdate()}_isLoopDirty(){var i,r;if(!this.loopSource||this.loopSourceStart==null||this.loopSourceEnd==null)return!1;const e=this.loopSourceType!=="loop"?((i=this._appState)==null?void 0:i.options.loop_pad_start)??P.loop_pad_start:0,t=this.loopSourceType!=="loop"?((r=this._appState)==null?void 0:r.options.loop_pad_end)??P.loop_pad_end:0;return this.loopStart!==this.loopSourceStart-e||this.loopEnd!==this.loopSourceEnd+t}render(){var n,a,l,c,h,p;const e=((n=this._appState)==null?void 0:n.videos.find(d=>d.id===this.currentVideoId))??null,t=this.activeChapterId?this.chapters.find(d=>d.id===this.activeChapterId)??null:null,i=Ie(this.sections,this.currentTime),r=this._isLoopDirty(),o=(()=>{if(!this.zoomSource)return null;const{trigger:d,start:u,end:f}=this.zoomSource;if(d==="loop")return`Loop: ${te(u)} – ${te(f)}`;if(d==="section"){const v=Ie(this.sections,u);return v!=null&&v.name?`Section: ${v.name}`:`Section: ${te(u)}`}if(d==="chapter"){const v=this.chapters.find(_=>_.id===this.activeChapterId);return v!=null&&v.name?`Chapter: ${v.name}`:`Chapter: ${te(u)}`}return null})();return g`
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
          <a class="nav-link" href="https://hindman.github.io/" target="_blank" rel="noopener">The Fifth Fret</a>
          <span class="nav-sep">|</span>
          <a class="nav-link" href="https://github.com/hindman/hindman.github.io/tree/master/loopllama" target="_blank" rel="noopener">Code</a>
        </nav>
      </header>

      <div class="app-body">
        <div class="app-main">
          <div class="video-col">
            <div class="player-wrap">
              <div id="player-container"></div>
              ${this.currentVideoId?"":g`<div class="player-overlay"></div>`}
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
          .loopSourceType=${this.loopSourceType}
          .loopSourceStart=${this.loopSourceStart}
          .loopSourceEnd=${this.loopSourceEnd}
          .seekDelta=${this.seekDelta}
          .seekDeltaChoices=${((c=this._appState)==null?void 0:c.options.seek_delta_choices)??P.seek_delta_choices}
          .loopNudgeDelta=${this.loopNudgeDelta}
          .loopNudgeDeltaChoices=${((h=this._appState)==null?void 0:h.options.loop_nudge_delta_choices)??P.loop_nudge_delta_choices}
          .editScratchActive=${this.editScratchActive}
          .editScratchFocus=${this.editScratchFocus}
          .editScratchDelta=${this.editScratchDelta}
          .activeEntityType=${this.activeEntityType}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-to=${d=>this._jumpTo(d.detail.value)}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
          @ll-seek-delta-change=${d=>{this.seekDelta=d.detail.value}}
          @ll-loop-nudge-delta-change=${d=>{this.loopNudgeDelta=d.detail.value}}
          @ll-toggle-loop=${this._onToggleLoop}
          @ll-set-loop-start-now=${this._onSetLoopStartNow}
          @ll-set-loop-end-now=${this._onSetLoopEndNow}
          @ll-loop-start-change=${this._onLoopStartChange}
          @ll-loop-end-change=${this._onLoopEndChange}
          @ll-speed-change=${d=>{var f;const u=Math.max(.25,Math.min(2,d.detail.value));(f=this._vc)==null||f.setPlaybackRate(u),this.speed=u}}
          @ll-prev-entity=${()=>this._navigateEntity("prev")}
          @ll-next-entity=${()=>this._navigateEntity("next")}
          @ll-entity-type-change=${this._onEntityTypeChange}
          @ll-invalid-time=${()=>this._setWarning("Invalid time format.")}
          @ll-menu-select=${this._onMenuSelect}
        ></llama-controls>

        <llama-current
          .videoName=${(e==null?void 0:e.name)??""}
          .videoId=${(e==null?void 0:e.id)??null}
          .chapterName=${(t==null?void 0:t.name)??null}
          .sectionName=${(i==null?void 0:i.name)??null}
          .loopSourceLabel=${this.loopSourceLabel}
          .loopSourceType=${this.loopSourceType}
          .loopSourceStart=${this.loopSourceStart}
          .loopSourceEnd=${this.loopSourceEnd}
          .loopDirty=${r}
          .duration=${this.duration}
          .zoomLabel=${o}
        ></llama-current>
      </div>


      <llama-url-input-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-load-url=${this._onLoadUrl}
      ></llama-url-input-modal>

      <llama-video-picker
        .videos=${this.videos}
        .currentVideoId=${this.currentVideoId}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-pick-video=${this._onPickVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-video-picker>

      <llama-edit-video-modal
        .video=${e}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-video=${this._onUpdateVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-edit-video-modal>

      <llama-save-loop-modal
        .loopStart=${this.loopStart}
        .loopEnd=${this.loopEnd}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-save-loop=${this._onSaveLoop}
      ></llama-save-loop-modal>

      <llama-loop-picker
        .namedLoops=${this.namedLoops}
        .loopSource=${this.loopSource}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-loop=${this._onJumpLoop}
        @ll-load-loop=${this._onLoadLoop}
        @ll-delete-loop=${this._onDeleteLoop}
      ></llama-loop-picker>

      <llama-marks-picker
        .marks=${this.marks}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-mark=${this._onJumpMark}
        @ll-pick-mark-edit=${this._onPickMarkEdit}
        @ll-delete-mark=${this._onDeleteMark}
      ></llama-marks-picker>

      <llama-edit-mark-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-mark=${this._onUpdateMark}
      ></llama-edit-mark-modal>

      <llama-sections-picker
        .sections=${this.sections}
        .activeSectionId=${((p=Ie(this.sections,this.currentTime))==null?void 0:p.id)??null}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-section=${this._onJumpSection}
        @ll-pick-section-edit=${this._onPickSectionEdit}
        @ll-delete-section=${this._onDeleteSection}
        @ll-open-section=${this._onOpenSection}
      ></llama-sections-picker>

      <llama-edit-section-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-update-section=${this._onUpdateSection}
      ></llama-edit-section-modal>

      <llama-jump-time-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-time=${this._onJumpTime}
      ></llama-jump-time-modal>

      <llama-chapter-picker
        .chapters=${this.chapters}
        .activeChapterId=${this.activeChapterId}
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-jump-chapter=${this._onJumpChapter}
        @ll-open-chapter=${this._onOpenChapter}
        @ll-delete-chapter=${this._onDeleteChapter}
      ></llama-chapter-picker>

      <llama-edit-chapter-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
        @ll-create-chapter=${this._onCreateChapter}
        @ll-update-chapter=${this._onUpdateChapter}
      ></llama-edit-chapter-modal>

      <llama-video-info-modal
        .video=${e}
        .chapters=${this.chapters}
        .sections=${this.sections}
        .namedLoops=${this.namedLoops}
        .marks=${this.marks}
        .duration=${this.duration}
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

      <llama-confirm-modal
        @ll-modal-open=${()=>{var d;return(d=this._kb)==null?void 0:d.disable()}}
        @ll-confirm-yes=${this._onConfirmYes}
        @ll-confirm-no=${this._onConfirmNo}
        @ll-modal-close=${()=>{var d;return(d=this._kb)==null?void 0:d.enable()}}
      ></llama-confirm-modal>

      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .count=${this.wkCount}
        .windowFocused=${this.windowFocused}
        .editScratchActive=${this.editScratchActive}
        .editScratchFocus=${this.editScratchFocus}
        .editScratchDelta=${this.editScratchDelta}
        .warningMsg=${this.warningMsg}
        .errorMsg=${this.errorMsg}
        .statusMsg=${this.statusMsg}
      ></llama-whichkey>
    `}}C(ar,"styles",I`
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

  `),C(ar,"properties",{currentTime:{type:Number},duration:{type:Number},speed:{type:Number},isPlaying:{type:Boolean},looping:{type:Boolean},loopStart:{type:Number},loopEnd:{type:Number},sections:{type:Array},marks:{type:Array},namedLoops:{type:Array},jumps:{type:Array},loopSource:{type:String},statusMsg:{type:String},wkPrefix:{type:String},wkCompletions:{type:Object},wkCount:{type:Number},windowFocused:{type:Boolean},editScratchActive:{type:Boolean},editScratchFocus:{type:String},editScratchDelta:{type:Number},videos:{type:Array},currentVideoId:{type:String},activeEntityType:{type:String},chapters:{type:Array},activeChapterId:{type:String},zoomSource:{type:Object},loopSourceLabel:{type:String},loopSourceType:{type:String},warningMsg:{type:String},errorMsg:{type:String},loopNudgeDelta:{type:Number},seekDelta:{type:Number},zone2Mode:{type:String},loopSourceStart:{type:Number},loopSourceEnd:{type:Number}});function Ou(s,e){const t=s.filter(r=>!r.is_scratch).map(r=>r.name);if(!t.includes(e))return e;const i=e?`${e} (shared)`:"(shared)";if(!t.includes(i))return i;for(let r=2;r<=99;r++){const o=e?`${e} (shared #${r})`:`(shared #${r})`;if(!t.includes(o))return o}return i}function te(s){if(s==null||isNaN(s))return"?";const e=Math.floor(s);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Ko(){return window.location.port==="5173"?"http://127.0.0.1:4000":window.location.origin}function Pu(s,e){const t=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=e,r.click(),URL.revokeObjectURL(i)}customElements.define("llama-app",ar);
