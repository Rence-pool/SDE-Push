import {Link} from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Limitedph from "../../assets/Cards/LimitedPH.jpg";
import Prowareph from "../../assets/Cards/ProwarePH.jpg";
import ICTph from "../../assets/Cards/ICTPH.jpg";
import BSTMph from "../../assets/Cards/BSTMPH.jpg";
import BACOMMph from "../../assets/Cards/BACOMMPH.jpg";
import BSBAph from "../../assets/Cards/BSBAPH.jpg";
import BSHMph from "../../assets/Cards/BSHMPH.jpg";
import SHSph from "../../assets/Cards/SHSPH.jpg";

export default function Card() {
  const navigate = useNavigate();

  const [products] = useState([
    { id: 1, name: "ICT", description: "Bachelor of Science in: Information Technology (IT), Computer Science (CS), Computer Engineering (CpE).", basePrice: 100, image: ICTph },
    { id: 2, name: "BSTM", description: "Bachelor of Science in Tourism Management", basePrice: 150, image: BSTMph },
    { id: 3, name: "BACOMM", description: "Bachelor of Arts in Communication", basePrice: 200, image: BACOMMph },
    { id: 4, name: "BSBA", description: "Bachelor of Science in Business Administration", basePrice: 200, image: BSBAph },
    { id: 5, name: "BSHM", description: "Bachelor of Science in Hospitality Management (BSHM)", basePrice: 200, image: BSHMph },
    { id: 6, name: "SHS", description: "Accountancy, Business, and Management (ABM), Science, Technology, Engineering, and Mathematics (STEM), IT in Mobile App and Web Development (ITMAWD)", basePrice: 200, image: SHSph },
    { id: 7, name: "Proware", description: "Accountancy, Business, and Management (ABM), Science, Technology, Engineering, and Mathematics (STEM), IT in Mobile App and Web Development (ITMAWD)", basePrice: 200, image: Prowareph },
    { id: 8, name: "Limited Edition Items", description: "Accountancy, Business, and Management (ABM), Science, Technology, Engineering, and Mathematics (STEM), IT in Mobile App and Web Development (ITMAWD)", basePrice: 200, image: Limitedph },
  ]);

  

  const ictMaleChoices = [
    { name: "Daily Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 390 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 450 },
  ];
  const ictFemaleChoices = [
    { name: "Daily Blouse", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 380 },
    { name: "Daily Skirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 195 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 442 },
  ];

  const bstmMaleChoices = [
    { name: "Daily Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 375 },
    { name: "Blazer", sizes: ["S", "M", "L", "XL"], price: 780 },
    {
        name: "Cloth Pants",
        sizes: [
          { size: "M", price: 330 },
          { size: "XL", price: 345 },
          { size: "3XL", price: 370 },
        ],
    },  
    { name: "Neck Tie", sizes: null, price: 140 },
    { name: "Pin", sizes: null, price: 88 },
  ];
  const bstmFemaleChoices = [
    { name: "Daily Blouse", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 365 },
    { name: "Daily Skirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 240 },
    { name: "Blazer", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 750 },
    { name: "Beret", sizes: null, price: 122 },
    { name: "Scarf", sizes: null, price: 70 },
    { name: "Pin", sizes: null, price: 88 },
  ];

  const bacommMaleChoices = [
    { name: "Daily Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 395 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 450 },
    {
        name: "Blazer",
        sizes: [
          { size: "S", price: 750 },
          { size: "M", price: 750 },
          { size: "L", price: 750 },
          { size: "XL", price: 870 },
          { size: "3XL", price: 870 },
        ],
    },  
    { name: "Neck Tie", sizes: null, price: 125 },
  ];
  const bacommFemaleChoices = [
    { name: "Daily Blouse", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 365 },
    { name: "Daily Skirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 195 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 442 },
    {
        name: "Blazer",
        sizes: [
          { size: "S", price: 720 },
          { size: "M", price: 720 },
          { size: "L", price: 720 },
          { size: "XL", price: 840 },
          { size: "3XL", price: 840 },
        ],
    },  
    { name: "Scarf", sizes: null, price: 70 },
  ];

  const bsbaMaleChoices = [
    { name: "Daily Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 395 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 450 },
    {
        name: "Blazer",
        sizes: [
          { size: "S", price: 750 },
          { size: "M", price: 750 },
          { size: "L", price: 750 },
          { size: "XL", price: 870 },
          { size: "3XL", price: 870 },
        ],
    },  
    { name: "Neck Tie", sizes: null, price: 125 },
  ];
  const bsbaFemaleChoices = [
    { name: "Daily Blouse", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 365 },
    { name: "Daily Skirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 195 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 442 },
    {
        name: "Blazer",
        sizes: [
          { size: "S", price: 720 },
          { size: "M", price: 720 },
          { size: "L", price: 720 },
          { size: "XL", price: 840 },
          { size: "3XL", price: 840 },
        ],
    },  
    { name: "Scarf", sizes: null, price: 70 },
  ];

  const bshmMaleChoices = [
    { name: "Daily Polo", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 380 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 450 },
    {
        name: "Blazer",
        sizes: [
          { size: "S", price: 750 },
          { size: "M", price: 750 },
          { size: "L", price: 750 },
          { size: "XL", price: 870 },
          { size: "2XL", price: 870 },
          { size: "3XL", price: 870 },
        ],
    },  
    {
        name: "VEST",
        sizes: [
          { size: "S", price: 380 },
          { size: "M", price: 380 },
          { size: "L", price: 380 },
          { size: "XL", price: 390 },
          { size: "2XL", price: 405 },
          { size: "3XL", price: 405 },
        ],
    },
    { name: "CHEF'S Polo", sizes: ["XS","S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], price: 360 },
    { name: "CHEF'S Pants", sizes: ["XS","S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], price: 305 },
    { name: "Apron", sizes: null, price: 92 },
    { name: "Skull Cap", sizes: null, price: 105 },
  ];
  const bshmFemaleChoices = [
    { name: "Daily Blouse", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 360 },
    { name: "Daily Skirt", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 195 },
    { name: "Daily Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 442 },
    {
        name: "Blazer",
        sizes: [
          { size: "S", price: 720 },
          { size: "M", price: 720 },
          { size: "L", price: 720 },
          { size: "XL", price: 840 },
          { size: "2XL", price: 840 },
          { size: "3XL", price: 840 },
        ],
    },  
    { name: "VEST", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 350 },
    { name: "CHEF'S Polo", sizes: ["XS","S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], price: 360 },
    { name: "CHEF'S Pants", sizes: ["XS","S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], price: 305 },
    { name: "Apron", sizes: null, price: 92 },
    { name: "Skull Cap", sizes: null, price: 105 },
  ];

  const shsMaleChoices = [
    {
        name: "Daily Polo",
        sizes: [
          { size: "S", price: 620 },
          { size: "M", price: 620 },
          { size: "L", price: 620 },
          { size: "XL", price: 655 },
          { size: "2XL", price: 655 },
          { size: "3XL", price: 655 },
          { size: "4XL", price: 950 },
          { size: "5XL", price: 950 },
          { size: "6XL", price: 950 },
          { size: "7XL", price: 950 },
        ],
    },
    {
        name: "Daily Pants",
        sizes: [
          { size: "S", price: 415 },
          { size: "M", price: 415 },
          { size: "L", price: 440 },
          { size: "XL", price: 440 },
          { size: "2XL", price: 440 },
          { size: "3XL", price: 470 },
        ],
    },
    {
        name: "PE Pants",
        sizes: [
          { size: "XS", price: 340 },
          { size: "S", price: 340 },
          { size: "M", price: 340 },
          { size: "L", price: 340 },
          { size: "XL", price: 340 },
          { size: "2XL", price: 360 },
          { size: "3XL", price: 360 },
          { size: "5XL", price: 415 },
        ],
    },
    {
        name: "PE Shirt",
        sizes: [
          { size: "S", price: 175 },
          { size: "M", price: 175 },
          { size: "L", price: 175 },
          { size: "XL", price: 175 },
          { size: "2XL", price: 175 },
          { size: "3XL", price: 200 },
          { size: "5XL", price: 230 },
        ],
    },
    { name: "Neck Tie", sizes: null, price: 85 },
    { name: "CHECKERED PANTS", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], price: 265 },
    { name: "CHECKERED POLO", sizes: ["XS","S", "M", "L", "XL", "2XL", "3XL"], price: 400 },
    { name: "BEANIE", sizes: null, price: 85 },
    { name: "APRON", sizes: null, price: 85 },
  ];
  const shsFemaleChoices = [
    {
        name: "Daily Blouse",
        sizes: [
          { size: "S", price: 600 },
          { size: "M", price: 600 },
          { size: "L", price: 600 },
          { size: "XL", price: 600 },
          { size: "2XL", price: 600 },
          { size: "3XL", price: 600 },
          { size: "4XL", price: 910 },
          { size: "5XL", price: 910 },
          { size: "6XL", price: 910 },
          { size: "7XL", price: 910 },
        ],
    },
    {
        name: "Daily Skirt",
        sizes: [
          { size: "S", price: 275 },
          { size: "M", price: 275 },
          { size: "L", price: 275 },
          { size: "XL", price: 275 },
          { size: "2XL", price: 290 },
          { size: "3XL", price: 290 },
        ],
    },
    {
        name: "PE Pants",
        sizes: [
          { size: "XS", price: 340 },
          { size: "S", price: 340 },
          { size: "M", price: 340 },
          { size: "L", price: 340 },
          { size: "XL", price: 340 },
          { size: "2XL", price: 360 },
          { size: "3XL", price: 360 },
          { size: "5XL", price: 415 },
        ],
    },
    {
        name: "PE Shirt",
        sizes: [
          { size: "S", price: 175 },
          { size: "M", price: 175 },
          { size: "L", price: 175 },
          { size: "XL", price: 175 },
          { size: "2XL", price: 175 },
          { size: "3XL", price: 200 },
          { size: "5XL", price: 230 },
        ],
    },
    { name: "Neck Tie", sizes: null, price: 85 },
    { name: "CHECKERED POLO", sizes: ["XS","S", "M", "L", "XL", "2XL", "3XL"], price: 375 },
    { name: "BEANIE", sizes: null, price: 85 },
    { name: "APRON", sizes: null, price: 85 },
  ];

  const proware = [
    {
        name: "PE Shirt",
        sizes: [
          { size: "S", price: 175 },
          { size: "M", price: 175 },
          { size: "L", price: 175 },
          { size: "XL", price: 175 },
          { size: "3XL", price: 175 },
          { size: "5XL", price: 195 },
        ],
    },
    { name: "PE Pants", sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], price: 310 },
    {
        name: "NSTP Shirt",
        sizes: [
          { size: "XS", price: 210 },
          { size: "S", price: 210 },
          { size: "M", price: 210 },
          { size: "L", price: 210 },
          { size: "XL", price: 210 },
          { size: "2XL", price: 230 },
          { size: "3XL", price: 230 },
          { size: "5XL", price: 250 },
        ],
    },  
    {
        name: "Washday Shirt",
        sizes: [
          { size: "XS", price: 0 },
          { size: "S", price: 0 },
          { size: "M", price: 0 },
          { size: "L", price: 0 },
          { size: "XL", price: 0 },
          { size: "2XL", price: 0 },
          { size: "3XL", price: 0 },
          { size: "5XL", price: 0 },
        ],
    }, 
  ];

  const choicesMap = {
    ICT: { male: ictMaleChoices, female: ictFemaleChoices },
    BSTM: { male: bstmMaleChoices, female: bstmFemaleChoices },
    BACOMM: { male: bacommMaleChoices, female: bacommFemaleChoices },
    BSBA: { male: bsbaMaleChoices, female: bsbaFemaleChoices },
    BSHM: { male: bshmMaleChoices, female: bshmFemaleChoices },
    SHS: { male: shsMaleChoices, female: shsFemaleChoices },
    Proware: {male :proware}
  };


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [gender, setGender] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);

  const handleSelectProduct = (product, isBuyNowClicked = false) => {
    setSelectedProduct(product);
    setGender("");
    setSelectedItems([]);
    setShowCartModal(true);
    setIsBuyNow(isBuyNowClicked);
  };

  const handleItemChange = (item, size, price, isChecked) => {
    setSelectedItems((prevItems) => {
      if (item.sizes) {

        if (size === "" || size === "Select Size") {
          return prevItems
            .filter((i) => i.name !== item.name) 
            .concat({ ...item, size, price: 0 }); 
        }
  
        
        return prevItems
          .filter((i) => i.name !== item.name)
          .concat({ ...item, size, price }); 
      } else if (!item.sizes) {
        if (isChecked) {
          return [...prevItems, { ...item, price }];
        } else {
          return prevItems.filter((i) => i.name !== item.name);
        }
      }
    });
  };
  

  

  const handleConfirmOrder = () => {
    if (selectedItems.length > 0) {
      // Use the current user's ID from AuthContext
      navigate(`/cart/${id}`, { 
        state: { 
          selectedItems: selectedItems.map(item => ({
            ...item,
            productName: selectedProduct.name,
            gender: gender
          })),
          timestamp: Date.now() 
        } 
      });
    }
    setShowCartModal(false);
  };

  
  return (
    <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4 text-white">Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {products.map((product) => (
      <div key={product.id} className="card shadow-xl text-black bg-gray-200">
        <Link to={`/products/${product.id}`}>
          <figure>
            <img src={product.image} alt={product.name} className="object-cover" />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title text-black">{product.name}</h2>
          <p className="text-black">{product.description}</p>
          <div className="flex space-x-2 mt-2">
            <button
              className="btn btn-outline mt-4"
              onClick={() => handleSelectProduct(product)}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-primary mt-4"
              onClick={() => handleSelectProduct(product, true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

    



      {showCartModal && selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-black">Choose Gender</h3>
            <div className="flex space-x-4 mt-2">
              <button
                className={`btn ${gender === "Male" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setGender("Male")}
              >
                Male
              </button>
              <button
                className={`btn ${gender === "Female" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setGender("Female")}
              >
                Female
              </button>
            </div>
            

            {gender && (
              <div className="mt-4">
                <h3 className="font-bold text-lg text-black">Select Items</h3>
                <div>
                  {(choicesMap[selectedProduct.name][gender.toLowerCase()] || []).map((item) => (
                    <div key={item.name} className="mt-2 text-black">
                      <label className="font-medium">{item.name}</label>
                      {item.sizes ? (
                        <select
                          className="select select-bordered w-full mt-1"
                          onChange={(e) => {
                            const selectedSize = e.target.value;
                            const selectedPrice = typeof item.sizes[0] === "string"
                              ? item.price
                              : item.sizes.find((s) => s.size === selectedSize).price;

                            handleItemChange(item, selectedSize, selectedPrice, true);
                          }}
                        >
                          <option value="">Select Size</option>
                          {item.sizes.map((sizeObj) =>
                            typeof sizeObj === "string" ? (
                              <option key={sizeObj} value={sizeObj}>
                                {sizeObj} - ₱{item.price}
                              </option>
                            ) : (
                              <option key={sizeObj.size} value={sizeObj.size}>
                                {sizeObj.size} - ₱{sizeObj.price}
                              </option>
                            )
                          )}
                        </select>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            className="checkbox mt-2"
                            onChange={(e) => handleItemChange(item, "", item.price, e.target.checked)}
                          />
                          <span className="ml-2 text-black">₱{item.price}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            

            <div className="modal-action">
              <div className="total-amount text-lg font-semibold mr-24 mt-4">
                Total Amount: ₱{selectedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
              <button className="btn btn-secondary mt-4" onClick={handleConfirmOrder}>
                Confirm
              </button>
              <button className="btn mt-4" onClick={() => setShowCartModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
