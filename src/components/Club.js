import { useState } from "react";
import { Header, Divider, Item, Button } from "semantic-ui-react";



function Club(props) {
    
    const [clubName, setClubName] = useState(props.name)

    return (
        <div>
            <Header color='purple'>{props.name ? `Your club: {props.name}` : "You don't have any club."}</Header>

            {props.name ? ( 
                <>
                    <Divider />
                    <Header as="h2" color="purple">Members</Header>
                    <Item.Group>
                        {props.members.map(function(member){
                            return (
                                <Header>Cacca</Header>
                            )
                        })}
                    </Item.Group>
                </>
                ) : <Button basic color="purple">Open your club</Button> 
            }
            
        </div>
    );
}

  
export default Club;