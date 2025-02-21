import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from './../../Hooks/useCart';
import CartScreenRow from './CartScreenRow';
import DeleteCartModal from './DeleteCartModal';
import { InputContext } from './../../App';
import auth from './../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
// export const InputContext = createContext(0);
const CartScreen = () => {

    const [deletingCart, setDeletingCart] = useState(null)
    const [user] = useAuthState(auth);
    const [cartProducts, setCartProducts] = useState([]);
    const email = user?.email;
    useEffect(() => {
        fetch(`http://localhost:5000/carts/${email}`)
            .then(res => res.json())
            .then(data => setCartProducts(data))
    }, [cartProducts])
    let subtotal = 0;
    let vat = 0;
    let total = useContext(InputContext);
    let shipping = 8;
    cartProducts.forEach(product => {

        subtotal += product.price * parseInt(product.quantity);
        vat = subtotal * (0.075);
        total = subtotal + vat + shipping;

    })
    let id = cartProducts[0]?._id
    // console.log(id);
    const clearCart = () => {
        const url1 = `http://localhost:5000/carts`
        fetch(url1, {
            method: 'delete',
            headers: {
                "content-type": "application/json",

            },
            // body: JSON.stringify(orders),
        })
            .then(res => res.json())
            .then(data => {
                // setProcessing(false)
                console.log(data)
            })
    }
    return (
        // <InputContext.Provider value={[subtotal, vat, total, shipping]}>
        // <InputContext.Provider value={total}>

        // </InputContext.Provider> 
        <>
            {
                (cartProducts.length < 1) ?
                    <p className='my-40 text-center text-lg font-medium'>No Cart Item Available, Please add product to your cart, <Link to='/products' className=' text-slate-500 underline'>Click here</Link></p>
                    :
                    <div className='my-16 '>
                        <div className='container mx-auto'>
                            <div class="text-sm breadcrumbs my-10 flex  justify-center ">
                                <ul className=''>
                                    <li>
                                        <i class="uil uil-estate mr-2 text-xl"></i>
                                        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 text-center my-10">Home</h1>
                                    </li>
                                    <li className=''>
                                        <i class="uil text-xl uil-shopping-cart-alt mr-2"></i>
                                        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 text-center my-10">Shopping Cart</h1>
                                    </li>
                                </ul>
                            </div>

                            <div class="container mx-auto px-4 sm:px-8  grid  grid-cols-4 gap-4 ">
                                <div class="py-0 col-span-4 md:col-span-4 lg:col-span-3">

                                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                                        <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                            <table class="min-w-full leading-normal">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            class="px-5 py-5  bg-[#E8F2EB] text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                            Plant Image
                                                        </th>
                                                        <th
                                                            class="px-5 py-5 border-b-2 border-gray-200 bg-[#E8F2EB] text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                            Plant Name
                                                        </th>
                                                        <th
                                                            class="px-5 py-5 border-b-2 border-gray-200 bg-[#E8F2EB] text-left text-xs font-bold text-gray-700 uppercase tracking-wider" >
                                                            Price
                                                        </th>
                                                        <th
                                                            class="px-5 py-5 border-b-2 border-gray-200 bg-[#E8F2EB] text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                            Quantity
                                                        </th>

                                                        <th class="px-5 py-5 border-b-2 border-gray-200 bg-[#E8F2EB] text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartProducts.map(cart => <CartScreenRow
                                                            cart={cart}
                                                            key={cart._id}
                                                            setDeletingCart={setDeletingCart}
                                                        >
                                                        </CartScreenRow>
                                                        )}
                                                </tbody>
                                            </table>
                                            {
                                                deletingCart && <DeleteCartModal
                                                    deletingCart={deletingCart}
                                                    setDeletingCart={setDeletingCart}
                                                ></DeleteCartModal>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className=' min-w-full shadow-md rounded-lg px-10 bg-gray-100 col-span-4 md:col-span-4 lg:col-span-1 '>
                                    <h3 className="text-xl font-bold leading-5 text-gray-800 my-10 text-center">Order Summary</h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col  pb-4 px-2.5">
                                        <div className="flex justify-between  w-full">
                                            <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                            <p className="text-base leading-4 text-gray-600">${subtotal}</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">
                                                Vat(10%)
                                                {/* <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span> */}
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">${vat.toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">Shipping</p>
                                            <p className="text-base leading-4 text-gray-600">${shipping}</p>
                                        </div>
                                        <div className='border-b-2 border-gray-200 h-2 w-full'>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">Total</p>
                                            <p className="text-base leading-4 text-gray-600">${total}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center px-0 py-6 xl:p-8 w-full bg-gray-100 space-y-6 ">
                                        <div className="flex justify-between items-start w-full my-5">
                                            <div className="flex justify-center items-center space-x-4">
                                                <div class="w-6 h-6">
                                                    <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                                </div>
                                                <div className="flex flex-col justify-start items-center">
                                                    <p className="text-md  font-semibold text-gray-800">
                                                        DPD Delivery
                                                        <br />
                                                        <span className="font-normal">Delivery within 24 Hours</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div >
                                            <div class="flex items-center justify-center w-full mx-auto">

                                                {
                                                    id ? <Link to={`/payment/${id}`}>
                                                        <button type="submit" class="flex items-center py-2  text-sm px-2 text-center  text-white  hover:bg-[#73ab24be]  bg-[#73AB24]  hover:border-0  hover:duration-500 hover:ease-in-out  hover:scale-110 rounded-md  uppercase w-full">Proceed To Checkout</button>
                                                    </Link>
                                                        :
                                                        <Link to='/payment'>
                                                            <button type="submit" class="flex items-center py-2  text-sm px-2 text-center  text-white   bg-[#73AB24]  cursor-not-allowed   hover:duration-500 hover:ease-in-out hover:scale-110 rounded-md  uppercase w-full" disabled>Proceed To Checkout</button>
                                                        </Link>
                                                }
                                            </div>
                                        </div>
                                        <div className='mx-auto'>
                                            <div className='px-0 xl:p-8 w-full bg-gray-100'>
                                                <button onClick={() => clearCart()} type="submit" class="py-2 text-sm  text-center  text-white bg-[#464f3a] shadow-2xl border-white rounded-md uppercase px-5">Clear Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </>
    );
};

export default CartScreen;