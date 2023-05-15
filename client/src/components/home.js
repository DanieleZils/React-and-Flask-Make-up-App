import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import CarouselComponent from './Carousel'



function Home(){

return (
    <div className="glassy-bg">
        <div className="container mx-auto max-w-screen pt-16">
            <CarouselComponent/>
        </div>
        <div className="flex flex-col items-center gap-4 py-20">
            <span className="w-32 h-[3px] bg-black"></span>
            <h1 className="text-3xl font-bold py-8">Best Sellers</h1>
            <span className="w-32 h-[3px] bg-black"></span>
            <FeaturedProducts/>
        </div>
        <div>
            < Footer />
        </div>
    </div>
    )
}

export default Home;

