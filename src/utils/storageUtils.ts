import store from 'store';

const user_id: string = 'user';

const storageUtils = {
  saveUser(user: any) {
    store.set(user_id, user);
  },

  getUser() {
    return store.get(user_id) || {};
  },

  removeUser() {
    store.remove(user_id);
  }
}

export default storageUtils;