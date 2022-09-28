let divSelectRoom=document.getElementById("selectRoom")
let divConsultingRoom=document.getElementById("consultingRoom")
let inputRoomNumber=document.getElementById("roomNumber")
let btnGoRoom=document.getElementById("goRoom")
let localVideo=document.getElementById("localVideo")
let remoteVideo=document.getElementById("remoteVideo")
let cover_class = document.getElementsByClassName("cover-class");
let cover_id = document.getElementById("cover-id")
let btn_on = document.getElementById("btn-on")
let btn_off = document.getElementById("btn-off");
let btn_container = document.getElementById("btn-container");
let voice_btn_off = document.getElementById("voice-btn-off");
let voice_btn_on = document.getElementById("voice-btn-on");

let roomNumber,localStream,remoteStream,rtcPeerConnection,isCaller

const iceServer = {
    'iceServer':[
        {'urls':'stun:stun.services.morzilla.com'},
        {'urls':'stun:stun.l.google.com:19302'}
    ]
}


function closeVideo(){
    location.reload();
}

function voiceToggle(v){
    if (v == 1) {
      console.log("IF");

      voice_btn_on.classList.add("hidden");
      
      voice_btn_off.classList.remove("hidden");
      
      voice_btn_on.style.zIndex = 0;
      
      voice_btn_off.style.zIndex = 1111;



    } else {
      console.log("ELSE");
      
      voice_btn_on.classList.remove("hidden");
      
      voice_btn_off.classList.add("hidden");
      
      voice_btn_on.style.zIndex = 1111;
      
      voice_btn_off.style.zIndex = 0;
    }
}


function toggle(v){
    btn_container.classList.remove("display-hidden");
    // var vidFlag = 0;
    console.log("WORKING");
    const streamConstraints = {
      // audio:true,
      video: true,
    };
    if(v==1)
    {
        navigator.mediaDevices
          .getUserMedia(streamConstraints)
          .then((stream) => {
            localStream = stream;
            localVideo.srcObject = stream;
            isCaller = true;
          })
          .catch((err) => {
            alert(`An error occured ${err}`);
          });
          cover_id.classList.remove("back-img")

        console.log("IF");
        btn_on.classList.add("hidden");
        btn_off.classList.remove("hidden");
        btn_on.style.zIndex = 0;
        btn_off.style.zIndex = 1111;
    }
    else{
        cover_id.classList.add("back-img");
        console.log("ELSE");
        btn_on.classList.remove("hidden");
        btn_off.classList.add("hidden");
        btn_on.style.zIndex = 1111;
        btn_off.style.zIndex = 0;
    }
    
}

const socket= io()

btnGoRoom.onclick = ()=>{
    if(inputRoomNumber.value === ''){
        alert('plz enter a valid room Id')
    }
    else{
        roomNumber=inputRoomNumber.value
        socket.emit('create or join',roomNumber)
        
        divSelectRoom.style='display:none'
        divConsultingRoom.style='display:flex'
    }
    console.log('end of btn go')
}

socket.on('created',room=>{
    voiceToggle(1);
    toggle(1);
})

