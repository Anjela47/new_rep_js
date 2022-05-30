let arr = []
const emptyCell = 0
const rabbitCell = 1
const homeCell = 2
const wolfCell = 3
const fenceCell = 4
const wolfProcent = 0.65
const fenceProcent = 0.45
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
}

function createArray() {
  const arraySize = parseInt(document.getElementById('selectNum').value)
  const array = new Array(arraySize).fill(emptyCell).map(() => new Array(arraySize).fill(emptyCell))
  
  console.log(character)
  console.log(array)
  return array
}

function setPositions(array){
    const wolfCount = Math.floor(array.length*wolfProcent)
    const fenceCount = Math.floor(array.length*fenceProcent)
    const isexit = []
    setRabbitPosition(isexit,array.length)
    setHomePosition(isexit,array.length)
    for(let i=0;i<wolfCount;i++){
        setWolfPosition(isexit,array.length)
    }
    for(let i=0;i<fenceCount;i++){
        setFencePosition(isexit,array.length)
    }
}

function setRabbitPosition(isexit,arraySize){
    setIndexes('rabbit',isexit,arraySize)
    
}
function setHomePosition(isexit,arraySize){
    setIndexes('home',isexit,arraySize)
}
function setWolfPosition(isexit,arraySize){
    setIndexes('wolf',isexit,arraySize)
}
function setFencePosition(isexit,arraySize){
    setIndexes('fence',isexit,arraySize)
}

function setIndexes(characterNum,isexit,arraySize){
    const i = randomIndexes(arraySize)
    const j = randomIndexes(arraySize)
    if(!isexit.includes(`${i}${j}`)){
        isexit.push(`${i}${j}`)
        const element = character.find( item => item.name === characterNum)
        array[i][j] = element.num
    }  
}

function  randomIndexes(arraySize){
    const i = Math.floor(Math.random() * arraySize)
    return i
}


