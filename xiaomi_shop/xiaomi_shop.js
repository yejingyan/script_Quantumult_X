const $ = API("APP", true);
xiaomi_cookie = $.read("xm_shop_cookie")
const url = "https://api.m.mi.com/v1/retailmember/do_task";
const headers = {
    'magic-device-id' : "202111032235579767cadb64b972cee30d28896f4827f900e9b4691b125523",
    'Accept-Encoding' : "gzip, deflate, br",
    'Host' : "api.m.mi.com",
    'ai-recommend-status' : "0",
    'mishop-model' : "iPhone15,2",
    'Connection' : "keep-alive",
    'locale' : "CN",
    'User-Agent' : "MiShop/2022101701 CFNetwork/1399 Darwin/22.1.0",
    'mishop-client-id' : "180100031055",
    'device-id' : "D891D3E5EE4EC60603A5DA0DB2E32099",
    'mishop-auth' : "16d63bff6013e9b7;1728688868",
    'network-carrier' : "46001",
    'ios-version' : "system=16.1&device=iPhone15,2",
    'Accept-Language' : "zh-CN,zh-Hans;q=0.9",
    'Content-Type' : "application/x-www-form-urlencoded",
    'Accept' : "*/*",
    'mishop-channel-id' : "",
    'tracestate' : "sentry=eyJ0cmFjZV9pZCI6IjMzOTYyOWQ4OWNkYTRlMjZhZjk5NWI4YTEwMWI2OTJmIiwicHVibGljX2tleSI6IjA2NGQxODdhZDQ2MzRhZDhiZjBhNTY3Y2MwNGZkNTdiIiwicmVsZWFzZSI6ImNvbS54aWFvbWkubWlzaG9wQDUuMi4xNzYrMjAyMjEwMTcwMSIsImVudmlyb25tZW50IjoiUkVMRUFTRSIsInRyYW5zYWN0aW9uIjoiTWlvdFN0b3JlVmlld0NvbnRyb2xsZXIifQ",
    'device-oaid' : "3zdnJCx/sLvTs46QfUNfOzIkHNeStiLTwpz0KTFXFTYqArjvvYbkfMkuFk7vSUNI",
    'Cookie' : xiaomi_cookie,
    'sentry-trace' : "339629d89cda4e26af995b8a101b692f-009bc3aeebdb4fde-1"
    };
const body = "task_id=1&timestamp_mishop_client=1667507416358&act_id=4B9yhpgq6R94eWN7Lf4ngg"
$.http.post({
    url:url,
    headers,
    body:body,
   }).then((response)=> {
    const body1 = JSON.parse(response.body);
   if (body1["code"] == 200) {
    $.log("小米商城:签到成功");
    $.notify("小米商城签到", "小米商城", "签到成功");
   }else if (body1["code"] == 2001){
    $.log("小米商城:已经签到过了");
    $.notify("小米商城签到", "小米商城", "已经签到过了");
   }else{
    $.log("小米商城:签到失败");
    $.notify("小米商城签到", "小米商城", "签到失败");
   }
   $.done();
   });






















function ENV(){const e="function"==typeof require&&"undefined"!=typeof $jsbox;return{isQX:"undefined"!=typeof $task,isLoon:"undefined"!=typeof $loon,isSurge:"undefined"!=typeof $httpClient&&"undefined"!=typeof $utils,isBrowser:"undefined"!=typeof document,isNode:"function"==typeof require&&!e,isJSBox:e,isRequest:"undefined"!=typeof $request,isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:o,isScriptable:n,isNode:i,isBrowser:r}=ENV(),u=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;const a={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(h=>a[h.toLowerCase()]=(a=>(function(a,h){h="string"==typeof h?{url:h}:h;const d=e.baseURL;d&&!u.test(h.url||"")&&(h.url=d?d+h.url:h.url),h.body&&h.headers&&!h.headers["Content-Type"]&&(h.headers["Content-Type"]="application/x-www-form-urlencoded");const l=(h={...e,...h}).timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...h.events};let f,p;if(c.onRequest(a,h),t)f=$task.fetch({method:a,...h});else if(s||o||i)f=new Promise((e,t)=>{(i?require("request"):$httpClient)[a.toLowerCase()](h,(s,o,n)=>{s?t(s):e({statusCode:o.status||o.statusCode,headers:o.headers,body:n})})});else if(n){const e=new Request(h.url);e.method=a,e.headers=h.headers,e.body=h.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}else r&&(f=new Promise((e,t)=>{fetch(h.url,{method:a,headers:h.headers,body:h.body}).then(e=>e.json()).then(t=>e({statusCode:t.status,headers:t.headers,body:t.data})).catch(t)}));const y=l?new Promise((e,t)=>{p=setTimeout(()=>(c.onTimeout(),t(`${a} URL: ${h.url} exceeds the timeout ${l} ms`)),l)}):null;return(y?Promise.race([y,f]).then(e=>(clearTimeout(p),e)):f).then(e=>c.onResponse(e))})(h,a))),a}function API(e="untitled",t=!1){const{isQX:s,isLoon:o,isSurge:n,isNode:i,isJSBox:r,isScriptable:u}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(i){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(o||n)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),i){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(o||n)&&$persistentStore.write(e,this.name),i&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),n||o)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);i&&(this.root[t]=e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),n||o?$persistentStore.read(e):s?$prefs.valueForKey(e):i?this.root[e]:void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||o)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);i&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e,t="",a="",h={}){const d=h["open-url"],l=h["media-url"];if(s&&$notify(e,t,a,h),n&&$notification.post(e,t,a+`${l?"\n多媒体:"+l:""}`,{url:d}),o){let s={};d&&(s.openUrl=d),l&&(s.mediaUrl=l),"{}"===JSON.stringify(s)?$notification.post(e,t,a):$notification.post(e,t,a,s)}if(i||u){const s=a+(d?`\n点击跳转: ${d}`:"")+(l?`\n多媒体: ${l}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||o||n?$done(e):i&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}
