import FileUploader from "@/components/FileUploader";
import Layout from '@/components/layout'
import type { ReactElement } from 'react'


export default function Home() {
  return (
    <Layout>
      <main>
        <div className="flex justify-center items-center min-h-screen">
          <FileUploader />
        </div>
      </main>
    </Layout>
  );
}
