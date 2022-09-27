let divSelectRoom=document.getElementById("selectRoom")
let divConsultingRoom=document.getElementById("consultingRoom")
let inputRoomNumber=document.getElementById("roomNumber")
let btnGoRoom=document.getElementById("goRoom")
let localVideo=document.getElementById("localVideo")
let remoteVideo=document.getElementById("remoteVideo")


let roomNumber,localStream,remoteStream,rtcPeerConnection,isCaller

const iceServer = {
    'iceServer':[
        {'urls':'stun:stun.services.morzilla.com'},
        {'urls':'stun:stun.l.google.com:19302'}
    ]
}

const streamConstraints ={
    // audio:true,
    video:true
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
        divConsultingRoom.style='display:block'
    }
    console.log('end of btn go')
}

socket.on('created',room=>{
    navigator.mediaDevices.getUserMedia(streamConstraints)
        .then(stream=>{
            localStream=stream
            localVideo.srcObject=stream
            isCaller=true
        })
        .catch(err=>{
            alert(`An error occured ${err}`)
        })  
    console.log(room)
})

