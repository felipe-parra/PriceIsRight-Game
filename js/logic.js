class Player{
  constructor(name){
    this.name   = name
    this.turn   = 0
    this.score  = 0
    this.answer = [0,0,0]
  }
}
let player1 = new Player("Sth")
let player2 = new Player("Fny")

class Decision{
  constructor(){
    this.x      = 0
    this.y      = 0
    this.add    = 0
    this.limits = [80,65]
    this.pos    = [35,105,175,275,345,415]
    this.wrong  = new Image()
    this.wrong.src = images.wrong
    this.wrong.onload = ()=>{
      this.draw_p1()
      this.draw_p2()
    }
    this.correct  = new Image()
    this.correct.src = images.correct
    this.correct.onload = ()=>{
      this.draw_p1()
      this.draw_p2()
    }
  }
  draw(turno,decision){
    ctx.strokeRect(45,5,170,430)
    ctx.font = "20px Arial"
    ctx.fillStyle = "Black"
    ctx.fillText("Player 1",55,25,80)
    ctx.fillText("Player 2",55,265,80)

  }
  draw_p1(turno,decision){
    if (turno == 1 && decision == 'c') {
      ctx.drawImage(this.correct, this.limits[0],this.pos[0],this.limits[0],this.limits[1])
    }else if(turno == 1 && decision == 'w'){
      ctx.drawImage(this.wrong, this.limits[0],this.pos[0],this.limits[0],this.limits[1])
    }
    if (turno == 2 && decision == 'c') {
      ctx.drawImage(this.correct, this.limits[0],this.pos[1],this.limits[0],this.limits[1])
    } else if(turno == 2 && decision == 'w'){
      ctx.drawImage(this.wrong, this.limits[0],this.pos[1],this.limits[0],this.limits[1])
    }
    if (turno == 3  && decision == 'c') {
      ctx.drawImage(this.correct, this.limits[0],this.pos[2],this.limits[0],this.limits[1])
    } else if(turno == 3 && decision == 'w'){
      ctx.drawImage(this.wrong, this.limits[0],this.pos[2],this.limits[0],this.limits[1])
    }
  }
  draw_p2(turno,decision){
    if (turno == 1 && decision == 'c') {
      ctx.drawImage(this.correct, this.limits[0],this.pos[3],this.limits[0],this.limits[1])
    }else if(turno == 1 && decision == 'w'){
      ctx.drawImage(this.wrong, this.limits[0],this.pos[3],this.limits[0],this.limits[1])
    }
    if (turno == 2 && decision == 'c') {
      ctx.drawImage(this.correct, this.limits[0],this.pos[4],this.limits[0],this.limits[1])
    } else if(turno == 2 && decision == 'w'){
      ctx.drawImage(this.wrong, this.limits[0],this.pos[4],this.limits[0],this.limits[1])
    }
    if (turno == 3  && decision == 'c') {
      ctx.drawImage(this.correct, this.limits[0],this.pos[5],this.limits[0],this.limits[1])
    } else if(turno == 3 && decision == 'w'){
      ctx.drawImage(this.wrong, this.limits[0],this.pos[5],this.limits[0],this.limits[1])
    }
  }
}
class Timer{
  constructor(){
    this.x = 0
    this.y = 0
    this.timer = 10
  }
  draw(frame){
    if(frame%100 == 0) {
      this.timer = 10 - (frame/100)
      ctx.fillStyle = 'green'
      ctx.stroke()
    } else if(frame > 620){
      ctx.fillStyle = 'red'
      ctx.fill()
    }
    else{
      ctx.fillStyle = 'green'
      ctx.fill()
    }
    if(this.timer < 0){this.timer = 10}
    ctx.beginPath()
    ctx.arc(690, 55, 50, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.font = '30px Arial'
    ctx.fillText(this.timer,680,62,40,40)
  }
}
class Out{
  constructor(){
    this.y = 0
    this.x = 0
  }
  draw(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }
}
