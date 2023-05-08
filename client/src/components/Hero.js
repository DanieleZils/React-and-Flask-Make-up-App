import React from "react";



function Hero(){


    return(
      <div className="w-full h-[30vh]">
           <img className="w-full h-full object-cover"src="https://th.bing.com/th/id/OIG.TjAJL3Rq4Khw2F3.ejO5?pid=ImgGn" alt="hero image"/>
        <div className="max-w-[1140px] m-auto">
            <div className="absolute top-[25%] w-full max-w-[800px] flex flex-col text-black p-15 font-extrabold ">
                <h1 className="font-bold text-4xl">Glow with Clean Products!</h1>
                <h2 className="text-4xl py-4 italic">something about the products</h2>
                <p>text about the brand</p>
            </div>
        </div>
    </div>
    )
}

export default Hero;