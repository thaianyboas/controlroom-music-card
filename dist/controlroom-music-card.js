/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class r{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const o=e=>new r("string"==typeof e?e:e+"",void 0,i),a=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(s,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return o(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",p=c.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:m},v="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):s.forEach(t=>{const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=g){var s;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,r=s._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=s.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=r,this[r]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var b;f[v]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:f}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,A=y.trustedTypes,w=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${(Math.random()+"").slice(9)}$`,x="?"+C,I=`<${x}>`,k=document,$=()=>k.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,P="[ \t\n\f\r]",_=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,R=/>/g,F=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,M=/"/g,H=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),D=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),U=new WeakMap,z=k.createTreeWalker(k,129,null,!1);function N(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(t):t}const W=(e,t)=>{const i=e.length-1,s=[];let r,o=2===t?"<svg>":"",a=_;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===_?"!--"===l[1]?a=L:void 0!==l[1]?a=R:void 0!==l[2]?(H.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=F):void 0!==l[3]&&(a=F):a===F?">"===l[0]?(a=null!=r?r:_,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?F:'"'===l[3]?M:O):a===M||a===O?a=F:a===L||a===R?a=_:(a=F,r=void 0);const h=a===F&&e[t+1].startsWith("/>")?" ":"";o+=a===_?i+I:c>=0?(s.push(n),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?(s.push(void 0),t):h)}return[N(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class q{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const a=e.length-1,n=this.parts,[l,c]=W(e,t);if(this.el=q.createElement(l,i),z.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=z.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith(S)||t.startsWith(C)){const i=c[o++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+S).split(C),t=/([.?@])?(.*)/.exec(i);n.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?Q:"@"===t[1]?X:Y})}else n.push({type:6,index:r})}for(const t of e)s.removeAttribute(t)}if(H.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],$()),z.nextNode(),n.push({type:2,index:++r});s.append(e[t],$())}}}else if(8===s.nodeType)if(s.data===x)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)n.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,s){var r,o,a,n;if(t===D)return t;let l=void 0!==s?null===(r=i._$Co)||void 0===r?void 0:r[s]:i._$Cl;const c=T(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(a=(n=i)._$Co)&&void 0!==a?a:n._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=G(e,l._$AS(e,t.values),l,s)),t}class j{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:k).importNode(i,!0);z.currentNode=r;let o=z.nextNode(),a=0,n=0,l=s[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new J(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new ee(o,this,e)),this._$AV.push(t),l=s[++n]}a!==(null==l?void 0:l.index)&&(o=z.nextNode(),a++)}return z.currentNode=k,r}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{constructor(e,t,i,s){var r;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),T(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==D&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=e:this.$(k.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,r="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=q.createElement(N(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.v(i);else{const e=new j(r,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=U.get(e.strings);return void 0===t&&U.set(e.strings,t=new q(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new J(this.k($()),this.k($()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Y{constructor(e,t,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(void 0===r)e=G(this,e,t,0),o=!T(e)||e!==this._$AH&&e!==D,o&&(this._$AH=e);else{const s=e;let a,n;for(e=r[0],a=0;a<r.length-1;a++)n=G(this,s[i+a],t,a),n===D&&(n=this._$AH[a]),o||(o=!T(n)||n!==this._$AH[a]),n===V?e=V:e!==V&&(e+=(null!=n?n:"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}const Z=A?A.emptyScript:"";class Q extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==V?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends Y{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=G(this,e,t,0))&&void 0!==i?i:V)===D)return;const s=this._$AH,r=e===V&&s!==V||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==V&&(s===V||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const te=y.litHtmlPolyfillSupport;null==te||te(q,J),(null!==(b=y.litHtmlVersions)&&void 0!==b?b:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie,se;class re extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,r;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let a=o._$litPart$;if(void 0===a){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;o._$litPart$=a=new J(t.insertBefore($(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return D}}re.finalized=!0,re._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:re});const oe=globalThis.litElementPolyfillSupport;null==oe||oe({LitElement:re}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");const ae="1.0.77",ne="spotifyplus",le="media_player",ce="spotifyplus-card",de="item-selected",he="item-selected-with-hold",pe="show-section",ue="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWMAAAFjCAYAAADowmrhAAAAxnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVBbDgMhCPznFD2CMOrqcdxX0hv0+EXBZnfTSRxGRhGh4/M+6dUhHCmmpeSac1DEGqs0FSUY2mAOcfBAhiu+5+lniEZohBklW+SZ9wszclOVLoXK5sZ6N2q0KOVRyB9C70hU7F6oeiGIGewFWvOv1LJcv7Ae4Y5iizqdm9SeS6t5z31cdHp70ncgcoARlIFsDaCvRGgqoMx6SBtGVi2DgTkTHci/OU3QF40xWljv26gBAAABhGlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TpSIVByuoOGSoDmIXFXEsVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIu+Ck6CIl/i8ptIjx4Lgf7+497t4BQqPCVLMrCqiaZaTiMTGbWxUDr/AjiEEMY0Jipp5IL2bgOb7u4ePrXYRneZ/7c/QpeZMBPpE4ynTDIt4gnt20dM77xCFWkhTic+JJgy5I/Mh12eU3zkWHBZ4ZMjKpeeIQsVjsYLmDWclQiWeIw4qqUb6QdVnhvMVZrdRY6578hcG8tpLmOs1RxLGEBJIQIaOGMiqwEKFVI8VEivZjHv4Rx58kl0yuMhg5FlCFCsnxg//B727NwvSUmxSMAd0vtv0xBgR2gWbdtr+Pbbt5AvifgSut7a82gLlP0uttLXwE9G8DF9dtTd4DLneAoSddMiRH8tMUCgXg/Yy+KQcM3AK9a25vrX2cPgAZ6mr5Bjg4BMaLlL3u8e6ezt7+PdPq7wfBdHLGjypcUQAADXZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6ZDY5OWJiMzAtOTJmYi00Y2U4LTg0ZmUtMzc0MzU5Mjc2YzE2IgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0ZDEzOTVlLTUzMmUtNGU3Zi05NmI4LTU0ODc4NjdlZjRkNCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjFkODdlMDZiLTcwNDQtNGVjMy1iNTE3LTU0YmJlYjBlZTNlZiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNzQxODE0NzkxODEzNDYzIgogICBHSU1QOlZlcnNpb249IjIuMTAuMzYiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1OjAzOjEyVDE2OjI2OjMwLTA1OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyNTowMzoxMlQxNjoyNjozMC0wNTowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY2ZTU2M2FmLTE4OTctNDU0Yy1hN2ZjLTcxMTM0YzI5YjFhZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNS0wMy0xMlQxNjoyNjozMSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5srmYUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6QMMFRof1yGzNwAAIABJREFUeNrt3XmYHFW9//F39WQPW9gCNUMSQthRAghyFVlE4MI1B7gILqx62bQmKN77A1EvgiCCioLkuCAql0WWq6I1yBJlFUUDhOViwhIg2xSJLAkJWSfT9fvjnJBJMpNMz/RS1f15PU8/M5OZzHR/6/SnT586dQ6IiIiIiAgEKoFkURhHWwLD/G1b/8/DgJEl/JrZQKf/fA7QGcD8dmM7VGFRGEvDao6jgSnsCITAGGAH/7EZ2AQYBWwJDK/C3Xkd6ABmAfOAN4HEfz0LmJkYO1tHTRTGktfAHZTCrsB4YCywE7CH/3xEDh9SArwKzABeAZ4FXkyMfUlHWxTGkpWhhNHA3sA+wL7Afr6X2yhmAI8DzwN/B6Ylxr6hliEKY6lk8G4OHOhvHwY+VKXhhLx5HXgMeBJ4PDH2zyqJKIylP+E7EjgE+ChwhB9mkL55Cvij70U/khj7jkoiCmPZUM/3MOBfgSNxJ9qkMp4G7gfuT4x9WOUQhbECeDxwFHAibrxXqq8TuBe4G2hLjE1UEoWxNEYAHwUcDZyKm0Ym2TId+B1wZ2LsMyqHwljqL4BPAE7GXTgh+TATuB24Q8GsMJb8BvCHgdMVwHVjFnAbcFNi7HSVQ2Es2Q7gscCZwGeB7VSRuvUC8GPg5sTYBSqHwlgyoCWOmopwEnAebg6wNJbfADckxt6nUiiMpTa94D2As4FWoEkVaXjzgB8C1yfGvqVyKIyl8iF8HPAl3AUZIt25FbgmMfZJlUJhLOUN4GG+F3whGguW3psCfCcx9jcqhcJY+hfCI3HDEBehoQjpu3nAVQFYreWsMJbSQngX3Am5SNWQMloKfA+4OjF2kcqhMJYNh/AlwKdVDamgTuDbwHcVygpjUQiLQlkUxpkJ4ZHAlcAZqobUOJSvCOAyjSkrjBsthDfDnZT7iqohGbIMuKAAP5prbFHlUBjXLX+13HnAd9HsCMmu+cAXEmN/q1IojOuxN/wJYBKlbTUvUktTgLMSY59TKRTG9RDCuwPXAwepGpJTNwLnJ8YuVCkUxrnTHEfDUrgC+KKqIXWgE/hCE8ENc8wkjScrjHPTGz7J9yaGqhpSZ54HzkiMfUqlUBhnOYSbgf8BDlc1pM5NCuD/tRu7XKVQGGfGDnFroZP0PNylppolIY1iIfCZxNh7VQqFcRZ6w2OBO9HuytK47gA+r11HFMa17A1PBK5RNURYBpygXrLCuNq94Wbg9+oNi6znpgC+0G7sEpVCYVzpID4DuAGNDYv0ZD4wITH2CZVCYVx2zXE0PHXT1T6haoj0yjebCC7VvGSFcTl7w/sDk4EtVA2RkjwOHJ8YO1+lUBj32Y5tE4MVafF84GpVQ6TPioBJjP2DSqEw7ktveFPgduAYVUOkLK5sIviahi0UxqUE8e7AQ2iFNZFyexx3cu8tlWJtBZVgvSD+DDBNQSxSEf8CzAjjaLxKoZ5xt1ri1kKR9GrgS6qGSFWclhh7s8qgMO7aG94UiIFDVQ2RqvpBgeC/5mocWWEcxtEY4BFglJ4XIjXxAHBs0uBX7TV0GIdxdJAPYo2di9TWDODgxNjXG7UADRtCYRydCvxZQSySCeOAaY18Yq8hgyiMo28AN6n9i2TKFsCTYRwd3YgPvqGGKVriqKkIPwS+oHYvkmlnJcbeoJ5xHWqOoyFFt9CPglgk+34WxtHX1DOuwyBO4V40dU0kb749MAi+NmvCpFRhnHNhHG2Bmzqzr9q1SC7dUoAz5hrbqTDObxBvDjyJO1MrIgpkhbGCWEQUyA0WxgpiEQWywlhBLCIK5MYOYwWxiAI5r+pmnrGfNaEgFmkMpxThxpY4qptd2usijJvjaAhu+pqCWKSxAvnnCuMMBbG/oEPziEUaz+lhHF2hMK6xljhqSuFn6Mo6kUZ2URhHud+hJ9dh7Bf9OUVtUaTh/cAvi5tbuZ1N4ZfBvERtUES6ODwx9kGFcfWC+FS0HrGIrK8TeF9i7HSFceWD+CDcDh0iIt1ZCOySGPuGwrhyQTwGeAVtlSQiGzYjgL3ajV2Rlzucm1AL42hTtHmoiPTOuBRuy9NFIbkItpa4tQDEwCi1MRHppeOL8A2FcRkVSa9Gc4lFpHT/HcbRSXm4o5kfMw7j6DPArWpTItJHncCeibEvKoz7HsS7A9PUlkSkn+YDOyfGLs7qHczsMIU/YfeQ2pCIlMFI4Pad2iZmtgOayTDe0RXsdl9AEZFyOGZZWvyawrgEK9Li+cAxajsiUmaXhXH0kSzescx12cM42h+YojYjIhWyEBiXGPuWesY9aI6j4cBktRURqaAtgJt2zNj4cabCOIUbfaFERCrpmBVp8fNZukOZeWUI4+gM4JdqIyJSRe9LjH1eYbwmiJuBWUCT2oaIVNHLAezZbmxHre9IzYcpdnDrTvxeQSwiNbBzCpdn4Y7UPIw7SScC+6lNiEiNXBDG0YdqfSdqOkwRxtFY3PrEIiK1ND+AHduNXdZwPWM/PHGn2oCIZMDIFL5dyztQszDuJD0PDU+ISHZ8MYyjmmVSTYYpNHtCRDJqdgHGzjW2s1F6xv+jIBaRDBpVhIsaomfsV92/Q8dcRDJsx8TYmXXbM26Oo2HAT3WcRSTjbqj2H6xqGKdwBVp7QkSy7/Bq751XtWGKMI52BV7QMRaRnJgfwKh2Y1fWW8/4Zzq2IpIjI1O4uK56xmEcfRxo07EVkRxqSYxtz33PuCWOmqjBYLiISJlcU40/UvEwLsJ5aGNREcmvT4RxdGCuwziMo82A7+pYikjOXZv3nvFF6Eo7Ecm/A8I4+vdK/oGKncAL42gkME/HMLMWA53AIqDoP6bAO/77M4B3/b/9n/8ZgAW4dUW66hhA8I9CL1vTyjTdHNhxnX9uAvbq0ia3Z83w1k7Apv57m3fzsQBsokMqFfZSAfao1LoVAyp4xy/Vsau6RT5MFwNL/dfTgBd9iE4HXhoYBEsKPvOa/GvyjAk/TKt4PxcCT3fz70/29heMa5sYpF1eIYqkdKTpdj7E9wJGAOOAPYHhwDAf3Jv5YC+ouUiJdinC6cAvctMzDuNoFx8AUj6rfIi95T++Djzj6/zMwCB4MQCaCHhlwnWpyrW+ndomBp2kpLA6uHfxt/E+wLfocttMFZNuzCsQNM81k4p56RlfomPWZ28CbwD/BKYCTwFPDgyClwJg5oRJCto+WudF6nV/e6Trz4z1gd2ZpoUivB/YF9gHt/b2Vv62parZsLYrkp5Rid5x2XvG6hX3Sup7uPOBucCDwL1+3DVV4Ga3Z71q7aA+CPgIsKsfFhkJDFKl1DvOSs9YveK1FX0PbL4P3T83EdxdCEhnKXTz2rPuxI15Pw1cB7Bj28SgM01ZRboXsD/w78AoYDtgG1VPveOq9ozDOBoHvNzor5o+eP8I3NtE8HCTersNa3Rba+B70h8DjgYOAbYFQlVHveNK9oy/1IC93tm4YZn/BW4fGARL1eOV1Xxb6ATu97fuAvqjfohjW1UsV73j04AbM9czbpB5xUXcHNupwC+aCO5Tr1fKYVRba7AqTTcFjsdNnxoNNAODVZ3MeikxdtcshvFlwNfrdNjhBeDGJoKbFb5SDWNcOBeKcBjwOdyMjh1wc6YlO45LjP19ZsK4OY4GprCM+rj0eSXwqn9L+b0BBO2zjcJXamts28SgI02DTtIDgFbgAB/OQ1SdmpqSGPvBzIRxGEfnUYWFNCrsVeD7TQQ/HhAE6Wu6cELy0XP+N+AsYG8fzlJ9+yfGPtnfX1KuMH4dN4Unj2YCZw8Mgj/pxJvklR9z3gQ4F/gM7lJwrddRHbcmxp5S8zAO4+g44K4cFrAT+PHgoHCeesFSb1ri1kKR9BDgy7irB7dXVSpq28TYN/rzC8oxtS2P09k6gJMTY/9XbUjqkZ//+hDw0Ki4tbCKdDRwIXAkMIYqbkbcICL6ecFbvw5IGEd7AP/IWdFWAUcnxv5J7UcaTZfhjC8DpwBj0Qp25bB0AMEm/TnZ39+DcHYOi3aWglga1ewJk9LE2MWJsZcODIJdcCvUXYJbv7qoCvXZsFWkx9WkZ9wSR01Ft17usBwV7PbE2E+r3YisbXRba9CRptsC/w0ch7vgRErzSGLsoVUP4zCOPg38KkeFWghslxi7Qm1GpGc7xK2FTtLdgG8DH8YtGyq9s1Ni7Kt9+Y/9GaY4L2dFsgpikY2bYyYVE2OnJcYeWyAYCUwAnsVdECUbdmZVe8ZhHI0FXslRgRYnxmrnBpE+2rFtYrAiLW4CXA58kjX7E8raFiTG9mnzgb72jE/LWYEmq42I9N1rE65bfeLvi00EIXAobs/CVarOWkaEcXRUNcP4nJwV6Ea1EZHy8MMYjwwJCgfgtqD6BW7DW3H+oy//qeRhijCO/gX4a54qkxirCe4iFeRnV52Ju7BkDI19UUknsFli7NJK94w/m7PCtOupIlJZc43tTIz9aRPBONy+gE/TuPOWmwBT6n/qSxifnLPCvK2nikh1+CGMvwwKgtXrYTwMNOIsplNL/Q8lvZXwA9P35awoDyfGHqaniUhthHG0KfBL3HKfjbT+8paJsb0eSy+1Z3xCDgsyQE8HkdrxszA+gdvj73pgSYM89BNL+eFSw/jkHBZkaz0dRDITyucU3HoY1wPL6/whTyjlh3s9TBHG0ZH43W1z5p3E2C30VBDJlgYZvhiWGLus3D3jY3JajM3DOBqnpi+SyZ7y6uGLP1GfF5D0elZFKWF8Uo4L8lk1fZHshvKwoHAkbquoJ4F62nmn1+fZejVMEcbR+3ELheTV9MTYPdTsS9McR8Nwz4xBwMAuL+DrLps6ABhcwq9OgaU9/NvqJ+LywE2ep73EyfOSX34pzwOB24FRdfCQlibGDi9nGF8IXJnzohyQGPtEg4bqEB+oQ3yQDsZ9vQ8wFNgTt0zimC4fu75zCtZpM0E37ajUK66KPYR02uXzdX/2Wf9Wdgbwjv96hf/YgTshtBRYFcByhXh++WU8I+AyYPOcP5xDE2MfKVcYP4nb1DDPHk+M/VCdBu1wH7TDcRPtd/dB+35gvA/VoMvHvoRn1q0O8mKXAE+B54DZ/jbVB/e7uOlVSxJjG2WaVS75y6xvBT6Bu7Itj65KjP1Kv8M4jKOh3bylzKtPJsbemdPA3cyH7da4y00P9i+Q23YTtrLxXnmxS3g/BzyFG698CrcRwZIAlqh3nQ1hHB0I3AOMyOHdn5YYu2c5wtgAv6+TY/ou0JIY+05GQ3dQ6uZgbuqD9nDgMGC0D9oC2jyymmFdxG0t9ogPgil+eGRhYuxilanqgTwcmA7skMO7v11i7Pz+hvFPyN+SmRvyXAAHtvdy7l8Fg3eoD97tcZPDDW7stsnf1MPNblB34saoHwPuBh4C3gxgkXrSVQnkF8nfHn2fSoy9o79h/CqwY50d02cD+FC1njj+ZMTWuN0RTsBt+Lh7l+CV/Ov0txk+nH8FzAHe1rh02QO5BXgJd/I5L25KjD29z2EcxtFIYF6dHtM5wP4be+vQx17vgBS28YF7JnA8bvqX1slovF70KiDBTdW6A3g9gAXtxmo/uf4F8lm4S6rz4vXE2LA/YXySb0D1/GT5YgDX9+fJMaqtNViVptsAewHn+mGHger1SjdW+dtjuFkCDwFvqvfcp0B+AvhAju7y6MTY2X0N43obL+7JfODzwAOJsYt62RCG4yaln+ZrtKl6vtKP3vMM39O7G/inThD26jm4P+6kal6cnhh7U1/DeAawUwMd3w7cllLfx013WsKaeasBbmrZeKAVN7VsIDrRJuWV+nb4LPATYHIAb7Ybu1yl6Taj/gHk5eranybGnltyGIdxtBluGk8jPyk6WXMl2Op5vJpaJtW0eubG/cD3gGmDg8KC1yZcl6o0EMbRxcClObm7ryTGjutLGB+BtrgXyeK7twT4IXBnAP9s5JOBYRxt7+uRF5v3NBS6oV7eh9TuRTJnIO4ioKuBmSksDOPoB2Ec7dLsrpZtKImxrwNv5Oguf7Cnb2wojD+sdi+SaU24ubZfAl5I4e0wjm4L42j3BgvmPPWMD+zpGxs6+7+f2rpIbgS4xaI+BXwyhRVhHP0O+GYAr7YbW887NOepZ/yBksI4jKMdgC3VvkXqIpiXh3F0PXBNgWDOXDOpUyWqmf17+kZPwxT7qGYidRPMQ4EvAjOKpPPCOPp8GEdb7tQ2UdMyq2/7MI62KSWMx6tmInWnCbcE64+AecvS4iNhHL2/OY4G5/xx5e1d/B6lhPG+arcidW0gbl3sZ1JYEMbRBWEcbZXTxzImZ/f3gO7+sacTeDp5J9IYVg9jXAVcHsbRg8D5BXhprrGZH1sO42hMDnvGe5bSM25RGxVpyN7yUcDzRZgXxtERzXE0JOP3OY+71vcujMM4ep/apEhDK+DGlif7uctfCuMoq5uCnpzD+u7T257x3mqLIuINBX4A/DOMo++GcZSZIYEwjg7HbbqbN01+gfyNhvGOan8iso5BwH/hhi9uCuNo2wzcp6tyXM+dehPG49TuRKQHA4FTgblhHN1cq1AO4+hM8j3RYLfehPFOam8i0otQPsWH8k+rOabsZ1D8KOf1G9ObMN5D7UxESgjls4H5YRx9s9ntgFMxzXE0DLdl1cCc1229nA3WeaADU9BGiY0hxR3rlbjdTFb4f1u9oMxU/+8rcbtOrPYCsLgfT9y9u7S7XYHNcFeG7e07B4P991dfFTbYf3+gDlkuLAdOD+CudmM7ytwj3g74CzC2Dur0fGLsWjPXBqzz7AzVlurmCbGiy206MBN4GXgGmAa8G6zZXj71n6dVmOh/34a+2RJHTUCQrtnMdUDqwnkA7jL9Uf62j78NxZ1cGuQDe7AOf00NAe5I4c0wjo5oInhujplULEMQ7wM8gttrsh6M3WDPOIyjQ3G71Uq2dfrAXYbbp+/vwBP+9kzgdyAOoHOusavquRAtcdTkg7sANKUuDPbvctvXB/ZQHxRaHKd6isCDwGl+Efi+hPAWuI1aT6DOtjwLYFDXdw/rhvHpwI1qQ5kK3SU+dF/G7Rz8F+C5wG2/s6rcbwXrzei21mBVmg70PexBuDPwBwITcNM4hwDD0M7eldQB/An4QgDJxraJ8sOlI4Bv42Zu1OsQ1ZjE2Fk9hfHXgcvUdmpipQ/eN/27k5t96K4MoCMP6wTktFc9MHVP9v1wW419GhgJbOJ701LenvJS31v+NfC4f4e32iHAscDRvvZNdV6PQxJjH139xbq9AV3wUb1GuRhYANzjg/f5AFY28uaS1eZf4FYP+Tzsb1e0xNGAFAanbvz5Uz4g9lFA91vB19D4W6Mb1fWLdcN4a9WnYm/TFuFmJdwM3BXA8kFBYaW2XM9kSK/Cjbsvwc1n/VFzHA3ABfQoH85n4VYL20RDHNJHozcUxtpqqXzhuxg3c+FK4G8BLNf4bn61rwno6f52ZXMcDfYnDP8NN7a5P+5s/yBVTHph0IbCeLTq0yepD98XgR8Cv1f4NkRAr546+CvgV/7E01Dc2OcXfDhvrp6z9GWYYrjqU1Lv9y3gTuCHAbS3G7tcZWnocO7w7aINaPPhPAz4OHAB7hLYTdH0OnG21zBF/3rAb+BWi/pZAZZqloNsJJzfAW4Fbm2OoyEpbAt8GXdicAQa0mhkw7p+8d4rdBhHm9D3y1wbwTvA5wJo0/CD9FdLHDUV3TvRTwIXAtvpnWnDmZ0YO7q7nvEWqk2P/h7AoRqGkHLx76gWAT8b3dZ6w6o0HZrCYcBFuHU6NlGV6l6hp2GKJtWmW78twEkajpBKmTVhUoq7GOIPwB+a42hoCnsBV7NmfrPUn+16CuMdVJv1PNREcGI5FjoR6a12Y5fh1hk52AfzAcA1wC6sM84ouTagxy9kLW8EcKSCWDIQzI8A+zTH0fDUzcy4wneetKxoHSn08LnAxPY6X/FMchfMSxJj72gi2Bk3K+NK4G3cLB/Joa4bvHbtGY9Sad7zfGLsHSqDZJF/t7YQuKg5jr6Ruq3SfgR8EK2dkTfD/AvqWmGsiehrXK8SSE56yytxl2cfFsbRpsDngK8C2+g5nS8amlhfZ4HAqgySN4mxixNjrw2gBdgTt3WW5sQrjHPrhbk6aSf57i13JMZOHxgEH8CNLVvcCnSSYZpN0U0HQyWQeuDnLy8EWpvj6ILUXe33HWArNIShnnEOqAch9dhbXpoY+8sAmoFDgTm4TQ5EYSwiNQjllYmxjxbcrj574fZW1NWlCuNM0ts3qXtzje1MjJ3eRLAbLpinKJQVxlmzjUogjWKOmVRMjJ0zMAgOVCgrjLNmd5VAGs2sCZPSdUL5CTSmXFVdZ1Oo8M6IMI4OSIyd0igPeIe4tVAkbcKvdZCuWfOg0OUF+wPrvHjvV8KL+dR1elsv4taHBrevHIH7mPqvU60ZXbtQBubsELce2Em6KxDjrvDT8F0Vw3iWyvGeS4Gj8/4gWuKoyQdrU+qO9VBgvA/WbXGrgO3d6YK4iTW7Tgzq0j4q/e5ppX8BWOU7BKuAYhhHHf57zwJPA2/irjR7GugI3MUMqwKCVZoXXpnhC2B6SxztVoQPA7fhtglSKJdRAPO7fO6EcXQQ8GeV573e2qjE2Nezfkf9FvKDfOhuhpu2dChuM8ztfbAO8L3eelnlayUujFff3vZvqx/2H2cH/mfUwy5bOxucwunA93D7+EkZJMYG3YXxh4HHVJ73PJoYe0jGermDfegejOutHAOEwGB/05KKa15Ml/vQXr0E5YO4xduXBrDC7+wspYfysBS+C5yl9la5MN4BmK3yrGViYuykGgXvkNRthXUscJwfXhjmQ1dXTvavV70MeNeH9K9w22otCWCldnTpnTCORgD3sf65BOm9txNjt+oujFtwV+XIGkXgXxNj/1iFt4BDgI8BpwIfwm1OqV0dqnecl/rbFOAW4IEAljQRLJ9tJmm94G6MbmsNOtL0IODXuHMQUpq5ibE7rBfGPpDV6NbXCZwzJCj84tUJ1/W7PuPazguWpZ2DUze++yngTNxa0sPV481kQC8G2oCfAC8XYPlcbTqwbmdiSArfBL6M9tIsxUuJsbsqjEt/Yt4TwEl+G5xSG+vA1J30ML7BjsJ9rbd3+bLCh/MU3GLujxZgmcL5vfwYDzyEdprvrbXOS60bxu24E0LSvaW4Va+uHkCwpKe3rzu2TQxWpsUhqZs69hXgCGBz9XzrzkrcfOkHgR8F8FSBYFkj75sYxtF2uCmICuSN+9/E2JN6CuNZaPul3liOmx94H/Bb4Hnfe34fblqZAcagLdYbzTLckpU3ANcFsKgRZ22EcbQnbj64Zlts2C8TYz/XUxg/gps2JSL9UwQWAX8FvhHAtHZjlzZQIF+Mu3hKenZJYux7NVr3bbOmtomUR8G/VT8GOCaFJWEcvQhcHcDvBgWFZa+V4YRwViXGfjOMo08Du6kp9GhB1y/WDeM3VR+RihgO7AvcmsKyFWlxdhhH36zzYP46btqbdO+tdV+9FcYi1TUU2NUH85sr0uL0MI6OaI6joXXWO/4NME+Hu0czN9Qz1mJBIrUJ5sl+KOMp4NwAXmk3dmUdPL5nge10mLs1W2Eskk3DcSfQp6XwVhhHvwIubiJYlOPpcr8DjtKh7fadw1pXPBc21G0WkZrZCpgIzO8knR7G0ZHNcTQoh4/jbzqU3Vpv+KawoaQWkZobhLt46P4U5oVx9MMwjjYf2zYxL+sKL9Qh7NarGwzj1ZmsOolk0gjfW563PC1OCeNol5Y4yvpaEIN02Lr1Sm/CeIbqJJJpQ3BLV75QhNlhHB3lNxnI6n2VPobxK6qTSC4EuLVk7kshCePo/AyOKx+mw9St13oTxtNUJ5Hc2Qb4vh9XviqMo6yshX2MDk23ejVm/KLqJJJbI4ALyE4o761D0q3pvQnj51QnkdzbtNahHMbRacBIHYr1LEiMfWvdfwx6KKIWmRepL4uBSwK4rho7Zo9xa3q/BIxT6dfz58TYg3vTMwa3Pq+I1FdP+Wo/pvypSk+JW5kWr1AQ96jbfO0pjKeqXiJ1aUvgNj8lbvyYttayXzwSxtEBwP9TqXv0TClhrJ6xSH0Lgakr0/SJMI62LmMQ74Tbhkobk/ZsWilhPEX1Eql7AbAf0B7G0dXNcTS4n0H8Ud+RG67SbrDoU3o6GN0VdTPcRosi0jjeBE5qIniklFXimuNoUAq3AcehHc835pXE2HG9DmMfyNopujGkuP3ail0+T/3tbdzk9JWsmfL4FmtPWF9AaVdttrD2+ra7Apv5t7V7+4/j/cfVT+zVnwd6slfFXOCLAdzdFAQdsyesvwt6SxwNKLodz68CTsKdIJSNuykx9vTuvrGh69kf80WW/Or04br641TcMqmzgP/D7eDb4cN2GZAGbufrVRWc/tTrtU+a42gIUEjd+gZDfRgP92G9L24n8z2AnX1Irw5tBXb/tAC/SWHxqjR9K4yj53xbWYzbAX180b2gbo3Ghkv1VE/f2FAY/1VhnKuwfRd4ssvteR+wywNY1m7ssrw9uHZjl/tP191V+UXgjjW9tNZCkXSYD+xhwBjgEOBQ3II6g3xoDFCTKcmm/jYGMCpHWfy9p29saJjig2hh6KwMI3T62xLgYeBRf3sDWBrA0i7BJev3sIembihkCx/OE3BrJgz2Aa2etFRFYmxQchj7QNaVeNXv6a7yoXsPEK9+exjAojz2brPMn6jeDDdWbYBP+t61Aloq4cnE2P37MkyBf7v7AdWwIlb58H0a+BPwG9/TXZgYu0TlqUovZRGwCHfC6g/AOT6gtwT+BTjbfxyAxkal//60oW8O6MV/VhiXr8c7FWgDfg0sCmBhu7ErVJ5MBvRM4DY/bWtr3AnDs4GPsWYMWqQUj2/omxsbpjgSuF81LMnqE2oLgBt8j+u1AN5W8OZfl3A+GPhP4P3AwI09l0SALRJj3+lrGA/GTXWSDUtxGy9eBtyFWyJPF800gDDbsT6OAAAO60lEQVSONgW2B84DTsPN5lCvWdY1LTF2zz73jH1jexJ3yaR0723gmAI8OdfYTpWjoXvNA1K3fu+JwH/h5uIqmAXgmsTY8zf0A72ZdzlZYdyjR4F/S4x9V6WQdmNXAe3ANcA1YRxth5tCdwnualYFc+O6d2M/0Jue8cHAI6rleh4J4IhqLNQt+eeD+UTgUtxlxJo611iGJhu5FiDoZUNapVf1tbwSwG6+JyTSazvErYVO0lHAObhx5mGqSt17LDH2Ixv7od6+Ot+jeq7lRAWx9MUcM6mYGDszMfaiwM3KOAD4C24GjtSntt78UG+v1b8bdwmpwF8SY59WGaS//BWVTwAH+WGMTwKXA5uoOnXlvt78UG97xrHq+R6rEki5JcbOS4y9NoCtfG/5Wdycdcm31xNjnytbGCfGzqOHrUIaTEehy2phIhXoLa9MjH0iMXY8sCPwczSEkWd39vYHSzmje4vqSvtcY9VbkWr1lmcnxp6Jm7v8JdySqJIv9/b2BwuV+KV1TCftpBah/FZi7LU+lD+FWztDsm9pYmyvl5MolNAgnsEtniIitQnlxYmxdwTuyr7DcXvWSXb9upQfLnXi+e0NXtwRal9Sa+3GLkuMfTBwa2J8VKGcWb8t5YdLWmkqjKPxuPV3G9lWibFvN+IDHxW3BgBFCNx2eWvaUdq7xpau/XWQBpASQHebXkrv+DUxDsYtUrWZKpIJnU0Eg0rZZbvkZf/COJoJjG7gIl+VGPuVPD+AHdsmBp1pGhRJg9S1gQAYkLrlILfCncXfFbf55z7++wNxG4OC2w2j6xWZg/33N2YZa88MWP11itvdpIjbhbrDf3wbmBG4aV6dLsyDtBBQVHh3G8pDU7djyc/9sZPa+Vli7NkV6xn7ML4UuLiBizwrMXZM1nuwRdKC77EOSt22QuNxCz7thtvJYrB/wm7Cmr3gsqwDWIHbePVd3E7Fz+J2250auNsqCNJBQVB8dcJ1DRvWfreSc3EXkAxEauFfSzl519cw3g2Y3uCFvjAx9js1Ddy21qCYpoXUBe5o4CDcjsjj/VvVTXA7+zbS2gdLfEi/jZsX/zDwUAAvBQTFuSW8ZayTUN4at4LcZ9Di99W0IDF2y1L/U9DHgzzVv31tVB3AuMTY2VUM3QEpHOgD9yBgrA/bLXDbAEnPluMW/5+Pu/z4zgAeDQg6GiGgwzjaCbc+wu5qClWx0bWLyxnG5wI/bvCCLwLeV85AHhW3FoqkhSJsg5tPegiwJ27JxRE5GErI2wvqW8A83NordxRg+oAgKM6sw/Fov1rcIcDv0Em+ShufGPtstcJ4OG7crtEtAY4dGhQefKXEMUofvEERdsKddDketwD5SNwJMqnNC2yC21Dh5wX4R72Fs3/uXgh8XUMXFfFCYmyf3oEE/TiovwZOUO0pAn8GThpA8MZss/4Td2zbxGBlmhaKpJvhVub6d2BnBW8uwrkdN2XsuiaCf86pk2GNMI72wo2pb6XDXFbnJcZeV+0wPhR4SLV/TwrMAqYCf+zy7wcC+/vgVcPPt3n++F5XgD/mfc/DMI62BZ7HDYtJeWySGLukqmHsD+ZMGnvOsTR2r/lV4LoAbhkSFDpeyeF0On9y73nWzCGXvrs5Mfa0vv7n/u7Dda3qLw1qM9w0wp+n8M6ytPhsGEf/0RxHuZrZkhj7Cm7DVOm/n/TnP/e3Z7wVui5eZN0e8wzga00Ek/MwxtwSR01FmItbgEj65qXE2F378wv61TNOjH0LuFnHQWStHvO+wL2dpPPDOLojjKNwTFtrZmcu+LFvnf/pnyv7+wvKsV24hipEurc1cBLQvjJNXwjj6KzmOMrqXPGrdLj6bGlQhs03yvJqHcbR33H7donIhi3AzbY5a1hQWDwjIyf9xrZNDJanxWW4dUqkNN9JjL0wCz3jsnTRRRrECN9bXrA0LT4dxtH+WRjC8K8IK3R4+uT75fglZQnjxNi7cHMwRaT3z729gSkr0/TlMI5OHp3hcWXp0W2JsfMzE8bepTouIn2yE3BLR5q2h3H05ZY4aqr2HSi6vrGGKEp3dTlfncsicAtaL9WxEemz7YGrizC32qHckab7KoxLNjkx9qnMhXG7sR3Af+v4iPTbdjUI5S+o7CUr67myQpnv3A2sva2OiJQnlM+t1B/xY9XHqtwlmZIYW9a52WUN48TYRcC3dZxEyh7KPw7j6LUwjo4s9y/vSNNvoUWsSvXVcv/Csp+99ftvvc3aG1aKSPk8BxyfGPtqGZ6vuwL/h/bKK7VX/MFy/9JyD1OodyxSee8HXg7j6O7mOOrzHod+ofnHFMS17xVXpGes3rFIVS0BLi3A1XONLZbwHN0Ht7i8tmDKQK+4Ij3jLr3jC3XcRCpuOPCdIkwP4+hjvekNh3F0G/Ckgjg7veKK9YwBmuNoUOp25NW2QiLV8xrwIHA7MMffdgMOx+2zuB/aTbyvJifGHpW7MPavwmcCP9MxFJE60Kddn3urUMl7XoBfArN1DEUk526rZBBXPIz9otWRjqOI5Nx/VvoPFCr9BxJj78ZtZS8ikkffSox9Pfdh7J2j4ykiObQsgMur8YeqEsaJsdOBn+q4ikjOnNVu7PK6CWPvQrSIkIjkx5TE2Fur9ceqFsaJse+gZfpEJD/OreYfq2bPmCaCG4CndIxFJOOuTYx9um7DeI6ZVATO0nEWkQxbGFTwsudMhDGAf7W5VsdbRDLqc+3GVn0LuUItHmkAXwHm65iLSMbc43e7r7qahLGfKvJZHXcRyZBO4PRa/fFCrf5wYuy9wE06/iKSEZ9PjH2z4cIYIIDP45bZFBGppccSY2u6wmRNw9gPkn9G7UBEaqgTOKHWd6JQ6zvghyt+ofYgIjXy2cTYfzZ8GAME0IpmV4hI9d2VGHtzFu5IJsK43dhlwDFqFyJSRQuB/8jKnSlk5Y4kxk6lBle9iEjDOiExdoHCuBtNBFcBj6uNiEiFXZUY+2CW7lCmwtivXXEssExtRUQqZGoAX8/anSpk7Q4lxr4BTFB7EZEKKALHtBu7SmHcu0B+APiW2o2IlNnRibGZnLlVyGrFCgQXAw+o7YhImVyeGDs5u5mXUXPd+PEJ6HJpEem/BwoE38jyHQyyXsEwjnYHpqktiUgfzQd2ToxdnOU7Wch6Ff3O0ierPYlIH3QCh2Q9iHMRxj6QfwV8V+1KREp0YmLsi3m4o4W8VLQAFwH3qG2JSC99vVa7dvRFkKfKNsfR0BSeA8apnYnIBtySGHtqnu5wIU931i8odBCaYSEiPXs4yNACQHXZM14tjKO9gGeAJrU7EeniZeCAxNjcddgKeax2YuzzwNFqdyLSxULg8DwGcW7D2AfyH4HT1P5EBDeF7SOJsXPy+gAKea6+X6H/fLVDkYb3Uf+OObdyP+a6+LYn/rbppw8YDHxE7VGkIR3jFxfLtUI9HInE2K8CP1ebFGk4Z/lNjXOvUC9HpADnALeobYo0jM8nxt5QLw8mqKcj0xJHTUW4EThF7VSk7oP4J/X0gIJ6O0IKZBEFscJYgSwiCmKFsQJZREGsMFYgi4iCuM8K9fzg5hrbWYAzgB+oLYvk1ln1HsR13zPuKoyjK3BrIotIfhxTL/OIFcZrB/K5wI/VvkUyrxM4NDH2sUZ5wEGjHeEwjk4E7lRbF8mshbhFf55vpAcdNOKRDuPoYOBBtB6ySNa8jFsGc06jPfBCIx7txNhHgT3RjiEiWfIwbmH4OY344AuNetT9jrHjgH/oOSBSc7cEcFReF4Yvh6DRW0BzHA1J4ZfAp/R8EKmJryfGfqvRixCoHcDottagI00vBi5RNUSqphM4MTH2LpVCYbyWMI4M8Ft0Yk+k0uYDh/jhQqGBx4y7kxgbA7sDs1UNkYp5ANhZQaww3lggvwzsAeitk0j5XV4gODIxdrFKsTYNU/RgTFtrsDJNzweuVjVE+q0IHJ0YO1mlUBj3SRhH+wOTgS1UDZE+mYpbY2K+StEzDVNsRGLsE8Ao4B5VQ6Rk3wrggwpi9YzL3Us+B/iJKiGyUQuBExJjH1QpFMaVCuSdcdPf9lI1RLp1F3BaYuy7KoXCuKL8DiJXABeoGiLv6QQ+mxh7s0qhMK52L3lf3wsYpWpIg3sMOD4x9k2VQmFcE81xNDCFy9VLlgbuDZ+dGPsLlUJhnJVe8n64zU81liyN4h7gdPWGFcaZ48eSvwx8R9WQOrYQ+JwW+FEY56GX3Az8D3C4qiF15toAvtpu7FKVQmGcp1A2wPXASFVDcm4KcEZi7HSVQmGcS81xNCh1J/cuUzUkhxYCrYmxt6oUCuN66SVvj1t06NOqhuTEZQFc3m7sSpVCYVyPofwBwAIHqBqSUbcB52s9CYVxo4Tyx4HvAzurGpIRk4ELEmOfVSkUxo0YyqcA3wW2UzWkRqYAX02MfUClUBg3tJa4tVAkPQP4lkJZFMIKY1Eoi0JYFMayTigfj1sZbhdVRMpkMnBlYuxDKoXCWEoUxtHRwMXAgaqG9NFtwNWJsU+pFApj6X8o7wd8EThV1ZBeWApMAr6vKWoKY6lMKG8FnIW7qm+EKiLreAH4TgC3tBvboXIojKU6wXwccB5wmKrR8G4GfpIY+1eVQmEstQvlFuBM4Bw0C6PResHXALckxi5RORTGkq1gPgo4BbcGRpMqUncW4JZnvVFXyimMJQda4mhAET4BnAx8XBXJtaXArcBvEmPvVzkUxpLf3vJQ4FgFswJYFMaSrWA+EviMD+ZhqkpmzAR+D9yTGDtZ5VAYS2OF84GA8T3nPVSRqnsAaAPuT4x9QeVQGIsQxtEI4Ajgo773vKOqUnbTfPg+ODAI/jhrwqRUJRGFsWwsnEcCh/hw/oh6zn3yF+DPwMPA3xJj31FJRGEs/Q3nwbg1Mj4IfBj4ABCqMu95xYfvX4GpibFPqCSiMJZqBfSmwL7A+4H9gD19D7qeTwwuAJ73t78D0xS8ojCWrIZ0CzDW33YFdurydR7W1EiAV7u5PZsY+66OsCiMpV7CehQwGhiFG+oY7j/fCtgCd1n3MH/bskzhWgTm4ebwzgI6/Mf5wFvA68DMxNh2HSFRGIv0oDmOBqYwspc/nipURURERERE8ub/A7TVqErkqJ7CAAAAAElFTkSuQmCC",me="30%",ge=" Radio ",ve="#000000BB",fe="2.0rem",be="#2196F3",ye=a`
  .list {
    --mdc-theme-primary: var(--accent-color);
    --mdc-list-vertical-padding: 0px;
    overflow: hidden;
  }
`,Ae='Preset info copied to clipboard; please edit the card configuration (via show code editor) and paste copied text under the "userPresets:" key.',we="Preset JSON copied to clipboard; please edit the userPresets.json file and paste the copied text at the desired position.  Be sure to remove ending comma if last (or only) entry in the file.",Se="Function requires Spotify Premium.";function Ce(e,t,i,s){var r,o=arguments.length,a=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;var xe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Ie(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ke,$e,Te={exports:{}};function Ee(){if($e)return ke;$e=1;var e=1e3,t=60*e,i=60*t,s=24*i,r=7*s,o=365.25*s;function a(e,t,i,s){var r=t>=1.5*i;return Math.round(e/i)+" "+s+(r?"s":"")}return ke=function(n,l){l=l||{};var c=typeof n;if("string"===c&&n.length>0)return function(a){if((a=String(a)).length>100)return;var n=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a);if(!n)return;var l=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return l*o;case"weeks":case"week":case"w":return l*r;case"days":case"day":case"d":return l*s;case"hours":case"hour":case"hrs":case"hr":case"h":return l*i;case"minutes":case"minute":case"mins":case"min":case"m":return l*t;case"seconds":case"second":case"secs":case"sec":case"s":return l*e;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return l;default:return}}(n);if("number"===c&&isFinite(n))return l.long?function(r){var o=Math.abs(r);if(o>=s)return a(r,o,s,"day");if(o>=i)return a(r,o,i,"hour");if(o>=t)return a(r,o,t,"minute");if(o>=e)return a(r,o,e,"second");return r+" ms"}(n):function(r){var o=Math.abs(r);if(o>=s)return Math.round(r/s)+"d";if(o>=i)return Math.round(r/i)+"h";if(o>=t)return Math.round(r/t)+"m";if(o>=e)return Math.round(r/e)+"s";return r+"ms"}(n);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(n))},ke}var Pe=function(e){function t(e){let s,r,o,a=null;function n(...e){if(!n.enabled)return;const i=n,r=Number(new Date),o=r-(s||r);i.diff=o,i.prev=s,i.curr=r,s=r,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(s,r)=>{if("%%"===s)return"%";a++;const o=t.formatters[r];if("function"==typeof o){const t=e[a];s=o.call(i,t),e.splice(a,1),a--}return s}),t.formatArgs.call(i,e);(i.log||t.log).apply(i,e)}return n.namespace=e,n.useColors=t.useColors(),n.color=t.selectColor(e),n.extend=i,n.destroy=t.destroy,Object.defineProperty(n,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(r!==t.namespaces&&(r=t.namespaces,o=t.enabled(e)),o),set:e=>{a=e}}),"function"==typeof t.init&&t.init(n),n}function i(e,i){const s=t(this.namespace+(void 0===i?":":i)+e);return s.log=this.log,s}function s(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},t.disable=function(){const e=[...t.names.map(s),...t.skips.map(s).map(e=>"-"+e)].join(",");return t.enable(""),e},t.enable=function(e){let i;t.save(e),t.namespaces=e,t.names=[],t.skips=[];const s=("string"==typeof e?e:"").split(/[\s,]+/),r=s.length;for(i=0;i<r;i++)s[i]&&("-"===(e=s[i].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.slice(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let i,s;for(i=0,s=t.skips.length;i<s;i++)if(t.skips[i].test(e))return!1;for(i=0,s=t.names.length;i<s;i++)if(t.names[i].test(e))return!0;return!1},t.humanize=Ee(),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach(i=>{t[i]=e[i]}),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let i=0;for(let t=0;t<e.length;t++)i=(i<<5)-i+e.charCodeAt(t),i|=0;return t.colors[Math.abs(i)%t.colors.length]},t.enable(t.load()),t};!function(e,t){t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const i="color: "+this.color;t.splice(1,0,i,"color: inherit");let s=0,r=0;t[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(s++,"%c"===e&&(r=s))}),t.splice(r,0,i)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG);return e},t.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=Pe(t);const{formatters:i}=e.exports;i.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}}(Te,Te.exports);var _e=Ie(Te.exports);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le=1;class Re{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe="important",Oe=" !"+Fe,Me=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends Re{constructor(e){var t;if(super(e),e.type!==Le||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const s=e[i];return null==s?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach(e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const s=t[e];if(null!=s){this.ht.add(e);const t="string"==typeof s&&s.endsWith(Oe);e.includes("-")||t?i.setProperty(e,t?s.slice(0,-11):s,t?Fe:""):i[e]=s}}return D}}),He=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t),Be=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function De(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Be(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ve(e){return De({...e,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ue=({finisher:e,descriptor:t})=>(i,s)=>{var r;if(void 0===s){const s=null!==(r=i.originalKey)&&void 0!==r?r:i.key,o=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(o.finisher=function(t){e(t,s)}),o}{const r=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(r,s)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ze(e,t){return Ue({descriptor:i=>{const s={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[t]&&(this[t]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==s?s:null),this[t]}}return s}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ne;null===(Ne=window.HTMLSlotElement)||void 0===Ne||Ne.prototype.assignedElements;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We=(e,t,i)=>{for(const i of t)if(i[0]===e)return(0,i[1])();return null==i?void 0:i()};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function qe(e,t,i){return e?t():null==i?void 0:i()}var Ge={common:{loading:"Loading...",error:"Error",unknown:"Unknown",cancel:"Cancel",save:"Save",close:"Close",back:"Back"},music:{title:"Music",nowPlaying:"Now Playing",play:"Play",pause:"Pause",next:"Next Track",previous:"Previous Track",shuffle:"Shuffle",repeat:"Repeat",volume:"Volume",noMusic:"No music playing",ready:"Ready for music 🎵",configureEntity:"Start by selecting the SpotifyPlus media player entity in the card settings.",configurationError:"ControlRoom Music Card configuration error.",configureSections:"Select the sections you want to display."},navigation:{player:"Player",playlists:"Playlists",albums:"Albums",artists:"Artists",devices:"Devices",search:"Search",favorites:"Favorites",settings:"Settings"},devices:{title:"Playback Devices",select:"Select Device",noDevices:"No devices available",connected:"Connected",disconnected:"Disconnected"},search:{placeholder:"Search songs, artists, or albums...",noResults:"No results found"},editor:{general:"General",design:"🎨 Design",player:"Player",devices:"Devices",presets:"Presets",recents:"Recently Played",playlists:"Playlists",albums:"Albums",artists:"Artists",tracks:"Tracks",audiobooks:"Audiobooks",episodes:"Episodes",shows:"Shows",categorys:"Categories",search:"Search",automaticLanguage:"Automatic (Home Assistant)",generalSettings:{description:"General card settings — version",language:"Language",languageHelp:"Choose the card language or use the Home Assistant language",sections:"Card Sections",sectionsHelp:"Unchecked sections will not be displayed",entity:"SpotifyPlus Media Player Entity",entityHelp:"Required field",title:"Card Title",titleHelp:"Displayed at the top of the card",width:"Card Width",widthHelp:'In rem units or "fill" for 100% width',height:"Card Height",heightHelp:'In rem units or "fill" for 100% height',sectionDefault:"Default Card Section",touchSupportDisabled:"Disable Touch Support",touchSupportDisabledHelp:"Use mouse events only",albumFavorites:"Favorite Albums",artistFavorites:"Favorite Artists",audiobookFavorites:"Favorite Audiobooks",episodeFavorites:"Favorite Episodes",playlistFavorites:"Favorite Playlists",showFavorites:"Favorite Shows",trackFavorites:"Favorite Tracks",userPresets:"User Presets",searchMedia:"Search Music"},designSettings:{description:"ControlRoom Music — Appearance",background:"Background Color",accent:"Accent Color",text:"Text Color",borderRadius:"Border Radius"},playerSettings:{description:"Settings that control the Player section's appearance and behavior",general:"General",header:"Header",controls:"Controls",volume:"Volume"},playerGeneralSettings:{description:"General Player Settings",backgroundImageSize:"Player background image size",defaultIs:"Default value is",minimizeOnIdle:"Minimize player height when off or idle",minimizeOnIdleHelp:'Available when height is not set to "fill"'},playerHeaderSettings:{description:"Player Header Settings",title:"Section Title Displayed in the Header",artistTrack:"Artist and Track Information Displayed in the Header",album:"Album Information Displayed in the Header",noMediaPlayingText:"Text Displayed When No Media Is Playing",backgroundColor:"Header Background Gradient Color (e.g. #hhrrggbb)",backgroundColorHelp:"Use 'transparent' to disable",hideProgressBar:"Hide Progress Bar in the Header",hideHeader:"Hide Player Header"},playerControlsSettings:{description:"Player Media Control Area Settings",iconSize:"Player control icon size",iconSizeHelp:"Default size is",hideFavorites:"Hide favorite actions button",hideShuffle:"Hide shuffle button",hidePrevious:"Hide previous track button",hidePlayPause:"Hide play/pause button",hideNext:"Hide next track button",hideRepeat:"Hide repeat button",hideQueue:"Hide play queue button",hideControls:"Hide the Player controls area"},playerVolumeSettings:{description:"Player Volume Control Settings",backgroundColor:"Controls Background Gradient Color (e.g. #hhrrggbb)",backgroundColorHelp:"Use 'transparent' to disable",maxVolume:"Maximum Volume Allowed Through the Card",maxVolumeHelp:"Range from 10 to 100",volumeStep:"Volume Adjustment Step",volumeStepHelp:"Range from 1 to 30",hideMute:"Hide Mute Button",hidePower:"Hide Power Button",hideSlider:"Hide Volume Slider and Levels",showPlusMinus:"Show Volume Plus and Minus Buttons",hideLevels:"Hide Volume Numbers and Percentages"},albumFavoritesSettings:{description:"Favorite Albums Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Albums",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Albums per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Album Titles",hideSubtitle:"Hide Album Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Albums by Title",shuffleOnPlay:"Enable Shuffle Before Playback",refreshOnEntry:"Refresh Albums When Opening the Section"},artistFavoritesSettings:{description:"Favorite Artists Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Artists",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Artists per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Artist Names",hideSubtitle:"Hide Artist Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Artists by Name",shuffleOnPlay:"Enable Shuffle Before Playback",refreshOnEntry:"Refresh Artists When Opening the Section"},audiobookFavoritesSettings:{description:"Favorite Audiobooks Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Audiobooks",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Audiobooks per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Audiobook Titles",hideSubtitle:"Hide Audiobook Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Audiobooks by Title",refreshOnEntry:"Refresh Audiobooks When Opening the Section"},categoryBrowserSettings:{description:"Music Categories Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsPerRow:"Categories per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Category Titles",hideSubtitle:"Hide Category Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Playlists by Title"},deviceBrowserSettings:{description:"Playback Devices Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",defaultDevice:"Default Device Name or ID",defaultDeviceHelp:"Device used for SpotifyPlus service calls. Example: Office Speaker",itemsPerRow:"Devices per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Device Names",hideSubtitle:"Hide Device Subtitles",hideSubtitleHelp:"When the title is visible",showHiddenDevices:"Show Hidden Devices Configured in SpotifyPlus",controlByName:"Control Device by Name Instead of ID"},episodeFavoritesSettings:{description:"Favorite Episodes Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Episodes",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Episodes per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Episode Titles",hideSubtitle:"Hide Episode Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Episodes by Title",refreshOnEntry:"Refresh Episodes When Opening the Section"},playlistFavoritesSettings:{description:"Favorite Playlists Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Playlists",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Playlists per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Playlist Titles",hideSubtitle:"Hide Playlist Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Playlists by Title",shuffleOnPlay:"Enable Shuffle Before Playback",refreshOnEntry:"Refresh Playlists When Opening the Section"},recentBrowserSettings:{description:"Recently Played Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsPerRow:"Items per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Item Titles",hideSubtitle:"Hide Item Subtitles",hideSubtitleHelp:"When the title is visible",refreshOnEntry:"Refresh Items When Opening the Section"},searchMediaSettings:{description:"Media Search Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",searchTypes:"Media Types Available for Search",searchTypesHelp:"Unchecked types will not be displayed. All types are enabled if none are selected",albums:"Albums",artists:"Artists",audiobooks:"Audiobooks",episodes:"Episodes",playlists:"Playlists",shows:"Podcasts and Shows",tracks:"Tracks",searchLimit:"Maximum Number of Search Results",useDisplaySettings:"Use Search Display Settings for Results",itemsPerRow:"Items per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Item Titles",hideSubtitle:"Hide Item Subtitles",hideSubtitleHelp:"When the title is visible",queueSelection:"Queue Track or Episode When Selected",queueSelectionHelp:"Otherwise, play immediately"},showFavoritesSettings:{description:"Favorite Podcasts and Shows Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Shows",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Shows per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Show Titles",hideSubtitle:"Hide Show Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Shows by Title",refreshOnEntry:"Refresh Shows When Opening the Section"},trackFavoritesSettings:{description:"Favorite Tracks Appearance and Behavior Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",itemsLimit:"Maximum Number of Favorite Tracks",itemsLimitHelp:"Maximum 1000, default 200",itemsPerRow:"Tracks per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Track Titles",hideSubtitle:"Hide Track Subtitles",hideSubtitleHelp:"When the title is visible",sortTitle:"Sort Tracks by Title",shuffleOnPlay:"Enable Shuffle Before Playing Favorites",refreshOnEntry:"Refresh Tracks When Opening the Section"},userPresetSettings:{description:"User Preset Appearance Settings",title:"Section Title",titleHelp:"Displayed at the top of the section",subtitle:"Section Subtitle",subtitleHelp:"Displayed below the section title",presetsFile:"File Containing User-Defined Presets",presetsFileHelp:"Example: /local/spotifyplus/userpresets.json",itemsPerRow:"Presets per Row",itemsPerRowHelp:"Use 1 for list view",hideTitle:"Hide Preset Titles",hideSubtitle:"Hide Preset Subtitles",hideSubtitleHelp:"When the title is visible",documentationNotice:"User presets must be defined manually in the configuration code editor. Refer to the",documentationLink:"Wiki documentation",documentationSuffix:"for more details and examples."}},settings:{title:"Settings",language:"Language",automatic:"Automatic (Home Assistant)",appearance:"Appearance"}};const je={de:{common:{loading:"Wird geladen...",error:"Fehler",unknown:"Unbekannt",cancel:"Abbrechen",save:"Speichern",close:"Schließen",back:"Zurück"},music:{title:"Musik",nowPlaying:"Aktuelle Wiedergabe",play:"Wiedergabe starten",pause:"Pause",next:"Nächster Titel",previous:"Vorheriger Titel",shuffle:"Zufallswiedergabe",repeat:"Wiederholen",volume:"Lautstärke",noMusic:"Keine Musik wird abgespielt",ready:"Bereit für Musik 🎵",configureEntity:"Wähle zunächst die SpotifyPlus-Mediaplayer-Entität in den Karteneinstellungen aus.",configurationError:"Konfigurationsfehler der ControlRoom Music-Karte.",configureSections:"Wähle die Bereiche aus, die angezeigt werden sollen."},navigation:{player:"Player",playlists:"Wiedergabelisten",albums:"Alben",artists:"Künstler",devices:"Geräte",search:"Suche",favorites:"Favoriten",settings:"Einstellungen"},devices:{title:"Wiedergabegeräte",select:"Gerät auswählen",noDevices:"Keine Geräte verfügbar",connected:"Verbunden",disconnected:"Nicht verbunden"},search:{placeholder:"Musik, Künstler oder Alben suchen...",noResults:"Keine Ergebnisse gefunden"},editor:{general:"Allgemein",design:"🎨 Design",player:"Player",devices:"Geräte",presets:"Voreinstellungen",recents:"Zuletzt gespielt",playlists:"Wiedergabelisten",albums:"Alben",artists:"Künstler",tracks:"Titel",audiobooks:"Hörbücher",episodes:"Episoden",shows:"Podcasts",categorys:"Kategorien",search:"Suche",automaticLanguage:"Automatisch (Home Assistant)",generalSettings:{description:"Allgemeine Karteneinstellungen — Version",language:"Sprache",languageHelp:"Kartensprache auswählen oder Home Assistant-Sprache verwenden",sections:"Kartenbereiche",sectionsHelp:"Deaktivierte Bereiche werden nicht angezeigt",entity:"SpotifyPlus-Mediaplayer-Entität",entityHelp:"Pflichtfeld",title:"Kartentitel",titleHelp:"Wird oben auf der Karte angezeigt",width:"Kartenbreite",widthHelp:'In rem oder "fill" für 100 % Breite',height:"Kartenhöhe",heightHelp:'In rem oder "fill" für 100 % Höhe',sectionDefault:"Standardbereich der Karte",touchSupportDisabled:"Touch-Bedienung deaktivieren",touchSupportDisabledHelp:"Nur Mausereignisse verwenden",albumFavorites:"Lieblingsalben",artistFavorites:"Lieblingskünstler",audiobookFavorites:"Lieblingshörbücher",episodeFavorites:"Lieblingsepisoden",playlistFavorites:"Lieblingsplaylists",showFavorites:"Lieblingspodcasts",trackFavorites:"Lieblingstitel",userPresets:"Benutzervoreinstellungen",searchMedia:"Musik suchen"},designSettings:{description:"ControlRoom Music — Design",background:"Hintergrundfarbe",accent:"Akzentfarbe",text:"Textfarbe",borderRadius:"Eckenradius"},playerSettings:{description:"Einstellungen für Darstellung und Verhalten des Players",general:"Allgemein",header:"Kopfzeile",controls:"Steuerung",volume:"Lautstärke"},playerGeneralSettings:{description:"Allgemeine Player-Einstellungen",backgroundImageSize:"Größe des Player-Hintergrundbildes",defaultIs:"Der Standardwert ist",minimizeOnIdle:"Player-Höhe bei ausgeschaltetem oder inaktivem Zustand minimieren",minimizeOnIdleHelp:'Verfügbar, wenn die Höhe nicht auf "fill" eingestellt ist'},playerHeaderSettings:{description:"Einstellungen für den Player-Kopfbereich",title:"Titel im Kopfbereich anzeigen",artistTrack:"Künstler- und Titelinformationen im Kopfbereich",album:"Albuminformationen im Kopfbereich",noMediaPlayingText:"Text anzeigen, wenn keine Musik abgespielt wird",backgroundColor:"Farbwert für den Hintergrundverlauf (z. B. #hhrrggbb)",backgroundColorHelp:"Zum Deaktivieren 'transparent' verwenden",hideProgressBar:"Fortschrittsbalken im Kopfbereich ausblenden",hideHeader:"Kopfbereich des Players ausblenden"},playerControlsSettings:{description:"Einstellungen für die Mediensteuerung des Players",iconSize:"Größe der Symbole im Player-Steuerungsbereich",iconSizeHelp:"Die Standardgröße ist",hideFavorites:"Favoriten-Schaltfläche ausblenden",hideShuffle:"Zufallswiedergabe-Schaltfläche ausblenden",hidePrevious:"Schaltfläche für vorherigen Titel ausblenden",hidePlayPause:"Wiedergabe-/Pause-Schaltfläche ausblenden",hideNext:"Schaltfläche für nächsten Titel ausblenden",hideRepeat:"Wiederholen-Schaltfläche ausblenden",hideQueue:"Warteschlangen-Schaltfläche ausblenden",hideControls:"Steuerungsbereich des Players ausblenden"},playerVolumeSettings:{description:"Einstellungen für die Lautstärkeregelung des Players",backgroundColor:"Farbwert für den Hintergrundverlauf der Bedienelemente (z. B. #hhrrggbb)",backgroundColorHelp:"Zum Deaktivieren 'transparent' verwenden",maxVolume:"Maximal zulässige Lautstärke über die Karte",maxVolumeHelp:"Bereich von 10 bis 100",volumeStep:"Schrittweite der Lautstärketasten",volumeStepHelp:"Bereich von 1 bis 30",hideMute:"Stummschalttaste ausblenden",hidePower:"Ein-/Ausschalter ausblenden",hideSlider:"Lautstärkeregler ausblenden",showPlusMinus:"Plus- und Minustasten anzeigen",hideLevels:"Lautstärkewerte und Prozentangaben ausblenden"},albumFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingsalben",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingsalben",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Alben pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Albumtitel ausblenden",hideSubtitle:"Albumuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Alben nach Titel sortieren",shuffleOnPlay:"Zufallswiedergabe vor dem Abspielen aktivieren",refreshOnEntry:"Alben beim Öffnen des Bereichs aktualisieren"},artistFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingskünstler",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingskünstlern",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Künstler pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Künstlernamen ausblenden",hideSubtitle:"Künstleruntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Künstler nach Namen sortieren",shuffleOnPlay:"Zufallswiedergabe vor dem Abspielen aktivieren",refreshOnEntry:"Künstler beim Öffnen des Bereichs aktualisieren"},audiobookFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingshörbücher",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingshörbüchern",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Hörbücher pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Hörbuchtitel ausblenden",hideSubtitle:"Hörbuchuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Hörbücher nach Titel sortieren",refreshOnEntry:"Hörbücher beim Öffnen des Bereichs aktualisieren"},categoryBrowserSettings:{description:"Einstellungen für Darstellung und Verhalten der Musikkategorien",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsPerRow:"Anzahl der Kategorien pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Kategorietitel ausblenden",hideSubtitle:"Kategorieuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Playlists nach Titel sortieren"},deviceBrowserSettings:{description:"Einstellungen für Darstellung und Verhalten der Wiedergabegeräte",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",defaultDevice:"Name oder ID des Standardgeräts",defaultDeviceHelp:"Gerät für SpotifyPlus-Dienstaufrufe. Beispiel: Alexa – Wohnzimmer",itemsPerRow:"Anzahl der Geräte pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Gerätenamen ausblenden",hideSubtitle:"Geräteuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",showHiddenDevices:"In SpotifyPlus konfigurierte ausgeblendete Geräte anzeigen",controlByName:"Gerät über den Namen statt über die ID steuern"},episodeFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingsepisoden",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingsepisoden",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Episoden pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Episodentitel ausblenden",hideSubtitle:"Episodenuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Episoden nach Titel sortieren",refreshOnEntry:"Episoden beim Öffnen des Bereichs aktualisieren"},playlistFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingsplaylists",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingsplaylists",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Playlists pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Playlist-Titel ausblenden",hideSubtitle:"Playlist-Untertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Playlists nach Titel sortieren",shuffleOnPlay:"Zufallswiedergabe vor dem Abspielen aktivieren",refreshOnEntry:"Playlists beim Öffnen des Bereichs aktualisieren"},recentBrowserSettings:{description:"Einstellungen für Darstellung und Verhalten der zuletzt wiedergegebenen Inhalte",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsPerRow:"Anzahl der Elemente pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Elementtitel ausblenden",hideSubtitle:"Elementuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",refreshOnEntry:"Elemente beim Öffnen des Bereichs aktualisieren"},searchMediaSettings:{description:"Einstellungen für Darstellung und Verhalten der Mediensuche",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",searchTypes:"Verfügbare Medientypen für die Suche",searchTypesHelp:"Nicht ausgewählte Typen werden nicht angezeigt. Wenn keiner ausgewählt ist, sind alle aktiviert",albums:"Alben",artists:"Künstler",audiobooks:"Hörbücher",episodes:"Episoden",playlists:"Playlists",shows:"Podcasts und Sendungen",tracks:"Musiktitel",searchLimit:"Maximale Anzahl der Suchergebnisse",useDisplaySettings:"Anzeigeeinstellungen der Suche für Ergebnisse verwenden",itemsPerRow:"Anzahl der Elemente pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Elementtitel ausblenden",hideSubtitle:"Elementuntertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",queueSelection:"Titel oder Episode bei Auswahl zur Warteschlange hinzufügen",queueSelectionHelp:"Andernfalls wird der Inhalt sofort abgespielt"},showFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingspodcasts",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingspodcasts",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Podcasts pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Podcast-Titel ausblenden",hideSubtitle:"Podcast-Untertitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Podcasts nach Titel sortieren",refreshOnEntry:"Podcasts beim Öffnen des Bereichs aktualisieren"},trackFavoritesSettings:{description:"Einstellungen für Darstellung und Verhalten der Lieblingstitel",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",itemsLimit:"Maximale Anzahl an Lieblingstiteln",itemsLimitHelp:"Maximal 1000, Standardwert 200",itemsPerRow:"Anzahl der Musiktitel pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Musiktitel ausblenden",hideSubtitle:"Untertitel der Musiktitel ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",sortTitle:"Musiktitel nach Titel sortieren",shuffleOnPlay:"Zufallswiedergabe vor dem Abspielen der Favoriten aktivieren",refreshOnEntry:"Musiktitel beim Öffnen des Bereichs aktualisieren"},userPresetSettings:{description:"Darstellungseinstellungen für benutzerdefinierte Voreinstellungen",title:"Bereichstitel",titleHelp:"Wird oben im Bereich angezeigt",subtitle:"Bereichsuntertitel",subtitleHelp:"Wird unter dem Bereichstitel angezeigt",presetsFile:"Datei mit benutzerdefinierten Voreinstellungen",presetsFileHelp:"Beispiel: /local/spotifyplus/userpresets.json",itemsPerRow:"Anzahl der Voreinstellungen pro Zeile",itemsPerRowHelp:"1 für Listenansicht verwenden",hideTitle:"Titel der Voreinstellungen ausblenden",hideSubtitle:"Untertitel der Voreinstellungen ausblenden",hideSubtitleHelp:"Wenn der Titel sichtbar ist",documentationNotice:"Benutzerdefinierte Voreinstellungen müssen manuell im Code-Editor konfiguriert werden. Weitere Informationen und Beispiele findest du in der",documentationLink:"Wiki-Dokumentation",documentationSuffix:"."}},settings:{title:"Einstellungen",language:"Sprache",automatic:"Automatisch (Home Assistant)",appearance:"Darstellung"}},pt:{common:{loading:"Carregando...",error:"Erro",unknown:"Desconhecido",cancel:"Cancelar",save:"Salvar",close:"Fechar",back:"Voltar"},music:{title:"Música",nowPlaying:"Tocando agora",play:"Reproduzir",pause:"Pausar",next:"Próxima música",previous:"Música anterior",shuffle:"Modo aleatório",repeat:"Repetir",volume:"Volume",noMusic:"Nenhuma música em reprodução",ready:"Pronto para ouvir música 🎵",configureEntity:"Comece selecionando a entidade do reprodutor SpotifyPlus nas configurações do cartão.",configurationError:"Erro na configuração do ControlRoom Music Card.",configureSections:"Selecione as seções que deseja exibir."},navigation:{player:"Reprodutor",playlists:"Playlists",albums:"Álbuns",artists:"Artistas",devices:"Dispositivos",search:"Pesquisar",favorites:"Favoritos",settings:"Configurações"},devices:{title:"Dispositivos de reprodução",select:"Selecionar dispositivo",noDevices:"Nenhum dispositivo disponível",connected:"Conectado",disconnected:"Desconectado"},search:{placeholder:"Pesquisar músicas, artistas ou álbuns...",noResults:"Nenhum resultado encontrado"},editor:{general:"Geral",design:"Aparência",player:"Reprodutor",devices:"Dispositivos",presets:"Predefinições",recents:"Recentes",playlists:"Playlists",albums:"Álbuns",artists:"Artistas",tracks:"Músicas",audiobooks:"Audiolivros",episodes:"Episódios",shows:"Programas",categorys:"Categorias",search:"Pesquisar",automaticLanguage:"Automático (Home Assistant)",generalSettings:{description:"Configurações gerais do cartão — versão",language:"Idioma",languageHelp:"Escolha o idioma do cartão ou utilize o idioma do Home Assistant",sections:"Seções do cartão",sectionsHelp:"As seções desmarcadas não serão exibidas",entity:"Entidade do reprodutor SpotifyPlus",entityHelp:"Campo obrigatório",title:"Título do cartão",titleHelp:"Exibido na parte superior do cartão",width:"Largura do cartão",widthHelp:'Em unidades rem ou "fill" para ocupar 100% da largura',height:"Altura do cartão",heightHelp:'Em unidades rem ou "fill" para ocupar 100% da altura',sectionDefault:"Seção inicial do cartão",touchSupportDisabled:"Desativar suporte ao toque",touchSupportDisabledHelp:"Utilizar apenas eventos do mouse",albumFavorites:"Álbuns favoritos",artistFavorites:"Artistas favoritos",audiobookFavorites:"Audiolivros favoritos",episodeFavorites:"Episódios favoritos",playlistFavorites:"Playlists favoritas",showFavorites:"Programas favoritos",trackFavorites:"Músicas favoritas",userPresets:"Predefinições do usuário",searchMedia:"Pesquisar músicas"},designSettings:{description:"ControlRoom Music — Aparência",background:"Cor de fundo",accent:"Cor principal",text:"Cor do texto",borderRadius:"Arredondamento das bordas"},playerSettings:{description:"Configurações de aparência e funcionamento do reprodutor",general:"Geral",header:"Cabeçalho",controls:"Controles",volume:"Volume"},playerGeneralSettings:{description:"Configurações gerais do reprodutor",backgroundImageSize:"Tamanho da imagem de fundo do reprodutor",defaultIs:"O valor padrão é",minimizeOnIdle:"Minimizar a altura do reprodutor quando estiver desligado ou inativo",minimizeOnIdleHelp:'Disponível quando a altura não estiver definida como "fill"'},playerHeaderSettings:{description:"Configurações do cabeçalho do player",title:"Título exibido no cabeçalho",artistTrack:"Informações de artista e música no cabeçalho",album:"Informações do álbum no cabeçalho",noMediaPlayingText:"Texto exibido quando nenhuma música está tocando",backgroundColor:"Cor do gradiente de fundo do cabeçalho (ex.: #hhrrggbb)",backgroundColorHelp:"Use 'transparent' para desativar",hideProgressBar:"Ocultar barra de progresso no cabeçalho",hideHeader:"Ocultar cabeçalho do player"},playerControlsSettings:{description:"Configurações dos controles de mídia do player",iconSize:"Tamanho dos ícones dos controles do player",iconSizeHelp:"O tamanho padrão é",hideFavorites:"Ocultar botão de favoritos",hideShuffle:"Ocultar botão de reprodução aleatória",hidePrevious:"Ocultar botão de música anterior",hidePlayPause:"Ocultar botão reproduzir/pausar",hideNext:"Ocultar botão de próxima música",hideRepeat:"Ocultar botão de repetição",hideQueue:"Ocultar botão da fila de reprodução",hideControls:"Ocultar a área de controles do player"},playerVolumeSettings:{description:"Configurações dos controles de volume do player",backgroundColor:"Cor do gradiente de fundo dos controles (ex.: #hhrrggbb)",backgroundColorHelp:"Use 'transparent' para desativar",maxVolume:"Volume máximo permitido pelo cartão",maxVolumeHelp:"Intervalo de 10 a 100",volumeStep:"Incremento de volume dos botões",volumeStepHelp:"Intervalo de 1 a 30",hideMute:"Ocultar botão de silenciar",hidePower:"Ocultar botão de ligar/desligar",hideSlider:"Ocultar controle deslizante de volume",showPlusMinus:"Mostrar botões de aumentar e diminuir volume",hideLevels:"Ocultar números e porcentagens do volume"},albumFavoritesSettings:{description:"Configurações de aparência e funcionamento dos álbuns favoritos",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de álbuns favoritos",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de álbuns por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título dos álbuns",hideSubtitle:"Ocultar subtítulo dos álbuns",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar álbuns pelo título",shuffleOnPlay:"Ativar reprodução aleatória antes de reproduzir",refreshOnEntry:"Atualizar álbuns ao abrir a seção"},artistFavoritesSettings:{description:"Configurações de aparência e funcionamento dos artistas favoritos",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de artistas favoritos",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de artistas por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar nome dos artistas",hideSubtitle:"Ocultar subtítulo dos artistas",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar artistas pelo nome",shuffleOnPlay:"Ativar reprodução aleatória antes de reproduzir",refreshOnEntry:"Atualizar artistas ao abrir a seção"},audiobookFavoritesSettings:{description:"Configurações de aparência e funcionamento dos audiolivros favoritos",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de audiolivros favoritos",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de audiolivros por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título dos audiolivros",hideSubtitle:"Ocultar subtítulo dos audiolivros",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar audiolivros pelo título",refreshOnEntry:"Atualizar audiolivros ao abrir a seção"},categoryBrowserSettings:{description:"Configurações de aparência e funcionamento das categorias musicais",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsPerRow:"Número de categorias por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título das categorias",hideSubtitle:"Ocultar subtítulo das categorias",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar playlists pelo título"},deviceBrowserSettings:{description:"Configurações de aparência e funcionamento dos dispositivos",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",defaultDevice:"Nome ou ID do dispositivo padrão",defaultDeviceHelp:"Dispositivo usado nas chamadas do SpotifyPlus. Exemplo: Alexa – Wohnzimmer",itemsPerRow:"Número de dispositivos por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar nome dos dispositivos",hideSubtitle:"Ocultar subtítulo dos dispositivos",hideSubtitleHelp:"Quando o título estiver visível",showHiddenDevices:"Mostrar dispositivos ocultos configurados no SpotifyPlus",controlByName:"Controlar dispositivo pelo nome em vez do ID"},episodeFavoritesSettings:{description:"Configurações de aparência e funcionamento dos episódios favoritos",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de episódios favoritos",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de episódios por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título dos episódios",hideSubtitle:"Ocultar subtítulo dos episódios",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar episódios pelo título",refreshOnEntry:"Atualizar episódios ao abrir a seção"},playlistFavoritesSettings:{description:"Configurações de aparência e funcionamento das playlists favoritas",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de playlists favoritas",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de playlists por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título das playlists",hideSubtitle:"Ocultar subtítulo das playlists",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar playlists pelo título",shuffleOnPlay:"Ativar reprodução aleatória antes de iniciar",refreshOnEntry:"Atualizar playlists ao abrir a seção"},recentBrowserSettings:{description:"Configurações de aparência e funcionamento dos reproduzidos recentemente",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsPerRow:"Número de itens por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título dos itens",hideSubtitle:"Ocultar subtítulo dos itens",hideSubtitleHelp:"Quando o título estiver visível",refreshOnEntry:"Atualizar itens ao abrir a seção"},searchMediaSettings:{description:"Configurações de aparência e funcionamento da busca de mídia",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",searchTypes:"Tipos de mídia disponíveis para pesquisa",searchTypesHelp:"Os tipos desmarcados não serão exibidos. Se nenhum estiver selecionado, todos serão habilitados",albums:"Álbuns",artists:"Artistas",audiobooks:"Audiolivros",episodes:"Episódios",playlists:"Playlists",shows:"Podcasts e programas",tracks:"Músicas",searchLimit:"Número máximo de resultados da pesquisa",useDisplaySettings:"Usar configurações de exibição da pesquisa nos resultados",itemsPerRow:"Número de itens por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título dos itens",hideSubtitle:"Ocultar subtítulo dos itens",hideSubtitleHelp:"Quando o título estiver visível",queueSelection:"Adicionar música ou episódio à fila ao selecionar",queueSelectionHelp:"Se desativado, o conteúdo será reproduzido imediatamente"},showFavoritesSettings:{description:"Configurações de aparência e funcionamento dos podcasts favoritos",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de podcasts favoritos",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de podcasts por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título dos podcasts",hideSubtitle:"Ocultar subtítulo dos podcasts",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar podcasts pelo título",refreshOnEntry:"Atualizar podcasts ao abrir a seção"},trackFavoritesSettings:{description:"Configurações de aparência e funcionamento das músicas favoritas",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",itemsLimit:"Número máximo de músicas favoritas",itemsLimitHelp:"Máximo de 1000, padrão de 200",itemsPerRow:"Número de músicas por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título das músicas",hideSubtitle:"Ocultar subtítulo das músicas",hideSubtitleHelp:"Quando o título estiver visível",sortTitle:"Ordenar músicas pelo título",shuffleOnPlay:"Ativar reprodução aleatória antes de tocar as favoritas",refreshOnEntry:"Atualizar músicas ao abrir a seção"},userPresetSettings:{description:"Configurações de aparência das predefinições personalizadas",title:"Título da seção",titleHelp:"Exibido na parte superior da seção",subtitle:"Subtítulo da seção",subtitleHelp:"Exibido abaixo do título da seção",presetsFile:"Arquivo com as predefinições personalizadas",presetsFileHelp:"Exemplo: /local/spotifyplus/userpresets.json",itemsPerRow:"Número de predefinições por linha",itemsPerRowHelp:"Use 1 para exibir em formato de lista",hideTitle:"Ocultar título das predefinições",hideSubtitle:"Ocultar subtítulo das predefinições",hideSubtitleHelp:"Quando o título estiver visível",documentationNotice:"As predefinições personalizadas devem ser configuradas manualmente no editor de código. Consulte a",documentationLink:"documentação Wiki",documentationSuffix:"para mais detalhes e exemplos."}},settings:{title:"Configurações",language:"Idioma",automatic:"Automático (Home Assistant)",appearance:"Aparência"}},en:Ge};function Je(e="auto",t){const i=("auto"===e?t||navigator.language||"en":e).toLowerCase().split(/[-_]/)[0];return"de"===i||"pt"===i?i:"en"}function Ye(e,t="auto",i){const s=Je(t,i),r=t=>{let i=t;for(const t of e.split(".")){if("object"!=typeof i||null===i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0};return r(je[s])??r(Ge)??e}const Ke=[];for(let e=0;e<256;++e)Ke.push((e+256).toString(16).slice(1));let Ze;const Qe=new Uint8Array(16);var Xe={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function et(e,t,i){if(Xe.randomUUID&&!t&&!e)return Xe.randomUUID();const s=(e=e||{}).random??e.rng?.()??function(){if(!Ze){if("undefined"==typeof crypto||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Ze=crypto.getRandomValues.bind(crypto)}return Ze(Qe)}();if(s.length<16)throw new Error("Random bytes length must be >= 16");if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){if((i=i||0)<0||i+16>t.length)throw new RangeError(`UUID byte range ${i}:${i+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[i+e]=s[e];return t}return function(e,t=0){return(Ke[e[t+0]]+Ke[e[t+1]]+Ke[e[t+2]]+Ke[e[t+3]]+"-"+Ke[e[t+4]]+Ke[e[t+5]]+"-"+Ke[e[t+6]]+Ke[e[t+7]]+"-"+Ke[e[t+8]]+Ke[e[t+9]]+"-"+Ke[e[t+10]]+Ke[e[t+11]]+Ke[e[t+12]]+Ke[e[t+13]]+Ke[e[t+14]]+Ke[e[t+15]]).toLowerCase()}(s)}var tt={},it={},st={};Object.defineProperty(st,"__esModule",{value:!0}),st.assignDeep=st.mapValues=void 0,st.mapValues=function(e,t){var i={};for(var s in e)if(e.hasOwnProperty(s)){var r=e[s];i[s]=t(r)}return i},st.assignDeep=function e(t){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return i.forEach(function(i){if(i)for(var s in i)if(i.hasOwnProperty(s)){var r=i[s];Array.isArray(r)?t[s]=r.slice(0):"object"==typeof r?(t[s]||(t[s]={}),e(t[s],r)):t[s]=r}}),t},Object.defineProperty(it,"__esModule",{value:!0}),it.buildProcessOptions=void 0;var rt=st;it.buildProcessOptions=function(e,t){var i=e.colorCount,s=e.quantizer,r=e.generators,o=e.filters,a={colorCount:i},n="string"==typeof s?{name:s,options:{}}:s;return n.options=rt.assignDeep({},a,n.options),rt.assignDeep({},{quantizer:n,generators:r,filters:o},t)};var ot,at,nt={};function lt(){if(at)return tt;at=1;var e=xe&&xe.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(tt,"__esModule",{value:!0});var t=it,i=e(function(){if(ot)return nt;ot=1;var e=xe&&xe.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(nt,"__esModule",{value:!0});var t=e(lt()),i=st,s=function(){function e(e,s){void 0===s&&(s={}),this._src=e,this._opts=i.assignDeep({},t.default.DefaultOpts,s)}return e.prototype.maxColorCount=function(e){return this._opts.colorCount=e,this},e.prototype.maxDimension=function(e){return this._opts.maxDimension=e,this},e.prototype.addFilter=function(e){return this._opts.filters?this._opts.filters.push(e):this._opts.filters=[e],this},e.prototype.removeFilter=function(e){if(this._opts.filters){var t=this._opts.filters.indexOf(e);t>0&&this._opts.filters.splice(t)}return this},e.prototype.clearFilters=function(){return this._opts.filters=[],this},e.prototype.quality=function(e){return this._opts.quality=e,this},e.prototype.useImageClass=function(e){return this._opts.ImageClass=e,this},e.prototype.useGenerator=function(e,t){return this._opts.generators||(this._opts.generators=[]),this._opts.generators.push(t?{name:e,options:t}:e),this},e.prototype.useQuantizer=function(e,t){return this._opts.quantizer=t?{name:e,options:t}:e,this},e.prototype.build=function(){return new t.default(this._src,this._opts)},e.prototype.getPalette=function(e){return this.build().getPalette(e)},e.prototype.getSwatches=function(e){return this.build().getPalette(e)},e}();return nt.default=s,nt}()),s=st,r=function(){function e(t,i){this._src=t,this.opts=s.assignDeep({},e.DefaultOpts,i)}return e.use=function(e){this._pipeline=e},e.from=function(e){return new i.default(e)},Object.defineProperty(e.prototype,"result",{get:function(){return this._result},enumerable:!1,configurable:!0}),e.prototype._process=function(i,s){this.opts.quantizer,i.scaleDown(this.opts);var r=t.buildProcessOptions(this.opts,s);return e._pipeline.process(i.getImageData(),r)},e.prototype.palette=function(){return this.swatches()},e.prototype.swatches=function(){throw new Error("Method deprecated. Use `Vibrant.result.palettes[name]` instead")},e.prototype.getPalette=function(){var e=this,t=arguments[0],i="string"==typeof t?t:"default",s="string"==typeof t?arguments[1]:t,r=new this.opts.ImageClass;return r.load(this._src).then(function(t){return e._process(t,{generators:[i]})}).then(function(t){return e._result=t,t.palettes[i]}).then(function(e){return r.remove(),s&&s(void 0,e),e}).catch(function(e){return r.remove(),s&&s(e),Promise.reject(e)})},e.prototype.getPalettes=function(){var e=this,t=arguments[0],i=arguments[1],s=Array.isArray(t)?t:["*"],r=Array.isArray(t)?i:t,o=new this.opts.ImageClass;return o.load(this._src).then(function(t){return e._process(t,{generators:s})}).then(function(t){return e._result=t,t.palettes}).then(function(e){return o.remove(),r&&r(void 0,e),e}).catch(function(e){return o.remove(),r&&r(e),Promise.reject(e)})},e.DefaultOpts={colorCount:64,quality:5,filters:[]},e}();return tt.default=r,tt}var ct=Ie(lt()),dt={},ht={};Object.defineProperty(ht,"__esModule",{value:!0}),ht.applyFilters=ht.ImageBase=void 0;var pt=function(){function e(){}return e.prototype.scaleDown=function(e){var t=this.getWidth(),i=this.getHeight(),s=1;if(e.maxDimension>0){var r=Math.max(t,i);r>e.maxDimension&&(s=e.maxDimension/r)}else s=1/e.quality;s<1&&this.resize(t*s,i*s,s)},e}();ht.ImageBase=pt,ht.applyFilters=function(e,t){if(t.length>0)for(var i=e.data,s=i.length/4,r=void 0,o=void 0,a=void 0,n=void 0,l=void 0,c=0;c<s;c++){o=i[(r=4*c)+0],a=i[r+1],n=i[r+2],l=i[r+3];for(var d=0;d<t.length;d++)if(!t[d](o,a,n,l)){i[r+3]=0;break}}return e};var ut,mt=xe&&xe.__extends||(ut=function(e,t){return ut=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])},ut(e,t)},function(e,t){function i(){this.constructor=e}ut(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)});Object.defineProperty(dt,"__esModule",{value:!0});var gt=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return mt(t,e),t.prototype._initCanvas=function(){var e=this.image,t=this._canvas=document.createElement("canvas"),i=t.getContext("2d");if(!i)throw new ReferenceError("Failed to create canvas context");this._context=i,t.className="@vibrant/canvas",t.style.display="none",this._width=t.width=e.width,this._height=t.height=e.height,i.drawImage(e,0,0),document.body.appendChild(t)},t.prototype.load=function(e){var t,i,s=this;if("string"==typeof e)t=document.createElement("img"),function(e){var t=new URL(e,location.href);return t.protocol===location.protocol&&t.host===location.host&&t.port===location.port}(i=e)||function(e,t){var i=new URL(e),s=new URL(t);return i.protocol===s.protocol&&i.hostname===s.hostname&&i.port===s.port}(window.location.href,i)||(t.crossOrigin="anonymous"),t.src=i;else{if(!(e instanceof HTMLImageElement))return Promise.reject(new Error("Cannot load buffer as an image in browser"));t=e,i=e.src}return this.image=t,new Promise(function(e,r){var o=function(){s._initCanvas(),e(s)};t.complete?o():(t.onload=o,t.onerror=function(e){return r(new Error("Fail to load image: "+i))})})},t.prototype.clear=function(){this._context.clearRect(0,0,this._width,this._height)},t.prototype.update=function(e){this._context.putImageData(e,0,0)},t.prototype.getWidth=function(){return this._width},t.prototype.getHeight=function(){return this._height},t.prototype.resize=function(e,t,i){var s=this,r=s._canvas,o=s._context,a=s.image;this._width=r.width=e,this._height=r.height=t,o.scale(i,i),o.drawImage(a,0,0)},t.prototype.getPixelCount=function(){return this._width*this._height},t.prototype.getImageData=function(){return this._context.getImageData(0,0,this._width,this._height)},t.prototype.remove=function(){this._canvas&&this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas)},t}(ht.ImageBase),vt=dt.default=gt,ft={},bt={},yt={};!function(e){function t(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);if(!t)throw new RangeError("'"+e+"' is not a valid hex color");return[t[1],t[2],t[3]].map(function(e){return parseInt(e,16)})}function i(e,t,i){return t/=255,i/=255,e=(e/=255)>.04045?Math.pow((e+.005)/1.055,2.4):e/12.92,t=t>.04045?Math.pow((t+.005)/1.055,2.4):t/12.92,i=i>.04045?Math.pow((i+.005)/1.055,2.4):i/12.92,[.4124*(e*=100)+.3576*(t*=100)+.1805*(i*=100),.2126*e+.7152*t+.0722*i,.0193*e+.1192*t+.9505*i]}function s(e,t,i){return t/=100,i/=108.883,e=(e/=95.047)>.008856?Math.pow(e,1/3):7.787*e+16/116,[116*(t=t>.008856?Math.pow(t,1/3):7.787*t+16/116)-16,500*(e-t),200*(t-(i=i>.008856?Math.pow(i,1/3):7.787*i+16/116))]}function r(e,t,r){var o=i(e,t,r);return s(o[0],o[1],o[2])}function o(e,t){var i=e[0],s=e[1],r=e[2],o=t[0],a=t[1],n=t[2],l=i-o,c=s-a,d=r-n,h=Math.sqrt(s*s+r*r),p=o-i,u=Math.sqrt(a*a+n*n)-h,m=Math.sqrt(l*l+c*c+d*d),g=Math.sqrt(m)>Math.sqrt(Math.abs(p))+Math.sqrt(Math.abs(u))?Math.sqrt(m*m-p*p-u*u):0;return p/=1,u/=1*(1+.045*h),g/=1*(1+.015*h),Math.sqrt(p*p+u*u+g*g)}function a(e,t){return o(r.apply(void 0,e),r.apply(void 0,t))}Object.defineProperty(e,"__esModule",{value:!0}),e.getColorDiffStatus=e.hexDiff=e.rgbDiff=e.deltaE94=e.rgbToCIELab=e.xyzToCIELab=e.rgbToXyz=e.hslToRgb=e.rgbToHsl=e.rgbToHex=e.hexToRgb=e.DELTAE94_DIFF_STATUS=void 0,e.DELTAE94_DIFF_STATUS={NA:0,PERFECT:1,CLOSE:2,GOOD:10,SIMILAR:50},e.hexToRgb=t,e.rgbToHex=function(e,t,i){return"#"+((1<<24)+(e<<16)+(t<<8)+i).toString(16).slice(1,7)},e.rgbToHsl=function(e,t,i){e/=255,t/=255,i/=255;var s=Math.max(e,t,i),r=Math.min(e,t,i),o=0,a=0,n=(s+r)/2;if(s!==r){var l=s-r;switch(a=n>.5?l/(2-s-r):l/(s+r),s){case e:o=(t-i)/l+(t<i?6:0);break;case t:o=(i-e)/l+2;break;case i:o=(e-t)/l+4}o/=6}return[o,a,n]},e.hslToRgb=function(e,t,i){var s,r,o;function a(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+6*(t-e)*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}if(0===t)s=r=o=i;else{var n=i<.5?i*(1+t):i+t-i*t,l=2*i-n;s=a(l,n,e+1/3),r=a(l,n,e),o=a(l,n,e-1/3)}return[255*s,255*r,255*o]},e.rgbToXyz=i,e.xyzToCIELab=s,e.rgbToCIELab=r,e.deltaE94=o,e.rgbDiff=a,e.hexDiff=function(e,i){return a(t(e),t(i))},e.getColorDiffStatus=function(t){return t<e.DELTAE94_DIFF_STATUS.NA?"N/A":t<=e.DELTAE94_DIFF_STATUS.PERFECT?"Perfect":t<=e.DELTAE94_DIFF_STATUS.CLOSE?"Close":t<=e.DELTAE94_DIFF_STATUS.GOOD?"Good":t<e.DELTAE94_DIFF_STATUS.SIMILAR?"Similar":"Wrong"}}(yt),Object.defineProperty(bt,"__esModule",{value:!0}),bt.Swatch=void 0;var At=yt,wt=function(){function e(e,t){this._rgb=e,this._population=t}return e.applyFilters=function(e,t){return t.length>0?e.filter(function(e){for(var i=e.r,s=e.g,r=e.b,o=0;o<t.length;o++)if(!t[o](i,s,r,255))return!1;return!0}):e},e.clone=function(t){return new e(t._rgb,t._population)},Object.defineProperty(e.prototype,"r",{get:function(){return this._rgb[0]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"g",{get:function(){return this._rgb[1]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"b",{get:function(){return this._rgb[2]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"rgb",{get:function(){return this._rgb},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"hsl",{get:function(){if(!this._hsl){var e=this._rgb,t=e[0],i=e[1],s=e[2];this._hsl=At.rgbToHsl(t,i,s)}return this._hsl},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"hex",{get:function(){if(!this._hex){var e=this._rgb,t=e[0],i=e[1],s=e[2];this._hex=At.rgbToHex(t,i,s)}return this._hex},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"population",{get:function(){return this._population},enumerable:!1,configurable:!0}),e.prototype.toJSON=function(){return{rgb:this.rgb,population:this.population}},e.prototype.getRgb=function(){return this._rgb},e.prototype.getHsl=function(){return this.hsl},e.prototype.getPopulation=function(){return this._population},e.prototype.getHex=function(){return this.hex},e.prototype.getYiq=function(){if(!this._yiq){var e=this._rgb;this._yiq=(299*e[0]+587*e[1]+114*e[2])/1e3}return this._yiq},Object.defineProperty(e.prototype,"titleTextColor",{get:function(){return this._titleTextColor&&(this._titleTextColor=this.getYiq()<200?"#fff":"#000"),this._titleTextColor},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bodyTextColor",{get:function(){return this._bodyTextColor&&(this._bodyTextColor=this.getYiq()<150?"#fff":"#000"),this._bodyTextColor},enumerable:!1,configurable:!0}),e.prototype.getTitleTextColor=function(){return this.titleTextColor},e.prototype.getBodyTextColor=function(){return this.bodyTextColor},e}();bt.Swatch=wt;var St={},Ct={};Object.defineProperty(Ct,"__esModule",{value:!0});var xt=function(){function e(e,t){this.pixels=e,this.opts=t;var i=t.sigBits,s=function(e,t,s){return(e<<2*i)+(t<<i)+s};this.getColorIndex=s;var r,o,a,n,l,c,d,h,p,u=8-i,m=new Uint32Array(1<<3*i);r=a=l=0,o=n=c=Number.MAX_VALUE;for(var g=e.length/4,v=0;v<g;){var f=4*v;if(v++,d=e[f+0],h=e[f+1],p=e[f+2],0!==e[f+3])m[s(d>>=u,h>>=u,p>>=u)]+=1,d>r&&(r=d),d<o&&(o=d),h>a&&(a=h),h<n&&(n=h),p>l&&(l=p),p<c&&(c=p)}this._colorCount=m.reduce(function(e,t){return t>0?e+1:e},0),this.hist=m,this.rmax=r,this.rmin=o,this.gmax=a,this.gmin=n,this.bmax=l,this.bmin=c}return Object.defineProperty(e.prototype,"colorCount",{get:function(){return this._colorCount},enumerable:!1,configurable:!0}),e}();Ct.default=xt;var It=xe&&xe.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(St,"__esModule",{value:!0});var kt=It(Ct),$t=function(){function e(e,t,i,s,r,o,a){this.histogram=a,this._volume=-1,this._count=-1,this.dimension={r1:e,r2:t,g1:i,g2:s,b1:r,b2:o}}return e.build=function(t){var i=new kt.default(t,{sigBits:5});return new e(i.rmin,i.rmax,i.gmin,i.gmax,i.bmin,i.bmax,i)},e.prototype.invalidate=function(){this._volume=this._count=-1,this._avg=null},e.prototype.volume=function(){if(this._volume<0){var e=this.dimension,t=e.r1,i=e.r2,s=e.g1,r=e.g2,o=e.b1,a=e.b2;this._volume=(i-t+1)*(r-s+1)*(a-o+1)}return this._volume},e.prototype.count=function(){if(this._count<0){for(var e=this.histogram,t=e.hist,i=e.getColorIndex,s=this.dimension,r=s.r1,o=s.r2,a=s.g1,n=s.g2,l=s.b1,c=s.b2,d=0,h=r;h<=o;h++)for(var p=a;p<=n;p++)for(var u=l;u<=c;u++){d+=t[i(h,p,u)]}this._count=d}return this._count},e.prototype.clone=function(){var t=this.histogram,i=this.dimension;return new e(i.r1,i.r2,i.g1,i.g2,i.b1,i.b2,t)},e.prototype.avg=function(){if(!this._avg){var e=this.histogram,t=e.hist,i=e.getColorIndex,s=this.dimension,r=s.r1,o=s.r2,a=s.g1,n=s.g2,l=s.b1,c=s.b2,d=0,h=void 0,p=void 0,u=void 0;h=p=u=0;for(var m=r;m<=o;m++)for(var g=a;g<=n;g++)for(var v=l;v<=c;v++){var f=t[i(m,g,v)];d+=f,h+=f*(m+.5)*8,p+=f*(g+.5)*8,u+=f*(v+.5)*8}this._avg=d?[~~(h/d),~~(p/d),~~(u/d)]:[~~(8*(r+o+1)/2),~~(8*(a+n+1)/2),~~(8*(l+c+1)/2)]}return this._avg},e.prototype.contains=function(e){var t=e[0],i=e[1],s=e[2],r=this.dimension,o=r.r1,a=r.r2,n=r.g1,l=r.g2,c=r.b1,d=r.b2;return i>>=3,s>>=3,(t>>=3)>=o&&t<=a&&i>=n&&i<=l&&s>=c&&s<=d},e.prototype.split=function(){var e=this.histogram,t=e.hist,i=e.getColorIndex,s=this.dimension,r=s.r1,o=s.r2,a=s.g1,n=s.g2,l=s.b1,c=s.b2,d=this.count();if(!d)return[];if(1===d)return[this.clone()];var h,p,u=o-r+1,m=n-a+1,g=c-l+1,v=Math.max(u,m,g),f=null;h=p=0;var b=null;if(v===u){b="r",f=new Uint32Array(o+1);for(var y=r;y<=o;y++){h=0;for(var A=a;A<=n;A++)for(var w=l;w<=c;w++){h+=t[i(y,A,w)]}p+=h,f[y]=p}}else if(v===m){b="g",f=new Uint32Array(n+1);for(A=a;A<=n;A++){h=0;for(y=r;y<=o;y++)for(w=l;w<=c;w++){h+=t[i(y,A,w)]}p+=h,f[A]=p}}else{b="b",f=new Uint32Array(c+1);for(w=l;w<=c;w++){h=0;for(y=r;y<=o;y++)for(A=a;A<=n;A++){h+=t[i(y,A,w)]}p+=h,f[w]=p}}for(var S=-1,C=new Uint32Array(f.length),x=0;x<f.length;x++){var I=f[x];S<0&&I>p/2&&(S=x),C[x]=p-I}var k=this;return function(e){var t=e+"1",i=e+"2",s=k.dimension[t],r=k.dimension[i],o=k.clone(),a=k.clone(),n=S-s,l=r-S;for(n<=l?(r=Math.min(r-1,~~(S+l/2)),r=Math.max(0,r)):(r=Math.max(s,~~(S-1-n/2)),r=Math.min(k.dimension[i],r));!f[r];)r++;for(var c=C[r];!c&&f[r-1];)c=C[--r];return o.dimension[i]=r,a.dimension[t]=r+1,[o,a]}(b)},e}();St.default=$t;var Tt={};Object.defineProperty(Tt,"__esModule",{value:!0});var Et=function(){function e(e){this._comparator=e,this.contents=[],this._sorted=!1}return e.prototype._sort=function(){this._sorted||(this.contents.sort(this._comparator),this._sorted=!0)},e.prototype.push=function(e){this.contents.push(e),this._sorted=!1},e.prototype.peek=function(e){return this._sort(),e="number"==typeof e?e:this.contents.length-1,this.contents[e]},e.prototype.pop=function(){return this._sort(),this.contents.pop()},e.prototype.size=function(){return this.contents.length},e.prototype.map=function(e){return this._sort(),this.contents.map(e)},e}();Tt.default=Et;var Pt=xe&&xe.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ft,"__esModule",{value:!0});var _t=bt,Lt=Pt(St),Rt=Pt(Tt);function Ft(e,t){for(var i=e.size();e.size()<t;){var s=e.pop();if(!(s&&s.count()>0))break;var r=s.split(),o=r[0],a=r[1];if(e.push(o),a&&a.count()>0&&e.push(a),e.size()===i)break;i=e.size()}}var Ot=ft.default=function(e,t){if(0===e.length||t.colorCount<2||t.colorCount>256)throw new Error("Wrong MMCQ parameters");var i=Lt.default.build(e);i.histogram.colorCount;var s=new Rt.default(function(e,t){return e.count()-t.count()});s.push(i),Ft(s,.75*t.colorCount);var r=new Rt.default(function(e,t){return e.count()*e.volume()-t.count()*t.volume()});return r.contents=s.contents,Ft(r,t.colorCount-r.size()),function(e){var t=[];for(;e.size();){var i=e.pop(),s=i.avg();s[0],s[1],s[2],t.push(new _t.Swatch(s,i.count()))}return t}(r)},Mt={};Object.defineProperty(Mt,"__esModule",{value:!0});var Ht=bt,Bt=yt,Dt={targetDarkLuma:.26,maxDarkLuma:.45,minLightLuma:.55,targetLightLuma:.74,minNormalLuma:.3,targetNormalLuma:.5,maxNormalLuma:.7,targetMutesSaturation:.3,maxMutesSaturation:.4,targetVibrantSaturation:1,minVibrantSaturation:.35,weightSaturation:3,weightLuma:6.5,weightPopulation:.5};function Vt(e,t,i,s,r,o,a,n,l,c){var d=null,h=0;return t.forEach(function(t){var p=t.hsl,u=p[1],m=p[2];if(u>=n&&u<=l&&m>=r&&m<=o&&!function(e,t){return e.Vibrant===t||e.DarkVibrant===t||e.LightVibrant===t||e.Muted===t||e.DarkMuted===t||e.LightMuted===t}(e,t)){var g=function(e,t,i,s,r,o,a){function n(e,t){return 1-Math.abs(e-t)}return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var i=0,s=0,r=0;r<e.length;r+=2){var o=e[r],a=e[r+1];i+=o*a,s+=a}return i/s}(n(e,t),a.weightSaturation,n(i,s),a.weightLuma,r/o,a.weightPopulation)}(u,a,m,s,t.population,i,c);(null===d||g>h)&&(d=t,h=g)}}),d}var Ut=Mt.default=function(e,t){t=Object.assign({},Dt,t);var i=function(e){var t=0;return e.forEach(function(e){t=Math.max(t,e.population)}),t}(e),s=function(e,t,i){var s={Vibrant:null,DarkVibrant:null,LightVibrant:null,Muted:null,DarkMuted:null,LightMuted:null};return s.Vibrant=Vt(s,e,t,i.targetNormalLuma,i.minNormalLuma,i.maxNormalLuma,i.targetVibrantSaturation,i.minVibrantSaturation,1,i),s.LightVibrant=Vt(s,e,t,i.targetLightLuma,i.minLightLuma,1,i.targetVibrantSaturation,i.minVibrantSaturation,1,i),s.DarkVibrant=Vt(s,e,t,i.targetDarkLuma,0,i.maxDarkLuma,i.targetVibrantSaturation,i.minVibrantSaturation,1,i),s.Muted=Vt(s,e,t,i.targetNormalLuma,i.minNormalLuma,i.maxNormalLuma,i.targetMutesSaturation,0,i.maxMutesSaturation,i),s.LightMuted=Vt(s,e,t,i.targetLightLuma,i.minLightLuma,1,i.targetMutesSaturation,0,i.maxMutesSaturation,i),s.DarkMuted=Vt(s,e,t,i.targetDarkLuma,0,i.maxDarkLuma,i.targetMutesSaturation,0,i.maxMutesSaturation,i),s}(e,i,t);return function(e,t,i){if(!e.Vibrant&&!e.DarkVibrant&&!e.LightVibrant){if(!e.DarkVibrant&&e.DarkMuted){var s=e.DarkMuted.hsl,r=s[0],o=s[1],a=s[2];a=i.targetDarkLuma,e.DarkVibrant=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}if(!e.LightVibrant&&e.LightMuted){var n=e.LightMuted.hsl;r=n[0],o=n[1],a=n[2],a=i.targetDarkLuma,e.DarkVibrant=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}}if(!e.Vibrant&&e.DarkVibrant){var l=e.DarkVibrant.hsl;r=l[0],o=l[1],a=l[2],a=i.targetNormalLuma,e.Vibrant=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}else if(!e.Vibrant&&e.LightVibrant){var c=e.LightVibrant.hsl;r=c[0],o=c[1],a=c[2],a=i.targetNormalLuma,e.Vibrant=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}if(!e.DarkVibrant&&e.Vibrant){var d=e.Vibrant.hsl;r=d[0],o=d[1],a=d[2],a=i.targetDarkLuma,e.DarkVibrant=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}if(!e.LightVibrant&&e.Vibrant){var h=e.Vibrant.hsl;r=h[0],o=h[1],a=h[2],a=i.targetLightLuma,e.LightVibrant=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}if(!e.Muted&&e.Vibrant){var p=e.Vibrant.hsl;r=p[0],o=p[1],a=p[2],a=i.targetMutesSaturation,e.Muted=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}if(!e.DarkMuted&&e.DarkVibrant){var u=e.DarkVibrant.hsl;r=u[0],o=u[1],a=u[2],a=i.targetMutesSaturation,e.DarkMuted=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}if(!e.LightMuted&&e.LightVibrant){var m=e.LightVibrant.hsl;r=m[0],o=m[1],a=m[2],a=i.targetMutesSaturation,e.LightMuted=new Ht.Swatch(Bt.hslToRgb(r,o,a),0)}}(s,0,t),s},zt={},Nt=xe&&xe.__awaiter||function(e,t,i,s){return new(i||(i=Promise))(function(r,o){function a(e){try{l(s.next(e))}catch(e){o(e)}}function n(e){try{l(s.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i(function(e){e(t)})).then(a,n)}l((s=s.apply(e,t||[])).next())})},Wt=xe&&xe.__generator||function(e,t){var i,s,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function n(o){return function(n){return function(o){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,s&&(r=2&o[0]?s.return:o[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,o[1])).done)return r;switch(s=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,s=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],s=0}finally{i=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,n])}}};Object.defineProperty(zt,"__esModule",{value:!0});zt.BasicPipeline=zt.Stage=void 0;var qt=ht,Gt=function(){function e(e){this.pipeline=e,this._map={}}return e.prototype.names=function(){return Object.keys(this._map)},e.prototype.has=function(e){return!!this._map[e]},e.prototype.get=function(e){return this._map[e]},e.prototype.register=function(e,t){return this._map[e]=t,this.pipeline},e}();zt.Stage=Gt;var jt=function(){function e(){this.filter=new Gt(this),this.quantizer=new Gt(this),this.generator=new Gt(this)}return e.prototype._buildProcessTasks=function(e){var t=this,i=e.filters,s=e.quantizer,r=e.generators;return 1===r.length&&"*"===r[0]&&(r=this.generator.names()),{filters:i.map(function(e){return o(t.filter,e)}),quantizer:o(this.quantizer,s),generators:r.map(function(e){return o(t.generator,e)})};function o(e,t){var i,s;return"string"==typeof t?i=t:(i=t.name,s=t.options),{name:i,fn:e.get(i),options:s}}},e.prototype.process=function(e,t){return Nt(this,void 0,void 0,function(){var i,s,r,o,a,n,l;return Wt(this,function(c){switch(c.label){case 0:return i=this._buildProcessTasks(t),s=i.filters,r=i.quantizer,o=i.generators,[4,this._filterColors(s,e)];case 1:return a=c.sent(),[4,this._generateColors(r,a)];case 2:return n=c.sent(),[4,this._generatePalettes(o,n)];case 3:return l=c.sent(),[2,{colors:n,palettes:l}]}})})},e.prototype._filterColors=function(e,t){return Promise.resolve(qt.applyFilters(t,e.map(function(e){return e.fn})))},e.prototype._generateColors=function(e,t){return Promise.resolve(e.fn(t.data,e.options))},e.prototype._generatePalettes=function(e,t){return Nt(this,void 0,void 0,function(){var i;return Wt(this,function(s){switch(s.label){case 0:return[4,Promise.all(e.map(function(e){var i=e.fn,s=e.options;return Promise.resolve(i(t,s))}))];case 1:return i=s.sent(),[2,Promise.resolve(i.reduce(function(t,i,s){return t[e[s].name]=i,t},{}))]}})})},e}();const Jt=(new(zt.BasicPipeline=jt)).filter.register("default",(e,t,i,s)=>s>=125&&!(e>250&&t>250&&i>250)).quantizer.register("mmcq",Ot).generator.register("default",Ut);var Yt,Kt;function Zt(e,{target:t=document.body}={}){if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const i=document.createElement("textarea"),s=document.activeElement;i.value=e,i.setAttribute("readonly",""),i.style.contain="strict",i.style.position="absolute",i.style.left="-9999px",i.style.fontSize="12pt";const r=document.getSelection(),o=r.rangeCount>0&&r.getRangeAt(0);t.append(i),i.select(),i.selectionStart=0,i.selectionEnd=e.length;let a=!1;try{a=document.execCommand("copy")}catch{}return i.remove(),o&&(r.removeAllRanges(),r.addRange(o)),s&&s.focus(),a}ct.DefaultOpts.ImageClass=vt,ct.DefaultOpts.quantizer="mmcq",ct.DefaultOpts.generators=["default"],ct.DefaultOpts.filters=["default"],ct.use(Jt),function(e){e.ALBUM_FAVORITES="albumfavorites",e.ARTIST_FAVORITES="artistfavorites",e.AUDIOBOOK_FAVORITES="audiobookfavorites",e.CATEGORYS="categorys",e.DEVICES="devices",e.EPISODE_FAVORITES="episodefavorites",e.PLAYER="player",e.PLAYLIST_FAVORITES="playlistfavorites",e.RECENTS="recents",e.SEARCH_MEDIA="searchmedia",e.SHOW_FAVORITES="showfavorites",e.TRACK_FAVORITES="trackfavorites",e.USERPRESETS="userpresets",e.UNDEFINED="undefined"}(Yt||(Yt={})),function(e){e.ALBUM_FAVORITES="Albums",e.ARTIST_FAVORITES="Artists",e.AUDIOBOOK_FAVORITES="Audiobooks",e.CATEGORY_BROWSER="Categorys",e.DEVICE_BROWSER="Devices",e.DESIGN="🎨 Design",e.EPISODE_FAVORITES="Episodes",e.GENERAL="General",e.PLAYER="Player",e.PLAYLIST_FAVORITES="Playlists",e.RECENT_BROWSER="Recents",e.SEARCH_MEDIA_BROWSER="Search",e.SHOW_FAVORITES="Shows",e.TRACK_FAVORITES="Tracks",e.USERPRESET_BROWSER="Presets"}(Kt||(Kt={}));const Qt=_e(ce+":utils");function Xt(e,t){return new CustomEvent(e,{bubbles:!0,composed:!0,detail:t})}function ei(e){return e?e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'"):""}function ti(){const e=new Date;return(e.getTime()+6e4*e.getTimezoneOffset())/1e3}function ii(e){if(!e)return;return function(e){const t=new Date(e.getTime()+60*e.getTimezoneOffset()*1e3),i=e.getTimezoneOffset()/60,s=e.getHours();return t.setHours(s-i),t}(new Date(1e3*(e||0))).toLocaleString()}function si(e){const t=new Date(e).toISOString().substring(11,19);return t.startsWith("00:")?t.substring(3):t}function ri(e){let t=!0,i="";if(!e)return i;for(let s=0,r=e.length;s<r;s++)" "!=e[s]?(i+=t?e[s].toUpperCase():e[s].toLowerCase(),t=!1):(t=!0,i+=" ");return i}function oi(e){let t=Yt.UNDEFINED;return e==Kt.ALBUM_FAVORITES?t=Yt.ALBUM_FAVORITES:e==Kt.ARTIST_FAVORITES?t=Yt.ARTIST_FAVORITES:e==Kt.AUDIOBOOK_FAVORITES?t=Yt.AUDIOBOOK_FAVORITES:e==Kt.CATEGORY_BROWSER?t=Yt.CATEGORYS:e==Kt.DEVICE_BROWSER?t=Yt.DEVICES:e==Kt.EPISODE_FAVORITES?t=Yt.EPISODE_FAVORITES:e==Kt.GENERAL||e==Kt.DESIGN||e==Kt.PLAYER?t=Yt.PLAYER:e==Kt.PLAYLIST_FAVORITES?t=Yt.PLAYLIST_FAVORITES:e==Kt.RECENT_BROWSER?t=Yt.RECENTS:e==Kt.SEARCH_MEDIA_BROWSER?t=Yt.SEARCH_MEDIA:e==Kt.SHOW_FAVORITES?t=Yt.SHOW_FAVORITES:e==Kt.TRACK_FAVORITES?t=Yt.TRACK_FAVORITES:e==Kt.USERPRESET_BROWSER&&(t=Yt.USERPRESETS),t}function ai(e){let t=Kt.GENERAL;return e==Yt.ALBUM_FAVORITES?t=Kt.ALBUM_FAVORITES:e==Yt.ARTIST_FAVORITES?t=Kt.ARTIST_FAVORITES:e==Yt.AUDIOBOOK_FAVORITES?t=Kt.AUDIOBOOK_FAVORITES:e==Yt.CATEGORYS?t=Kt.CATEGORY_BROWSER:e==Yt.DEVICES?t=Kt.DEVICE_BROWSER:e==Yt.EPISODE_FAVORITES?t=Kt.EPISODE_FAVORITES:e==Yt.PLAYER?t=Kt.PLAYER:e==Yt.PLAYLIST_FAVORITES?t=Kt.PLAYLIST_FAVORITES:e==Yt.RECENTS?t=Kt.RECENT_BROWSER:e==Yt.SEARCH_MEDIA?t=Kt.SEARCH_MEDIA_BROWSER:e==Yt.SHOW_FAVORITES?t=Kt.SHOW_FAVORITES:e==Yt.TRACK_FAVORITES?t=Kt.TRACK_FAVORITES:e==Yt.USERPRESETS&&(t=Kt.USERPRESET_BROWSER),t}function ni(e){if(e){const t=di("hui-card",e);if(t){return!!di(".element-preview",t)}return!1}return!1}function li(e){return!isNaN(parseFloat(e))&&!isNaN(+e)}function ci(e,t){if("object"!=typeof e||"object"!=typeof t)return e!==t?[e,t]:void 0;const i=Object.keys(e),s=Object.keys(t),r=new Set([...i,...s]),o={};for(const i of r){const s=e[i]||"",r=t[i]||"";if("object"==typeof s&&"object"==typeof r){const e=ci(s,r);e&&(o[i]=e)}else s!==r&&(o[i]=[s,r])}return 0===Object.keys(o).length?void 0:o}function di(e,t){return function t(i){if(!i||i===document||i===window)return null;i.assignedSlot&&(i=i.assignedSlot);const s=i.closest(e);return s||t(i.getRootNode().host)}(t)}const hi=async()=>{if(customElements.get("ha-input-search")&&customElements.get("ha-dropdown")&&customElements.get("ha-alert"))return;Qt.enabled&&Qt("loadHaFormLazyControls - loading lazy controls via partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load(),Qt.enabled&&Qt("loadHaFormLazyControls - done; lazy controls should now be loaded")};function pi(e){const t=e.currentTarget,i=Zt(t.innerText);return Qt.enabled&&Qt("copyToClipboard - text copied to clipboard:\n%s",JSON.stringify(t.innerText)),window.status="text copied to clipboard",i}function ui(e){let t="",i="";for(;;){if(null===e){i="no ex argument";break}if("object"==typeof e&&"code"in e&&"message"in e){const s=e.code,r=e.message;if("service_validation_error"==s&&r.startsWith("Validation error: ")){t=r.substring(18),i="ServiceValidationError";break}t=r,i="HomeAssistantError";break}if("object"==typeof e&&"message"in e){t=e.message,i="Error interface";break}Qt.enabled&&Qt("%cgetHomeAssistantErrorMessage - error message (string):\n%s","color:red",e+""),t=e+"",i="string";break}return Qt.enabled&&Qt("%cgetHomeAssistantErrorMessage - parsed %s message:\n- %s","color:red",i,JSON.stringify(t)),t}const mi=_e(ce+":media-browser-utils");function gi(e){let t=e.replace(/[^a-zA-Z0-9 ]/g,"");return t&&(t=t.trim()),t}function vi(e,t,i,s){if(!i)return;let r=function(e,t){for(const i in e)if(i===gi(t))return e[i]}(t.customImageUrls,e.name||e.Name||"")??e.image_url;return r||(r=t.customImageUrls?.default||s),r?.match(/https:\/\/brands\.home-assistant\.io\/.+\/logo.png/)&&(r=r?.replace("logo.png","icon.png")),r||""}function fi(e){return'\'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="'+e+"\"></path></svg>'"}function bi(e,t,i=void 0,s=void 0,r=void 0,o=void 0){let a=function(e){return e}(e);return a=function(e,t){if(!t)return e;if(e){if((e=(e=(e=(e=(e=(e=(e=(e=e.replace("{player.name}",t.name)).replace("{player.friendly_name}",t.attributes.friendly_name||"")).replace("{player.source}",t.attributes.source||"")).replace("{player.media_album_name}",t.attributes.media_album_name||"")).replace("{player.media_artist}",t.attributes.media_artist||"")).replace("{player.media_title}",t.attributes.media_title||"")).replace("{player.media_track}",t.attributes.media_track?.toString()||"")).replace("{player.state}",t.state||"")).indexOf("{player.state_ad}")>-1){let i=t.state+"";"ad"==t.attributes.sp_playing_type&&(i+=" Advertisement"),e=e.replace("{player.state_ad}",i)}if(e.indexOf("{player.source_noaccount}")>-1){let i=t.attributes.source||"";const s=i.indexOf("(");s>0&&(i=i.substring(0,s-1)),e=e.replace("{player.source_noaccount}",(i||"").trim())}e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace("{player.sp_context_uri}",t.attributes.sp_context_uri||"")).replace("{player.sp_device_id}",t.attributes.sp_device_id||"")).replace("{player.sp_device_is_brand_sonos}",t.attributes.sp_device_is_brand_sonos+""||"")).replace("{player.sp_device_is_chromecast}",t.attributes.sp_device_is_chromecast+""||"")).replace("{player.sp_device_music_source}",t.attributes.sp_device_music_source+""||"")).replace("{player.sp_device_name}",t.attributes.sp_device_name||"")).replace("{player.sp_item_type}",t.attributes.sp_item_type||"")).replace("{player.sp_playing_type}",t.attributes.sp_playing_type||"")).replace("{player.sp_playlist_name}",t.attributes.sp_playlist_name||""),e=(e=(e=(e=(e=(e=(e=(e=(e=(e=t.attributes.sp_playlist_name&&"Unknown"!=t.attributes.sp_playlist_name?e.replace("{player.sp_playlist_name_title}"," ("+t.attributes.sp_playlist_name+")"):e.replace("{player.sp_playlist_name_title}","")).replace("{player.sp_playlist_uri}",t.attributes.sp_playlist_uri||"")).replace("{player.sp_track_is_explicit}",t.attributes.sp_track_is_explicit+""||"")).replace("{player.sp_user_country}",t.attributes.sp_user_country||"")).replace("{player.sp_user_display_name}",t.attributes.sp_user_display_name||"")).replace("{player.sp_user_email}",t.attributes.sp_user_email||"")).replace("{player.sp_user_has_web_player_credentials}",t.attributes.sp_user_has_web_player_credentials+"")).replace("{player.sp_user_id}",t.attributes.sp_user_id||"")).replace("{player.sp_user_product}",t.attributes.sp_user_product||"")).replace("{player.sp_user_uri}",t.attributes.sp_user_uri||"")}return e}(a,i),a=function(e,t,i,s){if(!e)return e;if(e.indexOf("{medialist.itemcount}")>-1){const t=(i||[]).length.toString();e=e.replace("{medialist.itemcount}",t)}if(e.indexOf("{medialist.lastupdatedon}")>-1){const i=ii(t||0);e=e.replace("{medialist.lastupdatedon}",i||"")}if(e.indexOf("{medialist.filteritemcount}")>-1){let t="";t=s?(s||[]).length.toString():(i||[]).length.toString(),e=e.replace("{medialist.filteritemcount}",t)}return e}(a,s,r,o),""==(a+"").trim()&&(a=void 0),a}function yi(e){window.open(e,"_blank")}function Ai(e,t,i=50,s=!0){const r=new Array,o=new Array;let a=0,n=!1;for(const l of e||[])if(l.uri==t.uri&&(n=!0),n){let e=!1;if(s)for(const t of r)if(l.uri==t){e=!0;break}if(!e&&(r.push(l.uri),o.push(l.name+" (id="+l.id+")"),a+=1,a>=(i||50)))break}return mi.enabled&&mi("getMediaListTrackUrisRemaining - track name(s) remaining:\n%s",JSON.stringify(o,null,2)),{uris:r,names:o}}var wi;function Si(e,t){null==t&&(t="; ");let i="";if(e)for(const s of e.authors||[])null!=s&&null!=s.name&&s.name.length>0&&(i.length>0&&(i+=t),i+=s.name);return i}function Ci(e,t){null==t&&(t="; ");let i="";if(e)for(const s of e.narrators||[])null!=s&&null!=s.name&&s.name.length>0&&(i.length>0&&(i+=t),i+=s.name);return i}!function(e){e.ALBUMS="Albums",e.ARTISTS="Artists",e.AUDIOBOOKS="AudioBooks",e.EPISODES="Episodes",e.PLAYLISTS="Playlists",e.SHOWS="Shows",e.TRACKS="Tracks",e.ALBUM_NEW_RELEASES="Album New Releases",e.ALBUM_TRACKS="Album Tracks",e.ARTIST_ALBUMS="Artist Albums",e.ARTIST_ALBUMS_APPEARSON="Artist Album ApearsOn",e.ARTIST_ALBUMS_COMPILATION="Artist Album Compilations",e.ARTIST_ALBUMS_SINGLE="Artist Album Singles",e.ARTIST_RELATED_ARTISTS="Artist Related Artists",e.ARTIST_TOP_TRACKS="Artist Top Tracks",e.AUDIOBOOK_EPISODES="Audiobook Chapters",e.SHOW_EPISODES="Show Episodes",e.MAIN_MENU="Menu"}(wi||(wi={}));const xi=_e(ce+":media-browser-base");class Ii extends re{constructor(){super(),this.nowPlayingBars=B`
      <div class="bars" slot="meta">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      `,this.mousedownTimestamp=0,this.touchstartScrollTop=0}render(){this.config=this.store.config,this.section=this.store.section,this.hideTitle=!0,this.hideSubTitle=!0,this.listItemClass="button",this.itemsHaveImages=(this.items||[]).some(e=>e.image_url),this.section!=Yt.SEARCH_MEDIA?this.mediaItemType=this.section:this.searchMediaType==wi.ALBUMS?this.mediaItemType=Yt.ALBUM_FAVORITES:this.searchMediaType==wi.ARTISTS?this.mediaItemType=Yt.ARTIST_FAVORITES:this.searchMediaType==wi.AUDIOBOOKS?this.mediaItemType=Yt.AUDIOBOOK_FAVORITES:this.searchMediaType==wi.EPISODES?this.mediaItemType=Yt.EPISODE_FAVORITES:this.searchMediaType==wi.PLAYLISTS?this.mediaItemType=Yt.PLAYLIST_FAVORITES:this.searchMediaType==wi.SHOWS?this.mediaItemType=Yt.SHOW_FAVORITES:this.searchMediaType==wi.TRACKS||this.searchMediaType==wi.ALBUM_TRACKS?this.mediaItemType=Yt.TRACK_FAVORITES:this.searchMediaType==wi.ARTIST_ALBUMS||this.searchMediaType==wi.ARTIST_ALBUMS_APPEARSON||this.searchMediaType==wi.ARTIST_ALBUMS_COMPILATION||this.searchMediaType==wi.ARTIST_ALBUMS_SINGLE?this.mediaItemType=Yt.ALBUM_FAVORITES:this.searchMediaType==wi.ARTIST_RELATED_ARTISTS?this.mediaItemType=Yt.ARTIST_FAVORITES:this.searchMediaType==wi.ARTIST_TOP_TRACKS?this.mediaItemType=Yt.TRACK_FAVORITES:this.searchMediaType==wi.SHOW_EPISODES&&(this.mediaItemType=Yt.EPISODE_FAVORITES),this.mediaItemType==Yt.ALBUM_FAVORITES?(this.hideTitle=this.config.albumFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.albumFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.ARTIST_FAVORITES?(this.hideTitle=this.config.artistFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.artistFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.AUDIOBOOK_FAVORITES?(this.hideTitle=this.config.audiobookFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.audiobookFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.CATEGORYS?(this.hideTitle=this.config.categoryBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.categoryBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.DEVICES?(this.hideTitle=this.config.deviceBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.deviceBrowserItemsHideSubTitle||!1,this.listItemClass+=" button-device"):this.mediaItemType==Yt.EPISODE_FAVORITES?(this.hideTitle=this.config.episodeFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.episodeFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.PLAYLIST_FAVORITES?(this.hideTitle=this.config.playlistFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.playlistFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.RECENTS?(this.hideTitle=this.config.recentBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.recentBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.SHOW_FAVORITES?(this.hideTitle=this.config.showFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.showFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.TRACK_FAVORITES?(this.hideTitle=this.config.trackFavBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.trackFavBrowserItemsHideSubTitle||!1):this.mediaItemType==Yt.USERPRESETS&&(this.hideTitle=this.config.userPresetBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.userPresetBrowserItemsHideSubTitle||!1),this.section==Yt.SEARCH_MEDIA&&this.config.searchMediaBrowserUseDisplaySettings&&(this.hideTitle=this.config.searchMediaBrowserItemsHideTitle||!1,this.hideSubTitle=this.config.searchMediaBrowserItemsHideSubTitle||!1)}styleMediaBrowser(){const e=this.config.mediaBrowserItemsColor,t=this.config.mediaBrowserItemsListColor,i=this.config.mediaBrowserItemsSvgIconColor,s=this.config.mediaBrowserItemsTitleFontSize,r=this.config.mediaBrowserItemsSubTitleFontSize,o={};if(o["--items-per-row"]=`${this.itemsPerRow}`,this.section===Yt.DEVICES){const e="var(--crm-text, var(--primary-text-color, #17221e))";o["--crm-media-browser-items-color"]=e,o["--crm-media-browser-items-list-color"]=e,o["--crm-media-browser-items-svgicon-color"]="var(--crm-accent, var(--primary-color, #159568))"}else e&&(o["--crm-media-browser-items-color"]=`${e}`),t&&(o["--crm-media-browser-items-list-color"]=`${t}`),i&&(o["--crm-media-browser-items-svgicon-color"]=`${i}`);return s&&(o["--crm-media-browser-items-title-font-size"]=`${s}`),r&&(o["--crm-media-browser-items-subtitle-font-size"]=`${r}`),Me(o)}connectedCallback(){super.connectedCallback(),this.store.config.touchSupportDisabled?(this.isTouchDevice=!1,xi("connectedCallback - touch supported events are disabled via card configuration\n- isTouchDevice=%s",JSON.stringify(this.isTouchDevice))):(this.isTouchDevice=function(){let e=!1;return window.PointerEvent&&"maxTouchPoints"in navigator?navigator.maxTouchPoints>0&&(e=!0):(window.matchMedia&&window.matchMedia("(any-pointer:coarse)").matches||window.TouchEvent||"ontouchstart"in window)&&(e=!0),e}(),xi("connectedCallback - touch supported events are enabled programatically\n- isTouchDevice=%s",JSON.stringify(this.isTouchDevice))),this.isTouchDevice&&this.addEventListener("touchend",function(e){e.cancelable&&e.preventDefault()},{passive:!1})}onMediaBrowserItemClick(e){if(-1==this.mousedownTimestamp)return!0;const t=Date.now()-this.mousedownTimestamp;return this.mousedownTimestamp=-1,t<1e3?this.dispatchEvent(Xt(de,e.detail)):this.dispatchEvent(Xt(he,e.detail))}onMediaBrowserItemMouseDown(){return this.mousedownTimestamp=Date.now(),setTimeout(()=>{this.shadowRoot?.activeElement?.dispatchEvent(new Event("click"))},1100),!0}onMediaBrowserItemMouseUp(e){if(-1==this.mousedownTimestamp)return!0;const t=Date.now()-this.mousedownTimestamp;return this.mousedownTimestamp=-1,t<1e3?this.dispatchEvent(Xt(de,e.detail)):this.dispatchEvent(Xt(he,e.detail))}onMediaBrowserItemTouchStart(e){this.mousedownTimestamp=Date.now();const t=di("#mediaBrowserContentElement",this);return t&&(this.touchstartScrollTop=t.scrollTop),setTimeout(()=>{if(-1==this.mousedownTimestamp)return;const t=di("#mediaBrowserContentElement",this);let i=0;return t&&(i=this.touchstartScrollTop-t.scrollTop,0!=i)?void 0:(this.mousedownTimestamp=-1,this.dispatchEvent(Xt(he,e.detail)))},1100),!0}onMediaBrowserItemTouchEnd(e){if(-1==this.mousedownTimestamp)return!0;const t=di("#mediaBrowserContentElement",this);let i=0;if(t&&(i=this.touchstartScrollTop-t.scrollTop,0!=i))return!0;const s=Date.now()-this.mousedownTimestamp;return this.mousedownTimestamp=-1,s<1e3?this.dispatchEvent(Xt(de,e.detail)):this.dispatchEvent(Xt(he,e.detail))}styleMediaBrowserItemBackgroundImage(e,t){let i="100%";return this.section==Yt.DEVICES&&(i="50%"),e?.includes("svg+xml")?B`
      <style>
        .button:nth-of-type(${t+1}) .thumbnail {
          mask-image: url(${e});
          mask-size: ${i};
          background-color: var(--crm-media-browser-items-svgicon-color, ${o(be)});
        }
      </style>
    `:B`
      <style>
        .button:nth-of-type(${t+1}) .thumbnail {
          background-image: url(${e});
          background-size: ${i};
          background-color: var(--crm-media-browser-items-svgicon-color, transparent);
        }
      </style>
    `}buildMediaBrowserItems(){return(this.items||[]).map(e=>{const t={image_url:vi(e,this.config,this.itemsHaveImages,"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TS0UqDnYQcchQnexiRXQrVSyChdJWaNXB5KV/0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QZwcnRRcp8b6k0CLGC4/3cd49h/fuA4RWjalmXxxQNcvIJBNivrAqBl8RgA8hxDAnMVNPZRdz8Kyve+qluovyLO++P2tQKZoM8InEcaYbFvEG8cympXPeJw6ziqQQnxNPGnRB4keuyy6/cS47LPDMsJHLzBOHicVyD8s9zCqGSjxNHFFUjfKFvMsK5y3Oaq3BOvfkLwwVtZUs12mNIYklpJCGCBkNVFGDhSjtGikmMnSe8PCPOv40uWRyVcHIsYA6VEiOH/wPfs/WLMWm3KRQAgi82PbHOBDcBdpN2/4+tu32CeB/Bq60rr/eAmY/SW92tcgRMLQNXFx3NXkPuNwBRp50yZAcyU9LKJWA9zP6pgIwfAsMrLlz65zj9AHI0ayWb4CDQ2CiTNnrHu/u753bvz2d+f0A+AZy3KgprtwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfoBQEMNhNCJ/KVAAACg0lEQVR42u3BgQAAAADDoPlTX+EAVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwG/GFwABsN92WwAAAABJRU5ErkJggg=="),title:e.name||e.Name,subtitle:e.type,is_active:!1};if(this.mediaItemType==Yt.ALBUM_FAVORITES){const i=e;i.artists&&i.artists.length>0&&(this.searchMediaType==wi.ARTIST_ALBUMS?t.subtitle=i.release_date||i.artists[0]?.name||i.total_tracks||"0 tracks":t.subtitle=i.artists[0]?.name||i.total_tracks||"0 tracks"),i.name==this.store.player.attributes.media_album_name&&(t.is_active=!0)}else if(this.mediaItemType==Yt.ARTIST_FAVORITES){const i=e;t.subtitle=(i?.followers?.total||0)+" followers"||e.type,i.uri==this.store.player.attributes.sp_artist_uri&&(t.is_active=!0)}else if(this.mediaItemType==Yt.AUDIOBOOK_FAVORITES){const i=e;t.subtitle=Si(i,", ")||e.type,i.uri==this.store.player.attributes.sp_context_uri&&(t.is_active=!0)}else if(this.mediaItemType==Yt.CATEGORYS){const i=e;t.subtitle=i.type}else if(this.mediaItemType==Yt.DEVICES){const i=e;t.title=i.Name;const s=i.DeviceInfo?.BrandDisplayName?.trim(),r=i.DeviceInfo?.ModelDisplayName?.trim(),o=[s,r].filter(e=>Boolean(e&&"unknown"!==e.toLowerCase()));t.subtitle=o.length?o.join(", "):"Spotify Connect",""!=(i.Id||"")?i.Id==this.store.player.attributes.sp_device_id?t.is_active=!0:t.is_active=!1:i.Name==this.store.player.attributes.source?t.is_active=!0:t.is_active=!1}else if(this.mediaItemType==Yt.EPISODE_FAVORITES){const i=e;t.subtitle=i.show?.name||i.release_date||"",i.uri==this.store.player.attributes.media_content_id&&(t.is_active=!0)}else if(this.mediaItemType==Yt.PLAYLIST_FAVORITES){const i=e;t.subtitle=(i.tracks?.total||0)+" tracks",i.uri==this.store.player.attributes.sp_playlist_uri&&(t.is_active=!0)}else if(this.mediaItemType==Yt.RECENTS);else if(this.mediaItemType==Yt.SHOW_FAVORITES){const i=e;t.subtitle=(i.total_episodes||0)+" episodes",i.uri==this.store.player.attributes.sp_context_uri&&(t.is_active=!0)}else if(this.mediaItemType==Yt.TRACK_FAVORITES){const i=e;i.artists&&i.artists.length>0&&(t.subtitle=i.artists[0].name||e.type),i.uri==this.store.player.attributes.media_content_id&&(t.is_active=!0)}else if(this.mediaItemType==Yt.USERPRESETS){const i=e;t.subtitle=i.subtitle||e.uri}else this.mediaItemType==Yt.PLAYER||console.log("%cmedia-browser-utils - unknown mediaItemType = %s; mbi_info not set!","color:red",JSON.stringify(this.mediaItemType));return{...e,mbi_item:t}})}}Ce([De({attribute:!1})],Ii.prototype,"store",void 0),Ce([De({attribute:!1})],Ii.prototype,"items",void 0),Ce([De({attribute:!1})],Ii.prototype,"itemsPerRow",void 0),Ce([De({attribute:!1})],Ii.prototype,"searchMediaType",void 0),Ce([function(e){return Ue({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}({passive:!0})],Ii.prototype,"onMediaBrowserItemTouchStart",null);customElements.define("crm-media-browser-list",class extends Ii{constructor(){super()}render(){return super.render(),B`
      <mwc-list multi class="list" style=${this.styleMediaBrowser()}>
        ${this.buildMediaBrowserItems().map((e,t)=>B`
            ${this.styleMediaBrowserItemBackgroundImage(e.mbi_item.image_url,t)}
            ${(()=>this.isTouchDevice?B`
                  <mwc-list-item
                    hasMeta
                    class="${this.listItemClass}"
                    @touchstart=${{handleEvent:()=>this.onMediaBrowserItemTouchStart(Xt(de,e)),passive:!0}}
                    @touchend=${()=>this.onMediaBrowserItemTouchEnd(Xt(de,e))}
                  >
                    <div class="row">${this.renderMediaBrowserItem(e,!e.mbi_item.image_url||!this.hideTitle,!this.hideSubTitle)}</div>
                    ${qe(e.mbi_item.is_active&&this.store.player.isPlaying(),()=>B`${this.nowPlayingBars}`)}
                  </mwc-list-item>
                `:B`
                  <mwc-list-item
                    hasMeta
                    class="${this.listItemClass}"
                    @click=${()=>this.onMediaBrowserItemClick(Xt(de,e))}
                    @mousedown=${()=>this.onMediaBrowserItemMouseDown()}
                    @mouseup=${()=>this.onMediaBrowserItemMouseUp(Xt(de,e))}
                  >
                    <div class="row">${this.renderMediaBrowserItem(e,!e.mbi_item.image_url||!this.hideTitle,!this.hideSubTitle)}</div>
                    ${qe(e.mbi_item.is_active&&this.store.player.isPlaying(),()=>B`${this.nowPlayingBars}`)}
                  </mwc-list-item>
                `)()}
          `)}
      </mwc-list>
    `}renderMediaBrowserItem(e,t=!0,i=!0){let s="";return e.mbi_item.is_active&&(s=" title-active"),B`
      <div class="thumbnail"></div>
      <div class="title${s}" ?hidden=${!t}>
        ${e.mbi_item.title}
        <div class="subtitle" ?hidden=${!i}>${ri(e.mbi_item.subtitle||"")}</div>
      </div>
    `}static get styles(){return[a`
        :host {
          /* The card's resolved foreground is the safe default for all themes. */
          --crm-list-foreground: var(--crm-text, var(--primary-text-color, #f0fdf4));
          --crm-list-secondary: var(--crm-text-secondary, var(--secondary-text-color, var(--crm-list-foreground)));
          --crm-list-accent: var(--crm-accent, var(--primary-color, #34d399));
        }

        .button {
          --control-button-padding: 0px;
          --icon-width: 94px;
          height: var(--icon-width);
          margin: 0.4rem 0.0rem;
        }

        .button-device {
          --icon-width: 50px !important;
          margin: 0 !important;
        }

        .button-track {
          --icon-width: 80px !important;
          margin: 0 !important;
          padding: 0.25rem;
        }

        .row {
          display: flex;
          min-width: 0;
          color: var(--crm-list-foreground);
        }

        .thumbnail {
          width: var(--icon-width);
          height: var(--icon-width);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left;
          mask-repeat: no-repeat;
          mask-position: left;
          border-radius: 0.5rem;
        }

        .title {
          color: var(--crm-list-foreground);
          font-size: var(--crm-media-browser-items-title-font-size, 1.1rem);
          font-weight: normal;
          padding: 0 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          align-self: center;
          flex: 1;
          min-width: 0;
        }

        .title-active {
          color: var(--crm-list-foreground);
          font-weight: 600;
        }

        .subtitle {
          color: var(--crm-list-secondary);
          font-size: var(--crm-media-browser-items-subtitle-font-size, 0.8rem);
          font-weight: normal;
          line-height: 120%;
          padding-bottom: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .bars {
          height: 30px;
          left: 50%;
          margin: -30px 0 0 -20px;
          position: relative;
          top: 65%;
          width: 40px;
        }

        .bar {
          background: var(--crm-list-accent);
          bottom: 1px;
          height: 3px;
          position: absolute;
          width: 3px;
          animation: sound 0ms -800ms linear infinite alternate;
          display: block;
        }

        @keyframes sound {
          0% { opacity: .35; height: 3px; }
          100% { opacity: 1; height: 1rem; }
        }

        .bar:nth-child(1) { left: 1px; animation-duration: 474ms; }
        .bar:nth-child(2) { left: 5px; animation-duration: 433ms; }
        .bar:nth-child(3) { left: 9px; animation-duration: 407ms; }
        .bar:nth-child(4) { left: 13px; animation-duration: 458ms; }
      `,ye]}});customElements.define("crm-media-browser-icons",class extends Ii{constructor(){super()}render(){return super.render(),B`
      <div class="icons" style=${this.styleMediaBrowser()}>
        ${this.buildMediaBrowserItems().map((e,t)=>B`
          ${this.styleMediaBrowserItemBackgroundImage(e.mbi_item.image_url,t)}
          ${(()=>this.isTouchDevice?B`
                <ha-control-button
                  class="button"
                  isTouchDevice="${this.isTouchDevice}"
                  @touchstart=${{handleEvent:()=>this.onMediaBrowserItemTouchStart(Xt(de,e)),passive:!0}}
                  @touchend=${()=>this.onMediaBrowserItemTouchEnd(Xt(de,e))}
                >
                  ${this.renderMediaBrowserItem(e,!e.mbi_item.image_url||!this.hideTitle,!this.hideSubTitle)}
                </ha-control-button>
              `:B`
              <ha-control-button
                class="button"
                isTouchDevice="${this.isTouchDevice}"
                @click=${()=>this.onMediaBrowserItemClick(Xt(de,e))}
                @mousedown=${()=>this.onMediaBrowserItemMouseDown()}
                @mouseup=${()=>this.onMediaBrowserItemMouseUp(Xt(de,e))}
              >
                ${this.renderMediaBrowserItem(e,!e.mbi_item.image_url||!this.hideTitle,!this.hideSubTitle)}
              </ha-control-button>
            `)()}
        `)}
      </div>
    `}renderMediaBrowserItem(e,t=!0,i=!0){const s=e.mbi_item.is_active?" title-active":"",r=Boolean(e.mbi_item.image_url),o=e.mbi_item.is_active?this.nowPlayingBars:B``;return B`
      <div class="thumbnail">
        ${o}
      </div>
      <div class="title${s}${r?" title-on-image":""}" ?hidden=${!t}>
        ${e.mbi_item.title}
        <div class="subtitle" ?hidden=${!i}>${ri(e.mbi_item.subtitle||"")}</div>
      </div>
    `}static get styles(){return[a`
        :host {
          --crm-grid-title-color: var(--crm-text, var(--primary-text-color, #f0fdf4));
          --crm-grid-subtitle-color: var(--crm-text-secondary, var(--secondary-text-color, var(--crm-grid-title-color)));
        }

        .icons {
          display: flex;
          flex-wrap: wrap;
        }

        .button {
          --control-button-padding: 0px;
          --margin: 0.6%;
          --width: calc(100% / var(--items-per-row) - (var(--margin) * 2));
          width: var(--width);
          height: var(--width);
          margin: var(--margin);
          color: var(--crm-grid-title-color);
        }

        .thumbnail {
          width: 100%;
          padding-bottom: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          mask-repeat: no-repeat;
          mask-position: center;
        }

        .title {
          color: var(--crm-grid-title-color);
          font-size: var(--crm-media-browser-items-title-font-size, 0.8rem);
          font-weight: normal;
          line-height: 160%;
          padding: 0.75rem 0.5rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: absolute;
          width: 100%;
          bottom: 0;
          box-sizing: border-box;
          background: transparent;
        }

        /* Image thumbnails require a dark overlay and light text regardless
           of the surrounding light/dark/custom card theme. */
        .title-on-image {
          color: #ffffff;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
        }

        .title-active:not(.title-on-image) {
          color: var(--crm-grid-title-color);
        }

        .subtitle {
          color: var(--crm-grid-subtitle-color);
          font-size: var(--crm-media-browser-items-subtitle-font-size, 0.8rem);
          line-height: 120%;
          width: 100%;
          padding-bottom: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .title-on-image .subtitle {
          color: rgba(255, 255, 255, 0.88);
        }

        .bars {
          position: absolute;
          width: 20px;
          height: 10px;
          margin-top: 20px;
          margin-left: 10px;
        }

        .bar {
          background: var(--crm-accent, var(--primary-color, #34d399));
          bottom: 1px;
          height: 3px;
          position: absolute;
          width: 3px;
          animation: sound 0ms -800ms linear infinite alternate;
          display: block;
        }

        @keyframes sound {
          0% { opacity: .35; height: 3px; }
          100% { opacity: 1; height: 1rem; }
        }

        .bar:nth-child(1) { left: 1px; animation-duration: 474ms; }
        .bar:nth-child(2) { left: 5px; animation-duration: 433ms; }
        .bar:nth-child(3) { left: 9px; animation-duration: 407ms; }
        .bar:nth-child(4) { left: 13px; animation-duration: 458ms; }
      `]}});var ki="M11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6C9.66 6 11 7.34 11 9M14 20H2V18C2 15.79 4.69 14 8 14C11.31 14 14 15.79 14 18M7 9C7 9.55 7.45 10 8 10C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8C7.45 8 7 8.45 7 9M4 18H12C12 16.9 10.21 16 8 16C5.79 16 4 16.9 4 18M22 12V14H13V12M22 8V10H13V8M22 4V6H13V4Z",$i="M11,14C12,14 13.05,14.16 14.2,14.44C13.39,15.31 13,16.33 13,17.5C13,18.39 13.25,19.23 13.78,20H3V18C3,16.81 3.91,15.85 5.74,15.12C7.57,14.38 9.33,14 11,14M11,12C9.92,12 9,11.61 8.18,10.83C7.38,10.05 7,9.11 7,8C7,6.92 7.38,6 8.18,5.18C9,4.38 9.92,4 11,4C12.11,4 13.05,4.38 13.83,5.18C14.61,6 15,6.92 15,8C15,9.11 14.61,10.05 13.83,10.83C13.05,11.61 12.11,12 11,12M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z",Ti="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",Ei="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8M13 11.5C14.11 10.82 15.6 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C15.73 9 14.23 9.28 13 9.84V11.5M17.5 11.67C15.79 11.67 14.29 11.93 13 12.46V14.15C14.11 13.5 15.6 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67M20 14.57C19.13 14.41 18.29 14.33 17.5 14.33C15.67 14.33 14.17 14.6 13 15.13V16.82C14.11 16.16 15.6 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57Z",Pi="M7 3C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.89 18.1 3 17 3H7M7 5H17V18L12 15.82L7 18V5M12 6V11.3C11.7 11.1 11.4 11 11 11C9.9 11 9 11.9 9 13C9 14.11 9.9 15 11 15C12.11 15 13 14.11 13 13V8H15V6H12Z",_i="M2 11V13C7 13 11 17 11 22H13C13 15.9 8.1 11 2 11M20 2H10C8.9 2 8 2.9 8 4V10.5C9 11 9.9 11.7 10.7 12.4C11.6 11 13.2 10 15 10C17.8 10 20 12.2 20 15S17.8 20 15 20H14.8C14.9 20.7 15 21.3 15 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2M15 8C13.9 8 13 7.1 13 6C13 4.9 13.9 4 15 4C16.1 4 17 4.9 17 6S16.1 8 15 8M15 18C14.8 18 14.5 18 14.3 17.9C13.8 16.4 13.1 15.1 12.2 13.9C12.6 12.8 13.7 11.9 15 11.9C16.7 11.9 18 13.2 18 14.9S16.7 18 15 18M2 15V17C4.8 17 7 19.2 7 22H9C9 18.1 5.9 15 2 15M2 19V22H5C5 20.3 3.7 19 2 19",Li="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M7 7H17V5H19V19H5V5H7V7M13 12H16V14H13V17H11V14H8V12H11V9H13V12Z",Ri="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z",Fi="M12,20L15.46,14H15.45C15.79,13.4 16,12.73 16,12C16,10.8 15.46,9.73 14.62,9H19.41C19.79,9.93 20,10.94 20,12A8,8 0 0,1 12,20M4,12C4,10.54 4.39,9.18 5.07,8L8.54,14H8.55C9.24,15.19 10.5,16 12,16C12.45,16 12.88,15.91 13.29,15.77L10.89,19.91C7,19.37 4,16.04 4,12M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12M12,4C14.96,4 17.54,5.61 18.92,8H12C10.06,8 8.45,9.38 8.08,11.21L5.7,7.08C7.16,5.21 9.44,4 12,4M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",Oi="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z",Mi="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z",Hi="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z",Bi="M10.86 15.37C10.17 14.6 9.7 13.68 9.55 12.65C9.25 13.11 9 13.61 8.82 14.15C7.9 16.9 9.5 20.33 12.22 21.33C14.56 22.11 17.19 20.72 18.92 19.2C19.18 18.85 21.23 17.04 20.21 16.84C17.19 18.39 13.19 17.95 10.86 15.37M11.46 9.56C12.5 9.55 11.5 9.13 11.07 8.81C10.03 8.24 8.81 7.96 7.63 7.96C3.78 8 .995 10.41 2.3 14.4C3.24 18.28 6.61 21.4 10.59 21.9C8.54 20.61 7.3 18.19 7.3 15.78C7.38 13.25 8.94 10.28 11.46 9.56M2.78 8.24C5.82 6 10.66 6.18 13.28 9C14.3 10.11 15 12 14.07 13.37C12.33 15.25 17.15 15.5 18.18 15.22C21.92 14.5 22.91 10.15 21.13 7.15C19.43 3.75 15.66 1.97 11.96 2C7.9 1.93 4.25 4.5 2.78 8.24Z",Di="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z",Vi="M8,5.14V19.14L19,12.14L8,5.14Z",Ui="M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z",zi="M3 10H14V12H3V10M3 6H14V8H3V6M3 14H10V16H3V14M16 13V21L22 17L16 13Z",Ni="M17,18.25V21.5H7V18.25C7,16.87 9.24,15.75 12,15.75C14.76,15.75 17,16.87 17,18.25M12,5.5A6.5,6.5 0 0,1 18.5,12C18.5,13.25 18.15,14.42 17.54,15.41L16,14.04C16.32,13.43 16.5,12.73 16.5,12C16.5,9.5 14.5,7.5 12,7.5C9.5,7.5 7.5,9.5 7.5,12C7.5,12.73 7.68,13.43 8,14.04L6.46,15.41C5.85,14.42 5.5,13.25 5.5,12A6.5,6.5 0 0,1 12,5.5M12,1.5A10.5,10.5 0 0,1 22.5,12C22.5,14.28 21.77,16.39 20.54,18.11L19.04,16.76C19.96,15.4 20.5,13.76 20.5,12A8.5,8.5 0 0,0 12,3.5A8.5,8.5 0 0,0 3.5,12C3.5,13.76 4.04,15.4 4.96,16.76L3.46,18.11C2.23,16.39 1.5,14.28 1.5,12A10.5,10.5 0 0,1 12,1.5M12,9.5A2.5,2.5 0 0,1 14.5,12A2.5,2.5 0 0,1 12,14.5A2.5,2.5 0 0,1 9.5,12A2.5,2.5 0 0,1 12,9.5Z",Wi="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",qi="M20,6A2,2 0 0,1 22,8V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V8C2,7.15 2.53,6.42 3.28,6.13L15.71,1L16.47,2.83L8.83,6H20M20,8H4V12H16V10H18V12H20V8M7,14A3,3 0 0,0 4,17A3,3 0 0,0 7,20A3,3 0 0,0 10,17A3,3 0 0,0 7,14Z",Gi="M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z",ji="M14,10A3,3 0 0,0 11,13A3,3 0 0,0 14,16A3,3 0 0,0 17,13A3,3 0 0,0 14,10M14,18A5,5 0 0,1 9,13A5,5 0 0,1 14,8A5,5 0 0,1 19,13A5,5 0 0,1 14,18M14,2A2,2 0 0,1 16,4A2,2 0 0,1 14,6A2,2 0 0,1 12,4A2,2 0 0,1 14,2M19,0H9A2,2 0 0,0 7,2V18A2,2 0 0,0 9,20H19A2,2 0 0,0 21,18V2A2,2 0 0,0 19,0M5,22H17V24H5A2,2 0 0,1 3,22V4H5",Ji="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";const Yi=a`

  /* define a style in the main object to specify the "grid-template-columns: 80px auto ..." value. */
  .grid {
    display: grid;
    width: 100%;
  }

  /* style grid container */
  .grid-container-scrollable {
    overflow-y: auto;
    scrollbar-color: var(--primary-text-color) var(--secondary-background-color);
    scrollbar-width: inherit;
    max-height: 100vh;
    margin: 0.25rem;
    align-self: stretch
  }

  .grid-entry, .grid-header {
    padding: 2px;
    align-self: normal;
    /* background-color: white; */
    /* border-right: 1px solid gray; */
    /* border-bottom: 1px solid gray; */
  }

  .grid-entry-last, .grid-header-last {
    margin-right: 4px;    /* a little padding if scrollbars are present */
    /* border-right: none; */
  }

  .grid-entry-r {
    padding: 2px;
    justify-self: right;
  }

  .grid-entry-c {
    padding: 2px;
    justify-self: center;
  }

  /* scrolling text bleeds through if you set BG-COLOR to transparent! */
  .grid-header {
    background-color: var(--card-background-color);
    color: var(--accent-color);
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 2px;
    border-bottom: 1px solid gray;
    border-top: 1px solid gray;
  }

  .grid-header-fixed-left {
    z-index: 2;
  }

  .grid-fixed-left {
    position: sticky;
    left: 0;
  }

  .grid-fixed-right {
    /* border-left: 1px solid gray; */
    /* border-right: none; */
    position: sticky;
    right: 0;
  }

  .grid-fixed-right2 {
    /* border-left: 1px solid gray; */
    /* border-right: none; */
    position: sticky;
    right: 200px;
  }

  .grid-placeholder {
    grid-column-start: 1;
    grid-column-end: 21;
    /* border-right: none; */
  }

  /* styles for action item info grid items. */
  .grid-action-info-hdr-s {
    font-size: 0.85rem;
    line-height: 1rem;
    justify-self: right;
    text-wrap-mode: nowrap;
    padding-right: 6px;
    color: var(--accent-color);
  }

  .grid-action-info-text-s {
    font-size: 0.85rem;
    line-height: 1rem;
    justify-self: left;
  }

  .copy2cb:hover {
    cursor: copy;
  }

`,Ki=a`

  .media-info-content {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: inherit;
    gap: 0.25rem;
    margin: 0.25rem;
  }

  .media-info-content > div {
    flex: max(23rem, 100%/3 + 0.1%);  /* flexbox is responsive */
    /*border: 1px solid blue;*/       /* FOR TESTING LAYOUT */
  }

  .media-info-content .img {
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    max-width: 128px;
    min-height: 128px;
    border-radius: var(--control-button-border-radius, 10px) !important;
    background-size: cover !important;
  }

  .media-info-description {
    overflow-y: auto;
    scrollbar-color: var(--primary-text-color) var(--secondary-background-color);
    scrollbar-width: inherit;
    display: block;
    height: inherit;  
    padding-top: 10px;
  }

  .media-info-details {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    max-width: 400rem;
    margin: 0.5rem;
  }

  .media-info-text-l {
    font-size: 2.1rem;
    font-weight: 400;
    line-height: 1.8rem;
    padding-bottom: 0.5rem;
    width: 100%;
    color: var(--dark-primary-color);
  }

  .media-info-text-ms, .media-info-text-ms-c {
    font-size: 1.2rem;
    line-height: 1.5rem;
    padding-bottom: 0.20rem;
    width: 100%;
  }

  .media-info-text-ms-c {
    color: var(--dark-primary-color);
  }

  .media-info-text-m {
    font-size: 1.5rem;
    line-height: 1.8rem;
    padding-bottom: 0.5rem;
    width: 100%;
  }

  .media-info-text-s {
    font-size: 0.85rem;
    line-height: 1rem;
    width: 100%;
  }

  ha-icon-button[slot="media-info-icon-link-s"] {
    --ha-icon-button-size: 14px;
    --mdc-icon-size: 14px;
    padding-left: 2px;
    padding-right: 2px;
  }

`,Zi=a`

  .player-body-container {
    box-sizing: border-box;
    height: inherit;
    background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65));
    border-radius: 1.0rem;
    padding: 0.25rem;
    text-align: left;
  }

  .player-body-container-scrollable {
    /* border: 1px solid green;     /* FOR TESTING CONTROL LAYOUT CHANGES */
    box-sizing: border-box;
    height: inherit;
    overflow-y: auto;
    overflow-x: clip;
    scrollbar-color: var(--primary-text-color) var(--secondary-background-color);
    scrollbar-width: inherit;
    color: var(--crm-text, var(--primary-text-color));
  }

  /* style actions 3 dots ("...") <ha-dropdown> dropdown menu */
  .actions-dropdown-menu {
    white-space: nowrap;
    display: inline-flex;
    flex-direction: row;
    justify-content: left;
    vertical-align: middle;
    --ha-select-height: 2.5rem;           /* ha dropdown control height */
    --mdc-menu-item-height: 2.5rem;       /* mdc dropdown list item height */
    --ha-icon-button-size: 2.5rem;       /* mdc icon button size */
    --md-menu-item-top-space: 0.5rem;     /* top spacing between items */
    --md-menu-item-bottom-space: 0.5rem;  /* bottom spacing between items */
    --md-menu-item-one-line-container-height: 2.0rem;  /* menu item height */
  }

  /* style actions 3 dots ("...") <ha-dropdown><ha-assist-chip> dropdown menu */
  .actions-dropdown-menu > ha-dropdown > ha-assist-chip {
    /*--ha-assist-chip-container-color: var(--card-background-color);*/ /* transparent is default. */
    --ha-assist-chip-container-shape: 10px;     /* 0px=square corner, 10px=rounded corner */
    --md-assist-chip-trailing-space: 0px;       /* no label, so no trailing space */
    --md-assist-chip-container-height: 1.5rem;  /* height of the dropdown menu container */
  }

  /* style ha-icon-button controls in header actions: icon size, title text */
  ha-icon-button[slot="icon-button"] {
    --ha-button-height: 30px;
    --ha-icon-button-size: 30px;
    --ha-icon-size: 24px;
    vertical-align: middle;
    padding: 0px 2px 0px 2px;
  }

  ha-icon-button[slot="icon-button-selected"] {
    --ha-button-height: 30px;
    --ha-icon-button-size: 30px;
    --ha-icon-size: 24px;
    vertical-align: middle;
    padding: 0px 2px 0px 2px;
    color: red;
  }

  /* style ha-icon-button controls in header actions: icon size, title text */
  ha-icon-button[slot="icon-button-small"] {
    --ha-button-height: 20px;
    --ha-icon-button-size: 20px;
    --ha-icon-size: 20px;
    vertical-align: middle;
    padding: 0px 2px 0px 2px;
  }

  ha-icon-button[slot="icon-button-small-selected"] {
    --ha-button-height: 20px;
    --ha-icon-button-size: 20px;
    --ha-icon-size: 20px;
    vertical-align: middle;
    padding: 0px 2px 0px 2px;
    color: red;
  }

  /* style ha-alert controls */
  ha-alert {
    display: block;
    margin-bottom: 0.25rem;
  }

  .icon-button {
    width: 100%;
  }

  *[hide="true"] {
    display: none !important;
  }

  *[hide="false"] {
    display: flex !important;
  }

  *[hide] {
    display: none;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-items {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
  }

  .display-inline {
    display: inline;
    padding-left: 6px;
  }
`,Qi=ne+"-card-progress-ended";const Xi=ne+"-card-progress-started";class es extends re{constructor(){super(),this.isUpdateInProgress=!1,this.isCardInEditPreview=!1}connectedCallback(){super.connectedCallback(),this.store&&this.store.card&&(this.isCardInEditPreview=ni(this.store.card))}alertClear(){this.alertError=void 0,this.alertInfo=void 0}alertErrorClear(){this.alertError=void 0}alertErrorSet(e){this.alertError=e,this.alertInfo=void 0}alertInfoClear(){this.alertInfo=void 0}alertInfoSet(e){this.alertInfo=e,this.alertError=void 0}progressHide(){this.isUpdateInProgress=!1,this.store&&this.store.card&&this.store.card.dispatchEvent(new CustomEvent(Qi,{bubbles:!0,composed:!0,detail:{}}))}progressShow(){this.store&&this.store.card&&this.store.card.dispatchEvent(new CustomEvent(Xi,{bubbles:!0,composed:!0,detail:{}}))}}Ce([De({attribute:!1})],es.prototype,"store",void 0),Ce([Ve()],es.prototype,"alertError",void 0),Ce([Ve()],es.prototype,"alertInfo",void 0);const ts=_e(ce+":fav-actions-base");class is extends es{constructor(e){super(),this.section=e}render(){this.player=this.store.player,this.spotifyPlusService=this.store.spotifyPlusService}firstUpdated(e){super.firstUpdated(e),this.updateActions(this.player,[])}hideSearchType(e){return!!(this.store.config.searchMediaBrowserSearchTypes&&this.store.config.searchMediaBrowserSearchTypes.length>0)&&!this.store.config.searchMediaBrowserSearchTypes?.includes(e)}onClickMediaItem(e){this.PlayMediaItem(e)}async AddPlayerQueueItem(e){try{this.progressShow(),await this.spotifyPlusService.AddPlayerQueueItems(this.player,e.uri)}catch(e){this.alertErrorSet("Could not add media item to play queue.  "+ui(e))}finally{this.progressHide()}}async PlayMediaItem(e){try{this.progressShow(),await this.spotifyPlusService.Card_PlayMediaBrowserItem(this.player,e),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet("Could not play media item.  "+ui(e))}finally{this.progressHide()}}async onClickAction(e){throw new Error('onClickAction not implemented for action "'+e+'".')}updateActions(e,t){return ts.enabled&&ts("updateActions - updating actions: %s",JSON.stringify(Array.from(t.values()))),this.isUpdateInProgress?(this.alertErrorSet("Previous refresh is still in progress - please wait"),!1):(this.isUpdateInProgress=!0,this.isCardInEditPreview?(this.isUpdateInProgress=!1,!1):e||this.section==Yt.DEVICES?this.mediaItem.uri||this.section==Yt.DEVICES?(this.alertClear(),!0):(this.isUpdateInProgress=!1,this.alertErrorSet("MediaItem not set in updateActions"),!1):(this.isUpdateInProgress=!1,this.alertErrorSet("Player reference not set in updateActions"),!1))}}Ce([De({attribute:!1})],is.prototype,"mediaItem",void 0);const ss=ne+"-card-search-media";class rs{constructor(e,t=null,i=null,s=null,r=null,o=null){this.searchType=e||wi.PLAYLISTS,this.searchCriteria=t||"",this.title=i||"",this.uri=s||"",this.subtype=r||"",this.parentMediaItem=o}}function os(e,t,i=null,s=null,r=null,o=null){const a=new rs(e);return a.searchCriteria=(t||"").trim(),a.title=i||"",a.uri=s||"",a.subtype=r||"",a.parentMediaItem=o,a.subtype||(e==wi.AUDIOBOOK_EPISODES?a.subtype="audiobook":e==wi.SHOW_EPISODES&&(a.subtype="podcast")),new CustomEvent(ss,{bubbles:!0,composed:!0,detail:a})}const as="turn_on",ns="turn_off",ls="volume_down",cs="volume_up",ds="volume_mute",hs="volume_set",ps="select_source";class us{constructor(e){this.hassService=e}async clear_playlist(e){const t={domain:le,service:"clear_playlist",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async join(e,t){const i={domain:le,service:"join",serviceData:{entity_id:e,group_members:t}};await this.hassService.CallService(i)}async media_next_track(e){const t={domain:le,service:"media_next_track",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async media_pause(e){const t={domain:le,service:"media_pause",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async media_play(e){const t={domain:le,service:"media_play",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async media_play_pause(e){const t={domain:le,service:"media_play_pause",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async media_previous_track(e){if(!e.isUserProductPremium())throw new Error(Se);const t={domain:le,service:"media_previous_track",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async media_seek(e,t){if(!e.isUserProductPremium())throw new Error(Se);const i={domain:le,service:"media_seek",serviceData:{entity_id:e.id,seek_position:t}};await this.hassService.CallService(i)}async media_stop(e){const t={domain:le,service:"media_stop",serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async play_media(e,t){const i={domain:le,service:"play_media",serviceData:{entity_id:e.id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}};await this.hassService.CallService(i)}async repeat_set(e,t){const i={domain:le,service:"repeat_set",serviceData:{entity_id:e.id,repeat:t}};await this.hassService.CallService(i)}async select_sound_mode(e,t){const i={domain:le,service:"select_sound_mode",serviceData:{entity_id:e.id,sound_mode:t}};await this.hassService.CallService(i)}async select_source(e,t){if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);const i={domain:le,service:ps,serviceData:{entity_id:e.id,source:t}};await this.hassService.CallService(i)}async shuffle_set(e,t){if(!e.isUserProductPremium())throw new Error(Se);const i={domain:le,service:"shuffle_set",serviceData:{entity_id:e.id,shuffle:t}};await this.hassService.CallService(i)}async turn_off(e){const t={domain:le,service:ns,serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async turn_on(e){const t={domain:le,service:as,serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async unJoin(e){const t={domain:le,service:"unjoin",serviceData:{entity_id:e}};await this.hassService.CallService(t)}async volume_mute(e,t){const i={domain:le,service:ds,serviceData:{entity_id:e.id,is_volume_muted:t}};await this.hassService.CallService(i)}async volume_mute_toggle(e){const t=!e.isMuted();await this.volume_mute(e,t)}async volume_set(e,t){const i=t/100,s={domain:le,service:hs,serviceData:{entity_id:e.id,volume_level:i}};await this.hassService.CallService(s)}async volume_down(e){const t={domain:le,service:ls,serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}async volume_up(e){const t={domain:le,service:cs,serviceData:{entity_id:e.id}};await this.hassService.CallService(t)}}var ms,gs,vs;!function(e){e.ALL="all",e.OFF="off",e.ONE="one"}(ms||(ms={})),function(e){e[e.PAUSE=1]="PAUSE",e[e.SEEK=2]="SEEK",e[e.VOLUME_SET=4]="VOLUME_SET",e[e.VOLUME_MUTE=8]="VOLUME_MUTE",e[e.PREVIOUS_TRACK=16]="PREVIOUS_TRACK",e[e.NEXT_TRACK=32]="NEXT_TRACK",e[e.TURN_ON=128]="TURN_ON",e[e.TURN_OFF=256]="TURN_OFF",e[e.PLAY_MEDIA=512]="PLAY_MEDIA",e[e.VOLUME_STEP=1024]="VOLUME_STEP",e[e.SELECT_SOURCE=2048]="SELECT_SOURCE",e[e.STOP=4096]="STOP",e[e.CLEAR_PLAYLIST=8192]="CLEAR_PLAYLIST",e[e.PLAY=16384]="PLAY",e[e.SHUFFLE_SET=32768]="SHUFFLE_SET",e[e.SELECT_SOUND_MODE=65536]="SELECT_SOUND_MODE",e[e.BROWSE_MEDIA=131072]="BROWSE_MEDIA",e[e.REPEAT_SET=262144]="REPEAT_SET",e[e.GROUPING=524288]="GROUPING",e[e.MEDIA_ANNOUNCE=1048576]="MEDIA_ANNOUNCE",e[e.MEDIA_ENQUEUE=2097152]="MEDIA_ENQUEUE"}(gs||(gs={})),function(e){e.OFF="off",e.ON="on",e.IDLE="idle",e.PLAYING="playing",e.PAUSED="paused",e.STANDBY="standby",e.BUFFERING="buffering",e.UNKNOWN="unknown"}(vs||(vs={}));const fs=_e(ce+":spotifyplus-service");class bs{constructor(e,t,i){this.hass=e,this.card=t,this.config=i}getDeviceId(e,t=null){return null==t&&(t=e.attributes.sp_device_is_brand_sonos?e.attributes.source||null:this.config.deviceControlByName?e.attributes.source||e.attributes.sp_device_id||null:e.attributes.sp_device_id||e.attributes.source||null),this.config.deviceDefaultId&&(t=this.config.deviceDefaultId,fs("getDeviceId - overriding device_id with config option deviceDefaultId: \n%s",JSON.stringify(this.config.deviceDefaultId))),t}async CallService(e){try{fs.enabled&&fs("%cCallService - Calling service %s (no response)\n%s","color: orange",JSON.stringify(e.service),JSON.stringify(e,null,2)),await this.hass.callService(e.domain,e.service,e.serviceData,e.target)}finally{}}async CallServiceWithResponse(e){try{fs.enabled&&fs("%cCallServiceWithResponse - Calling service %s (with response)\n%s","color: orange",JSON.stringify(e.service),JSON.stringify(e,null,2));return(await this.hass.callService(e.domain,e.service,e.serviceData,e.target,void 0,!0)).response||{}}finally{}}async AddPlayerQueueItems(e,t=null,i=null,s=!0,r=null){try{if(!e.isUserProductPremium())throw new Error(Se);i=this.getDeviceId(e,i);const o={entity_id:e.id,uris:t};null!=i&&(o.device_id=i),null!=s&&(o.verify_device_id=s),null!=r&&(o.delay=r);const a={domain:ne,service:"add_player_queue_items",serviceData:o};await this.CallService(a)}finally{}}async CheckAlbumFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"check_album_favorites",serviceData:i};return(await this.CallServiceWithResponse(s)).result}finally{}}async CheckArtistsFollowing(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"check_artists_following",serviceData:i};return(await this.CallServiceWithResponse(s)).result}finally{}}async CheckAudiobookFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"check_audiobook_favorites",serviceData:i};return(await this.CallServiceWithResponse(s)).result}finally{}}async CheckEpisodeFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"check_episode_favorites",serviceData:i};return(await this.CallServiceWithResponse(s)).result}finally{}}async CheckPlaylistFollowers(e,t,i=null){try{const s={entity_id:e.id,playlist_id:t};null!=i&&(s.user_ids=i);const r={domain:ne,service:"check_playlist_followers",serviceData:s};return(await this.CallServiceWithResponse(r)).result}finally{}}async CheckShowFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"check_show_favorites",serviceData:i};return(await this.CallServiceWithResponse(s)).result}finally{}}async CheckTrackFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"check_track_favorites",serviceData:i};return(await this.CallServiceWithResponse(s)).result}finally{}}async FollowArtists(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"follow_artists",serviceData:i};await this.CallService(s)}finally{}}async FollowPlaylist(e,t=null,i=!0){try{const s={entity_id:e.id};null!=t&&(s.playlist_id=t),null!=i&&(s.public=i);const r={domain:ne,service:"follow_playlist",serviceData:s};await this.CallService(r)}finally{}}async GetAlbum(e,t=null,i=null,s=!0){try{const r={entity_id:e.id};null!=t&&(r.album_id=t),null!=i&&(r.market=i);const o={domain:ne,service:"get_album",serviceData:r},a=(await this.CallServiceWithResponse(o)).result;return s&&null!=a&&null!=a.tracks&&(a.available_markets=[],a.images=[],a.tracks.items.forEach(e=>{e.available_markets=[]})),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(o.service),JSON.stringify(a,null,2)),a}finally{}}async GetAlbumFavorites(e,t=null,i=null,s=null,r=null,o=null,a=!0){try{null==s&&(s=e.attributes.sp_user_country);const n={entity_id:e.id};null!=t&&(n.limit=t),null!=i&&(n.offset=i),null!=s&&(n.market=s),null!=r&&(n.limit_total=r),null!=o&&(n.sort_result=o);const l={domain:ne,service:"get_album_favorites",serviceData:n},c=(await this.CallServiceWithResponse(l)).result;return a&&null!=c&&null!=c.items&&c.items.forEach(e=>{e.album.images=[],e.album.available_markets=[],e.album.tracks&&(e.album.tracks=JSON.parse("{ }"))}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(l.service),JSON.stringify(c,null,2)),c}finally{}}async GetAlbumTracks(e,t=null,i=null,s=null,r=null,o=null,a=!0){try{const n={entity_id:e.id};null!=t&&(n.album_id=t),null!=i&&(n.limit=i),null!=s&&(n.offset=s),null!=r&&(n.market=r),null!=o&&(n.limit_total=o);const l={domain:ne,service:"get_album_tracks",serviceData:n},c=(await this.CallServiceWithResponse(l)).result;return a&&null!=c&&null!=c.items&&c.items.forEach(e=>{e.available_markets=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(l.service),JSON.stringify(c,null,2)),c}finally{}}async GetArtistAlbums(e,t=null,i=null,s=null,r=null,o=null,a=null,n=null,l=!0){try{const c={entity_id:e.id};null!=t&&(c.artist_id=t),null!=i&&(c.include_groups=i),null!=s&&(c.limit=s),null!=r&&(c.offset=r),null!=o&&(c.market=o),null!=a&&(c.limit_total=a),null!=n&&(c.sort_result=n);const d={domain:ne,service:"get_artist_albums",serviceData:c},h=(await this.CallServiceWithResponse(d)).result;return l&&null!=h&&null!=h.items&&h.items.forEach(e=>{e.images=[],e.available_markets=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(d.service),JSON.stringify(h,null,2)),h}finally{}}async GetArtistInfo(e,t=null,i=!0){try{const i={entity_id:e.id};null!=t&&(i.artist_id=t);const s={domain:ne,service:"get_artist_info",serviceData:i},r=(await this.CallServiceWithResponse(s)).result;return fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(s.service),JSON.stringify(r,null,2)),r}finally{}}async GetArtistRelatedArtists(e,t=null,i=null,s=!0){try{const r={entity_id:e.id};null!=t&&(r.artist_id=t),null!=i&&(r.sort_result=i);const o={domain:ne,service:"get_artist_related_artists",serviceData:r},a=(await this.CallServiceWithResponse(o)).result;return s&&null!=a&&a.forEach(e=>{e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(o.service),JSON.stringify(a,null,2)),a}finally{}}async GetArtistTopTracks(e,t=null,i=null,s=null,r=!0){try{const o={entity_id:e.id};null!=t&&(o.artist_id=t),null!=i&&(o.market=i),null!=s&&(o.sort_result=s);const a={domain:ne,service:"get_artist_top_tracks",serviceData:o},n=(await this.CallServiceWithResponse(a)).result;return r&&null!=n&&n.forEach(e=>{e.available_markets=[],e.album.available_markets=[],e.album.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(a.service),JSON.stringify(n,null,2)),n}finally{}}async GetArtistsFollowed(e,t=null,i=null,s=null,r=null,o=!0){try{const a={entity_id:e.id};null!=t&&(a.after=t),null!=i&&(a.limit=i),null!=s&&(a.limit_total=s),null!=r&&(a.sort_result=r);const n={domain:ne,service:"get_artists_followed",serviceData:a},l=(await this.CallServiceWithResponse(n)).result;return o&&null!=l&&null!=l.items&&l.items.forEach(e=>{e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(n.service),JSON.stringify(l,null,2)),l}finally{}}async GetAudiobook(e,t=null,i=null,s=!0){try{const r={entity_id:e.id};null!=t&&(r.audiobook_id=t),null!=i&&(r.market=i);const o={domain:ne,service:"get_audiobook",serviceData:r},a=(await this.CallServiceWithResponse(o)).result;return s&&null!=a&&(a.available_markets=[],a.images=[],a.chapters?.forEach(e=>{e.items?.forEach(e=>{e.available_markets=[],e.description="see html_description",e.images=[]})})),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(o.service),JSON.stringify(a,null,2)),a}finally{}}async GetAudiobookChapters(e,t=null,i=null,s=null,r=null,o=null,a=!0){try{const n={entity_id:e.id};null!=t&&(n.audiobook_id=t),null!=i&&(n.limit=i),null!=s&&(n.offset=s),null!=r&&(n.market=r),null!=o&&(n.limit_total=o);const l={domain:ne,service:"get_audiobook_chapters",serviceData:n},c=(await this.CallServiceWithResponse(l)).result;return a&&null!=c&&null!=c.items&&c.items.forEach(e=>{e.available_markets=[],e.description="see html_description",e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(l.service),JSON.stringify(c,null,2)),c}finally{}}async GetAudiobookFavorites(e,t=null,i=null,s=null,r=null,o=!0){try{const a={entity_id:e.id};null!=t&&(a.limit=t),null!=i&&(a.offset=i),null!=s&&(a.limit_total=s),null!=r&&(a.sort_result=r);const n={domain:ne,service:"get_audiobook_favorites",serviceData:a},l=(await this.CallServiceWithResponse(n)).result;return o&&null!=l&&null!=l.items&&l.items.forEach(e=>{e.available_markets=[],e.description="see html_description",e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(n.service),JSON.stringify(l,null,2)),l}finally{}}async GetBrowseCategorysList(e,t=null,i=null,s=null,r=!0){try{const o={entity_id:e.id};null!=t&&(o.country=t),null!=i&&(o.locale=i),null!=s&&(o.refresh=s);const a={domain:ne,service:"get_browse_categorys_list",serviceData:o},n=(await this.CallServiceWithResponse(a)).result;return r&&null!=n&&null!=n.items&&n.items.forEach(e=>{e.icons=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(a.service),JSON.stringify(n,null,2)),n}finally{}}async GetCategoryPlaylists(e,t=null,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,category_id:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.country=r),null!=o&&(l.limit_total=o),null!=a&&(l.sort_result=a);const c={domain:ne,service:"get_category_playlists",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async GetChapter(e,t=null,i=null,s=!0){try{const r={entity_id:e.id};null!=t&&(r.chapter_id=t),null!=i&&(r.market=i);const o={domain:ne,service:"get_chapter",serviceData:r},a=(await this.CallServiceWithResponse(o)).result;return s&&null!=a&&(a.available_markets=[],a.description="see html_description",a.images=[],a.audiobook&&(a.audiobook.available_markets=[],a.audiobook.images=[],a.audiobook.description="see html_description")),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(o.service),JSON.stringify(a,null,2)),a}finally{}}async GetEpisode(e,t=null,i=null,s=!0){try{const r={entity_id:e.id};null!=t&&(r.episode_id=t),null!=i&&(r.market=i);const o={domain:ne,service:"get_episode",serviceData:r},a=(await this.CallServiceWithResponse(o)).result;return s&&null!=a&&(a.description="see html_description",a.images=[],a.show&&(a.show.available_markets=[],a.show.images=[],a.show.description="see html_description")),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(o.service),JSON.stringify(a,null,2)),a}finally{}}async GetEpisodeFavorites(e,t=null,i=null,s=null,r=null,o=!0){try{const a={entity_id:e.id};null!=t&&(a.limit=t),null!=i&&(a.offset=i),null!=s&&(a.limit_total=s),null!=r&&(a.sort_result=r);const n={domain:ne,service:"get_episode_favorites",serviceData:a},l=(await this.CallServiceWithResponse(n)).result;return o&&null!=l&&null!=l.items&&l.items.forEach(e=>{e.episode.description="see html_description",e.episode.images=[],e.episode.show.available_markets=[],e.episode.show.description="see html_description",e.episode.show.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(n.service),JSON.stringify(l,null,2)),l}finally{}}async GetPlayerQueueInfo(e,t=!0){try{if(!e.isUserProductPremium())throw new Error(Se);const i={entity_id:e.id},s={domain:ne,service:"get_player_queue_info",serviceData:i},r=(await this.CallServiceWithResponse(s)).result;if(t&&null!=r&&null!=r.queue){if(null!=r.currently_playing)if("track"==r.currently_playing_type){const e=r.currently_playing;e.available_markets=[],e.album&&(e.album.available_markets=[],e.album.images=[])}else if("episode"==r.currently_playing_type){const e=r.currently_playing;e.description="see html_description",e.show&&(e.show.available_markets=[],e.show.description="see html_description",e.show.images=[])}r.queue.forEach(e=>{if("track"==e.type){const t=e;t.available_markets=[],t.album&&(t.album.available_markets=[],t.album.images=[])}else if("episode"==e.type){const t=e;t.description="see html_description",t.show&&(t.show.available_markets=[],t.show.description="see html_description",t.show.images=[])}})}return fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(s.service),JSON.stringify(r,null,2)),r}finally{}}async GetPlayerRecentTracks(e,t=null,i=null,s=null,r=null,o=!0){try{const a={entity_id:e.id};null!=t&&(a.limit=t),null!=i&&(a.after=i),null!=s&&(a.before=s),null!=r&&(a.limit_total=r);const n={domain:ne,service:"get_player_recent_tracks",serviceData:a},l=(await this.CallServiceWithResponse(n)).result;return o&&null!=l&&null!=l.items&&l.items.forEach(e=>{e.track.available_markets=[],e.track.album.images=[],e.track.album.available_markets=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(n.service),JSON.stringify(l,null,2)),l}finally{}}async GetPlaylistFavorites(e,t=null,i=null,s=null,r=null,o=!0){try{const a={entity_id:e.id};null!=t&&(a.limit=t),null!=i&&(a.offset=i),null!=s&&(a.limit_total=s),null!=r&&(a.sort_result=r);const n={domain:ne,service:"get_playlist_favorites",serviceData:a},l=(await this.CallServiceWithResponse(n)).result;return o&&null!=l&&null!=l.items&&l.items.forEach(e=>{e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(n.service),JSON.stringify(l,null,2)),l}finally{}}async GetPlaylistItems(e,t=null,i=null,s=null,r=null,o=null,a=null,n=null,l=!0){try{const c={entity_id:e.id};null!=t&&(c.playlist_id=t),null!=i&&(c.limit=i),null!=s&&(c.offset=s),null!=r&&(c.market=r),null!=o&&(c.fields=o),null!=a&&(c.additional_types=a),null!=n&&(c.limit_total=n);const d={domain:ne,service:"get_playlist_items",serviceData:c},h=(await this.CallServiceWithResponse(d)).result;return l&&null!=h&&null!=h.items&&h.items.forEach(e=>{e.track&&(e.track.available_markets&&(e.track.available_markets=[]),e.track.album&&(e.track.album.images=[],e.track.album.available_markets&&(e.track.album.available_markets=[])))}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(d.service),JSON.stringify(h,null,2)),h}finally{}}async GetSpotifyConnectDevice(e,t,i=null,s=null,r=null,o=null,a=null){try{const n={entity_id:e.id,device_value:t};null!=i&&(n.verify_user_context=i),null!=s&&(n.verify_timeout=s),null!=r&&(n.refresh_device_list=r),null!=o&&(n.activate_device=o),null!=a&&(n.delay=a);const l={domain:ne,service:"get_spotify_connect_device",serviceData:n},c=(await this.CallServiceWithResponse(l)).result;if(null!=c){const e=(c.Name||"").toLocaleLowerCase();"group"==(c.DeviceInfo.GroupStatus||"").toLocaleLowerCase()?c.image_url=fi(ji):e.includes("web player (chrome)")?c.image_url=fi(Fi):e.includes("web player (microsoft edge)")?c.image_url=fi(Bi):e.includes("web player")?c.image_url=fi(Ji):1==c.IsChromeCast?c.image_url=fi(_i):c.image_url=fi(Gi)}return fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(l.service),JSON.stringify(c,null,2)),c}finally{}}async GetSpotifyConnectDevices(e,t=null,i=null,s=null){try{fs.enabled&&fs("%cGetSpotifyConnectDevices - retrieving device list from %s","color: orange;",t?"real-time query":"internal device cache");const r={entity_id:e.id};null!=t&&(r.refresh=t),null!=i&&(r.sort_result=i);const o={domain:ne,service:"get_spotify_connect_devices",serviceData:r},a=(await this.CallServiceWithResponse(o)).result;if(null!=a&&null!=a.Items){for(let e=a.Items.length-1;e>=0;e--){let t=a.Items[e].Name.toLowerCase();t=t.replaceAll("\n",""),t=t.replaceAll("\r",""),(s?.includes(t)||s?.includes(a.Items[e].Id.toLowerCase()))&&a.Items.splice(e,1)}a.Items.forEach(e=>{const t=(e.Name||"").toLocaleLowerCase();"group"==(e.DeviceInfo.GroupStatus||"").toLocaleLowerCase()?e.image_url=fi(ji):t.includes("web player (chrome)")?e.image_url=fi(Fi):t.includes("web player (microsoft edge)")?e.image_url=fi(Bi):t.includes("web player")?e.image_url=fi(Ji):1==e.IsChromeCast?e.image_url=fi(_i):e.image_url=fi(Gi)})}return fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(o.service),JSON.stringify(a,null,2)),a}finally{}}async GetShowEpisodes(e,t=null,i=null,s=null,r=null,o=null,a=!0){try{const n={entity_id:e.id};null!=t&&(n.show_id=t),null!=i&&(n.limit=i),null!=s&&(n.offset=s),null!=r&&(n.market=r),null!=o&&(n.limit_total=o);const l={domain:ne,service:"get_show_episodes",serviceData:n},c=(await this.CallServiceWithResponse(l)).result;return a&&null!=c&&null!=c.items&&c.items.forEach(e=>{e.description="see html_description",e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(l.service),JSON.stringify(c,null,2)),c}finally{}}async GetShowFavorites(e,t=null,i=null,s=null,r=null,o=!0,a=!0){try{const n={entity_id:e.id};null!=t&&(n.limit=t),null!=i&&(n.offset=i),null!=s&&(n.limit_total=s),null!=r&&(n.sort_result=r),null!=o&&(n.exclude_audiobooks=o);const l={domain:ne,service:"get_show_favorites",serviceData:n},c=(await this.CallServiceWithResponse(l)).result;return a&&null!=c&&null!=c.items&&c.items.forEach(e=>{e.show.available_markets=[],e.show.description="see html_description",e.show.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(l.service),JSON.stringify(c,null,2)),c}finally{}}async GetTrack(e,t=null,i=!0){try{const s={entity_id:e.id};null!=t&&(s.track_id=t);const r={domain:ne,service:"get_track",serviceData:s},o=(await this.CallServiceWithResponse(r)).result;return i&&null!=o&&(o.available_markets=[],o.album.available_markets=[],o.album.images=[]),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(r.service),JSON.stringify(o,null,2)),o}finally{}}async GetTrackFavorites(e,t=null,i=null,s=null,r=null,o=null,a=null,n=null,l=!0){try{const c={entity_id:e.id};null!=t&&(c.limit=t),null!=i&&(c.offset=i),null!=s&&(c.market=s),null!=r&&(c.limit_total=r),null!=o&&(c.sort_result=o),null!=a&&(c.filter_artist=a),null!=n&&(c.filter_album=n);const d={domain:ne,service:"get_track_favorites",serviceData:c},h=(await this.CallServiceWithResponse(d)).result;return l&&null!=h&&null!=h.items&&h.items.forEach(e=>{e.track.available_markets=[],e.track.album.available_markets=[],e.track.album.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(d.service),JSON.stringify(h,null,2)),h}finally{}}async GetTrackRecommendations(e,t=null,i=null,s=null,r=!0){try{const o={entity_id:e.id};null!=i&&(o.limit=i),null!=s&&(o.market=s),t&&(t.seed_artists&&(o.seed_artists=t.seed_artists),t.seed_genres&&(o.seed_genres=t.seed_genres),t.seed_tracks&&(o.seed_tracks=t.seed_tracks),t.max_acousticness&&(o.max_acousticness=t.max_acousticness),t.min_acousticness&&(o.min_acousticness=t.min_acousticness),t.target_acousticness&&(o.target_acousticness=t.target_acousticness),t.max_danceability&&(o.max_danceability=t.max_danceability),t.min_danceability&&(o.min_danceability=t.min_danceability),t.target_danceability&&(o.target_danceability=t.target_danceability),t.max_duration_ms&&(o.max_duration_ms=t.max_duration_ms),t.min_duration_ms&&(o.min_duration_ms=t.min_duration_ms),t.target_duration_ms&&(o.target_duration_ms=t.target_duration_ms),t.max_energy&&(o.max_energy=t.max_energy),t.min_energy&&(o.min_energy=t.min_energy),t.target_energy&&(o.target_energy=t.target_energy),t.max_instrumentalness&&(o.max_instrumentalness=t.max_instrumentalness),t.min_instrumentalness&&(o.min_instrumentalness=t.min_instrumentalness),t.target_instrumentalness&&(o.target_instrumentalness=t.target_instrumentalness),t.max_key&&(o.max_key=t.max_key),t.min_key&&(o.min_key=t.min_key),t.target_key&&(o.target_key=t.target_key),t.max_liveness&&(o.max_liveness=t.max_liveness),t.min_liveness&&(o.min_liveness=t.min_liveness),t.target_liveness&&(o.target_liveness=t.target_liveness),t.max_loudness&&(o.max_loudness=t.max_loudness),t.min_loudness&&(o.min_loudness=t.min_loudness),t.target_loudness&&(o.target_loudness=t.target_loudness),t.max_mode&&(o.max_mode=t.max_mode),t.min_mode&&(o.min_mode=t.min_mode),t.target_mode&&(o.target_mode=t.target_mode),t.max_popularity&&(o.max_popularity=t.max_popularity),t.min_popularity&&(o.min_popularity=t.min_popularity),t.target_popularity&&(o.target_popularity=t.target_popularity),t.max_speechiness&&(o.max_speechiness=t.max_speechiness),t.min_speechiness&&(o.min_speechiness=t.min_speechiness),t.target_speechiness&&(o.target_speechiness=t.target_speechiness),t.max_tempo&&(o.max_tempo=t.max_tempo),t.min_tempo&&(o.min_tempo=t.min_tempo),t.target_tempo&&(o.target_tempo=t.target_tempo),t.max_time_signature&&(o.max_time_signature=t.max_time_signature),t.min_time_signature&&(o.min_time_signature=t.min_time_signature),t.target_time_signature&&(o.target_time_signature=t.target_time_signature),t.max_valence&&(o.max_valence=t.max_valence),t.min_valence&&(o.min_valence=t.min_valence),t.target_valence&&(o.target_valence=t.target_valence));const a={domain:ne,service:"get_track_recommendations",serviceData:o},n=(await this.CallServiceWithResponse(a)).result;return r&&null!=n&&n.tracks.forEach(e=>{e.available_markets=[],e.album.available_markets=[],e.album.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(a.service),JSON.stringify(n,null,2)),n}finally{}}async PlayerMediaPause(e,t=null,i=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);t=this.getDeviceId(e,t);const s={entity_id:e.id};null!=t&&(s.device_id=t),null!=i&&(s.delay=i);const r={domain:ne,service:"player_media_pause",serviceData:s};await this.CallService(r)}finally{}}async PlayerMediaPlayContext(e,t,i=null,s=null,r=null,o=null,a=null,n=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);if(!t)throw new Error("STPC0005 context_uri argument was not supplied to the PlayerMediaPlayContext service.");o=this.getDeviceId(e,o);const l={entity_id:e.id,context_uri:t};null!=i&&(l.offset_uri=i),null!=s&&(l.offset_position=s),null!=r&&(l.position_ms=r),null!=o&&(l.device_id=o),null!=a&&(l.delay=a),null!=n&&(l.shuffle=n);const c={domain:ne,service:"player_media_play_context",serviceData:l};await this.CallService(c)}finally{}}async PlayerMediaPlayTrackFavorites(e,t=null,i=null,s=null,r=null,o=null,a=null,n=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);t=this.getDeviceId(e,t);const l={entity_id:e.id};null!=t&&(l.device_id=t),null!=i&&(l.shuffle=i),null!=s&&(l.delay=s),null!=r&&(l.resolve_device_id=r),null!=o&&(l.limit_total=o),null!=a&&(l.filter_artist=a),null!=n&&(l.filter_album=n);const c={domain:ne,service:"player_media_play_track_favorites",serviceData:l};await this.CallService(c)}finally{}}async PlayerMediaPlayTracks(e,t,i=null,s=null,r=null,o=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);if(!t)throw new Error("STPC0005 uris argument was not supplied to the PlayerMediaPlayTracks service.");null==i&&(i=0),s=this.getDeviceId(e,s);const a={entity_id:e.id,uris:t};null!=i&&(a.position_ms=i),null!=s&&(a.device_id=s),null!=r&&(a.delay=r),null!=o&&(a.shuffle=o);const n={domain:ne,service:"player_media_play_tracks",serviceData:a};await this.CallService(n)}finally{}}async PlayerMediaResume(e,t=null,i=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);t=this.getDeviceId(e,t);const s={entity_id:e.id};null!=t&&(s.device_id=t),null!=i&&(s.delay=i);const r={domain:ne,service:"player_media_resume",serviceData:s};await this.CallService(r)}finally{}}async PlayerMediaSeek(e,t=null,i=null,s=null,r=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);null!=i&&(i=Math.floor(i)),null!=s&&(s=Math.floor(s)),t=this.getDeviceId(e,t);const o={entity_id:e.id};null!=t&&(o.device_id=t),null!=i&&(o.position_ms=i),null!=s&&(o.relative_position_ms=s),null!=r&&(o.delay=r);const a={domain:ne,service:"player_media_seek",serviceData:o};await this.CallService(a)}finally{}}async PlayerSetShuffleMode(e,t=null,i=null,s=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);t=this.getDeviceId(e,t);const r={entity_id:e.id};null!=i&&(r.state=i),null!=t&&(r.device_id=t),null!=s&&(r.delay=s);const o={domain:ne,service:"player_set_shuffle_mode",serviceData:r};await this.CallService(o)}finally{}}async PlayerMediaSkipNext(e,t=null,i=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);t=this.getDeviceId(e,t);const s={entity_id:e.id};null!=t&&(s.device_id=t),null!=i&&(s.delay=i);const r={domain:ne,service:"player_media_skip_next",serviceData:s};await this.CallService(r)}finally{}}async PlayerMediaSkipPrevious(e,t=null,i=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);t=this.getDeviceId(e,t);const s={entity_id:e.id};null!=t&&(s.device_id=t),null!=i&&(s.delay=i);const r={domain:ne,service:"player_media_skip_previous",serviceData:s};await this.CallService(r)}finally{}}async PlayerTransferPlayback(e,t=null,i=!0,s=null,r=!0,o=!0,a=null){try{if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);null==i&&(i=!0),t=this.getDeviceId(e,t);const n={entity_id:e.id};null!=t&&(n.device_id=t),null!=i&&(n.play=i),null!=s&&(n.delay=s),null!=r&&(n.refresh_device_list=r),null!=o&&(n.force_activate_device=o),null!=a&&(n.device_id_from=a);const l={domain:ne,service:"player_transfer_playback",serviceData:n};await this.CallService(l)}finally{}}async PlaylistItemsAdd(e,t=null,i=null,s=null){try{const r={entity_id:e.id};r.playlist_id=t,null!=i&&(r.uris=i),null!=s&&(r.position=s);const o={domain:ne,service:"playlist_items_add",serviceData:r};return(await this.CallServiceWithResponse(o)).result}finally{}}async PlaylistItemsRemove(e,t=null,i=null,s=null){try{const r={entity_id:e.id};r.playlist_id=t,null!=i&&(r.uris=i),null!=s&&(r.snapshot_id=s);const o={domain:ne,service:"playlist_items_remove",serviceData:r};return(await this.CallServiceWithResponse(o)).result}finally{}}async RemoveAlbumFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"remove_album_favorites",serviceData:i};await this.CallService(s)}finally{}}async RemoveAudiobookFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"remove_audiobook_favorites",serviceData:i};await this.CallService(s)}finally{}}async RemoveEpisodeFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"remove_episode_favorites",serviceData:i};await this.CallService(s)}finally{}}async RemoveShowFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"remove_show_favorites",serviceData:i};await this.CallService(s)}finally{}}async RemoveTrackFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"remove_track_favorites",serviceData:i};await this.CallService(s)}finally{}}async SaveAlbumFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"save_album_favorites",serviceData:i};await this.CallService(s)}finally{}}async SaveAudiobookFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"save_audiobook_favorites",serviceData:i};await this.CallService(s)}finally{}}async SaveEpisodeFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"save_episode_favorites",serviceData:i};await this.CallService(s)}finally{}}async SaveShowFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"save_show_favorites",serviceData:i};await this.CallService(s)}finally{}}async SaveTrackFavorites(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"save_track_favorites",serviceData:i};await this.CallService(s)}finally{}}async Search(e,t,i,s=null,r=null,o=null,a=null,n=null){try{if(e==wi.ALBUMS)return await this.SearchAlbums(t,i,s,r,o,a,n);if(e==wi.ARTISTS)return await this.SearchArtists(t,i,s,r,o,a,n);if(e==wi.AUDIOBOOKS)return await this.SearchAudiobooks(t,i,s,r,o,a,n);if(e==wi.EPISODES)return await this.SearchEpisodes(t,i,s,r,o,a,n);if(e==wi.PLAYLISTS)return await this.SearchPlaylists(t,i,s,r,o,a,n);if(e==wi.SHOWS)return await this.SearchShows(t,i,s,r,o,a,n);if(e==wi.TRACKS)return await this.SearchTracks(t,i,s,r,o,a,n);throw new Error('searchMediaType was not recognized: "'+e+'".')}finally{}}async SearchAlbums(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_albums",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[],e.available_markets=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async SearchArtists(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_artists",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async SearchAudiobooks(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_audiobooks",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[],e.available_markets=[],e.description="see html_description"}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async SearchEpisodes(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_episodes",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[],e.description="see html_description"}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async SearchPlaylists(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_playlists",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async SearchShows(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_shows",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.images=[],e.available_markets=[],e.description="see html_description"}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async SearchTracks(e,t,i=null,s=null,r=null,o=null,a=null,n=!0){try{const l={entity_id:e.id,criteria:t};null!=i&&(l.limit=i),null!=s&&(l.offset=s),null!=r&&(l.market=r),null!=o&&(l.include_external=o),null!=a&&(l.limit_total=a);const c={domain:ne,service:"search_tracks",serviceData:l},d=(await this.CallServiceWithResponse(c)).result;return n&&null!=d&&null!=d.items&&d.items.forEach(e=>{e.album&&(e.album.images=[],e.album.available_markets=[]),e.available_markets=[]}),fs.enabled&&fs("%cCallServiceWithResponse - Service %s response (trimmed):\n%s","color: orange",JSON.stringify(c.service),JSON.stringify(d,null,2)),d}finally{}}async UnfollowArtists(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.ids=t);const s={domain:ne,service:"unfollow_artists",serviceData:i};await this.CallService(s)}finally{}}async UnfollowPlaylist(e,t=null){try{const i={entity_id:e.id};null!=t&&(i.playlist_id=t);const s={domain:ne,service:"unfollow_playlist",serviceData:i};await this.CallService(s)}finally{}}async VolumeSetStepLevel(e,t){const i=t/100,s={domain:ne,service:"volume_set_step",serviceData:{entity_id:e.id,level:i}};await this.CallService(s)}async ZeroconfDeviceConnect(e,t,i=null,s=null,r=null,o=!0,a=!0,n=null){try{fs.enabled&&fs("ZeroconfDeviceDisconnect - device item:\n%s",JSON.stringify(t,null,2));const l={entity_id:e.id,host_ipv4_address:t.DiscoveryResult.HostIpAddress,host_ip_port:t.DiscoveryResult.HostIpPort,cpath:t.DiscoveryResult.SpotifyConnectCPath,version:t.DiscoveryResult.SpotifyConnectVersion,use_ssl:t.DiscoveryResult.ZeroconfApiEndpointAddUser.startsWith("https:")};null!=i&&(l.username=i),null!=s&&(l.password=s),null!=r&&(l.loginid=r),null!=o&&(l.pre_disconnect=o),null!=a&&(l.verify_device_list_entry=a),null!=n&&(l.delay=n);const c={domain:ne,service:"zeroconf_device_connect",serviceData:l};return(await this.CallServiceWithResponse(c)).result}finally{}}async ZeroconfDeviceDisconnect(e,t,i=null){try{fs.enabled&&fs("ZeroconfDeviceDisconnect - device item:\n%s",JSON.stringify(t,null,2));const s={entity_id:e.id,host_ipv4_address:t.DiscoveryResult.HostIpAddress,host_ip_port:t.DiscoveryResult.HostIpPort,cpath:t.DiscoveryResult.SpotifyConnectCPath,version:t.DiscoveryResult.SpotifyConnectVersion,use_ssl:t.DiscoveryResult.ZeroconfApiEndpointAddUser.startsWith("https:")};null!=i&&(s.delay=i);const r={domain:ne,service:"zeroconf_device_disconnect",serviceData:s};return(await this.CallServiceWithResponse(r)).result}finally{}}async select_source(e,t=null){if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);const i={entity_id:e.id};t&&(i.source=t);const s={domain:le,service:ps,serviceData:i};await this.CallService(s)}async turn_off(e){const t={entity_id:e.id},i={domain:le,service:ns,serviceData:t};await this.CallService(i)}async turn_on(e){const t={entity_id:e.id},i={domain:le,service:as,serviceData:t};await this.CallService(i),this.config.deviceDefaultId&&(e.isUserProductPremium()||e.attributes.sp_user_has_web_player_credentials)&&await this.PlayerTransferPlayback(e,this.config.deviceDefaultId,!0)}async volume_mute(e,t){if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);const i={domain:le,service:ds,serviceData:{entity_id:e.id,is_volume_muted:t}};await this.CallService(i)}async volume_mute_toggle(e){const t=!e.isMuted();await this.volume_mute(e,t)}async volume_set(e,t){if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);const i=t/100,s={domain:le,service:hs,serviceData:{entity_id:e.id,volume_level:i}};await this.CallService(s)}async volume_down(e){const t={domain:le,service:ls,serviceData:{entity_id:e.id}};await this.CallService(t)}async volume_up(e){const t={domain:le,service:cs,serviceData:{entity_id:e.id}};await this.CallService(t)}async Card_PlayMediaBrowserItem(e,t){if(!e.isUserProductPremium()&&!e.attributes.sp_user_has_web_player_credentials)throw new Error(Se);if(!e)throw new Error("Media player argument was not supplied to the PlayMediaBrowserItem service.");if(!t)throw new Error("Media browser item argument was not supplied to the PlayMediaBrowserItem service.");try{const i=function(e){let t=e;if(e){const i=e.indexOf(":");if(i>-1){const s=e.lastIndexOf(":");s>-1&&(t=e.substring(i+1,s))}}return t}(t.uri)||"";fs.enabled&&fs("Card_PlayMediaBrowserItem - play media item\n- player.id = %s\n- mediaItem.uri = %s\n- uriType = %s",JSON.stringify(e.id),JSON.stringify(t.uri),JSON.stringify(i));let s=null;if(void 0!==t.shuffle&&(s=!0===t.shuffle),["album","artist","playlist","show","audiobook","podcast"].indexOf(i)>-1)await this.PlayerMediaPlayContext(e,t.uri||"",null,null,null,null,null,s);else if(t.uri.indexOf(":collection")>-1)await this.PlayerMediaPlayContext(e,t.uri||"",null,null,null,null,null,s);else{if(!(["track","episode","chapter"].indexOf(i)>-1))throw new Error('unknown media type "'+i+'".');await this.PlayerMediaPlayTracks(e,t.uri||"",null,null,null,s)}}finally{}}}function ys(e){let t=e;if(e){const i=e.lastIndexOf(":");i>-1&&(t=e.substring(i+1))}return t}function As(e,t){null==t&&(t="; ");let i="";if(e)for(const s of e.copyrights||[])null!=s&&null!=s.text&&s.text.length>0&&(i.length>0&&(i+=t),i+=s.text);return i}const ws=_e(ce+":user-presets");function Ss(e,t=null){const i={name:e.name,image_url:e.image_url||"",subtitle:t||e.type,type:e.type,uri:e.uri};return ws.enabled&&ws("%cGetUserPresetConfigEntry - preset object:\n%s","color: orange",JSON.stringify(i,null,2)),i}function Cs(e,t=null){const i=Ss(e,t),s="\n";let r="";return r+="  - name: "+i.name+s,r+="    subtitle: "+i.type+s,r+="    image_url: "+i.image_url+s,r+="    uri: "+i.uri+s,r+="    type: "+i.type+s,r}function xs(e,t=null){const i=Ss(e,t),s="\n";let r="";return r+="  {\n",r+='    "name": "'+i.name+'",'+s,r+='    "subtitle": "'+i.type+'",'+s,r+='    "image_url": "'+i.image_url+'",'+s,r+='    "uri": "'+i.uri+'",'+s,r+='    "type": "'+i.type+'"'+s,r+="  },\n",r}function Is(e){if(!e||"object"!=typeof e)return e;if("[object Date]"==Object.prototype.toString.call(e))return new Date(e.getTime());if(Array.isArray(e))return e.map(Is);var t={};return Object.keys(e).forEach(function(i){t[i]=Is(e[i])}),t}const ks=_e(ce+":hass-service");class $s{constructor(e){this.hass=e}async CallService(e){try{ks.enabled&&ks("%cCallService - Calling service %s (no response)\n%s","color: orange;",JSON.stringify(e.service),JSON.stringify(e,null,2)),await this.hass.callService(e.domain,e.service,e.serviceData,e.target)}finally{}}async browseMedia(e,t,i){return await this.hass.callWS({type:"media_player/browse_media",entity_id:e.id,media_content_id:i,media_content_type:t})}async getRelatedEntities(e,...t){return new Promise(async(i,s)=>{const r={type:"render_template",template:"{{ device_entities(device_id('"+e.id+"')) }}"};try{const e=await this.hass.connection.subscribeMessage(s=>{e(),i(s.result.filter(e=>t.some(t=>e.includes(t))).map(e=>this.hass.states[e]))},r)}catch(e){s(e)}})}}class Ts{constructor(e){this.id=e.entity_id,this.state=e.state,this.attributes=e.attributes,this.name=this.attributes.friendly_name||""}getVolume(){return this.attributes.volume_level?Math.round(100*this.attributes.volume_level):0}isIdle(){return this.state===vs.IDLE}isIdleOrUnknown(){return this.state===vs.IDLE||this.state===vs.UNKNOWN}isUserProductPremium(){return"premium"===this.attributes.sp_user_product}isPlaying(){return this.state===vs.PLAYING}isPoweredOff(){return this.state===vs.OFF}isPoweredOffOrIdle(){return this.state===vs.OFF||this.state===vs.IDLE||this.state===vs.UNKNOWN}isPoweredOffOrUnknown(){return this.state===vs.OFF||this.state===vs.UNKNOWN}isMuted(){return this.attributes.is_volume_muted||!1}supportsFeature(e){return 0!==((this.attributes.supported_features||0)&e)}}function Es(e,t){let i=null;const s=Object.values(e.entities).filter(e=>e.entity_id.match(t));if(!s)return i;const r=t.toLowerCase();return s.forEach(e=>{const t=e;t.entity_id.toLowerCase()==r&&(i=t)}),i}function Ps(e,t){let i=null;const s=Object.values(e.states).filter(e=>e.entity_id.match(t));if(!s)return i;const r=t.toLowerCase();return s.forEach(e=>{const t=e;t.entity_id.toLowerCase()==r&&(i=t)}),i}const _s=_e(ce+":store");class Ls{constructor(e,t,i,s){if(!e)throw new Error("STPC0005 hass property has not been set!");this.hass=e,this.config=t,this.card=i,this.hassService=new $s(e),this.mediaControlService=new us(this.hassService),this.spotifyPlusService=new bs(e,i,t),this.player=this.getMediaPlayerObject(),this.section=s,_s.enabled}getMediaPlayerObject(){const e=this.config.entity+"";let t=null,i="";for(;;){if(!this.config||!this.config.entity||""==this.config.entity.trim())break;const s=Es(this.hass,e);if(!s){i="Card configuration `entity` value "+JSON.stringify(e)+" is not defined in HA entities table; is it disabled? is `entity` value spelled correctly (search is case-sensitive)?";break}if(s.platform!=ne){i="Card configuration `entity` value "+JSON.stringify(e)+" is not a "+JSON.stringify(ne)+" platform media player.";break}const r=Ps(this.hass,this.config.entity);if(!r){i="Card configuration `entity` value "+JSON.stringify(e)+" could not be found in the HA state machine.";break}if(t=new Ts(r),t)return t;i="Card configuration `entity` value "+JSON.stringify(e)+" was not found in the HA state machine; is it disabled?";break}return t=new Ts({entity_id:"",state:"",last_changed:"",last_updated:"",attributes:{sp_config_state:i},context:{id:"",user_id:"",parent_id:""}}),t}}Ls.selectedConfigArea=Kt.GENERAL,Ls.hasCardEditLoadedMediaList={};const Rs=_e(ce+":lovelace-config-utils");function Fs(e,t,i,s){if("object"!=typeof e||null===e)return e;if(e.hasOwnProperty("type")&&e.type===s.type&&e.hasOwnProperty(t)&&e[t]===i)return s;const r=Is(e);for(const o in e)e.hasOwnProperty(o)&&(r[o]=Fs(e[o],t,i,s));return r}async function Os(e){try{if(Rs.enabled&&Rs("%cupdateCardConfigurationStorage - updating Lovelace Card Configuration storage\n- cardUniqueId = %s\n- card configuration object:\n%s","color: white",JSON.stringify(e.cardUniqueId),JSON.stringify(e,null,2)),!e.cardUniqueId)throw new Error("Card Configuration does not have a cardUniqueId option value; this value is required in order to update the card programatically outside of the card editor UI.");const t=function(){let e=document.querySelector("home-assistant");if(e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver"),e=e&&e.shadowRoot||e,e=e&&e.querySelector("ha-panel-lovelace"),e=e&&e.shadowRoot,e=e&&e.querySelector("hui-root"),e){const t=e.lovelace;return t.current_view=e.___curView,t}return null}();if(!t)throw new Error("Could not get HA lovelace object reference; please notify the card developer of this error.");Rs.enabled&&(Rs("%cupdateCardConfigurationStorage - Lovelace.rawConfig object BEFORE replace:\n%s","color: orange",JSON.stringify(t.rawConfig,null,2)),Rs("%cupdateCardConfigurationStorage - card configuration that contains cardUniqueId = %s will be replaced","color: gold",JSON.stringify(e.cardUniqueId)));const i=Fs(t.rawConfig,"cardUniqueId",e.cardUniqueId,e);Rs.enabled&&(Rs("%cupdateCardConfigurationStorage - Lovelace.rawConfig object AFTER replace:\n%s","color: gold",JSON.stringify(i,null,2)),Rs("%cupdateCardConfigurationStorage - Saving Lovelace raw configuration to storage","color: white")),t.saveConfig(i),Rs.enabled&&Rs("%cupdateCardConfigurationStorage - Lovelace raw configuration saved to storage","color: white"),Ls.selectedConfigArea=ai(Yt.USERPRESETS)}catch(e){const t=ui(e);throw Rs.enabled&&Rs("%cupdateCardConfigurationStorage - Configuration update failed:\n%s","color: red",JSON.stringify(t)),new Error("Configuration update failed: "+t)}}var Ms;!function(e){e.AlbumCopyPresetToClipboard="AlbumCopyPresetToClipboard",e.AlbumCopyPresetJsonToClipboard="AlbumCopyPresetJsonToClipboard",e.AlbumCopyUriToClipboard="AlbumCopyUriToClipboard",e.AlbumFavoriteAdd="AlbumFavoriteAdd",e.AlbumFavoriteRemove="AlbumFavoriteRemove",e.AlbumFavoriteUpdate="AlbumFavoriteUpdate",e.AlbumPlayTrackFavorites="AlbumPlayTrackFavorites",e.AlbumTrackQueueAdd="AlbumTrackQueueAdd",e.AlbumTracksUpdate="AlbumTracksUpdate",e.AlbumSearchRadio="AlbumSearchRadio",e.AlbumShowTracks="AlbumShowTracks",e.AlbumUserPresetAdd="AlbumUserPresetAdd",e.ArtistCopyPresetToClipboard="ArtistCopyPresetToClipboard",e.ArtistCopyPresetJsonToClipboard="ArtistCopyPresetJsonToClipboard",e.ArtistCopyUriToClipboard="ArtistCopyUriToClipboard",e.ArtistFavoriteAdd="ArtistFavoriteAdd",e.ArtistFavoriteRemove="ArtistFavoriteRemove",e.ArtistFavoriteUpdate="ArtistFavoriteUpdate",e.ArtistPlayTrackFavorites="ArtistPlayTrackFavorites",e.ArtistSearchPlaylists="ArtistSearchPlaylists",e.ArtistSearchRadio="ArtistSearchRadio",e.ArtistSearchTracks="ArtistSearchTracks",e.ArtistShowAlbums="ArtistShowAlbums",e.ArtistShowAlbumsAppearsOn="ArtistShowAlbumsAppearsOn",e.ArtistShowAlbumsCompilation="ArtistShowAlbumsCompilation",e.ArtistShowAlbumsSingle="ArtistShowAlbumsSingle",e.ArtistShowRelatedArtists="ArtistShowRelatedArtists",e.ArtistShowTopTracks="ArtistShowTopTracks",e.ArtistUserPresetAdd="ArtistUserPresetAdd"}(Ms||(Ms={}));class Hs extends is{constructor(){super(Yt.ALBUM_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Artist &quot;${this.mediaItem.artists[0].name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Ms.ArtistFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Artist &quot;${this.mediaItem.artists[0].name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Ms.ArtistFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Mi}
          label="Add Album &quot;${this.mediaItem.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Ms.AlbumFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Album &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Ms.AlbumFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,r=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${$i}
          .label="View Artist &quot;${this.mediaItem.artists[0].name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.artists[0].external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,o=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ti}
          .label="View Album &quot;${this.mediaItem.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,a=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Album Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Album
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumShowTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Album Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Album Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Album to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Album Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Album Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.AlbumCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Album URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,n=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Artist Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Artist
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistSearchPlaylists)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Search Playlists for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistSearchTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Search Tracks for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Artist Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistShowTopTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Artist Top Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistShowAlbums)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistShowAlbumsCompilation)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Compilations
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistShowAlbumsSingle)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Singles
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistShowAlbumsAppearsOn)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums AppearsOn
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistShowRelatedArtists)} hide=${this.hideSearchType(wi.ARTISTS)}>
          <ha-svg-icon slot="icon" .path=${$i}></ha-svg-icon>
          Show Related Artists
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Artist to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Ms.ArtistCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Artist URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B` 
      <div class="album-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${o}
              ${this.mediaItem.name}
              ${this.isAlbumFavorite?s:i}
              <span class="actions-dropdown-menu">
                ${a}
              </span>
            </div>
            <div class="media-info-text-ms">
              ${r}
              ${this.mediaItem.artists[0].name}
              ${this.isArtistFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${n}
              </span>
            </div>
            <div class="grid album-info-grid">
              <div class="grid-action-info-hdr-s">Released</div>
              <div class="grid-action-info-text-s">${this.mediaItem.release_date}</div>

              <div class="grid-action-info-hdr-s"># Tracks</div>
              <div class="grid-action-info-text-s">${this.mediaItem.total_tracks}</div>

              ${"label"in this.mediaItem?B`
                <div class="grid-action-info-hdr-s">Label</div>
                <div class="grid-action-info-text-s">${this.mediaItem.label}</div>
                `:""}

              ${"copyrights"in this.mediaItem?B`
                <div class="grid-action-info-hdr-s">Copyright</div>
                <div class="grid-action-info-text-s">${As(this.mediaItem,"; ")}</div>
                `:""}

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.mediaItem.uri}</div>
            </div>
          </div>
        </div>
        <div class="grid-container-scrollable">
          <div class="grid tracks-grid">
            <div class="grid-header">&nbsp;</div>
            <div class="grid-header">#</div>
            <div class="grid-header">Title</div>
            <div class="grid-header">Artist</div>
            <div class="grid-header grid-header-last">Duration</div>
            ${this.albumTracks?.items.map(e=>B`
              <ha-icon-button
                .path=${zi}
                .label="Add track &quot;${e.name}&quot; to Play Queue"
                @click=${()=>this.AddPlayerQueueItem(e)}
                slot="icon-button"
              >&nbsp;</ha-icon-button>
              <div class="grid-entry">${e.track_number}</div>
              <div class="grid-entry">${e.name}</div>
              <div class="grid-entry">${e.artists[0].name}</div>
              <div class="grid-entry">${si(e.duration_ms)}</div>
            `)}
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .album-info-grid {
        grid-template-columns: auto auto;
        justify-content: left;
      }

      .album-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      /* style tracks container and grid */
      .tracks-grid {
        grid-template-columns: 40px 30px auto auto 60px;
      }

      /* style ha-icon-button controls in tracks grid: icon size, title text */
      .tracks-grid > ha-icon-button[slot="icon-button"] {
        --ha-icon-button-size: 24px;
        --ha-icon-size: 20px;
        vertical-align: top;
        padding: 0px;
      }

    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{if(e==Ms.AlbumCopyPresetToClipboard)return Zt(Cs(this.mediaItem,this.mediaItem.artists[0].name)),this.alertInfoSet(Ae),!0;if(e==Ms.AlbumCopyPresetJsonToClipboard)return Zt(xs(this.mediaItem,this.mediaItem.artists[0].name)),this.alertInfoSet(we),!0;if(e==Ms.AlbumCopyUriToClipboard)return Zt(this.mediaItem.uri),!0;if(e==Ms.AlbumSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.name+ge+this.mediaItem.artists[0].name)),!0;if(e==Ms.AlbumShowTracks)return this.dispatchEvent(os(wi.ALBUM_TRACKS,this.mediaItem.name+"; "+this.mediaItem.artists[0].name,this.mediaItem.name,this.mediaItem.uri,null,this.mediaItem)),!0;if(e==Ms.ArtistCopyPresetToClipboard)return this.mediaItem.artists[0].image_url=this.mediaItem.image_url,Zt(Cs(this.mediaItem.artists[0])),this.alertInfoSet(Ae),!0;if(e==Ms.ArtistCopyPresetJsonToClipboard)return this.mediaItem.artists[0].image_url=this.mediaItem.image_url,Zt(xs(this.mediaItem.artists[0])),this.alertInfoSet(we),!0;if(e==Ms.ArtistCopyUriToClipboard)return Zt(this.mediaItem.artists[0].uri),!0;if(e==Ms.ArtistSearchPlaylists)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.artists[0].name)),!0;if(e==Ms.ArtistSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.artists[0].name+ge)),!0;if(e==Ms.ArtistShowAlbums)return this.dispatchEvent(os(wi.ARTIST_ALBUMS,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Ms.ArtistShowAlbumsAppearsOn)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_APPEARSON,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Ms.ArtistShowAlbumsCompilation)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_COMPILATION,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Ms.ArtistShowAlbumsSingle)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_SINGLE,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Ms.ArtistShowRelatedArtists)return this.dispatchEvent(os(wi.ARTIST_RELATED_ARTISTS,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Ms.ArtistShowTopTracks)return this.dispatchEvent(os(wi.ARTIST_TOP_TRACKS,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Ms.ArtistSearchTracks)return this.dispatchEvent(os(wi.TRACKS,this.mediaItem.artists[0].name)),!0;this.progressShow();const t=ys(this.mediaItem.artists[0].uri);if(e==Ms.AlbumUserPresetAdd)this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide();else if(e==Ms.AlbumFavoriteAdd)await this.spotifyPlusService.SaveAlbumFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[Ms.AlbumFavoriteUpdate]);else if(e==Ms.AlbumFavoriteRemove)await this.spotifyPlusService.RemoveAlbumFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[Ms.AlbumFavoriteUpdate]);else if(e==Ms.AlbumPlayTrackFavorites){const e=this.store.config.albumFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,null,this.mediaItem.uri),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else if(e==Ms.ArtistUserPresetAdd)this.mediaItem.artists[0].image_url=this.mediaItem.image_url,this.store.config.userPresets?.unshift(Ss(this.mediaItem.artists[0])),await Os(this.store.config),this.progressHide();else if(e==Ms.ArtistFavoriteAdd)await this.spotifyPlusService.FollowArtists(this.player,t),this.updateActions(this.player,[Ms.ArtistFavoriteUpdate]);else if(e==Ms.ArtistFavoriteRemove)await this.spotifyPlusService.UnfollowArtists(this.player,t),this.updateActions(this.player,[Ms.ArtistFavoriteUpdate]);else if(e==Ms.ArtistPlayTrackFavorites){const e=this.store.config.artistFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,this.mediaItem.artists[0].uri,null),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else this.progressHide();return!0}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(Ms.AlbumTracksUpdate)||0==t.length){const t=new Promise((t,i)=>{const s=this.mediaItem.total_tracks;this.spotifyPlusService.GetAlbumTracks(e,this.mediaItem.id,0,0,null,s).then(e=>{this.albumTracks=e,t(!0)}).catch(e=>{this.albumTracks=void 0,this.alertErrorSet("Get Album Tracks failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Ms.AlbumFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckAlbumFavorites(e,this.mediaItem.id).then(e=>{this.isAlbumFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isAlbumFavorite=void 0,this.alertErrorSet("Check Album Favorite failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Ms.ArtistFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckArtistsFollowing(e,this.mediaItem.artists[0].id).then(e=>{this.isArtistFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isArtistFavorite=void 0,this.alertErrorSet("Check Artist Following failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Album actions refresh failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],Hs.prototype,"mediaItem",void 0),Ce([Ve()],Hs.prototype,"albumTracks",void 0),Ce([Ve()],Hs.prototype,"isAlbumFavorite",void 0),Ce([Ve()],Hs.prototype,"isArtistFavorite",void 0),customElements.define("crm-album-actions",Hs);const Bs=a`

  .media-browser-section {
    color: var(--crm-text, var(--primary-text-color));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 0;
  }

  .media-browser-section-title {
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: var(--spc-media-browser-section-title-font-size, 1.0rem);
    line-height: var(--spc-media-browser-section-title-font-size, 1.0rem);
    color: var(
      --spc-media-browser-section-title-color,
      var(--crm-text, var(--primary-text-color))
    );
  }

  .media-browser-section-subtitle {
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: normal;
    font-size: var(--spc-media-browser-section-subtitle-font-size, 0.85rem);
    line-height: var(--spc-media-browser-section-subtitle-font-size, 0.85rem);
    color: var(
      --spc-media-browser-section-subtitle-color,
      var(--crm-text, var(--primary-text-color))
    );
    opacity: 0.78;
  }

  .media-browser-controls {
    padding: 0.2rem 0.4rem 0.2rem;
    white-space: nowrap;
    --ha-select-height: 2.5rem;
    --mdc-menu-item-height: 2.5rem;
    --ha-icon-button-size: 2.5rem;
    --md-menu-item-top-space: 0.5rem;
    --md-menu-item-bottom-space: 0.5rem;
    --md-menu-item-one-line-container-height: 2.0rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-shrink: 0;
  }

  .media-browser-control-filter {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    width: 100%;
  }

  .media-browser-control-filter-disabled {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    width: 100%;
    align-self: center;
    color: var(--crm-text, var(--primary-text-color));
    opacity: 0.65;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .media-browser-content {
    margin: 0.5rem;
    flex: 0 1 auto;
    height: auto;
    max-height: var(--crm-browser-list-height, 230px);
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color:
      var(--crm-text, var(--primary-text-color))
      var(--crm-background-secondary, var(--secondary-background-color));
    scrollbar-width: auto;
  }

  .media-browser-list {
    height: auto;
    min-height: 0;
  }

  .media-browser-actions {
    min-height: 100%;
  }

  ha-alert {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--crm-text, var(--primary-text-color));
  }

  *[hide] {
    display: none;
  }

`;const Ds=new class{constructor(){this._propValues={}}addPropertyValue(e){if(!this._propValues.hasOwnProperty(e)){const t=window.localStorage.getItem(e);this._propValues[e]=t?JSON.parse(t):null}}getPropertyValue(e){return this._propValues[e]}setPropertyValue(e,t){this._propValues[e]=t}saveProperties(){for(const e in this._propValues)this._propValues.hasOwnProperty(e)&&window.localStorage.setItem(e,JSON.stringify(this._propValues[e]))}saveProperty(e){this._propValues.hasOwnProperty(e)&&window.localStorage.setItem(e,JSON.stringify(this._propValues[e]))}getStorageValue(e,t=null){const i=window.localStorage.getItem(e);return i?JSON.parse(i):t}setStorageValue(e,t){window.localStorage.setItem(e,JSON.stringify(t))}clearStorageValue(e){window.localStorage.removeItem(e)}clearStorage(){window.localStorage.clear();for(const e in this._propValues)this._propValues.hasOwnProperty(e)&&(this._propValues[e]=null)}clearStorageByKey(e){this._propValues.hasOwnProperty(e)&&(window.localStorage.removeItem(e),this._propValues[e]=null)}},Vs=_e(ce+":fav-browser-base"),Us="_filtercriteria",zs="_medialist",Ns="_medialistlastupdated",Ws="Previous refresh is still in progress - please wait";class qs extends es{constructor(e){super(),this.EDITOR_LIMIT_TOTAL_MAX=25,this.LIMIT_TOTAL_MAX=200,this.isActionsEnabled=!0,this.isMediaListRefreshedOnSectionEntry=!1,this.mediaType=e,this.shuffleOnPlay=!1,this.onKeyDown_EventListenerBound=this.onKeyDown.bind(this)}uiText(e,t,i,s){const r=this.hass?.locale?.language||this.hass?.language,o=Ye(e,"auto",r);if(o!==e)return o;return{de:t,pt:i,en:s}[Je("auto",r)]}render(){Vs.enabled&&Vs("render - rendering control: %s\n- mediaListLastUpdatedOn = %s\n- scrollTopSaved = %s\n- filterItemCount = %s (pre-render)",JSON.stringify(this.mediaType),JSON.stringify(this.mediaListLastUpdatedOn),JSON.stringify(this.scrollTopSaved),JSON.stringify(this.filterItemCount)),this.hass=this.store.hass,this.config=this.store.config,this.player=this.store.player,this.spotifyPlusService=this.store.spotifyPlusService,this.isCardInEditPreview=ni(this.store.card),this.setScrollPosition(),this.isFilterCriteriaReadOnly=!1,this.isFilterCriteriaVisible=!0,this.filterCriteriaHtml=B`
      <ha-input-search id="filterCriteria" 
        class="media-browser-control-filter"
        appearance="outlined"
        .hass=${this.hass}
        .value=${this.filterCriteria||""}
        .autofocus=${!1}
        .placeholder=${this.mediaType===Yt.SEARCH_MEDIA?this.uiText("search.searchByName","Nach Namen suchen","Pesquisar por nome","Search by name"):this.filterCriteriaPlaceholder||this.uiText("search.searchByName","Nach Namen suchen","Pesquisar por nome","Search by name")}
        @input=${this.onFilterCriteriaChange}
        @keypress=${this.onFilterCriteriaKeyPress}
      ></ha-input-search>
      `,this.filterCriteriaReadOnlyHtml=B`
      <span id="filterCriteriaDisabled" 
        class="media-browser-control-filter-disabled"
      >${this.filterCriteria}</span>
      `,this.refreshMediaListHtml=B`
      <ha-icon-button
        slot="refresh-button"
        .label=${this.uiText("search.refresh","Liste aktualisieren","Atualizar lista","Refresh media list")}
        action="refresh"
        .path=${"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"}
        @click=${this.onFilterActionsClick}
      ></ha-icon-button>
      `,this.formatMediaListHtml=B`
      <ha-button-menu y="0" x="-180" style="display:none">
        <ha-icon-button
          slot="trigger"
          .label=${this.uiText("search.formatList","Listenformat","Formato da lista","Format media list")}
          .path=${"M3,3H11V5H3V3M13,3H21V5H13V3M3,7H11V9H3V7M13,7H21V9H13V7M3,11H11V13H3V11M13,11H21V13H13V11M3,15H11V17H3V15M13,15H21V17H13V15M3,19H11V21H3V19M13,19H21V21H13V19Z"}
        ></ha-icon-button>
        <div style="width:220px; padding:10px; border:1px solid var(--ha-card-border-color,var(--divider-color,#e0e0e0))">
          <ha-slider
            hint="Tiles per row (1-12)"
            min="1"
            max="12"
            step="1"
            .value=${this.favBrowserItemsPerRow}
            @change=${this.onFormatMediaListChanged}
          >
          </ha-slider>
        </div>
      </ha-button-menu>
      `,this.btnHideActionsHtml=B`
      <ha-icon-button
        style="margin-right: 0.25rem;"
        slot="back-button"
        .label=${this.uiText("search.back","Zurück zur Liste","Voltar à lista","Back to media list")}
        action="hideactions"
        .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
        @click=${this.onFilterActionsClick}
      ></ha-icon-button>
      `}styleMediaBrowser(){const e=this.config.mediaBrowserSectionTitleColor,t=this.config.mediaBrowserSectionTitleFontSize,i=this.config.mediaBrowserSectionSubTitleColor,s=this.config.mediaBrowserSectionSubTitleFontSize,r=this.config.mediaBrowserItemsSvgIconColor,o={};return e&&(o["--crm-media-browser-section-title-color"]=`${e}`),t&&(o["--crm-media-browser-section-title-font-size"]=`${t}`),i&&(o["--crm-media-browser-section-subtitle-color"]=`${i}`),s&&(o["--crm-media-browser-section-subtitle-font-size"]=`${s}`),r&&(o["--crm-media-browser-items-svgicon-color"]=`${r}`),Me(o)}static get styles(){return[Bs,a`

      /* extra styles not defined in sharedStylesFavBrowser would go here. */

      /* you can also copy this method into any inheriting class to apply fav-browser specific styles. */


      ha-input-search {
        color: orange;
        font-size: 16px;
      }

      ha-input-search::part(input) {
        color: orange;
        font-size: 20px;
      }

      ha-input-search::part(input)::placeholder {
        color: orange;
        font-size: 24px;
      }

      ha-input-search ha-svg-icon {
        color: var(--secondary-text-color);
      }
      `]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onKeyDown_EventListenerBound)}disconnectedCallback(){document.removeEventListener("keydown",this.onKeyDown_EventListenerBound),super.disconnectedCallback()}firstUpdated(e){if(super.firstUpdated(e),Vs.enabled&&Vs("%cfirstUpdated (base) - isMediaListRefreshedOnSectionEntry = %s\n- changedProperties keys for mediaType %s:\n- %s","color: yellow;",JSON.stringify(this.isMediaListRefreshedOnSectionEntry),JSON.stringify(this.mediaType),JSON.stringify(Array.from(e.keys()))),(async()=>{await hi()})(),this.cacheKeyBase=ne+"_"+(this.player.attributes.sp_user_id||"nospuserid")+"_",1==this.isMediaListRefreshedOnSectionEntry&&(this.isCardInEditPreview||(Vs.enabled&&Vs("%cfirstUpdated - %s mediaList will be updated on section entry","color: yellow;",JSON.stringify(this.mediaType)),this.storageValuesClear())),this.storageValuesLoad(),0==(this.mediaListLastUpdatedOn||0)){if(this.isCardInEditPreview&&this.mediaType in Ls.hasCardEditLoadedMediaList)return void(Vs.enabled&&Vs("%cfirstUpdated - %s mediaList already updated; updateMediaList will not be called again while editing card configuration!","color: yellow;",JSON.stringify(this.mediaType)));Vs.enabled&&Vs("%cfirstUpdated - %s mediaList will be updated on first update","color: yellow;",JSON.stringify(this.mediaType)),this.updateMediaList(this.player)}else this.isCardInEditPreview&&this.updatedMediaListOk(!1)}filterSectionMedia(e){Vs.enabled&&Vs("filterSectionMedia - filtering section media:\n%s",JSON.stringify(e,null,2)),this.filterCriteria=e.filterCriteria,this.updateMediaList(this.player)}storageValuesClear(){Ds.clearStorageValue(this.cacheKeyBase+this.mediaType+Ns),Ds.clearStorageValue(this.cacheKeyBase+this.mediaType+zs),Ds.clearStorageValue(this.cacheKeyBase+this.mediaType+Us),this.mediaType in Ls.hasCardEditLoadedMediaList&&delete Ls.hasCardEditLoadedMediaList[this.mediaType],Vs.enabled&&Vs("storageValuesClear - %s parameters were cleared from cache:\n mediaListLastUpdatedOn, mediaList, filterCriteria",JSON.stringify(this.mediaType))}storageValuesLoad(){this.mediaListLastUpdatedOn=Ds.getStorageValue(this.cacheKeyBase+this.mediaType+Ns,0),this.mediaList=Ds.getStorageValue(this.cacheKeyBase+this.mediaType+zs,void 0),this.filterCriteria=Ds.getStorageValue(this.cacheKeyBase+this.mediaType+Us,void 0),Vs.enabled&&Vs("storageValuesLoad - %s parameters were loaded from cache:\n mediaListLastUpdatedOn, mediaList, filterCriteria",JSON.stringify(this.mediaType))}storageValuesSave(){Ds.setStorageValue(this.cacheKeyBase+this.mediaType+Ns,this.mediaListLastUpdatedOn),Ds.setStorageValue(this.cacheKeyBase+this.mediaType+zs,this.mediaList),Ds.setStorageValue(this.cacheKeyBase+this.mediaType+Us,this.filterCriteria),Vs.enabled&&Vs("storageValuesSave - %s parameters were saved to cache:\n mediaListLastUpdatedOn, mediaList, filterCriteria",JSON.stringify(this.mediaType))}onFilterCriteriaChange(e){this.filterCriteria=e.target.value,""==this.filterCriteria&&Ds.clearStorageValue(this.cacheKeyBase+this.mediaType+Us)}onFilterCriteriaKeyPress(e){"Enter"===e.key&&this.updateMediaList(this.player)}onFilterActionsClick(e){const t=e.currentTarget.getAttribute("action");"refresh"===t?(this.storageValuesClear(),this.updateMediaList(this.player)):"hideactions"===t&&(this.isActionsVisible=!1,setTimeout(()=>{this.requestUpdate()},50))}onItemSelected(e){Vs.enabled&&Vs("onItemSelected - media item selected:\n%s",JSON.stringify(e.detail,null,2));const t=e.detail;this.PlayMediaItem(t)}onItemSelectedWithHold(e){Vs.enabled&&Vs("onItemSelectedWithHold - media item selected:\n%s",JSON.stringify(e.detail,null,2)),this.isActionsEnabled?this.isCardInEditPreview?this.alertInfo=this.uiText("search.actionsUnavailable","Aktionen sind während der Kartenbearbeitung nicht verfügbar","Ações indisponíveis durante a edição do cartão","Cannot display actions while editing card configuration"):(this.mediaItem=e.detail,this.scrollTopSaved=this.mediaBrowserContentElement.scrollTop,this.isActionsVisible=!this.isActionsVisible,this.isActionsVisible&&this.alertClear()):this.onItemSelected(e)}onKeyDown(e){"Escape"===e.key&&(this.isActionsVisible=!1,setTimeout(()=>{this.requestUpdate()},50))}onFormatMediaListChanged(e){const t=Number(e.target.value);null!=t&&(this.favBrowserItemsPerRow=t,Vs.enabled&&Vs("onFormatMediaListChanged - changed favBrowserItemsPerRow, value = %s",JSON.stringify(this.favBrowserItemsPerRow)))}async PlayMediaItem(e){try{this.progressShow(),Vs.enabled&&Vs("PlayMediaItem \n- shuffleOnPlay = %s\n- player.attributes.shuffle = %s",JSON.stringify(this.shuffleOnPlay),JSON.stringify(this.player.attributes.shuffle)),this.shuffleOnPlay&&!this.player.attributes.shuffle&&await this.spotifyPlusService.PlayerSetShuffleMode(this.player,null,!0),await this.spotifyPlusService.Card_PlayMediaBrowserItem(this.player,e),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet(this.uiText("search.playFailed","Medium konnte nicht abgespielt werden. ","Não foi possível reproduzir o item. ","Could not play media item. ")+ui(e)),this.mediaBrowserContentElement&&this.mediaBrowserContentElement&&(this.mediaBrowserContentElement.scrollTop=0)}finally{this.progressHide()}}async QueueMediaItem(e){try{this.progressShow(),await this.spotifyPlusService.AddPlayerQueueItems(this.player,e.uri),this.alertInfo=this.uiText("search.addedToQueue","Zur Warteschlange hinzugefügt","Adicionado à fila","Added to queue")+': "'+e.name+'".',this.mediaBrowserContentElement&&(this.mediaBrowserContentElement.scrollTop=0)}catch(e){this.alertErrorSet(this.uiText("search.queueFailed","Element konnte nicht zur Warteschlange hinzugefügt werden. ","Não foi possível adicionar à fila. ","Could not queue media item. ")+ui(e)),this.mediaBrowserContentElement&&(this.mediaBrowserContentElement.scrollTop=0)}finally{this.progressHide()}}setScrollPosition(){if(this.isActionsVisible)return;if(0==this.scrollTopSaved)return;if(!this.hasUpdated)return;const e=this.shadowRoot?.querySelector(".media-browser-list");e&&e.shadowRoot&&e?.updateComplete&&(this.mediaBrowserContentElement&&(this.mediaBrowserContentElement.scrollTop=this.scrollTopSaved||0),setTimeout(()=>{this.setScrollPosition(),this.scrollTopSaved=0},50))}updateMediaList(e){return this.isUpdateInProgress?(this.alertErrorSet(this.uiText("search.refreshInProgress","Aktualisierung läuft bereits – bitte warten","Atualização em andamento — aguarde",Ws)),!1):(this.isUpdateInProgress=!0,e?(this.isActionsVisible=!1,this.mediaBrowserContentElement&&(this.mediaBrowserContentElement.scrollTop=0),this.scrollTopSaved=0,this.mediaListLastUpdatedOn=Ds.getStorageValue(this.cacheKeyBase+this.mediaType+Ns,0),this.isCardInEditPreview&&0!=this.mediaListLastUpdatedOn?(this.isUpdateInProgress=!1,!1):(this.alertClear(),Vs.enabled&&Vs("%cupdateMediaList - updating %s medialist","color: yellow;",JSON.stringify(this.mediaType)),!0)):(this.isUpdateInProgress=!1,this.alertErrorSet(this.uiText("search.playerMissing","Player nicht konfiguriert","Reprodutor não configurado","Player not configured")),!1))}updatedMediaListOk(e=!0){if(this.alertError==Ws&&this.alertErrorClear(),this.mediaList&&0==this.mediaList.length&&(this.alertInfo=this.uiText("search.noItems","Keine Einträge gefunden","Nenhum item encontrado","No items found")),e&&this.storageValuesSave(),this.isCardInEditPreview){const e=function(e,t){let i;if((e?.length||0)>t){i="Limited to "+t+" items while editing card configuration.";for(let i=0,s=e?.length||0;i<=s;i++)i>t&&e?.pop()}return i}(this.mediaList,this.EDITOR_LIMIT_TOTAL_MAX),t=e?this.uiText("search.previewLimit",`In der Kartenvorschau werden maximal ${this.EDITOR_LIMIT_TOTAL_MAX} Einträge angezeigt.`,`A prévia do cartão mostra no máximo ${this.EDITOR_LIMIT_TOTAL_MAX} itens.`,`The card preview shows a maximum of ${this.EDITOR_LIMIT_TOTAL_MAX} items.`):void 0;this.mediaType in Ls.hasCardEditLoadedMediaList||(this.alertInfo=t),Ls.hasCardEditLoadedMediaList[this.mediaType]=!0}}updatedMediaListError(e=null){this.alertInfoClear(),Vs.enabled&&Vs("%cupdatedMediaListError - error updating %s mediaList:\n %s","color:red",JSON.stringify(this.mediaType),JSON.stringify(e)),this.alertErrorSet(e||this.uiText("search.unknownError","Unbekannter Fehler","Erro desconhecido","Unknown error"))}}Ce([De({attribute:!1})],qs.prototype,"hass",void 0),Ce([Ve()],qs.prototype,"isActionsEnabled",void 0),Ce([Ve()],qs.prototype,"isActionsVisible",void 0),Ce([Ve()],qs.prototype,"isMediaListRefreshedOnSectionEntry",void 0),Ce([Ve()],qs.prototype,"scrollTopSaved",void 0),Ce([Ve()],qs.prototype,"mediaItem",void 0),Ce([Ve()],qs.prototype,"filterCriteria",void 0),Ce([Ve()],qs.prototype,"isFilterCriteriaReadOnly",void 0),Ce([Ve()],qs.prototype,"isFilterCriteriaVisible",void 0),Ce([Ve()],qs.prototype,"favBrowserItemsPerRow",void 0),Ce([ze("#mediaBrowserContentElement",!0)],qs.prototype,"mediaBrowserContentElement",void 0),Ce([ze("#filterCriteria",!0)],qs.prototype,"filterCriteriaElement",void 0);let Gs=class extends qs{constructor(){super(Yt.ALBUM_FAVORITES)}render(){const e=Je("auto",this.store.hass?.locale?.language||this.store.hass?.language);let t;if(this.filterCriteriaPlaceholder={de:"Nach Albumname filtern",pt:"Filtrar por nome do álbum",en:"Filter by album name"}[e],super.render(),!this.isActionsVisible){const e=(this.filterCriteria||"").toLocaleLowerCase();t=this.mediaList?.filter(t=>-1!==t.name.toLocaleLowerCase().indexOf(e)||-1!==t.artists[0].name.toLocaleLowerCase().indexOf(e)),this.filterItemCount=t?.length}const i=bi(this.config.albumFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,t),s=bi(this.config.albumFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,t);return this.shuffleOnPlay=this.config.albumFavBrowserShuffleOnPlay||!1,this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.albumFavBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${i?B`<div class="media-browser-section-title">${i}</div>`:B``}
        ${s?B`<div class="media-browser-section-subtitle">${s}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content>
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-album-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-album-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list
                        class="media-browser-list"
                        .items=${t}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons
                        class="media-browser-list"
                        .items=${t}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.albumFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.albumFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.albumFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetAlbumFavorites(e,0,0,null,s,r).then(e=>{this.mediaList=function(e){const t=new Array;if(e)for(const i of e.items||[])t.push(i.album);return t}(e),this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Album Favorites failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Album favorites refresh failed: "+ui(e)),!0}}};Gs=Ce([He("crm-album-fav-browser")],Gs);const js=_e(ce+":artist-actions");var Js;!function(e){e.ArtistAlbumsUpdate="ArtistAlbumsUpdate",e.ArtistCopyPresetToClipboard="ArtistCopyPresetToClipboard",e.ArtistCopyPresetJsonToClipboard="ArtistCopyPresetJsonToClipboard",e.ArtistCopyUriToClipboard="ArtistCopyUriToClipboard",e.ArtistGetInfo="ArtistGetInfo",e.ArtistFavoriteAdd="ArtistFavoriteAdd",e.ArtistFavoriteRemove="ArtistFavoriteRemove",e.ArtistFavoriteUpdate="ArtistFavoriteUpdate",e.ArtistPlayTrackFavorites="ArtistPlayTrackFavorites",e.ArtistSearchPlaylists="ArtistSearchPlaylists",e.ArtistSearchRadio="ArtistSearchRadio",e.ArtistSearchTracks="ArtistSearchTracks",e.ArtistShowAlbums="ArtistShowAlbums",e.ArtistShowAlbumsAppearsOn="ArtistShowAlbumsAppearsOn",e.ArtistShowAlbumsCompilation="ArtistShowAlbumsCompilation",e.ArtistShowAlbumsSingle="ArtistShowAlbumsSingle",e.ArtistShowRelatedArtists="ArtistShowRelatedArtists",e.ArtistShowTopTracks="ArtistShowTopTracks",e.ArtistUserPresetAdd="ArtistUserPresetAdd"}(Js||(Js={}));class Ys extends is{constructor(){super(Yt.ARTIST_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Artist &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Js.ArtistFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Artist &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Js.ArtistFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${$i}
          .label="View Artist &quot;${this.mediaItem.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Artist Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Artist
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistSearchPlaylists)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Search Playlists for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistSearchTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Search Tracks for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Artist Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistShowTopTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Artist Top Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistShowAlbums)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistShowAlbumsCompilation)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Compilations
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistShowAlbumsSingle)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Singles
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistShowAlbumsAppearsOn)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums AppearsOn
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistShowRelatedArtists)} hide=${this.hideSearchType(wi.ARTISTS)}>
          <ha-svg-icon slot="icon" .path=${$i}></ha-svg-icon>
          Show Related Artists
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Artist to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Js.ArtistCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Artist URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B` 
      <div class="artist-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${i}
              ${this.mediaItem.name}
              ${this.isArtistFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${s}
              </span>
            </div>
            <div class="grid artist-info-grid">
              ${this.mediaItem.followers?B`
                <div class="grid-action-info-hdr-s"># Followers</div>
                <div class="grid-action-info-text-s">${this.mediaItem.followers.total||0}</div>
              `:B`<div></div><div></div>`}

              <div class="grid-action-info-text-s"></div>
              ${this.mediaItem.genres.length>0?B`
                <div class="grid-action-info-hdr-s">Genres</div>
                <div class="grid-action-info-text-s">${function(e,t=null){null==t&&(t="; ");let i="";if(e)for(const s of e.genres||[])null!=s&&s.length>0&&(i.length>0&&(i+=t),i+=s);return i}(this.mediaItem)}</div>
              `:B`<div></div><div></div>`}

              <div class="grid-action-info-text-s"></div>
              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.mediaItem.uri}</div>
            </div>
          </div>
        </div>
        <div class="grid-container-scrollable">
          ${this.artistInfo?.about_url_facebook?B`
            <div class="display-inline">
              <ha-icon-button
                .path=${"M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"}
                .label="View Artist &quot;${this.mediaItem.name}&quot; info on Facebook"
                @click=${()=>yi(this.artistInfo?.about_url_facebook||"")}
                slot="icon-button-small"
              ></ha-icon-button>
            </div>
          `:""}
          ${this.artistInfo?.about_url_instagram?B`
            <div class="display-inline">
              <ha-icon-button
                .path=${"M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"}
                .label="View Artist &quot;${this.mediaItem.name}&quot; info on Instagram"
                @click=${()=>yi(this.artistInfo?.about_url_instagram||"")}
                slot="icon-button-small"
              ></ha-icon-button>
            </div>
          `:""}
          ${this.artistInfo?.about_url_twitter?B`
            <div class="display-inline">
              <ha-icon-button
                .path=${"M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"}
                .label="View Artist &quot;${this.mediaItem.name}&quot; info on Twitter"
                @click=${()=>yi(this.artistInfo?.about_url_twitter||"")}
                slot="icon-button-small"
              ></ha-icon-button>
            </div>
          `:""}
          ${this.artistInfo?.about_url_wikipedia?B`
            <div class="display-inline">
              <ha-icon-button
                .path=${"M14.97,18.95L12.41,12.92C11.39,14.91 10.27,17 9.31,18.95C9.3,18.96 8.84,18.95 8.84,18.95C7.37,15.5 5.85,12.1 4.37,8.68C4.03,7.84 2.83,6.5 2,6.5C2,6.4 2,6.18 2,6.05H7.06V6.5C6.46,6.5 5.44,6.9 5.7,7.55C6.42,9.09 8.94,15.06 9.63,16.58C10.1,15.64 11.43,13.16 12,12.11C11.55,11.23 10.13,7.93 9.71,7.11C9.39,6.57 8.58,6.5 7.96,6.5C7.96,6.35 7.97,6.25 7.96,6.06L12.42,6.07V6.47C11.81,6.5 11.24,6.71 11.5,7.29C12.1,8.53 12.45,9.42 13,10.57C13.17,10.23 14.07,8.38 14.5,7.41C14.76,6.76 14.37,6.5 13.29,6.5C13.3,6.38 13.3,6.17 13.3,6.07C14.69,6.06 16.78,6.06 17.15,6.05V6.47C16.44,6.5 15.71,6.88 15.33,7.46L13.5,11.3C13.68,11.81 15.46,15.76 15.65,16.2L19.5,7.37C19.2,6.65 18.34,6.5 18,6.5C18,6.37 18,6.2 18,6.05L22,6.08V6.1L22,6.5C21.12,6.5 20.57,7 20.25,7.75C19.45,9.54 17,15.24 15.4,18.95C15.4,18.95 14.97,18.95 14.97,18.95Z"}
                .label="View Artist &quot;${this.mediaItem.name}&quot; info on Wikipedia"
                @click=${()=>yi(this.artistInfo?.about_url_wikipedia||"")}
                slot="icon-button-small"
              ></ha-icon-button>
            </div>
          `:""}
          <div class="media-info-text-s" .innerHTML="${ei(this.artistInfo?.bio_html||"Artist biography was not found")}"></div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .artist-info-grid {
        grid-template-columns: auto auto auto;
        justify-content: left;
      }

      .artist-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      /* style albums container and grid */
      .albums-grid {
        grid-template-columns: 40px 30px auto auto auto;
      }

      /* style ha-icon-button controls in tracks grid: icon size, title text */
      .albums-grid > ha-icon-button[slot="icon-button"] {
        --ha-icon-button-size: 24px;
        --ha-icon-size: 20px;
        vertical-align: top;
        padding: 0px;
      }
    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{if(e==Js.ArtistCopyPresetToClipboard)return Zt(Cs(this.mediaItem)),this.alertInfoSet(Ae),!0;if(e==Js.ArtistCopyPresetJsonToClipboard)return Zt(xs(this.mediaItem)),this.alertInfoSet(we),!0;if(e==Js.ArtistCopyUriToClipboard)return Zt(this.mediaItem.uri),!0;if(e==Js.ArtistSearchPlaylists)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.name)),!0;if(e==Js.ArtistSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.name+" Radio")),!0;if(e==Js.ArtistShowAlbums)return this.dispatchEvent(os(wi.ARTIST_ALBUMS,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0;if(e==Js.ArtistShowAlbumsAppearsOn)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_APPEARSON,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0;if(e==Js.ArtistShowAlbumsCompilation)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_COMPILATION,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0;if(e==Js.ArtistShowAlbumsSingle)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_SINGLE,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0;if(e==Js.ArtistShowRelatedArtists)return this.dispatchEvent(os(wi.ARTIST_RELATED_ARTISTS,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0;if(e==Js.ArtistShowTopTracks)return this.dispatchEvent(os(wi.ARTIST_TOP_TRACKS,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0;if(e==Js.ArtistSearchTracks)return this.dispatchEvent(os(wi.TRACKS,this.mediaItem.name)),!0;if(this.progressShow(),e==Js.ArtistFavoriteAdd)await this.spotifyPlusService.FollowArtists(this.player,this.mediaItem.id),this.updateActions(this.player,[Js.ArtistFavoriteUpdate]);else if(e==Js.ArtistFavoriteRemove)await this.spotifyPlusService.UnfollowArtists(this.player,this.mediaItem.id),this.updateActions(this.player,[Js.ArtistFavoriteUpdate]);else if(e==Js.ArtistPlayTrackFavorites){const e=this.store.config.artistFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,this.mediaItem.uri,null),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else e==Js.ArtistUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide()):this.progressHide();return!0}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(Js.ArtistGetInfo)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.GetArtistInfo(e,this.mediaItem.id).then(e=>{this.artistInfo=e,t(!0)}).catch(e=>{js.enabled&&js("updateActions - Get Artist Info failed: "+ui(e)),this.artistInfo=void 0,i(!0)})});i.push(t)}if(-1!=t.indexOf(Js.ArtistFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckArtistsFollowing(e,this.mediaItem.id).then(e=>{this.isArtistFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isArtistFavorite=void 0,this.alertErrorSet("Check Artist Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Artist actions refresh failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],Ys.prototype,"mediaItem",void 0),Ce([Ve()],Ys.prototype,"artistInfo",void 0),Ce([Ve()],Ys.prototype,"isArtistFavorite",void 0),customElements.define("crm-artist-actions",Ys);let Ks=class extends qs{constructor(){super(Yt.ARTIST_FAVORITES),this.filterCriteriaPlaceholder=this.uiText("search.filter.artist","Nach Künstlernamen filtern","Filtrar por nome do artista","Filter by artist name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.artistFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.artistFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.shuffleOnPlay=this.config.artistFavBrowserShuffleOnPlay||!1,this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.artistFavBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-artist-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-artist-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.artistFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.artistFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.artistFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistsFollowed(e,0,0,s,r).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Artist Followed failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Artist followed refresh failed: "+ui(e)),!0}}};function Zs(e){let t="";return e&&(t=e.fully_played?"completed":0==(e.resume_position_ms||0)?"starts at beginning":"resumes at "+si(e.resume_position_ms||0)),t}var Qs;Ks=Ce([He("crm-artist-fav-browser")],Ks),function(e){e.AudiobookCopyPresetToClipboard="AudiobookCopyPresetToClipboard",e.AudiobookCopyPresetJsonToClipboard="AudiobookCopyPresetJsonToClipboard",e.AudiobookCopyUriToClipboard="AudiobookCopyUriToClipboard",e.AudiobookFavoriteAdd="AudiobookFavoriteAdd",e.AudiobookFavoriteRemove="AudiobookFavoriteRemove",e.AudiobookFavoriteUpdate="AudiobookFavoriteUpdate",e.AudiobookChaptersUpdate="AudiobookChaptersUpdate",e.AudiobookSearchAuthor="AudiobookSearchAuthor",e.AudiobookSearchNarrator="AudiobookSearchNarrator",e.AudiobookUserPresetAdd="AudiobookUserPresetAdd"}(Qs||(Qs={}));class Xs extends is{constructor(){super(Yt.AUDIOBOOK_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Mi}
          label="Add Audiobook &quot;${this.mediaItem.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Qs.AudiobookFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Audiobook &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Qs.AudiobookFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ei}
          .label="View Audiobook &quot;${this.mediaItem.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Audiobook Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Qs.AudiobookSearchAuthor)} hide=${this.hideSearchType(wi.AUDIOBOOKS)}>
          <ha-svg-icon slot="icon" .path=${ki}></ha-svg-icon>
          Other Audiobooks by same Author
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Qs.AudiobookSearchNarrator)} hide=${this.hideSearchType(wi.AUDIOBOOKS)}>
          <ha-svg-icon slot="icon" .path=${ki}></ha-svg-icon>
          Other Audiobooks by same Narrator
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Qs.AudiobookUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Audiobook to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Qs.AudiobookCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Audiobook Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Qs.AudiobookCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Audiobook Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Qs.AudiobookCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Audiobook URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B`
      <div class="audiobook-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${i}
              ${this.mediaItem.name}
              ${this.isAudiobookFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${s}
              </span>
            </div>
            <div class="grid audiobook-info-grid">

              <div class="grid-action-info-hdr-s">Authors</div>
              <div class="grid-action-info-text-s">${Si(this.mediaItem,", ")}</div>

              <div class="grid-action-info-hdr-s">Narrators</div>
              <div class="grid-action-info-text-s">${Ci(this.mediaItem,", ")}</div>

              <div class="grid-action-info-hdr-s">Publisher</div>
              <div class="grid-action-info-text-s">${this.mediaItem.publisher||"unknown"}</div>

              ${"copyrights"in this.mediaItem?B`
                <div class="grid-action-info-hdr-s">Copyright</div>
                <div class="grid-action-info-text-s">${As(this.mediaItem,"; ")}</div>
                `:""}

              <div class="grid-action-info-hdr-s">Edition</div>
              <div class="grid-action-info-text-s">${this.mediaItem.edition||"unknown"}</div>

              <div class="grid-action-info-hdr-s">Released</div>
              <div class="grid-action-info-text-s">${this.audiobookChapters?.items[0].release_date||"unknown"}</div>

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.mediaItem.uri}</div>

            </div>
          </div>
        </div>
        <div class="grid-container-scrollable">
          <div class="media-info-text-s" .innerHTML="${ei(this.mediaItem.html_description)}"></div>
          <div class="grid chapters-grid">
            <div class="grid-header">&nbsp;</div>
            <div class="grid-header">Title</div>
            <div class="grid-header">Status</div>
            <div class="grid-header grid-header-last">Duration</div>
            ${this.audiobookChapters?.items.map(e=>B`
              <ha-icon-button
                .path=${zi}
                .label="Add chapter &quot;${e.name}&quot; to Play Queue"
                @click=${()=>this.AddPlayerQueueItem(e)}
                slot="icon-button"
              >&nbsp;</ha-icon-button>
              <div class="grid-entry">${e.name}</div>
              <div class="grid-entry">${Zs(e.resume_point)}</div>
              <div class="grid-entry">${si(e.duration_ms||0)}</div>
            `)}
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .audiobook-info-grid {
        grid-template-columns: auto auto;
        justify-content: left;
      }

      .audiobook-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      /* style chapters container and grid */
      .chapters-grid {
        grid-template-columns: 40px auto auto auto;
        margin-top: 1.0rem;
      }

      /* style ha-icon-button controls in tracks grid: icon size, title text */
      .chapters-grid > ha-icon-button[slot="icon-button"] {
        --ha-icon-button-size: 24px;
        --ha-icon-size: 20px;
        vertical-align: top;
        padding: 0px;
      }

    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{return e==Qs.AudiobookCopyPresetToClipboard?(Zt(Cs(this.mediaItem,Si(this.mediaItem,", "))),this.alertInfoSet(Ae),!0):e==Qs.AudiobookCopyPresetJsonToClipboard?(Zt(xs(this.mediaItem,Si(this.mediaItem,", "))),this.alertInfoSet(we),!0):e==Qs.AudiobookCopyUriToClipboard?(Zt(this.mediaItem.uri||""),!0):e==Qs.AudiobookSearchAuthor?(this.dispatchEvent(os(wi.AUDIOBOOKS,Si(this.mediaItem," "))),!0):e==Qs.AudiobookSearchNarrator?(this.dispatchEvent(os(wi.AUDIOBOOKS,Ci(this.mediaItem," "))),!0):(this.progressShow(),e==Qs.AudiobookUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide()):e==Qs.AudiobookFavoriteAdd?(await this.spotifyPlusService.SaveAudiobookFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[Qs.AudiobookFavoriteUpdate])):e==Qs.AudiobookFavoriteRemove?(await this.spotifyPlusService.RemoveAudiobookFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[Qs.AudiobookFavoriteUpdate])):this.progressHide(),!0)}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(Qs.AudiobookChaptersUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.GetAudiobookChapters(e,this.mediaItem.id,0,0,null,200).then(e=>{this.audiobookChapters=e,t(!0)}).catch(e=>{this.audiobookChapters=void 0,this.alertErrorSet("Get Audiobook Chapters failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Qs.AudiobookFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckAudiobookFavorites(e,this.mediaItem.id).then(e=>{this.isAudiobookFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isAudiobookFavorite=void 0,this.alertErrorSet("Check Audiobook Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Audiobook actions refresh failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],Xs.prototype,"mediaItem",void 0),Ce([Ve()],Xs.prototype,"audiobookChapters",void 0),Ce([Ve()],Xs.prototype,"isAudiobookFavorite",void 0),customElements.define("crm-audiobook-actions",Xs);let er=class extends qs{constructor(){super(Yt.AUDIOBOOK_FAVORITES),this.filterCriteriaPlaceholder=this.uiText("search.filter.audiobook","Nach Hörbuchnamen filtern","Filtrar por nome do audiolivro","Filter by audiobook name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(t)||-1!==e.authors[0].name.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.audiobookFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.audiobookFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.audiobookFavBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-audiobook-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-audiobook-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.audiobookFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.audiobookFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.audiobookFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetAudiobookFavorites(e,0,0,s,r).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Audiobook Favorites failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Audiobook favorites refresh failed: "+ui(e)),!0}}};var tr;er=Ce([He("crm-audiobook-fav-browser")],er),function(e){e.PlaylistCopyPresetToClipboard="PlaylistCopyPresetToClipboard",e.PlaylistCopyPresetJsonToClipboard="PlaylistCopyPresetJsonToClipboard",e.PlaylistCopyUriToClipboard="PlaylistCopyUriToClipboard",e.PlaylistDelete="PlaylistDelete",e.PlaylistFavoriteAdd="PlaylistFavoriteAdd",e.PlaylistFavoriteRemove="PlaylistFavoriteRemove",e.PlaylistFavoriteUpdate="PlaylistFavoriteUpdate",e.PlaylistItemsAddNowPlaying="PlaylistItemsAddNowPlaying",e.PlaylistItemsRemoveNowPlaying="PlaylistItemsRemoveNowPlaying",e.PlaylistItemsUpdate="PlaylistItemsUpdate",e.PlaylistRecoverWebUI="PlaylistRecoverWebUI",e.PlaylistUserPresetAdd="PlaylistUserPresetAdd"}(tr||(tr={}));class ir extends is{constructor(){super(Yt.PLAYLIST_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Playlist &quot;${this.mediaItem.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(tr.PlaylistFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Playlist &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(tr.PlaylistFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${zi}
          .label="View Playlist &quot;${this.mediaItem.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Playlist Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistRecoverWebUI)}>
          <ha-svg-icon slot="icon" .path=${"M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z"}></ha-svg-icon>
          Recover Playlist via Spotify Web UI
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistItemsAddNowPlaying)}>
          <ha-svg-icon slot="icon" .path=${"M3 16H10V14H3M18 14V10H16V14H12V16H16V20H18V16H22V14M14 6H3V8H14M14 10H3V12H14V10Z"}></ha-svg-icon>
          Add Now Playing Item to Playlist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistItemsRemoveNowPlaying)}>
          <ha-svg-icon slot="icon" .path=${"M3 16H10V14H3M12 14V16H22V14M14 6H3V8H14M14 10H3V12H14V10Z"}></ha-svg-icon>
          Remove Now Playing Item from Playlist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistDelete)}>
          <ha-svg-icon slot="icon" .path=${"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"}></ha-svg-icon>
          Delete (unfollow) Playlist
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Playlist to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Playlist Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Playlist Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(tr.PlaylistCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Playlist URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B` 
      <div class="playlist-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">

            <div class="media-info-text-ms-c">
              ${i}
              ${this.mediaItem.name}
              ${this.isPlaylistFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${s}
              </span>
            </div>
            <div class="grid playlist-info-grid">

              <div class="grid-action-info-hdr-s"># Tracks</div>
              <div class="grid-action-info-text-s">${this.mediaItem.tracks.total}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Collaborative?</div>
              <div class="grid-action-info-text-s">${String(this.mediaItem.collaborative||!1)}</div>

              <div class="grid-action-info-hdr-s"># Followers</div>
              <div class="grid-action-info-text-s">${this.mediaItem.owner.followers.total||0}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Public?</div>
              <div class="grid-action-info-text-s">${String(this.mediaItem.public||!1)}</div>

              <div class="grid-action-info-hdr-s">Snapshot ID</div>
              <div class="grid-action-info-text-s colspan-r3-c2">${this.mediaItem.snapshotId}</div>

              <div class="grid-action-info-hdr-s">Owned By</div>
              ${this.mediaItem.owner?B`
                <div class="grid-action-info-text-s colspan-r4-c2"><a href="${this.mediaItem.owner.external_urls.spotify}" target="_blank">${this.mediaItem.owner.display_name}</a></div>
              `:B`<div class="colspan-r4-c2">unknown</div>`}

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s colspan-r5-c2 copy2cb" @click=${pi}>${this.mediaItem.uri}</div>

            </div>
          </div>
        </div>
        <div class="grid-container-scrollable">
          <div class="media-info-text-s" .innerHTML="${ei(this.mediaItem.description)}"></div>
          <div class="grid tracks-grid">
            <div class="grid-header">&nbsp;</div>
            <div class="grid-header">#</div>
            <div class="grid-header">Title</div>
            <div class="grid-header">Artist</div>
            <div class="grid-header">Album</div>
            <div class="grid-header grid-header-last">Duration</div>
            ${this.playlistTracks?.map((e,t)=>B`
              <ha-icon-button
                .path=${zi}
                .label="Add track &quot;${e.track.name}&quot; to Play Queue"
                @click=${()=>this.AddPlayerQueueItem(e.track)}
                slot="icon-button"
              >&nbsp;</ha-icon-button>
              <div class="grid-entry">${t+1}</div>
              <div class="grid-entry">${e.track.name||""}</div>
              <div class="grid-entry">${e.track?.artists[0].name||""}</div>
              <div class="grid-entry">${e.track?.album.name||""}</div>
              <div class="grid-entry">${si(e.track.duration_ms||0)}</div>
            `)}
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .playlist-info-grid {
        grid-template-columns: 80px auto 10px auto auto;
        justify-content: left;
        margin: 0.5rem;
        max-width: 21rem;
      }

      .playlist-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      .colspan-r3-c2 {
        grid-row: 3 / 3;    /* grid row 3 */
        grid-column: 2 / 6; /* grid columns 2 thru 5 */
      }

      .colspan-r4-c2 {
        grid-row: 4 / 4;    /* grid row 4 */
        grid-column: 2 / 6; /* grid columns 2 thru 5 */
      }

      .colspan-r5-c2 {
        grid-row: 5 / 5;    /* grid row 5 */
        grid-column: 2 / 6; /* grid columns 2 thru 5 */
      }

      /* style tracks container and grid */
      .tracks-grid {
        grid-template-columns: 30px 45px auto auto auto 60px;
        margin-top: 1.0rem;
      }

      /* style ha-icon-button controls in tracks grid: icon size, title text */
      .tracks-grid > ha-icon-button[slot="icon-button"] {
        --ha-icon-button-size: 24px;
        --ha-icon-size: 20px;
        vertical-align: top;
        padding: 0px;
      }

    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{return e==tr.PlaylistCopyUriToClipboard?(Zt(this.mediaItem.uri),!0):e==tr.PlaylistRecoverWebUI?(yi("https://www.spotify.com/us/account/recover-playlists/"),!0):e==tr.PlaylistCopyPresetToClipboard?(Zt(Cs(this.mediaItem)),this.alertInfoSet(Ae),!0):e==tr.PlaylistCopyPresetJsonToClipboard?(Zt(xs(this.mediaItem)),this.alertInfoSet(we),!0):(this.progressShow(),e==tr.PlaylistUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide()):e==tr.PlaylistDelete?(await this.spotifyPlusService.UnfollowPlaylist(this.player,this.mediaItem.id),this.updateActions(this.player,[tr.PlaylistFavoriteUpdate])):e==tr.PlaylistFavoriteAdd?(await this.spotifyPlusService.FollowPlaylist(this.player,this.mediaItem.id),this.updateActions(this.player,[tr.PlaylistFavoriteUpdate])):e==tr.PlaylistFavoriteRemove?(await this.spotifyPlusService.UnfollowPlaylist(this.player,this.mediaItem.id),this.updateActions(this.player,[tr.PlaylistFavoriteUpdate])):e==tr.PlaylistItemsAddNowPlaying?(await this.spotifyPlusService.PlaylistItemsAdd(this.player,this.mediaItem.id,null,null),this.updateActions(this.player,[tr.PlaylistItemsUpdate])):e==tr.PlaylistItemsRemoveNowPlaying?(await this.spotifyPlusService.PlaylistItemsRemove(this.player,this.mediaItem.id,null,null),this.updateActions(this.player,[tr.PlaylistItemsUpdate])):this.progressHide(),!0)}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(tr.PlaylistItemsUpdate)||0==t.length){const t=new Promise((t,i)=>{const s=this.mediaItem.tracks.total;this.spotifyPlusService.GetPlaylistItems(e,this.mediaItem.id,0,0,null,null,null,s).then(e=>{this.playlistTracks=function(e){const t=new Array;return e&&e.items.forEach(e=>{null!=e.track.name&&t.push(e)}),t}(e),t(!0)}).catch(e=>{this.playlistTracks=void 0,this.alertErrorSet("Get Playlist Items failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(tr.PlaylistFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckPlaylistFollowers(e,this.mediaItem.id).then(e=>{this.isPlaylistFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isPlaylistFavorite=void 0,this.alertErrorSet("Check Playlist Followers failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Playlist actions refresh failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],ir.prototype,"mediaItem",void 0),Ce([Ve()],ir.prototype,"playlistTracks",void 0),Ce([Ve()],ir.prototype,"isPlaylistFavorite",void 0),customElements.define("crm-playlist-actions",ir);const sr=_e(ce+":category-browser");let rr=class extends qs{constructor(){super(Yt.CATEGORYS),this.filterCriteriaPlaceholder=this.uiText("search.filter.category","Nach Kategorienamen filtern","Filtrar por nome da categoria","Filter by category name")}render(){let e,t;if(super.render(),!this.isActionsVisible){const i=(this.filterCriteria||"").toLocaleLowerCase();this.isCategoryVisible?(e=this.categoryPlaylists?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(i)),this.filterItemCount=e?.length):(t=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(i)),this.filterItemCount=t?.length)}let i="",s="";return this.isCategoryVisible?(i=bi(this.config.categoryBrowserTitle,this.config,this.player,this.categoryPlaylistsLastUpdatedOn,this.categoryPlaylists,e),s=bi(this.config.categoryBrowserSubTitle,this.config,this.player,this.categoryPlaylistsLastUpdatedOn,this.categoryPlaylists,e)):(i=bi(this.config.categoryBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,t),s=bi(this.config.categoryBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,t)),this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.categoryBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${i?B`<div class="media-browser-section-title">${i}</div>`:B``}
        ${s?B`<div class="media-browser-section-subtitle">${s}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible||this.isCategoryVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-playlist-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-playlist-actions>`:this.isCategoryVisible?1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${t}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${t}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}displayCategory(e){sr.enabled&&sr("displayCategory - displaying Spotify category:\n%s",JSON.stringify(e,null,2)),this.categoryId=ys(e.uri)||"",this.isCategoryVisible=!0,this.categoryListFilter=e.title||"",this.categoryListScrollTopSaved=this.scrollTopSaved,this.filterCriteria=e.filterCriteria,this.categoryPlaylists=void 0,this.requestUpdate(),this.updateMediaList(this.player)}onFilterActionsClick(e){"hideactions"===e.currentTarget.getAttribute("action")?this.isActionsVisible?super.onFilterActionsClick(e):this.isCategoryVisible&&(this.categoryId="",this.isCategoryVisible=!1,this.filterCriteria=this.categoryListFilter,this.scrollTopSaved=this.categoryListScrollTopSaved,setTimeout(()=>{this.requestUpdate()},50)):super.onFilterActionsClick(e)}onItemSelected(e){sr.enabled&&sr("onItemSelected - media item selected:\n%s",JSON.stringify(e.detail,null,2));if("category"==e.detail.type){const t=e.detail;this.scrollTopSaved=this.mediaBrowserContentElement.scrollTop,this.categoryId=t.id,this.isCategoryVisible=!0,this.categoryListFilter=this.filterCriteria,this.categoryListScrollTopSaved=this.scrollTopSaved,this.filterCriteria="",this.categoryPlaylists=void 0,this.requestUpdate(),this.updateMediaList(this.player)}else super.onItemSelected(e)}onItemSelectedWithHold(e){sr.enabled&&sr("onItemSelectedWithHold - media item selected:\n%s",JSON.stringify(e.detail,null,2));"category"==e.detail.type?this.onItemSelected(e):super.onItemSelectedWithHold(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array;if(this.isCategoryVisible){const i=new Promise((t,i)=>{const s=this.config.searchMediaBrowserSearchLimit||50,r=this.config.searchMediaBrowserItemsSortTitle||!1;this.spotifyPlusService.GetCategoryPlaylists(e,this.categoryId,0,0,null,s,r).then(e=>{this.categoryPlaylists=e.items,this.categoryPlaylistsLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.categoryPlaylists=void 0,this.categoryPlaylistsLastUpdatedOn=0,super.updatedMediaListError("Get Category Playlist failed: "+ui(e)),i(e)})});t.push(i)}else{const i=new Promise((t,i)=>{this.spotifyPlusService.GetBrowseCategorysList(e,null,null,!0).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Category List failed: "+ui(e)),i(e)})});t.push(i)}return this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Category List refresh failed: "+ui(e)),!0}}};var or;Ce([Ve()],rr.prototype,"isCategoryVisible",void 0),Ce([Ve()],rr.prototype,"categoryId",void 0),rr=Ce([He("crm-category-browser")],rr),function(e){e.DeviceDisconnect="DeviceDisconnect",e.DeviceConnect="DeviceConnect",e.DeviceGetInfo="DeviceGetInfo"}(or||(or={}));class ar extends is{constructor(){super(Yt.DEVICES)}render(){super.render(),this.deviceInfo||(this.deviceInfo=this.mediaItem);const e=this.deviceInfo?.IsInDeviceList?"device-list-in":"device-list-out",t=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Device Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(or.DeviceConnect)}>
          <ha-svg-icon slot="icon" .path=${"M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,20H10V18H5V13H3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M14,15H20V19H14V15Z"}></ha-svg-icon>
          Connect / Login to this device
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(or.DeviceDisconnect)}>
          <ha-svg-icon slot="icon" .path=${"M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z"}></ha-svg-icon>
          Disconnect / Logout from this device
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B` 
      <div class="device-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img" style=${this.styleMediaBrowserItemImage(this.mediaItem.mbi_item.image_url)}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${this.deviceInfo?.Name}
              <span class="actions-dropdown-menu padL">
                ${t}
              </span>
            </div>
            <div class="media-info-text-ms">${this.deviceInfo?.DeviceInfo.BrandDisplayName}</div>
            <div class="media-info-text-s">${this.deviceInfo?.DeviceInfo.ModelDisplayName}</div>
            ${this.deviceInfo?.IsSonos?B`
              <div class="media-info-text-s padT">
                Sonos device (will not appear in Spotify Web API device list)
              </div>
            `:""}
            ${this.deviceInfo?.IsChromeCast?B`
              <div class="media-info-text-s padT">
                Chromecast device
              </div>
            `:""}
          </div>
        </div>
        <div class="grid-container-scrollable">
          <div class="grid device-grid">
            
            <div class="grid-action-info-hdr-s">Device ID</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DeviceInfo.DeviceId}</div>
                    
            <div class="grid-action-info-hdr-s">Device Name</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DiscoveryResult.DeviceName}</div>
            
            <div class="grid-action-info-hdr-s">Device Type</div>
            <div class="grid-action-info-text-s">${this.deviceInfo?.DeviceInfo.DeviceType}</div>
                    
            <div class="grid-action-info-hdr-s">Group Status</div>
            <div class="grid-action-info-text-s">${this.deviceInfo?.DeviceInfo.GroupStatus}</div>
                    
            <div class="grid-action-info-hdr-s">Product ID</div>
            <div class="grid-action-info-text-s">${this.deviceInfo?.DeviceInfo.ProductId}</div>
                    
            <div class="grid-action-info-hdr-s">Voice Support?</div>
            <div class="grid-action-info-text-s">${this.deviceInfo?.DeviceInfo.VoiceSupport}</div>

            <div class="grid-action-info-hdr-s">IP DNS Alias</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DiscoveryResult.Server}</div>
            
            <div class="grid-action-info-hdr-s">IP Address</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DiscoveryResult.HostIpAddress}</div>
            
            <div class="grid-action-info-hdr-s">Zeroconf IP Port</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DiscoveryResult.HostIpPort}</div>
            
            <div class="grid-action-info-hdr-s">Zeroconf CPath</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DiscoveryResult.SpotifyConnectCPath}</div>

            <div class="grid-action-info-hdr-s">Is Dynamic Device?</div>
            <div class="grid-action-info-text-s">${this.deviceInfo?.DiscoveryResult.IsDynamicDevice}</div>

            <div class="grid-action-info-hdr-s">Is in Device List?</div>
            <div class="grid-action-info-text-s ${e}">${this.deviceInfo?.IsInDeviceList}</div>

            <div class="grid-action-info-hdr-s">Auth Token Type</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DeviceInfo.TokenType}</div>
                    
            <div class="grid-action-info-hdr-s">Client ID</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DeviceInfo.ClientId}</div>

            <div class="grid-action-info-hdr-s">Library Version</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DeviceInfo.LibraryVersion}</div>

            <div class="grid-action-info-hdr-s">Active User</div>
            <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.deviceInfo?.DeviceInfo.ActiveUser}</div>

          </div>
        </div>    
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .device-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      .device-grid {
        grid-template-columns: auto auto;
        justify-content: left;
      }

      .device-list-in {
        color: limegreen;
        font-weight: bold;
      }

      .device-list-out {
        color: red;
        font-weight: bold;
      }

      /* reduce image size for device */
      .media-info-content .img {
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        mask-repeat: no-repeat !important;
        mask-position: center !important;
        max-width: 100px;
        min-height: 100px;
        border-radius: var(--control-button-border-radius, 10px) !important;
      }

      .padT {
        padding-top: 0.2rem;
      }

      .padL {
        padding-left: 0.2rem;
      }

      /* style ha-alert controls */
      ha-alert {
        display: block;
        margin-bottom: 0.25rem;
      }

    `]}styleMediaBrowserItemImage(e){const t={};return e?.includes("svg+xml")?(t["mask-image"]=`url(${e})`,t["background-color"]=`var(--crm-media-browser-items-svgicon-color, ${o(be)})`):(t["background-image"]=`url(${e})`,t["background-color"]="var(--crm-media-browser-items-svgicon-color, transparent)"),Me(t)}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{return this.progressShow(),e==or.DeviceConnect?this.deviceInfo?.DiscoveryResult.IsDynamicDevice?(this.alertInfoSet("Dynamic devices cannot be managed."),this.progressHide()):this.mediaItem.IsChromeCast?(this.alertInfoSet("Chromecast devices do not support Spotify Connect connect."),this.progressHide()):(this.alertInfoSet("Connecting to Spotify Connect device ..."),await this.spotifyPlusService.ZeroconfDeviceConnect(this.player,this.mediaItem,null,null,null,!0,!0,1),this.alertInfoSet("Spotify Connect device should be connected."),this.updateActions(this.player,[or.DeviceGetInfo])):e==or.DeviceDisconnect?this.mediaItem.DiscoveryResult.IsDynamicDevice?(this.alertInfoSet("Dynamic devices cannot be managed."),this.progressHide()):this.mediaItem.IsChromeCast?(this.alertInfoSet("Chromecast devices do not support Spotify Connect disconnect."),this.progressHide()):"librespot"==this.mediaItem.DeviceInfo.BrandDisplayName?(this.alertInfoSet("Librespot devices do not support Spotify Connect disconnect."),this.progressHide()):(this.alertInfoSet("Disconnecting from Spotify Connect device ..."),await this.spotifyPlusService.ZeroconfDeviceDisconnect(this.player,this.mediaItem,1),this.alertInfoSet("Spotify Connect device was disconnected."),this.updateActions(this.player,[or.DeviceGetInfo])):this.progressHide(),!0}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(or.DeviceGetInfo)){const t=new Promise((t,i)=>{this.alertInfo='Retrieving Spotify Connect status for "'+this.mediaItem.Name+'" ...';this.spotifyPlusService.GetSpotifyConnectDevice(e,this.mediaItem.Id,null,null,!0,!1).then(e=>{this.alertInfo?.startsWith("Retrieving ")&&this.alertInfoClear(),this.deviceInfo=e,e&&(this.mediaItem=e),t(!0)}).catch(e=>{this.deviceInfo=void 0,this.alertErrorSet("Get Spotify Connect Device failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Update device actions failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],ar.prototype,"mediaItem",void 0),Ce([Ve()],ar.prototype,"deviceInfo",void 0),customElements.define("crm-device-actions",ar);const nr=_e(ce+":device-browser"),lr={de:{defaultDevice:"Standard",setDefault:"Als Standard festlegen",defaultSaved:"Standardgerät gespeichert.",defaultError:"Standardgerät konnte nicht gespeichert werden.",noDevices:"Keine Spotify-Connect-Geräte gefunden. Bitte Liste aktualisieren.",filter:"Nach Gerätename filtern",settingsTitle:"Sichtbare Geräte auswählen",settingsHint:"Spotify Connect-Geräte können die Wiedergabe übernehmen. Andere Home Assistant-Mediaplayer öffnen ihre eigene Steuerung.",done:"Fertig",selectDevices:"Geräte auswählen",saveError:"Geräteeinstellungen konnten in diesem Browser nicht gespeichert werden.",transferring:"Wiedergabe wird auf Gerät übertragen",selectError:"Wiedergabegerät konnte nicht ausgewählt werden.",fetchError:"Spotify Connect-Geräte konnten nicht geladen werden:",refreshError:"Spotify Connect-Geräte konnten nicht aktualisiert werden:"},pt:{defaultDevice:"Padrão",setDefault:"Definir como padrão",defaultSaved:"Dispositivo padrão salvo.",defaultError:"Não foi possível salvar o dispositivo padrão.",noDevices:"Nenhum dispositivo Spotify Connect encontrado. Atualize a lista.",filter:"Filtrar por nome do dispositivo",settingsTitle:"Selecionar dispositivos visíveis",settingsHint:"Dispositivos Spotify Connect podem receber a reprodução. Outros reprodutores de mídia do Home Assistant abrem seus próprios controles.",done:"Concluído",selectDevices:"Selecionar dispositivos",saveError:"Não foi possível salvar as preferências dos dispositivos neste navegador.",transferring:"Transferindo a reprodução para o dispositivo",selectError:"Não foi possível selecionar o dispositivo.",fetchError:"Falha ao carregar dispositivos Spotify Connect:",refreshError:"Falha ao atualizar dispositivos Spotify Connect:"},en:{defaultDevice:"Default",setDefault:"Set as default",defaultSaved:"Default device saved.",defaultError:"Could not save the default device.",noDevices:"No Spotify Connect devices found. Refresh the list.",filter:"Filter by device name",settingsTitle:"Select visible devices",settingsHint:"Spotify Connect devices can take over playback. Other Home Assistant media players open their own controls.",done:"Done",selectDevices:"Select devices",saveError:"Could not save device preferences in this browser.",transferring:"Transferring playback to device",selectError:"Could not select source.",fetchError:"Get Spotify Connect Devices failed:",refreshError:"Spotify Connect Device refresh failed:"}};let cr=class extends qs{friendlyState(e){const t=Je(this.config?.language??"auto",this.store.hass?.locale?.language||this.store.hass?.language);return{idle:{de:"Bereit",pt:"Disponível",en:"Ready"},playing:{de:"Wiedergabe läuft",pt:"Reproduzindo",en:"Playing"},paused:{de:"Pausiert",pt:"Pausado",en:"Paused"},off:{de:"Ausgeschaltet",pt:"Desligado",en:"Off"},standby:{de:"Bereitschaft",pt:"Em espera",en:"Standby"},unavailable:{de:"Nicht verfügbar",pt:"Indisponível",en:"Unavailable"},unknown:{de:"Unbekannt",pt:"Desconhecido",en:"Unknown"},on:{de:"Eingeschaltet",pt:"Ligado",en:"On"}}[e]?.[t]||e}deviceText(e){const t=Je(this.config?.language??"auto",this.store.hass?.locale?.language||this.store.hass?.language);return lr[t][e]}get defaultDeviceValue(){const e=this.store.hass?.states?.["input_text.controlroom_default_spotify_device"]?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:this.savedDefaultValue||this.config.deviceDefaultId||""}deviceValue(e){return e.IsSonos||this.config.deviceControlByName?e.Name||e.Id||"":e.Id||e.Name||""}isDefaultDevice(e){const t=this.defaultDeviceValue;return!!t&&(t===e.Id||t===e.Name||t===this.deviceValue(e))}async saveDefaultDevice(e){const t=this.deviceValue(e);if(t&&!this.savingDefault){this.savingDefault=!0;try{await this.store.hass.callService("input_text","set_value",{entity_id:"input_text.controlroom_default_spotify_device",value:t}),this.savedDefaultValue=t,this.alertInfo=this.deviceText("defaultSaved")}catch(e){this.alertErrorSet(this.deviceText("defaultError")+" "+ui(e))}finally{this.savingDefault=!1}}}uniqueDevices(e){const t=new Map;for(const i of e){const e=(i.Name||i.Id||"").trim().toLocaleLowerCase();if(!e)continue;const s=`${"group"===i.DeviceInfo?.GroupStatus?.toLowerCase()?"group":"device"}:${e}`,r=t.get(s);(!r||this.isDefaultDevice(i)&&!this.isDefaultDevice(r)||!this.isDefaultDevice(r)&&!r.IsActiveDevice&&i.IsActiveDevice)&&t.set(s,i)}return[...t.values()]}renderSpotifyDevices(e){return e.length?B`<div class="crm-spotify-devices">
      ${e.map(e=>{const t=this.isDefaultDevice(e);return B`<div class="crm-spotify-device">
          <button class="crm-spotify-select" type="button" @click=${()=>{this.SelectSource(e)}}>
            <ha-svg-icon .path=${Gi}></ha-svg-icon>
            <span class="crm-spotify-device-name"><strong>${e.Name||e.Id}</strong>
              <small>Spotify Connect${e.IsActiveDevice?" · Aktiv":""}</small>
            </span>
          </button>
          ${t?B`<span class="crm-default-label"><ha-icon icon="mdi:star"></ha-icon>${this.deviceText("defaultDevice")}</span>`:B`<button type="button" class="crm-default-button" ?disabled=${this.savingDefault}
              @click=${()=>{this.saveDefaultDevice(e)}}>${this.deviceText("setDefault")}</button>`}
        </div>`})}
    </div>`:B`<div class="crm-empty-devices">${this.deviceText("noDevices")}</div>`}spotifyKey(e){return`spotify:${e.Id||e.Name}`}haKey(e){return`ha:${e}`}get visibilityStorageKey(){return`controlroom_devices_visibility_${this.player?.attributes?.sp_user_id||"default"}`}loadVisibility(){if(!this.preferencesLoaded){this.preferencesLoaded=!0;try{const e=localStorage.getItem(this.visibilityStorageKey);this.deviceVisibility=e?JSON.parse(e):{}}catch{this.deviceVisibility={}}}}isVisible(e,t){return this.deviceVisibility[e]??t}toggleVisibility(e,t){this.deviceVisibility={...this.deviceVisibility,[e]:t};try{localStorage.setItem(this.visibilityStorageKey,JSON.stringify(this.deviceVisibility))}catch{this.alertErrorSet(this.deviceText("saveError"))}}getHaPlayers(){const e=this.hass?.states||{};return Object.keys(e).filter(e=>e.startsWith("media_player.")).map(t=>({id:t,name:String(e[t]?.attributes?.friendly_name||t),state:String(e[t]?.state||"unknown")})).sort((e,t)=>e.name.localeCompare(t.name))}showHaMoreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}renderHaPlayers(e){return this.getHaPlayers().filter(e=>this.isVisible(this.haKey(e.id),!1)).filter(t=>t.name.toLocaleLowerCase().includes(e)).map(e=>B`
        <button class="crm-ha-device" @click=${()=>this.showHaMoreInfo(e.id)}>
          <ha-svg-icon .path=${e.id.includes("tv")?"M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z":e.id.includes("phone")||e.id.includes("iphone")||e.id.includes("handy")?"M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z":Gi}></ha-svg-icon>
          <span class="crm-ha-device-text">
            <strong>${e.name}</strong>
            <small>Home Assistant · ${this.friendlyState(e.state)}</small>
          </span>
        </button>
      `)}renderDeviceSettings(){return B`
      <div class="crm-device-settings">
        <div class="crm-settings-title">${this.deviceText("settingsTitle")}</div>
        <div class="crm-settings-hint">${this.deviceText("settingsHint")}</div>
        <div class="crm-settings-subtitle">Spotify Connect</div>
        ${(this.mediaList||[]).map(e=>B`
          <label class="crm-device-option">
            <input type="checkbox"
              .checked=${this.isVisible(this.spotifyKey(e),!0)}
              @change=${t=>this.toggleVisibility(this.spotifyKey(e),t.target.checked)}>
            <span><strong>${e.Name}</strong><small>Spotify Connect</small></span>
          </label>
        `)}
        <div class="crm-settings-subtitle">Home Assistant · media_player</div>
        ${this.getHaPlayers().map(e=>B`
          <label class="crm-device-option">
            <input type="checkbox"
              .checked=${this.isVisible(this.haKey(e.id),!1)}
              @change=${t=>this.toggleVisibility(this.haKey(e.id),t.target.checked)}>
            <span><strong>${e.name}</strong><small>${this.friendlyState(e.state)}</small></span>
          </label>
        `)}
        <button class="crm-settings-done" @click=${()=>this.showDeviceSettings=!1}>${this.deviceText("done")}</button>
      </div>
    `}static get styles(){return[...super.styles,a`
        .crm-spotify-devices { display:grid; gap:8px; padding:8px 2px; }
        .crm-spotify-device { display:flex; align-items:center; flex-wrap:wrap; gap:8px; padding:10px; border:1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius:12px; color:var(--crm-text, var(--primary-text-color)); }
        .crm-spotify-select { display:flex; align-items:center; flex:1; min-width:150px; gap:12px; padding:5px; border:0; background:transparent; color:inherit; text-align:left; cursor:pointer; }
        .crm-spotify-select ha-svg-icon { width:25px; height:25px; color:var(--crm-accent, #34d399); flex-shrink:0; }
        .crm-spotify-device-name { display:grid; gap:4px; min-width:0; }
        .crm-spotify-device-name strong { font-size:13px; overflow-wrap:anywhere; }
        .crm-spotify-device-name small { font-size:11px; opacity:.7; }
        .crm-default-button { border:1px solid var(--crm-accent, #34d399); border-radius:8px; padding:8px 10px; background:transparent; color:var(--crm-accent, #34d399); font-size:11px; cursor:pointer; }
        .crm-default-button:disabled { opacity:.5; cursor:wait; }
        .crm-default-label { display:flex; align-items:center; gap:4px; color:var(--crm-accent, #34d399); font-size:11px; font-weight:600; }
        .crm-default-label ha-icon { --mdc-icon-size:16px; }
        .crm-empty-devices { padding:16px; opacity:.75; font-size:12px; }
        .crm-settings-button { display:flex; align-items:center; justify-content:center; flex:0 0 38px; width:38px; height:38px; border:0; background:transparent; color:var(--crm-accent, var(--primary-color, #34d399)); cursor:pointer; }
        .crm-settings-button ha-svg-icon { width:23px; height:23px; }
        .crm-device-settings { padding: 12px; color:var(--crm-text, var(--primary-text-color, #f0fdf4)); max-width:100%; box-sizing:border-box; overflow:auto; }
        .crm-settings-title { font-weight:700; margin-bottom:6px; }
        .crm-settings-hint { font-size:12px; color:var(--crm-text-secondary, var(--secondary-text-color, var(--crm-text, #f0fdf4))); opacity:.75; margin-bottom:14px; }
        .crm-settings-subtitle { color:var(--crm-accent, var(--primary-color, #34d399)); font-weight:600; margin:14px 0 8px; }
        .crm-device-option { display:flex; align-items:center; gap:12px; padding:9px 4px; cursor:pointer; border-bottom:1px solid color-mix(in srgb, currentColor 18%, transparent); min-width:0; }
        .crm-device-option input { accent-color:var(--crm-accent, var(--primary-color, #34d399)); width:18px; height:18px; flex-shrink:0; }
        .crm-device-option span { min-width:0; display:flex; flex-direction:column; gap:3px; }
        .crm-device-option strong { color:inherit; font-size:13px; font-weight:500; overflow-wrap:anywhere; }
        .crm-device-option small { font-size:11px; color:var(--crm-text-secondary, var(--secondary-text-color, var(--crm-text, #f0fdf4))); opacity:.75; overflow-wrap:anywhere; }
        .crm-settings-done { margin-top:16px; padding:10px 18px; border:0; border-radius:8px; background:var(--crm-accent, var(--primary-color, #34d399)); color:var(--crm-accent-contrast, #102019); font-weight:700; cursor:pointer; }
        .crm-ha-device { width:100%; display:flex; align-items:center; gap:20px; padding:10px 14px; background:transparent; color:var(--crm-text, var(--primary-text-color, #f0fdf4)); border:0; text-align:left; cursor:pointer; }
        .crm-ha-device ha-svg-icon { color:var(--crm-accent, var(--primary-color, #34d399)); width:22px; height:22px; flex-shrink:0; }
        .crm-ha-device-text { min-width:0; display:flex; flex-direction:column; gap:3px; }
        .crm-ha-device-text strong { color:inherit; font-size:14px; font-weight:500; }
        .crm-ha-device-text small { font-size:11px; color:var(--crm-text-secondary, var(--secondary-text-color, inherit)); }
      `]}constructor(){super(Yt.DEVICES),this.showDeviceSettings=!1,this.deviceVisibility={},this.preferencesLoaded=!1,this.savingDefault=!1,this.savedDefaultValue="",this.filterCriteriaPlaceholder=this.deviceText("filter")}render(){let e;if(this.filterCriteriaPlaceholder=this.deviceText("filter"),super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=(this.mediaList||[]).filter(e=>this.isVisible(this.spotifyKey(e),!0)).filter(e=>(e.Name||"").toLocaleLowerCase().includes(t)),this.filterItemCount=e.length}const t=bi(this.config.deviceBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.deviceBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.deviceBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
          <button class="crm-settings-button" title=${this.deviceText("selectDevices")} aria-label=${this.deviceText("selectDevices")} @click=${()=>this.showDeviceSettings=!this.showDeviceSettings}>
            <ha-svg-icon .path=${"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"}></ha-svg-icon>
          </button>
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${this.showDeviceSettings?this.renderDeviceSettings():B`
          ${(()=>this.isActionsVisible?B`<crm-device-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-device-actions>`:this.renderSpotifyDevices(e||[]))()}  
          ${this.isActionsVisible?"":this.renderHaPlayers((this.filterCriteria||"").toLocaleLowerCase())}
          `}
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=!0),super.firstUpdated(e),this.loadVisibility()}onFilterActionsClick(e){"refresh"===e.currentTarget.getAttribute("action")&&(this.refreshDeviceList=!0),super.onFilterActionsClick(e)}onItemSelected(e){nr.enabled&&nr("onItemSelected - device item selected:\n%s",JSON.stringify(e.detail,null,2));const t=e.detail;this.SelectSource(t)}async SelectSource(e){try{this.progressShow(),this.alertInfo=this.deviceText("transferring")+' "'+e.Name+'" ...';let t="";t=e.IsSonos?e.Name:this.config.deviceControlByName?e.Name||e.Id||"":e.Id||e.Name||"",await this.store.mediaControlService.select_source(this.player,t),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet(this.deviceText("selectError")+" "+ui(e)),this.mediaBrowserContentElement.scrollTop=0}finally{this.progressHide()}}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.refreshDeviceList||!1;let r=e.attributes.sp_source_list_hide||[];1==(this.config.deviceBrowserItemsShowHiddenDevices&&!0)&&(r=[]),this.spotifyPlusService.GetSpotifyConnectDevices(e,s,!0,r).then(e=>{this.mediaList=this.uniqueDevices(e.Items||[]),this.mediaListLastUpdatedOn=e.DateLastRefreshed||ti(),super.updatedMediaListOk(),this.requestUpdate(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(this.deviceText("fetchError")+" "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError(this.deviceText("refreshError")+" "+ui(e)),!0}}};var dr;Ce([Ve()],cr.prototype,"showDeviceSettings",void 0),Ce([Ve()],cr.prototype,"deviceVisibility",void 0),Ce([Ve()],cr.prototype,"savingDefault",void 0),Ce([Ve()],cr.prototype,"savedDefaultValue",void 0),cr=Ce([He("crm-device-browser")],cr),function(e){e.EpisodeCopyPresetToClipboard="EpisodeCopyPresetToClipboard",e.EpisodeCopyPresetJsonToClipboard="EpisodeCopyPresetJsonToClipboard",e.EpisodeCopyUriToClipboard="EpisodeCopyUriToClipboard",e.EpisodeFavoriteAdd="EpisodeFavoriteAdd",e.EpisodeFavoriteRemove="EpisodeFavoriteRemove",e.EpisodeFavoriteUpdate="EpisodeFavoriteUpdate",e.EpisodeUpdate="EpisodeUpdate",e.EpisodeUserPresetAdd="EpisodeUserPresetAdd",e.ShowCopyPresetToClipboard="ShowCopyPresetToClipboard",e.ShowCopyPresetJsonToClipboard="ShowCopyPresetJsonToClipboard",e.ShowCopyUriToClipboard="ShowCopyUriToClipboard",e.ShowFavoriteAdd="ShowFavoriteAdd",e.ShowFavoriteRemove="ShowFavoriteRemove",e.ShowFavoriteUpdate="ShowFavoriteUpdate",e.ShowSearchEpisodes="ShowSearchEpisodes",e.ShowUserPresetAdd="ShowUserPresetAdd"}(dr||(dr={}));class hr extends is{constructor(){super(Yt.EPISODE_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Mi}
          label="Add Show &quot;${this.episode?.show.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(dr.ShowFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Show &quot;${this.episode?.show.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(dr.ShowFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Episode &quot;${this.episode?.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(dr.EpisodeFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Episode &quot;${this.episode?.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(dr.EpisodeFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,r=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ni}
          .label="View Show &quot;${this.episode?.show.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.episode?.show.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,o=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Hi}
          .label="View Episode &quot;${this.episode?.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.episode?.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,a=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Show Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.ShowSearchEpisodes)} hide=${this.hideSearchType(wi.EPISODES)}>
          <ha-svg-icon slot="icon" .path=${Hi}></ha-svg-icon>
          Search for Show Episodes
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.ShowUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Show to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.ShowCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Show Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.ShowCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Show Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.ShowCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Show URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,n=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Episode Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.EpisodeUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Episode to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.EpisodeCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Episode Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.EpisodeCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Episode Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(dr.EpisodeCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Episode URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B` 
      <div class="episode-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.episode?.image_url});" @click=${()=>Zt(this.episode?.image_url||"")}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${o}
              ${this.episode?.name}
              ${this.isEpisodeFavorite?s:i}
              <span class="actions-dropdown-menu">
                ${n}
              </span>
            </div>
            <div class="media-info-text-ms">
              ${r}
              ${this.episode?.show.name}
              ${this.isShowFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${a}
              </span>
            </div>
            <div class="grid episode-info-grid">
              <div class="grid-action-info-hdr-s">Duration</div>
              <div class="grid-action-info-text-s">${si(this.episode?.duration_ms||0)}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Released</div>
              <div class="grid-action-info-text-s">${this.episode?.release_date}</div>

              <div class="grid-action-info-hdr-s">Explicit</div>
              <div class="grid-action-info-text-s">${this.episode?.explicit||!1}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Links</div>
              <div class="grid-action-info-text-s">
                <ha-icon-button style="padding-left:10px;"
                  .path=${Ni}
                  label="View Show &quot;${this.episode?.show.name}&quot; info on Spotify.com"
                  @click=${()=>yi(this.episode?.show.external_urls.spotify||"")}
                  slot="media-info-icon-link-s"
                ></ha-icon-button>
                <ha-icon-button style="padding-left:10px;"
                  .path=${Hi}
                  label="View Episode &quot;${this.episode?.name}&quot; info on Spotify.com"
                  @click=${()=>yi(this.episode?.external_urls.spotify||"")}
                  slot="media-info-icon-link-s"
                ></ha-icon-button>
              </div>

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s colspan-r3-c2 copy2cb" @click=${pi}>${this.mediaItem.uri}</div>

            </div>
          </div>
        </div>
        <div class="media-info-description">
          <div class="media-info-text-s" .innerHTML="${ei(this.episode?.html_description||"")}"></div>
        </div>
      </div>
      `}static get styles(){return[Yi,Ki,Zi,a`

      .episode-info-grid {
        grid-template-columns: auto auto 30px auto auto;
        justify-content: left;
      }

      .episode-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      .colspan-r3-c2 {
        grid-row: 3 / 3;    /* grid row 3 */
        grid-column: 2 / 6; /* grid columns 2 thru 5 */
      }
    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{return e==dr.EpisodeCopyPresetToClipboard?(Zt(Cs(this.episode,this.episode?.show.name)),this.alertInfoSet(Ae),!0):e==dr.EpisodeCopyPresetJsonToClipboard?(Zt(xs(this.episode,this.episode?.show.name)),this.alertInfoSet(we),!0):e==dr.EpisodeCopyUriToClipboard?(Zt(this.episode?.uri||""),!0):e==dr.ShowCopyPresetToClipboard?(Zt(Cs(this.episode?.show,"Podcast")),this.alertInfoSet(Ae),!0):e==dr.ShowCopyPresetJsonToClipboard?(Zt(xs(this.episode?.show,"Podcast")),this.alertInfoSet(we),!0):e==dr.ShowCopyUriToClipboard?(Zt(this.episode?.show.uri||""),!0):e==dr.ShowSearchEpisodes?(this.dispatchEvent(os(wi.SHOW_EPISODES,this.episode?.show.name,this.episode?.show.name,this.episode?.show.uri)),!0):(this.progressShow(),e==dr.EpisodeUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.episode)),await Os(this.store.config),this.progressHide()):e==dr.EpisodeFavoriteAdd?(await this.spotifyPlusService.SaveEpisodeFavorites(this.player,this.episode?.id),this.updateActions(this.player,[dr.EpisodeFavoriteUpdate])):e==dr.EpisodeFavoriteRemove?(await this.spotifyPlusService.RemoveEpisodeFavorites(this.player,this.episode?.id),this.updateActions(this.player,[dr.EpisodeFavoriteUpdate])):e==dr.ShowUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.episode?.show)),await Os(this.store.config),this.progressHide()):e==dr.ShowFavoriteAdd?(await this.spotifyPlusService.SaveShowFavorites(this.player,this.episode?.show.id),this.updateActions(this.player,[dr.ShowFavoriteUpdate])):e==dr.ShowFavoriteRemove?(await this.spotifyPlusService.RemoveShowFavorites(this.player,this.episode?.show.id),this.updateActions(this.player,[dr.ShowFavoriteUpdate])):this.progressHide(),!0)}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const s=new Array;if(-1!=t.indexOf(dr.EpisodeUpdate)||0==t.length){if(this.isEpisodeFavorite=void 0,this.isShowFavorite=void 0,"object"==typeof(i=this.mediaItem)&&null!==i&&"show"in i)return this.episode=this.mediaItem,this.isUpdateInProgress=!1,setTimeout(()=>{this.updateActions(e,[dr.EpisodeFavoriteUpdate,dr.ShowFavoriteUpdate])},50),!0;const t=new Promise((t,i)=>{this.spotifyPlusService.GetEpisode(e,this.mediaItem.id).then(i=>{this.episode=i,setTimeout(()=>{this.updateActions(e,[dr.EpisodeFavoriteUpdate,dr.ShowFavoriteUpdate])},50),t(!0)}).catch(e=>{this.episode=void 0,this.alertErrorSet("Get Episode call failed: "+ui(e)),i(e)})});s.push(t)}if(-1!=t.indexOf(dr.ShowFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckShowFavorites(e,this.episode?.show.id).then(e=>{this.isShowFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isShowFavorite=void 0,this.alertErrorSet("Check Show Favorite failed: "+ui(e)),i(e)})});s.push(t)}if(-1!=t.indexOf(dr.EpisodeFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckEpisodeFavorites(e,this.episode?.id).then(e=>{this.isEpisodeFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isEpisodeFavorite=void 0,this.alertErrorSet("Check Episode Favorites failed: "+ui(e)),i(e)})});s.push(t)}return this.progressShow(),Promise.allSettled(s).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Episode actions refresh failed: "+ui(e)),!0}var i}}Ce([De({attribute:!1})],hr.prototype,"mediaItem",void 0),Ce([Ve()],hr.prototype,"isEpisodeFavorite",void 0),Ce([Ve()],hr.prototype,"isShowFavorite",void 0),Ce([Ve()],hr.prototype,"episode",void 0),customElements.define("crm-episode-actions",hr);let pr=class extends qs{constructor(){super(Yt.EPISODE_FAVORITES),this.filterCriteriaPlaceholder=this.uiText("search.filter.episode","Nach Episodennamen filtern","Filtrar por nome do episódio","Filter by episode name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(t)||-1!==e.show.name.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.episodeFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.episodeFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.episodeFavBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-episode-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-episode-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.episodeFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.episodeFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.episodeFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetEpisodeFavorites(e,0,0,s,r).then(e=>{this.mediaList=function(e){const t=new Array;if(e)for(const i of e.items||[])t.push(i.episode);return t}(e),this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Episode Favorites failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Episode favorites refresh failed: "+ui(e)),!0}}};pr=Ce([He("crm-episode-fav-browser")],pr);class ur extends es{constructor(){super(...arguments),this.playingProgress=0,this.mediaDuration=0}render(){if(this.player=this.store.player,this.mediaDuration=this.player?.attributes.media_duration||0,this.mediaDuration<=0)return this.stopTracking(),B``;this.trackProgress();const e=Math.max(0,Math.min(this.playingProgress||0,this.mediaDuration));return B`
      <div class="progress">
        <div
          class="bar"
          role="slider"
          tabindex="0"
          aria-label="Playback position"
          aria-valuemin="0"
          aria-valuemax=${Math.round(this.mediaDuration)}
          aria-valuenow=${Math.round(e)}
          @click=${this.onSeekBarClick}
          @keydown=${this.onSeekBarKeyDown}
        >
          <div class="progress-bar" style=${this.styleProgressBar(this.mediaDuration)}></div>
        </div>
        <div class="progress-times">
          <span class="progress-time">${mr(e)}</span>
          <span class="progress-time">${mr(this.mediaDuration)}</span>
        </div>
      </div>
    `}disconnectedCallback(){this.stopTracking(),super.disconnectedCallback()}stopTracking(){void 0!==this.tracker&&(clearInterval(this.tracker),this.tracker=void 0)}async onSeekBarClick(e){const t=this.progressBar;if(!t)return;const i=t.getBoundingClientRect();if(i.width<=0)return;const s=Math.max(0,Math.min(1,(e.clientX-i.left)/i.width));await this.seekTo(this.mediaDuration*s)}async onSeekBarKeyDown(e){if("ArrowLeft"!==e.key&&"ArrowRight"!==e.key&&"Home"!==e.key&&"End"!==e.key)return;e.preventDefault();const t=Math.max(0,Math.min(this.playingProgress||0,this.mediaDuration)),i="Home"===e.key?0:"End"===e.key?this.mediaDuration:t+("ArrowRight"===e.key?5:-5);await this.seekTo(Math.max(0,Math.min(i,this.mediaDuration)))}async seekTo(e){try{this.progressShow(),await this.store.spotifyPlusService.PlayerMediaSeek(this.player,null,1e3*e,0)}catch(e){this.alertErrorSet("Seek position failed: "+ui(e))}finally{this.progressHide()}}alertErrorSet(e){const t=di("#spcPlayer",this);t&&t.alertErrorSet(e)}styleProgressBar(e){const t=e>0?Math.max(0,Math.min(100,(this.playingProgress||0)/e*100)):0;return Me({width:`${t}%`})}trackProgress(){const e=this.player?.attributes.media_position||0,t=this.player?.isPlaying(),i=this.player?.attributes.media_position_updated_at,s=i?new Date(i).getTime():NaN,r=t&&Number.isFinite(s)?Math.max(0,(Date.now()-s)/1e3):0,o=Math.max(0,Math.min(e+r,this.mediaDuration));this.playingProgress!==o&&(this.playingProgress=o),t&&void 0===this.tracker?this.tracker=setInterval(()=>this.trackProgress(),1e3):t||this.stopTracking()}static get styles(){return a`
      :host { display: block; width: 100%; min-width: 0; }
      .progress { width: 100%; display: flex; flex-direction: column; gap: 7px; box-sizing: border-box; padding: 7px 0 5px; }
      .bar { display: block; width: 100%; height: 5px; background: rgba(255,255,255,0.18); border: 0; border-radius: 999px; overflow: hidden; cursor: pointer; box-sizing: border-box; touch-action: manipulation; }
      .bar:focus-visible { outline: 2px solid #4adea4; outline-offset: 4px; }
      .progress-bar { height: 100%; background: var(--crm-player-progress-slider-color, ${o(be)}); border-radius: inherit; transition: width 0.25s linear; }
      .progress-times { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .progress-time { color: var(--crm-player-progress-label-color, rgba(255,255,255,0.65)); font-size: var(--crm-player-progress-label-font-size, 0.75rem); font-variant-numeric: tabular-nums; line-height: 1.2; }
    `}}Ce([Ve()],ur.prototype,"playingProgress",void 0),Ce([ze(".bar")],ur.prototype,"progressBar",void 0);const mr=e=>{const t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),i=Math.floor(t/3600),s=Math.floor(t%3600/60),r=t%60;return i>0?`${i}:${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${s}:${String(r).padStart(2,"0")}`};customElements.define("crm-player-progress",ur);class gr extends re{render(){this.config=this.store.config,this.player=this.store.player;const e=this.config.playerHeaderHideProgressBar||!1,t=bi(this.config.playerHeaderTitle,this.config,this.player);let i=bi(this.config.playerHeaderArtistTrack,this.config,this.player),s=bi(this.config.playerHeaderAlbum,this.config,this.player);i&&(i=i.replace(/^ - | - $/g,""));let r,o=!1,a=B``,n=B``;if(this.player.isPlaying()){const e=this.parentElement?.querySelector(".player-section-body-content");if(e){const t=e.tagName.toLowerCase();if("crm-player-body-track"==t){const t=e;r=t.isTrackFavorite,a=t.actionTrackFavoriteAdd,n=t.actionTrackFavoriteRemove,o=!0,t.mediaContentId=this.player.attributes.media_content_id}else if("crm-player-body-show"==t){const t=e;r=t.isEpisodeFavorite,a=t.actionEpisodeFavoriteAdd,n=t.actionEpisodeFavoriteRemove,o=!0,t.mediaContentId=this.player.attributes.media_content_id}else if("crm-player-body-audiobook"==t){const t=e;r=t.isAudiobookFavorite,a=t.actionAudiobookFavoriteAdd,n=t.actionAudiobookFavoriteRemove,o=!0,t.mediaContentId=this.player.attributes.media_content_id}}}return this.player.attributes.media_title||(i=bi(this.config.playerHeaderNoMediaPlayingText,this.config,this.player)||"No Media Playing",s=void 0),B` 
      <div class="player-header-container" style=${this.styleContainer()}>
        ${e?B``:B`<crm-player-progress .store=${this.store}></crm-player-progress>`}
        ${t?B`<div class="header-title">${t}</div>`:B``}
        ${i?B`
          <div class="header-artist-track">${i}
            ${o?B`${r?n:a}`:B``}
          </div>
        `:B``}
        ${s?B`<div class="header-artist-album">${s}</div>`:B``}
      </div>`}styleContainer(){return Me({})}static get styles(){return[Zi,a`

      .player-header-container {
        max-width: var(--crm-player-controls-max-width, 40rem);
        text-align: center;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        box-sizing: border-box;
        /*border: 1px solid red;  /*  FOR TESTING CONTROL LAYOUT CHANGES */
      }

      .header-title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--crm-player-header-title1-font-size, 1.0rem);
        line-height: var(--crm-player-header-title1-font-size, 1.0rem);
        font-weight: 500;
        text-shadow: 0 0 2px var(--crm-player-palette-vibrant);
        color: var(--crm-player-header-title1-color, #ffffff);
        white-space: nowrap;
        mix-blend-mode: normal;
        min-height: 0.5rem;
        padding: 0.2rem;
      }

      .header-artist-track {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--crm-player-header-title2-font-size, 1.15rem);
        line-height: var(--crm-player-header-title2-font-size, 1.15rem);
        font-weight: 400;
        text-shadow: 0 0 2px var(--crm-player-palette-vibrant);
        color: var(--crm-player-header-title2-color, #ffffff);
        mix-blend-mode: normal;
        padding: 0.1rem;
        /* the following is used to correctly align the favorite indicator to the right of the track. */
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .header-artist-album {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--crm-player-header-title3-font-size, 1.0rem);
        line-height: var(--crm-player-header-title3-font-size, 1.0rem);
        font-weight: 400;
        text-shadow: 0 0 2px var(--crm-player-palette-vibrant);
        color: var(--crm-player-header-title3-color, #ffffff);
        mix-blend-mode: normal;
        padding: 0.1rem;
      }

      ///* when the user prefers dark theme mode */
      //@media (prefers-color-scheme: dark) {

      //  .header-title {
      //    color: var(--crm-player-header-title1-color, #ffffff);
      //  }

      //  .header-artist-track {
      //    color: var(--crm-player-header-title2-color, #ffffff);
      //  }

      //  .header-artist-album {
      //    color: var(--crm-player-header-title3-color, #ffffff);
      //  }
      //}
    `]}}Ce([De({attribute:!1})],gr.prototype,"store",void 0),customElements.define("crm-player-header",gr);const vr=_e(ce+":player-body-base");class fr extends es{constructor(){super(),this.mediaType=Yt.PLAYER}render(){this.player=this.store.player,this.spotifyPlusService=this.store.spotifyPlusService,this.isPlayerStopped=[vs.PLAYING,vs.PAUSED,vs.BUFFERING].includes(this.player.state)&&V}firstUpdated(e){super.firstUpdated(e),(async()=>{await hi()})(),this.isCardInEditPreview||this.updateActions(this.store.player,[])}update(e){super.update(e);const t=Array.from(e.keys());if(this.hasUpdated&&!this.isCardInEditPreview)return t.includes("mediaContentId")?(vr.enabled&&vr("%cupdate - player content changed:\n- NEW CONTENT ID = %s\n- isCardInEditPreview = %s","color: gold;",JSON.stringify(this.player.attributes.media_content_id),JSON.stringify(this.isCardInEditPreview)),void setTimeout(()=>{this.updateActions(this.store.player,[])},100)):void 0}hideSearchType(e){return!!(this.store.config.searchMediaBrowserSearchTypes&&this.store.config.searchMediaBrowserSearchTypes.length>0)&&!this.store.config.searchMediaBrowserSearchTypes?.includes(e)}async onClickAction(e,t=null){throw new Error('onClickAction not implemented for action "'+e+'".')}updateActions(e,t){return vr.enabled&&vr("updateActions - updating actions: %s\n- isCardInEditPreview = %s\n- hasCardEditLoadedMediaList:\n%s",JSON.stringify(Array.from(t.values())),JSON.stringify(this.isCardInEditPreview),JSON.stringify(Ls.hasCardEditLoadedMediaList,null,2)),this.isUpdateInProgress?(vr.enabled&&vr("updateActions - update in progress; ignoring updateActions request"),!1):(this.isUpdateInProgress=!0,this.isCardInEditPreview?(this.isUpdateInProgress=!1,vr.enabled&&vr("updateActions - card is in editpreview; ignoring updateActions request"),!1):e?this.player.attributes.media_content_id?(this.alertClear(),!0):(this.isUpdateInProgress=!1,vr.enabled&&vr("updateActions - player media_content_id reference not set; ignoring updateActions request"),!1):(this.isUpdateInProgress=!1,vr.enabled&&vr("updateActions - player reference not set; ignoring updateActions request"),!1))}updateActionsComplete(e){this.isCardInEditPreview&&0==e.length&&(Ls.hasCardEditLoadedMediaList[this.mediaType]=!0)}}var br;Ce([Ve()],fr.prototype,"mediaContentId",void 0),function(e){e.AudiobookCopyPresetToClipboard="AudiobookCopyPresetToClipboard",e.AudiobookCopyPresetJsonToClipboard="AudiobookCopyPresetJsonToClipboard",e.AudiobookCopyUriToClipboard="AudiobookCopyUriToClipboard",e.AudiobookFavoriteAdd="AudiobookFavoriteAdd",e.AudiobookFavoriteRemove="AudiobookFavoriteRemove",e.AudiobookFavoriteUpdate="AudiobookFavoriteUpdate",e.AudiobookSearchAuthor="AudiobookSearchAuthor",e.AudiobookSearchNarrator="AudiobookSearchNarrator",e.AudiobookUserPresetAdd="AudiobookUserPresetAdd",e.ChapterCopyPresetToClipboard="ChapterCopyPresetToClipboard",e.ChapterCopyPresetJsonToClipboard="ChapterCopyPresetJsonToClipboard",e.ChapterCopyUriToClipboard="ChapterCopyUriToClipboard",e.ChapterFavoriteAdd="ChapterFavoriteAdd",e.ChapterFavoriteRemove="ChapterFavoriteRemove",e.ChapterFavoriteUpdate="ChapterFavoriteUpdate",e.GetPlayingItem="GetPlayingItem"}(br||(br={}));class yr extends fr{render(){super.render(),this.actionAudiobookFavoriteAdd=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Audiobook &quot;${this.chapter?.audiobook.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(br.AudiobookFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,this.actionAudiobookFavoriteRemove=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Audiobook &quot;${this.chapter?.audiobook.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(br.AudiobookFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `;const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Chapter &quot;${this.chapter?.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(br.ChapterFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Chapter &quot;${this.chapter?.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(br.ChapterFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ei}
          .label="View Audiobook &quot;${this.chapter?.audiobook.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.chapter?.audiobook.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Hi}
          .label="View Chapter &quot;${this.chapter?.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.chapter?.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,r=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Audiobook Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.AudiobookSearchAuthor)} hide=${this.hideSearchType(wi.AUDIOBOOKS)}>
          <ha-svg-icon slot="icon" .path=${ki}></ha-svg-icon>
          Other Audiobooks by same Author
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.AudiobookSearchNarrator)} hide=${this.hideSearchType(wi.AUDIOBOOKS)}>
          <ha-svg-icon slot="icon" .path=${ki}></ha-svg-icon>
          Other Audiobooks by same Narrator
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.AudiobookUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Audiobook to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.AudiobookCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Audiobook Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.AudiobookCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Audiobook Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.AudiobookCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Audiobook URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,o=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Chapter Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.ChapterCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Chapter Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.ChapterCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Chapter Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(br.ChapterCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Chapter URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,a=B`
      <div class="media-info-content">
        <div class="media-info-details">
          <div class="media-info-text-ms-c">
            ${i}
            ${this.chapter?.audiobook.name}
            ${this.isAudiobookFavorite?this.actionAudiobookFavoriteRemove:this.actionAudiobookFavoriteAdd}
            <span class="actions-dropdown-menu">
              ${r}
            </span>
          </div>
          <div class="media-info-text-ms">
            ${s}
            ${this.chapter?.name}
            ${this.isChapterFavorite?t:e}
            <span class="actions-dropdown-menu">
              ${o}
            </span>
          </div>
          <div class="grid audiobook-info-grid">

            <div class="grid-action-info-hdr-s">Released</div>
            <div class="grid-action-info-text-s">${this.chapter?.release_date||"unknown"}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Duration</div>
            <div class="grid-action-info-text-s">${si(this.chapter?.duration_ms||0)}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Links</div>
            <div class="grid-action-info-text-s">
              <ha-icon-button
                .path=${Ei}
                label="View Audiobook &quot;${this.chapter?.audiobook.name}&quot; info on Spotify.com"
                @click=${()=>yi(this.chapter?.audiobook.external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
              <ha-icon-button style="padding-left:10px;"
                .path=${Hi}
                label="View Chapter &quot;${this.chapter?.name}&quot; info on Spotify.com"
                @click=${()=>yi(this.chapter?.external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
            </div>

            <div class="grid-action-info-hdr-s">Edition</div>
            <div class="grid-action-info-text-s">${this.chapter?.audiobook.edition||"unknown"}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Publisher</div>
            <div class="grid-action-info-text-s colspan-c5-end">${this.chapter?.audiobook.publisher||"unknown"}</div>

            <div class="grid-action-info-hdr-s">Art URL</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.chapter?.audiobook.image_url}</div>

            <div class="grid-action-info-hdr-s">Authors</div>
            <div class="grid-action-info-text-s colspan-c2-end">${Si(this.chapter?.audiobook,"; ")}</div>

            <div class="grid-action-info-hdr-s">Narrators</div>
            <div class="grid-action-info-text-s colspan-c2-end">${Ci(this.chapter?.audiobook,"; ")}</div>

            <div class="grid-action-info-hdr-s">Audiobook URI</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.chapter?.audiobook.uri}</div>

            <div class="grid-action-info-hdr-s">Episode URI</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.chapter?.uri}</div>

          </div>

          <div style="padding-top: 10px;">
            <div class="media-info-text-s" .innerHTML="${ei(this.chapter?.html_description||"")}"></div>
          </div>

        </div>
      </div>
     `;return B` 
      <div class="player-body-container" hide=${this.isPlayerStopped}>
        <div class="player-body-container-scrollable">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>"audiobook"==this.player.attributes.sp_item_type?B`${a}`:B``)()}
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .audiobook-info-grid {
        grid-template-columns: auto auto 30px auto auto 30px auto auto;
        justify-content: left;
      }

      .colspan-c2-end {
        grid-column: 2 / 9; /* grid columns 2 thru 8 */
      }

      .colspan-c5-end {
        grid-column: 5 / 9; /* grid columns 5 thru 8 */
      }
    `]}async onClickAction(e){try{return e==br.AudiobookCopyPresetToClipboard?(Zt(Cs(this.chapter?.audiobook,Si(this.chapter?.audiobook,", "))),this.alertInfoSet(Ae),!0):e==br.AudiobookCopyPresetJsonToClipboard?(Zt(xs(this.chapter?.audiobook,Si(this.chapter?.audiobook,", "))),this.alertInfoSet(we),!0):e==br.AudiobookCopyUriToClipboard?(Zt(this.chapter?.audiobook.uri||""),!0):e==br.AudiobookSearchAuthor?(this.dispatchEvent(os(wi.AUDIOBOOKS,Si(this.chapter?.audiobook," "))),!0):e==br.AudiobookSearchNarrator?(this.dispatchEvent(os(wi.AUDIOBOOKS,Ci(this.chapter?.audiobook," "))),!0):e==br.ChapterCopyPresetToClipboard?(Zt(Cs(this.chapter,this.chapter?.audiobook.name)),this.alertInfoSet(Ae),!0):e==br.ChapterCopyPresetJsonToClipboard?(Zt(xs(this.chapter,this.chapter?.audiobook.name)),this.alertInfoSet(we),!0):e==br.ChapterCopyUriToClipboard?(Zt(this.chapter?.uri||""),!0):(this.progressShow(),e==br.AudiobookUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.chapter?.audiobook)),await Os(this.store.config),this.progressHide()):e==br.AudiobookFavoriteAdd?(await this.spotifyPlusService.SaveAudiobookFavorites(this.player,this.chapter?.audiobook.id),this.updateActions(this.player,[br.AudiobookFavoriteUpdate])):e==br.AudiobookFavoriteRemove?(await this.spotifyPlusService.RemoveAudiobookFavorites(this.player,this.chapter?.audiobook.id),this.updateActions(this.player,[br.AudiobookFavoriteUpdate])):e==br.ChapterFavoriteAdd?(await this.spotifyPlusService.SaveEpisodeFavorites(this.player,this.chapter?.id),this.updateActions(this.player,[br.ChapterFavoriteUpdate])):e==br.ChapterFavoriteRemove?(await this.spotifyPlusService.RemoveEpisodeFavorites(this.player,this.chapter?.id),this.updateActions(this.player,[br.ChapterFavoriteUpdate])):this.progressHide(),!0)}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(br.GetPlayingItem)||0==t.length){this.isAudiobookFavorite=void 0,this.isChapterFavorite=void 0;const t=new Promise((t,i)=>{const s=ys(this.player.attributes.media_content_id);this.spotifyPlusService.GetChapter(e,s).then(i=>{this.chapter=i,setTimeout(()=>{this.updateActions(e,[br.AudiobookFavoriteUpdate,br.ChapterFavoriteUpdate])},50),t(!0)}).catch(e=>{this.chapter=void 0,this.alertErrorSet("Get Episode call failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(br.AudiobookFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckAudiobookFavorites(e,this.chapter?.audiobook.id).then(e=>{this.isAudiobookFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isAudiobookFavorite=void 0,this.alertErrorSet("Check Audiobook Favorites failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(br.ChapterFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckEpisodeFavorites(e,this.chapter?.id).then(e=>{this.isChapterFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isChapterFavorite=void 0,this.alertErrorSet("Check Episode Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide(),this.updateActionsComplete(t)}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Audiobook actions refresh failed: "+ui(e)),!0}}}Ce([Ve()],yr.prototype,"isAudiobookFavorite",void 0),Ce([Ve()],yr.prototype,"isChapterFavorite",void 0),Ce([Ve()],yr.prototype,"chapter",void 0),customElements.define("crm-player-body-audiobook",yr);customElements.define("crm-player-body-idle",class extends fr{render(){super.render();const e=bi(this.store.config.playerHeaderNoMediaPlayingText,this.store.config,this.player)||"No Media Playing";return B` 
      <div class="player-idle-container">
        <div class="thumbnail" style=${this.styleMediaBrowserItemImage(ue)}></div>
        <div class="title">${e}</div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

        /* style container */
        .player-idle-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 0.5rem;
        }

        .thumbnail {
          min-height: var(--crm-player-controls-icon-size, ${o(fe)});
          min-width: var(--crm-player-controls-icon-size, ${o(fe)});
          max-height: var(--crm-player-controls-icon-size, ${o(fe)});
          max-width: var(--crm-player-controls-icon-size, ${o(fe)});
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 70%;
        }

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: var(--crm-player-minimized-title-font-size, 1.0rem);
          line-height: var(--crm-player-minimized-title-font-size, 1.3rem);
          font-weight: 500;
          text-shadow: 0 0 2px;
          color: var(--crm-player-minimized-title-color, #ffffff);
          white-space: nowrap;
          mix-blend-mode: normal;
          min-height: 0.5rem;
          padding-left: 0.5rem;
        }
      `]}styleMediaBrowserItemImage(e){const t={};return e?.includes("svg+xml")?(t["mask-image"]=`url(${e})`,t["background-color"]=`var(--crm-media-browser-items-svgicon-color, ${o(be)})`):(t["background-image"]=`url(${e})`,t["background-color"]="var(--crm-media-browser-items-svgicon-color, transparent)"),Me(t)}});const Ar=_e(ce+":player-body-queue");var wr,Sr,Cr;!function(e){e.EpisodePlay="EpisodePlay",e.GetPlayerQueueInfo="GetPlayerQueueInfo",e.TrackPlay="TrackPlay"}(wr||(wr={}));class xr extends fr{render(){super.render();let e=B`<div class="grid-entry queue-info-grid-no-items">No items found in Queue</div>`;return(this.queueInfo?.queue||[]).length>0&&(e=B`${this.queueInfo?.queue.map((e,t)=>B`
          ${(()=>"episode"==e.type?B`
                <ha-icon-button
                  .path=${Vi}
                  .label="Play episode &quot;${e.name||""}&quot;"
                  @click=${()=>this.onClickAction(wr.EpisodePlay,e)}
                  slot="icon-button"
                >&nbsp;</ha-icon-button>
                <div class="grid-entry">${t+1}</div>
                <div class="grid-entry">${e.name||""}</div>
                <div class="grid-entry">${e.show?.name||""}</div>
              `:B`
                <ha-icon-button
                  .path=${Vi}
                  .label="Play track &quot;${e.name||""}&quot;"
                  @click=${()=>this.onClickAction(wr.TrackPlay,e)}
                  slot="icon-button"
                >&nbsp;</ha-icon-button>
                <div class="grid-entry">${t+1}</div>
                <div class="grid-entry">${e.name||""}</div>
                <div class="grid-entry">${e.artists[0].name||""}</div>
              `)()}
      `)}`),B` 
      <div class="player-body-container" hide=${this.isPlayerStopped}>
        <div class="player-body-container-scrollable">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          <div class="media-info-text-ms-c queue-info-grid-container">
            Player Queue Items
          </div>
          <div class="queue-info-grid-container">
            <div class="grid queue-info-grid">
              <div class="grid-header">&nbsp;</div>
              <div class="grid-header">#</div>
              <div class="grid-header">Title</div>
              <div class="grid-header">Artist / Show / Book</div>
              ${e}
            </div>
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

        /* style grid container */
        .queue-info-grid-container {
          margin: 0.25rem;
        }

        /* style grid container and grid items */
        .queue-info-grid {
          grid-template-columns: 30px 45px auto auto;
        }

        /* style grid container and grid items */
        .queue-info-grid-no-items {
          grid-column-start: 1;
          grid-column-end: 4;
        }

        /* style ha-icon-button controls in grid: icon size, title text */
        .queue-info-grid > ha-icon-button[slot="icon-button"] {
          --ha-icon-button-size: 24px;
          --ha-icon-size: 20px;
          vertical-align: top;
          padding: 0px;
        }
      `]}refreshQueueItems(){this.updateActions(this.player,[wr.GetPlayerQueueInfo])}async onClickAction(e,t=null){try{if(this.progressShow(),e==wr.GetPlayerQueueInfo)this.updateActions(this.player,[wr.GetPlayerQueueInfo]);else if(e==wr.EpisodePlay)await this.spotifyPlusService.Card_PlayMediaBrowserItem(this.player,t),this.progressHide();else if(e==wr.TrackPlay){const{uris:e}=Ai(this.queueInfo?.queue,t);this.spotifyPlusService.PlayerMediaPlayTracks(this.player,e.join(","),null,null,null,!1),this.progressHide()}else this.progressHide();return!0}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(wr.GetPlayerQueueInfo)){if(!e.isUserProductPremium())throw new Error(Se);const t=new Promise((t,i)=>{this.spotifyPlusService.GetPlayerQueueInfo(e).then(e=>{this.queueInfo=e,Ar.enabled&&Ar("updateActions - queueInfo refreshed successfully"),t(!0)}).catch(e=>{this.queueInfo=void 0,this.alertErrorSet("Get Player Queue Info call failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide(),this.updateActionsComplete(t)}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Queue info refresh failed: "+ui(e)),!0}}}Ce([Ve()],xr.prototype,"queueInfo",void 0),customElements.define("crm-player-body-queue",xr),function(e){e.EpisodeCopyPresetToClipboard="EpisodeCopyPresetToClipboard",e.EpisodeCopyPresetJsonToClipboard="EpisodeCopyPresetJsonToClipboard",e.EpisodeCopyUriToClipboard="EpisodeCopyUriToClipboard",e.EpisodeFavoriteAdd="EpisodeFavoriteAdd",e.EpisodeFavoriteRemove="EpisodeFavoriteRemove",e.EpisodeFavoriteUpdate="EpisodeFavoriteUpdate",e.EpisodeUserPresetAdd="EpisodeUserPresetAdd",e.GetPlayingItem="GetPlayingItem",e.ShowCopyPresetToClipboard="ShowCopyPresetToClipboard",e.ShowCopyPresetJsonToClipboard="ShowCopyPresetJsonToClipboard",e.ShowCopyUriToClipboard="ShowCopyUriToClipboard",e.ShowFavoriteAdd="ShowFavoriteAdd",e.ShowFavoriteRemove="ShowFavoriteRemove",e.ShowFavoriteUpdate="ShowFavoriteUpdate",e.ShowSearchEpisodes="ShowSearchEpisodes",e.ShowUserPresetAdd="ShowUserPresetAdd"}(Sr||(Sr={}));class Ir extends fr{render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Show &quot;${this.episode?.show.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Sr.ShowFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Show &quot;${this.episode?.show.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Sr.ShowFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `;this.actionEpisodeFavoriteAdd=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Episode &quot;${this.episode?.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Sr.EpisodeFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,this.actionEpisodeFavoriteRemove=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Episode &quot;${this.episode?.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Sr.EpisodeFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `;const i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ni}
          .label="View Show &quot;${this.episode?.show.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.episode?.show.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Hi}
          .label="View Episode &quot;${this.episode?.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.episode?.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,r=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Show Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.ShowSearchEpisodes)} hide=${this.hideSearchType(wi.EPISODES)}>
          <ha-svg-icon slot="icon" .path=${Hi}></ha-svg-icon>
          Search for Show Episodes
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.ShowUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Show to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.ShowCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Show Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.ShowCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Show Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.ShowCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Show URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,o=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Episode Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.EpisodeUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Episode to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.EpisodeCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Episode Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.EpisodeCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Episode Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Sr.EpisodeCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Episode URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,a=B`
      <div class="media-info-content">
        <div class="media-info-details">
          <div class="media-info-text-ms-c">
            ${i}
            ${this.episode?.show.name}
            ${this.isShowFavorite?t:e}
            <span class="actions-dropdown-menu">
              ${r}
            </span>
          </div>
          <div class="media-info-text-ms">
            ${s}
            ${this.episode?.name}
            ${this.isEpisodeFavorite?this.actionEpisodeFavoriteRemove:this.actionEpisodeFavoriteAdd}
            <span class="actions-dropdown-menu">
              ${o}
            </span>
          </div>
          <div class="grid show-info-grid">
            <div class="grid-action-info-hdr-s">Released On</div>
            <div class="grid-action-info-text-s">${this.episode?.release_date||"unknown"}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Duration</div>
            <div class="grid-action-info-text-s">${si(this.episode?.duration_ms||0)}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Links</div>
            <div class="grid-action-info-text-s">
              <ha-icon-button
                .path=${Ni}
                label="View Show &quot;${this.episode?.show.name}&quot; info on Spotify.com"
                @click=${()=>yi(this.episode?.show.external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
              <ha-icon-button style="padding-left:10px;"
                .path=${Hi}
                label="View Episode &quot;${this.episode?.name}&quot; info on Spotify.com"
                @click=${()=>yi(this.episode?.external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
            </div>
            <div class="grid-action-info-hdr-s">Show URI</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.episode?.show.uri}</div>
            <div class="grid-action-info-hdr-s">Art URL</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.episode?.show.image_url}</div>
            <div class="grid-action-info-hdr-s">Episode URI</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.episode?.uri}</div>
            <div class="grid-action-info-hdr-s">Art URL</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.episode?.image_url}</div>

          </div>
          <div style="padding-top: 10px;">
            <div class="media-info-text-s" .innerHTML="${ei(this.episode?.html_description||"")}"></div>
          </div>
        </div>
      </div>
     `;return B` 
      <div class="player-body-container" hide=${this.isPlayerStopped}>
        <div class="player-body-container-scrollable">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>"podcast"==this.player.attributes.sp_item_type?B`${a}`:B``)()}
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .show-info-grid {
        grid-template-columns: auto auto 30px auto auto 30px auto auto;
        justify-content: left;
      }

      .colspan-c2-end {
        grid-column: 2 / 9; /* grid columns 2 thru 8 */
      }
    `]}async onClickAction(e){try{return e==Sr.EpisodeCopyPresetToClipboard?(Zt(Cs(this.episode,this.episode?.show.name)),this.alertInfoSet(Ae),!0):e==Sr.EpisodeCopyPresetJsonToClipboard?(Zt(xs(this.episode,this.episode?.show.name)),this.alertInfoSet(we),!0):e==Sr.EpisodeCopyUriToClipboard?(Zt(this.episode?.uri||""),!0):e==Sr.ShowCopyPresetToClipboard?(Zt(Cs(this.episode?.show,"Podcast")),this.alertInfoSet(Ae),!0):e==Sr.ShowCopyPresetJsonToClipboard?(Zt(xs(this.episode?.show,"Podcast")),this.alertInfoSet(we),!0):e==Sr.ShowCopyUriToClipboard?(Zt(this.episode?.show.uri||""),!0):e==Sr.ShowSearchEpisodes?(this.dispatchEvent(os(wi.SHOW_EPISODES,this.episode?.show.name,this.episode?.show.name,this.episode?.show.uri)),!0):(this.progressShow(),e==Sr.ShowUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.episode?.show)),await Os(this.store.config),this.progressHide()):e==Sr.ShowFavoriteAdd?(await this.spotifyPlusService.SaveShowFavorites(this.player,this.episode?.show.id),this.updateActions(this.player,[Sr.ShowFavoriteUpdate])):e==Sr.ShowFavoriteRemove?(await this.spotifyPlusService.RemoveShowFavorites(this.player,this.episode?.show.id),this.updateActions(this.player,[Sr.ShowFavoriteUpdate])):e==Sr.EpisodeUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.episode)),await Os(this.store.config),this.progressHide()):e==Sr.EpisodeFavoriteAdd?(await this.spotifyPlusService.SaveEpisodeFavorites(this.player,this.episode?.id),this.updateActions(this.player,[Sr.EpisodeFavoriteUpdate])):e==Sr.EpisodeFavoriteRemove?(await this.spotifyPlusService.RemoveEpisodeFavorites(this.player,this.episode?.id),this.updateActions(this.player,[Sr.EpisodeFavoriteUpdate])):this.progressHide(),!0)}catch(e){return this.progressHide(),this.alertErrorSet("Show action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(Sr.GetPlayingItem)||0==t.length){this.isEpisodeFavorite=void 0,this.isShowFavorite=void 0;const t=new Promise((t,i)=>{const s=ys(this.player.attributes.media_content_id);this.spotifyPlusService.GetEpisode(e,s).then(i=>{this.episode=i,setTimeout(()=>{this.updateActions(e,[Sr.ShowFavoriteUpdate,Sr.EpisodeFavoriteUpdate])},50),t(!0)}).catch(e=>{this.episode=void 0,this.alertErrorSet("Get Episode call failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Sr.ShowFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckShowFavorites(e,this.episode?.show.id).then(e=>{this.isShowFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isShowFavorite=void 0,this.alertErrorSet("Check Show Favorites failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Sr.EpisodeFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckEpisodeFavorites(e,this.episode?.id).then(e=>{this.isEpisodeFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isEpisodeFavorite=void 0,this.alertErrorSet("Check Episode Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide(),this.updateActionsComplete(t)}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Show actions refresh failed: "+ui(e)),!0}}}Ce([Ve()],Ir.prototype,"isShowFavorite",void 0),Ce([Ve()],Ir.prototype,"isEpisodeFavorite",void 0),Ce([Ve()],Ir.prototype,"episode",void 0),customElements.define("crm-player-body-show",Ir),function(e){e.GetPlayingItem="GetPlayingItem",e.AlbumCopyPresetToClipboard="AlbumCopyPresetToClipboard",e.AlbumCopyPresetJsonToClipboard="AlbumCopyPresetJsonToClipboard",e.AlbumCopyUriToClipboard="AlbumCopyUriToClipboard",e.AlbumFavoriteAdd="AlbumFavoriteAdd",e.AlbumFavoriteRemove="AlbumFavoriteRemove",e.AlbumFavoriteUpdate="AlbumFavoriteUpdate",e.AlbumPlay="AlbumPlay",e.AlbumPlayTrackFavorites="AlbumPlayTrackFavorites",e.AlbumSearchRadio="AlbumSearchRadio",e.AlbumShowTracks="AlbumShowTracks",e.AlbumUserPresetAdd="AlbumUserPresetAdd",e.ArtistCopyPresetToClipboard="ArtistCopyPresetToClipboard",e.ArtistCopyPresetJsonToClipboard="ArtistCopyPresetJsonToClipboard",e.ArtistCopyUriToClipboard="ArtistCopyUriToClipboard",e.ArtistFavoriteAdd="ArtistFavoriteAdd",e.ArtistFavoriteRemove="ArtistFavoriteRemove",e.ArtistFavoriteUpdate="ArtistFavoriteUpdate",e.ArtistPlayTrackFavorites="ArtistPlayTrackFavorites",e.ArtistSearchPlaylists="ArtistSearchPlaylists",e.ArtistSearchRadio="ArtistSearchRadio",e.ArtistSearchTracks="ArtistSearchTracks",e.ArtistShowAlbums="ArtistShowAlbums",e.ArtistShowAlbumsAppearsOn="ArtistShowAlbumsAppearsOn",e.ArtistShowAlbumsCompilation="ArtistShowAlbumsCompilation",e.ArtistShowAlbumsSingle="ArtistShowAlbumsSingle",e.ArtistShowRelatedArtists="ArtistShowRelatedArtists",e.ArtistShowTopTracks="ArtistShowTopTracks",e.ArtistUserPresetAdd="ArtistUserPresetAdd",e.TrackCopyPresetToClipboard="TrackCopyPresetToClipboard",e.TrackCopyPresetJsonToClipboard="TrackCopyPresetJsonToClipboard",e.TrackCopyUriToClipboard="TrackCopyUriToClipboard",e.TrackFavoriteAdd="TrackFavoriteAdd",e.TrackFavoriteRemove="TrackFavoriteRemove",e.TrackFavoriteUpdate="TrackFavoriteUpdate",e.TrackSearchPlaylists="TrackSearchPlaylists",e.TrackSearchRadio="TrackSearchRadio",e.TrackUserPresetAdd="TrackUserPresetAdd"}(Cr||(Cr={}));class kr extends fr{render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Artist &quot;${this.track?.artists[0].name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Cr.ArtistFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Artist &quot;${this.track?.artists[0].name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Cr.ArtistFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Album &quot;${this.track?.album.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Cr.AlbumFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Album &quot;${this.track?.album.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Cr.AlbumFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `;this.actionTrackFavoriteAdd=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Track &quot;${this.track?.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Cr.TrackFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,this.actionTrackFavoriteRemove=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Track &quot;${this.track?.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Cr.TrackFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `;const r=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${$i}
          .label="View Artist &quot;${this.track?.artists[0].name}&quot; info on Spotify.com"
          @click=${()=>yi(this.track?.artists[0].external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,o=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ti}
          .label="View Album &quot;${this.track?.album.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.track?.album.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,a=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Di}
          .label="View Track &quot;${this.track?.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.track?.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,n=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Track Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.TrackSearchPlaylists)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Search Playlists for Track
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.TrackSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Track Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.TrackUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Track to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.TrackCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Track Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.TrackCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Track Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.TrackCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Track URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,l=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Album Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumPlay)}>
          <ha-svg-icon slot="icon" .path=${Vi}></ha-svg-icon>
          Play Album
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Album
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumShowTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Album Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Album Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Album to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Album Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Album Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.AlbumCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Album URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,c=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Artist Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Artist
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistSearchPlaylists)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Search Playlists for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistSearchTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Search Tracks for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Artist Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistShowTopTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Artist Top Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistShowAlbums)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistShowAlbumsCompilation)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Compilations
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistShowAlbumsSingle)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Singles
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistShowAlbumsAppearsOn)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums AppearsOn
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistShowRelatedArtists)} hide=${this.hideSearchType(wi.ARTISTS)}>
          <ha-svg-icon slot="icon" .path=${$i}></ha-svg-icon>
          Show Related Artists
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Artist to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Cr.ArtistCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Artist URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,d=B`
      <div class="media-info-content">
        <div class="media-info-details">
          <div class="media-info-text-ms-c">
            ${a}
            ${this.track?.name}
            ${this.isTrackFavorite?this.actionTrackFavoriteRemove:this.actionTrackFavoriteAdd}
            <span class="actions-dropdown-menu">
              ${n}
            </span>
          </div>
          <div class="media-info-text-ms">
            ${o}
            ${this.track?.album.name}
            ${this.isAlbumFavorite?s:i}
            <span class="actions-dropdown-menu">
              ${l}
            </span>
          </div>
          <div class="media-info-text-ms">
            ${r}
            ${this.track?.artists[0].name}
            ${this.isArtistFavorite?t:e}
            <span class="actions-dropdown-menu">
              ${c}
            </span>
          </div>
          <div class="grid track-info-grid">
            <div class="grid-action-info-hdr-s">Track #</div>
            <div class="grid-action-info-text-s">${this.track?.track_number||"unknown"}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Duration</div>
            <div class="grid-action-info-text-s">${si(this.track?.duration_ms||0)}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Released</div>
            <div class="grid-action-info-text-s">${this.track?.album.release_date}</div>

            <div class="grid-action-info-hdr-s">Disc #</div>
            <div class="grid-action-info-text-s">${this.track?.disc_number||"unknown"}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Explicit</div>
            <div class="grid-action-info-text-s">${this.track?.explicit||!1}</div>
            <div class="grid-action-info-text-s">&nbsp;</div>
            <div class="grid-action-info-hdr-s">Links</div>
            <div class="grid-action-info-text-s">
              <ha-icon-button
                .path=${$i}
                label="View Artist &quot;${this.track?.artists[0].name}&quot; info on Spotify.com"
                @click=${()=>yi(this.track?.artists[0].external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
              <ha-icon-button style="padding-left:10px;"
                .path=${Ti}
                label="View Album &quot;${this.track?.album.name}&quot; info on Spotify.com"
                @click=${()=>yi(this.track?.album.external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
              <ha-icon-button style="padding-left:10px;"
                .path=${Di}
                label="View Track &quot;${this.track?.name}&quot; info on Spotify.com"
                @click=${()=>yi(this.track?.external_urls.spotify||"")}
                slot="media-info-icon-link-s"
              ></ha-icon-button>
            </div>

            <div class="grid-action-info-hdr-s">URI</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.track?.uri}</div>

            ${this.track?.is_linked_from?B`
              <div class="grid-action-info-hdr-s">Origin URI</div>
              <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.track?.uri_origin}</div>
            `:""}

            <div class="grid-action-info-hdr-s">Art URL</div>
            <div class="grid-action-info-text-s colspan-c2-end copy2cb" @click=${pi}>${this.track?.image_url}</div>

          </div>
        </div>
      </div>
     `;return B` 
      <div class="player-body-container" hide=${this.isPlayerStopped}>
        <div class="player-body-container-scrollable">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>"track"==this.player.attributes.sp_item_type?B`${d}`:B``)()}
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .track-info-grid {
        grid-template-columns: auto auto 30px auto auto 30px auto auto;
        justify-content: left;
      }

      .colspan-c2-end {
        grid-column: 2 / 9; /* grid columns 2 thru 8 */
      }
    `]}async onClickAction(e){try{if(this.isCardInEditPreview)return!1;if(e==Cr.AlbumCopyPresetToClipboard)return Zt(Cs(this.track?.album,this.track?.album.artists[0].name)),this.alertInfoSet(Ae),!0;if(e==Cr.AlbumCopyPresetJsonToClipboard)return Zt(xs(this.track?.album,this.track?.album.artists[0].name)),this.alertInfoSet(we),!0;if(e==Cr.AlbumCopyUriToClipboard)return Zt(this.track?.album.uri||""),!0;if(e==Cr.AlbumSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.track?.album.name+ge+this.track?.artists[0].name)),!0;if(e==Cr.AlbumShowTracks)return this.dispatchEvent(os(wi.ALBUM_TRACKS,this.track?.album.name+"; "+this.track?.artists[0].name,this.track?.album.name,this.track?.album.uri,null,this.track?.album)),!0;if(e==Cr.ArtistCopyPresetToClipboard)return Zt(Cs(this.track?.artists[0])),this.alertInfoSet(Ae),!0;if(e==Cr.ArtistCopyPresetJsonToClipboard)return Zt(xs(this.track?.artists[0])),this.alertInfoSet(we),!0;if(e==Cr.ArtistCopyUriToClipboard)return Zt(this.track?.artists[0].uri||""),!0;if(e==Cr.ArtistSearchPlaylists)return this.dispatchEvent(os(wi.PLAYLISTS,this.track?.artists[0].name)),!0;if(e==Cr.ArtistSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.track?.artists[0].name+ge)),!0;if(e==Cr.ArtistSearchTracks)return this.dispatchEvent(os(wi.TRACKS,this.track?.artists[0].name)),!0;if(e==Cr.ArtistShowAlbums)return this.dispatchEvent(os(wi.ARTIST_ALBUMS,this.track?.artists[0].name,this.track?.artists[0].name,this.track?.artists[0].uri)),!0;if(e==Cr.ArtistShowAlbumsAppearsOn)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_APPEARSON,this.track?.artists[0].name,this.track?.artists[0].name,this.track?.artists[0].uri)),!0;if(e==Cr.ArtistShowAlbumsCompilation)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_COMPILATION,this.track?.artists[0].name,this.track?.artists[0].name,this.track?.artists[0].uri)),!0;if(e==Cr.ArtistShowAlbumsSingle)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_SINGLE,this.track?.artists[0].name,this.track?.artists[0].name,this.track?.artists[0].uri)),!0;if(e==Cr.ArtistShowRelatedArtists)return this.dispatchEvent(os(wi.ARTIST_RELATED_ARTISTS,this.track?.artists[0].name,this.track?.artists[0].name,this.track?.artists[0].uri)),!0;if(e==Cr.ArtistShowTopTracks)return this.dispatchEvent(os(wi.ARTIST_TOP_TRACKS,this.track?.artists[0].name,this.track?.artists[0].name,this.track?.artists[0].uri)),!0;if(e==Cr.TrackCopyPresetToClipboard)return Zt(Cs(this.track,this.track?.artists[0].name)),this.alertInfoSet(Ae),!0;if(e==Cr.TrackCopyPresetJsonToClipboard)return Zt(xs(this.track,this.track?.artists[0].name)),this.alertInfoSet(we),!0;if(e==Cr.TrackCopyUriToClipboard)return Zt(this.track?.uri||""),!0;if(e==Cr.TrackSearchPlaylists)return this.dispatchEvent(os(wi.PLAYLISTS,this.track?.name+" "+this.track?.artists[0].name)),!0;if(e==Cr.TrackSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.track?.name+ge+this.track?.artists[0].name)),!0;if(this.progressShow(),e==Cr.AlbumUserPresetAdd)this.store.config.userPresets?.unshift(Ss(this.track?.album)),await Os(this.store.config),this.progressHide();else if(e==Cr.AlbumFavoriteAdd)await this.spotifyPlusService.SaveAlbumFavorites(this.player,this.track?.album.id),this.updateActions(this.player,[Cr.AlbumFavoriteUpdate]);else if(e==Cr.AlbumFavoriteRemove)await this.spotifyPlusService.RemoveAlbumFavorites(this.player,this.track?.album.id),this.updateActions(this.player,[Cr.AlbumFavoriteUpdate]);else if(e==Cr.AlbumPlay)await this.spotifyPlusService.PlayerMediaPlayContext(this.player,this.track?.album.uri),this.progressHide(),this.store.card.SetSection(Yt.PLAYER);else if(e==Cr.AlbumPlayTrackFavorites){const e=this.store.config.albumFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,null,this.track?.album.uri),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else if(e==Cr.ArtistUserPresetAdd)this.track&&(this.track.artists[0].image_url=this.track?.album.image_url,this.store.config.userPresets?.unshift(Ss(this.track?.artists[0])),await Os(this.store.config),this.progressHide());else if(e==Cr.ArtistFavoriteAdd)await this.spotifyPlusService.FollowArtists(this.player,this.track?.artists[0].id),this.updateActions(this.player,[Cr.ArtistFavoriteUpdate]);else if(e==Cr.ArtistFavoriteRemove)await this.spotifyPlusService.UnfollowArtists(this.player,this.track?.artists[0].id),this.updateActions(this.player,[Cr.ArtistFavoriteUpdate]);else if(e==Cr.ArtistPlayTrackFavorites){const e=this.store.config.artistFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,this.track?.artists[0].uri,null),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else e==Cr.TrackUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.track)),await Os(this.store.config),this.progressHide()):e==Cr.TrackFavoriteAdd?(await this.spotifyPlusService.SaveTrackFavorites(this.player,this.track?.id),this.updateActions(this.player,[Cr.TrackFavoriteUpdate])):e==Cr.TrackFavoriteRemove?(await this.spotifyPlusService.RemoveTrackFavorites(this.player,this.track?.id),this.updateActions(this.player,[Cr.TrackFavoriteUpdate])):this.progressHide();return!0}catch(e){return this.progressHide(),this.alertErrorSet("Track action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(Cr.GetPlayingItem)||0==t.length){this.isAlbumFavorite=void 0,this.isArtistFavorite=void 0,this.isTrackFavorite=void 0;const t=new Promise((t,i)=>{const s=ys(this.player.attributes.media_content_id);this.spotifyPlusService.GetTrack(e,s).then(i=>{this.track=i,setTimeout(()=>{this.updateActions(e,[Cr.TrackFavoriteUpdate,Cr.AlbumFavoriteUpdate,Cr.ArtistFavoriteUpdate])},50),t(!0)}).catch(e=>{this.track=void 0,this.alertErrorSet("Get Track call failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Cr.AlbumFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckAlbumFavorites(e,this.track?.album.id).then(e=>{this.isAlbumFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isAlbumFavorite=void 0,this.alertErrorSet("Check Album Favorites failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Cr.ArtistFavoriteUpdate)){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckArtistsFollowing(e,this.track?.artists[0].id).then(e=>{this.isArtistFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isArtistFavorite=void 0,this.alertErrorSet("Check Artist Favorites failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Cr.TrackFavoriteUpdate)){const t=new Promise((t,i)=>{let s=this.track?.id;this.track?.is_linked_from&&(s=this.track?.id+","+this.track?.id_origin),this.spotifyPlusService.CheckTrackFavorites(e,s).then(e=>{const i=Object.keys(e);this.isTrackFavorite=e[i[0]],i.length>1&&(this.isTrackFavorite=e[i[0]]||e[i[1]]),t(!0)}).catch(e=>{this.isTrackFavorite=void 0,this.alertErrorSet("Check Track Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide(),this.updateActionsComplete(t)}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Track actions refresh failed: "+ui(e)),!0}}}Ce([Ve()],kr.prototype,"isAlbumFavorite",void 0),Ce([Ve()],kr.prototype,"isArtistFavorite",void 0),Ce([Ve()],kr.prototype,"isTrackFavorite",void 0),Ce([Ve()],kr.prototype,"track",void 0),customElements.define("crm-player-body-track",kr);const $r=_e(ce+":player-controls"),{NEXT_TRACK:Tr,PAUSE:Er,PLAY:Pr,PREVIOUS_TRACK:_r,REPEAT_SET:Lr,SHUFFLE_SET:Rr,TURN_ON:Fr,TURN_OFF:Or}=gs,Mr=9e11,Hr=99e10,Br=999e9;class Dr extends es{getControlLanguage(){const e=String(this.config?.language||"auto").toLowerCase(),t="auto"===e?String(this.store.hass?.locale?.language||this.store.hass?.language||"en").toLowerCase():e;return t.startsWith("de")?"de":t.startsWith("pt")?"pt":"en"}controlLabel(e){const t={favorites:{de:"Favoriten",pt:"Favoritos",en:"Favorites"},shuffle:{de:"Zufallswiedergabe",pt:"Reprodução aleatória",en:"Shuffle"},previous:{de:"Vorheriger Titel",pt:"Faixa anterior",en:"Previous Track"},play:{de:"Wiedergabe starten",pt:"Reproduzir",en:"Play"},pause:{de:"Pausieren",pt:"Pausar",en:"Pause"},next:{de:"Nächster Titel",pt:"Próxima faixa",en:"Next Track"},repeat:{de:"Wiederholen",pt:"Repetir",en:"Repeat"},queue:{de:"Wiedergabewarteschlange",pt:"Fila de reprodução",en:"Play Queue"},turnOn:{de:"Einschalten",pt:"Ligar",en:"Turn On"},turnOff:{de:"Ausschalten",pt:"Desligar",en:"Turn Off"},devices:{de:"Geräte",pt:"Dispositivos",en:"Devices"},queuePreview:{de:"Die Wiedergabewarteschlange ist während der Kartenbearbeitung nicht verfügbar.",pt:"A fila de reprodução não está disponível durante a edição do cartão.",en:"The play queue is unavailable while editing the card."}};return t[e]?.[this.getControlLanguage()]||t[e]?.en||e}render(){this.config=this.store.config,this.player=this.store.player,this.mediaControlService=this.store.mediaControlService,this.spotifyPlusService=this.store.spotifyPlusService;const e=[vs.ON,vs.PLAYING,vs.PAUSED,vs.BUFFERING].includes(this.player.state)&&V,t=[vs.IDLE].includes(this.player.state)&&V,i=[vs.OFF].includes(this.player.state)&&V,s=[ms.ONE,ms.ALL].includes(this.player.attributes.repeat||ms.OFF),r=this.player.attributes.shuffle,o=this.player.state==vs.PAUSED,a=this.player.state==vs.OFF,n=this.isActionFavoritesVisible,l=this.isQueueItemsVisible;return B`
      <div class="player-controls-container" style=${this.styleContainer(t,i)}>
          <div class="icons" hide=${e}>
              <ha-icon-button @click=${()=>this.onClickAction(Mr)}   hide=${this.hideFeature(Mr)}   .path=${n?Oi:Mi} label=${this.controlLabel("favorites")} style=${this.styleIcon(n)}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Rr)}    hide=${this.hideFeature(Rr)}    .path=${this.getShuffleIcon()} label=${this.controlLabel("shuffle")} style=${this.styleIcon(r)}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(_r)} hide=${this.hideFeature(_r)} .path=${"M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z"} label=${this.controlLabel("previous")} style=${this.styleIcon()}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Pr)}           hide=${this.hideFeature(Pr)}           .path=${Vi} label=${this.controlLabel("play")} class="play-pause" style=${this.styleIcon(o,!0)}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Er)}          hide=${this.hideFeature(Er)}          .path=${"M14,19H18V5H14M6,19H10V5H6V19Z"} label=${this.controlLabel("pause")} class="play-pause" style=${this.styleIcon(!1,!0)}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Tr)}     hide=${this.hideFeature(Tr)}     .path=${"M16,18H18V6H16M6,18L14.5,12L6,6V18Z"} label=${this.controlLabel("next")} style=${this.styleIcon()}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Lr)}     hide=${this.hideFeature(Lr)}     .path=${this.getRepeatIcon()} label=${this.controlLabel("repeat")} style=${this.styleIcon(s)} ></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Hr)}     hide=${this.hideFeature(Hr)}     .path=${Ui} label=${this.controlLabel("queue")} style=${this.styleIcon(l)} ></ha-icon-button>
          </div>
          <div class="iconsPower" hide=${i}>
              <ha-icon-button @click=${()=>this.onClickAction(Fr)}        hide=${this.hideFeature(Fr)}        .path=${Wi} label=${this.controlLabel("turnOn")} style=${this.styleIcon(a)}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Br)}        hide=${this.hideFeature(Br)}        .path=${Gi} label=${this.controlLabel("devices")} style=${this.styleIcon()}></ha-icon-button>
          </div>
          <div class="iconsPower" hide=${t}>
              <ha-icon-button @click=${()=>this.onClickAction(Or)}       hide=${this.hideFeature(Or)}       .path=${Wi} label=${this.controlLabel("turnOff")} style=${this.styleIcon()}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Pr)}           hide=${this.hideFeature(Pr)}           .path=${Vi} label=${this.controlLabel("play")} class="play-pause" style=${this.styleIcon(!0,!0)}></ha-icon-button>
              <ha-icon-button @click=${()=>this.onClickAction(Br)}        hide=${this.hideFeature(Br)}        .path=${Gi} label=${this.controlLabel("devices")} style=${this.styleIcon()}></ha-icon-button>
          </div>
      </div>
      <div class="player-volume-container" style=${this.styleContainer(t,i)}>
          <div class="iconsVolume" hide=${e}>
              <crm-player-volume hide=${e} .store=${this.store} .player=${this.player}></crm-player-volume>
          </div>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
        width: 100%;
        box-sizing: border-box;
      }

      .player-controls-container,
      .player-volume-container {
        width: 100%;
        max-width: var(--crm-player-controls-max-width, 40rem);
        min-width: 0;
        box-sizing: border-box;
        text-align: center;
      }

      .player-controls-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icons,
      .iconsPower {
        display: inline-flex;
        align-items: center;
        justify-content: var(--crm-player-controls-icon-justify-content, center);
        gap: 2px;
        min-width: 0;
        max-width: 100%;
        color: var(--crm-player-controls-icon-color, #edf7f0);
        --ha-icon-button-size: 32px;
        --mdc-icon-size: 20px;
        mix-blend-mode: normal;
      }

      .icons > ha-icon-button,
      .iconsPower > ha-icon-button {
        flex: 0 0 auto;
        border-radius: 999px;
        transition: background-color 160ms ease, transform 160ms ease;
      }

      .icons > ha-icon-button:hover,
      .iconsPower > ha-icon-button:hover {
        background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 12%, transparent);
      }

      .icons > ha-icon-button:active,
      .iconsPower > ha-icon-button:active {
        transform: scale(0.94);
      }

      .icons > ha-icon-button.play-pause,
      .iconsPower > ha-icon-button.play-pause {
        background-color: var(--crm-accent, #40d99a);
        color: var(--crm-play-icon-contrast, #102019) !important;
        --mdc-icon-button-icon-color: var(--crm-play-icon-contrast, #102019);
        --mdc-icon-button-ink-color: var(--crm-play-icon-contrast, #102019);
        --ha-icon-button-size: 36px;
        --mdc-icon-size: 22px;
        margin: 0 3px;
      }

      .icons > ha-icon-button.play-pause:hover,
      .iconsPower > ha-icon-button.play-pause:hover {
        filter: brightness(1.08);
      }

      .iconsVolume {
        display: block;
        min-width: 0;
        width: 100%;
        color: var(--crm-player-controls-icon-color, #edf7f0);
        --ha-icon-button-size: 32px;
        --mdc-icon-size: 20px;
      }

      @media (max-width: 520px) {
        .icons, .iconsPower {
          gap: 0;
          --ha-icon-button-size: 28px;
          --mdc-icon-size: 18px;
        }
        .icons > ha-icon-button.play-pause,
        .iconsPower > ha-icon-button.play-pause {
          --ha-icon-button-size: 34px;
          margin: 0 1px;
        }
      }

      *[hide] {
        display: none;
      }

      .flex-1 {
        flex: 1;
      }
    `}constructor(){super(),this.onKeyDown_EventListenerBound=this.onKeyDown.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onKeyDown_EventListenerBound)}disconnectedCallback(){document.removeEventListener("keydown",this.onKeyDown_EventListenerBound),super.disconnectedCallback()}update(e){super.update(e);Array.from(e.keys()).includes("mediaContentId")&&setTimeout(()=>{this.toggleDisplayPlayerBodyQueue()},50)}toggleDisplayActionFavorites(){const e=this.parentElement?.querySelector(".player-section-body-content");e&&(e.style.display=this.isActionFavoritesVisible?"block":"none",e.style.opacity=this.isActionFavoritesVisible?"1":"0")}toggleDisplayPlayerBodyQueue(){const e=this.parentElement?.querySelector("#elmPlayerBodyQueue");e?(e.style.display=this.isQueueItemsVisible?"block":"none",e.style.opacity=this.isQueueItemsVisible?"1":"0",this.isQueueItemsVisible?($r("toggleDisplayPlayerBodyQueue - calling for refresh of queue items"),e.refreshQueueItems()):$r("toggleDisplayPlayerBodyQueue - queue items not visible; isQueueItemsVisible = %s",JSON.stringify(this.isQueueItemsVisible))):$r("toggleDisplayPlayerBodyQueue - could not find queue items #elmPlayerBodyQueue selector!")}onKeyDown(e){"Escape"===e.key&&(this.isActionFavoritesVisible?this.onClickAction(Mr):this.isQueueItemsVisible&&this.onClickAction(Hr))}async onClickAction(e){try{if(e==Mr){if(this.isCardInEditPreview){const e=this.getControlLanguage();return this.alertInfoSet(e.startsWith("pt")?"Os favoritos não estão disponíveis durante a edição do cartão.":e.startsWith("de")?"Favoriten sind während der Kartenbearbeitung nicht verfügbar.":"Favorites are unavailable while editing the card."),!0}return this.isActionFavoritesVisible=!this.isActionFavoritesVisible,$r.enabled&&$r("update - action favorites toggled - isActionFavoritesVisible = %s",JSON.stringify(this.isActionFavoritesVisible)),this.isQueueItemsVisible?($r("update - queue items visible; imediately closing queue items, and delay opening action favorites"),this.isQueueItemsVisible=!1,this.toggleDisplayPlayerBodyQueue(),setTimeout(()=>{this.toggleDisplayActionFavorites()},250)):($r("update - queue items not visible; immediately toggling action favorites"),this.toggleDisplayActionFavorites()),!0}if(e==Br)this.store.card.SetSection(Yt.DEVICES);else if(e==Hr)return this.isCardInEditPreview?(this.alertInfoSet(this.controlLabel("queuePreview")),!0):(this.isQueueItemsVisible=!this.isQueueItemsVisible,$r.enabled&&$r("update - queue items toggled - isQueueItemsVisible = %s",JSON.stringify(this.isQueueItemsVisible)),this.isActionFavoritesVisible?($r("update - action favorites visible; imeediately closing action favorites, and delay opening queue items"),this.isActionFavoritesVisible=!1,this.toggleDisplayActionFavorites(),setTimeout(()=>{this.toggleDisplayPlayerBodyQueue()},250)):($r("update - action favorites not visible; immediately opening queue items"),this.toggleDisplayPlayerBodyQueue()),!0);if(this.progressShow(),e==Er)await this.spotifyPlusService.PlayerMediaPause(this.player,null);else if(e==Pr)await this.spotifyPlusService.PlayerMediaResume(this.player,null);else if(e==Tr)await this.spotifyPlusService.PlayerMediaSkipNext(this.player,null);else if(e==_r){const e=this.player?.attributes.media_position||0,t=this.player?.isPlaying(),i=this.player?.attributes.media_position_updated_at||0;let s=e;t&&(s=e+(Date.now()-new Date(i).getTime())/1e3),s>8?await this.spotifyPlusService.PlayerMediaSeek(this.player,null,0,0):await this.spotifyPlusService.PlayerMediaSkipPrevious(this.player,null)}else if(e==Lr){let e=ms.OFF;this.player.attributes.repeat==ms.OFF?e=ms.ONE:this.player.attributes.repeat==ms.ONE?e=ms.ALL:this.player.attributes.repeat==ms.ALL&&(e=ms.OFF),await this.mediaControlService.repeat_set(this.player,e)}else e==Rr?await this.mediaControlService.shuffle_set(this.player,!this.player.attributes.shuffle):e==Or?await this.spotifyPlusService.turn_off(this.player):e==Fr&&await this.spotifyPlusService.turn_on(this.player);return this.progressHide(),!0}catch(e){return this.alertErrorSet("Control action failed: "+ui(e)),this.progressHide(),!0}}hideFeature(e){if(e==Er){if(this.player.supportsFeature(Er)){if(this.player.state==vs.PAUSED)return;return this.config.playerControlsHidePlayPause||V}}else if(e==Pr){if(this.player.supportsFeature(Pr)){if(this.player.state==vs.PLAYING)return;return this.config.playerControlsHidePlayPause||V}}else if(e==Tr){if(this.player.supportsFeature(Tr))return this.config.playerControlsHideTrackNext||V}else if(e==_r){if(this.player.supportsFeature(_r))return this.config.playerControlsHideTrackPrev||V}else if(e==Lr){if(this.player.supportsFeature(Lr))return this.config.playerControlsHideRepeat||V}else if(e==Rr){if(this.player.supportsFeature(Rr))return this.config.playerControlsHideShuffle||V}else{if(e==Mr)return this.config.playerControlsHideFavorites||V;if(e==Hr)return this.config.playerControlsHidePlayQueue||V;if(e==Fr){if(this.player.supportsFeature(Fr))return![vs.OFF,vs.STANDBY].includes(this.player.state)||(!!this.config.playerVolumeControlsHidePower||V)}else if(e==Or){if(this.player.supportsFeature(Or))return![vs.IDLE].includes(this.player.state)||(!!this.config.playerVolumeControlsHidePower||V)}else if(e==Br&&this.config.playerMinimizeOnIdle&&this.config.sections?.includes(Yt.DEVICES))return V}return!0}alertInfoSet(e){const t=di("#spcPlayer",this);t&&t.alertInfoSet(e)}alertErrorSet(e){const t=di("#spcPlayer",this);t&&t.alertErrorSet(e)}getRepeatIcon(){return this.player.attributes.repeat==ms.ALL?"M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z":this.player.attributes.repeat==ms.ONE?"M13,15V9H12L10,10V11H11.5V15M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z":"M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z"}getShuffleIcon(){return this.player.attributes.shuffle?"M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z":"M16,4.5V7H5V9H16V11.5L19.5,8M16,12.5V15H5V17H16V19.5L19.5,16"}styleContainer(e,t){const i={"margin-bottom":"0px"};return this.config.playerMinimizeOnIdle&&(e||t)&&(i.margin="0px",i.padding="2px"),Me(i)}styleIcon(e=null,t=!1){const i={},s=this.config.playerControlsIconMargin;if(s&&(i.margin=`${s}`),e&&!t&&(i.color=`var(--crm-player-controls-icon-toggle-color, ${be})`),t){const e="var(--crm-play-icon-contrast, #102019)";i.color=e,i["--mdc-icon-button-icon-color"]=e,i["--mdc-icon-button-ink-color"]=e}return Me(i)}}Ce([De({attribute:!1})],Dr.prototype,"mediaContentId",void 0),Ce([Ve()],Dr.prototype,"isActionFavoritesVisible",void 0),Ce([Ve()],Dr.prototype,"isQueueItemsVisible",void 0),customElements.define("crm-player-controls",Dr);const{TURN_OFF:Vr,TURN_ON:Ur,VOLUME_MUTE:zr,VOLUME_SET:Nr,VOLUME_STEP:Wr}=gs,qr=9e11,Gr=900000000001;class jr extends es{constructor(){super(...arguments),this.slim=!1}render(){this.config=this.store.config,this.spotifyPlusService=this.store.spotifyPlusService;const e=this.config.playerVolumeControlsHideMute||!1,t=this.config.playerVolumeControlsHideLevels||!1,i=this.player.isMuted()?"M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z":"M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z",s=this.config.playerVolumeControlsShowPlusMinus&&!0,r=this.player.state==vs.OFF,o=this.player.attributes.is_volume_muted,a=this.player.getVolume();return B`
      <div class="volume-container icons" slim=${this.slim||V}>
        ${e?B``:B`
          <ha-icon-button
            hide=${this.hideFeature(zr)}
            @click=${this.onMuteClick} 
            .path=${i} 
            label="Mute Toggle"
            style=${this.styleIcon(o)}></ha-icon-button>
          `}
        ${s?B`
          <ha-icon-button .path=${"M3,9H7L12,4V20L7,15H3V9M14,11H22V13H14V11Z"} @click=${()=>this.onClickAction(qr)} hide=${this.hideFeature(Wr)} label="Decrease"></ha-icon-button>
          `:B``}
        <div class="volume-slider" hide=${this.hideFeature(Nr)} style=${this.styleVolumeSlider()}>
          <ha-control-slider
            .value=${a}
            step=${1}
            min=${0}
            max=${100}
            @value-changed=${this.onVolumeValueChanged}
          ></ha-control-slider>
          ${t?B``:B`
            <div class="volume-level">
              <span class="volume-level-pct">${a}%</span>
            </div>
          `}
        </div>
        ${s?B`
          <ha-icon-button .path=${"M3,9H7L12,4V20L7,15H3V9M14,11H17V8H19V11H22V13H19V16H17V13H14V11Z"} @click=${()=>this.onClickAction(Gr)} hide=${this.hideFeature(Wr)} label="Increase"></ha-icon-button>
          `:B``}
        <ha-icon-button .path=${Wi} @click=${()=>this.onClickAction(Ur)}  hide=${this.hideFeature(Ur)}  label="Turn On"  style=${this.styleIcon(r)}></ha-icon-button>
        <ha-icon-button .path=${Wi} @click=${()=>this.onClickAction(Vr)} hide=${this.hideFeature(Vr)} label="Turn Off" style=${this.styleIcon()}></ha-icon-button>
      </div>
    `}async onVolumeValueChanged(e){try{this.progressShow();let t=Number.parseInt(e?.target?.value);const i=this.config.playerVolumeMaxValue||100;if(t>i){t=i;const s=e?.target;s&&(s.value=t+""),this.alertInfoSet("Selected volume level was greater than Max Volume limit set in card configuration; max limit value of "+i+" was applied.")}return await this.spotifyPlusService.volume_set(this.player,t),!0}catch(e){return this.alertErrorSet("Volume set failed: "+ui(e)),!0}finally{this.progressHide()}}async onMuteClick(){try{return this.progressShow(),await this.spotifyPlusService.volume_mute_toggle(this.player),!0}catch(e){return this.alertErrorSet("Volume mute failed: "+ui(e)),!0}finally{this.progressHide()}}styleVolumeSlider(){if(this.config.playerVolumeControlsHideSlider||!1)return"display: none"}async onClickAction(e){try{return this.progressShow(),e==Vr?await this.spotifyPlusService.turn_off(this.player):e==Ur?await this.spotifyPlusService.turn_on(this.player):e==qr?await this.spotifyPlusService.volume_down(this.player):e==Gr&&await this.spotifyPlusService.volume_up(this.player),!0}catch(e){return this.alertErrorSet("Volume action failed: "+ui(e)),!0}finally{this.progressHide()}}hideFeature(e){if(e==Ur){if(this.player.supportsFeature(Ur))return![vs.OFF,vs.UNKNOWN,vs.STANDBY].includes(this.player.state)||(!!this.config.playerVolumeControlsHidePower||V)}else if(e==Vr){if(this.player.supportsFeature(Vr))return!![vs.OFF,vs.UNKNOWN,vs.STANDBY].includes(this.player.state)||(!!this.config.playerVolumeControlsHidePower||V)}else if(e==zr){if(this.player.supportsFeature(zr))return V}else if(e==Nr){if(this.player.supportsFeature(Nr))return V}else if(e==Wr&&this.player.supportsFeature(Wr))return V;return!0}alertErrorSet(e){const t=di("#spcPlayer",this);t&&t.alertErrorSet(e)}alertInfoSet(e){const t=di("#spcPlayer",this);t&&t.alertInfoSet(e)}styleIcon(e=null){const t={},i=this.config.playerControlsIconMargin;return i&&(t.margin=`${i}`),e&&(t.color=`var(--crm-player-controls-icon-toggle-color, ${be})`),Me(t)}static get styles(){return a`
      ha-control-slider {
        display: block;
        width: 100%;
        --control-slider-color: var(--crm-player-volume-slider-color, #34d399);
        --control-slider-thickness: 6px;
        --control-slider-border-radius: 999px;
        border: none;
        box-sizing: border-box;
      }

      ha-control-slider[disabled] {
        --control-slider-color: var(--disabled-text-color);
        --control-slider-thickness: 6px;
        border: none;
      }

      .volume-container {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        min-width: 0;
      }

      .volume-slider {
        flex: 1 1 auto;
        min-width: 0;
        color: var(--crm-player-volume-label-color, #d1fae5);
      }

      .volume-level {
        display: flex;
        justify-content: flex-end;
        margin-top: 1px;
        font-size: 11px;
        line-height: 1.2;
      }

      .volume-level-pct {
        color: var(--crm-player-volume-label-color, #a3b8af);
        font-variant-numeric: tabular-nums;
      }

      *[slim] * {
        --control-slider-thickness: 6px;
        --ha-icon-button-size: 30px;
        --mdc-icon-size: 20px;
      }

      *[slim] .volume-level {
        display: none;
      }

      *[slim] .volume-slider {
        display: flex;
        align-items: center;
      }

      .icons {
        justify-content: center;
        display: flex;
        align-items: center;
        mix-blend-mode: normal;
        overflow: hidden;
        color: var(--crm-player-controls-icon-color, #ffffff);
        width: 100%;
        --ha-icon-button-size: var(--crm-player-controls-icon-button-size, ${o("2.75rem")});
        --mdc-icon-size: var(--crm-player-controls-icon-size, ${o(fe)});
      }

      *[hide] {
        display: none;
      }
    `}}Ce([De({attribute:!1})],jr.prototype,"player",void 0),Ce([De()],jr.prototype,"slim",void 0),customElements.define("crm-player-volume",jr);let Jr=class extends es{idleLabels(){const e=(this.config.language||"auto").toLowerCase(),t="auto"===e?(this.store.hass?.locale?.language||this.store.hass?.language||"en").toLowerCase():e;return t.startsWith("pt")?{title:"Pronto para ouvir música",subtitle:"Escolha suas músicas favoritas"}:t.startsWith("de")?{title:"Bereit für Musik",subtitle:"Wähle deine Lieblingsmusik"}:{title:"Ready for music",subtitle:"Choose your favorite music"}}render(){this.config=this.store.config,this.player=this.store.player;const e=this.player.isPoweredOffOrIdle(),t=this.player.attributes.entity_picture||this.player.attributes.entity_picture_local,i=!e&&t?this.store.hass.hassUrl(t):"/local/Bild%20f%C3%BCr%20Spotify.jpg",s=this.idleLabels(),r=!e&&this.player.attributes.media_title?this.player.attributes.media_title:s.title,o=!e&&this.player.attributes.media_artist?this.player.attributes.media_artist:s.subtitle,a=this.player.attributes.source||"Wohnung Musik";return B`
      <div class="player-section-container ${e?"is-idle":"is-active"}"
           style=${this.stylePlayerSection()}>
        <div class="player-artwork" style=${Me({"background-image":`url("${i}")`})}></div>
        <div class="player-artwork-overlay"></div>

        <div class="player-content">
          <div class="player-source">
            <ha-icon icon="mdi:speaker-wireless"></ha-icon>
            <span>${a}</span>
            <span class="source-indicator ${e?"offline":""}"></span>
          </div>

          <div class="player-info">
            <div class="player-title">${r}</div>
            <div class="player-artist">${o}</div>
          </div>

          <div class="player-alert-bgcolor">
            ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
            ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          </div>

          <div class="player-bottom">
            <crm-player-controls
              class="player-section-controls"
              style=${this.stylePlayerControls()}
              .store=${this.store}
              .mediaContentId=${this.mediaContentId}
            ></crm-player-controls>
            <div class="player-progress-wrap">
              ${e?B`<div class="idle-progress"></div>`:B`
                <crm-player-progress .store=${this.store}></crm-player-progress>
              `}
            </div>
          </div>
        </div>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
        height: auto;
      }

      .player-section-container {
        position: relative;
        isolation: isolate;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        min-width: 0;
        min-height: 235px;
        padding: 20px 22px;
        border-radius: 20px;
        border: 1px solid rgba(64, 217, 154, 0.13);
        background: var(--crm-background, #101b19) !important;
        color: var(--crm-text, #f0fdf4);
        text-align: left;
      }

      .player-artwork {
        position: absolute;
        z-index: -2;
        inset: 0 0 0 36%;
        background-size: var(--crm-player-background-size, cover);
        background-position: center;
        background-repeat: no-repeat;
      }

      .player-artwork-overlay {
        position: absolute;
        z-index: -1;
        inset: 0;
        background: linear-gradient(90deg,
          var(--crm-background, #101b19) 0%,
          var(--crm-background-overlay-99, rgba(16,27,25,.99)) 28%,
          var(--crm-background-overlay-89, rgba(16,27,25,.89)) 48%,
          var(--crm-background-overlay-35, rgba(16,27,25,.35)) 76%,
          var(--crm-background-overlay-06, rgba(16,27,25,.06)) 100%);
      }

      .player-content {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 193px;
        width: 100%;
        gap: 14px;
      }

      .player-source {
        display: flex;
        align-items: center;
        gap: 9px;
        color: var(--crm-player-secondary-text, var(--crm-text, #d7e9df));
        font-size: 13px;
        font-weight: 500;
        min-width: 0;
      }
      .player-source ha-icon {
        --mdc-icon-size: 19px;
        color: var(--crm-accent, #40d99a);
      }
      .player-source span:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .source-indicator {
        flex: 0 0 7px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--crm-accent, #40d99a);
      }
      .source-indicator.offline { background: #778c82; }

      .player-info {
        min-width: 0;
        max-width: 67%;
      }
      .player-title {
        color: var(--crm-text, #f7fff9);
        font-size: clamp(19px, 2.6vw, 26px);
        font-weight: 650;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .player-artist {
        margin-top: 5px;
        color: var(--crm-player-secondary-text, var(--crm-text, #b5c9bd));
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .player-alert-bgcolor { background: transparent; }

      .player-bottom {
        margin-top: auto;
        display: flex;
        align-items: flex-end;
        gap: 10px;
        width: 100%;
        min-width: 0;
      }
      .player-section-controls {
        display: block;
        flex: 0 1 auto;
        min-width: 0;
        max-width: 100%;
        background: transparent;
        --crm-player-controls-icon-color: var(--crm-text, #f0fdf4);
        --crm-player-controls-icon-toggle-color: var(--crm-accent, #40d99a);
      }
      .player-progress-wrap {
        flex: 1 1 110px;
        min-width: 80px;
        max-width: 260px;
        align-self: flex-end;
        padding-bottom: 1px;
      }
      .player-progress-wrap crm-player-progress {
        display: block;
        width: 100%;
        --crm-player-progress-slider-color: var(--crm-accent, #40d99a);
      }
      .idle-progress {
        height: 4px;
        border-radius: 99px;
        background: rgba(185, 218, 200, .25);
      }

      /* Mobile: controls and timeline use separate rows instead of widening the dashboard. */
      @media (max-width: 600px) {
        :host {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .player-section-container {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 225px;
          padding: 15px 14px;
          border-radius: 17px;
        }
        .player-content {
          width: 100%;
          min-width: 0;
          min-height: 193px;
          gap: 12px;
        }
        .player-artwork { inset: 0 0 0 26%; }
        .player-artwork-overlay {
          background: linear-gradient(90deg,
            var(--crm-background, #101b19) 0%,
            var(--crm-background-overlay-98, rgba(16,27,25,.98)) 35%,
            var(--crm-background-overlay-78, rgba(16,27,25,.78)) 68%,
            var(--crm-background-overlay-28, rgba(16,27,25,.28)) 100%);
        }
        .player-info { max-width: 88%; }
        .player-title { font-size: 19px; }
        .player-artist { font-size: 12px; }
        .player-bottom {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 7px;
          min-width: 0;
          width: 100%;
        }
        .player-section-controls {
          display: block;
          flex: 0 0 auto;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          --crm-player-controls-icon-size: 21px;
          --crm-player-controls-icon-button-size: 31px;
        }
        .player-section-controls::-webkit-scrollbar { display: none; }
        .player-progress-wrap {
          display: block;
          flex: 0 0 auto;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          align-self: stretch;
          padding-bottom: 0;
        }
        .player-progress-wrap crm-player-progress {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
      }
    `}stylePlayerSection(){const e={},t=this.player.isPoweredOffOrUnknown(),i=this.player.isIdle();let s,r=!1;const o=this.config.customImageUrls?.default,a=this.config.customImageUrls?.playerBackground,n=this.config.customImageUrls?.playerIdleBackground,l=this.config.customImageUrls?.playerOffBackground;let c,d;this.store.player&&(c=this.store.player.attributes.media_content_id,d=this.store.player.attributes.entity_picture||this.store.player.attributes.entity_picture_local,d&&(d=this.store.hass.hassUrl(d))),this.config.playerBackgroundImageSize?e["--crm-player-background-size"]=`${this.config.playerBackgroundImageSize}`:"fill"==this.config.width&&(e["--crm-player-background-size-default"]="contain");const h=this.config.playerControlsMaxWidth;h&&(e["--crm-player-controls-max-width"]=`${h}`);const p=this.config.playerControlsIconJustifyContent;p&&(e["--crm-player-controls-icon-justify-content"]=`${p}`),t?(this.store.card.playerMediaContentId="configImagePlayerBgOff","none"==(l||"").toLowerCase()?e["background-image"]=void 0:l?(e["background-image"]=`url(${l})`,s=l):this.config.playerMinimizeOnIdle?e["background-image"]="var(--crm-player-background-image-off)":(e["background-image"]=`var(--crm-player-background-image-off, url(${ue}))`,e["--crm-player-background-size-default"]=`${me}`,r=!0),this.config.playerBackgroundImageSize&&(e["--crm-player-background-size"]=`${this.config.playerBackgroundImageSize}`)):i?(this.store.card.playerMediaContentId="configImagePlayerBgIdle","none"==(n||"").toLowerCase()?e["background-image"]=void 0:n?(e["background-image"]=`url(${n})`,s=n):this.config.playerMinimizeOnIdle?e["background-image"]="var(--crm-player-background-image-off)":(e["background-image"]=`var(--crm-player-background-image-off, url(${ue}))`,e["--crm-player-background-size-default"]=`${me}`,r=!0),this.config.playerBackgroundImageSize&&(e["--crm-player-background-size"]=`${this.config.playerBackgroundImageSize}`)):a?(this.store.card.playerMediaContentId="configImagePlayerBg","none"==(a||"").toLowerCase()?e["background-image"]=void 0:a&&(e["background-image"]=`url(${a})`,s=a)):d?(this.store.card.playerMediaContentId=c,s=d,e["background-image"]=`var(--crm-player-background-image, url(${d}))`):o?(this.store.card.playerMediaContentId="configImageDefault",s=o,e["background-image"]=`url(${o}`):(this.store.card.playerMediaContentId="BRAND_LOGO_IMAGE_BASE64",this.config.playerMinimizeOnIdle?e["background-image"]="var(--crm-player-background-image-off)":(e["background-image"]=`var(--crm-player-background-image-off, url(${ue}))`,e["--crm-player-background-size-default"]=`${me}`,r=!0),this.config.playerBackgroundImageSize&&(e["--crm-player-background-size"]=`${this.config.playerBackgroundImageSize}`));let u=this.config.playerControlsBackgroundColor;const m=this.config.playerControlsColor,g=this.config.playerControlsIconSize;let v=this.config.playerControlsIconColor;const f=this.config.playerControlsIconToggleColor;let b=this.config.playerHeaderBackgroundColor,y=this.config.playerHeaderTitle1Color;const A=this.config.playerHeaderTitle1FontSize;let w=this.config.playerHeaderTitle2Color;const S=this.config.playerHeaderTitle2FontSize;let C=this.config.playerHeaderTitle3Color;const x=this.config.playerHeaderTitle3FontSize,I=this.config.playerMinimizedTitleColor,k=this.config.playerMinimizedTitleFontSize,$=this.config.playerProgressSliderColor,T=this.config.playerProgressLabelColor,E=this.config.playerProgressLabelFontSize,P=this.config.playerProgressLabelPaddingLR,_=this.config.playerVolumeSliderColor,L=this.config.playerVolumeSliderThickness;let R=this.config.playerVolumeLabelColor;const F=this.config.playerVolumeLabelFontSize;r&&(u=u||"transparent",v=v||"var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)",b=b||"transparent",y=y||"var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)",w=w||"var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)",C=C||"var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)",R=R||"var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)"),this.store.card.playerImage=s,u&&(e["--crm-player-controls-bg-color"]=`${u} `),m&&(e["--crm-player-controls-color"]=`${m}`),f&&(e["--crm-player-controls-icon-toggle-color"]=`${f}`),v&&(e["--crm-player-controls-icon-color"]=`${v}`),g&&(e["--crm-player-controls-icon-size"]=`${g}`,e["--crm-player-controls-icon-button-size"]=`var(--crm-player-controls-icon-size, ${g})`),b&&(e["--crm-player-header-bg-color"]=`${b}`),y&&(e["--crm-player-header-title1-color"]=`${y}`),A&&(e["--crm-player-header-title1-font-size"]=`${A}`),w&&(e["--crm-player-header-title2-color"]=`${w}`),S&&(e["--crm-player-header-title2-font-size"]=`${S}`),C&&(e["--crm-player-header-title3-color"]=`${C}`),x&&(e["--crm-player-header-title3-font-size"]=`${x}`),I&&(e["--crm-player-minimized-title-color"]=`${I}`),k&&(e["--crm-player-minimized-title-font-size"]=`${k}`),T&&(e["--crm-player-progress-label-color"]=`${T}`),E&&(e["--crm-player-progress-label-font-size"]=`${E}`),P&&(e["--crm-player-progress-label-padding-lr"]=`${P}`),$&&(e["--crm-player-progress-slider-color"]=`${$}`),R&&(e["--crm-player-volume-label-color"]=`${R}`),F&&(e["--crm-player-volume-label-font-size"]=`${F}`),_&&(e["--crm-player-volume-slider-color"]=`${_}`),L&&(e["--crm-player-volume-slider-thickness"]=`${L}`);const O=this.store.config.crmTheme??"dark",M="dark"===O||"auto"===O&&!1!==this.store.hass?.themes?.darkMode,H="custom"===O,B=H?this.store.config.crmText||"#f0fdf4":M?"#f0fdf4":"#183329",D=H?this.store.config.crmAccent||"#34d399":M?"#40d99a":"#16875c",V=M?"#a6b7af":"#657a70";return e["--crm-player-secondary-text"]=H?"color-mix(in srgb, var(--crm-text, #f0fdf4) 80%, var(--crm-background, #101b19))":M?"#b5c9bd":"#657a70",e["--crm-player-controls-color"]="var(--crm-text, "+B+")",e["--crm-player-controls-icon-color"]="var(--crm-text, "+B+")",e["--crm-player-controls-icon-toggle-color"]="var(--crm-accent, "+D+")",e["--crm-player-progress-slider-color"]="var(--crm-accent, "+D+")",e["--crm-player-progress-label-color"]=H?"var(--crm-text)":V,e["--crm-player-volume-slider-color"]="var(--crm-accent, "+D+")",e["--crm-player-volume-label-color"]=H?"var(--crm-text)":V,e["--crm-player-header-title1-color"]="var(--crm-text, "+B+")",e["--crm-player-header-title2-color"]="var(--crm-text, "+B+")",e["--crm-player-header-title3-color"]=H?"var(--crm-text)":V,e["--crm-player-header-bg-color"]="transparent",e["--crm-player-controls-bg-color"]="transparent",Me(e)}stylePlayerControls(){const e={};return this.config.playerControlsHide&&(e.display="none"),this.config.playerMinimizeOnIdle&&this.store.player.isPoweredOffOrIdle()&&"fill"!=this.config.height&&(e["justify-items"]="flex-start",e["padding-left"]="0px"),Me(e)}};Ce([De({attribute:!1})],Jr.prototype,"mediaContentId",void 0),Ce([Ve()],Jr.prototype,"config",void 0),Jr=Ce([He("crm-player")],Jr);let Yr=class extends qs{constructor(){super(Yt.PLAYLIST_FAVORITES)}render(){const e=Je("auto",this.store.hass?.locale?.language||this.store.hass?.language);let t;if(this.filterCriteriaPlaceholder={de:"Nach Playlistnamen filtern",pt:"Filtrar por nome da playlist",en:"Filter by playlist name"}[e],super.render(),!this.isActionsVisible){const e=(this.filterCriteria||"").toLocaleLowerCase();t=this.mediaList?.filter(t=>-1!==t.name.toLocaleLowerCase().indexOf(e)),this.filterItemCount=t?.length}const i=bi(this.config.playlistFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,t),s=bi(this.config.playlistFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,t);return this.shuffleOnPlay=this.config.playlistFavBrowserShuffleOnPlay||!1,this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.playlistFavBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${i?B`<div class="media-browser-section-title">${i}</div>`:B``}
        ${s?B`<div class="media-browser-section-subtitle">${s}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-playlist-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-playlist-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list
                        class="media-browser-list"
                        .items=${t}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons
                        class="media-browser-list"
                        .items=${t}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.playlistFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.playlistFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.playlistFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetPlaylistFavorites(e,0,0,s,r).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Playlist Followed failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Playlist followed refresh failed: "+ui(e)),!0}}};var Kr;Yr=Ce([He("crm-playlist-fav-browser")],Yr),function(e){e.AlbumCopyPresetToClipboard="AlbumCopyPresetToClipboard",e.AlbumCopyPresetJsonToClipboard="AlbumCopyPresetJsonToClipboard",e.AlbumCopyUriToClipboard="AlbumCopyUriToClipboard",e.AlbumFavoriteAdd="AlbumFavoriteAdd",e.AlbumFavoriteRemove="AlbumFavoriteRemove",e.AlbumFavoriteUpdate="AlbumFavoriteUpdate",e.AlbumPlayTrackFavorites="AlbumPlayTrackFavorites",e.AlbumSearchRadio="AlbumSearchRadio",e.AlbumShowTracks="AlbumShowTracks",e.AlbumUserPresetAdd="AlbumUserPresetAdd",e.ArtistCopyPresetToClipboard="ArtistCopyPresetToClipboard",e.ArtistCopyPresetJsonToClipboard="ArtistCopyPresetJsonToClipboard",e.ArtistCopyUriToClipboard="ArtistCopyUriToClipboard",e.ArtistFavoriteAdd="ArtistFavoriteAdd",e.ArtistFavoriteRemove="ArtistFavoriteRemove",e.ArtistFavoriteUpdate="ArtistFavoriteUpdate",e.ArtistPlayTrackFavorites="ArtistPlayTrackFavorites",e.ArtistSearchPlaylists="ArtistSearchPlaylists",e.ArtistSearchRadio="ArtistSearchRadio",e.ArtistSearchTracks="ArtistSearchTracks",e.ArtistShowAlbums="ArtistShowAlbums",e.ArtistShowAlbumsAppearsOn="ArtistShowAlbumsAppearsOn",e.ArtistShowAlbumsCompilation="ArtistShowAlbumsCompilation",e.ArtistShowAlbumsSingle="ArtistShowAlbumsSingle",e.ArtistShowRelatedArtists="ArtistShowRelatedArtists",e.ArtistShowTopTracks="ArtistShowTopTracks",e.ArtistUserPresetAdd="ArtistUserPresetAdd",e.TrackCopyPresetToClipboard="TrackCopyPresetToClipboard",e.TrackCopyPresetJsonToClipboard="TrackCopyPresetJsonToClipboard",e.TrackCopyUriToClipboard="TrackCopyUriToClipboard",e.TrackFavoriteAdd="TrackFavoriteAdd",e.TrackFavoriteRemove="TrackFavoriteRemove",e.TrackFavoriteUpdate="TrackFavoriteUpdate",e.TrackPlayQueueAdd="TrackPlayQueueAdd",e.TrackPlayTrackFavorites="TrackPlayTrackFavorites",e.TrackSearchPlaylists="TrackSearchPlaylists",e.TrackSearchRadio="TrackSearchRadio",e.TrackUserPresetAdd="TrackUserPresetAdd"}(Kr||(Kr={}));class Zr extends is{constructor(){super(Yt.TRACK_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Artist &quot;${this.mediaItem.artists[0].name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Kr.ArtistFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Artist &quot;${this.mediaItem.artists[0].name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Kr.ArtistFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Mi}
          label="Add Album &quot;${this.mediaItem.album.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Kr.AlbumFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Album &quot;${this.mediaItem.album.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Kr.AlbumFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,r=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Mi}
          label="Add Track &quot;${this.mediaItem.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(Kr.TrackFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,o=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Oi}
          label="Remove Track &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(Kr.TrackFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,a=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${$i}
          .label="View Artist &quot;${this.mediaItem.artists[0].name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.artists[0].external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,n=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ti}
          .label="View Album &quot;${this.mediaItem.album.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.album.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,l=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Di}
          .label="View Track &quot;${this.mediaItem.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,c=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Track Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackSearchPlaylists)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Search Playlists for Track
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Track Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackPlayQueueAdd)}>
          <ha-svg-icon slot="icon" .path=${Ui}></ha-svg-icon>
          Add Track to Play Queue
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play All Track Favorites
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Track to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Track Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Track Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.TrackCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Track URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,d=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Album Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Album
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumShowTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Album Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Album Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Album to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Album Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Album Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.AlbumCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Album URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `,h=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Artist Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistPlayTrackFavorites)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Play Favorite Tracks from this Artist
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistSearchPlaylists)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          Search Playlists for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistSearchTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Search Tracks for Artist
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistSearchRadio)} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${qi}></ha-svg-icon>
          Search for Artist Radio
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistShowTopTracks)} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          Show Artist Top Tracks
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistShowAlbums)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistShowAlbumsCompilation)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Compilations
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistShowAlbumsSingle)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums Singles
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistShowAlbumsAppearsOn)} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          Show Artist Albums AppearsOn
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistShowRelatedArtists)} hide=${this.hideSearchType(wi.ARTISTS)}>
          <ha-svg-icon slot="icon" .path=${$i}></ha-svg-icon>
          Show Related Artists
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Artist to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Artist Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(Kr.ArtistCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Artist URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B` 
      <div class="track-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${l}
              ${this.mediaItem.name}
              ${this.isTrackFavorite?o:r}
              <span class="actions-dropdown-menu">
                ${c}
              </span>
            </div>
            <div class="media-info-text-ms">
              ${n}
              ${this.mediaItem.album.name}
              ${this.isAlbumFavorite?s:i}
              <span class="actions-dropdown-menu">
                ${d}
              </span>
            </div>
            <div class="media-info-text-ms">
              ${a}
              ${this.mediaItem.artists[0].name}
              ${this.isArtistFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${h}
              </span>
            </div>
            <div class="grid track-info-grid">
              <div class="grid-action-info-hdr-s">Track #</div>
              <div class="grid-action-info-text-s">${this.mediaItem.track_number||"unknown"}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Duration</div>
              <div class="grid-action-info-text-s">${si(this.mediaItem.duration_ms||0)}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Released</div>
              <div class="grid-action-info-text-s">${this.mediaItem.album.release_date}</div>

              <div class="grid-action-info-hdr-s">Disc #</div>
              <div class="grid-action-info-text-s">${this.mediaItem.disc_number||"unknown"}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Explicit</div>
              <div class="grid-action-info-text-s">${this.mediaItem.explicit||!1}</div>
              <div class="grid-action-info-text-s">&nbsp;</div>
              <div class="grid-action-info-hdr-s">Links</div>
              <div class="grid-action-info-text-s">
                <ha-icon-button
                  .path=${$i}
                  label="View Artist &quot;${this.mediaItem.artists[0].name}&quot; info on Spotify.com"
                  @click=${()=>yi(this.mediaItem.artists[0].external_urls.spotify||"")}
                  slot="media-info-icon-link-s"
                ></ha-icon-button>
                <ha-icon-button style="padding-left:10px;"
                  .path=${Ti}
                  label="View Album &quot;${this.mediaItem.album.name}&quot; info on Spotify.com"
                  @click=${()=>yi(this.mediaItem.album.external_urls.spotify||"")}
                  slot="media-info-icon-link-s"
                ></ha-icon-button>
                <ha-icon-button style="padding-left:10px;"
                  .path=${Di}
                  label="View Track &quot;${this.mediaItem.name}&quot; info on Spotify.com"
                  @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
                  slot="media-info-icon-link-s"
                ></ha-icon-button>
              </div>

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s colspan-r3-c2 copy2cb" @click=${pi}>${this.mediaItem.uri}</div>

            </div>
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .track-info-grid {
        grid-template-columns: auto auto 30px auto auto 30px auto auto;
        justify-content: left;
      }

      .track-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      .colspan-r3-c2 {
        grid-row: 3 / 3;    /* grid row 3 */
        grid-column: 2 / 9; /* grid columns 2 thru 8 */
      }
    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{if(e==Kr.AlbumCopyPresetToClipboard)return Zt(Cs(this.mediaItem.album,this.mediaItem.album.artists[0].name)),this.alertInfoSet(Ae),!0;if(e==Kr.AlbumCopyPresetJsonToClipboard)return Zt(xs(this.mediaItem.album,this.mediaItem.album.artists[0].name)),this.alertInfoSet(we),!0;if(e==Kr.AlbumCopyUriToClipboard)return Zt(this.mediaItem.album.uri),!0;if(e==Kr.AlbumSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.album.name+ge+this.mediaItem.artists[0].name)),!0;if(e==Kr.AlbumShowTracks)return this.dispatchEvent(os(wi.ALBUM_TRACKS,this.mediaItem.album.name+"; "+this.mediaItem.artists[0].name,this.mediaItem.album.name,this.mediaItem.album.uri,null,this.mediaItem.album)),!0;if(e==Kr.ArtistCopyPresetToClipboard)return Zt(Cs(this.mediaItem.artists[0])),this.alertInfoSet(Ae),!0;if(e==Kr.ArtistCopyPresetJsonToClipboard)return Zt(xs(this.mediaItem.artists[0])),this.alertInfoSet(we),!0;if(e==Kr.ArtistCopyUriToClipboard)return Zt(this.mediaItem.artists[0].uri),!0;if(e==Kr.ArtistSearchPlaylists)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.artists[0].name)),!0;if(e==Kr.ArtistSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.artists[0].name+ge)),!0;if(e==Kr.ArtistShowAlbums)return this.dispatchEvent(os(wi.ARTIST_ALBUMS,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Kr.ArtistShowAlbumsAppearsOn)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_APPEARSON,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Kr.ArtistShowAlbumsCompilation)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_COMPILATION,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Kr.ArtistShowAlbumsSingle)return this.dispatchEvent(os(wi.ARTIST_ALBUMS_SINGLE,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Kr.ArtistShowRelatedArtists)return this.dispatchEvent(os(wi.ARTIST_RELATED_ARTISTS,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Kr.ArtistShowTopTracks)return this.dispatchEvent(os(wi.ARTIST_TOP_TRACKS,this.mediaItem.artists[0].name,this.mediaItem.artists[0].name,this.mediaItem.artists[0].uri)),!0;if(e==Kr.ArtistSearchTracks)return this.dispatchEvent(os(wi.TRACKS,this.mediaItem.artists[0].name)),!0;if(e==Kr.TrackCopyPresetToClipboard)return Zt(Cs(this.mediaItem,this.mediaItem.artists[0].name)),this.alertInfoSet(Ae),!0;if(e==Kr.TrackCopyPresetJsonToClipboard)return Zt(xs(this.mediaItem,this.mediaItem.artists[0].name)),this.alertInfoSet(we),!0;if(e==Kr.TrackCopyUriToClipboard)return Zt(this.mediaItem.uri),!0;if(e==Kr.TrackSearchPlaylists)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.name+" "+this.mediaItem.artists[0].name)),!0;if(e==Kr.TrackSearchRadio)return this.dispatchEvent(os(wi.PLAYLISTS,this.mediaItem.name+ge+this.mediaItem.artists[0].name)),!0;if(this.progressShow(),e==Kr.AlbumUserPresetAdd)this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide();else if(e==Kr.AlbumFavoriteAdd)await this.spotifyPlusService.SaveAlbumFavorites(this.player,this.mediaItem.album.id),this.updateActions(this.player,[Kr.AlbumFavoriteUpdate]);else if(e==Kr.AlbumFavoriteRemove)await this.spotifyPlusService.RemoveAlbumFavorites(this.player,this.mediaItem.album.id),this.updateActions(this.player,[Kr.AlbumFavoriteUpdate]);else if(e==Kr.AlbumPlayTrackFavorites){const e=this.store.config.albumFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,null,this.mediaItem.album.uri),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else if(e==Kr.ArtistFavoriteAdd)await this.spotifyPlusService.FollowArtists(this.player,this.mediaItem.artists[0].id),this.updateActions(this.player,[Kr.ArtistFavoriteUpdate]);else if(e==Kr.ArtistFavoriteRemove)await this.spotifyPlusService.UnfollowArtists(this.player,this.mediaItem.artists[0].id),this.updateActions(this.player,[Kr.ArtistFavoriteUpdate]);else if(e==Kr.ArtistPlayTrackFavorites){const e=this.store.config.artistFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,999,this.mediaItem.artists[0].uri,null),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else if(e==Kr.ArtistUserPresetAdd)this.mediaItem.artists[0].image_url=this.mediaItem.album.image_url,this.store.config.userPresets?.unshift(Ss(this.mediaItem.artists[0])),await Os(this.store.config),this.progressHide();else if(e==Kr.TrackUserPresetAdd)this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide();else if(e==Kr.TrackFavoriteAdd)await this.spotifyPlusService.SaveTrackFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[Kr.TrackFavoriteUpdate]);else if(e==Kr.TrackFavoriteRemove)await this.spotifyPlusService.RemoveTrackFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[Kr.TrackFavoriteUpdate]);else if(e==Kr.TrackPlayQueueAdd)await this.spotifyPlusService.AddPlayerQueueItems(this.player,this.mediaItem.uri),this.progressHide();else if(e==Kr.TrackPlayTrackFavorites){const e=this.store.config.trackFavBrowserShuffleOnPlay;await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e,null,!1,this.store.config.trackFavBrowserItemsLimit||200),this.progressHide(),this.store.card.SetSection(Yt.PLAYER)}else this.progressHide();return!0}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(Kr.AlbumFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckAlbumFavorites(e,this.mediaItem.album.id).then(e=>{this.isAlbumFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isAlbumFavorite=void 0,this.alertErrorSet("Check Album Favorite failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Kr.ArtistFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckArtistsFollowing(e,this.mediaItem.artists[0].id).then(e=>{this.isArtistFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isArtistFavorite=void 0,this.alertErrorSet("Check Artist Following failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(Kr.TrackFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{let s=this.mediaItem.id;this.mediaItem.is_linked_from&&(s=this.mediaItem.id+","+this.mediaItem.id_origin),this.spotifyPlusService.CheckTrackFavorites(e,s).then(e=>{const i=Object.keys(e);this.isTrackFavorite=e[i[0]],i.length>1&&(this.isTrackFavorite=e[i[0]]||e[i[1]]),t(!0)}).catch(e=>{this.isTrackFavorite=void 0,this.alertErrorSet("Check Track Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Track actions refresh failed: "+ui(e)),!0}}}function Qr(e){const t=new Array;if(e)for(const i of e.items||[])t.push(i.track);return t}Ce([De({attribute:!1})],Zr.prototype,"mediaItem",void 0),Ce([Ve()],Zr.prototype,"isAlbumFavorite",void 0),Ce([Ve()],Zr.prototype,"isArtistFavorite",void 0),Ce([Ve()],Zr.prototype,"isTrackFavorite",void 0),customElements.define("crm-track-actions",Zr);const Xr=_e(ce+":recent-browser");let eo=class extends qs{constructor(){super(Yt.RECENTS),this.filterCriteriaPlaceholder=this.uiText("search.filter.recent","Nach Namen filtern","Filtrar por nome","Filter by name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.recentBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.recentBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.recentBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-track-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-track-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.recentBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}onItemSelected(e){Xr.enabled&&Xr("onItemSelected - media item selected:\n%s",JSON.stringify(e.detail,null,2));try{if(this.progressShow(),!this.player.isUserProductPremium()&&!this.player.attributes.sp_user_has_web_player_credentials)throw new Error(Se);const t=e.detail,{uris:i}=Ai(this.mediaList||[],t);this.spotifyPlusService.PlayerMediaPlayTracks(this.player,i.join(","),null,null,null,!1),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet("Could not play media item.  "+ui(e)),this.mediaBrowserContentElement.scrollTop=0}finally{this.progressHide()}}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.LIMIT_TOTAL_MAX;this.spotifyPlusService.GetPlayerRecentTracks(e,0,0,0,s).then(e=>{this.mediaList=Qr(e),this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Player Recent Tracks failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Recently Played items refresh failed: "+ui(e)),!0}}};var to;eo=Ce([He("crm-recent-browser")],eo),function(e){e.ShowCopyPresetToClipboard="ShowCopyPresetToClipboard",e.ShowCopyPresetJsonToClipboard="ShowCopyPresetJsonToClipboard",e.ShowCopyUriToClipboard="ShowCopyUriToClipboard",e.ShowEpisodesUpdate="ShowEpisodesUpdate",e.ShowFavoriteAdd="ShowFavoriteAdd",e.ShowFavoriteRemove="ShowFavoriteRemove",e.ShowFavoriteUpdate="ShowFavoriteUpdate",e.ShowSearchEpisodes="ShowSearchEpisodes",e.ShowUserPresetAdd="ShowUserPresetAdd"}(to||(to={}));class io extends is{constructor(){super(Yt.SHOW_FAVORITES)}render(){super.render();const e=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Mi}
          label="Add Show &quot;${this.mediaItem.name}&quot; to Favorites"
          @click=${()=>this.onClickAction(to.ShowFavoriteAdd)}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,t=B`
      <div class="display-inline">
        <ha-icon-button 
          .path=${Oi}
          label="Remove Show &quot;${this.mediaItem.name}&quot; from Favorites"
          @click=${()=>this.onClickAction(to.ShowFavoriteRemove)}
          slot="icon-button-small-selected"
        ></ha-icon-button>
      </div>
     `,i=B`
      <div class="display-inline">
        <ha-icon-button
          .path=${Ni}
          .label="View Show &quot;${this.mediaItem.name}&quot; info on Spotify.com"
          @click=${()=>yi(this.mediaItem.external_urls.spotify||"")}
          slot="icon-button-small"
        ></ha-icon-button>
      </div>
     `,s=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="Show Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(to.ShowSearchEpisodes)} hide=${this.hideSearchType(wi.EPISODES)}>
          <ha-svg-icon slot="icon" .path=${Hi}></ha-svg-icon>
          Search for Show Episodes
        </ha-dropdown-item>
        <wa-divider></wa-divider>
        <ha-dropdown-item @click=${()=>this.onClickAction(to.ShowUserPresetAdd)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Add Show to User Presets
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(to.ShowCopyPresetToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Show Preset Info to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(to.ShowCopyPresetJsonToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Pi}></ha-svg-icon>
          Copy Show Preset JSON to Clipboard
        </ha-dropdown-item>
        <ha-dropdown-item @click=${()=>this.onClickAction(to.ShowCopyUriToClipboard)}>
          <ha-svg-icon slot="icon" .path=${Li}></ha-svg-icon>
          Copy Show URI to Clipboard
        </ha-dropdown-item>
      </ha-dropdown>
      `;return B`
      <div class="show-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">
            <div class="media-info-text-ms-c">
              ${i}
              ${this.mediaItem.name}
              ${this.isShowFavorite?t:e}
              <span class="actions-dropdown-menu">
                ${s}
              </span>
            </div>
            <div class="grid show-info-grid">
              <div class="grid-action-info-hdr-s"># Episodes</div>
              <div class="grid-action-info-text-s">${this.mediaItem.total_episodes||"unknown"}</div>
              
              <div class="grid-action-info-hdr-s">Explicit?</div>
              <div class="grid-action-info-text-s">${this.mediaItem.explicit||!1}</div>
              
              <div class="grid-action-info-hdr-s">Publisher</div>
              <div class="grid-action-info-text-s">${this.mediaItem.publisher||"unknown"}</div>

              ${"copyrights"in this.mediaItem?B`
                <div class="grid-action-info-hdr-s">Copyright</div>
                <div class="grid-action-info-text-s">${As(this.mediaItem,"; ")}</div>
                `:""}

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s copy2cb" @click=${pi}>${this.mediaItem.uri}</div>

            </div>
          </div>
        </div>
        <div class="grid-container-scrollable">
          <div class="media-info-text-s" .innerHTML="${ei(this.mediaItem.html_description)}"></div>
          <div class="grid episodes-grid">
            <div class="grid-header">&nbsp;</div>
            <div class="grid-header">Title</div>
            <div class="grid-header">Status</div>
            <div class="grid-header grid-header-last">Duration</div>
            ${this.showEpisodes?.items.map(e=>B`
              <ha-icon-button
                .path=${zi}
                .label="Add episode &quot;${e.name}&quot; to Play Queue"
                @click=${()=>this.AddPlayerQueueItem(e)}
                slot="icon-button"
              >&nbsp;</ha-icon-button>
              <div class="grid-entry">${e.name}</div>
              <div class="grid-entry">${Zs(e.resume_point)}</div>
              <div class="grid-entry">${si(e.duration_ms||0)}</div>
            `)}
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .show-info-grid {
        grid-template-columns: auto auto;
        justify-content: left;
      }

      .show-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      /* style episodes container and grid */
      .episodes-grid {
        grid-template-columns: 40px auto auto auto;
        margin-top: 1.0rem;
      }

      /* style ha-icon-button controls in tracks grid: icon size, title text */
      .episodes-grid > ha-icon-button[slot="icon-button"] {
        --ha-icon-button-size: 24px;
        --ha-icon-size: 20px;
        vertical-align: top;
        padding: 0px;
      }

    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{return e==to.ShowCopyPresetToClipboard?(Zt(Cs(this.mediaItem,"Podcast")),this.alertInfoSet(Ae),!0):e==to.ShowCopyPresetJsonToClipboard?(Zt(xs(this.mediaItem,"Podcast")),this.alertInfoSet(we),!0):e==to.ShowCopyUriToClipboard?(Zt(this.mediaItem.uri),!0):e==to.ShowSearchEpisodes?(this.dispatchEvent(os(wi.SHOW_EPISODES,this.mediaItem.name,this.mediaItem.name,this.mediaItem.uri)),!0):(this.progressShow(),e==to.ShowUserPresetAdd?(this.store.config.userPresets?.unshift(Ss(this.mediaItem)),await Os(this.store.config),this.progressHide()):e==to.ShowFavoriteAdd?(await this.spotifyPlusService.SaveShowFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[to.ShowFavoriteUpdate])):e==to.ShowFavoriteRemove?(await this.spotifyPlusService.RemoveShowFavorites(this.player,this.mediaItem.id),this.updateActions(this.player,[to.ShowFavoriteUpdate])):this.progressHide(),!0)}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{const i=new Array;if(-1!=t.indexOf(to.ShowEpisodesUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.GetShowEpisodes(e,this.mediaItem.id,0,0,null,20).then(e=>{this.showEpisodes=e,t(!0)}).catch(e=>{this.showEpisodes=void 0,this.alertErrorSet("Get Show Episodes failed: "+ui(e)),i(e)})});i.push(t)}if(-1!=t.indexOf(to.ShowFavoriteUpdate)||0==t.length){const t=new Promise((t,i)=>{this.spotifyPlusService.CheckShowFavorites(e,this.mediaItem.id).then(e=>{this.isShowFavorite=e[Object.keys(e)[0]],t(!0)}).catch(e=>{this.isShowFavorite=void 0,this.alertErrorSet("Check Show Favorites failed: "+ui(e)),i(e)})});i.push(t)}return this.progressShow(),Promise.allSettled(i).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),this.alertErrorSet("Show actions refresh failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],io.prototype,"mediaItem",void 0),Ce([Ve()],io.prototype,"showEpisodes",void 0),Ce([Ve()],io.prototype,"isShowFavorite",void 0),customElements.define("crm-show-actions",io);const so=_e(ce+":search-media-browser"),ro={de:{searchFor:"Suchen nach",searchByName:"Nach Namen suchen...",selectSearchType:"Bitte wähle einen Suchtyp aus.",enterSearch:"Bitte gib einen Suchbegriff ein.",searching:"Suche nach",searchFailed:"Suche fehlgeschlagen"},pt:{searchFor:"Pesquisar",searchByName:"Pesquisar por nome...",selectSearchType:"Selecione um tipo de pesquisa.",enterSearch:"Digite um termo para pesquisar.",searching:"Pesquisando",searchFailed:"Falha na pesquisa"},en:{searchFor:"Search for",searchByName:"Search by name...",selectSearchType:"Please select a search type.",enterSearch:"Please enter a search term.",searching:"Searching",searchFailed:"Search failed"}};function oo(e){return Je("auto",e?.locale?.language||e?.language)}function ao(e,t){return ro[oo(e)][t]}const no={de:{albums:"Alben",artists:"Künstler",audiobooks:"Hörbücher",episodes:"Episoden",playlists:"Playlists",shows:"Podcasts",tracks:"Titel",album_tracks:"Albumtitel",artist_top_tracks:"Top-Titel des Künstlers",artist_albums:"Künstleralben",artist_albums_compilation:"Kompilationen",artist_albums_single:"Singles",artist_albums_appearson:"Gastauftritte",artist_related_artists:"Ähnliche Künstler",audiobook_episodes:"Hörbuchkapitel",show_episodes:"Podcast-Episoden"},pt:{albums:"Álbuns",artists:"Artistas",audiobooks:"Audiolivros",episodes:"Episódios",playlists:"Playlists",shows:"Podcasts",tracks:"Faixas",album_tracks:"Faixas do álbum",artist_top_tracks:"Mais tocadas do artista",artist_albums:"Álbuns do artista",artist_albums_compilation:"Coletâneas",artist_albums_single:"Singles",artist_albums_appearson:"Participações",artist_related_artists:"Artistas relacionados",audiobook_episodes:"Capítulos do audiolivro",show_episodes:"Episódios do podcast"},en:{albums:"Albums",artists:"Artists",audiobooks:"Audiobooks",episodes:"Episodes",playlists:"Playlists",shows:"Shows",tracks:"Tracks",album_tracks:"Album tracks",artist_top_tracks:"Artist top tracks",artist_albums:"Artist albums",artist_albums_compilation:"Compilations",artist_albums_single:"Singles",artist_albums_appearson:"Appears on",artist_related_artists:"Related artists",audiobook_episodes:"Audiobook chapters",show_episodes:"Show episodes"}};function lo(e,t){if(!t)return"";const i=String(t).trim().toLowerCase().replace(/[\s-]+/g,"_");return no[oo(e)][i]||String(t)}const co="_searchmediatype",ho="_searcheventargs",po=[wi.ALBUMS,wi.ARTISTS,wi.AUDIOBOOKS,wi.EPISODES,wi.PLAYLISTS,wi.SHOWS,wi.TRACKS];let uo=class extends qs{constructor(){super(Yt.SEARCH_MEDIA),this.filterCriteriaPlaceholder="search by name"}localizedSearchTitle(){return`${ao(this.hass,"searchFor")} ${lo(this.hass,this.searchMediaType)}`}render(){super.render(),this.filterCriteriaPlaceholder=ao(this.hass,"searchByName");const e=bi(this.config.searchMediaBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList),t=bi(this.config.searchMediaBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList),i=this.searchMediaType;this.favBrowserItemsPerRow=this.config.searchMediaBrowserItemsPerRow||4,this.config.searchMediaBrowserUseDisplaySettings||(i==wi.ALBUMS?this.favBrowserItemsPerRow=this.config.albumFavBrowserItemsPerRow||4:i==wi.ARTISTS?this.favBrowserItemsPerRow=this.config.artistFavBrowserItemsPerRow||4:i==wi.AUDIOBOOKS?this.favBrowserItemsPerRow=this.config.audiobookFavBrowserItemsPerRow||4:i==wi.EPISODES?this.favBrowserItemsPerRow=this.config.episodeFavBrowserItemsPerRow||4:i==wi.PLAYLISTS?this.favBrowserItemsPerRow=this.config.playlistFavBrowserItemsPerRow||4:i==wi.SHOWS?this.favBrowserItemsPerRow=this.config.showFavBrowserItemsPerRow||4:i==wi.TRACKS?this.favBrowserItemsPerRow=this.config.trackFavBrowserItemsPerRow||4:i==wi.ALBUM_TRACKS?(this.favBrowserItemsPerRow=this.config.trackFavBrowserItemsPerRow||4,this.isFilterCriteriaReadOnly=!0):i==wi.ARTIST_ALBUMS||i==wi.ARTIST_ALBUMS_APPEARSON||i==wi.ARTIST_ALBUMS_COMPILATION||i==wi.ARTIST_ALBUMS_SINGLE?(this.favBrowserItemsPerRow=this.config.albumFavBrowserItemsPerRow||4,this.isFilterCriteriaReadOnly=!0):i==wi.ARTIST_RELATED_ARTISTS?(this.favBrowserItemsPerRow=this.config.artistFavBrowserItemsPerRow||4,this.isFilterCriteriaReadOnly=!0):i==wi.ARTIST_TOP_TRACKS?(this.favBrowserItemsPerRow=this.config.trackFavBrowserItemsPerRow||4,this.isFilterCriteriaReadOnly=!0):(i==wi.AUDIOBOOK_EPISODES||i==wi.SHOW_EPISODES)&&(this.favBrowserItemsPerRow=this.config.episodeFavBrowserItemsPerRow||4,this.isFilterCriteriaReadOnly=!0)),!this.isFilterCriteriaReadOnly&&this.config.searchMediaBrowserSearchTypes&&this.config.searchMediaBrowserSearchTypes.length>0&&(this.config.searchMediaBrowserSearchTypes?.includes(this.searchMediaType)||(this.searchMediaType=this.config.searchMediaBrowserSearchTypes[0],this.mediaList=void 0,this.mediaListLastUpdatedOn=0,this.scrollTopSaved=0));const s=(this.searchEventArgs?.uri||"").indexOf(":album:")>-1,r=(this.searchEventArgs?.uri||"").indexOf(":artist:")>-1,o=(this.searchEventArgs?.uri||"").indexOf(":show:")>-1&&"audiobook"==this.searchEventArgs?.subtype,a=(this.searchEventArgs?.uri||"").indexOf(":show:")>-1&&"podcast"==this.searchEventArgs?.subtype,n=s||r||o||a,l=B`
      <ha-dropdown slot="actionItems" id="searchMediaType" style="padding-right: 0.5rem;">
        <ha-assist-chip id="searchMediaTypeTitle"
          slot="trigger"
          .label=${this.localizedSearchTitle()}>
          <ha-svg-icon slot="trailing-icon" .path=${"M7,10L12,15L17,10H7Z"}></ha-svg-icon>
        </ha-assist-chip>
        <ha-dropdown-item .value=${wi.ALBUMS} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.ALBUMS)}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          ${lo(this.hass,wi.ALBUMS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTISTS} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.ARTISTS)}>
          <ha-svg-icon slot="icon" .path=${$i}></ha-svg-icon>
          ${lo(this.hass,wi.ARTISTS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.AUDIOBOOKS} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.AUDIOBOOKS)}>
          <ha-svg-icon slot="icon" .path=${Ei}></ha-svg-icon>
          ${lo(this.hass,wi.AUDIOBOOKS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.EPISODES} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.EPISODES)}>
          <ha-svg-icon slot="icon" .path=${Hi}></ha-svg-icon>
          ${lo(this.hass,wi.EPISODES)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.PLAYLISTS} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.PLAYLISTS)}>
          <ha-svg-icon slot="icon" .path=${zi}></ha-svg-icon>
          ${lo(this.hass,wi.PLAYLISTS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.SHOWS} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.SHOWS)}>
          <ha-svg-icon slot="icon" .path=${Ni}></ha-svg-icon>
          ${lo(this.hass,wi.SHOWS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.TRACKS} @click=${this.onSearchMediaTypeChanged} hide=${this.hideSearchType(wi.TRACKS)}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          ${lo(this.hass,wi.TRACKS)}
        </ha-dropdown-item>
        <wa-divider hide=${!n}></wa-divider>
        <ha-dropdown-item .value=${wi.ALBUM_TRACKS} @click=${this.onSearchMediaTypeChanged} hide=${!s}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          ${lo(this.hass,wi.ALBUM_TRACKS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTIST_TOP_TRACKS} @click=${this.onSearchMediaTypeChanged} hide=${!r}>
          <ha-svg-icon slot="icon" .path=${Di}></ha-svg-icon>
          ${lo(this.hass,wi.ARTIST_TOP_TRACKS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTIST_ALBUMS} @click=${this.onSearchMediaTypeChanged} hide=${!r}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          ${lo(this.hass,wi.ARTIST_ALBUMS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTIST_ALBUMS_COMPILATION} @click=${this.onSearchMediaTypeChanged} hide=${!r}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          ${lo(this.hass,wi.ARTIST_ALBUMS_COMPILATION)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTIST_ALBUMS_SINGLE} @click=${this.onSearchMediaTypeChanged} hide=${!r}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          ${lo(this.hass,wi.ARTIST_ALBUMS_SINGLE)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTIST_ALBUMS_APPEARSON} @click=${this.onSearchMediaTypeChanged} hide=${!r}>
          <ha-svg-icon slot="icon" .path=${Ti}></ha-svg-icon>
          ${lo(this.hass,wi.ARTIST_ALBUMS_APPEARSON)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.ARTIST_RELATED_ARTISTS} @click=${this.onSearchMediaTypeChanged} hide=${!r}>
          <ha-svg-icon slot="icon" .path=${$i}></ha-svg-icon>
          ${lo(this.hass,wi.ARTIST_RELATED_ARTISTS)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.AUDIOBOOK_EPISODES} @click=${this.onSearchMediaTypeChanged} hide=${!o}>
          <ha-svg-icon slot="icon" .path=${Hi}></ha-svg-icon>
          ${lo(this.hass,wi.AUDIOBOOK_EPISODES)}
        </ha-dropdown-item>
        <ha-dropdown-item .value=${wi.SHOW_EPISODES} @click=${this.onSearchMediaTypeChanged} hide=${!a}>
          <ha-svg-icon slot="icon" .path=${Hi}></ha-svg-icon>
          ${lo(this.hass,wi.SHOW_EPISODES)}
        </ha-dropdown-item>
      </ha-dropdown>
      `;return this.setScrollPosition(),B`

      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${e?B`<div class="media-browser-section-title">${e}</div>`:B``}
        ${t?B`<div class="media-browser-section-subtitle">${t}</div>`:B``}
        <div class="search-media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${l}
          ${this.isFilterCriteriaVisible?B`
            ${this.isFilterCriteriaReadOnly?B`${this.filterCriteriaReadOnlyHtml}`:B`${this.filterCriteriaHtml}`}
            `:B``}
          ${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?[wi.ALBUMS,wi.ARTIST_ALBUMS,wi.ARTIST_ALBUMS_APPEARSON,wi.ARTIST_ALBUMS_COMPILATION,wi.ARTIST_ALBUMS_SINGLE].indexOf(this.searchMediaType)>-1?B`<crm-album-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-album-actions>`:[wi.ARTISTS,wi.ARTIST_RELATED_ARTISTS].indexOf(this.searchMediaType)>-1?B`<crm-artist-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-artist-actions>`:this.searchMediaType==wi.AUDIOBOOKS?B`<crm-audiobook-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-audiobook-actions>`:[wi.EPISODES,wi.AUDIOBOOK_EPISODES,wi.SHOW_EPISODES].indexOf(this.searchMediaType)>-1?B`<crm-episode-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-episode-actions>`:[wi.PLAYLISTS].indexOf(this.searchMediaType)>-1?B`<crm-playlist-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-playlist-actions>`:this.searchMediaType==wi.SHOWS?B`<crm-show-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-show-actions>`:[wi.TRACKS,wi.ALBUM_TRACKS,wi.ARTIST_TOP_TRACKS].indexOf(this.searchMediaType)>-1?B`<crm-track-actions class="search-media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-track-actions>`:B``:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list class="media-browser-list"
                        .items=${this.mediaList}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        .searchMediaType=${this.searchMediaType}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                      ></crm-media-browser-list>`:B`<crm-media-browser-icons class="media-browser-list"
                        .items=${this.mediaList}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        .searchMediaType=${this.searchMediaType}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                      ></crm-media-browser-icons>`)()}
        </div>
      </div>
    `}static get styles(){return[Bs,a`

      /* extra styles not defined in sharedStylesFavBrowser would go here. */

      .search-media-browser-controls {
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: 0rem;
        white-space: nowrap;
        align-items: left;
        --ha-select-height: 2.5rem;           /* ha dropdown control height */
        --mdc-menu-item-height: 2.5rem;       /* mdc dropdown list item height */
        --ha-icon-button-size: 2.5rem;       /* mdc icon button size */
        --md-menu-item-top-space: 0.5rem;     /* top spacing between items */
        --md-menu-item-bottom-space: 0.5rem;  /* bottom spacing between items */
        --md-menu-item-one-line-container-height: 2.0rem;  /* menu item height */
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .search-media-browser-actions {
        height: 100%;
      }

      /* <ha-dropdown> related styles */
      ha-assist-chip {
        --ha-assist-chip-container-shape: 10px;  /* 0px=square corner, 10px=rounded corner */
        --ha-assist-chip-container-color: var(--card-background-color);
      }

      .selection-bar {
        background: rgba(var(--rgb-primary-color), 0.1);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        box-sizing: border-box;
        font-size: 14px;
        --ha-assist-chip-container-color: var(--card-background-color);
      }

      .selection-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .selection-controls p {
        margin-left: 8px;
        margin-inline-start: 8px;
        margin-inline-end: initial;
      }

      .center-vertical {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .relative {
        position: relative;
      }

      *[hide="true"] {
        display: none;
      }

      *[hide="false"] {
        display: flex;
      }
    `]}onItemSelected(e){so.enabled&&so("onItemSelected - search media item selected:\n%s",JSON.stringify(e.detail,null,2));const t=e.detail;!this.config.searchMediaBrowserQueueSelection||"track"!=t.type&&"episode"!=t.type?this.PlayMediaItem(t):this.QueueMediaItem(t)}hideSearchType(e){return!!(this.config.searchMediaBrowserSearchTypes&&this.config.searchMediaBrowserSearchTypes.length>0)&&(!this.config.searchMediaBrowserSearchTypes?.includes(e)&&(!this.searchEventArgs||this.searchEventArgs?.searchCriteria!=e))}searchExecute(e){so.enabled&&so("searchExecute - searching Spotify media:\n%s",JSON.stringify(e,null,2)),this.initSearchValues(e.searchType),this.filterCriteria=e.searchCriteria,this.searchMediaType=e.searchType,po.includes(e.searchType)?this.searchEventArgs=null:this.searchEventArgs=e,this.updateMediaList(this.player)}storageValuesLoad(){super.storageValuesLoad();let e=wi.PLAYLISTS;this.isFilterCriteriaReadOnly||this.config.searchMediaBrowserSearchTypes&&this.config.searchMediaBrowserSearchTypes.length>0&&(this.config.searchMediaBrowserSearchTypes.includes(e)||(e=this.config?.searchMediaBrowserSearchTypes[0]||"")),this.searchMediaType=Ds.getStorageValue(this.cacheKeyBase+this.mediaType+co,e),this.searchEventArgs=Ds.getStorageValue(this.cacheKeyBase+this.mediaType+ho,e),so.enabled&&so("storageValuesLoad - parameters loaded from cache: searchMediaType, searchEventArgs")}storageValuesSave(){super.storageValuesSave(),Ds.setStorageValue(this.cacheKeyBase+this.mediaType+co,this.searchMediaType),Ds.setStorageValue(this.cacheKeyBase+this.mediaType+ho,this.searchEventArgs),so.enabled&&so("storageValuesSave - parameters saved to cache: searchMediaType, searchEventArgs")}onSearchMediaTypeChanged(e){this.initSearchValues(e.currentTarget.value);const t=e.currentTarget.value;so.enabled&&so("onSearchMediaTypeChanged - selected value = %s ",JSON.stringify(t)),po.includes(t)?this.searchEventArgs=null:this.searchEventArgs?(this.searchEventArgs.searchType=t,this.updateMediaList(this.player)):so("%conSearchMediaTypeChanged - searchEventArgs not set; event ignored!","color:red")}initSearchValues(e){this.searchMediaType!=e&&(so.enabled&&so("initSearchValues - preparing to search for type: %s",JSON.stringify(e)),this.searchMediaType=e,this.mediaList=void 0,this.mediaListLastUpdatedOn=0,this.scrollTopSaved=0,this.alertClear(),this.isActionsVisible&&(this.isActionsVisible=!1))}updateMediaList(e){if(!this.searchMediaType)return this.alertErrorSet(ao(this.hass,"selectSearchType")),this.searchMediaTypeElement.focus(),!1;if(!this.isFilterCriteriaReadOnly&&!this.filterCriteria)return this.alertErrorSet(ao(this.hass,"enterSearch")),this.filterCriteriaElement.focus(),!1;if(!super.updateMediaList(e))return!1;try{const t=new Array;if(so.enabled&&so("%cupdateMediaList\n- mediaType = %s\n- searchMediaType = %s\n- searchEventArgs = %s","color:green",JSON.stringify(this.mediaType),JSON.stringify(this.searchMediaType),JSON.stringify(this.searchEventArgs,null,2)),po.includes(this.searchMediaType)){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.filterCriteria+'" ...';const s=this.config.searchMediaBrowserSearchLimit||50;this.spotifyPlusService.Search(this.searchMediaType,e,this.filterCriteria||"",0,0,null,null,s).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ALBUM_TRACKS){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserSearchLimit||50;this.spotifyPlusService.GetAlbumTracks(e,s,0,0,null,r).then(e=>{so.enabled&&so("%cupdateMediaList - Appending album to SearchMediaTypes.ALBUM_TRACKS items.\n- Album parentMediaItem:\n%s","color.red",JSON.stringify(this.searchEventArgs?.parentMediaItem,null,2)),e.items.forEach(e=>{const t=e;t.album=this.searchEventArgs?.parentMediaItem,t.album&&(t.image_url=t.album.image_url)}),this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ARTIST_ALBUMS){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserSearchLimit||50,o=this.config.artistFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistAlbums(e,s,"album",0,0,null,r,o).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ARTIST_ALBUMS_APPEARSON){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserSearchLimit||50,o=this.config.artistFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistAlbums(e,s,"appears_on",0,0,null,r,o).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ARTIST_ALBUMS_COMPILATION){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserSearchLimit||50,o=this.config.artistFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistAlbums(e,s,"compilation",0,0,null,r,o).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ARTIST_ALBUMS_SINGLE){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserSearchLimit||50,o=this.config.artistFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistAlbums(e,s,"single",0,0,null,r,o).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ARTIST_RELATED_ARTISTS){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistRelatedArtists(e,s,r).then(e=>{this.mediaList=e,this.mediaListLastUpdatedOn=ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.ARTIST_TOP_TRACKS){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserItemsSortTitle||!1;this.spotifyPlusService.GetArtistTopTracks(e,s,null,r).then(e=>{this.mediaList=e,this.mediaListLastUpdatedOn=ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else if(this.searchMediaType==wi.SHOW_EPISODES){const i=new Promise((t,i)=>{this.alertInfo=ao(this.hass,"searching")+" "+lo(this.hass,this.searchMediaType)+' – "'+this.searchEventArgs?.title+'" ...';const s=ys(this.searchEventArgs?.uri),r=this.config.searchMediaBrowserSearchLimit||50;this.spotifyPlusService.GetShowEpisodes(e,s,0,0,null,r).then(e=>{this.mediaList=e.items,this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),this.alertInfo?.startsWith(ao(this.hass,"searching"))&&this.alertInfoClear(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),i(e)})});t.push(i)}else this.isUpdateInProgress=!1,console.log("%cSpotifyPlus Card: updateMediaList - searchMediaType was not processed:\n- mediaType = %s\n- searchMediaType = %s\n- searchEventArgs = %s","color:red",JSON.stringify(this.mediaType),JSON.stringify(this.searchMediaType),JSON.stringify(this.searchEventArgs,null,2));return this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError(ao(this.hass,"searchFailed")+" ("+lo(this.hass,this.searchMediaType)+"): "+ui(e)),!0}}};Ce([Ve()],uo.prototype,"searchMediaType",void 0),Ce([Ve()],uo.prototype,"searchEventArgs",void 0),Ce([ze("#searchMediaType",!1)],uo.prototype,"searchMediaTypeElement",void 0),uo=Ce([He("crm-search-media-browser")],uo);let mo=class extends qs{constructor(){super(Yt.SHOW_FAVORITES),this.filterCriteriaPlaceholder=this.uiText("search.filter.show","Nach Podcastnamen filtern","Filtrar por nome do podcast","Filter by show name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.showFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.showFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.showFavBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-show-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-show-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons class="media-browser-list"
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.showFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.showFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.showFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetShowFavorites(e,0,0,s,r,!0).then(e=>{this.mediaList=function(e){const t=new Array;if(e)for(const i of e.items||[])t.push(i.show);return t}(e),this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Show Favorites failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Show favorites refresh failed: "+ui(e)),!0}}};mo=Ce([He("crm-show-fav-browser")],mo);const go=_e(ce+":track-fav-browser");let vo=class extends qs{constructor(){super(Yt.TRACK_FAVORITES),this.filterCriteriaPlaceholder=this.uiText("search.filter.track","Nach Songnamen filtern","Filtrar por nome da música","Filter by track name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name.toLocaleLowerCase().indexOf(t)||-1!==e.artists[0].name.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.trackFavBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.trackFavBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.shuffleOnPlay=this.config.trackFavBrowserShuffleOnPlay||!1,this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.trackFavBrowserItemsPerRow||4,go.enabled&&go("render - loaded favBrowserItemsPerRow, value = %s",JSON.stringify(this.favBrowserItemsPerRow))),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-track-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-track-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}firstUpdated(e){this.isCardInEditPreview||(this.isMediaListRefreshedOnSectionEntry=this.config.trackFavBrowserItemsRefreshOnEntry||!1),super.firstUpdated(e)}onItemSelected(e){go.enabled&&go("onItemSelected - media item selected:\n%s",JSON.stringify(e.detail,null,2));try{if(this.progressShow(),!this.player.isUserProductPremium()&&!this.player.attributes.sp_user_has_web_player_credentials)throw new Error(Se);const t=e.detail,{uris:i}=Ai(this.mediaList||[],t);this.spotifyPlusService.PlayerMediaPlayTracks(this.player,i.join(","),null,null,null,!1),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet("Could not play media item.  "+ui(e)),this.mediaBrowserContentElement.scrollTop=0}finally{this.progressHide()}}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{const t=new Array,i=new Promise((t,i)=>{const s=this.config.trackFavBrowserItemsLimit||this.LIMIT_TOTAL_MAX,r=this.config.trackFavBrowserItemsSortTitle||!1;this.spotifyPlusService.GetTrackFavorites(e,0,0,null,s,r).then(e=>{this.mediaList=Qr(e),this.mediaListLastUpdatedOn=e.date_last_refreshed||ti(),super.updatedMediaListOk(),t(!0)}).catch(e=>{this.mediaList=void 0,this.mediaListLastUpdatedOn=0,super.updatedMediaListError("Get Track Favorites failed: "+ui(e)),i(e)})});return t.push(i),this.progressShow(),Promise.allSettled(t).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("Track favorites refresh failed: "+ui(e)),!0}}};var fo;vo=Ce([He("crm-track-fav-browser")],vo),function(e){e.UserPresetRemove="UserPresetRemove"}(fo||(fo={}));class bo extends is{constructor(){super(Yt.USERPRESETS)}render(){super.render();const e=B`
      <ha-dropdown slot="actionItems">
        <ha-icon-button
          slot="trigger"
          .label="UserPreset Actions"
          .path=${Ri}
        ></ha-icon-button>
        <ha-dropdown-item @click=${()=>this.onClickAction(fo.UserPresetRemove)}>
          <ha-svg-icon slot="icon" .path=${"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"}></ha-svg-icon>
          Remove User Preset Item
        </ha-dropdown-item>
      </ha-md-button-menu>
      `;return B` 
      <div class="userpreset-actions-container">
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="media-info-content">
          <div class="img copy2cb" style="background:url(${this.mediaItem.image_url});" @click=${()=>Zt(this.mediaItem.image_url||"")}></div>
          <div class="media-info-details">
            <div class="grid userpreset-info-grid">
              <div class="grid-action-info-hdr-s">Name</div>
              <div class="grid-action-info-text-s">${this.mediaItem.name}</div>

              <div class="grid-action-info-hdr-s">Sub-Title</div>
              <div class="grid-action-info-text-s">${this.mediaItem.subtitle}</div>

              <div class="grid-action-info-hdr-s">Type</div>
              <div class="grid-action-info-text-s">${this.mediaItem.type}</div>

              <div class="grid-action-info-hdr-s">URI</div>
              <div class="grid-action-info-text-s">${this.mediaItem.uri}</div>

              <div class="grid-action-info-hdr-s">Origin</div>
              <div class="grid-action-info-text-s">${this.mediaItem.origin}</div>

            </div>
            <div class="media-info-text-ms-c pad-top">
              <span class="actions-dropdown-menu">
                ${e}
              </span>
            </div>
          </div>
        </div>
      </div>`}static get styles(){return[Yi,Ki,Zi,a`

      .userpreset-info-grid {
        grid-template-columns: auto auto;
        justify-content: left;
      }

      .userpreset-actions-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;  
      }

      .pad-top {
        padding-top: 0.50rem;
      }
    `]}async onClickAction(e){if(this.isCardInEditPreview)return!0;try{if(this.progressShow(),e==fo.UserPresetRemove){if("card config"!=this.mediaItem.origin)return this.progressHide(),this.alertInfoSet("JSON File preset items must be removed via a file editor, since they may affect other card configurations."),!0;const e=this.store.config.userPresets||[];for(let t=e.length-1;t>=0;t--)if(e[t].name==this.mediaItem.name&&e[t].subtitle==this.mediaItem.subtitle&&(e[t].image_url||"")==(this.mediaItem.image_url||"")){e.splice(t,1);break}this.store.config.userPresets=e,await Os(this.store.config),this.progressHide(),Ls.selectedConfigArea=Kt.USERPRESET_BROWSER,this.alertInfoSet('User Preset was removed: "'+this.mediaItem.name+'".')}else this.progressHide();return!0}catch(e){return this.progressHide(),this.alertErrorSet("Action failed: "+ui(e)),!0}}updateActions(e,t){if(!super.updateActions(e,t))return!1;try{return!0}catch(e){return this.progressHide(),this.alertErrorSet("UserPreset actions refresh failed: "+ui(e)),!0}}}Ce([De({attribute:!1})],bo.prototype,"mediaItem",void 0),customElements.define("crm-userpreset-actions",bo);const yo=ne+"-card-category-display";class Ao{constructor(e=null,t=null,i=null){this.filterCriteria=e||"",this.title=t||"",this.uri=i||""}}const wo=ne+"-card-filter-section-media";class So{constructor(e,t=null){this.section=e||"",this.filterCriteria=t||""}}const Co=_e(ce+":userpreset-browser");let xo=class extends qs{constructor(){super(Yt.USERPRESETS),this.filterCriteriaPlaceholder=this.uiText("search.filter.preset","Nach Preset-Namen filtern","Filtrar por nome do preset","Filter by preset name")}render(){let e;if(super.render(),!this.isActionsVisible){const t=(this.filterCriteria||"").toLocaleLowerCase();e=this.mediaList?.filter(e=>-1!==e.name?.toLocaleLowerCase().indexOf(t)||-1!==e.subtitle?.toLocaleLowerCase().indexOf(t)),this.filterItemCount=e?.length}const t=bi(this.config.userPresetBrowserTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e),i=bi(this.config.userPresetBrowserSubTitle,this.config,this.player,this.mediaListLastUpdatedOn,this.mediaList,e);return this.favBrowserItemsPerRow||(this.favBrowserItemsPerRow=this.config.userPresetBrowserItemsPerRow||4),B`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${t?B`<div class="media-browser-section-title">${t}</div>`:B``}
        ${i?B`<div class="media-browser-section-subtitle">${i}</div>`:B``}
        <div class="media-browser-controls">
          ${this.isActionsVisible?B`${this.btnHideActionsHtml}`:B``}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
          ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
          ${(()=>this.isActionsVisible?B`<crm-userpreset-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-userpreset-actions>`:1===this.favBrowserItemsPerRow?B`<crm-media-browser-list 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-list>`:B`<crm-media-browser-icons 
                        class="media-browser-list"
                        .items=${e}
                        .itemsPerRow=${this.favBrowserItemsPerRow}
                        .store=${this.store}
                        @item-selected=${this.onItemSelected}
                        @item-selected-with-hold=${this.onItemSelectedWithHold}
                       ></crm-media-browser-icons>`)()}  
        </div>
      </div>
    `}onItemSelected(e){if(Co.enabled&&Co("onItemSelected - media item selected:\n%s",JSON.stringify(e.detail,null,2)),"recommendations"==e.detail.type){const t=e.detail;this.PlayTrackRecommendations(t)}else if("filtersection"==e.detail.type){const t=e.detail;if(!Object.values(Yt).includes(t.filter_section||""))return void this.alertErrorSet('Preset filter_section "'+t.filter_section+'" is not a valid section identifier.');this.dispatchEvent(function(e,t){const i=new So(e);return i.filterCriteria=(t||"").trim(),new CustomEvent(wo,{bubbles:!0,composed:!0,detail:i})}(t.filter_section,t.filter_criteria))}else if("category"==e.detail.type){const t=e.detail;this.dispatchEvent(function(e,t=null,i=null){const s=new Ao;return s.filterCriteria=(e||"").trim(),s.title=t||"",s.uri=i||"",new CustomEvent(yo,{bubbles:!0,composed:!0,detail:s})}(t.subtitle,t.name,t.uri))}else if("trackfavorites"==e.detail.type){const t=e.detail;this.PlayTrackFavorites(t)}else super.onItemSelected(e)}onItemSelectedWithHold(e){""==(e.detail.uri||"")&&(e.detail.uri="unknown"),super.onItemSelectedWithHold(e)}async PlayTrackRecommendations(e){try{if(!this.player.isUserProductPremium()&&!this.player.attributes.sp_user_has_web_player_credentials)throw new Error(Se);this.progressShow(),this.alertInfo="Searching for track recommendations ...",this.requestUpdate();const t=50,i=await this.spotifyPlusService.GetTrackRecommendations(this.player,e.recommendations,t,null),s=new Array;if(i.tracks.forEach(e=>{s.push(e.uri)}),0==s.length)return void(this.alertInfo="No recommended tracks were found for the preset criteria; adjust the preset criteria settings and try again.");this.alertInfo="Playing recommended tracks ...",this.requestUpdate(),this.spotifyPlusService.PlayerMediaPlayTracks(this.player,s.join(","),null,null,null,!1),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet("Could not get track recommendations for user preset.  "+ui(e)),this.mediaBrowserContentElement.scrollTop=0}finally{this.progressHide()}}async PlayTrackFavorites(e){try{if(!this.player.isUserProductPremium()&&!this.player.attributes.sp_user_has_web_player_credentials)throw new Error(Se);this.progressShow(),this.alertInfo="Playing track favorites ...",this.requestUpdate(),await this.spotifyPlusService.PlayerMediaPlayTrackFavorites(this.player,null,e.shuffle,null,!0,this.config.trackFavBrowserItemsLimit||200),this.store.card.SetSection(Yt.PLAYER)}catch(e){this.alertErrorSet("Could not play track favorites for user preset.  "+ui(e)),this.mediaBrowserContentElement.scrollTop=0}finally{this.progressHide()}}updateMediaList(e){if(!super.updateMediaList(e))return!1;try{this.mediaListLastUpdatedOn=ti(),this.mediaList=new Array;const e=new Array,t=new Promise((e,t)=>{try{const t=JSON.parse(JSON.stringify(this.config.userPresets||[]));if(t){const e="nocache="+ti();t.forEach(t=>{t.origin="card config",t.image_url=(t.image_url||"").replace("{nocache}",e)}),(this.mediaList||[]).push(...t)}e(!0)}catch(e){super.updatedMediaListError("Load User Presets from config failed: "+ui(e)),t(e)}});if(e.push(t),this.config.userPresetsFile){const t=new Promise((e,t)=>{fetch(this.config.userPresetsFile+"?nocache="+Date.now()).then(e=>{if(!e.ok)throw new Error("server response: "+e.status+" "+e.statusText);return e.json()}).then(t=>{const i=t;if(i){const e="nocache="+ti();i.forEach(t=>{t.origin=this.config.userPresetsFile,t.image_url=(t.image_url||"").replace("{nocache}",e)}),(this.mediaList||[]).push(...i)}e(!0)}).catch(e=>{super.updatedMediaListError("Could not fetch data from configuration `userPresetsFile` ("+this.config.userPresetsFile+"); "+ui(e)),t(e)})});e.push(t)}return this.progressShow(),Promise.allSettled(e).then(e=>{}).finally(()=>{this.progressHide()}),!0}catch(e){return this.progressHide(),super.updatedMediaListError("User Presets favorites refresh failed: "+ui(e)),!0}}};xo=Ce([He("crm-userpreset-browser")],xo);const Io={player:{de:"Player",pt:"Reprodutor",en:"Player"},devices:{de:"Geräte",pt:"Dispositivos",en:"Devices"},userPresets:{de:"Eigene Presets",pt:"Predefinições pessoais",en:"User Presets"},recents:{de:"Zuletzt gespielt",pt:"Reproduzidos recentemente",en:"Recently Played"},categories:{de:"Kategorien",pt:"Categorias",en:"Categories"},playlistFavorites:{de:"Lieblingsplaylists",pt:"Playlists favoritas",en:"Playlist Favorites"},albumFavorites:{de:"Lieblingsalben",pt:"Álbuns favoritos",en:"Album Favorites"},artistFavorites:{de:"Lieblingskünstler",pt:"Artistas favoritos",en:"Artist Favorites"},trackFavorites:{de:"Lieblingssongs",pt:"Músicas favoritas",en:"Track Favorites"},audiobookFavorites:{de:"Lieblingshörbücher",pt:"Audiolivros favoritos",en:"Audiobook Favorites"},showFavorites:{de:"Lieblingssendungen",pt:"Programas favoritos",en:"Show Favorites"},episodeFavorites:{de:"Lieblingsepisoden",pt:"Episódios favoritos",en:"Episode Favorites"},searchSpotify:{de:"Spotify durchsuchen",pt:"Pesquisar no Spotify",en:"Search Spotify"}};let ko=class extends re{getFooterLanguage(){const e=String(this.config?.language||"auto").toLowerCase(),t=document.querySelector("home-assistant"),i="auto"===e?String(t?.hass?.locale?.language||t?.hass?.language||document.documentElement.lang||navigator.language||"en").toLowerCase():e;return i.startsWith("de")?"de":i.startsWith("pt")?"pt":"en"}footerLabel(e){const t=Io[e];return t?t[this.getFooterLanguage()]||t.en:e}render(){return B`
      <ha-icon-button
        .path=${"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"}
        label=${this.footerLabel("player")}
        @click=${()=>this.onSectionClick(Yt.PLAYER)}
        selected=${this.getSectionSelected(Yt.PLAYER)}
        hide=${this.getSectionEnabled(Yt.PLAYER)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M20.07,19.07L18.66,17.66C20.11,16.22 21,14.21 21,12C21,9.78 20.11,7.78 18.66,6.34L20.07,4.93C21.88,6.74 23,9.24 23,12C23,14.76 21.88,17.26 20.07,19.07M17.24,16.24L15.83,14.83C16.55,14.11 17,13.11 17,12C17,10.89 16.55,9.89 15.83,9.17L17.24,7.76C18.33,8.85 19,10.35 19,12C19,13.65 18.33,15.15 17.24,16.24M4,3H12A2,2 0 0,1 14,5V19A2,2 0 0,1 12,21H4A2,2 0 0,1 2,19V5A2,2 0 0,1 4,3M8,5A2,2 0 0,0 6,7A2,2 0 0,0 8,9A2,2 0 0,0 10,7A2,2 0 0,0 8,5M8,11A4,4 0 0,0 4,15A4,4 0 0,0 8,19A4,4 0 0,0 12,15A4,4 0 0,0 8,11M8,13A2,2 0 0,1 10,15A2,2 0 0,1 8,17A2,2 0 0,1 6,15A2,2 0 0,1 8,13Z"}
        label=${this.footerLabel("devices")}
        @click=${()=>this.onSectionClick(Yt.DEVICES)}
        selected=${this.getSectionSelected(Yt.DEVICES)}
        hide=${this.getSectionEnabled(Yt.DEVICES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"}
        label=${this.footerLabel("userPresets")}
        @click=${()=>this.onSectionClick(Yt.USERPRESETS)}
        selected=${this.getSectionSelected(Yt.USERPRESETS)}
        hide=${this.getSectionEnabled(Yt.USERPRESETS)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3"}
        label=${this.footerLabel("recents")}
        @click=${()=>this.onSectionClick(Yt.RECENTS)}
        selected=${this.getSectionSelected(Yt.RECENTS)}
        hide=${this.getSectionEnabled(Yt.RECENTS)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z"}
        label=${this.footerLabel("categories")}
        @click=${()=>this.onSectionClick(Yt.CATEGORYS)}
        selected=${this.getSectionSelected(Yt.CATEGORYS)}
        hide=${this.getSectionEnabled(Yt.CATEGORYS)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M15,6V8H3V6H15M15,10V12H3V10H15M3,16V14H11V16H3M17,6H22V8H19V17A3,3 0 0,1 16,20A3,3 0 0,1 13,17A3,3 0 0,1 16,14C16.35,14 16.69,14.07 17,14.18V6M16,16A1,1 0 0,0 15,17A1,1 0 0,0 16,18A1,1 0 0,0 17,17A1,1 0 0,0 16,16Z"}
        label=${this.footerLabel("playlistFavorites")}
        @click=${()=>this.onSectionClick(Yt.PLAYLIST_FAVORITES)}
        selected=${this.getSectionSelected(Yt.PLAYLIST_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.PLAYLIST_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${Ti}
        label=${this.footerLabel("albumFavorites")}
        @click=${()=>this.onSectionClick(Yt.ALBUM_FAVORITES)}
        selected=${this.getSectionSelected(Yt.ALBUM_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.ALBUM_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M11,4A4,4 0 0,1 15,8A4,4 0 0,1 11,12A4,4 0 0,1 7,8A4,4 0 0,1 11,4M11,6A2,2 0 0,0 9,8A2,2 0 0,0 11,10A2,2 0 0,0 13,8A2,2 0 0,0 11,6M11,13C12.1,13 13.66,13.23 15.11,13.69C14.5,14.07 14,14.6 13.61,15.23C12.79,15.03 11.89,14.9 11,14.9C8.03,14.9 4.9,16.36 4.9,17V18.1H13.04C13.13,18.8 13.38,19.44 13.76,20H3V17C3,14.34 8.33,13 11,13M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z"}
        label=${this.footerLabel("artistFavorites")}
        @click=${()=>this.onSectionClick(Yt.ARTIST_FAVORITES)}
        selected=${this.getSectionSelected(Yt.ARTIST_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.ARTIST_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M12 3V13.55A4 4 0 1 0 14 17V7H18V3M10 19A2 2 0 1 1 12 17A2 2 0 0 1 10 19Z"}
        label=${this.footerLabel("trackFavorites")}
        @click=${()=>this.onSectionClick(Yt.TRACK_FAVORITES)}
        selected=${this.getSectionSelected(Yt.TRACK_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.TRACK_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M21,4H3A2,2 0 0,0 1,6V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V6A2,2 0 0,0 21,4M3,19V6H11V19H3M21,19H13V6H21V19M14,9.5H20V11H14V9.5M14,12H20V13.5H14V12M14,14.5H20V16H14V14.5Z"}
        label=${this.footerLabel("audiobookFavorites")}
        @click=${()=>this.onSectionClick(Yt.AUDIOBOOK_FAVORITES)}
        selected=${this.getSectionSelected(Yt.AUDIOBOOK_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.AUDIOBOOK_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${Ni}
        label=${this.footerLabel("showFavorites")}
        @click=${()=>this.onSectionClick(Yt.SHOW_FAVORITES)}
        selected=${this.getSectionSelected(Yt.SHOW_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.SHOW_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M17.3,11C17.3,14 14.76,16.1 12,16.1C9.24,16.1 6.7,14 6.7,11H5C5,14.41 7.72,17.23 11,17.72V21H13V17.72C16.28,17.23 19,14.41 19,11M10.8,4.9C10.8,4.24 11.34,3.7 12,3.7C12.66,3.7 13.2,4.24 13.2,4.9L13.19,11.1C13.19,11.76 12.66,12.3 12,12.3C11.34,12.3 10.8,11.76 10.8,11.1M12,14A3,3 0 0,0 15,11V5A3,3 0 0,0 12,2A3,3 0 0,0 9,5V11A3,3 0 0,0 12,14Z"}
        label=${this.footerLabel("episodeFavorites")}
        @click=${()=>this.onSectionClick(Yt.EPISODE_FAVORITES)}
        selected=${this.getSectionSelected(Yt.EPISODE_FAVORITES)}
        hide=${this.getSectionEnabled(Yt.EPISODE_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"}
        label=${this.footerLabel("searchSpotify")}
        @click=${()=>this.onSectionClick(Yt.SEARCH_MEDIA)}
        selected=${this.getSectionSelected(Yt.SEARCH_MEDIA)}
        hide=${this.getSectionEnabled(Yt.SEARCH_MEDIA)}
      ></ha-icon-button>
    `}static get styles(){return a`
      :host > ha-icon-button {
        color: var(--crm-icon-color, #e5f5ee) !important;
        --mdc-icon-button-ink-color: var(--crm-icon-color, #e5f5ee);
        --ha-icon-color: var(--crm-icon-color, #e5f5ee);
        --state-icon-color: var(--crm-icon-color, #e5f5ee);
        --primary-color: var(--crm-accent, #40d99a);
        --mdc-theme-primary: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-color: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 14%, transparent);
        border-radius: 50%;
      }

      :host > ha-icon-button[selected] {
        color: var(--crm-accent, #40d99a) !important;
        background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 12%, transparent);
        --primary-color: var(--crm-accent, #40d99a);
        --mdc-theme-primary: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-color: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 12%, transparent);
      }

      :host > ha-icon-button[hide] {
        display: none;
      }
    `}onSectionClick(e){this.dispatchEvent(Xt(pe,e))}getSectionSelected(e){return this.section===e||V}getSectionEnabled(e){return this.config.sections&&!this.config.sections?.includes(e)||V}};Ce([De({attribute:!1})],ko.prototype,"config",void 0),Ce([De()],ko.prototype,"section",void 0),ko=Ce([He("crm-footer")],ko);const $o=ne+"-card-editor-config-area-selected";class To{constructor(e){this.section=e||Yt.UNDEFINED}}function Eo(e){const t=new To;return t.section=e,new CustomEvent($o,{bubbles:!0,composed:!0,detail:t})}class Po extends re{constructor(){super()}static get styles(){return a`
      ha-svg-icon {
        margin: 5px;
      }
      ha-control-button {
        white-space: nowrap;
      }
      ha-control-button-group {
        margin: 5px;
      }
      div {
        margin-top: 20px;
      }
    `}setConfig(e){const t=JSON.parse(JSON.stringify(e));t.sections&&0!==t.sections.length||(t.sections=[Yt.PLAYER],Ls.selectedConfigArea=Kt.GENERAL),this.config=t}configChanged(e=void 0){let t={};e&&(t=ci(this.config,e),this.config={...this.config,...e});const i=oi(Ls.selectedConfigArea);this.section!=i&&(this.section=i,this.store.section=this.section,document.dispatchEvent(Eo(this.section))),((e,t,i,s)=>{s=s||{},i=null==i?{}:i;const r=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});r.detail=i,e.dispatchEvent(r)})(this,"config-changed",{config:this.config}),function(e,t){const i=Xt(e,t);document.dispatchEvent(i)}("crm-dispatch-event-config-updated",t)}dispatchClose(){return super.dispatchEvent(new CustomEvent("closed"))}createStore(){if(this.store)return;const e=oi(Ls.selectedConfigArea);this.config.sections&&0!==this.config.sections.length||(this.config.sections=[Yt.PLAYER],Ls.selectedConfigArea=Kt.GENERAL),this.store=new Ls(this.hass,this.config,this,e),this.player=this.store.player,this.section=this.store.section}SetSection(e){(!this.config.sections||this.config.sections.indexOf(e)>-1)&&(this.section=e,this.store.section=this.section,super.requestUpdate())}}Ce([De({attribute:!1})],Po.prototype,"hass",void 0),Ce([De({attribute:!1})],Po.prototype,"config",void 0),Ce([De({attribute:!1})],Po.prototype,"store",void 0),Ce([De({attribute:!0})],Po.prototype,"section",void 0),Ce([De({attribute:!1})],Po.prototype,"footerBackgroundColor",void 0),Ce([Ve()],Po.prototype,"playerImage",void 0),Ce([Ve()],Po.prototype,"playerMediaContentId",void 0),Ce([Ve()],Po.prototype,"vibrantImage",void 0),Ce([Ve()],Po.prototype,"vibrantMediaContentId",void 0);class _o extends Po{get compactIntegerFields(){const e=this.schema;return Array.isArray(e)&&e.length&&e.every(e=>"integer"===e?.type&&"string"==typeof e.name)?e:null}updateInteger(e,t){const i=this.data||this.config;this.configChanged({...i,[e]:t})}render(){const e=this.compactIntegerFields;return e?B`
      <div class="crm-compact-fields">
        ${e.map(e=>{const t=this.data||this.config,i=e.valueMin??1,s=e.valueMax??100,r=Number(t[e.name]??e.default??i),o=Number.isFinite(r)?Math.max(i,Math.min(s,r)):i,a=`crm-range-${e.name}`;return B`<div class="crm-compact-field">
            <div class="crm-compact-heading"><label for=${a}>${e.label||Lo({name:e.name})}</label>
              <output>${o}</output></div>
            <input id=${a} type="range" min=${i} max=${s} step="1" .value=${String(o)}
              style=${`--crm-range-percent:${(o-i)/Math.max(1,s-i)*100}%`}
              @input=${t=>this.updateInteger(e.name,Number(t.currentTarget.value))}
              aria-label=${e.label||e.name} />
          </div>`})}
      </div>`:B`
      <ha-form
        id="elmHaForm"
        .data=${this.data||this.config}
        .schema=${this.schema}
        .computeLabel=${Lo}
        .hass=${this.hass}
        @value-changed=${this.changed||this.onValueChanged}
      ></ha-form>
    `}static get styles(){return a`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;

        --ha-form-style-integer-margin-bottom: 4px;
        --ha-form-style-multiselect-margin-bottom: 4px;
        --ha-form-style-selector-margin-bottom: 4px;
        --ha-form-style-selector-boolean-min-height: 32px;
        --ha-form-style-string-margin-bottom: 4px;

        /* Inherit the ControlRoom palette rather than HA's global theme. */
        --crm-form-accent: var(--crm-editor-accent, var(--primary-color, #159568));
        --crm-form-text: var(--primary-text-color, #17221e);
        --crm-form-muted: var(--secondary-text-color, #52635b);
        --crm-form-surface: var(--secondary-background-color, transparent);
      }

      .crm-compact-fields { display: grid; gap: 16px; width: 100%; min-width: 0; padding: 2px 0; }
      .crm-compact-field { display: grid; gap: 9px; min-width: 0; }
      .crm-compact-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .crm-compact-heading label { font-size: 12px; font-weight: 550; line-height: 1.35; color: var(--primary-text-color, #17221e); }
      .crm-compact-heading output { min-width: 35px; text-align: center; padding: 5px 7px; border-radius: 8px; font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--primary-text-color, #17221e); background: var(--secondary-background-color, rgba(127,127,127,.1)); border: 1px solid var(--divider-color, rgba(127,127,127,.2)); }
      .crm-compact-field input[type=range] { display: block; width: 100%; height: 6px; margin: 7px 0; padding: 0; cursor: pointer; accent-color: var(--crm-editor-accent, var(--primary-color, #159568)); }
      .crm-compact-field input[type=range]:focus-visible { outline: 2px solid var(--crm-editor-accent, var(--primary-color, #159568)); outline-offset: 6px; border-radius: 4px; }

      ha-form {
        display: block;
        width: 100%;
        min-width: 0;
        color: var(--primary-text-color);

        --mdc-menu-item-height: 36px;
        --mdc-text-field-fill-color:
          var(--secondary-background-color, rgba(127,127,127,.06));
        --mdc-text-field-ink-color: var(--primary-text-color);
        --mdc-text-field-label-ink-color: var(--secondary-text-color);
        --mdc-text-field-outlined-idle-border-color: transparent;
        --mdc-text-field-outlined-hover-border-color: var(--divider-color);
        --ha-textfield-border-width: 1px;

        /* MDC (older HA controls) */
        --mdc-theme-primary: var(--crm-form-accent);
        --mdc-theme-on-surface: var(--crm-form-text);
        --mdc-theme-text-primary-on-background: var(--crm-form-text);
        --mdc-theme-text-secondary-on-background: var(--crm-form-muted);
        --mdc-text-field-ink-color: var(--crm-form-text);
        --mdc-text-field-label-ink-color: var(--crm-form-muted);
        --mdc-text-field-fill-color: var(--crm-form-surface);
        --mdc-select-ink-color: var(--crm-form-text);
        --mdc-select-label-ink-color: var(--crm-form-muted);
        --mdc-select-fill-color: var(--crm-form-surface);
        --mdc-checkbox-checked-color: var(--crm-form-accent);
        --mdc-switch-selected-track-color: var(--crm-form-accent);
        --mdc-switch-selected-handle-color: var(--crm-form-accent);
        --mdc-radio-checked-color: var(--crm-form-accent);

        /* Home Assistant selectors and switches */
        --ha-selector-text-color: var(--crm-form-text);
        --ha-selector-label-color: var(--crm-form-muted);
        --switch-checked-color: var(--crm-form-accent);
        --switch-checked-track-color: var(--crm-form-accent);
        --switch-checked-button-color: var(--crm-form-accent);
        --ha-switch-checked-color: var(--crm-form-accent);
        --ha-switch-checked-track-color: var(--crm-form-accent);
        --ha-switch-checked-button-color: var(--crm-form-accent);
        --ha-control-color: var(--crm-form-accent);
        --ha-control-checked-color: var(--crm-form-accent);
        --ha-textfield-ink-color: var(--crm-form-text);
        --ha-textfield-label-color: var(--crm-form-muted);
        --ha-textfield-focus-color: var(--crm-form-accent);
        --ha-select-ink-color: var(--crm-form-text);
        --ha-select-label-color: var(--crm-form-muted);
        --ha-select-focus-color: var(--crm-form-accent);

        /* Material Web (newer HA controls) */
        --md-sys-color-primary: var(--crm-form-accent);
        --md-sys-color-on-surface: var(--crm-form-text);
        --md-sys-color-on-surface-variant: var(--crm-form-muted);
        --md-sys-color-surface-container-highest: var(--crm-form-surface);
      }
    `}firstUpdated(e){super.firstUpdated(e),this._applyStudioStyles()}updated(e){super.updated(e),this._applyStudioStyles()}onValueChanged(e){e.stopPropagation();const t=e.detail?.value;t&&this.configChanged(t)}async _applyStudioStyles(){const e=this._elmHaForm;if(!e)return;if(await e.updateComplete,!this.isConnected||e!==this._elmHaForm)return;const t=e.shadowRoot;if(t){if(!t.querySelector("#crm-studio-form-styles")){const e=document.createElement("style");e.id="crm-studio-form-styles",e.textContent="\n        :host {\n          display: block;\n          min-width: 0;\n\n          --ha-form-style-integer-margin-bottom: 4px;\n          --ha-form-style-multiselect-margin-bottom: 4px;\n          --ha-form-style-selector-margin-bottom: 4px;\n          --ha-form-style-selector-boolean-min-height: 32px;\n          --ha-form-style-string-margin-bottom: 4px;\n        }\n\n        .root {\n          display: flex;\n          flex-direction: column;\n          gap: 7px;\n          min-width: 0;\n        }\n\n        .root > * {\n          display: block;\n          min-width: 0;\n          margin: 0 !important;\n          box-sizing: border-box;\n        }\n\n        ha-form-string,\n        ha-form-integer,\n        ha-form-select,\n        ha-form-multi_select,\n        ha-selector {\n          color: var(--crm-form-text, var(--primary-text-color));\n          --primary-color: var(--crm-form-accent, #159568);\n          --success-color: var(--crm-form-accent, #159568);\n          --mdc-theme-primary: var(--crm-form-accent, #159568);\n          --mdc-theme-on-surface: var(--crm-form-text, var(--primary-text-color));\n          --mdc-theme-text-primary-on-background: var(--crm-form-text, var(--primary-text-color));\n          --mdc-theme-text-secondary-on-background: var(--crm-form-muted, var(--secondary-text-color));\n          --mdc-menu-item-height: 36px;\n          --mdc-text-field-fill-color:\n            var(--secondary-background-color, rgba(127,127,127,.06));\n          --mdc-text-field-ink-color: var(--primary-text-color);\n          --mdc-text-field-label-ink-color: var(--secondary-text-color);\n          --mdc-text-field-outlined-idle-border-color: transparent;\n          --mdc-text-field-outlined-hover-border-color: var(--divider-color);\n          --ha-textfield-border-width: 1px;\n          --mdc-select-ink-color: var(--crm-form-text, var(--primary-text-color));\n          --mdc-select-label-ink-color: var(--crm-form-muted, var(--secondary-text-color));\n          --mdc-checkbox-checked-color: var(--crm-form-accent, #159568);\n          --switch-checked-color: var(--crm-form-accent, #159568);\n          --switch-checked-track-color: var(--crm-form-accent, #159568);\n          --ha-switch-checked-color: var(--crm-form-accent, #159568);\n          --ha-switch-checked-track-color: var(--crm-form-accent, #159568);\n          --ha-control-color: var(--crm-form-accent, #159568);\n          --ha-control-checked-color: var(--crm-form-accent, #159568);\n          --md-sys-color-primary: var(--crm-form-accent, #159568);\n          --md-sys-color-on-surface: var(--crm-form-text, var(--primary-text-color));\n          --md-sys-color-on-surface-variant: var(--crm-form-muted, var(--secondary-text-color));\n        }\n      ",t.appendChild(e)}for(const e of Array.from(t.querySelectorAll("ha-selector"))){const t=e.shadowRoot?.querySelector("ha-selector-boolean"),i=t?.shadowRoot?.querySelector("ha-formfield");i instanceof HTMLElement&&(i.style.minHeight="32px",i.style.margin="0")}}}}function Lo({label:e,name:t}){if(e)return e;const i=t.replace(/([A-Z])/g," $1");return i.charAt(0).toUpperCase()+i.slice(1)}Ce([De({attribute:!1})],_o.prototype,"schema",void 0),Ce([De({attribute:!1})],_o.prototype,"data",void 0),Ce([De({attribute:!1})],_o.prototype,"changed",void 0),Ce([ze("#elmHaForm")],_o.prototype,"_elmHaForm",void 0),customElements.define("crm-editor-form",_o);class Ro extends Po{constructor(){super(...arguments),this.showEssentials=!0}updateField(e,t){this.configChanged({...this.config,[e]:t})}onLanguageChange(e){const t=e.currentTarget.value;this.updateField("language",t)}render(){super.createStore();const e=this.config.language??"auto",t=t=>Ye(t,e,this.hass.locale?.language||this.hass.language),i="auto"===e?(this.hass.locale?.language||this.hass.language||"en").toLowerCase():e,s=i.startsWith("pt"),r=i.startsWith("de"),o=(e,t,i)=>s?e:r?t:i,a=o("Configurações do cartão","Karteneinstellungen","Card settings"),n=o("Informações básicas","Grundlegende Angaben","Basic information"),l=o("Idioma, conta e identificação","Sprache, Konto und Bezeichnung","Language, account and identity"),c=o("Prévia do cartão","Kartenvorschau","Card preview"),d=o("As informações abaixo são apenas uma prévia da configuração.","Die Angaben unten zeigen nur eine Vorschau der Einstellungen.","The details below are only a configuration preview."),h=t(`editor.generalSettings.${"language"}`),p=o("Conta de música","Musikkonto","Music account"),u=o("Escolha a entidade SpotifyPlus vinculada à conta desejada.","Wähle die SpotifyPlus-Entität des gewünschten Kontos.","Choose the SpotifyPlus entity linked to the account you want."),m=o("Nenhuma conta selecionada","Kein Konto ausgewählt","No account selected"),g="ControlRoom Music";const v=String(this.config.entity??"");return B`
      <div class="studio">
        <div class="studio-top">
          <div>
            <div class="studio-eyebrow">CONTROLROOM STUDIO</div>
            <div class="studio-title">${a}</div>
          </div>
          <span class="studio-version">v${ae}</span>
        </div>

        <section class="studio-panel studio-fold">
          <button
            type="button"
            class="studio-fold-button"
            aria-expanded=${this.showEssentials?"true":"false"}
            @click=${()=>{this.showEssentials=!this.showEssentials}}
          >
            <span class="studio-icon"><ha-icon icon="mdi:tune-vertical"></ha-icon></span>
            <span class="studio-fold-text">
              <strong>${n}</strong>
              <small>${l}</small>
            </span>
            <ha-icon class="fold-chevron" icon=${this.showEssentials?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
          </button>

          ${this.showEssentials?B`
            <div class="studio-fold-body">
              <label class="studio-field studio-language-row">
                <span class="studio-label"><ha-icon icon="mdi:translate"></ha-icon>${h}</span>
                <span class="studio-select-container">
                  <select
                    class="studio-input studio-select"
                    .value=${e}
                    @change=${this.onLanguageChange}
                  >
                    <option value="auto">🌐 ${t("editor.automaticLanguage")}</option>
                    <option value="pt">🇧🇷 Português</option>
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="en">🇺🇸 English</option>
                  </select>
                  <ha-icon icon="mdi:chevron-down"></ha-icon>
                </span>
              </label>

              <div class="studio-field studio-entity">
                <label class="studio-label" for="crm-music-account"><ha-icon icon="mdi:spotify"></ha-icon>${p}</label>
                <span class="studio-select-container">
                  <select id="crm-music-account" class="studio-input studio-select studio-account-select"
                    .value=${v||""}
                    @change=${e=>this.updateField("entity",e.currentTarget.value)}>
                    <option value="">${m}</option>
                    ${Object.values(this.hass.states||{}).filter(e=>e.entity_id.startsWith("media_player.")&&(e.entity_id===v||e.entity_id.toLowerCase().includes("spotifyplus")||String(e.attributes?.friendly_name||"").toLowerCase().includes("spotifyplus"))).sort((e,t)=>e.entity_id.localeCompare(t.entity_id)).map(e=>B`<option value=${e.entity_id}>${e.attributes?.friendly_name||e.entity_id} — ${e.entity_id}</option>`)}
                  </select>
                  <ha-icon icon="mdi:chevron-down"></ha-icon>
                </span>
                <div class="studio-hint">${u}</div>
              </div>

            </div>
          `:V}
        </section>

        <section class="studio-panel preview-panel">
          <div class="preview-heading">
            <span class="studio-icon"><ha-icon icon="mdi:card-text-outline"></ha-icon></span>
            <div class="preview-heading-copy">
              <strong>${c}</strong>
              <small>${d}</small>
            </div>
          </div>
          <div class="preview-card">
            <span class="preview-mark"><ha-icon icon="mdi:spotify"></ha-icon></span>
            <span class="preview-copy">
              <strong>${g}</strong>
              <small>${v||m}</small>
            </span>
            <ha-icon class="preview-music" icon="mdi:music-note"></ha-icon>
          </div>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio { display: grid; gap: 12px; min-width: 0; color: var(--primary-text-color); }
      .studio-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 3px 2px 7px; }
      .studio-eyebrow { font-size: 10px; font-weight: 750; letter-spacing: .14em; color: var(--secondary-text-color); }
      .studio-title { margin-top: 5px; font-size: 17px; font-weight: 700; }
      .studio-version { flex-shrink: 0; padding: 5px 9px; border-radius: 999px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); background: var(--secondary-background-color, transparent); font-size: 11px; color: var(--secondary-text-color); }
      .studio-panel { min-width: 0; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 15px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-fold { overflow: hidden; }
      .studio-fold-button { width: 100%; min-height: 67px; padding: 13px 14px; display: flex; align-items: center; gap: 11px; border: 0; background: transparent; color: var(--primary-text-color); font: inherit; text-align: left; cursor: pointer; }
      .studio-fold-button:hover { background: var(--secondary-background-color, transparent); }
      .studio-fold-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
      .studio-icon { display: flex; justify-content: center; align-items: center; flex: 0 0 37px; width: 37px; height: 37px; border-radius: 11px; background: color-mix(in srgb, var(--primary-color, #1db954) 12%, var(--secondary-background-color, transparent)); color: var(--primary-color, #1db954); }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-fold-text { display: grid; flex: 1; gap: 4px; min-width: 0; }
      .studio-fold-text strong, .preview-heading-copy strong { font-size: 13px; font-weight: 650; }
      .studio-fold-text small, .preview-heading-copy small { font-size: 11px; line-height: 1.45; color: var(--secondary-text-color); }
      .fold-chevron { --mdc-icon-size: 19px; color: var(--secondary-text-color); }
      .studio-fold-body { padding: 1px 14px 16px; }
      .studio-field { display: flex; flex-direction: column; gap: 8px; min-width: 0; margin-bottom: 16px; }
      .studio-field:last-child { margin-bottom: 0; }
      .studio-language-row { flex-direction: row; align-items: center; justify-content: space-between; gap: 12px; }
      .studio-language-row .studio-select-container { flex: 0 1 190px; width: 190px; min-width: 140px; }
      .studio-language-row .studio-input { height: 38px; background: var(--card-background-color, #fff); color: var(--primary-text-color, #17221e); }
      @media (max-width: 340px) { .studio-language-row .studio-select-container { min-width: 125px; } }
      .studio-label { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: var(--primary-text-color); }
      .studio-label ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
      .studio-input { display: block; width: 100%; min-width: 0; height: 41px; padding: 0 12px; border-radius: 10px; border: 1px solid var(--divider-color, rgba(128,128,128,.25)); background: var(--secondary-background-color, transparent); color: var(--primary-text-color); font: inherit; font-size: 13px; }
      .studio-input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
      .studio-select-container { display: block; position: relative; }
      .studio-select { appearance: none; -webkit-appearance: none; padding-right: 36px; cursor: pointer; }
      .studio-select-container > ha-icon { position: absolute; right: 11px; top: 11px; --mdc-icon-size: 19px; pointer-events: none; color: var(--secondary-text-color); }
      .studio-select option { background: var(--card-background-color, #202029); color: var(--primary-text-color); }
      .studio-entity { margin: 1px 0 0; display: grid; gap: 8px; }
      .studio-account-select { width: 100%; height: 43px; color: var(--primary-text-color, #17221e) !important; background: var(--card-background-color, #fff) !important; border: 1px solid var(--divider-color, #ccd2d0); border-radius: 11px; font-size: 13px; }
      .studio-entity crm-editor-form {
        display: block;
        min-width: 0;
        color: var(--primary-text-color);
        --mdc-theme-primary: var(--crm-editor-accent, var(--primary-color));
        --mdc-theme-on-surface: var(--primary-text-color);
        --mdc-text-field-ink-color: var(--primary-text-color);
        --mdc-text-field-label-ink-color: var(--secondary-text-color);
        --mdc-text-field-fill-color: var(--secondary-background-color);
        --mdc-text-field-outlined-idle-border-color: var(--divider-color);
        --mdc-text-field-outlined-hover-border-color: var(--primary-color);
        --ha-textfield-input-color: var(--primary-text-color);
        --ha-textfield-label-color: var(--secondary-text-color);
        --input-text-color: var(--primary-text-color);
        --md-sys-color-on-surface: var(--primary-text-color);
        --md-sys-color-on-surface-variant: var(--secondary-text-color);
        --md-sys-color-surface: var(--card-background-color);
        --md-sys-color-surface-container: var(--card-background-color);
        --md-sys-color-surface-container-high: var(--card-background-color);
        --md-sys-color-surface-container-highest: var(--card-background-color);
        --mdc-select-ink-color: var(--primary-text-color);
        --ha-selector-text-color: var(--primary-text-color);
        --ha-select-ink-color: var(--primary-text-color);
        --primary-background-color: var(--card-background-color);
        --secondary-background-color: var(--secondary-background-color);
      }
      .studio-hint { font-size: 11px; color: var(--secondary-text-color); line-height: 1.5; margin: -4px 0 0; }
      .preview-panel { padding: 14px; }
      .preview-heading { display: flex; align-items: center; gap: 11px; margin-bottom: 13px; }
      .preview-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .preview-card { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 13px; border: 1px solid color-mix(in srgb, var(--primary-color, #1db954) 24%, var(--divider-color, rgba(128,128,128,.2))); border-radius: 13px; background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color, #1db954) 12%, var(--card-background-color, #171d1a)), var(--card-background-color, #171d1a)); }
      .preview-mark { display: flex; align-items: center; justify-content: center; flex: 0 0 42px; width: 42px; height: 42px; border-radius: 12px; background: var(--primary-color, #1db954); color: #fff; }
      .preview-mark ha-icon { --mdc-icon-size: 25px; }
      .preview-copy { display: grid; gap: 4px; flex: 1; min-width: 0; }
      .preview-copy strong { font-size: 13px; overflow-wrap: anywhere; }
      .preview-copy small { font-size: 10px; color: var(--secondary-text-color); overflow-wrap: anywhere; }
      .preview-music { --mdc-icon-size: 20px; color: var(--primary-color, #1db954); }
      @media (max-width: 340px) { .studio-fold-button { padding: 11px; } .studio-fold-body { padding: 0 11px 12px; } .preview-panel { padding: 11px; } }
    `}}Ce([Ve()],Ro.prototype,"showEssentials",void 0),customElements.define("crm-general-editor",Ro);customElements.define("crm-design-editor",class extends Po{constructor(){super(...arguments),this.defaults={crmBackground:"#101b19",crmAccent:"#34d399",crmText:"#f0fdf4",crmIconColor:"#183329",crmBorderRadius:"20px"}}setField(e,t){this.configChanged({...this.config,[e]:t})}setTheme(e){this.setField("crmTheme",e)}onTextChange(e){const t=e.currentTarget;this.setField(t.name,t.value)}onColorChange(e){const t=e.currentTarget;this.setField(t.name,t.value)}resetField(e){this.setField(e,this.defaults[e])}getValue(e){const t=this.config[e];return null==t?this.defaults[e]:String(t)}getTheme(){const e=this.config.crmTheme;return"light"===e||"dark"===e||"auto"===e||"custom"===e?e:"dark"}contrastInk(e){const t=e.trim().match(/^#([0-9a-f]{6})$/i);if(!t)return"#ffffff";const i=t[1],s=[0,2,4].map(e=>parseInt(i.slice(e,e+2),16)/255),r=s.map(e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4);return.2126*r[0]+.7152*r[1]+.0722*r[2]>.179?"#101b19":"#ffffff"}colorControl(e,t,i){const s=this.getValue(e),r=/^#[0-9a-fA-F]{6}$/.test(s);return B`

      <div class="color-row">

        <div class="color-top">

          <span class="field-label">${t}</span>

          <button class="reset" type="button" @click=${()=>this.resetField(e)}>${i}</button>

        </div>

        <div class="color-controls">

          <label class="color-picker" title=${t}>

            <input

              type="color"

              name=${e}

              aria-label=${t}

              .value=${r?s:this.defaults[e]}

              @input=${this.onColorChange}

            />

          </label>

          <input

            class="studio-input color-text"

            type="text"

            name=${e}

            aria-label=${t}

            spellcheck="false"

            .value=${s}

            @change=${this.onTextChange}

          />

        </div>

      </div>

    `}themeChoice(e,t,i,s){const r=s===e;return B`

      <button

        type="button"

        class="theme-option ${r?"selected":""}"

        aria-pressed=${String(r)}

        @click=${()=>this.setTheme(e)}

      >

        <span class="theme-thumbnail ${e}" aria-hidden="true">

          <span class="thumbnail-paper"><span class="thumbnail-aa">Aa</span><span class="thumbnail-line"></span></span>

        </span>

        <span class="theme-copy"><strong>${t}</strong><small>${i}</small></span>

        <span class="theme-indicator" aria-hidden="true">${r?B`<ha-icon icon="mdi:check"></ha-icon>`:""}</span>

      </button>

    `}render(){super.createStore();const e=this.config.language??"auto",t=t=>Ye(`editor.designSettings.${t}`,e,this.hass.language),i=("auto"===e?this.hass.language:e).toLowerCase(),s=i.startsWith("pt"),r=i.startsWith("de"),o={appearance:s?"Aparência":r?"Erscheinungsbild":"Appearance",appearanceHint:s?"Escolha como o cartão deve aparecer":r?"Wähle das Design der Karte":"Choose how the card looks",light:s?"Claro":r?"Hell":"Light",lightHint:s?"Sempre no modo claro":r?"Immer im hellen Design":"Always use light mode",dark:s?"Escuro":r?"Dunkel":"Dark",darkHint:s?"Sempre no modo escuro":r?"Immer im dunklen Design":"Always use dark mode",auto:s?"Automático":r?"Automatisch":"Automatic",autoHint:s?"Segue o tema do Home Assistant":r?"Folgt dem Home Assistant-Design":"Follow the Home Assistant theme",custom:s?"Personalizado":r?"Benutzerdefiniert":"Custom",customHint:s?"Escolha suas próprias cores":r?"Eigene Farben auswählen":"Choose your own colors",colors:s?"Paleta de cores":r?"Farbpalette":"Color palette",colorsHint:s?"Personalize a identidade visual do cartão":r?"Passe die Farben deiner Karte an":"Customize the card colors",iconColor:s?"Cor dos ícones":r?"Symbolfarbe":"Icon color",iconAuto:s?"Automática":r?"Automatisch":"Automatic",iconCustom:s?"Personalizada":r?"Benutzerdefiniert":"Custom",dimensions:s?"Dimensões personalizadas":r?"Benutzerdefinierte Abmessungen":"Custom dimensions",width:s?"Largura":r?"Breite":"Width",height:s?"Altura":r?"Höhe":"Height",dimensionsHint:s?"Deixe vazio para usar o tamanho padrão.":r?"Leer lassen, um die Standardgröße zu verwenden.":"Leave empty to use the default size.",heightTitle:s?"Altura do cartão":r?"Kartenhöhe":"Card height",heightHint:s?"Escolha como o cartão ocupa o espaço vertical":r?"Lege fest, wie die Karte den vertikalen Platz nutzt":"Choose how the card uses vertical space",compact:s?"Compacto":r?"Kompakt":"Compact",compactHint:s?"Menor altura, com rolagem interna":r?"Kleine Höhe mit internem Scrollen":"Short height with internal scrolling",automatic:s?"Automático":r?"Automatisch":"Automatic",automaticHint:s?"Cresce conforme o conteúdo":r?"Wächst mit dem Inhalt":"Grows with the content",fill:s?"Preencher":r?"Ausfüllen":"Fill",fillHint:s?"Ocupa a altura disponível":r?"Nutzt die verfügbare Höhe":"Uses the available height",shape:s?"Formato":r?"Form":"Shape",preview:s?"Prévia das cores":r?"Farbvorschau":"Color preview",previewTitle:s?"Minha música":r?"Meine Musik":"My music",previewSubtitle:s?"Pronto para tocar":r?"Bereit für Musik":"Ready to play",reset:s?"Restaurar":r?"Zurücksetzen":"Reset",radiusHint:s?"Arraste para ajustar ou digite um valor CSS, como 1rem.":r?"Mit dem Regler anpassen oder einen CSS-Wert wie 1rem eingeben.":"Use the slider or enter a CSS value such as 1rem.",radiusSoft:s?"Suave":r?"Weich":"Soft",radiusSquare:s?"Reto":r?"Eckig":"Square",customUnit:s?"Valor personalizado":r?"Benutzerdefinierter Wert":"Custom value",dimensionStatus:s?"Tamanho definido manualmente":r?"Manuell festgelegte Größe":"Manually defined size",dimensionDefault:s?"Tamanho padrão":r?"Standardgröße":"Default size"},a=this.getValue("crmBorderRadius"),n=/^\s*(\d+(?:\.\d+)?)px\s*$/i.exec(a),l=n?Math.min(48,Math.max(0,Number(n[1]))):20,c=!n,d=String(this.config.width??""),h=String(this.config.height??""),p=this.getTheme(),u=!1!==this.hass?.themes?.darkMode,m="dark"===p||"auto"===p&&u?{background:"#101b19",accent:"#34d399",text:"#f0fdf4"}:{background:"#f7faf8",accent:"#16875c",text:"#183329"},g="custom"===p?this.getValue("crmBackground"):m.background,v="custom"===p?this.getValue("crmAccent"):m.accent,f="custom"===p?this.getValue("crmText"):m.text;return B`

      <div class="studio">

        <div class="studio-heading">

          <span class="studio-kicker">CONTROLROOM STUDIO</span>

          <h3>${t("description")}</h3>

        </div>



        <div class="studio-panel">

          <div class="panel-title">${o.appearance}</div>

          <div class="panel-hint">${o.appearanceHint}</div>

          <div class="theme-list" role="group" aria-label=${o.appearance}>

            ${this.themeChoice("light",o.light,o.lightHint,p)}

            ${this.themeChoice("dark",o.dark,o.darkHint,p)}

            ${this.themeChoice("auto",o.auto,o.autoHint,p)}

            ${this.themeChoice("custom",o.custom,o.customHint,p)}

          </div>

        </div>



        <div class="studio-panel">

          <div class="panel-title">${o.heightTitle}</div>

          <div class="height-mode-visual">

            ${[["compact",o.compact],["auto",o.automatic],["fill",o.fill]].map(([e,t])=>B`

              <button

                type="button"

                class="height-visual-option ${(this.config.heightMode??("fill"===this.config.height?"fill":"compact"))===e?"selected":""}"

                aria-pressed=${String((this.config.heightMode??("fill"===this.config.height?"fill":"compact"))===e)}

                @click=${()=>this.configChanged({...this.config,heightMode:e})}

              >

                <span class="height-visual-art ${e}">

                  ${"compact"===e?B`

                    <span class="art-row accent"></span>

                    <span class="art-row"></span>

                    <span class="art-line"></span>

                  `:"auto"===e?B`

                    <span class="art-row"></span>

                    <span class="art-row"></span>

                    <span class="art-row"></span>

                  `:B`

                    <span class="art-fill">

                      <ha-icon icon="mdi:arrow-expand-vertical"></ha-icon>

                    </span>

                  `}

                </span>

                <span class="height-visual-label">${t}</span>

              </button>

            `)}

          </div>

        </div>



        <div class="studio-panel dimensions-panel">

          <div class="panel-title">${o.dimensions}</div>

          <div class="panel-hint">${o.dimensionsHint}</div>

          <div class="dimensions-grid">

            <label class="dimension-tile">

              <span class="dimension-heading"><ha-icon icon="mdi:arrow-expand-horizontal"></ha-icon><span>${o.width}</span></span>

              <span class="dimension-input-wrap">

                <input class="studio-input dimension-input" type="text" name="width"

                  .value=${d} placeholder="—" @change=${this.onTextChange} />

              </span>

              <span class="dimension-meta">${d.trim()?o.dimensionStatus:o.dimensionDefault}</span>

            </label>

            <label class="dimension-tile">

              <span class="dimension-heading"><ha-icon icon="mdi:arrow-expand-vertical"></ha-icon><span>${o.height}</span></span>

              <span class="dimension-input-wrap">

                <input class="studio-input dimension-input" type="text" name="height"

                  .value=${h} placeholder="—" @change=${this.onTextChange} />

              </span>

              <span class="dimension-meta">${h.trim()?o.dimensionStatus:o.dimensionDefault}</span>

            </label>

          </div>

        </div>



        ${"custom"===p?B`

          <div class="studio-panel">

            <div class="panel-title">${o.colors}</div>

            <div class="panel-hint">${o.colorsHint}</div>

            ${this.colorControl("crmBackground",t("background"),o.reset)}

            ${this.colorControl("crmAccent",t("accent"),o.reset)}

            ${this.colorControl("crmText",t("text"),o.reset)}

            <div class="color-row">

              <span class="field-label">${o.iconColor}</span>

              <select

                class="studio-input"

                name="crmIconMode"

                .value=${this.config.crmIconMode??"auto"}

                @change=${this.onTextChange}

              >

                <option value="auto">${o.iconAuto}</option>

                <option value="custom">${o.iconCustom}</option>

              </select>

            </div>

            ${"custom"===this.config.crmIconMode?this.colorControl("crmIconColor",o.iconColor,o.reset):""}

          </div>

        `:""}



        <div class="studio-panel shape-panel">

          <div class="shape-heading">

            <div class="panel-title">${o.shape}</div>

            <button class="reset" type="button" @click=${()=>this.resetField("crmBorderRadius")}>${o.reset}</button>

          </div>

          <div class="shape-workspace">

            <div class="shape-illustration" aria-hidden="true">

              <div class="shape-sample" style=${`border-radius: ${a};`}>

                <span></span><span></span><span></span>

              </div>

            </div>

            <div class="shape-settings">

              <div class="shape-value-row">

                <label class="field-label" for="radius">${t("borderRadius")}</label>

                <span class="shape-value">${c?o.customUnit:`${l}px`}</span>

              </div>

              <input class="radius-range" type="range" min="0" max="48" step="1"

                aria-label=${t("borderRadius")} .value=${String(l)}

                @input=${e=>this.setField("crmBorderRadius",`${e.currentTarget.value}px`)} />

              <div class="range-labels"><span>${o.radiusSquare}</span><span>${o.radiusSoft}</span></div>

            </div>

          </div>

          <div class="shape-manual">

            <input id="radius" class="studio-input" type="text" name="crmBorderRadius"

              .value=${a} @change=${this.onTextChange} />

            <div class="field-hint">${o.radiusHint}</div>

          </div>

        </div>



        <div class="studio-panel">

          <div class="panel-title">${o.preview}</div>

          <div class="preview" style=${`background: ${g}; color: ${f}; border-radius: ${a};`}>

            <div class="preview-cover" style=${`background: ${v}; color: ${this.contrastInk(v)};`}>♫</div>

            <div class="preview-info"><strong>${o.previewTitle}</strong><span>${o.previewSubtitle}</span></div>

            <span class="preview-play" style=${`background: ${v}; color: ${this.contrastInk(v)};`}>▶</span>

          </div>

        </div>

      </div>

    `}static get styles(){return a`

      :host { display: block; min-width: 0; }

      .dimensions-grid {

        display: grid;

        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: 12px;

      }

      .dimensions-panel .panel-hint { margin-bottom: 13px; }

      .dimension-tile { display: flex; flex-direction: column; min-width: 0; gap: 10px; padding: 12px; border: 1px solid var(--divider-color); border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.07)); transition: border-color .15s ease; }

      .dimension-tile:focus-within { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); }

      .dimension-heading { display: flex; align-items: center; gap: 7px; color: var(--primary-text-color); font-size: 12px; font-weight: 650; }

      .dimension-heading ha-icon { --mdc-icon-size: 18px; color: var(--crm-editor-accent, var(--primary-color, #34d399)); }

      .dimension-input-wrap { display: block; }

      .dimension-input { height: 42px; font-size: 16px; font-weight: 650; font-variant-numeric: tabular-nums; background: var(--card-background-color, var(--ha-card-background)); }

      .dimension-input::placeholder { color: var(--secondary-text-color); opacity: .65; }

      .dimension-meta { font-size: 10px; line-height: 1.35; color: var(--secondary-text-color); }

      .shape-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; }

      .shape-workspace { display: grid; grid-template-columns: 82px minmax(0, 1fr); align-items: center; gap: 15px; margin-top: 14px; }

      .shape-illustration { display: grid; place-items: center; height: 84px; border: 1px solid var(--divider-color); border-radius: 13px; background: var(--secondary-background-color, rgba(128,128,128,.07)); }

      .shape-sample { display: flex; flex-direction: column; gap: 6px; justify-content: center; width: 52px; height: 52px; padding: 11px; border: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399)); background: var(--card-background-color, var(--ha-card-background)); transition: border-radius .12s ease; }

      .shape-sample span { display: block; height: 4px; border-radius: 3px; background: var(--secondary-text-color); opacity: .65; }

      .shape-sample span:first-child { background: var(--crm-editor-accent, var(--primary-color, #34d399)); opacity: 1; }

      .shape-sample span:last-child { width: 65%; }

      .shape-settings { min-width: 0; }

      .shape-value-row { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 12px; }

      .shape-value { font-size: 11px; font-weight: 650; color: var(--crm-editor-accent, var(--primary-color, #34d399)); text-align: right; }

      .radius-range { display: block; width: 100%; margin: 0; accent-color: var(--crm-editor-accent, var(--primary-color, #34d399)); cursor: pointer; }

      .range-labels { display: flex; justify-content: space-between; gap: 8px; margin-top: 8px; font-size: 10px; color: var(--secondary-text-color); }

      .shape-manual { margin-top: 13px; padding-top: 12px; border-top: 1px solid var(--divider-color); }

      .shape-manual .studio-input { height: 39px; }

      .dimension-field {

        display: flex;

        flex-direction: column;

        gap: 8px;

        min-width: 0;

      }

      @media (max-width: 340px) {

        .dimensions-grid { grid-template-columns: 1fr; }

      }



      * { box-sizing: border-box; }

      .studio { display: grid; gap: 11px; min-width: 0; color: var(--primary-text-color); }

      .studio-heading { padding: 3px 2px 5px; }

      .studio-kicker { font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--secondary-text-color); }

      h3 { margin: 6px 0 0; font-size: 16px; font-weight: 650; color: var(--primary-text-color); }

      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background)); }

      .panel-title { font-size: 13px; font-weight: 650; }

      .panel-hint, .field-hint { font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }

      .panel-hint { margin: 4px 0 15px; }

      .field-hint { margin-top: 7px; }

      .theme-list { display: grid; gap: 9px; }



      .height-mode-visual {

        display: grid;

        grid-template-columns: repeat(3, minmax(0, 1fr));

        gap: 8px;

        margin-top: 12px;

      }

      .height-visual-option {

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: space-between;

        gap: 12px;

        min-width: 0;

        min-height: 172px;

        padding: 12px 7px 10px;

        border: 1px solid var(--divider-color);

        border-radius: 12px;

        background: transparent;

        color: var(--primary-text-color);

        font: inherit;

        cursor: pointer;

      }

      .height-visual-option.selected {

        border: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399));

        padding: 11px 6px 9px;

      }

      .height-visual-option:focus-visible {

        outline: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399));

        outline-offset: 2px;

      }

      .height-visual-art {

        display: flex;

        flex-direction: column;

        justify-content: center;

        gap: 6px;

        width: 100%;

        max-width: 105px;

        height: 83px;

        padding: 10px;

        border: 3px solid currentColor;

        border-radius: 9px;

      }

      .height-visual-art.compact {

        height: 65px;

        margin-top: 18px;

      }

      .height-visual-art.fill {

        height: 95px;

        margin-top: -6px;

      }

      .art-row {

        display: block;

        height: 13px;

        border-radius: 3px;

        background: #d1d1d1;

      }

      .art-row.accent {

        background: var(--crm-editor-accent, var(--primary-color, #34d399));

      }

      .art-line {

        display: block;

        border-top: 1px solid #aaa;

      }

      .art-fill {

        display: grid;

        place-items: center;

        flex: 1;

        border-radius: 4px;

        background: #e3e3e3;

        color: var(--crm-editor-accent, var(--primary-color, #34d399));

      }

      .art-fill ha-icon {

        --mdc-icon-size: 40px;

      }

      .height-visual-label {

        font-size: 12px;

        font-weight: 500;

      }





      .theme-option { display: flex; align-items: center; width: 100%; min-width: 0; gap: 12px; padding: 12px; border: 2px solid transparent; border-radius: 14px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-text-color); text-align: left; font: inherit; cursor: pointer; transition: border-color .15s ease, background .15s ease; }

      .theme-option:hover { background: var(--divider-color, rgba(128,128,128,.16)); }

      .theme-option.selected { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); }

      .theme-option:focus-visible { outline: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399)); outline-offset: 2px; }

      .theme-thumbnail { display: block; flex: 0 0 62px; width: 62px; height: 64px; padding: 7px; border: 1px solid rgba(128,128,128,.4); border-radius: 11px; overflow: hidden; }

      .theme-thumbnail.light { background: #f5f6f7; }

      .theme-thumbnail.dark { background: #141719; }

      .theme-thumbnail.auto { background: linear-gradient(90deg, #f5f6f7 50%, #141719 50%); }

      .theme-thumbnail.custom { background: linear-gradient(135deg, #ac83f7, #f9b86a, #58c6b2); }

      .thumbnail-paper { display: block; width: 100%; height: 100%; padding: 5px; border-radius: 5px; }

      .light .thumbnail-paper { background: #fff; color: #17191a; }

      .dark .thumbnail-paper { background: #24282b; color: #f7f7f7; }

      .auto .thumbnail-paper { background: linear-gradient(90deg, #fff 50%, #24282b 50%); color: #17191a; }

      .custom .thumbnail-paper { background: rgba(255,255,255,.72); color: #35244b; }

      .thumbnail-aa { display: block; font-size: 12px; font-weight: 700; }

      .thumbnail-line { display: block; width: 75%; height: 3px; margin-top: 8px; border-radius: 3px; background: currentColor; opacity: .3; }

      .theme-copy { display: grid; flex: 1; min-width: 0; gap: 5px; }

      .theme-copy strong { font-size: 13px; font-weight: 650; }

      .theme-copy small { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }

      .theme-indicator { display: grid; place-items: center; flex: 0 0 21px; width: 21px; height: 21px; border-radius: 50%; border: 2px solid var(--secondary-text-color); opacity: .7; }

      .selected .theme-indicator { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); background: var(--crm-editor-accent, var(--primary-color, #34d399)); color: var(--card-background-color, #101b19); opacity: 1; }

      .theme-indicator ha-icon { --mdc-icon-size: 15px; }

      .color-row + .color-row { margin-top: 14px; }

      .color-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 7px; }

      .field-label { font-size: 12px; font-weight: 550; color: var(--secondary-text-color); }

      .reset { border: 0; padding: 2px 0; background: transparent; color: var(--crm-editor-accent, var(--primary-color, #34d399)); font: inherit; font-size: 11px; font-weight: 650; cursor: pointer; }

      .reset:hover { text-decoration: underline; }
      .reset { text-underline-offset: 3px; }

      .color-controls { display: flex; align-items: center; gap: 9px; }

      .color-picker { position: relative; flex: 0 0 40px; width: 40px; height: 38px; border: 1px solid var(--divider-color); border-radius: 9px; overflow: hidden; cursor: pointer; }

      .color-picker input { display: block; width: 100%; height: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; }

      .color-picker input::-webkit-color-swatch-wrapper { padding: 3px; }

      .color-picker input::-webkit-color-swatch { border: 0; border-radius: 5px; }

      .studio-input { display: block; width: 100%; min-width: 0; height: 38px; padding: 0 11px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; }

      .studio-input:focus-visible, .reset:focus-visible, .color-picker:focus-within { outline: 2px solid var(--primary-color); outline-offset: 2px; }

      .preview { display: flex; align-items: center; gap: 11px; min-height: 79px; margin-top: 12px; padding: 12px; overflow: hidden; }

      .preview-cover { display: grid; place-items: center; width: 49px; height: 49px; flex-shrink: 0; border-radius: 9px; font-size: 24px; font-weight: 700; }

      .preview-info { display: flex; flex: 1; flex-direction: column; gap: 4px; min-width: 0; }

      .preview-info strong { font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      .preview-info span { font-size: 11px; opacity: .7; }

      .preview-play { display: grid; place-items: center; flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; font-size: 12px; }

      @media (max-width: 340px) { .studio-panel { padding: 11px; } .theme-option { gap: 9px; padding: 9px; } .theme-thumbnail { flex-basis: 52px; width: 52px; height: 56px; } }

    `}});customElements.define("crm-advanced-editor",class extends Po{render(){const e=(this.config.language&&"auto"!==this.config.language?this.config.language:this.hass?.locale?.language||this.hass?.language||"en").toLowerCase(),t=e.startsWith("pt"),i=e.startsWith("de");return B`
      <div class="panel">
        <div class="heading">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
          <strong>${t?"Interação e compatibilidade":i?"Interaktion und Kompatibilität":"Interaction and compatibility"}</strong>
        </div>
        <label class="setting">
          <span class="description">
            <strong>${t?"Desativar suporte ao toque":i?"Touch-Unterstützung deaktivieren":"Disable touch support"}</strong>
            <small>${t?"Desativa os gestos de toque do cartão.":i?"Deaktiviert die Touch-Gesten der Karte.":"Disables touch gestures on the card."}</small>
          </span>
          <input
            type="checkbox"
            .checked=${Boolean(this.config.touchSupportDisabled)}
            @change=${e=>{this.configChanged({...this.config,touchSupportDisabled:e.currentTarget.checked})}}
          />
        </label>
      </div>
    `}static get styles(){return a`
      :host { display: block; }
      .panel {
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background));
      }
      .heading, .setting {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .heading {
        margin-bottom: 18px;
        font-size: 14px;
      }
      .heading ha-icon {
        color: #34d399;
      }
      .setting {
        justify-content: space-between;
        cursor: pointer;
      }
      .description {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .description strong { font-size: 13px; }
      .description small {
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      input {
        width: 18px;
        height: 18px;
        accent-color: #34d399;
      }
    `}});customElements.define("crm-navigation-settings-editor",class extends Po{getOptions(){const e=this.config.language||"auto",t=t=>Ye(t,e,this.hass?.locale?.language||this.hass?.language);return[{value:Yt.PLAYER,label:t("editor.player")},{value:Yt.ALBUM_FAVORITES,label:t("editor.generalSettings.albumFavorites")},{value:Yt.ARTIST_FAVORITES,label:t("editor.generalSettings.artistFavorites")},{value:Yt.AUDIOBOOK_FAVORITES,label:t("editor.generalSettings.audiobookFavorites")},{value:Yt.CATEGORYS,label:t("editor.categorys")},{value:Yt.DEVICES,label:t("editor.devices")},{value:Yt.EPISODE_FAVORITES,label:t("editor.generalSettings.episodeFavorites")},{value:Yt.PLAYLIST_FAVORITES,label:t("editor.generalSettings.playlistFavorites")},{value:Yt.RECENTS,label:t("editor.recents")},{value:Yt.SEARCH_MEDIA,label:t("editor.generalSettings.searchMedia")},{value:Yt.SHOW_FAVORITES,label:t("editor.generalSettings.showFavorites")},{value:Yt.TRACK_FAVORITES,label:t("editor.generalSettings.trackFavorites")},{value:Yt.USERPRESETS,label:t("editor.generalSettings.userPresets")}]}updateVisibleSection(e,t){const i=Array.isArray(this.config.sections)?this.config.sections:[],s=t?[...new Set([...i,e])]:i.filter(t=>t!==e);if(0===s.length)return;const r=this.config.sectionDefault,o=r&&s.includes(r)?r:s[0];this.configChanged({...this.config,sections:s,sectionDefault:o})}render(){const e=this.config.language||"auto",t="auto"===e?this.hass?.locale?.language||this.hass?.language||"en":e,i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=r("Organização do cartão","Kartenorganisation","Card organization"),a=r("Seções visíveis","Sichtbare Bereiche","Visible sections"),n=r("Seção inicial","Startbereich","Default section"),l=r("Escolha quais seções aparecem e qual será aberta primeiro.","Wähle die sichtbaren Bereiche und den Startbereich.","Choose visible sections and which one opens first."),c=r("Pelo menos uma seção deve permanecer ativada.","Mindestens ein Bereich muss aktiviert bleiben.","At least one section must remain enabled."),d=r("Esta seção será exibida quando o cartão for aberto.","Dieser Bereich wird beim Öffnen der Karte angezeigt.","This section opens when the card is displayed."),h=r("ativas","aktiv","active"),p=this.getOptions(),u=Array.isArray(this.config.sections)?this.config.sections:[],m=p.filter(e=>u.includes(e.value)),g=this.config.sectionDefault,v=g&&u.includes(g)?g:u[0]||Yt.PLAYER;return B`
      <div class="panel">
        <div class="heading">
          <span class="heading-icon"><ha-icon icon="mdi:view-dashboard-outline"></ha-icon></span>
          <div class="heading-copy">
            <strong>${o}</strong>
            <small>${l}</small>
          </div>
        </div>

        <div class="field-heading">
          <span class="field-title">${a}</span>
          <span class="section-count">${u.length} ${h}</span>
        </div>

        <div class="check-grid">
          ${p.map(e=>{const t=u.includes(e.value),i=t&&1===u.length;return B`
              <label class="check ${t?"checked":""} ${i?"locked":""}">
                <input
                  type="checkbox"
                  .checked=${t}
                  .disabled=${i}
                  @change=${t=>{const i=t.currentTarget;this.updateVisibleSection(e.value,i.checked)}}
                />
                <span>${e.label}</span>
                ${t?B`<ha-icon class="check-icon" icon="mdi:check-circle"></ha-icon>`:""}
              </label>
            `})}
        </div>

        <p class="minimum-hint">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          ${c}
        </p>

        <div class="divider"></div>

        <label class="field">
          <span class="field-title">${n}</span>
          <span class="field-hint">${d}</span>
          <span class="select-wrap">
            <ha-icon icon="mdi:home-outline"></ha-icon>
            <select
              .value=${String(v)}
              @change=${e=>{const t=e.currentTarget.value;u.includes(t)&&this.configChanged({...this.config,sectionDefault:t})}}
            >
              ${m.map(e=>B`
                <option value=${e.value}>${e.label}</option>
              `)}
            </select>
          </span>
        </label>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .panel {
        padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .heading { display: flex; align-items: center; gap: 11px; margin-bottom: 20px; }
      .heading-icon {
        display: grid; place-items: center; flex: 0 0 36px; height: 36px;
        border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--primary-color, #34d399);
      }
      .heading-icon ha-icon { --mdc-icon-size: 20px; }
      .heading-copy { display: grid; gap: 4px; min-width: 0; }
      .heading-copy strong { font-size: 14px; color: var(--primary-text-color); }
      .heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .field-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
      .field-title { display: block; font-size: 12px; font-weight: 600; color: var(--primary-text-color); }
      .section-count {
        padding: 4px 8px; border-radius: 999px;
        background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--secondary-text-color); font-size: 10px; white-space: nowrap;
      }
      .check-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .check {
        display: flex; align-items: center; gap: 8px; min-width: 0;
        min-height: 43px; padding: 10px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.18));
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(128,128,128,.08));
        color: var(--primary-text-color); font-size: 12px;
        cursor: pointer; overflow-wrap: anywhere;
        transition: border-color .15s ease, background-color .15s ease;
      }
      .check:hover { background: var(--divider-color, rgba(128,128,128,.12)); }
      .check.checked { border-color: var(--primary-color, #34d399); }
      .check.locked { cursor: default; }
      .check:focus-within { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .check input { flex-shrink: 0; accent-color: var(--primary-color, #34d399); }
      .check span { flex: 1; min-width: 0; }
      .check-icon { --mdc-icon-size: 16px; color: var(--primary-color, #34d399); flex-shrink: 0; }
      .minimum-hint {
        display: flex; align-items: center; gap: 6px;
        margin: 12px 0 16px; color: var(--secondary-text-color);
        font-size: 11px; line-height: 1.4;
      }
      .minimum-hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
      .divider { height: 1px; background: var(--divider-color, rgba(128,128,128,.2)); margin-bottom: 16px; }
      .field { display: flex; flex-direction: column; gap: 7px; }
      .field-hint { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .select-wrap { position: relative; display: flex; align-items: center; }
      .select-wrap > ha-icon {
        position: absolute; left: 11px; pointer-events: none;
        --mdc-icon-size: 18px; color: var(--primary-color, #34d399);
      }
      select {
        width: 100%; height: 42px; padding: 0 12px 0 39px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.08));
        color: var(--primary-text-color); font: inherit; font-size: 12px;
      }
      select:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      @media (max-width: 340px) {
        .panel { padding: 11px; }
        .check-grid { grid-template-columns: 1fr; }
      }
    `}});customElements.define("crm-player-general-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.playerGeneralSettings.${e}`,this.config.language??"auto",this.hass.language),t=this.config.language&&"auto"!==this.config.language?this.config.language.toLowerCase():(this.hass.locale?.language||this.hass.language||"en").toLowerCase(),i=t.startsWith("pt"),s=t.startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o={appearance:r("Imagem de fundo","Hintergrundbild","Background image"),appearanceHint:r("Escolha como a imagem ocupa o espaço do player","Lege fest, wie das Bild den Player ausfüllt","Choose how the image fills the player"),cover:r("Cobrir","Abdecken","Cover"),contain:r("Conter","Einpassen","Contain"),stretch:r("Esticar","Strecken","Stretch"),custom:r("Personalizado","Benutzerdefiniert","Custom"),customHint:r("Tamanho CSS personalizado (ex.: 80% auto)","Eigene CSS-Größe (z. B. 80% auto)","Custom CSS size (e.g. 80% auto)"),idle:r("Sem reprodução","Ohne Wiedergabe","When idle"),idleHint:r("Defina o comportamento quando nada estiver tocando","Verhalten festlegen, wenn nichts abgespielt wird","Set the behavior when nothing is playing"),preview:r("Prévia de preenchimento","Vorschau der Bildanpassung","Image fit preview"),previewCaption:r("Prévia ilustrativa: não altera a reprodução","Illustrative Vorschau: keine Auswirkung auf die Wiedergabe","Illustrative preview: does not affect playback")},a=this.config.playerBackgroundImageSize??"100% 100%",n=["cover","contain","100% 100%"].includes(a)?a:"custom",l=[{value:"cover",label:o.cover,icon:"mdi:image-size-select-large",art:"cover"},{value:"contain",label:o.contain,icon:"mdi:fit-to-screen-outline",art:"contain"},{value:"100% 100%",label:o.stretch,icon:"mdi:arrow-expand-all",art:"stretch"},{value:"custom",label:o.custom,icon:"mdi:tune-variant",art:"custom"}],c=[{name:"playerMinimizeOnIdle",label:e("minimizeOnIdle"),help:e("minimizeOnIdleHelp"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-player-general">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:image-size-select-large"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o.appearance}</strong>
              <small>${o.appearanceHint}</small>
            </div>
          </div>

          <div class="image-size-options">
            ${l.map(e=>B`
              <button
                type="button"
                class="image-size-option ${n===e.value?"selected":""}"
                aria-pressed=${String(n===e.value)}
                @click=${()=>{const t="custom"===e.value?"custom"===n?a:"80% auto":e.value;this.configChanged({...this.config,playerBackgroundImageSize:t})}}
              >
                <span class="image-size-art ${e.art}" aria-hidden="true">
                  <span class="art-frame"><span class="art-image"><ha-icon icon="mdi:music-note"></ha-icon></span></span>
                </span>
                <span class="image-size-label">${e.label}</span>
                <ha-icon class="selection-check" icon=${n===e.value?"mdi:check-circle":"mdi:circle-outline"}></ha-icon>
              </button>
            `)}
          </div>

          ${"custom"===n?B`
            <label class="custom-size-label" for="crm-custom-image-size">${o.customHint}</label>
            <input
              id="crm-custom-image-size"
              class="custom-size-input"
              type="text"
              .value=${a}
              @change=${e=>{const t=e.currentTarget.value.trim();t&&this.configChanged({...this.config,playerBackgroundImageSize:t})}}
            />
          `:""}

          <div class="fit-preview">
            <span class="fit-preview-title">${o.preview}</span>
            <div class="fit-preview-stage">
              <div class="fit-preview-image" style=${`background-size: ${a};`}></div>
              <div class="fit-preview-overlay"><ha-icon icon="mdi:spotify"></ha-icon><span>ControlRoom Music</span></div>
            </div>
            <small>${o.previewCaption}</small>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:power-sleep"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o.idle}</strong>
              <small>${o.idleHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${c}
            .section=${Yt.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-player-general { display: grid; gap: 11px; min-width: 0; }
      .studio-description { margin: 0 2px 3px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-panel { min-width: 0; padding: 14px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: grid; place-items: center; flex: 0 0 35px; width: 35px; height: 35px; border-radius: 10px; background: color-mix(in srgb, var(--primary-color, #34d399) 12%, transparent); color: var(--primary-color, #34d399); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .image-size-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
      .image-size-option { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; min-width: 0; min-height: 122px; padding: 12px 8px; border: 1px solid var(--divider-color, rgba(128,128,128,.25)); border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.06)); color: var(--primary-text-color); font: inherit; cursor: pointer; transition: border-color .15s, background .15s, transform .15s; }
      .image-size-option:hover { border-color: var(--primary-color, #34d399); transform: translateY(-1px); }
      .image-size-option.selected { border: 2px solid var(--primary-color, #34d399); background: color-mix(in srgb, var(--primary-color, #34d399) 8%, var(--card-background-color, transparent)); padding: 11px 7px; }
      .image-size-option:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .image-size-art { display: grid; place-items: center; width: 100%; max-width: 128px; height: 72px; border-radius: 9px; background: color-mix(in srgb, var(--secondary-background-color, #808080) 70%, transparent); overflow: hidden; }
      .art-frame { position: relative; display: block; width: 92px; height: 55px; border: 1px solid var(--secondary-text-color); border-radius: 5px; overflow: hidden; opacity: .85; }
      .art-image { position: absolute; display: grid; place-items: center; inset: 0; background: linear-gradient(135deg, #064e3b, #10b981 55%, #022c22); color: #ecfdf5; }
      .art-image ha-icon { --mdc-icon-size: 22px; }
      .cover .art-image { inset: -12px; }
      .contain .art-image { inset: 8px 18px; }
      .stretch .art-image { inset: 0; border-radius: 0; }
      .custom .art-image { inset: 8px 12px 4px 4px; }
      .image-size-label { font-size: 12px; font-weight: 600; text-align: center; }
      .selection-check { position: absolute; top: 7px; right: 7px; --mdc-icon-size: 17px; color: var(--secondary-text-color); }
      .selected .selection-check { color: var(--primary-color, #34d399); }
      .custom-size-label { display: block; margin-top: 14px; font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }
      .custom-size-input { display: block; width: 100%; height: 39px; margin-top: 7px; padding: 0 11px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; }
      .custom-size-input:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .fit-preview { display: grid; gap: 8px; margin-top: 15px; padding-top: 13px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .fit-preview-title { color: var(--primary-text-color); font-size: 11px; font-weight: 600; }
      .fit-preview-stage { position: relative; min-height: 95px; overflow: hidden; border-radius: 10px; background: #071b16; }
      .fit-preview-image { position: absolute; inset: 0; background-image: linear-gradient(135deg, #064e3b 0%, #34d399 50%, #065f46 100%); background-repeat: no-repeat; background-position: center; }
      .fit-preview-overlay { position: absolute; inset: 0; display: flex; align-items: end; gap: 7px; padding: 11px; color: #f0fdf4; background: linear-gradient(transparent, rgba(0,0,0,.55)); font-size: 11px; font-weight: 650; }
      .fit-preview-overlay ha-icon { --mdc-icon-size: 17px; }
      .fit-preview small { color: var(--secondary-text-color); font-size: 10px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } .image-size-options { gap: 6px; } .image-size-option { min-height: 112px; padding: 9px 5px; } }
    `}});customElements.define("crm-player-header-editor",class extends Po{updateText(e,t){const i=t.currentTarget.value;this.configChanged({...this.config,[e]:i})}render(){super.createStore();const e=this.config.language??"auto",t=this.hass.locale?.language||this.hass.language||"en",i=i=>Ye(`editor.playerHeaderSettings.${i}`,e,t),s=("auto"===e?t:e).toLowerCase(),r=s.startsWith("pt"),o=s.startsWith("de"),a=r?"Personalize apenas o essencial. O visual acompanha o tema do ControlRoom.":o?"Passe nur das Wesentliche an. Das Design folgt dem ControlRoom-Theme.":"Customize only the essentials. The appearance follows your ControlRoom theme.",n=r?"Prévia do cabeçalho":o?"Kopfbereich-Vorschau":"Header preview",l=r?"Reproduzindo agora":o?"Wird gerade abgespielt":"Now playing",c=r?"Sua música favorita":o?"Dein Lieblingssong":"Your favorite song",d=r?"Artista · Álbum":o?"Künstler · Album":"Artist · Album",h=r?"Personalização":o?"Personalisierung":"Personalization",p=r?"Opcional — deixe vazio para usar o título automático.":o?"Optional – leer lassen für den automatischen Titel.":"Optional — leave empty for the automatic title.",u=r?"Mensagem mostrada quando não há música tocando.":o?"Text, wenn keine Musik abgespielt wird.":"Message displayed when no music is playing.",m=r?"Visibilidade":o?"Sichtbarkeit":"Visibility",g=r?"Escolha quais elementos aparecem no reprodutor.":o?"Wähle die sichtbaren Elemente des Players.":"Choose which elements appear in the player.",v=r?"Automático":o?"Automatisch":"Automatic",f=String(this.config.playerHeaderTitle??""),b=String(this.config.playerHeaderNoMediaPlayingText??""),y=[{name:"playerHeaderHideProgressBar",label:i("hideProgressBar"),required:!1,selector:{boolean:{}}},{name:"playerHeaderHide",label:i("hideHeader"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-header">
        <p class="studio-description">${a}</p>

        <section class="studio-preview-panel" aria-label=${n}>
          <div class="preview-top">
            <span class="preview-eyebrow">${n}</span>
            <ha-icon icon="mdi:music-note"></ha-icon>
          </div>
          <div class="preview-content">
            <div class="preview-art"><ha-icon icon="mdi:music"></ha-icon></div>
            <div class="preview-details">
              <span class="preview-status">${l}</span>
              <strong>${f.trim()||c}</strong>
              <small>${d}</small>
            </div>
          </div>
          <div class="preview-progress"><span></span></div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="heading-icon"><ha-icon icon="mdi:text-box-edit-outline"></ha-icon></span>
            <div class="heading-copy"><strong>${h}</strong><small>${p}</small></div>
          </div>

          <label class="studio-field">
            <span class="studio-label">${i("title")}</span>
            <input
              class="studio-input"
              type="text"
              .value=${f}
              placeholder=${v}
              @change=${e=>this.updateText("playerHeaderTitle",e)}
            />
          </label>
          <label class="studio-field">
            <span class="studio-label">${i("noMediaPlayingText")}</span>
            <input
              class="studio-input"
              type="text"
              .value=${b}
              placeholder=${v}
              @change=${e=>this.updateText("playerHeaderNoMediaPlayingText",e)}
            />
            <span class="field-hint">${u}</span>
          </label>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="heading-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="heading-copy"><strong>${m}</strong><small>${g}</small></div>
          </div>
          <div class="visibility-body">
            <crm-editor-form
              .schema=${y}
              .section=${Yt.PLAYER}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
            ></crm-editor-form>
          </div>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-header { display: grid; gap: 12px; min-width: 0; color: var(--primary-text-color); }
      .studio-description { margin: 0 2px 2px; font-size: 12px; line-height: 1.55; color: var(--secondary-text-color); }
      .studio-panel, .studio-preview-panel {
        min-width: 0; padding: 15px; border: 1px solid var(--divider-color, rgba(128,128,128,.22));
        border-radius: 15px; background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-preview-panel {
        padding: 16px; overflow: hidden; position: relative;
        background: linear-gradient(135deg, var(--secondary-background-color, #1c2824), var(--card-background-color, #101b19));
      }
      .preview-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 18px; }
      .preview-eyebrow { font-size: 10px; letter-spacing: .09em; font-weight: 750; text-transform: uppercase; color: var(--secondary-text-color); }
      .preview-top ha-icon { --mdc-icon-size: 18px; color: var(--primary-color, #34d399); }
      .preview-content { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .preview-art { display: grid; place-items: center; width: 54px; height: 54px; flex: 0 0 54px; border-radius: 12px; background: var(--primary-color, #34d399); color: var(--card-background-color, #101b19); }
      .preview-art ha-icon { --mdc-icon-size: 27px; }
      .preview-details { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
      .preview-status { color: var(--primary-color, #34d399); font-size: 10px; font-weight: 650; }
      .preview-details strong { font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .preview-details small { color: var(--secondary-text-color); font-size: 11px; }
      .preview-progress { height: 3px; margin-top: 20px; background: var(--divider-color, rgba(128,128,128,.25)); border-radius: 99px; overflow: hidden; }
      .preview-progress span { display: block; width: 42%; height: 100%; border-radius: inherit; background: var(--primary-color, #34d399); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
      .heading-icon { display: grid; place-items: center; flex: 0 0 35px; width: 35px; height: 35px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-color, #34d399); }
      .heading-icon ha-icon { --mdc-icon-size: 19px; }
      .heading-copy { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
      .heading-copy strong { font-size: 13px; font-weight: 650; }
      .heading-copy small { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .studio-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 15px; }
      .studio-field:last-child { margin-bottom: 0; }
      .studio-label { font-size: 12px; font-weight: 600; }
      .studio-input { display: block; width: 100%; min-width: 0; height: 43px; padding: 0 12px; border: 1px solid var(--divider-color); border-radius: 10px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; transition: border-color .15s ease; }
      .studio-input:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 1px; }
      .studio-input::placeholder { color: var(--secondary-text-color); opacity: .8; }
      .field-hint { font-size: 11px; line-height: 1.45; color: var(--secondary-text-color); }
      .visibility-body { min-width: 0; }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel, .studio-preview-panel { padding: 11px; } }
    `}});customElements.define("crm-player-controls-editor",class extends Po{setIconSize(e){this.configChanged({...this.config,playerControlsIconSize:e})}onCustomSizeChange(e){const t=e.currentTarget.value.trim();t&&this.setIconSize(t)}setVisibility(e,t){this.configChanged({...this.config,[e]:!t})}render(){super.createStore();const e=e=>Ye(`editor.playerControlsSettings.${e}`,this.config.language??"auto",this.hass.language),t=this.config.language&&"auto"!==this.config.language?this.config.language.toLowerCase():(this.hass.language||"en").toLowerCase(),i=t.startsWith("pt"),s=t.startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=[{name:"playerControlsHideTrackPrev",icon:"mdi:skip-previous",label:r("Anterior","Zurück","Previous")},{name:"playerControlsHidePlayPause",icon:"mdi:play-circle-outline",label:r("Reproduzir","Wiedergabe","Play / Pause")},{name:"playerControlsHideTrackNext",icon:"mdi:skip-next",label:r("Próxima","Weiter","Next")},{name:"playerControlsHideShuffle",icon:"mdi:shuffle",label:r("Aleatório","Zufall","Shuffle")},{name:"playerControlsHideRepeat",icon:"mdi:repeat",label:r("Repetir","Wiederholen","Repeat")},{name:"playerControlsHideFavorites",icon:"mdi:heart-outline",label:r("Favoritos","Favoriten","Favorites")},{name:"playerControlsHidePlayQueue",icon:"mdi:playlist-music",label:r("Fila","Warteschlange","Queue")}],a=String(this.config.playerControlsIconSize??fe),n=[{id:"small",value:"24px",icon:19,label:r("Pequeno","Klein","Small")},{id:"medium",value:"32px",icon:25,label:r("Médio","Mittel","Medium")},{id:"large",value:"40px",icon:32,label:r("Grande","Groß","Large")}],l=n.some(e=>e.value===a),c=[{name:"playerControlsHide",label:e("hideControls"),required:!1,selector:{boolean:{}}}],d=Boolean(this.config.playerControlsHide);return B`
      <div class="studio-controls">
        <p class="studio-description">
          ${e("description")}
        </p>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:resize"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <span class="studio-title">
                ${r("Tamanho dos ícones","Symbolgröße","Icon size")}
              </span>
              <span class="studio-hint">
                ${r("Ajuste a dimensão dos botões","Größe der Tasten anpassen","Adjust the button dimensions")}
              </span>
            </div>
          </div>

          <div class="size-choices" role="group" aria-label=${e("iconSize")}>
            ${n.map(e=>B`
              <button
                type="button"
                class="size-choice ${a===e.value?"active":""}"
                aria-pressed=${String(a===e.value)}
                @click=${()=>this.setIconSize(e.value)}
              >
                <span class="size-art" aria-hidden="true">
                  <ha-icon icon="mdi:skip-previous" style=${`--mdc-icon-size:${Math.round(.72*e.icon)}px`}></ha-icon>
                  <span class="size-play">
                    <ha-icon icon="mdi:play" style=${`--mdc-icon-size:${e.icon}px`}></ha-icon>
                  </span>
                  <ha-icon icon="mdi:skip-next" style=${`--mdc-icon-size:${Math.round(.72*e.icon)}px`}></ha-icon>
                </span>
                <span class="size-name">${e.label}</span>
                <span class="size-value">${e.value}</span>
                <ha-icon class="size-check" icon="mdi:check-circle"></ha-icon>
              </button>
            `)}
          </div>
          <details class="size-custom" ?open=${!l}>
            <summary>
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              ${r("Tamanho personalizado","Benutzerdefinierte Größe","Custom size")}
              ${l?"":B`<span class="custom-value">${a}</span>`}
            </summary>
            <label class="custom-field">
              <span>${r("Valor CSS (ex.: 28px ou 1.75rem)","CSS-Wert (z. B. 28px oder 1.75rem)","CSS value (e.g. 28px or 1.75rem)")}</span>
              <input
                type="text"
                .value=${a}
                @change=${this.onCustomSizeChange}
                @keydown=${e=>{"Enter"===e.key&&this.onCustomSizeChange(e)}}
              />
            </label>
          </details>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <span class="studio-title">
                ${r("Botões do reprodutor","Wiedergabetasten","Player buttons")}
              </span>
              <span class="studio-hint">
                ${r("Toque em cada botão para mostrar ou ocultar","Tippen, um Tasten ein- oder auszublenden","Tap each button to show or hide it")}
              </span>
            </div>
          </div>

          <div class="controls-grid">
            ${o.map(e=>{const t=!Boolean(this.config[e.name]);return B`
                <button
                  type="button"
                  class="control-tile ${t?"selected":"hidden"}"
                  aria-label=${e.label}
                  aria-pressed=${String(t)}
                  @click=${()=>this.setVisibility(e.name,!t)}
                >
                  <span class="control-art">
                    <ha-icon icon=${e.icon}></ha-icon>
                  </span>

                  <span class="control-label">
                    ${e.label}
                  </span>

                  <span class="control-status">
                    <ha-icon
                      icon=${t?"mdi:check-circle":"mdi:circle-outline"}
                    ></ha-icon>
                    ${t?r("Visível","Sichtbar","Visible"):r("Oculto","Ausgeblendet","Hidden")}
                  </span>
                </button>
              `})}
          </div>

          ${d?B`
                <p class="studio-notice">
                  <ha-icon icon="mdi:information-outline"></ha-icon>
                  ${r("Todos os controles estão ocultos pela configuração geral.","Alle Tasten sind durch die allgemeine Einstellung ausgeblendet.","All controls are hidden by the general visibility setting.")}
                </p>
              `:""}
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:eye-off-outline"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <span class="studio-title">
                ${r("Visibilidade geral","Allgemeine Sichtbarkeit","General visibility")}
              </span>
              <span class="studio-hint">
                ${r("Ocultar todos os controles de uma vez","Alle Bedienelemente ausblenden","Hide all playback controls")}
              </span>
            </div>
          </div>

          <crm-editor-form
            .schema=${c}
            .section=${Yt.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-controls {
        display: grid;
        gap: 11px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 2px 2px;
        font-size: 12px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }

      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid
          var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(
          --card-background-color,
          var(--ha-card-background, transparent)
        );
      }

      .studio-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }

      .studio-icon {
        display: flex;
        flex: 0 0 34px;
        align-items: center;
        justify-content: center;
        height: 34px;
        border-radius: 9px;
        color: var(--primary-color);
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.12)
        );
      }

      .studio-icon ha-icon {
        --mdc-icon-size: 18px;
      }

      .studio-heading-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .studio-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .studio-hint {
        font-size: 11px;
        line-height: 1.4;
        color: var(--secondary-text-color);
      }

      .size-choices { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 8px; }
      .size-choice { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; min-width: 0; min-height: 112px; padding: 12px 4px 10px; border: 1px solid var(--divider-color,rgba(128,128,128,.25)); border-radius: 13px; background: var(--secondary-background-color,rgba(128,128,128,.06)); color: var(--primary-text-color); font: inherit; cursor: pointer; transition: border-color .15s, background-color .15s; }
      .size-choice:hover { background: var(--divider-color,rgba(128,128,128,.13)); }
      .size-choice.active { border: 2px solid var(--primary-color,#34d399); padding: 11px 3px 9px; }
      .size-choice:focus-visible { outline: 2px solid var(--primary-color,#34d399); outline-offset: 2px; }
      .size-art { display: flex; align-items: center; justify-content: center; gap: 2px; height: 43px; max-width: 100%; color: var(--secondary-text-color); }
      .size-art > ha-icon { flex-shrink: 1; }
      .size-play { display: grid; place-items: center; width: 38px; height: 38px; flex-shrink: 0; border-radius: 50%; background: var(--primary-color,#34d399); color: var(--card-background-color,#102019); }
      .size-name { font-size: 12px; font-weight: 650; }
      .size-value { font-size: 10px; color: var(--secondary-text-color); }
      .size-check { position: absolute; top: 5px; right: 5px; --mdc-icon-size: 14px; color: var(--primary-color,#34d399); opacity: 0; }
      .size-choice.active .size-check { opacity: 1; }
      .size-custom { margin-top: 12px; border-top: 1px solid var(--divider-color,rgba(128,128,128,.2)); padding-top: 10px; }
      .size-custom summary { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--secondary-text-color); cursor: pointer; list-style: none; }
      .size-custom summary::-webkit-details-marker { display: none; }
      .size-custom summary > ha-icon { --mdc-icon-size: 17px; }
      .custom-value { margin-left: auto; font-weight: 650; color: var(--primary-text-color); }
      .custom-field { display: grid; gap: 7px; margin-top: 12px; font-size: 11px; color: var(--secondary-text-color); }
      .custom-field input { width: 100%; height: 38px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); padding: 0 11px; font: inherit; font-size: 13px; }
      .custom-field input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      .control-tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 0;
        min-height: 115px;
        padding: 11px 5px;
        border: 2px solid
          var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: transparent;
        color: var(--primary-text-color);
        font: inherit;
        cursor: pointer;
        transition:
          border-color .15s ease,
          background .15s ease;
      }

      .control-tile:hover {
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.08)
        );
      }

      .control-tile.selected {
        border-color: #34d399;
      }

      .control-tile.hidden {
        opacity: .58;
      }

      .control-tile:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .control-art {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 95px;
        height: 48px;
        border-radius: 9px;
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.1)
        );
      }

      .control-art ha-icon {
        --mdc-icon-size: 29px;
      }

      .selected .control-art {
        color: #34d399;
      }

      .control-label {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        overflow-wrap: anywhere;
      }

      .control-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        font-size: 10px;
        color: var(--secondary-text-color);
      }

      .control-status ha-icon {
        --mdc-icon-size: 13px;
      }

      .selected .control-status ha-icon {
        color: #34d399;
      }

      .studio-notice {
        display: flex;
        align-items: flex-start;
        gap: 7px;
        margin: 12px 0 0;
        font-size: 11px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }

      .studio-notice ha-icon {
        flex-shrink: 0;
        --mdc-icon-size: 17px;
      }

      crm-editor-form {
        display: block;
        min-width: 0;
      }

      @media (max-width: 340px) {
        .studio-panel {
          padding: 10px;
        }

        .controls-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `}});var Fo;customElements.define("crm-player-volume-editor",class extends Po{setField(e,t){this.configChanged({...this.config,[e]:t})}setBackgroundColor(e){this.setField("playerControlsBackgroundColor",e)}setVolumeNumber(e,t,i,s){if(""===t.trim())return;const r=Number(t);Number.isFinite(r)&&this.configChanged({...this.config,[e]:Math.max(i,Math.min(s,Math.round(r)))})}restoreBackground(){const e={...this.config};delete e.playerControlsBackgroundColor,this.configChanged(e)}render(){super.createStore();const e=e=>Ye(`editor.playerVolumeSettings.${e}`,this.config.language??"auto",this.hass.language),t=(this.config.language&&"auto"!==this.config.language?this.config.language:this.hass.language||"en").toLowerCase(),i=t.startsWith("pt"),s=t.startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=r("Níveis de volume","Lautstärkepegel","Volume levels"),a=r("Aparência","Darstellung","Appearance"),n=r("Botões e visibilidade","Tasten und Sichtbarkeit","Buttons and visibility"),l=r("Defina o volume máximo e o tamanho de cada ajuste.","Maximale Lautstärke und Schrittweite festlegen.","Set the maximum volume and adjustment step."),c=r("Selecione quais controles devem aparecer no reprodutor.","Wählen Sie, welche Bedienelemente angezeigt werden.","Choose which controls appear in the player."),d=r("Escolha uma cor ou digite um valor CSS personalizado.","Farbe auswählen oder einen eigenen CSS-Wert eingeben.","Choose a color or enter a custom CSS value."),h=r("Restaurar","Zurücksetzen","Reset"),p=r("Visível","Sichtbar","Visible"),u=r("Oculto","Ausgeblendet","Hidden"),m=r("Prévia dos controles","Vorschau der Bedienelemente","Controls preview"),g=r("Volume máximo","Maximale Lautstärke","Maximum volume"),v=r("Ajuste por toque","Schrittweite","Volume step"),f=r("Cor personalizada (CSS)","Eigene Farbe (CSS)","Custom CSS color"),b=r("Cores rápidas","Schnellfarben","Quick colors"),y=r("Cor padrão","Standardfarbe","Default color"),A=(r("Limite de saída","Ausgabelimit","Output limit"),String(this.config.playerControlsBackgroundColor??ve)),w=/^#[0-9a-fA-F]{6}$/.test(A),S=ve,C=w?A:/^#[0-9a-fA-F]{6}$/.test(S)?S:"#202020",x=Math.max(10,Math.min(100,Number(this.config.playerVolumeMaxValue??100)||100)),I=Math.max(1,Math.min(30,Number(this.config.playerVolumeStepValue??10)||10)),k=null==this.config.playerControlsBackgroundColor,$=[{name:"playerVolumeControlsHideMute",icon:"mdi:volume-off",label:r("Silenciar","Stummschalten","Mute"),inverted:!0},{name:"playerVolumeControlsHidePower",icon:"mdi:power",label:r("Ligar / desligar","Ein / Aus","Power"),inverted:!0},{name:"playerVolumeControlsHideSlider",icon:"mdi:tune-vertical",label:r("Controle deslizante","Schieberegler","Volume slider"),inverted:!0},{name:"playerVolumeControlsShowPlusMinus",icon:"mdi:plus-minus",label:r("Mais / menos","Plus / Minus","Plus / minus"),inverted:!1},{name:"playerVolumeControlsHideLevels",icon:"mdi:volume-high",label:r("Níveis","Lautstärkepegel","Volume levels"),inverted:!0}];return B`
      <div class="studio-volume">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:volume-high"></ha-icon>
            <div>
              <div class="studio-title">${o}</div>
              <div class="studio-hint">${l}</div>
            </div>
          </div>

          <div class="volume-setting">
            <div class="setting-top">
              <span class="setting-name">${g}</span>
              <span class="setting-reading">${x}<small>%</small></span>
            </div>
            <div class="slider-row">
              <ha-icon icon="mdi:volume-medium"></ha-icon>
              <input class="studio-range" type="range" min="10" max="100" step="1"
                aria-label=${g} .value=${String(x)}
                @input=${e=>this.setVolumeNumber("playerVolumeMaxValue",e.currentTarget.value,10,100)} />
              <ha-icon icon="mdi:volume-high"></ha-icon>
            </div>
            <div class="range-caption"><span>10%</span><span>100%</span></div>
          </div>

          <div class="volume-setting">
            <div class="setting-top">
              <span class="setting-name">${v}</span>
              <span class="setting-reading">${I}<small>%</small></span>
            </div>
            <div class="slider-row">
              <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
              <input class="studio-range" type="range" min="1" max="30" step="1"
                aria-label=${v} .value=${String(I)}
                @input=${e=>this.setVolumeNumber("playerVolumeStepValue",e.currentTarget.value,1,30)} />
              <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
            </div>
            <div class="range-caption"><span>1%</span><span>30%</span></div>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:palette-outline"></ha-icon>
            <div>
              <div class="studio-title">${a}</div>
              <div class="studio-hint">${d}</div>
            </div>
          </div>

          <div class="color-top">
            <span class="field-label">${b}</span>
            <button class="reset" type="button" @click=${()=>this.restoreBackground()}>${h}</button>
          </div>
          <div class="palette-row" role="group" aria-label=${b}>
            <button type="button" class="palette-default ${k?"active":""}"
              aria-label=${y} aria-pressed=${String(k)}
              @click=${()=>this.restoreBackground()}>
              <ha-icon icon="mdi:theme-light-dark"></ha-icon>
            </button>
            ${["#101b19","#1c2430","#28324a","#173d35","#2d253b"].map(e=>B`
              <button type="button" class="palette-swatch ${k||A.toLowerCase()!==e?"":"active"}"
                style=${`--swatch:${e}`} aria-label=${e}
                aria-pressed=${String(!k&&A.toLowerCase()===e)}
                @click=${()=>this.setBackgroundColor(e)}>
                <ha-icon icon="mdi:check"></ha-icon>
              </button>
            `)}
          </div>

          <div class="preview-heading">${m}</div>
          <div class="volume-preview" style=${`background: ${A};`}>
            <ha-icon icon="mdi:volume-medium"></ha-icon>
            <span class="preview-track"><span style=${`width:${Math.min(x,100)}%`}></span></span>
            <strong>${x}%</strong>
          </div>

          <details class="advanced-color">
            <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${f}</summary>
            <div class="color-controls">
              <label class="color-picker" title=${a}>
                <input type="color" aria-label=${a} .value=${C}
                  @input=${e=>this.setBackgroundColor(e.currentTarget.value)} />
              </label>
              <input class="studio-input" type="text" aria-label=${e("backgroundColor")}
                spellcheck="false" .value=${A}
                @change=${e=>this.setBackgroundColor(e.currentTarget.value.trim())} />
            </div>
          </details>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <div>
              <div class="studio-title">${n}</div>
              <div class="studio-hint">${c}</div>
            </div>
          </div>

          <div class="controls-grid">
            ${$.map(e=>{const t=Boolean(this.config[e.name]),i=e.inverted?!t:t;return B`
                <button
                  type="button"
                  class="control-tile ${i?"selected":"hidden"}"
                  aria-label=${e.label}
                  aria-pressed=${String(i)}
                  @click=${()=>this.setField(e.name,e.inverted?i:!i)}
                >
                  <span class="control-art">
                    <ha-icon icon=${e.icon}></ha-icon>
                  </span>

                  <span class="control-label">${e.label}</span>

                  <span class="control-status">
                    <ha-icon
                      icon=${i?"mdi:check-circle":"mdi:circle-outline"}
                    ></ha-icon>
                    ${i?p:u}
                  </span>
                </button>
              `})}
          </div>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-volume {
        display: grid;
        gap: 12px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 0 2px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }

      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid
          var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(
          --card-background-color,
          var(--ha-card-background, transparent)
        );
      }

      .studio-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }

      .studio-heading ha-icon {
        --mdc-icon-size: 19px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .studio-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .studio-hint {
        margin-top: 3px;
        font-size: 11px;
        line-height: 1.4;
        color: var(--secondary-text-color);
      }

      .appearance-hint {
        margin: 0 0 14px;
      }

      .color-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .field-label {
        font-size: 12px;
        font-weight: 550;
        color: var(--secondary-text-color);
      }

      .reset {
        border: 0;
        padding: 2px 0;
        background: transparent;
        color: var(--primary-color, #34d399);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }

      .reset:hover {
        text-decoration: underline;
      }

      .color-controls {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .color-picker {
        flex: 0 0 40px;
        width: 40px;
        height: 38px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        overflow: hidden;
        cursor: pointer;
      }

      .color-picker input {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }

      .color-picker input::-webkit-color-swatch-wrapper {
        padding: 3px;
      }

      .color-picker input::-webkit-color-swatch {
        border: 0;
        border-radius: 5px;
      }

      .studio-input {
        display: block;
        flex: 1;
        min-width: 0;
        height: 38px;
        padding: 0 11px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 13px;
      }

      .studio-input:focus-visible,
      .reset:focus-visible,
      .color-picker:focus-within {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .preview-heading {
        margin-top: 14px;
        margin-bottom: 7px;
        font-size: 11px;
        color: var(--secondary-text-color);
      }

      .color-preview {
        height: 48px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: var(--secondary-background-color);
      }


      /* Premium volume settings — leaves the existing visibility tiles untouched. */
      .volume-setting { padding: 13px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.06)); }
      .volume-setting + .volume-setting { margin-top: 10px; }
      .setting-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 13px; }
      .setting-name { color: var(--primary-text-color); font-size: 12px; font-weight: 600; }
      .setting-reading { color: var(--primary-color, #34d399); font-size: 22px; font-weight: 750; font-variant-numeric: tabular-nums; }
      .setting-reading small { font-size: 12px; margin-left: 2px; }
      .slider-row { display: flex; align-items: center; gap: 10px; }
      .slider-row ha-icon { flex: 0 0 auto; color: var(--secondary-text-color); --mdc-icon-size: 18px; }
      .studio-range { flex: 1; min-width: 0; width: 100%; height: 5px; accent-color: var(--primary-color, #34d399); cursor: pointer; }
      .studio-range:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 5px; }
      .range-caption { display: flex; justify-content: space-between; margin: 8px 27px 0; color: var(--secondary-text-color); font-size: 10px; }
      .palette-row { display: flex; flex-wrap: wrap; gap: 9px; margin: 12px 0 17px; }
      .palette-swatch, .palette-default { display: grid; place-items: center; width: 39px; height: 39px; border: 2px solid var(--divider-color, rgba(128,128,128,.3)); border-radius: 12px; cursor: pointer; color: white; }
      .palette-swatch { background: var(--swatch); }
      .palette-default { background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-text-color); }
      .palette-swatch.active, .palette-default.active { border-color: var(--primary-color, #34d399); box-shadow: 0 0 0 1px var(--primary-color, #34d399); }
      .palette-swatch ha-icon { --mdc-icon-size: 17px; opacity: 0; }
      .palette-swatch.active ha-icon { opacity: 1; }
      .palette-default ha-icon { --mdc-icon-size: 20px; }
      .palette-swatch:focus-visible, .palette-default:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 3px; }
      .volume-preview { display: flex; align-items: center; gap: 11px; min-height: 60px; padding: 13px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 12px; color: #f0fdf4; }
      .volume-preview > ha-icon { --mdc-icon-size: 23px; flex: 0 0 auto; }
      .volume-preview strong { min-width: 36px; font-size: 12px; text-align: right; font-variant-numeric: tabular-nums; }
      .preview-track { display: block; flex: 1; min-width: 0; height: 5px; border-radius: 9px; background: rgba(255,255,255,.25); overflow: hidden; }
      .preview-track > span { display: block; height: 100%; border-radius: inherit; background: var(--primary-color, #34d399); }
      .advanced-color { margin-top: 15px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); padding-top: 12px; }
      .advanced-color summary { display: flex; align-items: center; gap: 7px; cursor: pointer; color: var(--secondary-text-color); font-size: 11px; list-style: none; }
      .advanced-color summary::-webkit-details-marker { display: none; }
      .advanced-color summary ha-icon { --mdc-icon-size: 17px; }
      .advanced-color .color-controls { margin-top: 12px; }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      .control-tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 0;
        min-height: 115px;
        padding: 11px 5px;
        border: 2px solid
          var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: transparent;
        color: var(--primary-text-color);
        font: inherit;
        cursor: pointer;
        transition:
          border-color .15s ease,
          background .15s ease;
      }

      .control-tile:hover {
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.08)
        );
      }

      .control-tile.selected {
        border-color: #34d399;
      }

      .control-tile.hidden {
        opacity: .58;
      }

      .control-tile:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .control-art {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 95px;
        height: 48px;
        border-radius: 9px;
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.1)
        );
      }

      .control-art ha-icon {
        --mdc-icon-size: 29px;
      }

      .selected .control-art {
        color: #34d399;
      }

      .control-label {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        overflow-wrap: anywhere;
      }

      .control-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        font-size: 10px;
        color: var(--secondary-text-color);
      }

      .control-status ha-icon {
        --mdc-icon-size: 13px;
      }

      .selected .control-status ha-icon {
        color: #34d399;
      }

      @media (max-width: 340px) {
        .studio-panel {
          padding: 10px;
        }

        .controls-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `}}),function(e){e.GENERAL="general",e.HEADER="header",e.CONTROLS="controls",e.VOLUME="volume"}(Fo||(Fo={}));const{GENERAL:Oo,HEADER:Mo,CONTROLS:Ho,VOLUME:Bo}=Fo;class Do extends Po{constructor(){super(...arguments),this.configArea=Oo}toggleArea(e){this.configArea=this.configArea===e?null:e}subEditor(e){switch(e){case Oo:return B`<crm-player-general-editor .config=${this.config} .hass=${this.hass}></crm-player-general-editor>`;case Mo:return B`<crm-player-header-editor .config=${this.config} .hass=${this.hass}></crm-player-header-editor>`;case Ho:return B`<crm-player-controls-editor .config=${this.config} .hass=${this.hass}></crm-player-controls-editor>`;case Bo:return B`<crm-player-volume-editor .config=${this.config} .hass=${this.hass}></crm-player-volume-editor>`}}render(){super.createStore();const e=e=>Ye(`editor.playerSettings.${e}`,this.config.language??"auto",this.hass.language),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass.locale?.language||this.hass.language||"en",i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o={[Oo]:{icon:"mdi:tune-variant",subtitle:r("Fundo e modo inativo","Hintergrund und Ruhezustand","Background and idle mode"),detail:r("Imagem e comportamento","Bild und Verhalten","Image and behavior")},[Mo]:{icon:"mdi:card-text-outline",subtitle:r("Informações da faixa e cabeçalho","Titelinformationen und Kopfbereich","Track information and header"),detail:r("Identidade do player","Player-Darstellung","Player appearance")},[Ho]:{icon:"mdi:play-circle-outline",subtitle:r("Botões e comandos de reprodução","Wiedergabetasten und Steuerung","Playback buttons and controls"),detail:r("Controles de mídia","Mediensteuerung","Media controls")},[Bo]:{icon:"mdi:volume-high",subtitle:r("Volume e apresentação dos controles","Lautstärke und Darstellung","Volume and control appearance"),detail:r("Controle de volume","Lautstärkeregelung","Volume control")}},a=[Oo,Mo,Ho,Bo];return B`
      <div class="studio-player">
        <div class="studio-intro">${e("description")}</div>
        <div class="studio-overview" aria-label=${r("Áreas do player","Player-Bereiche","Player sections")}>
          <div class="overview-symbol"><ha-icon icon="mdi:music-circle-outline"></ha-icon></div>
          <div class="overview-copy">
            <strong>${r("Personalização do player","Player anpassen","Customize your player")}</strong>
            <small>${r("Quatro áreas para ajustar a experiência de reprodução","Vier Bereiche für dein Wiedergabeerlebnis","Four areas to tailor playback")}</small>
          </div>
          <span class="overview-count">04</span>
        </div>
        <div class="studio-accordion">
          ${a.map((t,i)=>{const s=this.configArea===t;return B`
              <section class="studio-group ${s?"is-open":""}">
                <button
                  type="button"
                  class="studio-trigger"
                  aria-expanded=${s?"true":"false"}
                  @click=${()=>this.toggleArea(t)}
                >
                  <span class="studio-icon"><ha-icon icon=${o[t].icon}></ha-icon></span>
                  <span class="studio-copy">
                    <span class="studio-name">${e(t)}</span>
                    <span class="studio-subtitle">${o[t].subtitle}</span>
                  </span>
                  <span class="studio-index">0${i+1}</span>
                  <ha-icon class="studio-chevron" icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </button>
                ${s?B`
                  <div class="studio-content">
                    <div class="content-caption"><ha-icon icon="mdi:circle-small"></ha-icon>${o[t].detail}</div>
                    ${this.subEditor(t)}
                  </div>
                `:""}
              </section>
            `})}
        </div>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-player { display: grid; gap: 12px; min-width: 0; }
      .studio-intro { padding: 2px 2px 4px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-overview {
        display: flex; align-items: center; gap: 12px; min-width: 0; padding: 13px;
        border-radius: 15px; border: 1px solid color-mix(in srgb, var(--primary-color, #34d399) 26%, var(--divider-color, #555));
        background: color-mix(in srgb, var(--primary-color, #34d399) 6%, var(--card-background-color, transparent));
      }
      .overview-symbol {
        display: grid; place-items: center; width: 42px; height: 42px; flex: 0 0 42px;
        border-radius: 12px; background: color-mix(in srgb, var(--primary-color, #34d399) 15%, transparent);
        color: var(--primary-color, #34d399);
      }
      .overview-symbol ha-icon { --mdc-icon-size: 25px; }
      .overview-copy { display: grid; gap: 4px; min-width: 0; flex: 1; }
      .overview-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .overview-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .overview-count { font-size: 19px; font-weight: 750; color: var(--primary-color, #34d399); opacity: .75; }
      .studio-accordion { display: grid; gap: 9px; min-width: 0; }
      .studio-group {
        min-width: 0; overflow: hidden; border-radius: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        background: var(--card-background-color, var(--ha-card-background, transparent));
        transition: border-color .15s ease, box-shadow .15s ease;
      }
      .studio-group.is-open {
        border-color: color-mix(in srgb, var(--primary-color, #34d399) 60%, var(--divider-color, #555));
        box-shadow: 0 2px 12px rgba(0,0,0,.04);
      }
      .studio-trigger {
        display: flex; align-items: center; gap: 11px; width: 100%; min-height: 69px;
        padding: 12px 13px; border: 0; background: transparent;
        color: var(--primary-text-color); text-align: left; font: inherit; cursor: pointer;
      }
      .studio-trigger:hover { background: var(--secondary-background-color, rgba(128,128,128,.08)); }
      .studio-trigger:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: -3px; }
      .studio-icon {
        display: grid; place-items: center; flex: 0 0 38px; width: 38px; height: 38px;
        border-radius: 11px; background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--secondary-text-color);
      }
      .studio-icon ha-icon { --mdc-icon-size: 21px; }
      .is-open .studio-icon {
        color: var(--primary-color, #34d399);
        background: color-mix(in srgb, var(--primary-color, #34d399) 13%, transparent);
      }
      .studio-copy { display: grid; flex: 1; gap: 4px; min-width: 0; }
      .studio-name { font-size: 13px; font-weight: 650; }
      .studio-subtitle { font-size: 11px; line-height: 1.35; color: var(--secondary-text-color); }
      .studio-index { font-size: 10px; font-weight: 700; color: var(--secondary-text-color); opacity: .65; }
      .studio-chevron { flex-shrink: 0; color: var(--secondary-text-color); --mdc-icon-size: 19px; }
      .studio-content { min-width: 0; padding: 13px 14px 15px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-content > * { display: block; min-width: 0; }
      .content-caption { display: flex !important; align-items: center; gap: 2px; margin: 0 0 11px; color: var(--secondary-text-color); font-size: 10px; letter-spacing: .02em; }
      .content-caption ha-icon { --mdc-icon-size: 18px; color: var(--primary-color, #34d399); }
      @media (max-width: 340px) {
        .studio-trigger { padding: 10px; gap: 8px; }
        .studio-content { padding: 10px; }
        .studio-index { display: none; }
        .studio-overview { padding: 10px; gap: 9px; }
      }
    `}}Ce([Ve()],Do.prototype,"configArea",void 0),customElements.define("crm-player-editor",Do);customElements.define("crm-album-fav-browser-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.albumFavoritesSettings.${e}`,this.config.language??"auto",this.hass?.locale?.language||this.hass?.language||"en"),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass?.locale?.language||this.hass?.language||"en",i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=[{name:"albumFavBrowserItemsLimit",label:e("itemsLimit"),help:e("itemsLimitHelp"),required:!1,type:"integer",default:200,valueMin:1,valueMax:1e3},{name:"albumFavBrowserItemsPerRow",label:e("itemsPerRow"),help:e("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],a=[{name:"albumFavBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"albumFavBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}},{name:"albumFavBrowserItemsSortTitle",label:e("sortTitle"),required:!1,selector:{boolean:{}}},{name:"albumFavBrowserShuffleOnPlay",label:e("shuffleOnPlay"),required:!1,selector:{boolean:{}}},{name:"albumFavBrowserItemsRefreshOnEntry",label:e("refreshOnEntry"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-albums">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Organização","Anordnung","Layout")}</strong>
              <small>${r("Quantidade e disposição dos álbuns.","Anzahl und Anordnung der Alben.","Album count and arrangement.")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${o}
            .section=${Yt.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:album"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Exibição e reprodução","Anzeige und Wiedergabe","Display and playback")}</strong>
              <small>${r("Controle o que aparece e como os álbuns são reproduzidos.","Anzeige und Wiedergabe der Alben steuern.","Control how albums are displayed and played.")}</small>
            </div>
          </div>
          <div class="group-label"><ha-icon icon="mdi:eye-outline"></ha-icon>${r("Visibilidade","Sichtbarkeit","Visibility")}</div>
          <crm-editor-form
            .schema=${a.slice(0,2)}
            .section=${Yt.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="group-divider"></div>
          <div class="group-label"><ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>${r("Ordenação e reprodução","Sortierung und Wiedergabe","Sorting and playback")}</div>
          <crm-editor-form
            .schema=${a.slice(2,4)}
            .section=${Yt.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="group-divider"></div>
          <div class="group-label"><ha-icon icon="mdi:refresh"></ha-icon>${r("Atualização","Aktualisierung","Refresh")}</div>
          <crm-editor-form
            .schema=${a.slice(4)}
            .section=${Yt.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; --studio-accent: var(--success-color, #38c997); }
      * { box-sizing: border-box; }
      .studio-albums { display: grid; gap: 12px; min-width: 0; }
      .studio-description { margin: 0 2px 3px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-panel {
        min-width: 0; padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex; align-items: center; gap: 11px;
        margin-bottom: 15px; padding-bottom: 13px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex; justify-content: center; align-items: center;
        flex: 0 0 38px; width: 38px; height: 38px; border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 12%, transparent);
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .group-label {
        display: flex; align-items: center; gap: 7px;
        margin: 3px 0 10px; font-size: 11px; font-weight: 650;
        color: var(--primary-text-color);
      }
      .group-label ha-icon { --mdc-icon-size: 17px; color: var(--studio-accent); }
      .group-divider { height: 1px; background: var(--divider-color, rgba(128,128,128,.2)); margin: 15px 0; }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } }
    `}onValueChanged(e){}});customElements.define("crm-artist-fav-browser-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.artistFavoritesSettings.${e}`,this.config.language??"auto",this.hass?.locale?.language||this.hass?.language||"en"),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass?.locale?.language||this.hass?.language||"en",i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=[{name:"artistFavBrowserItemsLimit",label:e("itemsLimit"),help:e("itemsLimitHelp"),required:!1,type:"integer",default:200,valueMin:1,valueMax:1e3},{name:"artistFavBrowserItemsPerRow",label:e("itemsPerRow"),help:e("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],a=[{name:"artistFavBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"artistFavBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],n=[{name:"artistFavBrowserItemsSortTitle",label:e("sortTitle"),required:!1,selector:{boolean:{}}},{name:"artistFavBrowserShuffleOnPlay",label:e("shuffleOnPlay"),required:!1,selector:{boolean:{}}}],l=[{name:"artistFavBrowserItemsRefreshOnEntry",label:e("refreshOnEntry"),required:!1,selector:{boolean:{}}}],c=e=>B`
      <crm-editor-form
        .schema=${e}
        .section=${Yt.ARTIST_FAVORITES}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
        @value-changed=${this.onValueChanged}
      ></crm-editor-form>
    `;return B`
      <div class="studio-artists">
        <div class="intro">
          <span class="intro-icon"><ha-icon icon="mdi:account-music-outline"></ha-icon></span>
          <div>
            <strong>${r("Artistas favoritos","Lieblingskünstler","Favorite artists")}</strong>
            <small>${e("description")}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Organização","Anordnung","Layout")}</strong>
              <small>${r("Quantidade e disposição dos artistas","Anzahl und Anordnung der Künstler","Artist count and arrangement")}</small>
            </div>
          </div>
          ${c(o)}
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Exibição e reprodução","Anzeige und Wiedergabe","Display and playback")}</strong>
              <small>${r("Visibilidade, ordenação e atualização","Sichtbarkeit, Sortierung und Aktualisierung","Visibility, sorting and refresh")}</small>
            </div>
          </div>
          <div class="subsection">
            <div class="subsection-heading"><ha-icon icon="mdi:eye-outline"></ha-icon><strong>${r("Visibilidade","Sichtbarkeit","Visibility")}</strong></div>
            ${c(a)}
          </div>
          <div class="subsection">
            <div class="subsection-heading"><ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon><strong>${r("Ordenação e reprodução","Sortierung und Wiedergabe","Sorting and playback")}</strong></div>
            ${c(n)}
          </div>
          <div class="subsection last">
            <div class="subsection-heading"><ha-icon icon="mdi:refresh"></ha-icon><strong>${r("Atualização","Aktualisierung","Refresh")}</strong></div>
            ${c(l)}
          </div>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; --studio-accent: var(--success-color, #38c997); }
      * { box-sizing: border-box; }
      .studio-artists { display: grid; gap: 12px; min-width: 0; }
      .intro { display: flex; align-items: center; gap: 11px; padding: 3px 2px 5px; }
      .intro-icon { display: grid; place-items: center; flex: 0 0 42px; height: 42px; border-radius: 13px; color: var(--studio-accent); background: color-mix(in srgb, var(--studio-accent) 12%, transparent); }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .intro > div { display: grid; gap: 4px; min-width: 0; }
      .intro strong { color: var(--primary-text-color); font-size: 14px; }
      .intro small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: grid; place-items: center; flex: 0 0 36px; height: 36px; border-radius: 11px; background: color-mix(in srgb, var(--studio-accent) 11%, var(--secondary-background-color)); color: var(--studio-accent); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .subsection { padding: 0 0 14px; margin-bottom: 14px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.16)); }
      .subsection.last { padding-bottom: 0; margin-bottom: 0; border-bottom: 0; }
      .subsection-heading { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; color: var(--secondary-text-color); }
      .subsection-heading ha-icon { --mdc-icon-size: 17px; color: var(--studio-accent); }
      .subsection-heading strong { font-size: 11px; font-weight: 650; }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } }
    `}onValueChanged(e){}});customElements.define("crm-audiobook-fav-browser-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.audiobookFavoritesSettings.${e}`,this.config.language??"auto",this.hass?.locale?.language||this.hass?.language||"en"),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass?.locale?.language||this.hass?.language||"en",i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=[{name:"audiobookFavBrowserItemsLimit",label:e("itemsLimit"),help:e("itemsLimitHelp"),required:!1,type:"integer",default:200,valueMin:1,valueMax:1e3},{name:"audiobookFavBrowserItemsPerRow",label:e("itemsPerRow"),help:e("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],a=[{name:"audiobookFavBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"audiobookFavBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],n=[{name:"audiobookFavBrowserItemsSortTitle",label:e("sortTitle"),required:!1,selector:{boolean:{}}},{name:"audiobookFavBrowserItemsRefreshOnEntry",label:e("refreshOnEntry"),required:!1,selector:{boolean:{}}}],l=e=>B`
      <crm-editor-form
        .schema=${e}
        .section=${Yt.AUDIOBOOK_FAVORITES}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
        @value-changed=${this.onValueChanged}
      ></crm-editor-form>
    `;return B`
      <div class="studio-audiobooks">
        <div class="intro">
          <span class="intro-icon"><ha-icon icon="mdi:book-music-outline"></ha-icon></span>
          <div>
            <strong>${r("Audiolivros favoritos","Lieblingshörbücher","Favorite audiobooks")}</strong>
            <small>${e("description")}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Organização","Anordnung","Layout")}</strong>
              <small>${r("Quantidade e disposição dos audiolivros.","Anzahl und Anordnung der Hörbücher.","Audiobook count and arrangement.")}</small>
            </div>
          </div>
          ${l(o)}
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Exibição","Anzeige","Display")}</strong>
              <small>${r("Controle o que aparece e como a lista é atualizada.","Sichtbarkeit, Sortierung und Aktualisierung einstellen.","Control visibility, sorting and refresh.")}</small>
            </div>
          </div>
          <div class="subgroup">
            <div class="subgroup-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${r("Visibilidade","Sichtbarkeit","Visibility")}</div>
            ${l(a)}
          </div>
          <div class="subgroup">
            <div class="subgroup-title"><ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>${r("Ordenação e atualização","Sortierung und Aktualisierung","Sorting and refresh")}</div>
            ${l(n)}
          </div>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; color: var(--primary-text-color); }
      * { box-sizing: border-box; }
      .studio-audiobooks { display: grid; gap: 12px; min-width: 0; }
      .intro { display: flex; align-items: center; gap: 12px; padding: 3px 2px 5px; }
      .intro-icon { width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border-radius: 12px; background: color-mix(in srgb, var(--success-color, #27b881) 12%, transparent); color: var(--success-color, #27b881); }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .intro > div { display: grid; gap: 4px; min-width: 0; }
      .intro strong { font-size: 14px; }
      .intro small { font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }
      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 15px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 11px; margin-bottom: 15px; padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: grid; place-items: center; flex: 0 0 36px; width: 36px; height: 36px; border-radius: 11px; background: color-mix(in srgb, var(--success-color, #27b881) 10%, var(--secondary-background-color, transparent)); color: var(--success-color, #27b881); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { font-size: 11px; line-height: 1.45; color: var(--secondary-text-color); }
      crm-editor-form { display: block; min-width: 0; }
      .subgroup + .subgroup { margin-top: 15px; padding-top: 14px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.16)); }
      .subgroup-title { display: flex; align-items: center; gap: 7px; margin-bottom: 11px; font-size: 11px; font-weight: 650; color: var(--secondary-text-color); }
      .subgroup-title ha-icon { --mdc-icon-size: 16px; color: var(--success-color, #27b881); }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } }
    `}onValueChanged(e){}});customElements.define("crm-category-browser-editor",class extends Po{render(){super.createStore();const e=this.config.language??"auto",t=this.hass?.locale?.language||this.hass?.language||"en",i=("auto"===e?t:e).toLowerCase(),s=i.startsWith("pt"),r=i.startsWith("de"),o=(e,t,i)=>s?e:r?t:i,a=i=>Ye(`editor.categoryBrowserSettings.${i}`,e,t),n=[{name:"categoryBrowserItemsPerRow",label:a("itemsPerRow"),help:a("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],l=[{name:"categoryBrowserItemsHideTitle",label:a("hideTitle"),required:!1,selector:{boolean:{}}},{name:"categoryBrowserItemsHideSubTitle",label:a("hideSubtitle"),help:a("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],c=[{name:"categoryBrowserItemsSortTitle",label:a("sortTitle"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-categories">
        <div class="studio-intro">
          <span class="intro-icon"><ha-icon icon="mdi:shape-outline"></ha-icon></span>
          <div>
            <strong>${o("Categorias","Kategorien","Categories")}</strong>
            <small>${a("description")}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o("Organização","Anordnung","Layout")}</strong>
              <small>${o("Categorias por linha","Kategorien pro Zeile","Categories per row")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${n}
            .section=${Yt.CATEGORYS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o("Exibição","Anzeige","Display")}</strong>
              <small>${o("Visibilidade e ordenação","Sichtbarkeit und Sortierung","Visibility and sorting")}</small>
            </div>
          </div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <span>${o("Visibilidade","Sichtbarkeit","Visibility")}</span>
          </div>
          <crm-editor-form
            .schema=${l}
            .section=${Yt.CATEGORYS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="subsection-divider"></div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
            <span>${o("Ordenação","Sortierung","Sorting")}</span>
          </div>
          <crm-editor-form
            .schema=${c}
            .section=${Yt.CATEGORYS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
        --studio-accent: var(--success-color, #35c98c);
      }
      * { box-sizing: border-box; }
      .studio-categories { display: grid; gap: 12px; min-width: 0; }
      .studio-intro { display: flex; align-items: center; gap: 11px; padding: 3px 2px 5px; }
      .intro-icon {
        display: grid; place-items: center; flex: 0 0 42px; height: 42px;
        border-radius: 13px; color: var(--studio-accent);
        background: color-mix(in srgb, var(--studio-accent) 12%, transparent);
      }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .studio-intro > div { display: grid; gap: 4px; min-width: 0; }
      .studio-intro strong { color: var(--primary-text-color); font-size: 14px; }
      .studio-intro small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      .studio-panel {
        min-width: 0; padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex; align-items: center; gap: 11px; margin-bottom: 15px;
        padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: grid; place-items: center; flex: 0 0 37px; height: 37px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 11%, var(--secondary-background-color, transparent));
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .subsection-heading {
        display: flex; align-items: center; gap: 8px; margin: 2px 0 11px;
        color: var(--primary-text-color); font-size: 12px; font-weight: 650;
      }
      .subsection-heading ha-icon { color: var(--studio-accent); --mdc-icon-size: 17px; }
      .subsection-divider {
        height: 1px; margin: 15px 0;
        background: var(--divider-color, rgba(128,128,128,.2));
      }
      @media (max-width: 340px) {
        .studio-panel { padding: 11px; }
        .studio-panel-heading { gap: 8px; }
      }
    `}onValueChanged(e){}});class Vo extends Po{constructor(){super(...arguments),this.availableDevices=[],this.devicesLoading=!1,this.devicesLoaded=!1,this.devicesError="",this.requestId=0,this.loadedEntityId=""}updated(e){super.updated(e);const t=this.config?.entity||"";this.hass&&this.config&&t&&t!==this.loadedEntityId?(this.loadedEntityId=t,this.loadedShowHiddenDevices=!!this.config.deviceBrowserItemsShowHiddenDevices,this.loadDevices(!1)):this.hass&&this.config&&t&&this.loadedShowHiddenDevices!==!!this.config.deviceBrowserItemsShowHiddenDevices&&(this.loadedShowHiddenDevices=!!this.config.deviceBrowserItemsShowHiddenDevices,this.loadDevices(!1))}getLabels(){const e="auto"!==this.config.language&&this.config.language?this.config.language:this.hass.language,t=e?.toLowerCase().startsWith("pt"),i=e?.toLowerCase().startsWith("de"),s=(e,s,r)=>t?e:i?s:r;return{layout:s("Organização","Anordnung","Layout"),layoutHint:s("Defina o dispositivo padrão e a disposição","Standardgerät und Anordnung festlegen","Choose the default device and layout"),behavior:s("Visibilidade e comportamento","Sichtbarkeit und Verhalten","Visibility and behavior"),behaviorHint:s("Controle quais informações e dispositivos aparecem","Sichtbare Informationen und Geräte festlegen","Choose which information and devices appear"),chooseDevice:s("Escolher dispositivo padrão","Standardgerät auswählen","Choose default device"),chooseDeviceHint:s("Selecione um dispositivo Spotify Connect. A reprodução não será iniciada.","Spotify-Connect-Gerät auswählen. Die Wiedergabe wird nicht gestartet.","Select a Spotify Connect device. Playback will not start."),refresh:s("Atualizar lista","Liste aktualisieren","Refresh list"),loading:s("Buscando dispositivos...","Geräte werden geladen...","Loading devices..."),empty:s("Nenhum dispositivo encontrado. Verifique o SpotifyPlus ou tente atualizar.","Keine Geräte gefunden. SpotifyPlus prüfen oder Liste aktualisieren.","No devices found. Check SpotifyPlus or refresh."),error:s("Não foi possível carregar os dispositivos.","Geräte konnten nicht geladen werden.","Could not load devices."),selected:s("Selecionado","Ausgewählt","Selected"),active:s("Ativo","Aktiv","Active"),group:s("Grupo multiroom","Multiroom-Gruppe","Multiroom group"),device:s("Dispositivo","Gerät","Device"),manual:s("ID ou nome manual","ID oder Name manuell","Manual ID or name"),manualHint:s("Alternativa para dispositivos que não aparecem na lista.","Alternative für Geräte, die nicht in der Liste erscheinen.","Alternative for devices missing from the list."),notInList:s("O dispositivo configurado não aparece na lista atual.","Das konfigurierte Gerät ist nicht in der aktuellen Liste.","The configured device is not in the current list."),perRow:s("Dispositivos por linha","Geräte pro Zeile","Devices per row"),perRowHint:s("Quantidade de dispositivos exibidos em cada linha","Anzahl der Geräte in einer Reihe","Number of devices displayed in each row"),noDefault:s("Nenhum dispositivo padrão definido","Kein Standardgerät festgelegt","No default device configured"),byName:s("O controle por nome está ativado. A seleção salvará o nome do dispositivo.","Steuerung nach Namen ist aktiviert. Die Auswahl speichert den Gerätenamen.","Control by name is enabled. Selection will save the device name.")}}async loadDevices(e){const t=++this.requestId;this.devicesLoading=!0,this.devicesError="";try{this.createStore();const i=this.store.spotifyPlusService,s=this.store.player,r=this.config.deviceBrowserItemsShowHiddenDevices?[]:s.attributes.sp_source_list_hide||[],o=await i.GetSpotifyConnectDevices(s,e,!0,r);if(t!==this.requestId)return;const a=o?.Items||[],n=new Map;for(const e of a){const t=(e.Name||e.Id||"").trim().toLocaleLowerCase(),i=`${"group"===e.DeviceInfo?.GroupStatus?.toLowerCase()?"group":"device"}:${t}`,s=n.get(i),r=this.config.deviceDefaultId||"",o=e.Id===r||e.Name===r,a=s&&(s.Id===r||s.Name===r);(!s||o&&!a||!a&&!s.IsActiveDevice&&e.IsActiveDevice)&&n.set(i,e)}this.availableDevices=Array.from(n.values()),this.devicesLoaded=!0}catch(e){if(t!==this.requestId)return;this.availableDevices=[],this.devicesLoaded=!0,this.devicesError=e instanceof Error?e.message:String(e)}finally{t===this.requestId&&(this.devicesLoading=!1)}}getDeviceValue(e){return e.IsSonos||this.config.deviceControlByName?e.Name||e.Id||"":e.Id||e.Name||""}selectDevice(e){const t=this.getDeviceValue(e);t&&this.configChanged({...this.config,deviceDefaultId:t})}updateItemsPerRow(e){const t=Number(e.currentTarget.value);if(!Number.isFinite(t))return;const i=Math.min(12,Math.max(1,Math.round(t)));this.configChanged({...this.config,deviceBrowserItemsPerRow:i})}getDeviceIcon(e){return"group"===(e.DeviceInfo?.GroupStatus?.toLowerCase()||"")?"mdi:speaker-multiple":e.IsChromeCast?"mdi:cast-audio":e.IsSonos?"mdi:speaker-wireless":"mdi:speaker"}renderDeviceSelector(){const e=this.getLabels(),t=this.config.deviceDefaultId||"",i=this.availableDevices.find(e=>e.Id===t||e.Name===t||this.getDeviceValue(e)===t);return B`
      <div class="device-selector">
        <div class="device-selector-heading">
          <div class="device-selector-copy">
            <strong>${e.chooseDevice}</strong>
            <small>${e.chooseDeviceHint}</small>
          </div>

          <button
            class="refresh-button"
            type="button"
            ?disabled=${this.devicesLoading}
            @click=${()=>{this.loadDevices(!0)}}
          >
            <ha-icon icon="mdi:refresh"></ha-icon>
            <span>${e.refresh}</span>
          </button>
        </div>

        ${this.config.deviceControlByName?B`<p class="device-note">${e.byName}</p>`:V}

        ${this.devicesLoading?B`
              <div class="device-status">
                <ha-icon icon="mdi:loading"></ha-icon>
                ${e.loading}
              </div>
            `:V}

        ${this.devicesError?B`
              <div class="device-status device-error">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>${e.error} ${this.devicesError}</span>
              </div>
            `:V}

        ${this.devicesLoading||!this.devicesLoaded||this.devicesError||0!==this.availableDevices.length?V:B`
              <div class="device-status">
                <ha-icon icon="mdi:speaker-off"></ha-icon>
                ${e.empty}
              </div>
            `}

        ${this.availableDevices.length>0?B`
              <div class="device-grid">
                ${this.availableDevices.map(i=>{const s=this.getDeviceValue(i),r=!!t&&(t===s||t===i.Id||t===i.Name),o="group"===i.DeviceInfo?.GroupStatus?.toLowerCase();return B`
                    <button
                      class="device-option ${r?"is-selected":""}"
                      type="button"
                      ?disabled=${!s}
                      aria-pressed=${r?"true":"false"}
                      @click=${()=>this.selectDevice(i)}
                    >
                      <span class="device-icon">
                        <ha-icon
                          icon=${this.getDeviceIcon(i)}
                        ></ha-icon>
                      </span>

                      <span class="device-copy">
                        <strong>${i.Name||i.Id}</strong>
                        <small>
                          ${o?e.group:e.device}
                          ${i.IsActiveDevice?B` · ${e.active}`:V}
                        </small>
                      </span>

                      <ha-icon
                        class="device-check"
                        icon=${r?"mdi:check-circle":"mdi:circle-outline"}
                      ></ha-icon>
                    </button>
                  `})}
              </div>
            `:V}

        <div class="device-selection-summary">
          <ha-icon
            icon=${t?"mdi:check-circle-outline":"mdi:information-outline"}
          ></ha-icon>
          <span>
            ${t?B`
                  <strong>${e.selected}:</strong>
                  ${i?.Name||t}
                `:e.noDefault}
          </span>
        </div>

        ${t&&this.devicesLoaded&&!this.devicesLoading&&!this.devicesError&&this.availableDevices.length>0&&!i?B`<p class="device-note">${e.notInList}</p>`:V}
      </div>
    `}render(){super.createStore();const e=e=>Ye(`editor.deviceBrowserSettings.${e}`,this.config.language??"auto",this.hass.language),t=this.getLabels(),i=[{name:"deviceDefaultId",label:t.manual,help:t.manualHint,required:!1,type:"string"}],s=Number(this.config.deviceBrowserItemsPerRow),r=Number.isFinite(s)&&s>=1?Math.min(12,Math.max(1,Math.round(s))):4,o=[{name:"deviceBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"deviceBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}},{name:"deviceBrowserItemsShowHiddenDevices",label:e("showHiddenDevices"),required:!1,selector:{boolean:{}}},{name:"deviceControlByName",label:e("controlByName"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-devices">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:speaker-multiple"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${t.layout}</strong>
              <small>${t.layoutHint}</small>
            </div>
          </div>

          ${this.renderDeviceSelector()}

          <div class="manual-settings">
            <crm-editor-form
              .schema=${i}
              .section=${Yt.DEVICES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
            ></crm-editor-form>
          </div>
          <div class="layout-control">
            <div class="layout-control-heading">
              <div class="layout-control-copy">
                <strong>${t.perRow}</strong>
                <small>${t.perRowHint}</small>
              </div>
              <output class="layout-value" for="device-per-row">${r}</output>
            </div>
            <input
              id="device-per-row"
              class="layout-range"
              type="range"
              min="1"
              max="12"
              step="1"
              .value=${String(r)}
              style=${`--range-progress: ${(r-1)/11*100}%`}
              aria-label=${t.perRow}
              @input=${this.updateItemsPerRow}
            />
            <div class="layout-scale"><span>1</span><span>6</span><span>12</span></div>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:eye-outline"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${t.behavior}</strong>
              <small>${t.behaviorHint}</small>
            </div>
          </div>

          <crm-editor-form
            .schema=${o}
            .section=${Yt.DEVICES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-devices {
        display: grid;
        gap: 11px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }

      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(
          --card-background-color,
          var(--ha-card-background, transparent)
        );
      }

      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 13px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }

      .studio-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        flex: 0 0 35px;
        border-radius: 10px;
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.12)
        );
        color: var(--secondary-text-color);
      }

      .studio-icon ha-icon {
        --mdc-icon-size: 19px;
      }

      .studio-heading-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }

      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.35;
      }
      .device-selector {
        display: grid;
        gap: 12px;
        min-width: 0;
      }

      .device-selector-heading {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
      }

      .device-selector-copy {
        display: grid;
        gap: 4px;
        min-width: 0;
        flex: 1;
      }

      .device-selector-copy strong {
        color: var(--primary-text-color);
        font-size: 12px;
      }

      .device-selector-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }

      .refresh-button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 7px 10px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.25));
        border-radius: 9px;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }

      .refresh-button ha-icon {
        --mdc-icon-size: 16px;
      }

      .refresh-button:disabled {
        opacity: .5;
        cursor: wait;
      }

      .device-grid {
        display: grid;
        gap: 8px;
      }

      .device-option {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;
        padding: 11px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 11px;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        text-align: left;
        font: inherit;
        cursor: pointer;
        transition: border-color .15s, background .15s;
      }

      .device-option:hover {
        border-color: var(--primary-color);
      }

      .device-option.is-selected {
        border-color: var(--primary-color);
        background: color-mix(
          in srgb,
          var(--primary-color) 9%,
          transparent
        );
      }

      .device-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        flex: 0 0 36px;
        border-radius: 10px;
        background: var(--card-background-color, rgba(128,128,128,.12));
      }

      .device-icon ha-icon {
        --mdc-icon-size: 21px;
      }

      .device-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
        flex: 1;
      }

      .device-copy strong {
        overflow-wrap: anywhere;
        font-size: 12px;
        font-weight: 600;
      }

      .device-copy small {
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .device-check {
        --mdc-icon-size: 21px;
        color: var(--secondary-text-color);
      }

      .is-selected .device-check {
        color: var(--primary-color);
      }

      .device-selection-summary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        border-radius: 9px;
        background: var(--secondary-background-color, rgba(128,128,128,.08));
        color: var(--primary-text-color);
        font-size: 11px;
        overflow-wrap: anywhere;
      }

      .device-selection-summary ha-icon {
        --mdc-icon-size: 18px;
        color: var(--primary-color);
      }

      .device-status {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border: 1px dashed var(--divider-color, rgba(128,128,128,.3));
        border-radius: 10px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }

      .device-status ha-icon {
        --mdc-icon-size: 19px;
        flex-shrink: 0;
      }

      .device-error {
        color: var(--error-color, #db4437);
      }

      .device-note {
        margin: 0;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.5;
      }

      .manual-settings {
        margin-top: 6px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }

      .layout-control {
        margin-top: 13px;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(128,128,128,.06));
        color: var(--primary-text-color);
      }
      .layout-control-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 13px;
      }
      .layout-control-copy { display: grid; gap: 4px; min-width: 0; }
      .layout-control-copy strong { font-size: 12px; font-weight: 650; }
      .layout-control-copy small { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .layout-value {
        flex: 0 0 auto;
        min-width: 36px;
        padding: 7px 9px;
        border-radius: 9px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        background: var(--card-background-color, transparent);
        color: var(--primary-text-color);
        text-align: center;
        font-size: 15px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .layout-range {
        display: block;
        width: 100%;
        height: 22px;
        margin: 0;
        padding: 0;
        background: transparent;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        accent-color: var(--crm-editor-accent, var(--primary-color, #159568));
      }
      .layout-range::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(to right,
          var(--crm-editor-accent, var(--primary-color, #159568)) 0%,
          var(--crm-editor-accent, var(--primary-color, #159568)) var(--range-progress),
          var(--divider-color, #a1a1aa) var(--range-progress),
          var(--divider-color, #a1a1aa) 100%);
      }
      .layout-range::-moz-range-track {
        height: 6px;
        border-radius: 999px;
        background: var(--divider-color, #a1a1aa);
      }
      .layout-range::-moz-range-progress {
        height: 6px;
        border-radius: 999px;
        background: var(--crm-editor-accent, var(--primary-color, #159568));
      }
      .layout-range::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
        margin-top: -6px;
        border: 3px solid var(--card-background-color, #fff);
        border-radius: 50%;
        background: var(--crm-editor-accent, var(--primary-color, #159568));
        box-shadow: 0 1px 5px rgba(0,0,0,.18);
        appearance: none;
        -webkit-appearance: none;
      }
      .layout-range::-moz-range-thumb {
        width: 13px;
        height: 13px;
        border: 3px solid var(--card-background-color, #fff);
        border-radius: 50%;
        background: var(--crm-editor-accent, var(--primary-color, #159568));
        box-shadow: 0 1px 5px rgba(0,0,0,.18);
      }
      .layout-range:focus-visible { outline: 2px solid var(--crm-editor-accent, var(--primary-color, #159568)); outline-offset: 3px; }
      .layout-scale { display: flex; justify-content: space-between; color: var(--secondary-text-color); font-size: 10px; margin-top: 2px; }

      crm-editor-form {
        display: block;
        min-width: 0;
      }

      @media (max-width: 340px) {
        .studio-panel {
          padding: 10px;
        }

        .device-option {
          padding: 9px;
        }
      }
    `}}Ce([Ve()],Vo.prototype,"availableDevices",void 0),Ce([Ve()],Vo.prototype,"devicesLoading",void 0),Ce([Ve()],Vo.prototype,"devicesLoaded",void 0),Ce([Ve()],Vo.prototype,"devicesError",void 0),customElements.define("crm-device-browser-editor",Vo);customElements.define("crm-episode-fav-browser-editor",class extends Po{render(){super.createStore();const e=this.config.language??"auto",t=this.hass?.locale?.language||this.hass?.language||"en",i=("auto"===e?t:e).toLowerCase(),s=i.startsWith("pt"),r=i.startsWith("de"),o=(e,t,i)=>s?e:r?t:i,a=i=>Ye(`editor.episodeFavoritesSettings.${i}`,e,t),n=[{name:"episodeFavBrowserItemsLimit",label:a("itemsLimit"),help:a("itemsLimitHelp"),required:!1,type:"integer",default:200,valueMin:1,valueMax:1e3},{name:"episodeFavBrowserItemsPerRow",label:a("itemsPerRow"),help:a("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],l=[{name:"episodeFavBrowserItemsHideTitle",label:a("hideTitle"),required:!1,selector:{boolean:{}}},{name:"episodeFavBrowserItemsHideSubTitle",label:a("hideSubtitle"),help:a("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],c=[{name:"episodeFavBrowserItemsSortTitle",label:a("sortTitle"),required:!1,selector:{boolean:{}}},{name:"episodeFavBrowserItemsRefreshOnEntry",label:a("refreshOnEntry"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-episodes">
        <div class="studio-intro">
          <span class="intro-icon"><ha-icon icon="mdi:podcast"></ha-icon></span>
          <div>
            <strong>${o("Episódios favoritos","Lieblingsepisoden","Favorite episodes")}</strong>
            <small>${a("description")}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o("Organização","Anordnung","Layout")}</strong>
              <small>${o("Quantidade e disposição dos episódios","Anzahl und Anordnung der Episoden","Episode count and arrangement")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${n}
            .section=${Yt.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o("Exibição","Anzeige","Display")}</strong>
              <small>${o("Visibilidade, ordenação e atualização","Sichtbarkeit, Sortierung und Aktualisierung","Visibility, sorting and refresh")}</small>
            </div>
          </div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <span>${o("Visibilidade","Sichtbarkeit","Visibility")}</span>
          </div>
          <crm-editor-form
            .schema=${l}
            .section=${Yt.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="subsection-divider"></div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
            <span>${o("Ordenação e atualização","Sortierung und Aktualisierung","Sorting and refresh")}</span>
          </div>
          <crm-editor-form
            .schema=${c}
            .section=${Yt.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
        --studio-accent: var(--success-color, #35c98c);
      }
      * { box-sizing: border-box; }
      .studio-episodes { display: grid; gap: 12px; min-width: 0; }
      .studio-intro { display: flex; align-items: center; gap: 11px; padding: 3px 2px 5px; }
      .intro-icon {
        display: grid; place-items: center; flex: 0 0 42px; height: 42px;
        border-radius: 13px; color: var(--studio-accent);
        background: color-mix(in srgb, var(--studio-accent) 12%, transparent);
      }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .studio-intro > div { display: grid; gap: 4px; min-width: 0; }
      .studio-intro strong { color: var(--primary-text-color); font-size: 14px; }
      .studio-intro small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      .studio-panel {
        min-width: 0; padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex; align-items: center; gap: 11px; margin-bottom: 15px;
        padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: grid; place-items: center; flex: 0 0 37px; height: 37px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 11%, var(--secondary-background-color, transparent));
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .subsection-heading {
        display: flex; align-items: center; gap: 8px; margin: 2px 0 11px;
        color: var(--primary-text-color); font-size: 12px; font-weight: 650;
      }
      .subsection-heading ha-icon { color: var(--studio-accent); --mdc-icon-size: 17px; }
      .subsection-divider {
        height: 1px; margin: 15px 0;
        background: var(--divider-color, rgba(128,128,128,.2));
      }
      @media (max-width: 340px) {
        .studio-panel { padding: 11px; }
        .studio-panel-heading { gap: 8px; }
      }
    `}onValueChanged(e){}});customElements.define("crm-playlist-fav-browser-editor",class extends Po{get language(){const e=this.config?.language;return(e&&"auto"!==e?e:this.hass?.language||"en").toLowerCase()}tr(e,t,i){return this.language.startsWith("pt")?e:this.language.startsWith("de")?t:i}value(e,t){const i=this.config[e];return null==i?t:i}updateField(e,t){const i={...this.config,[e]:t};this.configChanged(i)}numberField(e,t,i,s,r){return B`
      <label class="number-row">
        <span class="setting-label">${t}</span>
        <input
          class="number-input"
          type="number"
          min=${s}
          max=${r}
          .value=${String(this.value(e,i))}
          @change=${t=>{const o=t.currentTarget,a=Number(o.value);if(!Number.isFinite(a))return void(o.value=String(this.value(e,i)));const n=Math.min(r,Math.max(s,Math.round(a)));o.value=String(n),this.updateField(e,n)}}
        />
      </label>
    `}sliderField(e,t,i,s,r){const o=Number(this.value(e,i)),a=Number.isFinite(o)?Math.min(r,Math.max(s,o)):i;return B`
      <div class="slider-field">
        <div class="slider-heading">
          <span class="setting-label">${t}</span>
          <span class="value-badge">${a}</span>
        </div>

        <input
          class="range-input"
          type="range"
          min=${s}
          max=${r}
          step="1"
          .value=${String(a)}
          @input=${e=>{const t=e.currentTarget,i=t.parentElement?.querySelector(".value-badge");i&&(i.textContent=t.value)}}
          @change=${t=>{const i=t.currentTarget;this.updateField(e,Number(i.value))}}
        />

        <div class="range-labels">
          <span>${s}</span>
          <span>${r}</span>
        </div>
      </div>
    `}toggleField(e,t,i=!1,s=""){const r=Boolean(this.value(e,i));return B`
      <label class="toggle-row">
        <span class="toggle-copy"><span class="setting-label">${t}</span>${s?B`<small>${s}</small>`:""}</span>
        <input
          class="toggle-input"
          type="checkbox"
          .checked=${r}
          @change=${t=>{this.updateField(e,t.currentTarget.checked)}}
        />
        <span class="toggle-track" aria-hidden="true">
          <span class="toggle-thumb"></span>
        </span>
      </label>
    `}render(){return B`
      <div class="studio">

        <div class="intro">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <div>
            <strong>
              ${this.tr("Playlists favoritas","Lieblingsplaylists","Favorite playlists")}
            </strong>
            <span>
              ${this.tr("Personalize a aparência e a reprodução.","Darstellung und Wiedergabe anpassen.","Customize appearance and playback.")}
            </span>
          </div>
        </div>

        <section class="settings-section">
          <div class="section-heading">
            <ha-icon icon="mdi:view-grid-outline"></ha-icon>
            <strong>
              ${this.tr("Organização","Anordnung","Layout")}
            </strong>
          </div>

          <div class="fields">
            ${this.numberField("playlistFavBrowserItemsLimit",this.tr("Máximo de playlists","Maximale Playlists","Maximum playlists"),200,1,1e3)}

            ${this.sliderField("playlistFavBrowserItemsPerRow",this.tr("Playlists por linha","Playlists pro Zeile","Playlists per row"),4,1,12)}
          </div>
        </section>

        <section class="settings-section">
          <div class="section-heading">
            <ha-icon icon="mdi:tune-variant"></ha-icon>
            <strong>
              ${this.tr("Exibição e reprodução","Anzeige & Wiedergabe","Display & playback")}
            </strong>
          </div>

          <div class="display-group">
            <div class="group-heading">
              <ha-icon icon="mdi:eye-outline"></ha-icon>
              <span>${this.tr("Informações exibidas","Angezeigte Informationen","Displayed information")}</span>
            </div>
            <div class="toggle-list">
              ${this.toggleField("playlistFavBrowserItemsHideTitle",this.tr("Ocultar títulos","Titel ausblenden","Hide titles"),!1,this.tr("Esconde o nome abaixo de cada capa.","Blendet den Namen unter jedem Cover aus.","Hides the name below each cover."))}
              ${this.toggleField("playlistFavBrowserItemsHideSubTitle",this.tr("Ocultar subtítulos","Untertitel ausblenden","Hide subtitles"),!1,this.tr("Esconde as informações secundárias.","Blendet zusätzliche Informationen aus.","Hides secondary information."))}
            </div>
          </div>

          <div class="display-group">
            <div class="group-heading">
              <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
              <span>${this.tr("Ordenação e atualização","Sortierung und Aktualisierung","Sorting and refresh")}</span>
            </div>
            <div class="toggle-list">
              ${this.toggleField("playlistFavBrowserItemsSortTitle",this.tr("Ordenar por título","Nach Titel sortieren","Sort by title"),!1,this.tr("Organiza as playlists pelo nome.","Sortiert Playlists nach Namen.","Sorts playlists by name."))}
              ${this.toggleField("playlistFavBrowserItemsRefreshOnEntry",this.tr("Atualizar ao abrir","Beim Öffnen aktualisieren","Refresh on entry"),!1,this.tr("Busca dados atualizados ao entrar nesta seção.","Lädt beim Öffnen aktuelle Daten.","Fetches updated data when opening this section."))}
            </div>
          </div>

          <div class="display-group">
            <div class="group-heading">
              <ha-icon icon="mdi:shuffle-variant"></ha-icon>
              <span>${this.tr("Reprodução","Wiedergabe","Playback")}</span>
            </div>
            <div class="toggle-list">
              ${this.toggleField("playlistFavBrowserShuffleOnPlay",this.tr("Ativar reprodução aleatória","Zufallswiedergabe aktivieren","Enable shuffle on play"),!1,this.tr("Inicia playlists com ordem aleatória.","Startet Playlists in zufälliger Reihenfolge.","Starts playlists in shuffle mode."))}
            </div>
          </div>
        </section>

      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
        color: var(--primary-text-color);
        --studio-accent: var(--success-color, #38c997);
      }

      * {
        box-sizing: border-box;
      }

      .studio {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .intro {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 2px 16px;
      }

      .intro ha-icon {
        color: var(--studio-accent);
        --mdc-icon-size: 23px;
      }

      .intro div {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }

      .intro strong {
        font-size: 14px;
      }

      .intro span {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }

      .settings-section {
        min-width: 0;
        padding: 15px 2px 18px;
        border-top: 1px solid var(
          --divider-color,
          rgba(128, 128, 128, .18)
        );
      }

      .section-heading {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 15px;
      }

      .section-heading ha-icon {
        color: var(--studio-accent);
        --mdc-icon-size: 19px;
      }

      .section-heading strong {
        font-size: 13px;
        font-weight: 650;
      }

      .fields {
        display: flex;
        flex-direction: column;
        gap: 13px;
      }

      .number-input {
        width: 100%;
        min-width: 0;
        height: 38px;
        padding: 0 12px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.22));
        border-radius: 9px;
        outline: none;
        background: var(--secondary-background-color, rgba(127,127,127,.08));
        color: var(--primary-text-color);
        font: inherit;
        font-size: 12px;
        transition: border-color .15s, background .15s;
      }
      .number-input:focus {
        border-color: var(--studio-accent);
        background: var(--card-background-color, transparent);
      }

      .number-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .setting-label {
        min-width: 0;
        font-size: 12px;
        line-height: 1.45;
      }

      .number-input {
        flex: 0 0 88px;
        width: 88px;
        text-align: center;
        font-weight: 600;
      }

      .slider-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 5px;
      }

      .slider-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .value-badge {
        flex-shrink: 0;
        min-width: 35px;
        padding: 5px 9px;
        border-radius: 7px;
        background: color-mix(
          in srgb,
          var(--studio-accent) 14%,
          transparent
        );
        color: var(--studio-accent);
        font-size: 12px;
        font-weight: 700;
        text-align: center;
      }

      .range-input {
        width: 100%;
        margin: 0;
        accent-color: var(--studio-accent);
        cursor: pointer;
      }

      .range-labels {
        display: flex;
        justify-content: space-between;
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .display-group + .display-group { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.17)); }
      .group-heading { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; color: var(--secondary-text-color); font-size: 11px; font-weight: 650; }
      .group-heading ha-icon { --mdc-icon-size: 16px; color: var(--studio-accent); }
      .toggle-copy { display: grid; flex: 1; min-width: 0; gap: 3px; }
      .toggle-copy small { color: var(--secondary-text-color); font-size: 10px; line-height: 1.4; }
      .toggle-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .toggle-row {
        position: relative;
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 54px;
        padding: 5px 0;
        cursor: pointer;
      }


      .toggle-input {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 39px;
        height: 23px;
        margin: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 1;
      }

      .toggle-track {
        display: flex;
        align-items: center;
        flex: 0 0 39px;
        width: 39px;
        height: 23px;
        padding: 3px;
        border: 1px solid var(
          --divider-color,
          rgba(128,128,128,.3)
        );
        border-radius: 20px;
        background: var(
          --secondary-background-color,
          rgba(127,127,127,.18)
        );
        transition: background .18s;
      }

      .toggle-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--secondary-text-color);
        transition: transform .18s, background .18s;
      }

      .toggle-input:checked + .toggle-track {
        background: var(--studio-accent);
        border-color: var(--studio-accent);
      }

      .toggle-input:checked + .toggle-track .toggle-thumb {
        transform: translateX(16px);
        background: #fff;
      }

      .toggle-input:focus-visible + .toggle-track {
        outline: 2px solid var(--primary-color);
        outline-offset: 3px;
      }

      @media (max-width: 350px) {
        .settings-section {
          padding-right: 0;
          padding-left: 0;
        }

        .setting-label {
          font-size: 11px;
        }
      }
    `}});customElements.define("crm-recent-browser-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.recentBrowserSettings.${e}`,this.config.language??"auto",this.hass.language),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass.language,i=t?.toLowerCase().startsWith("pt"),s=t?.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=r("Organização","Anordnung","Layout"),a=r("Defina a quantidade de itens exibidos por linha","Anzahl der Elemente pro Zeile festlegen","Set the number of items per row"),n=r("Exibição","Anzeige","Display"),l=r("Escolha quais textos aparecem nos itens","Sichtbare Texte der Elemente auswählen","Choose which item labels are visible"),c=r("Atualização","Aktualisierung","Refresh"),d=r("Controle a atualização ao abrir esta seção","Aktualisierung beim Öffnen dieses Bereichs steuern","Control refreshing when this section opens"),h=r("Visibilidade","Sichtbarkeit","Visibility"),p=r("Carregamento","Ladeverhalten","Loading behavior"),u=[{name:"recentBrowserItemsPerRow",label:e("itemsPerRow"),help:e("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],m=[{name:"recentBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"recentBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],g=[{name:"recentBrowserItemsRefreshOnEntry",label:e("refreshOnEntry"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-recents">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o}</strong>
              <small>${a}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${u}
            .section=${Yt.RECENTS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${n}</strong>
              <small>${l}</small>
            </div>
          </div>
          <div class="studio-subheading">
            <ha-icon icon="mdi:format-text"></ha-icon>
            <span>${h}</span>
          </div>
          <crm-editor-form
            .schema=${m}
            .section=${Yt.RECENTS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:refresh"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${c}</strong>
              <small>${d}</small>
            </div>
          </div>
          <div class="studio-subheading">
            <ha-icon icon="mdi:cloud-sync-outline"></ha-icon>
            <span>${p}</span>
          </div>
          <crm-editor-form
            .schema=${g}
            .section=${Yt.RECENTS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-recents { display: grid; gap: 12px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 15px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 36px;
        width: 36px;
        height: 36px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--primary-color, #1db954) 12%, transparent);
        color: var(--primary-color, #1db954);
      }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }
      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }
      .studio-subheading {
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 0 0 10px;
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 600;
      }
      .studio-subheading ha-icon {
        --mdc-icon-size: 16px;
        color: var(--primary-color, #1db954);
      }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } }
    `}});customElements.define("crm-search-media-browser-editor",class extends Po{setField(e,t){this.configChanged({...this.config,[e]:t})}render(){super.createStore();const e=e=>Ye(`editor.searchMediaSettings.${e}`,this.config.language??"auto",this.hass.language),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass.locale?.language||this.hass.language||"en",i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=[{value:"Albums",icon:"mdi:album",label:e("albums")},{value:"Artists",icon:"mdi:account-music",label:e("artists")},{value:"AudioBooks",icon:"mdi:book-open-variant",label:e("audiobooks")},{value:"Episodes",icon:"mdi:podcast",label:e("episodes")},{value:"Playlists",icon:"mdi:playlist-music",label:e("playlists")},{value:"Shows",icon:"mdi:radio-tower",label:e("shows")},{value:"Tracks",icon:"mdi:music-note",label:e("tracks")}],a=[{name:"searchMediaBrowserSearchTypes",label:e("searchTypes"),help:e("searchTypesHelp"),required:!1,type:"multi_select",options:Object.fromEntries(o.map(e=>[e.value,e.label]))}],n=[{name:"searchMediaBrowserUseDisplaySettings",label:e("useDisplaySettings"),required:!1,selector:{boolean:{}}}],l=[{name:"searchMediaBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"searchMediaBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}},{name:"searchMediaBrowserQueueSelection",label:e("queueSelection"),help:e("queueSelectionHelp"),required:!1,selector:{boolean:{}}}],c=Number(this.config.searchMediaBrowserSearchLimit??50),d=Number.isFinite(c)?Math.min(500,Math.max(25,c)):50,h=Number(this.config.searchMediaBrowserItemsPerRow??4),p=Number.isFinite(h)?Math.min(12,Math.max(1,h)):4;return B`
      <div class="studio-search">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:magnify"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Pesquisa","Suche","Search")}</strong>
              <small>${r("Escolha os tipos de mídia e a quantidade de resultados.","Medientypen und Anzahl der Ergebnisse auswählen.","Choose media types and the number of results.")}</small>
            </div>
          </div>
          <div class="field-heading">${e("searchTypes")}</div>
          <div class="media-types-preview" aria-hidden="true">
            ${o.map(e=>B`
              <span class="media-type"><ha-icon icon=${e.icon}></ha-icon>${e.label}</span>
            `)}
          </div>
          <crm-editor-form
            .schema=${a}
            .section=${Yt.SEARCH_MEDIA}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
          <div class="subsection">
            <div class="slider-heading">
              <div>
                <div class="field-heading">${e("searchLimit")}</div>
                <div class="field-help">${r("Resultados por pesquisa","Ergebnisse pro Suche","Results per search")}</div>
              </div>
              <span class="value-pill">${d}</span>
            </div>
            <input class="range" type="range" min="25" max="500" step="25"
              .value=${String(d)}
              aria-label=${e("searchLimit")}
              @change=${e=>this.setField("searchMediaBrowserSearchLimit",Number(e.currentTarget.value))}
            />
            <div class="range-labels"><span>25</span><span>500</span></div>
            <label class="number-field">
              <span>${r("Valor exato","Genauer Wert","Exact value")}</span>
              <input type="number" min="25" max="500" step="1" .value=${String(d)}
                @change=${e=>{const t=e.currentTarget,i=Number(t.value);Number.isFinite(i)&&this.setField("searchMediaBrowserSearchLimit",Math.max(25,Math.min(500,Math.round(i))))}}
              />
            </label>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Organização","Anordnung","Layout")}</strong>
              <small>${r("Defina como os resultados aparecem na grade.","Darstellung der Suchergebnisse festlegen.","Control how search results appear in the grid.")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${n}
            .section=${Yt.SEARCH_MEDIA}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
          <div class="subsection">
            <div class="slider-heading">
              <div>
                <div class="field-heading">${e("itemsPerRow")}</div>
                <div class="field-help">${e("itemsPerRowHelp")}</div>
              </div>
              <span class="value-pill">${p}</span>
            </div>
            <div class="column-choices">
              ${[2,3,4,5].map(e=>B`
                <button type="button" class="column-choice ${p===e?"active":""}"
                  aria-pressed=${String(p===e)}
                  @click=${()=>this.setField("searchMediaBrowserItemsPerRow",e)}
                >
                  <span class="mini-grid" style=${`grid-template-columns:repeat(${e},1fr)`}>
                    ${Array.from({length:2*e},()=>B`<i></i>`)}
                  </span>
                  <span>${e}</span>
                </button>
              `)}
            </div>
            <label class="number-field">
              <span>${r("Outro valor (1–12)","Anderer Wert (1–12)","Other value (1–12)")}</span>
              <input type="number" min="1" max="12" step="1" .value=${String(p)}
                @change=${e=>{const t=Number(e.currentTarget.value);Number.isFinite(t)&&this.setField("searchMediaBrowserItemsPerRow",Math.max(1,Math.min(12,Math.round(t))))}}
              />
            </label>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Exibição","Anzeige","Display")}</strong>
              <small>${r("Visibilidade dos textos e comportamento da fila.","Textanzeige und Verhalten der Warteschlange.","Text visibility and queue behavior.")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${l}
            .section=${Yt.SEARCH_MEDIA}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-search { display: grid; gap: 11px; min-width: 0; }
      .studio-description { margin: 0 2px 3px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-panel { min-width: 0; padding: 14px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 13px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: flex; justify-content: center; align-items: center; flex: 0 0 35px; width: 35px; height: 35px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--primary-color, #34d399); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.35; }
      .field-heading { font-size: 12px; font-weight: 650; color: var(--primary-text-color); }
      .field-help { margin-top: 3px; font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .media-types-preview { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; }
      .media-type { display: inline-flex; align-items: center; gap: 5px; padding: 6px 8px; border-radius: 8px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--secondary-text-color); font-size: 10px; }
      .media-type ha-icon { --mdc-icon-size: 14px; }
      .subsection { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .slider-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
      .value-pill { display: inline-flex; align-items: center; justify-content: center; min-width: 45px; padding: 6px 10px; border: 1px solid var(--primary-color, #34d399); border-radius: 9px; color: var(--primary-color, #34d399); font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
      .range { display: block; width: 100%; accent-color: var(--primary-color, #34d399); cursor: pointer; }
      .range-labels { display: flex; justify-content: space-between; margin: 4px 0 12px; color: var(--secondary-text-color); font-size: 10px; }
      .column-choices { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; margin-top: 12px; }
      .column-choice { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; min-width: 0; min-height: 65px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.08)); color: var(--primary-text-color); font: inherit; font-size: 11px; cursor: pointer; }
      .column-choice.active { border: 2px solid var(--primary-color, #34d399); }
      .mini-grid { display: grid; gap: 2px; width: 38px; }
      .mini-grid i { display: block; height: 9px; border-radius: 2px; background: var(--secondary-text-color); opacity: .55; }
      .column-choice.active .mini-grid i { background: var(--primary-color, #34d399); opacity: 1; }
      .number-field { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; color: var(--secondary-text-color); font-size: 11px; }
      .number-field input { width: 82px; height: 36px; padding: 0 8px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 8px; background: var(--secondary-background-color, rgba(128,128,128,.08)); color: var(--primary-text-color); font: inherit; font-size: 12px; text-align: center; }
      button:focus-visible, input:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } .column-choices { gap: 5px; } }
    `}});customElements.define("crm-show-fav-browser-editor",class extends Po{render(){super.createStore();const e=this.config.language??"auto",t=this.hass?.locale?.language||this.hass?.language||"en",i=("auto"===e?t:e).toLowerCase(),s=i.startsWith("pt"),r=i.startsWith("de"),o=(e,t,i)=>s?e:r?t:i,a=i=>Ye(`editor.showFavoritesSettings.${i}`,e,t),n=[{name:"showFavBrowserItemsLimit",label:a("itemsLimit"),help:a("itemsLimitHelp"),required:!1,type:"integer",default:200,valueMin:1,valueMax:1e3},{name:"showFavBrowserItemsPerRow",label:a("itemsPerRow"),help:a("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],l=[{name:"showFavBrowserItemsHideTitle",label:a("hideTitle"),required:!1,selector:{boolean:{}}},{name:"showFavBrowserItemsHideSubTitle",label:a("hideSubtitle"),help:a("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],c=[{name:"showFavBrowserItemsSortTitle",label:a("sortTitle"),required:!1,selector:{boolean:{}}},{name:"showFavBrowserItemsRefreshOnEntry",label:a("refreshOnEntry"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-shows">
        <div class="studio-intro">
          <span class="intro-icon"><ha-icon icon="mdi:radio-tower"></ha-icon></span>
          <div>
            <strong>${o("Programas favoritos","Lieblingssendungen","Favorite shows")}</strong>
            <small>${a("description")}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o("Organização","Anordnung","Layout")}</strong>
              <small>${o("Quantidade e disposição dos podcasts","Anzahl und Anordnung der Podcasts","Podcast count and arrangement")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${n}
            .section=${Yt.SHOW_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o("Exibição","Anzeige","Display")}</strong>
              <small>${o("Visibilidade, ordenação e atualização","Sichtbarkeit, Sortierung und Aktualisierung","Visibility, sorting and refresh")}</small>
            </div>
          </div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <span>${o("Visibilidade","Sichtbarkeit","Visibility")}</span>
          </div>
          <crm-editor-form
            .schema=${l}
            .section=${Yt.SHOW_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="subsection-divider"></div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
            <span>${o("Ordenação e atualização","Sortierung und Aktualisierung","Sorting and refresh")}</span>
          </div>
          <crm-editor-form
            .schema=${c}
            .section=${Yt.SHOW_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
        --studio-accent: var(--success-color, #35c98c);
      }
      * { box-sizing: border-box; }
      .studio-shows { display: grid; gap: 12px; min-width: 0; }
      .studio-intro { display: flex; align-items: center; gap: 11px; padding: 3px 2px 5px; }
      .intro-icon {
        display: grid; place-items: center; flex: 0 0 42px; height: 42px;
        border-radius: 13px; color: var(--studio-accent);
        background: color-mix(in srgb, var(--studio-accent) 12%, transparent);
      }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .studio-intro > div { display: grid; gap: 4px; min-width: 0; }
      .studio-intro strong { color: var(--primary-text-color); font-size: 14px; }
      .studio-intro small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      .studio-panel {
        min-width: 0; padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex; align-items: center; gap: 11px; margin-bottom: 15px;
        padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: grid; place-items: center; flex: 0 0 37px; height: 37px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 11%, var(--secondary-background-color, transparent));
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .subsection-heading {
        display: flex; align-items: center; gap: 8px; margin: 2px 0 11px;
        color: var(--primary-text-color); font-size: 12px; font-weight: 650;
      }
      .subsection-heading ha-icon { color: var(--studio-accent); --mdc-icon-size: 17px; }
      .subsection-divider {
        height: 1px; margin: 15px 0;
        background: var(--divider-color, rgba(128,128,128,.2));
      }
      @media (max-width: 340px) {
        .studio-panel { padding: 11px; }
        .studio-panel-heading { gap: 8px; }
      }
    `}onValueChanged(e){}});customElements.define("crm-track-fav-browser-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.trackFavoritesSettings.${e}`,this.config.language??"auto",this.hass?.locale?.language||this.hass?.language||"en"),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass?.locale?.language||this.hass?.language||"en",i=t.toLowerCase().startsWith("pt"),s=t.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=[{name:"trackFavBrowserItemsLimit",label:e("itemsLimit"),help:e("itemsLimitHelp"),required:!1,type:"integer",default:200,valueMin:1,valueMax:1e3},{name:"trackFavBrowserItemsPerRow",label:e("itemsPerRow"),help:e("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],a=[{name:"trackFavBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"trackFavBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}],n=[{name:"trackFavBrowserItemsSortTitle",label:e("sortTitle"),required:!1,selector:{boolean:{}}},{name:"trackFavBrowserShuffleOnPlay",label:e("shuffleOnPlay"),required:!1,selector:{boolean:{}}}],l=[{name:"trackFavBrowserItemsRefreshOnEntry",label:e("refreshOnEntry"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-tracks">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Organização","Anordnung","Layout")}</strong>
              <small>${r("Quantidade e disposição das músicas","Anzahl und Anordnung der Songs","Track count and arrangement")}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${o}
            .section=${Yt.TRACK_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:music-note"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${r("Exibição e reprodução","Anzeige und Wiedergabe","Display and playback")}</strong>
              <small>${r("Visibilidade, ordenação e atualização","Sichtbarkeit, Sortierung und Aktualisierung","Visibility, sorting and refresh")}</small>
            </div>
          </div>

          <div class="setting-group">
            <div class="group-heading">
              <ha-icon icon="mdi:eye-outline"></ha-icon>
              <span>${r("Visibilidade","Sichtbarkeit","Visibility")}</span>
            </div>
            <p class="group-description">${r("Escolha quais informações aparecem nos cartões das músicas.","Wähle aus, welche Informationen auf den Song-Karten erscheinen.","Choose which details appear on track cards.")}</p>
            <crm-editor-form
              .schema=${a}
              .section=${Yt.TRACK_FAVORITES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
              @value-changed=${this.onValueChanged}
            ></crm-editor-form>
          </div>

          <div class="setting-group">
            <div class="group-heading">
              <ha-icon icon="mdi:shuffle-variant"></ha-icon>
              <span>${r("Ordenação e reprodução","Sortierung und Wiedergabe","Sorting and playback")}</span>
            </div>
            <p class="group-description">${r("Defina a ordem dos resultados e o comportamento ao reproduzir.","Lege die Reihenfolge und das Wiedergabeverhalten fest.","Set the display order and playback behavior.")}</p>
            <crm-editor-form
              .schema=${n}
              .section=${Yt.TRACK_FAVORITES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
              @value-changed=${this.onValueChanged}
            ></crm-editor-form>
          </div>

          <div class="setting-group last-group">
            <div class="group-heading">
              <ha-icon icon="mdi:refresh"></ha-icon>
              <span>${r("Atualização","Aktualisierung","Refresh")}</span>
            </div>
            <p class="group-description">${r("Atualize a lista ao entrar nesta seção.","Aktualisiere die Liste beim Öffnen dieses Bereichs.","Refresh the list when opening this section.")}</p>
            <crm-editor-form
              .schema=${l}
              .section=${Yt.TRACK_FAVORITES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
              @value-changed=${this.onValueChanged}
            ></crm-editor-form>
          </div>
        </section>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        min-width: 0;
        color: var(--primary-text-color);
        --studio-accent: var(--success-color, #38c997);
      }
      * { box-sizing: border-box; }
      .studio-tracks { display: grid; gap: 12px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 11px;
        margin-bottom: 15px;
        padding-bottom: 13px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 38px;
        width: 38px;
        height: 38px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 12%, var(--card-background-color, transparent));
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }
      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }
      crm-editor-form { display: block; min-width: 0; }
      .setting-group { padding: 4px 0 17px; margin-bottom: 16px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .setting-group.last-group { margin-bottom: 0; padding-bottom: 0; border-bottom: 0; }
      .group-heading { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; font-size: 12px; font-weight: 650; }
      .group-heading ha-icon { --mdc-icon-size: 17px; color: var(--studio-accent); }
      .group-description { margin: 0 0 12px 25px; color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      @media (max-width: 340px) {
        .studio-panel { padding: 11px; }
      }
    `}onValueChanged(e){}});customElements.define("crm-userpreset-browser-editor",class extends Po{render(){super.createStore();const e=e=>Ye(`editor.userPresetSettings.${e}`,this.config.language??"auto",this.hass.language),t="auto"!==this.config.language&&this.config.language?this.config.language:this.hass.language,i=t?.toLowerCase().startsWith("pt"),s=t?.toLowerCase().startsWith("de"),r=(e,t,r)=>i?e:s?t:r,o=r("Fonte dos presets","Preset-Quelle","Preset source"),a=r("Informe o arquivo que contém seus presets personalizados","Datei mit deinen benutzerdefinierten Presets angeben","Specify the file containing your custom presets"),n=r("Organização","Anordnung","Layout"),l=r("Defina quantos presets aparecem em cada linha","Anzahl der Presets pro Zeile festlegen","Choose how many presets appear per row"),c=r("Exibição","Anzeige","Display"),d=r("Escolha quais informações aparecem nos itens","Sichtbare Informationen der Elemente auswählen","Choose which item details are visible"),h=r("Ajuda e documentação","Hilfe und Dokumentation","Help and documentation"),p=[{name:"userPresetsFile",label:e("presetsFile"),help:e("presetsFileHelp"),required:!1,type:"string"}],u=[{name:"userPresetBrowserItemsPerRow",label:e("itemsPerRow"),help:e("itemsPerRowHelp"),required:!0,type:"integer",default:4,valueMin:1,valueMax:12}],m=[{name:"userPresetBrowserItemsHideTitle",label:e("hideTitle"),required:!1,selector:{boolean:{}}},{name:"userPresetBrowserItemsHideSubTitle",label:e("hideSubtitle"),help:e("hideSubtitleHelp"),required:!1,selector:{boolean:{}}}];return B`
      <div class="studio-presets">
        <p class="studio-description">${e("description")}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:file-document-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${o}</strong>
              <small>${a}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${p}
            .section=${Yt.USERPRESETS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${n}</strong>
              <small>${l}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${u}
            .section=${Yt.USERPRESETS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${c}</strong>
              <small>${d}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${m}
            .section=${Yt.USERPRESETS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <div class="documentation-panel">
          <div class="documentation-heading">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <strong>${h}</strong>
          </div>
          <p class="studio-documentation">
            ${e("documentationNotice")}
            <a
              href="https://github.com/thlucas1/spotifyplus_card/wiki/Configuration-Options#userpresets-user-preset-content-items"
              target="_blank"
              rel="noopener noreferrer"
            >${e("documentationLink")}</a>
            ${e("documentationSuffix")}
          </p>
        </div>
      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-presets { display: grid; gap: 11px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 13px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 35px;
        width: 35px;
        height: 35px;
        border-radius: 10px;
        background: color-mix(in srgb, var(--primary-color, #1db954) 10%, transparent);
        color: var(--primary-color, #1db954);
      }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }
      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.35;
      }
      .documentation-panel {
        padding: 13px 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--secondary-background-color, rgba(128,128,128,.06));
      }
      .documentation-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-text-color);
        font-size: 12px;
      }
      .documentation-heading ha-icon {
        --mdc-icon-size: 18px;
        color: var(--primary-color, #1db954);
      }
      .studio-documentation {
        margin: 8px 0 0;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.6;
      }
      .studio-documentation a {
        color: var(--primary-color, #1db954);
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) {
        .studio-panel { padding: 10px; }
      }
    `}});const Uo=_e(ce+":editor");class zo extends Po{constructor(){super(...arguments),this.configArea=Kt.GENERAL,this.expandedGroup="general",this.onFooterShowSection=e=>{const t=ai(e.detail);this.configArea=t,this.expandedGroup=this.groupForArea(t),Ls.selectedConfigArea=this.configArea}}render(){if(!this.hass)return B``;if(!this.config)return B``;super.createStore();const e=this.config.crmTheme,t=["light","dark","custom","auto"].includes(e??"")?e:"dark",i=!0===this.hass?.themes?.darkMode,s="dark"===t||"auto"===t&&i,r=(e,t)=>"string"==typeof e&&/^#[0-9a-fA-F]{6}$/.test(e.trim())?e.trim():t,o=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)),a=e=>{const[t,i,s]=o(e).map(e=>{const t=e/255;return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)});return.2126*t+.7152*i+.0722*s},n=(e,t)=>{const i=a(e),s=a(t);return(Math.max(i,s)+.05)/(Math.min(i,s)+.05)},l=(e,t,i)=>{const s=o(e),r=o(t);return"#"+s.map((e,t)=>Math.round(e*(1-i)+r[t]*i).toString(16).padStart(2,"0")).join("")},c=(e,t,i=4.5)=>{if(n(e,t)>=i)return e;const s="#000000",r="#ffffff",o=n(s,t)>n(r,t)?s:r;for(let s=1;s<=100;s++){const r=l(e,o,s/100);if(n(r,t)>=i)return r}return o},d="custom"===t,h=d?r(this.config.crmBackground,"#101b19"):s?"#101b19":"#ffffff",p=a(h)<.179,u=c(d?r(this.config.crmText,p?"#f0fdf4":"#17221e"):s?"#f0fdf4":"#17221e",h),m=l(h,p?"#ffffff":"#000000",.065),g=c(l(u,h,.25),m),v=c(d?r(this.config.crmAccent,"#34d399"):s?"#34d399":"#159568",h,3),f={"--card-background-color":h,"--ha-card-background":h,"--secondary-background-color":m,"--primary-text-color":u,"--secondary-text-color":g,"--divider-color":l(h,u,.2),"--primary-color":v,"--crm-editor-accent":v,"color-scheme":p?"dark":"light"},b=Je(this.config.language??"auto",this.hass.locale?.language||this.hass.language),y={pt:{general:"Geral",design:"Aparência",player:"Reprodutor",navigation:"Navegação",devices:"Dispositivos",library:"Biblioteca",advanced:"Avançado",settings:"Configurações do cartão",choose:"Escolha uma seção"},de:{general:"Allgemein",design:"Darstellung",player:"Player",navigation:"Navigation",devices:"Geräte",library:"Bibliothek",advanced:"Erweitert",settings:"Karteneinstellungen",choose:"Bereich auswählen"},en:{general:"General",design:"Appearance",player:"Player",navigation:"Navigation",devices:"Devices",library:"Library",advanced:"Advanced",settings:"Card settings",choose:"Choose a section"}}[b],A={pt:{[Kt.PLAYLIST_FAVORITES]:"Playlists favoritas",[Kt.ALBUM_FAVORITES]:"Álbuns favoritos",[Kt.ARTIST_FAVORITES]:"Artistas favoritos",[Kt.TRACK_FAVORITES]:"Músicas favoritas",[Kt.AUDIOBOOK_FAVORITES]:"Audiolivros favoritos",[Kt.EPISODE_FAVORITES]:"Episódios favoritos",[Kt.SHOW_FAVORITES]:"Podcasts favoritos",[Kt.CATEGORY_BROWSER]:"Categorias",[Kt.USERPRESET_BROWSER]:"Presets personalizados",[Kt.RECENT_BROWSER]:"Reproduzidos recentemente",[Kt.SEARCH_MEDIA_BROWSER]:"Pesquisa de mídia"},de:{[Kt.PLAYLIST_FAVORITES]:"Lieblingsplaylists",[Kt.ALBUM_FAVORITES]:"Lieblingsalben",[Kt.ARTIST_FAVORITES]:"Lieblingskünstler",[Kt.TRACK_FAVORITES]:"Lieblingssongs",[Kt.AUDIOBOOK_FAVORITES]:"Lieblingshörbücher",[Kt.EPISODE_FAVORITES]:"Lieblingsepisoden",[Kt.SHOW_FAVORITES]:"Lieblingssendungen",[Kt.CATEGORY_BROWSER]:"Kategorien",[Kt.USERPRESET_BROWSER]:"Benutzer-Presets",[Kt.RECENT_BROWSER]:"Zuletzt gespielt",[Kt.SEARCH_MEDIA_BROWSER]:"Mediensuche"},en:{[Kt.PLAYLIST_FAVORITES]:"Favorite playlists",[Kt.ALBUM_FAVORITES]:"Favorite albums",[Kt.ARTIST_FAVORITES]:"Favorite artists",[Kt.TRACK_FAVORITES]:"Favorite tracks",[Kt.AUDIOBOOK_FAVORITES]:"Favorite audiobooks",[Kt.EPISODE_FAVORITES]:"Favorite episodes",[Kt.SHOW_FAVORITES]:"Favorite shows",[Kt.CATEGORY_BROWSER]:"Categories",[Kt.USERPRESET_BROWSER]:"User presets",[Kt.RECENT_BROWSER]:"Recently played",[Kt.SEARCH_MEDIA_BROWSER]:"Media search"}},w=A[b]??A.en,S=[Kt.PLAYLIST_FAVORITES,Kt.ALBUM_FAVORITES,Kt.ARTIST_FAVORITES,Kt.TRACK_FAVORITES,Kt.AUDIOBOOK_FAVORITES,Kt.EPISODE_FAVORITES,Kt.SHOW_FAVORITES,Kt.CATEGORY_BROWSER],C=[Kt.USERPRESET_BROWSER,Kt.RECENT_BROWSER,Kt.SEARCH_MEDIA_BROWSER],x=[{id:"general",title:y.general,icon:"mdi:cog-outline",areas:[Kt.GENERAL]},{id:"design",title:y.design,icon:"mdi:palette-outline",areas:[Kt.DESIGN]},{id:"player",title:y.player,icon:"mdi:play-circle-outline",areas:[Kt.PLAYER]},{id:"navigation",title:y.navigation,icon:"mdi:compass-outline",areas:C},{id:"library",title:y.library,icon:"mdi:bookshelf",areas:S},{id:"devices",title:y.devices,icon:"mdi:speaker-wireless",areas:[Kt.DEVICE_BROWSER]},{id:"advanced",title:y.advanced,icon:"mdi:tune-variant",areas:[]}];return B`
      <div class="crm-settings-shell" data-theme=${t} style=${Me(f)}>
        <div class="crm-settings-heading">
          <ha-icon icon="mdi:music-circle-outline"></ha-icon>
          <div>
            <div class="crm-settings-brand">ControlRoom</div>
            <div class="crm-settings-caption">${y.settings}</div>
          </div>
        </div>
        <nav class="crm-settings-grid" aria-label=${y.choose}>
          ${x.map(e=>B`
            <button
              type="button"
              class="crm-settings-tile ${this.expandedGroup===e.id?"active":""}"
              aria-pressed=${this.expandedGroup===e.id?"true":"false"}
              @click=${()=>this.toggleGroup(e.id,e.areas[0])}
            >
              <ha-icon class="crm-tile-icon" icon=${e.icon}></ha-icon>
              <span>${e.title}</span>
              <ha-icon class="crm-tile-arrow" icon="mdi:chevron-right"></ha-icon>
            </button>
          `)}
        </nav>

        ${x.map(e=>this.expandedGroup===e.id?B`
          <section class="crm-settings-panel">
            <div class="crm-panel-heading">
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.title}</span>
            </div>
            ${e.areas.length>1?B`
              <div class="crm-settings-subnav">
                ${e.areas.map(e=>B`
                  <button
                    type="button"
                    class="crm-settings-subitem ${this.configArea===e?"selected":""}"
                    aria-current=${this.configArea===e?"page":"false"}
                    @click=${()=>this.onConfigSectionClick(e)}
                  >
                    ${w[e]??String(e)}
                  </button>
                `)}
              </div>
            `:""}
            ${"navigation"===e.id?B`
              <crm-navigation-settings-editor
                .config=${this.config}
                .hass=${this.hass}
              ></crm-navigation-settings-editor>
            `:""}
            <div class="crm-card-editor">
              ${e.areas.length?this.subEditor():B`
                <crm-advanced-editor .config=${this.config} .hass=${this.hass}></crm-advanced-editor>
              `}
            </div>
          </section>
        `:"")}

      </div>
    `}static get styles(){return a`
      :host { display: block; min-width: 0; }
      .crm-settings-shell {
        min-width: 0;
        padding: 12px;
        border-radius: 16px;
        background: var(--card-background-color, transparent);
        color: var(--primary-text-color);
        color-scheme: normal;
        transition: background-color 150ms ease, color 150ms ease;
      }
      /* Theme colors are provided by the computed inline palette. */

      .crm-settings-heading {
        display: flex; align-items: center; gap: 10px;
        padding: 6px 4px 12px;
      }
      .crm-settings-heading > ha-icon { color: var(--primary-color); --mdc-icon-size: 24px; }
      .crm-settings-brand { font-size: 15px; font-weight: 650; letter-spacing: -0.02em; }
      .crm-settings-caption { margin-top: 2px; font-size: 11px; color: var(--secondary-text-color); }

      .crm-settings-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
        margin-bottom: 14px;
      }
      .crm-settings-tile {
        display: flex;
        align-items: center;
        gap: 9px;
        min-width: 0;
        min-height: 58px;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 13px;
        background: var(--card-background-color, transparent);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 12px;
        font-weight: 550;
        text-align: left;
        cursor: pointer;
        transition: border-color 150ms ease, background 150ms ease;
      }
      .crm-settings-tile > span {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .crm-settings-tile .crm-tile-icon {
        --mdc-icon-size: 21px;
        color: var(--secondary-text-color);
      }
      .crm-settings-tile .crm-tile-arrow {
        --mdc-icon-size: 15px;
        color: var(--secondary-text-color);
      }
      .crm-settings-tile.active {
        border-color: var(--crm-editor-accent, #34d399);
        background: color-mix(in srgb, var(--crm-editor-accent, #34d399) 9%, transparent);
      }
      .crm-settings-tile.active .crm-tile-icon {
        color: var(--crm-editor-accent, #34d399);
      }
      .crm-settings-tile:hover {
        border-color: var(--crm-editor-accent, #34d399);
      }
      .crm-settings-tile:focus-visible,
      .crm-settings-subitem:focus-visible {
        outline: 2px solid var(--crm-editor-accent, #34d399);
        outline-offset: 2px;
      }
      .crm-settings-panel {
        min-width: 0;
        padding: 15px;
        border: 1px solid var(--divider-color);
        border-radius: 15px;
      }
      .crm-panel-heading {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 14px;
        font-size: 14px;
        font-weight: 650;
      }
      .crm-panel-heading ha-icon {
        --mdc-icon-size: 19px;
        color: var(--crm-editor-accent, #34d399);
      }
      .crm-settings-subnav {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 14px;
      }
      .crm-settings-subitem {
        padding: 7px 10px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: transparent;
        color: var(--secondary-text-color);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .crm-settings-subitem.selected {
        border-color: var(--crm-editor-accent, #34d399);
        color: var(--primary-text-color);
        background: color-mix(in srgb, var(--crm-editor-accent, #34d399) 9%, transparent);
      }
      .crm-empty-panel {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 18px 4px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .crm-empty-panel ha-icon {
        --mdc-icon-size: 22px;
        color: var(--crm-editor-accent, #34d399);
      }
      .crm-card-editor {
        min-width: 0;
        --ha-form-style-integer-margin-bottom: 0.5rem;
        --ha-form-style-multiselect-margin-bottom: 0.5rem;
        --ha-form-style-selector-margin-bottom: 0.5rem;
        --ha-form-style-selector-boolean-min-height: 28px;
        --ha-form-style-string-margin-bottom: 0.5rem;
      }
    `}groupForArea(e){return[Kt.PLAYLIST_FAVORITES,Kt.ALBUM_FAVORITES,Kt.ARTIST_FAVORITES,Kt.TRACK_FAVORITES,Kt.AUDIOBOOK_FAVORITES,Kt.EPISODE_FAVORITES,Kt.SHOW_FAVORITES,Kt.CATEGORY_BROWSER].includes(e)?"library":[Kt.USERPRESET_BROWSER,Kt.RECENT_BROWSER,Kt.SEARCH_MEDIA_BROWSER].includes(e)?"navigation":e===Kt.DESIGN?"design":e===Kt.PLAYER?"player":e===Kt.DEVICE_BROWSER?"devices":"general"}toggleGroup(e,t){this.expandedGroup!==e&&(this.expandedGroup=e,"advanced"!==e&&this.groupForArea(this.configArea)!==e&&this.onConfigSectionClick(t))}subEditor(){return We(this.configArea,[[Kt.ALBUM_FAVORITES,()=>B`<crm-album-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-album-fav-browser-editor>`],[Kt.ARTIST_FAVORITES,()=>B`<crm-artist-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-artist-fav-browser-editor>`],[Kt.AUDIOBOOK_FAVORITES,()=>B`<crm-audiobook-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-audiobook-fav-browser-editor>`],[Kt.CATEGORY_BROWSER,()=>B`<crm-category-browser-editor .config=${this.config} .hass=${this.hass}></crm-category-browser-editor>`],[Kt.DEVICE_BROWSER,()=>B`<crm-device-browser-editor .config=${this.config} .hass=${this.hass}></crm-device-browser-editor>`],[Kt.EPISODE_FAVORITES,()=>B`<crm-episode-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-episode-fav-browser-editor>`],[Kt.GENERAL,()=>B`<crm-general-editor .config=${this.config} .hass=${this.hass}></crm-general-editor>`],[Kt.DESIGN,()=>B`<crm-design-editor .config=${this.config} .hass=${this.hass}></crm-design-editor>`],[Kt.PLAYER,()=>B`<crm-player-editor .config=${this.config} .hass=${this.hass}></crm-player-editor>`],[Kt.PLAYLIST_FAVORITES,()=>B`<crm-playlist-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-playlist-fav-browser-editor>`],[Kt.RECENT_BROWSER,()=>B`<crm-recent-browser-editor .config=${this.config} .hass=${this.hass}></crm-recent-browser-editor>`],[Kt.SEARCH_MEDIA_BROWSER,()=>B`<crm-search-media-browser-editor .config=${this.config} .hass=${this.hass}></crm-search-media-browser-editor>`],[Kt.SHOW_FAVORITES,()=>B`<crm-show-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-show-fav-browser-editor>`],[Kt.TRACK_FAVORITES,()=>B`<crm-track-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-track-fav-browser-editor>`],[Kt.USERPRESET_BROWSER,()=>B`<crm-userpreset-browser-editor .config=${this.config} .hass=${this.hass}></crm-userpreset-browser-editor>`]])}onConfigSectionClick(e){const t=oi(e);Ls.selectedConfigArea=e,this.configArea=e,this.expandedGroup=this.groupForArea(e),this.section=t,this.store.section=t,document.dispatchEvent(Eo(this.section))}connectedCallback(){super.connectedCallback(),window.addEventListener(pe,this.onFooterShowSection)}disconnectedCallback(){window.removeEventListener(pe,this.onFooterShowSection),super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e),Uo.enabled&&Uo("firstUpdated (editor) - 1st render complete - changedProperties keys:\n%s",JSON.stringify(Array.from(e.keys())));let t=ai(this.section);this.config&&(this.config.entity||(t=Kt.GENERAL)),this.configArea=t,this.expandedGroup=this.groupForArea(t),Ls.selectedConfigArea=this.configArea,super.requestUpdate()}}Ce([Ve()],zo.prototype,"configArea",void 0),Ce([Ve()],zo.prototype,"expandedGroup",void 0),customElements.define("crm-editor",zo);const No=_e(ce+":card"),Wo=e=>{if("string"!=typeof e)return null;const t=e.trim(),i=/^#([0-9a-f]{3})$/i.exec(t),s=/^#([0-9a-f]{6})$/i.exec(t),r=i?i[1].split("").map(e=>e+e).join(""):s?.[1];return r?[0,2,4].map(e=>parseInt(r.slice(e,e+2),16)):null},qo=e=>{const t=e.map(e=>{const t=e/255;return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)});return.2126*t[0]+.7152*t[1]+.0722*t[2]},Go=(e,t,i=4.5)=>{const s=t.filter(e=>null!==Wo(e));if(0===s.length)return e;const r=e=>Math.min(...s.map(t=>((e,t)=>{const i=Wo(e),s=Wo(t);if(!i||!s)return null;const r=qo(i),o=qo(s);return(Math.max(r,o)+.05)/(Math.min(r,o)+.05)})(e,t)??0));if(Wo(e)&&r(e)>=i)return e;return["#ffffff","#000000"].sort((e,t)=>r(t)-r(e))[0]},jo="100%";let Jo=class extends es{constructor(){super(),this.compactPlayerHeight=265,this.isFirstTimeSetup=!0,this.onEditorConfigAreaSelectedEventHandler=e=>{const t=e.detail;this.config.sections?.includes(t.section)?(No.enabled&&No("onEditorConfigAreaSelectedEventHandler - set section reference for selected ConfigArea and display the section\n- OLD section=%s\n- NEW section=%s",JSON.stringify(this.section),JSON.stringify(t.section)),this.SetSection(t.section)):No.enabled&&No("onEditorConfigAreaSelectedEventHandler - section is not active: %s",JSON.stringify(t.section))},this.onFooterShowSection=e=>{const t=e.detail;(!this.config.sections||this.config.sections.indexOf(t)>-1)&&(this.section=t,this.store.section=this.section,super.requestUpdate())},this.onMediaListItemSelected=()=>{},this.onProgressEndedEventHandler=()=>{this.cancelLoader=!0;const e=Date.now()-this.loaderTimestamp;this.showLoader&&(e<1e3?setTimeout(()=>this.showLoader=!1,1e3-e):this.showLoader=!1)},this.onProgressStartedEventHandler=()=>{this.showLoader||(this.cancelLoader=!1,setTimeout(()=>{this.cancelLoader||(this.showLoader=!0,this.loaderTimestamp=Date.now())},250))},this.onFilterSectionMediaEventHandler=e=>{const t=e.detail;Object.values(Yt).includes(t.section||"")||No("%conFilterSectionMediaEventHandler - Ignoring Filter request; section is not a valid Section enum value:\n%s","color:red",JSON.stringify(t,null,2)),this.config.sections?.includes(t.section)?(this.section=t.section,this.store.section=this.section,setTimeout(()=>{let e;if(No.enabled&&No("onFilterSectionMediaEventHandler - executing filter:\n%s",JSON.stringify(t,null,2)),t.section==Yt.ALBUM_FAVORITES)e=this.elmAlbumFavBrowserForm;else if(t.section==Yt.ARTIST_FAVORITES)e=this.elmArtistFavBrowserForm;else if(t.section==Yt.AUDIOBOOK_FAVORITES)e=this.elmAudiobookFavBrowserForm;else if(t.section==Yt.DEVICES)e=this.elmDeviceBrowserForm;else if(t.section==Yt.EPISODE_FAVORITES)e=this.elmEpisodeFavBrowserForm;else if(t.section==Yt.PLAYLIST_FAVORITES)e=this.elmPlaylistFavBrowserForm;else if(t.section==Yt.RECENTS)e=this.elmRecentBrowserForm;else if(t.section==Yt.SHOW_FAVORITES)e=this.elmShowFavBrowserForm;else if(t.section==Yt.TRACK_FAVORITES)e=this.elmTrackFavBrowserForm;else{if(t.section!=Yt.USERPRESETS)return;e=this.elmUserPresetBrowserForm}e.filterSectionMedia(t)},50)):No("%onFilterSectionMediaEventHandler - Filter section is not enabled; ignoring filter request:\n%s","color:red",JSON.stringify(t,null,2))},this.onSearchMediaEventHandler=e=>{const t=e.detail;this.config.sections?.includes(Yt.SEARCH_MEDIA)?(this.section=Yt.SEARCH_MEDIA,this.store.section=this.section,setTimeout(()=>{No.enabled&&No("onSearchMediaEventHandler - executing search:\n%s",JSON.stringify(t,null,2)),this.elmSearchMediaBrowserForm.searchExecute(t)},250)):(No("%conSearchMediaEventHandler - Search section is not enabled; ignoring search request:\n%s","color:red",JSON.stringify(t,null,2)),this.alertInfoSet("Search section is not enabled; ignoring search request."))},this.onCategoryDisplayEventHandler=e=>{const t=e.detail;this.config.sections?.includes(Yt.CATEGORYS)?(this.section=Yt.CATEGORYS,this.store.section=this.section,setTimeout(()=>{No.enabled&&No("onCategoryDisplayEventHandler - displaying category:\n%s",JSON.stringify(t,null,2)),this.elmCategoryBrowserForm.displayCategory(t)},250)):No("%conCategoryDisplayEventHandler - Category section is not enabled; ignoring display request:\n%s","color:red",JSON.stringify(t,null,2))},this.showLoader=!1,this.cancelLoader=!1,this.loaderTimestamp=0}render(){if(!this.hass)return B``;this.createStore(),this.config.sections&&0!==this.config.sections.length||(this.config.sections=[Yt.PLAYER],Ls.selectedConfigArea=Kt.GENERAL);const e=this.config.sections,t=!e||e.length>1,i=bi(this.config.title,this.config,this.store.player);return this.checkForBackgroundImageChange(),B`
      <ha-card class="crm-card" style=${this.styleCard()}>
        <div class="crm-loader" ?hidden=${!this.showLoader}>
          <ha-spinner size="large"></ha-spinner>
        </div>
        ${i?B`<div class="crm-card-header" style=${this.styleCardHeader()}>${i}</div>`:""}
        ${this.alertError?B`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>`:""}
        ${this.alertInfo?B`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>`:""}
        <div class="crm-card-content-section" style=${this.styleCardContent()}>
          ${""!=this.store.player.id?We(this.section,[[Yt.ALBUM_FAVORITES,()=>B`<crm-album-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmAlbumFavBrowserForm"></crm-album-fav-browser>`],[Yt.ARTIST_FAVORITES,()=>B`<crm-artist-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmArtistFavBrowserForm"></crm-artist-fav-browser>`],[Yt.AUDIOBOOK_FAVORITES,()=>B`<crm-audiobook-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmAudiobookFavBrowserForm"></crm-audiobook-fav-browser>`],[Yt.CATEGORYS,()=>B`<crm-category-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmCategoryBrowserForm"></crm-category-browser>`],[Yt.DEVICES,()=>B`<crm-device-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmDeviceBrowserForm"></crm-device-browser>`],[Yt.EPISODE_FAVORITES,()=>B`<crm-episode-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmEpisodeFavBrowserForm"></crm-episode-fav-browser>`],[Yt.PLAYER,()=>B`<crm-player id="spcPlayer" .store=${this.store}></crm-player>`],[Yt.PLAYLIST_FAVORITES,()=>B`<crm-playlist-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmPlaylistFavBrowserForm"></crm-playlist-fav-browser>`],[Yt.RECENTS,()=>B`<crm-recent-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmRecentBrowserForm"></crm-recents-browser>`],[Yt.SEARCH_MEDIA,()=>B`<crm-search-media-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmSearchMediaBrowserForm"></crm-search-media-browser>`],[Yt.SHOW_FAVORITES,()=>B`<crm-show-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmShowFavBrowserForm"></crm-show-fav-browser>`],[Yt.TRACK_FAVORITES,()=>B`<crm-track-fav-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmTrackFavBrowserForm"></crm-track-fav-browser>`],[Yt.USERPRESETS,()=>B`<crm-userpreset-browser .store=${this.store} @item-selected=${this.onMediaListItemSelected} id="elmUserPresetBrowserForm"></crm-userpresets-browser>`],[Yt.UNDEFINED,()=>B`
                  <div class="crm-not-configured">
                    ${Ye("music.configurationError",this.config?.language??"auto",this.hass.locale?.language)}
                    <br/>
                    ${Ye("music.configureSections",this.config?.language??"auto",this.hass.locale?.language)}
                  </div>
                `]]):B`
                  <div class="crm-initial-config">
                    ${Ye("music.title",this.config?.language??"auto",this.hass.locale?.language)}
                    <br/>
                    ${Ye("music.configureEntity",this.config?.language??"auto",this.hass.locale?.language)}
                    <br/>
                    <div class="crm-not-configured">
                      ${this.store.player.attributes.sp_config_state}
                    </div>
                  </div>`}
        </div>
        ${qe(t,()=>B`<div class="crm-card-footer-container" style=${this.styleCardFooter()}>
            <crm-footer 
              class="crm-card-footer"
              .config=${this.config}
              .section=${this.section}
              @show-section=${this.onFooterShowSection}
            ></crm-footer>
          </div>`)}
      </ha-card>
    `}static get styles(){return a`
      :host {
        display: block;
        width: 100% !important;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
        height: auto;
      }

      * { 
        margin: 0; 
      }

      html,
      body {
        height: 100%;
        margin: 0;
      }

      controlroom-music-card {
        display: block;
        height: 100% !important;
        width: 100% !important;
      }

      hui-card-preview {
        min-height: 10rem;
        height: 40rem;
        min-width: 10rem;
        width: 40rem;
      }

      .crm-card {
      /* ControlRoom Music - Design System */
        --crm-background: #101b19;
        --crm-background-secondary: #091310;
        --crm-accent: #34d399;
        --crm-text: #f0fdf4;
        --crm-border-radius: 20px;
        --crm-card-header-height: ${2}rem;
        --crm-card-footer-height: ${4}rem;
        --crm-card-edit-tab-height: 0px;
        --crm-card-edit-bottom-toolbar-height: 0px;
        box-sizing: border-box;
        padding: 0rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: auto;
        min-width: 0;
        max-width: 100%;
        width: 100%;
        color: var(--crm-text);
        background: linear-gradient(145deg, var(--crm-background) 0%, var(--crm-background-secondary) 100%);
        border: 1px solid rgba(52, 211, 153, 0.16);
        border-radius: var(--crm-border-radius);
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.28);
      }

      .crm-card-header {
        box-sizing: border-box;
        padding: 0.2rem;
        display: flex;
        align-self: flex-start;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--crm-accent);
        letter-spacing: 0.3px;
      }

      .crm-card-content-section {
        margin: var(--crm-card-content-margin, ${o("0.0rem")});
        color: var(--crm-text);
        flex: 1 1 auto;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
      }

      .crm-card-footer-container {
        width: 100%;
        min-width: 0;
        flex: 0 0 auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-repeat: no-repeat;
        background: var(--crm-background) !important;
        background-image: none !important;
        border-top: 1px solid rgba(64, 217, 154, 0.12);
      }

      .crm-card-footer {
        margin: 0.2rem;
        display: flex;
        align-self: flex-start;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        flex: 1 1 auto;
        min-width: 0;
        width: 100%;
        max-width: 100%;
        gap: 0;
        overflow-x: auto;
        overflow-y: hidden;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
        --ha-icon-button-size: var(--crm-footer-icon-button-size, 2.5rem);
        --mdc-icon-size: var(--crm-footer-icon-size, 1.75rem);
        --mdc-ripple-top: 0px;
        --mdc-ripple-left: 0px;
        --mdc-ripple-fg-size: 10px;
      }

      .crm-card-footer::-webkit-scrollbar {
        display: none;
      }

      /* Keep footer controls at their intended size on narrow dashboards. */
      .crm-card-footer > * {
        flex: 0 0 auto;
        min-width: var(--crm-footer-icon-button-size, 2.5rem);
      }

      @media (max-width: 480px) {
        .crm-card-footer {
          margin: 0.1rem 0;
          --ha-icon-button-size: 2.25rem;
          --mdc-icon-size: 1.35rem;
        }
      }

      .crm-loader {
        position: absolute;
        z-index: 1000;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        --ha-spinner-indicator-color: var(--crm-card-wait-progress-slider-color, var(--dark-primary-color, ${o(be)}));
      }

      .crm-not-configured {
        text-align: center;
        margin: 1rem;
        color: #fa2643;
      }

      .crm-initial-config {
        text-align: center;
        margin-top: 1rem;
      }

      ha-icon-button {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    `}createStore(){if(this.store=new Ls(this.hass,this.config,this,this.section),this.isCardInEditPreview=ni(this),this.playerId||(this.playerId=this.config.entity),this.isFirstTimeSetup&&this.playerId){No("createStore - isFirstTimeSetup logic invoked; creating store area");const e=this.store.config.playerVolumeStepValue||0;e>0&&10!=e&&(No("createStore - isFirstTimeSetup is setting media player volume step level"),this.store.spotifyPlusService.VolumeSetStepLevel(this.store.player,e)),this.config.sections&&0!=this.config.sections.length?this.config.sectionDefault?(No("createStore - isFirstTimeSetup defaulting section to config.sectionDefault (%s)",JSON.stringify(this.config.sectionDefault)),this.SetSection(this.config.sectionDefault)):this.section||(No("createStore - isFirstTimeSetup defaulting section to Store.selectedConfigArea (%s)",JSON.stringify(Ls.selectedConfigArea)),this.SetSection(oi(Ls.selectedConfigArea))):(No("createStore - isFirstTimeSetup defaulting section to PLAYER"),this.config.sections=[Yt.PLAYER],Ls.selectedConfigArea=Kt.GENERAL,this.SetSection(Yt.PLAYER)),this.isFirstTimeSetup=!1}}SetSection(e){!this.config.sections||this.config.sections.indexOf(e)>-1?(No.enabled&&No("SetSection - set section reference and display the section\n- OLD section=%s\n- NEW section=%s",JSON.stringify(this.section),JSON.stringify(e)),this.section=e,this.store.section=this.section,super.requestUpdate()):No.enabled&&No("SetSection - section is not active: %s",JSON.stringify(e))}connectedCallback(){super.connectedCallback(),this.addEventListener(Qi,this.onProgressEndedEventHandler),this.addEventListener(Xi,this.onProgressStartedEventHandler),this.addEventListener(ss,this.onSearchMediaEventHandler),this.addEventListener(yo,this.onCategoryDisplayEventHandler),this.addEventListener(wo,this.onFilterSectionMediaEventHandler),document.addEventListener($o,this.onEditorConfigAreaSelectedEventHandler)}disconnectedCallback(){this.removeEventListener(Qi,this.onProgressEndedEventHandler),this.removeEventListener(Xi,this.onProgressStartedEventHandler),this.removeEventListener(ss,this.onSearchMediaEventHandler),this.removeEventListener(yo,this.onCategoryDisplayEventHandler),this.removeEventListener(wo,this.onFilterSectionMediaEventHandler),document.removeEventListener($o,this.onEditorConfigAreaSelectedEventHandler),this.playerSizeObserver?.disconnect(),this.playerSizeObserver=void 0,this.observedPlayer=void 0,super.disconnectedCallback()}updated(e){super.updated(e),this.observePlayerHeight()}observePlayerHeight(){const e=this.shadowRoot?.querySelector("crm-player");e!==this.observedPlayer&&(this.playerSizeObserver?.disconnect(),this.observedPlayer=e??void 0,e&&"undefined"!=typeof ResizeObserver&&(this.playerSizeObserver=new ResizeObserver(()=>{const t=Math.ceil(e.getBoundingClientRect().height);t>0&&t!==this.compactPlayerHeight&&(this.compactPlayerHeight=t)}),this.playerSizeObserver.observe(e)))}firstUpdated(e){super.firstUpdated(e),No.enabled&&No("firstUpdated (card) - 1st render complete - changedProperties keys:\n%s",JSON.stringify(Array.from(e.keys())));const t=this.config.sections||[];if(t.includes(this.section))this.isCardInEditPreview&&super.requestUpdate();else{let e=Yt.PLAYER;t.includes(Yt.PLAYER)?e=Yt.PLAYER:t.includes(Yt.DEVICES)?e=Yt.DEVICES:t.includes(Yt.USERPRESETS)?e=Yt.USERPRESETS:t.includes(Yt.RECENTS)?e=Yt.RECENTS:t.includes(Yt.CATEGORYS)?e=Yt.CATEGORYS:t.includes(Yt.PLAYLIST_FAVORITES)?e=Yt.PLAYLIST_FAVORITES:t.includes(Yt.ALBUM_FAVORITES)?e=Yt.ALBUM_FAVORITES:t.includes(Yt.ARTIST_FAVORITES)?e=Yt.ARTIST_FAVORITES:t.includes(Yt.TRACK_FAVORITES)?e=Yt.TRACK_FAVORITES:t.includes(Yt.AUDIOBOOK_FAVORITES)?e=Yt.AUDIOBOOK_FAVORITES:t.includes(Yt.SHOW_FAVORITES)?e=Yt.SHOW_FAVORITES:t.includes(Yt.EPISODE_FAVORITES)?e=Yt.EPISODE_FAVORITES:t.includes(Yt.SEARCH_MEDIA)&&(e=Yt.SEARCH_MEDIA),Ls.selectedConfigArea=ai(e),this.section=e,this.store.section=e,super.requestUpdate()}}setConfig(e){const t=JSON.parse(JSON.stringify(e));for(const[e,i]of Object.entries(t))Array.isArray(i)&&0===i.length&&delete t[e];const i={};for(const e in t.customImageUrls){const s=gi(e);let r=t.customImageUrls[e];r=r?.replace(" ","%20"),i[s]=r}t.customImageUrls=i,t.sections&&0!==t.sections.length||(t.sections=[Yt.PLAYER],Ls.selectedConfigArea=Kt.GENERAL),this.config=t,No("%csetConfig - Configuration reference set\n%s","color:orange",JSON.stringify(t,null,2))}getCardSize(){return 3}static getConfigElement(){return Ls.selectedConfigArea=Kt.GENERAL,Ls.hasCardEditLoadedMediaList={},document.createElement("crm-editor")}static getStubConfig(){return{cardUniqueId:et(),sections:[Yt.PLAYER,Yt.ALBUM_FAVORITES,Yt.ARTIST_FAVORITES,Yt.PLAYLIST_FAVORITES,Yt.RECENTS,Yt.DEVICES,Yt.TRACK_FAVORITES,Yt.USERPRESETS,Yt.AUDIOBOOK_FAVORITES,Yt.SHOW_FAVORITES,Yt.EPISODE_FAVORITES,Yt.SEARCH_MEDIA],entity:"",playerHeaderTitle:"{player.source}",playerHeaderArtistTrack:"{player.media_artist} - {player.media_title}",playerHeaderAlbum:"{player.media_album_name} {player.sp_playlist_name_title}",playerHeaderNoMediaPlayingText:'"{player.name}" state is "{player.state}"',albumFavBrowserTitle:"Album Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",albumFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",albumFavBrowserItemsPerRow:4,albumFavBrowserItemsHideTitle:!1,albumFavBrowserItemsHideSubTitle:!1,albumFavBrowserItemsSortTitle:!0,artistFavBrowserTitle:"Artist Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",artistFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",artistFavBrowserItemsPerRow:4,artistFavBrowserItemsHideTitle:!1,artistFavBrowserItemsHideSubTitle:!0,artistFavBrowserItemsSortTitle:!0,audiobookFavBrowserTitle:"Audiobook Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",audiobookFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",audiobookFavBrowserItemsPerRow:4,audiobookFavBrowserItemsHideTitle:!1,audiobookFavBrowserItemsHideSubTitle:!1,audiobookFavBrowserItemsSortTitle:!0,categoryBrowserTitle:"Categorys for {player.sp_user_display_name} ({medialist.filteritemcount} items)",categoryBrowserSubTitle:"click a tile item to view the content; click-hold for actions",categoryBrowserItemsPerRow:4,categoryBrowserItemsHideTitle:!1,categoryBrowserItemsHideSubTitle:!0,categoryBrowserItemsSortTitle:!0,deviceBrowserTitle:"Spotify Connect Devices ({medialist.filteritemcount} items)",deviceBrowserSubTitle:"click an item to select the device; click-hold for device info",deviceBrowserItemsPerRow:1,deviceBrowserItemsHideTitle:!1,deviceBrowserItemsHideSubTitle:!0,episodeFavBrowserTitle:"Episode Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",episodeFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",episodeFavBrowserItemsPerRow:4,episodeFavBrowserItemsHideTitle:!1,episodeFavBrowserItemsHideSubTitle:!1,episodeFavBrowserItemsSortTitle:!0,playlistFavBrowserTitle:"Playlist Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",playlistFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",playlistFavBrowserItemsPerRow:4,playlistFavBrowserItemsHideTitle:!1,playlistFavBrowserItemsHideSubTitle:!1,playlistFavBrowserItemsSortTitle:!0,recentBrowserTitle:"Recently Played by {player.sp_user_display_name} ({medialist.filteritemcount} items)",recentBrowserSubTitle:"click a tile item to play the content; click-hold for actions",recentBrowserItemsPerRow:4,recentBrowserItemsHideTitle:!1,recentBrowserItemsHideSubTitle:!1,searchMediaBrowserTitle:"Search Media for {player.sp_user_display_name} ({medialist.filteritemcount} items)",searchMediaBrowserSubTitle:"click a tile item to play the content; click-hold for actions",searchMediaBrowserUseDisplaySettings:!1,searchMediaBrowserItemsPerRow:4,searchMediaBrowserItemsHideTitle:!1,searchMediaBrowserItemsHideSubTitle:!0,searchMediaBrowserItemsSortTitle:!1,searchMediaBrowserSearchLimit:50,searchMediaBrowserSearchTypes:[wi.ALBUMS,wi.ARTISTS,wi.PLAYLISTS,wi.TRACKS,wi.AUDIOBOOKS,wi.SHOWS,wi.EPISODES],showFavBrowserTitle:"Show Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",showFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",showFavBrowserItemsPerRow:4,showFavBrowserItemsHideTitle:!1,showFavBrowserItemsHideSubTitle:!0,showFavBrowserItemsSortTitle:!0,trackFavBrowserTitle:"Track Favorites for {player.sp_user_display_name} ({medialist.filteritemcount} items)",trackFavBrowserSubTitle:"click a tile item to play the content; click-hold for actions",trackFavBrowserItemsPerRow:4,trackFavBrowserItemsHideTitle:!1,trackFavBrowserItemsHideSubTitle:!1,trackFavBrowserItemsSortTitle:!1,userPresetBrowserTitle:"User Presets for {player.sp_user_display_name} ({medialist.filteritemcount} items)",userPresetBrowserSubTitle:"click a tile item to play the content; click-hold for actions",userPresetBrowserItemsPerRow:4,userPresetBrowserItemsHideTitle:!1,userPresetBrowserItemsHideSubTitle:!1,userPresets:[{name:"Daily Mix 1",subtitle:"Various Artists",image_url:"https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebcd3f796bd7ea49ed7615a550/1/en/default",uri:"spotify:playlist:37i9dQZF1E39vTG3GurFPW",type:"playlist"},{name:"My Track Favorites",subtitle:"Shuffled",image_url:"https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",shuffle:!0,type:"trackfavorites"}],customImageUrls:{X_default:"/local/images/spotifyplus_card_customimages/default.png","X_empty preset":"/local/images/spotifyplus_card_customimages/empty_preset.png","X_Daily Mix 1":"https://brands.home-assistant.io/spotifyplus/icon.png",X_playerBackground:"/local/images/spotifyplus_card_customimages/playerBackground.png",X_playerIdleBackground:"/local/images/spotifyplus_card_customimages/playerIdleBackground.png",X_playerOffBackground:"/local/images/spotifyplus_card_customimages/playerOffBackground.png"}}}styleCard(){const e={},t=this.config?.crmTheme??"dark",i="dark"===t||"auto"===t&&!1!==this.hass?.themes?.darkMode?{background:"#101b19",secondary:"#091310",accent:"#34d399",text:"#f0fdf4"}:{background:"#f7faf8",secondary:"#e9f0ec",accent:"#16875c",text:"#183329"},s="custom"===t,r=s&&this.config?.crmBackground||i.background,o=s&&this.config?.crmBackground||i.secondary,a=[r,o],n=s&&this.config?.crmText||i.text,l=s&&this.config?.crmAccent||i.accent;e["--crm-background"]=r,e["--crm-background-secondary"]=o;const c=Go(n,a,4.5),d=s&&"custom"===this.config?.crmIconMode&&this.config.crmIconColor||c;e["--crm-text"]=c,e["--crm-text-secondary"]=c,e["--crm-icon-color"]=Go(d,a,3),e["--crm-accent"]=l,e["--crm-play-icon-contrast"]=Go("#102019",[l],4.5),this.config?.crmBorderRadius&&(e["--crm-border-radius"]=this.config.crmBorderRadius);const h=s?this.config?.crmBackground||"#101b19":i.background,p=/^#([0-9a-f]{6})$/i.exec(h.trim());if(p){const t=p[1],i=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16),o=e=>`rgba(${i}, ${s}, ${r}, ${e})`;e["--crm-background-overlay-99"]=o(.99),e["--crm-background-overlay-98"]=o(.98),e["--crm-background-overlay-89"]=o(.89),e["--crm-background-overlay-78"]=o(.78),e["--crm-background-overlay-35"]=o(.35),e["--crm-background-overlay-28"]=o(.28),e["--crm-background-overlay-06"]=o(.06)}let u="0px",m="0px";const g=this.config.cardWaitProgressSliderColor,v=this.config.cardContentMargin;return g&&(e["--crm-card-wait-progress-slider-color"]=`${g}`),v&&(e["--crm-card-content-margin"]=`${v}`),""==(this.playerId||"")&&(e["background-repeat"]="no-repeat",e["background-position"]="center",e["background-image"]=`url(${ue})`,e["background-size"]=`${me}`),this.isCardInEditPreview?(e["--crm-card-edit-tab-height"]=`${u}`,e["--crm-card-edit-bottom-toolbar-height"]=`${m}`,e.height="42rem",e.width="100%","compact"===this.getHeightMode()?(e.height=`calc(${this.compactPlayerHeight}px + var(--crm-card-footer-height) + 1rem)`,e["min-height"]="0"):"auto"===this.getHeightMode()&&(e.height="auto",e["min-height"]="0"),this.config.playerMinimizeOnIdle&&this.section==Yt.PLAYER&&this.store.player.isPoweredOffOrIdle()&&"fill"!==this.getHeightMode()&&(e.height="unset !important",e["min-height"]="unset !important"),Me(e)):function(e){let t,i,s;if(e){const r=e.parentElement;if(r){t=(r.className||"").trim();const e=r.parentElement;if(e){i=(e.className||"").trim();const t=e.parentElement;t&&(s=(t.className||"").trim())}}}let r=!1;return"preview"===t&&"card"===i&&"cards-container"===s&&(r=!0),r}(this)?(e["--crm-card-edit-tab-height"]=`${u}`,e["--crm-card-edit-bottom-toolbar-height"]=`${m}`,e.height="100%",e.width=`${jo}`,e["min-height"]="22rem",e["min-width"]=`${jo}`,Me(e)):(function(){const e=window.location.search;let t=!1;return"1"==new URLSearchParams(e).get("edit")&&(t=!0),t}()&&(u="48px",m="59px"),"fill"==this.config.width?e.width="100%":li(String(this.config.width))?e.width=`min(100%, ${String(this.config.width)}rem)`:e.width="100%",e["max-width"]="100%",e["min-width"]="0","fill"===this.getHeightMode()?li(String(this.config.height))?e.height=String(this.config.height)+"rem":e.height="100%":li(String(this.config.height))?e.height=String(this.config.height)+"rem":e.height="35.15rem","fill"!==this.getHeightMode()&&(e.height="compact"===this.getHeightMode()?`calc(${this.compactPlayerHeight}px + var(--crm-card-footer-height) + 1rem)`:"auto",e["min-height"]="0"),this.config.playerMinimizeOnIdle&&this.section==Yt.PLAYER&&this.store.player.isPoweredOffOrIdle()&&"fill"!==this.getHeightMode()&&(e.height="unset !important",e["min-height"]="unset !important"),e["--crm-card-edit-tab-height"]=`${u}`,e["--crm-card-edit-bottom-toolbar-height"]=`${m}`,e["--crm-player-palette-vibrant"]=`${this.vibrantColorVibrant}`,e["--crm-player-palette-muted"]=`${this.vibrantColorMuted}`,e["--crm-player-palette-darkvibrant"]=`${this.vibrantColorDarkVibrant}`,e["--crm-player-palette-darkmuted"]=`${this.vibrantColorDarkMuted}`,e["--crm-player-palette-lightvibrant"]=`${this.vibrantColorLightVibrant}`,e["--crm-player-palette-lightmuted"]=`${this.vibrantColorLightMuted}`,Me(e))}styleCardHeader(){const e={};return this.section==Yt.PLAYER&&this.footerBackgroundColor&&(e["--crm-player-footer-bg-color"]=`${this.footerBackgroundColor||"transparent"}`,e["background-color"]="var(--crm-player-footer-bg-color)",e["background-image"]="linear-gradient(rgba(0, 0, 0, 1.6), rgba(0, 0, 0, 0.6))"),Me(e)}getHeightMode(){return this.config.heightMode?this.config.heightMode:"fill"===this.config.height?"fill":"compact"}styleCardContent(){const e={},t=this.getHeightMode();return e["--crm-browser-list-height"]="compact"===t?`${this.compactPlayerHeight}px`:"auto"===t?"none":"100%","compact"===t?(e.flex="1 1 auto",e["min-height"]="0",e.height="auto",e["overflow-x"]="hidden",e["overflow-y"]="auto"):"auto"===t?(e.flex="0 0 auto",e.height="auto",e["min-height"]="0",e.overflow="visible"):(e.flex="1 1 auto",e["min-height"]="0",e["overflow-x"]="hidden",e["overflow-y"]="auto"),this.config.playerMinimizeOnIdle&&this.section==Yt.PLAYER&&this.store.player.isPoweredOffOrIdle()&&"fill"!==this.getHeightMode()&&(e.height="unset !important"),Me(e)}styleCardFooter(){const e={};this.config.playerMinimizeOnIdle&&(this.alertError||this.store.player.isPoweredOffOrIdle()&&(this.config.sections||[]).indexOf(Yt.PLAYER)>-1&&this.section==Yt.PLAYER&&(e.display="none",this.section=Yt.PLAYER,Ls.selectedConfigArea=Kt.PLAYER));const t=this.config.footerBackgroundColor,i=this.config.footerBackgroundImage,s=this.config.footerIconColor,r=this.config.footerIconColorSelected,o=this.config.footerIconSize;return s&&(e["--crm-footer-icon-color"]=`${s}`),r&&(e["--crm-footer-icon-color-selected"]=`${r}`),o&&(e["--crm-footer-icon-size"]=`${o}`,e["--crm-footer-icon-button-size"]=`var(--crm-footer-icon-size, ${o})`),i&&(e["--crm-footer-background-image"]=`${i}`),t?e["--crm-footer-background-color"]=`${t}`:this.section==Yt.PLAYER&&this.vibrantColorVibrant?e["--crm-player-footer-bg-color"]=`${this.footerBackgroundColor||"transparent"}`:e.background="unset",Me(e)}checkForBackgroundImageChange(){try{if(this.isUpdateInProgressAsync)return;this.isUpdateInProgressAsync=!0;const e=this.playerImage,t=this.playerMediaContentId;if(this.isCardInEditPreview)return this.isUpdateInProgressAsync=!1,void(this.footerBackgroundColor=void 0);if(this.vibrantMediaContentId===t)return void(this.isUpdateInProgressAsync=!1);if(null==e||""==e||"BRAND_LOGO_IMAGE_BASE64"==t)return this.vibrantImage=e,this.vibrantMediaContentId=t,this.vibrantColorVibrant=void 0,this.footerBackgroundColor=this.vibrantColorVibrant,void(this.isUpdateInProgressAsync=!1);No.enabled&&No("checkForBackgroundImageChange - player content changed:\n- OLD vibrantMediaContentId = %s\n- NEW playerMediaContentId = %s\n- OLD vibrantImage = %s\n- NEW playerImage = %s\n- isCardInEditPreview = %s\n- footerBackgroundColor = %s",JSON.stringify(this.vibrantMediaContentId),JSON.stringify(t),JSON.stringify(this.vibrantImage),JSON.stringify(e),JSON.stringify(this.isCardInEditPreview),JSON.stringify(this.footerBackgroundColor));const i=new Array,s=new Promise((i,s)=>{const r=new Image;r.crossOrigin="Anonymous",r.src=e+"?not-from-cache-please";new ct(r,{colorCount:64,quality:3}).getPalette().then(s=>{No.enabled&&No("%ccheckForBackgroundImageChange - colors found by getPalette:\n- Vibrant      = %s\n- Muted        = %s\n- DarkVibrant  = %s\n- DarkMuted    = %s\n- LightVibrant = %s\n- LightMuted   = %s","color:orange",s.Vibrant?.hex||"undefined",s.Muted?.hex||"undefined",s.DarkVibrant?.hex||"undefined",s.DarkMuted?.hex||"undefined",s.LightVibrant?.hex||"undefined",s.LightMuted?.hex||"undefined"),this.vibrantColorVibrant=s.Vibrant?.hex||void 0,this.vibrantColorMuted=s.Muted?.hex||void 0,this.vibrantColorDarkVibrant=s.DarkVibrant?.hex||void 0,this.vibrantColorDarkMuted=s.DarkMuted?.hex||void 0,this.vibrantColorLightVibrant=s.LightVibrant?.hex||void 0,this.vibrantColorLightMuted=s.LightMuted?.hex||void 0,this.vibrantImage=e,this.vibrantMediaContentId=t,this.footerBackgroundColor=this.vibrantColorVibrant,this.isUpdateInProgressAsync=!1,i(!0)}).catch(i=>{No.enabled&&No("%ccheckForBackgroundImageChange - Could not retrieve color palette info for player background image\nreason = %s",JSON.stringify(ui(i))),this.vibrantColorVibrant=void 0,this.vibrantColorMuted=void 0,this.vibrantColorDarkVibrant=void 0,this.vibrantColorDarkMuted=void 0,this.vibrantColorLightVibrant=void 0,this.vibrantColorLightMuted=void 0,this.vibrantImage=e,this.vibrantMediaContentId=t,this.footerBackgroundColor=this.vibrantColorVibrant,this.isUpdateInProgressAsync=!1,this.checkForBackgroundImageChangeError("Vibrant getPalette method failed: "+ui(i)),s(i)})});return i.push(s),void Promise.allSettled(i).finally(()=>{this.progressHide()})}catch(e){return void this.checkForBackgroundImageChangeError("Background Image processing error: "+ui(e))}}checkForBackgroundImageChangeError(e=null){this.alertInfoClear(),No.enabled&&No("%ccheckForBackgroundImageChangeError - error processing background image:\n %s","color:red",JSON.stringify(e)),this.alertErrorSet(e||"Unknown Error")}};Ce([De({attribute:!1})],Jo.prototype,"hass",void 0),Ce([De({attribute:!1})],Jo.prototype,"config",void 0),Ce([De({attribute:!1})],Jo.prototype,"footerBackgroundColor",void 0),Ce([Ve()],Jo.prototype,"section",void 0),Ce([Ve()],Jo.prototype,"showLoader",void 0),Ce([Ve()],Jo.prototype,"loaderTimestamp",void 0),Ce([Ve()],Jo.prototype,"cancelLoader",void 0),Ce([Ve()],Jo.prototype,"playerId",void 0),Ce([Ve()],Jo.prototype,"playerImage",void 0),Ce([Ve()],Jo.prototype,"playerMediaContentId",void 0),Ce([Ve()],Jo.prototype,"vibrantImage",void 0),Ce([Ve()],Jo.prototype,"vibrantMediaContentId",void 0),Ce([Ve()],Jo.prototype,"vibrantColorVibrant",void 0),Ce([Ve()],Jo.prototype,"vibrantColorMuted",void 0),Ce([Ve()],Jo.prototype,"vibrantColorDarkVibrant",void 0),Ce([Ve()],Jo.prototype,"vibrantColorDarkMuted",void 0),Ce([Ve()],Jo.prototype,"vibrantColorLightVibrant",void 0),Ce([Ve()],Jo.prototype,"vibrantColorLightMuted",void 0),Ce([Ve()],Jo.prototype,"compactPlayerHeight",void 0),Ce([ze("#elmSearchMediaBrowserForm",!1)],Jo.prototype,"elmSearchMediaBrowserForm",void 0),Ce([ze("#elmCategoryBrowserForm",!1)],Jo.prototype,"elmCategoryBrowserForm",void 0),Ce([ze("#elmAlbumFavBrowserForm",!1)],Jo.prototype,"elmAlbumFavBrowserForm",void 0),Ce([ze("#elmArtistFavBrowserForm",!1)],Jo.prototype,"elmArtistFavBrowserForm",void 0),Ce([ze("#elmAudiobookFavBrowserForm",!1)],Jo.prototype,"elmAudiobookFavBrowserForm",void 0),Ce([ze("#elmDeviceBrowserForm",!1)],Jo.prototype,"elmDeviceBrowserForm",void 0),Ce([ze("#elmEpisodeFavBrowserForm",!1)],Jo.prototype,"elmEpisodeFavBrowserForm",void 0),Ce([ze("#elmPlaylistFavBrowserForm",!1)],Jo.prototype,"elmPlaylistFavBrowserForm",void 0),Ce([ze("#elmRecentBrowserForm",!1)],Jo.prototype,"elmRecentBrowserForm",void 0),Ce([ze("#elmShowFavBrowserForm",!1)],Jo.prototype,"elmShowFavBrowserForm",void 0),Ce([ze("#elmTrackFavBrowserForm",!1)],Jo.prototype,"elmTrackFavBrowserForm",void 0),Ce([ze("#elmUserPresetBrowserForm",!1)],Jo.prototype,"elmUserPresetBrowserForm",void 0),Jo=Ce([He("controlroom-music-card")],Jo);
/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
let Yo="";function Ko(e){Yo=e}async function Zo(e){const t=e instanceof Element?e.tagName.toLowerCase():"",i=t?.startsWith("wa-"),s=[...e.querySelectorAll(":not(:defined)")].map(e=>e.tagName.toLowerCase()).filter(e=>e.startsWith("wa-"));i&&!customElements.get(t)&&s.push(t);const r=[...new Set(s)],o=await Promise.allSettled(r.map(e=>function(e){if(customElements.get(e))return Promise.resolve();const t=e.replace(/^wa-/i,""),i=function(e=""){if(!Yo){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome"))Ko(new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname);else{const e=[...document.getElementsByTagName("script")].find(e=>e.src.endsWith("webawesome.js")||e.src.endsWith("webawesome.loader.js")||e.src.endsWith("webawesome.ssr-loader.js"));e&&Ko(String(e.getAttribute("src")).split("/").slice(0,-1).join("/"))}}return Yo.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}
/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */(`components/${t}/${t}.js`);return new Promise((t,s)=>{import(i).then(()=>t()).catch(()=>s(new Error(`Unable to autoload <${e}> from ${i}`)))})}(e)));for(const e of o)"rejected"===e.status&&console.warn(e.reason);await new Promise(requestAnimationFrame),e.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}new MutationObserver(e=>{for(const{addedNodes:t}of e)for(const e of t)e.nodeType===Node.ELEMENT_NODE&&Zo(e)});const Qo=new Set,Xo=new Map,ea="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(ea){const e=new MutationObserver(ia);document.documentElement.dir,document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ta(...e){e.map(e=>{const t=e.$code.toLowerCase();Xo.has(t)?Xo.set(t,Object.assign(Object.assign({},Xo.get(t)),e)):Xo.set(t,e)}),ia()}function ia(){ea&&(document.documentElement.dir,document.documentElement.lang||navigator.language),[...Qo.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}
/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */const sa={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};ta(sa),
/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
ta(sa),console.groupCollapsed(`%cCONTROLROOM-MUSIC-CARD ${ae} IS INSTALLED`,"color: green; font-weight: bold"),console.log("SpotifyPlus Card Wiki Docs:","https://github.com/thlucas1/spotifyplus_card/wiki/Configuration-Options"),console.log("SpotifyPlus Integration Wiki Docs:","https://github.com/thlucas1/homeassistantcomponent_spotifyplus/wiki"),console.log("SpotifyPlus Card Debug Logging Console Commands:\n","- enable:  localStorage.setItem('debug', 'spotifyplus-card:*');\n","- disable: localStorage.setItem('debug', '');"),console.groupEnd(),window.customCards.push({type:"controlroom-music-card",name:"ControlRoom Music Card",description:"Home Assistant UI card that supports features unique to the SpotifyPlus custom integration",preview:!0});
//# sourceMappingURL=controlroom-music-card.js.map
