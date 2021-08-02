import './App.css';

import { Route, Switch } from "react-router-dom"
import Header from './Components/Header';
import Footer from './Components/Footer';
import FeedPage from './Components/FeedPage';
import CreatePage from './Components/CreatePage';
import HivesPage from './Components/HivesPage';
import HivePage from './Components/HivePage';
import FriendsPage from './Components/FriendsPage';
import BeePage from './Components/BeePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={FeedPage} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/hives" component={HivesPage} />
        <Route exact path="/hives/:hive_id" component={HivePage} />
        <Route exact path="/friends" component={FriendsPage} />
        <Route exact path="/hives/:hive_id/:bee_id" component={BeePage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
