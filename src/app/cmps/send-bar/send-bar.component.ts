import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'send-bar',
  templateUrl: './send-bar.component.html',
  styleUrls: ['./send-bar.component.scss']
})
export class SendBarComponent {
  @Output() msgSended = new EventEmitter<string>()
  @Output() recMsgSended = new EventEmitter<string>()
  @Output() imgMsgSended = new EventEmitter<string>()

  newMessage: string = ''
  isRecording = false
  chunks: any[] = [];
  mediaRecorder!: MediaRecorder
  newRecord!: string
  isEmoji: boolean = false
  isCameraOn: boolean = false


  updateInput(ev: any) {
    this.newMessage = ev.target.innerText
console.log('this.newMessage',this.newMessage)
  }

  toggleKeyboard() {
    this.isEmoji = !this.isEmoji
  }

  toggleCamera() {
    console.log('bobobobob')
    this.isCameraOn = !this.isCameraOn
  }

  sendMsg(ev: any) {
    ev.preventDefault()
    if (!this.newMessage) return
    console.log('ev', ev)
    this.msgSended.emit(this.newMessage)
    this.newMessage = ''
  }



  async onRecord(ev: any) {
    this.isRecording = true
    let stream: any = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        // video: true,
        audio: true,
        // video: { width: 1280, height: 720, frameRate: 30, aspectRatio: 1.3333 }
        // To get a list of the supported constraints on the current device, run:
        // navigator.mediaDevices.getSupportedConstraints()
      })
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      console.log('this.mediaRecorder', this.mediaRecorder)
      this.mediaRecorder.start();

      this.mediaRecorder.ondataavailable = (event: any) => {
        console.log('event of the millenia', event)
        if (this.chunks.length) this.chunks.pop()
        this.chunks.push(event.data);
      }
      // let stopped = new Promise((resolve, reject) => {
      //   this.mediaRecorder.onstop = resolve;
      //   this.mediaRecorder.onerror = (event: any) => reject(event.name);
      // });
    } catch (err) {
      console.log(err)
      /* handle the error */
    }
  }

  async sendVoiceMsg(ev: Event) {
    this.mediaRecorder.stop()
    setTimeout(() => {
      console.log('this.chunks', this.chunks)
      const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });

      // console.log('blobbb', blob)

      // worked but downloaded unreadable file
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      // console.log('blob',blob)
      // console.log('reader',reader)
      reader.onloadend = () => {
        console.log('reader.result', reader.result)
        const dataURL: any = reader.result;
        // console.log(dataURL);
        // Use the data URL as the source for the audio element, or download it as a file

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "audio.ogg";
        link.style.display = "none";
        document.body.appendChild(link);
        // link.click();
        document.body.removeChild(link);

        // loading the dataurl inside the audio element 
        const audio: any = document.querySelector('audio');

        const source: any = document.querySelector('source');

        // const audioURL = window.URL.createObjectURL(blob);
        audio.src = dataURL;
        source.type = 'audio/ogg';
        audio.load()
        this.newRecord = dataURL
        console.log('dataURL', dataURL)
        this.recMsgSended.emit(this.newRecord)
      };
    }, 100);

    // const link = document.createElement("a");
    // link.href = audioURL;
    // link.download = "audio.wav";
    // link.style.display = "none";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);


    // audio.src = audioURL;
    // try {
    //   const stream = await navigator.mediaDevices.getUserMedia({
    //     audio: true,
    //   })
    //     .then((mediaStream) => {
    //       mediaStream.getTracks().forEach(track => track.stop());
    //       console.log('bobo')
    //       const video: any = document.querySelector('video');
    //       video.srcObject = mediaStream;
    //       video.onloadedmetadata = () => {
    //         // video.stop();
    //       }
    //     })
    //   /* use the stream */
    // } catch (err) {
    //   console.log(err)
    //   /* handle the error */
    // }
    // video.onloadedmetadata = () => {
    this.isRecording = false
    // video.stop();
    //   video.stopRecording();
    // }

    // this.recMsgSended.emit(this.newMessage)

  }

  sendPicture(imgDataUrl: string) {
    this.imgMsgSended.emit(imgDataUrl)
  }

}

// const videoTracks = stream.getVideoTracks()
// const track = videoTracks[0]
// alert(`Getting video from: ${track.label}`)
// const video: any = document.querySelector('video');
// video.srcObject = stream






//       this.mediaRecorder = new MediaRecorder(stream)
// console.log('mediaRecorder',this.mediaRecorder)
//         // Prompt the user to choose where to save the recording file.
//         const suggestedName = "microphone-recording.webm";
//         if(!window.showSaveFilePicker({ suggestedName }))console.log('bobobobobobob')
//         const handle = await window.showSaveFilePicker({ suggestedName });
//         console.log('writable')
//       const writable = await handle.createWritable();

//       this.mediaRecorder.start();
//       this.mediaRecorder.ondataavailable =  async (event) => {
//         // Write chunks to the file.
//         console.log('this.mediaRecorder.state',event)
//         await writable.write(event.data);
//         // const video: any = document.querySelector('video');
//       // video.srcObject = stream
//         if (this.mediaRecorder.state === "inactive") {
//           // Close the file when the recording stops.
//           await writable.close();
//         }
// }





// this.mediaRecorder.ondataavailable = (event) => {
//   console.log(event);

//   this.chunks.push(event.data);
// };

// console.log('bobo')
// const video:any = document.querySelector('video');
// video.srcObject = mediaStream;
// video.onloadedmetadata = () => {
//   video.play();
// }
// })
/* use the stream */
// navigator.mediaDevices.getUserMedia({
//   video: true
//  })