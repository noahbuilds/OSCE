
let candidateResponses = [
    {itemId: 1,
    optionId: 2},

        {
            itemId: 2,
      optionId: 3
        },
        {
            itemId: 3,
      optionId: 4
        }
]

let selectedOptions = {
    itemId: 3,
    optionId: 4
}

checkIfAttempted= (itemId, optionId)=> {
       
    var activity = candidateResponses
                   .find((id) => id.itemId === itemId && id.optionId == optionId);

   return  activity == null ? false : true;
  }

  if(!checkIfAttempted(3,4)){
    candidateResponses.push(selectedOptions)
  }else{
    candidateResponses.forEach(element=>{
       

        if(element.itemId === 3){
            element.optionId = 100
        }
        
    })
}


  console.log(checkIfAttempted(selectedOptions.itemId,selectedOptions.optionId))
  console.log(candidateResponses)
