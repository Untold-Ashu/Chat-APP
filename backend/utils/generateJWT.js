import jwt from 'jsonwebtoken';
const generateTokenAndSetCookies=(userId,res)=>{
    const token =jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"5d"
    })
    res.cookie("jwt",token,{
        maxAge:5*24*60*60*1000,
        httpOnly:true,//prevent xss attack cross-site scripting attack
        sameSite:"strict",//prevent CSRF cross site request forgery attack
        secure:process.env.NODE_ENV!=="development"//cookies works only for https
    });
};
 export default generateTokenAndSetCookies;