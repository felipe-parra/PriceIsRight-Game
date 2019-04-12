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
  winner:  './media/winner.png',
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
    this.x           = 0 
    this.y           = 0
    this.outLeft     = 0
    this.outRight    = 0
    this.inLeft      = -400
    this.inRight     = 800
    this.height      = canvas.height
    this.width       = canvas.width
    this.audio       = new Audio()
    this.audio.src   = sound.lounge
    this.back        = new Image()
    this.back.src    = images.backgroundSquare
    this.back.onload = () => {
      this.draw_start()
    }
    this.img        = new Image()
    this.img.src    = images.logo
    this.img.onload = () => {
      this.draw_start()
    }
    this.win        = new Image()
    this.win.src    = images.winner
    this.win.onload = () =>{
      this.draw()
    }
  }
  draw(winner){
    ctx.drawImage(this.back,this.inRight,0,400,600)
    ctx.drawImage(this.back,this.inLeft,0,400,600)
    ctx.drawImage(this.img,(canvas.width/2)-125,10,250,250)  
    ctx.fillStyle = 'white'
    ctx.fillRect((canvas.width/2)-160,this.inRight-130,300,150)
    ctx.fillStyle = 'black'
    ctx.font = 'Bold 25px Arial'
    ctx.fillText(winner,330,this.inRight,100,100)
    ctx.drawImage(this.win,(canvas.width/2)-120,270,200,112)
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
    ctx.clearRect(0,0,canvas.width, canvas.height)
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
    this.rndSort    = rnd(2) ? [this.price, this.fakePrice] : [this.fakePrice, this.price]
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
  player1.draw()
  if(frames == 1000) {
    frames = 0
    product = new Product(products[rnd(products.length)])
    turno++
    player1.turn = turno
    player2.turn = turno
  }
  ctx.clearRect(0,0,canvas.width, canvas.height)
  board.draw_start()
  
  if(player1.answer[0] != 0){
    decision.draw_p1(1,player1.answer[0])
  }
  if(player1.answer[1] != 0){
    decision.draw_p1(2,player1.answer[1])
  }
  if(player1.answer[2] != 0){
    decision.draw_p1(3,player1.answer[2])
  }
  if(player2.answer[0] != 0){
    decision.draw_p2(1,player2.answer[0])
  }
  if(player2.answer[1] != 0){
    decision.draw_p2(2,player2.answer[1])
  }
  if(player2.answer[2] != 0){
    decision.draw_p2(3,player2.answer[2])
  }
  if(player1.turn >= 3 || player2.turn >= 3) {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    // decision.draw(true)
    if(player1.score > player2.score){
      board.draw('Player 1')
      frames = 500
    }else if(player2.score > player1.score){
      board.draw('Player 2')
      frames = 500
    } else{
      board.draw(`It's a TIE`)
      frames = 500
    }
    frames++
    // if (frames >= 500) {
    //   board.draw_start()
    // }
  }else{
    product.draw()
    timer.draw(frames)
    decision.draw(false)
  }
  frames++
}
function startGame(){
  setInterval(update,1000/60)
}
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
      
      if (player2.turn >=3 || player1.turn >=3) {
        console.log('Game Over');
      } else{
      switch(e.keyCode){  
        case 37:
          if(e.keyCode == 37) {
            if (product.rndSort[0] === product.price) {
              frames = 999
              console.log("win")
              player1.answer[player1.turn] = 'c'
              player1.turn++
              player1.score++
            }
            if(product.rndSort[1] === product.price) {
              frames = 999
              participacion = false
              console.log("lose")
              player1.answer[player1.turn] = 'w'
              player1.turn++
              console.log(player1.turn + " < ");
            }
          }
          break
          case 39:
          if(e.keyCode == 39) {
            if (product.rndSort[1] === product.price){
              frames = 999
              participacion = false
              console.log("ganaste")
              player1.answer[player1.turn] = 'c'
              player1.turn++
              player1.score++
            }
            if(product.rndSort[0] === product.price){
              frames = 999
              participacion = false 
              console.log("perdiste")
              player1.answer[player1.turn] = 'w'
              player1.turn++
              console.log(player1.turn + " < ");

            }
          }
          break
          case 65:
          if(e.keyCode == 65) {
            if (product.rndSort[0] === product.price) {
              frames = 999
              player1.answer[player2.turn] = 'c'
              player1.turn++
              player2.score++
            }
            if(product.rndSort[1] === product.price) {
              frames = 999
              participacion = false
              console.log("lose")
              player2.answer[player2.turn] = 'w'
              player2.turn++
              console.log(player2.turn + " < ");
            }
          }
          break
          case 68:
          if(e.keyCode == 68) {
            if (product.rndSort[1] === product.price) {
              frames = 999
              console.log("win")
              player2.answer[player2.turn] = 'c'
              player2.turn++
              player2.score++
            }
            if(product.rndSort[0] === product.price) {
              frames = 999
              participacion = false
              console.log("lose")
              player2.answer[player2.turn] = 'w'
              player2.turn++
              console.log(player2.turn + " < ");
            }
          }
          break
      }
    }
    })
  }
}
