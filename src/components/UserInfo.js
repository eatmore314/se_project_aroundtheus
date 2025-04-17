export default class UserInfo {
    constructor({
        nameSelector,
        jobSelector,
        avatarSelector
    }) {
        console.log(nameSelector)
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };
    }

    setUserInfo({
        name,
        job,
        avatar
    }) {
        console.log(avatar)
        if(name) {
           this._nameElement.textContent = name;  
        }
        if(job) {
           this._jobElement.textContent = job;  
        }
        if(avatar) {
            console.log(131231312)
            console.log(this._avatarElement)
           this._avatarElement.src = avatar;  
        }
    }
}