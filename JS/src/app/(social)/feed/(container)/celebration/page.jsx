import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import Followers from './components/Followers';
import { Link } from 'react-router-dom';
import Celebrations from './components/Celebrations';
import UpcomingCelebrations from './components/UpcomingCelebrations';
import LoadContentButton from '@/components/LoadContentButton';
import PageMetaData from '@/components/PageMetaData';
const Celebration = () => {
  return <>
    <PageMetaData title='Celebration' />
      <Col md={8} lg={6} className="vstack gap-4">
        <Celebrations />
        <UpcomingCelebrations />
      </Col>
      <Col lg={3}>
        <Row className="g-4">
          <Col sm={6} lg={12}>
            <Followers />
          </Col>

          
        </Row>
      </Col>
    </>;
};
export default Celebration;