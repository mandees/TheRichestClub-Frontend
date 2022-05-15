import { useState } from "react";
import { Header, Icon, Image, Button, Popup, Card, Divider } from "semantic-ui-react";
import logo from '../logo.svg';


function Profile(props) {
    
    return (
        <div>
            <Popup
                content={
                <>
                    <Header color={props.color} as="h1" align="center" content="PROFILE" />
                    <Card color={props.color}>
                    
                        <Card.Content>
                            <Button color={props.color} basic floated="right" size="tiny" icon="write" />
                            <Card.Header>Giacomo Mandis</Card.Header>
                            <Card.Meta>Crypto Addicts</Card.Meta>
                            
                        </Card.Content>
                        <Card.Content>
                            <Header color={props.color} as="h3" content="Platinum" textAlign="center"></Header>
                            <Image centered size="medium" src={logo} />
                        </Card.Content>
                        <Card.Content extra>
                      
                            <Header textAlign="center" as="h5">
                                Top 3% of population
                            </Header>
                        </Card.Content>
                    </Card>
                </>
                }
                on='click'
                popper={{ id: 'popper-container', style: { zIndex: 2000 } }}
                trigger={<Icon fitted size="big" color={props.color} name={props.icon} />}
                offset={[0, 10]}
                position='bottom center'
            />
        </div>
    );
}

  
export default Profile;