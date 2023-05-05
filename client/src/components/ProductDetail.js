import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProductDetail(){

    const [product, setProductDetail] = useState("")

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

    function addToCart(){
        if (!user){
            alert ("Please login to add items to cart.");
            navigate("/login");
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
        <div className="productDetail">
            <div className="pDetailImg">
                <Link to="/products">
                <img style={{width:"200px"}} src={product.image_url} alt={product.name}/>
                </Link>
            </div>
            <div className="pInfo">
                <h2>{product.name}</h2>
                <h3> ${product.price} </h3>
                <button className="addToCart" onClick={addToCart}>Add to Cart </button>
            </div>
            <br />
            <h2 className="h2">About the Product: </h2>
            <p className="description">{product.description}</p>
        </div>
    )
}

export default ProductDetail;