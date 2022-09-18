# Interface / Type: `UrlParserResult`

    

## Property List

- **protocal**: `string` -- 


- **host**: `string` -- 


- **path**: `string` -- 


- **paramMap**: `Map<string, string[]>` -- 


<br/>
<br/>

## Method List

`None`

<br/>
<br/>



---


<br/>
<br/>

# Class: `UrlParser`

    

## Properties

`None`

<br/>
<br/>

## Methods

### Function: `parse(url: string)`

    

#### Parameter List:

- **url**: `string` -- 


#### Return Type: `UrlParserResult | undefined` 

<br/>
<br/>

### Function: `mergeParams(url?: string, params?: {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    })`

    

#### Parameter List:

- **url**: `string` _(optional)_ -- 

- **params**: `{
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }` _(optional)_ -- 


#### Return Type: `string | undefined` 

