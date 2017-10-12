# vue-dummy
Placeholder Images and Dummy Text for Vue.js

vue-dummy is a wrapper around the https://dummyjs.com/ library to expose the placeholder Images and Dummy Text as a vue directive

## Usage

Add to your HTML page:

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-dummy"></script>

or import into your module
`npm install vue-dummy --save-dev'`
`import VueDummy from "vue-dummy"`

## Dummy Text

`<p v-dummy></p>`

Choose the amount of words:
`<p v-dummy="150"></p>`

Choose random amount of words between 3 & 10:
_Note: the quotes to pass the expression as a string_
`<p v-dummy="'3,10'"></p>`

## Dummy Images

`<img v-dummy="300" />`

_Note: quotes to pass the expression as a string_
`<img v-dummy="'400x300'" />`

Defaults to the size of the parent container
`<img v-dummy />`
