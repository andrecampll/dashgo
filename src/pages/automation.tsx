import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

import { withSSRAuth } from "../utils/withSSRAuth";
import { setUpAuthApiClient } from "../services/api";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Can } from "../components/Can";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
    color: theme.colors.pink,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder:{
      color: theme.colors.gray[600],
    },
    axisTicks:{
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  colors: [theme.colors.pink[500], theme.colors.pink[500], theme.colors.pink[500]],

};

const series = [
  { name: 'Series1', data: [31, 120, 10, 28, 51, 18, 109] }
];

export default function Dashboard() {
  return (
    <>
      <title>Dashgo | Automation</title>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          
          <Can permissions={['metrics.list']}>
            <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
              <Box
                p={["6", "8"]}
                bg="gray.800"
                borderRadius={8}
                pb="4"
              >
                <Text fontSize="lg" mb="4">Métricas da semana</Text>

                <Chart type="area" height={160} options={options} series={series} />
              </Box>

              <Box
                p={["6", "8"]}
                bg="gray.800"
                borderRadius={8}
                pb="4"
              >
                <Text fontSize="lg" mb="4">Métricas de abertura</Text>

                <Chart type="area" height={160} options={options} series={series} />
              </Box>
            </SimpleGrid>
          </Can>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const authApiClient = setUpAuthApiClient(ctx);

  const response = await authApiClient('/me');

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator'],
});
