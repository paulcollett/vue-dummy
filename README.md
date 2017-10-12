### vue-dummy
## Placeholder Images and Dummy Text for Vue.js

`vue-dummy` is a wrapper around the https://dummyjs.com/ library to expose placeholder Images and Dummy Text as a vue directive

## Usage

Add to your HTML page:

```HTML
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-dummy"></script>
```

or, import into your module `npm install vue-dummy --save-dev`

```JS
import Vue from "vue"
import VueDummy from "vue-dummy"

Vue.use(VueDummy)
```

## Dummy Text

```HTML
<p v-dummy></p>
```

Choose the amount of words:
```HTML
<p v-dummy="150"></p>
```

Choose random amount of words between 3 & 10:
_Note: the quotes to pass the expression as a string_
```HTML
<p v-dummy="'3,10'"></p>
```

## Dummy Images

```HTML
<img v-dummy="300" />
```

_Note: quotes to pass the expression as a string_
```HTML
<img v-dummy="'400x300'" />
```

Defaults to the size of the parent container
```HTML
<img v-dummy />
```
