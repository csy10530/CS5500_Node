import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default class Like {
    private tuit: Tuit | null = null;
    private likedBy: User | null = null;
}
