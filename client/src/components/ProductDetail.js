import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Footer from "./Footer";

function ProductDetail(){

    const [product, setProductDetail] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate();
    const { user } = useContext(UserContext);



    useEffect(() => {
        fetch(`/products/${id}`)
            .then(r => r.json())
            .then(product => setProductDetail(product))
    }, [id])

    //i need to add a function that posts the product to the cart of the user, and then redirects to the cart page
    //only looged in users can add to cart

    function handleLoginPrompt() {
        setShowAlert(true);
      }

    function addToCart(){
        if (!user){
            handleLoginPrompt();
            navigate("/login", { state: { fromProductDetail: true } });
        } else {
        fetch("/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",},
            body: JSON.stringify({
                product_id: product.id,
            }),
            })
            .then((r) => r.json())
            .then((data) => {
                if (!data.error){
                    navigate("/cart");
                } else {
                    alert("Something went wrong. Please try again.");
                }
            })}
    }
      

    
return (
   <div className="">
         <div className="glassy-bg py-20 h-screen">
             <div className="max-w-screen-xl container mx-auto py-32 backdrop-blur-md bg-white/40 p-6 rounded-3xl shadow-lg">
             <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>
             <div className="flex justify-around items-center w-full ">
                 <div className="w-1/2 rounded-2xl overflow-hidden py-6">
                 <Link to="/products">
                     <img className="w-2/3 mx-auto rounded-2xl object-cover shadow-lg transition duration-300 hover:scale-110" src={product.image_url} alt={product.name} />
                 </Link>
                 <div className="mt-8 text-center">
                     <h3 className="text-xl font-semibold mb-4"> ${product.price} </h3>
                     <button
                         className="px-5 py-2 bg-stone-800 text-white font-bold rounded-md shadow-lg transition duration-300 hover:scale-110"
                         onClick={addToCart}
                     >
                         Add to Cart
                     </button>
                 </div>
                 </div>
                 <div className="w-1/2">
                 <div className="description w-full mx-auto">
                 <h2 className="h2  font-bold mb-4">About the Product:</h2>
                 <p className="text-lg text-justify ">{product.description}</p>
                 </div>
                 </div>
                 </div>
             </div>
         </div>
         <Footer />
     </div>
    );
}
     
    
      
export default ProductDetail;
      