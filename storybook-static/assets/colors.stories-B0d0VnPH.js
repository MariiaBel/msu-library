function C(a){let o={},t=document.styleSheets;for(let s=0;s<t.length;s++)try{let e=t[s].cssRules||t[s].rules;for(let r=0;r<e.length;r++)if(e[r].selectorText===":root"){let c=e[r].style;for(let l=0;l<c.length;l++){let d=c[l];a.test(d)&&(o[d]=c.getPropertyValue(d).trim())}}}catch(e){console.error("Ошибка при доступе к стилям:",e)}return o}let g=/--clr-/,m=C(g);const _=({...a})=>{const o=document.createElement("div");o.classList.add("main");const t=[];return Object.keys(m).reverse().map(e=>{const r=m[e];t.push(y(e,r))}),t.map(e=>o.prepend(e)),o},y=(a,o)=>{const t=document.createElement("div"),s=document.createElement("div"),e=document.createElement("div"),r=document.createElement("p"),c=document.createElement("p");return t.classList.add("card"),s.classList.add("card__color"),r.classList.add("card__name"),c.classList.add("card__desc"),e.classList.add("card__text"),r.textContent=a,c.textContent=o,s.style.backgroundColor=o,e.append(r),e.append(c),t.prepend(s),t.append(e),t},x={title:"Component/Colors",tags:["autodocs"],argTypes:{}},f=({...a})=>_({...a}),n=f.bind({});n.argTypes={};var p,u,i;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`({
  ...args
}) => {
  return createColors({
    ...args
  });
}`,...(i=(u=n.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const h=["DefaultColors"];export{n as DefaultColors,h as __namedExportsOrder,x as default};
