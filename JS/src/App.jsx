import AppProvidersWrapper from "./components/wrappers/AppProvidersWrapper";
import configureFakeBackend from "./helpers/fake-backend";
import AppRouter from "./routes/router";
import '@/assets/scss/style.scss';

configureFakeBackend();
function App() {
  return <AppProvidersWrapper>
      <AppRouter />
    </AppProvidersWrapper>;
}
export default App;


// import react from "react"
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Home from "./pages/Home"
// import NotFound from "./pages/NotFound"
// import ProtectedRoute from "./components/ProtectedRoute"

// // import SignIn from "./pages/sign-in/page.jsx/SignIn"
// // const SignIn = lazy(() => import("./pages/sign-in/page"));

// // import LandingPage from "./pages/landing/page.jsx/LandingPage"
// // const LandingPage = lazy(() => import('./app/(plain)/landing/page'));


// function Logout() {
//   localStorage.clear()
//   return <Navigate to="/login" />
// }

// function RegisterAndLogout() {
//   localStorage.clear()
//   return <Register />
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/register" element={<RegisterAndLogout />} />
//         {/* <Route path="/test" element={<SignIn />} /> */}
//         <Route path="*" element={<NotFound />}></Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App