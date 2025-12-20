import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    const addToCart = (product, size=null) => {
        let updatedCart = [ ...cartData];

        //Neu gio hang rong
        if(cartData.length == 0){
            updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id: product.id,
                size: size,
                title: product.title,
                price: product.price,
                qty: 1,
                image_url: product.image_url
            })
        } else {
            //ney size khong rong
            if(size != null){
                const isProductExist = updatedCart.find(item => 
                    item.product_id == product.id && item.size == size
                )
                // neu san pham va size ket hop thi se tang so luong
                if(isProductExist) {
                    updatedCart = updatedCart.map(item => 
                        (item.product_id == product.id && item.size == size)
                        ? { ...item, qty: item.qty + 1}
                        : item
                    )
                } else {
                    // neu san pham va size khong ket hop thi se them item moi
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
                    })
                }
            } else {
                // khi size la null
                const isProductExist = updatedCart.find(item =>
                    item.product_id == product.id
                )

                if(isProductExist) {
                    // khi san pham duoc tim thay tron gio hang thi tang so luong
                    updatedCart = updatedCart.map(item => 
                        (item.product_id == product.id)
                        ? { ...item, qty: item.qty + 1}
                        : item
                    )
                } else {
                    // neu san pham khong ton tai thi se them item moi
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
                    })
                }
            }

        } 

        setCartData(updatedCart)
        localStorage.setItem('cart',JSON.stringify(updatedCart))
    }
    const shipping = () => {
        return 0;
    }
    const subTotal = () => {
        let subtotal = 0;
        cartData.map(item => {
            subtotal+= item.qty * item.price;
        })

        return subtotal;
    }

    const grandTotal = () => {
        return subTotal() + shipping();
    }

    const updateCartItem= (itemId, newQty) => {
        let updatedCart= [...cartData];
        updatedCart = updatedCart.map(item => 
            (item.id == itemId)  ? {...item, qty: newQty}
                                 : item   
        )
        setCartData(updatedCart)
        localStorage.setItem('cart',JSON.stringify(updatedCart))
    }

    const deleteCartItem = (itemId) => {
        const newCartData = cartData.filter(item => item.id != itemId)
        setCartData(newCartData)
        localStorage.setItem('cart',JSON.stringify(newCartData))
    }

    const getQty = () => {
        let qty = 0;
        cartData.map(item => {
            qty += parseInt(item.qty)
        })
        return qty;
    }

    return (
        <CartContext.Provider value={{ addToCart, cartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem, getQty}}>
            {children}
        </CartContext.Provider>
    )
}