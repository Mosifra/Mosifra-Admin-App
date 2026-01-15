import { LocationProvider, Router, Route } from "preact-iso"
import AdminPanel from "./pages/AdminPanel"
import CreateUniversity from "./pages/CreateUniversity"
import CreateCompany from "./pages/CreateCompany"
import AdminLogin from "./pages/Login"

export function App() {
  return (
    <LocationProvider>
      <main class="container">
        <Router>
          <Route path="/" component={AdminPanel} />
          <Route path="/login" component={AdminLogin} />
          <Route path="/create/university" component={CreateUniversity} />
          <Route path="/create/company" component={CreateCompany} />
        </Router>
      </main>
    </LocationProvider>
  )
}

export default App
