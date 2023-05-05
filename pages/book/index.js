import AllBooks from "@/components/AllBooks";
import MainLayout from "@/components/MainLayout";
import Head from 'next/head';

export default function Book() {
    return (
        <div>
        <Head>
        <title>Books</title>
        </Head>
        <MainLayout>
            <div className="all">
            <AllBooks />
            </div>
        </MainLayout>
        </div>    
    )
} 