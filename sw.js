if(!self.define){let e,i={};const t=(t,r)=>(t=new URL(t+".js",r).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(r,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const d=e=>t(e,n),c={module:{uri:n},exports:o,require:d};i[n]=Promise.all(r.map((e=>c[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-5dde03aa"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_expo/static/js/web/entry-18a107ed1fc1fa91f598a9313d0066a5.js",revision:"18a107ed1fc1fa91f598a9313d0066a5"},{url:"favicon.ico",revision:"50b1bd72d8b0c569ffcad83d622ec176"},{url:"index.html",revision:"1b06dac50c1027b227a4785d1068a73f"},{url:"manifest.json",revision:"33c30dde121592fa11cf0a78203ec2fe"},{url:"metadata.json",revision:"37cb2e8fcdd3b2523b9bd2f4b09087db"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
