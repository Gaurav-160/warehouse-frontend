import React from "react";
import styled from "styled-components";

const ItemDetail = ({ item }) => {
  if (!item) return null; // Return nothing if no item is selected

  return (
    <Container>
      <Title>{item.name}</Title>

      {/* Item Image */}
      {/* {item.image_url && <ItemImage src={item.image_url} alt={item.name} />} */}

      <InfoGrid>
        <InfoItem>
          <Label>Quantity:</Label>
          <Value>{item.quantity}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Category:</Label>
          <Value>{item.category}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Price:</Label>
          <Value>${item.price}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Status:</Label>
          <Value>{item.status}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Brand:</Label>
          <Value>{item.brand}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Color:</Label>
          <Value>{item.attributes.color}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Material:</Label>
          <Value>{item.attributes.material}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Warranty:</Label>
          <Value>{item.attributes.warranty_years} years</Value>
        </InfoItem>
      </InfoGrid>
    </Container>
  );
};

export default ItemDetail;

// Styled Components
const Container = styled.div`
  background: #7c818c;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 100%;
  max-width: 1200px; /* Set a max-width for larger screens */
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 15px;
  text-align: center;
`;

// New Item Image Styling
const ItemImage = styled.img`
  display: block;
  margin: 0 auto 20px auto;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack items vertically on small screens */
  }
`;

const InfoItem = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
`;

const Label = styled.p`
  font-weight: bold;
  color: #555;
`;

const Value = styled.p`
  color: #333;
  margin: 0;
`;
