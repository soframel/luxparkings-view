import {Client} from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' })


async function getParkingNames () {
  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    body: {
      query: {
        match: {
          quote: 'winter'
        }
      }
    }
  })
  console.log(body.hits.hits)
}
run().catch(console.log)