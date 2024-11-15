import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import React from "react";
import { getFileTypesParams, convertFileSize } from "@/lib/utils";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];

  // Retrieve files and total space used
  const [files, totalSpace] = await Promise.all([
    getFiles({ types, searchText, sort }),
    getTotalSpaceUsed(),
  ]);

  // Calculate the total space for the specified type
  const totalTypeSpace = types.length > 0 ? totalSpace.used : 0;

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">
              Urutkan Menurut:
            </p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No Files Uploaded</p>
      )}
    </div>
  );
};

export default page;
