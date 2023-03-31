import { faGamepad, faMoneyCheckDollar, faTableCells, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toastNotifyError } from "../../helpers.js";
import { paths } from "../../routes/admin/paths.js";
import { dashboardApi } from "../../apis/admin/dashboard.js";
import MenuCard from "../../components/admin/MenuCard.jsx";

export default function Home() {
    const [dashboardInfo, setDashboardInfo] = useState({});

    useEffect(() => {
        dashboardApi()
            .then(response => {
                setDashboardInfo(response.data.data);
            })
            .catch(error => {
                console.log(error);
                toastNotifyError('Something went wrong. Could not fetch dashboard info.');
            })
    }, [])

    return (
        <div className="px-2">
            
            <section>
                <h2>Dashboard</h2>
            </section>
            
            <section>
                <div className="row row-cols-lg-3 row-cols-xl-4">
                    <Link to={paths.ADMIN_GAMES} className="text-decoration-none col mb-3">
                        <MenuCard 
                            title='Games'
                            icon={faGamepad}
                            count={dashboardInfo.games_count}
                            color='aqua'
                        />
                    </Link>

                    <Link to={paths.ADMIN_CATEGORIES} className="text-decoration-none col mb-3">
                        <MenuCard 
                            title='Categories'
                            icon={faTableCells}
                            count={dashboardInfo.categories_count}
                            color='green'
                        />
                    </Link>

                    <Link to={''} className="text-decoration-none col mb-3">
                        <MenuCard 
                            title='Admins'
                            icon={faUserTie}
                            count={dashboardInfo.users_count}
                            color='gold'
                        />
                    </Link>

                    <Link to={''} className="text-decoration-none col mb-3">
                        <MenuCard 
                            title='Users'
                            icon={faUser}
                            count={dashboardInfo.clients_count}
                            color='crimson'
                        />
                    </Link>

                    <Link to={''} className="text-decoration-none col mb-3">
                        <MenuCard 
                            title='Payments'
                            icon={faMoneyCheckDollar}
                            count={dashboardInfo.payments_count}
                            color='purple'
                        />
                    </Link>
                </div>
            </section>

        </div>
      );
}
