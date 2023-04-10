import React, {useState, useEffect} from 'react'
import { BsTrash } from 'react-icons/all';
import App from './App';

import './index.css'
const url = `https://randomuser.me/api/?results=9`
export default function Users() {
  const [users, setUsers] = useState([])
  const [isPending, setIspending] = useState(false)

  

  const deleteBtn = (id) => {

    const filteredData = users.filter(item => item.login.md5 !== id);
    setUsers(filteredData);
};

  const fetchUserData = async () => {
    setIspending(true)
    const resp = await fetch(url)
    const users = await resp.json()
    setIspending(false)
    setUsers(users.results)
    console.log(users.results);
  }
  useEffect(()=> {
   

     fetchUserData()
}, [])

if(isPending) return <div>

<div className="loader"></div>
</div>



  return (
    <>
  
   
    {users.map((user)=>{
      const {gender, 
      name:{title, first, last}, 
      location:{  city, state, country } ,
      email,
      login:{ uuid },
      
      dob: {
        age
      },
      picture:{ large }
      } = user
      return (
        <div key={user.login.md5}>
        
        <main className="main">
       <li className="user__item">
       
              <button onClick={()=> deleteBtn(user.login.md5)} id="delete__btn" className="user__delete--btn">
                <i className="fas fa-trash"><BsTrash /></i>
              </button>
              <img
                className="user__img"
                alt="User photo"
                src={large}
                width="100"
                height="100"
              />
              <div className="user__name">
                <span className="material-symbols-outlined">badge:</span>
                <span>- {title}. {first}. 
          {last}</span>
              </div>
              <div className="user__year">
                <span className="material-symbols-outlined">cake</span>
                <span>- {age}</span>
              </div>
              <div className="user__location">
                <span className="material-symbols-outlined">state:</span>
                <span>- {city }, {state}</span>
              </div>
              <div className="user__gender">
                <span className="material-symbols-outlined">gender:</span>
                <span>- {gender}</span>
              </div>
            </li>
       
        
        
    </main>
        {/* <img src={large} alt={first} />
          <h3>{title}. {first}.
          {last}</h3>
          <p>{age}</p>
          <h3>{city }, {state} </h3>
          <h3>{gender}</h3> */}
        </div>
      )
    })}
    </>
  )
}
