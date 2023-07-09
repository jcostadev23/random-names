function FisherYatesShuffle(users){
    const randomUsers = users
    for (let i = randomUsers.length -1; i > 0; i--){
      let j = Math.floor(Math.random()*(i+1));
      let temporary = randomUsers[i];
      randomUsers[i] = randomUsers[j] ;
      randomUsers[j] = temporary;}
}

function RandomUsers(users){
    const randomUsers = [...users];
    const firstName = randomUsers.map(function(user){
        return user.first_name;
    });
    FisherYatesShuffle(firstName);

    const lastName = randomUsers.map(function (user){
        return user.last_name;
    });
    FisherYatesShuffle(lastName);

    const email = randomUsers.map(function(user){
        return user.email;
    });
    FisherYatesShuffle(email);

    const avatar = randomUsers.map(function(user){
        return user.avatar;
    });
    FisherYatesShuffle(avatar);
    
    randomUsers.forEach(function(user, index){
        user.first_name = firstName[index];
        user.last_name = lastName[index];
        user.email = email[index];
        user.avatar = avatar[index];
    }); 
    return randomUsers;
}
export default  RandomUsers;