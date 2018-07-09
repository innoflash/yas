export class YA_API{
    static API_ROOT = "http://localhost:8001/api/yas-";
    static LOGIN = YA_API.API_ROOT + "login";
    static REGISTER = YA_API.API_ROOT + "register";
    static GET_STORIES = YA_API.API_ROOT + 'stories';
    static GET_STORY = YA_API.API_ROOT + 'story';
    static DEL_STORY = YA_API.API_ROOT + 'delstory';
    static ADD_STORY = YA_API.API_ROOT + 'addstory';
    static EDIT_STORY = YA_API.API_ROOT + 'editstory';
    static EDIT_PROFILE = YA_API.API_ROOT + 'editprofile';
    static EDIT_PASSWORD = YA_API.API_ROOT + 'editpassword';
    static DEL_PROFILE = YA_API.API_ROOT + 'delprofile';
    static CONFIRM_ACCOUNT = YA_API.API_ROOT + 'confacc';
    static DEL_ACCOUNT = YA_API.API_ROOT + 'delacc';
}