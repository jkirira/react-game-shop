import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchGamesApi } from "../../apis/admin/games.js";
import { toastNotify } from "../../helpers.js";

import { gamesSelector, setGames } from "../../store/slices/gamesSlice.js";

export default function Home() {
    const dispatch = useDispatch();
    const games = useSelector(gamesSelector);

    useEffect(() => {
        fetchGamesApi()
            .then(response => {
                dispatch(setGames(response.data.data));
            })
            .catch(error => {
                console.log(error);
                toastNotify({message: 'Something went wrong. Could not fetch games.', type: 'error'});
            })
    }, [])

    return (
        <div className="px-2">
            <section>
                <h2>Games</h2>
            </section>

            <section>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Developed by</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        games.map(game => (
                                <tr key={ game.id }>
                                    <td>{ game.id }</td>
                                    <td>{ game.name }</td>
                                    <td>{ game.description }</td>
                                    <td>{ game.category?.name }</td>
                                    <td>{ game.quantity }</td>
                                    <td>{ game.price }</td>
                                    <td>{ game.rating }</td>
                                    <td>{ game.developed_by }</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
            </section>

        </div>
      );
}
