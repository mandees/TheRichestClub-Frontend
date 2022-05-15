import { useState } from "react";
import { Header, Image } from "semantic-ui-react";
import '../App.css';

function StatusDisplay(props) {
    
    const [clubName, setClubName] = useState(props.name)

    return (
        <div>
            <Header color="purple" as="h1" content="Your current level is:"></Header>
            <Image color="red" centered className="App-logo" src={props.logo} size='large' ></Image>
            <Image color="red" centered className="App-logo" src={props.gem} size='small' ></Image>
            <Header color="purple" as="h1"> {props.status}
                <Header.Subheader color="purple" >( world's top {props.percentage} of population )</Header.Subheader>
            </Header>
        </div>
    );
}

export default StatusDisplay;