export const NavItems = [
  {
    name: "Dashboard",
    icon: "/dashboard.svg",
    href: "/",
  },
  {
    name: "Dokumen",
    icon: "/documents.svg",
    href: "/documents",
  },
  {
    name: "Gambar",
    icon: "/images.svg",
    href: "/images",
  },
  {
    name: "Media",
    icon: "/video.svg",
    href: "/media",
  },
  {
    name: "Lainnya",
    icon: "/others.svg",
    href: "/others",
  },
];

export const actionsDropdownItems = [
  {
    label: "Ganti Nama",
    icon: "/edit.svg",
    value: "rename",
  },
  {
    label: "Detail",
    icon: "/info.svg",
    value: "details",
  },
  {
    label: "Bagikan",
    icon: "/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/download.svg",
    value: "download",
  },
  {
    label: "Hapus",
    icon: "/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
