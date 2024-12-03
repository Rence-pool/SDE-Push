import React from 'react';
import { Trash2 } from 'lucide-react';

const CartItems = ({ 
  item, 
  onRemove, 
  editable = true 
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-between shadow-sm">
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-700"> 
            {item.name}
          </h3>
          <span className="text-green-600 font-medium">
            ₱{item.price.toFixed(2)}
          </span>
        </div>
        
        {item.size && (
          <p className="text-gray-600 text-sm mt-1">
            Size: <span className="text-blue-700">{item.size}</span> 
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {editable && onRemove && (
          <button 
            className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50"
            onClick={() => onRemove(item)}
          >
            <Trash2 size={20} />
          </button>
        )}

        
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => console.log('Buy Now clicked!')} 
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartItems;
