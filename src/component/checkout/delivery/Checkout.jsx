import "./checkout.css";

const Cart = () => {
  return (
    <div className="row">
      <div className="col-75">
        <div className="container">
          <form action="/action_page.php">
            <div className="second-row">
              <div className="col-50">
                <h3>Billing Address</h3>

                <input
                  placeholder="Address"
                  type="text"
                  id="adr"
                  name="address"
                />
                <div className="city-zip">
                  <input
                    placeholder="City"
                    type="text"
                    id="city"
                    className="city"
                  />
                  <input
                    placeholder="Zip"
                    type="text"
                    id="zip"
                    className="zip"
                  />
                </div>
                <input
                  placeholder="Phone"
                  type="text"
                  id="phone"
                  name="phone"
                />
              </div>

              <div className="col-50">
                <h3>Payment</h3>

                <input
                  placeholder="Name On Card"
                  type="text"
                  id="cname"
                  name="cardname"
                />
                <input
                  placeholder="Credit card number"
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                />
                <input
                  placeholder="Exp Month"
                  type="text"
                  id="expmonth"
                  name="expmonth"
                />
                <input
                  placeholder="Exp Year"
                  type="text"
                  id="expyear"
                  name="expyear"
                />
              </div>
            </div>

            <input type="submit" value="Continue to checkout" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
