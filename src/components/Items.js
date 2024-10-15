import React from "react";
import "../static/css/items.css"; // External CSS file for styling

const ItemCard = ({ item }) => {
  const { name, price, quantity, brand, status, attributes, image_url } = item;

  return (
    <div className="item-card">
      <div className="item-image">
        <img src={image_url || "http://placehold.it/360x150"} alt={name} />
      </div>
      <div className="item-details">
        <h2 className="item-name">{name}</h2>
        <p className="item-brand">Brand: {brand}</p>
        <p className="item-price">${price.toFixed(2)}</p>
        <p className="item-quantity">Available Quantity: {quantity}</p>
        <p
          className={`item-status ${
            status === "in_stock" ? "in-stock" : "out-of-stock"
          }`}
        >
          {status === "in_stock" ? "In Stock" : "Out of Stock"}
        </p>
        <div className="item-attributes">
          <p>Material: {attributes.material}</p>
          <p>Warranty: {attributes.warranty_years} year(s)</p>
          <p>
            Color:{" "}
            <span
              className="color-box"
              style={{ backgroundColor: attributes.color }}
            ></span>{" "}
            {attributes.color}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
