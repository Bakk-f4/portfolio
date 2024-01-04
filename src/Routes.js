import { BrowserRouter as Router, Route } from "react-router-dom";
import { Projects } from "./pages/Project";
import { Contacts } from "./pages/Contacts";


export const Routes = () => {
    return (
        <Router>
            <Route path="/">
                <Projects />
            </Route>
            <Route path="Contacts">
                <Contacts />
            </Route>
        </Router>
    );
}