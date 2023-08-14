'use client'
import { useState, useEffect } from "react";
import "./ImageGallery.css";
import CardImage from "../CardImage";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Pagination from "../Pagination";

const ImageGallery: React.FC = () => {
  const [res, setRes] = useState<any[]>([]);
  const [rover, setRover] = useState<string>("curiosity");
  const [camera, setCamera] = useState<string>("fhaz");
  const [sol, setSol] = useState<string>("1000");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("2020-08-09");

  // GET DATE

  const getDate = (date?: string) => {
    let dateSelected = new Date();
    if (date) {
      dateSelected = new Date(date);
    }
    let currentDay = String(dateSelected.getDate()).padStart(2, "0");
    let currentMonth = String(dateSelected.getMonth() + 1).padStart(2, "0");
    let currentYear = dateSelected.getFullYear();
    setCurrentDate(`${currentYear}-${currentMonth}-${currentDay}`);
  };

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiNasa = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&earth_date=${currentDate}&camera=${camera}&page=${currentPage}&api_key=${apiKey}`;

  const fetchRequest = async () => {
    setIsLoading(true);
    const data = await fetch(apiNasa);
    const dataJ = await data.json();
    const result = dataJ.photos;
    console.log(result, "results");
    setRes(result);
    setIsLoading(false);
  };
  useEffect(() => {
    getDate();
  }, []);
  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rover, camera, currentDate, sol, currentPage]);

  return (
    <>
      <div className="container-fluid p-5" data-test-id="container-wrapper">
        <h1 className="mb-4 text-white">🚀 Mars Rover Photos</h1>
        <Form className="pb-3">
          <Row>
            <Form.Group as={Col} xs="6" lg="3">
              <Form.Label className="text-white">Rover</Form.Label>
              <Form.Select
                size="lg"
                onChange={(e) => setRover(e.target.value)}
                value={rover}
              >
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs="6" lg="3">
              <Form.Label className="text-white">Camera</Form.Label>
              <Form.Select
                size="lg"
                onChange={(e) => setCamera(e.target.value)}
                value={camera}
              >
                <option value="fhaz">Front Hazard Avoidance Camera</option>
                <option value="rhaz">Rear Hazard Avoidance Camera</option>
                <option value="mast">Mast Camera</option>
                <option value="chemcam">Chemistry and Camera Complex</option>
                <option value="mahli">Mars Hand Lens Imager</option>
                <option value="mardi">Mars Descent Imager</option>
                <option value="navcam">Navigation Camera</option>
                <option value="pancam">Panoramic Camera</option>
                <option value="minites">
                  Miniature Thermal Emission Spectrometer (Mini-TES){" "}
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs="6" lg="3">
              <Form.Label className="text-white">Earth Date</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                onChange={(e) => getDate(e.target.value)}
                value={currentDate}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs="6" lg="3">
              <Form.Label className="text-white">Sol</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                max="1000"
                onChange={(e) => setSol(e.target.value)}
                value={sol}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Form>
      </div>
      {isLoading ? (
        <Spinner animation="border" className="d-flex m-auto mt-3" />
      ) : (
        <>
          <div className="container flexbox container-images">
            {res.map((item, index) => (
              <CardImage image={item} key={index} />
            ))}
          </div>
          {res.length > 24 ? (
            <Pagination
              currentPage={currentPage}
              res={res}
              setCurrentPage={setCurrentPage}
            />
          ) : !res.length ? (
            <div>
              <h1 className="text-center text-white mt-5">
                No photos were found
              </h1>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default ImageGallery;
