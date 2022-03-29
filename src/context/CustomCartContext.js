import {useState} from 'react'
import {CartContext} from './CartContext'

export const CustomCartContext = ({children}) => {
    const [productosEnCarrito, setProductosEnCarrito] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    
    const addItem = (item, quantity) => {
        if(!isInCart(item.id)) {
            const newItem = {
                item: item, 
                quantity: quantity
            }
            setProductosEnCarrito([...productosEnCarrito, newItem])
        } else {
            const productInCart = productosEnCarrito.find(producto => producto.item.id === item.id)
            productInCart.quantity = productInCart.quantity + quantity
        }
        setTotalItems(totalItems + quantity)
    }


    const removeItem = (itemId, quantity) => {
        const nuevoArray = productosEnCarrito.filter(producto => producto.item.id !== itemId)
        setProductosEnCarrito(nuevoArray)
        setTotalItems(totalItems - quantity)
    }

    const clear = () => {
        setProductosEnCarrito([])
        setTotalItems(0)
    }

    const isInCart = (itemId) => {
        const valorIsInCart = productosEnCarrito.some(producto => producto.item.id === itemId)
        return valorIsInCart
    }
    
    return(
        <CartContext.Provider value={{productosEnCarrito, addItem, removeItem, clear, isInCart, totalItems}}>
            {children}
        </CartContext.Provider>
    )
}

