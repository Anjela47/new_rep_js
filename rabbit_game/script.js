const item = 0
let arr = []
let character=[
    {
        name:"rabbit",
        img:"/images/rabbit.png",
        i:0,
        j:0,
        num:1
    },
    {
        name:"home",
        img:"/images/home.png",
        i:0,
        j:0,
        num:2
    },
    {
        name:"wolf",
        img:"/images/wolf.png",
        i:0,
        j:0,
        num:3
    },
    {
        name:"fence",
        img:"/images/fence.png",
        i:0,
        j:0,
        num:4
    }

]
document.getElementById("startBtn").onclick = createArray

function createArray() {
  const value = parseInt(document.getElementById('selectNum').value)
  const array = new Array(value).fill(item).map(() => new Array(value).fill(item))
  
  isexit = []
  character.map(item=>{
    if(item.num === 3){
        iteration = Math.floor(value*0.6+0.8)
        while(iteration>0){
            i = randomIndexes(value)
            j = randomIndexes(value)
            if(!isexit.includes(`${i}${j}`)){
                isexit.push(`${i}${j}`)
                item.i = i
                item.j = j
            }
            array[item.i][item.j] = parseInt(item.num)
            iteration--
        }
    }else
    if(item.num === 4){
        iteration = Math.floor(value*0.4+0.8)
        console.log(iteration)
        while(iteration>0){
            i = randomIndexes(value)
            j = randomIndexes(value)
            if(!isexit.includes(`${i}${j}`)){
                isexit.push(`${i}${j}`)
                item.i = i
                item.j = j
            }
            array[item.i][item.j] = parseInt(item.num)
            iteration--
        }
    }else{
        i = randomIndexes(value)
        j = randomIndexes(value)
        if(!isexit.includes(`${i}${j}`)){
            isexit.push(`${i}${j}`)
            item.i = i
            item.j = j
        }
    
        array[item.i][item.j] = parseInt(item.num)
}
}
)
  
  console.log(character)
  console.log(array)
}


function  randomIndexes(value){
    const i = Math.floor(Math.random() * value)
    return i
}


