
export interface IUser {
	email: string;
	password: string;
    properties: {
        name: string;
        picture: string;
    };

}

export default IUser;