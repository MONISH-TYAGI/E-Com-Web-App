import React, { useContext } from 'react'
import logo from '../images/ecommerce.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
export const Navbar = ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }
    const addProduct=()=>{
        history.push('/addproducts');
    }

    return (
        <>
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
                <div className="name">E-Com.com</div>
            </div>
            {!user && <div className='rightside'>
     

                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='rightside'>
                
            <span  ><i className="fa-solid fa-shop" onClick={addProduct} style={{"font-size":"large"}}title="Sell Your Product"></i></span>
 <span><Link to="/" className='navlink'>{user}</Link></span>
 <div className="number">
 <span className='no-of-products'>{totalQty}</span>
                <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                
                </div>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
           </div>
          
            </>
    )
}
