import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as b,i as C}from"./assets/vendor-77e16229.js";const l=document.querySelector("#datetime-picker"),e=document.querySelector("[data-start]"),u=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),m=document.querySelector("[data-seconds]");let n,h;e.disabled=!0;const w={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){n=t[0],console.log(n),n<new Date?(C.error({title:"Error",message:"Please choose a date in the future",position:"topRight",titleColor:"#fff",messageColor:"#fff",color:"#ef4040",iconUrl:"../img/bi_x-octagon.png"}),e.disabled=!0):e.disabled=!1}};b("#datetime-picker",w);e.addEventListener("click",function(){this.disabled=!0,l.disabled=!0,h=setInterval(function(){let t=new Date().getTime(),r=n-t;if(r<0){clearInterval(h),u.textContent="00",f.textContent="00",p.textContent="00",m.textContent="00",e.disabled=!0,l.disabled=!1;return}let{days:s,hours:d,minutes:c,seconds:a}=E(r);u.textContent=o(s),f.textContent=o(d),p.textContent=o(c),m.textContent=o(a)},1e3)});function E(t){const a=Math.floor(t/864e5),x=Math.floor(t%864e5/36e5),g=Math.floor(t%864e5%36e5/6e4),y=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:x,minutes:g,seconds:y}}function o(t){return String(t).padStart(2,"0")}const i=document.createElement("style");i.type="text/css";const k=`
body {
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: #2e2f42;
}
#datetime-picker {
  border-radius: 4px;
  width: 280px;
  height: 40px;
  padding-left: 16px;
  margin-bottom: 32px;
}
[data-start] {
  border-radius: 8px;
  padding: 8px 16px;
  width: 75px;
  height: 40px;
  background: #4e75ff;
  border: none;
  font-weight: 500;
  color: #fff;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
[data-start]:hover {
    background: #6c8cff;
}
[data-start]:disabled {
    background: #cfcfcf;
    color: #989898;
}
.timer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  gap: 24px;
  width: 346px;
}
.field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0px;
}
.value {
  font-size: 40px;
  line-height: 1.2;
}
.label {
  text-transform: uppercase;
}`;i.appendChild(document.createTextNode(k));document.head.appendChild(i);
//# sourceMappingURL=commonHelpers.js.map
