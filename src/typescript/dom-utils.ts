export function domUtils() {
  return {
    querySelectorAll({ selector, text, attributes }) {
      const elements = document.querySelectorAll(selector);
      // console.log({ elements });
      const resultElements = [];
      mainLoop: for (const el of elements) {
        // console.log({ textContent: el.textContent });
        if (!!text && !el.textContent.includes(text)) {
          continue;
        }

        if ("object" == typeof attributes) {
          for (const attrKey of Object.keys(attributes)) {
            const attrValue = attributes[attrKey];
            const elAttrValue = el.getAttribute(attrKey);

            console.log({ attrValue, elAttrValue });
            if (attrValue != elAttrValue) {
              continue mainLoop;
            }
          }
        }

        resultElements.push(el);
      }
      return resultElements;
    },

    querySelector({ selector, text, attributes }) {
      const elements = this.querySelectorAll({ selector, text, attributes });
      if (0 < elements.length) {
        return elements[0];
      } else {
        return null;
      }
    },
  };
}
