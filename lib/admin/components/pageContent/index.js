import PdPageContent from "./src/index.vue"

PdPageContent.install = (app) => {
  app.component(PdPageContent.name, PdPageContent)
}

export default PdPageContent
