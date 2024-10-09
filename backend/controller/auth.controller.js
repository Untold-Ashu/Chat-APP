import bcryptjs from 'bcryptjs';
import User from "../Models/user.models.js";
import generateTokenAndSetCookies from '../utils/generateJWT.js';
export const signup = async (req,res)=>{
    try {
        const {fullname,username,password,confirmPassword,gender}=req.body;

        //otp verification-->left
    if(password!==confirmPassword){
        return res.status(400).json({error:"password doesn't match!"});
    }
    const user= await User.findOne({username});

    if(user){
        return res.status(400).json({error:"User already Exist!"});
    }



    //HASH THE PASSWORD HERE

    const salt= await bcryptjs.genSalt(10);
    const HashesdPassword= await bcryptjs.hash(password,salt);

    const boyProfilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser=new User({
        fullname:fullname,  
        username:username,
        password:HashesdPassword,
        gender:gender,
        profilepic:gender==="male"?boyProfilepic:girlProfilepic 
    });
    if(newUser){

        //generate JWT

        await generateTokenAndSetCookies(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic
        })
    }
    else{
        restart.status(400).json({error:"Inavlid User Data"})
    }

   

    } catch (error) {

            console.log("error in signup controller",error.message);
            
            res.status(500).json({error:"internal server error"})
    }
    
}
export const login = async (req,res)=>{
   try {
    const {username,password}= await req.body;
    const user=await User.findOne({username});
    const IsPasswordCorrect=await bcryptjs.compare(password,user?.password || ""); //dcrypt the password and compare,if user did not exist we return the empty string and did not throw any error
    if(!user || !IsPasswordCorrect){
        return res.status(400).json({error:"Invalid credentials"})
    }
    generateTokenAndSetCookies(user._id,res);
     res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        username:user.username,
        profilepic:user.profilepic
     });
     
   } catch (error) {

    console.log("error in login controller",error.message);
    
    res.status(500).json({error:"internal server error"})
}

}

export const logout = (req,res)=>{
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"});
     
   } catch (error) {

    console.log("error in logout controller",error.message);
    
    res.status(500).json({error:"internal server error"})
}
}