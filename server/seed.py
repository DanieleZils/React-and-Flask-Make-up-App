from config import app, db
from models import User, Product, Cart, CartProduct



with app.app_context():

    User.query.delete()
    Product.query.delete()
    Cart.query.delete()
    CartProduct.query.delete()
    db.session.commit()



        # Create users
    user1 = User(username="john_doe", password_hash="password123")
    user2 = User(username="jane_doe", password_hash="password123")

    # Create products
    product1 = Product(name="Lipstick", category="Makeup", description="Red lipstick", price=9.99, image_url="https://www.sephora.com/productimages/sku/s2309631-main-zoom.jpg")
    product2 = Product(name="Eyeliner", category="Makeup", description="Black eyeliner", price=7.99, image_url="https://www.sephora.com/productimages/sku/s2480051-main-zoom.jpg")

    # Create carts
    cart1 = Cart(user=user1, is_ordered=False)
    cart2 = Cart(user=user2, is_ordered=False)

    # Add products to carts
    cart_product1 = CartProduct(cart=cart1, product=product1, quantity=1)
    cart_product2 = CartProduct(cart=cart1, product=product2, quantity=1)
    cart_product3 = CartProduct(cart=cart2, product=product2, quantity=2)

    # Add instances to the session
    db.session.add_all([user1, user2, product1, product2, cart1, cart2, cart_product1, cart_product2, cart_product3])

    # Commit the session to persist the data in the database
    db.session.commit()
