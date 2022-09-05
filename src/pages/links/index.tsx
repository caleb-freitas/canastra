import Link from "next/link";
import { PencilSimple, Tag, Trash } from "phosphor-react";
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
    <div className="m-4">
      <h1 className="text-2xl">
        My links
      </h1>
      {data?.map(link => {
        return (
          <div key={link.id} className="flex flex-row bg-neutral-800 space-x-4 rounded p-2 mt-2">
            <Link href={link.url}>
              <a target="_blank" className="hover:underline">{link.url}</a>
            </Link>

            <div className="flex flex-row space-x-2">
              <button className="rounded p-0.5 hover:border-amber-500 border-transparent border-2">
                <Tag />
              </button>

              <Link href={`links/${link.id}`} key={link.id} >
                <a key={link.id}>
                  <div
                    key={link.id}
                    className="rounded p-0.5 hover:border-cyan-600 border-transparent border-2"
                  >
                    <PencilSimple />
                  </div>
                </a>
              </Link>

              <button
                onClick={() => mutate({ id: link.id })}
                className="rounded p-0.5 hover:border-red-600 border-transparent border-2"
              >
                <Trash />
              </button>
            </div>


          </div>
        )
      })}
    </div>
  )
}
