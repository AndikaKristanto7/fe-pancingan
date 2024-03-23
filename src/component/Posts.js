import PostCard from './PostCard'
import { Container, Row, Col } from 'react-bootstrap';
import { PostContext } from '../context/postContext';
import { useContext } from 'react';
const Posts = () => {
    const {getData} = useContext(PostContext)
    let data = getData()
    return (
        <>
        {data.map((item,key)=>{

        return <Container key={key}>
                <Row className="justify-content-between">
                    <Col md={8} className="mb-4 mt-4">
                        <PostCard blog={item} key={key}/>
                    </Col>
                </Row>
            </Container>
        })}
        
        </>
        
        
    );
};
 
export default Posts;