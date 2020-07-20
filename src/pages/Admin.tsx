import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';


const  Fun : React.FC<{}> =(props)=>{
    console.log(props.children)
    return <div>
        {
            React.Children.map(props.children,(item)=>(<div>123422222{item}</div>) )

        }    </div>
}

export default (): React.ReactNode => (
    <PageContainer content=" 这个页面只有 admin 权限才能查看">
        <Fun>
            <div>123</div>
            <div>456</div>
            <div>789</div>
        </Fun>
    </PageContainer>
);
