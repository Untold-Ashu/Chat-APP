import toast from "react-hot-toast";
import { useState } from "react";

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender });

        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return [loading, signup];
};

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Check something is missing!");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Check the password bro");
        return false;
    }
    if (password.length < 6) {
        toast.error("You have a weak Password, just like you!");
        return false;
    }
    return true;
}
