import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/stores/AutProvider";
import Prowareph from "../../assets/Cards/ProwarePH.jpg";
import ICTph from "../../assets/Cards/ICTPH.jpg";
import BSTMph from "../../assets/Cards/BSTMPH.jpg";
import BACOMMph from "../../assets/Cards/BACOMMPH.jpg";
import BSBAph from "../../assets/Cards/BSBAPH.jpg";
import BSHMph from "../../assets/Cards/BSHMPH.jpg";
import SHSph from "../../assets/Cards/SHSPH.jpg";
import UNIFPH from "../../assets/Cards/Uniform.png";UNIFPH

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userState: { id },
  } = useContext(AuthContext);

  const productImages = {
    "Limited Edition Items": UNIFPH,
    "Proware": Prowareph,
    "ICT": ICTph,
    "BSTM": BSTMph,
    "BACOMM": BACOMMph,
    "BSBA": BSBAph,
    "BSHM": BSHMph,
    "SHS": SHSph
  };

  const [cartItems, setCartItems] = useState(location.state?.selectedItems || []);
  const [selectedItemsForCheckout, setSelectedItemsForCheckout] = useState([]);

  const handleDeleteItem = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
    setSelectedItemsForCheckout(
      selectedItemsForCheckout.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleItemSelect = (item) => {
    setSelectedItemsForCheckout(prev => 
      prev.includes(item)
        ? prev.filter(selectedItem => selectedItem !== item)
        : [...prev, item]
    );
  };

  const totalAmount = selectedItemsForCheckout.reduce((sum, item) => sum + item.price, 0);

  const handleProceedToCheckout = () => {
    if (selectedItemsForCheckout.length === 0) {
      alert("Please select items to checkout");
      return;
    }

    navigate("/checkout", {
      state: {
        selectedItems: selectedItemsForCheckout,
        timestamp: Date.now(),
      },
    });
  };

  return (
    <main className="m-4 flex-1">
      <div className="bg-white shadow-md rounded-lg p-6 text-black">
        <h2 className="text-2xl font-bold mb-4">Cart for User {id}</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-700">No items in cart</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={selectedItemsForCheckout.includes(item)}
                      onChange={() => handleItemSelect(item)}
                      className="checkbox checkbox-primary mr-2"
                    />
                  </div>

                  <div className="w-16 h-16 mr-4">
                    <img 
                      src={productImages[item.productName]} 
                      alt={item.productName} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-800">
                      Product: {item.productName} | Gender: {item.gender}
                      {item.size ? ` | Size: ${item.size}` : ''}
                    </p>
                  </div>


                  <div className="flex items-center">
                    <p className="font-bold mr-4">₱{item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => handleDeleteItem(index)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-xl font-bold">
                Selected Items Total:
              </span>
              <span className="text-2xl font-bold text-green-600">
                ₱{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleProceedToCheckout}
                className="btn btn-primary"
                disabled={selectedItemsForCheckout.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}