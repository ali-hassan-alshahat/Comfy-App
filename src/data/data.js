import slide1 from "../assets/slide-1.jpg"
import slide2 from "../assets/slide-2.jpg"
import slide3 from "../assets/slide-3.jpg"
import product2 from "../assets/product2.jpg"
import secondProduct2 from "../assets/product2-2.jpg"
import product3 from "../assets/product3.jpg"
import secondProduct3 from "../assets/product3-2.jpg"
import product4 from "../assets/product4.jpg"
import secondProduct4 from "../assets/product4-2.jpg"
import product5 from "../assets/product5.jpg"
import secondProduct5 from "../assets/product5-2.jpg"
import product6 from "../assets/product6.jpg"
import secondProduct6 from "../assets/product6-2.jpg"
import product7 from "../assets/product7.jpg"
import secondProduct7 from "../assets/product7-2.jpg"
import product8 from "../assets/product8.jpg"
import secondProduct8 from "../assets/product8-2.jpg"
import product9 from "../assets/product9.jpg"
import secondProduct9 from "../assets/product9-2.jpg"
import thirdProduct9 from "../assets/product9-3.jpg"
import product10 from "../assets/product10.jpg"
import secondProduct10 from "../assets/product10-2.jpg"
import thirdProduct10 from "../assets/product10-3.jpg"
import product11 from "../assets/product11.jpg"
import secondProduct11 from "../assets/product11-2.jpg"
import product12 from "../assets/product12.jpg"
import secondProduct12 from "../assets/product12-2.jpg"
import product13 from "../assets/product13.jpg"
import secondProduct13 from "../assets/product13-2.jpg"
import product14 from "../assets/product14.jpg"
import secondProduct14 from "../assets/product14-2.jpg"
import product15 from "../assets/product15.jpg"
import secondProduct15 from "../assets/product15-2.jpg"
import product16 from "../assets/product16.jpg"
import secondProduct16 from "../assets/product16-2.jpg"
import product17 from "../assets/product17.jpg"
import secondProduct17 from "../assets/product17-2.jpg"
import product18 from "../assets/product18.jpg"
import secondProduct18 from "../assets/product18-2.jpg"
import product19 from "../assets/product19.jpg"
import secondProduct19 from "../assets/product19-2.jpg"
import thirdProduct19 from "../assets/product19-3.jpg"
import product20 from "../assets/product20.jpg"
import secondProduct20 from "../assets/product20-2.jpg"
import product21 from "../assets/product21.jpg"
import secondProduct21 from "../assets/product21-2.jpg"
import product22 from "../assets/product22.jpg"
import secondProduct22 from "../assets/product22-2.jpg"
import thirdProduct22 from "../assets/product22-3.jpg"
import product23 from "../assets/product23.jpg"
import secondProduct23 from "../assets/product23-2.jpg"
import product24 from "../assets/product24.jpg"
import secondProduct24 from "../assets/product24-2.jpg"
import gitlab from "../assets/gitlab.png"
import axios from "../assets/axios.png"
import darkUniverse from "../assets/dark-universe.png"
import leo from "../assets/leo.png"
import ra from "../assets/ra.png"
import tidy from "../assets/tidy.png"
import insta1 from "../assets/insta-1.jpg"
import insta2 from "../assets/insta-2.jpg"
import insta3 from "../assets/insta-3.jpg"
import insta4 from "../assets/insta-4.jpg"
import insta5 from "../assets/insta-5.jpg"
import insta6 from "../assets/insta-6.jpg"
const mainSlider = {
  items : [{
    id : "1",
    img : slide1,
    price : "UP TO 50% OFF",
    text : "Outdoor Wicker Hanging Chair",
    explore : "Explore Now",
  }, {
    id : "2",
    img : slide2,
    price : "UP TO 70% OFF",
    text : "Ray Pendant Lamp Choose Your Comfort",
    explore : "Explore Now",
  }, {
    id : "3",
    img : slide3,
    price : "UP TO 10% OFF",
    text : "Nano Tube Suspension Pendant Lamp",
    explore : "Explore Now",
  }]
}


const topTrending = {
  items : [{
    id : "Product3",
    title : "Panton lamp",
    img1 : product10,
    img2 : secondProduct10,
    img3 : thirdProduct10,
    price : "150.00",
    cart : "Add To Cart",
    isLighting : true,
    stock : "7",
    color1 : "rgb(223, 144, 60)",
    color2 : "rgb(204, 0, 0)",
    color3 : "rgb(11, 83, 148)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Lighting",
    text : "The perfect addition to your bedroom decor. Our lamp features a compact and modern design that will complement any decor style. The lamp is made of high-quality metal and glass, ensuring durability and longevity.The lamp's easy-to-use switch allows for conveniently turning the lamp on and off, without having to get out of bed. The lamp's adjustable brightness level also allows for customized lighting to suit your needs.Whether you're looking for a stylish and functional addition to your bedroom, the Panton lamp is the perfect choice. Its high-quality construction and durable materials ensure long-lasting comfort and style.Order your Panton lamp today and experience the ultimate in comfort and style in your bedroom.",
  },{
    id : "Product1",
    title : "Zunkel Schwarz",
    img1 : product4,
    img2 : secondProduct4,
    stock : "Out Of Stock",
    color1 : "rgb(114, 114 , 116)",
    color2 : "rgb(34, 34 , 34)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Chairs",
    price : "320.00",
    discount : "Discount: ($15%)",
    discountPrice: "272.00",
    cart : "Add To Cart",
    isChairs : true,
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience.It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility.",
  },{
    id : "Product5",
    title : "Airia Oak Desk",
    img1 : product13,
    img2 : secondProduct13,
    price : "275.00",
    cart : "Add To Cart",
    isTables : true,
    stock : "7",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(227, 154, 38)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Tables",
    text :"The perfect addition to your office or business. Our table features a sleek and modern design that will create a professional and sophisticated atmosphere. The table is made of high-quality wood, ensuring durability and longevity.Whether you're looking to create a welcoming reception area for your clients and guests or need a space for your receptionist to work, the Airia Oak Desk is the perfect solution. Its versatile design makes it perfect for any office or business, while its high-quality construction ensures long-lasting comfort and style.Order your Airia Oak Desk today and experience the ultimate in comfort and style in your office or business reception area."
  },{
    id : "Product4",
    title : "Chesterfield Sofa",
    img1 : product12,
    img2 : secondProduct12,
    price : "950.00",
    cart : "Add To Cart",
    isSofas : true,
    stock : "Out Of Stock",
    color1 : "rgb(223, 144, 60)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Sofas",
    text :"The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience.Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Chesterfield Sofa is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain.Order Chesterfield Sofa today and experience the ultimate in comfort and style."
  },{
    id : "Product2",
    title : "Namaste Vase",
    img1 : product5,
    img2 : secondProduct5,
    stock : "Out Of Stock",
    color1 : "rgb(177, 99, 99)",
    color2 : "rgb(163 123 113)",
    vendor : "Tidy",
    SKU : "N/A",
    category : "Decor",
    price : "225.00",
    cart : "Add To Cart",
    isDecor : true,
    text : "The perfect addition to your home decor collection. Our vase features a unique and eye-catching design that is sure to impress. The vase is made of high-quality ceramic, ensuring durability and longevity.The Namaste Vase is designed with a beautiful and intricate lotus flower pattern, which symbolizes purity, enlightenment, and self-regeneration. The vase's serene white color adds a touch of elegance to any room, while its curved shape and slim neck make it perfect for displaying your favorite flowers or greenery.Order your Namaste Vase today and add a touch of serenity and elegance to your home decor.",
  }
  ,{
    id : "Product6",
    title : "Aeron Chair",
    img1 : product14,
    img2 : secondProduct14,
    price : "350.00",
    cart : "Add To Cart",
    isChairs : true,
    stock : "4",
    color1 : "rgb(11, 83, 148)",
    color2 : "rgb(128, 128, 128)",
    vendor : "Leo",
    SKU : "N/A",
    category : "Chairs",
    text :"The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product7",
    title : "Sayl Pine Chair",
    img1 : product17,
    img2 : secondProduct17,
    price : "344.00",
    cart : "Add To Cart",
    isChairs : true,
    stock : "4",
    color1 : "rgb(206, 181, 154)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Axios",
    SKU : "N/A",
    category : "Chairs",
    text :"The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product8",
    title : "Arco Ceil Lamp",
    img1 : product18,
    img2 : secondProduct18,
    price : "265.00",
    discount : "Discount: ($7%)",
    discountPrice: "246.45",
    cart : "Add To Cart",
    isLighting : true,
    stock : "Out Of Stock",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Lighting",
    text :"The perfect addition to your home or professional studio. Our lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and plastic, ensuring durability and longevity.The lamp's sturdy metal frame provides stability and ensures the lamp will last for years to come. The frame is made of durable metal, adding to the lamp's durability and providing a stylish touch. The lamp's compact size fits perfectly on your desk or worktable, providing ample light for your artistic projects.The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off.Order your Arco Ceil Lamp today and experience the ultimate in comfort and style in your creative space."
  },{
    id : "Product9",
    title : "Bourgie Cushion",
    img1 : product21,
    img2 : secondProduct21,
    price : "175.00",
    cart : "Add To Cart",
    isDecor : true,
    stock : "8",
    color1 : "rgb(11, 83, 148)",
    color2 : "rgb(219, 178, 55)",
    vendor : "Git Lab",
    SKU : "N/A",
    category : "Decor",
    text :"The perfect addition to your home decor collection. Our cushion features a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. The cushion's plush filling is made of high-density foam, which conforms to your body, reducing pressure points and improving circulation.The cushion's removable cover is easy to clean and maintain, making it convenient for everyday use. The cover's zipper closure ensures a secure fit, while its machine-washable fabric allows for easy cleaning and maintenance.Order your ComfyCushion today and experience the ultimate in comfort and style."
  },{
    id : "Product10",
    title : "Vitra Eames House Bird",
    img1 : product23,
    img2 : secondProduct23,
    price : "120.00",
    cart : "Add To Cart",
    isDecor : true,
    stock : "Out Of Stock",
    color1 : "rgb(95 56 34)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Leo",
    SKU : "N/A",
    category : "Decor",
    text :"The perfect addition to your home decor collection. Our bird-shaped decor features a unique and whimsical design that is sure to add a touch of charm to any room. The decor is made of high-quality resin material, ensuring durability and longevity.The decor is lightweight and easy to handle, making it easy to move around and display in different areas of your home. Its unique design and lifelike appearance make it a great conversation starter and a beautiful accent piece for any room.Order your ComfyBird Decor today and add a touch of whimsy and elegance to your home decor."
  },{
    id : "Product11",
    title : "Office Table",
    img1 : product6,
    img2 : secondProduct6,
    price : "175.00",
    cart : "Add To Cart",
    isTables : true,
    stock : "Out Of Stock",
    color1 : "rgb(227, 154, 38)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Tables",
    text :"The perfect addition to your home office or workspace. Our table features a sleek and modern design that will complement any decor style. The table is made of high-quality wood, ensuring durability and longevity.Whether you're working from home or need a space to focus and get things done, the Office Table is the perfect solution. Its versatile design makes it perfect for any home office or workspace, while its high-quality construction ensures long-lasting comfort and style.Order your Office Table today and experience the ultimate in comfort and style in your home office or workspace."
  },{
    id : "Product12",
    title : "Living Lamp",
    img1 : product16,
    img2 : secondProduct16,
    price : "550.00",
    cart : "Add To Cart",
    isLighting : true,
    stock : "Out Of Stock",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Lighting",
    text :"The perfect addition to your home decor collection. Our floor lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and fabric, ensuring durability and longevity.Whether you're looking for a stylish and functional addition to your living room, bedroom, or home office, the Living Lamp is the perfect choice. Its high-quality construction and durable materials ensure long-lasting comfort and style.Order your Living Lamp today and experience the ultimate in comfort and style in your home."
  }],
  categories : [{
    id : "Product13",
    title : "Spinning pendant lamp",
    img1 : product8,
    img2 : secondProduct8,
    stock : "3",
    color1 : "rgb(128, 128, 128)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Git Lab",
    SKU : "N/A",
    category : "Lighting",
    price : "225.00",
    cart : "Add To Cart",
    text:"The perfect addition to your home decor collection. Our pendant light features a unique and modern design that will add a touch of elegance to any room. The light is made of high-quality metal and glass, ensuring durability and longevity. The Spinning pendant lamp is designed with a stunning glass shade, which diffuses the light and creates a warm and inviting atmosphere. The light's sleek and simple design adds a touch of sophistication to any space, while its adjustable cord allows for customized hanging height. Order your Spinning pendant lamp today and experience the ultimate in comfort and style in your home."
  },{
    id : "Product14",
    title : "Lighting Acorn Pendant Light Black",
    img1 : product24,
    img2 : secondProduct24,
    price : "320.00",
    discount : "Discount: ($25%)",
    discountPrice: "240.00",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Lighting",
    text: "The perfect addition to your home decor collection. Our ceiling lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and acrylic, ensuring durability and longevity. The Lighting Acorn Pendant Light Black is designed with a stunning acrylic shade, which diffuses the light and creates a soft and inviting atmosphere. The lamp's sleek and simple design adds a touch of sophistication to your hallway, while its flush mount design saves space and provides a clean and polished look. The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off. Order your ComfyGlow Ceiling Lamp today and experience the ultimate in comfort and style in your home."
  },{
    id : "Product15",
    title : "Lighting Acorn Pendant Light Black",
    img1 : product2,
    img2 : secondProduct2,
    price : "375.00",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(227, 154, 38)",
    vendor : "Tidy",
    SKU : "N/A",
    category : "Tables",
    text: "The perfect addition to your dining room or kitchen. Our table features a sleek and modern design that will complement any decor style. The table is made of high-quality wood, ensuring durability and longevity. The table's sturdy legs provide stability and ensure the table will last for years to come. The legs are made of solid wood, adding to the table's durability and providing a stylish touch. The table's compact size fits perfectly in small spaces, making it ideal for apartments or cozy dining areas. Order your Pillar Dining Table Round today and experience the ultimate in comfort and style."
  },{
    id : "Product16",
    title : "Amp Pendant Light Large",
    img1 : product3,
    img2 : secondProduct3,
    price : "235.00",
    discount : "Discount: ($10%)",
    discountPrice: "211.50",
    cart : "Add To Cart",
    stock : "4",
    color1 : "rgb(211, 211, 211)",
    color2 : "rgb(221 214 188)",
    vendor : "Git Lab",
    SKU : "N/A",
    category : "Lighting",
    text: "The perfect addition to your home decor collection. Our ceiling lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and acrylic, ensuring durability and longevity. The Lighting Acorn Pendant Light Black is designed with a stunning acrylic shade, which diffuses the light and creates a soft and inviting atmosphere. The lamp's sleek and simple design adds a touch of sophistication to your hallway, while its flush mount design saves space and provides a clean and polished look. The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off. Order your ComfyGlow Ceiling Lamp today and experience the ultimate in comfort and style in your home."
  },{
    id : "Product17",
    title : "Cherner Walnut Armchair",
    img1 : product20,
    img2 : secondProduct20,
    price : "415.00",
    discount : "Discount: ($13%)",
    discountPrice: "361.05",
    cart : "Add To Cart",
    stock : "3",
    color1 : "rgb(128, 128, 128)",
    color2 : "rgb(220, 220, 220)",
    vendor : "Tidy",
    SKU : "N/A",
    category : "Chairs",
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product18",
    title : "Bertoia Side Chair",
    img1 : product15,
    img2 : secondProduct15,
    price : "477.00",
    discount : "Discount: ($5%)",
    discountPrice: "452.15",
    cart : "Add To Cart",
    stock : "3",
    color1 : "rgb(206, 181, 154)",
    color2 : "rgb(106 88 69)",
    vendor : "Tidy",
    SKU : "N/A",
    category : "Chairs",
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product19",
    title : "Enea Lottus Chair",
    img1 : product19,
    img2 : secondProduct19,
    img3 : thirdProduct19,
    price : "580.00",
    cart : "Add To Cart",
    stock : "1",
    color1 : "rgb(163 149 135)",
    color2 : "rgb(195, 174, 152)",
    color3 : "rgb(87 82 79)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Chairs",
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product20",
    title : "Chair Oak Matt Lacquered",
    img1 : product22,
    img2 : secondProduct22,
    img3 : thirdProduct22,
    price : "150.00",
    cart : "Add To Cart",
    stock : "2",
    color1 : "rgb(151 151 151)",
    color2 : "rgb(183 140 100)",
    color3 : "rgb(64 64 64)",
    vendor : "Axios",
    SKU : "N/A",
    category : "Chairs",
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product21",
    title : "Bora Armchair",
    img1 : product9,
    img2 : secondProduct9,
    img3 : thirdProduct9,
    price : "150.00",
    discount : "Discount: ($7%)",
    discountPrice: "139.50",
    cart : "Add To Cart",
    stock : "5",
    color1 : "rgb(94 105 73)",
    color2 : "rgb(66 66 66)",
    color3 : "rgb(129 114 109)",
    vendor : "Axios",
    SKU : "N/A",
    category : "Chairs",
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product22",
    title : "Mundo Sofa With Cushion",
    img1 : product11,
    img2 : secondProduct11,
    price : "450.00",
    discount : "Discount: ($15%)",
    discountPrice: "382.50",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(87 86 94)",
    color2 : "rgb(176 163 147)",
    vendor : "Axios",
    SKU : "N/A",
    category : "Sofas",
    text : "The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience. Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Mundo Sofa With Cushion is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain. Order your Mundo Sofa With Cushion today and experience the ultimate in comfort and style."
  },{
    id : "Product23",
    title : "Mags Sofa 2.5 Seater",
    img1 : product7,
    img2 : secondProduct7,
    price : "750.00",
    discount : "Discount: ($25%)",
    discountPrice: "562.50",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(187 187 187)",
    color2 : "rgb(93 88 95)",
    vendor : "Leo",
    SKU : "N/A",
    category : "Sofas",
    text : "The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience. Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Mags Sofa 2.5 Seater is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain. Order your Mags Sofa 2.5 Seater today and experience the ultimate in comfort and style."
  },{
    id : "Product3",
    title : "Panton lamp",
    img1 : product10,
    img2 : secondProduct10,
    img3 : thirdProduct10,
    price : "150.00",
    cart : "Add To Cart",
    stock : "7",
    color1 : "rgb(223, 144, 60)",
    color2 : "rgb(204, 0, 0)",
    color3 : "rgb(11, 83, 148)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Lighting",
    text : "The perfect addition to your bedroom decor. Our lamp features a compact and modern design that will complement any decor style. The lamp is made of high-quality metal and glass, ensuring durability and longevity.The lamp's easy-to-use switch allows for conveniently turning the lamp on and off, without having to get out of bed. The lamp's adjustable brightness level also allows for customized lighting to suit your needs.Whether you're looking for a stylish and functional addition to your bedroom, the Panton lamp is the perfect choice. Its high-quality construction and durable materials ensure long-lasting comfort and style.Order your Panton lamp today and experience the ultimate in comfort and style in your bedroom.",
  },{
    id : "Product1",
    title : "Zunkel Schwarz",
    img1 : product4,
    img2 : secondProduct4,
    stock : "Out Of Stock",
    color1 : "rgb(114, 114 , 116)",
    color2 : "rgb(34, 34 , 34)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Chairs",
    price : "320.00",
    discount : "Discount: ($15%)",
    discountPrice: "272.00",
    cart : "Add To Cart",
    text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience.It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility.",
  },{
    id : "Product5",
    title : "Airia Oak Desk",
    img1 : product13,
    img2 : secondProduct13,
    price : "275.00",
    cart : "Add To Cart",
    stock : "7",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(227, 154, 38)",
    vendor : "Ra",
    SKU : "N/A",
    category : "Tables",
    text :"The perfect addition to your office or business. Our table features a sleek and modern design that will create a professional and sophisticated atmosphere. The table is made of high-quality wood, ensuring durability and longevity.Whether you're looking to create a welcoming reception area for your clients and guests or need a space for your receptionist to work, the Airia Oak Desk is the perfect solution. Its versatile design makes it perfect for any office or business, while its high-quality construction ensures long-lasting comfort and style.Order your Airia Oak Desk today and experience the ultimate in comfort and style in your office or business reception area."
  },{
    id : "Product4",
    title : "Chesterfield Sofa",
    img1 : product12,
    img2 : secondProduct12,
    price : "950.00",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(223, 144, 60)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Sofas",
    text :"The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience.Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Chesterfield Sofa is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain.Order Chesterfield Sofa today and experience the ultimate in comfort and style."
  },{
    id : "Product2",
    title : "Namaste Vase",
    img1 : product5,
    img2 : secondProduct5,
    stock : "Out Of Stock",
    color1 : "rgb(177, 99, 99)",
    color2 : "rgb(163 123 113)",
    vendor : "Tidy",
    SKU : "N/A",
    category : "Decor",
    price : "225.00",
    cart : "Add To Cart",
    text : "The perfect addition to your home decor collection. Our vase features a unique and eye-catching design that is sure to impress. The vase is made of high-quality ceramic, ensuring durability and longevity.The Namaste Vase is designed with a beautiful and intricate lotus flower pattern, which symbolizes purity, enlightenment, and self-regeneration. The vase's serene white color adds a touch of elegance to any room, while its curved shape and slim neck make it perfect for displaying your favorite flowers or greenery.Order your Namaste Vase today and add a touch of serenity and elegance to your home decor.",
  }
  ,{
    id : "Product6",
    title : "Aeron Chair",
    img1 : product14,
    img2 : secondProduct14,
    price : "350.00",
    cart : "Add To Cart",
    stock : "4",
    color1 : "rgb(11, 83, 148)",
    color2 : "rgb(128, 128, 128)",
    vendor : "Leo",
    SKU : "N/A",
    category : "Chairs",
    text :"The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product7",
    title : "Sayl Pine Chair",
    img1 : product17,
    img2 : secondProduct17,
    price : "344.00",
    cart : "Add To Cart",
    stock : "4",
    color1 : "rgb(206, 181, 154)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Axios",
    SKU : "N/A",
    category : "Chairs",
    text :"The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
  },{
    id : "Product8",
    title : "Arco Ceil Lamp",
    img1 : product18,
    img2 : secondProduct18,
    price : "265.00",
    discount : "Discount: ($7%)",
    discountPrice: "246.45",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Lighting",
    text :"The perfect addition to your home or professional studio. Our lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and plastic, ensuring durability and longevity.The lamp's sturdy metal frame provides stability and ensures the lamp will last for years to come. The frame is made of durable metal, adding to the lamp's durability and providing a stylish touch. The lamp's compact size fits perfectly on your desk or worktable, providing ample light for your artistic projects.The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off.Order your Arco Ceil Lamp today and experience the ultimate in comfort and style in your creative space."
  },{
    id : "Product9",
    title : "Bourgie Cushion",
    img1 : product21,
    img2 : secondProduct21,
    price : "175.00",
    cart : "Add To Cart",
    stock : "8",
    color1 : "rgb(11, 83, 148)",
    color2 : "rgb(219, 178, 55)",
    vendor : "Git Lab",
    SKU : "N/A",
    category : "Decor",
    text :"The perfect addition to your home decor collection. Our cushion features a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. The cushion's plush filling is made of high-density foam, which conforms to your body, reducing pressure points and improving circulation.The cushion's removable cover is easy to clean and maintain, making it convenient for everyday use. The cover's zipper closure ensures a secure fit, while its machine-washable fabric allows for easy cleaning and maintenance.Order your ComfyCushion today and experience the ultimate in comfort and style."
  },{
    id : "Product10",
    title : "Vitra Eames House Bird",
    img1 : product23,
    img2 : secondProduct23,
    price : "120.00",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(95 56 34)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Leo",
    SKU : "N/A",
    category : "Decor",
    text :"The perfect addition to your home decor collection. Our bird-shaped decor features a unique and whimsical design that is sure to add a touch of charm to any room. The decor is made of high-quality resin material, ensuring durability and longevity.The decor is lightweight and easy to handle, making it easy to move around and display in different areas of your home. Its unique design and lifelike appearance make it a great conversation starter and a beautiful accent piece for any room.Order your ComfyBird Decor today and add a touch of whimsy and elegance to your home decor."
  },{
    id : "Product11",
    title : "Office Table",
    img1 : product6,
    img2 : secondProduct6,
    price : "175.00",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(227, 154, 38)",
    color2 : "rgb(34, 34, 34)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Tables",
    text :"The perfect addition to your home office or workspace. Our table features a sleek and modern design that will complement any decor style. The table is made of high-quality wood, ensuring durability and longevity.Whether you're working from home or need a space to focus and get things done, the Office Table is the perfect solution. Its versatile design makes it perfect for any home office or workspace, while its high-quality construction ensures long-lasting comfort and style.Order your Office Table today and experience the ultimate in comfort and style in your home office or workspace."
  },{
    id : "Product12",
    title : "Living Lamp",
    img1 : product16,
    img2 : secondProduct16,
    price : "550.00",
    cart : "Add To Cart",
    stock : "Out Of Stock",
    color1 : "rgb(34, 34, 34)",
    color2 : "rgb(255, 255, 255)",
    vendor : "Dark Universe",
    SKU : "N/A",
    category : "Lighting",
    text :"The perfect addition to your home decor collection. Our floor lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and fabric, ensuring durability and longevity.Whether you're looking for a stylish and functional addition to your living room, bedroom, or home office, the Living Lamp is the perfect choice. Its high-quality construction and durable materials ensure long-lasting comfort and style.Order your Living Lamp today and experience the ultimate in comfort and style in your home."
  }]
  }

  const allCategories = {
    categories : [{
      category : "All Categories"
    },{
      category : "Decor"
    },{
      category : "Chairs"
    },{
      category : "Sofas"
    },{
      category : "Tables"
    },{
      category : "Lighting"
    }],
    brands : [{
      brand : "All Brands"
    },{
      brand : "Tidy"
    },{
      brand : "Git Lab"
    },{
      brand : "Dark Universe"
    },{
      brand : "Leo"
    },{
      brand : "Ra"
    },{
      brand : "Axios"
    }]
  }

  const allItems = {
    items : [{
      id : "Product3",
      title : "Panton lamp",
      img1 : product10,
      img2 : secondProduct10,
      img3 : thirdProduct10,
      price : "150.00",
      cart : "Add To Cart",
      isLighting : true,
      isRa : true,
      stock : "7",
      color1 : "rgb(223, 144, 60)",
      color2 : "rgb(204, 0, 0)",
      color3 : "rgb(11, 83, 148)",
      vendor : "Ra",
      SKU : "N/A",
      category : "Lighting",
      text : "The perfect addition to your bedroom decor. Our lamp features a compact and modern design that will complement any decor style. The lamp is made of high-quality metal and glass, ensuring durability and longevity.The lamp's easy-to-use switch allows for conveniently turning the lamp on and off, without having to get out of bed. The lamp's adjustable brightness level also allows for customized lighting to suit your needs.Whether you're looking for a stylish and functional addition to your bedroom, the Panton lamp is the perfect choice. Its high-quality construction and durable materials ensure long-lasting comfort and style.Order your Panton lamp today and experience the ultimate in comfort and style in your bedroom.",
    },{
      id : "Product1",
      title : "Zunkel Schwarz",
      img1 : product4,
      img2 : secondProduct4,
      stock : "Out Of Stock",
      color1 : "rgb(114, 114 , 116)",
      color2 : "rgb(34, 34 , 34)",
      vendor : "Ra",
      SKU : "N/A",
      category : "Chairs",
      price : "320.00",
      discount : "Discount: ($15%)",
      discountPrice: "272.00",
      cart : "Add To Cart",
      isChairs : true,
      isRa : true,
      text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience.It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility.",
    },{
      id : "Product5",
      title : "Airia Oak Desk",
      img1 : product13,
      img2 : secondProduct13,
      price : "275.00",
      cart : "Add To Cart",
      isTables : true,
      isRa : true,
      stock : "7",
      color1 : "rgb(34, 34, 34)",
      color2 : "rgb(227, 154, 38)",
      vendor : "Ra",
      SKU : "N/A",
      category : "Tables",
      text :"The perfect addition to your office or business. Our table features a sleek and modern design that will create a professional and sophisticated atmosphere. The table is made of high-quality wood, ensuring durability and longevity.Whether you're looking to create a welcoming reception area for your clients and guests or need a space for your receptionist to work, the Airia Oak Desk is the perfect solution. Its versatile design makes it perfect for any office or business, while its high-quality construction ensures long-lasting comfort and style.Order your Airia Oak Desk today and experience the ultimate in comfort and style in your office or business reception area."
    },{
      id : "Product4",
      title : "Chesterfield Sofa",
      img1 : product12,
      img2 : secondProduct12,
      price : "950.00",
      cart : "Add To Cart",
      isSofas : true,
      isDarkUniverse : true,
      stock : "Out Of Stock",
      color1 : "rgb(223, 144, 60)",
      color2 : "rgb(34, 34, 34)",
      vendor : "Dark Universe",
      SKU : "N/A",
      category : "Sofas",
      text :"The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience.Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Chesterfield Sofa is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain.Order Chesterfield Sofa today and experience the ultimate in comfort and style."
    },{
      id : "Product2",
      title : "Namaste Vase",
      img1 : product5,
      img2 : secondProduct5,
      stock : "Out Of Stock",
      color1 : "rgb(177, 99, 99)",
      color2 : "rgb(163 123 113)",
      vendor : "Tidy",
      SKU : "N/A",
      category : "Decor",
      price : "225.00",
      cart : "Add To Cart",
      isDecor : true,
      isTidy : true,
      text : "The perfect addition to your home decor collection. Our vase features a unique and eye-catching design that is sure to impress. The vase is made of high-quality ceramic, ensuring durability and longevity.The Namaste Vase is designed with a beautiful and intricate lotus flower pattern, which symbolizes purity, enlightenment, and self-regeneration. The vase's serene white color adds a touch of elegance to any room, while its curved shape and slim neck make it perfect for displaying your favorite flowers or greenery.Order your Namaste Vase today and add a touch of serenity and elegance to your home decor.",
    }
    ,{
      id : "Product6",
      title : "Aeron Chair",
      img1 : product14,
      img2 : secondProduct14,
      price : "350.00",
      cart : "Add To Cart",
      isChairs : true,
      isLeo : true,
      stock : "4",
      color1 : "rgb(11, 83, 148)",
      color2 : "rgb(128, 128, 128)",
      vendor : "Leo",
      SKU : "N/A",
      category : "Chairs",
      text :"The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product7",
      title : "Sayl Pine Chair",
      img1 : product17,
      img2 : secondProduct17,
      price : "344.00",
      cart : "Add To Cart",
      isChairs : true,
      isAxios : true,
      stock : "4",
      color1 : "rgb(206, 181, 154)",
      color2 : "rgb(255, 255, 255)",
      vendor : "Axios",
      SKU : "N/A",
      category : "Chairs",
      text :"The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product8",
      title : "Arco Ceil Lamp",
      img1 : product18,
      img2 : secondProduct18,
      price : "265.00",
      discount : "Discount: ($7%)",
      discountPrice: "246.45",
      cart : "Add To Cart",
      isLighting : true,
      isDarkUniverse : true,
      stock : "Out Of Stock",
      color1 : "rgb(34, 34, 34)",
      color2 : "rgb(255, 255, 255)",
      vendor : "Dark Universe",
      SKU : "N/A",
      category : "Lighting",
      text :"The perfect addition to your home or professional studio. Our lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and plastic, ensuring durability and longevity.The lamp's sturdy metal frame provides stability and ensures the lamp will last for years to come. The frame is made of durable metal, adding to the lamp's durability and providing a stylish touch. The lamp's compact size fits perfectly on your desk or worktable, providing ample light for your artistic projects.The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off.Order your Arco Ceil Lamp today and experience the ultimate in comfort and style in your creative space."
    },{
      id : "Product9",
      title : "Bourgie Cushion",
      img1 : product21,
      img2 : secondProduct21,
      price : "175.00",
      cart : "Add To Cart",
      isDecor : true,
      isGitLab : true,
      stock : "8",
      color1 : "rgb(11, 83, 148)",
      color2 : "rgb(219, 178, 55)",
      vendor : "Git Lab",
      SKU : "N/A",
      category : "Decor",
      text :"The perfect addition to your home decor collection. Our cushion features a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. The cushion's plush filling is made of high-density foam, which conforms to your body, reducing pressure points and improving circulation.The cushion's removable cover is easy to clean and maintain, making it convenient for everyday use. The cover's zipper closure ensures a secure fit, while its machine-washable fabric allows for easy cleaning and maintenance.Order your ComfyCushion today and experience the ultimate in comfort and style."
    },{
      id : "Product10",
      title : "Vitra Eames House Bird",
      img1 : product23,
      img2 : secondProduct23,
      price : "120.00",
      cart : "Add To Cart",
      isDecor : true,
      isLeo : true,
      stock : "Out Of Stock",
      color1 : "rgb(95 56 34)",
      color2 : "rgb(34, 34, 34)",
      vendor : "Leo",
      SKU : "N/A",
      category : "Decor",
      text :"The perfect addition to your home decor collection. Our bird-shaped decor features a unique and whimsical design that is sure to add a touch of charm to any room. The decor is made of high-quality resin material, ensuring durability and longevity.The decor is lightweight and easy to handle, making it easy to move around and display in different areas of your home. Its unique design and lifelike appearance make it a great conversation starter and a beautiful accent piece for any room.Order your ComfyBird Decor today and add a touch of whimsy and elegance to your home decor."
    },{
      id : "Product11",
      title : "Office Table",
      img1 : product6,
      img2 : secondProduct6,
      price : "175.00",
      cart : "Add To Cart",
      isTables : true,
      isDarkUniverse : true,
      stock : "Out Of Stock",
      color1 : "rgb(227, 154, 38)",
      color2 : "rgb(34, 34, 34)",
      vendor : "Dark Universe",
      SKU : "N/A",
      category : "Tables",
      text :"The perfect addition to your home office or workspace. Our table features a sleek and modern design that will complement any decor style. The table is made of high-quality wood, ensuring durability and longevity.Whether you're working from home or need a space to focus and get things done, the Office Table is the perfect solution. Its versatile design makes it perfect for any home office or workspace, while its high-quality construction ensures long-lasting comfort and style.Order your Office Table today and experience the ultimate in comfort and style in your home office or workspace."
    },{
      id : "Product12",
      title : "Living Lamp",
      img1 : product16,
      img2 : secondProduct16,
      price : "550.00",
      cart : "Add To Cart",
      isLighting : true,
      isDarkUniverse : true,
      stock : "Out Of Stock",
      color1 : "rgb(34, 34, 34)",
      color2 : "rgb(255, 255, 255)",
      vendor : "Dark Universe",
      SKU : "N/A",
      category : "Lighting",
      text :"The perfect addition to your home decor collection. Our floor lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and fabric, ensuring durability and longevity.Whether you're looking for a stylish and functional addition to your living room, bedroom, or home office, the Living Lamp is the perfect choice. Its high-quality construction and durable materials ensure long-lasting comfort and style.Order your Living Lamp today and experience the ultimate in comfort and style in your home."
    },{
      id : "Product13",
      title : "Spinning pendant lamp",
      img1 : product8,
      img2 : secondProduct8,
      stock : "3",
      color1 : "rgb(128, 128, 128)",
      color2 : "rgb(34, 34, 34)",
      vendor : "Git Lab",
      SKU : "N/A",
      category : "Lighting",
      price : "225.00",
      cart : "Add To Cart",
      isLighting : true,
      isGitLab : true,
      text:"The perfect addition to your home decor collection. Our pendant light features a unique and modern design that will add a touch of elegance to any room. The light is made of high-quality metal and glass, ensuring durability and longevity. The Spinning pendant lamp is designed with a stunning glass shade, which diffuses the light and creates a warm and inviting atmosphere. The light's sleek and simple design adds a touch of sophistication to any space, while its adjustable cord allows for customized hanging height. Order your Spinning pendant lamp today and experience the ultimate in comfort and style in your home."
    },{
      id : "Product14",
      title : "Lighting Acorn Pendant Light Black",
      img1 : product24,
      img2 : secondProduct24,
      price : "320.00",
      discount : "Discount: ($25%)",
      discountPrice: "240.00",
      cart : "Add To Cart",
      isLighting : true,
      isRa : true,
      stock : "Out Of Stock",
      color1 : "rgb(34, 34, 34)",
      color2 : "rgb(255, 255, 255)",
      vendor : "Ra",
      SKU : "N/A",
      category : "Lighting",
      text: "The perfect addition to your home decor collection. Our ceiling lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and acrylic, ensuring durability and longevity. The Lighting Acorn Pendant Light Black is designed with a stunning acrylic shade, which diffuses the light and creates a soft and inviting atmosphere. The lamp's sleek and simple design adds a touch of sophistication to your hallway, while its flush mount design saves space and provides a clean and polished look. The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off. Order your ComfyGlow Ceiling Lamp today and experience the ultimate in comfort and style in your home."
    },{
      id : "Product15",
      title : "Lighting Acorn Pendant Light Black",
      img1 : product2,
      img2 : secondProduct2,
      price : "375.00",
      cart : "Add To Cart",
      isTables : true,
      isTidy : true,
      stock : "Out Of Stock",
      color1 : "rgb(34, 34, 34)",
      color2 : "rgb(227, 154, 38)",
      vendor : "Tidy",
      SKU : "N/A",
      category : "Tables",
      text: "The perfect addition to your dining room or kitchen. Our table features a sleek and modern design that will complement any decor style. The table is made of high-quality wood, ensuring durability and longevity. The table's sturdy legs provide stability and ensure the table will last for years to come. The legs are made of solid wood, adding to the table's durability and providing a stylish touch. The table's compact size fits perfectly in small spaces, making it ideal for apartments or cozy dining areas. Order your Pillar Dining Table Round today and experience the ultimate in comfort and style."
    },{
      id : "Product16",
      title : "Amp Pendant Light Large",
      img1 : product3,
      img2 : secondProduct3,
      price : "235.00",
      discount : "Discount: ($10%)",
      discountPrice: "211.50",
      cart : "Add To Cart",
      isLighting : true,
      isGitLab : true,
      stock : "4",
      color1 : "rgb(211, 211, 211)",
      color2 : "rgb(221 214 188)",
      vendor : "Git Lab",
      SKU : "N/A",
      category : "Lighting",
      text: "The perfect addition to your home decor collection. Our ceiling lamp features a sleek and modern design that will complement any decor style. The lamp is made of high-quality metal and acrylic, ensuring durability and longevity. The Lighting Acorn Pendant Light Black is designed with a stunning acrylic shade, which diffuses the light and creates a soft and inviting atmosphere. The lamp's sleek and simple design adds a touch of sophistication to your hallway, while its flush mount design saves space and provides a clean and polished look. The lamp's energy-saving LED bulbs provide bright and efficient lighting, reducing energy costs and promoting eco-friendly living. The lamp's easy-to-use switch allows for conveniently turning the lamp on and off. Order your ComfyGlow Ceiling Lamp today and experience the ultimate in comfort and style in your home."
    },{
      id : "Product17",
      title : "Cherner Walnut Armchair",
      img1 : product20,
      img2 : secondProduct20,
      price : "415.00",
      discount : "Discount: ($13%)",
      discountPrice: "361.05",
      cart : "Add To Cart",
      isTidy : true,
      isChairs : true,
      stock : "3",
      color1 : "rgb(128, 128, 128)",
      color2 : "rgb(220, 220, 220)",
      vendor : "Tidy",
      SKU : "N/A",
      category : "Chairs",
      text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product18",
      title : "Bertoia Side Chair",
      img1 : product15,
      img2 : secondProduct15,
      price : "477.00",
      discount : "Discount: ($5%)",
      discountPrice: "452.15",
      cart : "Add To Cart",
      isChairs : true,
      isTidy : true,
      stock : "3",
      color1 : "rgb(206, 181, 154)",
      color2 : "rgb(106 88 69)",
      vendor : "Tidy",
      SKU : "N/A",
      category : "Chairs",
      text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product19",
      title : "Enea Lottus Chair",
      img1 : product19,
      img2 : secondProduct19,
      img3 : thirdProduct19,
      price : "580.00",
      cart : "Add To Cart",
      isChairs : true,
      isRa : true,
      stock : "1",
      color1 : "rgb(163 149 135)",
      color2 : "rgb(195, 174, 152)",
      color3 : "rgb(87 82 79)",
      vendor : "Ra",
      SKU : "N/A",
      category : "Chairs",
      text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product20",
      title : "Chair Oak Matt Lacquered",
      img1 : product22,
      img2 : secondProduct22,
      img3 : thirdProduct22,
      price : "150.00",
      cart : "Add To Cart",
      isChairs : true,
      isAxios : true,
      stock : "2",
      color1 : "rgb(151 151 151)",
      color2 : "rgb(183 140 100)",
      color3 : "rgb(64 64 64)",
      vendor : "Axios",
      SKU : "N/A",
      category : "Chairs",
      text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product21",
      title : "Bora Armchair",
      img1 : product9,
      img2 : secondProduct9,
      img3 : thirdProduct9,
      price : "150.00",
      discount : "Discount: ($7%)",
      discountPrice: "139.50",
      cart : "Add To Cart",
      isChairs : true,
      isAxios : true,
      stock : "5",
      color1 : "rgb(94 105 73)",
      color2 : "rgb(66 66 66)",
      color3 : "rgb(129 114 109)",
      vendor : "Axios",
      SKU : "N/A",
      category : "Chairs",
      text : "The perfect blend of modern design and ultimate comfort. Our chair features a unique cloud-like shape, providing the ultimate relaxation experience. The seat and backrest are upholstered in a soft and luxurious velvet fabric, providing a comfortable and cozy seating experience. It's designed with ergonomic principles in mind to support your body's natural posture and reduce stress on your back and shoulders. The chair's sturdy metal base provides stability and ensures durability, while the 360-degree swivel feature allows for easy movement and flexibility."
    },{
      id : "Product22",
      title : "Mundo Sofa With Cushion",
      img1 : product11,
      img2 : secondProduct11,
      price : "450.00",
      discount : "Discount: ($15%)",
      discountPrice: "382.50",
      cart : "Add To Cart",
      isSofas : true,
      isAxios : true,
      stock : "Out Of Stock",
      color1 : "rgb(87 86 94)",
      color2 : "rgb(176 163 147)",
      vendor : "Axios",
      SKU : "N/A",
      category : "Sofas",
      text : "The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience. Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Mundo Sofa With Cushion is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain. Order your Mundo Sofa With Cushion today and experience the ultimate in comfort and style."
    },{
      id : "Product23",
      title : "Mags Sofa 2.5 Seater",
      img1 : product7,
      img2 : secondProduct7,
      price : "750.00",
      discount : "Discount: ($25%)",
      discountPrice: "562.50",
      cart : "Add To Cart",
      isSofas : true,
      isLeo : true,
      stock : "Out Of Stock",
      color1 : "rgb(187 187 187)",
      color2 : "rgb(93 88 95)",
      vendor : "Leo",
      SKU : "N/A",
      category : "Sofas",
      text : "The perfect addition to your living room or family room. Our sofa features a sleek and modern design that will complement any decor style. The sofa is upholstered in a soft and durable linen fabric, providing a comfortable and cozy seating experience. Whether you're entertaining guests, watching TV, or just relaxing with a good book, the Mags Sofa 2.5 Seater is the perfect place to do so. Its spacious seating area comfortably accommodates up to three people, making it ideal for families or those who love to entertain. Order your Mags Sofa 2.5 Seater today and experience the ultimate in comfort and style."
    }]
  }

const softwares = {
  items : [{
    img : ra,
  },{
    img : leo,
  },{
    img : axios,
  },{
    img : darkUniverse,
  },{
    img : gitlab,
  },{
    img : tidy,
  }]
}

const designs = {
  items : [{
    img : insta1,
  },{
    img : insta2,
  },{
    img : insta3,
  },{
    img : insta4,
  },{
    img : insta5,
  },{
    img : insta6,
  }]
}


export {mainSlider, topTrending, softwares, designs, allItems, allCategories};


