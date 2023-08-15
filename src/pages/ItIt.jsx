import React from 'react';
import Layout from './Layout';
import ItItTemplate from '../components/ItItTemplate';
import { useParams } from 'react-router-dom';

const ItIt = () => {
    const { dept, refNo } = useParams();

    console.log(dept, refNo);
    return (
        <Layout>
            <ItItTemplate dept={dept} refNo={refNo} />
        </Layout>
    );
};

export default ItIt;