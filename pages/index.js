import { Card } from 'app/components/molecules';
import Head from 'next/head';

import styles from './index.module.scss';

export default function Home() {
  return (
    <div className={styles.index}>
      <Head>
        <title>Puente - Manage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to Puente Manage
          {' '}
          {/* <a href="https://nextjs.org">Manage!</a> */}
        </h1>
        <h1>Quick Start Guide</h1>

        <div className={styles.grid}>
          <Card
            title="Form Creator"
            description="Create Forms for Puente Collect"
            nextLink="/forms/form-creator"
          />
          <Card
            title="Form Manager"
            description="Manage Forms for Puente Collect"
            nextLink="/forms/form-manager"
          />
          <Card
            title="Form Marketplace"
            description="Manage Marketplace"
            nextLink="/forms/form-marketplace"
          />
          <Card
            title="Data Visualization"
            description="Visualize Data from Puente Collect"
            nextLink="/data-visualization"
          />
          {/* <Card
            title="Data Exporter"
            description="Download data"
            nextLink="/data"
          /> */}
        </div>
      </main>
      <style jsx global>
        {`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  );
}
