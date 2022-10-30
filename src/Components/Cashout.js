import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'

export const Cashout = (props) => {

    const history = useHistory();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
const [message,setMessage]=useState('');
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
                    setName(snapshot.data().Name);
                    setEmail(snapshot.data().Email);
                })
            }
            else {
                history.push('/login')
            }
        })
    })

const submitHandler=async(event)=>{
    event.preventDefault();
    const config={
        Username : "ecomservices@yopmail.com",
        Password : "3D049541B3A828DEC6CF5797DFB065C01CAA",
        Host : "smtp.elasticemail.com",
        Port:2525,
        To : email,
        From : "ecomServices@gmail.com",
        Subject : "Thanks for Shopping in E-Com.com.",
        Body :`Your Order has been Placed.Your order quantity is ${totalQty} .Total Bill is Rs.${totalPrice} only`
    };
    if(window.Email)
    {
        window.Email.send(config).then(()=>alert("Check Email For confirmation"));
    }
};
    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                  let time = new Date().toLocaleTimeString('en-US');
                  let date=new Date().toDateString();
                  let id = date+time;
                  console.log(id);
                db.collection('Buyer-info'+email).doc(id).set({
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty,
                    Date:date,
                    Time:time
                }).then(() => {
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
                    
                   }).then(
                     submitHandler(e)
                   ).then(()=>{
                    // setTimeout(() => {
                        history.push('/')
                    // }, 5000)
                   }).catch((err) => setError(err.message))
            }
        })
    }

    return (
        <>
            <Navbar user={props.user} />
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form action="https://formspree.io/f/xwkzqgno" method="POST" autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name" >Name</label>
                    <input type="text" className='form-control' required
                        value={name} name="Name" disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} name="Email" disabled />
                    <br />
                    <label htmlFor="Cell No">Cell No</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' name="Contact No" />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} name="Address"/>
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} name="Total Cost" disabled />
                    <br />
                    <label htmlFor="Total No of Products">Total No of Products</label>
                    <input type="number" className='form-control' required
                        value={totalQty} name="Quantity" disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}
