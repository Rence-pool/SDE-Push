import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/stores/AutProvider";
import CartItems from './CartItems';

export default function Cart() {
  const {
    userState: { id },
  } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (!location.state?.selectedItems?.length) {
      navigate('/products');
      return;
    }

    const { selectedItems } = location.state;
    
    setCartItems(selectedItems);
    
    // Assuming the first item will have product and gender details
    if (selectedItems[0]) {
      setProductDetails({
        productName: selectedItems[0].productName,
        gender: selectedItems[0].gender
      });
    }
  }, [location.state, navigate]);

  const handleRemoveItem = (itemToRemove) => {
    setCartItems(currentItems => 
      currentItems.filter(item => 
        !(item.name === itemToRemove.name && 
          item.size === itemToRemove.size)
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  return (
    <main className="m-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      
      {productDetails && (
        <div className="mb-4 bg-gray-100 p-3 rounded-lg">
          <p className="font-semibold">Product: {productDetails.productName}</p>
          <p>Gender: {productDetails.gender}</p>
        </div>
      )}
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <CartItems 
              key={index} 
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
          
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              ₱{calculateTotal()}
            </span>
          </div>

          <button className="btn btn-primary btn-block mt-4">
            Proceed to Checkout
          </button>
        </div>
      )}
    </main>
  );
}