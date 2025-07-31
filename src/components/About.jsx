import ProductCard from "./shared/ProductCard";

const products = [
    {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  }
]

const About = () => {   
    return (
        <div
        style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh"
            }}>
            <div
            className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white/80 rounded-lg p-8">
                <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                    About Us
                </h1>
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <p className="text-lg mb-4 text-justify">
                            We are a leading e-commerce platform dedicated to providing the best online shopping experience.
                            Our mission is to connect customers with high-quality products at competitive prices. We believe in transparency, customer satisfaction, and innovation.
                            Our team is passionate about technology and retail, and we strive to bring you the latest trends and products from around the world. Whether you're looking for electronics, fashion, or home goods, we have something for everyone.
                            Thank you for choosing us as your shopping destination. We look forward to serving you and making your online shopping experience enjoyable and hassle-free
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 mb-6 md:mb-0 ml-4">
                        <img src="https://embarkx.com/sample/placeholder.png" alt="About Us" 
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform
                        duration-300 hover:scale-105"/>
                    </div>
                </div>

                <div className="py-7 space-y-8">
                    <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                        Our Products
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product,index)=>(
                            <ProductCard key={index} product={product} 
                            image={product.image}
                            productName={product.productName}
                            description={product.description}
                            specialPrice={product.specialPrice}
                            price={product.price}
                            about
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    )
}
export default About;