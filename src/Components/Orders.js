import React from 'react'
import { useEffect } from 'react';
// import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../Config/Config'


function Orders({email}) {
const [data,setData]=useState([]);
let history=useHistory();
    useEffect(()=>{
      if(email=="")
      history.push("/")
        async function fetchData() {
          const citiesRef = db.collection('Buyer-info'+email);
          const snapshot = await citiesRef.get();
                let localdata=[]
                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  localdata=[...localdata,doc.data()];
                })
                setData(localdata);
                  console.log("true");
    }
    
    fetchData()
  
    },[])


const showData2=()=>{
  for(let i=0;i<data.length;i++){
  console.log(data[i]);
  }
}
const handleCancel=()=>{
  alert("Request Sent To Admin");
}
  return (
    <div>
      <h1>Orders</h1>
      {/* <button onClick={showData2}>Hello 2</button> */}
      <div class="row">
        {
  data.map((obj)=>{ 
    return (
  <div class="mx-5 my-4 col-sm-4">
    <div class="card">
     <div class="card-body">
       <h3 class="card-title">Order is Placed on {obj.Date} at {obj.Time}</h3>
       <p class="card-text">Total Quantity :- {obj.BuyerQuantity}</p>
       <p class="card-text">Total Amount :- {obj.BuyerPayment}</p>
       <a href="#" class="btn btn-danger" onClick={handleCancel}>Cancel Order</a>
     </div>
   </div>
  </div>
    )
   })
 }
</div>
    </div>
  )
}

export default Orders
