import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';
import { RouteCustom } from './components';
import { flatRoutes } from './utils';

function RouterNavigation() {
  return (
    <Router>
      <Switch>
        {flatRoutes(routes)
          .filter((route) => !route.isFake)
          .map((route, i) => (
            <RouteCustom key={String(i)} {...route} />
          ))}
      </Switch>
    </Router>
  );
}

export default RouterNavigation;
