import{_ as U}from"./BTPOsQVr.js";import{n as j,G as z,r,v as A,g as k,q as G,c as n,a as s,D as S,H as x,y as N,I as L,J as V,F as C,z as J,t as _,C as M,o as i,b as O,w as q,p as E,e as H,_ as Q}from"./Bu0XVOAa.js";import{_ as D}from"./DjdhMgzQ.js";import{u as F}from"./DmHGD0s0.js";const c=g=>(E("data-v-dfaccf85"),g=g(),H(),g),W={class:"search"},X=c(()=>s("span",{class:"material-icons"}," search",-1)),K={key:0,class:"trending"},Y={class:"movies"},Z=["src"],ee={key:1,class:"movie_image",src:D,alt:"poster"},se={class:"title"},te={key:0,class:"pagination"},ae=["disabled"],oe=c(()=>s("span",{class:"arrow"},"«",-1)),le=[oe],ne=["disabled"],ie=c(()=>s("span",{class:"arrow"},"‹",-1)),ue=[ie],re={class:"counter"},ce=["disabled"],de=c(()=>s("span",{class:"arrow"},"›",-1)),ve=[de],_e=["disabled"],pe=c(()=>s("span",{class:"arrow"},"»",-1)),me=[pe],ge=["max"],he={key:1,class:"results"},fe={class:"movies"},be=["src"],ye={key:1,class:"movie_image",src:D,alt:"poster"},we={class:"title"},ke={key:0,class:"pagination"},Se=["disabled"],xe=c(()=>s("span",{class:"arrow"},"«",-1)),Ce=[xe],Pe=["disabled"],Ie=c(()=>s("span",{class:"arrow"},"‹",-1)),$e=[Ie],Re={class:"counter"},Te=["disabled"],Be=c(()=>s("span",{class:"arrow"},"›",-1)),Ne=[Be],Ve=["disabled"],Je=c(()=>s("span",{class:"arrow"},"»",-1)),Me=[Je],Oe=["max"],qe=j({__name:"index",async setup(g){let P,I;const u=z("searchByTitle",r("")),h=r([]),$=r([]),o=r(1),d=r(500),v=r(0),a=r(1),f=r(!1),b=r(!1),y=r(!1),R=async()=>{const{data:l}=await F("/api/movies",{query:{page:o.value}},"$pqtWcjQkdb");$.value=l.value.results};[P,I]=A(()=>R()),await P,I();const w=async()=>{const{data:l}=await F(`/api/search/${u.value}`,{query:{title:u.value,page:a.value}},"$cmRBlMwAGX");h.value=l.value.results,v.value=l.value.total_pages,f.value&&(a.value=1,f.value=!1),o.value=1,sessionStorage.removeItem("currentPage")};k([o],async()=>{await R(),sessionStorage.setItem("currentPage",JSON.stringify(o.value))}),k([a],async()=>{await w(),sessionStorage.setItem("currentResultsPage",JSON.stringify(a.value))});const T=async()=>{console.log("watcher is triggered"),u.value===""?(sessionStorage.removeItem("searchByTitle"),sessionStorage.removeItem("currentResultsPage"),a.value=1,h.value=[]):(b.value?(await w(),b.value=!1):(f.value=!0,await w()),sessionStorage.setItem("searchByTitle",u.value),sessionStorage.setItem("currentResultsPage",JSON.stringify(a.value)))};k(u,async()=>{T()}),G(async()=>{const l=sessionStorage.getItem("currentPage"),e=sessionStorage.getItem("currentResultsPage");l&&(o.value=JSON.parse(l)),e&&(b.value=!0,a.value=JSON.parse(e),u.value=sessionStorage.getItem("searchByTitle")||"",console.log(u.value),T()),setTimeout(()=>{y.value=!0},100)});const p=l=>{l>=1&&l<=d.value&&(o.value=l)},m=l=>{l>=1&&l<=v.value&&(a.value=l)};return(l,e)=>{const B=U;return i(),n(C,null,[s("div",W,[S(s("input",{type:"search",placeholder:"Search","onUpdate:modelValue":e[0]||(e[0]=t=>L(u)?u.value=t:null)},null,512),[[x,N(u)]]),X]),N(u)?(i(),n("div",he,[s("h1",{class:V({visible:y.value})},"Results",2),s("div",fe,[(i(!0),n(C,null,J(h.value,t=>(i(),n("div",{class:"movie",key:t.id},[O(B,{to:`/detail/${t.id}`},{default:q(()=>[t.poster_path?(i(),n("img",{key:0,class:"movie_image",src:"https://image.tmdb.org/t/p/w500"+t.poster_path},null,8,be)):(i(),n("img",ye)),s("p",we,_(t.title),1)]),_:2},1032,["to"])]))),128))]),h.value?(i(),n("div",ke,[s("button",{class:"paginate first",onClick:e[7]||(e[7]=t=>m(1)),disabled:a.value===1},Ce,8,Se),s("button",{class:"paginate prev",onClick:e[8]||(e[8]=t=>m(a.value-1)),disabled:a.value===1},$e,8,Pe),s("div",Re,_(a.value)+" / "+_(v.value),1),s("button",{class:"paginate next",onClick:e[9]||(e[9]=t=>m(a.value+1)),disabled:a.value===v.value},Ne,8,Te),s("button",{class:"paginate last",onClick:e[10]||(e[10]=t=>m(v.value)),disabled:a.value===v.value},Me,8,Ve),S(s("input",{type:"number","onUpdate:modelValue":e[11]||(e[11]=t=>a.value=t),min:"1",max:v.value,onChange:e[12]||(e[12]=t=>m(a.value))},null,40,Oe),[[x,a.value,void 0,{number:!0}]])])):M("",!0)])):(i(),n("div",K,[s("h1",{class:V({visible:y.value})},"Trending Now",2),s("div",Y,[(i(!0),n(C,null,J($.value,t=>(i(),n("div",{class:"movie",key:t.id},[O(B,{to:`/detail/${t.id}`},{default:q(()=>[t.poster_path?(i(),n("img",{key:0,class:"movie_image",src:"https://image.tmdb.org/t/p/w500"+t.poster_path},null,8,Z)):(i(),n("img",ee)),s("p",se,_(t.title),1)]),_:2},1032,["to"])]))),128))]),d.value>1?(i(),n("div",te,[s("button",{class:"paginate first",onClick:e[1]||(e[1]=t=>p(1)),disabled:o.value===1},le,8,ae),s("button",{class:"paginate prev",onClick:e[2]||(e[2]=t=>p(o.value-1)),disabled:o.value===1},ue,8,ne),s("div",re,_(o.value)+" / "+_(d.value),1),s("button",{class:"paginate next",onClick:e[3]||(e[3]=t=>p(o.value+1)),disabled:o.value===d.value},ve,8,ce),s("button",{class:"paginate last",onClick:e[4]||(e[4]=t=>p(d.value)),disabled:o.value===d.value},me,8,_e),S(s("input",{type:"number","onUpdate:modelValue":e[5]||(e[5]=t=>o.value=t),min:"1",max:d.value,onChange:e[6]||(e[6]=t=>p(o.value))},null,40,ge),[[x,o.value,void 0,{number:!0}]])])):M("",!0)]))],64)}}}),ze=Q(qe,[["__scopeId","data-v-dfaccf85"]]);export{ze as default};
