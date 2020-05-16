import React from 'react';
import { Box } from '@components/atoms/Box';
import  * as Layout from './Layout'


export default {
    component: Layout,
    title: 'Layout',
    excludeStories: /.*Data$/,
  };

  

  export const Structer = () => (
    <Box>
         <Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header   style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Content  pt={50} height={120} style={{  textAlign: 'center',background: '#108ee9', }}>Content</Layout.Content>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
          </Box>
          <Box mt ={30}>
            <Layout.Layout   style={{ textAlign: 'center' }}>
              <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
              <Layout.Layout>
                <Layout.Sider pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
                <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
              </Layout.Layout>
              <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
            </Layout.Layout>
          </Box>
          <Box mt ={30}>
            <Layout.Layout   style={{ textAlign: 'center' }}>
              <Layout.Header   style={{ background: '#7dbceb', }} >Header</Layout.Header>
              <Layout.Layout>
                <Layout.Content  pt={50} height={120} style={{  textAlign: 'center',background: '#108ee9', }}>Content</Layout.Content>
                <Layout.Sider pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
              </Layout.Layout>
              <Layout.Footer   style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
            </Layout.Layout>
          </Box>
          <Box mt ={30}>
            <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Sider pt={100}  style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
              <Layout.Layout>
                <Layout.Header   style={{ background: '#7dbceb', }} >Header</Layout.Header>
                <Layout.Content  pt={50} height={120} style={{  textAlign: 'center',background: '#108ee9', }}>Content</Layout.Content>
                <Layout.Footer   style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
              </Layout.Layout>
            </Layout.Layout>
          </Box>
    </Box>
  )



  
  