import "@styles/components-styles/OrderForm.scss";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useCartStore } from "../zustand/store";

const OrderForm = () => {
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
        <div className="order-form-body">
          <form ref={form} onSubmit={sendEmail}>
            <label>
              <span className="fname">
                Ime <span className="required">*</span>
              </span>
              <input type="text" name="fname" required />
            </label>
            <label>
              <span className="lname">
                Prezime <span className="required">*</span>
              </span>
              <input type="text" name="lname" required />
            </label>
            <label>
              <span>
                Zemlja <span className="required">*</span>
              </span>
              <select name="selection" required>
                <option value="select">Izaberite zemlju...</option>
                <option value="SRB">Srbija</option>
                <option value="BIH">Bosna i Hercegovina</option>
                <option value="MNE">Crna Gora</option>
              </select>
            </label>
            <label>
              <span>
                Grad <span className="required">*</span>
              </span>
              <input type="text" name="city" required />
            </label>
            <label>
              <span>
                Ulica <span className="required">*</span>
              </span>
              <input type="text" name="street" required />
            </label>
            <label>
              <span>
                Poštanski broj <span className="required">*</span>
              </span>
              <input type="text" name="zip" required />
            </label>
            <label>
              <span>
                Telefon <span className="required">*</span>
              </span>
              <input type="tel" name="number" required />
            </label>
            <label>
              <span>
                Email Adresa <span className="required">*</span>
              </span>
              <input type="email" name="email" required />
            </label>
            <label>
              <span>
                Detalji: <span className="required">*</span>
              </span>
              <textarea
                className="order-form-textarea"
                rows="4"
                cols="50"
                name="textarea"
                placeholder="Opišite detaljnije šta želite, izaberite boju..."
                required
              />
            </label>

            <textarea
              className="product-list-order-form"
              name="products"
              value={`Cena: ${totalAmount}din. ${cartItems.map((item) => {
                return `${item.name}: ${item.price}din. Količina: ${item.quantity} `;
              })}`}
              readOnly
            />

            <button type="submit">Poruči</button>
          </form>

          <div className="order-form-footer">
            <p>{emailStatus}</p>
            <p>
              Nakon poručivanja bićete kontaktirani kako bi se dogovorili i
              precizirali šta tačno želite!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
