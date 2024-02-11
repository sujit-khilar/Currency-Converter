const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('form button');
const fromcurr=document.querySelector('.from select');
const tocurr=document.querySelector('.to select');
const msg=document.querySelector('.msg');

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement('option');
        newoption.innerText=currcode;
        newoption.value=currcode;
        select.append(newoption);
        if (select.name==='from' && currcode==='USD'){
            newoption.selected='selected';
        }else if(select.name==='to' && currcode==='INR'){
             newoption.selected='selected';
        }
        select.append(newoption)
    }
    select.addEventListener('change',(evt)=>{
        upadateflag(evt.target)
    })
}

const updateexchangerate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    console.log(amtval);
    if (amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }

    //console.log(fromcurr,tocurr);
    const url=`${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    // console.log(response);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    // console.log(rate);
    // console.log(amount);
    let finalamount=amtval*rate;
    msg.innerHTML=`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}

const upadateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newsrc;
}

// const updatemsg()

btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updateexchangerate();
})

window.addEventListener("load",()=>{
    updateexchangerate();
})