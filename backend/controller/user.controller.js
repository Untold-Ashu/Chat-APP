
import User from "../Models/user.models.js";

const getUsersForSidebar=async (req,res)=>{

try {
    const loggedInUser= req.user._id;
    const FilteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password")
    res.status(200).json(FilteredUsers);

} catch (error) {
    console.error("error in getUserFromSidebar handler: ", error.message);
    res.status(500).json({error:"Internal server error"})
}

}

export default getUsersForSidebar;

