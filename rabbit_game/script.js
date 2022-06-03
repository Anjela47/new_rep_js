
const EMPTY_CELL = 0
const RABBIT_CELL = 1
const HOME_CELL = 2
const WOLF_CELL = 3
const FENCE_CELL = 4
const WOLF_PROCENT = 0.6
const FENCE_PROCENT = 0.4

let character=[
    {
        name:"rabbit",
        img:"/images/rabbit.png",
        num:RABBIT_CELL 
    },
    {
        name:"home",
        img:"/images/home.png",
        num:HOME_CELL
    },
    {
        name:"wolf",
        img:"/images/wolf.png",
        num:WOLF_CELL
    },
    {
        name:"fence",
        img:"/images/fence.png",
        num:FENCE_CELL
    }
]

document.getElementById("startBtn").onclick = startGame

function startGame(){
    array = createArray()
    setPositions(array)
    DrawBoard(array)
    rabbitEventMove(array)
}

function createArray(){
  const arraySize = parseInt(document.getElementById('selectNum').value)
  const array = new Array(arraySize).fill(EMPTY_CELL).map(() => new Array(arraySize).fill(EMPTY_CELL))
  
  
  return array
}

function setPositions(array){
    const wolfCount = Math.ceil(array.length*WOLF_PROCENT)
    const fenceCount = Math.ceil(array.length*FENCE_PROCENT)
    setRabbitPosition(array)
    setHomePosition(array)
    for(let i=0;i<wolfCount;i++){
        setWolfPosition(array)
    }
    for(let i=0;i<fenceCount;i++){
        setFencePosition(array)
    }
}

function setRabbitPosition(array){
    setIndexes('rabbit',array)
}
function setHomePosition(array){
    setIndexes('home',array)
}
function setWolfPosition(array){
    setIndexes('wolf',array)
}
function setFencePosition(array){
    setIndexes('fence',array)
}

function setIndexes(characterNum,array){
    const j = Math.floor(Math.random() * array.length)
    const i = Math.floor(Math.random() * array.length)
   
    if(array[i][j]===EMPTY_CELL){
        const element = character.find(item => item.name === characterNum)
        array[i][j] = element.num
    }else{
        setIndexes(characterNum,array)
    }
}

function rabbitEventMove(array){
    document.addEventListener("keydown", function(event){
        rabbitStep(array,event.key)
        wolfStep(array)
        DrawBoard(array)
    })
}

function wolfStep(array){
    const listOfWolfIndexes = getCurrentDir(array,WOLF_CELL)
    const listOfRabbitIndex = getCurrentDir(array,RABBIT_CELL)[0]
    let requiredIndex
    listOfWolfIndexes.forEach(index => {
        const requiredWolfAreaIndexes = getRequiredWolfAreaIndexes(array, index)
        let min=50
        requiredWolfAreaIndexes.forEach(element => {
            d = findDistances(element,listOfRabbitIndex)
            if(d<min){
                min = d
                requiredIndex = element
            }
        })
        wolfMove(requiredIndex,index)
       
    })    
   
}
function wolfMove(requiredIndex,index){
   if(array[requiredIndex[0]][requiredIndex[1]]===RABBIT_CELL){
        alert("Game over")
   }
    array[requiredIndex[0]][requiredIndex[1]] = WOLF_CELL
    array[index[0]][index[1]] = EMPTY_CELL
}

function getRequiredWolfAreaIndexes(array,index){
    const [wolf_i,wolf_j] = index
    const up = [wolf_i-1,wolf_j] 
    const right = [wolf_i,wolf_j+1] 
    const down = [wolf_i+1,wolf_j] 
    const left = [wolf_i,wolf_j-1]
    const wolfAreaIndexes = []
    if(checkValid(up,array)){
        wolfAreaIndexes.push(up)
    } 
    if(checkValid(right,array)){
        wolfAreaIndexes.push(right)
    } 
    if(checkValid(down,array)){
        wolfAreaIndexes.push(down)
    } 
    if(checkValid(left,array)){
        wolfAreaIndexes.push(left)
    } 
    return  wolfAreaIndexes.filter(item=> array[item[0]][item[1]]===EMPTY_CELL || array[item[0]][item[1]]===RABBIT_CELL)
    
}
function findDistances(element,listOfRabbitIndex){
    d = Math.sqrt(Math.pow((listOfRabbitIndex[0]-element[0]),2) + Math.pow((listOfRabbitIndex[1]-element[1]),2))
    return d
}
function checkValid(index,array){
     if(index[0] != array.length && index[0] >= 0  && index[1] != array.length  && index[1] >=0 ){
         return true
     }
}
function rabbitStep(array,step){
    const listOfIndexes = getCurrentDir(array,RABBIT_CELL)[0]
    const [i,j] = listOfIndexes
    if(step === "ArrowLeft"){
        const newcoord = [i,j-1]
        moveRabbit(array,listOfIndexes,newcoord)
    }else
    if(step === "ArrowUp"){
        moveRabbit(array,listOfIndexes,[i-1,j])
    }else
    if(step === "ArrowRight"){
        moveRabbit(array,listOfIndexes,[i,j+1])
    }else
    if(step === "ArrowDown"){
        moveRabbit(array,listOfIndexes,[i+1,j])
    }
    // DrawBoard(array)
    console.log(array)
    
}

function moveRabbit(array,old,newcoord){
    if(newcoord[0]===-1 && array[array.length-1][old[1]]!=FENCE_CELL){
        winOrLose(array[array.length-1][old[1]])
        array[array.length-1][old[1]] = RABBIT_CELL
        
    }else
    if(newcoord[1]===-1 && array[old[0]][array.length-1]!=FENCE_CELL){
        winOrLose(array[old[0]][array.length-1])
        array[old[0]][array.length-1] = RABBIT_CELL
    }else
    if(newcoord[0]===array.length && array[0][old[1]]!=FENCE_CELL){
        winOrLose(array[0][old[1]])
        array[0][old[1]] = RABBIT_CELL
    }else
    if(newcoord[1]===array.length && array[old[0]][0]!=FENCE_CELL){
        winOrLose( array[old[0]][0])
        array[old[0]][0] = RABBIT_CELL
    }else
    if(array[newcoord[0]][newcoord[1]] != FENCE_CELL){
        winOrLose(array[newcoord[0]][newcoord[1]])
        array[newcoord[0]][newcoord[1]] = RABBIT_CELL
    }
    array[old[0]][old[1]] = EMPTY_CELL
    

}
function winOrLose(location){
    if(location===HOME_CELL){
        alert("You win")
    }
}

function getCurrentDir(array,character){
    const getFromArray = function(acc, row, i){
        row.forEach((item, j) => {
            if(item === character){
                acc.push([i, j])
            }
        })
        return acc
    }
    return  array.reduce(getFromArray, [])
}


function DrawBoard(array){
    board = document.getElementById('board')
    board.innerHTML = ""
    const width = array.length*60 + 2*array.length
    board.style.width = `${width}px`
    board.style.height = `${width}px`
    for(let i=0; i<array.length;i++){
        for(let j=0; j<array.length;j++){
        
       div = generateDiv(array,i,j)
       
        board.append(div)
        
        }
}
}

function generateDiv(array,i,j){
    const div = document.createElement("div")
    div.id=`${i}${j}`
    div.className="box"
    img = generateImg(array[i][j])
    div.appendChild(img)
    return div
}
function generateImg(coord){
    img = document.createElement("img")
    if(coord===RABBIT_CELL){
        img.src = "images/rabbit.png"
        
    }
    if(coord===FENCE_CELL){
        img.src = "images/fence.png"
    }
    if(coord===HOME_CELL){
        img.src = "images/home.png"
    }
    if(coord===WOLF_CELL){
        img.src = "images/wolf.png"
    }
    return img
    
}
