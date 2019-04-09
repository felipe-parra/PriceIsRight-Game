// Project: VideoGame JS - The Price Is Right

window.onload = function(){
  
let frames = 0
let interval
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const sound = {
  lounge: './media/lounge.mp3',
  gaming: './media/soundtrack.mp3'
}
const images = {
  logo: './media/logo_en.png'  
}

class Board{
  constructor(img){
    this.x        = 0 
    this.y        = 0
    this.height   = canvas.height
    this.width    = canvas.width
    this.audio = new Audio()
    this.audio.src = sound.lounge
    this.audio.loop = true
    this.img      = new Image()
    this.img.src  = img
    this.img.onload = () => {
      this.draw_start()
    }
  }
  draw(){
    
  }
  draw_start(){
    
    if(this.y < this.height){
      this.y+=5
    }else{
      this.y = this.height
    }
    ctx.drawImage(
      this.img,
      (canvas.width/2)-175,
      this.y,
      350,
      350
      )
  }
}
class Player{
  constructor(h,w){
    this.x        = 0
    this.y        = 0
    this.height   = h
    this.width    = w
    this.corrects = 0
    this.roulette = 0
  }
}
let board = new Board(images.logo)

function update(){
  ctx.clearRect(0,0,canvas.width, canvas.height)
  board.draw()
  board.draw_start()

}
function startGame(){
  if(interval) return
    setInterval(update,1000/60)
}
document.getElementById("startG").addEventListener("click", function(){
  console.log('click');
  startGame()
})
document.getElementById('startG').onclick = function(){
  startGame()
  console.log('startgame');
  document.addEventListener('keydown',e => {
    switch (e.keyCode){
      case 13: 
      console.log('14');
    }
    })
  }
  
}