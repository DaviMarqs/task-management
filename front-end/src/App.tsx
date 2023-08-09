import { Toaster } from "./components/ui/toaster";
import "./default.css";
import "./globals.css";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <Toaster />
    </>
  );
}

export default App;
