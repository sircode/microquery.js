/*!
 * microQuery.js v1.0.6 - A minimal jQuery-compatible utility library
 * (c) 2024-2025 MyAppz.com | MIT License | Not affiliated with jQuery
 */

(function (global) {
  function $(selector) {
    // Handle $(function () { ... }) for DOM ready
    if (typeof selector === 'function') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', selector);
      } else {
        selector();
      }
      return;
    }

    const elements = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : (selector instanceof NodeList || Array.isArray(selector))
        ? Array.from(selector)
        : [selector];

    const api = {

      // Core traversal and selection

      find(selector) {
        const found = [];
        elements.forEach(el => {
          found.push(...el.querySelectorAll(selector));
        });
        return $(found);
      },

      children(selector) {
        const all = [];
        elements.forEach(el => {
          const kids = Array.from(el.children);
          all.push(...(selector ? kids.filter(k => k.matches(selector)) : kids));
        });
        return $(all);
      },
      siblings(selector) {
        const all = [];
        elements.forEach(el => {
          const parent = el?.parentElement;
          if (!parent) return;

          const siblings = Array.from(parent.children).filter(sib => sib !== el);
          if (selector) {
            all.push(...siblings.filter(s => s.matches(selector)));
          } else {
            all.push(...siblings);
          }
        });
        return $(all);
      },


      add(other) {
        const newEls = [...elements];
        const toAdd = other.length !== undefined ? other : [other];
        toAdd.forEach(el => {
          if (!newEls.includes(el)) newEls.push(el);
        });
        return $(newEls);
      },
      index(el) {
        if (el === undefined) {
          const first = elements[0];
          if (!first || !first.parentNode) return -1;
          return Array.from(first.parentNode.children).indexOf(first);
        }
        return elements.indexOf(el);
      },


      // Event handling

      on(event, selectorOrHandler, maybeHandler) {
        if (typeof selectorOrHandler === 'function') {
          elements.forEach(el => el.addEventListener(event, selectorOrHandler));
        } else {
          const selector = selectorOrHandler;
          const handler = maybeHandler;

          elements.forEach(el => {
            el.addEventListener(event, function (e) {
              if (e.target && e.target.matches(selector)) {
                handler.call(e.target, e);
              }
            });
          });
        }
        return api;
      },


      ready(callback) {
        if (elements[0] === document) {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
          } else {
            callback();
          }
        }
        return api;
      },



      // Class manipulation

      addClass(className) {
        elements.forEach(el => {
          if (el?.classList?.add) {
            el.classList.add(className);
          }
        });
        return api;
      },

      removeClass(className) {
        elements.forEach(el => {
          if (el?.classList?.remove) {
            el.classList.remove(className);
          }
        });
        return api;
      },

      toggleClass(className) {
        elements.forEach(el => {
          if (el?.classList?.toggle) {
            el.classList.toggle(className);
          }
        });
        return api;
      },


      // Content manipulation

      html(content) {
        if (content === undefined) {
          return elements[0]?.innerHTML;
        }
        elements.forEach(el => el.innerHTML = content);
        return api;
      },
      val(value) {
        if (value === undefined) {
          return elements[0]?.value;
        }
        elements.forEach(el => {
          if ('value' in el) el.value = value;
        });
        return api;
      },

      // Attribute/property/data

      attr(name, value) {
        if (value === undefined) {
          return elements[0]?.getAttribute(name);
        }
        elements.forEach(el => el.setAttribute(name, value));
        return api;
      },

      // Content manipulation

      text(content) {
        if (content === undefined) {
          return elements[0]?.textContent;
        }
        elements.forEach(el => el.textContent = content);
        return api;
      },
      prop(name, value) {
        if (value === undefined) {
          return elements[0]?.[name];
        }
        elements.forEach(el => {
          el[name] = value;
        });
        return api;
      },
      data(key, value) {
        if (value === undefined) {
          return elements[0]?.dataset[key];
        }
        elements.forEach(el => el.dataset[key] = value);
        return api;
      },

      // Styling
      css(property, value) {
        if (typeof property === 'object') {
          // Handle object-based style setting
          elements.forEach(el => {
            if (!el?.style) return;
            for (const key in property) {
              el.style[key] = property[key];
            }
          });
          return api;
        }

        if (value === undefined) {
          const el = elements[0];
          return el?.nodeType === 1 ? getComputedStyle(el)[property] : undefined;
        }

        elements.forEach(el => {
          if (el?.style) el.style[property] = value;
        });
        return api;
      },

      prepend(content) {
        elements.forEach(el => {
          if (typeof content === 'string') {
            el.insertAdjacentHTML('afterbegin', content);
          } else if (content instanceof Element) {
            el.insertBefore(content.cloneNode(true), el.firstChild);
          }
        });
        return api;
      },

      append(content) {
        elements.forEach(el => {
          if (typeof content === 'string') {
            el.insertAdjacentHTML('beforeend', content);
          } else if (content instanceof Element) {
            el.appendChild(content.cloneNode(true));
          }
        });
        return api;
      },


      /* Visibility */

      hide() {
        elements.forEach(el => {
          el.style.display = 'none';
        });
        return api;
      },

      show() {
        elements.forEach(el => {
          el.style.display = '';
        });
        return api;
      },


    };

    // Make it array-like so you can do $('#id')[0]
    Object.assign(api, elements);
    api.length = elements.length;

    return api;
  }

  $.ajax = function ({ url, method = 'GET', data = null, success, error }) {
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(success)
      .catch(error || console.error);
  };

  global.$ = $;
})(window);
