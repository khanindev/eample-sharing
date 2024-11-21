import { FC, useCallback, useEffect, useState } from "react";

const fetchBlob = async (src: string) => {
  const response = await fetch(src);
  const blob = await response.blob();

  return blob;
};

type ShareButtonProps = {
  src: string;
};
export const ShareButton: FC<ShareButtonProps> = ({ src }) => {
  const [blob, setBlob] = useState<Blob>();

  const handleClick = () => {
    if (blob) {
      const sharingFile = new File([blob], "example.jpg", {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      });

      const sharingData: ShareData = {
        files: [sharingFile],
      };

      if (navigator.canShare(sharingData)) {
        navigator.share(sharingData);
      }
    }
  };

  useEffect(() => {
    const loadBlob = async () => {
      const blob = await fetchBlob(src);
      setBlob(blob);
    };

    loadBlob();
  }, [src]);

  return (
    <button disabled={!blob} onClick={() => handleClick()}>
      {!blob ? "Loading image..." : "Download image"}
    </button>
  );
};
