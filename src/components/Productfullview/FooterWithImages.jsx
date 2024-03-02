import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import StoneidDiamondData from "../Diamonds/Data/RoundDiamondData";
import RadiantDiamondData from "../Diamonds/Data/RadiantDiamondData";
import AsscherDiamondData from "../Diamonds/Data/AsscherDiamondData";
import CushionDiamondData from "../Diamonds/Data/CushionDiamondData";
import EmraldDiamondData from "../Diamonds/Data/EmraldDiamondData";
import HeartDiamondData from "../Diamonds/Data/HeartDiamondData";
import MarquiseDiamondData from "../Diamonds/Data/MarquiseDiamondData";
import OvalDiamondData from "../Diamonds/Data/OvalDiamondData";
import PearDiamondData from "../Diamonds/Data/PearDiamondData";
import PrincessDiamondData from "../Diamonds/Data/PrincessDiamondData";

const FooterWithImages = () => {
  const shapeDataMap = {
    Round: StoneidDiamondData,
    Radiant: RadiantDiamondData,
    Asscher: AsscherDiamondData,
    Cushion: CushionDiamondData,
    Emerald: EmraldDiamondData,
    Heart: HeartDiamondData,
    Marquise: MarquiseDiamondData,
    Oval: OvalDiamondData,
    Pear: PearDiamondData,
    Princess: PrincessDiamondData,
  };

  const [currentShape, setCurrentShape] = useState(
    Object.keys(shapeDataMap)[0]
  );
  const [currentIndex] = useState(0);

  useEffect(() => {
    // Update current shape randomly on component mount
    const shapes = Object.keys(shapeDataMap);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(randomShape);
  }, []);

  // const handlePrevClick = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  // };

  // const handleNextClick = () => {
  //   const currentData = shapeDataMap[currentShape];
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex < currentData.length - 1 ? prevIndex + 1 : prevIndex
  //   );
  // };

  const renderImages = () => {
    const cardWidth = 200; // Adjusted card width
    const cardHeight = 180; // Adjusted card height

    const currentData = shapeDataMap[currentShape];
    const visibleDiamonds = currentData.slice(0, 5);

    return visibleDiamonds.map((diamond, index) => (
      <Col key={index} className="me-3 mb-3">
        <Card
          className={`text-center ${index === currentIndex ? "selected" : ""}`}
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Added box shadow
          }}
        >
          <Card.Img
            variant="top"
            src={diamond.imageUrl}
            alt={`${currentShape} Diamond ${index + 1}`}
          />
          <Card.Body>
            <Card.Title>{diamond.description}</Card.Title>
            <Card.Text>
              Color Grade: {diamond.colorGrade} <br />
              Price: {diamond.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <footer className="bg-light py-4" style={{ overflowX: "auto" }}>
      <Container fluid>
        <Row>
          <Col className="mb-3">
            <h5>Similar {currentShape} Diamonds</h5>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center">
          {renderImages()}
        </Row>
      </Container>
    </footer>
  );
};

export default FooterWithImages;
