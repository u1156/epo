let e=[],t={time1:0,time2:0,time3:0,time4:0,weekend:!1};function i(){document.getElementById("time1").value=this.getAttribute("data-tariff1"),document.getElementById("time2").value=this.getAttribute("data-tariff2"),document.getElementById("time3").value=this.getAttribute("data-tariff3"),document.getElementById("time4").value=this.getAttribute("data-tariff4"),"1"===this.getAttribute("data-weekend")?document.getElementById("weekend").checked=!0:document.getElementById("weekend").checked=!1}document.getElementById("csvFile").addEventListener("change",function(t){Papa.parse(t.target.files[0],{header:!0,dynamicTyping:!0,complete:function(t){e=t.data}})}),document.getElementById("calculate").addEventListener("click",function(){let i,a,l;if(t.time1=document.getElementById("time1").value,t.time2=document.getElementById("time2").value,t.time3=document.getElementById("time3").value,t.time4=document.getElementById("time4").value,t.weekend=document.getElementById("weekend").checked,0===e.length){alert("Please select a CSV file");return}if(!t.time1||!t.time2||!t.time3||!t.time4){alert("Please set all the tariff values");return}if(isNaN(t.time1)||isNaN(t.time2)||isNaN(t.time3)||isNaN(t.time4)){alert("Please set all the tariff values to numbers only");return}if(t.time1<0||t.time2<0||t.time3<0||t.time4<0){alert("Please set all the tariff values to positive numbers");return}document.querySelector(".table-hr").style.display="block",i=0,a={},l={},e.forEach(e=>{if(!e.Date)return;let n=new Date(e.Date.split("/").reverse().join("-")),d=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`,m=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;for(let o in d in a||(a[d]=0),m in l||(l[m]={time1:{kwh:0,cost:0},time2:{kwh:0,cost:0},time3:{kwh:0,cost:0},time4:{kwh:0,cost:0},totalKwh:0,total:0}),e){if(!e.hasOwnProperty(o)||!o.includes(":"))continue;let r=parseFloat(e[o]);isNaN(r)&&(r=0);let c=(o>="02:00"&&o<"04:00"?parseFloat(t.time4):o>="08:00"&&o<"23:00"&&1===n.getDay()&&t.weekend?parseFloat(0):o>="17:00"&&o<"19:00"?parseFloat(t.time2):o>="08:00"&&o<"23:00"?parseFloat(t.time1):parseFloat(t.time3))*r/100;a[d]+=c,i+=c,o>="02:00"&&o<"04:00"?(l[m].time4.kwh+=r,l[m].time4.cost+=c):o>="17:00"&&o<"19:00"?(l[m].time2.kwh+=r,l[m].time2.cost+=c):o>="08:00"&&o<"23:00"?(l[m].time1.kwh+=r,l[m].time1.cost+=c):(l[m].time3.kwh+=r,l[m].time3.cost+=c),l[m].total+=c,l[m].totalKwh+=r}}),function(e,t,i){let a=document.getElementById("tableBody");a.innerHTML="";let l=document.createElement("tr");l.innerHTML=`<td colspan="2">Total</td><td>${e.toFixed(2)}</td>`,a.appendChild(l),Object.keys(t).sort().forEach(e=>{let[i,l]=e.split("-"),n=new Date(i,l-1,1),d=new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric"}).format(n),m=document.createElement("tr");m.innerHTML=`<td colspan="2">${d}</td><td>${t[e].toFixed(2)}</td>`,a.appendChild(m)});let n={time1:"08:00 to 23:00",time2:"17:00 to 19:00",time3:"23:00 to 08:00",time4:"02:00 to 04:00"};for(let e in i){let t=document.createElement("tr"),l='<div style="display:flex;">';for(let t in i[e]){if("total"===t||"totalKwh"===t)continue;let a=i[e][t];l+=`<div class="timePeriod"><h3>${n[t]}</h3><p>${a.kwh.toFixed(2)} kwh</p><p>${a.cost.toFixed(2)} &euro;</p></div>`}l+=`
        <div class="timePeriod">
            <h3>Total</h3>
            <p>${i[e].totalKwh.toFixed(2)} kwh</p>
            <p>${i[e].total.toFixed(2)} &euro;</p>
        </div></div>`,t.innerHTML=`<td>${e}</td><td colspan="2">${l}</td>`,a.appendChild(t)}}(i,a,l)}),document.querySelectorAll(".tariff-buttons button").forEach(e=>e.addEventListener("click",i));