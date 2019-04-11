// Project: VideoGame JS - The Price Is Right
// Developed by Felipe Parra

// GLOBAL VARIABLES
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames  = 0
let turno   = 0
const soundPlayer = document.querySelector('source')
const images = {
  logo:     './media/logo_en.png',
  wrong:    './media/wrong.png',
  correct:  './media/correct.png',
  backgroundSquare: './media/background.jpg'
}
const sound = {
  lounge: './media/lounge.mp3',
  gaming: './media/soundtrack.mp3'
}

let participacion = false;

// HELPER FUNCTIONS
const scores = (player) => {
  player.score += 1
}
const turns = (player) =>{
  player.turn++
}

const rnd = (range) => {
  let value = Math.floor(Math.random()*range)
  return value
}
const rndPrice = (range) => {
  let value = Math.floor(Math.random()*range)
  return value == 0 ? 10 : value
}

const validateAns = (key,correctSide) => {
  if(key == correctSide){
    return "Correct"
  }else{
    return "Wrong"
  }
}

window.onload = function(){

class Board{
  constructor(){
    this.x        = 0 
    this.y        = 0
    this.outLeft  = 0
    this.outRight = 0
    this.inLeft  = -400
    this.inRight = 800
    this.height   = canvas.height
    this.width    = canvas.width
    this.audio = new Audio()
    this.audio.src = sound.lounge
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
    ctx.drawImage(this.back,this.inRight,0,400,600)
    ctx.drawImage(this.back,this.inLeft,0,400,600)
    this.inRight  -=  5
    this.inLeft   +=  5
    if (this.inRight <= 400 && this.inLeft >=0) {
      this.inRight  = 400
      this.inLeft   = 0 
    }
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
    this.outLeft  -=  5
    this.outRight +=  5
    if(this.outLeft < -400 && this.outRight > 400){
      this.outRight = 400
      this.outLeft  = -410
    }
  }
  out(){
    ctx.drawImage(this.back,0,0,400,600)
    ctx.drawImage(this.back,0,0,400,600)
    // this.inRight  -=  5
    // this.inLeft   +=  5
    // if (this.inRight <= 400 && this.inLeft >=0) {
    //   this.inRight  = 400
    //   this.inLeft   = 0 
    // }
  }
}
class Product {
  constructor(arr){
    this.name       = arr.name.toUpperCase()
    this.price      = arr.price.toFixed(2)
    this.fakePrice  = Number(arr.price * ((rndPrice(35)/100)+1)).toFixed(2)
    this.store      = arr.store
    this.rndSort    = rnd(0.5) ? [this.price, this.fakePrice] : [this.fakePrice, this.price]
    this.incomey    = -760
    this.incomeX    = -340
    this.timing     = 10
    this.outcome    = canvas.height
    this.img        = new Image()
    this.img.src    =  arr.img
    this.img.onload = () => {
      this.draw()
    }
  }
  draw(){
    if(this.incomey >= 10){this.incomey = 10}
    this.incomey+=5
    if(this.incomeX >= 250){this.incomeX = 245}
    this.incomeX+=5
    ctx.strokeRect(250,this.incomey,300,350)
    ctx.drawImage(this.img,250,this.incomey,300,350)
    
    ctx.fillStyle = '#f26822'
    ctx.fillRect(this.incomeX,370,300,40)
    ctx.fillStyle = 'white'
    ctx.font = "20px Arial";
    ctx.fillText(this.name,this.incomeX,395,300,80)
    
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.incomeX-2,15,95,40)
    ctx.fillStyle = 'white'
    ctx.font = "20px Arial";
    ctx.fillText(this.store,this.incomeX+5,40,80,80)

    ctx.fillStyle = 'grey'
    ctx.fillRect(this.incomeX,410,100,40)
    ctx.fillStyle = 'white'
    ctx.fillText("$ "+this.rndSort[0],this.incomeX+15,435,80,40)

    ctx.fillStyle = 'grey'
    ctx.fillRect(this.incomeX+200,410,100,40)
    ctx.fillStyle = 'white'
    ctx.fillText("$ "+this.rndSort[1],this.incomeX+215,435,80,40)
  }
}

let decision  = new Decision()
let board     = new Board()
let product   = new Product(products[rnd(products.length)])
let timer     = new Timer()
let out       = new Out()

function update(){
  if(frames == 1000) {
    frames = 0
    product = new Product(products[rnd(products.length)])
    turno++
    player1.turn = turno
    player2.turn = turno
  }
  ctx.clearRect(0,0,canvas.width, canvas.height)
  board.draw_start()
  product.draw()
  decision.draw_correct_p1(player1.turn)
  decision.draw_wrong_p1(player1.turn)
  decision.draw_correct_p2(player2.turn)
  decision.draw_wrong_p2(player2.turn)
  timer.draw(frames)
  decision.draw()
  frames++
}
function startGame(){
  setInterval(update,1000/60)
}
document.addEventListener('keypress', e =>{if(e.keyCode == 32){startGame()} })
document.getElementById('startG').onclick = function(){
    startGame()
    function newProduct(){
      product = new Product(products[rnd(products.length)])
      return product
    }
    document.getElementById('startG').innerText = "Nuevo"
    console.log(player1);
    document.addEventListener('keydown',e =>{
      console.log(e);
      if(player1.turn >= 3 || player2.turn >= 3) {
        out.draw()
        board.draw()
      }
      switch(e.keyCode){  
        case 37:
          if(e.keyCode == 37) {
            if (product.rndSort[0] === product.price) {
              frames = 999
              console.log("win")
              player1.turn++
              console.log(player.turn + " < ");
              if (player.turn == 1) {
                decision.draw_correct_p1(player1.turn)
              }
              else if (player.turn == 2) {
                decision.draw_correct_p1(player1.turn)
              } else if(player1.turn == 3){
                decision.draw_correct_p1(player1.turn)
              }
            }
            if(product.rndSort[1] === product.price) {
              frames = 999
              participacion = false
              console.log("lose")
              player1.turn++
              console.log(player1.turn + " < ");
              if (player1.turn == 1) {
                decision.draw_wrong_p1(player1.turn)
              }
              else if (player1.turn == 2) {
                decision.draw_wrong_p1(player1.turn)
              } else if(player1.turn == 3){
                decision.draw_wrong_p1(player1.turn)
              }
            }
          }
          break
          case 39:
          if(e.keyCode == 39) {
            if (product.rndSort[1] === product.price){
              frames = 999
              participacion = false
              console.log("ganaste")
              player1.turn++
              console.log(player1.turn + " < ");
              if (player1.turn == 1) {
                decision.draw_correct_p1(player1.turn)
              }
              else if (player1.turn == 2) {
                decision.draw_correct_p1(player1.turn)
              } else if(player1.turn == 3){
                decision.draw_correct_p1(player1.turn)
              }
            }
            if(product.rndSort[0] === product.price){
              frames = 999
              participacion = false 
              console.log("perdiste")
              player1.turn++
              console.log(player1.turn + " < ");
              if (player.turn == 1) {
                decision.draw_wrong_p1(player1.turn)
              }
              else if (player1.turn == 2) {
                decision.draw_wrong_p1(player1.turn)
              } else if(player1.turn == 3){
                decision.draw_wrong_p1(player1.turn)
              }

            }
          }
          break
      }
    })
  }
}
