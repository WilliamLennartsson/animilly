
export default class SoundVisualizer {
  constructor(canvas, audioSource) {
    this.setupCanvas(canvas)
  }
  setupCanvas(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 150;
    this.ctx = this.canvas.getContext("2d");
  }
  setupAudio(audio) {

  }
  play(audio) {
    this.audioContext = new AudioContext();
    audio.play()
    this.audioSource = this.audioContext.createMediaElementSource(audio);
    this.analyser = this.audioContext.createAnalyser();
    this.audioSource.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
    this.analyser.fftSize = 64
    const bufferLength = this.analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = this.canvas.width / bufferLength

    let barHeight
    let x
    const animate = () => {
      x = 0
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.analyser.getByteFrequencyData(dataArray)
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight)
        x += barWidth
      }
      requestAnimationFrame(animate)
    }
    animate()
  }
}
