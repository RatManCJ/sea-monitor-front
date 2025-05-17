
import styles from './RightSideBar.module.scss';


const RightSideBar = () => {


    return (
        <div className={`${styles.rightSidebar}`}
             style={{
                 position: 'fixed',
                 bottom: '20px',
                 zIndex: 1000,
                 backgroundColor: 'rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(1px)',
                 borderRadius: '8px',
                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                 padding: '16px',
             }}>
        </div>
    );
};

export default RightSideBar;