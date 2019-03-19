class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(cb){
        localStorage.setItem("isLoggedIn",true)
        // this.authenticated = true;
        cb();
    }


    logout(cb){
        localStorage.clear();
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }


}

export default new Auth();