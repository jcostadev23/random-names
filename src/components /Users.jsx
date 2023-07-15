import { useState, useEffect } from 'react';
import { random, reset, clear } from './Users.logic';
import { apiCall } from './Users.logic';

function Users(){
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('listusers')) || []);
    const [randomUsers, setRandomUsers] = useState(users);
 
    useEffect(()=> {
        if(users.length === 0){
            apiCall()
                .then(users => {
                    setUsers(users);
                });
        }
    },[users])
   
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
                <button className='button' onClick={()=> random({randomUsers, setRandomUsers})}>Random</button>
                <button className='button' onClick={()=> reset({users, setRandomUsers}) }>Reset</button>
            </div>
            <button className='button' onClick={()=> clear(setUsers) }>Clear Storeage</button>
        </div>
    )
}
export default Users;