// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import AdminPanel from './components/AdminPanel';
import ProfileDetailsExtended from './components/ProfileDetailsExtended';

const App = () => {
  return (
    <Router>
      <ErrorBoundary >
      <Routes>
        <Route path="/" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile/:id/details" element={<ProfileDetailsExtended/>} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
