require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  
  it('Testa se fetchItem é uma função;', () => {
    expect(typeof(fetchItem)).toBe('function');
  })

  it('Executa a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada;', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled(); // toBeCalled serve para verificar se o expect() foi chamado.
  })

  it('Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527'); // toBeCalled serve para verificar se o expect() foi chamado com o argumento especifico.
  })

  it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const call = await fetchItem('MLB1615760527')
    expect(call).toEqual(item); // verifica se é igual ao item
  })

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    await expect(fetchItem()).rejects.toThrow('You must provide an url'); // se o expect for rejeitado, verifica se aparece o erro.
  })
})
