import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export default async function handler (req: NextApiRequest, res: NextApiResponse)  {
    if(req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res);

        const movieCount = await prismadb.movie.count();

        const randomIndex = Math.floor(Math.random() * movieCount);

        console.log('random index', randomIndex)
        const randomMovies = await prismadb.movie.findMany({
            take:1,
            skip: randomIndex
        })

        console.log(randomMovies[0])

        return res.status(200).json(randomMovies[0])

    } catch(error) {
        console.log(error);
        return res.status(400).end()
    }
}