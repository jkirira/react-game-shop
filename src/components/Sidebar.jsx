// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import "../assets/scss/sidebar.scss";

export default function Sidebar({ show=false, fullScreen="true", side="right", handleCloseSidebar = () => {},  width, className, children }) {

    const sidebarRef = useRef(null);

    const handleHideSidebar = (e) => {

        if(!sidebarRef.current) {
            console.log('null');
            return;
        }

        if(e.target === sidebarRef.current) {
            handleCloseSidebar();
        }

    };


    return (
        <div ref={sidebarRef}
            onClick={(e) => {handleHideSidebar(e)}}
            className={ 'sidebar-wrapper ' + (className ? `${className} ` : '') + (fullScreen ? 'full ' : '') + (side == "left" ? 'left ' : 'right ') }
            style={{ width: (!!width && !fullScreen) ? width : '' }}
            data-sidebar-toggle={ show ? "show" : "hide" }
        >

            <div className={ "sidebar " + (side == "left" ? 'left ' : 'right ') }
                 style={{ width: width ?? '' }}
            >

                {/* <div className={ "sidebar-close-icon-wrapper " + (side == "left" ? 'left ' : 'right ') }>
                    <FontAwesomeIcon className="sidebar-close-icon" icon={ faClose } onClick={() => handleHideSidebar()} />
                </div> */}

                { children }

            </div>

        </div>
    );
};
