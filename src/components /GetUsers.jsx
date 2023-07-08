import {useState, useEffect} from 'react';

function GetUsers(){
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('listusers')) || []);
    
    useEffect(()=> {

        if(users.length === 0){
            async function ApiCall(){
                try{
                    const resp = await fetch('https://reqres.in/api/users');
                    const listUsers = await resp.json();
                    setUsers(listUsers.data)
                    localStorage.setItem('listusers', JSON.stringify(listUsers.data));
                }catch (error){
                    console.log('error no fetch');
                }
            };
            ApiCall();
        }
    },[users]);
  
    function FisherYatesShuffle(user){
          for (let i = user.length -1; i > 0; i--){
            let j = Math.floor(Math.random()*(i+1));
            let temporary = user[i];
            user[i] = user[j] ;
            user[j] = temporary;}
    }

    function RandomNames(users){
        const first_Name = users.map(function(user){
            return user.first_name;
        });
        FisherYatesShuffle(first_Name);

        const last_Name = users.map(function (user){
            return user.last_name;
        });
        FisherYatesShuffle(last_Name);

        const email = users.map(function(user){
            return user.email;
        });
        FisherYatesShuffle(email);

        const avatar = users.map(function(user){
            return user.avatar;
        });
        FisherYatesShuffle(avatar);
        
        users.forEach(function(user, index){
            user.first_name = first_Name[index];
            user.last_name = last_Name[index];
            user.email = email[index];
            user.avatar = avatar[index];
            setUsers([...users])
        }); 
    }

    const Reset = ()=>{
        window.location.reload();
    }

    return (
        <div>
            <div className='user-list'>
                {users.map((user)=>(
                    <div className='user-card' key={user.first_name}>
                        <img className='user-avatar' src={user.avatar}alt="logo" />
                        <div className='user-info'> {user.first_name} {user.last_name}</div>
                        <div className='user-info'>{user.email}</div>
                    </div>
                ))}
            </div>
            <div>
                <button className='button' onClick={()=> RandomNames(users)}>Random</button>
                <button className='button' onClick={()=> Reset() }>Reset</button>
            </div>
        </div>
    )
}
export default GetUsers;