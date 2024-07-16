import "@styles/components-styles/OrderForm.scss";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useCartStore } from "../zustand/store";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const OrderForm = () => {
  //Coupons for discount
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const applyCoupon = async () => {
    try {
      const couponRef = doc(db, "coupons", couponCode);
      const coupon = await getDoc(couponRef);
      if (coupon.exists()) {
        const data = coupon.data();
        const now = new Date();
        if (data.expiryDate.toDate() > now) {
          setDiscount(data.discount);
          setError("");
        } else {
          setError("Coupon has expired.");
        }
      } else {
        setError("Invalid coupon code.");
      }
    } catch (error) {
      setError("Error applying coupon.");
    }
  };

  const form = useRef();
  const { cartItems, totalAmount, clearCartItems } = useCartStore();
  const [emailStatus, setEmailStatus] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_en5xpzi", "template_5dem3hb", form.current, {
        publicKey: "v445K5SGQ5IYtJGge",
      })
      .then(
        () => {
          setEmailStatus(
            "Uspešno ste poručili, očekujte da vas kontaktiram uskoro!!!"
          );
          form.current.reset();
          clearCartItems();
          alert("Uspešno ste poručili!!! Očekujte da Vas uskoro kontaktiram.");
        },
        (error) => {
          setEmailStatus("Pokušajte ponovo!!!");
          error.text;
        }
      );
  };

  return (
    <>
      <div className="order-form-container">
        <div className="order-form-title">
          <h2>Popunite formu:</h2>
        </div>

        <div className="order-form-coupon">
          <h3>Kupon za popust:</h3>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Unesite kupon..."
          />
          <button onClick={applyCoupon}>Potvrdite Kupon</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>Popust: {discount}%</p>
        </div>

        <div className="order-form-body">
          <form id="order-form" ref={form} onSubmit={sendEmail}>
            <label htmlFor="fname">
              <span className="fname">
                Ime <span className="required">*</span>
              </span>
              <input
                type="text"
                id="fname"
                name="fname"
                autoComplete="given-name"
                required
              />
            </label>
            <label htmlFor="lname">
              <span className="lname">
                Prezime <span className="required">*</span>
              </span>
              <input
                type="text"
                id="lname"
                name="lname"
                autoComplete="family-name"
                required
              />
            </label>
            <label htmlFor="selection">
              <span>
                Zemlja <span className="required">*</span>
              </span>
              <select id="selection" name="selection" required>
                <option value="select">Izaberite zemlju...</option>
                <option value="SRB">Srbija</option>
                <option value="BIH">Bosna i Hercegovina</option>
                <option value="MNE">Crna Gora</option>
              </select>
            </label>
            <label htmlFor="city">
              <span>
                Grad <span className="required">*</span>
              </span>
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                required
              />
            </label>
            <label htmlFor="street">
              <span>
                Ulica <span className="required">*</span>
              </span>
              <input
                type="text"
                name="street"
                id="street"
                autoComplete="address-line1"
                required
              />
            </label>
            <label htmlFor="zip">
              <span>
                Poštanski broj <span className="required">*</span>
              </span>
              <input
                type="text"
                name="zip"
                id="zip"
                autoComplete="postal-code"
                required
              />
            </label>
            <label htmlFor="number">
              <span>
                Telefon <span className="required">*</span>
              </span>
              <input
                type="tel"
                name="number"
                id="number"
                autoComplete="tel"
                required
              />
            </label>
            <label htmlFor="email">
              <span>
                Email Adresa <span className="required">*</span>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
              />
            </label>

            <label htmlFor="textarea">
              <span>Napomena:</span>
              <textarea
                className="order-form-textarea"
                rows="4"
                cols="50"
                name="textarea"
                id="textarea"
                placeholder="Precizirajte svoje želje..."
              />
            </label>

            <p>
              Ukupno:{" "}
              {cartItems
                .reduce((total, item) => {
                  const itemTotal =
                    item.price * item.quantity -
                    (item.price * item.quantity * discount) / 100;
                  return total + itemTotal;
                }, 0)
                .toFixed(2)}
              din.
            </p>

            <textarea
              className="product-list-order-form"
              name="products"
              id="products"
              value={`Cena: ${totalAmount}din. ${cartItems
                .map((item) => {
                  const itemTotal =
                    item.price * item.quantity -
                    (item.price * item.quantity * discount) / 100;
                  return `${item.name}: ${item.price}din. Količina: ${
                    item.quantity
                  } Kupon: ${couponCode}, Popust: ${discount}%, Ukupno: ${itemTotal.toFixed(
                    2
                  )}din. `;
                })
                .join("\n")}
            
              Za uplatu: ${cartItems
                .reduce((total, item) => {
                  const itemTotal =
                    item.price * item.quantity -
                    (item.price * item.quantity * discount) / 100;
                  return total + itemTotal;
                }, 0)
                .toFixed(2)}din.`}
              readOnly
            />

            <button type="submit">Poruči</button>
          </form>

          <div className="order-form-footer">
            <p>{emailStatus}</p>
            <p>
              Popunjavanje ovog formulara je samo PRVI KORAK do proizvoda
              Teodorinog kreativnog kutka. Nakon što odaberete željeni
              proizvod/e i ostavite svoje podatke, u roku 1-3 radna dana bićete
              kontaktirani, kako bismo precizirali model i dizajn proizvoda,
              termin za izradu i način isporuke. Tada možete izraziti sve svoje
              želje i željice, a ja ću se potruditi da ih ispunim sve do jedne!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
