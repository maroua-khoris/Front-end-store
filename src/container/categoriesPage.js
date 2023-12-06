import React, { useEffect, useState } from 'react';
import {  Layout, Menu, theme, Card,Slider, Divider,DatePicker} from 'antd';
import { ShoppingCartOutlined,HeartOutlined,AppstoreOutlined  } from '@ant-design/icons';
import '../styling/style.css';
import img1 from '../assets/verre (2).jpg';
import img2 from '../assets/verre.jpg';
import imgBackground from '../assets/background.png';
import Header from '../component/header';
import Footer from '../component/footer'
import { getProducts } from '../services/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcategories } from '../services/categoryApi';
import { useParams } from 'react-router';


const { Content, Sider } = Layout;
const { Meta } = Card;


function ShopCard({ cardKey, product}) {
    const [isHovered, setIsHovered] = useState(false);
    const imgPath = isHovered
    ?  product.product_image[1]// Replace with the URL of your hover image
    : product.product_image[0];
    console.log('product', product)
  
    return (
      <Card
        key={cardKey}
        hoverable
        style={{
          width: '22%', // Adjust the width to show four cards in one line
          margin: '50px 20px 30px 15px',
          position: 'relative',
          transition: 'transform 0.3s',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          maxHeight: "420px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cover={<img alt="example" src={imgPath} height='300px' width="100%"  style={{
            transition: 'transform 0.5s', // Add transition effect here
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          }}/>}
      >
        {isHovered && (
          <>
            <div className='shopbar'>
              <ShoppingCartOutlined className='iconProduct'/>
              <HeartOutlined className='iconProduct'/>
            </div>
          </>
        )}
        <Meta title={product.product_name} description={product.short_description} />
        <div className='price'>
            <p>{product.price}</p>
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
        await getProducts(dispatch);
        await getSubcategories(dispatch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleFilter = (event, name)=> {
    setSubcategory(name);
    console.log('subcategory', subcategory)
  }
  
  return (
    <>
    <Header/>
    <Layout style={{ minHeight: '100vh'}}>
         <Layout
        style={{
        
        backgroundImage: `url(${imgBackground})`,
        backgroundSize: 'cover',
            }}
        >
      <Sider
        width="20%"
        style={{
          backgroundColor: "white",
        }}
      >
     <Menu
  theme="light"
  mode="inline"
  style={{
    padding: "30px 10px 10px",
    fontSize: "16px",
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"
  }}
  defaultSelectedKeys={['1']}
>
  {subcategories
    .filter((subcategory) => subcategory.category_name === "Home")
    .map((subcategory, index) => (
      <Menu.Item
        key={index.toString()} // Use the index as the key
        icon={<AppstoreOutlined />}
        onClick={(e)=> handleFilter(e, subcategory.subcategory_name)}
      >
        {subcategory.subcategory_name}
      </Menu.Item>
    ))}
</Menu>


  

        <Divider />
        <p style={{
            margin: "20px 35px",
            fontSize: "16px",
            fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"
          }}>Price</p>
          
        <Slider
        style={{ margin: "20px"}}
            range={{
            draggableTrack: true,
            }}
            defaultValue={[20, 50]}
        />
         <p style={{
            margin: "20px 35px",
            fontSize: "16px",
            fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"
          }}>Date</p>
        <DatePicker.RangePicker
      style={{
        width: '80%',
        marginBottom: "30px",
        marginLeft:"20px",
        border: "1px solid #292c32"
      }}
    />
        
      </Sider>
      <Layout style={{ backgroundColor: "transparent"}}>
        
        <Content
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
       {!!products && products
        .filter((product) => product.category_name === name &&
        (!subcategory || (product.subcategory_name === subcategory))
          )
        .map((product, index) => (
          <ShopCard key={index} cardKey={index} product={product} />
        ))}
        </Content>
        </Layout>
        </Layout>
      </Layout>
      <Footer />
      </>
  );
}

export default CategoriesPage;
