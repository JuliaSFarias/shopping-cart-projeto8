const fetchItem = async (getIdProduct) => {
  const myPromise = await fetch(`https://api.mercadolibre.com/items/${getIdProduct}`);
  const answer = await myPromise.json();
  return answer;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
