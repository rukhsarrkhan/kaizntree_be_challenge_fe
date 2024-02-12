import Header from "../components/Header";

export default function LandingPage() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Kaizntree Challenge"
                    paragraph="Start you jouney here "
                    linkName="Start"
                    linkUrl="/login"
                />
            </div>
        </div>
    );
}