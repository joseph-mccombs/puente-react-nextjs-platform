import Footer from 'app/components/Footer';
import Layout from 'app/components/Layout';
import { GroupedBarChart, LineChart, ResponsiveScatterPlot } from 'app/components/Viz';
import dataQueryer from 'app/modules/apollo-grapql';

const organization = 'WOF';

const SChart = ({ data }) => {
  const legend = { left: 'Systolic', bottom: 'Diastolic' };

  const mappedVitals = [{
    id: organization,
    data: data.reduce((result, record) => {
      const { Diastolic, Systolic } = record;
      if (Number(Diastolic) > 0) {
        return result.concat({
          x: Number(Diastolic),
          y: Number(Systolic),
        });
      }
      return result;
    }, []),
  }];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveScatterPlot
        data={mappedVitals}
        legend={legend}
      />
    </div>
  );
};

const LChart = ({ data }) => {
  const legend = { left: 'Systolic', bottom: 'Diastolic' };

  const countedData = [];
  const groupBy = (keys) => (array) => array.reduce((objectsByKeyValue, obj) => {
    const value = keys.map((key) => obj[key]).join('-');
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

  const groupByCommunityName = groupBy(['communityname']);

  for (const [groupName, values] of Object.entries(groupByCommunityName(data))) {
    console.log(`${groupName}: ${values.length}`);
    countedData.push({
      x: groupName,
      y: values.length,
    });
  }

  const mappedVitals = [{
    id: organization,
    data: countedData,
  }];

  // console.log(mappedVitals)

  return (
    <div style={{ height: '400px' }}>
      <LineChart
        data={mappedVitals}
        legend={legend}
      />
      <h1>hello</h1>
    </div>
  );
};

const BChart = ({ data }) => {
  const legend = { left: 'Blood Pressure', middle: 'Community' };

  const parsedData = data.map((result) => ({
    ...result,
    Diastolic: Number(result.Diastolic),
    Systolic: Number(result.Systolic),
  }));

  const reduced = parsedData.reduce((m, d) => {
    if (!m[d.communityname]) {
      m[d.communityname] = { ...d, count: 1 };
      return m;
    }
    m[d.communityname].Systolic += d.Systolic;
    m[d.communityname].Diastolic += d.Diastolic;
    m[d.communityname].count += 1;
    return m;
  }, {});

  const result = Object.keys(reduced).map((k) => {
    const item = reduced[k];
    return {
      communityname: item.communityname,
      Systolic: Math.round(item.Systolic / item.count),
      Diastolic: Math.round(item.Diastolic / item.count),
      Count: item.count,
    };
  });

  return (
    <div style={{ height: '500px' }}>
      <GroupedBarChart
        data={result}
        keys={['Systolic', 'Diastolic']}
        indexBy="communityname"
        legend={legend}
      />
    </div>
  );
};

const Forms = ({ vitals }) => (
  <Layout>
    <main className="container">
      <div>Data Viz</div>
      <h1>{organization}</h1>
      <SChart data={vitals.getVitalByOrganization.slice(0, 300)} />
      <BChart data={vitals.getVitalByOrganization.slice(0, 300)} />
      <LChart data={vitals.getVitalByOrganization.slice(0, 300)} />

      <style jsx>
        {`

        
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}
      </style>
    </main>
    <Footer />
  </Layout>
);

export async function getStaticProps() {
  const vitals = await dataQueryer(`
    query{
      getVitalByOrganization(organization: "${organization}"){
          sex
          dob
          age
          educationLevel
          communityname
          city 
          province 
          region
          surveyingUser
          surveyingOrganization
          surveyingUserSupplementary
          height
          weight
          respRate
          bmi
          bloodSugar
          bloodOxygen
          bloodPressure
          Systolic
          Diastolic
          pulse
          hemoglobinLevels
          createdAt
          updatedAt
      }
    }`);

  return {
    props: {
      vitals,
    },
  };
}

export default Forms;
