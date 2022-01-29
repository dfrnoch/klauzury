import { useRouter } from "next/router";
import React, { useEffect } from "react";



export const WaitForAuth: React.FC = ({
    children,
}) => {
    const { replace } = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            replace("/login");
        }
    }, []);


    return <>{children}</>;
};