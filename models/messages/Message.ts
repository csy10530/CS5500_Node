import User from "../users/User";

export default class Message {
    private message: string | null = null;
    private sentTo: User | null = null;
    private sentBy: User | null = null;
}
