import{useState,useEffect} from 'react';
import './App.css';

function App(){
    const[form,setForm]=useState({});
    cons[users,SetUsers]=useState([]);
    const handleForm=(e)=>
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });

};

const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch('http://127.0.0.1:8090/demo',{
        method:'POST',
        body:JSON.stringify(form),
        headers:{
            'Content-Type':'application/json'
        },
    });

    const data=await response.data;
    console.log(data);
    
};

const getUsers=async()=>{
    const response=await fetch('http://127.0.0.1:8090/data',{
        method:'GET',
    });
    const data=await response.data;
    SetUser(data);
};
useEffect(()=>{
    getUsers();
},[users]);

    return(
        <div>
            <h1>Personal details</h1>
            <form onSubmit={handleSubmit} classname='personal'>
                <span>USN</span>
                <input type ="text" name="usn" onchange= {handleForm}/>
                <br/>
                <span>Name</span>
                <input type ="text" name="name" onchange ={handleForm}/>
                <br/>
                <span>Sem</span>
                <input type ="number" name="sem" onchange= {handleForm}/>
                <br/>
                <span>Year of admission</span>
                <input type ="number" name="year" onchange ={handleForm}/>
                <br/>
                <input type="submit"/>

            </form>
            <div>
                <table>
                    <tbody>
                        {users.map((rows,k)=>{
                            <tr keys={k}>
                                <td>{rows.usn}</td>
                                <td>{rows.name}</td>
                                <td>{rows.sem}</td>
                                <td>{rows.year}</td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );




    export default App;