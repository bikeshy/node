const otpGenerator = require('otp-generator');
const OTP = require('../modals/otpModel'); // Corrected typo in "models"
const User = require('../modals/userModel'); // Corrected typo in "models"
const mailSender = require('../utils/mailSender'); // Assuming you have a mailSender utility

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user is already present
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: true, // Consider adding uppercase alphabets for more security
            lowerCaseAlphabets: true,
            specialChars: true,
        });

        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        // Send OTP via email using your mailSender utility
        const mailResponse = await mailSender(email, "OTP Verification", `Your OTP is: ${otp}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp:`${otp}`
            // Optionally, you can exclude the OTP from the response for security reasons
            // otp,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
};