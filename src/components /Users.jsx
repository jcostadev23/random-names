import {useState, useEffect} from 'react';
import  RandomUsers from './Random';

function GetUsers(){
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('listusers')) || []);
    const [randomUsers, setRandomUsers] = useState(users.map(users=>({...users})));
    
    useEffect(()=> {
        if(randomUsers.length === 0){
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
    },[randomUsers]);

    const Reset = ()=>{
        setRandomUsers(users.map(users=>({...users})));
    }

    const Clear = ()=>{
        localStorage.clear()
        //not rerender yet
    }

    return (
        <div>
            <div className='user-list'>
                {randomUsers.map((user)=>(
                    <div className='user-card' key={user.first_name}>
                        <img className='user-avatar' src={user.avatar}alt="logo" />
                        <div className='user-info'> {user.first_name} {user.last_name}</div>
                        <div className='user-info'>{user.email}</div>
                    </div>
                ))}
            </div>
            <div>
                <button className='button' onClick={()=> setRandomUsers(RandomUsers(randomUsers))}>Random</button>
                <button className='button' onClick={()=> Reset() }>Reset</button>
            </div>
            <button className='button' onClick={()=> Clear() }>Clear Storeage</button>
        </div>
    )
}
export default GetUsers;