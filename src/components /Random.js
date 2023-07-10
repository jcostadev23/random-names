function Shaffold(users){
    const randomUsers = [...users]

    for (let i = randomUsers.length -1; i > 0; i--){
      let j = Math.floor(Math.random()*(i+1))
      let temporary = randomUsers[i]
      randomUsers[i] = randomUsers[j]
      randomUsers[j] = temporary}
      return randomUsers
}

function RandomUsers(users){
    const firstName = Shaffold(users.map((user)=> user.first_name))
    const lastName = Shaffold(users.map( (user)=> user.last_name))
    const email = Shaffold(users.map((user)=> user.email))
    const avatar =  Shaffold(users.map((user)=> user.avatar))

    const randomUsers = users.map((user, index)=>({
        ...user,
        first_name: firstName[index],
        last_name: lastName[index],
        email: email[index],
        avatar: avatar[index],
    })); 

    return randomUsers
}

export default  RandomUsers