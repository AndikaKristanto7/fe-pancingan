import React from 'react'
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const PostCard = (props) => {
    let description = props.blog.description;
    if(description.length > 100){
        description = `${description.slice(0,100)}...`
    }
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
                        <p dangerouslySetInnerHTML={{__html:description}}></p>
                    </Card.Text>
                    <Link to={`/blog/${props.blog.slug}`}>Read More</Link>
                </Card.Body>
            </Card>
        </>
    );
};
 
export default PostCard;