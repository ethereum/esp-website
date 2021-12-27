import { Center, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/UI';

const ProjectGrants: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ethereum Ecosystem Program | Project Grants</title>
        <meta name='description' content='Project Grants' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Center>
        <Heading as='h1' size='3xl'>
          For Applicants
        </Heading>
      </Center>
    </Layout>
  );
};

// const ProjectGrants: NextPage = () => {
//   return (
//     <Container maxW='2xl'>
//       <Head>
//         <title>Ethereum Ecosystem Program | Project Grants</title>
//         <meta name='description' content='Project Grants' />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>

//       <Flex py={16} minH='100vh' direction='column' justify='center' align='center'>
//         <main>
//           <Heading as='h1' size='2xl' mb={6}>
//             We provide grants and other support to the builders of the Ethereum ecosystem.
//           </Heading>

//           <Text mb={12}>
//             Whether you&apos;re working on a specific project, or you&apos;re still exploring
//             possibilities, you can connect with our team for guidance.
//           </Text>

//           <Flex>
//             <Button>
//               <Text size='3xl'>Learn More</Text>
//             </Button>
//           </Flex>
//         </main>
//       </Flex>
//     </Container>
//   );
// };

export default ProjectGrants;
