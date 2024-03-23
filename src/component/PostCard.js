import { Card } from "react-bootstrap";
const PostCard = (props) => {
    return (
        <>
            <Card>
                <Card.Img
                    variant="top"
                    src=
                    "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230305183140/Javascript.jpg"
                    width={20}
                    height={250}
                />
                <Card.Body>
                    <Card.Title>{props.blog.title}</Card.Title>
                    <Card.Text>
                        <p dangerouslySetInnerHTML={{__html:props.blog.description}}></p>
                    </Card.Text>
                    Read More
                </Card.Body>
            </Card>
        </>
    );
};
 
export default PostCard;