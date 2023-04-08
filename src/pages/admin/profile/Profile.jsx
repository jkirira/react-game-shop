import ChangePassword from "../../../components/admin/profile/ChangePassword";
import PersonalInformation from "../../../components/admin/profile/PersonalInformation";

export default function Profile() {
    return (
        <div>
            <h3>Profile</h3>
            <div className="border my-3 p-3 pb-5 rounded">
                <PersonalInformation />
            </div>
            <div className="border my-3 p-3 pb-5 rounded">
                <ChangePassword />
            </div>
        </div>
    );
}
