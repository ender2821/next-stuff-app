

import { useEffect, useState } from "react";

const useImageHandler = () => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if(images.length < 1) return;
    let newImageURLs: any = [];
    images.forEach( image => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);
 
  return {images, setImages, imageURLs, setImageURLs}
}

export default useImageHandler;



