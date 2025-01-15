import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main';
import { BlogPage } from './pages/blog';
import { NotFoundPage } from './pages/notfound';
import { BlogIndex } from './pages/blogindex';

function AppRouter() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/blog/index" element={<BlogIndex />} />
            <Route path="/blog/*" element={<BlogPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </Router>
   );
}

//----------------------------------------------------------------------------------------
function Root() {
   return <AppRouter />;
}

//----------------------------------------------------------------------------------------
void (async () => {
   console.log("Bonjour.");

   const container = document.getElementById('reactor')!;
   const root = createRoot(container);
   root.render(<Root />);
})();
