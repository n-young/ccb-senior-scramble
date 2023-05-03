import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const items = [
  <p>hello1</p>,
  <p>hello2</p>,
  <p>hello3</p>,
  <p>hello4</p>,
  <p>hello5</p>,
];


const Intro = () => {
  return (
    <AliceCarousel mouseTracking items={items} />
  );
};

export default Intro;
