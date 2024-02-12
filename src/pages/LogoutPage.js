import Header from "../components/Header";
import Logout from "../components/Logout";

export default function LogoutPage() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Logout of your account"
                    linkUrl="/logout"
                />
                <Logout />
            </div>
        </div>
    );
}