(this["webpackJsonpspotify-custom-radio"]=this["webpackJsonpspotify-custom-radio"]||[]).push([[0],{18:function(e,t,s){},21:function(e,t,s){},29:function(e,t,s){},30:function(e,t,s){},32:function(e,t,s){},33:function(e,t,s){},34:function(e,t,s){},35:function(e,t,s){},37:function(e,t,s){},46:function(e,t,s){},47:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s.n(a),r=s(22),i=s.n(r),c=(s(29),s(2)),o=s(3);s(18);function l(){var e=sessionStorage.getItem("access_token_timestamp");Date.now()-e>33e5&&(window.sessionStorage.removeItem("authorized"),window.sessionStorage.removeItem("access_token"),window.sessionStorage.removeItem("access_token_timestamp"),alert("Your login token has expired. Please login again."),window.location.reload())}s(30);var u=s(0);var b=function(e){var t=e.setUserID,s=Object(a.useState)(""),n=Object(c.a)(s,2),r=n[0],i=n[1];return Object(a.useEffect)((function(){l();var e=window.sessionStorage.getItem("access_token");return fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+e}}).then((function(e){return e.json()})).then((function(e){i(e.display_name),t(e.id)})).catch((function(e){i("<error>"),console.log(e)})),function(){i(""),t("")}}),[t]),Object(u.jsxs)("div",{className:"userinfo",children:[Object(u.jsxs)("div",{children:["Logged in as",Object(u.jsxs)("strong",{children:["\xa0",r,"\xa0"]})]}),Object(u.jsx)("div",{style:{cursor:"pointer"},onClick:function(){window.sessionStorage.removeItem("authorized"),window.sessionStorage.removeItem("access_token"),window.sessionStorage.removeItem("access_token_timestamp"),alert("You have been logged out successfully."),window.location.reload()},children:Object(u.jsx)("u",{children:"(Log Out)"})})]})};var m=s(11);s(21);var d=function(e){var t=e.isVisible,s=e.showSubsection;return t?Object(u.jsx)("div",{className:"main-button main-visible-button",children:s?"\u2014":"+"}):Object(u.jsx)("div",{className:"main-button"})};var h=function(e){var t=e.artistID,s=e.albumID,a=e.isSubsection,n=e.isDiscography,r=e.playlist,i=e.setPlaylist;return Object(u.jsx)("div",{className:"main-button main-visible-button main-delete-button",onClick:function(){var e=Object(m.a)({},r);!n&&a?(s?delete e[t].albums[s]:e[t].topTracks=!1,e[t].topTracks||0!==Object.keys(e[t].albums).length||delete e[t]):delete e[t],i(e)},children:"X"})};s(32);var p=function(e){var t=e.mainName,s=e.subName,n=e.artistName,r=e.artistID,i=e.albumID,o=e.imageUrl,l=e.isSearchResult,b=e.hasSubsection,p=e.subsection,j=e.playlist,f=e.setPlaylist,y=e.setQuery,v=e.setResultVisible,g=Object(a.useState)(!1),x=Object(c.a)(g,2),O=x[0],k=x[1];return Object(u.jsxs)("div",{className:"main-entry",children:[Object(u.jsxs)("div",{className:"main-entry-details",children:[Object(u.jsxs)("div",{className:"main-entry-details-left",onClick:l&&!b?function(){var e=Object(m.a)({},j);if(r in j)e[r].discography?alert("You already added this artist's discography"):e[r].albums[i]=t;else{var s={};s[i]=t,e[r]={name:n,imageUrl:o,discography:!1,topTracks:!1,albums:s}}f(e),v(!1),y("")}:function(){return k(!O)},children:[Object(u.jsx)(d,{isVisible:b,showSubsection:O}),Object(u.jsx)("img",{src:o,alt:"",style:{width:"90px",height:"90px",padding:"5px"}}),Object(u.jsxs)("div",{children:[Object(u.jsx)("h3",{children:t}),Object(u.jsx)("p",{children:s})]})]}),!l&&Object(u.jsx)(h,{artistID:r,playlist:j,setPlaylist:f})]}),O&&p]})};var j=function(e){var t=e.playlist,s=e.artistID,a=e.artistName,n=e.artistUrl,r=e.isDiscography,i=e.setPlaylist,c=e.setResultVisible,o=e.setQuery;return Object(u.jsx)("div",{className:"main-entry-subsection-item",onClick:function(){var e=Object(m.a)({},t);s in t?r?(e[s].discography=!0,e[s].topTracks=!1,e[s].albums=new Set([])):e[s].discography?alert("You already added this artist's discography"):e[s].topTracks=!0:e[s]={name:a,imageUrl:n,discography:r,topTracks:!r,albums:{}},i(e),c(!1),o("")},children:r?"Add Discography":"Add Top Tracks"})};var f=function(e){var t=e.artistID,s=e.albumID,a=e.title,n=e.isDiscography,r=e.playlist,i=e.setPlaylist;return Object(u.jsxs)("div",{className:"main-entry-subsection-item",children:[a,Object(u.jsx)(h,{artistID:t,albumID:s,isSubsection:!0,isDiscography:n,playlist:r,setPlaylist:i})]})};s(33);var y=function(e){var t=e.artistID,s=e.artistName,a=e.artistUrl,n=e.isSearchResult,r=e.playlist,i=e.setPlaylist,c=e.setQuery,o=e.setResultVisible,l=[];return n?l=[!0,!1].map((function(e){return Object(u.jsx)(j,{playlist:r,artistID:t,artistName:s,artistUrl:a,isDiscography:e,setPlaylist:i,setResultVisible:o,setQuery:c},"search subsection"+t+e)})):r[t].discography?l.push(Object(u.jsx)(f,{artistID:t,title:"Discography",isDiscography:!0,playlist:r,setPlaylist:i},"playlist subsection"+t+"discography")):(r[t].topTracks&&l.push(Object(u.jsx)(f,{artistID:t,title:"Top Tracks",isDiscography:!1,playlist:r,setPlaylist:i},"playlist subsection"+t+"toptracks")),Object.keys(r[t].albums).forEach((function(e){l.push(Object(u.jsx)(f,{artistID:t,albumID:e,title:"(album) ".concat(r[t].albums[e]),isDiscography:!1,playlist:r,setPlaylist:i},"playlist subsection"+t+e))}))),Object(u.jsx)("div",{className:"main-entry-subsection",children:l})};var v=function(e){var t=e.query,s=e.setQuery,n=e.playlist,r=e.setPlaylist,i=e.setResultVisible,o=Object(a.useState)([]),b=Object(c.a)(o,2),m=b[0],d=b[1],h=Object(a.useState)([]),j=Object(c.a)(h,2),f=j[0],v=j[1],g=Object(a.useState)(0),x=Object(c.a)(g,2),O=x[0],k=x[1],w=Object(a.useState)(0),S=Object(c.a)(w,2),P=S[0],I=S[1];Object(a.useEffect)((function(){l();var e={method:"GET",headers:{Authorization:"Bearer "+window.sessionStorage.getItem("access_token")}},s=new URL("https://api.spotify.com/v1/search");return s.searchParams.set("q",t),s.searchParams.set("market","from_token"),s.searchParams.set("type","artist,album"),fetch(s.href,e).then((function(e){return e.json()})).then((function(e){var t,s;d(null===e||void 0===e||null===(t=e.artists)||void 0===t?void 0:t.items),v(null===e||void 0===e||null===(s=e.albums)||void 0===s?void 0:s.items)})).catch((function(e){console.log(e)})),k(0),I(0),function(){d([]),v([])}}),[t]);var N=m?m.length:0,D=f?f.length:0,_=null===m||void 0===m?void 0:m.slice(O,O+5).map((function(e){var t,a,c,o;return Object(u.jsx)(p,{mainName:e.name,subName:e.genres.map((function(e){return e.split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")})).join(", "),artistID:e.id,imageUrl:null===(t=e.images)||void 0===t||null===(a=t.at(-1))||void 0===a?void 0:a.url,isSearchResult:!0,hasSubsection:!0,subsection:Object(u.jsx)(y,{artistID:e.id,artistName:e.name,artistUrl:null===(c=e.images)||void 0===c||null===(o=c.at(-1))||void 0===o?void 0:o.url,isSearchResult:!0,playlist:n,setPlaylist:r,setQuery:s,setResultVisible:i}),playlist:n,setPlaylist:r,setQuery:s},"search result"+e.id)})),A=null===f||void 0===f?void 0:f.slice(P,P+5).map((function(e){var t,a,c,o;return Object(u.jsx)(p,{artistName:null===(t=e.artists)||void 0===t?void 0:t.at(0).name,artistID:null===(a=e.artists)||void 0===a?void 0:a.at(0).id,albumID:e.id,mainName:e.name,subName:e.artists.map((function(e){return e.name})).join(", "),imageUrl:null===(c=e.images)||void 0===c||null===(o=c.at(0))||void 0===o?void 0:o.url,isSearchResult:!0,hasSubsection:!1,playlist:n,setPlaylist:r,setResultVisible:i,setQuery:s},"search result"+e.id)})),C=function(e){return e.preventDefault()};return Object(u.jsxs)("div",{className:"search-searchresult main-component",children:[Object(u.jsx)("p",{className:"main-title",children:"Artists"}),_&&O>0&&Object(u.jsx)("div",{className:"main-entry-details search-scroll-buttons",onClick:function(){return k(O-5)},onMouseDown:C,children:"Previous..."}),_,_&&O+5<N&&Object(u.jsx)("div",{className:"main-entry-details search-scroll-buttons",onClick:function(){return k(O+5)},onMouseDown:C,children:"Next..."}),Object(u.jsx)("p",{className:"main-title",children:"Albums"}),P>0&&Object(u.jsx)("div",{className:"main-entry-details search-scroll-buttons",onClick:function(){return I(P-5)},onMouseDown:C,children:"Previous..."}),A,A&&P+5<D&&Object(u.jsx)("div",{className:"main-entry-details search-scroll-buttons",onClick:function(){return I(P+5)},onMouseDown:C,children:"Next..."})]})};s(34);var g=function(e){var t=e.playlist,s=e.setPlaylist,n=function(e){var t=Object(a.useState)(e),s=Object(c.a)(t,2),n=s[0],r=s[1],i=Object(a.useRef)(null),o=function(e){i.current&&!i.current.contains(e.target)&&n&&r(!1)};return Object(a.useEffect)((function(){return document.addEventListener("click",o,!0),function(){document.removeEventListener("click",o,!0)}})),[i,n,r]}(!1),r=Object(c.a)(n,3),i=r[0],o=r[1],l=r[2],b=Object(a.useState)(""),m=Object(c.a)(b,2),d=m[0],h=m[1];return Object(a.useEffect)((function(){l(!!d)}),[d,l]),Object(u.jsx)("div",{ref:i,children:Object(u.jsxs)("div",{className:"search",children:[Object(u.jsx)("input",{className:"search-searchbar main-component",type:"text",placeholder:"Search...",value:d,onChange:function(e){return h(e.target.value)},onFocus:function(){return l(!0)}}),d&&o&&Object(u.jsx)(v,{query:d.trim(),setQuery:h,playlist:t,setPlaylist:s,setResultVisible:l})]})})};s(35);var x=function(e){var t,s=e.playlist,a=e.setPlaylist;return t=0===Object.keys(s).length?Object(u.jsx)("p",{style:{textAlign:"center",alignSelf:"center",color:"var(--text-color-dim)",fontStyle:"italic"},children:"This playlist seems a bit empty... Add some songs to it through the search bar above."}):Object.keys(s).map((function(e){var t=Object(u.jsx)(y,{artistID:e,playlist:s,setPlaylist:a}),n="";return s[e].discography?n="Discography":(s[e].topTracks&&(n+="Top Tracks, "),Object.values(s[e].albums).forEach((function(e){n=n+"(album) "+e+", "})),n=n.slice(0,-2)),Object(u.jsx)(p,{artistID:e,mainName:s[e].name,subName:n,imageUrl:s[e].imageUrl,hasSubsection:!0,subsection:t,playlist:s,setPlaylist:a},"playlist"+e)})),Object(u.jsxs)("div",{className:"main-component playlist",children:[Object(u.jsx)("p",{className:"main-title",children:"Current Playlist"}),t]})},O=s(20),k=s(8),w=s.n(k),S=s(12),P="8e9896a45be540c3b7260c13d4abe33d",I="https://tquang1708.github.io/spotify-custom-radio/callback",N="Your custom radio station, created from <insert url here>",D=!0,_=50,A=200;s(37);function C(e,t){return T.apply(this,arguments)}function T(){return(T=Object(S.a)(w.a.mark((function e(t,s){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,fetch(t.href,s).catch((function(e){console.log(e)}));case 3:if(!(a=e.sent).ok){e.next=8;break}return e.abrupt("break",15);case 8:if(429!==a.status){e.next=12;break}return e.delegateYield(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=parseInt(a.headers.get("retry-after"),10),e.next=3,new Promise((function(e){return setTimeout(e,t)}));case 3:case"end":return e.stop()}}),e)}))(),"t0",10);case 10:e.next=13;break;case 12:403===a.status&&(window.sessionStorage.removeItem("authorized"),window.sessionStorage.removeItem("access_token"),window.sessionStorage.removeItem("access_token_timestamp"),alert("Your login token has expired, probably. Please login again."),window.location.reload());case 13:e.next=0;break;case 15:return e.abrupt("return",a);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e,t){return E.apply(this,arguments)}function E(){return(E=Object(S.a)(w.a.mark((function e(t,s){var a,n,r,i,c,o;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=new Set([]),(n=new URL("https://api.spotify.com/v1/albums/".concat(s,"/tracks"))).searchParams.set("market","from_token"),n.searchParams.set("limit","50"),r=0;case 5:return n.searchParams.set("offset",r),e.next=9,C(n,t);case 9:return i=e.sent,e.next=12,i.json().catch((function(e){return console.log(e)}));case 12:if(c=e.sent,(o=c.items).forEach((function(e){a.add(e.uri)})),!(o.length<50)){e.next=19;break}return e.abrupt("break",22);case 19:r+=50;case 20:e.next=5;break;case 22:return e.abrupt("return",a);case 23:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var R=function(e){var t=e.userID,s=e.playlist,n=e.playlistName,r=e.setPlaylistName,i=e.setPlaylistLink,o=e.setAppInUsage,b=e.setPlaylistCreated,m=Object(a.useState)(!1),d=Object(c.a)(m,2),h=d[0],p=d[1],j=function(){return p(!h)},f=function(){var e=Object(S.a)(w.a.mark((function e(){var a,c,u,m,d,p,j,f,y,v,g,x,k,P,I,T,E,R,L;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l(),0!==Object.keys(s).length){e.next=5;break}alert("Your playlist is currently empty. Nothing to be done for now."),e.next=61;break;case 5:if(!(Object.keys(s).length>_&&D)){e.next=14;break}a="",a+="There are more than ".concat(_," items in your playlist. "),a+="Please remove some items to free up the app.\n\n",a+="Note that you can turn off rate limiting on your local build by ",a+="turning off the respective option in options.js",alert(a),e.next=61;break;case 14:return c=window.sessionStorage.getItem("access_token"),u={method:"GET",headers:{Authorization:"Bearer "+c}},m=new Set([]),d=new Set([]),e.next=20,Promise.all(Object.keys(s).map(function(){var e=Object(S.a)(w.a.mark((function e(t){var a,n,r,i,c,o,l;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s[t].discography){e.next=27;break}(a=new URL("https://api.spotify.com/v1/artists/".concat(t,"/albums"))).searchParams.set("market","from_token"),a.searchParams.set("include_groups","album,single"),a.searchParams.set("limit","50"),n=0;case 6:return a.searchParams.set("offset",n),e.next=10,C(a,u);case 10:return r=e.sent,e.next=13,r.json().catch((function(e){return console.log(e)}));case 13:if(i=e.sent,c=i.items,c.map((function(e){return e.id})).forEach((function(e){return d.add(e)})),!(c.length<50)){e.next=21;break}return e.abrupt("break",24);case 21:n+=50;case 22:e.next=6;break;case 24:e.next=39;break;case 27:if(Object.keys(s[t].albums).forEach((function(e){return d.add(e)})),!s[t].topTracks){e.next=38;break}return(o=new URL("https://api.spotify.com/v1/artists/".concat(t,"/top-tracks"))).searchParams.set("market","from_token"),e.next=33,C(o,u);case 33:return l=e.sent,e.next=36,l.json().catch((function(e){return console.log(e)}));case 36:e.sent.tracks.forEach((function(e){m.add(e.uri)}));case 38:case 39:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 20:if(!(D&&d.size>A)){e.next=29;break}p="",p+="There are more than ".concat(A," albums/eps/singles in your playlist. "),p+="(don't add Viper pls.) Please remove some items to free up the app.\n\n",p+="Note that you can turn off rate limiting on your local build by ",p+="turning off the respective option in options.js",alert(p),e.next=60;break;case 29:return o(!1),e.next=32,Promise.all(Array.from(d).map(function(){var e=Object(S.a)(w.a.mark((function e(t){var s;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U(u,t);case 2:s=e.sent,m=new Set([].concat(Object(O.a)(m),Object(O.a)(s)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 32:return r(j=n||"Custom Radio Station"),f={name:j,public:h,description:N},y={method:"POST",headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},body:JSON.stringify(f)},v=new URL("https://api.spotify.com/v1/users/".concat(t,"/playlists")),e.next=39,C(v,y);case 39:return g=e.sent,e.next=42,g.json().catch((function(e){return console.log(e)}));case 42:x=e.sent,k=x.id,i(x.external_urls.spotify),P=0,I=Array.from(m),T=new URL("https://api.spotify.com/v1/playlists/".concat(k,"/tracks"));case 48:if(!(P<I.length)){e.next=60;break}return E={uris:I.slice(P,P+100)},R={method:"POST",headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},body:JSON.stringify(E)},e.next=53,C(T,R);case 53:return L=e.sent,e.next=56,L.json().catch((function(e){return console.log(e)}));case 56:e.sent,P+=100,e.next=48;break;case 60:b(!0);case 61:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsxs)("div",{className:"submit",children:[Object(u.jsx)("input",{type:"text",value:n,placeholder:"Playlist Name...",onChange:function(e){return r(e.target.value)},style:{height:"25px"}}),Object(u.jsxs)("div",{className:"submit-public",children:[Object(u.jsx)("input",{type:"checkbox",checked:h,onClick:j}),Object(u.jsx)("div",{onClick:j,style:{cursor:"pointer"},children:"Make Playlist Public?"})]}),Object(u.jsx)("div",{className:"submit-button main-component",onClick:f,children:"Submit"})]})};var L=function(e){var t,s=e.footerText;if(e.selfAdvertising){t=Object(u.jsxs)("div",{children:["Created by Quang Tran, October 2021. Forward all your bug reports and/or suggestions to ",Object(u.jsx)("a",{href:"https://github.com/tquang1708/spotify-custom-radio/issues",children:"here."})]})}else t=Object(u.jsx)("div",{children:s});return Object(u.jsx)("div",{style:{color:"var(--text-color-dim)",position:"fixed",zIndex:"-1",bottom:"5px",right:"5px",fontSize:"0.7em",textAlign:"right"},children:t})},z=s(9);var V=function(e){var t=e.playlistCreated,s=e.playlistName,n=e.playlistLink,r=e.setAppInUsage,i=e.setPlaylistCreated,o=Object(a.useState)("."),l=Object(c.a)(o,2),b=l[0],m=l[1];return Object(a.useEffect)((function(){var e=setInterval((function(){5===b.length?m("."):m(b+".")}),350);return function(){clearInterval(e)}}),[b]),t?Object(u.jsxs)("div",{className:"center-text",children:[Object(u.jsxs)("p",{style:{color:"var(--text-color)",fontWeight:"bold",textAlign:"center"},children:["Playlist ",Object(u.jsx)("a",{href:n,target:"_blank",rel:"noreferrer",children:s})," Created!",Object(u.jsx)(z.b,{to:"/",onClick:function(){r(!0),i(!1),window.location.reload()},children:"\xa0Create Another playlist?"})]}),Object(u.jsx)(L,{selfAdvertising:!0})]}):("or during times when the site is busy due to rate limiting on ","Spotify's API.",Object(u.jsxs)("div",{className:"center-text",children:[Object(u.jsxs)("p",{style:{color:"var(--text-color)",fontWeight:"bold",textAlign:"center"},children:["Constructing ",Object(u.jsx)("span",{style:{color:"var(--highlight-color)"},children:"Playlist"}),Object(u.jsx)("br",{}),b]}),Object(u.jsx)(L,{footerText:"It might take a while to build the playlist for larger playlists or during times when the site is busy due to rate limiting on Spotify's API."})]}))};s(46);var Q=function(){var e=Object(a.useState)({}),t=Object(c.a)(e,2),s=t[0],n=t[1],r=Object(a.useState)(""),i=Object(c.a)(r,2),o=i[0],l=i[1],m=Object(a.useState)(""),d=Object(c.a)(m,2),h=d[0],p=d[1],j=Object(a.useState)(""),f=Object(c.a)(j,2),y=f[0],v=f[1],O=Object(a.useState)(!0),k=Object(c.a)(O,2),w=k[0],S=k[1],P=Object(a.useState)(!1),I=Object(c.a)(P,2),N=I[0],D=I[1];if(Object(a.useEffect)((function(){setTimeout((function(){window.sessionStorage.removeItem("authorized"),window.sessionStorage.removeItem("access_token"),window.sessionStorage.removeItem("access_token_timestamp"),alert("Your login token has expired. Please login again."),window.location.reload()}),33e5)}),[]),w){return"Note that the Discography option only includes all Albums, ","Singles and EPs and do not include Compilations or Apperances ","on other artists' albums.",Object(u.jsxs)("div",{className:"main",children:[Object(u.jsx)(b,{setUserID:l}),Object(u.jsx)(g,{playlist:s,setPlaylist:n}),Object(u.jsx)(x,{playlist:s,setPlaylist:n}),Object(u.jsx)(R,{userID:o,playlist:s,playlistName:h,setPlaylistName:p,setPlaylistLink:v,setAppInUsage:S,setPlaylistCreated:D}),Object(u.jsx)(L,{footerText:"Note that the Discography option only includes all Albums, Singles and EPs and do not include Compilations or Apperances on other artists' albums."})]})}return Object(u.jsx)(V,{playlistName:h,playlistLink:y,playlistCreated:N,setAppInUsage:S,setPlaylistCreated:D})};var Y=function(){var e=function(e){for(var t="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<e;a++)t+=s.charAt(Math.floor(Math.random()*s.length));return t}(16),t=new URL("https://accounts.spotify.com/authorize");return t.searchParams.set("client_id",P),t.searchParams.set("redirect_uri",I),t.searchParams.set("response_type","token"),t.searchParams.set("state",e),t.searchParams.set("scope","playlist-modify-private playlist-modify-public user-read-private"),sessionStorage.setItem("spt_auth_state",e),Object(u.jsxs)("div",{className:"center-text",children:[Object(u.jsxs)("div",{className:"main-title ",children:[Object(u.jsx)("a",{href:t.href,children:"Login to Spotify"}),"\xa0to begin"]}),Object(u.jsx)(L,{selfAdvertising:!0})]})};var M=function(e){var t=e.setHasError,s=e.setAuthorized,n=new URLSearchParams(window.location.hash.substring(1)),r=sessionStorage.getItem("spt_auth_state"),i=n.get("access_token"),c=n.get("error"),l=n.get("state"),b=i&&r===l;return Object(a.useEffect)((function(){b?(sessionStorage.setItem("authorized","true"),sessionStorage.setItem("access_token",i),sessionStorage.setItem("access_token_timestamp",Date.now()),sessionStorage.removeItem("spt_auth_state"),s(!0)):(console.log(c),t(!0))})),b?Object(u.jsx)(o.a,{to:"/"}):Object(u.jsx)(o.a,{to:"/error"})};var B=function(){return Object(u.jsxs)("div",{className:"main-title intro",children:["An error occurred. Please try to ",Object(u.jsx)(z.b,{to:"/",children:"login again."})]})};var F=function(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),s=t[0],n=t[1],r=Object(a.useState)(!1),i=Object(c.a)(r,2),l=i[0],b=i[1],m=sessionStorage.getItem("authorized");return Object(u.jsxs)(o.d,{children:[Object(u.jsx)(o.b,{exact:!0,path:"/",children:l||"true"===m?Object(u.jsx)(Q,{}):Object(u.jsx)(Y,{})}),Object(u.jsx)(o.b,{path:"/error",children:s?Object(u.jsx)(B,{}):Object(u.jsx)(o.a,{to:"/"})}),Object(u.jsx)(o.b,{path:"/callback",children:Object(u.jsx)(M,{setAuthorized:b,setHasError:n})})]})},q=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,48)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,r=t.getLCP,i=t.getTTFB;s(e),a(e),n(e),r(e),i(e)}))};i.a.render(Object(u.jsx)(n.a.StrictMode,{children:Object(u.jsx)(z.a,{children:Object(u.jsx)(F,{})})}),document.getElementById("root")),q()}},[[47,1,2]]]);
//# sourceMappingURL=main.7a94891c.chunk.js.map