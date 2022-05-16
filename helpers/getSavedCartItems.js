const getSavedCartItems = () => {
  localStorage.getItem('cartItems');
};
// localStorage.clear();

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
