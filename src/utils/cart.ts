import { Game } from './endpoint';

export const isInCart = (localStorageProducts: Game[], productId: string): boolean => {
  return !!localStorageProducts.find((localStorageProduct) => localStorageProduct.id === productId);
};

export const handleProductsCart = (product: Game, localStorageProducts: Game[], setLocalStorageProducts: any) => {
  if (isInCart(localStorageProducts, product.id)) {
    const newLocalStorageProducts = (localStorageProducts as Game[]).filter((localStorageProduct) => localStorageProduct.id !== product.id);
    setLocalStorageProducts(newLocalStorageProducts);
  } else {
    const newLocalStorageProducts = [...localStorageProducts, product];
    setLocalStorageProducts(newLocalStorageProducts);
  }
};
