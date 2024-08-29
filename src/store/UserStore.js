import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._user = {};
        this._isAuth = false;
        makeAutoObservable(this);
    }

    setUser(user) {
        this._user = user;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    get user() {
        return this._user;
    }

    get isAuth() {
        return this._isAuth;
    }

    // Новый метод для восстановления состояния из localStorage
    restoreAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            user.setIsAuth(true);
            user.setToken(token);
        }
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuth');
        this.setUser({});
        this.setIsAuth(false);
    }

    setToken(token) {
        this.token = token;
    }
    
}
