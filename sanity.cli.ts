import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ai1apfv0',
    dataset: 'production'
  },
  studioHost: 'korpuchinagallery',
  autoUpdates: true,
})
