export const hendlepayment = (req, res) => {
    const user = req.user; // Assuming user is attached to req

    // dummy check
    const hasPaid = false;
    if (hasPaid) {
        return res.json({ msg: `Payment already done by ${user?.name || 'user'}` });
    }

    // simulate payment process
    return res.json({ msg: `Payment successful for ${user?.name || 'user'}` });
};