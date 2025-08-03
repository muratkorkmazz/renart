
import { useEffect, useState } from 'react';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar } from 'swiper/modules';



function App() {

  const [goldPrice, setGoldPrice] = useState(0);
  const [products, setProducts] = useState([]);




  // useEffect(() => {

  //   const myHeaders = new Headers();
  //   myHeaders.append("x-api-key", "sk_44Af29374bB3089e94e2f1f233598b628d1F914DFAb7d974");
    
  //   const requestOptions = {
  //      method: "GET",
  //      headers: myHeaders,
  //      redirect: "follow"
  //   };
    
  //   fetch("https://gold.g.apised.com/v1/latest?metals=XAU&base_currency=USD&weight_unit=gram", requestOptions)
  //      .then((response) => response.json())
  //      .then((result) =>   setGoldPrice(result.data.metal_prices.XAU.price_24k) )
      
      
  //      .catch((error) => console.error(error));


  // }, [])


  useEffect(() => {

    fetch("http://localhost:3001/api/fetch-data") // <-- Replace with your real API
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));

  }, [])


  return (
    <>

      <h1 className='header'> Product List</h1>


      


      {products.length > 0 &&
        <Swiper
          modules={[Navigation, Scrollbar]}
          loop={true}
          slidesPerView={4}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          scrollbar={{ el: '.swiper-scrollbar', draggable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
          }}
        >
          {products.map((el, i) => (
            <SwiperSlide key={i}>
              <Card goldPrice={goldPrice} data={el} />
            </SwiperSlide>
          ))}
          {/* Add these elements for navigation and scrollbar */}


          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-scrollbar"></div>
        </Swiper>
      }





    </>
  )
}

function Card({ data, goldPrice }) {


  let [activeColour, setActiveColour] = useState("yellow");
  let [activeImage, setActiveImage] = useState(data.images.yellow)




  function changeColour(index, image) {
    setActiveImage(image);
    setActiveColour(index);

  }




  return (
    <>
      <div className='container' >
        <div>
          <img
            src={activeImage}
            alt="Product Image"
          />
        </div>

        <div className="product-title" >{data.name}</div>
        <div className="product-price">$ {((Number(data.popularityScore) + 1) * Number(data.weight) * goldPrice).toFixed(2)} USD</div>
        <div className="product-colors">

          {Object.keys(data.images).map((el)=>{return <span onClick={() => { changeColour(el, data.images[el]) }} className={activeColour === el ? `color color-${el} active` : `color color-${el}`} /> })}

        </div>
        <div className="product-variant">{activeColour.charAt(0).toUpperCase() + activeColour.slice(1)} Gold</div>
        <div className="product-rating">

          <div
            style={{
              position: "relative",
              display: "inline-block",
              fontSize: "20px",
              color: "#ccc"
            }}
          >
            ★★★★★
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${Number(data.popularityScore) * 100}%`,
                overflow: "hidden",
                color: "#f7c873",
                whiteSpace: "nowrap"
              }}
            >
              ★★★★★
            </div>
          </div>


          <span className="rating-value">{(Number(data.popularityScore) * 5).toFixed(1)}/5</span>
        </div>
      </div>
    </>
  )
}








export default App;
