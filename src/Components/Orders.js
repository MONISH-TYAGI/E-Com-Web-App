import React from 'react'
import { useEffect } from 'react';
// import { useEffect } from 'react';
import { useState } from 'react';
import { auth, db } from '../Config/Config'


function Orders({email}) {
const [data,setObj]=useState([]);
//  useEffect(()=>{
//              db.collection('BuyerInfo').doc(email).onSnapshot(snapshot => {
//              setObj({
//               BuyerPayment:snapshot.data().Buyerpayment,
//               BuyerQuantity:snapshot.data().BuyerQuantity
//              })
//           })
//         },[])
 
const cashoutSubmit2=async (email)=>{
  // console.log(setObj);
  console.log(email);
  if(email!=""){
  
let localobj=[];
  db.collection('Buyer-info').doc(email).onSnapshot(snapshot => {
  localobj=[snapshot.data()]
  console.log("data->"+snapshot.data())
  })
console.log("abc"+localobj.length);

 }

}

  return (
    <div>
      <h1>Orders</h1>
      <button onClick={()=>cashoutSubmit2(email)}>Hello 2</button>
    </div>
  )
}

export default Orders
