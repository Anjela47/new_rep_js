let arr = []
const emptyCell = 0
const rabbitCell = 1
const homeCell = 2
const wolfCell = 3
const fenceCell = 4
const wolfProcent = 0.6
const fenceProcent = 0.4
 let character=[
    {
        name:"rabbit",
        img:"/images/rabbit.png",
        num:rabbitCell 
    },
    {
        name:"home",
        img:"/images/home.png",
        num:homeCell
    },
    {
        name:"wolf",
        img:"/images/wolf.png",
        num:wolfCell
    },
    {
        name:"fence",
        img:"/images/fence.png",
        num:fenceCell
    }

]
document.getElementById("startBtn").onclick = startGame

function startGame(){
    array = createArray()
    setPositions(array)
    rabbitEventMove(array)

}

function createArray() {
  const arraySize = parseInt(document.getElementById('selectNum').value)
  const array = new Array(arraySize).fill(emptyCell).map(() => new Array(arraySize).fill(emptyCell))
  
  console.log(array)
  return array
}

function setPositions(array){
    const wolfCount = Math.ceil(array.length*wolfProcent)
    const fenceCount = Math.ceil(array.length*fenceProcent)
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
   
    if(array[i][j]===emptyCell){
        const element = character.find(item => item.name === characterNum)
        array[i][j] = element.num
    }else{
        setIndexes(characterNum,array)
    }
}

function rabbitEventMove(array){
    document.addEventListener("keydown", function(event){
        rabbitStep(array,event.key)
        wolfMove(array)
    })
}

function wolfMove(array){
    const listOfWolfIndexes = getCurrentDir(array,wolfCell)
    const listOfRabbitIndex = getCurrentDir(array,rabbitCell)[0]
    let requiredIndex
    listOfWolfIndexes.forEach(element => {
        const [wolf_i,wolf_j] = element
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
        requiredWolfAreaIndexes = wolfAreaIndexes.filter(item=> array[item[0]][item[1]]===0)
        let min=50
        
        requiredWolfAreaIndexes.forEach(element => {
            
            d = findNearestDistance(element,listOfRabbitIndex)
            if(d<min){
                min = d
                requiredIndex = element
            }
        })
        array[requiredIndex[0]][requiredIndex[1]] = wolfCell
        array[wolf_i][wolf_j] = emptyCell
    })    
   
}
function findNearestDistance(element,listOfRabbitIndex){
    d = Math.sqrt(Math.pow((listOfRabbitIndex[0]-element[0]),2) + Math.pow((listOfRabbitIndex[1]-element[1]),2))
    return d
}
function checkValid(index,array){
     if(index[0] != array.length && index[0] >= 0  && index[1] != array.length  && index[1] >=0 ){
         return true
     }
}
function rabbitStep(array,step){
    const listOfIndexes = getCurrentDir(array,rabbitCell)[0]
    const [i,j] = listOfIndexes
    
    if(step === "ArrowLeft"){
        goToLeft(array,i,j)
    }else
    if(step === "ArrowUp"){
        goToUp(array,i,j)
    }else
    if(step === "ArrowRight"){
        goToRight(array,i,j)
    }else
    if(step === "ArrowDown"){
        goToDown(array,i,j)
    }
    
    console.log(array)
}
function goToLeft(array,i,j){
    if(array[i][j-1]===homeCell){
        alert("you win")
    }else
    if(array[i][j-1]===homeCell){
        alert("game over")
    }
    else if(j === 0 && array[i][array.length-1] === emptyCell){
        array[i][array.length-1] = array[i][j]
        array[i][j] = emptyCell
    }else
    if(array[i][j-1] === emptyCell){
        array[i][j-1] = array[i][j]
        array[i][j] = emptyCell
    }
        
}
function goToUp(array,i,j){
    if(array[i-1][j]===homeCell){
        alert("you win")
    }else if(array[i-1][j]===homeCell){
        alert("game over")
    }else
    if(i === 0 && array[array.length-1][j] === emptyCell){
        array[array.length-1][j] = array[i][j]
        array[i][j] = emptyCell
    }else
    if(array[i-1][j] === emptyCell){
        array[i-1][j] = array[i][j]
        array[i][j] = emptyCell
    }
}
function goToRight(array,i,j){
    if(array[i][j+1]===homeCell){
        alert("you win")
    }else
    if(array[i][j+1]===homeCell){
        alert("game over")
    }else
    if(j === array.length-1 && array[i][0] === emptyCell){
        array[i][0] = array[i][j]
        array[i][j] = emptyCell
    }else
    if(array[i][j+1] === emptyCell){
        array[i][j+1] = array[i][j]
        array[i][j] = emptyCell
    }
}
function goToDown(array,i,j){
    if(array[i+1][j]===homeCell){
        alert("you win")
    }else
    if(array[i+1][j]===homeCell){
        alert("game over")
    }else
    if(i === array.length-1 && array[0][j] === emptyCell){
        array[0][j] = array[i][j]
        array[i][j] = emptyCell
    }else
    if(array[i+1][j] === emptyCell){
        array[i+1][j] = array[i][j]
        array[i][j] = emptyCell
    }
    
}

function iswin(array,i,j){
    const char = character.find(item => item.name === "home")
    return (array[i][j]===char.num)
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



