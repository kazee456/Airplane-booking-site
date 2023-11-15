// const { get } = require("mongoose");

//time at the bottom of the page
setInterval(()=>{
   var date = document.querySelector("#date");
   date.innerHTML = Date();  
},1000);


var bookflight = document.querySelector("#bookflight");
bookflight.addEventListener('click',()=>{
   var container = document.querySelector("#inquiryContainer");
   var xhr = new XMLHttpRequest();
   xhr.open('GET','/booking',true);

   xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4 && xhr.status === 200){
         container.innerHTML = xhr.responseText;
      }
   };

   xhr.send();
});


var inquiry = document.querySelector("#inquiry");
inquiry.addEventListener('click',()=>{
   var container = document.querySelector("#inquiryContainer");
   var xhr = new XMLHttpRequest();
   xhr.open('GET','/booking/inquiry',true);

   xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4 && xhr.status === 200){
         container.innerHTML = xhr.responseText;
      }
   }
   xhr.send();
});


var bookingStatus = document.querySelector("#checkStatus");
bookingStatus.addEventListener('click',()=>{
   var container = document.querySelector("#bookingStatus");
   var xhr = new XMLHttpRequest();
   xhr.open('POST','/booking/inquiry',true);

   xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4 && xhr.status === 200){
         container.innerHTML = xhr.responseText;
      }
   }

   xhr.setRequestHeader('content-Type','multipart/form-data');
   xhr.send();
});


// //dark theme switch
// let theme = document.querySelector("#theme");
// theme.addEventListener('click',()=>{
   
// });
