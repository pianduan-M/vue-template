import PdForm from "./src/form"
import { useForm } from "./src/use-form"

PdForm.install = (app) => {
  app.component(PdForm.name, PdForm)
}

PdForm.useForm = useForm

export default PdForm
