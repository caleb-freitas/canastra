import Link from "next/link";
import { PencilSimple, Trash } from "phosphor-react";
import { trpc } from "../../utils/trpc";

export default function Links() {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["links.get-all-links"])
  const { mutate } = trpc.useMutation(["links.delete-link"], {
    onSuccess() {
      utils.invalidateQueries(["links.get-all-links"])
    }
  })

  if (isLoading) return <div>Fetching links...</div>

  return (
    <>
      <h1>My Links</h1>
      <div>
        {data?.map(link => {
          return (
            <div key={link.id}>
              <Link href={link.url}>
                <a target="_blank">{link.url}</a>
              </Link>
              <button>
                <PencilSimple />
              </button>
              <button onClick={() => mutate({ id: link.id })}>
                <Trash />
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
