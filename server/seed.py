from config import app, db
from models import User, Product, Cart, CartProduct



with app.app_context():

    User.query.delete()
    Product.query.delete()
    Cart.query.delete()
    CartProduct.query.delete()
    db.session.commit()



        # Create users
    user1 = User(username="john_doe", password_hash="password123", email="john@example.com", first_name="John", last_name="Doe")
    user2 = User(username="jane_doe", password_hash="password123", email="jane@example.com", first_name="Jane", last_name="Doe")

    # Create products
    p1 = Product(name="Scarlet Bloom Lipstick", category="lip", description="Introducing Scarlet Bloom, our all-natural red lipstick that will leave you feeling bold and beautiful! Made with only the finest organic ingredients, Scarlet Bloom is the perfect combination of luxurious and eco-friendly.Crafted with nourishing coconut oil, shea butter, and vitamin E, this lipstick provides intense hydration to keep your lips looking and feeling smooth all day long. The vibrant shade of red is derived from natural pigments, ensuring that your lips look stunning without any harmful synthetic dyes.Not only is Scarlet Bloom kind to your skin, but it's also environmentally conscious. The packaging is made from biodegradable materials, so you can feel good about your purchase knowing that you're minimizing your carbon footprint.Say goodbye to harsh chemicals and hello to naturally beautiful lips with Scarlet Bloom.", price=9.99, image_url="https://th.bing.com/th/id/OIG.NUg97X8XZQY2XMlPjdTv?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p2 = Product(name="EcoLine Eyeliner", category="eye", description="Introducing EcoLine, our natural eyeliner that will help you achieve the perfect winged look without compromising your health or the environment!Crafted with all-natural ingredients such as jojoba oil, beeswax, and shea butter, EcoLine is gentle on your delicate eye area while still providing a precise and bold line. The jet-black pigment is derived from natural sources, ensuring that your eyeliner is free from harmful synthetic dyes.EcoLine's smooth and creamy texture allows for easy application and long-lasting wear, so you can have a flawless look all day long. Not only is it kind to your skin, but it's also eco-friendly. The packaging is made from recycled materials, making it a sustainable choice for your beauty routine.Say goodbye to harsh chemicals and hello to naturally beautiful eyes with EcoLine.", price=13.99, image_url="https://th.bing.com/th/id/OIG.WU2fbKl8F9A5_iv.mMBf?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p3 = Product(name="Pure Radiance Foundation", category="face", description="Introducing Pure Radiance, our all-natural foundation that will give you a flawless complexion without any harsh chemicals or synthetic ingredients.Made with only the finest organic and natural ingredients, Pure Radiance is gentle on even the most sensitive skin. It's infused with nourishing ingredients like aloe vera, coconut oil, and vitamin E to keep your skin looking and feeling healthy all day long.Pure Radiance's lightweight formula provides buildable coverage that blends seamlessly with your skin tone, giving you a radiant and natural finish. The foundation is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Pure Radiance kind to your skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to heavy and unnatural makeup and hello to Pure Radiance – the perfect choice for achieving a natural and healthy glow.", price=28.55, image_url="https://th.bing.com/th/id/OIG.QkEbUWVYuB1opxnIHKWm?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p4 = Product(name="Bloom Blush ", category="face", description="Introducing Bloom Blush, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Bloom Blush provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Bloom Blush's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Bloom Blush kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=20.99, image_url="https://th.bing.com/th/id/OIG.VHhl47vplH7MUd_mfgvg?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p5 = Product(name="NatureLash Mascara", category="eye", description="Introducing NatureLash, our natural mascara that will give you long and voluminous lashes without any synthetic or harmful ingredients.Made with only the finest natural and organic ingredients, NatureLash is gentle on your delicate eye area while still providing bold and beautiful lashes. The formula is infused with nourishing ingredients like beeswax and vitamin E to keep your lashes healthy and strong.NatureLash's unique brush applicator is designed to separate and lengthen each lash, giving you a defined and voluminous look. The mascara is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is NatureLash kind to your lashes and eyes, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and synthetic mascaras and hello to NatureLash – the perfect choice for achieving natural and beautiful lashes.", price=22.99, image_url="https://th.bing.com/th/id/OIG.TI0vDIOgD..MJdWFMnlU?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p6 = Product(name="OrganicBrow Eyebrow Gel", category="eye", description="Introducing OrganicBrow, our all-natural eyebrow makeup that will give you perfectly shaped and defined brows without any synthetic or harmful ingredients.Crafted with natural ingredients like castor oil, shea butter, and vitamin E, OrganicBrow nourishes and strengthens your brows while still providing a precise and long-lasting hold. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.OrganicBrow's unique brush applicator is designed to shape and define your brows with ease, giving you a natural and polished look. The product is available in a variety of shades to match your hair color, allowing you to create a seamless and natural look.Not only is OrganicBrow kind to your brows and skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and unnatural brow products and hello to OrganicBrow – the perfect choice for achieving natural and beautiful brows.", price=15.99, image_url="https://th.bing.com/th/id/OIG.aouOZDKmJeekKbh371cY?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p7 = Product(name="NaturGloss Lip Gloss", category="lip", description="Introducing NaturGloss, our all-natural lip gloss that will give your lips a glossy and nourished look without any synthetic or harmful ingredients.Crafted with organic ingredients like coconut oil, shea butter, and vitamin E, NaturGloss hydrates and nourishes your lips while still providing a high-shine finish. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.NaturGloss's smooth and non-sticky formula allows for comfortable wear and long-lasting shine. The gloss is available in a variety of shades to match your personal style and preferences, giving you a customizable and beautiful look.Not only is NaturGloss kind to your lips and skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and unnatural lip glosses and hello to NaturGloss – the perfect choice for achieving a natural and beautiful shine.", price=17.99, image_url="https://th.bing.com/th/id/OIG.kVeYG23FZ.XTTRNNain8?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p8 = Product(name="Soft Lips Lipstick", category="lip", description="Introducing Soft Lips, our all-natural lipstick crayon that will give you a soft and smooth pout without any synthetic or harmful ingredients.Crafted with natural ingredients like mango butter, jojoba oil, and vitamin E, Soft Lips provides intense hydration and nourishment to your lips while still providing a beautiful and long-lasting color. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Soft Lips's unique crayon design allows for precise application and easy touch-ups on the go. The lipstick is available in a variety of soft and wearable shades, giving you a natural and beautiful look.Not only is Soft Lips kind to your lips and skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and drying lipsticks and hello to Soft Lips – the perfect choice for achieving a soft and natural pout.", price=10.99, image_url="https://www.sephora.com/productimages/sku/s2432904-main-zoom.jpg?imwidth=460", is_featured=True)
    p9 = Product(name="Artist Couture Lipstick", category="lip", description="Artist Couture is our all-natural lipstick that will give you a soft and smooth pout without any synthetic or harmful ingredients.Crafted with natural ingredients like mango butter, jojoba oil, and vitamin E, Soft Lips provides intense hydration and nourishment to your lips while still providing a beautiful and long-lasting color. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Silk Cream kind to your lips and skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and drying lipsticks and hello to Soft Lips – the perfect choice for achieving a soft and natural look.", price=14.99, image_url="https://www.sephora.com/productimages/sku/s2344331-main-zoom.jpg?imwidth=460", is_featured=True)
    p10 = Product(name="Pure Lips LipBalm", category="lip", description="Introducing Pure Lips, our all-natural lip balm that will keep your lips soft, smooth, and hydrated without any synthetic or harmful ingredients.Crafted with organic ingredients like beeswax, coconut oil, and shea butter, Pure Lips provides intense hydration and nourishment to your lips. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Pure Lips's smooth and non-greasy formula allows for comfortable wear and long-lasting moisture. The lip balm is available in a variety of flavors to match your personal preferences, including mint, vanilla, and citrus.", price=18.99, image_url="https://th.bing.com/th/id/OIG.6qZ9JVLWc23_osROAimZ?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=False)
    p11 = Product(name="SmoothLips Lipstick", category="lip", description="Introducing SmoothLips, our all-natural lipstick that will keep your lips soft, smooth, and hydrated without any synthetic or harmful ingredients.Crafted with organic ingredients like beeswax, coconut oil, and shea butter, this product provides intense hydration and nourishment to your lips. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.", price=25.99, image_url="https://www.sephora.com/productimages/sku/s2116713-main-zoom.jpg?imwidth=460", is_featured=True)
    p12 = Product(name="NatureConceal Concealer", category="face", description="Introducing NatureConceal, our all-natural concealer that will help you achieve a flawless and natural-looking complexion without any synthetic or harmful ingredients.Crafted with natural ingredients like chamomile, green tea, and vitamin E, NatureConceal provides coverage while still nourishing and hydrating your skin. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.NatureConceal's lightweight and blendable formula allows for easy application and seamless blending, giving you a natural and beautiful finish. The concealer is available in a variety of shades to match your skin tone and provide customizable coverage.Not only is NatureConceal kind to your skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and unnatural concealers and hello to NatureConceal – the perfect choice for achieving a natural and flawless complexion.", price=26.88, image_url="https://www.gloskinbeauty.com/media/catalog/product/cache/4d582bbb8895b6ae89f431d6eec07458/p/d/pdp_hero_under_eye_concealer_beige.jpg", is_featured=True)
    p13 = Product(name="Sunkissed Glow Bronzer", category="face", description="Introducing Sunkissed Glow, our all-natural bronzer that will give you a beautiful and sun-kissed glow without any synthetic or harmful ingredients.Crafted with natural ingredients like cocoa powder, shea butter, and vitamin E, Sunkissed Glow provides a subtle and buildable glow while still nourishing and hydrating your skin. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Sunkissed Glow's silky and blendable formula allows for easy application and seamless blending, giving you a natural and beautiful finish. The bronzer is available in a variety of shades to match your skin tone and provide customizable coverage.Not only is Sunkissed Glow kind to your skin, but it's also eco-friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.Say goodbye to harsh and unnatural bronzers and hello to Sunkissed Glow – the perfect choice for achieving a natural and radiant glow.", price=20.99, image_url="https://www.sephora.com/productimages/sku/s2456739-main-zoom.jpg?imwidth=1224", is_featured=True)
    p14 = Product(name="NaturBB Cream", category="face", description="Introducing NaturBB, our all-natural BB cream that will provide you with flawless and healthy-looking skin without any synthetic or harmful ingredients.Crafted with natural ingredients like aloe vera, chamomile, and green tea, NaturBB provides coverage while still nourishing and hydrating your skin. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.NaturBB's lightweight and buildable formula allows for customizable coverage, giving you a natural and beautiful finish. The BB cream is available in a variety of shades to match your skin tone and provide a seamless and flawless complexion.", price=25.99, image_url="https://th.bing.com/th/id/OIG.MdUxnDX9ZGl0Zk2ZWLtn?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p15 = Product(name="Radiant Glow Highlighter", category="face", description="Introducing Radiant Glow, our all-natural highlighter that will give you a stunning and radiant glow without any synthetic or harmful ingredients.Crafted with natural ingredients like rosehip oil, vitamin E, and mica minerals, Radiant Glow provides a subtle and buildable highlight while still nourishing and hydrating your skin. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Radiant Glow's smooth and blendable formula allows for easy application and seamless blending, giving you a natural and beautiful finish. The highlighter is available in a variety of shades to match your skin tone and provide customizable coverage.", price=17.99, image_url="https://th.bing.com/th/id/OIG.5Y4Oo8ux3s.tIdAIjVVA?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p16 = Product(name="Glam Eye Eyeshadow Palette", category="eye", description="Introducing Glam Eye, our all-natural eyeshadow palette that will give you a stunning and glamorous eye look without any synthetic or harmful ingredients.Crafted with natural ingredients like argan oil, cocoa butter, and vitamin E, Glam Eye provides a smooth and blendable eyeshadow while still nourishing and hydrating your skin. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Glam Eye's palette contains a variety of shades ranging from bold and metallic to shimmery and dramatic, allowing for endless possibilities and customization of your eye look. The eyeshadows are highly pigmented and long-lasting, ensuring that your eye makeup stays flawless all day.", price=24.99, image_url="https://th.bing.com/th/id/OIG.KTxoM6seABJuGXon8tQG?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p17 = Product(name="Earthly Tones Eyeshadow", category="eye", description="Introducing Earthly Tones, our all-natural eyeshadow palette that will give you a beautiful and earthy eye look without any synthetic or harmful ingredients.Crafted with natural ingredients like coconut oil, cocoa butter, and vitamin E, Earthly Tones provides a smooth and blendable eyeshadow while still nourishing and hydrating your skin. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Earthly Tones' palette contains a variety of shades ranging from warm and natural to cool and muted, allowing for endless possibilities and customization of your eye look. The eyeshadows are highly pigmented and long-lasting, ensuring that your eye makeup stays flawless all day.Not only is Earthly Tones kind to your skin, but it's also eco-friendly. The palette is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the environment.", price=30.99, image_url="https://th.bing.com/th/id/OIG.S.G5mMpRfGlVH8RskH0n?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn", is_featured=True)
    p18 = Product(name="Drama Lash Mascara", category="eye", description="Introducing Drama Lash, our all-natural mascara that will give you bold and dramatic lashes without any synthetic or harmful ingredients.Crafted with natural ingredients like beeswax, carnauba wax, and vitamin E, Drama Lash provides volume and length while still nourishing and strengthening your lashes. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Drama Lash's unique brush design allows for precise application and separation of your lashes, giving you a dramatic and stunning look. The mascara is highly pigmented and long-lasting, ensuring that your lashes stay bold and beautiful all day.", price=24.99, image_url="https://www.sephora.com/productimages/sku/s2638336-main-zoom.jpg?imwidth=460", is_featured=True)
    p19 = Product(name="Natural Line Eyeliner", category="eye", description="Introducing Natural Line, our all-natural eyeliner that will give you a bold and defined eye look without any synthetic or harmful ingredients.Crafted with natural ingredients like aloe vera, coconut oil, and vitamin E, Natural Line provides a smooth and precise application while still nourishing and hydrating your delicate eye area. The formula is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Natural Line's unique felt-tip design allows for easy and precise application, giving you a bold and defined line every time. The eyeliner is highly pigmented and long-lasting, ensuring that your eye makeup stays flawless all day.", price=18.99, image_url="https://www.sephora.com/productimages/sku/s2384949-main-zoom.jpg?imwidth=460", is_featured=True)
    p20 = Product(name="Glam Blush", category="face", description="Introducing Glam Blush, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Glam Blush provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Glam Blush's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Glam Blush kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=25.99, image_url="https://www.sephora.com/productimages/sku/s2464881-main-zoom.jpg?imwidth=1224", is_featured=True)
    p21 = Product(name="Rose Bronzer", category="face", description="Introducing Rose Bronzer, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Rose Bronzer provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Rose Bronzer's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Rose Bronzer kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=35.99, image_url="https://www.sephora.com/productimages/sku/s2411528-main-zoom.jpg?imwidth=5004", is_featured=True)
    p22 = Product(name="Primer Glow", category="face", description="Introducing Primer Glow, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Primer Glow provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Primer Glow's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Primer Glow kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=15.99, image_url="https://www.sephora.com/productimages/sku/s2665024-main-zoom.jpg?imwidth=500", is_featured=True)
    p23 = Product(name="Yummy Skin", category="face", description="Introducing Yummy Skin, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Yummy Skin provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Yummy Skin's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Yummy Skin kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=28.99, image_url="https://www.sephora.com/productimages/sku/s2574861-main-zoom.jpg?imwidth=500", is_featured=True)
    p24 = Product(name="Glow Eyeshadow Trio", category="eye", description="Introducing Glow eyeshadow trio, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Glow eyeshadow trio provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Glow eyeshadow trio's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Glow eyeshadow trio kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=17.99, image_url="https://www.sephora.com/productimages/sku/s2650083-main-zoom.jpg?imwidth=500", is_featured=True)
    p25 = Product(name="Glamorous Eyeshadow", category="eye", description="Introducing Glamorous Eyeshadow, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Glamorous Eyeshadow provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Glamorous Eyeshadow's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Glamorous Eyeshadow kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=16.88, image_url="https://www.sephora.com/productimages/sku/s2640266-main-zoom.jpg?imwidth=500", is_featured=True)
    p26 = Product(name="Quickliner Eyeliner", category="eye", description="Introducing Quickliner Eyeliner, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Quickliner Eyeliner provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Quickliner Eyeliner's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Quickliner Eyeliner kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=19.99, image_url="https://www.sephora.com/productimages/sku/s2575660-main-zoom.jpg?imwidth=500", is_featured=True)
    p27 = Product(name="Super Glow Mascara", category="eye", description="Introducing Super Glow Mascara, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Super Glow Mascara provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Super Glow Mascara's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Super Glow Mascara kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=20.99, image_url="https://www.sephora.com/productimages/sku/s2617603-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=500", is_featured=True)
    p28 = Product(name="Lip Gloss Stick", category="lip", description="Introducing Lip Gloss Stick, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Lip Gloss Stick provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Lip Gloss Stick's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Lip Gloss Stick kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=30.99, image_url="https://www.sephora.com/productimages/sku/s2643435-main-zoom.jpg?imwidth=500", is_featured=True)
    p29 = Product(name="Glam Look", category="lip", description="Introducing Glam Look, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Glam Look provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Glam Look's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Glam Look kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=25.99, image_url="https://www.sephora.com/productimages/sku/s2591808-main-zoom.jpg?imwidth=500", is_featured=True)
    p30 = Product(name="Lip Liner", category="lip", description="Introducing Lip Liner, our all-natural blush that will give you a healthy and radiant glow without any synthetic or harmful ingredients.Crafted with natural pigments derived from fruits and vegetables, Lip Liner provides a vibrant and long-lasting pop of color to your cheeks. The formula is infused with nourishing ingredients such as jojoba oil and vitamin E to keep your skin feeling soft and supple all day long.Lip Liner's buildable formula allows for customizable coverage, so you can achieve a natural or bold look depending on your preference. The blush is free from synthetic fragrances, dyes, and preservatives, making it a safe and healthy choice for your beauty routine.Not only is Lip Liner kind to your skin, but it's also environmentally friendly. The packaging is made from sustainable materials, so you can feel good about your purchase knowing that you're making a positive impact on the planet.Say goodbye to harsh and unnatural blushes and hello to Bloom Blush – the perfect choice for achieving a natural and healthy flush of color.", price=25.99, image_url="https://www.sephora.com/productimages/sku/s1719079-main-zoom.jpg?imwidth=500", is_featured=True)


    # Create carts
    cart1 = Cart(user=user1, is_ordered=False)
    cart2 = Cart(user=user2, is_ordered=False)

    # Add products to carts
    cart_product1 = CartProduct(cart=cart1, product=p1, quantity=1)
    cart_product2 = CartProduct(cart=cart2, product=p2, quantity=1)
    

    # Add instances to the session
    db.session.add_all([user1, user2, p1, p2,p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,p21, p22,p23,p24,p25,p27,p28,p29,p30, cart1, cart2, cart_product1, cart_product2])

    # Commit the session to persist the data in the database
    db.session.commit()
