# Class: `TraversalFile`

    

## Properties

- **startPath**: `undefined` -- 


<br/>
<br/>

## Methods

### Function: `fromPath(path: fs.PathLike)`

    

#### Parameter List:

- **path**: `fs.PathLike` -- 


#### Return Type: `this` 

<br/>
<br/>

### Function: `run(path?: fs.PathLike)`

    

#### Parameter List:

- **path**: `fs.PathLike` _(optional)_ -- 


#### Return Type: `Promise<string[]>` 

<br/>
<br/>

### Function: `runWithCallback(callback: (filePath: fs.PathLike) => any, path?: fs.PathLike)`

    

#### Parameter List:

- **callback**: `(filePath: fs.PathLike) => any` -- 

- **path**: `fs.PathLike` _(optional)_ -- 


#### Return Type: `void` 

