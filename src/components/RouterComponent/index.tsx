import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from '../Header';

import Home from '../../pages/Home';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
