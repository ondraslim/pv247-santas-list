import React, { FC, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { giftListCount } from '../utils/firebase'

const About: FC = () => {
const [listCount, setListCount] = useState<number>(0);

useEffect(() =>{
    giftListCount().then(val =>
        setListCount(val));
}, [])

return <div>
    <p>
       <br />
       <Typography variant="h3" align="center">
        Welcome to the Gift List!
        </Typography>
       <br /> 
    </p>
    
<p>Here you can create your own custom Gift Lists. Christmas, birthdays, anniversaries - whatever you need!
You can add people to each of your lists. And not only people! Do you want to have a Gift List for your dog's Adoption Day? You can!</p>
<p>You can note your budget as well as other comments to each entry.
The app is connected to Etsy, making the search for gifts even easier! Just enter a keyword, press a button and a gift will be found, displayed and saved for that specific person in specific list.</p>
<p>Register now and add your Gift Lists to the {listCount} already existing ones.</p>
<p><i>Created by: Katarína Matúšová, Michaela Horváthová, Ondřej Slimák, 2020</i></p>
</div>;
};

export default About;