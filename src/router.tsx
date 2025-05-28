// src/router.tsx
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {
  Center,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  /** основные страницы */
  const mainRoutes = (
    <Routes location={backgroundLocation || location}>
      <Route path='/' element={<ConstructorPage />} />
      <Route
        path='/ingredients/:id'
        element={
          <Center title='Детали ингредиента'>
            <IngredientDetails />
          </Center>
        }
      />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/feed/:number'
        element={
          <Center title={`#${location.pathname.match(/\d+/)}`}>
            <OrderInfo />
          </Center>
        }
      />

      {/* публичные экраны */}
      <Route element={<ProtectedRoute forAuthorized={false} />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>

      {/* приватные экраны */}
      <Route element={<ProtectedRoute forAuthorized />}>
        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
          <Route
            path='orders/:number'
            element={
              <Center title={`#${location.pathname.match(/\d+/)}`}>
                <OrderInfo />
              </Center>
            }
          />
        </Route>
      </Route>

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );

  /** модальные маршруты (рендерятся поверх) */
  const modalRoutes = backgroundLocation && (
    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal
            title={`#${location.pathname.match(/\d+/)}`}
            onClose={() => navigate(-1)}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route element={<ProtectedRoute forAuthorized />}>
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title={`#${location.pathname.match(/\d+/)}`}
              onClose={() => navigate('/profile/orders')}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
    </Routes>
  );

  return (
    <>
      {mainRoutes}
      {modalRoutes}
    </>
  );
};

export default AppRouter;
