import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../FireBase/config';
import { authSlice } from './authSlice';

const { updateUserProfile, authStateChange } = authSlice.actions;

export const doRegister =
  ({ email, password, login }) =>
  async (dispatch, state) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const updatedUser = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          email: updatedUser.email,
          login: updatedUser.displayName,
        })
      );
    } catch (error) {
      console.log('error.message', error.message);
      throw error;
    }
  };

export const doLogin =
  ({ email, password }) =>
  async (dispatch, state) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials);
      return credentials.user;
    } catch (error) {
      console.log('error.message ==>', error.message);
      throw error;
    }
  };

export const doAuthStateChange = () => async (dispatch, state) => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            email: user.email,
            login: user.displayName,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log('error.message', error.message);
    throw error;
  }
};

// export const doLogOut = () => async (dispatch, state) => {
//   await auth.signOut();
// };

// export const doUpdateUserProfile = async update => {
//   const user = auth.currentUser;

//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
