import SoundVisualizer from "../playground/sound/soundvisualizer.js";


window.onload = () => {
  const canvas = document.getElementById('animationCanvas')
  const soundVisualizer = new SoundVisualizer(canvas);
  
  const file = document.getElementById('fileupload')
  const audio1 = document.getElementById('audio1')
  
  file.addEventListener('change', () => {
    console.log(`file`, file.files)
    const files = file.files
    audio1.addEventListener('play', () => {
      console.log("Audio started playing")
    })
    audio1.addEventListener('ended', () => {
      console.log("Audio ended")
    })
    audio1.addEventListener('loadeddata', () => {
      console.log("Data loaded")
    })
    audio1.src = URL.createObjectURL(files[0])
    audio1.load()
    soundVisualizer.play(audio1)
  })
} 