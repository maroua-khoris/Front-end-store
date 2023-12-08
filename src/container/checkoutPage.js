import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import Header from "../component/header/Header.jsx";
import ItemCards from "../component/checkout/itemsCard/ItemCard.jsx";
import Delivery from "../component/checkout/delivery/Checkout.jsx";

const steps = [
  {
    title: "Items Card",
    content: <ItemCards />,
  },
  {
    title: "Second",
    content: <Delivery />,
  },
  {
    title: "Last",
    content: "Last-content",
  },
];
const CartView = () => {
  const styles = {
    backgroundColor: "white",
    color: "black",
    transition: "background-color 0.3s, box-shadow 0.3s",
    position: "fixed",
  };

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Header style={styles} />

      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default CartView;
