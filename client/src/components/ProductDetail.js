import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";




function ProductDetail(){

    const [product, setProductDetail] = useState("")

    const { id } = useParams()

    useEffect(() => {
        fetch(`/products/${id}`)
            .then(r => r.json())
            .then(product => setProductDetail(product))
    }, [id])

    return (
        <div className="productDetail">
            <div className="pDetailImg">
                <img  src={product.image_url} alt={product.name}/>
            </div>
            <div className="pInfo">
                <h1>{product.name}</h1>
                <br />
                <h3>{product.category}</h3>
                <h3> ${product.price} </h3>
                <button className="addToCart">Add to Cart </button>
            </div>
            <br />
            <h2 className="h2">About the Product: </h2>
            <p className="description">{product.description}</p>
        </div>
    )
}

export default ProductDetail;