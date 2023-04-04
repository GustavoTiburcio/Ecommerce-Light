import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from '../Header';

import Home from '../../pages/Home';
import ProdutoDetalhes from '../../pages/ProdutoDetalhes';
import ProdutoListagem from '../../pages/ProdutoListagem';

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
          <Route path='/produtoDetalhes' element={<ProdutoDetalhes />} />
          <Route path='/produtoListagem' element={<ProdutoListagem />} />
        </Route>
      </Routes>
    </Router>
  );
}
