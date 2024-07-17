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
        const storedUser = localStorage.getItem('user');
        const storedAuth = localStorage.getItem('isAuth');
        if (storedUser && storedAuth === 'true') {
            console.log("Restoring user auth from localStorage");
            this.setUser(JSON.parse(storedUser));
            this.setIsAuth(true);
        }
    }

    logout() {
        console.log("Executing logout");
        localStorage.removeItem('user');
        localStorage.removeItem('isAuth');
        this.setUser({});
        this.setIsAuth(false);
    
    }
}