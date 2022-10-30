import React from 'react'
import logo from '../images/ecommerce.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';

function Test() {
  return (
    <div>
      <h1>Test 1234</h1>
      <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
                <div className="name">E-Com.com</div>
            </div>
            <div className='rightside'>
                
            <span  ><Link to="addproducts" className='navlink'><button className="correct">Add</button></Link></span>
            <span  ><Link to="reviews" className='navlink'><button className="correct">Reivews</button></Link></span>
            <span  ><Link to="orders" className='navlink'><button className="correct">Orders</button></Link></span>
 <span><Link to="orders" className='navlink'>ABCD</Link></span>
  <div className="number">
 <span className='no-of-products'>2</span>
                <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                
                </div>
                <span><button className='logout-btn'>Logout</button></span>
            </div>
           </div>
          
    </div>
  )
}

export default Test
