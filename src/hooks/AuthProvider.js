import {useContext, createContext, useState} from "react";


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("educationalPlatform")) || null);
    const [token, setToken] = useState(localStorage.getItem("educationalPlatform") || "");
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [ownedCourses, setOwnedCourses] = useState([]);


    function removeFromCart(id) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    function addToCart(item) {
        // check if cart already has item
        const index = cart.findIndex((i) => i.id === item.id);
        const index_in_subscribed = ownedCourses.findIndex((i)=> i.id ===item.id);
        console.log(index)
        if (index === -1 && index_in_subscribed === -1) {
            const updatedCart = [...cart, item];
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, setUser, setToken,cart, setCart ,removeFromCart, addToCart, ownedCourses, setOwnedCourses}}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
