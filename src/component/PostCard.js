import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const PostCard = (postCardData) => {
    const [cardData,setCardData] = useState({})
    useEffect(()=>{
        setCardData(postCardData.postCardData.postData)
    },[])
    
    
    return (
        <Card>
            <Card.Img
                variant="top"
                src=
                "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230305183140/Javascript.jpg"
                width={20}
                height={250}
            />
            <Card.Body>
                <Card.Title>{cardData.title}</Card.Title>
                <Card.Text>
                    <p dangerouslySetInnerHTML={{__html:cardData.description}}></p>
                </Card.Text>
                Read More
            </Card.Body>
        </Card>
    );
};
 
export default PostCard;