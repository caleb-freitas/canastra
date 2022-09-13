import { Form, FormInput, FormSubmit, FormReset, useFormState } from "ariakit/form"
import { useRouter } from "next/router"
import { UpdateLinkInput } from "../../server/schema/link"
import { trpc } from "../../utils/trpc"
import { X as Cancel } from "phosphor-react"

type LinkPageContentProps = {
  id: string
}

const LinkPageContent: React.FC<LinkPageContentProps> = (props: LinkPageContentProps) => {
  const form = useFormState<UpdateLinkInput>({ defaultValues: { id: "", title: "" } });

  const utils = trpc.useContext();
  const { data } = trpc.useQuery(["links.get-link", { id: props.id }])
  const { mutate, error } = trpc.useMutation(["links.update-link"], {
    onSuccess() {
      utils.invalidateQueries(["links.get-link"])
    }
  })

  form.useSubmit(() => {
    mutate({
      ...form.values,
      id: props.id
    })
  });

  if (!data) return <div>Link not found</div>

  return (
    <>
      <h1 className="text-2xl m-4">Edit your link</h1>
      <div className="m-4">
        <p><strong>Title: </strong>{data.title}</p>
        <p><strong>URL: </strong> {data.url}</p>
      </div>
      <Form state={form} className="flex space-x-2 justify-center m-12">
        {error && error.message}
        <FormInput
          placeholder="Edit your link title"
          name={form.names.title}
          required
          className="border-transparent rounded text-neutral-100 bg-neutral-800 w-80 p-2 focus:border-cyan-700 border-2"
        />
        <FormSubmit className="bg-cyan-700 rounded text-ne p-2 hover:bg-cyan-900 transition-colors">Update</FormSubmit>
        <FormReset>
          <Cancel weight="bold" />
        </FormReset>
      </Form>
    </>
  )
}

const LinkPage = () => {
  const { query } = useRouter()
  const { id } = query

  if (!id || typeof id !== "string") {
    return <div>No ID</div>
  }

  return (
    <LinkPageContent id={id} />
  )
}

export default LinkPage
