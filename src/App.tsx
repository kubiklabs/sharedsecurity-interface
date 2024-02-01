import "./App.css";
import SideBar from "./components/Navigation/SideBar";
import { RecoilRoot } from "recoil";
import Header from "./components/Navigation/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Box,
  ChakraProvider,
  Flex,
  extendTheme,
  defineStyle,
  defineStyleConfig,
  Heading,
} from "@chakra-ui/react";
import Overwiew from "./pages/Overwiew";
import Aez from "./pages/Aez";
import Governance from "./pages/Governance";
import Assets from "./pages/Assets";
import Validators from "./pages/Validators";
import Proposal from "./pages/Proposal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect } from "react";
import { useConnectWallet } from "./hooks/useConnectWallet";
import Footer from "./components/Footer/Footer";

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "gray",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.400",
  },
};
const outline = defineStyle({
  // border: "2px dashed", // change the appearance of the border
  // borderRadius: 0, // remove the border radius
  fontWeight: "semibold", // change the font weight
});

const theme = extendTheme({
  components: {
    Button: defineStyleConfig({
      baseStyle: {
        _hover: {
          bg: "transparent",
        },
        color: "red",
        border: "none",
      },
    }),
  },
});

function App() {
  const connectWallet = useConnectWallet();

  const connectKeplr = useCallback(() => {
    connectWallet();
  }, []);

  connectKeplr();

  return (
    <>
      <BrowserRouter>
        {/* <Box className="App"> */}
        <Box  
            sx={scrollbarStyle}
            maxH={"100vh"}
            overflowY={"scroll"}
            flex={1}
        >
        <SideBar/>
          {/* <Divider orientation="vertical" /> */}
          <Box
            px={"50px"}
            pt={"150px"}
            flex={"1"}
            pb={"50px"}
          >
            <Routes>
              <Route path="/overview" element={<Overwiew />} />
              <Route path="/aez" element={<Aez />} />
              <Route path="/gov" element={<Governance />} />
              <Route path="/gov/:chain/:proposalId" element={<Proposal />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/validators" element={<Validators />} />
              <Route path="/" element={<Navigate to="/overview" replace />} />
            </Routes>
          </Box>
          <Footer/>
        </Box>
      </BrowserRouter>
      {/* <Header /> */}
      
      <ToastContainer style={{ textAlign: "left" }} />
    </>
  );
}

export default App;
