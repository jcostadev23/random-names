import {useState, useEffect} from 'react';
import RandomElements from './Random';

function GetUsers(){
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('listusers')) || []);
    const [randomUsers, setRandomUsers] = useState(users);
 
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
    },[users])

    const random = ()=>{
        const random = RandomElements(randomUsers)
        setRandomUsers(random)
    }

    const reset = ()=>{
        setRandomUsers(users)
    }

    const clear = ()=>{
        localStorage.clear()
        setUsers(JSON.parse(localStorage.getItem('listusers')) || [])
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
                <button className='button' onClick={()=> random()}>Random</button>
                <button className='button' onClick={()=> reset() }>Reset</button>
            </div>
            <button className='button' onClick={()=> clear() }>Clear Storeage</button>
        </div>
    )
}
export default GetUsers;