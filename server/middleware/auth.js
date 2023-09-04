import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, nex) => {
    try {
        let token = req.header("Authorization");
        console.log(token)
        if(!token){
            return res.status(403).send("Acess Denied");
        }
        if(token.startWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();//formating the token string that came from the request
        }
        console.log(token)

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({func: "verifyToken", error: err.message })
    }
}