import { RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { router } from "./pages/router";
import 'react-image-crop/dist/ReactCrop.css';

const GrobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
  }
  body{
    color: #212527;
    overflow-x: hidden
  }
`
const Wrap = styled.div`

`

function App() {
  return (
    <Wrap>
      <GrobalStyle/>
      <RouterProvider router={router}/>
    </Wrap>
  );
}

export default App;
