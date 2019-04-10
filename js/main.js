// Project: VideoGame JS - The Price Is Right
let frames  = 0
let turno   = 0
// let active = false
//let interval
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
const scores = (player) => {
  player.score++
}
const gaming = (element,Product,startGame) => {
  document.addEventListener('keydown',e =>{
    switch(e.keyCode){
      case 37:
        if(e.keyCode == 37) {
          console.log(element)
          if (element.rndSort[0] === element.price) console.log("ganaste")
          if(element.rndSort[1] === element.price) console.log("perdiste")
          //alert("Right 37")
          // element.draw_out()
          // decision.draw()
          setTimeout(()=>{
            element = new Product(products[rnd(products.length)])
            startGame()
          },1000)
        }
        break
        case 39:
        if(e.keyCode == 39) {
          console.log(element)
          if (element.rndSort[1] === element.price) console.log("ganaste")
          if(element.rndSort[0] === element.price) console.log("perdiste")
          //alert("Right 37")
          // decision.draw()
          setTimeout(()=>{
            element = new Product(products[rnd(products.length)])
            startGame()
          },1000)
        }
        break
    }
  })
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
// setTimeout(()=>{
//   alert("Your browser does not support the HTML5 canvas tag.")
// },5000)

window.onload = function(){

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
}
class Product {
  constructor(arr){
    this.name       = arr.name
    this.price      = arr.price.toFixed(2)
    this.fakePrice  = Number(arr.price * ((rndPrice(35)/100)+1)).toFixed(2)
    this.store      = arr.store
    this.rndSort    = rnd(0.5) ? [this.price, this.fakePrice] : [this.fakePrice, this.price]
    this.incomey    = -760
    this.incomeX    = -340
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
    // ctx.fillRect(250,370,300,40)
    ctx.fillRect(this.incomeX,370,300,40)
    // ctx.fillRect(this.incomeX,365,300,30)

    ctx.fillStyle = 'white'
    ctx.font = "20px Arial";
    // ctx.fillText(this.name,this.incomeX,380,300,80)
    // ctx.fillText(this.name,250,395,300,80)
    ctx.fillText(this.name,this.incomeX,395,300,80)

    ctx.fillStyle = 'grey'
    // ctx.fillRect(250,410,100,40)
    ctx.fillRect(this.incomeX,410,100,40)
    ctx.fillStyle = 'white'
    ctx.fillText("$ "+this.rndSort[0],this.incomeX+15,435,100,40)

    ctx.fillStyle = 'grey'
    ctx.fillRect(this.incomeX+200,410,100,40)
    ctx.fillStyle = 'white'
    ctx.fillText("$ "+this.rndSort[1],this.incomeX+215,435,100,40)
  }
  draw_out(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
  }
}
class Decision{
  constructor(decision){
    this.decision = decision
    this.x      = 0
    this.y      = 0
    this.limits = [320,265]
    this.wrong  = new Image()
    this.wrong.src = images.wrong
    this.wrong.onload = ()=>{
      this.draw()
    }
    this.correct  = new Image()
    this.correct.src = images.correct
    this.correct.onload = ()=>{
      this.draw()
    }
  }
  draw(){
    // if(this.x >= this.limits[0] || this.y >= 300  - this.limits[1]/2){this.x = 400-this.limits[0]/2,this.y=300 -this.limits[1]/2}
    // this.x+=5
    // this.y+=5
    //   if(this.decision == 'w'){
    //   ctx.drawImage(this.wrong,this.x-this.limits[0],this.y-this.limits[1],this.limits[0],this.limits[1])
    //   //ctx.drawImage(this.wrong,this.x,this.y,this.limits[0],this.limits[1])
    //   //ctx.drawImage(this.wrong,400,300,320,265)
    // }else if(this.decision == 'c'){
    //   this.x+=5
    //   this.y+=5
    //   if(this.x >= 400 - this.limits[0]/2 || this.y >= 300  - this.limits[1]/2){this.x = 400-this.limits[0]/2,this.y=300 -this.limits[1]/2}
    //   ctx.drawImage(this.correct,this.x-this.limits[0],this.y-this.limits[1],this.limits[0],this.limits[1])
    // }
  }
}
let decision = new Decision('w')
let board = new Board()
let product = new Product(products[rnd(products.length)])

function update(){
  ctx.clearRect(0,0,canvas.width, canvas.height)
  board.draw_start()
  product.draw()
  frames++
  
}
function startGame(){
  setInterval(update,1000/60)
  
}
document.getElementById('startG').onclick = function(){
  // debugger
  //ctx.clearRect(0,0,canvas.width, canvas.height)
  //product.draw_out()
  startGame()
  document.getElementById('startG').innerText = "Nuevo"
  product = new Product(products[rnd(products.length)])
  gaming(product,Product,startGame)
  
}
  // if(sendKey() == 37){
  //   console.log("Correct")
  //   startGame()
  //   product = new Product(products[rnd(products.length)])
    
  // }
  // if(sendKey() == 39){
  //   startGame()
  //   product = new Product(products[rnd(products.length)])

  // }
}