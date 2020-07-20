import React from "react";
import styles from './style.less';
import {Link} from "umi";
import logo from "@/assets/logo.svg";
import Footer from "@/components/Footer";



const UserLayout: React.FC<{}> = (props) => {

    return (
        <div className={ styles.container }>

            <div className={ styles.content }>
                <div className={ styles.top }>
                    <div className={ styles.header }>
                        <Link to="/">
                            <img alt="logo" className={ styles.logo } src={ logo }/>
                            <span className={ styles.title }>Ant Design</span>
                        </Link>
                    </div>
                    <div className={ styles.desc }>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                </div>

                <div className={ styles.main }>


                    {props.children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default UserLayout;
