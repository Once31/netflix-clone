import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import exp from "constants";

const useMovie = (id?: string) => {
    const { data, error, isLoading, mutate} = useSWR( id ? `/api/movies/${id}` : null , fetcher , {
        revalidateIfStale: false,
        revalidateOnFocus:false,
        revalidateOnReconnect: false,
    })

    return { 
        data,
        error,
        isLoading,
    }
}

export default useMovie;
