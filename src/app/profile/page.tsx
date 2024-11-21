"use client";
import SimpleBottomNavigation from "@/components/created_components/SimpleBottomNavigation";
import AvatarWithEditButton from "@/components/created_components/AvatarWithEditButton";
import HorizontalMenu from "@/components/created_components/HorizontalMenu";
import ProfileMenu from "@/components/created_components/ProfileMenu";
import Box from '@mui/material/Box';
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [userData, setUserData] = useState<any>(null);
    const [membershipSince, setMembershipSince] = useState<String>('null');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://backend-delish-app-production.up.railway.app/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setUserData(data);
                setMembershipSince(data.membershipSince);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AvatarWithEditButton />

            {/* User Info */}
            <div className="flex flex-col items-center mt-5 mb-3" style={{ fontFamily: "Inter" }}>
                <div style={{ fontWeight: "600", fontSize: "24px", color: "#111827" }}>{userData.name}</div>
                <div style={{ fontWeight: "500", fontSize: "12px", color: "#475467" }}>Member sejak {userData.city}</div>
            </div>

            {/* Horizontal Line */}
            <div style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#EAECF0',
                margin: '5px 0',
            }} />

            <HorizontalMenu />

            <ProfileMenu />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
            }}>
                {/* Copyright label*/}
                <div style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#667085",
                    marginTop: "auto",
                    marginBottom: "10px",
                    marginLeft: "10px",
                    paddingBottom: "60px",
                }}>
                    © Delish 2024. All rights reserved.
                </div>
                <Box sx={{ flexGrow: 1 }} />

                {/* Bottom Navigation */}
                <SimpleBottomNavigation />
            </Box>
        </>
    )
};
export default ProfilePage;