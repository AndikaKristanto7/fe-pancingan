import PostCard from './PostCard'
import { Container, Row, Col } from 'react-bootstrap';
 
 
const Posts = () => {
    return (
        <Container>
            <Row className="justify-content-between">
                <Col md={8} className="mb-4 mt-4">
                    <PostCard />
                </Col>
            </Row>
        </Container>
    );
};
 
export default Posts;