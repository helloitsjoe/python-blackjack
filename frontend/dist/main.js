!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){var r=n(1),o=n(2);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function l(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function u(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],u=t.base?i[0]+t.base:i[0],c=n[u]||0,s="".concat(u," ").concat(c);n[u]=c+1;var f=l(s),_={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(_)):a.push({identifier:s,updater:v(_,t),references:1}),r.push(s)}return r}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var s,f=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function _(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function p(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var d=null,h=0;function v(e,t){var n,r,o;if(t.singleton){var i=h++;n=d||(d=c(t)),r=_.bind(null,n,i,!1),o=_.bind(null,n,i,!0)}else n=c(t),r=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=u(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=l(n[r]);a[o].references--}for(var i=u(e,t),c=0;c<n.length;c++){var s=l(n[c]);0===a[s].references&&(a[s].updater(),a.splice(s,1))}n=i}}}},function(e,t,n){(t=n(3)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Roboto:700&display=swap);"]),t.push([e.i,"html,body{height:100%;width:100%;padding:0;margin:0;background:#fafafa;font-family:'Roboto', 'Helvetica Neue', arial, sans-serif;font-weight:400;color:#888;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}button,input{font-family:'Roboto', 'Helvetica Neue', arial, sans-serif}*{box-sizing:border-box}.app{height:600px;display:flex}.game{display:flex;flex:1;flex-direction:column;background-color:darkgreen}.controls{display:flex;flex-direction:column;flex:0.3;border-right:1px solid black;background-color:#333;padding:10px;align-items:center}.controls-button{width:100%;font-size:120%;font-weight:700;margin:10px;background:transparent;color:oldlace;border-radius:4px}.controls-button:disabled{color:#666;border-color:#666}.controls-button:focus{color:#333;background-color:oldlace;outline:none}.controls-bet{display:flex;align-items:center;justify-content:space-evenly}.controls-betInput{background:none;border:none;color:#888;font-size:150%;width:50%;text-align:left}.cards{display:flex;margin-left:20px;margin-top:20px}.card{border-radius:6px;border:1px solid green;background-color:oldlace;width:100px;height:150px;text-align:center;line-height:50%;font-size:200%;font-weight:700;font-variant:small-caps;font-family:'Roboto Condensed', 'Helvetica Neue', arial, sans-serif}.card-red{color:red}.card-black{color:#666}.card-space{padding:10px}.totals{font-size:130%;font-weight:700;width:100%;display:flex;flex-direction:column;align-items:center}.totals-scores{color:oldlace;justify-content:space-around;padding:1em}\n",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,l=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(u," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,l,u;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&o[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),t.push(u))}},t}},function(e,t,n){"use strict";n.r(t);n(0);var r,o,i,a,l,u,c,s={},f=[],_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function p(e,t){for(var n in t)e[n]=t[n];return e}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function h(e,t,n){var r,o=arguments,i={};for(r in t)"key"!==r&&"ref"!==r&&(i[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return v(e,i,t&&t.key,t&&t.ref,null)}function v(e,t,n,o,i){var a={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:i};return null==i&&(a.__v=a),r.vnode&&r.vnode(a),a}function m(e){return e.children}function y(e,t){this.props=e,this.context=t}function b(e,t){if(null==t)return e.__?b(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?b(e):null}function g(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return g(e)}}function k(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!i++||l!==r.debounceRendering)&&((l=r.debounceRendering)||a)(w)}function w(){for(var e;i=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,r,o,i,a,l;e.__d&&(a=(i=(t=e).__v).__e,(l=t.__P)&&(n=[],(r=p({},i)).__v=r,o=A(l,i,r,t.__n,void 0!==l.ownerSVGElement,null,n,null==a?b(i):a),O(n,i),o!=a&&g(i)))}))}function C(e,t,n,r,o,i,a,l,u){var c,_,p,h,v,m,y,g=n&&n.__k||f,k=g.length;if(l==s&&(l=null!=i?i[0]:k?b(n,0):null),c=0,t.__k=E(t.__k,(function(n){if(null!=n){if(n.__=t,n.__b=t.__b+1,null===(p=g[c])||p&&n.key==p.key&&n.type===p.type)g[c]=void 0;else for(_=0;_<k;_++){if((p=g[_])&&n.key==p.key&&n.type===p.type){g[_]=void 0;break}p=null}if(h=A(e,n,p=p||s,r,o,i,a,l,u),(_=n.ref)&&p.ref!=_&&(y||(y=[]),p.ref&&y.push(p.ref,null,n),y.push(_,n.__c||h,n)),null!=h){var f;if(null==m&&(m=h),void 0!==n.__d)f=n.__d,n.__d=void 0;else if(i==p||h!=l||null==h.parentNode){e:if(null==l||l.parentNode!==e)e.appendChild(h),f=null;else{for(v=l,_=0;(v=v.nextSibling)&&_<k;_+=2)if(v==h)break e;e.insertBefore(h,l),f=l}"option"==t.type&&(e.value="")}l=void 0!==f?f:h.nextSibling,"function"==typeof t.type&&(t.__d=l)}else l&&p.__e==l&&l.parentNode!=e&&(l=b(p))}return c++,n})),t.__e=m,null!=i&&"function"!=typeof t.type)for(c=i.length;c--;)null!=i[c]&&d(i[c]);for(c=k;c--;)null!=g[c]&&j(g[c],g[c]);if(y)for(c=0;c<y.length;c++)P(y[c],y[++c],y[++c])}function E(e,t,n){if(null==n&&(n=[]),null==e||"boolean"==typeof e)t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)E(e[r],t,n);else n.push(t?t("string"==typeof e||"number"==typeof e?v(null,e,null,null,e):null!=e.__e||null!=e.__c?v(e.type,e.props,e.key,null,e.__v):e):e);return n}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===_.test(t)?n+"px":null==n?"":n}function S(e,t,n,r,o){var i,a,l,u,c;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(u in r)n&&u in n||x(i,u,"");if(n)for(c in n)r&&n[c]===r[c]||x(i,c,n[c])}else"o"===t[0]&&"n"===t[1]?(a=t!==(t=t.replace(/Capture$/,"")),l=t.toLowerCase(),t=(l in e?l:t).slice(2),n?(r||e.addEventListener(t,N,a),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,N,a)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function N(e){this.l[e.type](r.event?r.event(e):e)}function A(e,t,n,o,i,a,l,u,c){var s,f,_,d,h,v,b,g,k,w,E=t.type;if(void 0!==t.constructor)return null;(s=r.__b)&&s(t);try{e:if("function"==typeof E){if(g=t.props,k=(s=E.contextType)&&o[s.__c],w=s?k?k.props.value:s.__:o,n.__c?b=(f=t.__c=n.__c).__=f.__E:("prototype"in E&&E.prototype.render?t.__c=f=new E(g,w):(t.__c=f=new y(g,w),f.constructor=E,f.render=U),k&&k.sub(f),f.props=g,f.state||(f.state={}),f.context=w,f.__n=o,_=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=E.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=p({},f.__s)),p(f.__s,E.getDerivedStateFromProps(g,f.__s))),d=f.props,h=f.state,_)null==E.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==E.getDerivedStateFromProps&&g!==d&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(g,w),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(g,f.__s,w)||t.__v===n.__v&&!f.__){for(f.props=g,f.state=f.__s,t.__v!==n.__v&&(f.__d=!1),f.__v=t,t.__e=n.__e,t.__k=n.__k,f.__h.length&&l.push(f),s=0;s<t.__k.length;s++)t.__k[s]&&(t.__k[s].__=t);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(g,f.__s,w),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(d,h,v)}))}f.context=w,f.props=g,f.state=f.__s,(s=r.__r)&&s(t),f.__d=!1,f.__v=t,f.__P=e,s=f.render(f.props,f.state,f.context),t.__k=null!=s&&s.type==m&&null==s.key?s.props.children:Array.isArray(s)?s:[s],null!=f.getChildContext&&(o=p(p({},o),f.getChildContext())),_||null==f.getSnapshotBeforeUpdate||(v=f.getSnapshotBeforeUpdate(d,h)),C(e,t,n,o,i,a,l,u,c),f.base=t.__e,f.__h.length&&l.push(f),b&&(f.__E=f.__=null),f.__e=!1}else null==a&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=T(n.__e,t,n,o,i,a,l,c);(s=r.diffed)&&s(t)}catch(e){t.__v=null,r.__e(e,t,n)}return t.__e}function O(e,t){r.__c&&r.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){r.__e(e,t.__v)}}))}function T(e,t,n,r,o,i,a,l){var u,c,_,p,d,h=n.props,v=t.props;if(o="svg"===t.type||o,null!=i)for(u=0;u<i.length;u++)if(null!=(c=i[u])&&((null===t.type?3===c.nodeType:c.localName===t.type)||e==c)){e=c,i[u]=null;break}if(null==e){if(null===t.type)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,v.is&&{is:v.is}),i=null,l=!1}if(null===t.type)h!==v&&e.data!=v&&(e.data=v);else{if(null!=i&&(i=f.slice.call(e.childNodes)),_=(h=n.props||s).dangerouslySetInnerHTML,p=v.dangerouslySetInnerHTML,!l){if(h===s)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(p||_)&&(p&&_&&p.__html==_.__html||(e.innerHTML=p&&p.__html||""))}(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||S(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||S(e,i,t[i],n[i],r)})(e,v,h,o,l),t.__k=t.props.children,p||C(e,t,n,r,"foreignObject"!==t.type&&o,i,a,s,l),l||("value"in v&&void 0!==v.value&&v.value!==e.value&&(e.value=null==v.value?"":v.value),"checked"in v&&void 0!==v.checked&&v.checked!==e.checked&&(e.checked=v.checked))}return e}function P(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function j(e,t,n){var o,i,a;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||P(o,null,t)),n||"function"==typeof e.type||(n=null!=(i=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(a=0;a<o.length;a++)o[a]&&j(o[a],t,n);null!=i&&d(i)}function U(e,t,n){return this.constructor(e,n)}function I(e,t,n){var o,i,a;r.__&&r.__(e,t),i=(o=n===u)?null:n&&n.__k||t.__k,e=h(m,null,[e]),a=[],A(t,(o?t:n||t).__k=e,i||s,s,void 0!==t.ownerSVGElement,n&&!o?[n]:i?null:f.slice.call(t.childNodes),a,n||s,o),O(a,e)}function L(e,t){I(e,t,u)}function D(e,t){return t=p(p({},e.props),t),arguments.length>2&&(t.children=f.slice.call(arguments,2)),v(e.type,t,t.key||e.key,t.ref||e.ref,null)}r={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return k(n.__E=n)}catch(t){e=t}throw e}},y.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=p({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&p(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),k(this))},y.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),k(this))},y.prototype.render=m,o=[],i=0,a="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u=s,c=0;var H,M,R,W=[],F=r.__r,B=r.diffed,Y=r.__c,G=r.unmount;function z(e){r.__h&&r.__h(M);var t=M.__H||(M.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function $(e){return V(ne,e)}function V(e,t,n){var r=z(H++);return r.__c||(r.__c=M,r.__=[n?n(t):ne(void 0,t),function(t){var n=e(r.__[0],t);r.__[0]!==n&&(r.__[0]=n,r.__c.setState({}))}]),r.__}function q(e,t){var n=z(H++);te(n.__H,t)&&(n.__=e,n.__H=t,M.__H.__h.push(n))}function K(e,t){var n=z(H++);te(n.__H,t)&&(n.__=e,n.__H=t,M.__h.push(n))}function J(e){return Z((function(){return{current:e}}),[])}function Z(e,t){var n=z(H++);return te(n.__H,t)?(n.__H=t,n.__h=e,n.__=e()):n.__}function Q(){W.some((function(e){if(e.__P)try{e.__H.__h.forEach(X),e.__H.__h.forEach(ee),e.__H.__h=[]}catch(t){return e.__H.__h=[],r.__e(t,e.__v),!0}})),W=[]}function X(e){e.t&&e.t()}function ee(e){var t=e.__();"function"==typeof t&&(e.t=t)}function te(e,t){return!e||t.some((function(t,n){return t!==e[n]}))}function ne(e,t){return"function"==typeof t?t(e):t}function re(e,t){for(var n in t)e[n]=t[n];return e}function oe(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var r in t)if("__source"!==r&&e[r]!==t[r])return!0;return!1}r.__r=function(e){F&&F(e),H=0,(M=e.__c).__H&&(M.__H.__h.forEach(X),M.__H.__h.forEach(ee),M.__H.__h=[])},r.diffed=function(e){B&&B(e);var t=e.__c;if(t){var n=t.__H;n&&n.__h.length&&(1!==W.push(t)&&R===r.requestAnimationFrame||((R=r.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);"undefined"!=typeof window&&(t=requestAnimationFrame(n))})(Q))}},r.__c=function(e,t){t.some((function(e){try{e.__h.forEach(X),e.__h=e.__h.filter((function(e){return!e.__||ee(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],r.__e(n,e.__v)}})),Y&&Y(e,t)},r.unmount=function(e){G&&G(e);var t=e.__c;if(t){var n=t.__H;if(n)try{n.__.forEach((function(e){return e.t&&e.t()}))}catch(e){r.__e(e,t.__v)}}};var ie=function(e){var t,n;function r(t){var n;return(n=e.call(this,t)||this).isPureReactComponent=!0,n}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.shouldComponentUpdate=function(e,t){return oe(this.props,e)||oe(this.state,t)},r}(y);var ae=r.__b;function le(e){function t(t){var n=re({},t);return delete n.ref,e(n,t.ref)}return t.prototype.isReactComponent=t.t=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t}r.__b=function(e){e.type&&e.type.t&&e.ref&&(e.props.ref=e.ref,e.ref=null),ae&&ae(e)};var ue=function(e,t){return e?E(e).reduce((function(e,n,r){return e.concat(t(n,r))}),[]):null},ce={map:ue,forEach:ue,count:function(e){return e?E(e).length:0},only:function(e){if(1!==(e=E(e)).length)throw new Error("Children.only() expects only one child.");return e[0]},toArray:E},se=r.__e;function fe(e){return e&&((e=re({},e)).__c=null,e.__k=e.__k&&e.__k.map(fe)),e}function _e(){this.__u=0,this.o=null,this.__b=null}function pe(e){var t=e.__.__c;return t&&t.u&&t.u(e)}function de(){this.i=null,this.l=null}r.__e=function(e,t,n){if(e.then)for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return r.__c(e,t.__c);se(e,t,n)},(_e.prototype=new y).__c=function(e,t){var n=this;null==n.o&&(n.o=[]),n.o.push(t);var r=pe(n.__v),o=!1,i=function(){o||(o=!0,r?r(a):a())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){i(),t.__c&&t.__c()};var a=function(){var e;if(!--n.__u)for(n.__v.__k[0]=n.state.u,n.setState({u:n.__b=null});e=n.o.pop();)e.forceUpdate()};n.__u++||n.setState({u:n.__b=n.__v.__k[0]}),e.then(i,i)},_e.prototype.render=function(e,t){return this.__b&&(this.__v.__k[0]=fe(this.__b),this.__b=null),[h(y,null,t.u?null:e.children),t.u&&e.fallback]};var he=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};(de.prototype=new y).u=function(e){var t=this,n=pe(t.__v),r=t.l.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),he(t,e,r)):o()};n?n(i):i()}},de.prototype.render=function(e){this.i=null,this.l=new Map;var t=E(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},de.prototype.componentDidUpdate=de.prototype.componentDidMount=function(){var e=this;e.l.forEach((function(t,n){he(e,n,t)}))};var ve=function(){function e(){}var t=e.prototype;return t.getChildContext=function(){return this.props.context},t.render=function(e){return e.children},e}();function me(e){var t=this,n=e.container,r=h(ve,{context:t.context},e.vnode);return t.s&&t.s!==n&&(t.v.parentNode&&t.s.removeChild(t.v),j(t.h),t.p=!1),e.vnode?t.p?(n.__k=t.__k,I(r,n),t.__k=n.__k):(t.v=document.createTextNode(""),L("",n),n.appendChild(t.v),t.p=!0,t.s=n,I(r,n,t.v),t.__k=t.v.__k):t.p&&(t.v.parentNode&&t.s.removeChild(t.v),j(t.h)),t.h=r,t.componentWillUnmount=function(){t.v.parentNode&&t.s.removeChild(t.v),j(t.h)},null}var ye=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;y.prototype.isReactComponent={};var be="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;function ge(e,t,n){if(null==t.__k)for(;t.firstChild;)t.removeChild(t.firstChild);return I(e,t),"function"==typeof n&&n(),e?e.__c:null}var ke=r.event;function we(e,t){e["UNSAFE_"+t]&&!e[t]&&Object.defineProperty(e,t,{configurable:!1,get:function(){return this["UNSAFE_"+t]},set:function(e){this["UNSAFE_"+t]=e}})}r.event=function(e){ke&&(e=ke(e)),e.persist=function(){};var t=!1,n=!1,r=e.stopPropagation;e.stopPropagation=function(){r.call(e),t=!0};var o=e.preventDefault;return e.preventDefault=function(){o.call(e),n=!0},e.isPropagationStopped=function(){return t},e.isDefaultPrevented=function(){return n},e.nativeEvent=e};var Ce={configurable:!0,get:function(){return this.class}},Ee=r.vnode;r.vnode=function(e){e.$$typeof=be;var t=e.type,n=e.props;if(t){if(n.class!=n.className&&(Ce.enumerable="className"in n,null!=n.className&&(n.class=n.className),Object.defineProperty(n,"className",Ce)),"function"!=typeof t){var r,o,i;for(i in n.defaultValue&&void 0!==n.value&&(n.value||0===n.value||(n.value=n.defaultValue),delete n.defaultValue),Array.isArray(n.value)&&n.multiple&&"select"===t&&(E(n.children).forEach((function(e){-1!=n.value.indexOf(e.props.value)&&(e.props.selected=!0)})),delete n.value),n)if(r=ye.test(i))break;if(r)for(i in o=e.props={},n)o[ye.test(i)?i.replace(/[A-Z0-9]/,"-$&").toLowerCase():i]=n[i]}!function(t){var n=e.type,r=e.props;if(r&&"string"==typeof n){var o={};for(var i in r)/^on(Ani|Tra|Tou)/.test(i)&&(r[i.toLowerCase()]=r[i],delete r[i]),o[i.toLowerCase()]=i;if(o.ondoubleclick&&(r.ondblclick=r[o.ondoubleclick],delete r[o.ondoubleclick]),o.onbeforeinput&&(r.onbeforeinput=r[o.onbeforeinput],delete r[o.onbeforeinput]),o.onchange&&("textarea"===n||"input"===n.toLowerCase()&&!/^fil|che|ra/i.test(r.type))){var a=o.oninput||"oninput";r[a]||(r[a]=r[o.onchange],delete r[o.onchange])}}}(),"function"==typeof t&&!t.m&&t.prototype&&(we(t.prototype,"componentWillMount"),we(t.prototype,"componentWillReceiveProps"),we(t.prototype,"componentWillUpdate"),t.m=!0)}Ee&&Ee(e)};function xe(e){return!!e&&e.$$typeof===be}var Se={useState:$,useReducer:V,useEffect:q,useLayoutEffect:K,useRef:J,useImperativeHandle:function(e,t,n){K((function(){"function"==typeof e?e(t()):e&&(e.current=t())}),null==n?n:n.concat(e))},useMemo:Z,useCallback:function(e,t){return Z((function(){return e}),t)},useContext:function(e){var t=M.context[e.__c];if(!t)return e.__;var n=z(H++);return null==n.__&&(n.__=!0,t.sub(M)),t.props.value},useDebugValue:function(e,t){r.useDebugValue&&r.useDebugValue(t?t(e):e)},version:"16.8.0",Children:ce,render:ge,hydrate:ge,unmountComponentAtNode:function(e){return!!e.__k&&(I(null,e),!0)},createPortal:function(e,t){return h(me,{vnode:e,container:t})},createElement:h,createContext:function(e){var t={},n={__c:"__cC"+c++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return t[n.__c]=o,t},this.shouldComponentUpdate=function(e){o.props.value!==e.value&&r.some((function(t){t.context=e.value,k(t)}))},this.sub=function(e){r.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Consumer.contextType=n,n},createFactory:function(e){return h.bind(null,e)},cloneElement:function(e){return xe(e)?D.apply(null,arguments):e},createRef:function(){return{}},Fragment:m,isValidElement:xe,findDOMNode:function(e){return e&&(e.base||1===e.nodeType&&e)||null},Component:y,PureComponent:ie,memo:function(e,t){function n(e){var n=this.props.ref,r=n==e.ref;return!r&&n&&(n.call?n(null):n.current=null),t?!t(this.props,e)||!r:oe(this.props,e)}function r(t){return this.shouldComponentUpdate=n,h(e,re({},t))}return r.prototype.isReactComponent=!0,r.displayName="Memo("+(e.displayName||e.name)+")",r.t=!0,r},forwardRef:le,unstable_batchedUpdates:function(e,t){return e(t)},Suspense:_e,SuspenseList:de,lazy:function(e){var t,n,r;function o(o){if(t||(t=e()).then((function(e){n=e.default||e}),(function(e){r=e})),r)throw r;if(!n)throw t;return h(n,o)}return o.displayName="Lazy",o.t=!0,o}};function Ne(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Ae(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ae(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Oe=function(){if("undefined"!=typeof window&&window.location.search){var e=je(window.location.search);if(e)return e}return console.log("process.env.MINIKUBE_URL:","http://192.168.64.2:31960"),"".concat("http://192.168.64.2:31960","/game")},Te=function(e,t,n){return fetch(Oe(),{method:"POST",body:JSON.stringify({type:e,balance:t,bet:n}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){if(e.message)throw new Error(res.message);return console.log(e.data),e.data||e})).catch(console.error)};function Pe(e){var t=document.querySelectorAll("button"),n=Array.from(t).findIndex((function(t){return e.target.isEqualNode(t)}));if("j"===e.key){var r=n+1;r<t.length&&t[r].focus()}if("k"===e.key){var o=n-1;o>-1&&t[o].focus()}}var je=function(e){var t=e.replace("?","").split("&").reduce((function(e,t){var n=Ne(t.split("="),2),r=n[0],o=n[1];return e[r]=o,e}),{}),n=t.host,r=t.port;return n&&r&&"http://".concat(n,":").concat(r,"/game")};function Ue(){return(Ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Ie(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}return n}(e,t)||Re(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function De(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Le(Object(n),!0).forEach((function(t){He(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Le(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function He(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Me(e){return function(e){if(Array.isArray(e))return We(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Re(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Re(e,t){if(e){if("string"==typeof e)return We(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?We(e,t):void 0}}function We(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}console.log("URL:",Oe());var Fe={WAITING:"WAITING...",PLAYING:"PLAYING...",BUST:"BUST!",BLACKJACK:"BLACKJACK!",WIN:"YOU WIN!",LOSE:"YOU LOSE!",TIE:"YOU TIE!"},Be=function(e){return e.reduce((function(e,t){return e+t.value}),0)},Ye=function(e,t){console.log("data:",t.data);var n,r=t.data,o=r.player_cards,i=r.player_total,a=r.dealer_cards,l=r.dealer_total,u=r.card,c=r.status,s=r.balance;switch(t.type){case"DEAL":var f=[De(De({},(n=a)[0]),{},{value:0,face:"",suit:""})].concat(Me(n.slice(1)));return De(De({},e),{},{playerCards:o,playerTotal:i,dealerCards:f,dealerTotal:Be(f),balance:e.balance-e.bet,status:"PLAYING"});case"HIT":return De(De({},e),{},{playerCards:[].concat(Me(e.playerCards),[u]),playerTotal:i,status:c});case"STAY":return De(De({},e),{},{dealerCards:a,dealerTotal:l,balance:s,status:c});case"DOUBLE":var _=[].concat(Me(e.playerCards),[u]);return De(De({},e),{},{playerCards:_,dealerCards:a,dealerTotal:l,playerTotal:i,balance:s,status:c});default:return e}};function Ge(e){var t=e.send,n=void 0===t?Te:t,r=Ie(V(Ye,{playerCards:[],dealerCards:[],playerTotal:0,dealerTotal:0,status:"WAITING",balance:1e3,bet:50}),2),o=r[0],i=o.playerCards,a=o.playerTotal,l=o.dealerCards,u=o.dealerTotal,c=o.status,s=o.balance,f=o.bet,_=r[1],p=J(),d=J();q((function(){"PLAYING"===c?d.current.focus():p.current.focus()}),[c]),q((function(){return document.addEventListener("keypress",Pe),function(){return document.removeEventListener("keypress",Pe)}}),[]);var h=function(){return n("DEAL",s,f).then((function(e){_({type:"DEAL",data:e})}))};return Se.createElement("div",{className:"app"},Se.createElement("div",{className:"controls"},Se.createElement("h2",null,"$",s),Se.createElement("form",{onSubmit:function(e){e.preventDefault(),h()}},Se.createElement("label",{className:"controls-bet"},Se.createElement("span",null,"Bet: $"),Se.createElement("input",{className:"controls-betInput",type:"number",step:25,onChange:function(e){return setBet(e.target.value)},value:f}))),Se.createElement(ze,{onClick:h,ref:p},"Deal"),Se.createElement(ze,{ref:d,disabled:"PLAYING"!==c,onClick:function(){return n("HIT").then((function(e){_({type:"HIT",data:e})}))}},"Hit"),Se.createElement(ze,{disabled:"PLAYING"!==c,onClick:function(){return n("STAY").then((function(e){_({type:"STAY",data:e})}))}},"Stay"),Se.createElement(ze,{disabled:"PLAYING"!==c,onClick:function(){return n("DOUBLE").then((function(e){_({type:"DOUBLE",data:e})}))}},"Double Down"),Se.createElement("h2",null,Fe[c]),"WAITING"!==c&&Se.createElement("div",{className:"totals"},Se.createElement("label",null,"You: ",Se.createElement("span",{className:"totals-scores"},a)),Se.createElement("label",null,"Dealer: ",Se.createElement("span",{className:"totals-scores"},u)))),Se.createElement("div",{className:"game"},Se.createElement($e,{cards:i}),Se.createElement($e,{cards:l})))}var ze=le((function(e,t){return Se.createElement("button",Ue({},e,{className:"controls-button",ref:t}),e.children)}));function $e(e){var t=e.cards;return Se.createElement("div",{className:"cards"},t.map((function(e){return Se.createElement("div",{key:e},Se.createElement(Ve,e))})))}function Ve(e){var t=e.face,n=void 0===t?"King":t,r=e.suit,o=void 0===r?"Clubs":r,i={clubs:"black",spades:"black",diamonds:"red",hearts:"red"}[o],a={clubs:"♣",spades:"♠",diamonds:"♦",hearts:"♥"}[o]||"?";return Se.createElement("div",{className:"card-space"},Se.createElement("div",{"data-testid":"card",className:"card card-".concat(i)},Se.createElement("p",null,n),Se.createElement("h2",null,a)))}Se.render(Se.createElement(Ge,null),document.getElementById("root"))}]);