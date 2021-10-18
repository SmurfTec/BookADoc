/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from '../../global-styles';
import 'react-toastify/dist/ReactToastify.css';

const AnonymousRoute = React.lazy(() => import('./routes/AnonymousRoute'));
const PatientRoute = React.lazy(() => import('./routes/PatientRoute'));
const ProRoute = React.lazy(() => import('./routes/ProRoute'));
const LabRoute = React.lazy(() => import('./routes/LabRoute'));

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  let user;
  try {
    user = JSON.parse(window.localStorage.getItem('user'));
  } catch (error) {
    console.log(error);
  }

  const renderLoggedInRoute = () => {
    switch (user.role.toLowerCase()) {
      case 'patient':
        return <PatientRoute />;
      case 'lab':
        return <LabRoute />;
      default:
        return <ProRoute />;
    }
  };

  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - BookADoc" defaultTitle="BookADoc">
        <meta name="description" content="BookADoc" />
      </Helmet>
      <div className="main-wrapper">
        <ToastContainer />
        <Suspense fallback={<div>Loading...</div>}>
          {user ? renderLoggedInRoute() : <AnonymousRoute />}
        </Suspense>
        <GlobalStyle />
      </div>
    </AppWrapper>
  );
}
