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
   <div>
    <div className="glassy-bg min-h-screen flex justify-center items-start py-28">
        <div className="max-w-screen-xl flex flex-col bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex justify-around items-center w-full ">
            <div className="w-1/3 rounded-2xl ">
            <Link to="/products">
                <img className="w-2/3 mx-auto rounded-2xl object-cover" src={product.image_url} alt={product.name} />
            </Link>
            </div>
            <div className="w-1/3">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <h3 className="text-xl font-semibold mb-4"> ${product.price} </h3>
            <button
                className="addToCart px-4 py-2 bg-stone-800 text-white font-bold rounded-md shadow-lg hover:text-red-900 cursor-pointer duration-300"
                onClick={addToCart}
            >
                Add to Cart
            </button>
            </div>
            </div>
            <div className="w-full mt-16">
            <div className="description w-1/2 mx-auto">
            <h2 className="h2 text-2xl font-bold mb-4">About the Product:</h2>
            <p className="text-lg ">{product.description}</p>
            </div>
        </div>
        </div>
    </div>
    <Footer />
</div>
 );
}
    
      
export default ProductDetail;
      