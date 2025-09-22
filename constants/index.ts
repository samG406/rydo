import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import loadingGif from "@/assets/images/loading.gif";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";
import destination from "@/assets/images/destination.png";
import bookRide from "@/assets/images/bookRide.png";
import trip from "@/assets/images/trip.png";
import destinationDark from "@/assets/images/destinationDark.png";
import bgDarkOnboard from "@/assets/images/bgDarkOnboard.png";
import bgOnboarding from "@/assets/images/bgOnboarding.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  loadingGif,
  noResult,
  message,
  destination,
  bookRide,
  trip,
  destinationDark,
  bgDarkOnboard,
  bgOnboarding,
};

export const BETH_REGION = [
  { latitude: 40.68320393732577, longitude: -74.21900444090518 },
  { latitude: 40.68369139940492, longitude: -74.23055329431367 },
  { latitude: 40.66374085644517, longitude: -74.23472277798756 },
  { latitude: 40.656442281770325, longitude: -74.22926857715505 },
  { latitude: 40.66130369551584, longitude: -74.2151530488829 },
  { latitude: 40.670066900867454, longitude: -74.20665207259745 },
  { latitude: 40.6776123996965, longitude: -74.19846379289883 },
  { latitude: 40.6802860200153, longitude: -74.2058510464183 },
  { latitude: 40.68320393732577, longitude: -74.21900444090518 }, // Closing the polygon
];

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};

// export const onboarding = [
//   {
//     id: 1,
//     title: "The perfect ride is just a tap away!",
//     description:
//       "Your journey begins with Ryde. Find your ideal ride effortlessly.",
//     image: images.onboarding1,
//   },
//   {
//     id: 2,
//     title: "Best car in your hands with Ryde",
//     description:
//       "Discover the convenience of finding your perfect ride with Ryde",
//     image: images.onboarding2,
//   },
//   {
//     id: 3,
//     title: "Your ride, your way. Let's go!",
//     description:
//       "Enter your destination, sit back, and let us take care of the rest.",
//     image: images.onboarding3,
//   },
// ];

export const bata = [
  {
    id: 0,
    image: images.destination,
    text: "Choose Your Destination",
    description: "First choose your destination where you want to go!",
  },
  {
    id: 1,
    image: images.trip,
    text: "Wait for your driver",
    description: "Just wait for a while now until your driver is picking you!",
  },
  {
    id: 2,
    image: images.bookRide,
    text: "Enjoy Your Trip",
    description:
      "Now enjoy your trip, you will be charged after reaching the destination!",
  },
];

// export const data = {
//   onboarding,
// };

export const beta = {
  bata,
};