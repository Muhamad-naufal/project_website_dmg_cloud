"use server";

import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.action";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const createQuaries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number
) => {
  const quaries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];
  if (types.length > 0) quaries.push(Query.equal("type", types));
  if (searchText) quaries.push(Query.contains("name", searchText));
  if (limit) quaries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");
    quaries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
    );
  }

  console.log("Generated Queries:", quaries); // Debugging line
  console.log("searchText:", searchText);
  console.log("sort:", sort);
  console.log("limit:", limit);

  return quaries;
};

export const uploadedFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadProps) => {
  const { storage, database } = await createAdminClient();
  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId, // owner id
      accountId, // account id
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await database
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "File gagal diunggah");
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Gambar gagal diunggah");
  }
};

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { database } = await createAdminClient();

  try {
    console.log("Bucket ID:", appwriteConfig.bucketId);

    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User tidak ditemukan");

    const quaries = createQuaries(currentUser, types, searchText, sort, limit);
    console.log({ currentUser, quaries });

    const files = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      quaries
    );
    console.log({ files });
    return parseStringify(files);
  } catch (error) {
    handleError(error, "Gagal mengambil data");
  }
};

export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { database } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      }
    );
    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Gagal mengubah nama file");
  }
};

export const updateFileUser = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { database } = await createAdminClient();

  try {
    const updatedFile = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      }
    );
    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Gagal mengubah nama file");
  }
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { database, storage } = await createAdminClient();

  // Tambahkan console.log untuk melihat nilai bucket ID
  console.log("Bucket ID dari appwriteConfig:", appwriteConfig.bucketId);
  console.log("Bucket File ID:", bucketFileId);

  try {
    const deletedFile = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId
    );

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }
    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    console.error("Error saat menghapus file:", error);
    handleError(error, "Gagal menghapus file");
  }
};
