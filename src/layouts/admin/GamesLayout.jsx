import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'
import { paths } from '../../routes/admin/paths';
import { fetchGames, gamesSelector } from '../../store/slices/gamesSlice';

export default function GamesLayout() {
    const dispatch = useDispatch();
    const games = useSelector(gamesSelector);

    useEffect(() => {
        if(!games || games.length < 1) {
            dispatch(fetchGames);
        }

    }, []);

    return (
        <div className="px-2">
            
            <section>
                <h2>
                    <Link className="text-decoration-none text-body" to={paths.ADMIN_GAMES}>Games</Link>
                </h2>
            </section>

            <Outlet />

        </div>
    );
}
