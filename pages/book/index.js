import AllBooks from "@/components/AllBooks";
import MainLayout from "@/components/MainLayout";
import Search from "@/components/Search";
import Head from 'next/head';

export default function Book() {
    return (
        <div>
        <Head>
        <title>Books</title>
        </Head>
        <MainLayout>
            <Search />
            <div className="all">
            <AllBooks />
            </div>
        </MainLayout>
        </div>    
    )
} 