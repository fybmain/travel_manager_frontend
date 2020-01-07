import React from 'react';
import { mergeStyles, mergeStyleSets } from '@uifabric/merge-styles';

interface IDefaultheaderProps{

}

const headerStyles = mergeStyleSets({
    root :{
        width : "100%",
        background: "#333",
        minHeight: "55px",
        flex: 1,
    }   
})
export const Defaultheader = (props: IDefaultheaderProps) => 
    <div className={headerStyles.root}>
        <div style={{height: "100%"}}>
        </div>
    </div>



const rootStyle = mergeStyleSets({
    warpper:{
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },

    root :{
        flex : "1 0 auto",
    }
})

export class PageBase<P,T> extends React.Component<P,T>{
    constructor(props: P){
        super(props);
    }

    onRenderHeader(){
         return <Defaultheader/>
    }

    onRenderFooter(){
        return null
    }

    onRenderBody(){
        return null;
    }

    render(){
        return (
            <div className={rootStyle.warpper}>
                <div className={rootStyle.root}>
                    <div>
                        {this.onRenderHeader()}
                    </div>
                    <div>
                        {this.onRenderBody()}
                    </div>
                </div>
                {this.onRenderFooter()}
            </div>
        )
    }

}