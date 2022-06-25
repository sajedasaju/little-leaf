import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetails from './../../Hooks/useProductDetails';

const ProductDetails = () => {
    const { productId } = useParams();
    const [productDetails] = useProductDetails(productId)
    const { plantName, price, inStock, description, imageUrl, imageAlt, categories } = productDetails;
    return (
        // <div>
        //     <h2 className='text-4xl text-green-600'>Hi:{productId}</h2>
        //     <h2 className='text-4xl text-green-600'>{productDetails.plantName}</h2>

        <div className='mb-14 '>
            <div className='bg-[#F6F7FB] flex justify-center  pb-32 pt-16'>
                <img src={imageUrl} alt={imageAlt} />
            </div>
            <div className='bg-white w-4/6  xl:w-1/2 py-16 mx-auto -my-20  mb-24 rounded-xl shadow-xl'>
                <div className='w-3/4 mx-auto'>
                    <div className='mb-3'>
                        <h2 className='text-3xl font-semibold text-center'>{plantName}</h2>
                        <h1 className='text-2xl font-bold text-center mt-2 text-[#73AB24]'>${price}</h1>
                    </div>
                    <div>
                        <p className=' text-justify'> {description}</p>
                        <h1 className='text-md mt-8'><span className='text-lg font-bold mr-1'>Categories:</span><span className='badge bg-[#73ab24] p-3 text-white'>{categories}</span></h1>

                        <h1 className='text-md mt-1 mb-4'><span className='text-lg font-bold mr-1'>Stock:</span><span className='font-medium'>{inStock}</span></h1>
                        <hr />

                        <div className='flex flex-col md:flex-row md:items-center'>
                            <div className='flex flex-row items-center'>
                                <span className='text-lg font-bold mr-1'>Quantity:</span>
                                <div className='flex flex-row items-center justify-around py-1 px-3  w-1/2 md:w-2/5  lg:w-2/5 xl:w-2/5 my-5 rounded-md bg-[#F6F7FB] '>
                                    <span>
                                        <button>
                                            {/* <i class="uil uil-plus"></i> */}
                                            <i class="uil uil-plus-circle text-[#73AB24] text-xl"></i>
                                        </button>
                                    </span>
                                    <span>
                                        <input type="number" placeholder='1' className='w-full text-center text-black bg-[#F6F7FB]' />
                                    </span>
                                    <span>
                                        <button>
                                            {/* <i class="uil uil-minus"></i> */}
                                            <i class="uil uil-minus-circle text-[#73AB24] text-xl "></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div >
                                <div class=" flex items-center w-full  ml-auto">
                                    <button type="submit" class="flex items-center px-5 py-2  text-sm text-center  text-white  hover:bg-[#73ab24be]  bg-[#73AB24]  hover:border-0  hover:duration-500 hover:ease-in-out  shadow-2xl hover:scale-110 border-white rounded-md  uppercase w-40"><span className='mr-1'>Add to Cart</span> <i class="uil uil-shopping-cart-alt text-lg"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // </div>
    );
};

export default ProductDetails;