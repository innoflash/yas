export class User {
    first_name: string;
    last_name: string;
    email: string;
    phoneNumber: string;
    id: number;
    id_number: string;
    password: string;
    fullname: string;
    category: string;
    picture: string;

    static getUser(data: string): User {
        var user: User = new User();
        var thedata: any = JSON.parse(data);
        user.first_name = thedata.first_name;
        user.last_name = thedata.last_name;
        user.phoneNumber = thedata.phone;
        user.email = thedata.email;
        user.id_number = thedata.id_number;
        user.fullname = thedata.first_name + " " + thedata.last_name;
        user.id = thedata.id;
        user.category = thedata.category;
        user.picture = thedata.picture;

        return user;
    }
}