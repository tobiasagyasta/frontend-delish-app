"use client";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";

const withAuth = (WrappedComponent: React.FC) => {
    const ComponentWithAuth = (props: any) => {
        const [mounted, setMounted] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            setMounted(true);
        }, []);

        useEffect(() => {
            if (mounted) {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login/email");
                } else {
                    setIsAuthenticated(true);
                }
            }
        }, [mounted, router]);

        if (!mounted || !isAuthenticated) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
};

export default withAuth;