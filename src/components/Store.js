import { useState } from "react";
import { Header, Item, Button, Divider } from "semantic-ui-react";
import AnimateHeight from 'react-animate-height';
import Levels from "../app-logic/Levels";

import logo from '../logo.svg';

function Store(props) {
    
    const [clubName, setClubName] = useState(props.name)
    const [hidden, setHidden] = useState(true)

    return (
        <AnimateHeight duration={700} height={props.show ? 'auto' : '0'}>
            <div style={{paddingLeft: '10%', paddingRight: '10%'}} >
            <Divider hidden="true"/>
            <Header textAlign='center'>Store </Header>
            <Divider />
            <Item.Group>
                {Levels.map(function(level){
                    return (
                        <Item>
                            <Item.Image  verticalAlign='middle' size='mini' src={logo} />
        
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as="h6" floating="left">{level.name} </Item.Header>
                            </Item.Content>
                            <Button onClick={() => {props.onBuy(level.id, level.price)}}>Obtain</Button>
                        </Item>
                    );
                }
                )}
                </Item.Group>
                </div>
        </AnimateHeight>
    );
}

  
export default Store;