import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useImageSubmit = (
  images: Array<Blob>,
  data: string,
  { callback }: { callback?: () => void } = {},
  name?: string,
  key?: string,
) => {
  const router = useRouter();
  const path = usePathname();

  const imageSubmit = async () => {
    if (images.length < 1) return;

    const body = new FormData();
    body.append("file", images[0]);
    body.append("sanityId", data);
    name && body.append("name", name);
    key && body.append("key", key);
    
    await fetch("/api/_uploadImage", {
      method: "post",
      body: body,
    })
      .then(() => {
        router.refresh();
      })
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => console.log(error));
  };

  return { imageSubmit };
};

export default useImageSubmit;
