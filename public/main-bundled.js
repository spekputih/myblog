!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=27)}([function(e,t,r){"use strict";var n=r(2),s=Object.prototype.toString;function a(e){return"[object Array]"===s.call(e)}function i(e){return void 0===e}function o(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===s.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:o,isUndefined:i,isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:c,isStream:function(e){return o(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:u,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,s=arguments.length;n<s;n++)u(arguments[n],r);return t},deepMerge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]="object"==typeof r?e({},r):r}for(var n=0,s=arguments.length;n<s;n++)u(arguments[n],r);return t},extend:function(e,t,r){return u(t,(function(t,s){e[s]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){e.exports=r(10)},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(0);function s(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var a;if(r)a=r(t);else if(n.isURLSearchParams(t))a=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(s(t)+"="+s(e))})))})),a=i.join("&")}if(a){var o=e.indexOf("#");-1!==o&&(e=e.slice(0,o)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";(function(t){var n=r(0),s=r(16),a={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o,c={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(o=r(6)),o),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(a)})),e.exports=c}).call(this,r(15))},function(e,t,r){"use strict";var n=r(0),s=r(17),a=r(3),i=r(19),o=r(22),c=r(23),u=r(7);e.exports=function(e){return new Promise((function(t,l){var h=e.data,f=e.headers;n.isFormData(h)&&delete f["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",p=e.auth.password||"";f.Authorization="Basic "+btoa(m+":"+p)}var v=i(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),a(v,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in d?o(d.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:r,config:e,request:d};s(t,l,n),d=null}},d.onabort=function(){d&&(l(u("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){l(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),l(u(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var y=r(24),g=(e.withCredentials||c(v))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;g&&(f[e.xsrfHeaderName]=g)}if("setRequestHeader"in d&&n.forEach(f,(function(e,t){void 0===h&&"content-type"===t.toLowerCase()?delete f[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),l(e),d=null)})),void 0===h&&(h=null),d.send(h)}))}},function(e,t,r){"use strict";var n=r(18);e.exports=function(e,t,r,s,a){var i=new Error(e);return n(i,t,r,s,a)}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){t=t||{};var r={},s=["url","method","params","data"],a=["headers","auth","proxy"],i=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];n.forEach(s,(function(e){void 0!==t[e]&&(r[e]=t[e])})),n.forEach(a,(function(s){n.isObject(t[s])?r[s]=n.deepMerge(e[s],t[s]):void 0!==t[s]?r[s]=t[s]:n.isObject(e[s])?r[s]=n.deepMerge(e[s]):void 0!==e[s]&&(r[s]=e[s])})),n.forEach(i,(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])}));var o=s.concat(a).concat(i),c=Object.keys(t).filter((function(e){return-1===o.indexOf(e)}));return n.forEach(c,(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])})),r}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){"use strict";var n=r(0),s=r(2),a=r(11),i=r(8);function o(e){var t=new a(e),r=s(a.prototype.request,t);return n.extend(r,a.prototype,t),n.extend(r,t),r}var c=o(r(5));c.Axios=a,c.create=function(e){return o(i(c.defaults,e))},c.Cancel=r(9),c.CancelToken=r(25),c.isCancel=r(4),c.all=function(e){return Promise.all(e)},c.spread=r(26),e.exports=c,e.exports.default=c},function(e,t,r){"use strict";var n=r(0),s=r(3),a=r(12),i=r(13),o=r(8);function c(e){this.defaults=e,this.interceptors={request:new a,response:new a}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=o(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=o(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,s){return this.request(n.merge(s||{},{method:e,url:t,data:r}))}})),e.exports=c},function(e,t,r){"use strict";var n=r(0);function s(){this.handlers=[]}s.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=s},function(e,t,r){"use strict";var n=r(0),s=r(14),a=r(4),i=r(5);function o(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return o(e),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return o(e),t.data=s(t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(o(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},function(e,t){var r,n,s=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function o(e){if(r===setTimeout)return setTimeout(e,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(e){n=i}}();var c,u=[],l=!1,h=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):h=-1,u.length&&d())}function d(){if(!l){var e=o(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++h<t;)c&&c[h].run();h=-1,t=u.length}c=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function p(){}s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new m(e,t)),1!==u.length||l||o(d)},m.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=p,s.addListener=p,s.once=p,s.off=p,s.removeListener=p,s.removeAllListeners=p,s.emit=p,s.prependListener=p,s.prependOnceListener=p,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},function(e,t,r){"use strict";var n=r(7);e.exports=function(e,t,r){var s=r.config.validateStatus;!s||s(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,s){return e.config=t,r&&(e.code=r),e.request=n,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,r){"use strict";var n=r(20),s=r(21);e.exports=function(e,t){return e&&!n(t)?s(e,t):t}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(0),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,a,i={};return e?(n.forEach(e.split("\n"),(function(e){if(a=e.indexOf(":"),t=n.trim(e.substr(0,a)).toLowerCase(),r=n.trim(e.substr(a+1)),t){if(i[t]&&s.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function s(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=s(window.location.href),function(t){var r=n.isString(t)?s(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,s,a,i){var o=[];o.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&o.push("expires="+new Date(r).toGMTString()),n.isString(s)&&o.push("path="+s),n.isString(a)&&o.push("domain="+a),!0===i&&o.push("secure"),document.cookie=o.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";var n=r(9);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.source=function(){var e;return{token:new s((function(t){e=t})),cancel:e}},e.exports=s},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,r){"use strict";r.r(t);var n=r(1),s=r.n(n);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.injectHTML(),this.textField=document.querySelector(".live-search-field"),this.overlay=document.querySelector(".search-overlay"),this.closeIcon=document.querySelector(".close-live-search"),this.headerSearch=document.querySelector(".header-search-icon"),this.resultSearch=document.querySelector(".live-search-results"),this.loaderIcon=document.querySelector(".circle-loader"),this.typingWaitTimer,this.previousValue="",this.event()}var t,r,n;return t=e,(r=[{key:"event",value:function(){var e=this;this.textField.addEventListener("keyup",(function(t){return e.keyPressHandler()})),this.closeIcon.addEventListener("click",(function(){return e.closeSearch()})),this.headerSearch.addEventListener("click",(function(t){t.preventDefault(),e.openOverlay()}))}},{key:"openOverlay",value:function(){var e=this;this.overlay.classList.add("search-overlay--visible"),setTimeout((function(){e.textField.focus()}),50)}},{key:"keyPressHandler",value:function(){var e=this,t=this.textField.value;""==t&&(clearTimeout(this.typingWaitTimer),this.hideLoaderIcon(),this.hideResultArea()),""!=t&&t!=this.previousValue&&(clearTimeout(this.typingWaitTimer),this.showLoaderIcon(),this.hideResultArea(),this.typingWaitTimer=setTimeout((function(){e.sendRequest()}),750)),console.log(this.typingWaitTimer),this.previousValue=t}},{key:"sendRequest",value:function(){var e=this;s.a.post("/search",{setValue:this.textField.value}).then((function(t){e.renderResultHTML(t.data)})).catch((function(){alert("Hello, the request has failed")}))}},{key:"renderResultHTML",value:function(e){console.log(e),e.length?this.resultSearch.innerHTML='<div class="list-group-item active"><strong>Search Results</strong> ('.concat(e.length>1?"".concat(e.length," items found"):"1 item found",")</div>\n            ").concat(e.map((function(e){var t=new Date(e.createdDate);return'<a href="/post/'.concat(e._id,'" class="list-group-item list-group-item-action" />\n              <img class="avatar-tiny" src="').concat(e.author.avatar,'"></img> \n              <strong>').concat(e.title,'</strong>\n              <span class="text-muted small">by ').concat(e.author.firstname," ").concat(e.author.lastname," on ").concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear(),"</span>\n            </a>")})).join(" "),"\n\t\t\t</div>\n            "):this.resultSearch.innerHTML='<p class="alert alert-danger text-center shadow-sm">Sorry, we could find the value for that search</p>',this.hideLoaderIcon(),this.showResultArea()}},{key:"showLoaderIcon",value:function(){this.loaderIcon.classList.add("circle-loader--visible")}},{key:"hideLoaderIcon",value:function(){this.loaderIcon.classList.remove("circle-loader--visible")}},{key:"showResultArea",value:function(){this.resultSearch.classList.add("live-search-results--visible")}},{key:"hideResultArea",value:function(){this.resultSearch.classList.remove("live-search-results--visible")}},{key:"closeSearch",value:function(){this.overlay.classList.remove("search-overlay--visible")}},{key:"injectHTML",value:function(){document.body.insertAdjacentHTML("beforeend",'<div class="search-overlay">\n\t\t    <div class="search-overlay-top shadow-sm">\n\t\t      <div class="container container--narrow">\n\t\t        <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>\n\t\t        <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">\n\t\t        <span class="close-live-search"><i class="fas fa-times-circle">close</i></span>\n\t\t      </div>\n\t\t    </div>\n\n\t\t    <div class="search-overlay-bottom">\n\t\t      <div class="container container--narrow py-3">\n\t\t        <div class="circle-loader"></div>\n\t\t        <div class="live-search-results">\n\t\t          <div class="list-group shadow-sm">\n\t\t            \n\t\t        </div>\n\t\t      </div>\n\t\t    </div>\n\t\t  </div>')}}])&&a(t.prototype,r),n&&a(t,n),e}();function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.chatWrapper=document.querySelector("#chat-wrapper"),this.openIcon=document.querySelector(".header-chat-icon"),this.injectHTML(),this.chatField=document.querySelector("#chatField"),this.chatLog=document.querySelector("#chat"),this.chatForm=document.querySelector("#chatForm"),this.openedYet=!1,this.closeIcon=document.querySelector(".chat-title-bar-close"),this.event()}var t,r,n;return t=e,(r=[{key:"event",value:function(){var e=this;this.chatForm.addEventListener("submit",(function(t){t.preventDefault(),e.sendMessageToServer()})),this.openIcon.addEventListener("click",(function(){return e.showChat()})),this.closeIcon.addEventListener("click",(function(){return e.closeChat()}))}},{key:"sendMessageToServer",value:function(){""!=this.chatField.value&&(this.socket.emit("chatMessageFromBrowser",{message:this.chatField.value}),this.chatLog.insertAdjacentHTML("beforeend",'\n\t\t\t  <div class="chat-self">\n\t\t        <div class="chat-message">\n\t\t          <div class="chat-message-inner">\n\t\t            '.concat(this.chatField.value,'\n\t\t          </div>\n\t\t        </div>\n\t\t        <img class="chat-avatar avatar-tiny" src="').concat(this.avatar,'">\n\t\t      </div>\n\t\t\t  ')),this.privateMessage()),this.chatLog.scrollTop=this.chatLog.scrollHeight,this.chatField.value="",this.chatField.focus()}},{key:"closeChat",value:function(){this.chatWrapper.classList.remove("chat--visible")}},{key:"showChat",value:function(){this.openedYet||this.openConnection(),this.openedYet=!0,this.chatWrapper.classList.add("chat--visible"),this.chatField.focus()}},{key:"privateMessage",value:function(){this.socket.emit("privateMessage",{message:"private message",to:"FafiqSyaz",firstname:"Afiq",lastname:"Syazwan",avatar:"https://gravatar.com/avatar/3f8bce029bfc0388361918ccd30e2ab4?s=128"})}},{key:"openConnection",value:function(){var e=this;this.socket=io(),this.socket.on("welcome",(function(t){e.username=t.username,e.avatar=t.avatar})),this.socket.on("chatMessageFromServer",(function(t){e.displayMessageFromServer(t)})),this.socket.on("privateFromServer",(function(t){e.displayMessageFromServer(t),console.log("message from ".concat(t.firstname," ").concat(t.lastname,": ").concat(t.message))}))}},{key:"displayMessageFromServer",value:function(e){this.chatLog.insertAdjacentHTML("beforeend",'\n\t\t\t\t<div class="chat-other">\n\t\t\t        <a href="#"><img class="avatar-tiny" src="'.concat(e.avatar,'"></a>\n\t\t\t        <div class="chat-message"><div class="chat-message-inner">\n\t\t\t          <a href="#"><strong>').concat(e.username,":</strong></a>\n\t\t\t          ").concat(e.message,"\n\t\t\t        </div></div>\n\t\t\t    </div>\n\t\t\t")),this.chatLog.scrollTop=this.chatLog.scrollHeight}},{key:"injectHTML",value:function(){this.chatWrapper.innerHTML='\n\t\t<div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle">close</i></span></div>\n\t\t<div id="chat" class="chat-log"></div>\n\n\n\t\t<form id="chatForm" class="chat-form border-top">\n\t      <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">\n\t    </form>\n\t\t'}}])&&o(t.prototype,r),n&&o(t,n),e}();function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.form=document.querySelector("#registration-form"),this.allField=document.querySelectorAll(".form-style .form-control"),this.insertValidationElement(),this.username=document.querySelector("#firstname"),this.username.previousValue="",this.lastname=document.querySelector("#lastname"),this.lastname.previousValue="",this.email=document.querySelector("#email"),this.email.previousValue="",this.password=document.querySelector("#password"),this.password.previousValue="",this.email.isUnique=!1,this.username.isUnique=!1,this.lastname.isUnique=!1,this.event()}var t,r,n;return t=e,(r=[{key:"event",value:function(){var e=this;this.form.addEventListener("submit",(function(t){console.log(e.form),t.preventDefault(),e.submitFormHandler()})),this.username.addEventListener("keyup",(function(){e.isDifferent(e.username,e.usernameHandler)})),this.lastname.addEventListener("keyup",(function(){e.isDifferent(e.lastname,e.lastnameHandler)})),this.email.addEventListener("keyup",(function(){e.isDifferent(e.email,e.emailHandler)})),this.password.addEventListener("keyup",(function(){e.isDifferent(e.password,e.passwordHandler)})),this.username.addEventListener("blur",(function(){e.isDifferent(e.username,e.usernameHandler)})),this.lastname.addEventListener("blur",(function(){e.isDifferent(e.lastname,e.lastnameHandler)})),this.email.addEventListener("blur",(function(){e.isDifferent(e.email,e.emailHandler)})),this.password.addEventListener("blur",(function(){e.isDifferent(e.password,e.passwordHandler)}))}},{key:"submitFormHandler",value:function(){this.isFieldEValueExist(),this.usernameImmediately(),this.usernameAfterDelay(),this.emailAfterDelay(),this.lastnameImmediately(),this.lastnameAfterDelay(),this.passwordImmediately(),this.passwordAfterDelay(),this.username.errors||this.email.errors||this.lastname.errors||this.password.errors||!this.username.isUnique||!this.lastname.isUnique||!this.email.isUnique||this.form.submit()}},{key:"isFieldEValueExist",value:function(){""==this.username.value&&(this.showValidationError(this.username,"Username"),this.username.errors=!0),""==this.lastname.value&&(this.showValidationError(this.lastname,"Lastname"),this.lastname.errors=!0),""==this.email.value&&(console.log("email"),this.showValidationError(this.email,"Email"),this.email.errors=!0),""==this.password.value&&(this.showValidationError(this.password,"Password"),this.password.errors=!0)}},{key:"isDifferent",value:function(e,t){e.previousValue!=e.value&&t.call(this),e.previousValue=e.value}},{key:"usernameHandler",value:function(){var e=this;this.username.errors=!1,this.usernameImmediately(),clearTimeout(this.username.timer),this.username.timer=setTimeout((function(){return e.usernameAfterDelay()}),800)}},{key:"usernameImmediately",value:function(){console.log("username"),""==this.username.value||/^([a-zA-Z0-9]+)$/.test(this.username.value)||this.showValidationError(this.username,"Username can only contain letters and numbers"),this.username.value.length>30&&this.showValidationError(this.username,"Username cannot contain more than 30 characters"),this.username.errors||this.hideValidationError(this.username)}},{key:"hideValidationError",value:function(e){e.previousElementSibling.classList.remove("elementVisible")}},{key:"showValidationError",value:function(e,t){e.previousElementSibling.innerHTML=t,e.previousElementSibling.classList.add("elementVisible"),e.errors=!0}},{key:"usernameAfterDelay",value:function(){var e=this;""!=this.username.value&&this.username.value.length<3&&this.showValidationError(this.username,"Username must contain more than 3 characters"),this.username.errors||s.a.post("/isUsernameExist",{username:this.username.value}).then((function(t){t.data?(e.showValidationError(e.username,"Username has been taken"),e.username.isUnique=!1):e.username.isUnique=!0}))}},{key:"lastnameHandler",value:function(){var e=this;this.lastname.errors=!1,this.lastnameImmediately(),clearTimeout(this.lastname.timer),this.lastname.timer=setTimeout((function(){return e.lastnameAfterDelay()}),800)}},{key:"lastnameImmediately",value:function(){""==this.lastname.value||/^([a-zA-Z0-9]+)$/.test(this.lastname.value)||this.showValidationError(this.lastname,"Lastname can only contain letters and numbers"),this.lastname.value.length>30&&this.showValidationError(this.lastname,"Lastname cannot contain more than 30 characters"),this.lastname.errors||this.hideValidationError(this.lastname)}},{key:"lastnameAfterDelay",value:function(){var e=this;""!=this.lastname.value&&this.lastname.value.length<3&&this.showValidationError(this.lastname,"Lastname must contain more than 3 characters"),this.lastname.errors||s.a.post("/isLastnameExist",{lastname:this.lastname.value}).then((function(t){t.data?(e.showValidationError(e.lastname,"Lastname has been taken"),e.lastname.isUnique=!1):e.lastname.isUnique=!0}))}},{key:"emailHandler",value:function(){var e=this;this.email.errors=!1,clearTimeout(this.email.timer),this.email.timer=setTimeout((function(){return e.emailAfterDelay()}),800)}},{key:"emailAfterDelay",value:function(){var e=this;""==this.email.value||/^\S+@\S+$/.test(this.email.value)||this.showValidationError(this.email,"Please enter valid email address"),this.email.errors||s.a.post("/isEmailExist",{email:this.email.value}).then((function(t){t.data?(e.showValidationError(e.email,"Email has been used by another user"),e.email.isUnique=!1):(e.email.isUnique=!0,e.hideValidationError(e.email))}))}},{key:"passwordHandler",value:function(){var e=this;this.password.errors=!1,this.passwordImmediately(),clearTimeout(this.password.timer),this.password.timer=setTimeout((function(){return e.passwordAfterDelay()}),1e3)}},{key:"passwordImmediately",value:function(){this.password.value.length>30&&(this.showValidationError(this.password,"Password cannot exceed 30 characters"),this.password.errors=!0)}},{key:"passwordAfterDelay",value:function(){""!=this.password.value&&this.password.value.length<3&&(this.showValidationError(this.password,"Password must have more than 3 characters"),this.password.errors=!0),this.password.errors||(this.hideValidationError(this.password),this.password.errors=!1)}},{key:"insertValidationElement",value:function(){this.allField.forEach((function(e){e.insertAdjacentHTML("beforebegin","<div class='alert alert-danger small elementHidden' style='margin-bottom: 0;padding: 8px 15px;'>Hello</div>")}))}}])&&u(t.prototype,r),n&&u(t,n),e}();document.querySelector("#register-form")&&new l,document.querySelector("#chat-wrapper")&&new c,new i}]);