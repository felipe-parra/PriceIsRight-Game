class Player{
  constructor(name){
    this.name  = name
    this.turno = 0
  }
}
class Board{
  constructor(){
    this.x        = 0 
    this.y        = 0
    this.outLeft  = 0
    this.outRight = 0
    this.height   = canvas.height
    this.width    = canvas.width
    this.audio = new Audio()
    this.audio.src = sound.lounge
    this.audio.loop = true
    this.back = new Image()
    this.back.src   = images.backgroundSquare
    this.back.onload = () => {
      this.draw_start()
    }
    this.img      = new Image()
    this.img.src  = images.logo
    this.img.onload = () => {
      this.draw_start()
    }
  }
  draw(){
    
  }
  draw_start(){
    ctx.drawImage(this.back,this.outRight+400,0,400,600)
    ctx.drawImage(this.back,this.outLeft+10,0,400,600)
    if(this.y < this.height){
      this.y+=5
    }else{
      this.y = this.height
    }
    ctx.drawImage(this.img,(canvas.width/2)-175,this.y,350,350)
    this.outLeft-=5
    this.outRight+=5
    if(this.outLeft < -400 && this.outRight > 400){
      this.outRight = 400
      this.outLeft = - 410
    }
  }
}
let player1 = new Player("Mau")
let player2 = new Player("Sth")
