import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const PostCard = (props) => {
    return (
        <>
            <Card>
                <Card.Img
                    variant="top"
                    src={props.blog.image} 
                    width={20}
                    height={250}
                />
                <Card.Body>
                    <Card.Title>{props.blog.title}</Card.Title>
                    <Card.Text>
                        <p dangerouslySetInnerHTML={{__html:props.blog.description}}></p>
                    </Card.Text>
                    <Link to={`/blog/${props.blog.slug}`}>Read More</Link>
                </Card.Body>
            </Card>
        </>
    );
};
 
export default PostCard;