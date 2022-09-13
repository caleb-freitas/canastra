import Link from "next/link";
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
  const form = useFormState<CreateLinkInput>({ defaultValues: { title: "", url: "" } });

  const { mutate, error } = trpc.useMutation(["links.add-link"])

  form.useSubmit(() => {
    mutate({
      ...form.values
    })
  });

  return (
    <>
      <h1 className="text-xl p-4">Save a link</h1>
      <Form state={form} className="flex flex-row space-x-2 justify-center p-4">
        {error && error.message}
        <FormInput
          placeholder="Save a URL https://..."
          name={form.names.url}
          required
          className="border-transparent rounded text-neutral-100 bg-neutral-800 w-80 p-2"
        />
        <FormInput
          placeholder="Add your title here"
          name={form.names.title}
          required
          className="border-transparent rounded text-neutral-100 bg-neutral-800 w-80 p-2"
        />
        <FormSubmit className="bg-cyan-700 rounded text-ne p-2 hover:bg-cyan-900 hover:duration-200">Save</FormSubmit>
        <FormReset>
          <Cancel weight="bold" />
        </FormReset>
      </Form>
    </>
  )
}
