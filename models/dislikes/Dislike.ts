import User from "../users/User";
import Tuit from "../tuits/Tuit";

export default interface Dislike {
    tuit: Tuit,
    dislikedBy: User
}
