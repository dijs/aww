(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){},11:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(2),i=n.n(r),c=(n(10),n(3));function l(t){var e=t.title,n=t.thumbnail;return o.a.createElement("article",{key:e},o.a.createElement("h2",null,e),o.a.createElement("img",{src:n,alt:e}))}var u=function(){var t=function(){var t=o.a.useState([]),e=Object(c.a)(t,2),n=e[0],a=e[1];return n.length||fetch("https://api.reddit.com/r/aww/new.json").then(function(t){return t.json()}).then(function(t){a(t.data.children.map(function(t){return{title:t.data.title,thumbnail:t.data.thumbnail,embed:t.data.embed}}))}).catch(function(t){console.log(t)}),{posts:n}}().posts;return o.a.createElement("div",{className:"container"},t.map(l))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},4:function(t,e,n){t.exports=n(11)}},[[4,1,2]]]);
//# sourceMappingURL=main.aea9da1d.chunk.js.map