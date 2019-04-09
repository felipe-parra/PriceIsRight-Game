// Project: VideoGame JS - The Price Is Right
let frames = 0
let active = false
//let interval
const soundPlayer = document.querySelector('source')
const images = {
  logo: './media/logo_en.png',
  backgroundSquare: './media/background.jpg'
}
const sound = {
  lounge: './media/lounge.mp3',
  gaming: './media/soundtrack.mp3'
}
const scores = (arr,player) => {
  array = arr
}
const gaming = (positionRight,element) => {
  document.addEventListener('keydown',e =>{
    switch(e.keyCode){
      case 37:
        if(positionRight == 37) {
          alert("Right 37")
          element.draw_out()
          return 'Right 37'
        }
        break
      case 39:
        if(positionRight == 39) alert('Right 39')
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
window.onload = function(){
  
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
class Product {
  constructor(arr){
    this.name       = arr.name
    this.price      = arr.price.toFixed(2)
    this.fakePrice  = Number(arr.price * ((rndPrice(35)/100)+1)).toFixed(2)
    this.store      = arr.store
    this.rndSort    = [this.price, this.fakePrice]
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
    ctx.fillText("$ "+this.price,this.incomeX+15,435,100,40)

    ctx.fillStyle = 'grey'
    ctx.fillRect(this.incomeX+200,410,100,40)
    ctx.fillStyle = 'white'
    ctx.fillText("$ "+this.fakePrice,this.incomeX+215,435,100,40)
  }
  draw_out(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
  }
}
let board = new Board()
let product = new Product(products[rnd(products.length)])

function update(){
  ctx.clearRect(0,0,canvas.width, canvas.height)
  board.draw_start()
  product.draw()
  if(active == false){
    active = true
  }
}
function startGame(){
  setInterval(update,1000/60)
  
}
document.getElementById('startG').onclick = function(){
  // debugger
  startGame()
  ctx.clearRect(0,0,canvas.width, canvas.height)
  product.draw_out()
  product = new Product(products[rnd(products.length)])
  gaming(37)
  
  }
}