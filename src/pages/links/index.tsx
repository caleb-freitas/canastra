import Link from "next/link";
import { PencilSimple, Tag, Trash } from "phosphor-react";
import { trpc } from "../../utils/trpc";

export default function Links() {
  const utils = trpc.useContext();

  const { mutate } = trpc.useMutation(["links.delete-link"], {
    onSuccess() {
      utils.invalidateQueries(["links.get-all-links"])
    }
  })

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = trpc.useInfiniteQuery(["links.infinite-links", {
    limit: 3
  }], {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  if (isLoading) return <div>Fetching links...</div>

  return (
    <div className="m-4">
      <h1 className="text-2xl">My links</h1>
        {data?.pages.map(group =>
            group.links.map(link => {
              return (
                <div key={link.id} className="flex flex-row relative bg-neutral-800 space-x-4 rounded p-2 mt-2">
                  <Link href={link.url}>
                    <a target="_blank" className="hover:underline">{link.title}</a>
                  </Link>
      
                  <div className="flex flex-row absolute right-4 space-x-2">
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
                      className="rounded p-0.5 hover:border-red-600 border-transparent border-2 ml-auto"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              )
            })
          )
        }
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="bg-cyan-700 p-2 rounded mt-4 hover:bg-cyan-900 disabled:bg-cyan-700"
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load more"
          : "Nothing more to load"}
      </button>
    </div>
  )
}
