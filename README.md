<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/AnthonyNahas/ngx-logcat/master/demo/src/assets/logo.svg">
</p>

# ngx-logcat - Ngx-logcat is an angular open source library for logging and debugging purposes

[![npm version](https://badge.fury.io/js/ngx-logcat.svg)](https://badge.fury.io/js/ngx-logcat),
[![Build Status](https://travis-ci.org/AnthonyNahas/ngx-logcat.svg?branch=master)](https://travis-ci.org/AnthonyNahas/ngx-logcat)
[![Coverage Status](https://coveralls.io/repos/github/AnthonyNahas/ngx-logcat/badge.svg?branch=master)](https://coveralls.io/github/AnthonyNahas/ngx-logcat?branch=master)
[![dependency Status](https://david-dm.org/AnthonyNahas/ngx-logcat/status.svg)](https://david-dm.org/AnthonyNahas/ngx-logcat)
[![devDependency Status](https://david-dm.org/AnthonyNahas/ngx-logcat/dev-status.svg?branch=master)](https://david-dm.org/AnthonyNahas/ngx-logcat#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/AnthonyNahas/ngx-logcat.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://AnthonyNahas.github.io/ngx-logcat

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-logcat` via:
```shell
npm install --save ngx-logcat
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-logcat`:
```js
map: {
  'ngx-logcat': 'node_modules/ngx-logcat/bundles/ngx-logcat.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-logcat';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-logcat';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-logcat';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2019 Anthony Nahas. Licensed under the MIT License (MIT)

