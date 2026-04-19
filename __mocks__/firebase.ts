export const auth = { currentUser: null };
export const signOut = jest.fn(() => Promise.resolve());
export const signInWithEmailAndPassword = jest.fn();