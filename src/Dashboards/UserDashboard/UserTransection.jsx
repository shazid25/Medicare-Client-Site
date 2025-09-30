import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Add this import

const UserTransaction = () => {
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cartUpdated, setCartUpdated] = useState(0);

  // Load cart from localStorage on component mount and listen for changes
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('medicineCart')) || [];
      setCart(savedCart);
    };

    loadCart();

    // Listen for storage events (when cart is updated from other components)
    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for cart updates periodically
    const interval = setInterval(loadCart, 1000);

    fetchUserTransactions();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Fetch user's transaction history
  const fetchUserTransactions = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        console.log('No auth token found');
        return;
      }

      const response = await axios.get('https://medicare-sever-site.vercel.app/transactions/user/my-transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Get Firebase auth token
  const getAuthToken = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.stsTokenManager?.accessToken || '';
    } catch (error) {
      console.error('Error getting auth token:', error);
      return '';
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Calculate individual item total
  const calculateItemTotal = (medicine) => {
    return (medicine.price * medicine.quantity).toFixed(2);
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('medicineCart', JSON.stringify(updatedCart));
    setCartUpdated(prev => prev + 1);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('medicineCart', JSON.stringify(updatedCart));
    setCartUpdated(prev => prev + 1);
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('medicineCart', JSON.stringify([]));
    setCartUpdated(prev => prev + 1);
  };

  // Handle individual payment
  const handleIndividualPayment = (medicine) => {
    setSelectedMedicine(medicine);
    setShowPaymentModal(true);
  };

  // Handle bulk payment
  const handleBulkPayment = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setSelectedMedicine(null);
    setShowPaymentModal(true);
  };

  // Process payment
  const processPayment = async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        alert('Please log in to complete payment');
        setLoading(false);
        return;
      }

      const medicinesToProcess = selectedMedicine ? [selectedMedicine] : cart;
      const totalAmount = selectedMedicine ? 
        (selectedMedicine.price * selectedMedicine.quantity) : 
        calculateTotal();

      // Validate cart items
      if (medicinesToProcess.length === 0) {
        alert('No items to process');
        setLoading(false);
        return;
      }

      const transactionData = {
        medicines: medicinesToProcess.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          vendor: item.vendor
        })),
        totalAmount: parseFloat(totalAmount),
        paymentMethod: paymentMethod,
        transactionDate: new Date().toISOString()
      };

      console.log('Sending transaction:', transactionData);

      const response = await axios.post('https://medicare-sever-site.vercel.app/transactions', transactionData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Remove paid items from cart
        if (selectedMedicine) {
          const updatedCart = cart.filter(item => item._id !== selectedMedicine._id);
          setCart(updatedCart);
          localStorage.setItem('medicineCart', JSON.stringify(updatedCart));
        } else {
          // Clear entire cart for bulk payment
          setCart([]);
          localStorage.setItem('medicineCart', JSON.stringify([]));
        }

        setShowPaymentModal(false);
        fetchUserTransactions(); // Refresh transaction history
        
        // Show success message
        alert(`Payment successful! Transaction ID: ${response.data.data.transactionId}`);
      } else {
        throw new Error(response.data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.response?.data?.message || error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
          <p className="text-gray-600">Manage your medicines and complete your purchase</p>
        </motion.div>

        {/* Cart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart ({cart.length} items)</h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 mb-4">Add some medicines from the featured section to get started</p>
              <Link 
                to="/" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Browse Medicines
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((medicine) => (
                  <motion.div
                    key={medicine._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow gap-4"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800 truncate">{medicine.name}</h3>
                        <p className="text-gray-600 text-sm truncate">By: {medicine.vendor}</p>
                        <p className="text-green-600 font-bold">${medicine.price} each</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(medicine._id, medicine.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium text-gray-700">{medicine.quantity}</span>
                        <button
                          onClick={() => updateQuantity(medicine._id, medicine.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right sm:text-left">
                        <p className="font-bold text-gray-800 text-lg">
                          ${calculateItemTotal(medicine)}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleIndividualPayment(medicine)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                        >
                          Pay Now
                        </button>
                        <button
                          onClick={() => removeFromCart(medicine._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                    <p className="text-gray-600 text-sm">{cart.length} items in cart</p>
                  </div>
                  <span className="text-3xl font-bold text-green-600">${calculateTotal()}</span>
                </div>
                <button
                  onClick={handleBulkPayment}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Pay All Items
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
            <button
              onClick={fetchUserTransactions}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Refresh
            </button>
          </div>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <p className="text-gray-500 text-lg mb-2">No transactions yet</p>
              <p className="text-gray-400">Your completed payments will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <motion.div
                  key={transaction._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Order #{(transaction._id || '').slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {formatDate(transaction.transactionDate)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {transaction.status || 'completed'}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ${transaction.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-gray-700 mb-3">Medicines Purchased:</h4>
                    <div className="space-y-2">
                      {transaction.medicines?.map((medicine, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <img
                              src={medicine.image}
                              alt={medicine.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                              <span className="font-medium text-gray-800">{medicine.name}</span>
                              <p className="text-gray-500 text-sm">Qty: {medicine.quantity}</p>
                            </div>
                          </div>
                          <span className="font-medium text-gray-700">
                            ${(medicine.price * medicine.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedMedicine ? 'Single Item Payment' : 'Complete Order'}
            </h3>
            
            {selectedMedicine ? (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={selectedMedicine.image}
                    alt={selectedMedicine.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{selectedMedicine.name}</p>
                    <p className="text-gray-600 text-sm">Qty: {selectedMedicine.quantity}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Item Total:</span>
                  <span className="text-xl font-bold text-green-600">
                    ${calculateItemTotal(selectedMedicine)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Items Total:</span>
                  <span className="font-semibold text-gray-800">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Number of Items:</span>
                  <span className="font-semibold text-gray-800">{cart.length}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">${calculateTotal()}</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 mb-3 font-medium">Payment Method</label>
              <div className="space-y-2">
                {['card', 'paypal', 'bank'].map((method) => (
                  <label key={method} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="capitalize font-medium">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                disabled={loading}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `Pay $${selectedMedicine ? calculateItemTotal(selectedMedicine) : calculateTotal()}`
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserTransaction;