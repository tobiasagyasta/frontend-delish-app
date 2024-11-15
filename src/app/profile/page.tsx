import SimpleBottomNavigation from "@/components/created_components/SimpleBottomNavigation";
import AvatarWithEditButton from "@/components/created_components/AvatarWithEditButton";
import HorizontalMenu from "@/components/created_components/HorizontalMenu";
import ProfileMenu from "@/components/created_components/ProfileMenu";
import Box from '@mui/material/Box';

const userData = {
    fullName: "Cyntia Magdalena",
    membershipSince: "September 2024"
};

const ProfilePage = () => {
    return (
        <>
            <AvatarWithEditButton />

            {/* User Info */}
            <div className="flex flex-col items-center mt-5 mb-5" style={{ fontFamily: "Inter" }}>
                <div style={{ fontWeight: "600", fontSize: "24px", color: "#111827" }}>{userData.fullName}</div>
                <div style={{ fontWeight: "500", fontSize: "12px", color: "#475467" }}>Member sejak {userData.membershipSince}</div>
            </div>

            {/* Horizontal Line */}
            <div style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#EAECF0',
                margin: '10px 0',
            }} />

            <HorizontalMenu />

            <ProfileMenu />


        </>
    )
};
export default ProfilePage;