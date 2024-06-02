/** @format */

import { AuthProvider } from "./components/context/Auth";
import  AllRoutes  from "./routes/AllRoutes";


const App = () => {
  


  return (
    <div className="flex flex-col ">
      <AuthProvider>


      <AllRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
