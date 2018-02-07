# google-doc-annotation-help
Google Doc Add-On Script to help manage manual, inline annotations

## Installation
1. Open a Google Doc on which you would like to enable this Add-On.
2. Click Tools > Script Editor...
3. Copy the contents of AnnotationHelper.gs into the Code.gs panel replacing all the contents of the stubbed out Code.gs.
4. Click Save.
5. Enter AnnotationHelper as the project name.
6. Reload the Doc.

## Usage
Convert annotations in the form [a] [ab] [a1] [ab12] to sequentially numeric annotations in the form [1].
 
To run click Add-ons > Annotation Helper > Convert Annotations.

Example:
```
  Here is some text with an annotation [a]. And some more text with another annotation [b].
   [a] - some note.
   [b] - another note.

   Here is even more text with some more complex annotations [ab][c1][ab2][c1234]
   [ab] - note ab
   [c1] - note c1
   [ab2] - note ab2
   [c1234] - note c1234
 ```

 Result after conversion:
 ```
   Here is some text with an annotation [1]. And some more text with another annotation [2].
   [1] - some note.
   [2] - another note.

   Here is even more text with some more complex annotations [3][4][5][6]
   [3] - note ab
   [4] - note c1
   [5] - note ab2
   [6] - note c1234
 ```
 
