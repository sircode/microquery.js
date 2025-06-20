

# microQuery.js
A minimal, jQuery-one-way-compatible helper library for modern JavaScript projects

### What is it?
microQuery.js is a tiny (~1KB gzipped) JavaScript utility that brings back the simplicity and convenience of jQuery’s $() syntax — for faster coding, cleaner code, and fewer keystrokes.

ℹ️ Note: code written for microQuery.js will run with jQuery.js. Not vice versa.

It covers just the essentials: DOM selection, events, class manipulation, content updates, and $.ajax() — all chainable, all modern, with none of jQuery’s overhead or legacy features.

microQuery doesn’t try to replicate jQuery — it simply offers a minimal set of helpers for the 95% of everyday DOM tasks, and leaves everything else to plain JavaScript.

### Why use it?
* Small footprint
* Familiar API
* No dependencies
* Ideal for PHP/JS projects, static sites, or custom CMSes
* [Demo](https://myappz.com/microquery/demo.html)


---


## 📦 Features

- DOM ready shorthand (`$(fn)`)
- Core traversal and selection  (`.find()`, `.children(), `.siblings()`, `.add()`, `.index()`)
- Class manipulation (`.addClass()`, `.removeClass()`, `.toggleClass()`)
- Event binding (`.on()`)
- Form value handling (`.val()`)
- Text and HTML helpers (`.text()`, `.html()`)
- Attributes and properties (`.attr()`, `.prop()`, `.data()`)
- Inline styles (`.css()`)
- Basic visibility (`.show()`, `.hide()`)
- DOM insertion (`.append()`, `.prepend()`)
- AJAX (`$.ajax()`)

---

### 🚫 Not Supported (Intentionally)

> microQuery keeps it minimal on purpose — if you need these, use jQuery or plain JS.

* `.click()`, `.focus()`, `.submit()`, etc. (use `.on("event", fn)` instead)
* `.animate()`, `.fadeIn()`, `.slideUp()` (use CSS transitions)
* `.closest()`, `.parents()`, `.next()`, `.prev()` and other complex traversal
* `.remove()`, `.empty()` (use `el.remove()` or `el.innerHTML = ""`)
* Event namespaces, `.trigger()`, `.queue()`, and plugins
* Full jQuery compatibility — not the goal!

---

### 📦 When to Use microQuery

| Use case                                                | Recommended Tool |
| ------------------------------------------------------- | ---------------- |
| Basic DOM manipulation with cleaner syntax              | ✅ microQuery     |
| You just want `$().on().addClass().html()`              | ✅ microQuery     |
| You're using modern JS but want less typing             | ✅ microQuery     |
| You need jQuery plugins or advanced traversal           | ❌ Use jQuery     |
| You’re doing performance-critical, framework-level work | ❌ Use plain JS   |

---

## 🔧 Usage

Include the script:

```html
<script src="microQuery.min.js"></script>
````

---

## 🧪 Examples

### DOM Ready

```js
$(function () {
  console.log('DOM is ready');
});
```

### Select Elements

```js
$('.btn');         // by class
$('#output');      // by ID
```

### Core traversal and selection

```js
$('#container').find('.item').addClass('highlight');
$('#parent').children('.child').addClass('x'); 
$('.a').add($('#b')).addClass('highlight');
```

### Event Listener

```js
$('.btn').on('click', function () {
  alert('Clicked!');
});
```

### Class Methods

```js
$('.btn').addClass('active');
$('.btn').removeClass('active');
$('.btn').toggleClass('active');
```

### Text & HTML

```js
$('#output').text('Hello');
$('#output').html('<strong>Hi</strong>');
```

### Attributes & Props

```js
$('#link').attr('href', 'https://myappz.com');
$('#check').prop('checked', true);

$('#el').data('key', 'value');         
const val = $('#el').data('key');  
```

### CSS

```js
$('.btn').css('color', 'red');
```

### Form Values

```js
$('#name').val('Jane');
let name = $('#name').val();
```

### AJAX

```js
$.ajax({
  url: '/api/data',
  success: function (data) {
    console.log(data);
  }
});
```

### Chaining

```js
$('.btn')
  .addClass('primary')
  .text('Save')
  .on('click', saveData);
```

### Iterate Over Elements

```js
$('.item').each(function (el, i) {
  console.log(i, el.textContent);
});
```

### Toggle Visibility (via CSS)

```js
$('.modal').css('display', 'none');
$('.btn').on('click', () => {
  $('.modal').css('display', 'block');
});
```

### Combine Selectors

```js
$('.btn, .link').addClass('interactive');
```

---


### Example Usage
```
// Example Usage
$(function () {
  $('.btn').on('click', function () {
    $('.btn').toggleClass('highlight');

    $.ajax({
      method: 'POST',
      url: '/api/data',
      data: { id: 123 },
      success: data => {
        $('#output').text(data.message);
      }
    });
  });
});

```

## 🤝 Contributing

We welcome pull requests and ideas! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 🔒 License

MIT License — (c) 2024–2025 [MyAppz.com](https://myappz.com)
Not affiliated with the jQuery Foundation.
