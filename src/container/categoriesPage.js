import React, { useEffect, useState } from 'react';
import {  Layout, Menu, theme, Card,Slider, Divider,DatePicker} from 'antd';
import { ShoppingCartOutlined,HeartOutlined,AppstoreOutlined  } from '@ant-design/icons';
import '../styling/style.css';
import imgBackground from '../assets/background.png';
import { getProducts } from '../services/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcategories } from '../services/categoryApi';
import { useParams } from 'react-router';
import { addToCart } from '../redux/cartSlice';



const { Content, Sider } = Layout;
const { Meta } = Card;


function ShopCard({ cardKey, product, dispatch}) {
    const [isHovered, setIsHovered] = useState(false);
    const imgPath = isHovered
    ?  product.product_image[1]// Replace with the URL of your hover image
    : product.product_image[0];
    console.log('product', product)
  
    return (
      <Card
        key={cardKey}
        style={{
          width: '22%', // Adjust the width to show four cards in one line
          margin: '50px 20px 30px 15px',
          position: 'relative',
          maxHeight: "420px", 
          boxShadow:'0 0 5px rgba(0, 0, 0, 0.5)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cover={<img alt="example" src={imgPath} height='300px' width="auto"  style={{
            transition: 'transform 0.5s', // Add transition effect here
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          }}/>}
      >
        {isHovered && (
          <>
            <div className='shopbar'>
              <ShoppingCartOutlined className='iconProduct'  
              onClick={() =>
                      dispatch(
                        addToCart({
                          _id: product._id,
                          name: product.product_name,
                          quantity: 1,
                          image: product.product_image[0],
                          price: product.price,
                          colors: product.color,
                        })
                      )
                    }/>
              <HeartOutlined className='iconProduct'/>
            </div>
          </>
        )}
        <Meta title={product.product_name} style={{textTransform: "uppercase", fontFamily: "'Popiline', sans-serif"}}/>
        <div className='price-card' style={{ marginLeft: "0px", marginTop: "10px", fontWeight: "600"}}>
            <p style={{marginTop: "0px"}}>{product.price} MAD</p>
        </div>
      </Card>
    );
  }
  

function CategoriesPage() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.data.products);
  const subcategories = useSelector(state => state.data.subcategories);
  const [subcategory, setSubcategory] = useState('');
  const { name } = useParams();
   useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('first')
        await getProducts(dispatch);
        await getSubcategories(dispatch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log('products', products)
  const handleFilter = (event, name)=> {
    setSubcategory(name);
  };
  console.log('products.category_name', products.category_name)
  
  return (
    <>
    <Divider id='custom-divider' />
    <Layout style={{ minHeight: '100vh'}}>
         <Layout
        style={{
        
        backgroundColor: "white",
        paddingBottom: "10%",
            }}
        >
      <Sider
        width="12%"
        style={{
          backgroundColor: "rgb(242, 244, 240)",
        }}
      >
     <Menu
  theme="light"
  mode="inline"
  style={{
    backgroundColor: "transparent",
    padding: "30px 10px 10px",
    fontSize: "16px",
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
    overflowY: 'auto',
    position: 'fixed',
    width: "auto",
    border: '1px solid rgb(242, 244, 240)'
  }}
  defaultSelectedKeys={['1']}
>
  {subcategories
    .filter((subcategory) => subcategory.category_name === name)
    .map((subcategory, index) => (
      <Menu.Item
      className='subcategories'
        key={index.toString()} // Use the index as the key
        icon={<AppstoreOutlined  style={{ color: 'rgb(88, 150, 95)', fontSize: '20px'}}/>}
        onClick={(e)=> handleFilter(e, subcategory.subcategory_name)}
      >
        {subcategory.subcategory_name}
      </Menu.Item>
    ))}
</Menu>


  
        
      </Sider>
      <Layout style={{ backgroundColor: "transparent"}}>
        
        <Content
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: "2%"
          }}
        >
       {!!products && products
        .filter((product) => product.category_name === name &&
        (!subcategory || (product.subcategory_name === subcategory))
          )
        .map((product, index) => (
          <ShopCard key={index} cardKey={index} product={product} dispatch={dispatch} />
        ))}
        </Content>
        </Layout>
        </Layout>
      </Layout>
      </>
  );
}

export default CategoriesPage;
