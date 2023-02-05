import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
@Output() imgSended = new EventEmitter<string>()
@Output() cameraClosed = new EventEmitter<string>()

  mediaRecorder!: MediaRecorder
  chunks: any[] = [];
  videoActive:boolean = true
  pictureTaken:boolean = false


async ngOnInit(){
  let stream: any = null;
  stream = await navigator.mediaDevices.getUserMedia({
    // video: true,
    // audio: true,
    video: { width: 1280, height: 720, frameRate: 30,aspectRatio:16/9}
    // To get a list of the supported constraints on the current device, run:
    // navigator.mediaDevices.getSupportedConstraints()
  })
  const videoTracks = stream.getVideoTracks()
// const track = videoTracks[0]
// alert(`Getting video from: ${track.label}`)
const video: any = document.querySelector('video');
video.srcObject = stream
video.click()
video.onloadedmetadata = () => {
  video.play();
}
// this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
// console.log('this.mediaRecorder',this.mediaRecorder)
// this.mediaRecorder.ondataavailable = (event: any) =>{
//   console.log('event of the millenia',event)
//   if(this.chunks.length)this.chunks.pop()
// this.chunks.push(event.data);
// } 
// this.mediaRecorder.start();


// let stopped = new Promise((resolve, reject) => {
//   this.mediaRecorder.onstop = resolve;
//   this.mediaRecorder.onerror = (event: any) => reject(event.name);
// });
}

takePicture(){
  this.pictureTaken=true
  setTimeout(() => {
    const canvas:any = document.querySelector('#canvas')
    console.log('canvas',canvas)
    const video:any = document.querySelector('video')
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let dataUrl = canvas.toDataURL('image/jpeg');
    this.videoActive = false
    this.imgSended.emit(dataUrl)

    // stop the video recording
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track:any) => {
      track.stop();
    });
  }, 1);
}

closeCamera(){
      // stop the video recording

  const video: any = document.querySelector('video');
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track:any) => {
    track.stop();
  });
this.cameraClosed.emit()
}
}
