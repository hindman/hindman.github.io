var Cs=Object.defineProperty;var Ls=(o,t,e)=>t in o?Cs(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var w=(o,t,e)=>Ls(o,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=globalThis,Ro=we.ShadowRoot&&(we.ShadyCSS===void 0||we.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Po=Symbol(),ti=new WeakMap;let Hi=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Po)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ro&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=ti.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ti.set(e,t))}return t}toString(){return this.cssText}};const Is=o=>new Hi(typeof o=="string"?o:o+"",void 0,Po),x=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new Hi(e,o,Po)},Ts=(o,t)=>{if(Ro)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=we.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ei=Ro?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Is(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:As,defineProperty:Ds,getOwnPropertyDescriptor:Ms,getOwnPropertyNames:zs,getOwnPropertySymbols:Rs,getPrototypeOf:Ps}=Object,Et=globalThis,oi=Et.trustedTypes,Ns=oi?oi.emptyScript:"",Oe=Et.reactiveElementPolyfillSupport,le=(o,t)=>o,qt={toAttribute(o,t){switch(t){case Boolean:o=o?Ns:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},No=(o,t)=>!As(o,t),ii={attribute:!0,type:String,converter:qt,reflect:!1,useDefault:!1,hasChanged:No};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Et.litPropertyMetadata??(Et.litPropertyMetadata=new WeakMap);let Ut=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ii){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ds(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=Ms(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);r==null||r.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ii}static _$Ei(){if(this.hasOwnProperty(le("elementProperties")))return;const t=Ps(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(le("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(le("properties"))){const e=this.properties,i=[...zs(e),...Rs(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(ei(s))}else t!==void 0&&e.push(ei(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ts(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:qt).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var r,n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),d=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:qt;this._$Em=s;const h=d.fromAttribute(e,l.type);this[s]=h??((n=this._$Ej)==null?void 0:n.get(s))??h,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){var n;if(t!==void 0){const l=this.constructor;if(s===!1&&(r=this[t]),i??(i=l.getPropertyOptions(t)),!((i.hasChanged??No)(r,e)||i.useDefault&&i.reflect&&r===((n=this._$Ej)==null?void 0:n.get(t))&&!this.hasAttribute(l._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s){const{wrapped:l}=n,d=this[r];l!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,n,d)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};Ut.elementStyles=[],Ut.shadowRootOptions={mode:"open"},Ut[le("elementProperties")]=new Map,Ut[le("finalized")]=new Map,Oe==null||Oe({ReactiveElement:Ut}),(Et.reactiveElementVersions??(Et.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,si=o=>o,$e=ae.trustedTypes,ri=$e?$e.createPolicy("lit-html",{createHTML:o=>o}):void 0,Wi="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ki="?"+xt,Vs=`<${Ki}>`,Pt=document,ce=()=>Pt.createComment(""),he=o=>o===null||typeof o!="object"&&typeof o!="function",Vo=Array.isArray,Os=o=>Vo(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Fe=`[ 	
\f\r]`,Xt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ni=/-->/g,li=/>/g,Dt=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ai=/'/g,di=/"/g,Ji=/^(?:script|style|textarea|title)$/i,Fs=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),f=Fs(1),et=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),ci=new WeakMap,zt=Pt.createTreeWalker(Pt,129);function Gi(o,t){if(!Vo(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ri!==void 0?ri.createHTML(t):t}const Us=(o,t)=>{const e=o.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",n=Xt;for(let l=0;l<e;l++){const d=o[l];let h,m,u=-1,v=0;for(;v<d.length&&(n.lastIndex=v,m=n.exec(d),m!==null);)v=n.lastIndex,n===Xt?m[1]==="!--"?n=ni:m[1]!==void 0?n=li:m[2]!==void 0?(Ji.test(m[2])&&(s=RegExp("</"+m[2],"g")),n=Dt):m[3]!==void 0&&(n=Dt):n===Dt?m[0]===">"?(n=s??Xt,u=-1):m[1]===void 0?u=-2:(u=n.lastIndex-m[2].length,h=m[1],n=m[3]===void 0?Dt:m[3]==='"'?di:ai):n===di||n===ai?n=Dt:n===ni||n===li?n=Xt:(n=Dt,s=void 0);const a=n===Dt&&o[l+1].startsWith("/>")?" ":"";r+=n===Xt?d+Vs:u>=0?(i.push(h),d.slice(0,u)+Wi+d.slice(u)+xt+a):d+xt+(u===-2?l:a)}return[Gi(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class ue{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const l=t.length-1,d=this.parts,[h,m]=Us(t,e);if(this.el=ue.createElement(h,i),zt.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=zt.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Wi)){const v=m[n++],a=s.getAttribute(u).split(xt),b=/([.?@])?(.*)/.exec(v);d.push({type:1,index:r,name:b[2],strings:a,ctor:b[1]==="."?Bs:b[1]==="?"?qs:b[1]==="@"?Hs:Ae}),s.removeAttribute(u)}else u.startsWith(xt)&&(d.push({type:6,index:r}),s.removeAttribute(u));if(Ji.test(s.tagName)){const u=s.textContent.split(xt),v=u.length-1;if(v>0){s.textContent=$e?$e.emptyScript:"";for(let a=0;a<v;a++)s.append(u[a],ce()),zt.nextNode(),d.push({type:2,index:++r});s.append(u[v],ce())}}}else if(s.nodeType===8)if(s.data===Ki)d.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(xt,u+1))!==-1;)d.push({type:7,index:r}),u+=xt.length-1}r++}}static createElement(t,e){const i=Pt.createElement("template");return i.innerHTML=t,i}}function Ht(o,t,e=o,i){var n,l;if(t===et)return t;let s=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const r=he(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=Ht(o,s._$AS(o,t.values),s,i)),t}class js{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??Pt).importNode(e,!0);zt.currentNode=s;let r=zt.nextNode(),n=0,l=0,d=i[0];for(;d!==void 0;){if(n===d.index){let h;d.type===2?h=new me(r,r.nextSibling,this,t):d.type===1?h=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(h=new Ws(r,this,t)),this._$AV.push(h),d=i[++l]}n!==(d==null?void 0:d.index)&&(r=zt.nextNode(),n++)}return zt.currentNode=Pt,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class me{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ht(this,t,e),he(t)?t===D||t==null||t===""?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Os(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==D&&he(this._$AH)?this._$AA.nextSibling.data=t:this.T(Pt.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ue.createElement(Gi(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const n=new js(s,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=ci.get(t.strings);return e===void 0&&ci.set(t.strings,e=new ue(t)),e}k(t){Vo(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new me(this.O(ce()),this.O(ce()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const s=si(t).nextSibling;si(t).remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(r===void 0)t=Ht(this,t,e,0),n=!he(t)||t!==this._$AH&&t!==et,n&&(this._$AH=t);else{const l=t;let d,h;for(t=r[0],d=0;d<r.length-1;d++)h=Ht(this,l[i+d],e,d),h===et&&(h=this._$AH[d]),n||(n=!he(h)||h!==this._$AH[d]),h===D?t=D:t!==D&&(t+=(h??"")+r[d+1]),this._$AH[d]=h}n&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bs extends Ae{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}class qs extends Ae{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==D)}}class Hs extends Ae{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Ht(this,t,e,0)??D)===et)return;const i=this._$AH,s=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==D&&(i===D||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ws{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ht(this,t)}}const Ue=ae.litHtmlPolyfillSupport;Ue==null||Ue(ue,me),(ae.litHtmlVersions??(ae.litHtmlVersions=[])).push("3.3.2");const Ks=(o,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new me(t.insertBefore(ce(),r),r,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=globalThis;let C=class extends Ut{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ks(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return et}};var qi;C._$litElement$=!0,C.finalized=!0,(qi=Rt.litElementHydrateSupport)==null||qi.call(Rt,{LitElement:C});const je=Rt.litElementPolyfillSupport;je==null||je({LitElement:C});(Rt.litElementVersions??(Rt.litElementVersions=[])).push("4.2.2");function Js({onReady:o,onStateChange:t}={}){let e=null,i=!1;function s(){return new Promise(g=>{var E;if((E=window.YT)!=null&&E.Player){g();return}window.onYouTubeIframeAPIReady=g;const S=document.createElement("script");S.src="https://www.youtube.com/iframe_api",document.head.appendChild(S)})}async function r(g){return await s(),new Promise(S=>{e=new YT.Player(g,{width:"100%",height:"100%",events:{onReady:()=>{o==null||o(),S()},onStateChange:E=>{!i&&(E.data===YT.PlayerState.PLAYING||E.data===YT.PlayerState.CUED)&&(i=!0),t==null||t(E.data)}}})})}function n(g,S=0){i=!1,e.loadVideoById({videoId:g,startSeconds:S})}function l(g,S=0){i=!1,e.cueVideoById({videoId:g,startSeconds:S})}function d(){e.playVideo()}function h(){e.pauseVideo()}function m(){e.stopVideo()}function u(g){e.seekTo(g,!0)}function v(){return e.getCurrentTime()??0}function a(){return i?e.getDuration():null}function b(){return(e==null?void 0:e.getPlayerState())===YT.PlayerState.PLAYING}function _(g){e.setPlaybackRate(g)}function y(){return e.getPlaybackRate()}return{initialize:r,loadVideo:n,cueVideo:l,play:d,pause:h,stop:m,seekTo:u,getCurrentTime:v,getDuration:a,isPlaying:b,setPlaybackRate:_,getPlaybackRate:y}}const hi={" ":{handler:"playPause",desc:"Play/pause"},"-":{handler:"speedDown",desc:"Speed: slower"},"=":{handler:"speedUp",desc:"Speed: faster"},Backspace:{handler:"speedReset",desc:"Reset speed"},ArrowRight:{handler:"seekForward",desc:"Seek forward"},ArrowLeft:{handler:"seekBack",desc:"Seek backward"},ArrowDown:{handler:"seekDeltaDown",desc:"Seek delta: reduce"},ArrowUp:{handler:"seekDeltaUp",desc:"Seek delta: increase"},",":{handler:"prevEntity",desc:"Previous entity"},"/":{handler:"entityType",desc:"Entity type dropdown"},".":{handler:"nextEntity",desc:"Next entity"},Enter:{handler:"jumpToStart",desc:"Jump to start"},u:{handler:"undo",desc:"Undo"},U:{handler:"redo",desc:"Redo"},"?":{handler:"helpKeys",desc:"Key bindings help"},o:{handler:"options",desc:"Options"},y:{handler:"videoUrl",desc:"Switch to YouTube URL"},"\\":{handler:"editScratch",desc:"Edit scratch loop (synonym for le)"},"[":{completions:{"[":{handler:"setLoopStart",desc:"Set loop start to current time"},Backspace:{handler:"resetLoopStart",desc:"Reset loop start to 0"},"-":{handler:"nudgeStartDown",desc:"Nudge start: decrease"},"=":{handler:"nudgeStartUp",desc:"Nudge start: increase"},"]":{handler:"focusLoopNudgeDelta",desc:"Loop nudge delta dropdown"},"\\":{handler:"focusLoopStart",desc:"Loop start: edit"}}},"]":{completions:{"]":{handler:"setLoopEnd",desc:"Set loop end to current time"},Backspace:{handler:"resetLoopEnd",desc:"Reset loop end to duration"},"-":{handler:"nudgeEndDown",desc:"Nudge end: decrease"},"=":{handler:"nudgeEndUp",desc:"Nudge end: increase"},"[":{handler:"focusLoopNudgeDelta",desc:"Loop nudge delta dropdown"},"\\":{handler:"focusLoopEnd",desc:"Loop end: edit"}}},v:{completions:{u:{handler:"videoUrl",desc:"Switch to YouTube video via URL"},v:{handler:"videoPicker",desc:"Switch to video"},o:{handler:"videoPicker",desc:"Switch to video"},e:{handler:"editVideo",desc:"Edit video attributes"},i:{handler:"videoInfo",desc:"Video info"},d:{handler:"deleteVideo",desc:"Delete current video"},l:{handler:"loopVideo",desc:"Loop: full video as scratch loop"}}},j:{completions:{c:{handler:"jumpChapter",desc:"Jump to chapter"},j:{handler:"jumpTime",desc:"Jump by time"},s:{handler:"jumpSection",desc:"Jump to section"},l:{handler:"jumpLoop",desc:"Jump to loop"},m:{handler:"jumpMark",desc:"Jump to mark"},h:{handler:"jumpHistory",desc:"Jump history picker"},b:{handler:"jumpBack",desc:"Jump back in history"},f:{handler:"jumpForward",desc:"Jump forward in history"}}},l:{completions:{l:{handler:"toggleLoop",desc:"Toggle looping"},o:{handler:"openLoop",desc:"Open saved loop"},n:{handler:"saveLoop",desc:"Save new loop"},b:{handler:"saveBack",desc:"Save back to source loop"},e:{handler:"editScratch",desc:"Edit scratch loop"},d:{handler:"deleteLoop",desc:"Delete a loop"},z:{handler:"zoomLoop",desc:"Toggle loop zoom"},s:{handler:"loopSection",desc:"Loop current section (synonym: sl)"},c:{handler:"loopChapter",desc:"Loop current chapter (synonym: cl)"},v:{handler:"loopVideo",desc:"Loop full video (synonym: vl)"}}},c:{completions:{c:{handler:"setChapter",desc:"Create chapter divider here"},o:{handler:"openChapter",desc:"Open chapter"},e:{handler:"editChapter",desc:"Edit current chapter"},l:{handler:"loopChapter",desc:"Loop: current chapter as scratch loop"},d:{handler:"deleteChapter",desc:"Delete a chapter"},z:{handler:"zoomChapter",desc:"Toggle chapter zoom"},f:{handler:"fixChapter",desc:"Fix chapter end to derived boundary"}}},s:{completions:{s:{handler:"setSection",desc:"Set section divider here"},e:{handler:"editSection",desc:"Edit current section"},o:{handler:"openSection",desc:"Open section"},l:{handler:"loopSection",desc:"Loop current section"},d:{handler:"deleteSection",desc:"Delete a section"},z:{handler:"zoomSection",desc:"Toggle section zoom"},f:{handler:"fixSection",desc:"Fix section end to derived boundary"}}},t:{completions:{t:{handler:"toggleZone2",desc:"Toggle zone 2: sections / chapters"}}},m:{completions:{m:{handler:"setMark",desc:"Set mark here"},e:{handler:"editMark",desc:"Edit a mark"},d:{handler:"deleteMark",desc:"Delete a mark"}}},h:{completions:{h:{handler:"helpGeneral",desc:"General help"},k:{handler:"helpKeys",desc:"Key bindings"}}},d:{completions:{d:{handler:"deleteData",desc:"Delete data modal"},e:{handler:"exportAll",desc:"Export data as JSON"},i:{handler:"importData",desc:"Import data from JSON"},I:{handler:"inspectData",desc:"Inspect data as JSON"},v:{handler:"shareVideo",desc:"Share video as JSON"},l:{handler:"shareLoop",desc:"Share loop via URL"}}}};function Gs(o,{onPendingKey:t}={}){let e=!0,i=null,s=null;function r(){i=null,clearTimeout(s),s=null,t==null||t(null,null)}function n(u){const v=o[u];v?v():console.log(`[kb] no handler: ${u}`)}function l(u){var y;if(!e)return;const v=u.composedPath()[0],a=v==null?void 0:v.tagName;if(a==="INPUT"||a==="TEXTAREA"||a==="SELECT"||v!=null&&v.isContentEditable||u.ctrlKey||u.altKey||u.metaKey)return;const b=u.key;if(i!==null){if(b==="Shift"||b==="Control"||b==="Alt"||b==="Meta")return;u.preventDefault();const g=(y=hi[i])==null?void 0:y.completions,S=g==null?void 0:g[b];r(),b!=="Escape"&&S&&n(S.handler);return}const _=hi[b];_&&(u.preventDefault(),_.completions?(i=b,s=setTimeout(()=>{t==null||t(b,_.completions)},300)):n(_.handler))}document.addEventListener("keydown",l);function d(){e=!0}function h(){e=!1,r()}function m(){document.removeEventListener("keydown",l),r()}return{enable:d,disable:h,destroy:m}}const Oo=4,Ys=40,Zs=15;function fe(){return Math.random().toString(36).slice(2,9)}const T={seek_delta_default:5,seek_delta_choices:[.1,1,5,10,30,60,300,1800],loop_nudge_delta_default:5,loop_nudge_delta_choices:[.1,1,5,10,30,60,300,1800],speed_delta:.05,loop_pad_start:2,loop_pad_end:2};function Xs(){return{version:Oo,options:{...T},videos:[],currentVideoId:null}}function ui(o,t){return{id:t,url:o,duration:null,time:0,start:0,end:null,name:"",looping:!1,speed:1,seek_delta:T.seek_delta_default,speed_delta:T.speed_delta,chapters:[],sections:[],loops:[Zi()],marks:[],jumps:[],version:Oo}}function Yi(o,t,e){return{id:fe(),name:o,start:t,end:e}}function Qs(o,t=""){return{id:fe(),start:o,end:null,name:t}}function tr(o,t,e=""){return{id:fe(),name:e,start:o,end:t,source:null,is_scratch:!1}}function Zi(){return{id:fe(),name:"",start:0,end:0,source:null,is_scratch:!0}}function er(o,t=""){return{id:fe(),time:o,name:t}}function or(o,t,e,i){const s=Yi(t,e,i);return o.push(s),o.sort((r,n)=>r.start-n.start),s}function ir(o,t){const e=o.findIndex(i=>i.id===t);e!==-1&&o.splice(e,1)}function pi(o,t,e=""){const i=Math.round(t);if(o.some(r=>Math.round(r.time)===i))return null;const s=er(t,e);return o.push(s),o.sort((r,n)=>r.time-n.time),s}function sr(o,t){const e=o.findIndex(i=>i.id===t);e!==-1&&o.splice(e,1)}function mi(o,t,e=""){const i=pt(o,t);if(i&&i.end!=null&&t<=i.end||o.some(r=>Math.abs(r.start-t)<2))return null;const s=Qs(t,e);return o.push(s),o.sort((r,n)=>r.start-n.start),s}function rr(o,t){const e=o.findIndex(i=>i.id===t);e!==-1&&o.splice(e,1)}function pt(o,t){let e=null;for(const i of o)if(i.start<=t)e=i;else break;return e}function nr(o,t,e,i=""){const s=tr(t,e,i);return o.push(s),o.sort((r,n)=>r.start-n.start),s}function lr(o,t){const e=o.findIndex(i=>i.id===t);e!==-1&&o.splice(e,1)}function fi(o,{loopStart:t,loopEnd:e,duration:i}){const s=i??1/0,r=Math.max(0,Math.min(t+o,s));if(r<e)return r;const n=Math.max(0,Math.min(e+o,s));return n<e?n:r}function vi(o,{loopStart:t,loopEnd:e,duration:i}){const s=i??1/0,r=Math.max(0,Math.min(e+o,s));if(t<r)return r;const n=Math.max(0,Math.min(t+o,s));return t<n?n:r}function Qt(o,t,e){if(!o.length)return null;let i=null,s=null;for(const l of o)if(l.start<=t)i=l;else{s=l;break}if(!i)return null;const r=s?s.start:e??null,n=i.end!=null?i.end:r;return i.end!=null&&t>i.end?null:{start:i.start,end:n}}function ne(o,t){let e=null;for(const i of o)if(i.start<=t)e=i;else break;return e}function Be(o,t,e){if(!o.length)return null;let i=null,s=null;for(const l of o)if(l.start<=t)i=l;else{s=l;break}if(!i)return null;const r=s?s.start:e??null,n=i.end!=null?i.end:r;return i.end!=null&&t>i.end?null:{start:i.start,end:n}}function ar(o,t,e){const i=o.findIndex(r=>r.id===t);if(i===-1)return!1;const s=o[i+1];return o[i].end=s?s.start:e??null,!0}function dr(o,t,e){const i=o.findIndex(r=>r.id===t);if(i===-1)return!1;const s=o[i+1];return o[i].end=s?s.start:e??null,!0}function qe(o,t,e,i,s){var d;const r=o[t],n=o[t-1],l=o[t+1];if(e!==r.start&&n&&e<=n.start)return!1;if(i!=null&&i!==r.end&&l){const h=l.end!=null?l.end:((d=o[t+2])==null?void 0:d.start)??s??null;if(h!=null&&i>=h)return!1}return!0}function He(o,t,e,i){const s=o[t],r=o[t-1],n=o[t+1];e!==s.start&&(r&&r.end!=null&&e<r.end&&(r.end=e),s.start=e,o.sort((l,d)=>l.start-d.start)),i!==s.end&&(i!=null&&n&&i>n.start&&(n.start=i,o.sort((l,d)=>l.start-d.start)),s.end=i)}function cr(o,t,e=""){const i=ne(o,t);if(i&&i.end!=null&&t<=i.end||o.some(r=>Math.abs(r.start-t)<2))return null;const s=Yi(e,t,null);return o.push(s),o.sort((r,n)=>r.start-n.start),s}const Xi="loopllama-v2";function Qi(o){return(o.version??1)<2&&(o.title&&(o.name=o.title),delete o.title,o.version=2),o}function hr(o){if(o.version||(o.version=1),o.version<2){for(const t of o.videos??[])Qi(t);o.version=2}if(o.version<3){const t=o.options??{};"section_loop_pad_start"in t&&(t.loop_pad_start=t.section_loop_pad_start,delete t.section_loop_pad_start),"section_loop_pad_end"in t&&(t.loop_pad_end=t.section_loop_pad_end,delete t.section_loop_pad_end),o.version=3}if(o.version<4){for(const t of o.videos??[]){for(const e of t.sections??[])"time"in e&&(e.start=e.time,delete e.time),delete e.chapterId;for(const e of t.marks??[])delete e.chapterId;for(const e of t.loops??[])delete e.chapterId}o.version=4}return o}function ur(){const o=localStorage.getItem(Xi);if(!o)return null;try{const t=JSON.parse(o),e=t.version;return hr(t),t.version!==e&&(console.log(`LoopLlama: migrated stored data from v${e} to v${t.version}`),tt(t)),t}catch(t){return console.error("LoopLlama: failed to parse stored data",t),null}}function tt(o){localStorage.setItem(Xi,JSON.stringify(o))}function pr(o){return JSON.stringify(o,null,2)}function mr(o,t){const e=o.videos.find(i=>i.id===t);if(!e)throw new Error(`exportVideo: no video with id "${t}"`);return JSON.stringify({version:Oo,videos:[e]},null,2)}function fr(o,t){const e=JSON.parse(o);let i;if(Array.isArray(e.videos))i=e.videos;else if(e.id&&typeof e.id=="string")i=[e];else throw new Error("Unrecognized format: expected a LoopLlama export.");i=i.map(Qi);let s=0,r=0;for(const n of i){if(!n.id)continue;const l=t.videos.findIndex(d=>d.id===n.id);l===-1?(t.videos.push(n),s++):(t.videos[l]=n,r++)}return{added:s,updated:r}}class io extends C{constructor(){super(),this.prefix=null,this.completions=null,this.windowFocused=!0,this.editScratchActive=!1,this.editScratchFocus="start",this.editScratchDelta=5,this.warningMsg=null,this.errorMsg=null,this.statusMsg=null}_kbItem(t,e){return f`
      <span class="item">
        <span class="key">${t}</span>
        <span class="desc">${e}</span>
      </span>
    `}render(){if(this.errorMsg)return f`
        <div class="bar">
          <div class="row"><span class="error">${this.errorMsg}</span></div>
        </div>
      `;if(!this.windowFocused)return f`
        <div class="bar">
          <div class="row">
            <span class="warning">
              Keyboard control inactive — click anywhere in the app to restore
            </span>
          </div>
        </div>
      `;if(this.editScratchActive){const t=this.editScratchFocus==="start"?"Start":"End",e=f`
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
            <span class="state-val">${t}</span>
          </span>
          <span class="item">
            <span class="desc">Delta:</span>
            <span class="state-val">${this.editScratchDelta}s</span>
          </span>
        </div>
      `;return this.warningMsg?f`
          <div class="bar">
            <div class="row"><span class="warning">${this.warningMsg}</span></div>
            ${e}
          </div>
        `:f`<div class="bar">${e}</div>`}if(this.warningMsg)return f`
        <div class="bar">
          <div class="row"><span class="warning">${this.warningMsg}</span></div>
        </div>
      `;if(this.prefix&&this.completions){const t=Object.entries(this.completions).map(([e,{desc:i}])=>f`
        <span class="item">
          <span class="key">${this.prefix}${e}</span>
          <span class="desc">${i}</span>
        </span>
      `);return f`<div class="bar"><div class="row">${t}</div></div>`}return this.statusMsg?f`
        <div class="bar">
          <div class="row"><span class="status">${this.statusMsg}</span></div>
        </div>
      `:f``}}w(io,"styles",x`
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
  `),w(io,"properties",{prefix:{type:String},completions:{type:Object},windowFocused:{type:Boolean},editScratchActive:{type:Boolean},editScratchFocus:{type:String},editScratchDelta:{type:Number},warningMsg:{type:String},errorMsg:{type:String},statusMsg:{type:String}});customElements.define("llama-whichkey",io);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vr=(o,t)=>(o==null?void 0:o._$litType$)!==void 0,ts=o=>o.strings===void 0,br={},gr=(o,t=br)=>o._$AH=t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Fo=o=>(...t)=>({_$litDirective$:o,values:t});let Uo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=(o,t)=>{var i;const e=o._$AN;if(e===void 0)return!1;for(const s of e)(i=s._$AO)==null||i.call(s,t,!1),de(s,t);return!0},Ee=o=>{let t,e;do{if((t=o._$AM)===void 0)break;e=t._$AN,e.delete(o),o=t}while((e==null?void 0:e.size)===0)},es=o=>{for(let t;t=o._$AM;o=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(o))break;e.add(o),wr(t)}};function _r(o){this._$AN!==void 0?(Ee(this),this._$AM=o,es(this)):this._$AM=o}function yr(o,t=!1,e=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let r=e;r<i.length;r++)de(i[r],!1),Ee(i[r]);else i!=null&&(de(i,!1),Ee(i));else de(this,o)}const wr=o=>{o.type==kt.CHILD&&(o._$AP??(o._$AP=yr),o._$AQ??(o._$AQ=_r))};class Sr extends Uo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),es(this),this.isConnected=t._$AU}_$AO(t,e=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),e&&(de(this,t),Ee(this))}setValue(t){if(ts(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt=()=>new kr;class kr{}const We=new WeakMap,St=Fo(class extends Sr{render(o){return D}update(o,[t]){var i;const e=t!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=t,this.ht=(i=o.options)==null?void 0:i.host,this.rt(this.ct=o.element)),D}rt(o){if(this.isConnected||(o=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let e=We.get(t);e===void 0&&(e=new WeakMap,We.set(t,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,o),o!==void 0&&this.G.call(this.ht,o)}else this.G.value=o}get lt(){var o,t;return typeof this.G=="function"?(o=We.get(this.ht??globalThis))==null?void 0:o.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),bi=/^\d+(\.\d+)?$/;function ot(o){if(o=(o||"").trim().replace(/\//g,":"),!o)return null;const t=o.split(":");if(t.length===2||t.length===3){if(t.some(i=>!bi.test(i)))return null;const e=t.map(Number);return t.length===2?e[0]*60+e[1]:e[0]*3600+e[1]*60+e[2]}return bi.test(o)?Number(o):null}var xr=x`
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
`,os=Object.defineProperty,$r=Object.defineProperties,Er=Object.getOwnPropertyDescriptor,Cr=Object.getOwnPropertyDescriptors,gi=Object.getOwnPropertySymbols,Lr=Object.prototype.hasOwnProperty,Ir=Object.prototype.propertyIsEnumerable,Ke=(o,t)=>(t=Symbol[o])?t:Symbol.for("Symbol."+o),jo=o=>{throw TypeError(o)},_i=(o,t,e)=>t in o?os(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,Vt=(o,t)=>{for(var e in t||(t={}))Lr.call(t,e)&&_i(o,e,t[e]);if(gi)for(var e of gi(t))Ir.call(t,e)&&_i(o,e,t[e]);return o},De=(o,t)=>$r(o,Cr(t)),c=(o,t,e,i)=>{for(var s=i>1?void 0:i?Er(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&os(t,e,s),s},is=(o,t,e)=>t.has(o)||jo("Cannot "+e),Tr=(o,t,e)=>(is(o,t,"read from private field"),t.get(o)),Ar=(o,t,e)=>t.has(o)?jo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),Dr=(o,t,e,i)=>(is(o,t,"write to private field"),t.set(o,e),e),Mr=function(o,t){this[0]=o,this[1]=t},zr=o=>{var t=o[Ke("asyncIterator")],e=!1,i,s={};return t==null?(t=o[Ke("iterator")](),i=r=>s[r]=n=>t[r](n)):(t=t.call(o),i=r=>s[r]=n=>{if(e){if(e=!1,r==="throw")throw n;return n}return e=!0,{done:!1,value:new Mr(new Promise(l=>{var d=t[r](n);d instanceof Object||jo("Object expected"),l(d)}),1)}}),s[Ke("iterator")]=()=>s,i("next"),"throw"in t?i("throw"):s.throw=r=>{throw r},"return"in t&&i("return"),s};function*Bo(o=document.activeElement){o!=null&&(yield o,"shadowRoot"in o&&o.shadowRoot&&o.shadowRoot.mode!=="closed"&&(yield*zr(Bo(o.shadowRoot.activeElement))))}function ss(){return[...Bo()].pop()}var yi=new WeakMap;function rs(o){let t=yi.get(o);return t||(t=window.getComputedStyle(o,null),yi.set(o,t)),t}function Rr(o){if(typeof o.checkVisibility=="function")return o.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=rs(o);return t.visibility!=="hidden"&&t.display!=="none"}function Pr(o){const t=rs(o),{overflowY:e,overflowX:i}=t;return e==="scroll"||i==="scroll"?!0:e!=="auto"||i!=="auto"?!1:o.scrollHeight>o.clientHeight&&e==="auto"||o.scrollWidth>o.clientWidth&&i==="auto"}function Nr(o){const t=o.tagName.toLowerCase(),e=Number(o.getAttribute("tabindex"));if(o.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||o.hasAttribute("disabled")||o.closest("[inert]"))return!1;if(t==="input"&&o.getAttribute("type")==="radio"){const r=o.getRootNode(),n=`input[type='radio'][name="${o.getAttribute("name")}"]`,l=r.querySelector(`${n}:checked`);return l?l===o:r.querySelector(n)===o}return Rr(o)?(t==="audio"||t==="video")&&o.hasAttribute("controls")||o.hasAttribute("tabindex")||o.hasAttribute("contenteditable")&&o.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:Pr(o):!1}function Vr(o){var t,e;const i=so(o),s=(t=i[0])!=null?t:null,r=(e=i[i.length-1])!=null?e:null;return{start:s,end:r}}function Or(o,t){var e;return((e=o.getRootNode({composed:!0}))==null?void 0:e.host)!==t}function so(o){const t=new WeakMap,e=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||t.has(s))return;t.set(s,!0),!e.includes(s)&&Nr(s)&&e.push(s),s instanceof HTMLSlotElement&&Or(s,o)&&s.assignedElements({flatten:!0}).forEach(r=>{i(r)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const r of s.children)i(r)}return i(o),e.sort((s,r)=>{const n=Number(s.getAttribute("tabindex"))||0;return(Number(r.getAttribute("tabindex"))||0)-n})}var Fr=x`
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
`;const ro=new Set,jt=new Map;let Mt,qo="ltr",Ho="en";const ns=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(ns){const o=new MutationObserver(as);qo=document.documentElement.dir||"ltr",Ho=document.documentElement.lang||navigator.language,o.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ls(...o){o.map(t=>{const e=t.$code.toLowerCase();jt.has(e)?jt.set(e,Object.assign(Object.assign({},jt.get(e)),t)):jt.set(e,t),Mt||(Mt=t)}),as()}function as(){ns&&(qo=document.documentElement.dir||"ltr",Ho=document.documentElement.lang||navigator.language),[...ro.keys()].map(o=>{typeof o.requestUpdate=="function"&&o.requestUpdate()})}let Ur=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){ro.add(this.host)}hostDisconnected(){ro.delete(this.host)}dir(){return`${this.host.dir||qo}`.toLowerCase()}lang(){return`${this.host.lang||Ho}`.toLowerCase()}getTranslationData(t){var e,i;const s=new Intl.Locale(t.replace(/_/g,"-")),r=s==null?void 0:s.language.toLowerCase(),n=(i=(e=s==null?void 0:s.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&i!==void 0?i:"",l=jt.get(`${r}-${n}`),d=jt.get(r);return{locale:s,language:r,region:n,primary:l,secondary:d}}exists(t,e){var i;const{primary:s,secondary:r}=this.getTranslationData((i=e.lang)!==null&&i!==void 0?i:this.lang());return e=Object.assign({includeFallback:!1},e),!!(s&&s[t]||r&&r[t]||e.includeFallback&&Mt&&Mt[t])}term(t,...e){const{primary:i,secondary:s}=this.getTranslationData(this.lang());let r;if(i&&i[t])r=i[t];else if(s&&s[t])r=s[t];else if(Mt&&Mt[t])r=Mt[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof r=="function"?r(...e):r}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,e)}};var ds={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(o,t)=>`Go to slide ${o} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:o=>o===0?"No options selected":o===1?"1 option selected":`${o} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:o=>`Slide ${o}`,toggleColorFormat:"Toggle color format"};ls(ds);var jr=ds,Tt=class extends Ur{};ls(jr);var H=x`
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
 */const Br={attribute:!0,type:String,converter:qt,reflect:!1,hasChanged:No},qr=(o=Br,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){const{name:n}=e;return{set(l){const d=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,d,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const d=this[n];t.call(this,l),this.requestUpdate(n,d,o,!0,l)}}throw Error("Unsupported decorator location: "+i)};function p(o){return(t,e)=>typeof e=="object"?qr(o,t,e):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Jt(o){return p({...o,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hr=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(o,t){return(e,i,s)=>{const r=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(o))??null};return Hr(e,i,{get(){return r(this)}})}}var Se,R=class extends C{constructor(){super(),Ar(this,Se,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([o,t])=>{this.constructor.define(o,t)})}emit(o,t){const e=new CustomEvent(o,Vt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(e),e}static define(o,t=this,e={}){const i=customElements.get(o);if(!i){try{customElements.define(o,t,e)}catch{customElements.define(o,class extends t{},e)}return}let s=" (unknown version)",r=s;"version"in t&&t.version&&(s=" v"+t.version),"version"in i&&i.version&&(r=" v"+i.version),!(s&&r&&s===r)&&console.warn(`Attempted to register <${o}>${s}, but <${o}>${r} has already been registered.`)}attributeChangedCallback(o,t,e){Tr(this,Se)||(this.constructor.elementProperties.forEach((i,s)=>{i.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),Dr(this,Se,!0)),super.attributeChangedCallback(o,t,e)}willUpdate(o){super.willUpdate(o),this.initialReflectedProperties.forEach((t,e)=>{o.has(e)&&this[e]==null&&(this[e]=t)})}};Se=new WeakMap;R.version="2.20.1";R.dependencies={};c([p()],R.prototype,"dir",2);c([p()],R.prototype,"lang",2);const Ct=Math.min,B=Math.max,Ce=Math.round,ge=Math.floor,lt=o=>({x:o,y:o}),Wr={left:"right",right:"left",bottom:"top",top:"bottom"},Kr={start:"end",end:"start"};function no(o,t,e){return B(o,Ct(t,e))}function Gt(o,t){return typeof o=="function"?o(t):o}function Lt(o){return o.split("-")[0]}function Yt(o){return o.split("-")[1]}function cs(o){return o==="x"?"y":"x"}function Wo(o){return o==="y"?"height":"width"}const Jr=new Set(["top","bottom"]);function vt(o){return Jr.has(Lt(o))?"y":"x"}function Ko(o){return cs(vt(o))}function Gr(o,t,e){e===void 0&&(e=!1);const i=Yt(o),s=Ko(o),r=Wo(s);let n=s==="x"?i===(e?"end":"start")?"right":"left":i==="start"?"bottom":"top";return t.reference[r]>t.floating[r]&&(n=Le(n)),[n,Le(n)]}function Yr(o){const t=Le(o);return[lo(o),t,lo(t)]}function lo(o){return o.replace(/start|end/g,t=>Kr[t])}const wi=["left","right"],Si=["right","left"],Zr=["top","bottom"],Xr=["bottom","top"];function Qr(o,t,e){switch(o){case"top":case"bottom":return e?t?Si:wi:t?wi:Si;case"left":case"right":return t?Zr:Xr;default:return[]}}function tn(o,t,e,i){const s=Yt(o);let r=Qr(Lt(o),e==="start",i);return s&&(r=r.map(n=>n+"-"+s),t&&(r=r.concat(r.map(lo)))),r}function Le(o){return o.replace(/left|right|bottom|top/g,t=>Wr[t])}function en(o){return{top:0,right:0,bottom:0,left:0,...o}}function hs(o){return typeof o!="number"?en(o):{top:o,right:o,bottom:o,left:o}}function Ie(o){const{x:t,y:e,width:i,height:s}=o;return{width:i,height:s,top:e,left:t,right:t+i,bottom:e+s,x:t,y:e}}function ki(o,t,e){let{reference:i,floating:s}=o;const r=vt(t),n=Ko(t),l=Wo(n),d=Lt(t),h=r==="y",m=i.x+i.width/2-s.width/2,u=i.y+i.height/2-s.height/2,v=i[l]/2-s[l]/2;let a;switch(d){case"top":a={x:m,y:i.y-s.height};break;case"bottom":a={x:m,y:i.y+i.height};break;case"right":a={x:i.x+i.width,y:u};break;case"left":a={x:i.x-s.width,y:u};break;default:a={x:i.x,y:i.y}}switch(Yt(t)){case"start":a[n]-=v*(e&&h?-1:1);break;case"end":a[n]+=v*(e&&h?-1:1);break}return a}async function on(o,t){var e;t===void 0&&(t={});const{x:i,y:s,platform:r,rects:n,elements:l,strategy:d}=o,{boundary:h="clippingAncestors",rootBoundary:m="viewport",elementContext:u="floating",altBoundary:v=!1,padding:a=0}=Gt(t,o),b=hs(a),y=l[v?u==="floating"?"reference":"floating":u],g=Ie(await r.getClippingRect({element:(e=await(r.isElement==null?void 0:r.isElement(y)))==null||e?y:y.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(l.floating)),boundary:h,rootBoundary:m,strategy:d})),S=u==="floating"?{x:i,y:s,width:n.floating.width,height:n.floating.height}:n.reference,E=await(r.getOffsetParent==null?void 0:r.getOffsetParent(l.floating)),A=await(r.isElement==null?void 0:r.isElement(E))?await(r.getScale==null?void 0:r.getScale(E))||{x:1,y:1}:{x:1,y:1},V=Ie(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:S,offsetParent:E,strategy:d}):S);return{top:(g.top-V.top+b.top)/A.y,bottom:(V.bottom-g.bottom+b.bottom)/A.y,left:(g.left-V.left+b.left)/A.x,right:(V.right-g.right+b.right)/A.x}}const sn=async(o,t,e)=>{const{placement:i="bottom",strategy:s="absolute",middleware:r=[],platform:n}=e,l=r.filter(Boolean),d=await(n.isRTL==null?void 0:n.isRTL(t));let h=await n.getElementRects({reference:o,floating:t,strategy:s}),{x:m,y:u}=ki(h,i,d),v=i,a={},b=0;for(let y=0;y<l.length;y++){var _;const{name:g,fn:S}=l[y],{x:E,y:A,data:V,reset:M}=await S({x:m,y:u,initialPlacement:i,placement:v,strategy:s,middlewareData:a,rects:h,platform:{...n,detectOverflow:(_=n.detectOverflow)!=null?_:on},elements:{reference:o,floating:t}});m=E??m,u=A??u,a={...a,[g]:{...a[g],...V}},M&&b<=50&&(b++,typeof M=="object"&&(M.placement&&(v=M.placement),M.rects&&(h=M.rects===!0?await n.getElementRects({reference:o,floating:t,strategy:s}):M.rects),{x:m,y:u}=ki(h,v,d)),y=-1)}return{x:m,y:u,placement:v,strategy:s,middlewareData:a}},rn=o=>({name:"arrow",options:o,async fn(t){const{x:e,y:i,placement:s,rects:r,platform:n,elements:l,middlewareData:d}=t,{element:h,padding:m=0}=Gt(o,t)||{};if(h==null)return{};const u=hs(m),v={x:e,y:i},a=Ko(s),b=Wo(a),_=await n.getDimensions(h),y=a==="y",g=y?"top":"left",S=y?"bottom":"right",E=y?"clientHeight":"clientWidth",A=r.reference[b]+r.reference[a]-v[a]-r.floating[b],V=v[a]-r.reference[a],M=await(n.getOffsetParent==null?void 0:n.getOffsetParent(h));let O=M?M[E]:0;(!O||!await(n.isElement==null?void 0:n.isElement(M)))&&(O=l.floating[E]||r.floating[b]);const ht=A/2-V/2,rt=O/2-_[b]/2-1,J=Ct(u[g],rt),gt=Ct(u[S],rt),nt=J,_t=O-_[b]-gt,j=O/2-_[b]/2+ht,At=no(nt,j,_t),ut=!d.arrow&&Yt(s)!=null&&j!==At&&r.reference[b]/2-(j<nt?J:gt)-_[b]/2<0,Z=ut?j<nt?j-nt:j-_t:0;return{[a]:v[a]+Z,data:{[a]:At,centerOffset:j-At-Z,...ut&&{alignmentOffset:Z}},reset:ut}}}),nn=function(o){return o===void 0&&(o={}),{name:"flip",options:o,async fn(t){var e,i;const{placement:s,middlewareData:r,rects:n,initialPlacement:l,platform:d,elements:h}=t,{mainAxis:m=!0,crossAxis:u=!0,fallbackPlacements:v,fallbackStrategy:a="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:_=!0,...y}=Gt(o,t);if((e=r.arrow)!=null&&e.alignmentOffset)return{};const g=Lt(s),S=vt(l),E=Lt(l)===l,A=await(d.isRTL==null?void 0:d.isRTL(h.floating)),V=v||(E||!_?[Le(l)]:Yr(l)),M=b!=="none";!v&&M&&V.push(...tn(l,_,b,A));const O=[l,...V],ht=await d.detectOverflow(t,y),rt=[];let J=((i=r.flip)==null?void 0:i.overflows)||[];if(m&&rt.push(ht[g]),u){const j=Gr(s,n,A);rt.push(ht[j[0]],ht[j[1]])}if(J=[...J,{placement:s,overflows:rt}],!rt.every(j=>j<=0)){var gt,nt;const j=(((gt=r.flip)==null?void 0:gt.index)||0)+1,At=O[j];if(At&&(!(u==="alignment"?S!==vt(At):!1)||J.every(X=>vt(X.placement)===S?X.overflows[0]>0:!0)))return{data:{index:j,overflows:J},reset:{placement:At}};let ut=(nt=J.filter(Z=>Z.overflows[0]<=0).sort((Z,X)=>Z.overflows[1]-X.overflows[1])[0])==null?void 0:nt.placement;if(!ut)switch(a){case"bestFit":{var _t;const Z=(_t=J.filter(X=>{if(M){const yt=vt(X.placement);return yt===S||yt==="y"}return!0}).map(X=>[X.placement,X.overflows.filter(yt=>yt>0).reduce((yt,Es)=>yt+Es,0)]).sort((X,yt)=>X[1]-yt[1])[0])==null?void 0:_t[0];Z&&(ut=Z);break}case"initialPlacement":ut=l;break}if(s!==ut)return{reset:{placement:ut}}}return{}}}},ln=new Set(["left","top"]);async function an(o,t){const{placement:e,platform:i,elements:s}=o,r=await(i.isRTL==null?void 0:i.isRTL(s.floating)),n=Lt(e),l=Yt(e),d=vt(e)==="y",h=ln.has(n)?-1:1,m=r&&d?-1:1,u=Gt(t,o);let{mainAxis:v,crossAxis:a,alignmentAxis:b}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return l&&typeof b=="number"&&(a=l==="end"?b*-1:b),d?{x:a*m,y:v*h}:{x:v*h,y:a*m}}const dn=function(o){return o===void 0&&(o=0),{name:"offset",options:o,async fn(t){var e,i;const{x:s,y:r,placement:n,middlewareData:l}=t,d=await an(t,o);return n===((e=l.offset)==null?void 0:e.placement)&&(i=l.arrow)!=null&&i.alignmentOffset?{}:{x:s+d.x,y:r+d.y,data:{...d,placement:n}}}}},cn=function(o){return o===void 0&&(o={}),{name:"shift",options:o,async fn(t){const{x:e,y:i,placement:s,platform:r}=t,{mainAxis:n=!0,crossAxis:l=!1,limiter:d={fn:g=>{let{x:S,y:E}=g;return{x:S,y:E}}},...h}=Gt(o,t),m={x:e,y:i},u=await r.detectOverflow(t,h),v=vt(Lt(s)),a=cs(v);let b=m[a],_=m[v];if(n){const g=a==="y"?"top":"left",S=a==="y"?"bottom":"right",E=b+u[g],A=b-u[S];b=no(E,b,A)}if(l){const g=v==="y"?"top":"left",S=v==="y"?"bottom":"right",E=_+u[g],A=_-u[S];_=no(E,_,A)}const y=d.fn({...t,[a]:b,[v]:_});return{...y,data:{x:y.x-e,y:y.y-i,enabled:{[a]:n,[v]:l}}}}}},hn=function(o){return o===void 0&&(o={}),{name:"size",options:o,async fn(t){var e,i;const{placement:s,rects:r,platform:n,elements:l}=t,{apply:d=()=>{},...h}=Gt(o,t),m=await n.detectOverflow(t,h),u=Lt(s),v=Yt(s),a=vt(s)==="y",{width:b,height:_}=r.floating;let y,g;u==="top"||u==="bottom"?(y=u,g=v===(await(n.isRTL==null?void 0:n.isRTL(l.floating))?"start":"end")?"left":"right"):(g=u,y=v==="end"?"top":"bottom");const S=_-m.top-m.bottom,E=b-m.left-m.right,A=Ct(_-m[y],S),V=Ct(b-m[g],E),M=!t.middlewareData.shift;let O=A,ht=V;if((e=t.middlewareData.shift)!=null&&e.enabled.x&&(ht=E),(i=t.middlewareData.shift)!=null&&i.enabled.y&&(O=S),M&&!v){const J=B(m.left,0),gt=B(m.right,0),nt=B(m.top,0),_t=B(m.bottom,0);a?ht=b-2*(J!==0||gt!==0?J+gt:B(m.left,m.right)):O=_-2*(nt!==0||_t!==0?nt+_t:B(m.top,m.bottom))}await d({...t,availableWidth:ht,availableHeight:O});const rt=await n.getDimensions(l.floating);return b!==rt.width||_!==rt.height?{reset:{rects:!0}}:{}}}};function Me(){return typeof window<"u"}function Zt(o){return us(o)?(o.nodeName||"").toLowerCase():"#document"}function q(o){var t;return(o==null||(t=o.ownerDocument)==null?void 0:t.defaultView)||window}function dt(o){var t;return(t=(us(o)?o.ownerDocument:o.document)||window.document)==null?void 0:t.documentElement}function us(o){return Me()?o instanceof Node||o instanceof q(o).Node:!1}function it(o){return Me()?o instanceof Element||o instanceof q(o).Element:!1}function at(o){return Me()?o instanceof HTMLElement||o instanceof q(o).HTMLElement:!1}function xi(o){return!Me()||typeof ShadowRoot>"u"?!1:o instanceof ShadowRoot||o instanceof q(o).ShadowRoot}const un=new Set(["inline","contents"]);function ve(o){const{overflow:t,overflowX:e,overflowY:i,display:s}=st(o);return/auto|scroll|overlay|hidden|clip/.test(t+i+e)&&!un.has(s)}const pn=new Set(["table","td","th"]);function mn(o){return pn.has(Zt(o))}const fn=[":popover-open",":modal"];function ze(o){return fn.some(t=>{try{return o.matches(t)}catch{return!1}})}const vn=["transform","translate","scale","rotate","perspective"],bn=["transform","translate","scale","rotate","perspective","filter"],gn=["paint","layout","strict","content"];function Re(o){const t=Jo(),e=it(o)?st(o):o;return vn.some(i=>e[i]?e[i]!=="none":!1)||(e.containerType?e.containerType!=="normal":!1)||!t&&(e.backdropFilter?e.backdropFilter!=="none":!1)||!t&&(e.filter?e.filter!=="none":!1)||bn.some(i=>(e.willChange||"").includes(i))||gn.some(i=>(e.contain||"").includes(i))}function _n(o){let t=It(o);for(;at(t)&&!Wt(t);){if(Re(t))return t;if(ze(t))return null;t=It(t)}return null}function Jo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const yn=new Set(["html","body","#document"]);function Wt(o){return yn.has(Zt(o))}function st(o){return q(o).getComputedStyle(o)}function Pe(o){return it(o)?{scrollLeft:o.scrollLeft,scrollTop:o.scrollTop}:{scrollLeft:o.scrollX,scrollTop:o.scrollY}}function It(o){if(Zt(o)==="html")return o;const t=o.assignedSlot||o.parentNode||xi(o)&&o.host||dt(o);return xi(t)?t.host:t}function ps(o){const t=It(o);return Wt(t)?o.ownerDocument?o.ownerDocument.body:o.body:at(t)&&ve(t)?t:ps(t)}function pe(o,t,e){var i;t===void 0&&(t=[]),e===void 0&&(e=!0);const s=ps(o),r=s===((i=o.ownerDocument)==null?void 0:i.body),n=q(s);if(r){const l=ao(n);return t.concat(n,n.visualViewport||[],ve(s)?s:[],l&&e?pe(l):[])}return t.concat(s,pe(s,[],e))}function ao(o){return o.parent&&Object.getPrototypeOf(o.parent)?o.frameElement:null}function ms(o){const t=st(o);let e=parseFloat(t.width)||0,i=parseFloat(t.height)||0;const s=at(o),r=s?o.offsetWidth:e,n=s?o.offsetHeight:i,l=Ce(e)!==r||Ce(i)!==n;return l&&(e=r,i=n),{width:e,height:i,$:l}}function Go(o){return it(o)?o:o.contextElement}function Bt(o){const t=Go(o);if(!at(t))return lt(1);const e=t.getBoundingClientRect(),{width:i,height:s,$:r}=ms(t);let n=(r?Ce(e.width):e.width)/i,l=(r?Ce(e.height):e.height)/s;return(!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}const wn=lt(0);function fs(o){const t=q(o);return!Jo()||!t.visualViewport?wn:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Sn(o,t,e){return t===void 0&&(t=!1),!e||t&&e!==q(o)?!1:t}function Nt(o,t,e,i){t===void 0&&(t=!1),e===void 0&&(e=!1);const s=o.getBoundingClientRect(),r=Go(o);let n=lt(1);t&&(i?it(i)&&(n=Bt(i)):n=Bt(o));const l=Sn(r,e,i)?fs(r):lt(0);let d=(s.left+l.x)/n.x,h=(s.top+l.y)/n.y,m=s.width/n.x,u=s.height/n.y;if(r){const v=q(r),a=i&&it(i)?q(i):i;let b=v,_=ao(b);for(;_&&i&&a!==b;){const y=Bt(_),g=_.getBoundingClientRect(),S=st(_),E=g.left+(_.clientLeft+parseFloat(S.paddingLeft))*y.x,A=g.top+(_.clientTop+parseFloat(S.paddingTop))*y.y;d*=y.x,h*=y.y,m*=y.x,u*=y.y,d+=E,h+=A,b=q(_),_=ao(b)}}return Ie({width:m,height:u,x:d,y:h})}function Ne(o,t){const e=Pe(o).scrollLeft;return t?t.left+e:Nt(dt(o)).left+e}function vs(o,t){const e=o.getBoundingClientRect(),i=e.left+t.scrollLeft-Ne(o,e),s=e.top+t.scrollTop;return{x:i,y:s}}function kn(o){let{elements:t,rect:e,offsetParent:i,strategy:s}=o;const r=s==="fixed",n=dt(i),l=t?ze(t.floating):!1;if(i===n||l&&r)return e;let d={scrollLeft:0,scrollTop:0},h=lt(1);const m=lt(0),u=at(i);if((u||!u&&!r)&&((Zt(i)!=="body"||ve(n))&&(d=Pe(i)),at(i))){const a=Nt(i);h=Bt(i),m.x=a.x+i.clientLeft,m.y=a.y+i.clientTop}const v=n&&!u&&!r?vs(n,d):lt(0);return{width:e.width*h.x,height:e.height*h.y,x:e.x*h.x-d.scrollLeft*h.x+m.x+v.x,y:e.y*h.y-d.scrollTop*h.y+m.y+v.y}}function xn(o){return Array.from(o.getClientRects())}function $n(o){const t=dt(o),e=Pe(o),i=o.ownerDocument.body,s=B(t.scrollWidth,t.clientWidth,i.scrollWidth,i.clientWidth),r=B(t.scrollHeight,t.clientHeight,i.scrollHeight,i.clientHeight);let n=-e.scrollLeft+Ne(o);const l=-e.scrollTop;return st(i).direction==="rtl"&&(n+=B(t.clientWidth,i.clientWidth)-s),{width:s,height:r,x:n,y:l}}const $i=25;function En(o,t){const e=q(o),i=dt(o),s=e.visualViewport;let r=i.clientWidth,n=i.clientHeight,l=0,d=0;if(s){r=s.width,n=s.height;const m=Jo();(!m||m&&t==="fixed")&&(l=s.offsetLeft,d=s.offsetTop)}const h=Ne(i);if(h<=0){const m=i.ownerDocument,u=m.body,v=getComputedStyle(u),a=m.compatMode==="CSS1Compat"&&parseFloat(v.marginLeft)+parseFloat(v.marginRight)||0,b=Math.abs(i.clientWidth-u.clientWidth-a);b<=$i&&(r-=b)}else h<=$i&&(r+=h);return{width:r,height:n,x:l,y:d}}const Cn=new Set(["absolute","fixed"]);function Ln(o,t){const e=Nt(o,!0,t==="fixed"),i=e.top+o.clientTop,s=e.left+o.clientLeft,r=at(o)?Bt(o):lt(1),n=o.clientWidth*r.x,l=o.clientHeight*r.y,d=s*r.x,h=i*r.y;return{width:n,height:l,x:d,y:h}}function Ei(o,t,e){let i;if(t==="viewport")i=En(o,e);else if(t==="document")i=$n(dt(o));else if(it(t))i=Ln(t,e);else{const s=fs(o);i={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height}}return Ie(i)}function bs(o,t){const e=It(o);return e===t||!it(e)||Wt(e)?!1:st(e).position==="fixed"||bs(e,t)}function In(o,t){const e=t.get(o);if(e)return e;let i=pe(o,[],!1).filter(l=>it(l)&&Zt(l)!=="body"),s=null;const r=st(o).position==="fixed";let n=r?It(o):o;for(;it(n)&&!Wt(n);){const l=st(n),d=Re(n);!d&&l.position==="fixed"&&(s=null),(r?!d&&!s:!d&&l.position==="static"&&!!s&&Cn.has(s.position)||ve(n)&&!d&&bs(o,n))?i=i.filter(m=>m!==n):s=l,n=It(n)}return t.set(o,i),i}function Tn(o){let{element:t,boundary:e,rootBoundary:i,strategy:s}=o;const n=[...e==="clippingAncestors"?ze(t)?[]:In(t,this._c):[].concat(e),i],l=n[0],d=n.reduce((h,m)=>{const u=Ei(t,m,s);return h.top=B(u.top,h.top),h.right=Ct(u.right,h.right),h.bottom=Ct(u.bottom,h.bottom),h.left=B(u.left,h.left),h},Ei(t,l,s));return{width:d.right-d.left,height:d.bottom-d.top,x:d.left,y:d.top}}function An(o){const{width:t,height:e}=ms(o);return{width:t,height:e}}function Dn(o,t,e){const i=at(t),s=dt(t),r=e==="fixed",n=Nt(o,!0,r,t);let l={scrollLeft:0,scrollTop:0};const d=lt(0);function h(){d.x=Ne(s)}if(i||!i&&!r)if((Zt(t)!=="body"||ve(s))&&(l=Pe(t)),i){const a=Nt(t,!0,r,t);d.x=a.x+t.clientLeft,d.y=a.y+t.clientTop}else s&&h();r&&!i&&s&&h();const m=s&&!i&&!r?vs(s,l):lt(0),u=n.left+l.scrollLeft-d.x-m.x,v=n.top+l.scrollTop-d.y-m.y;return{x:u,y:v,width:n.width,height:n.height}}function Je(o){return st(o).position==="static"}function Ci(o,t){if(!at(o)||st(o).position==="fixed")return null;if(t)return t(o);let e=o.offsetParent;return dt(o)===e&&(e=e.ownerDocument.body),e}function gs(o,t){const e=q(o);if(ze(o))return e;if(!at(o)){let s=It(o);for(;s&&!Wt(s);){if(it(s)&&!Je(s))return s;s=It(s)}return e}let i=Ci(o,t);for(;i&&mn(i)&&Je(i);)i=Ci(i,t);return i&&Wt(i)&&Je(i)&&!Re(i)?e:i||_n(o)||e}const Mn=async function(o){const t=this.getOffsetParent||gs,e=this.getDimensions,i=await e(o.floating);return{reference:Dn(o.reference,await t(o.floating),o.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function zn(o){return st(o).direction==="rtl"}const ke={convertOffsetParentRelativeRectToViewportRelativeRect:kn,getDocumentElement:dt,getClippingRect:Tn,getOffsetParent:gs,getElementRects:Mn,getClientRects:xn,getDimensions:An,getScale:Bt,isElement:it,isRTL:zn};function _s(o,t){return o.x===t.x&&o.y===t.y&&o.width===t.width&&o.height===t.height}function Rn(o,t){let e=null,i;const s=dt(o);function r(){var l;clearTimeout(i),(l=e)==null||l.disconnect(),e=null}function n(l,d){l===void 0&&(l=!1),d===void 0&&(d=1),r();const h=o.getBoundingClientRect(),{left:m,top:u,width:v,height:a}=h;if(l||t(),!v||!a)return;const b=ge(u),_=ge(s.clientWidth-(m+v)),y=ge(s.clientHeight-(u+a)),g=ge(m),E={rootMargin:-b+"px "+-_+"px "+-y+"px "+-g+"px",threshold:B(0,Ct(1,d))||1};let A=!0;function V(M){const O=M[0].intersectionRatio;if(O!==d){if(!A)return n();O?n(!1,O):i=setTimeout(()=>{n(!1,1e-7)},1e3)}O===1&&!_s(h,o.getBoundingClientRect())&&n(),A=!1}try{e=new IntersectionObserver(V,{...E,root:s.ownerDocument})}catch{e=new IntersectionObserver(V,E)}e.observe(o)}return n(!0),r}function Pn(o,t,e,i){i===void 0&&(i={});const{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:d=!1}=i,h=Go(o),m=s||r?[...h?pe(h):[],...pe(t)]:[];m.forEach(g=>{s&&g.addEventListener("scroll",e,{passive:!0}),r&&g.addEventListener("resize",e)});const u=h&&l?Rn(h,e):null;let v=-1,a=null;n&&(a=new ResizeObserver(g=>{let[S]=g;S&&S.target===h&&a&&(a.unobserve(t),cancelAnimationFrame(v),v=requestAnimationFrame(()=>{var E;(E=a)==null||E.observe(t)})),e()}),h&&!d&&a.observe(h),a.observe(t));let b,_=d?Nt(o):null;d&&y();function y(){const g=Nt(o);_&&!_s(_,g)&&e(),_=g,b=requestAnimationFrame(y)}return e(),()=>{var g;m.forEach(S=>{s&&S.removeEventListener("scroll",e),r&&S.removeEventListener("resize",e)}),u==null||u(),(g=a)==null||g.disconnect(),a=null,d&&cancelAnimationFrame(b)}}const Nn=dn,Vn=cn,On=nn,Li=hn,Fn=rn,Un=(o,t,e)=>{const i=new Map,s={platform:ke,...e},r={...s.platform,_c:i};return sn(o,t,{...s,platform:r})};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=Fo(class extends Uo{constructor(o){var t;if(super(o),o.type!==kt.ATTRIBUTE||o.name!=="class"||((t=o.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(t=>o[t]).join(" ")+" "}update(o,[t]){var i,s;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!((i=this.nt)!=null&&i.has(r))&&this.st.add(r);return this.render(t)}const e=o.element.classList;for(const r of this.st)r in t||(e.remove(r),this.st.delete(r));for(const r in t){const n=!!t[r];n===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(n?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return et}});function jn(o){return Bn(o)}function Ge(o){return o.assignedSlot?o.assignedSlot:o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode}function Bn(o){for(let t=o;t;t=Ge(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=Ge(o);t;t=Ge(t)){if(!(t instanceof Element))continue;const e=getComputedStyle(t);if(e.display!=="contents"&&(e.position!=="static"||Re(e)||t.tagName==="BODY"))return t}return null}function qn(o){return o!==null&&typeof o=="object"&&"getBoundingClientRect"in o&&("contextElement"in o?o.contextElement instanceof Element:!0)}var I=class extends R{constructor(){super(...arguments),this.localize=new Tt(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const o=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),e=this.placement.includes("top")||this.placement.includes("bottom");let i=0,s=0,r=0,n=0,l=0,d=0,h=0,m=0;e?o.top<t.top?(i=o.left,s=o.bottom,r=o.right,n=o.bottom,l=t.left,d=t.top,h=t.right,m=t.top):(i=t.left,s=t.bottom,r=t.right,n=t.bottom,l=o.left,d=o.top,h=o.right,m=o.top):o.left<t.left?(i=o.right,s=o.top,r=t.left,n=t.top,l=o.right,d=o.bottom,h=t.left,m=t.bottom):(i=t.right,s=t.top,r=o.left,n=o.top,l=t.right,d=t.bottom,h=o.left,m=o.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${m}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(o){super.updated(o),o.has("active")&&(this.active?this.start():this.stop()),o.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const o=this.getRootNode();this.anchorEl=o.getElementById(this.anchor)}else this.anchor instanceof Element||qn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Pn(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(o=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>o())):o()})}reposition(){if(!this.active||!this.anchorEl)return;const o=[Nn({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?o.push(Li({apply:({rects:e})=>{const i=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${e.reference.width}px`:"",this.popup.style.height=s?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&o.push(On({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&o.push(Vn({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?o.push(Li({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&o.push(Fn({element:this.arrowEl,padding:this.arrowPadding}));const t=this.strategy==="absolute"?e=>ke.getOffsetParent(e,jn):ke.getOffsetParent;Un(this.anchorEl,this.popup,{placement:this.placement,middleware:o,strategy:this.strategy,platform:De(Vt({},ke),{getOffsetParent:t})}).then(({x:e,y:i,middlewareData:s,placement:r})=>{const n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${i}px`}),this.arrow){const d=s.arrow.x,h=s.arrow.y;let m="",u="",v="",a="";if(this.arrowPlacement==="start"){const b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",u=n?b:"",a=n?"":b}else if(this.arrowPlacement==="end"){const b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=n?"":b,a=n?b:"",v=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(a=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(a=typeof d=="number"?`${d}px`:"",m=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:m,right:u,bottom:v,left:a,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return f`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${G({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${G({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?f`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};I.styles=[H,Fr];c([z(".popup")],I.prototype,"popup",2);c([z(".popup__arrow")],I.prototype,"arrowEl",2);c([p()],I.prototype,"anchor",2);c([p({type:Boolean,reflect:!0})],I.prototype,"active",2);c([p({reflect:!0})],I.prototype,"placement",2);c([p({reflect:!0})],I.prototype,"strategy",2);c([p({type:Number})],I.prototype,"distance",2);c([p({type:Number})],I.prototype,"skidding",2);c([p({type:Boolean})],I.prototype,"arrow",2);c([p({attribute:"arrow-placement"})],I.prototype,"arrowPlacement",2);c([p({attribute:"arrow-padding",type:Number})],I.prototype,"arrowPadding",2);c([p({type:Boolean})],I.prototype,"flip",2);c([p({attribute:"flip-fallback-placements",converter:{fromAttribute:o=>o.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:o=>o.join(" ")}})],I.prototype,"flipFallbackPlacements",2);c([p({attribute:"flip-fallback-strategy"})],I.prototype,"flipFallbackStrategy",2);c([p({type:Object})],I.prototype,"flipBoundary",2);c([p({attribute:"flip-padding",type:Number})],I.prototype,"flipPadding",2);c([p({type:Boolean})],I.prototype,"shift",2);c([p({type:Object})],I.prototype,"shiftBoundary",2);c([p({attribute:"shift-padding",type:Number})],I.prototype,"shiftPadding",2);c([p({attribute:"auto-size"})],I.prototype,"autoSize",2);c([p()],I.prototype,"sync",2);c([p({type:Object})],I.prototype,"autoSizeBoundary",2);c([p({attribute:"auto-size-padding",type:Number})],I.prototype,"autoSizePadding",2);c([p({attribute:"hover-bridge",type:Boolean})],I.prototype,"hoverBridge",2);var ys=new Map,Hn=new WeakMap;function Wn(o){return o??{keyframes:[],options:{duration:0}}}function Ii(o,t){return t.toLowerCase()==="rtl"?{keyframes:o.rtlKeyframes||o.keyframes,options:o.options}:o}function bt(o,t){ys.set(o,Wn(t))}function mt(o,t,e){const i=Hn.get(o);if(i!=null&&i[t])return Ii(i[t],e.dir);const s=ys.get(t);return s?Ii(s,e.dir):{keyframes:[],options:{duration:0}}}function Kt(o,t){return new Promise(e=>{function i(s){s.target===o&&(o.removeEventListener(t,i),e())}o.addEventListener(t,i)})}function ft(o,t,e){return new Promise(i=>{if((e==null?void 0:e.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=o.animate(t,De(Vt({},e),{duration:Kn()?0:e.duration}));s.addEventListener("cancel",i,{once:!0}),s.addEventListener("finish",i,{once:!0})})}function Ti(o){return o=o.toString().toLowerCase(),o.indexOf("ms")>-1?parseFloat(o):o.indexOf("s")>-1?parseFloat(o)*1e3:parseFloat(o)}function Kn(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function $t(o){return Promise.all(o.getAnimations().map(t=>new Promise(e=>{t.cancel(),requestAnimationFrame(e)})))}function P(o,t){const e=Vt({waitUntilFirstUpdate:!1},t);return(i,s)=>{const{update:r}=i,n=Array.isArray(o)?o:[o];i.update=function(l){n.forEach(d=>{const h=d;if(l.has(h)){const m=l.get(h),u=this[h];m!==u&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[s](m,u)}}),r.call(this,l)}}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $=o=>o??D;var F=class extends R{constructor(){super(...arguments),this.localize=new Tt(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=o=>{this.open&&o.key==="Escape"&&(o.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=o=>{var t;if(o.key==="Escape"&&this.open&&!this.closeWatcher){o.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(o.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){o.preventDefault(),this.hide(),this.focusOnTrigger();return}const e=(i,s)=>{if(!i)return null;const r=i.closest(s);if(r)return r;const n=i.getRootNode();return n instanceof ShadowRoot?e(n.host,s):null};setTimeout(()=>{var i;const s=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?ss():document.activeElement;(!this.containingElement||e(s,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=o=>{const t=o.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=o=>{const t=o.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const o=this.trigger.assignedElements({flatten:!0})[0];typeof(o==null?void 0:o.focus)=="function"&&o.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(o=>o.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(o){if([" ","Enter"].includes(o.key)){o.preventDefault(),this.handleTriggerClick();return}const t=this.getMenu();if(t){const e=t.getAllItems(),i=e[0],s=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(o.key)&&(o.preventDefault(),this.open||(this.show(),await this.updateComplete),e.length>0&&this.updateComplete.then(()=>{(o.key==="ArrowDown"||o.key==="Home")&&(t.setCurrentItem(i),i.focus()),(o.key==="ArrowUp"||o.key==="End")&&(t.setCurrentItem(s),s.focus())}))}}handleTriggerKeyUp(o){o.key===" "&&o.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(i=>Vr(i).start);let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Kt(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var o;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((o=this.closeWatcher)==null||o.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var o;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(o=this.closeWatcher)==null||o.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await $t(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:o,options:t}=mt(this,"dropdown.show",{dir:this.localize.dir()});await ft(this.popup.popup,o,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await $t(this);const{keyframes:o,options:t}=mt(this,"dropdown.hide",{dir:this.localize.dir()});await ft(this.popup.popup,o,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return f`
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
        sync=${$(this.sync?this.sync:void 0)}
        class=${G({dropdown:!0,"dropdown--open":this.open})}
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
    `}};F.styles=[H,xr];F.dependencies={"sl-popup":I};c([z(".dropdown")],F.prototype,"popup",2);c([z(".dropdown__trigger")],F.prototype,"trigger",2);c([z(".dropdown__panel")],F.prototype,"panel",2);c([p({type:Boolean,reflect:!0})],F.prototype,"open",2);c([p({reflect:!0})],F.prototype,"placement",2);c([p({type:Boolean,reflect:!0})],F.prototype,"disabled",2);c([p({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],F.prototype,"stayOpenOnSelect",2);c([p({attribute:!1})],F.prototype,"containingElement",2);c([p({type:Number})],F.prototype,"distance",2);c([p({type:Number})],F.prototype,"skidding",2);c([p({type:Boolean})],F.prototype,"hoist",2);c([p({reflect:!0})],F.prototype,"sync",2);c([P("open",{waitUntilFirstUpdate:!0})],F.prototype,"handleOpenChange",1);bt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});bt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});F.define("sl-dropdown");var Jn=x`
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
`,Yo=class extends R{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(o){const t=["menuitem","menuitemcheckbox"],e=o.composedPath(),i=e.find(l=>{var d;return t.includes(((d=l==null?void 0:l.getAttribute)==null?void 0:d.call(l,"role"))||"")});if(!i||e.find(l=>{var d;return((d=l==null?void 0:l.getAttribute)==null?void 0:d.call(l,"role"))==="menu"})!==this)return;const n=i;n.type==="checkbox"&&(n.checked=!n.checked),this.emit("sl-select",{detail:{item:n}})}handleKeyDown(o){if(o.key==="Enter"||o.key===" "){const t=this.getCurrentItem();o.preventDefault(),o.stopPropagation(),t==null||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(o.key)){const t=this.getAllItems(),e=this.getCurrentItem();let i=e?t.indexOf(e):0;t.length>0&&(o.preventDefault(),o.stopPropagation(),o.key==="ArrowDown"?i++:o.key==="ArrowUp"?i--:o.key==="Home"?i=0:o.key==="End"&&(i=t.length-1),i<0&&(i=t.length-1),i>t.length-1&&(i=0),this.setCurrentItem(t[i]),t[i].focus())}}handleMouseDown(o){const t=o.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const o=this.getAllItems();o.length>0&&this.setCurrentItem(o[0])}isMenuItem(o){var t;return o.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((t=o.getAttribute("role"))!=null?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(o=>!(o.inert||!this.isMenuItem(o)))}getCurrentItem(){return this.getAllItems().find(o=>o.getAttribute("tabindex")==="0")}setCurrentItem(o){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===o?"0":"-1")})}render(){return f`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Yo.styles=[H,Jn];c([z("slot")],Yo.prototype,"defaultSlot",2);Yo.define("sl-menu");var Gn=x`
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
`,Yn=class{constructor(o,t){this.popupRef=wt(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=e=>{switch(e.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(e);break}},this.handleClick=e=>{var i;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&(e.target.tagName==="sl-menu-item"||(i=e.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=e=>{e.stopPropagation()},this.handlePopupReposition=()=>{const e=this.host.renderRoot.querySelector("slot[name='submenu']"),i=e==null?void 0:e.assignedElements({flatten:!0}).filter(h=>h.localName==="sl-menu")[0],s=getComputedStyle(this.host).direction==="rtl";if(!i)return;const{left:r,top:n,width:l,height:d}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${s?r+l:r}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${s?r+l:r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${n+d}px`)},(this.host=o).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(o){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let e=null;for(const i of t.assignedElements())if(e=i.querySelectorAll("sl-menu-item, [role^='menuitem']"),e.length!==0)break;if(!(!e||e.length===0)){e[0].setAttribute("tabindex","0");for(let i=1;i!==e.length;++i)e[i].setAttribute("tabindex","-1");this.popupRef.value&&(o.preventDefault(),o.stopPropagation(),this.popupRef.value.active?e[0]instanceof HTMLElement&&e[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{e[0]instanceof HTMLElement&&e[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(o){this.popupRef.value&&this.popupRef.value.active!==o&&(this.popupRef.value.active=o,this.host.requestUpdate())}enableSubmenu(o=!0){o?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var o;if(!((o=this.host.parentElement)!=null&&o.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),i=["padding-top","border-top-width","margin-top"].reduce((s,r)=>{var n;const l=(n=t.get(r))!=null?n:new CSSUnitValue(0,"px"),h=(l instanceof CSSUnitValue?l:new CSSUnitValue(0,"px")).to("px");return s-h.value},0);this.skidding=i}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const o=getComputedStyle(this.host).direction==="rtl";return this.isConnected?f`
      <sl-popup
        ${St(this.popupRef)}
        placement=${o?"left-start":"right-start"}
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
    `:f` <slot name="submenu" hidden></slot> `}},Zn=x`
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
`,Zo=class extends R{constructor(){super(...arguments),this.localize=new Tt(this)}render(){return f`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Zo.styles=[H,Zn];var be=class{constructor(o,...t){this.slotNames=[],this.handleSlotChange=e=>{const i=e.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=o).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(o=>{if(o.nodeType===o.TEXT_NODE&&o.textContent.trim()!=="")return!0;if(o.nodeType===o.ELEMENT_NODE){const t=o;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(o){return this.host.querySelector(`:scope > [slot="${o}"]`)!==null}test(o){return o==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(o)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function Xn(o){if(!o)return"";const t=o.assignedNodes({flatten:!0});let e="";return[...t].forEach(i=>{i.nodeType===Node.TEXT_NODE&&(e+=i.textContent)}),e}var co="";function Ai(o){co=o}function Qn(o=""){if(!co){const t=[...document.getElementsByTagName("script")],e=t.find(i=>i.hasAttribute("data-shoelace"));if(e)Ai(e.getAttribute("data-shoelace"));else{const i=t.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(r.src));let s="";i&&(s=i.getAttribute("src")),Ai(s.split("/").slice(0,-1).join("/"))}}return co.replace(/\/$/,"")+(o?`/${o.replace(/^\//,"")}`:"")}var tl={name:"default",resolver:o=>Qn(`assets/icons/${o}.svg`)},el=tl,Di={caret:`
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
  `},ol={name:"system",resolver:o=>o in Di?`data:image/svg+xml,${encodeURIComponent(Di[o])}`:""},il=ol,sl=[el,il],ho=[];function rl(o){ho.push(o)}function nl(o){ho=ho.filter(t=>t!==o)}function Mi(o){return sl.find(t=>t.name===o)}var ll=x`
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
`,te=Symbol(),_e=Symbol(),Ye,Ze=new Map,Y=class extends R{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(o,t){var e;let i;if(t!=null&&t.spriteSheet)return this.svg=f`<svg part="svg">
        <use part="use" href="${o}"></use>
      </svg>`,this.svg;try{if(i=await fetch(o,{mode:"cors"}),!i.ok)return i.status===410?te:_e}catch{return _e}try{const s=document.createElement("div");s.innerHTML=await i.text();const r=s.firstElementChild;if(((e=r==null?void 0:r.tagName)==null?void 0:e.toLowerCase())!=="svg")return te;Ye||(Ye=new DOMParser);const l=Ye.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):te}catch{return te}}connectedCallback(){super.connectedCallback(),rl(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),nl(this)}getIconSource(){const o=Mi(this.library);return this.name&&o?{url:o.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var o;const{url:t,fromLibrary:e}=this.getIconSource(),i=e?Mi(this.library):void 0;if(!t){this.svg=null;return}let s=Ze.get(t);if(s||(s=this.resolveIcon(t,i),Ze.set(t,s)),!this.initialRender)return;const r=await s;if(r===_e&&Ze.delete(t),t===this.getIconSource().url){if(vr(r)){if(this.svg=r,i){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n)}return}switch(r){case _e:case te:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),(o=i==null?void 0:i.mutator)==null||o.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};Y.styles=[H,ll];c([Jt()],Y.prototype,"svg",2);c([p({reflect:!0})],Y.prototype,"name",2);c([p()],Y.prototype,"src",2);c([p()],Y.prototype,"label",2);c([p({reflect:!0})],Y.prototype,"library",2);c([P("label")],Y.prototype,"handleLabelChange",1);c([P(["name","src","library"])],Y.prototype,"setIcon",1);var W=class extends R{constructor(){super(...arguments),this.localize=new Tt(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new be(this,"submenu"),this.submenuController=new Yn(this,this.hasSlotController),this.handleHostClick=o=>{this.disabled&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleMouseOver=o=>{this.focus(),o.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const o=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=o;return}o!==this.cachedTextLabel&&(this.cachedTextLabel=o,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return Xn(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const o=this.localize.dir()==="rtl",t=this.submenuController.isExpanded();return f`
      <div
        id="anchor"
        part="base"
        class=${G({"menu-item":!0,"menu-item--rtl":o,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!t}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${o?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?f` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};W.styles=[H,Gn];W.dependencies={"sl-icon":Y,"sl-popup":I,"sl-spinner":Zo};c([z("slot:not([name])")],W.prototype,"defaultSlot",2);c([z(".menu-item")],W.prototype,"menuItem",2);c([p()],W.prototype,"type",2);c([p({type:Boolean,reflect:!0})],W.prototype,"checked",2);c([p()],W.prototype,"value",2);c([p({type:Boolean,reflect:!0})],W.prototype,"loading",2);c([p({type:Boolean,reflect:!0})],W.prototype,"disabled",2);c([P("checked")],W.prototype,"handleCheckedChange",1);c([P("disabled")],W.prototype,"handleDisabledChange",1);c([P("type")],W.prototype,"handleTypeChange",1);W.define("sl-menu-item");var al=x`
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
`,Ve=class extends R{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};Ve.styles=[H,al];c([p({type:Boolean,reflect:!0})],Ve.prototype,"vertical",2);c([P("vertical")],Ve.prototype,"handleVerticalChange",1);Ve.define("sl-divider");class uo extends C{constructor(){super(),this.label="",this.items=[]}_onSelect(t){const e=t.detail.item.value,i=t.detail.item.textContent.trim();this.dispatchEvent(new CustomEvent("ll-menu-select",{bubbles:!0,composed:!0,detail:{action:e,label:i}}))}render(){return f`
      <sl-dropdown @sl-select=${this._onSelect}>
        <button slot="trigger" class="trigger-btn">
          ${this.label}<span class="caret">▾</span>
        </button>
        <sl-menu>
          ${this.items.map(t=>t.type==="divider"?f`<sl-divider></sl-divider>`:f`
                <sl-menu-item
                  value=${t.action??""}
                  ?disabled=${t.disabled??!1}
                >${t.label}</sl-menu-item>
              `)}
        </sl-menu>
      </sl-dropdown>
    `}}w(uo,"styles",x`
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
  `),w(uo,"properties",{label:{type:String},items:{type:Array}});customElements.define("llama-dropdown",uo);var dl=x`
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
`,ws=(o="value")=>(t,e)=>{const i=t.constructor,s=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(r,n,l){var d;const h=i.getPropertyOptions(o),m=typeof h.attribute=="string"?h.attribute:o;if(r===m){const u=h.converter||qt,a=(typeof u=="function"?u:(d=u==null?void 0:u.fromAttribute)!=null?d:qt.fromAttribute)(l,h.type);this[o]!==a&&(this[e]=a)}s.call(this,r,n,l)}},Ss=x`
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
`,ee=new WeakMap,oe=new WeakMap,ie=new WeakMap,Xe=new WeakSet,ye=new WeakMap,Xo=class{constructor(o,t){this.handleFormData=e=>{const i=this.options.disabled(this.host),s=this.options.name(this.host),r=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof s=="string"&&s.length>0&&typeof r<"u"&&(Array.isArray(r)?r.forEach(l=>{e.formData.append(s,l.toString())}):e.formData.append(s,r.toString()))},this.handleFormSubmit=e=>{var i;const s=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=ee.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!s&&!r(this.host)&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),ye.set(this.host,[])},this.handleInteraction=e=>{const i=ye.get(this.host);i.includes(e.type)||i.push(e.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const e=this.form.querySelectorAll("*");for(const i of e)if(typeof i.checkValidity=="function"&&!i.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const e=this.form.querySelectorAll("*");for(const i of e)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=o).addController(this),this.options=Vt({form:e=>{const i=e.form;if(i){const r=e.getRootNode().querySelector(`#${i}`);if(r)return r}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var i;return(i=e.disabled)!=null?i:!1},reportValidity:e=>typeof e.reportValidity=="function"?e.reportValidity():!0,checkValidity:e=>typeof e.checkValidity=="function"?e.checkValidity():!0,setValue:(e,i)=>e.value=i,assumeInteractionOn:["sl-input"]},t)}hostConnected(){const o=this.options.form(this.host);o&&this.attachForm(o),ye.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),ye.delete(this.host),this.options.assumeInteractionOn.forEach(o=>{this.host.removeEventListener(o,this.handleInteraction)})}hostUpdated(){const o=this.options.form(this.host);o||this.detachForm(),o&&this.form!==o&&(this.detachForm(),this.attachForm(o)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(o){o?(this.form=o,ee.has(this.form)?ee.get(this.form).add(this.host):ee.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),oe.has(this.form)||(oe.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),ie.has(this.form)||(ie.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const o=ee.get(this.form);o&&(o.delete(this.host),o.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),oe.has(this.form)&&(this.form.reportValidity=oe.get(this.form),oe.delete(this.form)),ie.has(this.form)&&(this.form.checkValidity=ie.get(this.form),ie.delete(this.form)),this.form=void 0))}setUserInteracted(o,t){t?Xe.add(o):Xe.delete(o),o.requestUpdate()}doAction(o,t){if(this.form){const e=document.createElement("button");e.type=o,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",t&&(e.name=t.name,e.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{t.hasAttribute(i)&&e.setAttribute(i,t.getAttribute(i))})),this.form.append(e),e.click(),e.remove()}}getForm(){var o;return(o=this.form)!=null?o:null}reset(o){this.doAction("reset",o)}submit(o){this.doAction("submit",o)}setValidity(o){const t=this.host,e=!!Xe.has(t),i=!!t.required;t.toggleAttribute("data-required",i),t.toggleAttribute("data-optional",!i),t.toggleAttribute("data-invalid",!o),t.toggleAttribute("data-valid",o),t.toggleAttribute("data-user-invalid",!o&&e),t.toggleAttribute("data-user-valid",o&&e)}updateValidity(){const o=this.host;this.setValidity(o.validity.valid)}emitInvalidEvent(o){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});o||t.preventDefault(),this.host.dispatchEvent(t)||o==null||o.preventDefault()}},Qo=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(De(Vt({},Qo),{valid:!1,valueMissing:!0}));Object.freeze(De(Vt({},Qo),{valid:!1,customError:!0}));/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ks=Fo(class extends Uo{constructor(o){if(super(o),o.type!==kt.PROPERTY&&o.type!==kt.ATTRIBUTE&&o.type!==kt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ts(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[t]){if(t===et||t===D)return t;const e=o.element,i=o.name;if(o.type===kt.PROPERTY){if(t===e[i])return et}else if(o.type===kt.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(i))return et}else if(o.type===kt.ATTRIBUTE&&e.getAttribute(i)===t+"")return et;return gr(o),t}});var U=class extends R{constructor(){super(...arguments),this.formControlController=new Xo(this,{value:o=>o.checked?o.value||"on":void 0,defaultValue:o=>o.defaultChecked,setValue:(o,t)=>o.checked=t}),this.hasSlotController=new be(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(o){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(o)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(o){o.key==="ArrowLeft"&&(o.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),o.key==="ArrowRight"&&(o.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(o){this.input.focus(o)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(o){this.input.setCustomValidity(o),this.formControlController.updateValidity()}render(){const o=this.hasSlotController.test("help-text"),t=this.helpText?!0:!!o;return f`
      <div
        class=${G({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${G({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${$(this.value)}
            .checked=${ks(this.checked)}
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
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};U.styles=[H,Ss,dl];c([z('input[type="checkbox"]')],U.prototype,"input",2);c([Jt()],U.prototype,"hasFocus",2);c([p()],U.prototype,"title",2);c([p()],U.prototype,"name",2);c([p()],U.prototype,"value",2);c([p({reflect:!0})],U.prototype,"size",2);c([p({type:Boolean,reflect:!0})],U.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],U.prototype,"checked",2);c([ws("checked")],U.prototype,"defaultChecked",2);c([p({reflect:!0})],U.prototype,"form",2);c([p({type:Boolean,reflect:!0})],U.prototype,"required",2);c([p({attribute:"help-text"})],U.prototype,"helpText",2);c([P("checked",{waitUntilFirstUpdate:!0})],U.prototype,"handleCheckedChange",1);c([P("disabled",{waitUntilFirstUpdate:!0})],U.prototype,"handleDisabledChange",1);U.define("sl-switch");const cl=[{label:"Video",items:[{label:"Load URL",action:"videoUrl"},{label:"Open video",action:"videoPicker"},{label:"Edit current",action:"editVideo"},{label:"Video info",action:"videoInfo"},{label:"Loop full video",action:"loopVideo"},{label:"Delete video",action:"deleteVideo"},{type:"divider"},{label:"Create chapter divider here",action:"setChapter"},{label:"Open chapter",action:"openChapter"},{label:"Edit chapter",action:"editChapter"},{label:"Loop current chapter",action:"loopChapter"},{label:"Delete chapter",action:"deleteChapter"},{label:"Zoom current chapter",action:"zoomChapter"},{label:"Fix chapter end",action:"fixChapter"}]},{label:"Section",items:[{label:"Set section here",action:"setSection"},{label:"Edit current section",action:"editSection"},{label:"Open section",action:"openSection"},{label:"Loop current section",action:"loopSection"},{label:"Delete section",action:"deleteSection"},{label:"Zoom current section",action:"zoomSection"},{label:"Fix section end",action:"fixSection"},{type:"divider"},{label:"Toggle zone 2 (sections/chapters)",action:"toggleZone2"}]},{label:"Loop",items:[{label:"Loop current section",action:"loopSection"},{label:"Loop current chapter",action:"loopChapter"},{label:"Loop full video",action:"loopVideo"},{type:"divider"},{label:"Open loop",action:"openLoop"},{label:"Save new loop",action:"saveLoop"},{label:"Save back to loop source",action:"saveBack"},{label:"Delete loop",action:"deleteLoop"},{label:"Zoom current loop",action:"zoomLoop"},{type:"divider"},{label:"Edit scratch loop",action:"editScratch"}]},{label:"Mark",items:[{label:"Set mark here",action:"setMark"},{label:"Edit mark",action:"editMark"},{label:"Delete mark",action:"deleteMark"}]},{label:"Jump",items:[{label:"Jump to Chapter",action:"jumpChapter"},{label:"Jump to Section",action:"jumpSection"},{label:"Jump to Loop",action:"jumpLoop"},{label:"Jump to Mark",action:"jumpMark"},{type:"divider"},{label:"Jump history",action:"jumpHistory"},{label:"Jump Back",action:"jumpBack"},{label:"Jump Forward",action:"jumpForward"}]},{label:"App",items:[{label:"Undo",action:"undo"},{label:"Redo",action:"redo"},{type:"divider"},{label:"Share loop URL",action:"shareLoop"},{type:"divider"},{label:"Export current video",action:"shareVideo"},{label:"Export all data",action:"exportAll"},{label:"Import data",action:"importData"},{label:"Inspect JSON",action:"inspectData"},{type:"divider"},{label:"Bulk data delete",action:"deleteData"},{label:"Options",action:"options"}]},{label:"Help",items:[{label:"General help",action:"helpGeneral",disabled:!0},{label:"Key bindings",action:"helpKeys",disabled:!0}]}];class po extends C{constructor(){super(),this.currentTime=0,this.speed=1,this.isPlaying=!1,this.looping=!1,this.loopStart=0,this.loopEnd=0,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.seekDelta=T.seek_delta_default,this.seekDeltaChoices=T.seek_delta_choices,this.loopNudgeDelta=T.loop_nudge_delta_default,this.loopNudgeDeltaChoices=T.loop_nudge_delta_choices,this.editScratchActive=!1,this.editScratchFocus="start",this.editScratchDelta=1,this.activeEntityType="any",this._timeRef=wt(),this._timeFocused=!1,this._startRef=wt(),this._endRef=wt(),this._speedRef=wt(),this._entitySelectRef=wt(),this._seekDeltaRef=wt(),this._nudgeDeltaRef=wt()}_fmt(t){if(t==null)return"?";const e=Math.floor(t/60),i=Math.floor(t%60).toString().padStart(2,"0");return`${e}:${i}`}_fmtDelta(t){return t<60?`${t}s`:`${t/60}m`}_fmtLoop(t){if(t==null)return"?";if(this.editScratchDelta<1){const e=Math.round(t*10)/10,i=Math.floor(e/60),s=e%60;return`${i}:${s.toFixed(1).padStart(4,"0")}`}return this._fmt(t)}_parseTime(t){return ot(t)}_parseSpeed(t){t=t.trim().replace(/%$/,"");const e=parseFloat(t);return isNaN(e)||e<=0?null:e>4?e/100:e}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}firstUpdated(){this._timeRef.value&&(this._timeRef.value.value=this._fmt(this.currentTime)),this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart)),this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd)),this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}%`)}updated(t){t.has("currentTime")&&this._timeRef.value&&!this._timeFocused&&(this._timeRef.value.value=this._fmt(this.currentTime)),(t.has("loopStart")||t.has("editScratchDelta"))&&this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart)),(t.has("loopEnd")||t.has("editScratchDelta"))&&this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd)),t.has("speed")&&this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}%`)}_submitStart(){var e;const t=this._parseTime(((e=this._startRef.value)==null?void 0:e.value)??"");t!==null?this._emit("ll-loop-start-change",{value:t}):this._startRef.value&&(this._startRef.value.value=this._fmtLoop(this.loopStart),this._emit("ll-invalid-time",{}))}_submitEnd(){var e;const t=this._parseTime(((e=this._endRef.value)==null?void 0:e.value)??"");t!==null?this._emit("ll-loop-end-change",{value:t}):this._endRef.value&&(this._endRef.value.value=this._fmtLoop(this.loopEnd),this._emit("ll-invalid-time",{}))}_submitSpeed(){var e;const t=this._parseSpeed(((e=this._speedRef.value)==null?void 0:e.value)??"");t!==null?this._emit("ll-speed-change",{value:t}):this._speedRef.value&&(this._speedRef.value.value=`${(this.speed*100).toFixed(0)}%`)}focusTimeInput(){const t=this._timeRef.value;t&&(t.focus(),t.select())}_onTimeKeyDown(t){var e;if(t.key==="Enter"){const i=this._parseTime(((e=this._timeRef.value)==null?void 0:e.value)??"");i!==null&&this._emit("ll-seek-to",{value:i}),t.target.blur()}else t.key==="Escape"&&t.target.blur()}focusStartInput(){var t,e;(t=this._startRef.value)==null||t.focus(),(e=this._startRef.value)==null||e.select()}focusEndInput(){var t,e;(t=this._endRef.value)==null||t.focus(),(e=this._endRef.value)==null||e.select()}focusEntitySelect(){var t;(t=this._entitySelectRef.value)==null||t.focus()}focusNudgeDeltaSelect(){var t;(t=this._nudgeDeltaRef.value)==null||t.focus()}flash(t,e="timed"){var r;const s=(r={time:this._timeRef,speed:this._speedRef,seekDelta:this._seekDeltaRef,loopStart:this._startRef,loopEnd:this._endRef,nudgeDelta:this._nudgeDeltaRef,entitySelect:this._entitySelectRef}[t])==null?void 0:r.value;if(s)if(this._flashTimers??(this._flashTimers={}),this._flashListeners??(this._flashListeners={}),clearTimeout(this._flashTimers[t]),this._flashListeners[t]&&(s.removeEventListener("blur",this._flashListeners[t]),this._flashListeners[t]=null),s.classList.add("kb-flash"),e==="until-blur"){const n=()=>{s.classList.remove("kb-flash"),this._flashListeners[t]=null};this._flashListeners[t]=n,s.addEventListener("blur",n,{once:!0})}else this._flashTimers[t]=setTimeout(()=>s.classList.remove("kb-flash"),1500)}render(){return f`
      <div class="controls-wrap ${this.editScratchActive?"edit-scratch-active":""}">

        <div class="ctrl-groups">

          <div class="ctrl-group">
            <span class="ctrl-group-label">Play</span>
            <div class="ctrl-group-body">
              <button class="btn-play-pause" @click=${()=>this._emit("ll-play-pause")}>
                ${this.isPlaying?"Pause":"Play"}
              </button>
              <input
                ${St(this._timeRef)}
                class="time-input-play"
                type="text"
                @focus=${()=>{var t;this._timeFocused=!0,(t=this._timeRef.value)==null||t.select()}}
                @blur=${()=>{this._timeFocused=!1,this._timeRef.value&&(this._timeRef.value.value=this._fmt(this.currentTime))}}
                @keydown=${this._onTimeKeyDown}
              />
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Speed</span>
            <div class="ctrl-group-body">
              <input
                ${St(this._speedRef)}
                class="speed-input"
                type="text"
                @keydown=${t=>{t.key==="Enter"&&(this._submitSpeed(),t.target.blur())}}
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
                  ${St(this._seekDeltaRef)}
                  class="delta-select"
                  @change=${t=>{this._emit("ll-seek-delta-change",{value:Number(t.target.value)}),t.target.blur()}}
                >
                  ${this.seekDeltaChoices.map(t=>f`
                    <option value=${t} ?selected=${this.seekDelta===t}>${this._fmtDelta(t)}</option>
                  `)}
                </select>
                <button class="btn-accent" @click=${()=>this._emit("ll-seek-forward")}>▶</button>
              </div>
              <div class="btn-group">
                <button class="btn-accent" @click=${()=>this._emit("ll-prev-entity")}>⏮</button>
                <select
                  ${St(this._entitySelectRef)}
                  class="entity-type-select"
                  @change=${t=>{this._emit("ll-entity-type-change",{value:t.target.value}),t.target.blur()}}
                  @keydown=${t=>{(t.key==="Enter"||t.key==="Escape")&&t.target.blur()}}
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
                  ${St(this._startRef)}
                  class="time-input align-left ${this.editScratchActive&&this.editScratchFocus==="start"?"loop-edit-focus":""} ${this.loopStart>=this.loopEnd?"loop-invalid":""} ${(this.loopSourceType==="section"||this.loopSourceType==="chapter")&&this.currentTime<this.loopSourceStart?"source-outside":""}"
                  type="text"
                  @keydown=${t=>{t.key==="Enter"?(this._submitStart(),t.target.blur()):t.key==="Escape"&&(t.target.value=this._fmtLoop(this.loopStart),t.target.blur())}}
                  @blur=${()=>this._submitStart()}
                />
              </div>
              <select
                ${St(this._nudgeDeltaRef)}
                class="delta-select"
                @change=${t=>{this._emit("ll-loop-nudge-delta-change",{value:Number(t.target.value)}),t.target.blur()}}
                @keydown=${t=>{(t.key==="Enter"||t.key==="Escape")&&t.target.blur()}}
              >
                ${this.loopNudgeDeltaChoices.map(t=>f`
                  <option value=${t} ?selected=${this.loopNudgeDelta===t}>${this._fmtDelta(t)}</option>
                `)}
              </select>
              <div class="btn-group">
                <input
                  ${St(this._endRef)}
                  class="time-input ${this.editScratchActive&&this.editScratchFocus==="end"?"loop-edit-focus":""} ${this.loopStart>=this.loopEnd?"loop-invalid":""} ${(this.loopSourceType==="section"||this.loopSourceType==="chapter")&&this.currentTime>this.loopSourceEnd?"source-outside":""}"
                  type="text"
                  @keydown=${t=>{t.key==="Enter"?(this._submitEnd(),t.target.blur()):t.key==="Escape"&&(t.target.value=this._fmtLoop(this.loopEnd),t.target.blur())}}
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
          ${cl.map(t=>f`
            <llama-dropdown .label=${t.label} .items=${t.items}></llama-dropdown>
          `)}
        </div>

      </div>
    `}}w(po,"styles",x`
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
  `),w(po,"properties",{currentTime:{type:Number},speed:{type:Number},isPlaying:{type:Boolean},looping:{type:Boolean},loopStart:{type:Number},loopEnd:{type:Number},loopSourceType:{type:String},loopSourceStart:{type:Number},loopSourceEnd:{type:Number},seekDelta:{type:Number},seekDeltaChoices:{type:Array},loopNudgeDelta:{type:Number},loopNudgeDeltaChoices:{type:Array},editScratchActive:{type:Boolean},editScratchFocus:{type:String},editScratchDelta:{type:Number},activeEntityType:{type:String}});customElements.define("llama-controls",po);class mo extends C{constructor(){super(),this.videoId=null,this.currentTime=0,this.duration=null,this.sections=[],this.chapters=[],this.zone2Mode="sections",this.marks=[],this.namedLoops=[],this.loopStart=0,this.loopEnd=0,this.scopeStart=null,this.scopeEnd=null,this.zoomed=!1,this._zoneWidth=0,this._ro=null}firstUpdated(){this._ro=new ResizeObserver(t=>{this._zoneWidth=t[0].contentRect.width}),this._ro.observe(this)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._ro)==null||t.disconnect()}_pct(t){const e=this.scopeStart??0,i=this.scopeEnd??this.duration;return!i||i<=e?0:Math.max(0,Math.min(100,(t-e)/(i-e)*100))}_fmt(t){if(t==null)return"?";const e=Math.floor(t/60),i=Math.floor(t%60).toString().padStart(2,"0");return`${e}:${i}`}_computeRegions(t){return t.map((e,i)=>{const s=t[i+1],r=e.end!=null?e.end:s?s.start:this.duration;return{start:e.start,end:r,name:e.name,isCurrent:this.currentTime>=e.start&&this.currentTime<r}})}_renderSections(){const t=this.zone2Mode==="chapters"?this.chapters:this.sections;return t!=null&&t.length?this._computeRegions(t).map((i,s)=>{const r=this._pct(i.start),l=(i.end!=null?this._pct(i.end):100)-r,h=l/100*this._zoneWidth>=i.name.length*7+8,m=`${i.name} (${this._fmt(i.start)})`,u=s%2===0?"section-region--even":"section-region--odd",v=i.isCurrent?"section-region--current":u;return f`
        <div
          class="section-region ${v}"
          style="left: ${r}%; width: ${l}%"
          title="${m}"
          @click=${()=>this._onSectionClick(i)}
        >${h?f`<span class="section-label">${i.name}</span>`:""}</div>
      `}):""}_inScope(t){const e=this.scopeStart??0,i=this.scopeEnd??this.duration;return t>=e&&t<=i}_loopInScope(t){const e=this.scopeStart??0,i=this.scopeEnd??this.duration;return t.end>e&&t.start<i}_packLoops(t){const e=[[],[]];for(const i of[...t].sort((s,r)=>s.start-r.start)){let s=!1;for(const r of e)if(!r.some(n=>i.start<n.end&&i.end>n.start)){r.push(i),s=!0;break}s||e[1].push(i)}return e}_renderMarks(){return(this.marks??[]).filter(t=>this._inScope(t.time)).map(t=>f`
        <div
          class="mark-dot"
          style="left: ${this._pct(t.time)}%"
          title="${t.name}: ${this._fmt(t.time)}"
          @click=${()=>this._onMarkClick(t)}
        ></div>
      `)}_renderLoops(){const t=[];if(this.loopEnd>this.loopStart){const i={_scratch:!0,start:this.loopStart,end:this.loopEnd};if(this._loopInScope(i)){const s=this._pct(i.start),r=this._pct(i.end)-s;t.push(f`
          <div
            class="loop-bar loop-bar--scratch"
            style="left: ${s}%; width: ${r}%; top: 0px"
            title="Loop: ${this._fmt(i.start)} – ${this._fmt(i.end)}"
            @click=${()=>this._onLoopBarClick(i)}
          ></div>
        `)}}return this._packLoops(this.namedLoops??[]).forEach((i,s)=>{const r=(s+1)*7;for(const n of i){if(!this._loopInScope(n))continue;const l=this._pct(n.start),d=this._pct(n.end)-l;t.push(f`
          <div
            class="loop-bar"
            style="left: ${l}%; width: ${d}%; top: ${r}px"
            title="${n.name}: ${this._fmt(n.start)} – ${this._fmt(n.end)}"
            @click=${()=>this._onLoopBarClick(n)}
          ></div>
        `)}}),t}_fireSeekTo(t){this.dispatchEvent(new CustomEvent("ll-seek-to",{bubbles:!0,composed:!0,detail:{time:t}}))}_onSectionClick(t){this._fireSeekTo(t.start)}_onMarkClick(t){this._fireSeekTo(t.time)}_onLoopBarClick(t){t._scratch?this._fireSeekTo(t.start):this.dispatchEvent(new CustomEvent("ll-activate-loop",{bubbles:!0,composed:!0,detail:{id:t.id}}))}_onPlayZoneClick(t){if(!this.duration)return;const e=this.scopeStart??0,i=this.scopeEnd??this.duration,s=t.currentTarget.getBoundingClientRect(),r=(t.clientX-s.left)/s.width,n=Math.max(e,Math.min(i,e+r*(i-e)));this._fireSeekTo(n)}render(){if(!this.duration){const e=this.videoId?"Loading...":"No video loaded";return f`
        <div class="timeline-wrap">
          <div class="no-video">${e}</div>
        </div>
      `}const t=this._pct(this.currentTime);return f`
      <div class="timeline-wrap ${this.zoomed?"zoomed":""}">

        <div class="zone--play" @click=${this._onPlayZoneClick}>
          <div class="play-track">
            <div class="play-fill" style="width: ${t}%"></div>
          </div>
          <div class="play-dot" style="left: ${t}%"></div>
        </div>

        <div class="zone--section mode--${this.zone2Mode}">${this._renderSections()}</div>

        <div class="zone--mark">${this._renderMarks()}</div>

        <div class="zone--loop">${this._renderLoops()}</div>

      </div>
    `}}w(mo,"styles",x`
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
  `),w(mo,"properties",{videoId:{type:String},currentTime:{type:Number},duration:{type:Number},sections:{type:Array},chapters:{type:Array},zone2Mode:{type:String},marks:{type:Array},namedLoops:{type:Array},loopStart:{type:Number},loopEnd:{type:Number},scopeStart:{type:Number},scopeEnd:{type:Number},zoomed:{type:Boolean},_zoneWidth:{type:Number,state:!0}});customElements.define("llama-timeline",mo);var hl=x`
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
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xs=Symbol.for(""),ul=o=>{if((o==null?void 0:o.r)===xs)return o==null?void 0:o._$litStatic$},Te=(o,...t)=>({_$litStatic$:t.reduce((e,i,s)=>e+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+o[s+1],o[0]),r:xs}),zi=new Map,pl=o=>(t,...e)=>{const i=e.length;let s,r;const n=[],l=[];let d,h=0,m=!1;for(;h<i;){for(d=t[h];h<i&&(r=e[h],(s=ul(r))!==void 0);)d+=s+t[++h],m=!0;h!==i&&l.push(r),n.push(d),h++}if(h===i&&n.push(t[i]),m){const u=n.join("$$lit$$");(t=zi.get(u))===void 0&&(n.raw=n,zi.set(u,t=n)),e=l}return o(t,...e)},xe=pl(f);var L=class extends R{constructor(){super(...arguments),this.formControlController=new Xo(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new be(this,"[default]","prefix","suffix"),this.localize=new Tt(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Qo}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(o){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(o)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(o){this.button.focus(o)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(o){this.isButton()&&(this.button.setCustomValidity(o),this.formControlController.updateValidity())}render(){const o=this.isLink(),t=o?Te`a`:Te`button`;return xe`
      <${t}
        part="base"
        class=${G({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${$(o?void 0:this.disabled)}
        type=${$(o?void 0:this.type)}
        title=${this.title}
        name=${$(o?void 0:this.name)}
        value=${$(o?void 0:this.value)}
        href=${$(o&&!this.disabled?this.href:void 0)}
        target=${$(o?this.target:void 0)}
        download=${$(o?this.download:void 0)}
        rel=${$(o?this.rel:void 0)}
        role=${$(o?void 0:"button")}
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
        ${this.caret?xe` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?xe`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${t}>
    `}};L.styles=[H,hl];L.dependencies={"sl-icon":Y,"sl-spinner":Zo};c([z(".button")],L.prototype,"button",2);c([Jt()],L.prototype,"hasFocus",2);c([Jt()],L.prototype,"invalid",2);c([p()],L.prototype,"title",2);c([p({reflect:!0})],L.prototype,"variant",2);c([p({reflect:!0})],L.prototype,"size",2);c([p({type:Boolean,reflect:!0})],L.prototype,"caret",2);c([p({type:Boolean,reflect:!0})],L.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],L.prototype,"loading",2);c([p({type:Boolean,reflect:!0})],L.prototype,"outline",2);c([p({type:Boolean,reflect:!0})],L.prototype,"pill",2);c([p({type:Boolean,reflect:!0})],L.prototype,"circle",2);c([p()],L.prototype,"type",2);c([p()],L.prototype,"name",2);c([p()],L.prototype,"value",2);c([p()],L.prototype,"href",2);c([p()],L.prototype,"target",2);c([p()],L.prototype,"rel",2);c([p()],L.prototype,"download",2);c([p()],L.prototype,"form",2);c([p({attribute:"formaction"})],L.prototype,"formAction",2);c([p({attribute:"formenctype"})],L.prototype,"formEnctype",2);c([p({attribute:"formmethod"})],L.prototype,"formMethod",2);c([p({attribute:"formnovalidate",type:Boolean})],L.prototype,"formNoValidate",2);c([p({attribute:"formtarget"})],L.prototype,"formTarget",2);c([P("disabled",{waitUntilFirstUpdate:!0})],L.prototype,"handleDisabledChange",1);L.define("sl-button");var ml=x`
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
`,k=class extends R{constructor(){super(...arguments),this.formControlController=new Xo(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new be(this,"help-text","label"),this.localize=new Tt(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var o;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((o=this.input)==null?void 0:o.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(o){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=o,this.value=this.__dateInput.value}get valueAsNumber(){var o;return this.__numberInput.value=this.value,((o=this.input)==null?void 0:o.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(o){this.__numberInput.valueAsNumber=o,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(o){o.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(o){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(o)}handleKeyDown(o){const t=o.metaKey||o.ctrlKey||o.shiftKey||o.altKey;o.key==="Enter"&&!t&&setTimeout(()=>{!o.defaultPrevented&&!o.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(o){this.input.focus(o)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(o,t,e="none"){this.input.setSelectionRange(o,t,e)}setRangeText(o,t,e,i="preserve"){const s=t??this.input.selectionStart,r=e??this.input.selectionEnd;this.input.setRangeText(o,s,r,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(o){this.input.setCustomValidity(o),this.formControlController.updateValidity()}render(){const o=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),e=this.label?!0:!!o,i=this.helpText?!0:!!t,r=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return f`
      <div
        part="form-control"
        class=${G({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":e,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${e?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${G({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
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
              name=${$(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${$(this.placeholder)}
              minlength=${$(this.minlength)}
              maxlength=${$(this.maxlength)}
              min=${$(this.min)}
              max=${$(this.max)}
              step=${$(this.step)}
              .value=${ks(this.value)}
              autocapitalize=${$(this.autocapitalize)}
              autocomplete=${$(this.autocomplete)}
              autocorrect=${$(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${$(this.pattern)}
              enterkeyhint=${$(this.enterkeyhint)}
              inputmode=${$(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${r?f`
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
            ${this.passwordToggle&&!this.disabled?f`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?f`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:f`
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
    `}};k.styles=[H,Ss,ml];k.dependencies={"sl-icon":Y};c([z(".input__control")],k.prototype,"input",2);c([Jt()],k.prototype,"hasFocus",2);c([p()],k.prototype,"title",2);c([p({reflect:!0})],k.prototype,"type",2);c([p()],k.prototype,"name",2);c([p()],k.prototype,"value",2);c([ws()],k.prototype,"defaultValue",2);c([p({reflect:!0})],k.prototype,"size",2);c([p({type:Boolean,reflect:!0})],k.prototype,"filled",2);c([p({type:Boolean,reflect:!0})],k.prototype,"pill",2);c([p()],k.prototype,"label",2);c([p({attribute:"help-text"})],k.prototype,"helpText",2);c([p({type:Boolean})],k.prototype,"clearable",2);c([p({type:Boolean,reflect:!0})],k.prototype,"disabled",2);c([p()],k.prototype,"placeholder",2);c([p({type:Boolean,reflect:!0})],k.prototype,"readonly",2);c([p({attribute:"password-toggle",type:Boolean})],k.prototype,"passwordToggle",2);c([p({attribute:"password-visible",type:Boolean})],k.prototype,"passwordVisible",2);c([p({attribute:"no-spin-buttons",type:Boolean})],k.prototype,"noSpinButtons",2);c([p({reflect:!0})],k.prototype,"form",2);c([p({type:Boolean,reflect:!0})],k.prototype,"required",2);c([p()],k.prototype,"pattern",2);c([p({type:Number})],k.prototype,"minlength",2);c([p({type:Number})],k.prototype,"maxlength",2);c([p()],k.prototype,"min",2);c([p()],k.prototype,"max",2);c([p()],k.prototype,"step",2);c([p()],k.prototype,"autocapitalize",2);c([p()],k.prototype,"autocorrect",2);c([p()],k.prototype,"autocomplete",2);c([p({type:Boolean})],k.prototype,"autofocus",2);c([p()],k.prototype,"enterkeyhint",2);c([p({type:Boolean,converter:{fromAttribute:o=>!(!o||o==="false"),toAttribute:o=>o?"true":"false"}})],k.prototype,"spellcheck",2);c([p()],k.prototype,"inputmode",2);c([P("disabled",{waitUntilFirstUpdate:!0})],k.prototype,"handleDisabledChange",1);c([P("step",{waitUntilFirstUpdate:!0})],k.prototype,"handleStepChange",1);c([P("value",{waitUntilFirstUpdate:!0})],k.prototype,"handleValueChange",1);k.define("sl-input");var se=[],fl=class{constructor(o){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var e;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=ss();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const s=so(this.element);let r=s.findIndex(l=>l===i);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){r+n>=s.length?r=0:r+n<0?r=s.length-1:r+=n,this.previousFocus=this.currentFocus;const l=s[r];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;t.preventDefault(),this.currentFocus=l,(e=this.currentFocus)==null||e.focus({preventScroll:!1});const d=[...Bo()];if(d.includes(this.currentFocus)||!d.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=o,this.elementsWithTabbableControls=["iframe"]}activate(){se.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){se=se.filter(o=>o!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return se[se.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const o=so(this.element);if(!this.element.matches(":focus-within")){const t=o[0],e=o[o.length-1],i=this.tabDirection==="forward"?t:e;typeof(i==null?void 0:i.focus)=="function"&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(o){return this.elementsWithTabbableControls.includes(o.tagName.toLowerCase())||o.hasAttribute("controls")}},fo=new Set;function vl(){const o=document.documentElement.clientWidth;return Math.abs(window.innerWidth-o)}function bl(){const o=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(o)||!o?0:o}function Ri(o){if(fo.add(o),!document.documentElement.classList.contains("sl-scroll-lock")){const t=vl()+bl();let e=getComputedStyle(document.documentElement).scrollbarGutter;(!e||e==="auto")&&(e="stable"),t<2&&(e=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",e),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function Pi(o){fo.delete(o),fo.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var gl=x`
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
`,_l=o=>{var t;const{activeElement:e}=document;e&&o.contains(e)&&((t=document.activeElement)==null||t.blur())},yl=x`
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
`,K=class extends R{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(o){this.disabled&&(o.preventDefault(),o.stopPropagation())}click(){this.button.click()}focus(o){this.button.focus(o)}blur(){this.button.blur()}render(){const o=!!this.href,t=o?Te`a`:Te`button`;return xe`
      <${t}
        part="base"
        class=${G({"icon-button":!0,"icon-button--disabled":!o&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${$(o?void 0:this.disabled)}
        type=${$(o?void 0:"button")}
        href=${$(o?this.href:void 0)}
        target=${$(o?this.target:void 0)}
        download=${$(o?this.download:void 0)}
        rel=${$(o&&this.target?"noreferrer noopener":void 0)}
        role=${$(o?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${$(this.name)}
          library=${$(this.library)}
          src=${$(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};K.styles=[H,yl];K.dependencies={"sl-icon":Y};c([z(".icon-button")],K.prototype,"button",2);c([Jt()],K.prototype,"hasFocus",2);c([p()],K.prototype,"name",2);c([p()],K.prototype,"library",2);c([p()],K.prototype,"src",2);c([p()],K.prototype,"href",2);c([p()],K.prototype,"target",2);c([p()],K.prototype,"download",2);c([p()],K.prototype,"label",2);c([p({type:Boolean,reflect:!0})],K.prototype,"disabled",2);var ct=class extends R{constructor(){super(...arguments),this.hasSlotController=new be(this,"footer"),this.localize=new Tt(this),this.modal=new fl(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=o=>{o.key==="Escape"&&this.modal.isActive()&&this.open&&(o.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Ri(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),Pi(this),this.removeOpenListeners()}requestClose(o){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:o}}).defaultPrevented){const e=mt(this,"dialog.denyClose",{dir:this.localize.dir()});ft(this.panel,e.keyframes,e.options);return}this.hide()}addOpenListeners(){var o;"CloseWatcher"in window?((o=this.closeWatcher)==null||o.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var o;(o=this.closeWatcher)==null||o.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Ri(this);const o=this.querySelector("[autofocus]");o&&o.removeAttribute("autofocus"),await Promise.all([$t(this.dialog),$t(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(o?o.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),o&&o.setAttribute("autofocus","")});const t=mt(this,"dialog.show",{dir:this.localize.dir()}),e=mt(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([ft(this.panel,t.keyframes,t.options),ft(this.overlay,e.keyframes,e.options)]),this.emit("sl-after-show")}else{_l(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([$t(this.dialog),$t(this.overlay)]);const o=mt(this,"dialog.hide",{dir:this.localize.dir()}),t=mt(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([ft(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),ft(this.panel,o.keyframes,o.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Pi(this);const e=this.originalTrigger;typeof(e==null?void 0:e.focus)=="function"&&setTimeout(()=>e.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Kt(this,"sl-after-hide")}render(){return f`
      <div
        part="base"
        class=${G({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${$(this.noHeader?this.label:void 0)}
          aria-labelledby=${$(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":f`
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
    `}};ct.styles=[H,gl];ct.dependencies={"sl-icon-button":K};c([z(".dialog")],ct.prototype,"dialog",2);c([z(".dialog__panel")],ct.prototype,"panel",2);c([z(".dialog__overlay")],ct.prototype,"overlay",2);c([p({type:Boolean,reflect:!0})],ct.prototype,"open",2);c([p({reflect:!0})],ct.prototype,"label",2);c([p({attribute:"no-header",type:Boolean,reflect:!0})],ct.prototype,"noHeader",2);c([P("open",{waitUntilFirstUpdate:!0})],ct.prototype,"handleOpenChange",1);bt("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});bt("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});bt("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});bt("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});bt("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});ct.define("sl-dialog");class $s extends C{_emit(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0}))}_onShow(){this._emit("ll-modal-open")}_onAfterHide(){this._emit("ll-modal-close")}_onInitialFocus(t){t.preventDefault(),this._emit("ll-modal-initial-focus")}render(){return f`
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
    `}show(){var t;(t=this.renderRoot.querySelector("sl-dialog"))==null||t.show()}hide(){var t;(t=this.renderRoot.querySelector("sl-dialog"))==null||t.hide()}}w($s,"properties",{label:{type:String},width:{type:String}});customElements.define("llama-modal",$s);class vo extends C{constructor(){super(),this._value=""}show(){var t;this._value="",(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onInput(t){this._value=t.target.value}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._submit())}_submit(){const t=this._value.trim();t&&(this.dispatchEvent(new CustomEvent("ll-load-url",{detail:{url:t},bubbles:!0,composed:!0})),this.hide())}render(){return f`
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
    `}}w(vo,"styles",x`
    .url-hint {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-neutral-400);
    }
  `),w(vo,"properties",{_value:{state:!0}});customElements.define("llama-url-input-modal",vo);class bo extends C{constructor(){super(),this.videos=[],this.currentVideoId=null,this.mode="switch",this._filter="",this._selIdx=0}show(t){var e;this.mode=t||"switch",this._filter="",this._selIdx=0,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t,e;(t=this.renderRoot.querySelector(".video-list"))==null||t.scrollTo(0,0),(e=this.renderRoot.querySelector("sl-input"))==null||e.focus()}_onFilterKeyDown(t){const e=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,e.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const i=e[this._selIdx]??e[0];i&&this._select(i)}}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".video-list"),e=t==null?void 0:t.querySelector(".video-row.selected");e==null||e.scrollIntoView({block:"nearest"})})}_select(t){this.mode==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-video",{detail:{id:t.id},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-pick-video",{detail:{videoId:t.id},bubbles:!0,composed:!0})),this.hide()}_sorted(){const t=this.currentVideoId;return[...this.videos].sort((e,i)=>{if(e.id===t)return-1;if(i.id===t)return 1;const s=e.name,r=i.name;return s&&!r?-1:!s&&r?1:s&&r?s.toLowerCase().localeCompare(r.toLowerCase()):0})}_filtered(){const t=this._filter.trim().toLowerCase(),e=this._sorted();return t?e.filter(i=>(i.name||"").toLowerCase().includes(t)||i.id.toLowerCase().includes(t)):e}_primaryLabel(t){return t.name||t.id}_subLabel(t){return t.id}render(){const t=this._filtered(),e=this.mode==="delete";return f`
      <llama-modal label=${e?"Delete Video":"Open Video"} @ll-modal-initial-focus=${this._onInitialFocus}>
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
          ${t.length?t.map((s,r)=>f`
                <div
                  class="video-row
                    ${e?"mode-delete":""}
                    ${s.id===this.currentVideoId?"current":""}
                    ${r===this._selIdx?"selected":""}"
                  @click=${()=>this._select(s)}
                >
                  <div class="video-primary">${this._primaryLabel(s)}</div>
                  <div class="video-sub">${this._subLabel(s)}</div>
                </div>
              `):f`<div class="empty">No videos match.</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}w(bo,"styles",x`
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
  `),w(bo,"properties",{videos:{type:Array},currentVideoId:{type:String},mode:{type:String},_filter:{state:!0},_selIdx:{state:!0}});customElements.define("llama-video-picker",bo);class go extends C{constructor(){super(),this.video=null,this._name="",this._url="",this._start="",this._end=""}show(){var e;const t=this.video;t&&(this._name=t.name||"",this._url=t.url||"",this._start=t.start>0?Ni(t.start):"",this._end=t.end!=null?Ni(t.end):""),(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||t.focus()}_save(){if(!this.video)return;const t=ot(this._start)??0,e=this._end.trim()?ot(this._end)??null:null;this.dispatchEvent(new CustomEvent("ll-update-video",{detail:{id:this.video.id,name:this._name.trim(),url:this._url.trim(),start:t,end:e},bubbles:!0,composed:!0})),this.hide()}_delete(){this.video&&(this.dispatchEvent(new CustomEvent("ll-delete-video",{detail:{id:this.video.id},bubbles:!0,composed:!0})),this.hide())}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}_renderField(t,e,i,s,r){return f`
      <div class="field-row">
        <span class="field-label">${t}</span>
        <sl-input
          data-field=${e}
          placeholder=${s}
          .value=${i}
          @sl-input=${r}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `}render(){var t;return f`
      <llama-modal label="Edit Video" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField("Name","name",this._name,'Short label (e.g. "Autumn Leaves")',e=>{this._name=e.target.value})}
        ${this._renderField("URL","url",this._url,"YouTube URL or video ID",e=>{this._url=e.target.value})}
        ${this._renderField("Start","start",this._start,"0 or m:ss — effective start offset",e=>{this._start=e.target.value})}
        ${this._renderField("End","end",this._end,"m:ss or blank (use video duration)",e=>{this._end=e.target.value})}
        <div class="field-row">
          <span class="field-label">Video ID (read-only)</span>
          <div class="video-id">${((t=this.video)==null?void 0:t.id)??""}</div>
        </div>
        <div class="delete-row">
          <sl-button variant="danger" @click=${this._delete}>Delete Video</sl-button>
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}w(go,"styles",x`
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
  `),w(go,"properties",{video:{type:Object},_name:{state:!0},_url:{state:!0},_start:{state:!0},_end:{state:!0}});function Ni(o){if(o==null||isNaN(o))return"";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-edit-video-modal",go);class _o extends C{constructor(){super(),this.loopStart=0,this.loopEnd=0,this._name="",this._start="",this._end="",this._error=""}show(){var t;this._name="",this._start=Vi(this.loopStart),this._end=Vi(this.loopEnd),this._error="",(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||t.focus()}_save(){const t=ot(this._start),e=ot(this._end);if(t===null||e===null){this._error="Start and end are required.";return}if(e<=t){this._error="End must be after start.";return}this._error="",this.dispatchEvent(new CustomEvent("ll-save-loop",{detail:{name:this._name.trim(),start:t,end:e},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}_renderField(t,e,i,s,r){return f`
      <div class="field-row">
        <span class="field-label">${t}</span>
        <sl-input
          data-field=${e}
          placeholder=${s}
          .value=${i}
          @sl-input=${r}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `}render(){return f`
      <llama-modal label="Save Loop" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField("Name (optional)","name",this._name,'Short label (e.g. "outro lick")',t=>{this._name=t.target.value})}
        ${this._renderField("Start","start",this._start,"m:ss",t=>{this._start=t.target.value})}
        ${this._renderField("End","end",this._end,"m:ss",t=>{this._end=t.target.value})}
        ${this._error?f`<div class="error">${this._error}</div>`:""}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}w(_o,"styles",x`
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
  `),w(_o,"properties",{loopStart:{type:Number},loopEnd:{type:Number},_name:{state:!0},_start:{state:!0},_end:{state:!0},_error:{state:!0}});function Vi(o){if(o==null||isNaN(o))return"";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-save-loop-modal",_o);const wl={jump:"Jump to Loop",load:"Load Loop",delete:"Delete Loop"};class yo extends C{constructor(){super(),this.namedLoops=[],this.loopSource=null,this.mode="load",this._filter="",this._selIdx=0}show(t){var e;t&&(this.mode=t),this._filter="",this._selIdx=0,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterKeyDown(t){const e=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,e.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const i=e[this._selIdx]??e[0];i&&this._select(i)}}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".loop-list"),e=t==null?void 0:t.querySelector(".loop-row.selected");e==null||e.scrollIntoView({block:"nearest"})})}_select(t){const e=this.mode;e==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-loop",{detail:{id:t.id,start:t.start},bubbles:!0,composed:!0})):e==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-loop",{detail:{id:t.id},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-load-loop",{detail:{id:t.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const t=this._filter.trim().toLowerCase();return t?this.namedLoops.filter(e=>(e.name||"").toLowerCase().includes(t)):this.namedLoops}_displayLabel(t){return t.name?t.name:`#${this.namedLoops.indexOf(t)+1}`}_subLabel(t){return`${Oi(t.start)} – ${Oi(t.end)}`}render(){const t=this._filtered(),e=wl[this.mode]??"Select Loop",i=this.mode==="delete";return f`
      <llama-modal label=${e} @ll-modal-initial-focus=${this._onInitialFocus}>
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
          ${t.length?t.map((s,r)=>f`
                <div
                  class="loop-row
                    ${i?"mode-delete":""}
                    ${s.id===this.loopSource?"active":""}
                    ${r===this._selIdx?"selected":""}"
                  @click=${()=>this._select(s)}
                >
                  <div class="loop-primary">${this._displayLabel(s)}</div>
                  <div class="loop-sub">${this._subLabel(s)}</div>
                </div>
              `):f`<div class="empty">No loops${this._filter?" match.":" saved."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}w(yo,"styles",x`
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
  `),w(yo,"properties",{namedLoops:{type:Array},loopSource:{type:String},mode:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function Oi(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-loop-picker",yo);const Sl={jump:"Jump to Mark",edit:"Edit Mark",delete:"Delete Mark"};class wo extends C{constructor(){super(),this.marks=[],this.mode="jump",this._filter="",this._selIdx=0}show(t){var e;t&&(this.mode=t),this._filter="",this._selIdx=0,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_onFilterKeyDown(t){const e=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,e.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const i=e[this._selIdx]??e[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".mark-list"),e=t==null?void 0:t.querySelector(".mark-row.selected");e==null||e.scrollIntoView({block:"nearest"})})}_select(t){const e=this.mode;e==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-mark",{detail:{id:t.id,time:t.time},bubbles:!0,composed:!0})):e==="edit"?this.dispatchEvent(new CustomEvent("ll-pick-mark-edit",{detail:{id:t.id},bubbles:!0,composed:!0})):e==="delete"&&this.dispatchEvent(new CustomEvent("ll-delete-mark",{detail:{id:t.id},bubbles:!0,composed:!0})),this.hide()}_filtered(){const t=this._filter.trim().toLowerCase();return t?this.marks.filter(e=>(e.name||"").toLowerCase().includes(t)||Fi(e.time).includes(t)):this.marks}render(){const t=this._filtered(),e=Sl[this.mode]??"Select Mark",i=this.mode==="delete";return f`
      <llama-modal label=${e} @ll-modal-initial-focus=${this._onInitialFocus}>
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
          ${t.length?t.map((s,r)=>f`
                <div
                  class="mark-row ${i?"mode-delete":""} ${r===this._selIdx?"selected":""}"
                  @click=${()=>this._select(s)}
                >
                  <div class="mark-primary">${Fi(s.time)}</div>
                  ${s.name?f`<div class="mark-sub">${s.name}</div>`:""}
                </div>
              `):f`<div class="empty">No marks${this._filter?" match.":" set."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}w(wo,"styles",x`
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
  `),w(wo,"properties",{marks:{type:Array},mode:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function Fi(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-marks-picker",wo);class So extends C{constructor(){super(),this.mark=null,this._name="",this._time=""}show(t){var i;const e=t??this.mark;e&&(this.mark=e,this._name=e.name||"",this._time=kl(e.time)),(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||t.focus()}_save(){if(!this.mark)return;const t=ot(this._time);t!==null&&(this.dispatchEvent(new CustomEvent("ll-update-mark",{detail:{id:this.mark.id,name:this._name.trim(),time:t},bubbles:!0,composed:!0})),this.hide())}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}render(){return f`
      <llama-modal label="Edit Mark" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input
            data-field="name"
            placeholder="Optional label (e.g. "Bridge start")"
            .value=${this._name}
            @sl-input=${t=>{this._name=t.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Time (m:ss)</span>
          <sl-input
            data-field="time"
            placeholder="e.g. 1:23"
            .value=${this._time}
            @sl-input=${t=>{this._time=t.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}w(So,"styles",x`
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
  `),w(So,"properties",{mark:{type:Object},_name:{state:!0},_time:{state:!0}});function kl(o){if(o==null||isNaN(o))return"";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-edit-mark-modal",So);const xl={jump:"Jump to Section",edit:"Edit Section",delete:"Delete Section",open:"Open Section"};class ko extends C{constructor(){super(),this.sections=[],this.mode="jump",this.activeSectionId=null,this._filter="",this._selIdx=0}show(t){var e;t&&(this.mode=t),this._filter="",this._selIdx=0,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_onFilterKeyDown(t){const e=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,e.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const i=e[this._selIdx]??e[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".section-list"),e=t==null?void 0:t.querySelector(".section-row.selected");e==null||e.scrollIntoView({block:"nearest"})})}_select(t){const e=this.mode;e==="jump"?this.dispatchEvent(new CustomEvent("ll-jump-section",{detail:{id:t.id,start:t.start},bubbles:!0,composed:!0})):e==="edit"?this.dispatchEvent(new CustomEvent("ll-pick-section-edit",{detail:{id:t.id},bubbles:!0,composed:!0})):e==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-section",{detail:{id:t.id},bubbles:!0,composed:!0})):e==="open"&&this.dispatchEvent(new CustomEvent("ll-open-section",{detail:{id:t.id,start:t.start},bubbles:!0,composed:!0})),this.hide()}_filtered(){const t=this._filter.trim().toLowerCase();return t?this.sections.filter(e=>(e.name||"").toLowerCase().includes(t)||Qe(e.start).includes(t)):this.sections}render(){const t=this._filtered(),e=xl[this.mode]??"Select Section",i=this.mode==="delete";return f`
      <llama-modal label=${e} @ll-modal-initial-focus=${this._onInitialFocus}>
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
          ${t.length?t.map((s,r)=>f`
                <div
                  class="section-row
                    ${i?"mode-delete":""}
                    ${s.id===this.activeSectionId?"active":""}
                    ${r===this._selIdx?"selected":""}"
                  @click=${()=>this._select(s)}
                >
                  <div class="section-primary">${s.name||Qe(s.start)}</div>
                  ${s.name?f`<div class="section-sub">${Qe(s.start)}</div>`:""}
                </div>
              `):f`<div class="empty">No sections${this._filter?" match.":" set."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}w(ko,"styles",x`
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
  `),w(ko,"properties",{sections:{type:Array},mode:{type:String},activeSectionId:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function Qe(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-sections-picker",ko);class xo extends C{constructor(){super(),this.section=null,this._name="",this._time="",this._end="",this._derivedEnd=null,this._error=""}show(t,e=null){var s;const i=t??this.section;i&&(this.section=i,this._name=i.name||"",this._time=to(i.start),this._end=to(i.end),this._derivedEnd=e,this._error=""),(s=this.renderRoot.querySelector("llama-modal"))==null||s.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||t.focus()}_save(){if(!this.section)return;const t=ot(this._time);if(t===null){this._error="Invalid start time.";return}let e=null;if(this._end.trim()){if(e=ot(this._end),e===null){this._error="Invalid end time.";return}if(e<=t){this._error="End must be after start.";return}}this._error="",this.dispatchEvent(new CustomEvent("ll-update-section",{detail:{id:this.section.id,name:this._name.trim(),start:t,end:e},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}render(){const t=this._derivedEnd!=null?`${to(this._derivedEnd)} (derived — leave blank to keep open-ended)`:"Leave blank to derive from next section";return f`
      <llama-modal label="Edit Section" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input
            data-field="name"
            placeholder="Optional label (e.g. &quot;Verse&quot;, &quot;Solo&quot;)"
            .value=${this._name}
            @sl-input=${e=>{this._name=e.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Start (m:ss)</span>
          <sl-input
            data-field="time"
            placeholder="e.g. 1:23"
            .value=${this._time}
            @sl-input=${e=>{this._time=e.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End (m:ss) — optional</span>
          <sl-input
            data-field="end"
            placeholder=${t}
            .value=${this._end}
            @sl-input=${e=>{this._end=e.target.value}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        ${this._error?f`<div class="error">${this._error}</div>`:""}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}w(xo,"styles",x`
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
  `),w(xo,"properties",{section:{type:Object},_name:{state:!0},_time:{state:!0},_end:{state:!0},_derivedEnd:{state:!0},_error:{state:!0}});function to(o){if(o==null||isNaN(o))return"";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-edit-section-modal",xo);class $o extends C{constructor(){super(),this._value="",this._hasError=!1}show(){var t;this._value="",this._hasError=!1,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onInput(t){this._value=t.target.value,this._hasError=!1}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._submit())}_submit(){const t=ot(this._value);if(t===null){this._hasError=!0;return}this.dispatchEvent(new CustomEvent("ll-jump-time",{detail:{time:t},bubbles:!0,composed:!0})),this.hide()}render(){return f`
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
        ${this._hasError?f`<p class="time-error">Invalid time — use m:ss or raw seconds.</p>`:f`<p class="time-hint">Enter m:ss (e.g. 1:23) or raw seconds (e.g. 83).</p>`}

        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._submit}>Go</sl-button>
        </div>
      </llama-modal>
    `}}w($o,"styles",x`
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
  `),w($o,"properties",{_value:{state:!0},_hasError:{state:!0}});customElements.define("llama-jump-time-modal",$o);const $l={open:"Open Chapter",delete:"Delete Chapter",jump:"Jump to Chapter"};class Eo extends C{constructor(){super(),this.chapters=[],this.mode="open",this.activeChapterId=null,this._filter="",this._selIdx=0}show(t){var e;t&&(this.mode=t),this._filter="",this._selIdx=0,(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_onFilterKeyDown(t){const e=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,e.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const i=e[this._selIdx]??e[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".chapter-list"),e=t==null?void 0:t.querySelector(".chapter-row.selected");e==null||e.scrollIntoView({block:"nearest"})})}_select(t){const e=this.mode;e==="open"?this.dispatchEvent(new CustomEvent("ll-open-chapter",{detail:{id:t.id},bubbles:!0,composed:!0})):e==="delete"?this.dispatchEvent(new CustomEvent("ll-delete-chapter",{detail:{id:t.id},bubbles:!0,composed:!0})):e==="jump"&&this.dispatchEvent(new CustomEvent("ll-jump-chapter",{detail:{id:t.id,time:t.start},bubbles:!0,composed:!0})),this.hide()}_filtered(){const t=this._filter.trim().toLowerCase();return t?this.chapters.filter(e=>(e.name||"").toLowerCase().includes(t)||eo(e.start,e.end).includes(t)):this.chapters}render(){const t=this._filtered(),e=$l[this.mode]??"Select Chapter",i=this.mode==="delete";return f`
      <llama-modal label=${e} @ll-modal-initial-focus=${this._onInitialFocus}>
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
          ${t.length?t.map((s,r)=>f`
                <div
                  class="chapter-row
                    ${i?"mode-delete":""}
                    ${r===this._selIdx?"selected":""}
                    ${s.id===this.activeChapterId?"active-chapter":""}"
                  @click=${()=>this._select(s)}
                >
                  <div class="chapter-primary">${s.name||eo(s.start,s.end)}</div>
                  ${s.name?f`<div class="chapter-sub">${eo(s.start,s.end)}</div>`:""}
                </div>
              `):f`<div class="empty">No chapters${this._filter?" match.":" set."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}w(Eo,"styles",x`
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
  `),w(Eo,"properties",{chapters:{type:Array},mode:{type:String},activeChapterId:{type:String},_filter:{state:!0},_selIdx:{state:!0}});function Ui(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function eo(o,t){return`${Ui(o)} → ${Ui(t)}`}customElements.define("llama-chapter-picker",Eo);class Co extends C{constructor(){super(),this._mode="create",this._id=null,this._name="",this._start="",this._end="",this._derivedEnd=null,this._error=""}showCreate(t,e){var i;this._mode="create",this._id=null,this._name="",this._start=re(t),this._end=re(e),this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}showEdit(t,e=null){var i;this._mode="edit",this._id=t.id,this._name=t.name||"",this._start=re(t.start),this._end=re(t.end),this._derivedEnd=e,this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="name"]'))==null||t.focus()}_save(){const t=ot(this._start);if(t===null){this._error="Start is required.";return}let e=null;if(this._end.trim()){if(e=ot(this._end),e===null){this._error="Invalid end time.";return}if(e<=t){this._error="End must be after start.";return}}this._error="",this._mode==="create"?this.dispatchEvent(new CustomEvent("ll-create-chapter",{detail:{name:this._name.trim(),start:t,end:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("ll-update-chapter",{detail:{id:this._id,name:this._name.trim(),start:t,end:e},bubbles:!0,composed:!0})),this.hide()}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}_renderField(t,e,i,s,r){return f`
      <div class="field-row">
        <span class="field-label">${t}</span>
        <sl-input
          data-field=${e}
          placeholder=${s}
          .value=${i}
          @sl-input=${r}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `}render(){const t=this._mode==="create"?"Create Chapter":"Edit Chapter",e=this._mode==="edit"&&this._derivedEnd!=null?`${re(this._derivedEnd)} (derived — leave blank to keep open-ended)`:"Leave blank to derive from next chapter";return f`
      <llama-modal label=${t} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField("Name (optional)","name",this._name,'e.g. "Verse", "Bridge"',i=>{this._name=i.target.value})}
        ${this._renderField("Start","start",this._start,"m:ss",i=>{this._start=i.target.value})}
        ${this._renderField("End — optional","end",this._end,e,i=>{this._end=i.target.value})}
        ${this._error?f`<div class="error">${this._error}</div>`:""}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}w(Co,"styles",x`
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
  `),w(Co,"properties",{_mode:{state:!0},_id:{state:!0},_name:{state:!0},_start:{state:!0},_end:{state:!0},_derivedEnd:{state:!0},_error:{state:!0}});function re(o){if(o==null||isNaN(o))return"";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-edit-chapter-modal",Co);class Lo extends C{constructor(){super(),this.videoName="",this.videoId=null,this.chapterName=null,this.sectionName=null,this.loopName=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null,this.zoomLabel=null}_fmtDuration(t){const e=Math.floor(t/60),i=Math.floor(t%60).toString().padStart(2,"0");return`${e}:${i}`}_row(t,e){return f`
      <div class="current-row">
        <div class="row-label">${t}</div>
        <div class="row-value ${!e?"dim":""}">${e||"—"}</div>
      </div>
    `}render(){const t=this.loopSourceType?this.loopSourceType[0].toUpperCase()+this.loopSourceType.slice(1):null,i=(this.loopSourceType==="section"||this.loopSourceType==="chapter")&&this.loopSourceStart!=null&&this.loopSourceEnd!=null?`${this.loopSourceLabel||"—"}  [${this._fmtDuration(this.loopSourceStart)} – ${this._fmtDuration(this.loopSourceEnd)}]`:this.loopSourceLabel;return f`
      <div class="current-panel">
        <div class="panel-title">Current</div>
        <div class="current-rows">
          ${this._row("Name",this.videoName)}
          ${this._row("Video ID",this.videoId)}
          ${this._row("Chapter",this.chapterName)}
          ${this._row("Section",this.sectionName)}
          ${this._row("Loop",this.loopName)}
          ${this._row("Source",i)}
          ${this._row("Source type",t)}
          ${this._row("Duration",this.duration!=null?this._fmtDuration(this.duration):null)}
          ${this.zoomLabel?f`
            <div class="current-row">
              <div class="row-label zoom-label">Zoom</div>
              <div class="row-value">${this.zoomLabel}</div>
            </div>`:""}
        </div>
      </div>
    `}}w(Lo,"styles",x`
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

  `),w(Lo,"properties",{videoName:{type:String},videoId:{type:String},chapterName:{type:String},sectionName:{type:String},loopName:{type:String},loopSourceLabel:{type:String},loopSourceType:{type:String},loopSourceStart:{type:Number},loopSourceEnd:{type:Number},duration:{type:Number},zoomLabel:{type:String}});customElements.define("llama-current",Lo);class Io extends C{constructor(){super(),this.video=null,this.chapters=[],this.sections=[],this.namedLoops=[],this.marks=[],this.duration=null,this._keyHandler=null}show(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.show(),this._addKeyHandler()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_addKeyHandler(){this._keyHandler||(this._keyHandler=t=>this._onKeyDown(t),document.addEventListener("keydown",this._keyHandler))}_removeKeyHandler(){this._keyHandler&&(document.removeEventListener("keydown",this._keyHandler),this._keyHandler=null)}_onKeyDown(t){const e=this.renderRoot.querySelector(".content");e&&(t.key==="ArrowDown"?(t.preventDefault(),e.scrollBy({top:60,behavior:"smooth"})):t.key==="ArrowUp"?(t.preventDefault(),e.scrollBy({top:-60,behavior:"smooth"})):t.key==="PageDown"?(t.preventDefault(),e.scrollBy({top:e.clientHeight*.9,behavior:"smooth"})):t.key==="PageUp"?(t.preventDefault(),e.scrollBy({top:-e.clientHeight*.9,behavior:"smooth"})):t.key==="Enter"&&(t.preventDefault(),this.hide()))}_onModalClose(){this._removeKeyHandler()}_fmt(t){if(t==null||isNaN(t))return"?";const e=Math.floor(t);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}_renderVideo(){const t=this.video;if(!t)return f`<div class="empty">No video loaded.</div>`;const e=this.duration??t.duration,i=t.speed??1;return f`
      <div class="info-grid">
        <span class="info-label">ID</span>
        <span class="info-value">${t.id}</span>
        ${t.name?f`
          <span class="info-label">Name</span>
          <span class="info-value">${t.name}</span>
        `:""}
        <span class="info-label">URL</span>
        <span class="info-value">${t.url||"—"}</span>
        <span class="info-label">Duration</span>
        <span class="info-value">${e!=null?this._fmt(e):"—"}</span>
        <span class="info-label">Speed</span>
        <span class="info-value">${(i*100).toFixed(0)}%</span>
      </div>
    `}_renderChapters(){return this.chapters.length?f`
      <div class="entity-list">
        ${this.chapters.map(t=>f`
          <div class="entity-row">
            <span class="entity-name ${t.name?"":"dim"}">${t.name||"—"}</span>
            <span class="entity-time">${this._fmt(t.start)} – ${this._fmt(t.end)}</span>
          </div>
        `)}
      </div>
    `:f`<div class="empty">None.</div>`}_renderSections(){return this.sections.length?f`
      <div class="entity-list">
        ${this.sections.map(t=>f`
          <div class="entity-row">
            <span class="entity-name ${t.name?"":"dim"}">${t.name||"—"}</span>
            <span class="entity-time">${this._fmt(t.start)}</span>
          </div>
        `)}
      </div>
    `:f`<div class="empty">None.</div>`}_renderLoops(){return this.namedLoops.length?f`
      <div class="entity-list">
        ${this.namedLoops.map(t=>f`
          <div class="entity-row">
            <span class="entity-name ${t.name?"":"dim"}">${t.name||"—"}</span>
            <span class="entity-time">${this._fmt(t.start)} – ${this._fmt(t.end)}</span>
          </div>
        `)}
      </div>
    `:f`<div class="empty">None.</div>`}_renderMarks(){return this.marks.length?f`
      <div class="entity-list">
        ${this.marks.map(t=>f`
          <div class="entity-row">
            <span class="entity-name ${t.name?"":"dim"}">${t.name||"—"}</span>
            <span class="entity-time">${this._fmt(t.time)}</span>
          </div>
        `)}
      </div>
    `:f`<div class="empty">None.</div>`}render(){return f`
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
    `}}w(Io,"styles",x`
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
  `),w(Io,"properties",{video:{type:Object},chapters:{type:Array},sections:{type:Array},namedLoops:{type:Array},marks:{type:Array},duration:{type:Number}});customElements.define("llama-video-info-modal",Io);class To extends C{constructor(){super(),this.jumps=[],this._filter="",this._selIdx=0}show(){var t;this._filter="",this._selIdx=0,(t=this.renderRoot.querySelector("llama-modal"))==null||t.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector("sl-input"))==null||t.focus()}_onFilterInput(t){this._filter=t.target.value,this._selIdx=0}_onFilterKeyDown(t){const e=this._filtered();if(t.key==="ArrowDown")t.preventDefault(),this._selIdx=Math.min(this._selIdx+1,e.length-1),this._scrollSelectedIntoView();else if(t.key==="ArrowUp")t.preventDefault(),this._selIdx=Math.max(this._selIdx-1,0),this._scrollSelectedIntoView();else if(t.key==="Enter"){const i=e[this._selIdx]??e[0];i&&this._select(i)}}_scrollSelectedIntoView(){this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".jump-list"),e=t==null?void 0:t.querySelector(".jump-row.selected");e==null||e.scrollIntoView({block:"nearest"})})}_select(t){this.dispatchEvent(new CustomEvent("ll-jump-history",{detail:{time:t.time},bubbles:!0,composed:!0})),this.hide()}_filtered(){const t=[...this.jumps].map((i,s)=>({time:i,idx:s})).reverse(),e=this._filter.trim().toLowerCase();return e?t.filter(i=>ji(i.time).includes(e)):t}render(){const t=this._filtered();return f`
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
          ${t.length?t.map((e,i)=>f`
                <div
                  class="jump-row ${i===this._selIdx?"selected":""}"
                  @click=${()=>this._select(e)}
                >
                  <span class="jump-time">${ji(e.time)}</span>
                  <span class="jump-idx">#${e.idx+1}</span>
                </div>
              `):f`<div class="empty">No jump history${this._filter?" matches.":"."}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `}}w(To,"styles",x`
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
  `),w(To,"properties",{jumps:{type:Array},_filter:{state:!0},_selIdx:{state:!0}});function ji(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-jump-history-picker",To);var El=x`
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
`,N=class extends R{constructor(){super(),this.localize=new Tt(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=o=>{o.key==="Escape"&&(o.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const o=Ti(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),o)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const o=Ti(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),o)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var o;super.disconnectedCallback(),(o=this.closeWatcher)==null||o.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(o){return this.trigger.split(" ").includes(o)}async handleOpenChange(){var o,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((o=this.closeWatcher)==null||o.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await $t(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:i}=mt(this,"tooltip.show",{dir:this.localize.dir()});await ft(this.popup.popup,e,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await $t(this.body);const{keyframes:e,options:i}=mt(this,"tooltip.hide",{dir:this.localize.dir()});await ft(this.popup.popup,e,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Kt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Kt(this,"sl-after-hide")}render(){return f`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${G({tooltip:!0,"tooltip--open":this.open})}
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
    `}};N.styles=[H,El];N.dependencies={"sl-popup":I};c([z("slot:not([name])")],N.prototype,"defaultSlot",2);c([z(".tooltip__body")],N.prototype,"body",2);c([z("sl-popup")],N.prototype,"popup",2);c([p()],N.prototype,"content",2);c([p()],N.prototype,"placement",2);c([p({type:Boolean,reflect:!0})],N.prototype,"disabled",2);c([p({type:Number})],N.prototype,"distance",2);c([p({type:Boolean,reflect:!0})],N.prototype,"open",2);c([p({type:Number})],N.prototype,"skidding",2);c([p()],N.prototype,"trigger",2);c([p({type:Boolean})],N.prototype,"hoist",2);c([P("open",{waitUntilFirstUpdate:!0})],N.prototype,"handleOpenChange",1);c([P(["content","distance","hoist","placement","skidding"])],N.prototype,"handleOptionsChange",1);c([P("disabled")],N.prototype,"handleDisabledChange",1);bt("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});bt("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});N.define("sl-tooltip");class Ao extends C{constructor(){super(),this._seekDefault="",this._seekChoices="",this._nudgeDefault="",this._nudgeChoices="",this._speedDelta="",this._padStart="",this._padEnd="",this._error=""}show(t){var i;const e=t??T;this._seekDefault=String(e.seek_delta_default),this._seekChoices=e.seek_delta_choices.join(" "),this._nudgeDefault=String(e.loop_nudge_delta_default),this._nudgeChoices=e.loop_nudge_delta_choices.join(" "),this._speedDelta=String(Math.round(e.speed_delta*100)),this._padStart=String(e.loop_pad_start),this._padEnd=String(e.loop_pad_end),this._error="",(i=this.renderRoot.querySelector("llama-modal"))==null||i.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector('sl-input[data-field="seek-default"]'))==null||t.focus()}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this._save())}_parseChoices(t){const e=t.trim().split(/\s+/).filter(Boolean);if(!e.length)return null;const i=e.map(Number);return i.some(s=>isNaN(s)||!isFinite(s)||s<=0)?null:[...new Set(i)].sort((s,r)=>s-r)}_parsePositive(t){const e=Number(t.trim());return isNaN(e)||!isFinite(e)||e<=0?null:e}_parseNonNeg(t){const e=Number(t.trim());return isNaN(e)||!isFinite(e)||e<0?null:e}_save(){const t=this._parseChoices(this._seekChoices);if(!t){this._error="Seek delta choices: enter space-separated positive numbers.";return}const e=this._parsePositive(this._seekDefault);if(e===null){this._error="Seek delta default: must be a positive number.";return}if(!t.includes(e)){this._error="Seek delta default must be one of the seek delta choices.";return}const i=this._parseChoices(this._nudgeChoices);if(!i){this._error="Loop nudge delta choices: enter space-separated positive numbers.";return}const s=this._parsePositive(this._nudgeDefault);if(s===null){this._error="Loop nudge delta default: must be a positive number.";return}if(!i.includes(s)){this._error="Loop nudge delta default must be one of the loop nudge delta choices.";return}const r=this._parsePositive(this._speedDelta);if(r===null){this._error="Speed delta: must be a positive number.";return}const n=r/100,l=this._parseNonNeg(this._padStart);if(l===null){this._error="Pad start: must be a non-negative number.";return}const d=this._parseNonNeg(this._padEnd);if(d===null){this._error="Pad end: must be a non-negative number.";return}const h={seek_delta_default:e,seek_delta_choices:t,loop_nudge_delta_default:s,loop_nudge_delta_choices:i,speed_delta:n,loop_pad_start:l,loop_pad_end:d};this.dispatchEvent(new CustomEvent("ll-options-saved",{detail:{options:h},bubbles:!0,composed:!0})),this.hide()}render(){return f`
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
            @sl-input=${t=>{this._seekDefault=t.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input
            .value=${this._seekChoices}
            @sl-input=${t=>{this._seekChoices=t.target.value,this._error=""}}
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
            @sl-input=${t=>{this._nudgeDefault=t.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input
            .value=${this._nudgeChoices}
            @sl-input=${t=>{this._nudgeChoices=t.target.value,this._error=""}}
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
            @sl-input=${t=>{this._speedDelta=t.target.value,this._error=""}}
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
            @sl-input=${t=>{this._padStart=t.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End</span>
          <sl-input
            .value=${this._padEnd}
            @sl-input=${t=>{this._padEnd=t.target.value,this._error=""}}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="error-msg">${this._error}</div>

        <div slot="footer">
          <sl-button @click=${()=>this.hide()}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `}}w(Ao,"styles",x`
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
  `),w(Ao,"properties",{_seekDefault:{state:!0},_seekChoices:{state:!0},_nudgeDefault:{state:!0},_nudgeChoices:{state:!0},_speedDelta:{state:!0},_padStart:{state:!0},_padEnd:{state:!0},_error:{state:!0}});customElements.define("llama-options-modal",Ao);class Do extends C{constructor(){super(),this._mode="current",this._checked={},this._sections=[],this._loops=[],this._marks=[],this._chapters=[],this._videos=[],this._currentVideoId=null,this._currentVideoName=null}show({videos:t,currentVideoId:e,currentVideoName:i,sections:s,namedLoops:r,marks:n,chapters:l,initialMode:d="current",preCheckedVideoId:h=null}){var m;this._mode=d,this._sections=s??[],this._loops=r??[],this._marks=n??[],this._chapters=l??[],this._videos=t??[],this._currentVideoId=e??null,this._currentVideoName=i??null,this._checked=h?{[h]:!0}:{},(m=this.renderRoot.querySelector("llama-modal"))==null||m.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_isChecked(t){return this._checked[t]??!1}_toggle(t){this._checked={...this._checked,[t]:!this._isChecked(t)}}_groupState(t){const e=t.filter(i=>this._isChecked(i.id)).length;return e===0?"none":e===t.length?"all":"some"}_setGroup(t,e){const i={};for(const s of t)i[s.id]=e;this._checked={...this._checked,...i}}_onGroupChange(t){this._setGroup(t,this._groupState(t)!=="all")}_renderGroup(t,e,i){if(!e.length)return"";const s=this._groupState(e);return f`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${s==="all"}
            .indeterminate=${s==="some"}
            @change=${()=>this._onGroupChange(e)}
          >
          <span>${t} (${e.length})</span>
        </div>
        <div class="group-items">
          ${e.map(r=>f`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(r.id)}
                @change=${()=>this._toggle(r.id)}
              >
              ${i(r)}
            </div>
          `)}
        </div>
      </div>
    `}_renderCurrentVideoContent(){return this._currentVideoId?this._sections.length||this._loops.length||this._marks.length||this._chapters.length?f`
      <div class="current-video-label">
        Video: ${this._currentVideoName||this._currentVideoId}
      </div>
      ${this._renderGroup("Sections",this._sections,e=>f`<span class="item-label">${e.name||""}</span>
                    <span class="item-sub">@${Ot(e.start)}</span>`)}
      ${this._renderGroup("Loops",this._loops,e=>f`<span class="item-label">${e.name||""}</span>
                    <span class="item-sub">${Ot(e.start)} – ${Ot(e.end)}</span>`)}
      ${this._renderGroup("Marks",this._marks,e=>f`<span class="item-label">${e.name||""}</span>
                    <span class="item-sub">@${Ot(e.time)}</span>`)}
      ${this._renderGroup("Chapters",this._chapters,e=>f`<span class="item-label">${e.name||""}</span>
                    <span class="item-sub">${Ot(e.start)} – ${Ot(e.end)}</span>`)}
    `:f`<div class="empty-msg">Current video has no entities to delete.</div>`:f`<div class="no-video-msg">No video loaded.</div>`}_renderVideosContent(){if(!this._videos.length)return f`<div class="empty-msg">No videos saved.</div>`;const t=this._groupState(this._videos);return f`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${t==="all"}
            .indeterminate=${t==="some"}
            @change=${()=>this._onGroupChange(this._videos)}
          >
          <span>All videos (${this._videos.length})</span>
        </div>
        <div class="group-items">
          ${this._videos.map(e=>f`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(e.id)}
                @change=${()=>this._toggle(e.id)}
              >
              <span class="item-label">${e.name||e.id}</span>
              ${e.name?f`<span class="item-sub">${e.id}</span>`:""}
            </div>
          `)}
        </div>
      </div>
    `}_getSelectedCount(){return this._mode==="videos"?this._videos.filter(t=>this._isChecked(t.id)).length:[...this._sections,...this._loops,...this._marks,...this._chapters].filter(t=>this._isChecked(t.id)).length}_confirm(){if(this._mode==="videos"){const t=this._videos.filter(e=>this._isChecked(e.id)).map(e=>e.id);if(!t.length)return;this.dispatchEvent(new CustomEvent("ll-delete-data",{detail:{mode:"videos",videoIds:t},bubbles:!0,composed:!0}))}else{const t=this._sections.filter(r=>this._isChecked(r.id)).map(r=>r.id),e=this._loops.filter(r=>this._isChecked(r.id)).map(r=>r.id),i=this._marks.filter(r=>this._isChecked(r.id)).map(r=>r.id),s=this._chapters.filter(r=>this._isChecked(r.id)).map(r=>r.id);if(!t.length&&!e.length&&!i.length&&!s.length)return;this.dispatchEvent(new CustomEvent("ll-delete-data",{detail:{mode:"current",sections:t,loops:e,marks:i,chapters:s},bubbles:!0,composed:!0}))}this.hide()}render(){const t=this._getSelectedCount();return f`
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
            ?disabled=${t===0}
            @click=${this._confirm}
          >Delete${t>0?` (${t})`:""}</sl-button>
        </div>
      </llama-modal>
    `}}w(Do,"styles",x`
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
  `),w(Do,"properties",{_mode:{state:!0},_checked:{state:!0},_sections:{state:!0},_loops:{state:!0},_marks:{state:!0},_chapters:{state:!0},_videos:{state:!0},_currentVideoId:{state:!0},_currentVideoName:{state:!0}});function Ot(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}customElements.define("llama-delete-data-modal",Do);class Mo extends C{constructor(){super(),this._json=""}show(t){var e;try{this._json=JSON.stringify(t,null,2)}catch(i){this._json=`(serialization error: ${i.message})`}(e=this.renderRoot.querySelector("llama-modal"))==null||e.show()}hide(){var t;(t=this.renderRoot.querySelector("llama-modal"))==null||t.hide()}_onInitialFocus(){var t;(t=this.renderRoot.querySelector(".json-pre"))==null||t.focus()}_onKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this.hide())}render(){return f`
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
    `}}w(Mo,"styles",x`
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
  `),w(Mo,"properties",{_json:{state:!0}});customElements.define("llama-inspect-modal",Mo);const Ft=[.1,1,5,10,30],Cl=3e3,oo=["Freedom isn't free — but looping is","Freedom to loop","How about a little something, you know, for the effort","I have two speeds: loop and nap","It's loops all the way down","Keep on loopin' in the free world!","Loop the good stuff","Time is a flat circle — so a loop"];class zo extends C{constructor(){super(),this.currentTime=0,this.duration=null,this.speed=1,this.isPlaying=!1,this.looping=!1,this.loopStart=0,this.loopEnd=0,this.sections=[],this.marks=[],this.namedLoops=[],this.jumps=[],this.loopSource=null,this.statusMsg="Initializing...",this.wkPrefix=null,this.wkCompletions=null,this.windowFocused=!0,this.editScratchActive=!1,this.editScratchFocus="start",this.editScratchDelta=Ft[2],this.videos=[],this.currentVideoId=null,this.activeEntityType="any",this.chapters=[],this.activeChapterId=null,this.zoomSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.warningMsg=null,this.errorMsg=null,this.zone2Mode="sections",this.loopSourceStart=null,this.loopSourceEnd=null,this._quip="",this._quipIndex=-1,this._quipInterval=null,this._warnTimeout=null,this._statusTimeout=null,this._errorTimeout=null,this._vc=null,this._kb=null,this._pollId=null,this._editScratchHandler=null,this._appState=null,this._urlInputModalEl=null,this._videoPickerEl=null,this._editVideoModalEl=null,this._saveLoopModalEl=null,this._loopPickerEl=null,this._marksPickerEl=null,this._editMarkModalEl=null,this._sectionsPickerEl=null,this._editSectionModalEl=null,this._jumpTimeModalEl=null,this._chapterPickerEl=null,this._editChapterModalEl=null,this._videoInfoModalEl=null,this._jumpHistoryPickerEl=null,this._optionsModalEl=null,this._deleteDataModalEl=null,this._fileInputEl=null,this._jumpIdx=-1,this._jumpFromTime=null,this._suppressJumpPush=!1,this._undoStack=[],this._redoStack=[],this.seekDelta=T.seek_delta_default,this.speedDelta=T.speed_delta,this.loopNudgeDelta=T.loop_nudge_delta_default}updated(t){t.has("statusMsg")&&this.statusMsg&&(clearTimeout(this._statusTimeout),this._statusTimeout=setTimeout(()=>{this.statusMsg=null},4e3)),t.has("warningMsg")&&this.warningMsg&&(clearTimeout(this._warnTimeout),this._warnTimeout=setTimeout(()=>{this.warningMsg=null},4e3)),t.has("errorMsg")&&this.errorMsg&&(clearTimeout(this._errorTimeout),this._errorTimeout=setTimeout(()=>{this.errorMsg=null},4e3))}_syncFromVideo(t){var i;this.chapters=[...t.chapters??[]],this.sections=[...t.sections??[]],this.marks=[...t.marks??[]],this.namedLoops=(t.loops??[]).filter(s=>!s.is_scratch),this.jumps=[...t.jumps??[]],this._jumpIdx=-1,this._jumpFromTime=null;const e=(t.loops??[]).find(s=>s.is_scratch);this.loopStart=(e==null?void 0:e.start)??0,this.loopEnd=(e==null?void 0:e.end)??0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.speed=t.speed??1,(i=this._vc)==null||i.setPlaybackRate(this.speed),this.zoomSource=null,this.activeChapterId&&(this.activeChapterId=null)}_maybePushJump(t,e){var s;if(this._suppressJumpPush||Math.abs(e-t)<=Zs)return;const i=(s=this._appState)==null?void 0:s.videos.find(r=>r.id===this.currentVideoId);i&&(i.jumps.push(t),i.jumps.length>Ys&&i.jumps.shift(),this.jumps=[...i.jumps],this._jumpIdx=-1,this._jumpFromTime=null,tt(this._appState))}_saveCurrentState(){var i,s;const t=(i=this._appState)==null?void 0:i.videos.find(r=>r.id===this.currentVideoId);if(!t)return;t.chapters=this.chapters,t.sections=this.sections,t.marks=this.marks,t.jumps=this.jumps,t.time=this.currentTime;let e=(s=t.loops)==null?void 0:s.find(r=>r.is_scratch);e||(e=Zi()),e.start=this.loopStart,e.end=this.loopEnd,t.loops=[e,...this.namedLoops],tt(this._appState)}_applyOptions(t){if(!t)return;t.loop_nudge_delta_default==null&&(t.loop_nudge_delta_default=T.loop_nudge_delta_default),t.loop_nudge_delta_choices==null&&(t.loop_nudge_delta_choices=T.loop_nudge_delta_choices);const e=t.seek_delta_choices,i=t.loop_nudge_delta_choices;e.includes(this.seekDelta)||(this.seekDelta=t.seek_delta_default),i.includes(this.loopNudgeDelta)||(this.loopNudgeDelta=t.loop_nudge_delta_default),this.speedDelta=t.speed_delta}_onOptionsSaved(t){const{options:e}=t.detail;this._appState.options=e,this._applyOptions(e),tt(this._appState),this.statusMsg="Options saved."}_loadVideoObject(t,e=null){this._saveCurrentState(),this._appState.currentVideoId=t.id,this.currentVideoId=t.id,this._syncFromVideo(t),this._vc.loadVideo(t.id,e??t.time??0),this.duration=null,this.statusMsg=`Loading: ${t.id}`,tt(this._appState)}_speedChange(t){var r,n;const e=((r=this._vc)==null?void 0:r.getPlaybackRate())??1,i=Math.round((e+t)*100)/100,s=Math.max(.25,Math.min(2,i));(n=this._vc)==null||n.setPlaybackRate(s),this.speed=s}_flash(t,e="timed"){var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.flash(t,e)}_pushUndoSnapshot(t=""){const e={videos:JSON.parse(JSON.stringify(this._appState.videos)),currentVideoId:this.currentVideoId,desc:t};this._undoStack.push(e),this._undoStack.length>20&&this._undoStack.shift(),this._redoStack=[]}_currentSnapshot(){return this._saveCurrentState(),{videos:JSON.parse(JSON.stringify(this._appState.videos)),currentVideoId:this.currentVideoId}}_applySnapshot(t){var i,s;this._appState.videos=JSON.parse(JSON.stringify(t.videos)),this.videos=[...this._appState.videos];const e=this._appState.videos.find(r=>r.id===t.currentVideoId)??null;t.currentVideoId!==this.currentVideoId?(this._appState.currentVideoId=t.currentVideoId,this.currentVideoId=t.currentVideoId,e?(this._syncFromVideo(e),(i=this._vc)==null||i.cueVideo(e.id,e.time??0),this.duration=null):((s=this._vc)==null||s.pause(),this.sections=[],this.marks=[],this.namedLoops=[],this.chapters=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null)):e&&(this.sections=[...e.sections??[]],this.marks=[...e.marks??[]],this.namedLoops=(e.loops??[]).filter(r=>!r.is_scratch),this.chapters=[...e.chapters??[]],this.loopSource&&this.loopSourceType==="loop"&&!this.namedLoops.find(r=>r.id===this.loopSource)&&(this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null)),tt(this._appState)}_undo(){if(!this._undoStack.length){this._setWarning("Nothing to undo.");return}const t=this._undoStack.pop();this._redoStack.push({...this._currentSnapshot(),desc:t.desc}),this._applySnapshot(t),this.statusMsg=`Undone: ${t.desc}`}_redo(){if(!this._redoStack.length){this._setWarning("Nothing to redo.");return}const t=this._redoStack.pop();this._undoStack.push({...this._currentSnapshot(),desc:t.desc}),this._applySnapshot(t),this.statusMsg=`Redone: ${t.desc}`}_makeHandlers(){const t=i=>()=>console.log(`[kb] ${i}`),e=()=>this.currentVideoId?!1:(this._setWarning("No video loaded."),!0);return{playPause:()=>{e()||this._onPlayPause()},speedDown:()=>{this._speedChange(-this.speedDelta),this._flash("speed")},speedUp:()=>{this._speedChange(this.speedDelta),this._flash("speed")},speedReset:()=>{var i;(i=this._vc)==null||i.setPlaybackRate(1),this.speed=1,this._flash("speed")},seekForward:()=>{e()||(this._onSeekForward(),this._flash("time"))},seekBack:()=>{e()||(this._onSeekBack(),this._flash("time"))},seekDeltaDown:()=>{var r;const i=((r=this._appState)==null?void 0:r.options.seek_delta_choices)??T.seek_delta_choices,s=i.indexOf(this.seekDelta);this.seekDelta=i[Math.max(s-1,0)],this._flash("seekDelta")},seekDeltaUp:()=>{var r;const i=((r=this._appState)==null?void 0:r.options.seek_delta_choices)??T.seek_delta_choices,s=i.indexOf(this.seekDelta);this.seekDelta=i[Math.min(s+1,i.length-1)],this._flash("seekDelta")},prevEntity:()=>this._navigateEntity("prev"),entityType:()=>{var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.focusEntitySelect(),this._flash("entitySelect","until-blur")},nextEntity:()=>this._navigateEntity("next"),jumpToStart:()=>{var s,r;if(e())return;const i=this.looping?this.loopStart:0;this._maybePushJump(((s=this._vc)==null?void 0:s.getCurrentTime())??0,i),(r=this._vc)==null||r.seekTo(i),this._flash("time")},setLoopStart:()=>{var i;e()||(this.loopStart=((i=this._vc)==null?void 0:i.getCurrentTime())??0,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this._autoDisableLoopIfInvalid(),this._flash("loopStart"))},setLoopEnd:()=>{var i;e()||(this.loopEnd=((i=this._vc)==null?void 0:i.getCurrentTime())??0,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this._autoDisableLoopIfInvalid(),this._flash("loopEnd"))},resetLoopStart:()=>{e()||(this.loopStart=0,this._autoDisableLoopIfInvalid(),this._flash("loopStart"))},resetLoopEnd:()=>{e()||(this.loopEnd=this.duration??0,this._autoDisableLoopIfInvalid(),this._flash("loopEnd"))},nudgeStartDown:()=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopStart=fi(-this.loopNudgeDelta,i),this._autoDisableLoopIfInvalid(),this._flash("loopStart")},nudgeStartUp:()=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopStart=fi(+this.loopNudgeDelta,i),this._autoDisableLoopIfInvalid(),this._flash("loopStart")},nudgeEndDown:()=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopEnd=vi(-this.loopNudgeDelta,i),this._autoDisableLoopIfInvalid(),this._flash("loopEnd")},nudgeEndUp:()=>{if(e())return;const i={loopStart:this.loopStart,loopEnd:this.loopEnd,duration:this.duration};this.loopEnd=vi(+this.loopNudgeDelta,i),this._autoDisableLoopIfInvalid(),this._flash("loopEnd")},focusLoopNudgeDelta:()=>{var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.focusNudgeDeltaSelect(),this._flash("nudgeDelta","until-blur")},focusLoopStart:()=>{var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.focusStartInput(),this._flash("loopStart","until-blur")},focusLoopEnd:()=>{var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.focusEndInput(),this._flash("loopEnd","until-blur")},undo:()=>this._undo(),redo:()=>this._redo(),helpKeys:t("helpKeys"),options:()=>{var i,s;return(s=this._optionsModalEl)==null?void 0:s.show((i=this._appState)==null?void 0:i.options)},videoUrl:()=>{var i;return(i=this._urlInputModalEl)==null?void 0:i.show()},videoPicker:()=>{var i;return(i=this._videoPickerEl)==null?void 0:i.show()},editVideo:()=>{var i;return(i=this._editVideoModalEl)==null?void 0:i.show()},loopVideo:()=>{if(this.duration==null){this._setError("Video duration not yet known.");return}this._clearZoomIfOutside(0,this.duration),this.loopStart=0,this.loopEnd=this.duration,this.looping=!0,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=0,this.loopSourceEnd=this.duration,this.statusMsg="Looping full video."},deleteVideo:()=>{var i,s;if(!((i=this._appState)!=null&&i.videos.length)){this._setWarning("No videos saved.");return}(s=this._videoPickerEl)==null||s.show("delete")},jumpTime:()=>{var i;(i=this.renderRoot.querySelector("llama-controls"))==null||i.focusTimeInput(),this._flash("time","until-blur")},jumpSection:()=>this._openSectionsPicker("jump"),jumpLoop:()=>this._openLoopsPicker("jump"),jumpMark:()=>this._openMarksPicker("jump"),jumpChapter:()=>this._openChapterPicker("jump"),jumpHistory:()=>{var i;return(i=this._jumpHistoryPickerEl)==null?void 0:i.show()},jumpBack:()=>{var s,r;if(!this.jumps.length){this._setWarning("No jump history.");return}if(this._jumpIdx===-1)this._jumpFromTime=((s=this._vc)==null?void 0:s.getCurrentTime())??0,this._jumpIdx=this.jumps.length-1;else if(this._jumpIdx>0)this._jumpIdx--;else{this._setWarning("At oldest jump.");return}const i=this.jumps[this._jumpIdx];this._suppressJumpPush=!0,(r=this._vc)==null||r.seekTo(i),this._suppressJumpPush=!1,this.statusMsg=`Jump back: ${Q(i)}`,this._flash("time")},jumpForward:()=>{var i,s;if(this._jumpIdx===-1){this._setWarning("At current position.");return}if(this._jumpIdx<this.jumps.length-1){this._jumpIdx++;const r=this.jumps[this._jumpIdx];this._suppressJumpPush=!0,(i=this._vc)==null||i.seekTo(r),this._suppressJumpPush=!1,this.statusMsg=`Jump forward: ${Q(r)}`,this._flash("time")}else{this._jumpIdx=-1;const r=this._jumpFromTime??0;this._jumpFromTime=null,this._suppressJumpPush=!0,(s=this._vc)==null||s.seekTo(r),this._suppressJumpPush=!1,this.statusMsg="Returned to current position.",this._flash("time")}},toggleLoop:()=>{if(!e()){if(!this.looping&&!this._isLoopValid()){this._setWarning("Invalid loop range: start must be before end.");return}this.looping=!this.looping,this.looping&&this._seekIntoLoopIfNeeded()}},saveLoop:()=>{var i;return(i=this._saveLoopModalEl)==null?void 0:i.show()},openLoop:()=>this._openLoopsPicker("load"),saveBack:()=>{var i,s;if(!this.loopSource){this._setWarning("No source to save back to.");return}if(this.loopStart>=this.loopEnd){this._setWarning("Scratch loop is invalid (start must be before end).");return}if(this.loopSourceType==="loop"){const r=this.namedLoops.findIndex(n=>n.id===this.loopSource);if(r===-1){this._setWarning("Source loop not found.");return}this._pushUndoSnapshot("Loop updated"),this.namedLoops[r].start=this.loopStart,this.namedLoops[r].end=this.loopEnd,this.namedLoops=[...this.namedLoops],this.statusMsg="Loop updated",this._saveCurrentState();return}if(this.loopSourceType==="section"||this.loopSourceType==="chapter"){const r=this.loopSourceType==="section",n=r?"section":"chapter",l=r?this.sections:this.chapters,d=l.findIndex(a=>a.id===this.loopSource);if(d===-1){this._setWarning(`Source ${n} not found.`);return}const h=((i=this._appState)==null?void 0:i.options.loop_pad_start)??T.loop_pad_start,m=((s=this._appState)==null?void 0:s.options.loop_pad_end)??T.loop_pad_end,u=this.loopStart+h,v=this.loopEnd-m;if(u>=v){this._setWarning("Padded range too small — cannot compute valid entity bounds.");return}if(!qe(l,d,u,v,this.duration)){this._setWarning(`Save-back would eliminate a neighbor ${n}.`);return}this._pushUndoSnapshot(`${r?"Section":"Chapter"} updated`),He(l,d,u,v),r?this.sections=[...this.sections]:this.chapters=[...this.chapters],this.loopSourceStart=u,this.loopSourceEnd=v,this.statusMsg=`${r?"Section":"Chapter"} saved back.`,this._saveCurrentState();return}this._setWarning("No source to save back to.")},editScratch:()=>this._enterEditScratch(),deleteLoop:()=>this._openLoopsPicker("delete"),zoomLoop:()=>{var i;if(((i=this.zoomSource)==null?void 0:i.trigger)==="loop"){this.zoomSource=null,this.statusMsg="Loop zoom off.";return}if(!this._isLoopValid()){this._setWarning("No valid scratch loop to zoom.");return}if(this.loopStart===0&&this.loopEnd===this.duration){this._setWarning("Loop spans full video; zoom has no effect.");return}this.zoomSource={start:this.loopStart,end:this.loopEnd,trigger:"loop"},this.statusMsg="Loop zoom on.",this._seekIntoZoomIfNeeded()},zoomSection:()=>{var s;if(((s=this.zoomSource)==null?void 0:s.trigger)==="section"){this.zoomSource=null,this.statusMsg="Section zoom off.";return}const i=Qt(this.sections,this.currentTime,this.duration);if(!i||i.end==null){this._setWarning("No section at current position.");return}this.zoomSource={start:i.start,end:i.end,trigger:"section"},this.statusMsg="Section zoom on."},setSection:()=>{var r;const i=((r=this._vc)==null?void 0:r.getCurrentTime())??0,s=pt(this.sections,i);if(s&&s.end!=null&&i<=s.end){this._setWarning("Cannot set section inside a fixed section.");return}this._pushUndoSnapshot("Section created"),mi(this.sections,i),this.sections=[...this.sections],this.statusMsg="Section created",this._saveCurrentState()},editSection:()=>this._editCurrentSection(),openSection:()=>this._openSectionsPicker("open"),loopSection:()=>{var h,m;const i=Qt(this.sections,this.currentTime,this.duration);if(!i||i.end==null){this._setWarning("No section at current position.");return}const s=pt(this.sections,this.currentTime),r=((h=this._appState)==null?void 0:h.options.loop_pad_start)??T.loop_pad_start,n=((m=this._appState)==null?void 0:m.options.loop_pad_end)??T.loop_pad_end,l=Math.max(0,i.start-r),d=i.end+n;this._clearZoomIfOutside(l,d),this.loopStart=l,this.loopEnd=d,this.looping=!0,this.loopSource=(s==null?void 0:s.id)??null,this.loopSourceLabel=(s==null?void 0:s.name)||null,this.loopSourceType="section",this.loopSourceStart=i.start,this.loopSourceEnd=i.end,this.statusMsg="Looping section."},deleteSection:()=>this._openSectionsPicker("delete"),fixSection:()=>{const i=pt(this.sections,this.currentTime);if(!i){this._setWarning("No section at current position.");return}if(i.end!=null)this._pushUndoSnapshot("Section end unfixed"),i.end=null,this.statusMsg="Section end unfixed.";else{if(this.duration==null){this._setError("Video duration not yet known.");return}this._pushUndoSnapshot("Section end fixed"),ar(this.sections,i.id,this.duration),this.statusMsg="Section end fixed."}this.sections=[...this.sections],this._saveCurrentState()},setMark:()=>{var s;const i=((s=this._vc)==null?void 0:s.getCurrentTime())??0;if(!pi(this.marks,i)){this._setWarning("Mark already exists at this time.");return}this._pushUndoSnapshot("Mark created"),this.marks=[...this.marks],this.statusMsg="Mark created",this._saveCurrentState()},editMark:()=>this._openMarksPicker("edit"),deleteMark:()=>this._openMarksPicker("delete"),setChapter:()=>{var r;const i=((r=this._vc)==null?void 0:r.getCurrentTime())??0,s=ne(this.chapters,i);if(s&&s.end!=null&&i<=s.end){this._setWarning("Cannot set chapter inside a fixed chapter.");return}this._pushUndoSnapshot("Chapter created"),cr(this.chapters,i),this.chapters=[...this.chapters],this.statusMsg="Chapter created",this._saveCurrentState()},openChapter:()=>this._openChapterPicker("open"),editChapter:()=>this._editCurrentChapter(),loopChapter:()=>{var h,m;const i=Be(this.chapters,this.currentTime,this.duration);if(!i||i.end==null){this._setWarning("No chapter at current position.");return}const s=ne(this.chapters,this.currentTime),r=((h=this._appState)==null?void 0:h.options.loop_pad_start)??T.loop_pad_start,n=((m=this._appState)==null?void 0:m.options.loop_pad_end)??T.loop_pad_end,l=Math.max(0,i.start-r),d=i.end+n;this._clearZoomIfOutside(l,d),this.loopStart=l,this.loopEnd=d,this.looping=!0,this.loopSource=(s==null?void 0:s.id)??null,this.loopSourceLabel=(s==null?void 0:s.name)||null,this.loopSourceType="chapter",this.loopSourceStart=i.start,this.loopSourceEnd=i.end,this.statusMsg="Looping chapter."},deleteChapter:()=>this._openChapterPicker("delete"),fixChapter:()=>{const i=ne(this.chapters,this.currentTime);if(!i){this._setWarning("No chapter at current position.");return}if(i.end!=null)this._pushUndoSnapshot("Chapter end unfixed"),i.end=null,this.statusMsg="Chapter end unfixed.";else{if(this.duration==null){this._setError("Video duration not yet known.");return}this._pushUndoSnapshot("Chapter end fixed"),dr(this.chapters,i.id,this.duration),this.statusMsg="Chapter end fixed."}this.chapters=[...this.chapters],this._saveCurrentState()},toggleZone2:()=>{this.zone2Mode=this.zone2Mode==="sections"?"chapters":"sections",this.statusMsg=`Zone 2: ${this.zone2Mode}.`},zoomChapter:()=>{var s;if(((s=this.zoomSource)==null?void 0:s.trigger)==="chapter"){this.zoomSource=null,this.statusMsg="Chapter zoom off.";return}if(!this.activeChapterId){this._setWarning("No active chapter. Open one first (co).");return}const i=this.chapters.find(r=>r.id===this.activeChapterId);if(!i){this._setWarning("Active chapter not found.");return}this.zoomSource={start:i.start,end:i.end,trigger:"chapter"},this.statusMsg="Chapter zoom on.",this._seekIntoZoomIfNeeded()},videoInfo:()=>{var i;return(i=this._videoInfoModalEl)==null?void 0:i.show()},helpGeneral:t("helpGeneral"),deleteData:()=>{var s,r,n;const i=(s=this._appState)==null?void 0:s.videos.find(l=>l.id===this.currentVideoId);(n=this._deleteDataModalEl)==null||n.show({videos:((r=this._appState)==null?void 0:r.videos)??[],currentVideoId:this.currentVideoId,currentVideoName:(i==null?void 0:i.name)||(i==null?void 0:i.id)||null,sections:this.sections,namedLoops:this.namedLoops,marks:this.marks,chapters:this.chapters})},exportAll:()=>this._exportAll(),importData:()=>{var i;return(i=this._fileInputEl)==null?void 0:i.click()},inspectData:()=>{var i;return(i=this._inspectModalEl)==null?void 0:i.show(this._appState)},shareVideo:()=>this._shareVideo(),shareLoop:()=>this._shareLoop()}}async firstUpdated(){this._appState=ur()??Xs(),this.videos=this._appState.videos,this.currentVideoId=this._appState.currentVideoId;const t=this.renderRoot.querySelector("#player-container");if(this._vc=Js({onReady:()=>{this.statusMsg="Player ready. Enter a YouTube URL or video ID above."},onStateChange:i=>{i===0&&(this.statusMsg="Ended")}}),await this._vc.initialize(t),this._handlers=this._makeHandlers(),this._kb=Gs(this._handlers,{onPendingKey:(i,s)=>{this.wkPrefix=i,this.wkCompletions=s}}),this._urlInputModalEl=this.renderRoot.querySelector("llama-url-input-modal"),this._videoPickerEl=this.renderRoot.querySelector("llama-video-picker"),this._editVideoModalEl=this.renderRoot.querySelector("llama-edit-video-modal"),this._saveLoopModalEl=this.renderRoot.querySelector("llama-save-loop-modal"),this._loopPickerEl=this.renderRoot.querySelector("llama-loop-picker"),this._marksPickerEl=this.renderRoot.querySelector("llama-marks-picker"),this._editMarkModalEl=this.renderRoot.querySelector("llama-edit-mark-modal"),this._sectionsPickerEl=this.renderRoot.querySelector("llama-sections-picker"),this._editSectionModalEl=this.renderRoot.querySelector("llama-edit-section-modal"),this._jumpTimeModalEl=this.renderRoot.querySelector("llama-jump-time-modal"),this._chapterPickerEl=this.renderRoot.querySelector("llama-chapter-picker"),this._editChapterModalEl=this.renderRoot.querySelector("llama-edit-chapter-modal"),this._videoInfoModalEl=this.renderRoot.querySelector("llama-video-info-modal"),this._jumpHistoryPickerEl=this.renderRoot.querySelector("llama-jump-history-picker"),this._optionsModalEl=this.renderRoot.querySelector("llama-options-modal"),this._deleteDataModalEl=this.renderRoot.querySelector("llama-delete-data-modal"),this._inspectModalEl=this.renderRoot.querySelector("llama-inspect-modal"),this._fileInputEl=this.renderRoot.querySelector("#import-file-input"),this._applyOptions(this._appState.options),window.addEventListener("blur",()=>{this.windowFocused=!1}),window.addEventListener("focus",()=>{this.windowFocused=!0}),!this._handleStartupUrlParams()&&this._appState.currentVideoId){const i=this._appState.videos.find(s=>s.id===this._appState.currentVideoId);i&&(this._syncFromVideo(i),this._vc.cueVideo(i.id,i.time??0),this.statusMsg=`Video cued: ${i.name||i.id}`)}this._pollId=setInterval(()=>{const i=this._vc.getCurrentTime();this.currentTime=i,this.isPlaying=this._vc.isPlaying(),this.speed=this._vc.getPlaybackRate();const s=this._vc.getDuration();if(s!==null&&(this.duration=s),this.zoomSource&&i!==null&&(i>=this.zoomSource.end?this.looping&&this.loopStart<this.loopEnd?this._vc.seekTo(Math.max(this.zoomSource.start,this.loopStart)):this.looping?this._vc.seekTo(this.zoomSource.start):this._vc.pause():i<this.zoomSource.start&&this._vc.seekTo(this.zoomSource.start)),this.looping&&this.loopStart<this.loopEnd&&i!==null&&i>=this.loopEnd){const r=this.zoomSource?Math.max(this.zoomSource.start,this.loopStart):this.loopStart;this._vc.seekTo(r)}},500)}_enterEditScratch(){this._kb.disable(),this.editScratchActive=!0,this.editScratchFocus="start",this.editScratchDelta=Ft[2],this._editScratchHandler=t=>this._editScratchKeyDown(t),document.addEventListener("keydown",this._editScratchHandler)}_exitEditScratch(){document.removeEventListener("keydown",this._editScratchHandler),this._editScratchHandler=null,this.editScratchActive=!1,this._kb.enable()}_editScratchKeyDown(t){var r;const e=t.composedPath()[0],i=e==null?void 0:e.tagName;if(i==="INPUT"||i==="TEXTAREA"||i==="SELECT"||e!=null&&e.isContentEditable)return;const s=t.key;if(/^[0-9:/]$/.test(s)){const n=this.renderRoot.querySelector("llama-controls");this.editScratchFocus==="start"?n==null||n.focusStartInput():n==null||n.focusEndInput();return}if(s==="Tab"){t.preventDefault(),this.editScratchFocus=this.editScratchFocus==="start"?"end":"start";return}if(s==="ArrowLeft"||s==="ArrowRight"){t.preventDefault();const n=(s==="ArrowRight"?1:-1)*this.editScratchDelta,l=this.duration??1/0;this.editScratchFocus==="start"?this.loopStart=Math.max(0,Math.min(this.loopStart+n,l)):this.loopEnd=Math.max(0,Math.min(this.loopEnd+n,l)),this._autoDisableLoopIfInvalid();return}if(s==="ArrowUp"||s==="ArrowDown"){t.preventDefault();const n=Ft.indexOf(this.editScratchDelta);s==="ArrowUp"?this.editScratchDelta=Ft[Math.min(n+1,Ft.length-1)]:this.editScratchDelta=Ft[Math.max(n-1,0)];return}if(s===" "){t.preventDefault();const n=this.editScratchFocus==="start"?this.loopStart:Math.max(0,this.loopEnd-3);(r=this._vc)==null||r.seekTo(n),this._onPlayPause();return}if(s==="Backspace"){t.preventDefault(),this.editScratchFocus==="start"?this.loopStart=0:this.loopEnd=this.duration??0,this._autoDisableLoopIfInvalid();return}(s==="Enter"||s==="Escape")&&(t.preventDefault(),this._exitEditScratch())}disconnectedCallback(){var t;super.disconnectedCallback(),clearInterval(this._pollId),clearTimeout(this._warnTimeout),clearTimeout(this._statusTimeout),clearTimeout(this._errorTimeout),(t=this._kb)==null||t.destroy(),this._editScratchHandler&&document.removeEventListener("keydown",this._editScratchHandler)}_parseVideoInput(t){if(t=t.trim(),!t)return null;if(/^[A-Za-z0-9_-]{11}$/.test(t))return{id:t,startTime:0};let e;try{e=new URL(t.startsWith("http")?t:"https://"+t)}catch{return null}const i=e.searchParams,s=this._parseTimeParam(i.get("t")??"");let r=i.get("v")??null;if(!r){const n=e.pathname.split("/").filter(Boolean);r=n[n.length-1]??null}return r?{id:r,startTime:s}:null}_parseTimeParam(t){if(!t)return 0;const e=Number(t);if(!isNaN(e))return e;let i=0;const s=t.match(/(\d+)h/),r=t.match(/(\d+)m/),n=t.match(/(\d+(?:\.\d+)?)s/);return s&&(i+=parseInt(s[1])*3600),r&&(i+=parseInt(r[1])*60),n&&(i+=parseFloat(n[1])),i}_loadUrl(t){if(t=t.trim(),!t)return;const e=this._parseVideoInput(t);if(!e){this._setWarning("Could not parse a YouTube video ID from that input.");return}let i=this._appState.videos.find(s=>s.id===e.id);i||(i=ui(t,e.id),this._appState.videos.push(i),this.videos=[...this._appState.videos]),this._loadVideoObject(i,e.startTime)}_onLoadUrl(t){this._loadUrl(t.detail.url)}_onPickVideo(t){var i;const e=(i=this._appState)==null?void 0:i.videos.find(s=>s.id===t.detail.videoId);e&&(this._loadVideoObject(e),this.videos=[...this._appState.videos])}_onUpdateVideo(t){var d;const{id:e,name:i,url:s,start:r,end:n}=t.detail,l=(d=this._appState)==null?void 0:d.videos.find(h=>h.id===e);l&&(this._pushUndoSnapshot("Video updated"),l.name=i,l.url=s,l.start=r,l.end=n,this.videos=[...this._appState.videos],tt(this._appState))}_onDeleteVideo(t){var s,r;const{id:e}=t.detail,i=(s=this._appState)==null?void 0:s.videos.findIndex(n=>n.id===e);i==null||i===-1||(this._pushUndoSnapshot("Video deleted"),this._appState.videos.splice(i,1),this.currentVideoId===e&&((r=this._vc)==null||r.pause(),this._appState.currentVideoId=null,this.currentVideoId=null,this.sections=[],this.marks=[],this.namedLoops=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null,this.statusMsg="Video deleted."),this.videos=[...this._appState.videos],tt(this._appState))}_setWarning(t){this.warningMsg=t}_setError(t){this.errorMsg=t}_flashLoopViolation(){this._setWarning("Outside active loop range.")}_jumpTo(t){var e,i;if(this.zoomSource&&(t=Math.max(this.zoomSource.start,Math.min(this.zoomSource.end,t))),this.looping&&this.loopStart<this.loopEnd&&(t<this.loopStart||t>this.loopEnd)){this._flashLoopViolation();return}this._maybePushJump(((e=this._vc)==null?void 0:e.getCurrentTime())??0,t),(i=this._vc)==null||i.seekTo(t)}_seek(t){var e;this._jumpTo((((e=this._vc)==null?void 0:e.getCurrentTime())??0)+t)}_onPlayPause(){var t,e,i;if(this.currentVideoId)if((t=this._vc)!=null&&t.isPlaying())this._vc.pause();else{if(this.zoomSource&&this.currentTime>=this.zoomSource.end){const s=this.looping&&this.loopStart<this.loopEnd?Math.max(this.zoomSource.start,this.loopStart):this.zoomSource.start;(e=this._vc)==null||e.seekTo(s)}(i=this._vc)==null||i.play()}}_onSeekForward(){this.currentVideoId&&this._seek(this.seekDelta)}_onSeekBack(){this.currentVideoId&&this._seek(-this.seekDelta)}_isLoopValid(){return this.loopStart<this.loopEnd}_autoDisableLoopIfInvalid(){this.looping&&!this._isLoopValid()&&(this.looping=!1)}_clearZoomIfOutside(t,e){this.zoomSource&&(t<this.zoomSource.start||e>this.zoomSource.end)&&(this.zoomSource=null)}_seekIntoZoomIfNeeded(){var e,i;if(!this.zoomSource)return;const t=((e=this._vc)==null?void 0:e.getCurrentTime())??this.currentTime;(t<this.zoomSource.start||t>this.zoomSource.end)&&((i=this._vc)==null||i.seekTo(this.zoomSource.start))}_seekIntoLoopIfNeeded(){var e;const t=(e=this._vc)==null?void 0:e.getCurrentTime();t!=null&&(t<this.loopStart||t>=this.loopEnd)&&this._vc.seekTo(this.loopStart)}_onToggleLoop(){if(this.currentVideoId){if(!this.looping&&!this._isLoopValid()){this._setWarning("Invalid loop range: start must be before end.");return}this.looping=!this.looping,this.looping&&this._seekIntoLoopIfNeeded()}}_onSetLoopStartNow(){this.currentVideoId&&(this.loopStart=this.currentTime,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this._autoDisableLoopIfInvalid())}_onSetLoopEndNow(){this.currentVideoId&&(this.loopEnd=this.currentTime,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this._autoDisableLoopIfInvalid())}_onLoopStartChange(t){this.loopStart=t.detail.value,this._autoDisableLoopIfInvalid()}_onLoopEndChange(t){this.loopEnd=t.detail.value,this._autoDisableLoopIfInvalid()}_getEntityTimes(t){var s;const e=new Set,i=r=>{r!=null&&isFinite(r)&&e.add(r)};if((t==="any"||t==="section")&&this.sections.forEach(r=>i(r.start)),(t==="any"||t==="loop")&&this.namedLoops.forEach(r=>i(r.start)),(t==="any"||t==="mark")&&this.marks.forEach(r=>i(r.time)),(t==="any"||t==="chapter")&&this.chapters.forEach(r=>i(r.start)),t==="any"||t==="video"){const r=(s=this._appState)==null?void 0:s.videos.find(n=>n.id===this.currentVideoId);r&&(i(r.start??0),r.end!=null?i(r.end):this.duration!=null&&i(this.duration))}return[...e].sort((r,n)=>r-n)}_navigateEntity(t){var n;const e=((n=this._vc)==null?void 0:n.getCurrentTime())??this.currentTime,i=this._getEntityTimes(this.activeEntityType);if(!i.length)return;const s=t==="prev"?2:.1;let r=null;if(t==="prev")for(const l of i)if(l<e-s)r=l;else break;else r=i.find(l=>l>e+s)??null;r!=null&&this._jumpTo(r)}_onEntityTypeChange(t){this.activeEntityType=t.detail.value}_onSetSection(){var i;const t=((i=this._vc)==null?void 0:i.getCurrentTime())??0,e=pt(this.sections,t);if(e&&e.end!=null&&t<=e.end){this._setWarning("Cannot set section inside a fixed section.");return}this._pushUndoSnapshot("Section created"),mi(this.sections,t),this.sections=[...this.sections],this.statusMsg="Section created",this._saveCurrentState()}_onDeleteSection(t){this._pushUndoSnapshot("Section deleted"),rr(this.sections,t.detail.id),this.sections=[...this.sections],this.statusMsg="Section deleted",this._saveCurrentState()}_onSetMark(){var e;const t=((e=this._vc)==null?void 0:e.getCurrentTime())??0;if(!pi(this.marks,t)){this._setWarning("Mark already exists at this time.");return}this._pushUndoSnapshot("Mark created"),this.marks=[...this.marks],this.statusMsg="Mark created",this._saveCurrentState()}_onDeleteMark(t){this._pushUndoSnapshot("Mark deleted"),sr(this.marks,t.detail.id),this.marks=[...this.marks],this.statusMsg="Mark deleted",this._saveCurrentState()}_onSaveLoop(t){this._pushUndoSnapshot("Loop saved");const e=t.detail.start??this.loopStart,i=t.detail.end??this.loopEnd;nr(this.namedLoops,e,i,t.detail.name),this.namedLoops=[...this.namedLoops],this.statusMsg="Loop saved",this._saveCurrentState()}_onLoadLoop(t){var i,s;const e=this.namedLoops.find(r=>r.id===t.detail.id);e&&(this._clearZoomIfOutside(e.start,e.end),this.loopStart=e.start,this.loopEnd=e.end,this.loopSource=e.id,this.loopSourceLabel=e.name||null,this.loopSourceType="loop",this.statusMsg=`Loop loaded: ${e.name||"unnamed"}`,this.looping&&(this._maybePushJump(((i=this._vc)==null?void 0:i.getCurrentTime())??0,e.start),(s=this._vc)==null||s.seekTo(e.start)))}_onActivateLoop(t){var i,s;const e=this.namedLoops.find(r=>r.id===t.detail.id);e&&(this._clearZoomIfOutside(e.start,e.end),this.loopStart=e.start,this.loopEnd=e.end,this.loopSource=e.id,this.loopSourceLabel=e.name||null,this.loopSourceType="loop",this.statusMsg=`Loop loaded: ${e.name||"unnamed"}`,this._maybePushJump(((i=this._vc)==null?void 0:i.getCurrentTime())??0,e.start),(s=this._vc)==null||s.seekTo(e.start))}_onJumpLoop(t){this._jumpTo(t.detail.start)}_onSeekTo(t){this._jumpTo(t.detail.time)}_onDeleteLoop(t){this._pushUndoSnapshot("Loop deleted"),lr(this.namedLoops,t.detail.id),this.namedLoops=[...this.namedLoops],this.loopSource===t.detail.id&&(this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null),this.statusMsg="Loop deleted",this._saveCurrentState()}_openLoopsPicker(t){var e;if(!this.namedLoops.length){this._setWarning("No saved loops.");return}(e=this._loopPickerEl)==null||e.show(t)}_openMarksPicker(t){var e;if(!this.marks.length){this._setWarning("No marks set.");return}(e=this._marksPickerEl)==null||e.show(t)}_onJumpMark(t){this._jumpTo(t.detail.time)}_onPickMarkEdit(t){var i;const e=this.marks.find(s=>s.id===t.detail.id);e&&((i=this._editMarkModalEl)==null||i.show(e))}_onUpdateMark(t){this._pushUndoSnapshot("Mark updated");const{id:e,name:i,time:s}=t.detail,r=this.marks.find(n=>n.id===e);r&&(r.name=i,r.time=s,this.marks=[...this.marks].sort((n,l)=>n.time-l.time),this.statusMsg="Mark updated",this._saveCurrentState())}_openSectionsPicker(t){var e;if(!this.sections.length){this._setWarning("No sections set.");return}(e=this._sectionsPickerEl)==null||e.show(t)}_editCurrentSection(){var s;const t=pt(this.sections,this.currentTime);if(!t){this._setWarning("No section at current position.");return}const e=Qt(this.sections,t.start,this.duration),i=t.end==null?(e==null?void 0:e.end)??null:null;(s=this._editSectionModalEl)==null||s.show(t,i)}_editCurrentChapter(){var s;const t=ne(this.chapters,this.currentTime);if(!t){this._setWarning("No chapter at current position.");return}const e=Be(this.chapters,t.start,this.duration),i=t.end==null?(e==null?void 0:e.end)??null:null;(s=this._editChapterModalEl)==null||s.showEdit(t,i)}_openChapterPicker(t){var e;if(!this.chapters.length){this._setWarning("No chapters set.");return}(e=this._chapterPickerEl)==null||e.show(t)}_onJumpChapter(t){this._jumpTo(t.detail.time)}_onOpenChapter(t){var d,h,m,u;const e=this.chapters.find(v=>v.id===t.detail.id);if(!e)return;const i=Be(this.chapters,e.start,this.duration);if(!i||i.end==null){this._setWarning("Chapter has no end boundary.");return}const s=((d=this._appState)==null?void 0:d.options.loop_pad_start)??T.loop_pad_start,r=((h=this._appState)==null?void 0:h.options.loop_pad_end)??T.loop_pad_end,n=Math.max(0,i.start-s),l=i.end+r;this._clearZoomIfOutside(n,l),this.activeChapterId=e.id,this.loopStart=n,this.loopEnd=l,this.loopSource=e.id,this.loopSourceLabel=e.name||null,this.loopSourceType="chapter",this.loopSourceStart=i.start,this.loopSourceEnd=i.end,this._autoDisableLoopIfInvalid(),this._maybePushJump(((m=this._vc)==null?void 0:m.getCurrentTime())??0,i.start),(u=this._vc)==null||u.seekTo(i.start),this.statusMsg=`Chapter: ${e.name||`${Q(i.start)} → ${Q(i.end)}`}`}_onOpenSection(t){var d,h,m,u;const e=this.sections.find(v=>v.id===t.detail.id);if(!e)return;const i=Qt(this.sections,e.start,this.duration);if(!i||i.end==null){this._setWarning("Section has no end boundary.");return}const s=((d=this._appState)==null?void 0:d.options.loop_pad_start)??T.loop_pad_start,r=((h=this._appState)==null?void 0:h.options.loop_pad_end)??T.loop_pad_end,n=Math.max(0,i.start-s),l=i.end+r;this._clearZoomIfOutside(n,l),this.loopStart=n,this.loopEnd=l,this.loopSource=e.id,this.loopSourceLabel=e.name||null,this.loopSourceType="section",this.loopSourceStart=i.start,this.loopSourceEnd=i.end,this._autoDisableLoopIfInvalid(),this._maybePushJump(((m=this._vc)==null?void 0:m.getCurrentTime())??0,i.start),(u=this._vc)==null||u.seekTo(i.start),this.statusMsg=`Section: ${e.name||Q(e.start)}`}_onCreateChapter(t){this._pushUndoSnapshot("Chapter created");const{name:e,start:i,end:s}=t.detail;or(this.chapters,e,i,s),this.chapters=[...this.chapters],this.statusMsg="Chapter created",this._saveCurrentState()}_onUpdateChapter(t){const{id:e,name:i,start:s,end:r}=t.detail,n=this.chapters.findIndex(l=>l.id===e);if(n!==-1){if(!qe(this.chapters,n,s,r,this.duration)){this._setWarning("Edit would eliminate a neighbor chapter.");return}this._pushUndoSnapshot("Chapter updated"),this.chapters[n].name=i,He(this.chapters,n,s,r),this.chapters=[...this.chapters],this.statusMsg="Chapter updated",this._saveCurrentState()}}_onDeleteChapter(t){var e;this._pushUndoSnapshot("Chapter deleted"),ir(this.chapters,t.detail.id),this.chapters=[...this.chapters],this.statusMsg="Chapter deleted",this.activeChapterId===t.detail.id&&(this.activeChapterId=null,((e=this.zoomSource)==null?void 0:e.trigger)==="chapter"&&(this.zoomSource=null)),this._saveCurrentState()}_onJumpTime(t){this._jumpTo(t.detail.time)}_onJumpHistory(t){this._jumpTo(t.detail.time)}_exportAll(){Bi(pr(this._appState),"loopllama-all.json"),this.statusMsg="Exported all data."}_shareVideo(){if(!this.currentVideoId){this._setWarning("No video loaded.");return}const t=this._appState.videos.find(i=>i.id===this.currentVideoId),e=((t==null?void 0:t.name)||this.currentVideoId).replace(/[^A-Za-z0-9_-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");Bi(mr(this._appState,this.currentVideoId),`loopllama-${e}.json`),this.statusMsg="Exported video data."}_shareLoop(){if(!this.currentVideoId){this._setWarning("No video loaded.");return}if(!this._isLoopValid()){this._setWarning("Set a valid scratch loop first.");return}const t=new URL(window.location.href);t.searchParams.set("v",this.currentVideoId),t.searchParams.set("s",Math.round(this.loopStart*10)/10),t.searchParams.set("e",Math.round(this.loopEnd*10)/10),navigator.clipboard.writeText(t.toString()).then(()=>{this.statusMsg="Loop URL copied to clipboard."}).catch(()=>{this.statusMsg=`Loop URL: ${t.toString()}`})}_onFileImport(t){var s;const e=(s=t.target.files)==null?void 0:s[0];if(!e)return;const i=new FileReader;i.onload=r=>{try{const n=fr(r.target.result,this._appState);this.videos=[...this._appState.videos],tt(this._appState),this.statusMsg=`Imported: ${n.added} added, ${n.updated} updated.`}catch(n){this.errorMsg=`Import failed: ${n.message}`}},i.readAsText(e),t.target.value=""}_handleStartupUrlParams(){const t=new URLSearchParams(window.location.search),e=t.get("v"),i=parseFloat(t.get("s")),s=parseFloat(t.get("e"));if(!e||isNaN(i)||isNaN(s)||i>=s)return!1;let r=this._appState.videos.find(l=>l.id===e);r||(r=ui(e,e),this._appState.videos.push(r),this.videos=[...this._appState.videos]),this._appState.currentVideoId=r.id,this.currentVideoId=r.id,this._syncFromVideo(r),this.loopStart=i,this.loopEnd=s,this._vc.cueVideo(r.id,i),this.statusMsg=`Shared loop loaded: ${Q(i)} → ${Q(s)}`,tt(this._appState);const n=new URL(window.location.href);return n.searchParams.delete("v"),n.searchParams.delete("s"),n.searchParams.delete("e"),history.replaceState(null,"",n.toString()),!0}_onJumpSection(t){this._jumpTo(t.detail.start)}_onPickSectionEdit(t){var r;const e=this.sections.find(n=>n.id===t.detail.id);if(!e)return;const i=Qt(this.sections,e.start,this.duration),s=e.end==null?(i==null?void 0:i.end)??null:null;(r=this._editSectionModalEl)==null||r.show(e,s)}_onUpdateSection(t){const{id:e,name:i,start:s,end:r}=t.detail,n=this.sections.findIndex(l=>l.id===e);if(n!==-1){if(!qe(this.sections,n,s,r,this.duration)){this._setWarning("Edit would eliminate a neighbor section.");return}this._pushUndoSnapshot("Section updated"),this.sections[n].name=i,He(this.sections,n,s,r),this.sections=[...this.sections],this.statusMsg="Section updated",this._saveCurrentState()}}_onDeleteData(t){var i;const{mode:e}=t.detail;if(e==="videos"){const{videoIds:s}=t.detail;this._pushUndoSnapshot(`Video${s.length!==1?"s":""} deleted`),this._appState.videos=this._appState.videos.filter(n=>!s.includes(n.id)),s.includes(this.currentVideoId)&&((i=this._vc)==null||i.pause(),this._appState.currentVideoId=null,this.currentVideoId=null,this.sections=[],this.marks=[],this.namedLoops=[],this.chapters=[],this.loopStart=0,this.loopEnd=0,this.looping=!1,this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null,this.duration=null),this.videos=[...this._appState.videos],tt(this._appState);const r=s.length;this.statusMsg=`Deleted ${r} video${r!==1?"s":""}.`}else{const{sections:s,loops:r,marks:n,chapters:l}=t.detail;this._pushUndoSnapshot("Data deleted"),this.sections=this.sections.filter(h=>!s.includes(h.id)),this.namedLoops=this.namedLoops.filter(h=>!r.includes(h.id)),this.marks=this.marks.filter(h=>!n.includes(h.id)),this.chapters=this.chapters.filter(h=>!l.includes(h.id)),this.loopSource&&this.loopSourceType==="loop"&&!this.namedLoops.find(h=>h.id===this.loopSource)&&(this.loopSource=null,this.loopSourceLabel=null,this.loopSourceType=null,this.loopSourceStart=null,this.loopSourceEnd=null),this._saveCurrentState();const d=s.length+r.length+n.length+l.length;this.statusMsg=`Deleted ${d} item${d!==1?"s":""}.`}}_onMenuSelect(t){var i;const e=(i=this._handlers)==null?void 0:i[t.detail.action];e&&e()}_nextQuip(){let t;do t=Math.floor(Math.random()*oo.length);while(t===this._quipIndex&&oo.length>1);this._quipIndex=t,this._quip=oo[t],this.requestUpdate()}_onQuipEnter(){this._nextQuip(),this._quipInterval=setInterval(()=>this._nextQuip(),Cl)}_onQuipLeave(){clearInterval(this._quipInterval),this._quipInterval=null,this._quip="",this.requestUpdate()}render(){var n,l,d,h,m,u,v;const t=((n=this._appState)==null?void 0:n.videos.find(a=>a.id===this.currentVideoId))??null,e=this.activeChapterId?this.chapters.find(a=>a.id===this.activeChapterId)??null:null,i=pt(this.sections,this.currentTime),s=this.loopSource?((l=this.namedLoops.find(a=>a.id===this.loopSource))==null?void 0:l.name)??null:null,r=(()=>{if(!this.zoomSource)return null;const{trigger:a,start:b,end:_}=this.zoomSource;if(a==="loop")return`Loop: ${Q(b)} – ${Q(_)}`;if(a==="section"){const y=pt(this.sections,b);return y!=null&&y.name?`Section: ${y.name}`:`Section: ${Q(b)}`}if(a==="chapter"){const y=this.chapters.find(g=>g.id===this.activeChapterId);return y!=null&&y.name?`Chapter: ${y.name}`:`Chapter: ${Q(b)}`}return null})();return f`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <img src="${"/loopllama/v2/"}llama-mascot.png" class="header-llama" alt=""
          @mouseenter=${this._onQuipEnter}
          @mouseleave=${this._onQuipLeave}
        >
        <span class="header-quip ${this._quip?"visible":""}">${this._quip}</span>
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
              ${this.currentVideoId?"":f`<div class="player-overlay"></div>`}
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
              .scopeStart=${((d=this.zoomSource)==null?void 0:d.start)??null}
              .scopeEnd=${((h=this.zoomSource)==null?void 0:h.end)??null}
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
          .seekDeltaChoices=${((m=this._appState)==null?void 0:m.options.seek_delta_choices)??T.seek_delta_choices}
          .loopNudgeDelta=${this.loopNudgeDelta}
          .loopNudgeDeltaChoices=${((u=this._appState)==null?void 0:u.options.loop_nudge_delta_choices)??T.loop_nudge_delta_choices}
          .editScratchActive=${this.editScratchActive}
          .editScratchFocus=${this.editScratchFocus}
          .editScratchDelta=${this.editScratchDelta}
          .activeEntityType=${this.activeEntityType}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-to=${a=>this._jumpTo(a.detail.value)}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
          @ll-seek-delta-change=${a=>{this.seekDelta=a.detail.value}}
          @ll-loop-nudge-delta-change=${a=>{this.loopNudgeDelta=a.detail.value}}
          @ll-toggle-loop=${this._onToggleLoop}
          @ll-set-loop-start-now=${this._onSetLoopStartNow}
          @ll-set-loop-end-now=${this._onSetLoopEndNow}
          @ll-loop-start-change=${this._onLoopStartChange}
          @ll-loop-end-change=${this._onLoopEndChange}
          @ll-speed-change=${a=>{var _;const b=Math.max(.25,Math.min(2,a.detail.value));(_=this._vc)==null||_.setPlaybackRate(b),this.speed=b}}
          @ll-prev-entity=${()=>this._navigateEntity("prev")}
          @ll-next-entity=${()=>this._navigateEntity("next")}
          @ll-entity-type-change=${this._onEntityTypeChange}
          @ll-invalid-time=${()=>this._setWarning("Invalid time format.")}
          @ll-menu-select=${this._onMenuSelect}
        ></llama-controls>

        <llama-current
          .videoName=${(t==null?void 0:t.name)??""}
          .videoId=${(t==null?void 0:t.id)??null}
          .chapterName=${(e==null?void 0:e.name)??null}
          .sectionName=${(i==null?void 0:i.name)??null}
          .loopName=${s}
          .loopSourceLabel=${this.loopSourceLabel}
          .loopSourceType=${this.loopSourceType}
          .loopSourceStart=${this.loopSourceStart}
          .loopSourceEnd=${this.loopSourceEnd}
          .duration=${this.duration}
          .zoomLabel=${r}
        ></llama-current>
      </div>


      <llama-url-input-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-load-url=${this._onLoadUrl}
      ></llama-url-input-modal>

      <llama-video-picker
        .videos=${this.videos}
        .currentVideoId=${this.currentVideoId}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-pick-video=${this._onPickVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-video-picker>

      <llama-edit-video-modal
        .video=${t}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-update-video=${this._onUpdateVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-edit-video-modal>

      <llama-save-loop-modal
        .loopStart=${this.loopStart}
        .loopEnd=${this.loopEnd}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-save-loop=${this._onSaveLoop}
      ></llama-save-loop-modal>

      <llama-loop-picker
        .namedLoops=${this.namedLoops}
        .loopSource=${this.loopSource}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-jump-loop=${this._onJumpLoop}
        @ll-load-loop=${this._onLoadLoop}
        @ll-delete-loop=${this._onDeleteLoop}
      ></llama-loop-picker>

      <llama-marks-picker
        .marks=${this.marks}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-jump-mark=${this._onJumpMark}
        @ll-pick-mark-edit=${this._onPickMarkEdit}
        @ll-delete-mark=${this._onDeleteMark}
      ></llama-marks-picker>

      <llama-edit-mark-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-update-mark=${this._onUpdateMark}
      ></llama-edit-mark-modal>

      <llama-sections-picker
        .sections=${this.sections}
        .activeSectionId=${((v=pt(this.sections,this.currentTime))==null?void 0:v.id)??null}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-jump-section=${this._onJumpSection}
        @ll-pick-section-edit=${this._onPickSectionEdit}
        @ll-delete-section=${this._onDeleteSection}
        @ll-open-section=${this._onOpenSection}
      ></llama-sections-picker>

      <llama-edit-section-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-update-section=${this._onUpdateSection}
      ></llama-edit-section-modal>

      <llama-jump-time-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-jump-time=${this._onJumpTime}
      ></llama-jump-time-modal>

      <llama-chapter-picker
        .chapters=${this.chapters}
        .activeChapterId=${this.activeChapterId}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-jump-chapter=${this._onJumpChapter}
        @ll-open-chapter=${this._onOpenChapter}
        @ll-delete-chapter=${this._onDeleteChapter}
      ></llama-chapter-picker>

      <llama-edit-chapter-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-create-chapter=${this._onCreateChapter}
        @ll-update-chapter=${this._onUpdateChapter}
      ></llama-edit-chapter-modal>

      <llama-video-info-modal
        .video=${t}
        .chapters=${this.chapters}
        .sections=${this.sections}
        .namedLoops=${this.namedLoops}
        .marks=${this.marks}
        .duration=${this.duration}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
      ></llama-video-info-modal>

      <llama-jump-history-picker
        .jumps=${this.jumps}
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
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
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-options-saved=${this._onOptionsSaved}
      ></llama-options-modal>

      <llama-delete-data-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
        @ll-delete-data=${this._onDeleteData}
      ></llama-delete-data-modal>

      <llama-inspect-modal
        @ll-modal-open=${()=>{var a;return(a=this._kb)==null?void 0:a.disable()}}
        @ll-modal-close=${()=>{var a;return(a=this._kb)==null?void 0:a.enable()}}
      ></llama-inspect-modal>

      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .windowFocused=${this.windowFocused}
        .editScratchActive=${this.editScratchActive}
        .editScratchFocus=${this.editScratchFocus}
        .editScratchDelta=${this.editScratchDelta}
        .warningMsg=${this.warningMsg}
        .errorMsg=${this.errorMsg}
        .statusMsg=${this.statusMsg}
      ></llama-whichkey>
    `}}w(zo,"styles",x`
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

    .header-quip {
      font-size: var(--ll-text-sm, 0.85rem);
      font-style: italic;
      color: var(--ll-text-dim, #aaa);
      white-space: nowrap;
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

  `),w(zo,"properties",{currentTime:{type:Number},duration:{type:Number},speed:{type:Number},isPlaying:{type:Boolean},looping:{type:Boolean},loopStart:{type:Number},loopEnd:{type:Number},sections:{type:Array},marks:{type:Array},namedLoops:{type:Array},jumps:{type:Array},loopSource:{type:String},statusMsg:{type:String},wkPrefix:{type:String},wkCompletions:{type:Object},windowFocused:{type:Boolean},editScratchActive:{type:Boolean},editScratchFocus:{type:String},editScratchDelta:{type:Number},videos:{type:Array},currentVideoId:{type:String},activeEntityType:{type:String},chapters:{type:Array},activeChapterId:{type:String},zoomSource:{type:Object},loopSourceLabel:{type:String},loopSourceType:{type:String},warningMsg:{type:String},errorMsg:{type:String},loopNudgeDelta:{type:Number},seekDelta:{type:Number},zone2Mode:{type:String},loopSourceStart:{type:Number},loopSourceEnd:{type:Number}});function Q(o){if(o==null||isNaN(o))return"?";const t=Math.floor(o);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Bi(o,t){const e=new Blob([o],{type:"application/json"}),i=URL.createObjectURL(e),s=document.createElement("a");s.href=i,s.download=t,s.click(),URL.revokeObjectURL(i)}customElements.define("llama-app",zo);
