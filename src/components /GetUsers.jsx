import {useState, useEffect} from 'react';

function GetUsers(){
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('listusers')) || []);
    const [refresh, setRefresh] = useState(false);

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

    function RandomNames(users){
        const last_Name = users.map(function (user){
            return user.last_name;
        });

        for (let i = last_Name.length -1; i > 0; i--){
            let j = Math.floor(Math.random()*(i+1));
            var temporaryLatsName = last_Name[i];
            last_Name[i]=last_Name[j] ;
            last_Name[j]=temporaryLatsName;}
        
        users.forEach(function(user, index){
            user.last_name = last_Name[index];
            setUsers([...users])
            localStorage.setItem('listusers', JSON.stringify(users))
        }); 
    }

    const Reset = ()=>{
        localStorage.clear()
        window.location.reload();
        setRefresh(true)
    }

    return (
        <div className='user-list'>
            {users.map((user)=>(
                <div className='user-card' key={user.first_name}>
                    <img className='user-avatar' src={user.avatar}alt="logo" />
                    <div className='user-info'> {user.first_name} {user.last_name}</div>
                    <div className='user-info'>{user.email}</div>
                </div>
            ))}
            <div>
                <button className='button' onClick={()=> RandomNames(users)}>Random</button>
                <button className='button' onClick={()=> Reset() }>Reset</button>
            </div>
        </div>
    )
}
export default GetUsers;