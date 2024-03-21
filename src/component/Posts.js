import PostCard from './PostCard'
import { Container, Row, Col } from 'react-bootstrap';

const Posts = (postData) => {
    return (
        <Container>
            <Row className="justify-content-between">
                <Col md={8} className="mb-4 mt-4">
                    <PostCard postCardData={postData} />
                </Col>
            </Row>
        </Container>
    );
};
 
export default Posts;