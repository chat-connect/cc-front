export interface User {
    types:  string;
    status: number;
    items:{
        user_key:    string;
        name:        string;
        email:       string;
        token:       string;
        image_path:  string;
        description: string;
        message:     string;   
    }
}
