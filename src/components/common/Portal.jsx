import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children, containerId = "portal-root" }) {
  const [container] = useState(() => {
    let element = document.getElementById(containerId);

    if (!element) {
      element = document.createElement("div");
      element.id = containerId;
      document.body.appendChild(element);
    }

    return element;
  });

  useEffect(() => {
    return () => {
      if (container && container.childNodes.length === 0) {
        container.remove();
      }
    };
  }, [container]);

  return createPortal(children, container);
}

export default Portal;
