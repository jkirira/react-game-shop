import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuCard({ children, title, subtitle, icon, count, color, textColor = '#fff' }) {
    return (
        <div className="card cursor-pointer" style={{ background: color, color: textColor, minHeight: '16rem', minWidth: '20rem' }}>
            <div className="card-body d-flex flex-column">
                <section>
                    <h5 className="card-title">{ title }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ subtitle }</h6>
                </section>
                <section className="flex-grow-1">
                    <p className="card-text">
                        { children }
                    </p>
                </section>
                <section className="d-flex align-items-center fs-1">
                    <span className="me-auto">
                        <FontAwesomeIcon className=" me-3 cursor-pointer" icon={ icon } />
                    </span>
                    <span className="ms-auto px-3">
                        { count }
                    </span>
                </section>
            </div>
        </div>
    );
}
