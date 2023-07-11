function Random(array){
    const random = [...array]

    for (let i = random.length -1; i > 0; i--){
      let j = Math.floor(Math.random()*(i+1))
      let temporary = random[i]
      random[i] = random[j]
      random[j] = temporary}
      return random
}

function RandomElements(array){
    const firstName = Random(array.map((element)=> element.first_name))
    const lastName = Random(array.map( (element)=> element.last_name))
    const email = Random(array.map((element)=> element.email))
    const avatar =  Random(array.map((element)=> element.avatar))

    const random = array.map((element, index)=>({
        ...element,
        first_name: firstName[index],
        last_name: lastName[index],
        email: email[index],
        avatar: avatar[index],
    })); 

    return random
}

export default  RandomElements