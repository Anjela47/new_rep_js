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
    const j = randomIndexes(array)
    const i = randomIndexes(array)
   
    if(array[i][j]===emptyCell){
        console.log(i,j)
        const element = character.find(item => item.name === characterNum)
        array[i][j] = element.num
    } else{
        setIndexes(characterNum,array)
    }
}

function  randomIndexes(array){
    const i = Math.floor(Math.random() * array.length)
    return i
}


