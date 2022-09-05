import {
  Form,
  FormInput,
  FormReset,
  FormSubmit,
  useFormState,
} from "ariakit/form";
import { X as Cancel } from "phosphor-react"
import { CreateLinkInput } from "../server/schema/link"
import { trpc } from "../utils/trpc";

export default function AddLink() {
  const form = useFormState<CreateLinkInput>({ defaultValues: { url: "" } });
  const { mutate, error } = trpc.useMutation(["links.add-link"])

  form.useSubmit(() => {
    mutate(form.values)
  });

  return (
    <Form state={form} className="flex flex-row space-x-2 justify-center m-12">
      {error && error.message}
      <FormInput
        placeholder="Save a URL https://..."
        name={form.names.url}
        required
        className="border-transparent rounded text-neutral-100 bg-neutral-800 w-80 p-2 focus:border-cyan-700 border-2"
      />
      <FormSubmit className="bg-cyan-700 rounded text-ne p-2 hover:bg-cyan-900 transition-colors">Add</FormSubmit>
      <FormReset>
        <Cancel weight="bold" />
      </FormReset>
    </Form>
  );
}
