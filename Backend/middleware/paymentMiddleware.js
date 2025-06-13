export const verifylogin = (req, res, next) => {
    const { userId } =reportError.body;
    
    if (!userId) return res.status(401).json({ msg: 'user not iogged in' });
    
    // simulate user check 
      req.user ={id: userId, name: ' '}; next(); 
};