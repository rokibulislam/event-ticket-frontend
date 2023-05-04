import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import Layout  from '@/components/layout'
import { Card, Col, Row, Space } from 'antd';

import EventsList from '@/components/EventsList'


import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import CustomnestedVenueRepeatField from '@/components/VenueRepeatField/customnested'

export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});



export default function Home() {
  console.log('mojaloss');
  console.log(process.env.API_URL);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <h2> Recent Event List </h2>
          {/* <CustomnestedVenueRepeatField /> */}
          {/* <EventsList />/ */}
          {/* <SeatsioSeatingChart
      workspaceKey="17fedfa1-98ac-4e40-9f2a-ac501975a59b"
      pricing={[
        {
          category: 1,
          ticketTypes: [
            {
              ticketType: "adult",
              price: 30,
              label: "For adults",
              description: "Includes hot meal and a drink"
            },
            {
              ticketType: "child",
              price: 20,
              label: "For children",
              description: "Includes burger and fries"
            }
          ]
        },
        {
          category: 2,
          ticketTypes: [
            {
              ticketType: "adult",
              price: 40,
              label: "For adults",
              description: "Includes hot meal and a drink"
            },
            {
              ticketType: "child",
              price: 30,
              label: "For children",
              description: "Includes burger and fries"
            }
          ]
        },
        { category: 3, price: 50 }
      ]}
      priceFormatter={(price) => formatPrice(price)}
      openDraftDrawing="true"
      event="smallTheatreEvent"
      region="eu"
      language="en"
    /> */}
        </Layout>
      </main>
    </>
  )
}
