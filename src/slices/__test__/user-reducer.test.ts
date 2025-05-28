import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  forgotPassword,
  resetPassword,
  getUser
} from '../user-slice';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

describe('Тесты экшенов клиента', () => {
  const mockSet = jest.fn();

  describe('Тесты экшена запроса логина', () => {
    test('Тест экшена ожидания ответ после запроса логина', () => {
      const store = setupStore();
      store.dispatch({ type: loginUser.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса логина', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: loginUser.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного логина', () => {
      const mockedPayload = {
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjIyODc2MywiZXhwIjoxNzEyMjI5OTYzfQ.NnIdUkIZ8gHHicj86d2Xrxxz5wxTqJyghFfyU9ZQ6E0',
        refreshToken:
          'cae7fbb0ce188f2c244e611b328ae4869b892902b1ba10c81cee99194854b1d3c192e0bfc9b90b06',
        user: {
          email: 'lleksiv@gmail.com',
          name: 'Georg Shakillow'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: loginUser.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Тест экшена запроса регистрации', () => {
    test('Тест экшена ожидания ответ после запроса регистрации', () => {
      const store = setupStore();
      store.dispatch({ type: registerUser.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса регистрации', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: registerUser.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешной регистрации', () => {
      const mockedPayload = {
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjIyODc2MywiZXhwIjoxNzEyMjI5OTYzfQ.NnIdUkIZ8gHHicj86d2Xrxxz5wxTqJyghFfyU9ZQ6E0',
        refreshToken:
          'cae7fbb0ce188f2c244e611b328ae4869b892902b1ba10c81cee99194854b1d3c192e0bfc9b90b06',
        user: {
          email: 'user@email.ru',
          name: 'User user'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: registerUser.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Тест экшена запроса логаута', () => {
    test('Тест экшена ожидания ответ после запроса логаута', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUser.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса логаута', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: logoutUser.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного логаута', () => {
      const mockedPayload = {
        message: 'Successful logout'
      };
      const store = setupStore();
      store.dispatch({
        type: logoutUser.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест экшена запроса изменения данных клиента', () => {
    test('Тест экшена ожидания ответ после запроса изменения данных клиента', () => {
      const store = setupStore();
      store.dispatch({ type: updateUser.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса изменения данных клиента', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного изменения данных клиента', () => {
      const mockedPayload = {
        user: {
          email: 'user@email.ru',
          name: 'User user'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Тест экшена запроса восстановления пароля', () => {
    test('Тест экшена ожидания ответ после запроса восстановления пароля', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPassword.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса восстановления пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: forgotPassword.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного восстановления пароля', () => {
      const mockedPayload = {
        message: 'Reset email sent'
      };
      const store = setupStore();
      store.dispatch({
        type: forgotPassword.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест экшена запроса изменения пароля', () => {
    test('Тест экшена ожидания ответ после запроса изменения пароля', () => {
      const store = setupStore();
      store.dispatch({ type: resetPassword.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса изменения пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: resetPassword.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного изменения пароля', () => {
      const mockedPayload = {
        message: 'Password successfully reset'
      };
      const store = setupStore();
      store.dispatch({
        type: resetPassword.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест экшена запроса данных пользователя', () => {
    test('Тест экшена ожидания ответ после запроса данных пользователя', () => {
      const store = setupStore();
      store.dispatch({ type: getUser.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса данных пользователя', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getUser.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного запроса данных пользователя', () => {
      const mockedPayload = {
        user: {
          email: 'user@email.ru',
          name: 'User user'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: getUser.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });
});
