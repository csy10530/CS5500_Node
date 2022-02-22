import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default class Bookmark {
    private tuit: Tuit | null = null;
    private bookmarkedBy: User | null = null;
}
