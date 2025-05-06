import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotAllowed = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                Sorry , you are not allowed to access this application. Please contact the administrator for more information.
            </div>
        </div>
    );
};

export default NotAllowed;
