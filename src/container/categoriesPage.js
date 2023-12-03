import React, { useState } from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Card,Slider, Divider,DatePicker} from 'antd';
import { ShoppingCartOutlined,HeartOutlined,AppstoreOutlined  } from '@ant-design/icons';
import '../styling/style.css';
import img1 from '../assets/verre (2).jpg';
import img2 from '../assets/verre.jpg';
import imgBackground from '../assets/background.jpg';

const { Content, Sider,Header } = Layout;
const { Meta } = Card;


function ShopCard({ cardKey }) {
    const [isHovered, setIsHovered] = useState(false);
    const imgPath = isHovered
    ?  img2// Replace with the URL of your hover image
    : img1;
  
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
        <Meta title="Tea Glasses" description="A short description of the product." />
        <div className='price'>
            <p>80 DH</p>
        </div>
      </Card>
    );
  }
  

function CategoriesPage() {
    const [isHovered, setIsHovered] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
    <Header
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white'
    }}
  >
    <div className="demo-logo" />
  </Header>
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
          height: '50%',
          backgroundColor: "white",
          borderRadius: '10px'
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
          items={[
            {
              key: '1',
              icon: <AppstoreOutlined />,
              label: 'Subcategory 1',
            },
            {
              key: '2',
              icon: <AppstoreOutlined />,
              label: 'Subcategory 2',
            },
          ]}
        />
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
           {[1, 2, 3, 4,5,6,7,8,9].map((key) => (
        <ShopCard key={key} cardKey={key} />
      ))}
          </Content>
          </Layout>
        </Layout>
      </Layout>
      </>
  );
}

export default CategoriesPage;
