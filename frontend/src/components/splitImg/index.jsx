import { useEffect, useState } from "react";

export default function ({ img, row = 10, column = 10, ...props }) {
  const [html, setHtmml] = useState("");
  useEffect(() => {
    if (img) {
      const tableHtml = createPiece(img, row, column);
      console.log(tableHtml)
      setHtmml(tableHtml);
    }
  }, [img, row, column]);


  return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
  // return <div>{html}</div>
}
