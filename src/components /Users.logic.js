import randomElements from './Random';

export async function apiCall(){
        const response = await fetch('https://reqres.in/api/users');
        const listUsers = await response.json();
        localStorage.setItem('listusers', JSON.stringify(listUsers.data));
    return listUsers.data
};

export function random ({randomUsers, setRandomUsers}){
    const random = randomElements(randomUsers)
    setRandomUsers(random)
}

export function reset ({users, setRandomUsers}){
    setRandomUsers(users)
}

export function clear (setUsers){
    localStorage.clear()
    setUsers(JSON.parse(localStorage.getItem('listusers')) || [])
}

